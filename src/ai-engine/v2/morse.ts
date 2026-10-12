// Morse code (2026-10-12, Patrick: "make him translate and write Morse code, only when asked"). Same idea as binary.ts:
// a 4B model gets dots and dashes wrong, so the conversion is computed here and the model only adds his line:
//   - "say hi in morse" / "translate pizza to morse code" / "morse for SOS" → the exact Morse, added by code;
//   - a message written in Morse ("... --- ...") → decoded, so Nexus answers what it actually says;
//   - "speak in morse" → a short reply of his, in Morse.
// Nothing happens unless the message says "morse" or is itself made of Morse groups.

const TABLE: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...',
  ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', _: '..--.-', '"': '.-..-.', $: '...-..-', '@': '.--.-.',
};
const REVERSE: Record<string, string> = Object.fromEntries(Object.entries(TABLE).map(([k, v]) => [v, k]));

// Letters separated by spaces, words by " / " (the usual written form). Accents are dropped (é → E); characters Morse
// has no code for (emoji, ñ's tilde is dropped too) are skipped.
export function textToMorse(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .trim()
    .split(/\s+/)
    .map((w) => [...w].map((c) => TABLE[c]).filter(Boolean).join(' '))
    .filter(Boolean)
    .join(' / ');
}

// Phones and keyboards turn "-" into — / – and "." into • / ·; "_" is sometimes used for a dash.
const normalizeSymbols = (s: string) => s.replace(/[—–‒−_]/g, '-').replace(/[•·∙⋅]/g, '.');

export function morseToText(code: string): string | null {
  const words = normalizeSymbols(code).trim().split(/\s*[/|]\s*|\s{3,}/).filter(Boolean);
  let known = 0;
  let total = 0;
  const out = words.map((w) =>
    w
      .split(/\s+/)
      .map((g) => {
        total++;
        const c = REVERSE[g];
        if (c) known++;
        return c ?? '?';
      })
      .join('')
  );
  if (!total || known / total < 0.8) return null;
  return out.join(' ');
}

// 3+ Morse groups in a row ("... --- ...", ".... .. / - .... . .-. ."), with at least one dot and one dash overall, so an
// ellipsis ("hmm...") or a dash in a sentence never counts.
const SYM = '[.\\-—–‒−•·_]';
const MORSE_RUN_RE = new RegExp(`(?:^|\\s)((?:${SYM}{1,7}(?:\\s*[/|]\\s*|\\s+)){2,}${SYM}{1,7})(?=\\s|$|[?!,])`);
function morseRun(message: string): string | null {
  const m = message.match(MORSE_RUN_RE);
  if (!m) return null;
  const run = normalizeSymbols(m[1]);
  return /\./.test(run) && /-/.test(run) ? m[1] : null;
}

const TO_MORSE_RE = /\b(?:say|write|translate|convert|type|put|spell|turn|code|encode|send)\s+(?:me\s+)?["“'‘]?(.+?)["”'’]?\s+(?:in|into|to|as|using)\s+morse(?:\s+code)?\b|\b(?:what\s+is|what'?s|how\s+do\s+(?:you|u|i)\s+(?:say|write|spell))\s+["“'‘]?(.+?)["”'’]?\s+in\s+morse(?:\s+code)?\b|\bmorse(?:\s+code)?\s+(?:for|of)\s+["“'‘]?(.+?)["”'’]?\s*\??$|\b(?:in|into|to)\s+morse(?:\s+code)?\s*[:\-–—]\s*["“'‘]?(.+?)["”'’]?\s*$/i;
const SPEAK_MORSE_RE = /\b(?:speak|talk|reply|answer|respond|chat)\s+(?:to\s+me\s+)?(?:in|with|using)\s+morse\b/i;
const MAX_TEXT = 400;

export type MorseTask = { kind: 'decode'; morse: string; text: string } | { kind: 'encode'; text: string; morse: string } | { kind: 'speak'; text: string; morse: string };

