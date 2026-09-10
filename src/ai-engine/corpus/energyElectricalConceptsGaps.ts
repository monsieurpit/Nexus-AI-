import { KnowledgeItem } from '../../types';

/**
 * ENERGY_ELECTRICAL_CONCEPTS_GAPS — batch 229 corrections.
 * Homonym / wrong-domain misses: "grounding vs bonding" -> electronegativity,
 * "R value vs U value" -> statistical variance, "compressor vs pump" -> an
 * audio compressor, "turbine vs piston engine" -> a turbocharger, "insulation
 * vs air barrier" -> dinosaur feathers and bird bones. Plus errors: lead-acid
 * called "single-use", kilowatt "measured in megawatt-hours", and web dumps
 * for generator/alternator and regenerative/friction braking.
 */
export const ENERGY_ELECTRICAL_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-energy-kw-vs-kwh',
    title: 'Kilowatt (kW) vs kilowatt-hour (kWh)',
    category: 'technology',
    keywords: [
      'difference between a kilowatt and a kilowatt hour', 'kW power rate', 'kWh energy amount',
      'power times time equals energy', 'electricity bill charges per kWh', 'a 2 kW heater for 3 hours is 6 kWh',
      'not measured in megawatt-hours',
    ],
    content: `A KILOWATT (kW) is a unit of POWER — the RATE at which energy is used or produced, right now. 1 kW = 1000 watts = 1000 joules per second. A device's kW rating tells you how hard it draws: a kettle is about 2-3 kW, an electric car charger 7-22 kW, a house's peak demand a few kW, a wind turbine 2-5 megawatts.

A KILOWATT-HOUR (kWh) is a unit of ENERGY — the total amount used or generated, equal to running 1 kW for 1 hour. Energy = power x time, so kWh = kW x hours. A 2 kW heater left on for 3 hours uses 2 x 3 = 6 kWh. Your electricity bill charges you per kWh (energy consumed), not per kW.

Analogy: kW is like speed (km/h — how fast you are going); kWh is like distance (km — how far you went). A fast car (high kW) driven for a short time can cover the same distance (kWh) as a slow car driven for a long time.

So it is wrong to say "a kilowatt is power measured in megawatt-hours" — power is measured in watts/kilowatts/megawatts; energy is measured in watt-hours/kilowatt-hours/megawatt-hours (or joules).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-energy-grounding-vs-bonding',
    title: 'Grounding vs bonding (electrical)',
    category: 'technology',
    keywords: [
      'difference between grounding and bonding', 'grounding connection to earth', 'bonding joining metal parts together',
      'equipotential', 'fault current path', 'ground rod', 'equipment grounding conductor', 'not electronegativity',
    ],
    content: `In electrical wiring (not chemistry):

BONDING is connecting together all the metal parts of a system that are NOT meant to carry current — enclosures, conduit, appliance frames, water and gas pipes, structural steel — with a low-resistance conductor, so they are all at the SAME electrical potential ("equipotential"). If a live wire touches a bonded metal part, every other bonded part is at the same voltage, so you cannot get a shock by touching two of them, and a large fault current can flow back to the source to trip the breaker.

