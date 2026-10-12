import { bitsToBytes, TRANSLATE_BINARY_RE } from './disasm';
// Binary (2026-10-11, Patrick: "he can't code in binary, he can't speak in binary"). A 4B model can't turn text into
// 0s and 1s reliably, so the conversion is computed here and the model only presents it:
//   - "say hi in binary" / "translate pizza to binary" → the exact 8-bit binary of that text;
//   - a message written in binary (bytes of 0/1) → decoded, so Nexus answers what it actually says.

export function textToBinary(text: string): string {
  return [...new TextEncoder().encode(text)].map((b) => b.toString(2).padStart(8, '0')).join(' ');
}

export function binaryToText(bits: string): string | null {
  const clean = bits.replace(/[^01]/g, '');
  if (clean.length < 8 || clean.length % 8 !== 0) return null;
  const bytes = new Uint8Array(clean.match(/.{8}/g)!.map((b) => parseInt(b, 2)));
  try {
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return /^[\p{L}\p{N}\p{P}\p{S}\s]+$/u.test(text) ? text : null;
  } catch {
    return null;
  }
}

// A run of 8-bit groups ("01101000 01101001") anywhere in the message.
const BINARY_RUN_RE = /(?:\b[01]{8}\b[\s,]*){2,}/;
const TO_BINARY_RE = /\b(?:say|write|translate|convert|type|put|spell|turn|code|encode)\s+(?:me\s+)?["“']?(.+?)["”']?\s+(?:in|into|to|as)\s+binary(?:\s+code)?\b|\b(?:what\s+is|what'?s|how\s+do\s+you\s+(?:say|write))\s+["“']?(.+?)["”']?\s+in\s+binary\b|\bbinary\s+(?:for|of)\s+["“']?(.+?)["”']?\s*\??$/i;

export function binaryNote(message: string): string | null {
  const run = message.match(BINARY_RUN_RE);
  if (run) {
    const decoded = binaryToText(run[0]);
    if (decoded) return `THEIR MESSAGE CONTAINS BINARY. Decoded exactly, it says: "${decoded}". React to what it says (you can flex that you read binary). Answer in normal text — never write new binary yourself.\n`;
  }
  const ask = message.match(TO_BINARY_RE);
  const what = ask ? (ask[1] || ask[2] || ask[3] || '').trim().replace(/^nexus\s+/i, '') : '';
  // A plain number ("convert 42 to binary") is a number conversion (numberConversionNote), not the text "42".
  if (what && what.length <= 120 && !/^-?\d+$/.test(what)) {
    return `BINARY (computed exactly — copy it character for character, never change a digit): "${what}" in 8-bit binary is:\n${textToBinary(what)}\nGive that binary, with at most one short line of attitude.\n`;
  }
  if (/\b(?:speak|talk|reply|answer|respond)\s+(?:in|with)\s+binary\b/i.test(message)) {
    return `They want you to speak binary. Pick a short reply (2-4 words, e.g. a cocky "yeah ofc"), and give it in binary EXACTLY as computed here for the words "yeah ofc": ${textToBinary('yeah ofc')} — say what it means after it.\n`;
  }
  return null;
}

// The binary they asked for (or null). The reply's binary is checked against it digit for digit.
export function expectedBinary(message: string): string | null {
  const ask = message.match(TO_BINARY_RE);
  const what = ask ? (ask[1] || ask[2] || ask[3] || '').trim().replace(/^nexus\s+/i, '') : '';
  if (what && /^-?\d+$/.test(what)) {
    const n = BigInt(what);
    return n >= 0n ? n.toString(2) : null;
  }
  if (what && what.length <= 120) return textToBinary(what);
  return /\b(?:speak|talk|reply|answer|respond)\s+(?:in|with)\s+binary\b/i.test(message) ? textToBinary('yeah ofc') : null;
}
export const BINARY_MESSAGE_RE = BINARY_RUN_RE;
// A small model can flip a digit while copying: the binary run in the reply is replaced by the exact one.
export function fixBinary(reply: string, expected: string): string {
  const run = /\s/.test(expected) || expected.length === 8 ? reply.match(/(?:[01]{8}[\s,]*){1,}/) : reply.match(/\b[01]{2,64}\b/);
  if (!run) return `${reply.trim()}\n${expected}`;
  return run[0].replace(/[\s,]+$/, '') === expected ? reply : reply.replace(run[0].replace(/[\s,]+$/, ''), expected);
}

// Number conversions, computed: "convert 42 to binary", "42 in binary", "what is 101010 in decimal", "0b1010 to hex".
export function numberConversionNote(message: string): string | null {
  const toBin = message.match(/(?:^|[^\w-])(-?\d{1,15})\s+(?:in|into|to|as)\s+binary\b/i);
  if (toBin) {
    const n = BigInt(toBin[1]);
    const bits = n < 0n ? `-${(-n).toString(2)}` : n.toString(2);
    const neg8 = n < 0n && n >= -128n ? ` (as an 8-bit two's complement byte: ${(256n + n).toString(2).padStart(8, '0')})` : '';
    return `COMPUTED EXACTLY: ${toBin[1]} in binary = ${bits}${neg8}${n >= 0n && n < 256n ? ` (as a byte: ${n.toString(2).padStart(8, '0')})` : ''}; in hex ${n < 0n ? "-" : ""}0x${(n < 0n ? -n : n).toString(16).toUpperCase()}. Use these exact digits.\n`;
  }
  const fromBin = message.match(/\b(?:0b)?([01]{2,64})\s+(?:in|into|to|as)\s+(decimal|hex(?:adecimal)?|a\s+number|normal\s+numbers?)\b/i) || message.match(/\bwhat(?:'s|\s+is)\s+(?:0b)?([01]{2,64})\s+in\s+(decimal|hex(?:adecimal)?)\b/i);
  if (fromBin) {
    const n = BigInt('0b' + fromBin[1]);
    return `COMPUTED EXACTLY: binary ${fromBin[1]} = ${n.toString(10)} in decimal = 0x${n.toString(16).toUpperCase()} in hex. Use these exact numbers.\n`;
  }
  return null;
}

// ── Real programs in binary (2026-10-11, Patrick: "can he write a full example of binary code, like 0100100001111100..."). ──
// A 4B model can't invent valid machine code, so these are real x86-64 Linux programs whose bytes were produced by an
// assembler (clang -target x86_64-linux-gnu, checked with objdump). Nexus writes a line or two; the exact binary and the
// per-instruction breakdown are added by the code, never typed by the model.
interface BinaryProgram { name: string; what: string; re: RegExp; parts: Array<[string, string]> } // [hex bytes, meaning]
const PROGRAMS: BinaryProgram[] = [
  {
    name: 'Hello World', what: 'prints "Hello, world" and exits (x86-64 Linux, 46 bytes)', re: /\bhello\b|\bprint|\bdefault\b/i,
    parts: [
      ['b8 01 00 00 00', 'mov eax, 1 — system call 1 = write'],
      ['bf 01 00 00 00', 'mov edi, 1 — to file 1 = the screen (stdout)'],
      ['48 8d 35 10 00 00 00', 'lea rsi, [msg] — where the text is (16 bytes further)'],
      ['ba 0d 00 00 00', 'mov edx, 13 — 13 characters'],
      ['0f 05', 'syscall — the OS prints it'],
      ['b8 3c 00 00 00', 'mov eax, 60 — system call 60 = exit'],
      ['31 ff', 'xor edi, edi — exit code 0'],
      ['0f 05', 'syscall — the program ends'],
      ['48 65 6c 6c 6f 2c 20 77 6f 72 6c 64 0a', 'the text "Hello, world" + newline (ASCII)'],
    ],
  },
  {
    name: 'Exit with 42', what: 'ends right away with exit code 42 (x86-64 Linux, 12 bytes)', re: /\b42\b|\bexit\s+code\b/i,
    parts: [['b8 3c 00 00 00', 'mov eax, 60 — system call 60 = exit'], ['bf 2a 00 00 00', 'mov edi, 42 — exit code 42'], ['0f 05', 'syscall — the program ends']],
  },
  {
    name: 'Add 2 + 3', what: 'adds 2 + 3 and returns the result 5 as its exit code (x86-64 Linux, 15 bytes)', re: /\badd|\bsum|\bplus|\bmath|\bcalculat/i,
    parts: [['bf 02 00 00 00', 'mov edi, 2'], ['83 c7 03', 'add edi, 3 — edi is now 5'], ['b8 3c 00 00 00', 'mov eax, 60 — system call 60 = exit'], ['0f 05', 'syscall — exits with code 5']],
  },
  {
    name: 'Count down from 10', what: 'counts a register down from 10 to 0 in a loop, then exits (x86-64 Linux, 18 bytes)', re: /\bcount|\bloop|\bcountdown/i,
    parts: [['b9 0a 00 00 00', 'mov ecx, 10'], ['ff c9', 'dec ecx — subtract 1'], ['75 fc', 'jnz -4 — jump back to "dec" until ecx is 0'], ['b8 3c 00 00 00', 'mov eax, 60 — exit'], ['31 ff', 'xor edi, edi — exit code 0'], ['0f 05', 'syscall — the program ends']],
  },
  {
    name: 'Print 1 to 9', what: 'prints the numbers 1 to 9, one per line, with a loop (x86-64 Linux, 57 bytes)', re: /\b(?:1|one)\s+to\s+(?:9|nine|10|ten)\b|\bnumbers\b|\blong(?:er)?\b/i,
    parts: [
      ['bb 31 00 00 00', 'mov ebx, 49 — the character "1"'],
      ['48 83 ec 10', 'sub rsp, 16 — make room on the stack (loop starts here)'],
      ['88 1c 24', 'mov [rsp], bl — put the digit there'],
      ['c6 44 24 01 0a', 'mov byte [rsp+1], 10 — and a newline after it'],
      ['b8 01 00 00 00', 'mov eax, 1 — system call 1 = write'],
      ['bf 01 00 00 00', 'mov edi, 1 — to the screen'],
      ['48 89 e6', 'mov rsi, rsp — the 2 characters on the stack'],
      ['ba 02 00 00 00', 'mov edx, 2 — 2 characters'],
      ['0f 05', 'syscall — prints the digit'],
      ['48 83 c4 10', 'add rsp, 16 — give the stack room back'],
      ['ff c3', 'inc ebx — next digit'],
      ['83 fb 3a', 'cmp ebx, 58 — past "9" yet?'],
      ['75 d5', 'jne -43 — if not, loop back'],
      ['b8 3c 00 00 00', 'mov eax, 60 — system call 60 = exit'],
      ['31 ff', 'xor edi, edi — exit code 0'],
      ['0f 05', 'syscall — the program ends'],
    ],
  },
  {
    name: 'Exit', what: 'the smallest real program: exits with code 0 (x86-64 Linux, 9 bytes)', re: /\bsmallest|\bshortest|\btiny|\bsimplest|\bexit\b/i,
    parts: [['b8 3c 00 00 00', 'mov eax, 60 — system call 60 = exit'], ['31 ff', 'xor edi, edi — exit code 0'], ['0f 05', 'syscall — the program ends']],
  },
];

const hexToBits = (hex: string) => hex.trim().split(/\s+/).map((h) => parseInt(h, 16).toString(2).padStart(8, '0')).join(' ');

// "write a full example of binary code", "show me a program in binary", "hello world in machine code" → a program.
// (Plain "write X in binary" stays a text conversion.)
export const BINARY_PROGRAM_RE = /\b(?:binary|machine)\s+code\b|\b(?:example|program|programme|script|app)\s+(?:of|in|written\s+in)\s+(?:binary|machine\s+code)\b|\bbinary\s+(?:program|example)\b|\bcode\s+in\s+binary\b|\b(?:0s\s+and\s+1s|zeros\s+and\s+ones)\s+(?:code|program)\b/i;
// A program that prints any text: the Hello World code with the length and the text swapped in. Verified with the
// assembler: only the 4-byte length after "ba" and the text bytes change (the text always starts 16 bytes after "lea").
const LONG_DEFAULT_TEXT = "Nexus was here. This is real x86-64 machine code, every single bit of it is real, written by the one and only HIM. Barça till I die, Real Vardrid can cry, Messi is the GOAT and FIFA Is For Argentina fr fr. TU DU DU DU, MAX VERSTAPPEN.\n";
export function printTextProgram(text: string): BinaryProgram {
  const bytes = [...new TextEncoder().encode(text)].slice(0, 500);
  const hex = (n: number) => n.toString(16).padStart(2, '0');
  const len = bytes.length;
  const lenLe = [len & 255, (len >> 8) & 255, 0, 0].map(hex).join(' ');
  const shown = new TextDecoder().decode(new Uint8Array(bytes)).replace(/\n/g, '\\n');
  return {
    name: `Print "${shown.length > 40 ? `${shown.slice(0, 40)}…` : shown}"`,
    what: `prints that text (${len} characters) and exits (x86-64 Linux, ${33 + len} bytes)`,
    re: /$^/,
    parts: [
      ['b8 01 00 00 00', 'mov eax, 1 — system call 1 = write'],
      ['bf 01 00 00 00', 'mov edi, 1 — to the screen (stdout)'],
      ['48 8d 35 10 00 00 00', 'lea rsi, [text] — where the text is (16 bytes further)'],
      [`ba ${lenLe}`, `mov edx, ${len} — ${len} bytes of text`],
      ['0f 05', 'syscall — the OS prints it'],
      ['b8 3c 00 00 00', 'mov eax, 60 — system call 60 = exit'],
      ['31 ff', 'xor edi, edi — exit code 0'],
      ['0f 05', 'syscall — the program ends'],
      [bytes.map(hex).join(' '), `the text itself (${len} bytes of UTF-8)`],
    ],
  };
}
export function pickBinaryProgram(message: string): BinaryProgram | null {
  // "translate this binary code into python" is the disassembler's job (disasm.ts), not a new program.
  if (TRANSLATE_BINARY_RE.test(message) && bitsToBytes(message)) return null;
  if (!BINARY_PROGRAM_RE.test(message) || /\b(?:how\s+(?:do|does|can)|explain|what\s+is|why)\b/i.test(message) && !/\b(?:example|write|show|give)\b/i.test(message)) return null;
  // Their own text: "a program in binary that prints 'X'" / "...that says X".
  const own = message.match(/\b(?:prints?|says?|writes?|displays?|shows?|outputs?)\s+["“'«]([^"”'»]{1,450})["”'»]/i) || message.match(/\b(?:prints?|says?|displays?|outputs?)\s+(?!numbers\b|hello\s+world\b)(.{3,450}?)\s*[.!?]*$/i);
  if (own) return printTextProgram(`${own[1].trim()}\n`);
  // "really long" / "very long" / "huge": the long built-in message (about 2,000 digits).
  if (/\b(?:really|very|super|extra|mega|insanely|crazy)\s+long\b|\b(?:huge|massive|giant|longest|biggest|enormous)\b/i.test(message)) return printTextProgram(LONG_DEFAULT_TEXT);
  return PROGRAMS.find((p) => p !== PROGRAMS[0] && p.re.test(message)) || PROGRAMS[0];
}
export function binaryProgramNote(p: BinaryProgram): string {
  return `THEY WANT A REAL PROGRAM IN BINARY. You're giving them "${p.name}": it ${p.what}. Write ONE short line of attitude in your voice (you can name the program). Do NOT describe the instructions, and do NOT write any binary, hex or code block — the exact binary and a correct breakdown are added automatically after your line.\n`;
}
// The block added after his line: the whole program as one continuous string, then each instruction.
export function binaryProgramBlock(p: BinaryProgram, spaced = false): string {
  const all = p.parts.map(([h]) => hexToBits(h)).join(' ');
  // One continuous run of bits, wrapped every 96 digits (12 bytes) so a long program splits cleanly across Discord messages.
  const continuous = spaced ? all : (all.replace(/\s+/g, '').match(/.{1,96}/g) || []).join('\n');
  const lines = p.parts.map(([h, m]) => {
    const n = h.trim().split(/\s+/).length;
    return n > 24 ? `(${n} bytes: the bits after the code)  → ${m}` : `${hexToBits(h)}  → ${m}`;
  });
  return `\`\`\`text\n${continuous}\n\`\`\`\n**${p.name}, instruction by instruction:**\n\`\`\`text\n${lines.join('\n')}\n\`\`\`\n-# Real x86-64 Linux machine code (Intel/AMD). To run it, the bytes go in an ELF executable — or assemble the same instructions with nasm.`;
}

// Recognise one of the programs above (or a print-text program) from raw bytes: what it does, in plain words, so a
// translation into JavaScript/Python can't drift (2026-10-11: the 1-to-9 loop came out as "2-9 with no newlines").
const PROGRAM_BEHAVIOUR: Record<string, string> = {
  'Hello World': 'prints "Hello, world" followed by a newline, then exits with code 0',
  'Exit with 42': 'exits immediately with exit code 42 (prints nothing)',
  'Add 2 + 3': 'computes 2 + 3 and exits with that result (5) as the exit code (prints nothing)',
  'Count down from 10': 'counts a counter down from 10 to 0 in a loop (prints nothing), then exits with code 0',
  'Print 1 to 9': 'prints the digits 1 to 9, EACH ON ITS OWN LINE (9 lines), then exits with code 0',
  Exit: 'exits immediately with code 0 (prints nothing)',
};
export function identifyProgram(bytes: number[]): string | null {
  const hex = bytes.map((b) => b.toString(16).padStart(2, '0')).join(' ');
  for (const p of PROGRAMS) if (p.parts.map(([h]) => h).join(' ') === hex) return PROGRAM_BEHAVIOUR[p.name] || null;
  const head = 'b8 01 00 00 00 bf 01 00 00 00 48 8d 35 10 00 00 00 ba ';
  const tail = ' 0f 05 b8 3c 00 00 00 31 ff 0f 05 ';
  if (hex.startsWith(head) && hex.slice(head.length + 12).startsWith(tail.trim())) {
    const len = bytes[18] | (bytes[19] << 8);
    const text = new TextDecoder().decode(new Uint8Array(bytes.slice(33, 33 + len)));
    return `prints ${JSON.stringify(text)} then exits with code 0`;
  }
  return null;
}