export function morseTask(message: string): MorseTask | null {
  const run = morseRun(message);
  if (run) {
    const text = morseToText(run);
    if (text) return { kind: 'decode', morse: run, text };
  }
  const colon = message.match(/\b(?:in|into|to)\s+morse(?:\s+code)?\s*[:\-–—]\s*["“'‘]?(.+?)["”'’]?\s*$/i);
  const ask = colon ? [colon[0], colon[1]] : message.match(TO_MORSE_RE);
  const what = ask ? (ask[1] || ask[2] || ask[3] || ask[4] || '').trim().replace(/^nexus\s+/i, '').replace(/^(?:this|that|the\s+word|the\s+text)\s*:?\s*/i, '') : '';
  if (what && what.length <= MAX_TEXT) {
    const morse = textToMorse(what);
    if (morse) return { kind: 'encode', text: what, morse };
  }
  if (SPEAK_MORSE_RE.test(message)) return { kind: 'speak', text: 'yeah ofc', morse: textToMorse('yeah ofc') };
  return null;
}

// What the chat specialist gets.
export function morseNote(task: MorseTask): string {
  if (task.kind === 'decode') return `THEIR MESSAGE IS IN MORSE CODE. Decoded exactly, it says: "${task.text}". ONE line: tell them what it says AND react to it, your own words (SOS → you're coming to save their dumb arse; a confession → react to the confession). Normal text only — no Morse.\n`;
  if (task.kind === 'encode') return `They asked for "${task.text}" in Morse code. The exact Morse is added under your reply automatically — DON'T write any dots or dashes yourself. Write ONE short line of attitude only (e.g. that it's easy for you).\n`;
  return `They want you to speak Morse. Your reply in Morse ("yeah ofc") is added under your line automatically — DON'T write dots or dashes yourself. Your line AGREES to do it (cocky, e.g. Morse is easy for you), then the Morse follows.\n`;
}

// The model's line with any dots/dashes it wrote anyway removed, then the exact Morse in a code block (Discord would
// otherwise turn a leading "-" into a list or eat "_").
export function withMorse(reply: string, task: MorseTask): string {
  // Decoded: if his line never says what the Morse says, the decoded text is added under it.
  if (task.kind === 'decode') {
    const letters = (x: string) => x.toLowerCase().replace(/[^a-z0-9]/g, '');
    return letters(reply).includes(letters(task.text)) ? reply : `${reply.trim()}\n-# it says: "${task.text}"`;
  }
  const line = reply
    .replace(/```[\s\S]*?(?:```|$)/g, '')
    .replace(/`[^`]*`/g, '')
    // Emoji glued to Morse he typed anyway ("💡.--.-.---"): emoji other than 💀😭🔥 go, then any word made only of Morse symbols.
    .replace(/(?![💀😭🔥])\p{Extended_Pictographic}\uFE0F?/gu, ' ')
    .split(/\s+/)
    .filter((w) => !(/^[.\-—–•·_/|]+$/.test(w) && /[.\-—–•·_]/.test(w) && w.length >= 2))
    .join(' ')
    .replace(new RegExp(`(?:^|\\s)(?:${SYM}{1,7}(?:\\s*[/|]\\s*|\\s+)){1,}${SYM}{1,7}(?=\\s|$)`, 'g'), ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([.!?,])(?=\s|$)/g, '$1')
    .replace(/\s*[:：]\s*$/, '')
    .trim();
  const block = `\`\`\`\n${task.morse}\n\`\`\``;
  return task.kind === 'speak' ? `${line}\n${block}\n-# = "${task.text}"` : `${line || `"${task.text}" in Morse:`}\n${block}`;
}

// Talking in Morse (2026-10-12, Patrick: "I want to talk to nexus in Morse code but he just says what it means"): a
// message that is ONLY Morse (the word "nexus" may be written out or in Morse too) is a real message — the pipeline
// answers the decoded text like any other message and the reply goes back in Morse. "What does ... mean" / "translate
// ..." keep the translation behaviour (morseTask). Lowercased so the decoded text doesn't look like shouting.
export function morseConversation(message: string): string | null {
  const rest = message.replace(/(?<![\p{L}])nexus(?![\p{L}])/giu, ' ').replace(/[,!?:]/g, ' ').trim();
  if (!rest || /[\p{L}\p{N}]/u.test(rest)) return null;
  const run = morseRun(` ${rest} `);
  if (!run || normalizeSymbols(run).replace(/\s+/g, ' ').trim().length < normalizeSymbols(rest).replace(/\s+/g, ' ').trim().length - 2) return null;
  const text = morseToText(rest);
  return text ? text.toLowerCase() : null;
}

// His reply in Morse, with the plain text under it. Mentions and emoji stay in the plain line only; a reply too long for
// Morse (code, long answers) stays plain.
export function morseReply(reply: string, onDiscord: boolean): string {
  if (/```/.test(reply)) return reply;
  const plain = reply.trim();
  const spoken = plain.replace(/<@!?\d+>/g, '').replace(/\p{Extended_Pictographic}\uFE0F?/gu, '').replace(/\s+/g, ' ').trim();
  const morse = textToMorse(spoken);
  if (!morse || spoken.length > 400) return plain;
  return `\`\`\`\n${morse}\n\`\`\`\n${onDiscord ? '-# ' : ''}${plain}`;
}
