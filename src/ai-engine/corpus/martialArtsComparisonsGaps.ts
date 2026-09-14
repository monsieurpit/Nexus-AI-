import { KnowledgeItem } from '../../types';

// Batch 305 corpus fixes — martial arts "what's the difference between X and Y" topics.
// Zero prior dedicated corpus coverage of martial arts styles (only a general boxing/MMA
// overview existed in otherSports.ts plus one boxing-vs-kickboxing octagon correction in
// sportsConceptsGaps4.ts) — 17/25 misses, in line with other brand-new zero-coverage domains.
// Failure patterns: wrong-domain trivia dumps (kung fu vs karate spiraled into "The Legend of
// Bruce Lee" TV series trivia; wing chun vs kung fu spiraled into the 1970s "Kung Fu" TV show
// starring David Carradine), severe cut-offs mid-comparison (aikido/judo, sumo/freestyle
// wrestling, freestyle/Greco-Roman, hard/soft martial arts, submission/knockout, self-defense/
// competitive martial arts all got cut off before ever finishing or even starting the second
// half of the comparison), one-sided answers (kenpo vs karate only explained karate; kendo vs
// fencing only explained fencing; Filipino martial arts vs Japanese sword arts dismissed the
// Japanese side as "polite bullshit" with zero actual explanation), an outright wrong-domain
// dodge (karate vs taekwondo answered a completely different kickboxing-vs-taekwondo question),
// and two fabricated factual distinctions (claimed dojang is a "small" hall vs a bigger dojo —
// they're just the Korean and Japanese words for the same concept; claimed gi and keikogi are
// two different garments — "gi" is simply the common shortened form of "keikogi", same uniform).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Sports',
  keywords,
  content,
  createdAt: now,
});

