import { KnowledgeItem } from '../../types';

// Batch 2026-09-29 — newer slang that had zero coverage in either the slang lexicon or the corpus
// ("unc", "clanker", "sybau", "lock in", "crash out", "aura farming", "chat is this real"). Real
// server traffic uses "unc" ("is Casseurt officially unc?"). Category 'Slang' on purpose: per
// isSlangGlossaryMisfire (reasoningEngine.ts) these only ever ground an answer to an actual
// "what does X mean" question, never a message that merely uses the word.
export const SLANG_NEWER_2025: KnowledgeItem[] = [
  {
    id: 'kb-slang-unc-twin-gng',
    title: 'Slang: Unc, Unc Status, Twin, Gng, Bro',
    category: 'Slang',
    keywords: ['unc meaning', 'what does unc mean', 'unc status', 'officially unc', 'unc slang', 'twin meaning slang', 'gng meaning', 'what does twin mean'],
    content: `"Unc" (short for uncle) is slang for someone who's getting older or acting old — out of touch with trends, complaining about their back, going to bed early, or referencing things younger people don't know. "He's officially unc" or "unc status" jokingly means someone has aged out of being young and cool, often said about people in their late 20s or 30s, or teasingly about anyone who does something "old" (like using Facebook or not knowing a new meme). It can also be affectionate, like a respected older guy. "Twin" is used for a close friend or someone who looks, acts or thinks just like you ("hru twin", "you're my twin fr"). "Gng" is short for "gang," meaning your friends ("wsg gng"). "Bro," "bruh" and "my guy" are casual ways to address a friend.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-slang-clanker',
    title: 'Slang: Clanker (Anti-Robot/AI Slang)',
    category: 'Slang',
    keywords: ['clanker meaning', 'what does clanker mean', 'clanker slang', 'clankers', 'clanker star wars', 'anti ai slang'],
    content: `"Clanker" is a joking slur-style insult for robots and AI, originally from Star Wars: The Clone Wars, where clone troopers called battle droids "clankers." It went viral in 2025 as people used it to mock AI chatbots, delivery robots, humanoid robots and AI-generated content ("get this clanker out of here"). It's mostly used humorously, riffing on the idea of humans vs machines, though some pointed out that a lot of the memes built on it copied the structure of real-world slurs, which made them controversial. An AI chatbot being called a clanker is basically being told "you're just a machine."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-slang-sybau-lock-in',
    title: 'Slang: SYBAU, Lock In, Locked In, Crash Out',
    category: 'Slang',
    keywords: ['sybau meaning', 'what does sybau mean', 'lock in meaning', 'locked in meaning', 'crash out meaning', 'crashing out meaning', 'crashout slang', 'what does crash out mean'],
    content: `"SYBAU" is an abbreviation for "shut your b*tch ass up," a blunt (usually joking, sometimes hostile) way to tell someone to be quiet; a common add-on is "sybau ts pmo" ("this sh*t pisses me off"). "Lock in" means to focus completely and get serious — "time to lock in" before an exam, a game or the gym; someone who is "locked in" is fully concentrated, while "unlocked" jokingly means distracted. "Crash out" means to lose your temper and act impulsively or recklessly in anger — an angry outburst, often with regrettable decisions ("he crashed out over a video game"); a "crashout" is someone who does this or the outburst itself. It can also mean falling asleep suddenly ("I crashed out at 9"), but in current slang the angry meaning dominates.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-slang-aura-farming-chat',
    title: 'Slang: Aura Farming, Chat Is This Real, Chopped, Tuff, Big Back',
    category: 'Slang',
    keywords: ['aura farming meaning', 'what is aura farming', 'chat is this real meaning', 'chopped meaning', 'what does chopped mean', 'tuff meaning', 'big back meaning', 'aura points'],
    content: `"Aura farming" means deliberately doing something to look cool, mysterious or impressive — posing, acting calm and unbothered, or a dramatic move — to gain "aura" (a joking score of how cool someone seems). It went mainstream in 2025 with a viral clip of a boy dancing coolly on the front of a racing boat in Indonesia. "Chat, is this real?" comes from streamers talking to their live chat, and is now said jokingly in real life when something seems unbelievable. "Chopped" means ugly or unattractive (the opposite of looking good), or that something is ruined. "Tuff" is a misspelling of "tough" used to mean cool or impressive ("that fit is tuff"). "Big back" is a joking insult for someone who eats a lot or is always thinking about food.`,
    createdAt: Date.now(),
  },
];
