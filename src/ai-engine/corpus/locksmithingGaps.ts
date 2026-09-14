import { KnowledgeItem } from '../../types';

// Batch 315 corpus fixes — locksmithing / physical lock & key mechanisms "what's the difference
// between X and Y" topics. Zero prior corpus coverage of this domain besides one lone item on
// pin tumbler locks — 22/26 misses, another near-zero-coverage domain. Several total wrong-domain
// hallucinations (strike plate answered as a geological fault plane, master/grand master key
// answered as a Discord auth token, cam/plunger lock and skeleton/bump key both answered with
// irrelevant Wikipedia web-search dumps about rifles/pistols/a Ben Stiller film, locksmith vs
// security consultant answered about ethical hacking), a factual error (lever lock described as
// "a weighted bar that pushes against the housing" — it's actually a set of pivoting levers lifted
// to precise heights by the key), and a pile of cut-off/dodged answers that only explained the
// first term and never contrasted the second (deadbolt/spring latch, rekey/replace, mortise/
// cylindrical, padlock/deadbolt, combination/keyed, electronic/smart lock, single/double cylinder
// deadbolt, IC core/standard, safe dial/electronic keypad, hasp/padlock).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Trivia',
  keywords,
  content,
  createdAt: now,
});

export const LOCKSMITHING_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-locksmith-deadbolt-vs-spring-latch',
    'Deadbolt vs spring latch bolt',
    ['deadbolt', 'spring latch bolt', 'difference deadbolt spring latch'],
    "A deadbolt is a solid, square-edged bolt that only moves when you deliberately turn a key or thumbturn — it has no spring, so it can't be pushed back by pressure or a shim (that's why it's called 'dead': nothing but a direct turn moves it), which makes it the main security bolt on a door. A spring latch bolt is completely different: it has a beveled (angled) edge and is spring-loaded, so the door can self-latch just by swinging shut (the angled bolt gets pushed in by the strike plate and pops back out once it clears it), and it's normally opened from inside just by turning the handle/lever, not a key. Because it's spring-loaded and angled, a spring latch can potentially be forced back with a thin shim or credit card ('loiding') — a deadbolt can't be, since there's no spring or bevel to exploit. The key difference: a deadbolt is a solid, non-spring-loaded security bolt that only moves via a deliberate key/thumbturn turn, while a spring latch bolt is a beveled, spring-loaded bolt that self-latches when the door closes and opens via handle — the deadbolt is for security, the latch is for everyday convenient closing.",
  ),
  k(
    'kb-gap-locksmith-rekeying-vs-replacing',
    'Rekeying a lock vs replacing a lock',
    ['rekeying a lock', 'replacing a lock', 'difference rekeying replacing lock'],
    "Rekeying a lock means changing the internal pin configuration inside the EXISTING lock hardware so a different key operates it — a locksmith removes the cylinder, swaps in a new set of pins cut to match a new key, and reassembles the same physical lock body; it's cheaper and faster, and instantly invalidates any old keys (useful after losing a key, moving into a new place, or firing an employee who had a copy). Replacing a lock means removing the entire lock hardware — cylinder, housing, sometimes the whole knob/deadbolt unit — and installing a brand new lock, which is necessary if the lock is damaged, worn out, too low-security, or you want a different style/brand entirely. The key difference: rekeying keeps the same physical lock but changes its pins so a new key works it, while replacing swaps out the entire lock hardware for a new unit — rekeying is the cheaper fix when the lock itself is fine and you just need old keys to stop working.",
  ),
  k(
    'kb-gap-locksmith-mortise-vs-cylindrical',
    'Mortise lock vs cylindrical (bored) lock',
    ['mortise lock', 'cylindrical lock', 'bored lock', 'difference mortise cylindrical lock'],
    "A mortise lock is a heavy-duty rectangular lock body installed into a pocket ('mortise') chiseled or routed into the edge of the door itself — it typically combines a latch and deadbolt into one solid unit, is common on older, commercial, or high-security doors, and is more expensive and labor-intensive to install because of the precise cutout required. A cylindrical lock (also called a 'bored' lock, the standard residential doorknob or lever set) is installed by simply drilling two round holes — one through the door face for the knob/lever mechanism, one through the door edge for the latch — making it much cheaper and faster to install, but generally less robust and lower-security than a mortise lock. The key difference: a mortise lock sits in a chiseled rectangular pocket in the door edge and is stronger/more complex, while a cylindrical (bored) lock is installed through two simple drilled holes and is the cheaper, more common residential option.",
  ),
  k(
    'kb-gap-locksmith-padlock-vs-deadbolt',
    'Padlock vs deadbolt',
    ['padlock', 'deadbolt lock', 'difference padlock deadbolt'],
    "A padlock is a detachable, portable lock with a curved shackle that isn't permanently fixed to a door — it's used through a hasp, chain link, or gate loop, and can be removed entirely and carried elsewhere or replaced without any modification to the door or frame. A deadbolt is a fixed lock mechanism installed directly INTO the door and frame — its solid bolt throws into a hole in the door jamb and it stays permanently mounted as part of the door hardware, never detaching. The key difference: a padlock is a portable, detachable lock used with a separate hasp or loop, while a deadbolt is a permanently installed bolt built into the door and frame itself.",
  ),
  k(
    'kb-gap-locksmith-skeleton-key-vs-bump-key',
    'Skeleton key vs bump key',
    ['skeleton key', 'bump key', 'difference skeleton key bump key'],
    "A skeleton key is a simplified, filed-down key used against old-style WARDED locks (a much older, simpler lock design with no pins at all — just fixed metal obstructions called 'wards' inside the lock body). The skeleton key's blade is cut thin/narrow enough to avoid every ward and directly rotate the lock's lever or bolt, since warded locks only check that the key AVOIDS obstructions, not that it matches a precise pin pattern. A bump key is a completely different, modern tool made for standard PIN TUMBLER locks: it's a normal-looking key blank cut to the maximum (lowest) depth at every single position, inserted one pin-position short of fully seated, then struck sharply ('bumped') with a mallet or the heel of a hand — the impact transfers kinetic energy through the bottom pins to briefly knock all the top pins above the shear line simultaneously, and slight rotational pressure applied at the same moment lets the plug turn during that brief window. The key difference: a skeleton key defeats old warded locks by physically avoiding their internal obstructions, while a bump key defeats modern pin tumbler locks by using an impact to momentarily jolt all the spring-loaded pins past the shear line at once.",
  ),
  k(
    'kb-gap-locksmith-tubular-vs-pin-tumbler',
    'Tubular lock vs standard pin tumbler lock',
    ['tubular lock', 'radial pin tumbler lock', 'difference tubular pin tumbler lock'],
    "A tubular lock (also called a radial pin tumbler lock) arranges its spring-loaded pins in a circular pattern around a round, hollow cylindrical keyway, instead of a single row — it's opened with a distinctive tubular key that looks like a short metal tube with notches cut around its rim, and is commonly used on vending machines, bike locks, elevators, and some high-security cabinets specifically because standard flat picks can't reach the circular pin arrangement (though a special tubular lock pick exists). A standard pin tumbler lock arranges its pins in a single straight row along a flat keyway, opened with an ordinary flat, single-sided or double-sided cut key — it's the type used on the vast majority of house and office doors. The key difference: a tubular lock arranges its pins in a circle around a round keyway and needs a tube-shaped key, while a standard pin tumbler lock arranges pins in a single row along a flat keyway and uses an ordinary flat key — they are NOT the same design, just both 'pin tumbler' mechanisms.",
  ),
  k(
    'kb-gap-locksmith-combination-vs-keyed',
    'Combination lock vs keyed lock',
    ['combination lock', 'keyed lock', 'difference combination keyed lock'],
    "A combination lock is opened by entering a specific sequence of numbers or letters — via a rotating dial, a set of wheels, or a keypad — with no physical key involved at all, which means there's nothing to lose or copy, but the combination has to be remembered (or can potentially be shared/guessed/observed). A keyed lock is opened with a physical, precisely cut key that matches the lock's internal mechanism (pins, levers, discs, or wards) — it can be duplicated at a hardware store or locksmith, lost, or picked, but doesn't require memorizing a code. The key difference: a combination lock opens via a memorized numeric/letter sequence with no physical key, while a keyed lock opens via a matching physical key that can be lost, copied, or picked but requires no memory.",
  ),
  k(
    'kb-gap-locksmith-electronic-vs-smart-lock',
    'Electronic lock vs smart lock',
    ['electronic lock', 'smart lock', 'difference electronic smart lock'],
    "An electronic lock is the broad category: any lock that uses electricity/a battery to control the bolt, typically opened via a keypad code, magnetic card, or fob — hotel room locks and basic keypad deadbolts are electronic locks, but they're usually standalone and don't connect to anything else. A smart lock is a specific SUBSET of electronic locks that adds wireless connectivity — Bluetooth, WiFi, or Z-Wave — letting you lock/unlock remotely from a phone app, see an activity log of every entry, issue and revoke temporary digital keys, get notifications, and integrate with a broader smart-home system (voice assistants, video doorbells, etc.), features a plain electronic keypad lock doesn't have. The key difference: 'electronic lock' just means battery/code-powered instead of purely mechanical, while 'smart lock' specifically means it also has wireless connectivity for remote control, logging, and smart-home integration — every smart lock is electronic, but not every electronic lock is smart.",
  ),
  k(
    'kb-gap-locksmith-single-vs-double-cylinder-deadbolt',
    'Single cylinder deadbolt vs double cylinder deadbolt',
    ['single cylinder deadbolt', 'double cylinder deadbolt', 'difference single double cylinder deadbolt'],
    "A single cylinder deadbolt has a keyhole on the OUTSIDE of the door only — the inside is operated by a simple thumbturn, so anyone inside the house can lock or unlock the door instantly without needing a key, which matters a lot for a quick exit in an emergency like a fire. A double cylinder deadbolt has a keyhole on BOTH sides — inside and outside — requiring a key to lock or unlock from either direction, which is sometimes installed on doors with glass panels near the lock (so a burglar can't smash the glass, reach in, and turn a thumbturn), but it's widely considered a fire-safety hazard because occupants need to find a key to get out, and many fire codes restrict or ban them on exit doors. The key difference: a single cylinder deadbolt uses a keyed cylinder outside and a free thumbturn inside, while a double cylinder deadbolt requires a key on BOTH sides — the double cylinder blocks the 'break the glass and reach in' attack but creates a fire-exit hazard.",
  ),
  k(
    'kb-gap-locksmith-lever-vs-pin-tumbler',
    'Lever lock vs pin tumbler lock',
    ['lever lock', 'pin tumbler lock', 'difference lever pin tumbler lock'],
    "A lever lock (common in older UK doors, cabinets, and safes) works completely differently from a pin tumbler lock: inside is a stack of flat, pivoting metal levers of different heights, each held by a spring, and each lever has a small notch ('gate') cut into it. The correct key has cuts of different depths that lift EACH lever to the EXACT precise height needed to bring all the gates into alignment in a straight line, letting a bolt-stump pass through the aligned gates and allowing the bolt to throw — if even one lever is lifted too high or too low, its gate stays out of line and blocks the bolt. A pin tumbler lock instead uses spring-loaded pin PAIRS in vertical channels around a rotating cylinder ('plug'); the correct key pushes each pin stack to the exact height where the gap between the top and bottom pin lines up with the shear line, letting the plug rotate. The key difference: a lever lock uses flat pivoting levers that must each be lifted to a precise height to align internal gates for a bolt-stump to pass through, while a pin tumbler lock uses spring-loaded pin stacks in a rotating cylinder that must align at a shear line — different internal mechanisms entirely, not variations of the same design.",
  ),
  k(
    'kb-gap-locksmith-disc-detainer-vs-pin-tumbler',
    'Disc detainer lock vs pin tumbler lock',
    ['disc detainer lock', 'pin tumbler lock', 'difference disc detainer pin tumbler lock'],
    "A disc detainer lock (used in many high-security padlocks, like Abloy) uses a stack of free-spinning circular discs instead of pins — each disc has a slot (a 'gate') cut at a specific rotational position, and the correct key rotates every disc to the exact angle needed so all the gates line up into a straight channel, letting a spring-loaded sidebar drop into that channel and allow the lock to open; it has no springs pushing pins up and down, just discs that must be rotated to precise angles, which makes disc detainer locks notably resistant to both standard picking and bumping. A pin tumbler lock is the completely different, far more common mechanism: vertical spring-loaded pin pairs that must be pushed UP to a specific height (not rotated) to align with a shear line. The key difference: a disc detainer lock uses rotating discs that must each turn to a precise ANGLE to align a sidebar-accepting channel, while a pin tumbler lock uses spring pins that must be pushed to a precise HEIGHT to align at a shear line — disc detainer is a rotational mechanism, pin tumbler is a vertical/linear one, and they are not the same thing as a car's disc brake.",
  ),
  k(
    'kb-gap-locksmith-keyway-vs-keyhole',
    'Keyway vs keyhole',
    ['keyway', 'keyhole', 'difference keyway keyhole'],
    "A keyway is the precise, specifically shaped internal channel cut into a lock cylinder that a key blade slides into — its exact cross-sectional profile (the pattern of grooves and ridges) determines which FAMILY of key blanks will even physically fit the lock, acting as a first filter before the pins ever come into play; different manufacturers and lock series use different keyway profiles so a random key won't even insert. A keyhole is the more general, informal term for the opening itself where a key goes in — it doesn't specify a precise internal profile, and is often used loosely (including for old warded locks with a simple large hole) rather than referring to the exact matched-profile channel a modern pin tumbler keyway is. The key difference: a keyway refers to the precisely profiled internal channel that determines which specific key blank family can even be inserted into a modern lock, while keyhole is the more general, informal term for the opening a key goes into.",
  ),
  k(
    'kb-gap-locksmith-picking-vs-bypassing',
    'Lock picking vs lock bypassing',
    ['lock picking', 'lock bypassing', 'difference lock picking bypassing'],
    "Lock picking works WITH the lock's intended mechanism: using a tension wrench to apply light rotational pressure on the plug plus a pick to push individual pins up one at a time to the shear line, essentially tricking the pin stack into behaving as if the correct key were inserted, until the plug can rotate normally. Lock bypassing skips the pin mechanism entirely — instead of manipulating pins at all, a bypass tool directly manipulates the bolt, latch, or cam itself (for example, sliding a thin shim alongside a spring-loaded latch to push it back, or using a comb pick/letterbox tool to reach in and turn a thumbturn or knob from the other side), opening the lock without ever engaging its internal pin logic. The key difference: picking manipulates the lock's own pins to fool it into opening as if with the right key, while bypassing ignores the pin mechanism completely and manipulates the bolt/latch/cam directly through a separate physical exploit.",
  ),
  k(
    'kb-gap-locksmith-shim-vs-pick',
    'Lock shim vs lock pick',
    ['lock shim', 'lock pick', 'difference lock shim pick'],
    "A lock shim is a thin, flexible piece of metal (or a purpose-made shim tool) slid ALONGSIDE a lock's moving parts — for example between a padlock's shackle and its locking mechanism, or beside a spring-loaded latch bolt — to physically push the locking piece out of the way directly, bypassing the internal pin/disc logic entirely rather than manipulating it. A lock pick is a thin metal tool inserted INTO the keyway itself, used together with a separate tension wrench, to individually push each pin up to the shear line the way the correct key's cuts would, actually engaging with and manipulating the lock's internal pin mechanism rather than avoiding it. The key difference: a shim is slid alongside the lock's hardware to directly bypass and push the locking piece out of the way, while a pick is inserted into the keyway to manipulate the internal pins one at a time so the lock opens as if the correct key were used — shimming bypasses the mechanism, picking works through it.",
  ),
  k(
    'kb-gap-locksmith-warded-vs-pin-tumbler',
    'Warded lock vs pin tumbler lock',
    ['warded lock', 'pin tumbler lock', 'difference warded pin tumbler lock'],
    "A warded lock is a much older, simpler lock design with NO pins or springs at all — instead, the lock case has fixed metal obstructions called 'wards' positioned inside it, and the correct key has a filed-down, skeleton-like shape cut specifically to slide past every ward without touching them, so it can reach and rotate the bolt or lever directly. Because a warded lock only checks that the key AVOIDS the obstructions (not that it precisely matches an internal code), it's very low security — a simple filed-down skeleton key, or even the wrong key with enough clearance, can often defeat it. A pin tumbler lock is a much more secure, modern design using spring-loaded pin stacks that must be pushed to the exact right height by the key's cuts to align at a shear line before the plug can turn — there are no fixed obstructions to dodge, just precisely calibrated spring pins. The key difference: a warded lock has no pins, just fixed internal obstructions a correctly-shaped key must avoid, while a pin tumbler lock has spring-loaded pins that must be pushed to a precise height by the key — warded locks are older and far less secure.",
  ),
  k(
    'kb-gap-locksmith-ic-core-vs-standard',
    'Interchangeable core (IC) lock vs standard lock',
    ['interchangeable core lock', 'standard lock', 'difference interchangeable core lock'],
    "An interchangeable core (IC) lock has a removable key-operated 'core' — the whole cylinder-and-pin assembly — that can be pulled out and swapped for a differently-keyed core in seconds using a special control key, without removing or disassembling any of the surrounding lock hardware (knob, deadbolt housing, etc.); this is widely used in commercial and institutional master-key systems because it lets a facilities team rekey a door almost instantly, on-site, without a locksmith visit. A standard (non-IC) lock has its pins fixed inside the cylinder itself, so rekeying it means a locksmith has to physically disassemble the cylinder, remove the old pins, and install new ones cut to a different key — a slower, more hands-on process that isn't meant to be done repeatedly on a whim. The key difference: an interchangeable core lock lets the entire key-operated core be swapped out in seconds with a control key, while a standard lock requires disassembling the cylinder and replacing individual pins to rekey it.",
  ),
  k(
    'kb-gap-locksmith-safe-dial-vs-electronic-keypad',
    'Safe dial lock vs safe electronic keypad lock',
    ['safe dial lock', 'safe electronic keypad lock', 'difference safe dial electronic keypad lock'],
    "A safe dial (mechanical combination) lock uses a stack of rotating wheels behind a dial — spinning the dial to a specific sequence of numbers lines up notches ('gates') on each wheel so a lever ('fence') can drop into the aligned gates and release the bolt; it needs no batteries or power at all, is purely mechanical, but does require precise manual dialing, and historically could be vulnerable to skilled manipulation ('safecracking' by feel or sound) if the wheel pack isn't well made. A safe electronic keypad lock instead uses a battery-powered circuit board: you enter a numeric code on a keypad, and if it matches, a solenoid or motor retracts the bolt — codes can typically be reprogrammed easily by the owner, some models log every entry attempt, but the lock stops working entirely if the battery dies (usually with an external 9V battery terminal as backup) and it's an electronic target rather than a purely mechanical one. The key difference: a dial lock is a purely mechanical wheel-pack mechanism needing no power but requiring precise manual dialing, while an electronic keypad lock is battery-powered, code-reprogrammable, and often logs entries but depends on working electronics.",
  ),
  k(
    'kb-gap-locksmith-strike-plate-vs-latch-plate',
    'Strike plate vs latch plate (faceplate)',
    ['strike plate', 'latch plate', 'faceplate lock', 'difference strike plate latch plate'],
    "This is about door hardware, not geology (a strike plate has nothing to do with strike-slip faults). A strike plate is the metal plate mortised into the DOOR FRAME (jamb) — it has a cutout hole that the latch bolt or deadbolt slides into when the door closes, and it reinforces the frame around that hole so the wood doesn't just splinter if someone kicks the door (a heavy-duty strike plate with long screws into the wall stud is a major forced-entry deterrent). A latch plate, more commonly called a faceplate, is the small metal plate on the EDGE of the door itself, covering the opening where the latch or bolt mechanism protrudes out of the lock body — it's cosmetic/protective on the door side, not the frame side. The key difference: a strike plate is mounted on the door frame with a hole the bolt enters and closes into, while a latch plate/faceplate is mounted on the door's own edge, covering where the bolt mechanism exits the lock body — one reinforces the frame, the other finishes the door edge.",
  ),
  k(
    'kb-gap-locksmith-master-key-vs-grand-master-key',
    'Master key vs grand master key',
    ['master key', 'grand master key', 'difference master key grand master key'],
    "This is about physical key systems, not a Discord account token. In a master key system, each individual lock has its own unique 'change key' that only opens that one door, but a single master key is also cut to operate every lock within that one defined group (say, every office on one floor). A grand master key sits a level HIGHER in the hierarchy: it operates across MULTIPLE separate master key groups at once — for example, one grand master key that can open every door in an entire building complex, where each individual floor or department has its own master key group underneath it. The key difference: a master key opens every lock within one defined group of locks (alongside each lock's own unique change key), while a grand master key opens across several separate master key groups at a higher level — grand master sits above master in the access hierarchy, not beside it.",
  ),
  k(
    'kb-gap-locksmith-cam-lock-vs-plunger-lock',
    'Cam lock vs plunger lock',
    ['cam lock', 'plunger lock', 'difference cam lock plunger lock'],
    "A cam lock has a flat metal arm (the 'cam') attached to the back of the cylinder that rotates when the correct key turns — the cam itself is what does the securing, swinging to catch behind a bracket or the edge of a panel; cam locks are the common lock type on cabinet doors, mailboxes, and drawers, where the cam simply hooks over the inside edge of the frame to hold it shut. A plunger lock works differently: it uses a spring-loaded pin (the 'plunger') that has to be physically pushed IN by inserting the key, and then the key is rotated so the plunger drops into notches cut into the key at the correct depth — plunger locks are common on vending machines, toolboxes, and roll-top desks. The key difference: a cam lock secures things by rotating a flat metal arm that hooks over a bracket, while a plunger lock secures things via a spring-loaded pin that must be pushed in by the key and then rotated into matching notches — different locking actions for different hardware.",
  ),
  k(
    'kb-gap-locksmith-hasp-vs-padlock',
    'Hasp vs padlock',
    ['hasp', 'padlock', 'difference hasp padlock'],
    "A hasp is a hinged metal fastener made of two parts: a flat hinged plate with a slotted, hinged arm (attached to one surface, like a shed door) that swings over a fixed staple or loop (attached to the other surface, like the door frame) — a hasp by itself doesn't lock anything at all, it just creates the aligned loop-and-slot that something else can be locked through. A padlock is the actual separate locking device — with a shackle and internal mechanism (pins, discs, or a combination wheel pack) — that gets threaded through the hasp's staple loop once the hasp is swung shut, and it's the padlock that actually prevents the hasp from being opened. The key difference: a hasp is just the hinged hardware that creates a loop for something to be locked through and provides no security on its own, while a padlock is the separate lock that's threaded through the hasp's loop to actually secure it — you need both together for the setup to work.",
  ),
  k(
    'kb-gap-locksmith-vs-security-consultant',
    'Locksmith vs security consultant',
    ['locksmith', 'security consultant', 'difference locksmith security consultant'],
    "This is about physical security trades, not ethical/white-hat computer hacking. A locksmith is a hands-on tradesperson who works directly with physical hardware: installing, repairing, and rekeying locks, cutting and duplicating keys, opening locks people are shut out of, and fitting new mechanical or electronic lock hardware on doors, cabinets, cars, and safes. A security consultant works at a higher, more strategic level: assessing overall risk for a building or organization, designing broader access-control strategy (which doors need what level of security, camera placement, visitor policies, alarm integration), and recommending what hardware and systems should be installed — but a security consultant often doesn't personally install or physically service any of the lock hardware themselves, instead advising and specifying what a locksmith or security-systems installer should then put in. The key difference: a locksmith physically installs, repairs, and services lock hardware hands-on, while a security consultant assesses risk and designs overall security strategy/policy, typically without doing the physical installation work themselves.",
  ),
];
