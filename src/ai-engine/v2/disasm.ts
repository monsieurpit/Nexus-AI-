// Binary → JavaScript / Python (2026-10-11, Patrick: "can he translate binary code into JavaScript or Python?").
// A 4B model can't decode machine code by reading 0s and 1s, so a real disassembler does it: the bytes are wrapped into
// an object file by clang and disassembled by objdump (both ship with macOS), then the specialist translates REAL
// instructions. Bytes that are plain text are decoded instead; text data after the code ("Hello, world") is split off.

import { execFile } from 'child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

const CLANG = '/usr/bin/clang';
const OBJDUMP = '/usr/bin/objdump';

function run(cmd: string, args: string[]): Promise<{ ok: boolean; out: string }> {
  return new Promise((resolve) => execFile(cmd, args, { timeout: 15000, maxBuffer: 2 * 1024 * 1024 }, (err, stdout, stderr) => resolve({ ok: !err, out: `${stdout}\n${stderr}` })));
}

// The bits in a message (8-bit groups, or one continuous run whose length is a multiple of 8), as bytes.
export function bitsToBytes(message: string): number[] | null {
  const groups = message.match(/(?:\b[01]{8}\b[\s,]*){2,}/);
  const run = groups ? groups[0] : (message.match(/[01](?:[01\s]*[01])?/g) || []).map((r) => r.replace(/\s+/g, '')).filter((r) => r.length >= 16 && r.length % 8 === 0).sort((a, b) => b.length - a.length)[0];
  if (!run) return null;
  const clean = run.replace(/[^01]/g, '');
  if (clean.length < 16 || clean.length % 8 !== 0) return null;
  return clean.match(/.{8}/g)!.map((b) => parseInt(b, 2));
}

const isPrintable = (b: number) => (b >= 32 && b < 127) || b === 10 || b === 13 || b === 9;

// Text data at the end of a program (the "Hello, world\n" after the code): the longest printable tail of 4+ bytes.
function splitTrailingText(bytes: number[]): { code: number[]; text: string | null } {
  let i = bytes.length;
  while (i > 0 && isPrintable(bytes[i - 1])) i--;
  if (bytes.length - i >= 4 && i > 0) return { code: bytes.slice(0, i), text: String.fromCharCode(...bytes.slice(i)) };
  return { code: bytes, text: null };
}

export interface Disassembly { kind: 'text' | 'code'; arch?: 'x86-64' | 'arm64'; asm?: string[]; text?: string | null; bytes: number }

export async function disassembleBits(message: string): Promise<Disassembly | null> {
  const bytes = bitsToBytes(message);
  if (!bytes) return null;
  // All printable = it's just text in binary.
  if (bytes.every(isPrintable)) return { kind: 'text', text: String.fromCharCode(...bytes), bytes: bytes.length };
  const arm = /\b(?:arm|arm64|aarch64|apple\s+silicon|m1|m2|m3|m4|raspberry)\b/i.test(message);
  const { code, text } = splitTrailingText(bytes);
  const dir = mkdtempSync(join(tmpdir(), 'nexus-disasm-'));
  try {
    const src = join(dir, 'raw.s');
    const obj = join(dir, 'raw.o');
    if (arm) {
      const words: string[] = [];
      for (let i = 0; i + 4 <= code.length; i += 4) words.push(`.inst 0x${[code[i + 3], code[i + 2], code[i + 1], code[i]].map((b) => b.toString(16).padStart(2, '0')).join('')}`);
      writeFileSync(src, `.text\n${words.join('\n')}\n`);
    } else {
      writeFileSync(src, `.text\n.byte ${code.map((b) => `0x${b.toString(16)}`).join(',')}\n`);
    }
    const asm = await run(CLANG, ['-target', arm ? 'aarch64-linux-gnu' : 'x86_64-linux-gnu', '-c', src, '-o', obj]);
    if (!asm.ok) return null;
    const dump = await run(OBJDUMP, ['-d', '--no-show-raw-insn', ...(arm ? [] : ['-M', 'intel']), obj]);
    const lines = dump.out
      .split('\n')
      .filter((l) => /^\s+[0-9a-f]+:/.test(l))
      .map((l) => l.replace(/^\s+([0-9a-f]+):\s*/, '$1: ').replace(/\s+#.*$/, '').replace(/\t+/g, ' ').trim())
      .slice(0, 120);
    if (!lines.length) return null;
    return { kind: 'code', arch: arm ? 'arm64' : 'x86-64', asm: lines, text, bytes: bytes.length };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// What the specialist gets.
export function disassemblyNote(d: Disassembly, target: string, knownBehaviour?: string | null): string {
  if (d.kind === 'text') {
    return `THE BINARY THEY SENT IS PLAIN TEXT (decoded exactly): "${d.text}". Translating it into ${target} = code that prints/holds that exact text. Say it's text data, then give the ${target} code.\n`;
  }
  return `${knownBehaviour ? `WHAT THIS PROGRAM DOES (verified — your code must do exactly this): it ${knownBehaviour}.\n` : ''}THE BINARY THEY SENT, DISASSEMBLED by a real disassembler (${d.arch}, ${d.bytes} bytes) — these are the exact instructions, trust them:
${d.asm!.join('\n')}
${d.text ? `Text data stored right after the code: ${JSON.stringify(d.text)}\n` : ''}${d.arch === 'x86-64' ? `Linux x86-64 system calls: syscall runs the call whose number is in eax/rax — 1 = write(fd = edi, buffer = rsi, length = edx) (fd 1 = the screen), 60 = exit(code = edi), 0 = read, 2 = open, 3 = close. "lea rsi, [rip + N]" points rsi at the data N bytes after that instruction (here: the text above). xor x, x = 0. A jne/jmp back to an earlier line = a loop. Register parts: al/bl/cl/dl = the low 8 bits of eax/ebx/ecx/edx — so "mov [rsp], bl" stores ebx's CURRENT value as a byte (when ebx counts 49..57 that's the characters "1".."9"); [rsp] / [rsp+1] = bytes on the stack, and "mov rsi, rsp" points the write at them. Track what each register holds in each loop iteration; values that change in the loop must change in your code too.\n` : 'ARM64: svc #0 = system call (number in x8: 64 = write, 93 = exit), ret = return.\n'}
Translate what this machine code DOES into ${target}: write the equivalent ${target} program (same output, same loop, same exit code — e.g. write(1, text) = print the text, exit(n) = exit with code n), then 2-4 short lines mapping the instructions to your code. Don't invent instructions that aren't listed.\n`;
}

export const TRANSLATE_BINARY_RE = /\b(?:translate|convert|turn|rewrite|port|decompile|transform)\b[\s\S]{0,40}\b(?:into|to|in)\s+(?:javascript|js|python|py|typescript|ts|c\+\+|cpp|c#|java|rust|go|lua|code)\b|\b(?:in|into|to)\s+(?:javascript|js|python|py)\b[\s\S]{0,60}?(?:[01]{8})|\bwhat\s+(?:does|do)\s+(?:this|these)\s+(?:binary|bits|bytes|code|machine\s+code)\b/i;
