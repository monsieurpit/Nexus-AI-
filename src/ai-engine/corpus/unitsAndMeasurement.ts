import { KnowledgeItem } from '../../types';

export const UNITS_AND_MEASUREMENT_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-units-length-distance',
    title: 'Length and Distance Conversions: Feet, Miles, Meters, and Kilometers',
    category: 'everyday-science',
    keywords: ['feet to miles', 'meters to feet', 'kilometers to miles', 'distance conversion', 'how many feet in a mile'],
    content: `Common imperial length conversions: 1 mile = 5,280 feet = 1,760 yards. 1 yard = 3 feet. 1 foot = 12 inches. Common metric length conversions: 1 kilometer = 1,000 meters. 1 meter = 100 centimeters = 1,000 millimeters. Between the two systems: 1 mile ≈ 1.609 kilometers (a rough mental shortcut: multiply miles by 1.6, or for a quick rough estimate, miles × 8/5). 1 kilometer ≈ 0.621 miles (roughly 5/8 of a mile — useful for reading foreign road signs: "100 km" is about 62 miles). 1 meter ≈ 3.28 feet (just over 3 feet — a meter and a yard are close but not identical, a meter is about 10% longer). 1 inch = 2.54 centimeters exactly. The metric system's core advantage is that all units scale by powers of 10 (kilo=1000x, centi=1/100, milli=1/1000), making conversions within the system simple multiplication/division, whereas imperial units use inconsistent scaling factors (12 inches per foot, but 3 feet per yard, but 5,280 feet per mile) that have to be individually memorized rather than derived.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-units-weight-volume',
    title: 'Weight and Volume Conversions: Ounces, Pounds, Cups, and Liters',
    category: 'everyday-science',
    keywords: ['ounces to pounds', 'cups to ounces', 'grams to pounds', 'volume conversion', 'weight conversion', 'kitchen measurement conversion'],
    content: `Common weight conversions: 1 pound = 16 ounces. 1 kilogram ≈ 2.2 pounds (a useful rough shortcut: to convert kg to lbs, multiply by 2, then add 10% of that result — e.g., 70 kg × 2 = 140, plus 10% (14) = ~154 lbs, close to the exact 154.3). 1 ounce ≈ 28.35 grams. Common kitchen volume conversions (US customary): 1 cup = 8 fluid ounces = 16 tablespoons = 48 teaspoons. 1 tablespoon = 3 teaspoons. 1 pint = 2 cups. 1 quart = 2 pints = 4 cups. 1 gallon = 4 quarts = 16 cups. Metric-to-US kitchen approximations: 1 cup ≈ 237 milliliters (often rounded to 250 mL in recipes, which is technically a slightly different "metric cup" used in some countries). 1 liter ≈ 4.2 cups ≈ 1.06 US quarts. It's worth noting the distinction between weight (mass) and fluid volume ounces — a "fluid ounce" (volume, used for liquids like water or milk) and a regular "ounce" (weight, used for solids like flour or meat) are related but not interchangeable measures, which is a common source of recipe confusion, especially since water conveniently weighs almost exactly 1 ounce per fluid ounce, while denser or lighter ingredients (flour, sugar, oil) do not follow that same 1:1 ratio.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-units-why-us-not-metric',
    title: 'Why Doesn\'t the US Use the Metric System?',
    category: 'everyday-science',
    keywords: ['why doesnt us use metric', 'metric system history', 'imperial vs metric', 'us customary units'],
    content: `The US is one of only a small number of countries (alongside Liberia and Myanmar) that hasn't fully adopted the metric system for everyday use, despite metric being the global scientific and near-universal international standard. This isn't for lack of trying: the US actually legalized metric use as early as 1866, and the Metric Conversion Act of 1975 formally established a policy of voluntary metric conversion. The conversion largely stalled because it was voluntary rather than mandatory, unlike in countries such as the UK or Australia where government-led mandatory transitions (often over just a few years) pushed adoption through. By the time momentum built in the 1970s-80s, the enormous existing infrastructure built entirely around imperial units — road signage, manufacturing tooling, construction standards, consumer product sizing, and deeply ingrained everyday habits — made a full mandatory switch politically unpopular and expensive enough that the effort was largely abandoned. In practice, the US already uses metric extensively in specific domains where international standardization or precision matters: scientific research, medicine and pharmaceuticals, the military, manufacturing for global export, and sports like track and field and swimming all use metric units, even while everyday American life (weather reports, road distances, recipes, body weight) remains largely imperial.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-units-time-speed-other',
    title: 'Common Everyday Unit Conversions: Speed, Time, and Data Storage',
    category: 'everyday-science',
    keywords: ['mph to kmh', 'speed conversion', 'time conversion', 'data storage units', 'gigabyte vs gigabit'],
    content: `Speed: 1 mile per hour (mph) ≈ 1.609 kilometers per hour (km/h) — the same conversion factor as distance, since speed is just distance over time. A rough shortcut: mph × 1.6 ≈ km/h (60 mph ≈ 97 km/h, close to the highway-common "100 km/h" speed limit seen internationally). Time: while most time units (seconds, minutes, hours, days) are universal, it's worth knowing there are 60 seconds per minute, 60 minutes per hour, 24 hours per day, and 365.25 days per year on average (the .25 is why leap years exist — adding a day every 4 years keeps the calendar aligned with Earth's actual orbit). Data storage is a common source of confusion: a kilobyte (KB) is technically 1,024 bytes in traditional computing usage (based on binary powers of 2, since computers work in binary) though many manufacturers and modern standards now use 1,000 bytes to match the metric prefix meaning exactly, which is part of why a "500 GB" hard drive often shows up as slightly less usable space in your operating system — the drive manufacturer counted gigabytes as 1,000,000,000 bytes, while the OS reports it using the binary-based 1,073,741,824-byte definition. Also commonly confused: a gigabit (Gb, lowercase b) is different from a gigabyte (GB, uppercase B) — there are 8 bits in a byte, so internet speeds advertised in "megabits per second" (Mbps) are actually only 1/8th as many megabytes per second, which is why a "100 Mbps" connection downloads at roughly 12.5 MB/s, not 100 MB/s.`,
    createdAt: Date.now(),
  },
];
