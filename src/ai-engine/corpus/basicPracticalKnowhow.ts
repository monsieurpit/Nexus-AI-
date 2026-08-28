import { KnowledgeItem } from '../../types';

export const BASIC_PRACTICAL_KNOWHOW_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-practical-address-envelope',
    title: 'How to Address an Envelope',
    category: 'practical-skills',
    keywords: ['how do you address an envelope', 'how to address an envelope', 'envelope format', 'where does the stamp go on an envelope', 'return address'],
    content: `Standard US envelope format: the **recipient's address** goes in the center of the envelope (roughly the middle-lower portion), written as: full name on the first line, street address on the second line, and city, state, and ZIP code on the third line (e.g., "Jane Smith / 123 Main St / Springfield, IL 62701"). The **return address** (your own address) goes in the top-left corner, in the same 3-line format. The **stamp** goes in the top-right corner. If mailing internationally, add the destination country's name in capital letters on its own line at the bottom of the recipient's address block. A few common conventions: apartment or unit numbers go on the same line as the street address, separated by a comma or "Apt"/"Unit" (e.g., "123 Main St, Apt 4B"); PO Box addresses replace the street address line entirely ("PO Box 456"); and it's generally good etiquette to write clearly and avoid overly stylized handwriting that a postal scanning machine or letter carrier might struggle to read, since illegible addresses are a common cause of mail delays or misdelivery.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-practical-egg-freshness-test',
    title: 'How to Tell If an Egg Is Still Good',
    category: 'practical-skills',
    keywords: ['how do you know if an egg is still good', 'egg freshness test', 'is my egg still good', 'egg float test', 'egg expiration'],
    content: `The most reliable at-home method is the **float test**: place the egg in a bowl of cold water. A fresh egg sinks and lies flat on its side at the bottom. An egg that's a few weeks old but still fine to eat will sink but stand more upright on one end. An egg that floats to the surface has gone bad and should be discarded. This works because eggshells are slightly porous, and as an egg ages, air gradually seeps in through the shell while moisture evaporates out, enlarging the small internal air pocket at the egg's blunt end — enough trapped air eventually makes the egg buoyant enough to float. Other useful checks: crack the egg into a separate bowl first (not directly into your dish) and check for an off, sulfurous smell (a clear sign of spoilage regardless of appearance), unusual coloring, or a runny, watery texture rather than a firm, contained yolk and white. Properly refrigerated eggs generally stay safe well past printed "sell-by" dates (often several weeks), since that date reflects peak quality/freshness for the retailer rather than a hard safety cutoff — the float test and smell check are more reliable indicators of actual edibility than the printed date alone.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-practical-poison-ivy-identification',
    title: 'How to Identify Poison Ivy',
    category: 'practical-skills',
    keywords: ['how do you tell the difference between poison ivy and other plants', 'poison ivy identification', 'leaves of three let it be', 'what does poison ivy look like'],
    content: `The classic identifying rule is the rhyme "**leaves of three, let it be**" — poison ivy leaves grow in clusters of exactly three leaflets per stem (one at the tip, two opposite each other lower down), with the middle leaflet typically on a slightly longer stalk than the two side leaflets. Leaf edges can be smooth, toothed, or lobed (poison ivy is notoriously variable in exact shape, which is part of what makes it tricky to identify confidently), and leaves are typically shiny, especially when young, sometimes with a reddish tinge in spring or a red/orange color in fall. Poison ivy grows as a vine that can climb trees/fences (often as a fuzzy-looking "hairy rope" on tree trunks) or as a low shrub depending on region and conditions. It's worth remembering the three-leaflet rule is a helpful screening tool, not a foolproof one, since several harmless plants (like Virginia creeper, which usually has 5 leaflets, or box elder saplings) can superficially resemble it — when in doubt in an area known to have poison ivy, avoid contact rather than trying to positively confirm identification. The rash-causing compound, urushiol, is an oil present in all parts of the plant (leaves, stems, roots) and can also spread via contaminated clothing, tools, or pet fur, and even smoke from burning poison ivy can cause a dangerous reaction if inhaled — washing exposed skin thoroughly with soap and cool water as soon as possible after contact significantly reduces the chance of a reaction.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-practical-jump-start-car',
    title: 'How to Jump-Start a Car Battery',
    category: 'practical-skills',
    keywords: ['how to jump start a car', 'jumper cables order', 'dead car battery', 'jump start battery order'],
    content: `To jump-start a car with a dead battery using jumper cables and a working vehicle: 1) Park the working car close enough for the cables to reach, both cars off, parking brakes on. 2) Connect a **red (positive)** clamp to the dead battery's positive terminal. 3) Connect the other **red (positive)** clamp to the working battery's positive terminal. 4) Connect a **black (negative)** clamp to the working battery's negative terminal. 5) Connect the final **black (negative)** clamp to an unpainted metal surface on the dead car's engine block or frame (NOT directly to the dead battery's negative terminal) — this "grounding" step is a deliberate safety measure, since connecting the final link directly at the dead battery risks sparking near battery gases (which can include flammable hydrogen), whereas grounding elsewhere on the metal chassis still completes the circuit safely at a distance from the battery itself. 6) Start the working car, let it run a few minutes, then try starting the dead car. 7) If it starts, disconnect the cables in the reverse order you connected them (negative/ground first, then positive). Once running, drive the previously-dead car for at least 15-20 minutes (or let it idle) to let the alternator recharge the battery somewhat — if the battery is old or was fully drained, it may need a longer charge, a battery charger, or replacement if it can't hold a charge afterward.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-practical-tire-pressure-check',
    title: 'How to Check and Read Tire Pressure',
    category: 'practical-skills',
    keywords: ['how to check tire pressure', 'what psi should my tires be', 'tire pressure gauge', 'where to find recommended tire pressure'],
    content: `Check tire pressure with a tire pressure gauge (a small dedicated tool, or a feature built into many gas station air pumps), applied to the valve stem on each tire — the gauge reads pressure in PSI (pounds per square inch). The correct target pressure for a specific vehicle is NOT the number printed on the tire's sidewall itself (that number is the tire's maximum safe pressure, not the recommended everyday pressure) — the actual recommended PSI for your specific vehicle is found on a sticker inside the driver's side door frame, or in the owner's manual, and is typically somewhere in the 30-35 PSI range for most passenger cars, though this varies by vehicle. Tires should ideally be checked when "cold" (meaning the car hasn't been driven for at least a few hours, since driving heats up the tires and air pressure rises with heat, giving an artificially high reading) — checking first thing in the morning before driving is a common practical approach. Underinflated tires wear unevenly (typically more on the outer edges), reduce fuel efficiency, and increase blowout risk from excess heat buildup; overinflated tires wear more in the center and provide a harsher, less grippy ride. Checking tire pressure monthly, and always before a long road trip, is a commonly recommended maintenance habit — most modern cars also have a dashboard warning light (TPMS, Tire Pressure Monitoring System) that alerts the driver when pressure drops significantly below the recommended level.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-practical-fire-extinguisher-types',
    title: 'Types of Fire Extinguishers and How to Use One',
    category: 'practical-skills',
    keywords: ['types of fire extinguishers', 'how to use a fire extinguisher', 'class a b c fire extinguisher', 'pass method fire extinguisher'],
    content: `Fire extinguishers are classified by the type of fire they're designed to fight, and using the wrong type can be ineffective or dangerous. **Class A**: ordinary combustibles (wood, paper, cloth, most household trash). **Class B**: flammable liquids and gases (gasoline, oil, grease, propane). **Class C**: electrical fires (energized electrical equipment) — using water or a non-rated extinguisher on an electrical fire risks electric shock. **Class D**: combustible metals (less common in homes, more relevant in industrial/lab settings). **Class K**: kitchen fires involving cooking oils and fats (common in commercial kitchens, burns hotter and differently than typical Class B liquids). Most households keep a multi-purpose "ABC" extinguisher, rated to handle the three most common home fire types at once. To use one, remember the acronym **PASS**: **P**ull the safety pin, **A**im the nozzle at the base of the fire (not the flames themselves — the base is where the actual fuel is burning), **S**queeze the handle to release the extinguishing agent, and **S**weep the nozzle side to side across the base of the fire until it's fully out. If a fire is spreading rapidly, is larger than a small, contained fire, or if there's any doubt about safely handling it, the priority should always be evacuating and calling emergency services rather than attempting to fight it.`,
    createdAt: Date.now(),
  },
];
