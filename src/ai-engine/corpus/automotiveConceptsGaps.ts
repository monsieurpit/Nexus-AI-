import { KnowledgeItem } from '../../types';

/**
 * AUTOMOTIVE_CONCEPTS_GAPS — batch 251 corrections. Automotive was the weakest
 * batch so far. Errors and wrong-domain answers:
 * - "two-stroke vs four-stroke" got the revolution counts backwards.
 * - "differential vs transmission" answered about a MEDICAL differential
 *   diagnosis.
 * - "chassis vs frame" answered about a Formula 1 chassis and enfleurage
 *   (perfume) frames.
 * - "camber vs toe" answered about ROCK-CLIMBING shoes.
 * - "recall vs TSB" answered about MEMORY recall.
 * - "fuel injection vs carburetor", "FWD vs RWD", "CVT vs DCT", "BEV vs FCEV",
 *   "MacPherson vs double wishbone", "octane vs cetane" were web dumps.
 * - "sedan vs coupe" answered about hatchbacks.
 * - "synthetic vs conventional oil" only discussed change intervals.
 * - many comparisons were cut before the second half.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'automotive', keywords, content, createdAt: now,
});

export const AUTOMOTIVE_CONCEPTS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-auto-engine-vs-motor',
    'Engine vs motor',
    [
      'difference between a car engine and a motor', 'strictly an engine converts fuel chemical energy into mechanical energy by combustion internal combustion engine jet engine', 'a motor converts another form of energy usually electrical into mechanical motion an electric motor',
      'in everyday use the words are interchangeable motor vehicle motor oil for a gas engine', 'engine burns fuel motor is electric or hydraulic',
    ],
    `Strictly speaking, an ENGINE converts the CHEMICAL energy in a FUEL into mechanical work, usually by BURNING it — a car's internal combustion engine, a jet engine, a steam engine. A MOTOR converts ANOTHER form of energy directly into motion — most commonly an ELECTRIC motor turning electrical energy into rotation, but also hydraulic and pneumatic motors.

So an electric car has a "motor", a petrol car has an "engine", and a hybrid has both.

In EVERYDAY use, though, the two words are used interchangeably: "motor vehicle", "motorway", "motor racing", and "motor oil" all refer to fuel-burning engines, and people say "start the motor" of a petrol car without anyone blinking. The precise distinction (engine = burns fuel; motor = electric) mainly matters in engineering contexts and when talking about EVs.`,
  ),
  k(
    'kb-gap-auto-two-vs-four-stroke',
    'Two-stroke vs four-stroke engine',
    [
      'difference between a two-stroke and a four-stroke engine', 'a stroke is one movement of the piston up or down', 'a four-stroke engine completes its cycle in 4 piston strokes 2 crankshaft revolutions intake compression power exhaust one power stroke every 2 revolutions',
      'a two-stroke completes the cycle in 2 piston strokes 1 crankshaft revolution one power stroke every revolution more power for its size but less efficient oil mixed with fuel dirtier', 'two-strokes in chainsaws dirt bikes older outboards',
    ],
    `A "STROKE" is ONE movement of the piston — up OR down. The two engine types differ in how many strokes it takes to complete one full power cycle (intake, compression, power/combustion, exhaust).

A FOUR-STROKE engine completes the cycle in FOUR piston strokes = TWO crankshaft revolutions:
1. intake (piston down, draws in fuel-air), 2. compression (up), 3. power (down, combustion pushes the piston), 4. exhaust (up, pushes out burnt gas).
So there is ONE power stroke every TWO revolutions. Valves, a camshaft, and a separate oil system make it more complex and heavier, but it is efficient, clean, and durable — every car and truck engine is four-stroke.

A TWO-STROKE engine completes the cycle in TWO piston strokes = ONE crankshaft revolution. Intake and compression happen together on the up-stroke; power and exhaust happen together on the down-stroke, using ports in the cylinder wall instead of valves. So there is ONE power stroke EVERY revolution — roughly twice the power pulses for the same size, and a great power-to-weight ratio. Downsides: it must burn OIL MIXED INTO THE FUEL (so it smokes and pollutes more), it wastes some fuel straight out the exhaust, and it is less fuel-efficient. Used where light weight and simplicity matter: chainsaws, leaf blowers, dirt bikes, jet skis, and older small outboard motors.`,
  ),
  k(
    'kb-gap-auto-differential-vs-transmission',
    'Differential vs transmission (drivetrain)',
    [
      'difference between a differential and a transmission car', 'the transmission gearbox sits behind the engine and provides gear ratios to match engine speed to road speed and multiply torque for acceleration and climbing', 'the differential is a set of gears at the driven axle that turns the drive 90 degrees provides a final gear reduction and lets the two driven wheels rotate at different speeds when cornering',
      'without a differential the tyres would scrub and bind in turns', 'not a medical differential diagnosis',
    ],
    `Two different parts of a car's DRIVETRAIN (nothing to do with medical diagnosis).

The TRANSMISSION (gearbox) sits right behind the engine. Its job is to provide a SET OF GEAR RATIOS so the engine, which only makes useful power in a narrow rev range, can drive the wheels across the whole speed range: low gears MULTIPLY torque for pulling away, accelerating, and climbing; high gears let the engine turn slowly and efficiently at cruising speed. It also has neutral and reverse.

The DIFFERENTIAL is a compact set of gears at the DRIVEN AXLE (front, rear, or both). It does three things: (1) in most layouts it turns the rotation coming down the driveshaft 90 degrees to spin the axle shafts; (2) it applies a fixed FINAL DRIVE gear reduction; and (3) — the reason for its name — it lets the LEFT and RIGHT driven wheels turn at DIFFERENT SPEEDS. This matters because in a corner the outer wheel travels a longer path than the inner one; without a differential the tyres would fight each other, scrub, hop, and wear out, and the car would resist turning.

Flow of power: engine -> transmission (picks the ratio) -> driveshaft -> differential (splits it to the two wheels, allowing them to differ) -> wheels. AWD cars add a centre differential between the front and rear axles.`,
  ),
  k(
    'kb-gap-auto-chassis-vs-frame',
    'Chassis vs frame (vehicle)',
    [
      'difference between a chassis and a frame car', 'the frame or ladder frame is the structural backbone two long rails with crossmembers onto which the engine suspension and body are bolted', 'the chassis is the broader term the frame plus everything that makes a rolling driving platform suspension steering axles brakes wheels and often the drivetrain minus the body',
      'in a unibody car there is no separate frame the chassis is the structural understructure and running gear', 'not a Formula 1 tub or an enfleurage frame',
    ],
    `The FRAME is the structural BACKBONE of a traditional vehicle — historically a "ladder frame": two long steel rails running front-to-back, joined by crossmembers. The engine, transmission, suspension, and the separate body all bolt onto it. It is one component.

The CHASSIS is the BROADER term: it is the frame PLUS everything else that makes a complete rolling, steering, braking, driving platform WITHOUT the body on top — so the frame, the suspension, the steering, the axles, the wheels and tyres, the brakes, and usually the engine and drivetrain. "A bare chassis" is a driveable skateboard of a vehicle with no bodywork.

So: the frame is the load-bearing structure; the chassis is the whole underlying vehicle (frame + running gear).

In a modern UNIBODY car there is NO separate bolt-on frame — the body shell itself is the load-bearing structure. There, "chassis" is used loosely to mean the structural understructure (floorpan, subframes) together with the suspension, steering, and brakes; enthusiasts also say "chassis" to mean how a car rides and handles ("great chassis, weak engine").`,
  ),
  k(
    'kb-gap-auto-camber-vs-toe',
    'Camber vs toe (wheel alignment)',
    [
      'difference between camber and toe car alignment', 'camber is the inward or outward tilt of the wheel viewed from the front negative camber top leans in improves cornering grip too much wears one edge of the tyre', 'toe is the direction the wheels point viewed from above relative to straight ahead toe-in fronts angled toward each other stability toe-out sharper turn-in incorrect toe causes rapid feathered tyre wear',
      'caster is the third alignment angle', 'not rock-climbing shoes',
    ],
    `Both are WHEEL ALIGNMENT angles (nothing to do with climbing shoes).

CAMBER is the TILT of the wheel when you look at the car from the FRONT. NEGATIVE camber means the top of the tyre leans IN toward the car (bottom sticks out) — a small amount improves grip in corners because the tyre stays flatter on the road when the body rolls, so performance cars run negative camber. POSITIVE camber means the top leans OUT. Too much camber either way wears out ONE EDGE of the tyre (the inner edge for negative, outer for positive).

TOE is the direction the wheels POINT when you look DOWN from above, compared with dead straight ahead. TOE-IN ("toe positive"): the FRONTS of the two tyres are angled slightly TOWARD each other — this adds straight-line STABILITY and is the usual setting for the front of most road cars. TOE-OUT: the fronts angle AWAY from each other — sharper, more eager turn-in, used on some performance setups. Toe is very sensitive: even a small error scrubs the tyres sideways as they roll and causes fast, "feathered" (saw-tooth) tread wear.

(The third main alignment angle is CASTER — the forward/backward tilt of the steering axis, which affects straight-line stability and steering self-centring.)`,
  ),
  k(
    'kb-gap-auto-recall-vs-tsb',
    'Recall vs technical service bulletin (TSB)',
    [
      'difference between a recall and a technical service bulletin', 'a recall is issued for a safety defect or failure to meet a federal safety standard the manufacturer must notify all owners and fix it free regardless of age mileage or warranty overseen by NHTSA in the US', 'a technical service bulletin TSB is guidance sent to dealers describing a known non-safety issue and the recommended repair it is not a mandatory free fix covered only under warranty or goodwill',
      'recall equals safety mandatory always free TSB equals known problem advisory free only under warranty', 'not memory recall',
    ],
    `Both come from the vehicle manufacturer when a widespread problem is identified, but they differ in SEVERITY and OBLIGATION (this is not about memory).

A RECALL is issued when a defect creates a SAFETY RISK, or the vehicle does not meet a federal motor-vehicle safety standard. In the US it is overseen by NHTSA, and it can be manufacturer-initiated or government-ordered. The manufacturer MUST directly notify every registered owner and must REPAIR the defect FREE OF CHARGE — regardless of the car's age, mileage, or whether it is still under warranty. Recall repairs are tracked; unfixed recalls show up on a VIN lookup.

A TECHNICAL SERVICE BULLETIN (TSB) is internal guidance the manufacturer sends to its DEALERS and technicians. It documents a KNOWN, recurring but NON-SAFETY issue (a rattle, a rough shift, a common sensor failure, a software bug) and lays out the diagnosis and the approved fix. A TSB is ADVISORY, not mandatory — owners are not notified, and the repair is only free if the car is still under WARRANTY (or the maker offers a "goodwill" extension); otherwise the owner pays.

Short version: recall = safety, compulsory, always free for the owner; TSB = a known nuisance, a repair recipe for the shop, paid unless under warranty.`,
  ),
  k(
    'kb-gap-auto-fuel-injection-vs-carburetor',
    'Fuel injection vs carburetor',
    [
      'difference between fuel injection and a carburetor', 'a carburetor is a purely mechanical device that uses the venturi effect fast intake air draws fuel from a reservoir and atomises it fuel-air ratio set by fixed jets simple cheap no electronics but imprecise cannot adapt to temperature altitude load or wear', 'fuel injection sprays a precisely metered amount of fuel through electronically controlled injectors governed by an engine computer reading sensors far more precise adaptive efficient and clean better cold starts',
      'carburetors phased out of cars by the early 1990s injection is universal now', 'throttle-body versus port versus direct injection',
    ],
    `Both mix FUEL into the engine's intake AIR; the difference is mechanical guesswork vs electronic precision.

A CARBURETOR is a purely MECHANICAL device bolted to the intake. As air rushes through a narrowing ("venturi"), it speeds up and its pressure drops (Bernoulli's principle), and that low pressure SUCKS fuel out of a small reservoir (float bowl) and atomises it into the airstream. The fuel-to-air ratio is set by FIXED brass jets and mechanical linkages, with extra circuits for idle, acceleration, and choke. It is simple, cheap, and needs no electricity — but it is IMPRECISE: it cannot properly adjust for engine temperature, altitude, load, humidity, or wear, so the mixture is rarely ideal, cold starts are fussy, and it cannot meet modern emissions rules.

FUEL INJECTION sprays a PRECISELY METERED amount of fuel through electrically operated INJECTORS. An engine control unit (ECU) reads sensors — airflow or manifold pressure, throttle position, RPM, coolant and air temperature, and the exhaust oxygen sensor — and calculates the exact fuel quantity and timing many times per second, adjusting continuously. Result: better power, economy, cold starting, drivability, and far lower emissions. Types: throttle-body (one or two injectors, simplest), multi-point/port (one injector per cylinder, at the intake port), and direct injection (fuel sprayed straight into the cylinder, most precise).

Carburetors disappeared from new cars by the late 1980s to early 1990s as emissions standards tightened; every modern engine is fuel-injected.`,
  ),
  k(
    'kb-gap-auto-fwd-vs-rwd',
    'Front-wheel drive vs rear-wheel drive',
    [
      'difference between FWD and RWD', 'FWD front-wheel drive the engine drives the front wheels which both steer and pull cheaper lighter more cabin and cargo room better traction in snow and rain engine weight over the driven wheels better fuel economy downsides torque steer understeer-biased handling limited power handling', 'RWD rear-wheel drive the engine drives the rear wheels front wheels only steer better weight balance sharper handling no torque steer handles high power better for towing downsides less cabin space worse snow traction without aids usually costlier',
      'FWD dominates economy cars RWD dominates sports cars luxury sedans and trucks', 'not a falling weight deflectometer',
    ],
    `These describe which wheels the engine actually DRIVES.

FRONT-WHEEL DRIVE (FWD): the engine (usually mounted sideways) drives the FRONT wheels, which then do double duty — steering AND pulling the car. Advantages: cheaper and simpler to build, lighter, and much more efficient with interior space (no driveshaft tunnel down the middle, no rear axle hump), so economy and family cars are almost all FWD; and traction in SNOW and RAIN is good because the heavy engine sits right over the driven wheels. Disadvantages: "torque steer" (the wheel tugs at the steering under hard acceleration), a natural tendency to understeer, and a practical limit on how much power you can put through wheels that are also steering.

REAR-WHEEL DRIVE (RWD): the engine drives the REAR wheels; the front wheels only steer, the rears only propel, so each pair has one job. Advantages: better front-to-rear WEIGHT BALANCE, sharper and more neutral handling, no torque steer, the ability to handle big power, and better towing (weight transfers onto the driven wheels under load). Disadvantages: less cabin space, worse traction on snow and ice without traction control or added rear weight, and usually more cost and weight.

FWD dominates mainstream cars; RWD dominates sports cars, performance and luxury sedans, pickups, and larger SUVs. AWD adds drive to all four.`,
  ),
  k(
    'kb-gap-auto-cvt-vs-dct',
    'CVT vs dual-clutch transmission',
    [
      'difference between a CVT and a dual-clutch transmission', 'a CVT continuously variable transmission has no fixed gears a belt or chain runs between two variable-diameter pulleys giving an infinite range of ratios keeps the engine at its most efficient rpm smooth great fuel economy can feel rubber-bandy and drone economy cars and hybrids', 'a DCT dual-clutch transmission is two automated manual gearboxes in one one clutch for odd gears one for even the next gear is pre-selected and engaged in milliseconds no torque interruption very fast sporty efficient can be jerky at low speed more complex performance cars',
      'CVT infinite ratios no shifts DCT fixed gears lightning shifts', 'not an automated manual AMT single clutch',
    ],
    `Both are types of automatic transmission (no clutch pedal), but they work in completely different ways.

A CVT (Continuously Variable Transmission) has NO fixed gears at all. The most common design runs a steel belt or chain between two PULLEYS whose effective diameters change — as one widens the other narrows, so the drive ratio varies SMOOTHLY through an infinite range between its limits. This lets the engine sit at exactly its most efficient RPM for the demand, which is why CVTs give strong FUEL ECONOMY and are the default in many economy cars and hybrids. The trade-off is feel: hard acceleration can produce a "rubber-band" sensation and a constant engine DRONE, because revs and road speed are decoupled.

A DCT (Dual-Clutch Transmission) is essentially TWO automated manual gearboxes packaged together, sharing one case. One clutch handles the ODD gears (1, 3, 5, 7), the other the EVEN gears (2, 4, 6). While you drive in one gear, the transmission has already PRE-SELECTED the next gear on the other shaft, so a shift is just releasing one clutch and engaging the other — done in MILLISECONDS with no interruption in power. Result: extremely fast, crisp, sporty shifts and good efficiency (fixed gears, minimal slip). Downsides: it can be JERKY or hesitant at crawling speeds and when parking, and it is mechanically complex and costly. Common in performance and sporty cars.

Short version: a CVT has infinite ratios and never "shifts"; a DCT has normal fixed gears but changes them almost instantly.`,
  ),
  k(
    'kb-gap-auto-bev-vs-fcev',
    'Battery EV vs fuel cell EV',
    [
      'difference between a BEV and a fuel cell vehicle', 'both are electric vehicles an electric motor drives the wheels', 'a BEV battery electric vehicle stores energy in a large rechargeable battery pack charged from the grid zero tailpipe emissions high grid-to-wheel efficiency about 85 to 90 percent slower refuelling range limited by battery size and weight',
      'an FCEV fuel cell electric vehicle carries compressed hydrogen and a fuel cell that generates electricity on board emitting only water vapour refuels in about 5 minutes long range but scarce hydrogen infrastructure hydrogen mostly made from natural gas today much lower well-to-wheel efficiency',
    ],
    `Both are ELECTRIC vehicles — an electric motor drives the wheels in each — but they carry their energy differently.

A BEV (Battery Electric Vehicle) stores energy in a large rechargeable LITHIUM-ION BATTERY pack, charged by plugging into the electricity grid (home outlet, wallbox, or public fast charger). It has zero tailpipe emissions, and it is highly EFFICIENT — around 85-90% of the electricity put in reaches the wheels. Downsides: recharging takes longer than a fuel stop (20 minutes on a fast charger to hours at home), and the battery is heavy and adds cost, capping range. Examples: Tesla Model 3, Nissan Leaf, most new EVs.

An FCEV (Fuel Cell Electric Vehicle) carries tanks of compressed HYDROGEN gas plus a FUEL CELL, which combines the hydrogen with oxygen from the air to generate electricity on board, emitting only WATER VAPOUR. A small buffer battery smooths delivery. Advantages: refuels in about 5 MINUTES like a petrol car, and offers long range with light tanks. Downsides: hydrogen FUELLING STATIONS are extremely rare, most hydrogen today is made from natural gas (so it is not truly clean well-to-wheel), and the full chain (make hydrogen -> compress -> transport -> convert back to electricity in the cell) is far LESS EFFICIENT than simply charging a battery. Examples: Toyota Mirai, Hyundai Nexo.

Short version: BEV = big battery, plug in, most efficient, slower to "refuel"; FCEV = hydrogen tank + fuel cell, fast to refuel, long range, but inefficient and almost no infrastructure.`,
  ),
  k(
    'kb-gap-auto-macpherson-vs-wishbone',
    'MacPherson strut vs double wishbone suspension',
    [
      'difference between MacPherson strut and double wishbone suspension', 'MacPherson strut a single telescopic strut shock plus coil spring in one unit that also serves as the upper steering pivot plus one lower control arm compact cheap light frees engine bay space standard on front-wheel-drive economy cars less control over camber change in roll', 'double wishbone two A-shaped arms upper and lower locating the wheel spring and damper mounted separately more parts more space more expensive precise control of camber caster and toe through the whole travel keeps the tyre flatter used in sports and performance cars and many rear suspensions',
    ],
    `Both are INDEPENDENT suspension designs (each wheel moves on its own).

A MACPHERSON STRUT uses just ONE big telescopic STRUT per wheel — the shock absorber and coil spring combined into a single vertical unit — mounted between the body at the top and the wheel hub at the bottom, plus ONE lower control arm (and an anti-roll bar link). On the front axle the whole strut also acts as the UPPER STEERING PIVOT, turning with the wheel. It is COMPACT, LIGHT, cheap to make, and takes up little room, leaving space for a transverse engine and driveshafts — which is why it is the near-universal front suspension on front-wheel-drive economy and mid-range cars. Its weakness is geometry: as the wheel moves up and down and the body rolls, the camber angle changes more than ideal, so the tyre's contact with the road is less consistent and ultimate handling precision suffers.

A DOUBLE WISHBONE uses TWO A-shaped (or L-shaped) arms per wheel — an UPPER and a LOWER "wishbone" — that together locate the hub, with the spring and damper mounted separately onto one of the arms or the body. It has more parts, needs more packaging space, and costs more, but it gives the engineer PRECISE control over how camber, caster, and toe change through the full range of suspension travel, keeping the tyre planted FLAT on the road during hard cornering and braking. Used on sports cars, performance and luxury cars, and as the rear suspension on many otherwise-strut cars.

Short version: MacPherson = one strut, simple, compact, cheap, good enough; double wishbone = two arms, complex, costly, superior wheel control.`,
  ),
  k(
    'kb-gap-auto-octane-vs-cetane',
    'Octane vs cetane',
    [
      'difference between octane and cetane', 'octane rating for gasoline measures resistance to auto-ignition under compression a higher octane number means the fuel is harder to ignite by pressure alone preventing knock in high-compression spark-ignition engines', 'cetane number for diesel measures readiness to auto-ignite when injected into hot compressed air a higher cetane number means faster more readily igniting shorter ignition delay smoother quieter diesel combustion easier cold starts',
      'high octane resists ignition good for petrol high cetane ignites easily good for diesel essentially inverse measures',
    ],
    `Both rate how a fuel behaves under compression, but for OPPOSITE engine types and in OPPOSITE directions.

OCTANE RATING applies to GASOLINE (petrol), which is meant to be ignited by a SPARK at a precise moment. Octane measures the fuel's RESISTANCE to igniting on its own under pressure and heat. A HIGHER octane number means the fuel can be compressed MORE without spontaneously detonating ("knocking" or "pinging"), which would damage the engine and cut power. High-compression, turbocharged, and performance engines therefore REQUIRE high-octane fuel (91-93 AKI / 95-98 RON). Regular is about 87 AKI.

CETANE NUMBER applies to DIESEL, which has NO spark — it relies on the heat of highly compressed air to ignite the fuel the instant it is injected. Cetane measures how READILY and QUICKLY the fuel ignites once injected. A HIGHER cetane number means a SHORTER ignition delay, which gives smoother, quieter, more complete combustion, easier cold starting, and lower emissions. Typical road diesel is around 45-55 cetane.

So they are essentially INVERSE properties: for petrol you want a fuel that RESISTS auto-ignition (high octane); for diesel you want a fuel that AUTO-IGNITES eagerly (high cetane). Putting low-octane fuel in a performance petrol engine causes knock; low-cetane diesel causes hard starting and a rattly, smoky engine.`,
  ),
  k(
    'kb-gap-auto-synthetic-vs-conventional-oil',
    'Synthetic vs conventional motor oil',
    [
      'difference between synthetic and conventional oil', 'conventional mineral oil is refined directly from crude oil molecules of various sizes and shapes with impurities breaks down faster under heat thickens in cold forms sludge sooner', 'synthetic oil is chemically engineered uniform pure molecules better cold-start flow better high-temperature stability and film strength less evaporation better sludge resistance longer service life',
      'synthetic blend is a mix synthetic costs more but is standard fill for most new cars turbos and tight-tolerance engines often require it', 'the change interval difference follows from the base oil',
    ],
    `The difference is in the OIL ITSELF, not just how often you change it.

CONVENTIONAL (mineral) oil is refined more or less directly from CRUDE OIL. Its molecules come in a RANGE of sizes and shapes and it carries traces of impurities (waxes, sulphur). That inconsistency means it: thickens and flows poorly when cold, thins out and loses its protective film more readily when very hot, oxidises and forms SLUDGE and varnish sooner, and burns off (evaporates) faster. It is cheap and adequate for older, low-stress engines with frequent changes.

SYNTHETIC oil is chemically ENGINEERED — either by heavily processing petroleum molecules or by building the oil up from simple, pure compounds — so nearly all the molecules are the SAME SIZE and shape and there are no impurities. Benefits: it flows freely at very low temperatures (better cold starts and less start-up wear), holds its viscosity and film strength at high heat and under shear, resists oxidation and sludge, and evaporates less. It stays effective far longer, which is why synthetic-oil change intervals are typically 7,500-15,000 miles versus roughly 3,000-5,000 for conventional.

SYNTHETIC BLEND is a mix of the two — some of the benefit at lower cost. Synthetic is now the FACTORY FILL for most new cars, and turbocharged engines and engines with tight internal tolerances often REQUIRE a full synthetic of the specified grade. Always follow the owner's manual for grade and interval.`,
  ),
  k(
    'kb-gap-auto-turbo-vs-supercharger',
    'Turbocharger vs supercharger',
    [
      'difference between a turbocharger and a supercharger', 'both are forced induction they compress intake air so more fuel can burn and the engine makes more power from the same displacement', 'a supercharger is driven mechanically by the crankshaft via a belt responds instantly no lag but consumes some engine power parasitic loss', 'a turbocharger is driven by a turbine spun by the exhaust gases more efficient free power but suffers turbo lag a delay while exhaust flow builds',
      'turbos dominate modern cars for efficiency superchargers prized for immediate throttle response', 'twincharging uses both',
    ],
    `Both are FORCED INDUCTION: they pump the intake air into the cylinders at higher-than-atmospheric pressure ("boost"), so more oxygen and more fuel fit in, and the engine makes significantly more power from the same size. The difference is what SPINS the compressor.

A SUPERCHARGER is driven MECHANICALLY by the engine's crankshaft, through a belt (or gears/chain). It spins in direct proportion to engine RPM, so it delivers boost INSTANTLY the moment you press the throttle — no delay, very linear, strong low-end response. The trade-off: it is a PARASITIC load. It takes real engine power to drive (often 20-50+ hp at full tilt), so some of the extra power it makes is spent turning it.

A TURBOCHARGER is driven by a small TURBINE placed in the EXHAUST stream. It is spun by hot exhaust gas that would otherwise be wasted, so its drive energy is essentially "FREE" — turbos give better fuel efficiency and are why so many modern small engines make big-engine power. The trade-off is TURBO LAG: after you floor it, there is a brief delay while exhaust flow builds enough to spool the turbine up to speed. Modern twin-scroll, variable-geometry, and small twin turbos have largely tamed this.

Some engines use BOTH ("twincharging") — a supercharger for instant low-rev response, a turbo for efficient top-end power.`,
  ),
  k(
    'kb-gap-auto-sedan-vs-coupe',
    'Sedan vs coupe',
    [
      'difference between a sedan and a coupe', 'a sedan saloon is a passenger car with a three-box design separate engine passenger and boot compartments typically four doors a fixed roof and a usable rear seat for 4 to 5', 'a coupe traditionally has two doors a sportier lower sloping roofline a shorter cabin and a de-emphasised smaller or harder to access rear seat prioritising style over practicality',
      'modern marketing uses four-door coupe for sleek sedans', 'not a hatchback which has a rear liftgate over the cargo area',
    ],
    `A SEDAN (British "saloon") is the traditional family car shape: a "THREE-BOX" design with three distinct volumes — engine bay, passenger cabin, and a separate enclosed BOOT/TRUNK behind — a fixed roof, typically FOUR doors, and a proper usable rear seat for 4-5 people. Practicality and rear-passenger comfort are priorities.

A COUPE traditionally has TWO doors, a shorter cabin, and a lower, more steeply SLOPING roofline toward the rear, giving a sportier, more rakish look. The rear seat is de-emphasised — smaller, tighter on headroom, harder to climb into (you fold the front seats forward), or sometimes absent (a "2+2" or a true two-seater). Style and driving character are prioritised over space.

So the everyday markers are: 4 doors + boxy roof + real back seat = sedan; 2 doors + sloping roof + cramped or token back seat = coupe. (Modern marketing muddies this with "four-door coupes" — sedans given a low coupe-like roofline — and some two-door cars that are roomy. The strict old US definition was actually about interior volume, but two-door is the practical rule of thumb.)

Both differ from a HATCHBACK, which has a rear LIFTGATE that opens over a cargo area continuous with the cabin (a "two-box" shape), and from a CONVERTIBLE, which has a folding roof.`,
  ),
  k(
    'kb-gap-auto-manual-vs-automatic',
    'Manual vs automatic transmission',
    [
      'difference between a manual and an automatic transmission', 'a manual transmission the driver selects gears with a shift lever and operates a clutch pedal to disengage the engine while shifting more driver involvement cheaper lighter historically more efficient preferred for engagement', 'an automatic transmission shifts gears by itself using a hydraulic system planetary gearsets and a torque converter no clutch pedal the driver selects P R N D easier in traffic now often as efficient or more with 8 to 10 speeds and lock-up converters dominant in most markets',
      'manuals nearly extinct in North America still common in Europe and for enthusiasts',
    ],
    `A MANUAL transmission ("stick shift", "standard") requires the DRIVER to do the gear changing. You press a CLUTCH pedal with your left foot to disconnect the engine from the gearbox, move a lever to select the gear (usually 5 or 6 forward gears plus reverse), and release the clutch smoothly while feeding in throttle. Advantages: it is simpler, lighter, and cheaper to build and repair; historically it gave better fuel economy; it gives the driver full control (useful for towing, engine braking, and spirited driving); and it is more engaging. Disadvantages: it is tiring in stop-and-go traffic, has a learning curve, and you can stall it.

An AUTOMATIC transmission changes gears BY ITSELF. There is no clutch pedal — you just select P (park), R (reverse), N (neutral), or D (drive). Traditional automatics use a set of PLANETARY GEARSETS engaged by hydraulically-controlled clutches and bands, with a TORQUE CONVERTER (a fluid coupling) taking the place of a clutch so the engine can idle while the car is stopped. Advantages: effortless, especially in traffic and on hills; modern units with 8-10 speeds and locking torque converters now MATCH or BEAT manuals on fuel economy and are much faster-shifting. Disadvantages: more complex and costly, historically a slight efficiency penalty (now mostly gone), and less direct feel.

In North America manuals are now rare (a few percent of sales, mostly sports cars); in Europe and much of the world they remain common, though automatics are taking over there too.`,
  ),
  k(
    'kb-gap-auto-disc-vs-drum-brakes',
    'Disc brakes vs drum brakes',
    [
      'difference between disc brakes and drum brakes', 'disc brakes a caliper squeezes friction pads against both sides of an exposed rotating rotor open to the air so they cool well fade-resistant consistent better in the wet self-adjusting easier to service', 'drum brakes brake shoes press outward against the inside of a rotating drum enclosed so they trap heat and fade sooner more complex to service but cheaper and easy to build a parking brake into',
      'most cars use discs front and often rear economy cars often keep drums on the rear', 'brake fade is heat-related loss of braking power',
    ],
    `Both convert the car's motion into heat through friction; they differ in shape and cooling.

DISC BRAKES use a flat metal DISC (rotor) that spins with the wheel, exposed to the air. A CALIPER straddles the disc and, when you brake, hydraulically squeezes friction PADS against BOTH faces of it. Because the disc is open to airflow (and often internally vented), it sheds HEAT well, so disc brakes resist "FADE" (heat-related loss of stopping power), give consistent, progressive pedal feel, shrug off water quickly, and are self-adjusting and relatively easy to inspect and service. They cost more and provide slightly less "self-servo" assist.

DRUM BRAKES use a hollow DRUM that spins with the wheel. Inside it, curved brake SHOES are pushed OUTWARD against the drum's inner surface by a hydraulic wheel cylinder. Because everything is ENCLOSED, drum brakes TRAP heat and FADE sooner under repeated hard use, they can grab unevenly when wet, and they are more fiddly to service (springs, adjusters). But they are CHEAPER to make, provide some built-in mechanical assist, and make it easy to integrate a PARKING BRAKE.

Modern cars almost all use DISC brakes on the front (which do 60-80% of the work); many use discs at the rear too, while budget cars often keep cheaper DRUMS on the lightly-loaded rear axle.`,
  ),
  k(
    'kb-gap-auto-awd-vs-4wd',
    'AWD vs 4WD',
    [
      'difference between AWD and 4WD', 'AWD all-wheel drive powers all four wheels usually automatically and full-time with a centre differential that lets the front and rear axles turn at different speeds so it works on dry pavement tuned for traction and stability in normal driving and light conditions', '4WD four-wheel drive traditionally a part-time system the driver engages with a transfer case that locks the front and rear axles together no centre differential so not for dry pavement often with low-range gearing for serious off-roading and towing',
      'the terms overlap in marketing modern 4WD can be automatic and AWD can be capable off-road', 'low range transfer case locking differentials',
    ],
    `Both send power to all four wheels; the traditional distinction is about how and when.

AWD (All-Wheel Drive) is designed for NORMAL ROADS in all weather. It typically runs FULL-TIME (or seamlessly on demand) and includes a CENTRE DIFFERENTIAL or a coupling that lets the front and rear axles rotate at slightly DIFFERENT speeds — which is essential on dry pavement, because in a turn the front and rear axles travel different distances. AWD systems automatically shuffle torque to whichever wheels have grip, with no driver input, prioritising TRACTION and STABILITY on wet, snowy, or loose surfaces and in hard acceleration. It handles light trails and snow well but is not built for rock-crawling.

4WD (Four-Wheel Drive, "4x4") traditionally means a PART-TIME system the driver deliberately ENGAGES ("shift on the fly" or with a lever), using a TRANSFER CASE that LOCKS the front and rear driveshafts together to turn at the same speed. That lock gives maximum traction off-road but causes "drivetrain wind-up" and tyre scrub on dry pavement, so true part-time 4WD must be switched OFF on the road. Serious 4WD systems also add LOW RANGE (a crawler gear set for steep, slow, technical terrain) and sometimes locking axle differentials. Built for off-roading, heavy towing, and deep snow.

The marketing terms now overlap: some "4WD" systems are automatic and road-friendly, and some "AWD" systems are genuinely trail-capable. Look for low range and lockable differentials if hard off-roading matters.`,
  ),
  k(
    'kb-gap-auto-alternator-vs-starter',
    'Alternator vs starter',
    [
      'difference between an alternator and a starter', 'the starter is a powerful electric motor that runs only briefly when you turn the key it draws a large current from the battery to crank the engine over until it fires and runs on its own then disengages', 'the alternator is a generator driven by a belt off the running engine it produces electrical power to run all the cars electrical systems and recharge the battery while the engine is running',
      'a dead alternator means the car runs off the battery until it drains a dead starter means the car will not crank at all', 'battery starts the car alternator keeps it running',
    ],
    `They are near-opposites in the car's electrical system.

The STARTER is a powerful electric MOTOR used only for a few seconds at a time. When you turn the key or press START, it draws a large burst of current from the BATTERY, engages a small gear (the pinion) into the engine's flywheel ring gear, and CRANKS the engine over — spinning it fast enough that it fires and begins running under its own power. As soon as the engine catches, the starter disengages and does nothing until the next start. A dead or weak starter means the engine will not turn over at all — you get a single click, a grind, or nothing.

The ALTERNATOR is a GENERATOR. It is driven by a belt spun by the RUNNING engine, and it produces electrical power the whole time the engine is running — enough to operate everything electrical (ignition, lights, wipers, fans, infotainment, computers) AND to keep the BATTERY topped up. A failing alternator means the car keeps running only on the battery's reserve until that drains, then everything shuts down (dimming lights and a battery warning light are the classic early signs).

Simple flow: the battery powers the STARTER to get the engine going; the engine then drives the ALTERNATOR, which powers the car and recharges the battery. The battery starts the car; the alternator keeps it (and itself) alive.`,
  ),
  k(
    'kb-gap-auto-clutch-vs-torque-converter',
    'Clutch vs torque converter',
    [
      'difference between a clutch and a torque converter', 'a clutch used in manuals uses friction plates pressed together direct mechanical driver-operated engages and disengages fully efficient but wears and can be stalled', 'a torque converter used in automatics uses fluid coupling an impeller driven by the engine flings fluid at a turbine connected to the transmission lets the engine idle while stopped no stalling and MULTIPLIES torque at low speed some slippage so modern ones add a lock-up clutch for cruising',
      'clutch is a mechanical on-off connection torque converter is a fluid connection that also amplifies torque',
    ],
    `Both sit between the engine and the gearbox and let the engine spin while the wheels are stopped, but they work differently.

A CLUTCH (in a manual, and inside DCTs) is a MECHANICAL friction device: a spring-loaded pressure plate clamps a friction disc against the engine's flywheel. Foot off the pedal = clamped = engine and gearbox locked together, no slip, very efficient. Foot on the pedal = released = engine disconnected, so you can change gear or stop without stalling. The driver controls the engagement, the friction disc WEARS over time, and a clumsy release can STALL the engine or "burn" the clutch.

A TORQUE CONVERTER (in a traditional automatic) is a FLUID coupling — a sealed doughnut full of transmission fluid. An IMPELLER driven by the engine flings the fluid outward; a TURBINE connected to the transmission input is spun by that fluid. There is no physical contact, so the engine can idle indefinitely while the car sits in gear (no stalling, no clutch to ride). A third element, the STATOR, redirects the returning fluid so that at low speed the converter actually MULTIPLIES torque (roughly 2-2.5x) — a real advantage for launching and towing. The trade-off is some fluid SLIPPAGE (lost efficiency and heat), which modern converters eliminate at cruising speed by engaging a small internal LOCK-UP CLUTCH that bolts the impeller and turbine together directly.

Short version: a clutch is a driver-operated mechanical on/off connection; a torque converter is an automatic fluid connection that never stalls and multiplies torque off the line.`,
  ),
  k(
    'kb-gap-auto-spark-plug-vs-glow-plug',
    'Spark plug vs glow plug',
    [
      'difference between a spark plug and a glow plug', 'a spark plug is used in petrol spark-ignition engines it fires a high-voltage electric spark across a gap at the top of each compression stroke to ignite the fuel-air mixture it fires continuously every power cycle for the life of the engine', 'a glow plug is used in diesel compression-ignition engines which need no spark but when the engine is cold the compressed air is not hot enough to reliably ignite the diesel so the glow plug is an electric heating element that glows red-hot for a few seconds before and during cold starting once warm glow plugs switch off',
    ],
    `They belong to the two different ignition systems.

A SPARK PLUG is a PETROL-engine part. A petrol engine mixes fuel and air, compresses it, and needs an external SPARK to set it off at exactly the right instant. The spark plug screws into the top of each cylinder; the ignition system sends it a high-voltage pulse (10,000-40,000 V) that jumps as a spark across the small gap between its electrodes, igniting the mixture. It fires ON EVERY POWER STROKE, thousands of times a minute, the whole time the engine runs, for tens of thousands of miles between replacements.

A GLOW PLUG is a DIESEL-engine part. A diesel engine has NO spark — it compresses air so hard that it becomes hot enough (~500 C) to ignite the diesel the moment it is injected. But when the engine and its metal are COLD, that compressed air loses heat to the cylinder walls and may not get hot enough to light the fuel reliably. The glow plug is an electric HEATING ELEMENT in each cylinder (or in the pre-chamber) that is switched on for a few seconds BEFORE and just after a cold start, glowing red-hot to warm the combustion chamber so the first firings catch cleanly. Once the engine is up to temperature, the glow plugs turn OFF and play no part in normal running.

Short version: a spark plug ignites the fuel every cycle in a petrol engine; a glow plug is a cold-start pre-heater in a diesel engine.`,
  ),
];
