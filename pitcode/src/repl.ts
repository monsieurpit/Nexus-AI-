import * as readline from "node:readline";
import { PitError } from "./errors";
import { nodeHost } from "./host/node";
import { Runtime } from "./runtime/runtime";
import { KEYWORDS } from "./token";
import { repr } from "./runtime/values";

const color = (code: number, text: string) => (process.stdout.isTTY ? `\x1b[${code}m${text}\x1b[0m` : text);

const HELP = `Type PitCode and press Enter. Examples:
  pit name = "Pat"
  say "Hi {name}"
  [1, 2, 3].map(n => n * 2)

Blocks can span several lines: keep typing until the '}' closes them.
Commands: .help  .clear (forget everything)  .exit (or Ctrl+D)
`;

/** True when the error only means "the code isn't finished yet". */
function needsMoreInput(e: unknown): boolean {
  if (!(e instanceof PitError) || e.kind !== "SyntaxError") return false;
  return /never closed|missing closing """|found end of file/.test(e.message);
}

export function startRepl(version: string): void {
  let runtime = newRuntime();
  let buffer = "";
  let entry = 0;

  process.stdout.write(`${color(1, `PitCode ${version}`)} — type .help for help, .exit to leave\n`);

  const completer = (line: string): [string[], string] => {
    const word = /[A-Za-z_][A-Za-z0-9_]*$/.exec(line)?.[0] ?? "";
    const names = [...KEYWORDS, ...Object.keys(runtime.builtins)];
    const hits = names.filter((n) => n.startsWith(word));
    return [hits.length ? hits : names, word];
  };

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, completer, terminal: true });
  const prompt = () => {
    rl.setPrompt(buffer ? color(90, "...  ") : color(36, "pit> "));
    rl.prompt();
  };

  // Lines are handled one at a time, even when many arrive at once (pasted or piped).
  const queue: string[] = [];
  let busy = false;
  const pump = async () => {
    if (busy) return;
    busy = true;
    while (queue.length) await handle(queue.shift()!);
    busy = false;
    if (closed) finish();
  };
  let closed = false;
  const finish = () => {
    process.stdout.write("\nBye!\n");
    process.exit(0);
  };

  const handle = async (line: string): Promise<void> => {
    const trimmed = line.trim();
    if (!buffer) {
      if (trimmed === ".exit" || trimmed === "exit") return finish();
      if (trimmed === ".help" || trimmed === "help") {
        process.stdout.write(HELP);
        return prompt();
      }
      if (trimmed === ".clear") {
        runtime = newRuntime();
        process.stdout.write("Everything is forgotten. Fresh start!\n");
        return prompt();
      }
      if (trimmed === "") return prompt();
    }
    buffer += (buffer ? "\n" : "") + line;
    try {
      const value = await runtime.runRepl(buffer, `<repl ${++entry}>`);
      if (value !== null && value !== undefined) process.stdout.write(color(33, repr(value)) + "\n");
      buffer = "";
    } catch (e) {
      if (needsMoreInput(e) && trimmed !== "") {
        entry--;
      } else {
        buffer = "";
        const err = e instanceof PitError ? e : runtime.toPitError(e);
        process.stdout.write(color(31, err.format()) + "\n");
      }
    }
    prompt();
  };

  rl.on("line", (line) => {
    queue.push(line);
    void pump();
  });
  rl.on("close", () => {
    closed = true;
    if (!busy) finish();
  });
  prompt();
}

function newRuntime(): Runtime {
  return new Runtime(nodeHost({
    // The prompt owns the keyboard here, so ask() gives back nil in the REPL.
    readLine: () => null,
    reportError: (e) => process.stdout.write(color(31, e.format()) + "\n"),
  }));
}
