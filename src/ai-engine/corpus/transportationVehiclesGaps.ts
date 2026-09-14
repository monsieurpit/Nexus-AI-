import { KnowledgeItem } from '../../types';

// Batch 294 corpus fixes — transportation/vehicles/aviation "what's the difference between X and
// Y" topics. 13/25 misses, a rough batch: several complete dodges into unrelated Wikipedia trivia
// (runway/taxiway, economy/business class, tram/train, bike lane/bus lane, roundabout/intersection),
// one severe hallucination (motorcycle/moped answered with random engine-stroke trivia about
// chainsaws and lawnmowers), a factual mix-up (highway/freeway answered with British "motorway"
// terminology instead of properly contrasting the two US terms), and several cut-off/incomplete
// answers that only covered the first term.

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'automotive',
  keywords,
  content,
  createdAt: now,
});

export const TRANSPORTATION_VEHICLES_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-transport-pilot-vs-copilot',
    'Pilot vs co-pilot',
    ['pilot', 'co-pilot', 'copilot', 'difference pilot co-pilot'],
    "A pilot (often called the captain or pilot-in-command) is the crew member with final legal authority and responsibility for the aircraft — they make the ultimate decisions, sign off on the flight, and are accountable for the safety of everyone aboard. A co-pilot (also called the first officer) is NOT just a passive backup sitting there in case something goes wrong — they're a fully licensed, fully qualified pilot in their own right who actively shares the flying duties throughout the flight: co-pilots regularly take the controls and fly entire legs of a trip themselves, handle radio communication, monitor instruments, and run checklists, while the captain and first officer swap who is 'flying' the plane versus 'monitoring' on different legs. The key difference: the pilot/captain holds final command authority and legal responsibility for the flight, while the co-pilot/first officer is an equally trained pilot who actively shares hands-on flying duties, not merely a standby substitute who only flies if the captain can't.",
  ),
  k(
    'kb-gap-transport-runway-vs-taxiway',
    'Runway vs taxiway',
    ['runway', 'taxiway', 'difference runway taxiway'],
    "A runway is the long, straight strip specifically built for aircraft to take off and land at high speed — it's oriented to align with prevailing winds where possible, and is the only part of an airport where planes actually accelerate to flying speed or touch down. A taxiway is a completely different kind of surface — a network of paths connecting the runway to the terminal, gates, and hangars, used for aircraft to travel slowly on the ground under their own power between the runway and where they park or board passengers; aircraft never take off or land on a taxiway, they only use it to get to and from the runway at low, controlled speeds. The key difference: a runway is built for the high-speed act of taking off and landing, while a taxiway is a slower ground-travel path connecting the runway to gates, terminals, and hangars.",
  ),
  k(
    'kb-gap-transport-commercial-vs-charter-flight',
    'Commercial flight vs charter flight',
    ['commercial flight', 'charter flight', 'difference commercial charter flight'],
    "A commercial flight is a scheduled, publicly-bookable flight operated by an airline (like British Airways or Delta) on a fixed route and timetable, sold seat-by-seat to the general public, running whether the plane is full or half-empty because it's on a regular published schedule. A charter flight is privately arranged for a specific group, company, or purpose — someone (a travel company, sports team, tour operator, or private individual) books the ENTIRE aircraft for a one-off or custom trip, choosing the departure time, route, and destination rather than picking from a fixed public schedule, and the flight only happens because that specific booking paid for it, not because it's a standing scheduled service. The key difference: a commercial flight runs on a fixed public schedule with individually sold seats regardless of who's on it, while a charter flight is a private, custom-booked flight for one group that controls its own timing and route rather than following a published timetable.",
  ),
  k(
    'kb-gap-transport-economy-vs-business-class',
    'Economy class vs business class',
    ['economy class', 'business class', 'difference economy business class'],
    "Economy class is the standard, lowest-priced cabin on a commercial flight — seats are the most compact and closely spaced, amenities are the most basic (limited legroom, simple meal service or none on short flights, no lounge access), and it makes up the majority of seats on most aircraft. Business class is a significantly more expensive, premium cabin positioned above economy (and premium economy, where that exists) — it offers much more space per seat (often wider seats that recline further or fully flat in long-haul planes), better food and drink service, airport lounge access, faster boarding/priority check-in, and generally a more comfortable overall experience, aimed at business travelers or anyone willing to pay significantly more for comfort. The key difference: economy class is the standard, cheapest, most compact cabin, while business class is a premium, much more expensive cabin with far more space, service, and comfort, sitting above economy (and above premium economy where offered) in both price and amenities.",
  ),
  k(
    'kb-gap-transport-train-vs-subway',
    'Train vs subway',
    ['train', 'subway', 'difference train subway'],
    "A train (in the general sense, including commuter and intercity rail) typically travels long distances between cities or regions, often above ground, and can carry passengers or freight over open countryside, connecting far-apart destinations with fewer, more widely spaced stops. A subway (also called a metro or underground) is specifically an urban rail system that runs mostly or entirely underground (or sometimes elevated) within a single city, making frequent, closely-spaced stops to move large numbers of commuters quickly around that one city — subways are built for short urban trips, not long-distance travel, and their tunnels let them avoid street-level traffic entirely. The key difference: a train generally covers longer distances between cities/regions with fewer stops, while a subway is a city-specific, mostly underground system with frequent, closely-spaced stops built for fast urban commuting within one metro area.",
  ),
  k(
    'kb-gap-transport-tram-vs-train',
    'Tram vs train',
    ['tram', 'train', 'difference tram train'],
    "A tram (also called a streetcar or trolley) is a smaller rail vehicle that runs on tracks built directly into city streets, sharing the road with cars, cyclists, and pedestrians at street level, making frequent stops for short urban trips, usually without its own dedicated right-of-way for the whole route. A train runs on its own dedicated tracks separate from road traffic, is typically much longer and heavier than a tram, and is built for longer distances at higher speeds, whether that's commuter rail connecting suburbs to a city center or intercity/freight rail crossing much greater distances — trains don't mix with street traffic the way trams do. The key difference: a tram shares street-level space with regular road traffic and makes short, frequent urban stops, while a train runs on its own separate tracks away from road traffic and is built for longer distances at higher speeds.",
  ),
  k(
    'kb-gap-transport-highway-vs-freeway',
    'Highway vs freeway',
    ['highway', 'freeway', 'difference highway freeway'],
    "A highway is a broad, general term for any major public road designed to connect towns and cities and move traffic efficiently over distance — a highway can have traffic lights, stop signs, at-grade intersections where other roads cross it directly, and speed limits that vary along its length. A freeway is a specific, more restrictive TYPE of highway with fully controlled access — no traffic lights, no stop signs, and no at-grade intersections at all; entry and exit only happen via on-ramps and off-ramps, and all crossing roads pass over or under the freeway on bridges or in tunnels rather than crossing it directly, which is what allows continuous high-speed travel without ever having to stop for cross-traffic. The key difference: highway is the broad umbrella term for any major road connecting places (which may still have intersections and traffic lights), while a freeway is specifically a highway with fully controlled access — no direct intersections, entry/exit only by ramps — making uninterrupted high-speed travel possible.",
  ),
  k(
    'kb-gap-transport-motorcycle-vs-moped',
    'Motorcycle vs moped',
    ['motorcycle', 'moped', 'difference motorcycle moped'],
    "A motorcycle is a full-sized, two-wheeled motor vehicle with a relatively powerful engine (commonly well over 125cc, often much larger), capable of highway speeds, with no functioning pedals — it's operated entirely by its engine and requires a motorcycle license to ride in most places. A moped is a much smaller, lower-powered two-wheeled vehicle, traditionally defined by having a small engine (historically 50cc or less) combined with working pedals that can actually help propel or start it (the name comes from 'motor' + 'pedal'), is speed-limited to well below highway speeds, and in many places can legally be ridden with just a regular driver's license rather than a full motorcycle license. The key difference: a motorcycle has a larger, more powerful engine, no pedals, and highway-capable speed requiring a motorcycle license, while a moped has a small, low-power engine, (traditionally) working pedals, and a much lower speed limit, often requiring only a basic license.",
  ),
  k(
    'kb-gap-transport-scooter-vs-motorcycle',
    'Scooter vs motorcycle',
    ['scooter', 'motorcycle', 'difference scooter motorcycle'],
    "A scooter has a distinctive 'step-through' frame — there's an open, flat floorboard between the seat and the handlebars that a rider steps through rather than swinging a leg over a raised frame, the engine is usually smaller and mounted low near the rear wheel, and scooters almost always come with an automatic transmission, making them simple to ride with just a throttle and brakes. A motorcycle has a traditional straddle-style frame the rider swings a leg over, with the engine positioned between the rider's legs, typically a larger and more powerful engine, and very often a manual transmission the rider shifts with a hand clutch and foot pedal, though some motorcycles do offer automatic options too. The key difference: a scooter has a step-through frame, smaller low-mounted engine, and near-universal automatic transmission built for easy commuting, while a motorcycle has a straddle frame, generally larger engine, and more often a manual transmission, built more for performance and range.",
  ),
  k(
    'kb-gap-transport-ferry-vs-cruise-ship',
    'Ferry vs cruise ship',
    ['ferry', 'cruise ship', 'difference ferry cruise ship'],
    "A ferry is a working transportation vessel with one practical job — moving passengers, vehicles, or cargo between two (or more) fixed points, often on a short, regular, scheduled route (crossing a strait, connecting islands, crossing a river or channel), and trips are typically short, from minutes to a few hours, with passengers usually staying only briefly aboard. A cruise ship is built as a floating vacation destination in itself, not just point-A-to-point-B transport — cruise ships are far larger, packed with entertainment, restaurants, pools, and cabins for passengers to live in for days or weeks, and the voyage typically loops back to its starting port (or a different port) after visiting several destinations, with the onboard experience being the main point of the trip, not just reaching a destination. The key difference: a ferry is a practical, usually short point-to-point transport vessel, while a cruise ship is a large floating resort/vacation vessel designed for a multi-day leisure voyage where the ship itself is the destination.",
  ),
  k(
    'kb-gap-transport-yacht-vs-sailboat',
    'Yacht vs sailboat',
    ['yacht', 'sailboat', 'difference yacht sailboat'],
    "A sailboat is defined specifically by its propulsion — it's any boat that uses sails and wind power to move, regardless of size, luxury, or purpose, ranging from a small single-person dinghy to a large ocean-crossing sailing vessel. A yacht is defined by its PURPOSE and typically its size/luxury, not by how it's powered — a yacht is a recreational or leisure vessel (as opposed to a working boat used for fishing, cargo, or ferrying), and can be either sail-powered (a sailing yacht) OR engine-powered (a motor yacht) — yachts are also generally larger and more luxuriously equipped than an ordinary sailboat, often with cabins, amenities, and sometimes a paid crew. The key difference: sailboat refers specifically to wind/sail propulsion regardless of size or purpose, while yacht refers to a recreational pleasure vessel (which may or may not have sails at all) generally implying larger size and more luxury than a basic sailboat.",
  ),
  k(
    'kb-gap-transport-bike-lane-vs-bus-lane',
    'Bicycle lane vs bus lane',
    ['bicycle lane', 'bus lane', 'difference bicycle lane bus lane'],
    "A bicycle lane is a portion of a road reserved specifically for cyclists, marked off from regular car traffic (sometimes just by painted lines, sometimes by a physical curb or barrier for extra protection), meant to give cyclists a dedicated, safer space separate from cars and pedestrians. A bus lane is a different kind of reserved lane, meant for public transit buses (and sometimes also taxis, carpools, or emergency vehicles depending on the city) to bypass regular car traffic and keep bus schedules reliable — bus lanes are typically wider than bike lanes to accommodate a full-size bus, and other vehicles (including bicycles, usually) are generally not allowed to use them except to cross or briefly merge. The key difference: a bicycle lane is reserved for cyclists to keep them safely separated from car traffic, while a bus lane is reserved for public transit buses (and sometimes a few other vehicle types) to keep bus service fast and reliable, and the two are built for entirely different vehicle types.",
  ),
  k(
    'kb-gap-transport-roundabout-vs-intersection',
    'Roundabout vs intersection',
    ['roundabout', 'intersection', 'difference roundabout intersection'],
    "A regular intersection is where two or more roads cross or meet directly, and traffic is typically controlled by traffic lights, stop signs, or yield signs that assign each direction a turn to go, often bringing all directions to a complete stop at some point in the cycle. A roundabout is a circular junction where all traffic flows continuously in one direction around a central island — instead of stopping and waiting for a green light or your turn, drivers entering a roundabout yield to traffic already circulating and merge in when there's a gap, keeping traffic moving rather than stopping completely, which tends to reduce both wait times and the kind of high-speed, right-angle collisions that happen at traditional intersections. The key difference: a regular intersection typically uses traffic lights or stop signs and brings traffic to a full stop at some point, while a roundabout keeps traffic continuously flowing in a circle with yield-on-entry instead of stopping, generally making it safer and more efficient.",
  ),
];
