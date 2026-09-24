import * as fs from "node:fs";
import * as path from "node:path";
import type { Host } from "../runtime/runtime";
import type { FileSystem } from "../runtime/stdlib";

/** Reads one line from standard input, waiting until it arrives. */
export function readLineFromStdin(prompt: string): string | null {
  if (prompt) process.stdout.write(prompt);
  const byte = Buffer.alloc(1);
  const bytes: number[] = [];
  for (;;) {
    let read: number;
    try {
      read = fs.readSync(0, byte, 0, 1, null);
    } catch (e) {
      const code = (e as NodeJS.ErrnoException).code;
      if (code === "EAGAIN") continue;
      if (code === "EOF") read = 0;
      else throw e;
    }
    if (read === 0) {
      if (bytes.length === 0) return null;
      break;
    }
    if (byte[0] === 10) break; // \n
    bytes.push(byte[0]);
  }
  return Buffer.from(bytes).toString("utf8").replace(/\r$/, "");
}

export const nodeFileSystem: FileSystem = {
  read: (p) => fs.readFileSync(p, "utf8"),
  write: (p, text) => fs.writeFileSync(p, text),
  append: (p, text) => fs.appendFileSync(p, text),
  exists: (p) => fs.existsSync(p),
  list: (p) => fs.readdirSync(p).sort(),
  remove: (p) => fs.rmSync(p, { recursive: true, force: true }),
  makeDir: (p) => void fs.mkdirSync(p, { recursive: true }),
};

/** Finds `use "./tools"` relative to the file that asks for it. */
export function loadModuleFromDisk(spec: string, from: string): { name: string; source: string } {
  const base = from.startsWith("<") ? process.cwd() : path.dirname(path.resolve(from));
  const candidates = [path.resolve(base, spec)];
  if (!spec.endsWith(".pit")) candidates.push(path.resolve(base, spec + ".pit"));
  for (const file of candidates) {
    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      return { name: path.relative(process.cwd(), file) || file, source: fs.readFileSync(file, "utf8") };
    }
  }
  throw new Error(`not found: ${spec}`);
}

export function nodeHost(overrides: Partial<Host> = {}): Host {
  return {
    write: (text) => process.stdout.write(text),
    readLine: readLineFromStdin,
    loadModule: loadModuleFromDisk,
    fs: nodeFileSystem,
    args: [],
    exit: (code) => process.exit(code),
    ...overrides,
  };
}
