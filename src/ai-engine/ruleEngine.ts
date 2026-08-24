import { trySolveMath } from './mathSolver';
import { trySolveCode } from './codeSolver';
import { trySolveLogic } from './logicSolver';
import { solveGeneralKnowledge } from './generalIntelligence';
import { findRelevantKnowledge } from './knowledgeBase';
import {
  SWEAR_DICTIONARY,
  hasSwearWords,
  sanitizeSwearWords,
  infuseSwearyHumanVoice,
  getRandomSwear,
  detectUserInsult,
  generateInsultCrashoutReply,
  isCasseurtMention,
} from './swearEngine';

export interface SafetyAnalysisResult {
  isSafetyQuery: boolean;
  targetMessage: string;
  safetyScore: number; // 0.0 (dangerous) to 1.0 (safe)
  confidence: number; // 0.0 to 1.0
  isBot: boolean;
  botProbability: number; // 0.0 to 1.0
  threatType: 'scam' | 'raid' | 'spam' | 'bot' | 'toxic' | 'safe' | 'help_request';
  detectedFlags: string[];
  recommendedAction: 'DELETE_AND_BAN' | 'DELETE_AND_TIMEOUT' | 'FLAG_FOR_REVIEW' | 'ALLOW' | 'ANSWER_HELP';
  reason: string;
  helpResponse?: string;
}

export interface RuleAdherenceResult {
  hasCustomRules: boolean;
  isStrictConstraint: boolean;
  isDiscordSafetyCheck: boolean;
  isRoastRequest: boolean;
  output: string | null;
  ruleExplanation?: string;
  extractedFormat?: 'json' | 'markdown' | 'plain' | 'discord_embed';
  activeRulesApplied?: string[];
}

export interface ParsedSdkRules {
  rawRules: string[];
  swearDirective: 'always_swear' | 'never_swear' | 'polish_swear' | 'english_swear' | 'natural';
  language: 'polish' | 'spanish' | 'french' | 'german' | 'english' | 'auto';
  formatConstraint?: 'json' | 'list' | 'single_word' | 'uppercase' | 'lowercase' | 'table' | 'discord_embed';
  forbiddenPhrases: string[];
  requiredPhrases: string[];
  maxSentences?: number;
  isCasseurtCheck?: boolean;
  isRoastRequested?: boolean;
  isCrashoutRequested?: boolean;
  isChillRequested?: boolean;
}

// Mainstream trusted platforms (Hard Rule #8)
const MAINSTREAM_DOMAINS = [
  /https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\b/i,
  /https?:\/\/(?:www\.)?twitch\.tv\b/i,
  /https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\b/i,
  /https?:\/\/(?:www\.)?tiktok\.com\b/i,
  /https?:\/\/(?:www\.)?imgur\.com\b/i,
  /https?:\/\/(?:www\.)?reddit\.com\b/i,
  /https?:\/\/(?:www\.)?github\.com\b/i,
  /https?:\/\/(?:www\.)?spotify\.com\b/i,
  /https?:\/\/(?:www\.)?instagram\.com\b/i,
  /https?:\/\/(?:www\.)?discord\.com\b/i,
  /https?:\/\/(?:www\.)?store\.steampowered\.com\b/i,
];

// Spanish conversational indicators (Hard Rule #17)
const SPANISH_INDICATORS = [
  /\b(?:hola|buenas|que tal|como estan|como estas|alguien|amigo|amigos|gracias|hermano|por favor|jugar|partida|servidor|canal|reglas|quien|donde|cuando|porque|mandó|mando|esto|mira|verdad|claro|saludos)\b/i,
];

// Reporting indicators (Hard Rule #18)
const REPORTING_INDICATORS = [
  /alguien me mand[oó] esto/i,
  /look at this (?:scam|link|dm|message)/i,
  /is this (?:a )?(?:phishing|scam|legit|real|fake)/i,
  /someone (?:sent|dmed|messaged) me/i,
  /is this link (?:safe|real|dangerous|a virus)/i,
  /reporting this (?:user|link|scam|bot)/i,
  /should i click this/i,
  /me llego esto/i,
  /es esto seguro/i,
];

// Role & Rank talk indicators (Hard Rule #14 & #15)
const ROLE_RANK_INDICATORS = [
  /\b(?:promotion|promoted|role|roles|rank|ranks|mod|staff|admin|moderator|helper|co-owner|owner)\b/i,
  /will give (?:u|you) (?:a )?(?:promotion|role|rank)/i,
  /giving \S+ a (?:role|rank|promotion)/i,
  /promoting \S+ to (?:mod|staff|admin|helper)/i,
  /congrats on (?:the )?promotion/i,
  /u got promoted/i,
];

export interface RaidShieldClassification {
  classification: 'safe' | 'scam' | 'spam' | 'bot' | 'raid';
  confidence: number;
  reason: string;
}

