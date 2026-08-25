import { KnowledgeItem } from '../../types';

export const AUTOMOTIVE_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-automotive-how-engines-work',
    title: 'How a Car Engine Works (Combustion, Cylinders, Horsepower)',
    category: 'automotive',
    keywords: [
      'how does a car engine work', 'internal combustion engine', 'cylinders', 'horsepower', 'torque',
      'four stroke engine', 'turbo', 'what does a turbo do', 'v6 vs v8', 'engine basics',
    ],
    content: `A gasoline internal combustion engine makes power through the four-stroke cycle, repeated in each cylinder: intake (piston moves down, drawing in an air-fuel mixture), compression (piston moves up, squeezing that mixture), combustion/power (a spark plug ignites it, the explosion forces the piston back down — this is the stroke that actually produces power), and exhaust (piston moves up again, pushing burnt gases out). Multiple cylinders (commonly 4, 6, or 8, arranged in a line or a "V" shape — hence "V6"/"V8") fire in a staggered sequence so the engine produces power smoothly rather than in one big jolt; more cylinders generally means smoother, more powerful (but heavier and thirstier) engines, though modern small turbocharged engines can rival older larger ones in output. Horsepower measures how much work an engine can do over time (raw power, relevant to top speed), while torque measures rotational force (how hard it can push, relevant to acceleration and towing) — a high-torque, lower-horsepower engine feels strong off the line, while a high-horsepower engine tends to keep pulling at higher RPM. A turbocharger uses the engine's own exhaust gases to spin a turbine that forces extra compressed air into the cylinders, letting a smaller engine produce power closer to a larger one — this is why a "turbo four-cylinder" can now compete with older naturally-aspirated V6s. RPM (revolutions per minute) measures how fast the engine's crankshaft is spinning; redline is the maximum safe RPM before risking engine damage.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-automotive-ev-vs-gas',
    title: 'Electric Vehicles vs. Gas Cars: How They Actually Differ',
    category: 'automotive',
    keywords: [
      'electric car', 'ev', 'ev vs gas', 'tesla', 'ev range', 'ev charging', 'hybrid car', 'plug in hybrid',
      'ev battery degradation', 'how do electric cars work', 'ev vs gas car',
    ],
    content: `Electric vehicles (EVs) use one or more electric motors powered by a large battery pack instead of an internal combustion engine — no cylinders, no exhaust, no multi-speed transmission in most designs (EVs typically use a single-speed gear reduction, since electric motors deliver near-instant, full torque from 0 RPM, unlike gas engines which need to build RPM). This is why EVs generally feel much quicker off the line than their horsepower figures alone would suggest. Charging speed depends heavily on the charger type: Level 1 (a standard home outlet) adds only a few miles of range per hour, Level 2 (a dedicated home/public charger, like what an EV owner typically installs at home) charges overnight, and DC fast charging (used on road trips) can add significant range in 20-40 minutes but isn't meant for daily use since frequent fast-charging accelerates battery wear. A hybrid combines a gas engine with a small electric motor/battery that can't be plugged in and charges itself via regenerative braking and the engine — it improves fuel economy but can't drive on electric power alone for long. A plug-in hybrid (PHEV) has a larger battery that CAN be charged externally and typically offers 20-40 miles of pure-electric range before switching to gas, letting many owners do daily driving on electricity while keeping gas range for longer trips. EV battery degradation is real but generally slower than commonly assumed — most manufacturers warranty battery capacity for 8 years/100,000+ miles, and real-world data generally shows modern EV batteries retaining the large majority of their capacity well past that point, though extreme heat, frequent fast-charging, and always charging to 100% all accelerate wear.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-automotive-maintenance-basics',
    title: 'Basic Car Maintenance Every Owner Should Know',
    category: 'automotive',
    keywords: [
      'car maintenance', 'oil change', 'how often oil change', 'tire pressure', 'brake pads', 'car maintenance schedule',
      'check engine light', 'tire tread', 'coolant', 'transmission fluid', 'basic car maintenance',
    ],
    content: `Oil changes are the most basic recurring maintenance — modern synthetic oil is typically good for 5,000-10,000 miles depending on the manufacturer's recommendation (check your owner's manual; "every 3,000 miles" is outdated advice from older conventional-oil engines). Tire pressure should be checked monthly (cold, before driving) — the correct PSI is on a sticker inside the driver's door jamb, not the number printed on the tire sidewall (that's the tire's maximum rating, not the recommended pressure). Tire tread depth matters for wet-weather grip and can be roughly checked with the "penny test" (insert a penny into the tread groove, Lincoln's head down — if you can see all of his head, tread is too worn). Brake pads typically last 25,000-70,000 miles depending on driving style; a high-pitched squeal when braking is usually a built-in wear indicator telling you it's time to replace them, and a grinding sound means the pads are already gone and you're damaging the rotors. Coolant (antifreeze) prevents the engine from overheating and should be flushed/replaced per the manufacturer's schedule (often every 30,000-60,000 miles, sometimes longer on modern long-life coolants) — running low or old, degraded coolant is a common cause of overheating. A check engine light can mean anything from a loose gas cap to a serious engine problem — an auto parts store can usually read the diagnostic code for free, which narrows down what's actually wrong before you decide whether it needs a mechanic. Transmission fluid, unlike engine oil, doesn't need changing nearly as often on many modern vehicles (some manufacturers claim "lifetime" fluid, though many mechanics still recommend a change around 60,000-100,000 miles regardless) — check your specific manufacturer's guidance rather than assuming.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-automotive-car-culture-tuning',
    title: 'Car Culture: JDM, Tuning, and Modification Basics',
    category: 'automotive',
    keywords: [
      'jdm', 'jdm cars', 'car tuning', 'car modifications', 'turbo upgrade', 'car mods', 'stance', 'drifting',
      'what does jdm mean', 'import cars', 'car culture',
    ],
    content: `JDM (Japanese Domestic Market) technically refers to vehicles/parts originally built and sold for Japan's own market, but is used more broadly by car enthusiasts to describe Japanese performance cars generally — the Nissan Skyline GT-R, Toyota Supra, Honda Civic Type R, and Mazda RX-7 are among the most iconic. These cars became legendary in tuning culture partly because of their strong aftermarket support and, in some cases (like the RB26 engine in the Skyline GT-R), because their factory engines can reliably handle huge power increases with the right modifications. Common modifications include: intake and exhaust upgrades (more airflow, more sound, modest power gains), turbo/supercharger upgrades or additions (major power gains but require supporting mods — fuel system, engine internals — to handle the extra stress reliably), suspension/coilover upgrades (better handling, adjustable ride height), and ECU tuning/"remapping" (rewriting the engine computer's software to optimize performance, often the single most impactful and cheapest power upgrade on a turbocharged car). "Stance" describes a build focused on how low and aggressive a car sits/looks (often at the expense of ride comfort or even practicality) rather than pure performance. Drifting — intentionally oversteering through a corner so the rear tires lose traction while maintaining control — originated in 1970s-80s Japanese mountain road (touge) racing and became a full motorsport (Formula Drift, D1GP) judged on angle, speed, and line rather than who finishes first. Car meets and shows (like SEMA in the US, one of the largest aftermarket auto trade shows in the world) are where a lot of build trends and culture spread.`,
    createdAt: Date.now(),
  },
];