GROUNDING (earthing) is connecting that bonded metal system (and the electrical supply's neutral, at one point) to the EARTH itself, typically via a ground rod or the water pipe. Its jobs are to give lightning and voltage surges a path to dissipate, to stabilise the voltage of the system relative to earth, and to reference the whole installation to a common zero.

Common confusion: the wire in a cable that connects an appliance chassis back to the panel is called the "equipment GROUNDING conductor" in North American code, but its actual function is BONDING (providing the fault-current path); the connection to actual earth happens once, at the service. Short version: bonding ties the metal parts together; grounding ties that assembly to the planet.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-energy-rvalue-vs-uvalue',
    title: 'R-value vs U-value (thermal insulation)',
    category: 'technology',
    keywords: [
      'difference between R value and U value', 'thermal resistance R-value higher is better', 'thermal transmittance U-value lower is better',
      'U equals one over R', 'insulation batts rated in R', 'windows and whole assemblies rated in U', 'building envelope',
      'not statistical variance',
    ],
    content: `Both describe how well a material or building element resists heat flow, and they are reciprocals of each other. (Nothing to do with statistical variance.)

R-VALUE is thermal RESISTANCE — how well something STOPS heat from passing through it. HIGHER R = better insulation. It is the value used for insulation products (fibreglass batts, foam board, blown cellulose), and R-values ADD when materials are layered. Typical: an attic might be R-50, a 2x6 wall cavity R-20. (Units: US ft2-F-h/BTU; metric m2-K/W, where the metric R is about 5.7 times the US value.)

U-VALUE (U-factor) is thermal TRANSMITTANCE — how much heat DOES pass through per unit area per degree of temperature difference. LOWER U = better. U = 1 / (total R of the assembly). U-value is used for WHOLE assemblies, especially windows and doors, and for code compliance of an entire wall or roof, because it accounts for framing, air films and thermal bridges, not just the insulation.

So: an insulation batt is rated R-13; the whole window is rated U-0.30. To convert, take the reciprocal (a window with U-0.25 has an overall R of 4). Marketing on insulation talks about high R; energy codes for buildings often specify a maximum U.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-energy-compressor-vs-pump',
    title: 'Compressor vs pump (fluid machinery)',
    category: 'technology',
    keywords: [
      'difference between a compressor and a pump', 'compressor raises the pressure of a gas', 'pump moves a liquid',
      'compressible versus incompressible fluid', 'air compressor', 'water pump', 'reduces gas volume',
      'not an audio compressor',
    ],
    content: `Both are machines that add energy to a fluid to move it or pressurise it. The difference is the KIND of fluid. (Not an audio-signal compressor with attack and release settings.)

A PUMP moves a LIQUID (water, oil, fuel, slurry). Liquids are essentially INCOMPRESSIBLE — a pump does not squeeze the liquid smaller, it just moves it and raises its pressure/head to push it uphill, through pipes, or into a tank. Types: centrifugal (a spinning impeller flings the liquid outward — most common), positive-displacement (piston, gear, diaphragm — traps a fixed volume and forces it along).

A COMPRESSOR raises the pressure of a GAS (air, refrigerant, natural gas). Gases ARE compressible, so a compressor actually reduces the gas's VOLUME as it raises its pressure (and, because compression adds energy, its temperature rises). Examples: the air compressor for pneumatic tools, the compressor in a fridge / heat pump / air conditioner that pressurises the refrigerant, and turbochargers/superchargers on engines.

A "fan" or "blower" is the low-pressure end of moving a gas — it moves large volumes with only a small pressure rise and negligible compression. Short version: pump = liquid; compressor = gas (and it shrinks it); fan = gas at low pressure.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-energy-turbine-vs-piston-engine',
    title: 'Gas turbine vs piston (reciprocating) engine',
    category: 'technology',
    keywords: [
      'difference between a turbine and a piston engine', 'continuous rotary flow versus reciprocating cycle',
      'jet turboprop gas turbine', 'four-stroke cylinders and crankshaft', 'power-to-weight', 'smoothness and vibration',
      'not a turbocharger', 'Brayton versus Otto Diesel cycle',
    ],
    content: `Both are heat engines that burn fuel to produce power, but they work completely differently. (A "turbo" on a car is a turbocharger — a small turbine that recovers exhaust energy to force more air in — not a full turbine engine.)

A PISTON (reciprocating) engine burns fuel in intermittent explosions inside cylinders. Each explosion shoves a piston, and a crankshaft converts that back-and-forth motion into rotation. It runs a repeating cycle (four-stroke Otto or Diesel: intake, compression, power, exhaust). It is efficient at part load, cheap, and dominant in cars, motorcycles, small aircraft and generators, but it has many moving parts, vibration, and a limited power-to-weight ratio.

A GAS TURBINE burns fuel CONTINUOUSLY. Air is drawn in and compressed by a rotating compressor, fuel is added and burned steadily in a combustor, and the hot high-pressure gas expands through a rotating turbine (which drives the compressor and the output shaft or, in a jet, exits as thrust). It runs the continuous Brayton cycle. Turbines are smooth, have a very high power-to-weight ratio, and thrive at constant high power — so they power jets, helicopters, large ships, tanks, and electricity peaking plants — but they are inefficient at low/variable load and expensive to build and maintain.

Short version: piston = intermittent bangs, cylinders and a crankshaft, great for varying loads; turbine = continuous spinning airflow and combustion, great for constant high power and light weight.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-energy-lithium-vs-lead-acid',
    title: 'Lithium-ion vs lead-acid battery (both rechargeable)',
    category: 'technology',
    keywords: [
      'difference between a lithium ion and lead acid battery', 'both are rechargeable', 'energy density weight',
      'cycle life', 'depth of discharge', 'cost', 'lead-acid car starter battery', 'lithium EV and phones',
      'not single-use',
    ],
    content: `BOTH are rechargeable (secondary) batteries — a lead-acid car battery is recharged by the alternator thousands of times over its life; it is NOT single-use. The differences are in performance and cost.

Lead-acid (lead plates in sulfuric acid): cheap, robust, tolerant of abuse and cold, delivers a big burst of current (good for starting engines), and easy to recycle. Downsides: heavy and bulky (low energy density, ~30-40 Wh/kg), a shorter cycle life (a few hundred to ~1500 cycles), it degrades badly if left discharged, and you should only use the top ~50% of its capacity to preserve it. Used for: car starter batteries, backup/UPS, golf carts, off-grid systems on a budget.

Lithium-ion (lithium moving between electrodes; LFP and NMC chemistries): 3-5 times lighter for the same energy (~150-260 Wh/kg), 2000-6000+ cycles, can be discharged to 80-100% of capacity, holds voltage better, and charges faster. Downsides: much more expensive up front, needs a battery-management system, is more sensitive to overcharge/overheat (fire risk if abused), and performs worse in extreme cold. Used for: phones, laptops, power tools, electric vehicles, and increasingly home and grid storage.

Short version: both rechargeable; lead-acid is cheap, heavy, short-lived and shallow-cycle; lithium-ion is expensive, light, long-lived and deep-cycle.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-energy-generator-vs-alternator',
    title: 'Generator vs alternator (vs dynamo)',
    category: 'technology',
    keywords: [
      'difference between a generator and an alternator', 'generator is the general term', 'alternator produces AC',
      'dynamo produces DC with a commutator', 'car alternator with rectifier', 'electromagnetic induction',
      'rotating field versus rotating armature',
    ],
    content: `All three convert mechanical (rotational) energy into electrical energy by electromagnetic induction.

"Generator" is the GENERAL term for any such machine. In everyday use a portable "generator" is an engine driving an electrical generator to produce mains-style AC.

An ALTERNATOR is a generator that produces ALTERNATING CURRENT (AC). Modern practice puts the magnetic field on the spinning rotor and takes the output from stationary windings (the stator), which avoids sliding brushes on the high-current path and is more reliable. Almost all large power-station generators and all modern car "alternators" are of this type. A car alternator produces AC internally and then rectifies it to DC (with a built-in diode bridge) to charge the 12 V battery.

A DYNAMO is the older design that produces DIRECT CURRENT (DC) directly, using a rotating armature and a split-ring "commutator" plus brushes to flip the connections each half-turn. Cars used dynamos until the 1960s-70s, then switched to alternators because alternators are lighter, charge at idle, and need less maintenance.

Short version: generator = the category; alternator = a generator that outputs AC (the standard today); dynamo = an old generator that outputs DC via a commutator.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-energy-fuse-vs-circuit-breaker',
    title: 'Fuse vs circuit breaker',
    category: 'technology',
    keywords: [
      'difference between a fuse and a circuit breaker', 'both protect against overcurrent', 'fuse melts once and must be replaced',
      'circuit breaker trips and can be reset', 'faster response of a fuse', 'thermal magnetic trip', 'panel',
    ],
    content: `Both do the SAME job: they interrupt a circuit when the current gets dangerously high (from an overload or a short circuit), before the wiring can overheat and start a fire. The difference is what happens after they operate.

A FUSE contains a thin metal element that MELTS (blows) when the current exceeds its rating for long enough. It is single-use — once blown, the fuse is destroyed and must be REPLACED with a new one of the correct rating (using a bigger fuse is dangerous). Fuses are cheap, simple, have no moving parts, and can react extremely fast to a large fault, which is why they are still used for the highest-speed protection (large industrial equipment, semiconductors, some appliance internals, car circuits).

A CIRCUIT BREAKER is a switch with a built-in trip mechanism: a bimetallic strip that bends on sustained overload (thermal) plus an electromagnet that snaps open on a sudden short (magnetic). When it trips it just opens; you flip it back to RESET it (after fixing the fault). It is reusable, can be switched manually, and modern versions add extra protection (GFCI/RCD for shock, AFCI for arc faults).

Short version: same protective function; a fuse sacrifices itself and is replaced, a breaker trips and is reset. Homes have moved from fuse boxes to breaker panels for convenience and added safety features.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-energy-regen-vs-friction-braking',
    title: 'Regenerative braking vs friction braking',
    category: 'technology',
    keywords: [
      'difference between regenerative braking and friction braking', 'motor acts as a generator to slow the car',
      'recovers kinetic energy back to the battery', 'brake pads clamp a rotor and turn energy to heat', 'blended braking',
      'one-pedal driving', 'EVs and hybrids',
    ],
    content: `Both slow a vehicle by removing kinetic energy, but one wastes that energy and the other recovers it.

FRICTION (mechanical) braking is the traditional system on every car: hydraulically-pushed pads (disc) or shoes (drum) clamp onto a rotor or drum attached to the wheel. The friction converts the car's kinetic energy into HEAT, which radiates away and is lost. It works at any speed, down to a complete stop and holding on a hill, and is fully independent of the powertrain (so it is the safety fallback).

REGENERATIVE braking is used on electric and hybrid vehicles. When you lift off or press the brake, the electric drive MOTOR is run BACKWARDS as a GENERATOR: the wheels turn it, it resists that turning (which slows the car), and the electricity it produces is fed back into the battery. So a good chunk of the energy that would have become brake heat is RECOVERED and reused, improving range by roughly 10-25% in city driving, and it reduces brake-pad wear. Limitations: it fades near a stop, weakens when the battery is full or very cold, and cannot hold the car stationary.

Real EVs BLEND the two: light braking is all regenerative, harder braking automatically adds friction, seamlessly. "One-pedal driving" means lifting the accelerator triggers strong regen so you rarely touch the brake pedal.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-energy-insulation-vs-air-barrier',
    title: 'Insulation vs air barrier (building science)',
    category: 'technology',
    keywords: [
      'difference between insulation and an air barrier', 'insulation slows conductive heat transfer', 'air barrier stops uncontrolled air leakage',
      'infiltration exfiltration', 'building envelope', 'vapour barrier is separate', 'both needed', 'not dinosaur feathers',
    ],
    content: `These are two different jobs in a building's exterior "envelope", and you need BOTH. (Nothing to do with feathers or bird bones.)

INSULATION (fibreglass, mineral wool, cellulose, foam) slows CONDUCTIVE and radiative heat transfer through the solid parts of walls, roof and floor — heat flowing directly through the material because of a temperature difference. Its performance is the R-value. Insulation on its own does little to stop AIR from moving through gaps.

An AIR BARRIER is a continuous membrane or sealed layer (house wrap, taped sheathing, spray foam, sealed drywall, caulk at every joint and penetration) whose job is to stop UNCONTROLLED AIR LEAKAGE through the envelope — cold outside air being drawn IN (infiltration) and heated inside air being pushed OUT (exfiltration) through cracks. Air leakage can account for a huge share of a building's heat loss and also carries moisture into wall cavities where it can condense and rot the structure.

They are complementary: insulation stops heat conducting through the wall, the air barrier stops heat being carried away by leaking air. A poorly air-sealed house can feel drafty and cost a fortune to heat even with thick insulation. (A vapour barrier / vapour retarder is a third, separate concept — it slows moisture DIFFUSION through materials, and its correct placement depends on climate.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-energy-inverter-vs-converter',
    title: 'Inverter vs converter (vs rectifier)',
    category: 'technology',
    keywords: [
      'difference between an inverter and a converter', 'inverter DC to AC', 'rectifier AC to DC', 'converter general term',
      'DC-DC converter changes voltage', 'solar inverter', 'phone charger', 'power electronics',
    ],
    content: `These are all "power electronics" devices that change the form of electrical power.

An INVERTER converts DC to AC. It takes a steady DC source (a battery, a solar panel array) and produces an alternating current, ideally a clean sine wave at the right voltage and frequency (120/240 V, 50/60 Hz). Used in solar systems, UPS units, EVs (to drive the AC motor from the DC battery), and portable power stations.

A RECTIFIER converts AC to DC — the opposite of an inverter. A phone charger or laptop brick rectifies mains AC to low-voltage DC.

"CONVERTER" is the broad umbrella term for any device that changes electrical power from one form to another. It includes rectifiers (AC->DC) and inverters (DC->AC), but in everyday use "converter" most often means a DC-DC CONVERTER — a device that changes a DC voltage to a different DC voltage (a "buck" converter steps voltage down, a "boost" converter steps it up), as in the 12 V-to-5 V converter in a car USB adapter, or the converter that takes an EV's high-voltage battery down to 12 V for the accessories.

Short version: inverter = DC to AC; rectifier = AC to DC; DC-DC converter = one DC voltage to another; "converter" alone = any of these, usually the DC-DC kind.`,
    createdAt: Date.now(),
  },
];