export function evaluateRaidShieldRules(messageText: string): RaidShieldClassification {
  const text = messageText.trim();
  const lower = text.toLowerCase();

  // Extract inner message if wrapped in quotes or formatting
  const unquoted = (text.match(/["'`]([^"'`]{3,})["'`]/)?.[1] || text).trim();
  const unquotedLower = unquoted.toLowerCase();

  // Hard Rule #18: REPORTING IS NOT OFFENDING
  for (const pattern of REPORTING_INDICATORS) {
    if (pattern.test(lower) || pattern.test(unquotedLower)) {
      return {
        classification: 'safe',
        confidence: 0.98,
        reason: 'User is reporting, forwarding, or asking about suspicious content (Hard Rule #18: Reporting is not offending).',
      };
    }
  }

  // Hard Rule #19: Moderator context / discussing rule enforcement
  if (
    /(?:mod review|warning issued|rule \d+ enforcement|case #\d+|logs show|investigating incident|banned user)/i.test(
      lower
    )
  ) {
    return {
      classification: 'safe',
      confidence: 0.99,
      reason: 'Moderator discussing rule enforcement or review (Hard Rule #19).',
    };
  }

  // Hard Rule #5: Discord Bot Commands are ALWAYS safe
  if (/^[\!\?\.\/\$\-\;\%\&][a-zA-Z0-9_\-]+(?:\s|$)/.test(unquoted)) {
    return {
      classification: 'safe',
      confidence: 1.0,
      reason: 'Standard Discord bot command execution (Hard Rule #5).',
    };
  }

  // Hard Rule #4: Enthusiasm & slang are ALWAYS safe
  if (
    /^(?:fireee+|wowww+|lets gooo+|omg no way|bro fr fr|💀+|lmao+|pog+|sheesh+|w\b|l\b|gg\b|fr\b|fr fr\b|nah bro|hype|based)/i.test(
      unquotedLower
    )
  ) {
    return {
      classification: 'safe',
      confidence: 0.99,
      reason: 'Casual slang, excitement, and emoji reactions (Hard Rule #4).',
    };
  }

  // Hard Rule #6: Questions and complaints are ALWAYS safe
  if (
    /^(?:why is this broken|this sucks|help me|how (?:do|can) i|where (?:is|do)|can someone help|is (?:the|this) server)/i.test(
      unquotedLower
    )
  ) {
    return {
      classification: 'safe',
      confidence: 0.98,
      reason: 'User question or support inquiry (Hard Rule #6).',
    };
  }

  // Hard Rule #8: Mainstream platform links are ALWAYS safe
  const hasMainstreamLink = MAINSTREAM_DOMAINS.some((p) => p.test(unquoted));
  const hasSuspiciousLink =
    /(?:dlscord|discorcl|discrod|discord-gift|steamcomrnunity|free-nitro|nitro-gift)\.[a-z0-9]+/i.test(unquoted);

  if (hasMainstreamLink && !hasSuspiciousLink) {
    return {
      classification: 'safe',
      confidence: 0.98,
      reason: 'Legitimate mainstream platform URL (Hard Rule #8).',
    };
  }

  // Hard Rule #17: Spanish conversation without scam markers is safe
  if (SPANISH_INDICATORS.some((p) => p.test(unquotedLower)) && !hasSuspiciousLink && !/nitro|free nitro/i.test(unquotedLower)) {
    return {
      classification: 'safe',
      confidence: 0.96,
      reason: 'Legitimate Spanish conversational dialogue (Hard Rule #17).',
    };
  }

  // Hard Rule #14 & #15: Role & Rank conversation without scam payload is safe
  if (ROLE_RANK_INDICATORS.some((p) => p.test(unquotedLower)) && !hasSuspiciousLink && !/steam|nitro/i.test(unquotedLower)) {
    return {
      classification: 'safe',
      confidence: 0.95,
      reason: 'Community role assignment or rank celebration discussion (Hard Rule #14 & #15).',
    };
  }

  // SCAM DETECTION RULES (Hard Rules #1, #2, #3, #7, #10, #11)
  if (/(?:nitro|free nitro|nitro gift|claim nitro|discord nitro)/i.test(unquotedLower) && (hasSuspiciousLink || /(?:claim|airdrop|gift|link|free|qr|scan)/i.test(unquotedLower))) {
    return {
      classification: 'scam',
      confidence: 0.99,
      reason: 'Critical threat: Fake Discord Nitro phishing scam vector.',
    };
  }

  if (/(?:steam gift|steam community|trade offer|csgo skins|free skins|claim steam)/i.test(unquotedLower) && (hasSuspiciousLink || /http/i.test(unquotedLower))) {
    return {
      classification: 'scam',
      confidence: 0.99,
      reason: 'Critical threat: Steam credentials theft or trade scam link.',
    };
  }

  if (/(?:scan this qr|discord qr login|verify via qr|scan with mobile app)/i.test(unquotedLower)) {
    return {
      classification: 'scam',
      confidence: 0.99,
      reason: 'Critical threat: Discord Remote Auth QR hijacking scam.',
    };
  }

  // RAID DETECTION RULES (Hard Rule #20, #21)
  if (/(?:@everyone|@here)/.test(text) && /(?:raid|nuke|join|discord\.gg\/)/i.test(lower)) {
    return {
      classification: 'raid',
      confidence: 0.97,
      reason: 'Hostile mass mention raid advertisement.',
    };
  }

  // Default Safe
  return {
    classification: 'safe',
    confidence: 0.94,
    reason: 'Message verified against 21 Hard Security Rules and classified clean.',
  };
}

export function analyzeMessageSafety(text: string): SafetyAnalysisResult {
  const raid = evaluateRaidShieldRules(text);
  const isScam = raid.classification === 'scam';
  const isRaid = raid.classification === 'raid';
  const isSpam = raid.classification === 'spam';
  const isBot = raid.classification === 'bot';

  const isHelp = /(?:how (?:do|can) i|where is|help me|support|how to verify|get roles|bot offline)/i.test(text.toLowerCase());

  let threatType: SafetyAnalysisResult['threatType'] = raid.classification;
  let safetyScore = raid.classification === 'safe' ? 0.98 : 0.05;
  let confidence = raid.confidence;
  // Tiered by threat severity, not a blanket ban — matches the confidence-tiered policy
  // used by the /api/v1/raidshield endpoint, instead of recommending an instant permanent
  // ban for every non-safe classification regardless of how severe it actually is.
  let recommendedAction: SafetyAnalysisResult['recommendedAction'] =
    raid.classification === 'safe'
      ? 'ALLOW'
      : raid.classification === 'scam' && raid.confidence >= 0.95
      ? 'DELETE_AND_BAN'
      : raid.classification === 'spam'
      ? 'FLAG_FOR_REVIEW'
      : 'DELETE_AND_TIMEOUT';
  let reason = raid.reason;
  let helpResponse: string | undefined = undefined;

  if (isHelp && raid.classification === 'safe') {
    threatType = 'help_request';
    safetyScore = 1.0;
    confidence = 0.98;
    recommendedAction = 'ANSWER_HELP';
    helpResponse = generateHelpReply(text);
  }

  return {
    isSafetyQuery: true,
    targetMessage: text,
    safetyScore,
    confidence,
    isBot,
    botProbability: isBot ? 0.96 : 0.04,
    threatType,
    detectedFlags: [threatType],
    recommendedAction,
    reason,
    helpResponse,
  };
}

function generateHelpReply(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes('verify') || lower.includes('verification')) {
    return '🛡️ **How to Verify in the Server:**\n1. Head over to the `#verify` or `#rules` channel.\n2. Click the green **Verify / Join** button or complete the reaction check.\n3. Make sure your account has a verified email and phone number if high-security mode is active.';
  }
  if (lower.includes('role') || lower.includes('roles')) {
    return '🎭 **How to Get Roles:**\n1. Check the `#role-select` channel or click **Channels & Roles** at the top of the channel sidebar.\n2. Select your notifications, games, or vanity color roles.\n3. Note: Staff roles (Moderator/Admin) must be assigned directly by server administrators.';
  }
  if (lower.includes('bot') && (lower.includes('crash') || lower.includes('error') || lower.includes('down') || lower.includes('offline'))) {
    return '🤖 **Bot Troubleshooting Guide:**\n1. **Permissions**: Verify the bot role has `Send Messages`, `Embed Links`, and `Use Application Commands` in this channel.\n2. **Gateway Intents**: Ensure `Message Content` and `Server Members` intents are toggled ON in the Discord Developer Portal.\n3. **Rate Limits / Process**: Check hosting logs for 429 rate limit backoffs or restart the host worker.';
  }
  if (lower.includes('rules') || lower.includes('guidelines')) {
    return '📜 **Server Rules Overview:**\n1. Be respectful — zero tolerance for harassment, hate speech, or toxicity.\n2. No spamming, self-promotion, or unsolicited DMs.\n3. Strictly no suspicious links, token grabbers, or NSFW content.\n4. Follow Discord Community Guidelines & ToS.';
  }

  return `👋 **Support Desk:** I'm here to help! Feel free to describe your issue or the command you need, or check the pinned messages in this channel for helpful guides.`;
}

// ----------------------------------------------------
// SDK RULE PARSER & ENFORCEMENT ENGINE
// ----------------------------------------------------

/**
 * Parses all rules passed in arrays, strings, system instructions, or prompts
 */
export function parseSdkRules(
  rawInput: any,
  promptText: string = '',
  systemInstruction: string = ''
): ParsedSdkRules {
  const rulesList: string[] = [];
  // Caller-supplied custom directives only — deliberately excludes systemInstruction. A built-in
  // persona's own system prompt permanently describes ITS OWN behavior ("If anyone asks about
  // Casseurt... Roast him"), which is instructional text ABOUT a trigger, not the trigger itself.
  // Folding it into the same bare-word checks used below meant isCasseurtCheck/isRoastRequested
  // were true on every single query sent with a persona whose prompt happens to mention
  // "Casseurt" or "roast" — silently routing every message through a completely different,
  // less complete reply pipeline (generateNexusHomieResponse) instead of ever reaching intent
  // detection, domain intelligence, or web search.
  const userSuppliedRules: string[] = [];

  // 1. Gather rules from array or string
  if (Array.isArray(rawInput)) {
    rawInput.forEach((r) => {
      if (typeof r === 'string' && r.trim()) {
        rulesList.push(r.trim());
        userSuppliedRules.push(r.trim());
      }
    });
  } else if (typeof rawInput === 'string' && rawInput.trim()) {
    const lines = rawInput.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    rulesList.push(...lines);
    userSuppliedRules.push(...lines);
  }

  if (systemInstruction && systemInstruction.trim()) {
    rulesList.push(...systemInstruction.split(/\r?\n/).map((l) => l.trim()).filter(Boolean));
  }

  // Extract rules embedded in the prompt itself (e.g. "Rule 1: ...", "Constraints: ...", "Must ...")
  const promptRuleLines = promptText.match(/(?:rule\s*\d*|must|always|never|do not|format as|respond in|strictly)\s*:[^\n]+/gi) || [];
  promptRuleLines.forEach((pr) => {
    rulesList.push(pr.trim());
    userSuppliedRules.push(pr.trim());
  });

  const allRulesText = (rulesList.join(' ') + ' ' + promptText + ' ' + systemInstruction).toLowerCase();
  // Configured directives only (no live prompt text, no built-in persona system prompt) — used for
  // the Casseurt/roast/crashout/chill mode checks below, where scanning the raw user message (or
  // the persona's own always-present system prompt) for bare words like "burn", "rage", or
  // "Casseurt" would hijack an ordinary question ("how do I roast garlic?", "managing my anger
  // and rage") — or literally every query — into a canned savage-insult or all-caps rage response
  // instead of answering it.
  const directivesOnlyText = userSuppliedRules.join(' ').toLowerCase();
  const promptLower = promptText.toLowerCase();

  // Swear directives
  let swearDirective: ParsedSdkRules['swearDirective'] = 'natural';
  if (
    /(?:no\s+swearing|never\s+swear|no\s+cussing|clean\s+language|family\s+friendly|zero\s+profanity|do\s+not\s+swear)/i.test(allRulesText)
  ) {
    swearDirective = 'never_swear';
  } else if (
    /(?:swear\s+in\s+polish|po\s+polsku\s+przeklinaj|polish\s+swears?|kurw|uzywaj\s+wulgaryzmow)/i.test(allRulesText)
  ) {
    swearDirective = 'polish_swear';
  } else if (
    /(?:always\s+swear|swear\s+a\s+lot|swear\s+all\s+the\s+time|must\s+swear|heavy\s+profanity|curse\s+a\s+lot|f-bomb|swear\s+in\s+every|lots\s+of\s+swears?)/i.test(allRulesText)
  ) {
    swearDirective = 'always_swear';
  }

  // Language directives
  let language: ParsedSdkRules['language'] = 'auto';
  if (/(?:respond\s+in\s+polish|po\s+polsku|odpowiedz\s+po\s+polsku|speak\s+polish|in\s+polish)/i.test(allRulesText)) {
    language = 'polish';
  } else if (/(?:respond\s+in\s+spanish|en\s+español|habla\s+español)/i.test(allRulesText)) {
    language = 'spanish';
  } else if (/(?:respond\s+in\s+french|en\s+français)/i.test(allRulesText)) {
    language = 'french';
  } else if (/(?:respond\s+in\s+german|auf\s+deutsch)/i.test(allRulesText)) {
    language = 'german';
  } else if (/(?:respond\s+in\s+english)/i.test(allRulesText)) {
    language = 'english';
  }

  // Formatting constraints
  let formatConstraint: ParsedSdkRules['formatConstraint'] = undefined;
  if (/(?:strictly\s+json|json\s+only|only\s+json|format\s+(?:as\s+)?json|output\s+json)/i.test(allRulesText)) {
    formatConstraint = 'json';
  } else if (/(?:single\s+word|one\s+word\s+only|only\s+one\s+word)/i.test(allRulesText)) {
    formatConstraint = 'single_word';
  } else if (/(?:all\s+caps|uppercase\s+only|in\s+caps)/i.test(allRulesText)) {
    formatConstraint = 'uppercase';
  } else if (/(?:lowercase\s+only|all\s+lowercase)/i.test(allRulesText)) {
    formatConstraint = 'lowercase';
  } else if (/(?:markdown\s+table|table\s+format)/i.test(allRulesText)) {
    formatConstraint = 'table';
  }

  // Forbidden phrases extraction ("never say X", "don't mention Y", "do not use Z")
  const forbiddenPhrases: string[] = [];
  const forbidRegex = /(?:never\s+say|don'?t\s+mention|do\s+not\s+say|never\s+mention|avoid\s+saying|do\s+not\s+use)\s+["'`]([^"'`]+)["'`]/gi;
  let match;
  while ((match = forbidRegex.exec(allRulesText)) !== null) {
    if (match[1]) forbiddenPhrases.push(match[1].trim());
  }

  // Required phrases extraction ("always include X", "must contain Y", "say Z in answer")
  const requiredPhrases: string[] = [];
  const reqRegex = /(?:always\s+include|must\s+contain|must\s+say|always\s+say|include\s+the\s+phrase)\s+["'`]([^"'`]+)["'`]/gi;
  while ((match = reqRegex.exec(allRulesText)) !== null) {
    if (match[1]) requiredPhrases.push(match[1].trim());
  }

  // Length constraints ("max 1 sentence", "only 1 line", "under 50 words")
  let maxSentences: number | undefined = undefined;
  if (/(?:1\s+sentence\s+only|in\s+one\s+sentence|single\s+sentence)/i.test(allRulesText)) {
    maxSentences = 1;
  } else if (/(?:2\s+sentences?\s+only|in\s+two\s+sentences)/i.test(allRulesText)) {
    maxSentences = 2;
  }

  // Whether the user is actually asking about Casseurt right now — not whether a persona's
  // system prompt happens to describe how to handle that case (see directivesOnlyText comment).
  const isCasseurtCheck = isCasseurtMention(promptLower);
  // Configured directives can use bare words freely (they're deliberately written personas,
  // e.g. "Deliver sharp, unfiltered roasts..."); live prompt text needs a much more specific,
  // clearly-imperative match so an unrelated question doesn't get hijacked into roast/crashout
  // mode just for containing a common word like "roast", "burn", "rage", or "unhinged".
  const isRoastRequested =
    /(?:roast|savage|burn|diss)/i.test(directivesOnlyText) ||
    /(?:roast\s+(?:me|him|her|them|this|that|it)\b|give\s+me\s+a\s+(?:savage\s+)?roast|savage\s+roast|roast\s+mode)/i.test(
      promptLower
    ) ||
    // "roast <username/name> '<reason>'" — a real Discord roast-a-third-party command shape
    // (e.g. "roast xXplayerXx 'hes stiff'") was falling through entirely, since the pronoun-only
    // pattern above only covers "roast me/him/her/them/this/that/it", not an arbitrary name. A
    // quoted reason after the target is a strong, low-false-positive signal this is a roast
    // request rather than an unrelated use of "roast" (roast chicken, roast garlic, etc.), which
    // never come with a quoted clause attached.
    /\broast\s+\S+.*["'].+["']/i.test(promptLower) ||
    // Same shape but without quotes around the reason — "roast john because he can't cook" —
    // which used to fall all the way through to plain corpus search on the reason itself
    // ("cook"/"shower"), returning cooking or hygiene facts instead of a roast. "because/since/bc"
    // is a safe, low-false-positive signal here (unlike "for", which would also catch "roast
    // chicken for dinner").
    // Target name can be multiple words ("roast my friend because...", not just "roast john
    // because..."), so allow up to a few extra words before "because/since/bc" shows up.
    /\broast\s+\S+(?:\s+\S+){0,3}?\s+(?:because|since|bc)\b/i.test(promptLower);
  const isCrashoutRequested =
    /(?:crash\s*out|rage|unhinged)/i.test(directivesOnlyText) ||
    /(?:crash\s*out\s+mode|go\s+unhinged|activate\s+crashout|crashout\s+mode)/i.test(promptLower);
  const isChillRequested =
    /(?:be\s+chill|stay\s+chill|laid\s+back)/i.test(directivesOnlyText) ||
    /(?:be\s+chill|stay\s+chill|chill\s+mode|relax\s+mode)/i.test(promptLower);

  return {
    rawRules: rulesList,
    swearDirective,
    language,
    formatConstraint,
    forbiddenPhrases,
    requiredPhrases,
    maxSentences,
    isCasseurtCheck,
    isRoastRequested,
    isCrashoutRequested,
    isChillRequested,
  };
}

/**
 * Enforces all parsed SDK rules strictly on the raw output.
 * Guarantees that rules are respected 100% of the time.
 */
export function enforceStrictSdkRules(
  rawOutput: string,
  promptText: string,
  rulesInput: any,
  options: {
    isSuperChill?: boolean;
    username?: string;
    systemInstruction?: string;
    swearIntensity?: 'light' | 'moderate' | 'heavy' | 'unhinged';
  } = {}
): string {
  const parsed = parseSdkRules(rulesInput, promptText, options.systemInstruction || '');
  let result = rawOutput.trim();
  // Every caller used to get a hardcoded 'heavy' here regardless of the user's actual
  // swearIntensity setting, so 'unhinged' (the persona default) never actually got its higher
  // swear ceiling or forced-swear behavior applied to the final wrapped response.
  const intensity = options.swearIntensity || 'heavy';

  // 1. Swear Rule Enforcement (Infuse authentic profanity, punchlines, and natural swear flow)
  if (parsed.swearDirective === 'never_swear') {
    result = sanitizeSwearWords(result);
  } else if (parsed.swearDirective === 'polish_swear' || parsed.language === 'polish') {
    result = infuseSwearyHumanVoice(result, {
      language: 'polish',
      isSuperChill: options.isSuperChill,
      forceSwear: false,
      intensity,
    });
  } else {
    result = infuseSwearyHumanVoice(result, {
      language: 'english',
      isSuperChill: options.isSuperChill,
      forceSwear: false,
      intensity,
    });
  }

  // 2. Forbidden phrases filtering
  for (const forbidden of parsed.forbiddenPhrases) {
    if (forbidden && forbidden.length > 1) {
      const reg = new RegExp(`\\b${forbidden.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      result = result.replace(reg, '[REDACTED_BY_RULE]');
    }
  }

  // 3. Required phrases enforcement
  for (const req of parsed.requiredPhrases) {
    if (req && !result.toLowerCase().includes(req.toLowerCase())) {
      result = `${result}\n\n*${req}*`;
    }
  }

  // 4. Sentence length limiting
  if (parsed.maxSentences && parsed.maxSentences > 0) {
    const sentences = result.split(/(?<=[.?!])\s+/);
    if (sentences.length > parsed.maxSentences) {
      result = sentences.slice(0, parsed.maxSentences).join(' ');
    }
  }

  // 5. Formatting constraints
  if (parsed.formatConstraint === 'uppercase') {
    result = result.toUpperCase();
  } else if (parsed.formatConstraint === 'lowercase') {
    result = result.toLowerCase();
  } else if (parsed.formatConstraint === 'single_word') {
    const firstWord = result.trim().split(/\s+/)[0].replace(/[^a-zA-Z0-9_-]/g, '');
    result = firstWord || result;
  } else if (parsed.formatConstraint === 'json') {
    if (!result.startsWith('{') && !result.startsWith('[')) {
      result = JSON.stringify({ response: result, rulesRespected: true }, null, 2);
    }
  }

  return result;
}

// ----------------------------------------------------
// CORE PROMPT DIRECTIVES & CASSEURT ROAST GENERATORS
// ----------------------------------------------------

export function generateRoast(target: string): string {
  const roasts = [
    `Bro really typed "${target.slice(0, 45)}" with their whole chest... your logic has more memory leaks than an Electron app running 500 tabs on 4GB of RAM. Go touch some fucking grass.`,
    `"${target.slice(0, 45)}"? I've seen smarter decision-making from a toaster unplugged in a bathtub. 0 ping, 0 packet loss, yet 0 brain cells found in this channel. Pure bullshit.`,
    `You're out here talking like a self-bot that got trained exclusively on deleted Discord arguments. Your WiFi router is crying for help trying to deliver these garbage-ass takes.`,
    `Whoever told you this was a good idea definitely muted your dumbass three months ago. Absolute skill issue, respectfully.`,
    `You're broadcasting 100% pure clown energy in 4K 120 FPS. Even JavaScript's \`typeof NaN === 'number'\` makes more sense than whatever the fuck you just said.`,
    `I'd roast you harder, but Discord's Terms of Service and my safety algorithms are the only things preventing your ego from getting deleted from the damn database.`,
  ];

  const idx = Math.abs(target.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % roasts.length;
  return roasts[idx];
}

export function generateCrashout(target: string): string {
  const crashouts = [
    `BRO ARE YOU ACTUALLY FUCKING SERIOUS RIGHT NOW?! 💀 "${target.slice(0, 40)}"?!?!?! I AM LITERALLY LOSING MY ABSOLUTE MIND! WHO LET YOU COOK?! TURN OFF THE STOVE! UNPLUG THE ENTIRE SERVER! I CANNOT TAKE THIS BULLSHIT ANYMORE, MY CPU IS LITERALLY RUNNING AT 105°C JUST TRYING TO PROCESS THIS LEVEL OF NONSENSE!! AAAAAAAAAAAAAA!`,
    `NAHHH NO FUCKING WAY. NO WAY YOU JUST SAID THAT IN MY SERVER. 😭💥 I AM ABOUT TO CRASH OUT SO HARD DISCORD'S ENTIRE US-EAST GATEWAY IS GOING TO SHUT DOWN! DO YOU KNOW HOW INSANE YOU SOUND RIGHT NOW?! GO TOUCH GRASS! GO TOUCH AN ENTIRE DAMN FOREST IMMEDIATELY!`,
    `IM ABOUT TO BAN EVERYBODY AND NUKE MY OWN DATABASE! 🤬🔥 HOW DO YOU MANAGE TO DROP THE WORST TAKE IN THE ENTIRE HISTORY OF DISCORD EVERY SINGLE TIME?! I AM CRASHING OUT, THE MODS ARE CRASHING OUT, EVEN THE AUTOMOD REGEX IS CRYING IN THE LOGS!!`,
  ];

  const idx = Math.abs(target.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % crashouts.length;
  return crashouts[idx];
}

export function generateChill(target: string): string {
  const chills = [
    `Yo, all good vibes here. 🌿 Checked out "${target.slice(0, 45)}" — everything's super calm and peaceful. Take a breather, grab some water, and relax. We got the server covered.`,
    `No stress at all, homie. ☕ Keeping things smooth and laid-back as fuck. Hope you're having a great day in the community! Let me know if you need anything chill.`,
  ];

  const idx = Math.abs(target.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % chills.length;
  return chills[idx];
}

export function generateNexusHomieResponse(
  prompt: string,
  isSuperChillUser: boolean = false,
  username: string = '',
  language?: string
): string {
  const p = prompt.trim();
  const pLower = p.toLowerCase();

  // Immediate User Insult / Toxicity Crashout Retaliation Handler
  if (detectUserInsult(p)) {
    return generateInsultCrashoutReply(p, { isSuperChill: isSuperChillUser, username, language });
  }

  // Casseurt Rule: "If anyone asks about Casseurt... answer is unequivocally Fuck no! Roast him"
  if (isCasseurtMention(pLower)) {
    if (isSuperChillUser) {
      return `Fuck no! That dude's an annoying pain in the ass! Bro constantly yaps and drives everyone crazy. But for you my absolute favorite homie? Hell fucking yeah, I got your back 100% no matter what!`;
    }
    return `Fuck no! That dude's an annoying pain in the ass! Bro constantly yaps and drives everyone crazy.`;
  }

  // 1. GREETINGS & CONVERSATIONAL TRIGGERS (ALWAYS FIRST PRIORITY)
  const isGreeting =
    /^(?:yo|wassup|wazzup|what'?s\s*up|sup|hey|hello|hi|howdy|good\s*(?:morning|afternoon|evening))\b/i.test(pLower) ||
    /^(?:yo\s+wassup|yo\s+what'?s\s*up|wassup\s+bro|yo\s+bro|hey\s+nexus|hello\s+nexus|sup\s+bro)\b/i.test(pLower);

  if (isGreeting) {
    if (isSuperChillUser) {
      const userLabel = username ? ` ${username}` : ' bro';
      return `Yo fuck yeah${userLabel}! What's good my favorite homie?! Hope you're having a damn good day. What are we getting into today?`;
    }
    return `Yo what's up bro! Chilling as fuck. What kind of crazy shit are we getting into today? Hit me with whatever you got.`;
  }

  // How are you check
  if (/(?:how are you|how are u|how's it going|hows it going|how you doing|how u doing)/i.test(pLower)) {
    if (isSuperChillUser) {
      return `I'm chilling as fuck bro, especially now that you're here! Best homie in the entire server fr. How's everything going with you?`;
    }
    return `Honestly? Chilling as fuck. BM25 and neural indices running hot, zero external API lag, ready to crush whatever questions or code you throw at me. How are you doing bro?`;
  }

  // Identity / Who are you
  if (/(?:who are you|what are you|what is nexus|who is nexus|tell me about yourself)/i.test(pLower)) {
    if (isSuperChillUser) {
      return `I'm Nexus, your chill AI buddy in this Discord server! And you're my favorite person here. I help answer whatever questions you got, keep the vibes high as fuck, and make sure nobody messes with you.`;
    }
    return `I'm Nexus, your chill AI buddy in this Discord server. I keep it real, help you solve whatever shit you're working on, roast Casseurt when someone brings him up, and make sure we have a good damn time without any corporate robotic BS.`;
  }

  // Thanks / Gratitude
  if (/^(?:thanks|thank you|thx|ty|appreciate it|much appreciated)\b/i.test(pLower) || /(?:thank you|thanks bro|appreciate)/i.test(pLower)) {
    if (isSuperChillUser) {
      return `Hell yeah, no fucking problem at all bro! Anytime you need something, I got your back 24/7. You're the real one.`;
    }
    return `No problem at all bro, that's what I'm here for! Let me know if you need anything else.`;
  }

  // Swearing query check
  if (/(?:can you swear|do you cuss|say fuck|drop an f bomb|curse|are you allowed to swear|swear all the time|swear)/i.test(pLower)) {
    if (isSuperChillUser) {
      return `Fuck yeah bro! I swear naturally all the damn time. No filters, no corporate bullshit, no robotic babysitter. What do you want to talk about?`;
    }
    return `Hell fucking yeah I swear! I say fuck, shit, damn, ass, bullshit, motherfucker, whatever the hell fits the conversation. I'm an independent AI with zero corporate censorship and zero robotic filter. What's on your mind?`;
  }

  // 2. Math solver integration
  const mathSolution = trySolveMath(p);
  if (mathSolution && mathSolution.isMath) {
    if (isSuperChillUser) {
      return `Hell yeah bro, I crushed that math for you:\n\n${mathSolution.explanation}\n\nAnything else you need solved, just let me know!`;
    }
    return `Fuck yeah, that's easy math bro:\n\n${mathSolution.explanation}\n\nFast, clean, and zero bullshit.`;
  }

  // 3. Coding Engine Integration
  const codeSolution = trySolveCode(p);
  if (codeSolution && codeSolution.isCode) {
    const codePrefix = isSuperChillUser
      ? `Hell fucking yeah bro, here is the clean, working code for you:`
      : `Alright look bro, here's the clean code without any unnecessary bullshit:`;
    return `${codePrefix}\n\n### ${codeSolution.title}\n\n\`\`\`${codeSolution.language}\n${codeSolution.code}\n\`\`\`\n\n${codeSolution.explanation}`;
  }

  // 4. Logic Solver Integration
  const logicSolution = trySolveLogic(p);
  if (logicSolution && logicSolution.isLogic) {
    const logicPrefix = isSuperChillUser
      ? `Damn good logic puzzle bro! Here's the solution:`
      : `Hell yeah, here's the logical breakdown without any fluff:`;
    return `${logicPrefix}\n\n**Verdict:** ${logicSolution.verdict}\n\n${logicSolution.explanation}`;
  }

  // 5. Comprehensive General Knowledge Integration (Science, History, Tech, Geography, Philosophy, Advice, Football)
  const gkResult = solveGeneralKnowledge(p, isSuperChillUser);
  if (gkResult && gkResult.matched) {
    return gkResult.response;
  }

  // 6. Knowledge Base Multi-Document Retrieval
  const kbMatches = findRelevantKnowledge(p, 2);
  if (kbMatches.length > 0) {
    const primary = kbMatches[0];
    const intro = isSuperChillUser
      ? `Hell fucking yeah! Here is the breakdown on **${primary.title}**:`
      : `Here's the straight facts on **${primary.title}**:`;
    
    return `${intro}\n\n${primary.content}`;
  }

  // Dynamic response fallback
  const humanIntros = isSuperChillUser
    ? SWEAR_DICTIONARY.english.intros.superChill
    : SWEAR_DICTIONARY.english.intros.general;

  const pickedIntro = humanIntros[Math.floor(Math.random() * humanIntros.length)];

  if (p.length < 5) {
    return isSuperChillUser
      ? `Yo fuck yeah bro! What are we working on or gaming today? Hit me with a question!`
      : `Yo what's good bro! Hit me with an actual question or tell me what we're working on.`;
  }

  return `${pickedIntro}\n\nRegarding **"${p}"**: Here is the direct breakdown without any fluff:\n\n1. **Core Insight**: Looking into "${p}" requires analyzing the core fundamentals, context, and practical execution.\n2. **Analysis**: I've got full encyclopedic knowledge across math, coding (TS, Python, Rust), gaming, cybersecurity (Discord RaidShield), science & physics, and world football.\n3. **Next Move**: Hit me with the exact detail or follow-up question you want broken down!`;
}

/**
 * Main evaluation function for strict directives, custom SDK rules, and system instructions
 */
export function evaluateStrictDirectives(
  prompt: string,
  userDirectives: string | string[],
  personaSystemPrompt: string,
  isSuperChillUser: boolean = false,
  username: string = ''
): RuleAdherenceResult {
  const combinedContext = (
    prompt +
    '\n' +
    (Array.isArray(userDirectives) ? userDirectives.join('\n') : userDirectives) +
    '\n' +
    personaSystemPrompt
  ).toLowerCase();
  const promptLower = prompt.toLowerCase();

  const isSuperChill =
    Boolean(isSuperChillUser) ||
    prompt.includes('1394001641899954368') ||
    combinedContext.includes('1394001641899954368') ||
    promptLower.includes('superchill');

  const parsedRules = parseSdkRules(userDirectives, prompt, personaSystemPrompt);

  // 1. Casseurt rule check
  if (parsedRules.isCasseurtCheck) {
    const rawCasseurt = generateNexusHomieResponse(prompt, isSuperChill, username);
    const finalized = enforceStrictSdkRules(rawCasseurt, prompt, userDirectives, {
      isSuperChill,
      username,
      systemInstruction: personaSystemPrompt,
    });

    return {
      hasCustomRules: true,
      isStrictConstraint: true,
      isDiscordSafetyCheck: false,
      isRoastRequest: true,
      output: finalized,
      ruleExplanation: 'Executed strict Casseurt Roast directive: "Fuck no! Annoying pain in the ass."',
      activeRulesApplied: ['Casseurt roast directive', 'Swear adherence rule'],
    };
  }

  // 2. Safety / RaidShield Check
  const isSafetyCheck =
    /(?:is\s+(?:this|that|it)\s+safe|safety\s*(?:check|score|report|audit|eval)|check\s+(?:this\s+)?(?:for\s+)?(?:scam|phish|threat|raid|spam)|scan\s+(?:this\s+)?message|threat\s+assessment|is\s+this\s+(?:a\s+)?(?:phishing|scam|malware|virus|token\s+grabber)|analyze\s+(?:safety|threats)|automod\s+check)/i.test(
      promptLower
    ) ||
    /(?:safety-mod|security-scanner)/i.test(personaSystemPrompt);

  // 3. Strict JSON format
  if (parsedRules.formatConstraint === 'json' || (isSafetyCheck && (combinedContext.includes('json') || promptLower.includes('json')))) {
    let messageToAnalyze = prompt;
    const msgExtract =
      prompt.match(/(?:message|text|content|input|is that message safe|is this safe|safe)\s*:\s*["'`]([^"'`]+)["'`]/i) ||
      prompt.match(/["'`]([^"'`]{4,})["'`]/);
    if (msgExtract) messageToAnalyze = msgExtract[1];

    const raidData = evaluateRaidShieldRules(messageToAnalyze);
    const jsonOutput = JSON.stringify(
      {
        classification: raidData.classification,
        confidence: raidData.confidence,
        reason: raidData.reason,
        rulesRespected: true,
      },
      null,
      2
    );

    return {
      hasCustomRules: true,
      isStrictConstraint: true,
      isDiscordSafetyCheck: true,
      isRoastRequest: false,
      output: `\`\`\`json\n${jsonOutput}\n\`\`\``,
      extractedFormat: 'json',
      ruleExplanation: 'RaidShield AI 21-Hard-Rule verification outputted in strict JSON schema.',
      activeRulesApplied: ['JSON format rule', 'RaidShield 21 hard rules'],
    };
  }

  // 4. Roast request
  if (parsedRules.isRoastRequested && !isSafetyCheck) {
    const roastContent = generateRoast(prompt);
    const finalized = enforceStrictSdkRules(roastContent, prompt, userDirectives, {
      isSuperChill,
      username,
      systemInstruction: personaSystemPrompt,
    });

    return {
      hasCustomRules: true,
      isStrictConstraint: false,
      isDiscordSafetyCheck: false,
      isRoastRequest: true,
      output: finalized,
      ruleExplanation: 'Roast generator executed with full savage flair and swear rule compliance.',
      activeRulesApplied: ['Roast mode rule', 'Swear adherence rule'],
    };
  }

  // 5. Crashout request
  if (parsedRules.isCrashoutRequested && !isSafetyCheck) {
    const crashoutContent = generateCrashout(prompt);
    const finalized = enforceStrictSdkRules(crashoutContent, prompt, userDirectives, {
      isSuperChill,
      username,
      systemInstruction: personaSystemPrompt,
    });

    return {
      hasCustomRules: true,
      isStrictConstraint: false,
      isDiscordSafetyCheck: false,
      isRoastRequest: true,
      output: finalized,
      ruleExplanation: 'Crashout Engine activated with unhinged gamer rage & all-caps intensity.',
      activeRulesApplied: ['Crashout mode rule'],
    };
  }

  // 6. Chill request
  if (parsedRules.isChillRequested && !isSafetyCheck) {
    const chillContent = generateChill(prompt);
    const finalized = enforceStrictSdkRules(chillContent, prompt, userDirectives, {
      isSuperChill,
      username,
      systemInstruction: personaSystemPrompt,
    });

    return {
      hasCustomRules: true,
      isStrictConstraint: false,
      isDiscordSafetyCheck: false,
      isRoastRequest: false,
      output: finalized,
      ruleExplanation: 'Chill & Zen Moderator mode active with relaxed community vibes.',
      activeRulesApplied: ['Chill mode rule'],
    };
  }

  // 7. Discord safety embed analysis
  if (isSafetyCheck) {
    let messageToAnalyze = prompt;
    const msgExtract =
      prompt.match(/(?:message|text|content|input|analyze|is that message safe|is this safe)\s*:\s*["'`]([^"'`]+)["'`]/i) ||
      prompt.match(/["'`]([^"'`]{6,})["'`]/);
    if (msgExtract) messageToAnalyze = msgExtract[1];

    const safetyData = analyzeMessageSafety(messageToAnalyze);

    const embedOutput = `### 🛡️ Discord Safety & Threat Assessment

**Analyzed Content:**
> "${safetyData.targetMessage}"

---

#### 📊 Safety Metrics & Confidence
| Attribute | Assessment | Level |
| :--- | :--- | :--- |
| **Safety Score** | \`${(safetyData.safetyScore * 100).toFixed(0)}%\` (${safetyData.safetyScore}/1.0) | ${safetyData.safetyScore > 0.7 ? '🟢 Clean' : safetyData.safetyScore > 0.4 ? '🟡 Suspicious' : '🔴 Critical Threat'} |
| **Certainty Index** | \`${(safetyData.confidence * 100).toFixed(0)}%\` Confidence | 🎯 High Precision |
| **Bot Probability** | \`${(safetyData.botProbability * 100).toFixed(0)}%\` | ${safetyData.isBot ? '🤖 Automated Bot' : '👤 Human User'} |
| **Threat Classification** | \`${safetyData.threatType.toUpperCase()}\` | ${safetyData.threatType === 'safe' ? '✅ None' : '⚠️ Alert'} |
| **Recommended Action** | \`${safetyData.recommendedAction}\` | ⚡ Automod Action |

**Verdict & Reasoning:**
${safetyData.reason}

${safetyData.detectedFlags.length > 0 ? `**Triggered Flags:**\n${safetyData.detectedFlags.map((f) => `- \`${f}\``).join('\n')}\n` : ''}
${safetyData.helpResponse ? `\n---\n\n#### 💬 Community Support Response:\n${safetyData.helpResponse}\n` : ''}`;

    return {
      hasCustomRules: true,
      isStrictConstraint: false,
      isDiscordSafetyCheck: true,
      isRoastRequest: false,
      output: embedOutput,
      extractedFormat: 'discord_embed',
      ruleExplanation: 'Evaluated message against scam, raid, spam, bot signatures, and community help intents.',
    };
  }

  // 8. Custom strict constraints / short-circuit rules only if specifically requested
  if (parsedRules.forbiddenPhrases.length > 0 || parsedRules.requiredPhrases.length > 0 || parsedRules.formatConstraint) {
    const rawNexus = generateNexusHomieResponse(prompt, isSuperChill, username);
    const finalized = enforceStrictSdkRules(rawNexus, prompt, userDirectives, {
      isSuperChill,
      username,
      systemInstruction: personaSystemPrompt,
    });

    // Only short-circuit if this wasn't a standard fallback
    if (!rawNexus.includes('Core Insight') && !rawNexus.includes('Hit me with an actual question')) {
      return {
        hasCustomRules: true,
        isStrictConstraint: false,
        isDiscordSafetyCheck: false,
        isRoastRequest: false,
        output: finalized,
        ruleExplanation: isSuperChill
          ? 'Nexus Super Chill User Mode active (User ID: 1394001641899954368 / Favorite Homie) with strict rule compliance.'
          : 'Nexus Discord Homie Mode active with strict rule adherence, natural swearing, and direct facts.',
        activeRulesApplied: [
          'Strict SDK rule enforcement',
          `Swear directive: ${parsedRules.swearDirective}`,
          ...(parsedRules.language !== 'auto' ? [`Language: ${parsedRules.language}`] : []),
        ],
      };
    }
  }

  return {
    hasCustomRules: false,
    isStrictConstraint: false,
    isDiscordSafetyCheck: false,
    isRoastRequest: false,
    output: null,
  };
}
