#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";
import { PitError, run } from "./index";

const VERSION = "0.1.0";

// Programs run in a worker thread with a large stack so recursion can go deep.
const STACK_SIZE_MB = 256;
const MAX_CALL_DEPTH = 10000;

const USAGE = `PitCode ${VERSION}

Usage:
  pitcode <file.pit>     Run a PitCode program
  pitcode < file.pit     Run a program read from standard input
  pitcode --help         Show this help
  pitcode --version      Show the version
`;

interface Job {
  source: string;
  file: string;
}

/** Reads the program and starts the worker; returns an exit code if it finishes early. */
function main(args: string[]): number | undefined {
  const [arg] = args;
  if (arg === "--help" || arg === "-h") {
    process.stdout.write(USAGE);
    return 0;
  }
  if (arg === "--version" || arg === "-v") {
    process.stdout.write(`PitCode ${VERSION}\n`);
    return 0;
  }

  let job: Job;
  if (arg) {
    try {
      job = { source: readFileSync(arg, "utf8"), file: arg };
    } catch {
      process.stderr.write(`pitcode: can't open file '${arg}'\n`);
      return 1;
    }
  } else if (!process.stdin.isTTY) {
    job = { source: readFileSync(0, "utf8"), file: "<stdin>" };
  } else {
    process.stdout.write(USAGE);
    return 2;
  }

  const worker = new Worker(__filename, { workerData: job, resourceLimits: { stackSizeMb: STACK_SIZE_MB } });
  worker.on("message", (code: number) => (process.exitCode = code));
  worker.on("error", (e) => {
    process.stderr.write(`pitcode: internal error: ${e.stack ?? e}\n`);
    process.exitCode = 70;
  });
  return undefined;
}

/** Runs the program inside the worker and reports an exit code. */
function runJob({ source, file }: Job): number {
  try {
    run(source, { maxCallDepth: MAX_CALL_DEPTH });
    return 0;
  } catch (e) {
    if (e instanceof PitError) {
      process.stderr.write(e.format(source, file) + "\n");
      return 1;
    }
    if (e instanceof RangeError && /call stack/i.test(e.message)) {
      process.stderr.write("RuntimeError: Too much recursion (the call stack overflowed)\n");
      return 1;
    }
    throw e;
  }
}

if (isMainThread) {
  const code = main(process.argv.slice(2));
  if (code !== undefined) process.exitCode = code;
} else {
  parentPort!.postMessage(runJob(workerData as Job));
}
