import { KnowledgeItem } from '../../types';

// Batch 28 (how technology works) gap-fills. Live misses on nexus-4b:
// "how does a hydraulic system work" -> answered ABS anti-lock braking;
// "how does bluetooth work" -> "like a picky boyfriend, only remembers a
// limited number of partners"; "camera sensor" -> only the exposure triangle,
// never the sensor; "touchscreen" -> mostly about touchscreen gloves; "LED"
// -> "three layers of silicon".
export const HOW_TECH_WORKS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-hydraulic-system',
    title: 'How a Hydraulic System Works',
    category: 'Technology',
    keywords: [
      'how does a hydraulic system work', 'what is hydraulics', 'pascal principle hydraulics', 'how do hydraulic brakes work',
      'how does a hydraulic lift work', 'why do excavators use hydraulics', 'how does a car jack work',
    ],
    content: `A hydraulic system uses a confined liquid (usually oil) to transmit force from one place to another. It relies on Pascal's principle: pressure applied to an enclosed fluid is transmitted undiminished to every part of the fluid and the container. Because liquids barely compress, pushing a small piston at one end instantly moves fluid and pushes a piston at the other end. If the output piston has a bigger area than the input piston, the force is multiplied (a small force on a 1 cm² piston becomes a large force on a 10 cm² piston — 10× more force, but the big piston moves 10× less distance, so energy is conserved, like a lever). This is why hydraulics are used where big controllable forces are needed: car and truck brakes (your foot's push is multiplied to clamp the pads), car jacks and lifts, excavator and loader arms, aircraft controls, forklifts, and hydraulic presses. The trade-off is leaks, weight and the need for a pump to pressurise the fluid.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bluetooth',
    title: 'How Bluetooth Works',
    category: 'Technology',
    keywords: [
      'how does bluetooth work', 'what is bluetooth', 'how does bluetooth pairing work', 'what frequency does bluetooth use',
      'what is bluetooth low energy', 'how far does bluetooth reach', 'why does bluetooth use so little power',
    ],
    content: `Bluetooth is a short-range wireless standard for connecting devices directly to each other without a network or cables. It uses low-power radio in the 2.4 GHz band (the same unlicensed band as Wi-Fi and microwaves), and to avoid interference it rapidly "frequency-hops" — switching among 79 (or, in Bluetooth Low Energy, 40) narrow channels up to 1,600 times a second, in a sequence both devices agree on. Range is typically about 10 metres for phones and headphones (Class 2), more for some devices. "Pairing" is a one-time handshake where two devices exchange identities and a shared secret key, so afterwards they recognise and trust each other and reconnect automatically. Bluetooth Low Energy (BLE), added in 2010, sips so little power that a coin-cell battery can run a sensor, fitness band or tracker (like AirTags) for months or years. Classic Bluetooth is used for continuous streams like audio; BLE for short bursts of data.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-camera-sensor',
    title: 'How a Digital Camera Sensor Works',
    category: 'Technology',
    keywords: [
      'how does a camera sensor work', 'how does a digital camera work', 'what is a photosite', 'what is a pixel on a sensor',
      'CMOS vs CCD sensor', 'how does a camera capture color', 'what is a bayer filter', 'how does a phone camera work',
    ],
    content: `A digital image sensor is a flat chip covered by a grid of millions of tiny light-collecting wells called photosites (one per pixel). When the shutter opens, light passing through the lens lands on the sensor; in each photosite, incoming photons knock electrons loose in the silicon (the photoelectric effect), building up an electric charge in proportion to how much light hit that spot. When the shutter closes, the camera reads the charge from every photosite, amplifies it (the ISO setting sets the amplification), and converts it to a number with an analog-to-digital converter — producing a grid of brightness values. Photosites only measure brightness, not colour, so each is covered by a tiny red, green or blue filter arranged in a repeating "Bayer" pattern (twice as many green, matching the eye), and software interpolates the full colour of each pixel from its neighbours ("demosaicing"). Almost all modern sensors are CMOS (each pixel has its own amplifier, fast and low-power); older ones were CCD.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-touchscreen-clean',
    title: 'How a Touchscreen Works',
    category: 'Technology',
    keywords: [
      'how does a touchscreen work', 'how does a capacitive touchscreen work', 'why do touchscreens need bare fingers',
      'resistive vs capacitive touchscreen', 'how does a phone screen sense touch', 'how does multi-touch work',
    ],
    content: `Almost all modern phone and tablet screens are "projected capacitive" touchscreens. Under the glass is a transparent grid of fine conductive lines (indium tin oxide) that holds a small electrostatic charge. Your finger is electrically conductive and slightly grounded, so touching the glass draws a tiny amount of charge away and changes the capacitance at the crossing points nearest your fingertip. A controller chip scans the whole grid many times a second, spots exactly where (and how many places) the capacitance dropped, and reports those coordinates to the operating system. Because it senses an electric field, it needs a conductive touch — a bare finger or a special stylus/glove works, an ordinary gloved finger or a pencil doesn't. Older "resistive" touchscreens work differently: two flexible conductive layers with a gap, and any press (finger, nail, stylus) squashes them together to complete a circuit at that point — cheaper, works with gloves, but less sensitive and no multi-touch.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-led',
    title: 'How an LED Works',
    category: 'Technology',
    keywords: [
      'how does an led work', 'what is an led', 'how does a light emitting diode work', 'why are leds efficient',
      'how do leds make different colors', 'what is a diode', 'why was blue led hard to make',
    ],
    content: `An LED (light-emitting diode) is a semiconductor chip that turns electricity directly into light. It's a diode: a junction between a "p-type" region (with spare positive holes) and an "n-type" region (with spare electrons), made not from plain silicon but from compound semiconductors like gallium nitride, gallium arsenide or indium gallium phosphide. When you apply voltage the right way, electrons are pushed across the junction and drop into holes; each time an electron recombines with a hole it releases its extra energy as a single particle of light (a photon). The energy gap of the material sets the photon's energy and therefore its colour — different compounds give red, green, blue, etc. Because nearly all the energy becomes light rather than heat, LEDs are far more efficient and longer-lasting than incandescent bulbs. White LEDs are usually a blue LED coated with a yellow phosphor that re-emits some of the blue as broader light. Making a bright, efficient blue LED took until the 1990s and won a Nobel Prize.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-wifi-clean',
    title: 'How Wi-Fi Works',
    category: 'Technology',
    keywords: [
      'how does wifi work', 'what is wifi', 'how does a wireless router work', 'what frequency is wifi', '2.4 ghz vs 5 ghz wifi',
      'why is my wifi slow', 'how does wifi connect to the internet',
    ],
    content: `Wi-Fi is a way of carrying network data over radio instead of a cable, within a home or building. A wireless router (access point) is wired to your internet connection; it converts data into radio signals in the 2.4 GHz or 5 GHz (or newer 6 GHz) bands and broadcasts them, and your phone or laptop has a small radio that receives them and transmits back. Both directions share the same channel and the devices take turns, listening first to avoid talking over each other. 2.4 GHz travels farther and through walls better but is slower and more crowded (it clashes with microwaves, Bluetooth, neighbours' networks); 5 GHz is much faster but shorter range. The router still needs a wired link (fibre, cable, DSL) to reach the wider internet — Wi-Fi only covers the last few metres. Slowdowns come from distance, walls, interference, many devices sharing the airtime, or the internet connection itself being the bottleneck.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-refrigerator-clean',
    title: 'How a Refrigerator Works',
    category: 'Technology',
    keywords: [
      'how does a refrigerator work', 'how does a fridge work', 'vapor compression refrigeration cycle', 'what does the compressor do in a fridge',
      'how does refrigerant work', 'why is the back of a fridge warm', 'how does air conditioning work',
    ],
    content: `A refrigerator doesn't "make cold" — it moves heat from inside to outside, using a fluid called a refrigerant that boils at a low temperature. The cycle has four parts. 1) In the evaporator coils inside the fridge, low-pressure liquid refrigerant boils into a gas, and boiling absorbs heat — pulling warmth out of the food compartment. 2) The compressor (the humming pump) squeezes that gas to high pressure, which also makes it hot. 3) In the condenser coils on the back or bottom, the hot high-pressure gas dumps its heat into the room air and condenses back to a liquid — that's why the back of a fridge is warm. 4) The liquid passes through a narrow expansion valve, where the sudden pressure drop cools it right down, and it re-enters the evaporator to start again. A thermostat switches the compressor on and off to hold the set temperature. Air conditioners and heat pumps use the exact same cycle.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-heat-pump',
    title: 'How a Heat Pump Works',
    category: 'Technology',
    keywords: [
      'how does a heat pump work', 'what is a heat pump', 'how does a heat pump heat a house', 'can a heat pump work in cold weather',
      'heat pump vs furnace', 'what is the COP of a heat pump', 'why are heat pumps efficient',
    ],
    content: `A heat pump is a refrigerator running in reverse for your house: it uses the vapour-compression cycle to move heat from one place to another, and a reversing valve lets it switch direction. In heating mode, the outdoor coil is the evaporator — cold refrigerant absorbs heat from the outside air (there's usable heat in air even below freezing), the compressor boosts it to a higher temperature, and the indoor coil releases that heat into your rooms. In cooling mode it just runs the other way, like an air conditioner. The reason heat pumps are efficient: they don't create heat by burning fuel or running a resistance element, they just relocate existing heat, so for every 1 unit of electricity they deliver roughly 2.5–4 units of heat (the "coefficient of performance"). Efficiency drops in very cold weather because there's less heat outside to gather, though modern cold-climate units still work well down to about −25 °C.`,
    createdAt: Date.now(),
  },
];
