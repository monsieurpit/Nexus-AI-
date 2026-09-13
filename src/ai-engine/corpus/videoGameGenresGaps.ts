import { KnowledgeItem } from '../../types';

/**
 * VIDEO_GAME_GENRES_GAPS — batch 263 corrections. Video game genre/technical
 * terminology turned out to be a major weak spot for nexus-4b (16 misses out
 * of 25 — on par with automotive/home-DIY as the worst categories tested).
 * nexus-4b handled well: roguelike/roguelite, metroidvania/platformer, PvP/PvE,
 * battle royale/deathmatch, tower defense/base building, ray tracing/
 * rasterization, ping/FPS, procedural generation/handcrafted design. Misses:
 * - JRPG/WRPG, open world/sandbox, soulslike/traditional ARPG, dedicated
 *   server/P2P, and game engine/framework all explained only the FIRST half
 *   of the pair and got cut off before ever contrasting the second.
 * - "MOBA vs RTS" was a full web-dump list of every genre, never actually
 *   contrasting the two.
 * - "hitbox vs hurtbox" defined hitbox vaguely and never mentioned hurtbox.
 * - "frame data vs input lag" conflated both with a THIRD, unrelated concept
 *   ("frame drops"/stutter).
 * - "beat 'em up vs hack and slash" used Street Fighter/Tekken (1v1 FIGHTING
 *   games) as examples of "beat 'em up" — wrong genre entirely, a beat 'em up
 *   is a side-scrolling brawler vs hordes of enemies (Streets of Rage, Double
 *   Dragon), not a 1v1 fighter.
 * - "coop vs versus multiplayer" and "demo vs early access" and "DLC vs
 *   expansion pack" were all pure web-search dumps (Xbox 360 System Link
 *   list, Sims 4 expansion count, an unrelated indie game description).
 * - "patch vs hotfix" hallucinated BICYCLE TIRE REPAIR ("vulcanising rubber",
 *   patching an inner tube) for a software terminology question.
 * - "remaster vs remake" contradicted itself, citing "Final Fantasy VII
 *   Remake" as an example while defining "remaster."
 * - "frame rate vs resolution" never once mentioned resolution (pixel count),
 *   talking only about frame drops and server tick rate instead.
 * - "speedrun vs time attack" defined speedrun using tool-assisted-speedrun
 *   (TAS) rules as if that were the general definition, and never explained
 *   time attack (an in-game timed mode with its own leaderboard) at all.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'gaming', keywords, content, createdAt: now,
});

export const VIDEO_GAME_GENRES_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-vgg-jrpg-vs-wrpg',
    'JRPG vs WRPG',
    [
      'difference between a jrpg and a wrpg', 'jrpg japanese role playing game final fantasy persona dragon quest turn based combat linear story',
      'wrpg western role playing game skyrim baldurs gate mass effect open ended choice and consequence character creation',
      'wrpg usually lets you build your own character from scratch with heavy dialogue choices and multiple endings',
    ],
    `A JRPG (Japanese Role-Playing Game — Final Fantasy, Persona, Dragon Quest) is built around a fixed, pre-written protagonist and a linear, story-driven narrative you follow rather than shape; combat is traditionally turn-based or menu-based, and the appeal is the crafted story, characters, and world.

A WRPG (Western RPG — Skyrim, Baldur's Gate, Mass Effect, Fallout) usually lets YOU build your own character from scratch (race, class, appearance, stats) and emphasizes open-ended choice and consequence: branching dialogue, multiple endings, and quests that can often be solved several different ways. Combat is more commonly real-time or tactical rather than turn-based.

The rule of thumb: JRPGs hand you a story to experience with characters already written for you; WRPGs hand you a world and let you decide who your character is and how the story goes, with far more player agency over the outcome. Neither rule is absolute anymore (some JRPGs use real-time combat, some WRPGs are linear), but it's the classic distinction.`,
  ),
  k(
    'kb-gap-vgg-moba-vs-rts',
    'MOBA vs RTS',
    [
      'difference between a moba and an rts game', 'moba multiplayer online battle arena league of legends dota 2 you control one hero character on a fixed map with two lanes and a base',
      'rts real time strategy starcraft age of empires you control an entire army build a base gather resources and command many units at once',
      'moba is a genre that evolved out of custom rts maps like defense of the ancients',
    ],
    `An RTS (Real-Time Strategy — StarCraft, Age of Empires, Command & Conquer) has you controlling an ENTIRE ARMY: gathering resources, building a base, researching upgrades, and commanding potentially dozens of units at once, all viewed from above in real time. The whole economic/military management is the game.

A MOBA (Multiplayer Online Battle Arena — League of Legends, Dota 2) strips that down to controlling just ONE hero character on a fixed, symmetrical map (usually three lanes and a jungle) alongside a team of other players each controlling their own single hero. There's no base-building or resource-gathering economy to manage — you focus entirely on leveling up and fighting with your one character to destroy the enemy's base.

Historically, the MOBA genre literally evolved OUT of RTS games — Dota started as a custom player-made map/mod inside Warcraft III (an RTS), stripping the base-building down to just hero combat, and that spun off into its own genre.`,
  ),
  k(
    'kb-gap-vgg-open-world-vs-sandbox',
    'Open world vs sandbox game',
    [
      'difference between an open world game and a sandbox game', 'open world game has a large explorable map and a set narrative story and quests to complete like red dead redemption or the witcher',
      'sandbox game has no fixed goals or story minimal structure focuses on giving the player tools to create and experiment freely like minecraft in creative mode or garrys mod',
      'sandbox emphasizes player driven freeform creativity over narrative',
    ],
    `An OPEN WORLD game (Red Dead Redemption, The Witcher 3, Grand Theft Auto) gives you a large, freely explorable map, but it's still built around a set STORY with defined quests, characters, and usually an intended endpoint — you're free to wander, but there's a narrative structure guiding what you're meant to do.

A SANDBOX game (Minecraft in creative mode, Garry's Mod, The Sims without much story mode) has little to no fixed story or win condition at all — it just hands you a set of TOOLS and systems and lets you create, build, or experiment however you want, with your own goals entirely self-directed rather than authored by the game.

Plenty of games mix both (Grand Theft Auto has an open-world story AND sandbox-style freeform chaos on the side), but the core distinction is: open world = a big explorable space wrapped around an authored story, sandbox = freeform tools with no required story at all.`,
  ),
  k(
    'kb-gap-vgg-hitbox-vs-hurtbox',
    'Hitbox vs hurtbox',
    [
      'difference between a hitbox and a hurtbox', 'a hitbox is the area around an attack that deals damage if it overlaps an opponent it is the offensive collision zone',
      'a hurtbox is the area around a character that can be hit and take damage it is the defensive vulnerable zone',
      'when an attacking hitbox overlaps a defending hurtbox a hit registers fighting games',
    ],
    `A HITBOX is the invisible shape attached to an ATTACK — a punch, a sword swing, a bullet — that represents where that attack can deal damage. It's the OFFENSIVE side of a collision: if a hitbox touches an opponent, that opponent takes damage.

A HURTBOX is the invisible shape attached to a CHARACTER'S BODY that represents where they can actually BE HIT and take damage. It's the DEFENSIVE side: it's the target, not the weapon.

A hit registers when an attacking player's HITBOX overlaps a defending player's HURTBOX. This distinction matters a lot in fighting games and action games for balance — a character might have a small hurtbox (hard to hit) but a huge hitbox on their attacks (easy to hit others with), or vice versa, and moves that make your hurtbox temporarily disappear entirely are called "invincibility frames" (i-frames).`,
  ),
  k(
    'kb-gap-vgg-frame-data-vs-input-lag',
    'Frame data vs input lag',
    [
      'difference between frame data and input lag', 'frame data in a fighting game is the number of frames a move takes to start up how long it stays active and how long you are vulnerable during recovery',
      'input lag is the delay between pressing a button on your controller and that action actually appearing on screen caused by hardware or network',
      'not the same as frame drops or fps stutter which is a performance issue',
    ],
    `FRAME DATA (mainly a fighting-game term) is the precise timing breakdown of a specific move, measured in FRAMES (a 60fps game has 60 frames per second): how many frames it takes to START UP before it hits, how many frames it stays ACTIVE and able to hit, and how many frames of RECOVERY you're stuck in afterward before you can act again. Players study frame data to know which move beats which in a trade, and whether a move is "safe" (opponent can't punish your recovery) or "unsafe."

INPUT LAG is completely different: it's the DELAY between the moment you physically press a button and the moment that action actually happens on screen, caused by things like your controller, TV/monitor processing, or network latency in an online match. High input lag makes a game feel unresponsive regardless of what the frame data of any given move says.

Neither of these is the same as "frame drops" or "stutter," which is a PERFORMANCE problem — the game's frame rate briefly dipping below its target, causing visibly choppy motion — a hardware/optimization issue, not a design or network one.`,
  ),
  k(
    'kb-gap-vgg-beat-em-up-vs-hack-and-slash',
    'Beat em up vs hack and slash',
    [
      'difference between a beat em up and a hack and slash game', 'a beat em up is a side scrolling brawler where you walk through a level fighting waves of many weak enemies at once like streets of rage double dragon final fight',
      'not street fighter or tekken those are 1v1 fighting games a completely different genre',
      'a hack and slash focuses on fast combo based melee combat against large numbers of enemies often with more RPG or action elements like devil may cry or dynasty warriors',
    ],
    `A BEAT 'EM UP (Streets of Rage, Double Dragon, Final Fight, Teenage Mutant Ninja Turtles arcade games) is a SIDE-SCROLLING brawler: you walk your character across a 2D-ish level, fighting through waves of many weak enemies at once as you go, usually with a small moveset (punch, kick, jump, maybe a grab). Note: 1-on-1 fighting games like Street Fighter or Tekken are a COMPLETELY DIFFERENT genre — those are "fighting games," not beat 'em ups, even though they also involve fighting.

A HACK AND SLASH (Devil May Cry, God of War, Dynasty Warriors, Diablo in some classifications) focuses on fast, combo-driven melee combat, often against large numbers of enemies at once too, but usually with a much deeper combo/skill system, more mobility, RPG-style leveling, and often a 3D action-adventure structure rather than a strict 2D side-scrolling corridor.

The overlap is real (both throw lots of weak enemies at you), but beat 'em ups are the older, simpler 2D side-scrolling brawler tradition, while hack-and-slash games are the more mechanically deep, usually 3D descendants with combo systems and character progression.`,
  ),
  k(
    'kb-gap-vgg-soulslike-vs-action-rpg',
    'Soulslike vs traditional action RPG',
    [
      'difference between a soulslike and a traditional action rpg', 'soulslike dark souls elden ring brutal difficulty stamina management death sends you back and you lose your currency unless you recover it',
      'traditional action rpg diablo baldurs gate skyrim generally more forgiving less punishing death penalties frequent saves easier difficulty options',
      'soulslikes have interconnected worlds sparse checkpoints and deliberately punishing combat as a defining feature',
    ],
    `A SOULSLIKE (Dark Souls, Elden Ring, Sekiro, and their many imitators) is defined by DELIBERATE, punishing difficulty as a core design pillar: a stamina bar that limits how much you can attack/dodge/block, sparse checkpoints (bonfires), dying sends you back to the last checkpoint and drops your currency at the death spot (which you lose for good if you die again before recovering it), and combat that demands learning enemy attack patterns precisely rather than button-mashing through them.

A TRADITIONAL ACTION RPG (Diablo, Skyrim, Baldur's Gate 3) is generally far more forgiving — frequent or free saving, easier adjustable difficulty options, death usually just costs you a bit of time or a small penalty rather than losing progress/currency, and combat is often more about build/gear optimization than precise pattern-learning under pressure.

Both are "action RPGs" broadly (real-time combat plus character stats/leveling/gear), but soulslikes deliberately turn up the difficulty and punishment for failure as their whole identity, while traditional action RPGs prioritize accessibility and letting players of many skill levels enjoy the story/loot/build systems.`,
  ),
  k(
    'kb-gap-vgg-coop-vs-versus-multiplayer',
    'Co-op vs versus multiplayer',
    [
      'difference between coop and versus multiplayer', 'cooperative coop multiplayer means players work together on the same team against the game itself ai enemies or a shared objective like left 4 dead or it takes two',
      'versus multiplayer means players compete directly against each other for a win like call of duty deathmatch or street fighter one on one',
      'coop is players versus the game versus mode is players versus each other',
    ],
    `CO-OP (cooperative) multiplayer means players are all on the SAME team, working together against the game itself — shared enemies, a shared objective, a shared win or loss condition. Left 4 Dead, It Takes Two, and most raid content in online RPGs are co-op: everyone succeeds or fails together.

VERSUS multiplayer means players are competing directly AGAINST each other for a win — one side's win is the other side's loss. Call of Duty deathmatch, Street Fighter 1v1 matches, and most battle royales are versus modes.

The simplest way to remember it: co-op is players vs. the GAME, versus is players vs. EACH OTHER. Some games offer both modes (Left 4 Dead has a versus mode where one team plays the infected), but the core distinction is always about who you're actually trying to beat.`,
  ),
  k(
    'kb-gap-vgg-demo-vs-early-access',
    'Demo vs early access',
    [
      'difference between a demo and early access', 'a demo is a small free trial slice of a game usually one level or a time limit meant to show off a finished or nearly finished game before its release',
      'early access means the full game is not finished yet and you pay for it now while it is still in active development receiving updates over time steam early access',
      'demo doesnt cost anything early access costs the full or near full price for an incomplete game',
    ],
    `A DEMO is a small, FREE trial slice of a game — often just one level, an area, or a time-limited session — released to show off a game that is finished or nearly finished, purely as a preview/marketing tool before the full release. You don't pay for a demo, and it doesn't change or grow over time.

EARLY ACCESS means the game ISN'T finished yet, but you can pay (often the full or near-full price) to play it right now, while the developers keep actively adding content, fixing bugs, and changing things based on player feedback — the game is expected to change significantly before its official "1.0" release. Popular examples: Baldur's Gate 3 spent years in early access, as did Hades and countless Steam indie titles.

So the core difference is: a demo is a free preview of something already basically done, while early access is a paid purchase of something still actively being built, with the expectation that you're playing (and often helping test) an unfinished product.`,
  ),
  k(
    'kb-gap-vgg-patch-vs-hotfix',
    'Patch vs hotfix (software, not bicycle repair)',
    [
      'difference between a patch and a hotfix in video games software', 'this is about software updates not bicycle tire repair or vulcanizing rubber',
      'a patch is a planned larger update released on a schedule that can add new content balance changes and fix multiple bugs at once often requiring a full download and restart',
      'a hotfix is a small urgent fix pushed out quickly usually for one specific critical bug or exploit sometimes applied without even needing a client restart',
    ],
    `In software/gaming, a PATCH is a planned, usually larger update released on a set schedule (weekly, monthly, or per-season) that can bundle together new content, balance/design changes, and fixes for multiple bugs at once. It's usually announced in advance with patch notes, and often requires downloading a file and restarting the game.

A HOTFIX is a small, URGENT fix pushed out as fast as possible, usually targeting just ONE specific critical bug, crash, or exploit that can't wait for the next scheduled patch — think a game-breaking glitch or an item that's letting players duplicate currency. Hotfixes are often deployed server-side with little or no warning, and sometimes don't even require players to restart their game or re-download anything, especially in online games where the fix lives on the server.

The core distinction: a patch is planned and can contain a lot of changes; a hotfix is an emergency, narrowly-targeted fix deployed as quickly as possible outside the normal update schedule.`,
  ),
  k(
    'kb-gap-vgg-dlc-vs-expansion-pack',
    'DLC vs expansion pack',
    [
      'difference between dlc and an expansion pack', 'dlc downloadable content is a broad umbrella term for any extra paid or free content added after release cosmetic skins a few extra levels a season pass',
      'an expansion pack is a specific large type of dlc that adds a substantial amount of new content new story areas mechanics or hours of gameplay comparable to a mini sequel',
      'all expansion packs are dlc but not all dlc is an expansion pack',
    ],
    `DLC (downloadable content) is the broad umbrella term for basically ANY extra content added to a game after its initial release — this covers everything from a $2 cosmetic skin, to a few extra weapons, to a whole extra story chapter. DLC varies hugely in size and price.

An EXPANSION PACK is a specific, LARGER type of DLC — a substantial addition that adds hours of new content: new story campaigns, new zones/maps, new mechanics or systems, sometimes almost amounting to a mini-sequel (think World of Warcraft expansions, or The Witcher 3's Blood and Wine). Expansion packs are usually priced higher than typical DLC because of how much content they add.

So the relationship is: every expansion pack IS a form of DLC, but not all DLC is big enough to be called an expansion pack — a $3 cosmetic pack is DLC but nobody would call it an expansion.`,
  ),
  k(
    'kb-gap-vgg-remaster-vs-remake',
    'Remaster vs remake',
    [
      'difference between a remaster and a remake', 'a remaster takes the original games existing assets and code and improves the technical presentation higher resolution textures better frame rate same gameplay and content unchanged',
      'a remake rebuilds the game largely from scratch with new assets new engine and can change gameplay mechanics story pacing or content while keeping the same basic story and characters',
      'final fantasy vii remake is a remake built from scratch not a remaster',
    ],
    `A REMASTER takes the ORIGINAL game's existing assets and code and touches them up: higher-resolution textures, a smoother frame rate, maybe some quality-of-life fixes — but the core content, gameplay, and everything about the game stays fundamentally the same. It's a technical polish job on the existing thing, not a rebuild.

A REMAKE rebuilds the game largely FROM SCRATCH — new engine, new assets, and often changed gameplay mechanics, pacing, or added content — while keeping the same basic story and characters. Final Fantasy VII Remake is the classic example: it's a full ground-up rebuild in a modern engine with real-time action combat replacing the original's turn-based system, not just a visual touch-up of the 1997 game.

Simple test: if it's basically "the same game, but prettier and smoother," it's a remaster. If it's "rebuilt from the ground up and can meaningfully play differently," it's a remake.`,
  ),
  k(
    'kb-gap-vgg-frame-rate-vs-resolution',
    'Frame rate vs resolution',
    [
      'difference between frame rate and resolution', 'frame rate fps frames per second measures how many images the game displays per second higher fps means smoother motion',
      'resolution measures how many pixels make up the image on screen width by height like 1920x1080 or 4k 3840x2160 higher resolution means a sharper more detailed picture',
      'a game can have high resolution but low frame rate or vice versa they are independent settings',
    ],
    `FRAME RATE (measured in FPS, frames per second) is how many individual images the game displays every second — a higher frame rate (60fps, 120fps) means smoother, more fluid-looking motion; a lower one (30fps) looks choppier, especially during fast movement or camera pans.

RESOLUTION is a completely different measurement: how many PIXELS make up the image, expressed as width × height (1920×1080 = "1080p", 3840×2160 = "4K"). Higher resolution means a sharper, more detailed picture with finer visual detail, independent of how smoothly it's moving.

The two are independent settings that both cost graphics processing power, which is why consoles/PCs often offer a choice between them — a "performance mode" (lower resolution, higher frame rate, smoother but less sharp) versus a "quality/fidelity mode" (higher resolution, lower frame rate, sharper but less smooth). You can have a gorgeous 4K image running at a choppy 30fps, or a smooth 60fps image at a blurrier 1080p — they're not the same axis at all.`,
  ),
  k(
    'kb-gap-vgg-dedicated-server-vs-p2p',
    'Dedicated server vs peer-to-peer hosting',
    [
      'difference between a dedicated server and peer to peer hosting', 'a dedicated server is a separate computer run by the game company or a host that all players connect to independently nobody in the match is hosting it',
      'peer to peer p2p hosting means one of the players own console or pc acts as the host for that match and everyone else connects to that players machine',
      'if the host player in p2p disconnects or has bad internet the whole match can lag or end host migration',
    ],
    `A DEDICATED SERVER is a separate computer — usually run by the game's publisher or a hosting company, sitting in a data center — that ALL players connect to independently. No individual player is "hosting" the match; the server just processes the game and relays information between everyone equally, which generally gives more stable, fair connections since it doesn't depend on any one player's internet or hardware.

PEER-TO-PEER (P2P) hosting means one of the actual PLAYERS' own consoles or PCs acts as the host for that match, and everyone else connects to that player's machine instead of a separate server. This is cheaper for the game company to run, but it means the match's quality depends on that one player's internet connection and hardware — if the host has bad internet, everyone in the match can lag, and if the host disconnects entirely, the match can suffer a "host migration" (picking a new host on the fly) or just end.

Bigger competitive/esports titles almost always use dedicated servers for fairness; many smaller or older multiplayer games use P2P to save on server costs.`,
  ),
  k(
    'kb-gap-vgg-speedrun-vs-time-attack',
    'Speedrun vs time attack',
    [
      'difference between a speedrun and a time attack', 'a speedrun is a community driven challenge of completing any game as fast as possible using any legitimate strategy glitches skips and routes decided by players not the game itself',
      'a time attack is a mode built into the game itself with its own timer rules and leaderboard usually for a specific level or track like in racing games or arcade games',
      'tool assisted speedrun tas uses save states and frame perfect input and is a separate specialized category not standard speedrunning',
    ],
    `A SPEEDRUN is a community-driven challenge: players decide, on their own, to complete a game (or a category within it) as fast as possible, often discovering and using glitches, skips, or unconventional routes the developers never intended. It's not a mode the game provides — it's a self-imposed challenge with rules set by the speedrunning community itself (e.g., "any%" allows any glitch, "100%" requires full completion). Tool-assisted speedruns (TAS), which use save-states and frame-perfect scripted input, are a separate, specialized category — NOT what a standard human speedrun looks like.

A TIME ATTACK is a MODE BUILT INTO THE GAME ITSELF, with its own built-in timer, ruleset, and leaderboard — usually for a specific level, track, or short segment (very common in racing games and arcade titles). It's an official, developer-provided feature, not a community challenge invented after the fact.

So: speedrunning is players challenging themselves on a whole game using their own rules and often exploits; time attack is an official in-game timed mode the developers built and designed for exactly that purpose.`,
  ),
  k(
    'kb-gap-vgg-game-engine-vs-framework',
    'Game engine vs game framework',
    [
      'difference between a game engine and a game framework', 'a game engine like unity or unreal is a complete all in one toolkit with a visual editor built in physics rendering pipeline audio and asset management ready to use out of the box',
      'a game framework like monogame libgdx or love2d is a lower level code library that gives you building blocks graphics rendering input handling but no visual editor and much more manual setup and coding required',
      'an engine is a finished product a framework is raw tools you assemble yourself',
    ],
    `A GAME ENGINE (Unity, Unreal Engine, Godot) is a COMPLETE, all-in-one toolkit: it comes with a visual editor, a built-in physics system, a rendering pipeline, audio tools, and asset management, all ready to use out of the box — you drag, drop, and configure far more than you code from scratch.

A GAME FRAMEWORK (MonoGame, libGDX, LÖVE) is a much LOWER-LEVEL code library: it gives you building blocks (a way to draw graphics, handle input, play sound) but no visual editor and no built-in physics or asset pipeline — you write far more code yourself and assemble the pieces manually rather than dragging them into a scene.

The simplest way to think about it: an engine is a mostly-finished workshop with all the machines already set up for you; a framework is a box of raw parts and tools you have to assemble into your own workshop first. Frameworks give more low-level control and are lighter-weight, but require significantly more manual coding than a full engine.`,
  ),
];
