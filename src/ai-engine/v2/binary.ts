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
  if (what && what.length <= 120) {
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
  if (what && what.length <= 120) return textToBinary(what);
  return /\b(?:speak|talk|reply|answer|respond)\s+(?:in|with)\s+binary\b/i.test(message) ? textToBinary('yeah ofc') : null;
}
export const BINARY_MESSAGE_RE = BINARY_RUN_RE;
// A small model can flip a digit while copying: the binary run in the reply is replaced by the exact one.
export function fixBinary(reply: string, expected: string): string {
  const run = reply.match(/(?:[01]{8}[\s,]*){1,}/);
  if (!run) return `${reply.trim()}\n${expected}`;
  return run[0].replace(/[\s,]+$/, '') === expected ? reply : reply.replace(run[0].replace(/[\s,]+$/, ''), expected);
}
