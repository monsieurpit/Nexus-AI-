import { KnowledgeItem } from '../../types';

// Batch 135 (sailing / how sailboats work) — a badly failing category on
// nexus-4b. "how does a sailboat sail into the wind" was answered "it can't,
// it just sits there like a useless piece of shit"; "windward vs leeward"
// was answered about mountains and rain shadow; "points of sail" wandered
// into Theseus and steamships; "how does a rudder steer a boat" gave an
// AIRCRAFT rudder / adverse-yaw answer; "leeway" and "right of way between
// two sailboats" were both wrong; "weather helm" was answered about the jet
// stream. Raw web dumps for tacking/jibing, "coming about" (Mean Creek film
// + a Justin Bieber song), keel, sloop/ketch/schooner, boom/mast/mainsail,
// and the trapeze. "heeling" produced pure garbage about villains hating
// children.
export const SAILING_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-sail-upwind',
    title: 'How a Sailboat Sails Into the Wind',
    category: 'Sailing',
    keywords: [
      'how does a sailboat sail into the wind upwind', 'a sailboat cannot sail straight into the wind but it can sail at about 40 to 45 degrees to the wind on either side and by zig zagging tacking between those two headings it makes progress to windward',
      'when sailing upwind the sail is trimmed in tight and acts like a vertical aeroplane wing the wind flowing across the curved sail generates lift mostly sideways and slightly forward the keel or centreboard stops the boat sliding sideways so the net result is forward motion',
      'this is why old square rigged ships were poor upwind and fore and aft rigs sloops and cutters point higher a boat pointed dead into the wind stalls and stops it is in the no go zone',
    ],
    content: `A sailboat cannot sail directly into the wind, but it absolutely can make progress toward a point that is upwind — this is basic sailing, not something boats "just can't do." A modern fore-and-aft-rigged boat can sail about 40–45° off the true wind ("close-hauled"); older square-riggers could manage only about 60–70°. To reach a destination that lies dead upwind, the boat sails as close to the wind as it can on one side, then turns the bow through the wind ("tacks") and sails close-hauled on the other side, repeating in a zig-zag ("beating to windward"). How it works physically: when close-hauled the sail is pulled in tight and behaves like a vertical wing. Air flowing across the curved (cambered) sail speeds up over the leeward side and creates a pressure difference — aerodynamic lift — that points mostly sideways (heeling the boat) but partly forward. The keel or centreboard, a fin under the hull, generates its own hydrodynamic lift that resists the sideways push, so the sideways forces largely cancel and the small forward component drives the boat ahead. The zone roughly 45° either side of straight upwind, where the sails can't generate drive, is the "no-go zone."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-tacking-jibing',
    title: 'Tacking and Jibing (Gybing)',
    category: 'Sailing',
    keywords: [
      'what is tacking and jibing gybing sailing manoeuvre', 'both are turns that swap the wind from one side of the boat to the other tacking turns the bow through the eye of the wind used when sailing upwind jibing turns the stern through the wind used when sailing downwind',
      'in a tack the boat slows as it points briefly into the no go zone the sails luff then fill on the new side the helm calls ready about then hard a lee it is the safe controlled turn',
      'in a jibe the boat keeps speed and the mainsail and boom swing rapidly across the boat which can be violent and dangerous in strong wind so the mainsheet is hauled in before the turn and eased after controlled it is the fast turn',
    ],
    content: `Tacking and jibing are the two ways a sailboat turns so that the wind, which was blowing over one side of the boat, ends up blowing over the other side. TACKING (also "coming about"): the boat turns its BOW through the wind, passing head-to-wind. It is the manoeuvre used to change direction while sailing upwind (beating). The boat momentarily loses drive as it points into the no-go zone, the sails flap ("luff"), then fill with wind on the new side. Commands: "Ready about!" then "Hard-a-lee!" (or "Helm's a-lee"). Tacking is the slow, gentle, low-risk turn. JIBING / GYBING: the boat turns its STERN through the wind while sailing downwind, so the wind crosses the transom. The boat keeps its speed, but the mainsail and its heavy boom swing rapidly all the way across the boat from one side to the other, which in a strong breeze can be sudden and violent (an accidental jibe can break rigging or injure crew). To jibe safely the crew sheets the mainsail in near the centreline before the turn, brings the stern through the wind, then eases the sail out on the new side. Jibing is the fast turn but the one that needs care.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-windward-leeward',
    title: 'Windward and Leeward (on a Boat)',
    category: 'Sailing',
    keywords: [
      'what is the difference between windward and leeward in sailing', 'windward is the side of the boat the wind hits first the upwind side leeward pronounced loo ard is the downwind side the side the wind exits this is about a boat not about the wet and dry sides of a mountain',
      'the boat heels away from the wind so the leeward rail goes down toward the water and the windward rail lifts crew sit on the windward side to balance it',
      'the terms also describe position relative to another boat a boat that is upwind of you is to windward it also matters for right of way the windward boat keeps clear of the leeward boat on the same tack',
    ],
    content: `On a sailboat, "windward" and "leeward" name the two sides of the boat relative to where the wind is coming from (this is the sailing meaning — not the wet upwind slope and dry downwind slope of a mountain). WINDWARD is the side the wind strikes first — the upwind side, the side toward the wind. LEEWARD (pronounced "LOO-ard" by sailors) is the downwind side, the sheltered side, the side the wind blows toward and exits; the general area downwind of the boat is "the lee." Because wind pressure on the sails pushes the boat over, a sailboat heels to leeward: the leeward rail drops toward the water and the windward rail rises, which is why the crew sit out on the windward side to level it. The words also describe boats relative to each other — a boat positioned upwind of you is "to windward" of you, one downwind is "to leeward" — and this feeds directly into the racing/collision rules: when two boats are on the same tack, the windward boat must keep clear of the leeward boat.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-points-of-sail',
    title: 'The Points of Sail',
    category: 'Sailing',
    keywords: [
      'what are the points of sail', 'the points of sail describe a boats heading as an angle to the true wind from no drive at all pointing into the wind round to sailing away from it',
      'in irons or no go zone 0 to about 45 degrees sails cannot drive close hauled about 45 degrees sails hauled in tight close reach between close hauled and 90 degrees beam reach wind at 90 degrees on the beam the fastest and easiest point for most boats',
      'broad reach wind coming from behind the beam sails eased well out running or dead run wind directly astern sails all the way out often wing on wing a jibe swaps sides on the downwind points',
    ],
    content: `The "points of sail" are the named zones of a boat's heading measured as the angle between the boat and the true wind, going from dead upwind around to dead downwind: (1) IN IRONS / NO-GO ZONE — from head-to-wind out to about 45° each side; the sails only flap and the boat has no drive. (2) CLOSE-HAULED (beating) — about 45° off the wind, as close as the boat can effectively point, sails trimmed in hard, the boat heels most and the ride is wettest. (3) CLOSE REACH — anywhere between close-hauled and a beam reach; sails eased slightly. (4) BEAM REACH — the wind is at 90°, straight across the boat ("on the beam"); sails about halfway out; for most boats this is the fastest, most comfortable, and easiest point of sail. (5) BROAD REACH — the wind comes from behind the beam, over the aft quarter; sails well out; often the fastest for planing dinghies and multihulls. (6) RUNNING (dead run) — the wind is directly astern; sails all the way out, and the jib may be set on the opposite side to the main ("wing-on-wing"), or a spinnaker is flown. You change from one tack to the other by tacking through the no-go zone or by jibing across the downwind points.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-faster-than-wind',
    title: 'Why a Sailboat Can Go Faster Than the Wind',
    category: 'Sailing',
    keywords: [
      'why can a sailboat go faster than the wind', 'it is only possible when sailing across the wind on a reach not when running dead downwind as the boat speeds up it creates its own headwind that combines with the true wind into a stronger apparent wind coming from further forward',
      'the sail and the keel both act as wings generating lift the faster the boat goes the more apparent wind it feels and the more drive it makes a self reinforcing loop until drag balances it',
      'iceboats and foiling catamarans with very low drag reach three to five times the wind speed a normal displacement sailboat sailing dead downwind can never beat the wind speed because there the apparent wind only decreases as the boat accelerates',
    ],
    content: `A sailboat can exceed the wind speed, but only on a reach (sailing across the wind), never when running dead downwind by sail alone. The mechanism is apparent wind. As the boat accelerates, its own motion generates a headwind; this combines as a vector with the true wind to produce the "apparent wind," which is both stronger than the true wind and comes from further forward. The sail and the keel each act as a wing generating lift, and lift grows with the square of the airflow (and waterflow) speed. So going faster increases the apparent wind, which increases the drive, which lets the boat go faster still — a self-reinforcing loop that stops only when hull drag and rigging drag balance the drive. Craft with very low drag exploit this dramatically: an iceboat or a land yacht can hit 3–5 times the wind speed, and foiling racing catamarans (America's Cup, some skiffs) routinely sail at 2–3× the true wind. Directly downwind, though, an ordinary sailboat can never quite reach wind speed, because there the apparent wind only weakens as the boat speeds up — when the boat matches the wind, the sails feel no wind at all. (Exotic "downwind faster than the wind" vehicles use a propeller-driven wheel, not sails.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-keel',
    title: 'What a Keel Does',
    category: 'Sailing',
    keywords: [
      'what does a keel do on a sailboat', 'the keel is the fin under the hull it does two jobs it resists sideways slip and it keeps the boat upright',
      'resisting leeway wind pressure on the sails pushes the boat sideways the keel is a foil moving through the water so it generates hydrodynamic lift sideways that opposes that push letting the boat convert most of the sail force into forward motion instead of drifting',
      'righting moment a ballasted keel carries heavy lead or iron at its bottom several feet below the water when the boat heels that weight hangs out to the side and its leverage pulls the boat back upright a dinghy has no ballast keel so the crew are the ballast',
    ],
    content: `The keel is the fin projecting downward from the bottom of a sailboat's hull, and it does two distinct jobs. (1) IT RESISTS SIDEWAYS SLIP (leeway). The wind on the sails pushes the boat sideways as well as forward. The keel is a foil moving through the water, so like an underwater wing it generates hydrodynamic lift to the side, opposing that push. Without it (or a centreboard/daggerboard on a small boat) the boat would just skid sideways across the water, especially when sailing upwind. With it, most of the sail's force is turned into forward motion. (2) IT KEEPS THE BOAT UPRIGHT. On a cruising or racing yacht the keel is heavily ballasted — a bulb or blade of lead or cast iron, often 30–50% of the boat's weight, hanging one to three metres below the waterline. When wind heels the boat over, that low weight swings out to the side and its leverage ("righting moment") pulls the boat back toward vertical, and rights it completely if it is knocked flat. Small dinghies have an unballasted centreboard for job 1 only; there the crew's body weight, hiking out to windward, provides the righting moment for job 2, which is why a dinghy capsizes if the crew get it wrong and a keelboat generally does not.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-rigs',
    title: 'Sloop, Cutter, Ketch, Yawl, Schooner',
    category: 'Sailing',
    keywords: [
      'what is the difference between a sloop a ketch and a schooner sailboat rig', 'these are rig types defined by the number and position of masts and sails a sloop has one mast one mainsail behind it and one headsail jib in front the most common modern rig',
      'a cutter has one mast set further aft and flies two or more headsails a ketch has two masts the aft one the mizzen is shorter than the main and stepped forward of the rudder post a yawl also has a small mizzen but it is stepped aft of the rudder post',
      'a schooner has two or more masts where the forward mast the foremast is shorter than or equal to the main behind it splitting the sail area into smaller easier to handle sails',
    ],
    content: `These names describe a sailboat's "rig" — the arrangement of masts and sails. SLOOP: one mast, carrying a single mainsail behind it and a single headsail (jib or genoa) in front. It is the simplest and most common modern rig, efficient upwind. CUTTER: one mast, stepped a bit further aft, flying two or more headsails at once (a staysail plus a yankee/jib), which splits the foretriangle into smaller sails that are easier to handle and to reef. KETCH: two masts — a tall mainmast forward and a shorter "mizzen" mast aft, with the mizzen stepped FORWARD of the rudder post. The divided sail plan means smaller individual sails and the option to sail under "jib and jigger" (headsail + mizzen) in heavy weather. YAWL: also two masts with a small mizzen, but the mizzen is small and stepped AFT of the rudder post, used more for balance and trim than for drive. SCHOONER: two or more masts where the forward mast (foremast) is shorter than or the same height as the mainmast behind it (the opposite of a ketch's proportions). Historically favoured for coastal trade and fishing because a large crew wasn't needed and the many small sails were manageable. Beyond these, "cat rig" means a single sail and no headsail, and square rig means sails set across the ship on horizontal yards.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-heeling',
    title: 'Heeling and How to Counteract It',
    category: 'Sailing',
    keywords: [
      'what is heeling and how do you counteract it sailing', 'heeling is when a sailboat leans over to leeward because of the sideways force of the wind on the sails a small amount is normal and expected too much is slow uncomfortable and can lead to a knockdown',
      'why excessive heel is bad the sails present less area to the wind the hull shape becomes asymmetric which increases weather helm and drag and the rudder can lift toward the surface and lose grip',
      'how to reduce it move crew weight to the windward rail hike out or use a trapeze ease the mainsheet and traveller to spill wind flatten the sails reef reduce sail area in stronger wind on a keelboat the ballast keel does most of the work',
    ],
    content: `Heeling is the sideways lean of a sailboat caused by wind pressure pushing on the sails above the waterline while the keel resists below it. A moderate angle of heel (perhaps 10–20° on a keelboat) is normal, expected, and does no harm. Excessive heel is a problem: the sails present less of their area square to the wind so they lose power, the immersed hull becomes lopsided and drags, the boat develops strong weather helm (wants to round up), and the rudder blade angles toward the surface and can stall or ventilate, so steering goes vague — and at the extreme the boat is knocked flat ("knockdown") or, on a dinghy, capsizes. Ways to counteract it: (1) shift crew weight to the windward rail — sit out, "hike," or clip onto a trapeze wire and stand out over the water; (2) ease the mainsheet and drop the traveller to leeward to spill wind from the top of the sail; (3) flatten the sails (more halyard/outhaul/backstay tension) so they generate more forward drive and less heeling force; (4) reef — reduce sail area — as the wind builds, and change to a smaller jib; (5) on a keelboat, the ballasted keel supplies most of the righting force automatically, which is why keelboats heel to an angle and then stiffen up rather than going over.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-spinnaker',
    title: 'What a Spinnaker Is',
    category: 'Sailing',
    keywords: [
      'what is a spinnaker sailing', 'a large lightweight balloon shaped sail made of thin nylon flown from the top of the mast ahead of the boat when sailing downwind or on a broad reach to add a lot of extra sail area where the ordinary jib would be blanketed by the mainsail',
      'a symmetric spinnaker is held out to windward by a spinnaker pole and can be flown on either side an asymmetric spinnaker or gennaker is tacked to the bow or a bowsprit like a big genoa and is set and jibed more like a jib better for reaching',
      'it is powerful and can be a handful in a breeze it is doused into a bag or a sock snuffer an accidental collapse or a broach round up is the classic spinnaker drama',
    ],
    content: `A spinnaker is the big, light, curved sail a sailboat flies when sailing downwind or on a reach. It is made of thin ripstop nylon, cut with a lot of depth so it billows out ahead of the boat, and it is hoisted to the masthead. Its purpose is to add large amounts of drive on the points of sail where the flat, hard-working upwind jib would just hang limp in the wind shadow of the mainsail. Two families: a SYMMETRIC spinnaker is a mirror-image sail held out to windward on the end of a spinnaker pole (the pole is jibed across the foredeck when the boat jibes); it is best for sailing deep downwind. An ASYMMETRIC spinnaker ("asym," or "gennaker" / "code sail") has one longer luff and is tacked down to the bow or to a retractable bowsprit, and it is set, trimmed, and jibed much like an oversized genoa; it is best for reaching and is simpler to handle shorthanded. Spinnakers are powerful and unstable — they can collapse suddenly, wrap around the forestay ("hourglass"), or overpower the rudder and spin the boat into a broach — so they are hoisted and doused inside a bag or a "snuffer"/"sock" and need active trimming.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-port-starboard',
    title: 'Port and Starboard',
    category: 'Sailing',
    keywords: [
      'what is the difference between port and starboard', 'port is the left hand side of a boat and starboard is the right hand side as seen by someone on board facing forward toward the bow these are fixed sides of the vessel they do not change with which way you are looking unlike left and right',
      'memory aids port and left both have four letters port wine is red and the port side navigation light is red starboard light is green',
      'starboard comes from the old steering board a side mounted steering oar on the right port comes from loading on the other side at the dock the port side a boat on starboard tack has right of way over one on port tack',
    ],
    content: `Port and starboard are the fixed names for the left and right sides of a vessel, as seen by a person aboard facing forward (toward the bow). PORT is the left side; STARBOARD is the right side. They are used instead of "left" and "right" precisely because they never change — starboard is always the same side of the boat no matter which way a crew member happens to be facing or standing, which removes ambiguity in a command. Memory aids: "port" and "left" both have four letters; "port" and "red" are both short, and a ship's port-side navigation light is red while the starboard light is green (a stern light is white). Origins: "starboard" is from Old English steorbord, the "steering board" — a steering oar mounted on the right side of early ships; because that oar was in the way, the ship was moored with its other, left side against the dock — the "port" side (earlier "larboard," changed because it sounded too like starboard). In the collision rules, a boat on starboard tack (wind coming over its starboard side) has right of way over a boat on port tack.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-boom-mast-mainsail',
    title: 'Boom, Mast, and Mainsail',
    category: 'Sailing',
    keywords: [
      'what is the boom and the mast and the mainsail on a sailboat', 'the mast is the tall vertical spar that holds the sails up the mainsail is the principal sail set behind the mast its leading edge the luff runs up the mast',
      'the boom is the horizontal spar attached to the bottom of the mast at the gooseneck that holds out the foot bottom edge of the mainsail swinging it in and out with the mainsheet controls the sail angle it also swings across the boat during a tack or jibe watch your head',
      'the headsail or jib is the smaller triangular sail set in front of the mast on the forestay the mainsheet controls the main the jib sheets control the jib halyards raise all the sails',
    ],
    content: `MAST: the tall vertical spar (aluminium, carbon, or wood) rising from the deck or keel that holds the sails up and takes the rig loads; it is held in place by wires — the forestay running forward, the backstay aft, and the shrouds to each side. MAINSAIL: the principal sail, set BEHIND the mast. Its forward edge (the "luff") is attached to and runs up the aft face of the mast; its bottom edge (the "foot") attaches to the boom; its aft edge is the "leech" and the corners are the tack (bottom front), clew (bottom back), and head (top). BOOM: the horizontal spar hinged to the bottom of the mast at a fitting called the "gooseneck," running aft along the foot of the mainsail. Pulling the boom in or letting it out — with the "mainsheet," the rope-and-pulley system attached to it — sets the mainsail's angle to the wind. The boom also swings from one side of the boat to the other during every tack and jibe, at head height, which is why the biggest hazard on a small boat is being hit by it. The smaller triangular sail set in FRONT of the mast, on the forestay, is the headsail — a jib (fits inside the foretriangle) or a genoa (overlaps the mast). Ropes that raise sails are "halyards"; ropes that trim them are "sheets."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-coming-about',
    title: '"Coming About" and "In Irons"',
    category: 'Sailing',
    keywords: [
      'what does coming about mean sailing what is in irons', 'coming about is another name for tacking turning the bow of the boat through the eye of the wind so the sails cross to the other side used to change direction while sailing upwind this is a sailing term not the film Mean Creek or a song',
      'the helmsman warns the crew ready about then puts the helm over calling hard a lee or lee oh the jib is released on the old side and hauled in on the new side',
      'if the boat loses momentum head to wind and stops with the sails flapping and will not turn either way it is in irons or stuck head to wind the fix is to back the jib push the boom out or wait for the boat to drift backwards and use reverse rudder',
    ],
    content: `"Coming about" is the everyday name for TACKING — steering the bow of the boat up into the wind and on through it, so that the wind, and the sails, cross from one side of the boat to the other. It is the manoeuvre used to change tack while sailing upwind, and the way a boat zig-zags toward a point that is dead to windward. (It is a sailing term and has nothing to do with a 2004 film or a pop song.) The sequence: the helmsman calls "Ready about!"; the crew prepare the jib sheets; the helmsman calls "Hard-a-lee!" (or "Lee-oh") and pushes the tiller firmly to leeward / turns the wheel; as the bow swings through head-to-wind the jib is let fly on the old side and hauled in on the new side; the boat accelerates away close-hauled on the new tack. If the turn is done too slowly or the boat is going too slow to begin with, it can stall pointing straight into the wind with the sails flogging and refuse to fall off onto either tack — the boat is then "IN IRONS" (or "stuck head to wind"). To get out: hold the jib out to one side so the wind pushes the bow off ("backing the jib"), and/or push the boom out to the other side, and once the boat starts moving backward, reverse the tiller until the bow swings onto the desired tack.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-no-go-zone',
    title: 'The No-Go Zone (In Irons)',
    category: 'Sailing',
    keywords: [
      'what is the no go zone or irons in sailing', 'the no go zone is the arc of roughly 45 degrees on each side of the direction the wind is coming from a total of about 90 degrees where a sailboat cannot generate forward drive because the sails only flutter luff instead of filling',
      'it has nothing to do with currents shoals or dangerous water it is purely about the angle to the wind to get somewhere inside the no go zone you sail close hauled just outside it on one tack then the other',
      'a boat that ends up stopped inside the no go zone with no speed is in irons and the rudder does nothing until it gets moving again',
    ],
    content: `The "no-go zone" (also "the no-sail zone," and being stuck in it is being "in irons") is the wedge of directions, roughly 45° either side of straight into the wind — about a 90° arc centred on where the wind is coming from — in which a sailboat cannot sail. Inside that arc the wind strikes the sails edge-on, so they only flap ("luff") rather than filling with a smooth flow, and the boat makes no forward drive. It has nothing to do with currents, shoals, reefs, or dangerous water; it is defined purely by the angle between the boat and the wind. To reach a destination that lies inside the no-go zone, a boat sails "close-hauled" along the edge of the zone on one tack, then tacks and sails along the other edge, zig-zagging upwind. A boat that turns too far and stops dead inside the zone is "in irons": with no water flowing past it, the rudder has no effect and the boat will not answer the helm until it regains steerage way (by backing a sail or drifting astern).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-reefing',
    title: 'Reefing a Sail (and Why)',
    category: 'Sailing',
    keywords: [
      'how do you reef a sail and why', 'reefing means reducing the working area of a sail when the wind gets strong it is not the same as trimming or adjusting the sheets',
      'why as wind increases the force on the sails rises with the square of the wind speed too much sail makes the boat heel excessively develop heavy weather helm slow down and become hard to control and risks damage reefing keeps the boat upright balanced and safe and often actually faster',
      'how slab reefing lower the mainsail partway hook the luff reef cringle over a hook at the gooseneck pull the matching leech reef line tight and tie or roll up the loose foot with the reef points roller reefing on a furling mainsail or headsail just rolls some of the sail away reef early before you need to',
    ],
    content: `Reefing is reducing the area of a sail that is exposed to the wind, done when the breeze gets too strong for full sail. It is a different thing from trimming (adjusting the sheets to set the sail's angle) — reefing physically makes the sail smaller. WHY: the sideways and heeling force a sail produces goes up with the square of the wind speed, so a wind that doubles quadruples the load. Over-canvassed, a boat heels far over (losing drive and gaining drag), develops strong weather helm that fights the rudder, slams and rounds up in gusts, becomes exhausting and unsafe to steer, and can blow out sails or break gear. A properly reefed boat sails more upright, better balanced, more comfortably, more safely, and is frequently no slower — often faster — than one staggering along heeled to the rail. HOW (slab/jiffy reefing of a mainsail): head up to reduce load, ease the mainsheet and boom vang, lower the halyard to a marked point, hook the luff "reef cringle" (a reinforced eye) over a hook at the gooseneck or tension a luff reef line, re-tension the halyard, then haul the corresponding leech reef line to pull the new clew down to the boom, and tidy the bunt of loose sail with the reef points. A roller-furling main or headsail is reefed simply by rolling part of it away. The rule of thumb: reef early — "the time to reef is when you first think about it."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-apparent-wind',
    title: 'Apparent Wind vs True Wind',
    category: 'Sailing',
    keywords: [
      'what is apparent wind vs true wind sailing', 'true wind is the wind measured by a stationary observer the actual movement of the air over the water apparent wind is the wind you feel on the moving boat it is the vector sum of the true wind and the head wind created by the boats own motion',
      'this has nothing to do with hills buildings or ground turbulence it is purely the boats own speed adding to the wind the apparent wind is always shifted forward of the true wind and is stronger when sailing upwind and weaker when sailing downwind',
      'sails are always trimmed to the apparent wind not the true wind the masthead wind indicator and telltales show apparent wind as the boat speeds up the apparent wind moves forward so the sails must be trimmed in a fast boat sails upwind almost all the time in terms of apparent wind angle',
    ],
    content: `TRUE WIND is the wind as a stationary observer would measure it — the real motion of the air across the water, in speed and direction. APPARENT WIND is the wind actually felt on a moving boat, and it is the vector sum of two things: the true wind, plus the "headwind" the boat creates by moving through still air (equal to the boat's speed, blowing from dead ahead). This is nothing to do with hills, buildings, trees, or ground turbulence — it is simply the boat's own motion combining with the wind. Consequences: (1) the apparent wind is always shifted FORWARD of the true wind (more toward the bow); (2) sailing upwind, the boat's headwind adds to the true wind, so the apparent wind is STRONGER and further forward than the true wind — a boat close-hauled in 12 knots of true wind might feel 16 knots at 25°; (3) sailing downwind, the boat's speed subtracts, so the apparent wind is WEAKER and further aft. Sailors always trim the sails to the apparent wind, not the true wind, because the apparent wind is what the sails feel — the masthead wind vane and the woollen "telltales" on the sails both show apparent wind. As a boat accelerates, its apparent wind swings forward, so the crew must sheet in; very fast boats (foilers, catamarans) generate so much apparent wind that even sailing downwind they trim their sails as if going upwind.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-catamaran',
    title: 'What Makes a Catamaran Fast',
    category: 'Sailing',
    keywords: [
      'what is a catamaran and why is it fast', 'a catamaran is a boat with two parallel hulls joined by a deck or crossbeams not two boats glued together',
      'it is fast for two reasons first the two hulls are long thin and light so they have far less wetted surface drag and make less wave making resistance than one fat hull of the same displacement second the wide spacing of the hulls gives an enormous righting moment so the boat barely heels and can carry its full sail power all the time and even fly the windward hull',
      'downsides less interior volume per length a violent motion in some seas and if capsized a catamaran stays inverted rather than self righting like a ballasted keelboat',
    ],
    content: `A catamaran is a boat with two parallel hulls of equal size, connected by a deck structure or crossbeams (a "bridgedeck"). It is not "two boats lashed together." Two things make catamarans fast: (1) LOW DRAG — because the boat's weight is split between two hulls, each hull can be long, narrow, and fine-ended. Narrow hulls have much less wetted surface area (skin-friction drag) for a given volume and make smaller bow waves (wave-making resistance) than a single beamy monohull hull carrying the same load, so a cat needs less drive to reach a given speed. (2) HUGE RIGHTING MOMENT — the hulls are set far apart, so the leverage resisting heel is enormous. A catamaran barely heels at all; instead of spilling wind by leaning over, it stays flat and keeps all its sail power working, and a racing cat will lift its windward hull clear of the water to reduce drag further. Combined, low drag plus full power means high speed, and the fastest sailboats in the world (foiling America's Cup cats, ocean-racing trimarans) are multihulls. Trade-offs: for a given length a cat has less interior room and a jerkier motion in a chop, it needs wide berths and haul-out slings, and — crucially — a capsized multihull has no ballast keel to right it, so it floats stably upside-down, whereas a ballasted keelboat pops back upright.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-lines',
    title: 'Halyards, Sheets, and Other Lines',
    category: 'Sailing',
    keywords: [
      'what is the difference between a halyard and a sheet sailing rope names', 'sailors call ropes lines and each has a job a halyard raises a sail it runs from the head top corner of the sail up to a block at the masthead and back down',
      'a sheet controls the trim of a sail once it is up it is attached to the clew or to the boom and pulling it in or easing it out sets the sail angle to the wind the mainsheet the jib sheets the spinnaker sheet',
      'other lines the outhaul tensions the foot the cunningham or downhaul tensions the luff the boom vang or kicker pulls the boom down the traveller moves the mainsheet attachment point sideways a painter is the bow line of a dinghy',
    ],
    content: `On a boat almost every rope is called a "line," and lines are named by their job, not their size. HALYARD: raises and holds up a sail. It attaches to the head (top corner) of the sail, runs up the mast, over a sheave at the top, and back down to a winch or cleat, so hauling it hoists the sail. There is a main halyard, a jib halyard, a spinnaker halyard. SHEET: controls the trim of a sail that is already hoisted — how far in or out it is set relative to the wind. The mainsheet controls the boom (and thus the mainsail); the two jib sheets (one each side) control the jib's clew; the spinnaker sheet and guy control the spinnaker. Pulling a sheet in ("trimming on" / "sheeting in") flattens the sail against the wind for upwind work; easing it lets the sail out for reaching and running. Other common lines: the OUTHAUL tensions the foot of the mainsail along the boom; the CUNNINGHAM or DOWNHAUL tensions the luff; the BOOM VANG (US) / KICKER (UK) pulls the boom down to stop it lifting and to control leech twist; the TRAVELLER is a track that slides the mainsheet's lower attachment point across the boat; the TOPPING LIFT holds the boom up when the sail is down; the PAINTER is the short bow line used to tie up a dinghy.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-rudder',
    title: 'How a Rudder Steers a Boat',
    category: 'Sailing',
    keywords: [
      'how does a rudder steer a boat', 'the rudder is a flat blade or foil mounted vertically at the stern that pivots left or right when the helmsman turns the tiller or wheel water flowing past the angled rudder is deflected to one side and by newtons third law pushes the stern the other way which swings the bow around',
      'it only works when water is flowing past it that is when the boat is moving through the water a stationary boat cannot be steered a boat going backwards steers in reverse',
      'a tiller is pushed the opposite way to the turn you want push the tiller left to turn right a wheel is turned the same way as the turn this is a boat rudder not an aircraft rudder and has nothing to do with adverse yaw from ailerons',
    ],
    content: `A rudder is a flat blade (or a proper hydrodynamic foil) mounted vertically at or near the stern of a boat, on a pivot. The helmsman turns it with a "tiller" (a lever attached directly to the top of the rudder) or a "wheel" (connected by cables, gears, or hydraulics). When the rudder is angled, the water flowing past the hull is deflected to one side by the blade; by Newton's third law the water pushes back on the rudder, producing a sideways force at the very back of the boat. That force levers the stern sideways one way, which pivots the whole boat about its centre and swings the bow the other way — so a rudder turned to starboard pushes the stern to port and the bow to starboard. Key points: (1) a rudder only works when water is flowing past it, i.e. when the boat has "way on" (is moving through the water); a dead-stopped boat cannot be steered, and steering reverses when the boat moves astern. (2) A tiller is pushed the OPPOSITE way to the desired turn (tiller to port turns the boat to starboard), because you are moving the stern; a wheel turns the same way as the turn. (3) Turning the rudder also adds drag and scrubs off speed, so good helmsmanship uses small movements. This is a boat's rudder working in water — unrelated to an aircraft rudder or to countering aileron adverse yaw.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-leeway',
    title: 'Leeway in Sailing',
    category: 'Sailing',
    keywords: [
      'what is leeway in sailing', 'leeway is the sideways slip of a sailboat through the water to leeward caused by the wind pushing on the sails and hull it is the angle between the direction the boat is pointing its heading and the direction it is actually travelling through the water its track',
      'it is caused by wind not by current the sideways drift caused by a water current is called set and drift and is a separate effect leeway is largest when sailing close hauled in a strong wind and with a boat that has a small or raised centreboard',
      'the keel or centreboard reduces leeway by generating hydrodynamic side force a well designed keelboat makes only a few degrees of leeway a dinghy with the board up or a flat bottomed boat makes a lot navigators must allow for leeway when steering a course',
    ],
    content: `Leeway is the sideways slippage of a sailboat to leeward as it moves through the water — specifically, the angle between the direction the boat is pointed (its heading) and the direction it is actually moving through the water (its track). It exists because the wind pushing on the sails and hull has a large sideways component that the keel or centreboard can only partly resist, so the boat crabs slightly downwind of where its bow points. Important distinctions: leeway is caused by the WIND, and it is measured relative to the water. The sideways push of a tidal or ocean CURRENT is a separate effect that navigators call "set" (its direction) and "drift" (its rate); a boat can be making leeway and being set by a current at the same time, and a navigator has to allow for both to make good a desired course over the ground. Leeway is worst when close-hauled (maximum side force, minimum forward speed), in a strong breeze, in waves, and in a boat with a small, shallow, or retracted foil. A modern fin-keel yacht makes only about 3–5° of leeway close-hauled; a dinghy sailing with its centreboard raised, or a shoal-draft or flat-bottomed boat, makes much more and struggles to sail upwind at all.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-right-of-way',
    title: 'Right of Way Between Two Sailboats',
    category: 'Sailing',
    keywords: [
      'what is the right of way rule between two sailboats which has priority', 'there are three main rules and they are applied in order first if the two boats are on opposite tacks the boat on port tack keeps clear of the boat on starboard tack starboard has right of way',
      'second if the two boats are on the same tack the windward boat the one upwind keeps clear of the leeward boat the one downwind',
      'third a boat that is overtaking another from behind must keep clear regardless of tack this is not the boat closest to the wind has priority which is a common wrong answer a sailboat also gives way to vessels it is overtaking and generally to vessels restricted in their ability to manoeuvre',
    ],
    content: `When two sailing vessels are on a collision course, priority is decided by three rules applied in this order (they come from the international COLREGs and are mirrored in the racing rules): (1) OPPOSITE TACKS — the boat on port tack (wind coming over its port side, boom out to starboard) keeps clear of the boat on starboard tack. "Starboard tack has right of way" is the single most important rule and the one shouted on the water ("Starboard!"). (2) SAME TACK — if both boats have the wind on the same side, the WINDWARD boat (the one upwind) keeps clear of the LEEWARD boat (the one downwind), because the leeward boat has less room to escape and may be blanketed. (3) OVERTAKING — a boat coming up on another from behind (more than 22.5° abaft the beam) must keep clear of the boat ahead, whatever the tacks. Note that "the boat closest to the wind has priority" is a common but WRONG answer. The give-way boat should make an early, obvious course change; the right-of-way ("stand-on") boat should hold its course and speed but must still act to avoid a collision if the other boat fails to give way. A sailing vessel under sail alone also keeps clear of vessels not under command, restricted in their ability to manoeuvre, engaged in fishing, and (in narrow channels) large vessels constrained by draft — but a sailboat has right of way over a power-driven vessel of similar size in open water.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-weather-helm',
    title: 'Weather Helm (and Lee Helm)',
    category: 'Sailing',
    keywords: [
      'what causes weather helm sailing', 'weather helm is a sailboats natural tendency to turn its bow up toward the wind so the helmsman has to hold the tiller to leeward or the wheel to windward to keep the boat sailing straight this is a boat handling term not about the jet stream or el nino',
      'it is caused by the sail plans centre of effort being aft of the hulls centre of lateral resistance so the wind pivots the boat up into the wind heeling makes it much worse because the heeled sail plan pushes the bow round and the asymmetric hull adds a turning force',
      'a small amount of weather helm is good and safe the boat rounds up and depowers on its own in a gust and you can feel the groove too much is slow tiring and means the rudder is dragging cure it by reefing the main first easing the traveller flattening sails moving weight forward or raking the mast forward the opposite fault lee helm bow falls away from the wind is dangerous',
    ],
    content: `Weather helm is a sailboat's built-in tendency to turn its bow up toward the wind ("to weather"), so that the helmsman must constantly hold the tiller a little to leeward (or the wheel a little to windward) to make the boat sail a straight line. It is a sailing-trim term and has nothing to do with the jet stream, weather patterns, or El Niño. Cause: a boat turns toward whichever end has more sideways force. Weather helm occurs when the sail plan's "centre of effort" is aft of the hull's underwater "centre of lateral resistance," so the wind's push levers the bow up into the wind. HEELING makes it dramatically worse — a heeled-over sail plan pushes the bow around, and the immersed hull becomes lopsided (deeper on the leeward bow) which adds its own turning force — which is why a boat that is over-canvassed and heeled hard develops heavy, tiring weather helm and wants to round up in every gust. A small amount of weather helm (a few degrees of tiller) is desirable: it gives the helm a positive "feel" or "groove," and the boat luffs up and spills wind by itself in a gust, which is safe. Cures for excessive weather helm, in order: reef or reduce the mainsail (the aftmost sail), drop the traveller and ease the mainsheet, flatten the sails, move crew weight forward and to windward to reduce heel, and as a rig tune, rake the mast forward or reduce mast bend. The opposite fault, LEE HELM (the bow falls away from the wind and you must pull the tiller to windward), is considered dangerous because the boat bears away and accelerates in a gust instead of luffing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sail-trapeze',
    title: 'The Trapeze on a Racing Dinghy',
    category: 'Sailing',
    keywords: [
      'what is a trapeze on a racing dinghy', 'a trapeze is a wire that runs from high up on the mast down to the side deck of a small fast sailboat a crew member clips the wire to a hook on a harness they wear and then stands on the gunwale edge of the boat and leans right out horizontally over the water',
      'the point is leverage by getting their body weight far outboard the crew provide a large righting moment that counteracts the heeling force of the wind and keeps the boat flat which lets the boat carry much more sail and go faster',
      'boats like the 470 49er nacra and many skiffs and cats use trapezes single trapeze for the crew or twin trapeze for both helm and crew on a windy day trapezing is physically demanding and a mistimed tack drops you in the water',
    ],
    content: `A trapeze is a device on a fast, lightly built sailing dinghy or catamaran that lets a crew member use their body weight far more effectively to hold the boat upright. It is a wire (or rope) fixed high on the mast, near the hounds, running down to the boat's side deck with an adjustable handle and a ring. The crew wears a padded harness with a hook at the waist, clips the hook into the ring, extends the wire, puts their feet on the gunwale (the outer edge of the boat), and stands out horizontally, fully extended over the water with only their feet touching the boat. WHY: righting moment is weight times its horizontal distance from the boat's centreline. A crew simply sitting on the windward rail has their weight maybe half a metre outboard; on the trapeze it is nearer two metres out, several times the leverage. That extra righting moment offsets the heeling force of the wind, keeps the hull flat and driving efficiently, and lets the boat carry a bigger, more powerful sail plan than its weight alone could stand up to — which is why trapeze boats (470, 49er, 29er, most skiffs, Nacra and Hobie cats) are so fast. Single-trapeze boats put only the forward crew out; twin-trapeze boats (49er, skiffs) put both helm and crew on wires. It is athletic, and a mishandled tack or a lull dumps the trapezing crew straight into the water.`,
    createdAt: Date.now(),
  },
];
