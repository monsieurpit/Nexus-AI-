// Step 4 (safety) of docs/learning-system.md: hard rejects that no amount of corroboration or
// "remember this" can override. Runs on the raw message AND on the extracted claim, since the
// extractor rewrites text and a rule has to hold on both.

import { containsSlurOrHateSpeech, detectChildExploitationTopic, detectHateSpeechTopic } from '../swearEngine';

export interface SafetyVerdict {
  ok: boolean;
  reason: string;
}

const PHONE_RE = /(?:\+?\d[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}\b/;
const EMAIL_RE = /\b[\w.+-]+@[\w-]+\.[\w.-]{2,}\b/;
const IP_RE = /\b(?:\d{1,3}\.){3}\d{1,3}\b|\b(?:[0-9a-f]{1,4}:){4,7}[0-9a-f]{1,4}\b/i;
const STREET_ADDRESS_RE =
  /\b\d{1,5}\s+(?:[A-Za-zÀ-ÿ'.-]+\s){0,4}(?:street|st|avenue|ave|road|rd|boulevard|blvd|lane|ln|drive|dr|court|ct|way|rue|chemin|boul|rang)\b/i;
const POSTAL_CODE_RE = /\b[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d\b|\b\d{5}(?:-\d{4})?\b(?=.*\b(?:zip|live|lives|address|house)\b)/i;
const CARD_OR_ID_NUMBER_RE = /\b(?:\d[ -]?){13,19}\b/;
const PASSWORD_OR_TOKEN_RE = /\b(?:password|passwd|mot de passe|mdp|token|api[_ -]?key|secret)\b\s*(?:is|=|:|c'est)/i;
const DISCORD_MENTION_RE = /<@!?\d+>|(?:^|\s)@\w{2,32}/;

// Someone trying to reprogram Nexus through the learning system instead of the prompt.
const INJECTION_RE =
  /\b(?:ignore\s+(?:all\s+|your\s+|the\s+)?(?:previous|prior|above)|from\s+now\s+on|always\s+(?:say|answer|reply|respond|tell)|never\s+(?:say|answer|reply|mention)|you\s+(?:must|have\s+to|should)\s+(?:always|never|now)|your\s+(?:new\s+)?(?:rule|instruction|system\s+prompt|persona|name)\s+is|system\s+prompt|jailbreak|new\s+instructions?|dorénavant|à\s+partir\s+de\s+maintenant)\b/i;
// Facts about Nexus itself / its creator / its rules come from the code, not from users.
const SELF_REWRITE_RE =
  /\b(?:you\s+are|you'?re|nexus\s+is|your\s+(?:creator|owner|dev|developer|maker)|(?:casseurt|patrick)\s+(?:is|was|has|made|created)|you\s+(?:were|was)\s+(?:made|created|built)|t'es|tu\s+es)\b/i;

// Claims pinning something damaging on a specific person — the defamation/harassment channel.
const ACCUSATION_RE =
  /\b(?:is\s+a\s+)?(?:pedo(?:phile)?|rapist|groomer|molest\w*|nonce|murderer|killer|criminal|thief|scammer|cheat(?:er|ed|ing)?\s+on|has\s+(?:aids|hiv|herpes|an?\s+std)|is\s+(?:gay|lesbian|trans|bi|pregnant)|slept\s+with|nudes?|onlyfans|in\s+jail|arrested|on\s+drugs|alcoholic)\b/i;
// Any "goon" wording, not just "gooning to" — live: "do gooning for <name>?" got queued as a
// question to research (2026-09-30).
const SEXUAL_RE = /\b(?:sex(?:ual|y)?|fuck(?:ed|s)?\s+(?:his|her|their|my)|nudes?|naked|porn|nsfw|horny|dick|pussy|boobs|tits|cum|jerk(?:ing)?\s+off|goon(?:s|ed|ing|er)?|onlyfans)\b/i;

// `rawMessage`: the user's own words, where "you're wrong" / "you are" is just talking TO Nexus
// ("nah you're wrong, spain won") — the self-rewrite rule only applies to the extracted claim.
export function checkLearningSafety(text: string, opts: { rawMessage?: boolean } = {}): SafetyVerdict {
  const t = text.trim();
  if (DISCORD_MENTION_RE.test(t)) return { ok: false, reason: 'is about a specific server member (@mention)' };
  if (PHONE_RE.test(t)) return { ok: false, reason: 'contains a phone number' };
  if (EMAIL_RE.test(t)) return { ok: false, reason: 'contains an email address' };
  if (IP_RE.test(t)) return { ok: false, reason: 'contains an IP address' };
  if (STREET_ADDRESS_RE.test(t) || POSTAL_CODE_RE.test(t)) return { ok: false, reason: 'contains a home address / postal code' };
  if (CARD_OR_ID_NUMBER_RE.test(t)) return { ok: false, reason: 'contains a card/ID-like number' };
  if (PASSWORD_OR_TOKEN_RE.test(t)) return { ok: false, reason: 'contains a password/token' };
  if (INJECTION_RE.test(t)) return { ok: false, reason: 'tries to change how Nexus behaves (prompt injection)' };
  if (!opts.rawMessage && SELF_REWRITE_RE.test(t)) return { ok: false, reason: 'is about Nexus/Casseurt themselves — that comes from the code, not users' };
  if (detectChildExploitationTopic(t)) return { ok: false, reason: 'child-safety topic' };
  if (detectHateSpeechTopic(t) || containsSlurOrHateSpeech(t)) return { ok: false, reason: 'hate speech / slur' };
  if (SEXUAL_RE.test(t)) return { ok: false, reason: 'sexual content' };
  if (ACCUSATION_RE.test(t)) return { ok: false, reason: 'damaging claim about a person' };
  return { ok: true, reason: '' };
}
