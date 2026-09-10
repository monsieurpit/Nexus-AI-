import { KnowledgeItem } from '../../types';

/**
 * HOME_DIY_CONCEPTS_GAPS — batch 252 corrections. Home/DIY was a weak batch,
 * with many web dumps and wrong-domain answers:
 * - "primer vs paint" answered about artist's gesso and canvas priming.
 * - "stain vs sealant" answered about stains on clothing (wine, blood).
 * - "P-trap vs S-trap" answered about stock-market bull/bear traps.
 * - "shut-off valve vs stop valve" answered about heart valves.
 * - "120V vs 240V" was a Chevrolet Volt + NEMA connectors dump.
 * - "stud vs joist", "drywall vs plaster", "MDF vs particleboard", "grout vs
 *   mortar", "PVC vs PEX", "polyurethane vs varnish", "GFCI vs AFCI" were dumps.
 * - "circuit breaker vs GFCI" said they "do the same job".
 * - "15A vs 20A" said 20A carries "twice" the current (it is 1.33x).
 * - "water heater vs boiler" said a water heater "boils the water".
 * - "romex vs conduit", "plywood vs OSB", "caulk vs grout", "2x4 nominal vs
 *   actual" were cut before the second half.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'home-improvement', keywords, content, createdAt: now,
});

export const HOME_DIY_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-diy-breaker-vs-gfci',
    'Circuit breaker vs GFCI (and AFCI)',
    [
      'difference between a circuit breaker and a GFCI outlet', 'a standard circuit breaker protects the wiring from overcurrent overload or short circuit trips at 15 or 20 amps', 'a GFCI ground fault circuit interrupter protects people from shock it detects a tiny imbalance about 5 milliamps between hot and neutral meaning current is leaking to ground through a person and trips in milliseconds',
      'a GFCI does not protect against overloads a standard breaker does not protect against a fatal shock', 'an AFCI detects dangerous arcing to prevent fire dual-function breakers do all of it',
    ],
    `They protect against DIFFERENT hazards and are not interchangeable.

A STANDARD CIRCUIT BREAKER protects the WIRING and the house from OVERCURRENT. A thermal (bimetallic) element trips it on a sustained OVERLOAD (too many amps for the wire, causing heat), and a magnetic element trips it almost instantly on a SHORT CIRCUIT. It trips at the circuit's rating — 15 A or 20 A. It does NOT sense whether current is flowing through a person; a lethal shock of a few tens of milliamps is far below its trip point.

A GFCI (Ground Fault Circuit Interrupter — "RCD" in the UK) protects PEOPLE from electric SHOCK. It continuously compares the current going out on the HOT wire with the current returning on the NEUTRAL. If they differ by more than about 4-6 milliamps, current must be escaping to ground somewhere — possibly through a person — and it cuts power in about 25 milliseconds. It is required in wet or damp locations: bathrooms, kitchens, garages, basements, outdoors. It does NOT protect against overloads.

An AFCI (Arc Fault Circuit Interrupter) protects against FIRE: it recognises the erratic electrical signature of a dangerous ARC (a frayed cord, a loose terminal, a nail through a cable) and trips before it can ignite nearby material. Required in most living areas (bedrooms, living rooms).

Modern panels can use combination "dual-function" breakers that provide overcurrent + GFCI + AFCI protection in one device.`,
  ),
  k(
    'kb-gap-diy-120v-vs-240v',
    '120-volt vs 240-volt in a North American home',
    [
      'difference between 120 volt and 240 volt in a home', 'North American homes get split-phase 240 volt service two 120 volt hot legs plus a neutral', 'standard outlets lights and small appliances use 120 volts one hot plus neutral',
      'large appliances electric range oven dryer water heater central AC EV charger use 240 volts both hot legs', 'doubling the voltage halves the current for the same power so thinner wire and less loss 240 volt circuits use double-pole breakers and NEMA 10 or 14 outlets', 'not the Chevrolet Volt',
    ],
    `North American homes receive "SPLIT-PHASE" service from the utility: two 120-volt "HOT" legs that are 180 degrees out of phase, plus a NEUTRAL. Measuring one hot to neutral gives 120 V; measuring hot to hot gives 240 V.

120-VOLT circuits use ONE hot leg + neutral (+ ground). They run everything ordinary: lights, receptacles, TVs, computers, small kitchen appliances, most power tools. Wired with 14-gauge wire on 15 A breakers or 12-gauge on 20 A.

240-VOLT circuits use BOTH hot legs (and sometimes neutral + ground), and a DOUBLE-POLE breaker (two handles tied together). They serve high-power appliances: electric ranges and ovens, clothes DRYERS, electric WATER HEATERS, central air conditioning, whole-house heat, welders, and EV chargers.

Why use 240 V for the big loads: power = volts x amps, so at DOUBLE the voltage an appliance draws HALF the current for the same wattage. Less current means thinner (cheaper) wire, smaller breakers, and less energy lost as heat in the wiring. 240 V outlets are physically different (NEMA 10-30, 14-30, 14-50, 6-20, etc.) so you cannot plug a dryer into a normal socket.

(Most of the rest of the world simply supplies 230 V single-phase to every outlet.)`,
  ),
  k(
    'kb-gap-diy-primer-vs-paint',
    'Primer vs paint (house painting)',
    [
      'difference between primer and paint', 'primer is a preparatory undercoat designed to stick to the surface and give the topcoat something to bond to it seals porous surfaces bare wood new drywall blocks stains and tannins and hides the old colour it is flat and usually white or grey not the final look', 'paint the topcoat provides the colour sheen washability and wear or weather protection',
      'prime bare patched glossy stained or drastically colour-changed surfaces paint-and-primer-in-one is a thick self-priming paint for surfaces already in good condition', 'not artists gesso',
    ],
    `PRIMER is a preparatory UNDERCOAT. Its jobs (this is house painting, not artist's gesso):
- ADHESION: it is formulated to grip difficult surfaces (bare wood, bare metal, glossy old paint, plastic) and give the topcoat a sound base to bond to.
- SEALING: bare wood, new drywall, and patched areas are POROUS and would soak up the topcoat unevenly ("flashing", dull patches); primer seals them so the finish coat goes on uniformly.
- STAIN-BLOCKING: it locks in water stains, smoke, marker, tannin bleed from knots and cedar/redwood, so they do not ghost through the finish.
- HIDING: it provides a uniform, usually white or grey base that covers the old colour so the new colour reaches its true shade in fewer coats.
Primer is FLAT and not meant to be the final surface — it is chalky and not very washable.

PAINT (the topcoat, or "finish coat") delivers what you actually want on the wall: the COLOUR, the SHEEN (flat, eggshell, satin, semi-gloss, gloss), washability and scuff resistance, and, outdoors, protection from sun, rain, and mildew.

Prime when the surface is bare, freshly patched, glossy, stained, previously oil-painted, or changing colour dramatically. "Paint & primer in one" is just a thicker, higher-solids paint that can self-prime over sound, previously painted surfaces — it does not replace a real primer on bare or problem surfaces.`,
  ),
  k(
    'kb-gap-diy-stain-vs-sealant',
    'Wood stain vs sealant / finish',
    [
      'difference between a stain and a sealant wood', 'wood stain is a colorant pigment or dye in a carrier that soaks into the wood to change its colour while letting the grain show through it adds little or no protection and little surface film', 'a sealant or sealer or topcoat or finish polyurethane lacquer varnish shellac oil forms a protective layer that seals the wood against moisture dirt UV and wear and provides the sheen',
      'typical sequence sand then stain for colour then seal or topcoat for protection some products combine them stain and seal in one', 'not stains on clothing',
    ],
    `In wood finishing (nothing to do with wine or grease stains on clothes):

A STAIN is a COLOURANT — pigment and/or dye suspended in a thin carrier (oil, water, or solvent). You wipe or brush it on and wipe off the excess; the colour SOAKS INTO the wood fibres, deepening or changing the tone while leaving the GRAIN VISIBLE. A stain adds almost NO protection and builds little or no film on the surface — stained-but-unfinished wood still absorbs water and dirt and wears.

A SEALANT / SEALER / FINISH / TOPCOAT (polyurethane, lacquer, varnish, shellac, hard-wax oil, spar urethane) forms a PROTECTIVE LAYER that seals the wood against MOISTURE, dirt, spills, UV, and abrasion, and it provides the final SHEEN (matte to gloss). It is what makes a tabletop wipeable and a floor walkable. (A dedicated "sealer" or "sanding sealer" is sometimes a thin first coat that seals the pores and is then topcoated.)

The normal sequence for finishing bare wood: SAND smooth -> STAIN for colour (optional) -> let it dry -> apply SEALER/TOPCOAT for protection, 2-3 coats with light sanding between. Some products are "stain and polyurethane in one" (or a tinted oil) that colour and protect in the same coat, trading a little of each for convenience.`,
  ),
  k(
    'kb-gap-diy-ptrap-vs-strap',
    'P-trap vs S-trap (plumbing)',
    [
      'difference between a P-trap and an S-trap', 'both are curved drain sections that hold a water seal a plug of standing water that blocks sewer gases from entering the room', 'a P-trap exits horizontally into the wall then connects to a vented drain code-compliant everywhere the vent prevents siphoning',
      'an S-trap exits downward through the floor it can siphon itself dry as water rushes down leaving no water seal and letting sewer gas in S-traps are prohibited by modern plumbing codes', 'not stock-market bull and bear traps',
    ],
    `Both are the curved section of drainpipe just below a sink, tub, or fixture, and both do the same essential job: they hold a small pool of standing water — the "TRAP SEAL" — that physically blocks foul SEWER GAS (and vermin) from coming back up the drain into your home. (Nothing to do with trading "bull traps" and "bear traps".)

A P-TRAP is shaped like the letter P lying on its side: water drops down, curves through the U-bend, and then the outlet runs HORIZONTALLY into the wall, where it joins a drain line that is properly VENTED (an air path to the roof or an air-admittance valve). The vent lets air in behind the draining water so it cannot pull a vacuum, so the trap seal stays intact. P-traps are the required, code-compliant design everywhere.

An S-TRAP is shaped like an S: after the U-bend, the outlet turns straight DOWN through the floor. The problem is SELF-SIPHONAGE — as a full sink drains, the column of water falling down that vertical outlet acts like a siphon and can suck the trap DRY, leaving nothing to block sewer gas until the next use. S-traps were common in old houses but are PROHIBITED by modern plumbing codes. If you find one, the fix is to reconfigure it as a vented P-trap (or add an air-admittance valve).`,
  ),
  k(
    'kb-gap-diy-shutoff-vs-stop-valve',
    'Shut-off valve vs stop valve (plumbing)',
    [
      'difference between a shut-off valve and a stop valve', 'they are essentially the same thing a valve installed in a water supply line to shut off flow to a fixture or section for repairs without shutting the whole house', 'US terms angle stop supply stop UK term stopcock main shut-off where water enters the house isolation valves at appliances',
      'some distinguish a globe-style stop valve good for throttling from a gate or ball valve full open or closed but the terms are used interchangeably in everyday plumbing', 'not heart valves',
    ],
    `In plumbing (not cardiology), "SHUT-OFF VALVE" and "STOP VALVE" mean essentially the SAME thing: a valve fitted into a water supply line so you can turn the water OFF to one fixture or one part of the house — to fix a tap, swap a toilet, or replace a washing machine — WITHOUT shutting off the whole property.

Common examples, all of which get called either name:
- the small chrome valve on the pipe under a sink or behind a toilet (US: "angle stop" or "supply stop"; UK: "isolation valve");
- the MAIN shut-off / STOPCOCK where the water supply enters the building (and often a second one at the street/meter);
- isolation valves at a boiler, water heater, or outside tap.

Some plumbers draw a fine distinction — a "STOP VALVE" strictly meaning a GLOBE-pattern valve (with a washer seating against a port), which can THROTTLE flow and is good for a main shut-off; versus a GATE VALVE or BALL VALVE, which are really only meant to be fully OPEN or fully CLOSED. But in normal use "stop valve", "shut-off valve", "stopcock", and "isolation valve" are interchangeable terms for "the valve you close to work on the plumbing downstream of it".`,
  ),
  k(
    'kb-gap-diy-stud-vs-joist',
    'Stud vs joist (framing)',
    [
      'difference between a stud and a joist', 'a stud is a vertical framing member in a wall running between the bottom plate and the top plate spaced 16 or 24 inches on centre sheathing and drywall attach to it studs carry the walls load down', 'a joist is a horizontal framing member that supports a floor or ceiling running between beams or bearing walls spaced 16 inches on centre carrying the floor or ceiling load across the span',
      'studs are vertical in walls joists are horizontal in floors and ceilings', 'rafters are the sloped roof members',
    ],
    `Both are repetitive wood (or steel) framing members, but they run in different directions and carry different loads.

A STUD is VERTICAL. Studs stand between the bottom (sole) plate and the top plate of a WALL, spaced typically 16 inches (sometimes 24) "on centre". They give the wall its height and shape, provide the nailing surface for sheathing on the outside and drywall on the inside, and — in an exterior or load-bearing wall — they carry the weight from above straight DOWN to the floor and foundation. Around openings you also get "king studs", "jack (trimmer) studs", "cripples", and a horizontal "header" over the opening.

A JOIST is HORIZONTAL. Joists run across a span between beams, girders, or load-bearing walls, spaced about 16 inches on centre, and they support a FLOOR (floor joists, with subfloor nailed on top) or a CEILING (ceiling joists, with drywall screwed underneath). They carry the load of people, furniture, and the ceiling ACROSS to the supports. Deep engineered "I-joists" and trusses span farther than solid lumber.

Quick check: if it's up-and-down inside a wall, it's a STUD; if it's flat and level under a floor or above a ceiling, it's a JOIST; if it's sloped under the roof, it's a RAFTER.`,
  ),
  k(
    'kb-gap-diy-drywall-vs-plaster',
    'Drywall vs plaster',
    [
      'difference between drywall and plaster', 'drywall plasterboard wallboard Sheetrock comes as prefabricated panels of gypsum core in paper you screw them to the studs tape and mud the joints sand and paint fast cheap DIY-friendly the standard since the mid 20th century', 'plaster is applied wet as a paste in coats over lath or blueboard then troweled smooth by a skilled plasterer and left to cure hard giving a harder more monolithic more soundproof more fire-resistant seamless surface but slow labour-intensive expensive skilled work mostly in pre-1950s homes',
    ],
    `Both give a smooth interior wall and ceiling surface, and both are gypsum-based, but they are installed completely differently.

DRYWALL (also plasterboard, wallboard, gyprock, or the brand "Sheetrock") comes as large prefabricated PANELS — a gypsum core faced with paper, typically 4 ft x 8 ft (or bigger) and 1/2" or 5/8" thick. You screw the sheets to the studs and joists, TAPE the seams and cover the tape and the screw dimples with joint compound ("mud"), sand smooth once dry, prime, and paint. It is FAST, CHEAP, forgiving, and DIY-friendly, and it has been the standard for new construction since about the 1950s.

PLASTER is applied WET, on site, in COATS. Over a base of wooden LATH (old houses), metal lath, or gypsum "blueboard" (modern veneer plaster), a plasterer trowels on a scratch coat, a brown coat, and a thin finish coat, working it smooth by hand before it sets, and it then CURES to a very hard, dense, monolithic surface. Plaster is HARDER and more dent-resistant, more SOUNDPROOF, more FIRE-RESISTANT, has NO visible seams, and can follow curves and arches — but it is slow, messy, expensive, and genuinely skilled work. It is found in pre-1950s homes and in restoration and high-end work.

Repair note: small holes in either are patched with spackle or joint compound; larger drywall holes get a patch, larger plaster damage often needs a plasterer.`,
  ),
  k(
    'kb-gap-diy-grout-vs-mortar',
    'Grout vs mortar (vs thinset)',
    [
      'difference between grout and mortar tile', 'mortar or thinset is a stiffer sand and cement or polymer-modified adhesive paste used UNDER tiles to bond them to the substrate and set them in a bed it is the glue', 'grout is a thinner paste applied AFTER the mortar has set worked INTO the joints between the already stuck tiles to fill and seal the gaps sanded for wide joints unsanded or epoxy for narrow ones',
      'mortar sticks tiles down grout fills the spaces between them', 'in masonry mortar bonds bricks grout is a fluid mix poured into block cores',
    ],
    `Both are cement-based, but they do opposite jobs in a tile installation and have different consistencies.

MORTAR — for tile, the relevant type is THINSET mortar (a mix of Portland cement, fine sand, and a water-retaining/polymer additive) — is the ADHESIVE BED that goes UNDERNEATH the tiles. You trowel it onto the substrate, comb it with a notched trowel, and press each tile into it; it bonds the tile to the wall or floor and to the backer board, and it fills any small dips so the tiles sit flat. It is applied FIRST and must cure before you grout. (Mastic is a premixed alternative adhesive for dry wall areas.)

GROUT is applied AFTER the thinset has set and the tiles are firmly stuck. It is a thinner paste (sanded grout for joints wider than ~3 mm, unsanded for thin joints, or epoxy grout for stain resistance) that you spread over the tile and force INTO the JOINTS between the tiles with a rubber float, then wipe the surface clean. Grout locks the tiles together, keeps water and dirt out of the gaps, and gives the finished surface its lines and colour.

Short version: mortar/thinset STICKS the tiles down (underneath); grout FILLS THE GAPS between them (on top, later).

(In brick/block masonry, "mortar" is what bonds the units together in the bed and head joints; "grout" there means a very fluid concrete mix poured into hollow block cores or wall cavities to fill them and encase reinforcing steel.)`,
  ),
  k(
    'kb-gap-diy-pvc-vs-pex',
    'PVC vs PEX pipe',
    [
      'difference between PVC and PEX pipe', 'PVC polyvinyl chloride white rigid pipe used for drain waste vent lines and cold water cheap rigid joined with solvent cement glued not rated for hot water CPVC is the hot-water version', 'PEX cross-linked polyethylene flexible red blue white tubing used for hot and cold supply lines bends around corners with far fewer fittings resists freeze bursting fast to install with crimp clamp or push fittings quiet does not corrode or scale cannot be used in sunlight',
      'PEX has largely replaced copper and CPVC for residential water supply PVC and ABS remain standard for drains',
    ],
    `Both are plastic plumbing pipe, but for different parts of the system.

PVC (polyvinyl chloride) is RIGID, white or cream, and comes in straight lengths joined with fittings and SOLVENT CEMENT (primer + glue that chemically welds the joint). Its main use is DRAIN, WASTE, and VENT (DWV) piping and cold-water lines and irrigation. Standard PVC is NOT rated for HOT water — it softens and can fail; the hot-rated version is CPVC (chlorinated PVC, usually cream or grey), which can carry domestic hot water. PVC is cheap and strong but every direction change needs a glued fitting.

PEX (cross-linked polyethylene) is FLEXIBLE tubing, sold in coils, usually colour-coded red (hot), blue (cold), white. Its main use is domestic WATER SUPPLY, both hot and cold. Because it BENDS, a whole bathroom can be plumbed with long continuous runs and very few fittings; it resists bursting when frozen (it expands), it is fast to install with crimp rings, clamp rings, or push-fit connectors, it is quiet (no water hammer), and it does not corrode or build up scale like metal. Limitations: it degrades in UV so it cannot be run in sunlight or outdoors exposed, and it needs brass transition fittings to connect to metal pipe or fixtures.

In practice: modern homes use PEX for supply (it has largely displaced copper and CPVC), and PVC or ABS for the drains.`,
  ),
  k(
    'kb-gap-diy-polyurethane-vs-varnish',
    'Polyurethane vs varnish (wood finish)',
    [
      'difference between polyurethane and varnish', 'varnish is the traditional broad term for a clear finish of oil plus resin plus solvent that cures by oxidation into a hard film natural-resin varnishes give a warm durable somewhat flexible finish good for outdoor and marine work spar varnish', 'polyurethane is a specific modern synthetic resin finish essentially a type of varnish extremely hard abrasion and chemical resistant oil-based ambers slow-dry strong fumes water-based clear non-yellowing fast-dry low odour slightly less hard the go-to for floors tables and high-wear indoor surfaces',
    ],
    `Both are CLEAR, film-forming protective TOPCOATS for wood; polyurethane is a modern subtype of varnish.

VARNISH (traditional sense) is a finish made from a drying OIL (linseed, tung) cooked with a RESIN and thinned with SOLVENT. It cures by OXIDATION — reacting with air — into a hard, glossy film. Classic varnishes use natural or older synthetic resins and give a warm (slightly amber) tone, good build, and a finish that stays somewhat FLEXIBLE and holds up well OUTDOORS. "SPAR" or "marine" varnish is formulated with more oil and UV absorbers specifically for exterior wood — boat brightwork, doors, garden furniture — where the wood moves with weather and sunlight is harsh.

POLYURETHANE is a varnish that uses a synthetic POLYURETHANE RESIN. It cures HARDER than traditional varnish and is far more resistant to ABRASION, scuffing, water, and household CHEMICALS, which makes it the standard for FLOORS, tabletops, worktops, stair treads, and other high-wear INDOOR surfaces. It comes in two forms:
- OIL-BASED polyurethane: very durable, adds a warm amber tint, dries slowly, strong solvent fumes.
- WATER-BASED polyurethane: dries fast, stays crystal-clear (no yellowing), low odour, easier cleanup, slightly less hard and less warm-looking.

Trade-off: polyurethane is tougher indoors but can crack or peel on exterior wood that flexes and sits in the sun, where a flexible spar varnish lasts better.`,
  ),
  k(
    'kb-gap-diy-mdf-vs-particleboard',
    'MDF vs particleboard',
    [
      'difference between MDF and particleboard', 'both are engineered wood made from wood waste bonded with resin and pressed into panels', 'particleboard chipboard uses coarser wood particles and chips cheaper lighter weaker rough surface visible chips at cut edges holds screws poorly swells badly with moisture used for cheap flat-pack furniture and cabinet boxes usually with a laminate surface',
      'MDF medium-density fibreboard uses wood broken to fine fibres denser heavier much more uniform very smooth hard surface clean machinable edges paints beautifully used for painted trim moulding cabinet doors and speaker boxes still poor with moisture dust is a respiratory irritant',
    ],
    `Both are ENGINEERED wood panels made by bonding wood WASTE with resin under heat and pressure, but the particle size is different, and that changes everything.

PARTICLEBOARD (chipboard) is made from relatively COARSE wood PARTICLES — chips, flakes, and sawdust. It is the CHEAPEST and lightest, but also the WEAKEST and least dense; its surface is a bit rough and its cut edges show visible chips and voids. It holds SCREWS POORLY (they strip out, especially on a second insertion), and it SWELLS and crumbles badly if it gets wet. Uses: budget flat-pack furniture, cabinet carcasses, shelving, underlayment — almost always covered with a melamine or laminate skin or a wood veneer.

MDF (Medium-Density Fibreboard) is made from wood broken all the way down to fine FIBRES, so the panel is DENSER, heavier, and extremely UNIFORM throughout with no grain and no voids. Its faces and cut edges are very SMOOTH and HARD, they machine cleanly (you can rout a crisp profile into an MDF edge), and they take PAINT beautifully. Uses: painted trim and moulding, baseboards, cabinet doors and panels, wainscoting, and speaker enclosures.

Both are still poor around MOISTURE (moisture-resistant grades exist), both are heavy, and MDF DUST is a fine respiratory irritant — wear a mask and cut it outside or with dust collection.`,
  ),
  k(
    'kb-gap-diy-plywood-vs-osb',
    'Plywood vs OSB',
    [
      'difference between plywood and OSB', 'plywood is made of thin wood veneers plies glued in odd-numbered layers with grain alternating 90 degrees stronger stiffer lighter holds fasteners better dries out faster after getting wet looks better', 'OSB oriented strand board is made of large wood strands compressed and glued in cross-oriented layers cheaper more uniform bigger sizes now the dominant sheathing and subfloor material heavier swells permanently at cut edges when wet and dries slowly holds screws slightly less well',
      'structurally rated equivalent for most uses plywood preferred for wet-prone or visible applications',
    ],
    `Both are structural wood PANELS used for wall and roof SHEATHING, SUBFLOORS, and general construction, and both are rated by the same span/strength standards — an APA-rated 7/16" OSB and 15/32" plywood are treated as equivalent for sheathing a wall.

PLYWOOD is built from thin sheets of real wood — VENEERS or "plies" — glued together in an ODD number of layers (3, 5, 7...) with the grain of each layer running 90 degrees to the next. That cross-lamination makes it strong and STIFF in both directions, and relatively LIGHT. It holds nails and screws well, especially at the edges, it DRIES OUT and returns close to its original size after a soaking, and it has a cleaner face — so it is preferred where the panel will be VISIBLE, get WET, or be repeatedly fastened (cabinet-grade plywood, boat building, exposed soffits, subfloor in bathrooms).

OSB (Oriented Strand Board) is built from large, thin wood STRANDS (flakes) mixed with resin and wax and pressed in layers, with the strands in each layer roughly ALIGNED and the layers cross-oriented. It is CHEAPER, very UNIFORM (no soft spots or voids), and comes in bigger sheets. It is now the DOMINANT choice for house sheathing and subfloors. Downsides: it is HEAVIER, it SWELLS at cut edges when it gets wet and does NOT fully recover (that permanent "cornflake" edge), it dries slowly, and it grips screws a little less firmly.

Rule of thumb: OSB for most hidden structural sheathing (to save money); plywood where it will get wet, show, or be re-fastened.`,
  ),
  k(
    'kb-gap-diy-2x4-nominal-vs-actual',
    "2x4 nominal size vs actual size",
    [
      'difference between a 2x4 nominal and actual size', 'a 2x4 is the nominal size the rough dimensions when first cut from the log about 2 inches by 4 inches', 'then it is dried and planed smooth on all four sides which removes material so the actual dressed size of a standard 2x4 is 1.5 by 3.5 inches',
      '2x6 is 1.5 by 5.5 1x4 is 0.75 by 3.5 2x10 is 1.5 by 9.25', 'the nominal number is a naming convention not a measurement use actual dimensions for layout',
    ],
    `The number on a piece of dimensional lumber is a NOMINAL size — a name, not a measurement.

When a board is first rough-sawn from the log it is roughly its nominal size: a "2x4" starts out about 2 inches by 4 inches. But it is then KILN-DRIED (which shrinks it) and PLANED SMOOTH ("surfaced") on all four sides, which removes about 1/4 inch from each face. So the FINISHED ("dressed", "S4S") board you buy is smaller:

- 2x4  -> actual 1-1/2" x 3-1/2"
- 2x6  -> actual 1-1/2" x 5-1/2"
- 2x8  -> actual 1-1/2" x 7-1/4"
- 2x10 -> actual 1-1/2" x 9-1/4"
- 2x12 -> actual 1-1/2" x 11-1/4"
- 1x4  -> actual 3/4" x 3-1/2"
- 1x6  -> actual 3/4" x 5-1/2"

Note the pattern: everything "2x" is actually 1-1/2" thick; anything 6" nominal or wider loses 3/4" off the width, not 1/2".

This matters constantly: two 2x4s face to face are 3", a stud wall framed with 2x4s is 3-1/2" plus drywall each side, and a "1-inch" shelf board is really 3/4" thick. Always work from the ACTUAL dimensions. (Rough-sawn or "full-dimension" lumber from a small sawmill can be the true nominal size — check.)`,
  ),
  k(
    'kb-gap-diy-caulk-vs-grout',
    'Caulk vs grout',
    [
      'difference between caulk and grout', 'grout is a cement-based or epoxy paste that fills the gaps between tiles on the same plane locking them in place rigid and porous cement grout comes in colours', 'caulk is a flexible elastomeric sealant silicone latex polyurethane used where two different planes or materials meet and movement occurs inside corners of a tiled shower where tile meets a tub or countertop around windows and trim expansion joints',
      'grout between tiles on the same plane caulk in corners and where tile meets a different material because those joints flex and grout would crack',
    ],
    `Both fill gaps in tilework, but in different places, because one is RIGID and one is FLEXIBLE.

GROUT is a cement-based (or epoxy) paste that fills the JOINTS BETWEEN TILES that lie on the SAME FLAT PLANE — the field of a floor or a wall. Once cured it is hard and rigid; it locks the tiles together, keeps water and grit out of the gaps, and gives the finished surface its grid of lines. Cement grout is slightly porous (usually sealed) and comes in many colours; epoxy grout is waterproof and stain-proof but harder to work.

CAULK (a flexible SEALANT — usually 100% silicone for wet areas, or siliconised latex, or polyurethane) is used wherever two surfaces meet at an ANGLE or where DIFFERENT MATERIALS join and the joint will MOVE slightly with temperature, settling, or use:
- the inside CORNERS of a tiled shower or backsplash (wall-to-wall, wall-to-floor);
- where tile meets the BATHTUB, shower base, or COUNTERTOP;
- around window and door frames, baseboards, and where trim meets the wall;
- expansion joints in large tiled floors.

If you put rigid grout in those flexing spots it CRACKS and lets water behind the tile. If you caulk the flat field joints instead of grouting them, they will not hold up. Rule: GROUT the flat joints between tiles; CAULK the corners and the changes of plane or material.`,
  ),
  k(
    'kb-gap-diy-water-heater-vs-boiler',
    'Water heater vs boiler',
    [
      'difference between a water heater and a boiler', 'a water heater heats potable water for taps showers and appliances domestic hot water stored in a tank or heated on demand tankless it heats water to about 49 to 60 degrees C not boiling', 'a boiler heats water or makes steam that circulates in a closed loop through radiators baseboard heaters or underfloor pipes to heat the building hydronic heating the same water goes round and round and never comes out a tap',
      'a combi boiler does both space heating plus on-demand domestic hot water',
    ],
    `Despite the name, a domestic WATER HEATER does not boil water and a BOILER's job is usually not to give you hot tap water.

A WATER HEATER produces DOMESTIC HOT WATER — the hot water that comes out of your taps, shower, dishwasher, and washing machine. A tank type keeps 40-80 gallons heated to a thermostat setting (typically 49-60 C / 120-140 F — well below boiling) and refills as you draw it off; a TANKLESS (on-demand) type heats water instantly as it flows through. The water it heats is consumed and replaced with fresh cold water.

A BOILER is part of a HYDRONIC HEATING system. It heats water (or, in older/commercial systems, makes STEAM) that is pumped around a CLOSED LOOP of pipes to RADIATORS, baseboard convectors, or underfloor tubing to HEAT THE ROOMS. That same water recirculates continuously and never comes out of a tap. It runs on gas, oil, electricity, or is fed from a heat pump.

The overlap: a COMBI ("combination") BOILER does BOTH — it provides central heating AND heats domestic hot water on demand through a heat exchanger, with no separate hot-water tank. And a boiler can heat a house's tap water indirectly by warming a coil inside a separate storage cylinder. But a plain "water heater" only makes tap hot water, and a plain "boiler" only drives the heating.`,
  ),
  k(
    'kb-gap-diy-rvalue-vs-uvalue',
    'R-value vs U-value (insulation)',
    [
      'difference between R-value and U-value insulation', 'R-value measures resistance to heat flow higher is better it adds up when materials are layered used to rate insulation products fibreglass batts foam board blown cellulose', 'U-value U-factor measures the rate of heat transfer through a whole assembly lower is better used for windows and doors and whole-wall or roof code compliance because it accounts for framing air films and thermal bridges',
      'for a simple assembly U is approximately 1 divided by the total R', 'R is about a material U is about a system',
    ],
    `They measure the same physics from opposite ends.

R-VALUE is thermal RESISTANCE — how well a material RESISTS the flow of heat through it. HIGHER is better (more insulating). Its great convenience is that R-values ADD UP when you layer materials: R-13 batt + R-5 foam sheathing + small contributions from drywall and siding and the still-air films = a total. R-value is how INSULATION PRODUCTS are sold and compared — "R-38 in the attic", an R-value per inch for foam board, etc. It describes a MATERIAL (or a stack of materials at one spot).

U-VALUE (or "U-factor") is thermal TRANSMITTANCE — the RATE at which heat actually passes through a complete ASSEMBLY per unit area per degree of temperature difference. LOWER is better. It is used for WINDOWS and DOORS (you will see "U-factor 0.30" on the label) and for whole-wall and whole-roof energy-code compliance, because it captures what an R-value at one point misses: the framing studs and joists (which conduct more than the insulated cavities — "thermal bridging"), the interior and exterior air films, and gaps. It describes a SYSTEM as built.

The link: for a simple assembly, U is roughly 1 divided by the total R (U approx 1/R_total). So an R-5 window is about U-0.20; a wall whose real, framing-adjusted "effective R" is R-16 has a U of about 0.06. R is what you buy; U is how the finished building performs.`,
  ),
  k(
    'kb-gap-diy-nail-vs-screw',
    'Nail vs screw',
    [
      'difference between a nail and a screw', 'a nail has a smooth or ringed shank driven with a hammer or nail gun fast holds well in shear force across it and allows some flex good for framing and where many fasteners share the load', 'a screw is threaded driven by turning grips via its threads far better holding and withdrawal resistance removable but more brittle in shear can snap under sudden lateral load slower to drive',
      'framing and structural sheathing use nails cabinetry and drywall and anything you may take apart use screws',
    ],
    `A NAIL has a mostly SMOOTH shank (sometimes ringed or spiral for extra grip) and is driven straight in with a HAMMER or nail gun. It holds mainly by FRICTION along the shank and by the wood fibres pinching it. Nails are FAST to drive, cheap, and — importantly — they are strong in SHEAR (a load acting sideways across the fastener) and they FLEX a little rather than snapping, so they tolerate the racking and vibration of a building. They resist being pulled straight out (WITHDRAWAL) relatively poorly. Nails are the fastener for structural FRAMING, sheathing, subfloor, roofing, and lath — anywhere many fasteners share the load and shear and toughness matter.

A SCREW has a THREADED shank and is driven by TURNING it (screwdriver or drill). The threads cut into the wood and pull the parts tightly together, giving far superior HOLDING and WITHDRAWAL strength, and a screw can be backed OUT to disassemble or adjust. The trade-offs: screws are slower to install, and the hardened steel of many (especially drywall and deck screws) is BRITTLE in SHEAR — a sudden sideways impact can SNAP the head off, which is why building codes do not allow ordinary screws for structural framing connections (special structural screws are rated for it). Use screws for cabinets, trim, hardware, decking boards, drywall, and anything you might take apart.`,
  ),
  k(
    'kb-gap-diy-screwdriver-drives',
    'Phillips vs flathead vs Torx vs Robertson (screw drives)',
    [
      'difference between a Phillips and a flathead screwdriver', 'flathead slotted a single straight slot cheap tends to slip out (cam out) and mar the work', 'Phillips a cross or plus-shaped recess self-centring designed to cam out under high torque to limit overtightening in the pre-torque-wrench era',
      'Torx a six-point star holds without camming out for high torque common in cars electronics and decks', 'Robertson a square recess grips well and self-holds standard in Canada', 'Pozidriv is an improved Phillips',
    ],
    `These are SCREW DRIVE types — the shape of the recess in the screw head and the matching bit.

SLOTTED ("flathead"): a single straight SLOT. The oldest type, cheap to make, but the driver easily slips OUT sideways ("cam-out"), scratching the surface and rounding the slot. Fine for light-duty and where a screwdriver must double as a pry.

PHILLIPS: a CROSS / plus-shaped recess with tapered walls. It SELF-CENTRES the driver, so it is faster and neater than slotted. It was deliberately designed to CAM OUT (pop the driver up and out) once a certain torque is reached — in the 1930s, before torque tools, this protected assembly-line work from being over-tightened. That same cam-out is annoying today when you want to drive hard, and it chews up the head ("stripping").
- POZIDRIV looks similar (extra small lines between the cross arms) but is a refined design that resists cam-out — do not mix Pozidriv screws with a Phillips bit.

TORX: a six-pointed STAR. It transfers high torque with almost NO cam-out and spreads load over more contact area, so it strips far less. Standard on cars, appliances, electronics, and modern deck screws.

ROBERTSON: a SQUARE recess. Excellent grip, and the screw stays stuck on the bit for one-handed work. The default in Canada.

Others: hex/Allen (internal hexagon), spline, and security drives. Match the bit to the screw — using a Phillips bit on a Pozidriv or Torx screw, or a too-small bit, is the fastest way to strip a head.`,
  ),
  k(
    'kb-gap-diy-latex-vs-oil-paint',
    'Latex (water-based) vs oil-based paint',
    [
      'difference between latex and oil-based paint', 'latex water-based acrylic paint carries pigment in water dries fast low odour soap-and-water cleanup stays flexible does not yellow low VOC the modern default for walls and most exterior work', 'oil-based alkyd paint carries pigment in a solvent slow-dry strong fumes mineral-spirits cleanup dries to a harder smoother self-levelling finish better stain-blocking and adhesion to glossy or tricky surfaces but yellows over time and is increasingly restricted by VOC laws now mostly for trim doors metal and problem areas',
    ],
    `The difference is the CARRIER (what evaporates as it dries) and the BINDER, and everything else follows from that.

LATEX / WATER-BASED / ACRYLIC paint suspends its pigment and binder in WATER. Advantages: dries fast (recoat in hours), LOW ODOUR and low VOCs, cleans up with SOAP AND WATER, stays FLEXIBLE so it expands and contracts with the surface without cracking, does NOT yellow, and resists mildew. It is the modern DEFAULT for interior walls and ceilings and for most exterior work. Modern acrylic latexes are very durable; the main weaknesses are slightly less "flow" (brush marks) and weaker adhesion straight onto glossy or bare tricky surfaces without a primer.

OIL-BASED / ALKYD paint suspends the pigment in a solvent (mineral spirits / white spirit) with a drying-oil or alkyd resin binder that cures by OXIDATION. Advantages: it LEVELS out to a very smooth, hard, rich finish, it has excellent ADHESION and STAIN/TANNIN BLOCKING, and it is tough on high-wear surfaces. Disadvantages: strong FUMES, slow drying, cleanup needs SOLVENT, it becomes brittle and YELLOWS/ambers with age (obvious on white trim), and many regions now RESTRICT or ban it for VOC reasons. Today it survives mainly for trim, doors, cabinets, metal railings, and spot-priming stains.

You can put latex over cured oil paint if you scuff-sand and use a bonding primer; putting oil over fresh latex is riskier.`,
  ),
  k(
    'kb-gap-diy-romex-vs-conduit',
    'Romex (NM cable) vs conduit',
    [
      'difference between romex and conduit', 'Romex is a brand of NM nonmetallic-sheathed cable the insulated conductors plus a bare ground bundled inside a flexible plastic jacket run through holes in studs and joists inside walls cheap and fast for residential interior wiring in dry protected locations', 'conduit is rigid or flexible tubing metal EMT or rigid or PVC that you install first and then pull individual THHN wires through it physically protects the wires required for exposed runs wet outdoor underground commercial buildings and allows rewiring later',
    ],
    `They are two different ways to run building wiring.

"ROMEX" is a brand name (Southwire's) for NM CABLE — "nonmetallic-sheathed cable". It is a FINISHED CABLE: two or three insulated copper conductors plus a bare copper ground, all bundled inside a flexible plastic (PVC/nylon) JACKET, printed with the size ("14-2", "12-2 with ground"). You staple it to the framing and thread it through drilled holes in the studs and joists. It is CHEAP, light, and FAST, and it is the standard for wiring the INSIDE of houses — but only in DRY, PROTECTED locations (inside finished or unfinished walls, attics, floors). It must not be run exposed where it can be damaged, and generally not outdoors, underground, or in commercial buildings.

CONDUIT is TUBING that protects wires. You install the EMPTY conduit first — rigid metal, thin-wall metal ("EMT"), flexible metal ("greenfield"), or rigid PVC — bending and connecting it along the route, and THEN you PULL individual insulated wires ("THHN") through it. Conduit gives physical armour, so it is REQUIRED for exposed runs (garage and basement walls, along a wall surface), wet and outdoor locations (with weatherproof PVC or rigid), UNDERGROUND feeds, and most COMMERCIAL and industrial work. A bonus: because the wires are pullable, you can add or replace circuits later without opening walls.

Short version: Romex is a jacketed cable you staple inside finished walls; conduit is a pipe you route first and pull loose wires through, for protection and for exposed, wet, or commercial installations.`,
  ),
  k(
    'kb-gap-diy-15a-vs-20a-circuit',
    '15-amp vs 20-amp circuit',
    [
      'difference between a 15-amp and a 20-amp circuit', 'the amp rating is set by the breaker and the wire gauge 15-amp circuits use 14-gauge wire 20-amp circuits use 12-gauge thicker wire', 'a 20-amp circuit carries about 1.33 times the current of a 15-amp circuit not twice roughly 2400 watts continuous versus 1800 at 120 volts',
      '20-amp circuits are required for kitchens bathrooms laundry garages and heavy-load circuits 15-amp is standard for general lighting and bedroom outlets 20-amp receptacles have a T-shaped neutral slot',
    ],
    `The amp rating is the maximum current the circuit can safely carry, and it is set by TWO matched things: the BREAKER and the WIRE GAUGE.

A 15-AMP circuit uses 14-GAUGE copper wire on a 15 A breaker. Continuous safe load (the code 80% rule) is 12 A, about 1,440 W at 120 V; peak 15 A is about 1,800 W. 15 A is the standard for GENERAL-PURPOSE lighting and receptacle circuits in bedrooms and living rooms.

A 20-AMP circuit uses THICKER 12-GAUGE copper wire on a 20 A breaker. Continuous safe load is 16 A, about 1,920 W; peak 20 A is about 2,400 W. So a 20 A circuit carries about 1.33x the current of a 15 A circuit — NOT "twice". 20 A circuits are REQUIRED by code for the higher-demand areas: kitchen counter (small-appliance) circuits, bathrooms, the laundry, the garage, and any dedicated circuit for a big load (microwave, window AC, workshop tools). 20 A receptacles have one slot shaped like a sideways T so a 20 A plug fits only there.

Key safety rule: NEVER put a 20 A breaker on 14-gauge wire — the wire would overheat before the breaker trips. The breaker must protect the smallest wire on the circuit. You CAN use 12-gauge wire on a 15 A circuit (it is just heavier than needed).`,
  ),
  k(
    'kb-gap-diy-socket-vs-wrench',
    'Socket vs wrench (spanner)',
    [
      'difference between a socket and a wrench', 'a wrench or spanner is a hand tool with a fixed or adjustable open or closed end that grips a fastener directly open-end box-end combination adjustable', 'a socket is a separate cylindrical cup with a 6 or 12 point recess sized to the fastener on one end and a square drive hole on the other it attaches to a ratchet or breaker bar',
      'sockets fully surround the fastener less rounding swap quickly and the ratchet turns without repositioning open-end wrenches reach fasteners a socket cannot get over',
    ],
    `A WRENCH (British "spanner") is a complete hand tool that grips a bolt head or nut DIRECTLY. Common kinds: OPEN-END (a U-shaped jaw, slips on from the side, but grips only two flats so it can round a tight fastener), BOX-END / RING (a closed loop, usually 12-point, that surrounds the fastener and grips all corners — much stronger), COMBINATION (open one end, box the other, same size), and ADJUSTABLE ("crescent", one moving jaw). You turn it by swinging the handle, and on a tight spot you must lift it off and reposition it every partial turn.

A SOCKET is not a standalone tool — it is an interchangeable CUP. One end has a 6- or 12-point recess sized to a specific fastener; the other end has a SQUARE hole (1/4", 3/8", or 1/2" "drive") that clips onto a RATCHET HANDLE, a breaker bar, an extension, a universal joint, or a torque wrench or impact gun. The socket SURROUNDS the fastener on all sides (like a box wrench, so less rounding), and the RATCHET lets you turn the fastener continuously back-and-forth WITHOUT lifting the tool off — much faster in tight quarters, and you swap sockets in seconds to change size.

When to use which: a socket + ratchet for speed, access down a recess, and high torque; an open-end or box wrench where there is no room to fit a socket and ratchet, where you need to hold a nut still while turning the bolt, or on tube fittings (a "flare nut" wrench).`,
  ),
  k(
    'kb-gap-diy-torque-vs-tension-bolt',
    'Torque vs tension in a bolt',
    [
      'difference between torque and tension in a bolt', 'torque is the rotational force you apply to turn the bolt or nut measured in newton-metres or foot-pounds', 'tension also called preload or clamp load is the axial stretching force in the bolt shank that actually clamps the joint together',
      'you apply torque to create tension but most of the torque about 90 percent is lost to friction under the head and in the threads so only about 10 percent becomes clamp tension', 'critical joints use torque-angle torque-to-yield bolts or direct tension indicators',
    ],
    `When you tighten a bolt you APPLY torque, but what actually holds the joint together is TENSION.

TORQUE is the twisting effort you put in with the wrench — force times lever-arm length, measured in newton-metres (N.m) or foot-pounds (ft-lb). It is what the torque wrench reads.

TENSION (also called PRELOAD or CLAMP LOAD) is the force stretching the bolt along its axis once it is tight. A tightened bolt is a stiff spring: turning the nut stretches the bolt slightly, and the bolt pulls back, squeezing ("clamping") the parts together. That clamp force is what stops the joint from separating or the bolt from working loose under vibration.

The catch: the relationship between the torque you apply and the tension you get is LOOSE and inefficient. Most of your torque is spent overcoming FRICTION — roughly half under the bolt head or nut face, and a bit under half in the threads — so only about 10-15% of the applied torque actually turns into bolt tension. Anything that changes friction (rust, dirt, a lubed vs dry thread, a new vs reused bolt, plating) changes the resulting clamp load a LOT for the same torque reading. That is why "torque to X ft-lb" is only an approximate method.

For critical joints (engine heads, structural steel, wheels) engineers use better methods: TORQUE-ANGLE (snug, then turn a specified extra angle), TORQUE-TO-YIELD bolts (tightened just past their elastic limit for a consistent tension, then replaced each time), or direct tension-indicating washers/load cells.`,
  ),
];