export const MARTIAL_ARTS_COMPARISONS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-martialarts-karate-vs-taekwondo',
    'Karate vs taekwondo',
    ['karate', 'taekwondo', 'difference karate taekwondo'],
    "Karate is an Okinawan/Japanese striking art (developed in the Ryukyu Kingdom under Chinese martial arts influence) that gives roughly equal emphasis to hand strikes (punches, knife-hands, elbow strikes) and kicks, favoring linear, direct techniques and a hard, focused style (kime) delivered from stable, rooted stances. Taekwondo is a Korean martial art and Olympic sport (since 2000) that's overwhelmingly kick-dominant — the vast majority of scoring techniques are kicks, including fast, high, spinning, and jumping kicks, with hand strikes used far less than in karate. Both use prearranged forms (kata in karate, poomsae in taekwondo) and belt ranking systems. The key difference: karate splits its emphasis fairly evenly between hand strikes and kicks using linear, hard technique, while taekwondo is built overwhelmingly around fast, high, and often spinning or jumping kicking techniques, with hand strikes playing a much smaller role.",
  ),
  k(
    'kb-gap-martialarts-bjj-vs-traditional-jiujitsu',
    'Brazilian jiu-jitsu vs traditional Japanese jiu-jitsu',
    ['brazilian jiu-jitsu', 'bjj', 'japanese jiu-jitsu', 'jujutsu', 'difference bjj traditional jiu-jitsu'],
    "Traditional Japanese jiu-jitsu (jujutsu) is a broad, centuries-old system developed by samurai as an unarmed or lightly-armed backup to their weapons — it includes joint locks, throws, strikes, chokes, and defenses against armed attackers, and is traditionally practiced mostly through prearranged, choreographed kata rather than full-resistance live sparring, since many techniques (eye gouges, small-joint breaks) are too dangerous to spar at full speed. Brazilian jiu-jitsu (BJJ) descends from Japanese jujutsu via judo — Mitsuyo Maeda, a judoka, taught it to the Gracie family in Brazil in the early 1900s, and they evolved it into a system specialized almost entirely around ground grappling (newaza): controlling an opponent through positions and chaining submissions (chokes, joint locks), refined constantly through live, full-resistance sparring (\"rolling\"), with far less emphasis on strikes or standing throws than the parent art. The key difference: traditional Japanese jiu-jitsu is a broad battlefield-derived system covering strikes, throws, locks, and weapon defense taught mainly through choreographed kata, while BJJ specializes almost exclusively in ground grappling and submissions, sharpened through live full-resistance sparring.",
  ),
  k(
    'kb-gap-martialarts-aikido-vs-judo',
    'Aikido vs judo',
    ['aikido', 'judo', 'difference aikido judo'],
    "Both aikido and judo descend from Japanese jujutsu, but they diverged in purpose. Judo, founded by Jigoro Kano, is a competitive Olympic sport centered on throws (nage-waza) and ground pins/submissions (katame-waza), practiced with live resistance (randori) and scored tournament matches — the goal is to win against a resisting opponent. Aikido, founded by Morihei Ueshiba, is explicitly non-competitive — there are no tournaments or matches — and focuses on blending with an attacker's momentum and redirecting their own force back against them using joint locks and circular throws, trained cooperatively rather than with full resistance, with a philosophy centered on neutralizing an attack without excessive harm. The key difference: judo is a competitive combat sport with live-resistance sparring and tournaments built around throws and ground control, while aikido is a non-competitive art with no tournaments, focused on blending with and redirecting an attacker's energy through cooperative practice.",
  ),
  k(
    'kb-gap-martialarts-kungfu-vs-karate',
    'Kung fu vs karate',
    ['kung fu', 'karate', 'difference kung fu karate'],
    "Kung fu (or gongfu/wushu) is an umbrella term covering hundreds of distinct Chinese martial arts styles — from hard, external styles like Shaolin kung fu to soft, internal ones like tai chi and baguazhang, each with its own techniques, forms, and philosophy — so 'kung fu' doesn't refer to one single fighting system. Karate is one specific, standardized martial art that developed in the Ryukyu Kingdom (Okinawa), itself historically shaped by Chinese martial arts brought over through trade, and later systematized into a codified style with fixed kata, belt rankings, and largely linear, hard striking technique. The key difference: kung fu is a broad umbrella term for many distinct Chinese martial arts styles, while karate is one specific, standardized Okinawan/Japanese striking art with its own codified forms and belt system.",
  ),
  k(
    'kb-gap-martialarts-wingchun-vs-kungfu',
    'Wing chun vs kung fu',
    ['wing chun', 'kung fu', 'difference wing chun kung fu'],
    "'Kung fu' is the broad umbrella term for the entire family of Chinese martial arts — it isn't one specific style, it's the category. Wing chun is one particular style within that category: a southern Chinese close-quarters system built around centerline theory (controlling the shortest, most direct line to your opponent), rapid simultaneous trapping and striking with the hands, and tools like the wooden dummy (muk yan jong) for solo practice — famously the style Bruce Lee trained in before developing Jeet Kune Do. The key difference: kung fu is the general umbrella term covering hundreds of Chinese martial arts styles, while wing chun is one specific style within that umbrella, known for its close-range trapping, centerline theory, and rapid hand strikes.",
  ),
  k(
    'kb-gap-martialarts-sumo-vs-freestyle-wrestling',
    'Sumo wrestling vs freestyle wrestling',
    ['sumo wrestling', 'freestyle wrestling', 'difference sumo freestyle wrestling'],
    "Sumo is a traditional Japanese sport fought in a circular ring (the dohyo) where the goal is simply to force your opponent out of the ring or make any part of their body other than the soles of their feet touch the ground — there are no weight classes at all (rikishi can weigh anywhere from under 100kg to over 200kg), matches are often decided in mere seconds, and the sport is steeped in Shinto ritual (salt throwing, ceremonial stomping) before each bout. Freestyle wrestling is an Olympic combat sport contested on a mat, organized into strict weight classes, where wrestlers score points for takedowns, exposures, and near-falls (or win outright by pinning both of an opponent's shoulders to the mat), and — unlike Greco-Roman wrestling — competitors are allowed to attack, grab, and trip using the legs as well as the upper body. The key difference: sumo is a ringed, no-weight-class sport won by pushing an opponent out of a circle or making them touch the ground, while freestyle wrestling is a weight-classed mat sport won by pins or points from takedowns, with attacks allowed anywhere on the body including the legs.",
  ),
  k(
    'kb-gap-martialarts-freestyle-vs-greco-roman',
    'Freestyle wrestling vs Greco-Roman wrestling',
    ['freestyle wrestling', 'greco-roman wrestling', 'difference freestyle greco-roman'],
    "Freestyle and Greco-Roman are the two Olympic/amateur wrestling styles, both governed internationally by United World Wrestling (UWW), and both are won by pinning an opponent's shoulders to the mat (a fall) or by scoring more points through takedowns and exposures within the time limit. The defining rule difference is what you're allowed to attack: in Greco-Roman wrestling, competitors cannot attack or use their legs at all — no leg grabs, no trips, no leg-based takedowns, only upper-body holds and throws are legal. In freestyle wrestling, there's no such restriction — wrestlers can grab, trip, and attack the legs as well as the upper body, giving it a much wider range of takedown techniques. The key difference: Greco-Roman wrestling bans any use or attack of the legs, restricting the match to upper-body holds and throws, while freestyle wrestling allows leg attacks and trips in addition to upper-body techniques.",
  ),
  k(
    'kb-gap-martialarts-black-belt-vs-brown-belt',
    'Black belt vs brown belt',
    ['black belt', 'brown belt', 'difference black belt brown belt'],
    "In the kyu/dan ranking system used by most Japanese- and Korean-derived martial arts (karate, judo, taekwondo, BJJ, etc.), belts progress downward in kyu number as a student advances (e.g. from a high kyu number toward 1st kyu), with brown belt typically being the final kyu rank — the stage right before black belt — signaling that a student has largely mastered the fundamental techniques, forms, and skills of the style and is being prepared for black belt testing. Black belt (1st dan / shodan) marks the transition out of the kyu (colored-belt/student) ranks entirely and into the dan (degree) ranks — it doesn't mean 'mastery' of the art so much as certification that the fundamentals have been thoroughly learned, and black belt itself has further degrees (2nd dan, 3rd dan, etc.) a practitioner continues earning afterward. The key difference: brown belt is the final rank within the colored-belt/kyu student progression, showing near-complete grasp of the fundamentals, while black belt marks the transition into the dan ranks, certifying the fundamentals are mastered and opening the path to further black-belt degrees.",
  ),
  k(
    'kb-gap-martialarts-dojo-vs-dojang',
    'Dojo vs dojang',
    ['dojo', 'dojang', 'difference dojo dojang'],
    "Dojo (道場, 'place of the way') is the Japanese word for a martial arts training hall, used for arts like karate, judo, aikido, and kendo. Dojang (도장) is the Korean word for the exact same concept — a martial arts training hall — used for arts like taekwondo and hapkido. They are not different sizes or tiers of facility; they're simply the Japanese and Korean terms, respectively, for the same idea, each tied to the language and cultural tradition of the martial arts practiced there. The key difference: dojo and dojang aren't different types of training space at all — they're just the Japanese and Korean words for the same thing, a dedicated martial arts training hall.",
  ),
  k(
    'kb-gap-martialarts-kata-vs-poomsae',
    'Kata vs poomsae (forms)',
    ['kata', 'poomsae', 'hyeong', 'forms martial arts', 'difference kata poomsae'],
    "Kata is the Japanese term (used in karate, and versions exist in judo and kendo too) for a prearranged, choreographed sequence of techniques — strikes, blocks, stances, movements — performed solo against imaginary opponents to build technique, timing, and muscle memory, and often graded as part of belt testing. Poomsae (also romanized hyeong or called teul) is the Korean equivalent term, used in taekwondo and other Korean martial arts, referring to the same underlying concept: a set, memorized sequence of moves practiced alone. The two terms describe essentially the same training tool, just named in different languages tied to different martial arts traditions, and each specific kata or poomsae has its own name and fixed sequence. The key difference: kata is the Japanese term (karate) and poomsae/hyeong is the Korean term (taekwondo) for the same core concept — a prearranged solo sequence of techniques practiced to develop form and muscle memory.",
  ),
  k(
    'kb-gap-martialarts-hard-vs-soft',
    'Hard martial arts vs soft martial arts',
    ['hard martial arts', 'soft martial arts', 'external internal martial arts', 'difference hard soft martial arts'],
    "Hard (or 'external') martial arts styles meet force with force — they favor direct, linear strikes and blocks, muscular power, and stopping an incoming attack head-on; traditional karate, Tang Soo Do, and Shaolin-style kung fu are commonly classed as hard styles. Soft (or 'internal') martial arts styles instead emphasize yielding to and redirecting an opponent's force rather than opposing it directly, using circular movements, minimal muscular tension, and leverage/timing over raw power; aikido, tai chi, and internal kung fu styles like baguazhang and xingyi are commonly classed as soft styles. Many practitioners note the line isn't always absolute — some styles blend both approaches — but the core distinction holds. The key difference: hard martial arts meet an opponent's force directly with linear, powerful techniques, while soft martial arts yield to and redirect that force using circular, flowing movement rather than opposing it head-on.",
  ),
  k(
    'kb-gap-martialarts-gi-vs-keikogi',
    'Gi vs keikogi',
    ['gi', 'keikogi', 'dogi', 'martial arts uniform', 'difference gi keikogi'],
    "There isn't actually a meaningful difference here — 'gi' and 'keikogi' refer to the exact same thing: the traditional uniform worn in Japanese-derived martial arts. 'Keikogi' (稽古着) literally means 'practice clothes,' and 'gi' is simply the common, shortened, colloquial way people refer to it in everyday speech (the fuller, more formal term is also sometimes 'dōgi'). Different arts attach their own prefix to specify the style — judogi for judo, karategi for karate, aikidogi for aikido — but all of these are still just variants of the same keikogi/gi concept, not two separate garments worn together. The key difference: there isn't one — 'gi' is just the shortened, everyday name for 'keikogi,' both referring to the same martial arts training uniform, not two different pieces of clothing.",
  ),
  k(
    'kb-gap-martialarts-submission-vs-knockout',
    'Submission vs knockout in combat sports',
    ['submission', 'knockout', 'ko', 'tap out', 'difference submission knockout'],
    "A knockout (KO) ends a fight through strikes — a fighter is hit hard enough (usually a strike to the head) that they're rendered unable to continue, typically knocked unconscious or unable to beat a referee's count (a 10-count in boxing), and the fight is stopped immediately and involuntarily on their behalf. A submission ends a fight through grappling, not strikes — a fighter voluntarily 'taps out' (physically tapping the mat or their opponent) or verbally concedes after being caught in a joint lock (which threatens to hyperextend or break a joint) or a chokehold (which threatens to cut off blood or air), choosing to concede rather than risk serious injury or unconsciousness. The key difference: a knockout is an involuntary stoppage caused by strikes rendering a fighter unable to continue, while a submission is a voluntary concession by a fighter caught in a joint lock or choke, tapping out to avoid injury rather than being physically unable to continue.",
  ),
  k(
    'kb-gap-martialarts-selfdefense-vs-competitive',
    'Self-defense training vs competitive martial arts',
    ['self-defense training', 'competitive martial arts', 'sport martial arts', 'difference self-defense competitive martial arts'],
    "Self-defense training focuses on preparing someone for realistic, unpredictable real-world violence — it has no rule set, may cover multiple attackers, weapons awareness, and de-escalation, and prioritizes quickly ending a dangerous situation and getting to safety by any effective means, rather than following a fair or agreed-upon format. Competitive martial arts (sport martial arts) train within a fixed rule set against a single, similarly-trained opponent in a controlled environment — matches have weight classes, referees, legal/illegal technique lists, and scoring systems, and the goal is to win a contest under agreed conditions rather than survive an unpredictable attack. Many martial arts (like judo, BJJ, and taekwondo) offer both a self-defense-oriented curriculum and a separate competitive sport format. The key difference: self-defense training prepares someone for unpredictable, ruleless real-world violence, while competitive martial arts train someone to win within a fixed, refereed rule set against a comparably trained opponent.",
  ),
  k(
    'kb-gap-martialarts-kenpo-vs-karate',
    'Kenpo vs karate',
    ['kenpo', 'kempo', 'karate', 'difference kenpo karate'],
    "Kenpo (also spelled kempo, especially American Kenpo as developed by Ed Parker) blends techniques and principles drawn from multiple traditions — Chinese kung fu and Japanese/Okinawan karate among them — and emphasizes rapid, continuous combinations of strikes ('continuous flow') targeting an attacker in quick succession, built explicitly around practical, modern self-defense scenarios rather than a single fixed lineage. Karate is a more standardized, traditional Okinawan/Japanese striking art with a codified set of kata, a formal belt ranking system, and a general emphasis on focused, powerful individual strikes (kime) delivered from disciplined stances, rather than kenpo's rapid-fire combination approach. The key difference: kenpo blends techniques from multiple traditions into fast, continuous strike combinations geared toward practical self-defense, while karate is a more standardized traditional style built around codified kata and focused, individually powerful strikes.",
  ),
  k(
    'kb-gap-martialarts-kendo-vs-fencing',
    'Kendo vs fencing',
    ['kendo', 'fencing', 'difference kendo fencing'],
    "Kendo is a modern Japanese martial art derived from samurai swordsmanship, practiced with a bamboo sword (shinai) and protective armor (bōgu covering the head, torso, and forearms), where points are scored by striking specific, designated target areas — the head (men), wrist (kote), torso (dō), or a thrust to the throat (tsuki) — with proper form, spirit, and follow-through. Fencing is a Western Olympic sport with three distinct weapon disciplines — foil, épée, and sabre — each using a thin, flexible metal blade and each with its own valid target area and rules (foil and sabre score only on specific body zones with 'right of way' rules; épée allows hits anywhere on the body), with touches registered electronically rather than judged by referees alone. The key difference: kendo is based on Japanese sword-cutting technique, using a bamboo sword and armor with strikes limited to specific target zones, while fencing is a Western sport using thin metal blades across three separate weapon disciplines, each with its own distinct target area and electronically scored touches.",
  ),
  k(
    'kb-gap-martialarts-kali-vs-japanese-sword-arts',
    'Filipino martial arts (Kali/Eskrima) vs Japanese sword arts',
    ['kali', 'eskrima', 'arnis', 'filipino martial arts', 'japanese sword arts', 'kenjutsu', 'iaido', 'difference kali japanese sword arts'],
    "Kali (also called Eskrima or Arnis) is a family of Filipino martial arts built around weapons first — practitioners typically train with rattan sticks and training blades before ever learning empty-hand technique, on the theory that weapon skill transfers naturally to unarmed combat. It emphasizes fluid, improvisational, two-handed (ambidextrous) flow drills like sinawali, rapid angle-based striking patterns, and disarms, adapting quickly to whatever's in the practitioner's hands. Traditional Japanese sword arts — kenjutsu (swordsmanship broadly) and iaido (the art of drawing and cutting in one fluid motion) — are built specifically around the katana, rooted in samurai tradition and the bushido code, and are trained through highly formalized, precise, prescribed kata rather than free-flowing improvisation, with heavy emphasis on correct form, posture, and mental discipline. The key difference: Kali/Eskrima trains fluidly and improvisationally with sticks and blades, translating directly into empty-hand combat, while traditional Japanese sword arts are highly formalized, kata-based systems built specifically around the katana and rooted in samurai tradition.",
  ),
];
