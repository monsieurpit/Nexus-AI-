#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";
import { PitError } from "./errors";
import { format } from "./format";
import { nodeHost } from "./host/node";
import { Runtime } from "./runtime/runtime";

const VERSION = "1.0.0";

// Programs run in a worker thread with a large stack so recursion can go deep.
const STACK_SIZE_MB = 256;

const USAGE = `PitCode ${VERSION}

Usage:
  pitcode                    Start the interactive prompt (REPL)
  pitcode <file.pit> [args]  Run a PitCode program (args are in the 'args' list)
  pitcode < file.pit         Run a program read from standard input
  pitcode fmt <files...>     Tidy the indentation of .pit files (--check only reports)
  pitcode --js <file.pit>    Show the JavaScript a program turns into
  pitcode --help             Show this help
  pitcode --version          Show the version
`;

interface Job {
  source: string;
  file: string;
  args: string[];
}

/** Reads the program and starts the worker; returns an exit code if it finishes early. */
function main(argv: string[]): number | undefined {
  const [first, ...rest] = argv;
  if (first === "--help" || first === "-h") {
    process.stdout.write(USAGE);
    return 0;
  }
  if (first === "--version" || first === "-v") {
    process.stdout.write(`PitCode ${VERSION}\n`);
    return 0;
  }
  if (first === "fmt") return formatFiles(rest);
  if (first === "--js") {
    const job = readJob(rest[0], []);
    if (!job) return 1;
    try {
      process.stdout.write(new Runtime(nodeHost()).compileToJs(job.source, job.file) + "\n");
      return 0;
    } catch (e) {
      if (e instanceof PitError) {
        process.stderr.write(e.format() + "\n");
        return 1;
      }
      throw e;
    }
  }
  if (!first && process.stdin.isTTY) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("./repl").startRepl(VERSION);
    return undefined;
  }
  const job = readJob(first, rest);
  if (!job) return 1;

  const worker = new Worker(__filename, { workerData: job, resourceLimits: { stackSizeMb: STACK_SIZE_MB } });
  worker.on("message", (code: number) => {
    if (code !== 0) process.exitCode = code;
  });
  worker.on("error", (e) => {
    process.stderr.write(`pitcode: internal error: ${e.stack ?? e}\n`);
    process.exitCode = 70;
  });
  worker.on("exit", (code) => {
    if (code !== 0 && !process.exitCode) process.exitCode = code;
  });
  return undefined;
}

function formatFiles(args: string[]): number {
  const check = args.includes("--check");
  const files = args.filter((a) => a !== "--check");
  if (files.length === 0) {
    process.stderr.write("pitcode fmt: give the files to tidy, like: pitcode fmt main.pit\n");
    return 2;
  }
  let status = 0;
  for (const file of files) {
    let source: string;
    try {
      source = readFileSync(file, "utf8");
    } catch {
      process.stderr.write(`pitcode: can't open file '${file}'\n`);
      status = 1;
      continue;
    }
    let tidy: string;
    try {
      tidy = format(source);
    } catch (e) {
      if (!(e instanceof PitError)) throw e;
      e.file = file;
      e.source = source;
      process.stderr.write(e.format() + "\n");
      status = 1;
      continue;
    }
    if (tidy === source) continue;
    if (check) {
      process.stdout.write(`${file} needs tidying\n`);
      status = 1;
    } else {
      writeFileSync(file, tidy);
      process.stdout.write(`Tidied ${file}\n`);
    }
  }
  return status;
}

function readJob(file: string | undefined, args: string[]): Job | null {
  if (!file || file === "-") {
    return { source: readFileSync(0, "utf8"), file: "<stdin>", args };
  }
  try {
    return { source: readFileSync(file, "utf8"), file, args };
  } catch {
    process.stderr.write(`pitcode: can't open file '${file}'\n`);
    return null;
  }
}

/** Runs the program inside the worker and reports failures to the main thread. */
async function runJob({ source, file, args }: Job): Promise<void> {
  const reportError = (error: PitError) => {
    process.stderr.write(error.format() + "\n");
    parentPort!.postMessage(1);
  };
  const runtime = new Runtime(nodeHost({ args, reportError }));
  process.on("unhandledRejection", (e) => reportError(runtime.toPitError(e)));
  try {
    await runtime.run(source, file);
  } catch (e) {
    reportError(e instanceof PitError ? e : runtime.toPitError(e));
  }
}

if (isMainThread) {
  const code = main(process.argv.slice(2));
  if (code !== undefined) process.exitCode = code;
} else {
  void runJob(workerData as Job);
}
