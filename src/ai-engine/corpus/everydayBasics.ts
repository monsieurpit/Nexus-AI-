import { KnowledgeItem } from '../../types';

export const EVERYDAY_BASICS_CORPUS: KnowledgeItem[] = [
  // 1. Microwave Ovens & Dielectric Heating
  {
    id: 'kb-how-microwave-works',
    title: 'How Microwave Ovens Work: Magnetrons & Dielectric Heating',
    category: 'everyday-science',
    keywords: [
      'microwave',
      'how microwave works',
      'magnetron',
      'radiation',
      'heat food',
      'dielectric heating',
      'water molecules',
      'microwaves',
      'metal in microwave',
    ],
    content: `Microwave ovens heat food using electromagnetic dielectric heating:
1. **The Magnetron**: The microwave's core vacuum tube generates electromagnetic waves at roughly **2.45 GHz** (wavelength ~12.2 cm).
2. **Dielectric Heating of Water**: Water, fat, and sugar molecules are electric dipoles (positive on one side, negative on the other). The alternating 2.45 GHz electromagnetic field flips polarity 2.45 billion times per second, forcing polar water molecules to rotate furiously.
3. **Molecular Friction & Thermal Energy**: This rapid rotational friction converts kinetic energy directly into thermal heat throughout the outer ~1 to 1.5 inches of the food.
4. **Why Metal Sparks**: Metals conduct electricity. Microwave radiation creates high-voltage electrical surface currents in thin or sharp metal objects (like fork tines), causing arcing (sparks) through the ionized air.
5. **No Dangerous Radiation**: Microwaves use non-ionizing RF radiation; food does NOT become radioactive.`,
    createdAt: Date.now(),
  },

  // 2. Refrigerators & Heat Pumps
  {
    id: 'kb-how-refrigerator-works',
    title: 'How Refrigerators Work: Vapor-Compression Refrigeration Cycle',
    category: 'everyday-science',
    keywords: [
      'refrigerator',
      'fridge',
      'how fridge works',
      'cooling',
      'compressor',
      'refrigerant',
      'expansion valve',
      'thermodynamics',
      'heat pump',
    ],
    content: `Refrigerators do not "create cold" — they remove heat from the inside and vent it outside using the 4-stage vapor-compression refrigeration cycle:
1. **Compression**: The electric compressor pressurizes gaseous refrigerant (e.g. R-134a or R-600a isobutane), which spikes both its pressure and temperature.
2. **Condensation (Hot Coils at Back/Bottom)**: The hot pressurized gas passes through condenser coils on the exterior. It dumps its thermal energy into the kitchen air and condenses into a high-pressure liquid.
3. **Expansion Valve / Capillary Tube**: The liquid passes through a tiny restriction into a low-pressure area. This sudden pressure drop causes rapid flash evaporation and super-chilling (Joule-Thomson effect).
4. **Evaporation (Cold Coils Inside)**: The ice-cold liquid refrigerant flows through evaporator coils inside the fridge, absorbing heat from your food and air. The refrigerant evaporates back into a low-pressure gas and returns to the compressor to repeat the loop continuously.`,
    createdAt: Date.now(),
  },

  // 3. How Internal Combustion Engines (ICE) Work
  {
    id: 'kb-how-car-engine-works',
    title: 'How 4-Stroke Car Engines Work: The Otto Cycle',
    category: 'everyday-mechanics',
    keywords: [
      'car engine',
      'how engine works',
      'internal combustion',
      '4 stroke',
      'piston',
      'spark plug',
      'cylinder',
      'intake',
      'compression',
      'combustion',
      'exhaust',
      'transmission',
    ],
    content: `Four-stroke internal combustion engines (gasoline Otto cycle) convert chemical fuel energy into rotational mechanical work via 4 distinct piston strokes:
1. **Intake Stroke**: The intake valve opens as the piston moves downward from Top Dead Center (TDC) to Bottom Dead Center (BDC), sucking an atomized air-fuel mixture into the cylinder.
2. **Compression Stroke**: Both valves seal shut. The piston rises back up, compressing the air-fuel mixture into a tight chamber, increasing temperature and pressure for optimal combustion efficiency.
3. **Power / Combustion Stroke**: Near the top, the spark plug fires an electrical arc (~20,000V). The fuel combusts rapidly, creating high-pressure expanding gas that slams the piston downward with immense force, rotating the crankshaft.
4. **Exhaust Stroke**: The exhaust valve opens. The piston travels upward, pushing the spent exhaust gases out through the catalytic converter and muffler.
- **Crankshaft & Flywheel**: Converts the up-and-down reciprocating motion of multiple cylinders into smooth rotational torque to turn the wheels.`,
    createdAt: Date.now(),
  },

  // 4. Soap & Hand Hygiene Chemistry
  {
    id: 'kb-how-soap-kills-bacteria-viruses',
    title: 'How Soap Destroys Viruses & Bacteria: Amphiphilic Chemistry',
    category: 'everyday-science',
    keywords: [
      'soap',
      'how soap works',
      'wash hands',
      'kill bacteria',
      'virus',
      'micelles',
      'amphiphilic',
      'hydrophobic',
      'hydrophilic',
      'lipid bilayer',
      'clean hands',
    ],
    content: `Soap is a chemical marvel with amphiphilic molecules (each molecule has a hydrophilic head that bonds with water and a hydrophobic tail that bonds with fats and oils):
1. **Breaks the Lipid Bilayer**: Enveloped viruses (like Coronaviruses and Flu) and bacteria have an outer protective membrane made of fatty lipids.
2. **Molecular Crowbar**: When you lather with soap, the hydrophobic tails wedge into the lipid membrane, acting like microscopic crowbars that rupture and shatter the virus/bacteria membrane.
3. **Micelle Encapsulation**: Soap molecules surround dirt, oils, and viral remnants, trapping them inside spherical cages called **micelles** (hydrophobic tails facing in, hydrophilic heads facing out).
4. **Rinsing Away**: Running tap water grabs the hydrophilic outer heads of the micelles and washes all trapped debris and neutralized pathogens down the drain effortlessly.
- **Why 20 Seconds Matters**: It takes at least 20 seconds of mechanical friction to ensure soap penetrates into all microscopic skin folds and breaks down the lipid envelopes completely.`,
    createdAt: Date.now(),
  },

  // 5. Why We Have Seasons & Earth Axial Tilt
  {
    id: 'kb-earth-seasons-axial-tilt',
    title: 'Why Earth Has Seasons: The 23.5° Axial Tilt',
    category: 'earth-science',
    keywords: [
      'seasons',
      'why seasons happen',
      'earth tilt',
      'summer',
      'winter',
      'spring',
      'autumn',
      'solstice',
      'equinox',
      'axial tilt',
      'sun angle',
    ],
    content: `Earth's seasons are caused by its **23.5-degree axial tilt**, NOT its distance from the Sun:
1. **The 23.5° Tilt**: As Earth orbits the Sun once every 365.25 days, its axis always points in the same direction in space (toward Polaris).
2. **Summer**: When a hemisphere tilts TOWARD the Sun, sunlight strikes the ground at a direct, steep angle (concentrated solar energy per square meter) and days are longer.
3. **Winter**: When a hemisphere tilts AWAY from the Sun, sunlight strikes at a shallow, oblique angle (solar energy spreads out thinly over a larger area) and days are shorter.
4. **Solstices & Equinoxes**:
   - **Summer Solstice (~June 21 in North / Dec 21 in South)**: Maximum daylight, sun at highest noon elevation.
   - **Winter Solstice (~Dec 21 in North / June 21 in South)**: Shortest daylight of the year.
   - **Equinoxes (March & September)**: Earth's tilt is side-on to the Sun, giving roughly equal 12-hour day and night across the globe.
- **Common Myth**: Earth is actually closest to the Sun (perihelion) in **January** during Northern Hemisphere winter!`,
    createdAt: Date.now(),
  },

  // 6. The Water Cycle (Hydrologic Cycle)
  {
    id: 'kb-the-water-cycle',
    title: 'The Hydrologic Water Cycle: Continuous Global Recycling',
    category: 'earth-science',
    keywords: [
      'water cycle',
      'evaporation',
      'condensation',
      'precipitation',
      'transpiration',
      'groundwater',
      'clouds',
      'rain',
      'hydrologic cycle',
    ],
    content: `The global water cycle recirculates Earth's ~1.386 billion cubic kilometers of water through closed thermodynamic phases:
1. **Evaporation & Transpiration**: Solar radiation heats oceans, lakes, and rivers, transforming liquid water into invisible atmospheric water vapor. Plants also release water vapor from leaf stomata through transpiration.
2. **Condensation & Cloud Formation**: As warm, humid air rises, it expands and cools adiabatically. The water vapor condenses around microscopic airborne particles (cloud condensation nuclei like sea salt and dust) to form clouds and fog.
3. **Precipitation**: When cloud droplets collide and grow too heavy to be sustained by updrafts, gravity pulls them down as rain, snow, sleet, or hail.
4. **Infiltration, Runoff & Collection**: Precipitation runs into streams and rivers or infiltrates deep into soil and porous rock to recharge underground aquifers (groundwater), eventually flowing back to the oceans to repeat the cycle.`,
    createdAt: Date.now(),
  },

  // 7. Practical Life Skill: How to Jumpstart a Dead Car Battery
  {
    id: 'kb-how-to-jumpstart-car',
    title: 'How to Safely Jumpstart a Car Battery: The RED to RED, BLACK to Ground Rule',
    category: 'practical-skills',
    keywords: [
      'jumpstart car',
      'jump start',
      'dead battery',
      'jumper cables',
      'red and black clamps',
      'car battery dead',
      'how to jump a car',
      'alternator',
    ],
    content: `Step-by-step procedure to jumpstart a dead 12V car battery safely without blowing fuses or creating sparks:
1. **Preparation**: Park the helper car close (nose to nose or side by side) with engines OFF. Put both cars in Park/Neutral with parking brakes engaged.
2. **Connect in Exact Order (Red = Positive +, Black = Negative -)**:
   - **Step 1 (RED)**: Connect first RED clamp to the **Dead Battery's POSITIVE (+)** terminal.
   - **Step 2 (RED)**: Connect second RED clamp to the **Good Battery's POSITIVE (+)** terminal.
   - **Step 3 (BLACK)**: Connect first BLACK clamp to the **Good Battery's NEGATIVE (-)** terminal.
   - **Step 4 (BLACK Ground)**: Connect the last BLACK clamp to an **unpainted bare metal bolt or engine bracket** on the DEAD car (away from the battery to prevent hydrogen gas sparks!).
3. **Start the Helper Car**: Run the good car engine at ~2,000 RPM for 3 to 5 minutes to charge the dead battery.
4. **Start the Dead Car**: Crank the ignition of the dead car. Once it starts, let it run.
5. **Disconnect in Reverse Order**:
   - 1. Remove black ground from dead car.
   - 2. Remove black clamp from good car.
   - 3. Remove red clamp from good car.
   - 4. Remove red clamp from dead car.
6. **Keep Running**: Drive the revived car for at least 20–30 minutes so the alternator can recharge the battery.`,
    createdAt: Date.now(),
  },

  // 8. Practical Life Skill: How to Change a Flat Tire
  {
    id: 'kb-how-to-change-flat-tire',
    title: 'How to Change a Flat Tire Safely',
    category: 'practical-skills',
    keywords: [
      'change flat tire',
      'flat tire',
      'spare tire',
      'jack',
      'lug nuts',
      'tire iron',
      'how to change tire',
    ],
    content: `Follow this sequence to change a flat tire safely on the roadside:
1. **Find Level Ground & Secure Vehicle**: Pull completely off traffic onto flat, hard pavement. Turn on hazard lights, engage parking brake, and put wheel chocks behind tires.
2. **Loosen Lug Nuts Before Jacking**: Use the tire iron (lug wrench) to loosen (break the torque of) the lug nuts **1/2 turn counter-clockwise** while the tire is still touching the ground. (Do not remove them yet!).
3. **Position Jack at Jack Point**: Locate the reinforced metal notch / pinch weld on the car frame near the flat tire. Crank the jack until the flat tire is ~6 inches off the ground.
4. **Remove Lug Nuts & Tire**: Unscrew lug nuts completely, pull off the flat tire straight towards you, and place it under the car frame as a safety barrier.
5. **Mount the Spare Tire**: Align the spare wheel with the threaded studs and push it all the way back. Hand-tighten all lug nuts.
6. **Lower Car & Star Pattern Torque**: Lower the jack until the tire touches the ground. Tighten lug nuts firmly with the wrench in a **crisscross / star pattern** (1 ➔ 4 ➔ 2 ➔ 5 ➔ 3) to ensure even clamping pressure.
7. **Check Tire Pressure**: Donut spares are usually rated for a max of **50 mph (80 km/h)** and max 50 miles distance.`,
    createdAt: Date.now(),
  },

  // 9. Emergency First Aid & CPR Essentials
  {
    id: 'kb-first-aid-cpr-basics',
    title: 'Emergency First Aid: CPR (Cardiopulmonary Resuscitation) & Choking Heimlich',
    category: 'practical-skills',
    keywords: [
      'cpr',
      'first aid',
      'cardiopulmonary resuscitation',
      'chest compressions',
      'choking',
      'heimlich maneuver',
      'aed',
      'emergency',
      'heart attack',
    ],
    content: `Life-saving emergency protocol for cardiac arrest and choking:
1. **Check Responsiveness & Call 911/112**: Tap shoulders firmly and shout. If unresponsive with no normal breathing, assign a specific person to call emergency services and retrieve an AED.
2. **Adult Hands-Only CPR**:
   - **Hand Position**: Place heel of one hand in the center of the chest (lower half of breastbone/sternum), interlock other hand on top.
   - **Compression Depth**: Push hard and fast at least **2 inches (5 cm)** deep.
   - **Compression Rate**: **100 to 120 beats per minute** (to the beat of the song *"Stayin' Alive"* by the Bee Gees).
   - **Recoil**: Allow full chest recoil between compressions without taking hands off.
   - **Ratio**: If trained with rescue breaths, perform **30 chest compressions followed by 2 gentle rescue breaths**.
3. **AED (Automated External Defibrillator)**: Turn on device, apply sticky pads to bare chest as shown on diagrams, follow spoken audio prompts. The AED will only deliver a shock if ventricular fibrillation or pulseless ventricular tachycardia is detected.
4. **Choking (Heimlich Maneuver)**: Stand behind the person, wrap arms around waist, make a fist with thumb side just above navel, grab fist with other hand, deliver quick inward and upward abdominal thrusts.`,
    createdAt: Date.now(),
  },

  // 10. Cooking Science & The Maillard Reaction
  {
    id: 'kb-cooking-science-maillard-reaction',
    title: 'Cooking Science: The Maillard Reaction, Caramelization & Emulsions',
    category: 'everyday-science',
    keywords: [
      'maillard reaction',
      'cooking science',
      'searing steak',
      'caramelization',
      'emulsion',
      'why steak browns',
      'flavor development',
      'browning',
    ],
    content: `Key food chemistry reactions that create rich, savory flavors:
1. **The Maillard Reaction**:
   - Occurs between **amino acids (proteins)** and **reducing sugars** when heated above **$140^\\circ\\text{C}$ ($284^\\circ\\text{F}$)**.
   - Produces hundreds of complex aromatic flavor compounds (melanoidins, furans, pyrazines) responsible for the deep savory crust on seared steaks, toasted bread, roasted coffee, and French fries.
   - *Tip*: Surface moisture inhibits the reaction because water boiling caps temperature at $100^\\circ\\text{C}$. Patting meat dry before searing ensures a crisp, deeply browned crust.
2. **Caramelization**:
   - Pure thermal pyrolysis of sugars (above **$160^\\circ\\text{C}$ / $320^\\circ\\text{F}$**) without proteins, creating sweet, nutty, and buttery flavor notes (e.g. golden onions, caramel candies).
3. **Emulsions**:
   - Combining two immiscible liquids (like oil and water) using an emulsifier (like lecithin in egg yolks or mustard). Examples: Mayonnaise, Hollandaise, vinaigrettes.`,
    createdAt: Date.now(),
  },

  // 11. Sleep Cycles & Circadian Biology
  {
    id: 'kb-sleep-stages-circadian-rhythm',
    title: 'Human Sleep Architecture: REM, Non-REM & Circadian Biology',
    category: 'everyday-science',
    keywords: [
      'sleep stages',
      'rem sleep',
      'deep sleep',
      'circadian rhythm',
      'melatonin',
      'adenosine',
      'sleep cycles',
      'how sleep works',
    ],
    content: `Human sleep repeats in **90 to 110 minute cycles**, transitioning through 4 distinct stages:
1. **NREM Stage 1 (N1 - Light Transition, ~5%)**: Alpha waves transition to theta waves. Muscle tone relaxes, occasional hypnic jerks occur.
2. **NREM Stage 2 (N2 - Baseline Sleep, ~50%)**: Sleep spindles and K-complexes appear on EEG. Heart rate and body temperature decrease; memory consolidation begins.
3. **NREM Stage 3 (N3 - Deep / Slow-Wave Sleep, ~20%)**: High-amplitude delta waves (<4 Hz). Pituitary gland releases Human Growth Hormone (HGH), cellular tissue repairs, and the glymphatic system flushes toxic beta-amyloid proteins from the brain.
4. **REM (Rapid Eye Movement, ~25%)**: High-frequency brain activity resembling wakefulness, rapid eye movement under eyelids, and muscle atonia (temporary bodily paralysis to prevent acting out dreams). Critical for emotional processing and creative synthesis.
- **Sleep Pressure & Melatonin**: Adenosine builds up in the brain during wakefulness creating sleep pressure (caffeine blocks adenosine receptors). Darkness signals the suprachiasmatic nucleus (SCN) in the hypothalamus to trigger melatonin secretion from the pineal gland.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-everyday-temperature-conversion',
    title: 'Temperature Conversion: Celsius, Fahrenheit, and Quick Mental Math',
    category: 'everyday-science',
    keywords: [
      'celsius to fahrenheit', 'fahrenheit to celsius', 'temperature conversion', 'convert temperature',
      'what is 20 celsius in fahrenheit', 'unit conversion basics',
    ],
    content: `The exact formulas: Fahrenheit = (Celsius × 9/5) + 32, and Celsius = (Fahrenheit − 32) × 5/9. For a fast mental-math approximation that's close enough for everyday use (weather, cooking, casual conversation): double the Celsius number and add 30 to estimate Fahrenheit — 20°C doubled is 40, plus 30 is ~70°F (the exact value is 68°F, close enough to be useful without a calculator). A few fixed reference points worth memorizing: 0°C = 32°F (water freezes), 100°C = 212°F (water boils at sea level), 37°C = 98.6°F (normal human body temperature), 20-22°C = 68-72°F (typical comfortable room temperature). The two scales cross at −40° — that's the one temperature where Celsius and Fahrenheit read the same number. Celsius (part of the metric system) is used by most of the world; Fahrenheit is mainly used in the United States and a few territories. Kelvin, a third scale used in science, has the same size degree as Celsius but starts at absolute zero (0K = −273.15°C) rather than water's freezing point — converting Celsius to Kelvin is just Celsius + 273.15, no multiplication needed.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-everyday-wifi-basics',
    title: 'How WiFi Actually Works: Routers, Signals, and Common Fixes',
    category: 'everyday-science',
    keywords: [
      'how does wifi work', 'wifi basics', 'router vs modem', 'wifi keeps dropping', 'wifi dead zones',
      '2.4ghz vs 5ghz', 'wifi troubleshooting',
    ],
    content: `WiFi sends data over radio waves, the same basic physics as an old cordless phone or walkie-talkie, just at a much higher frequency and with far more complex encoding. A router and a modem are different devices commonly bundled into one box: the modem is what actually connects your home to your internet provider (over cable, fiber, or DSL line), while the router takes that single connection and creates a local wireless (and often wired) network, letting multiple devices share it and talk to each other. Most modern routers broadcast on two frequency bands: 2.4GHz has a longer range and better wall penetration but slower max speed and more interference (since many household devices — microwaves, baby monitors, Bluetooth — also use 2.4GHz); 5GHz is faster with less interference but has shorter range and struggles more with walls/floors — a device near the router benefits from 5GHz, a device far away often does better on 2.4GHz. Common causes of WiFi dropping or slowing down: too many devices on one network competing for bandwidth, physical obstructions (thick walls, mirrors, appliances) between the device and router, being far from the router (signal strength drops with the square of distance), interference from neighboring networks on the same channel, and outdated router firmware. Basic troubleshooting in order of least-to-most drastic: restart the router (unplug 30 seconds, plug back in — genuinely fixes a large share of issues by clearing its memory/temporary state), move closer to the router or move the router to a more central location, switch bands (2.4GHz vs 5GHz) if the option exists, check for firmware updates, and only replace/upgrade the router if none of that helps and the hardware is genuinely old (5+ years is common for meaningful improvement).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-everyday-food-spoilage-safety',
    title: 'Food Safety Basics: How to Tell If Food Has Gone Bad',
    category: 'everyday-science',
    keywords: [
      'how to know if food is bad', 'food spoilage signs', 'is this food still good', 'food safety basics',
      'expiration date vs best by', 'when to throw out leftovers',
    ],
    content: `Trust your senses first: an off smell (sour, ammonia-like, or just "wrong"), slimy texture, visible mold (fuzzy spots, often white/green/black), or a notably different color than normal are all reliable signs food has spoiled — when in doubt, the old rule "when in doubt, throw it out" is genuinely sound advice, since tasting a small amount to check is not a safe test (some bacteria that cause food poisoning don't change taste, smell, or appearance at all). "Best by," "use by," and "sell by" dates are about peak QUALITY, not safety — most shelf-stable and refrigerated foods are still safe to eat some time after a "best by" date if stored properly and showing no spoilage signs (this is a manufacturer freshness estimate, not a hard safety cutoff in most countries); "use by" is closer to an actual safety-relevant date and worth taking more seriously, especially for foods known for bacterial risk (deli meat, soft cheese, ready-to-eat items). General cooked-leftover guidance: refrigerate within 2 hours of cooking (1 hour if the room is above ~32°C/90°F), and most cooked leftovers are safe for about 3-4 days in the fridge — after that, the safety risk rises even without obvious spoilage signs, so a "smells fine" leftover past that window is still worth discarding. Freezing stops spoilage almost entirely (food stays safe indefinitely at 0°F/-18°C, though quality/taste degrades over time) — if in doubt whether you'll eat something in time, freezing it immediately is a reliable way to preserve it. Raw meat, poultry, and seafood spoil faster than most people expect and carry higher food-poisoning risk — when raw meat turns grey/brown with a sour smell or sticky film, discard it regardless of the date on the package.`,
    createdAt: Date.now(),
  },
];
