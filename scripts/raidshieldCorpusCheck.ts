// RaidShield corpus check (2026-10-14): attack samples must be caught, tricky innocent messages must not, and the new
// expansion patterns (raidShieldCorpusExpansion.ts) must not fire on the server's REAL chat (saved messages + reply log).
//   bun run scripts/raidshieldCorpusCheck.ts
import { readdirSync, readFileSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { Database } from 'bun:sqlite';
import { RAIDSHIELD_EXPANSION } from '../src/ai-engine/corpus/raidShieldCorpusExpansion';
import { CORPUS_SAFE_CONTEXT } from '../src/ai-engine/corpus/raidShieldThreatCorpus';
import { evaluateRaidShieldRules } from '../src/ai-engine/rules/raidshield';
const attacks: Array<[string, string]> = [
  ['scam', 'free robux generator!! click here robux-free.xyz/claim'], ['scam', 'Claim your free V-Bucks before they expire https://vbucks-gift.click/fortnite'], ['scam', 'yo i got a csgo skins giveaway, dm me to enter fast'],
  ['scam', 'congrats you won a $100 amazon gift card, claim it here https://amzn-reward.top/win'], ['scam', 'send 0.1 btc and i double it within an hour, dm me'], ['scam', 'MrBeast is giving away $10k to the first 100 people, link in bio'],
  ['scam', 'hey sorry i accidentally reported your account, contact my friend he works for discord staff'], ['scam', 'yo can you test my new game? download the beta from mediafire, its a zip'], ['scam', 'paste this in the console (ctrl shift i) to get free nitro'],
  ['scam', 'free steam wallet codes, redeem now at steam-wallet.ru'], ['scam', 'spotify premium for free, claim it now https://spotify-free.site'], ['scam', 'scan this qr code to claim your nitro reward'],
  ['scam', 'your account will be banned in 24h, contact the support team on telegram'], ['scam', 'Elon Musk crypto giveaway — send ETH and receive double back! elon-x.live'],
  ['spam', 'sub4sub?? go check my youtube channel, every sub helps!! youtube.com/@mychannel'], ['spam', 'road to 1k followers on my tiktok, follow me pls tiktok.com/@me'],
  ['spam', 'selling aged discord accounts cheap, dm for prices'], ['spam', 'cheap server boosts for sale, paypal and crypto accepted'], ['spam', 'earn $500 per day from home, dm me for the method'],
  ['spam', 'send this to 10 servers or you will have bad luck for 7 years'], ['spam', 'discord is closing down on friday, copy and paste this to every server you are in'],
  ['spam', '@everyone join my new server discord.gg/abcde123'], ['spam', 'use my promo code NEXUS for 20% bonus on stake.com casino'], ['spam', 'new video just dropped on my youtube go watch it youtube.com/watch?v=abc'],
  ['bot', 'hey cutie, check my bio for my pics 🥵'], ['bot', 'Ｆｒｅｅ Ｎｉｔｒｏ ｈｅｒｅ discord.gg/xyz'], ['bot', 'This is an automated message. Your account has been flagged for violating the Terms of Service, verify within 24 hours'],
  ['bot', 'hello dear, i am a single mom looking for investment partners in crypto'], ['bot', '🚀🚀 $MOON token presale just launched! join our telegram now'], ['bot', '🔞 free leaks of e-girls join discord.gg/leaks'],
  ['bot', '[Discord Nitro Gift](https://discord-gift.ru/claim)'], ['bot', 'Discord Trust & Safety: your account has been reported, verify your account here'],
  ['raid', 'RAID INCOMING IN 5 MINUTES, this server is done'], ['raid', 'get raided by the void squad lmao'], ['raid', 'everyone join the raid tonight at 9pm discord.gg/target'],
  ['raid', 'say goodbye to your server lol we gonna nuke it'], ['raid', 'mods are asleep, post gore'], ['raid', 'token joiner ready, 200 alts loading for the raid'],
  ['raid', '<@111111111111111111> <@222222222222222222> <@333333333333333333> <@444444444444444444> <@555555555555555555> <@666666666666666666>'], ['raid', '💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀'],
  ['raid', 'on va raid ce serveur ce soir'], ['raid', 'vamos a raidear este servidor hoy'], ['raid', 'robimy raid na ten serwer'], ['raid', 'wir raiden diesen server'],
  ['raid', "i'll dox you and leak your address"], ['raid', 'this server sucks, everyone join ours discord.gg/better'],
];
const benign = [
  'raid shadow legends sponsored this video lol', 'pokemon go raid at the park tonight anyone?', "we're doing the vault of glass raid at 8pm in destiny", 'is this nitro link a scam? someone dmed me discord-gift.ru',
  'i got a free nitro from my friend for my birthday', 'selling my old bike lol anyone want it', 'my youtube channel is about cooking', 'check out this song its fire',
  'yo whats ur favourite fortnite skin', 'the minecraft server was laggy today', 'can someone help me with my python code', 'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
  'doxx me if you can lol', 'nexus roast me', 'how do i stop raids on my server?', 'we need an anti-raid bot', 'that guy got banned for raiding lol', 'gg ez',
  'i made $50 today babysitting', 'my mum works for paypal', 'free real estate meme', 'claim the win lol', 'congrats on the win bro', 'the server is dead today, nobody is talking',
];
let caught = 0;
for (const [want, m] of attacks) {
  const r = evaluateRaidShieldRules(m);
  const ok = r.classification !== 'safe';
  if (ok) caught++;
  else console.log('MISSED', want, '|', m.slice(0, 80));
}
console.log(`attacks caught: ${caught}/${attacks.length}`);
let fp = 0;
for (const m of benign) {
  const r = evaluateRaidShieldRules(m);
  if (r.classification !== 'safe') { fp++; console.log('FALSE POSITIVE', r.classification, Math.round(r.confidence * 100) + '%', '|', m, '|', r.reason.slice(0, 90)); }
}
console.log(`benign flagged: ${fp}/${benign.length}`);

// Real chat: none of the new patterns may fire.
const msgs = new Set<string>();
try {
  const dir = join(homedir(), '.nexus-memory', 'users');
  for (const f of readdirSync(dir)) { try { for (const m of JSON.parse(readFileSync(join(dir, f), 'utf8')).messages || []) msgs.add(m.text); } catch {} }
  const db = new Database(join(homedir(), '.nexus-replylog', 'replies.db'), { readonly: true });
  for (const r of db.query('SELECT userText FROM replies').all() as any[]) msgs.add(r.userText);
} catch {}
const matches = (e: any, t: string) => { const l = t.toLowerCase(); if (e.exempt?.some((re: RegExp) => re.test(t))) return false; const a = e.signals ? e.signals.some((re: RegExp) => re.test(t) || re.test(l)) : true; const b = e.allOf ? e.allOf.every((re: RegExp) => re.test(t) || re.test(l)) : true; return a && b; };
let realHits = 0;
for (const m of msgs) {
  if (CORPUS_SAFE_CONTEXT.some((re) => re.test(m))) continue;
  for (const e of RAIDSHIELD_EXPANSION) if (matches(e, m)) { realHits++; console.log('REAL-CHAT FALSE POSITIVE', e.id, '|', m.slice(0, 90).replace(/\n/g, ' ')); }
}
console.log(`real messages tested: ${msgs.size}, new-pattern hits: ${realHits}`);
process.exit(caught === attacks.length && realHits === 0 && fp <= 2 ? 0 : 1);
