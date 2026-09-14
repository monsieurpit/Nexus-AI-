import { KnowledgeItem } from '../../types';

// Batch 299 corpus fixes — watches/horology "what's the difference between X and Y" topics.
// Brutal domain, 20/25 misses — comparable to the worst-ever batches (military, transport):
// horology had ZERO prior corpus coverage, causing the same pattern seen before with
// zero-coverage domains — massive Wikipedia-dump contamination (dive/field watch, horology/
// watchmaking, tourbillon, grandfather/mantel clock, jeweler/watchmaker, leather/metal bracelet
// — six separate pure trivia dumps that never actually answered the question asked), plus a
// severe wrong-domain hallucination (watch/clock answered with the METEOROLOGICAL meaning of
// "watch" — tornado watch — instead of the timepiece), a factual inversion (sapphire crystal
// described as glass and mineral crystal described as the natural/hard one — backwards), and a
// bizarre GPS-satellite hallucination glued onto an otherwise-correct quartz clock explanation.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Daily Life',
  keywords,
  content,
  createdAt: now,
});

export const WATCHES_HOROLOGY_COMPARISONS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-watches-automatic-vs-quartz',
    'Automatic watch vs quartz watch',
    ['automatic watch', 'quartz watch', 'difference automatic quartz watch'],
    "A quartz watch uses a battery to send electric current through a tiny quartz crystal, which vibrates at a precise, extremely stable frequency (32,768 times per second) when current passes through it; a circuit counts those vibrations to move the hands or drive a digital display with very high accuracy, needing a battery change every year or two but essentially no other maintenance. An automatic watch (a type of mechanical watch) has no battery or electronics at all — it's powered entirely by a coiled mainspring that stores energy and slowly releases it through a series of tiny gears to drive the hands, and instead of needing to be wound by hand, it has a weighted rotor inside that spins freely with the natural motion of your wrist as you wear it, continuously winding the mainspring for you. Automatic watches are generally far less accurate than quartz (losing or gaining several seconds a day is normal) and need regular wrist-wearing or a watch winder to stay running, but are prized for their mechanical craftsmanship. The key difference: quartz watches use a battery-powered vibrating crystal for high accuracy with minimal maintenance, while automatic watches are purely mechanical, powered by a mainspring kept wound by the natural motion of the wearer's wrist, trading accuracy for mechanical engineering.",
  ),
  k(
    'kb-gap-watches-mechanical-vs-automatic',
    'Mechanical watch vs automatic watch',
    ['mechanical watch', 'automatic watch', 'difference mechanical automatic watch'],
    "A mechanical watch is the broad category for any watch powered entirely by a wound mainspring and gear train rather than a battery or quartz crystal — this includes BOTH hand-wound ('manual') watches, which you must wind yourself regularly (usually daily) by turning the crown, AND automatic (self-winding) watches. An automatic watch is specifically a mechanical watch that additionally contains a weighted rotor that spins freely as you move your wrist, automatically winding the mainspring through everyday motion so you don't have to wind it by hand (though it can usually still be wound manually too, or after sitting unworn long enough to stop). The key difference: 'mechanical' is the umbrella term for any spring-and-gears watch, including manual-wind ones, while 'automatic' specifically refers to a mechanical watch that winds itself using a wrist-motion-driven rotor rather than requiring daily manual winding.",
  ),
  k(
    'kb-gap-watches-watch-vs-clock',
    'Watch vs clock',
    ['watch', 'clock', 'difference watch clock', 'timepiece'],
    "The core distinction between a watch and a clock (as timepieces, not weather alerts) is simply portability. A watch is a small, portable timepiece specifically designed to be worn on the body, almost always on the wrist (or historically carried in a pocket), built compact and durable enough to move around with the wearer all day. A clock is a larger timepiece meant to stay in a fixed place — mounted on a wall, sitting on a mantel, standing on the floor like a grandfather clock, or built into architecture like a tower clock — not designed to be worn or carried around. Both work using the exact same underlying timekeeping mechanisms (mechanical gears/springs, quartz crystals, or digital electronics), so the only real difference is portability and how it's meant to be used, not the technology inside. The key difference: a watch is a small, portable timepiece worn on the body, while a clock is a larger timepiece meant to stay stationary in one place — the underlying timekeeping technology can be identical in both.",
  ),
  k(
    'kb-gap-watches-pendulum-vs-quartz-clock',
    'Pendulum clock vs quartz clock',
    ['pendulum clock', 'quartz clock', 'difference pendulum quartz clock'],
    "A pendulum clock keeps time using a swinging weighted arm — because a pendulum of a given length always takes the same amount of time to complete one swing (a reliable physical property first exploited by Christiaan Huygens in 1656), that steady swinging regulates a gear train that moves the clock's hands. A quartz clock instead uses a small battery to run electric current through a tiny quartz crystal, which vibrates at an extremely precise, consistent frequency (32,768 times per second) due to quartz's piezoelectric properties; a circuit counts those vibrations to drive the clock's hands or digital display. Quartz clocks are significantly more accurate and don't need winding or careful leveling the way pendulum clocks do, which is why quartz became the dominant clock and watch technology from the mid-20th century onward — nothing about a quartz clock involves GPS satellites, that's an unrelated technology used for location, not timekeeping. The key difference: a pendulum clock uses the steady physical swing of a weighted arm to regulate its gears, while a quartz clock uses a battery-powered vibrating quartz crystal counted by an electronic circuit, and is generally far more accurate with no manual regulation needed.",
  ),
  k(
    'kb-gap-watches-water-resistant-vs-waterproof',
    'Water resistant vs waterproof watches',
    ['water resistant watch', 'waterproof watch', 'difference water resistant waterproof'],
    "'Water resistant' is the accurate, honest term used on virtually all watches that can handle some exposure to water, and it always comes with a specific rating (like 30m, 50m, or 100m, measured under controlled lab conditions, not necessarily real-world depth) telling you exactly how much exposure it can handle — a 30m rating might only survive rain or hand-washing, not swimming, while 100m+ can typically handle swimming and snorkeling. 'Waterproof' technically means completely impervious to water under ANY condition, no matter how deep or how long submerged — and because no consumer watch can truly guarantee that (seals degrade over time, gaskets wear, extreme pressure can defeat any watch), watch industry standards and regulators like the U.S. FTC actually prohibit manufacturers from legally labeling a watch 'waterproof' at all — only 'water resistant' with a specific numeric rating is accurate and permitted. The key difference: 'water resistant' is the accurate term with a specific rating showing how much water exposure a watch can handle, while 'waterproof' implies total imperviousness that no real watch can guarantee, which is why it isn't a legally accurate label.",
  ),
  k(
    'kb-gap-watches-movement-vs-caliber',
    'Watch movement vs watch caliber',
    ['watch movement', 'watch caliber', 'watch calibre', 'difference watch movement caliber'],
    "A watch movement (sometimes called the 'engine' of the watch) is the general term for the entire internal mechanism that actually makes a watch work — all the gears, springs, and components, whether mechanical or quartz/electronic, that measure time and drive the hands. A caliber (or calibre) is the specific name or model designation given to one particular movement design by its manufacturer — essentially that movement's unique 'make and model,' used to distinguish it from other movement designs that manufacturer or others have made (for example, the ETA 2824-2 or Rolex's caliber 3235 are each specific calibers, i.e., specific movement designs). A caliber is NOT the case or outer housing around the movement — the watch case is a completely separate part of the watch. The key difference: 'movement' is the general term for a watch's whole internal mechanism, while 'caliber' is the specific name/model designation identifying which particular movement design it is — every caliber is a movement, but 'movement' alone doesn't specify which design.",
  ),
  k(
    'kb-gap-watches-sapphire-vs-mineral-crystal',
    'Sapphire crystal vs mineral crystal watch face',
    ['sapphire crystal', 'mineral crystal', 'watch crystal', 'difference sapphire mineral crystal'],
    "A sapphire crystal is a synthetic, lab-grown crystal made of corundum — the same mineral as natural sapphire and ruby, but grown specifically for industrial use — and it's extremely hard (9 on the Mohs scale, just below diamond), making it highly scratch-resistant, though more brittle and prone to shattering on a hard impact; it's the most expensive option, used mainly on higher-end watches. A mineral crystal is essentially ordinary glass that's been specially hardened or tempered through heat or chemical treatment to be tougher than plain glass, but it's still much softer than sapphire and scratches far more easily over time, though it tends to resist shattering better than sapphire on impact and is significantly cheaper, making it common on mid-range and budget watches. Neither is a 'naturally occurring' mineral dug from the ground — both are manufactured materials engineered specifically for watch faces. The key difference: sapphire crystal is a lab-grown, extremely hard, scratch-resistant but more brittle synthetic crystal used on premium watches, while mineral crystal is hardened glass that's cheaper and more impact-resistant but scratches much more easily.",
  ),
  k(
    'kb-gap-watches-dive-vs-field-watch',
    'Dive watch vs field watch',
    ['dive watch', 'diver watch', 'field watch', 'difference dive field watch'],
    "A dive watch is purpose-built for underwater use — it's required to have a minimum water resistance of 100m/330ft to earn the 'diver's watch' designation under the ISO 6425 standard, and typically features a unidirectional rotating bezel (to track elapsed dive time, and which can only turn the safe direction if bumped), highly luminous markers and hands for visibility in dark water, a screw-down crown for a tighter seal, and a thicker, more robust case built to handle pressure. A field watch is instead built for rugged outdoor/military use on land — historically derived from watches issued to soldiers — and it prioritizes simplicity, legibility, durability, and light weight over specialized dive features: a plain, easy-to-read dial with clear numerals, a simple fixed bezel (no rotating timer function), a smaller, lighter case, and usually much more modest water resistance (often just enough to handle rain or splashes, not real diving). The key difference: a dive watch is built specifically for underwater use with high water resistance, a rotating timing bezel, and a sealed screw-down crown, while a field watch is built for rugged, simple, highly legible everyday land use without dive-specific features.",
  ),
  k(
    'kb-gap-watches-gmt-vs-dual-time',
    'GMT watch vs dual time watch',
    ['GMT watch', 'dual time watch', 'difference GMT dual time watch'],
    "A GMT watch is a specific type of watch complication that adds a fourth hand — a 24-hour hand that makes one full rotation per day — pointing to hour markers on a rotating (or fixed) 24-hour bezel, letting you read a second time zone at a glance alongside your regular 12-hour local time display; the name comes from its original purpose of tracking Greenwich Mean Time for pilots and travelers. A dual time watch (sometimes called a 'second time zone' watch) achieves a similar goal of showing two time zones at once, but typically does it differently, using a separate small sub-dial — rather than a single extra 24-hour hand and bezel — dedicated entirely to displaying the second time zone's hours and minutes independently. The key difference: both let you track two time zones at once, but a GMT watch typically uses one extra 24-hour hand read against a 24-hour bezel, while a dual time watch typically uses a separate dedicated sub-dial showing the second time zone.",
  ),
  k(
    'kb-gap-watches-manual-vs-self-winding',
    'Manual wind watch vs self-winding watch',
    ['manual wind watch', 'self-winding watch', 'automatic winding', 'difference manual self-winding watch'],
    "A manual wind watch has a mainspring that only gets wound one way: by hand, turning the crown regularly (usually daily) to store energy in the spring, which then slowly releases through the gear train to power the watch until it needs winding again — if you forget, it simply stops. A self-winding (automatic) watch has that same kind of mainspring, but also contains an internal weighted rotor that spins freely with the natural movement of your wrist as you wear it throughout the day, automatically winding the mainspring for you through ordinary motion, so it generally doesn't need manual winding as long as it's worn regularly — though most can still be wound by hand too, especially after sitting unworn long enough to stop. The key difference: a manual wind watch must be wound by hand regularly or it stops, while a self-winding (automatic) watch winds itself using an internal rotor driven by the natural motion of the wearer's wrist.",
  ),
  k(
    'kb-gap-watches-skeleton-vs-regular',
    'Skeleton watch vs regular watch',
    ['skeleton watch', 'regular watch', 'difference skeleton watch'],
    "A regular watch has a solid dial (face) that completely covers and hides the internal movement — all you see from the front are the hands, hour markers, and maybe a small date window, with the actual gears, springs, and mechanical components hidden away underneath. A skeleton watch is specifically designed to show off that mechanism — the dial, and often the mainplate and bridges, are cut away, openworked, or made partially transparent (sometimes with a see-through case back too) so you can visually see the gears, springs, balance wheel, and other moving parts actually working as the watch runs, turning the mechanism itself into the main visual feature rather than hiding it. The key difference: a regular watch hides its internal movement behind a solid dial, while a skeleton watch deliberately cuts away or exposes the dial and movement so the working mechanical parts are visible.",
  ),
  k(
    'kb-gap-watches-horology-vs-watchmaking',
    'Horology vs watchmaking',
    ['horology', 'watchmaking', 'difference horology watchmaking'],
    "Horology is the broad, general science and study of measuring time and of timekeeping devices as a whole — it covers the history, theory, and mechanics of ALL kinds of time-measuring instruments, from ancient sundials and water clocks to pendulum clocks, marine chronometers, and modern watches; someone can be a horologist by studying or collecting timepieces without ever building one themselves. Watchmaking is a specific, hands-on craft and trade within that broader field — it's the practical skill of actually designing, assembling, repairing, and servicing watches specifically (not clocks or sundials), requiring specialized technical training to work with the tiny mechanical components inside a wristwatch or pocket watch. The key difference: horology is the broad academic study of timekeeping and timepieces in general, while watchmaking is the specific practical craft of building and repairing watches, one narrower trade within the wider field of horology.",
  ),
  k(
    'kb-gap-watches-tourbillon-vs-regular-movement',
    'Tourbillon vs regular movement',
    ['tourbillon', 'watch movement', 'difference tourbillon regular movement'],
    "In a regular mechanical watch movement, gravity pulls slightly differently on the tiny escapement (the oscillating balance wheel and spring that regulate timekeeping) depending on what position the watch is in — flat on a desk versus hanging vertically in a pocket, for example — and those small gravity-related inconsistencies can throw off the watch's accuracy over time. A tourbillon is a specialized mechanism, invented by Abraham-Louis Breguet (patented in 1801, building on ideas from British watchmaker John Arnold), that places the entire escapement inside a rotating cage, continuously spinning it (typically once per minute) so gravity's effect gets averaged out across every position rather than staying constant in one orientation, in theory improving accuracy. It's also an extremely complex, difficult-to-manufacture mechanism, which is why tourbillon watches are typically very expensive and often valued as a display of watchmaking mastery as much as for the accuracy benefit itself, which matters less in the modern, mostly-stationary way most people actually wear a watch. The key difference: a regular movement's escapement stays in a fixed position, subject to gravity's small effect on accuracy, while a tourbillon continuously rotates the entire escapement to average out gravity's effect across positions — a complex mechanism prized for both its accuracy benefit and as a showcase of watchmaking skill.",
  ),
  k(
    'kb-gap-watches-grandfather-vs-mantel-clock',
    'Grandfather clock vs mantel clock',
    ['grandfather clock', 'mantel clock', 'difference grandfather mantel clock'],
    "A grandfather clock (also called a longcase or tall-case clock) is a large, freestanding floor clock, typically 6 to 8 feet tall, housing a long pendulum and hanging weights inside a tall wooden case that stands directly on the floor, usually placed against a wall in an entryway or living room as a substantial piece of furniture in its own right. A mantel clock is much smaller and designed to sit on a flat surface — classically a fireplace mantel, but also a shelf, table, or sideboard — and instead of a long pendulum and hanging weights, it typically uses a shorter pendulum, a spring-driven movement, or a balance-wheel mechanism compact enough to fit its small case. The key difference: a grandfather clock is a large, freestanding floor clock with a long pendulum housed in a tall case, while a mantel clock is a much smaller clock designed to sit on a surface like a fireplace mantel, using a more compact movement.",
  ),
  k(
    'kb-gap-watches-stopwatch-vs-timer',
    'Stopwatch vs timer',
    ['stopwatch', 'timer', 'difference stopwatch timer'],
    "A stopwatch counts UP from zero, starting the moment you press start, and keeps accumulating elapsed time until you press stop — its whole purpose is measuring exactly how long something took (a race, a lap, a workout), with no predetermined end point built in. A timer instead counts DOWN from a value you set in advance (like 10 minutes) toward zero, and is built specifically to alert you, usually with a beep or alarm, once that set duration has fully elapsed — its purpose is making sure a specific, predetermined amount of time passes (cooking something for 20 minutes, a chess clock, a presentation time limit), not measuring how long an open-ended event takes. The key difference: a stopwatch counts up from zero to measure how long something takes with no set endpoint, while a timer counts down from a preset duration and alerts you once that time is up.",
  ),
  k(
    'kb-gap-watches-wristwatch-vs-pocketwatch',
    'Wristwatch vs pocket watch',
    ['wristwatch', 'pocket watch', 'difference wristwatch pocket watch'],
    "A wristwatch is worn strapped directly to the wrist with a band or bracelet, designed for quick, hands-free glancing at the time while your hands stay free to do other things — it became the dominant style during the 20th century, especially after soldiers in World War I found strapping a watch to the wrist far more practical in combat than fumbling for a pocket watch. A pocket watch predates the wristwatch as the dominant style, and instead of a wrist strap, it's carried in a pocket (classically a waistcoat or trouser pocket) and attached to clothing by a chain or fob so it doesn't get lost, typically featuring a hinged protective cover (a 'hunter case') over the crystal and requiring you to actually take it out of your pocket to check the time rather than just glancing at your wrist. The key difference: a wristwatch straps directly to the wrist for quick hands-free viewing, while a pocket watch is carried loose in a pocket, attached by a chain, and must be taken out to check the time — pocket watches were the dominant style before wristwatches took over in the 20th century.",
  ),
  k(
    'kb-gap-watches-sundial-vs-mechanical-clock',
    'Sundial vs mechanical clock',
    ['sundial', 'mechanical clock', 'difference sundial mechanical clock'],
    "A sundial tells time passively using the sun's position — a fixed pointer (a gnomon) casts a moving shadow onto a marked dial as the sun moves across the sky over the course of the day, and you read the time by where that shadow falls; it requires no internal mechanism, no power source, and no moving parts at all, but it only works in daylight with a clear enough sky to cast a shadow, and needs to be calibrated for its specific latitude. A mechanical clock instead uses an internal, self-contained mechanism — a wound spring or hanging weight providing energy, released through a gear train and regulated by an oscillating element like a pendulum or balance wheel — to keep time completely independently of the sun, working continuously day or night, indoors or out, regardless of weather or cloud cover. The key difference: a sundial passively tells time using the sun's shadow with no internal mechanism at all and only works in clear daylight, while a mechanical clock uses an internal spring/weight-driven gear mechanism to keep time actively and continuously, day or night, regardless of sunlight.",
  ),
  k(
    'kb-gap-watches-jeweler-vs-watchmaker',
    'Jeweler vs watchmaker',
    ['jeweler', 'jeweller', 'watchmaker', 'difference jeweler watchmaker'],
    "A jeweler is a craftsperson (or business) focused on jewelry — designing, making, repairing, and selling pieces like rings, necklaces, and bracelets, with skills centered on working precious metals and stones: goldsmithing/silversmithing, stone-setting, engraving, casting, polishing, and often antique jewelry restoration; a jeweler's core expertise is metalwork and gemstones, not the internal mechanics of a timepiece. A watchmaker is a specialized horological craftsperson trained specifically to design, assemble, service, and repair the tiny internal mechanisms of watches — the movement, gear train, escapement, and other precision components — requiring an entirely different, highly technical skill set focused on micro-mechanics rather than metalworking or gem-setting. In practice their work sometimes overlaps (a fine jewelry watch might need both a watchmaker for the movement and a jeweler for the case/gem-setting), but they are genuinely distinct trades with different training. The key difference: a jeweler specializes in crafting and repairing jewelry using metalwork and gemstone skills, while a watchmaker specializes in the precision internal mechanics of timepieces — different trades with different technical skill sets.",
  ),
  k(
    'kb-gap-watches-gold-plated-vs-solid-gold',
    'Gold plated vs solid gold watches',
    ['gold plated watch', 'solid gold watch', 'difference gold plated solid gold'],
    "A gold-plated watch is made of a base metal — usually stainless steel or brass — with just a very thin layer of actual gold applied to the surface through a process called electroplating; that gold layer is real gold, but it's only a microscopic coating, so over years of wear it can gradually wear thin or rub off in spots, revealing the base metal underneath, and it can't be resized or heavily polished without risking wearing through the gold layer. A solid gold watch, by contrast, is made of a gold alloy — mixed with other metals for durability, described by karat, like 14k or 18k — all the way through the case; there's no separate base metal hiding underneath, so it retains its gold appearance and value even after resizing, heavy polishing, or decades of wear, but it's significantly more expensive, heavier, and softer than a plated or steel watch. The key difference: gold plating is a thin layer of real gold electroplated onto a base metal case that can wear off over time, while solid gold means the entire case is made of a gold alloy all the way through, retaining its value and appearance much longer but at a much higher cost.",
  ),
  k(
    'kb-gap-watches-leather-strap-vs-metal-bracelet',
    'Leather watch strap vs metal watch bracelet',
    ['leather watch strap', 'metal watch bracelet', 'difference leather strap metal bracelet'],
    "A leather strap is made from a single flexible piece (or a couple of layered pieces) of tanned animal hide, attached to the watch case via spring bars, and secured around the wrist with a simple pin-and-buckle closure — it's typically lighter, more breathable, and molds comfortably to the wrist shape over time, giving a classic, dressier look, but it wears out, cracks, or absorbs sweat/moisture over months or years of use and eventually needs replacing. A metal bracelet is made of a chain of individual interlocking metal links (steel, titanium, gold, etc.) connected together, usually with a fold-over or deployment clasp, and its length can typically be adjusted by removing or adding links to fit the wrist precisely; it's heavier and more rigid than leather but far more durable, water-resistant, and long-lasting, giving a sportier or more formal-metal look depending on the design. The key difference: a leather strap is a single flexible piece of tanned hide secured with a buckle, lighter and more comfortable but wears out over time, while a metal bracelet is made of adjustable interlocking metal links, heavier and more rigid but much more durable and water-resistant.",
  ),
];
