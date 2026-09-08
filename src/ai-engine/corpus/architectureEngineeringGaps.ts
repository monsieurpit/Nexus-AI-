import { KnowledgeItem } from '../../types';

// Batch 104 (architecture & civil/structural engineering). Weak area on
// nexus-4b: "what is a truss" was answered about Liz Truss and the Daily Star
// lettuce livestream; "how does a suspension bridge work", "beam vs column",
// "load vs span", "expansion joint", "LEED", "footing vs foundation" were raw
// web dumps; "curtain wall" and "rebar" wrongly said they "hold everything up";
// "tension vs compression" only talked about cast iron; "keystone" dragged in
// keystone species; "Modernist vs Postmodernist" never described Postmodernism.
export const ARCHITECTURE_ENGINEERING_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-truss',
    title: 'What a Truss Is and Why It Is Strong',
    category: 'Engineering',
    keywords: [
      'what is a truss and why is it strong', 'truss framework of straight members connected at joints forming triangles', 'truss members carry only axial force pure tension or compression no bending',
      'triangles are rigid a rectangle racks', 'trusses used for roofs bridges cranes towers', 'truss efficient use of material long spans',
    ],
    content: `A truss is a rigid framework built from straight members joined at their ends to form a connected series of triangles. When loads are applied only at the joints (as trusses are designed for), every member carries force purely along its own length — straight tension or straight compression — with essentially no bending. That matters because carrying load in pure axial force uses material far more efficiently than bending does, so a truss can span long distances with relatively little steel or timber. The triangle is the key: a triangle cannot change shape unless one of its sides changes length, so a triangulated frame is stiff, whereas a four-sided frame can "rack" (collapse into a parallelogram) unless its joints are rigid. Trusses are used for roof structures, bridges, cranes, transmission towers, and stadium roofs. (This is a structural term and has nothing to do with the British politician Liz Truss.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-suspension-bridge',
    title: 'How a Suspension Bridge Works',
    category: 'Engineering',
    keywords: [
      'how does a suspension bridge work', 'deck hangs from vertical suspender cables that hang from main cables draped over towers', 'main cables carry the load in tension to the towers and anchorages',
      'towers carry the load in compression to the ground anchorages resist the cable pull', 'suspension bridge allows very long spans akashi kaikyo canakkale', 'stiffening truss or girder resists flutter',
    ],
    content: `In a suspension bridge, the roadway (deck) does not span the gap by its own stiffness — it hangs. Vertical "suspender" cables support the deck at close intervals, and their tops connect to two huge main cables that sweep in a curve over the tops of two tall towers and run down to massive concrete "anchorages" buried at each end. The load path: deck weight and traffic pull down on the suspenders → the suspenders pull down on the main cables → the main cables carry that load in pure tension, transferring it partly downward into the towers (which are in compression, carrying it to their foundations) and partly as a huge horizontal-and-vertical pull into the anchorages, which are heavy enough not to be dragged in. Because steel cable is extremely efficient in tension, this lets suspension bridges achieve the longest spans of any bridge type — the Akashi Kaikyō and 1915 Çanakkale bridges span roughly two kilometres. A stiffening truss or box girder runs along the deck to spread out concentrated loads and, critically, to resist wind-induced twisting (the failure that destroyed the original Tacoma Narrows bridge in 1940).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-beam-vs-column',
    title: 'Beam vs Column',
    category: 'Engineering',
    keywords: [
      'what is the difference between a beam and a column', 'beam horizontal member carries loads transverse to its length resists bending', 'beam top in compression bottom in tension',
      'column vertical member carries axial compression along its length', 'column main failure mode is buckling not crushing slenderness matters', 'beams transfer load to columns columns to foundations',
    ],
    content: `A BEAM is a member — usually horizontal — that carries loads applied across (perpendicular to) its length, and it works by resisting bending. When a simply supported beam is loaded downward it sags slightly: the top surface is squeezed (compression) and the bottom surface is stretched (tension), with a neutral plane in between. Its depth is what gives it strength, which is why floor joists and I-beams are tall and thin. A COLUMN is a member — usually vertical — that carries load along its own length, in compression. A short, stocky column fails by crushing, but most real columns fail by buckling: at a critical load they suddenly bow sideways and lose capacity, so a column's strength depends heavily on its slenderness (length relative to cross-section) and how its ends are restrained. In a typical building the load path runs slab → beams → columns → foundations.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tension-vs-compression',
    title: 'Tension vs Compression in a Structure',
    category: 'Engineering',
    keywords: [
      'what is the difference between tension and compression in a structure', 'tension a pulling force that stretches and elongates a member', 'compression a pushing force that squashes and shortens a member',
      'concrete stone cast iron strong in compression weak in tension steel wood cables strong in tension', 'a hanging cable is in tension a pillar is in compression a beam sees both',
      'buckling is a compression failure mode', 'brittle materials fail suddenly in tension',
    ],
    content: `Tension and compression are the two basic ways a straight structural member can be loaded along its axis. TENSION is a pulling force: it tries to stretch the member and make it longer — think of a rope holding a weight, a suspension-bridge cable, or the bottom of a loaded beam. COMPRESSION is a pushing force: it tries to squash the member and make it shorter — think of a column under a roof, the stones of an arch, or the top of a loaded beam. Materials behave very differently in each: concrete, stone, brick and cast iron are strong in compression but weak and brittle in tension (which is why concrete is reinforced with steel and why masonry buildings use arches, not flat lintels, for wide openings); steel, timber and cables are strong in tension. Compression members also have to worry about buckling — bowing sideways before the material itself is overstressed — which tension members never do. Engineers identify which force each member will carry and choose its material and shape accordingly.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-load-vs-span',
    title: 'Load vs Span (Structural Engineering)',
    category: 'Engineering',
    keywords: [
      'what is the difference between load and span in engineering', 'span the distance a structural element bridges between its supports', 'load the force an element must carry dead load live load wind seismic',
      'bending moment grows with load and with the square of span', 'doubling the span roughly quadruples the demand', 'long span structures need trusses arches or cables not plain beams',
    ],
    content: `The SPAN is a distance: how far a beam, slab, arch or bridge reaches between the supports that hold it up (often quoted as the clear span between faces, or the effective span between support centrelines). The LOAD is a force: everything the element has to carry. Loads are grouped into dead load (the permanent self-weight of the structure and finishes), live load (movable and temporary — people, furniture, vehicles, stored goods), and environmental loads (wind, snow, earthquake, water). The two interact sharply: for a simply supported beam the maximum bending moment is proportional to the load and to the square of the span. So doubling the span of a beam under the same load per metre roughly quadruples the bending it must resist, and its deflection grows even faster. That is why you cannot just make a beam longer — beyond a modest span you switch to a deeper beam, then a truss, an arch, or a cable system, each of which carries load over distance more efficiently than a solid beam in bending.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-curtain-wall',
    title: 'What a Curtain Wall Is',
    category: 'Architecture',
    keywords: [
      'what is a curtain wall in a skyscraper', 'curtain wall lightweight external cladding skin hung off the structural frame', 'curtain wall carries only its own weight and wind seismic loads acting on it not floor or roof load',
      'aluminium framing with glass metal or stone panels', 'curtain wall keeps out weather controls solar gain lets the structure be slimmer', 'non-structural facade',
    ],
    content: `A curtain wall is the thin outer skin of a modern building — typically an aluminium grid holding glass, metal, or stone panels — that is hung off the edges of the floor slabs rather than sitting on the ground. The critical point: it is NOT structural. A curtain wall carries only its own weight plus the wind and seismic forces that press directly on it, and it passes those to the building's structural frame at each floor level. It carries none of the building's floor or roof loads — those go through the columns and core. Its jobs are environmental: keep out rain and air, insulate, control solar heat gain and glare, and let daylight in. Because the facade is decoupled from the structure, the frame can be lighter and the exterior can be almost entirely glass, which is what makes the modern glass-tower look possible.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-rebar',
    title: 'What Rebar Is',
    category: 'Engineering',
    keywords: [
      'what is rebar', 'rebar reinforcing bar deformed ribbed steel bars embedded in concrete before it is poured', 'ribs grip the concrete so the two act together',
      'steel carries tensile and shear forces the concrete cannot concrete protects the steel from corrosion and fire', 'concrete cover over the rebar', 'rebar sized by diameter number 4 is half inch',
    ],
    content: `Rebar (short for "reinforcing bar") is steel bar embedded inside concrete to give it tensile strength. Plain concrete is strong when squeezed but cracks easily when pulled or bent, so wherever a concrete element will experience tension — the bottom of a beam, the face of a wall resisting soil, a suspended slab — steel bars are laid into the formwork before the concrete is poured. The bars have raised ribs rolled into their surface so the hardened concrete grips them and the two materials act as one composite: the steel takes the tension and shear, the concrete takes the compression and also shields the steel from rust and from the heat of a fire (as long as there is enough "cover" — a specified thickness of concrete between the bar and the surface). Rebar is specified by diameter — for example a US #4 bar is 1/2 inch, roughly a metric 12 mm bar.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-footing-vs-foundation',
    title: 'Footing vs Foundation',
    category: 'Engineering',
    keywords: [
      'what is the difference between a footing and a foundation', 'foundation the entire system that transfers a structure loads into the ground', 'footing an enlarged pad or strip at the base of a wall or column that spreads the load over the soil',
      'footing is a component foundation is the whole', 'shallow foundations spread footings raft mat slab deep foundations piles', 'bearing capacity of the soil',
    ],
    content: `"Foundation" is the general term for the whole part of a structure that transfers all of its loads safely into the ground. "Footing" is one specific type of foundation element: an enlarged base — a square pad under a single column, or a continuous strip under a wall — whose job is to spread a concentrated load out over a large enough area of soil that the pressure stays below what the soil can bear without settling or failing. So every footing is a foundation, but not every foundation is a footing: other foundation types include a raft (or mat) — one big thick slab under the entire building — and deep foundations such as piles or drilled shafts that carry load down to strong soil or rock far below the surface. In short, footing = a component; foundation = the complete load-transfer system, which may be made of footings, a raft, or piles.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-keystone-arch',
    title: 'What a Keystone Is (Arch)',
    category: 'Architecture',
    keywords: [
      'what is a keystone in an arch', 'keystone wedge-shaped stone at the top center crown of an arch', 'keystone is the last piece placed it locks all the other voussoirs',
      'until the keystone is set the arch cannot stand', 'load transferred sideways and down through the voussoirs to the abutments arch in compression', 'keystone species in ecology is a separate unrelated use of the word',
    ],
    content: `A keystone is the wedge-shaped stone at the very top centre (the "crown") of a masonry arch. An arch is built from a series of wedge blocks called voussoirs resting on temporary wooden centring; the keystone is the final one dropped into the middle gap. Once it is in place it wedges against its neighbours and locks the whole ring together — before that moment the arch is just loose stones and would fall. In the finished arch, the weight from above pushes each voussoir against the next, so the load travels around the curve as pure compression down to the solid supports ("abutments" or "piers") at each end, which must also resist the outward thrust the arch pushes sideways. The keystone is often made larger or carved as decoration to mark it. (Note: "keystone species" in ecology — a species whose removal collapses an ecosystem — borrows the same metaphor but is a completely separate topic.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-modernist-vs-postmodernist-architecture',
    title: 'Modernist vs Postmodernist Architecture',
    category: 'Architecture',
    keywords: [
      'what is the difference between modernist and postmodernist architecture', 'modernism form follows function rejection of ornament clean geometric volumes glass steel concrete flat roofs less is more',
      'international style mies van der rohe le corbusier bauhaus', 'postmodernism reintroduces ornament colour historical references wit irony symbolism less is a bore venturi',
      'postmodern examples portland building at&t sony building chippendale top piazza d italia',
    ],
    content: `MODERNIST architecture (roughly the 1920s to the 1970s) was a deliberate break with historical styles. Its slogans were "form follows function" and "less is more" (Mies van der Rohe): ornament was rejected as dishonest, buildings were reduced to clean geometric volumes in glass, steel and exposed concrete, with flat roofs, open plans, ribbon windows, and structure often left visible. The "International Style" spread this look worldwide, from the Bauhaus and Le Corbusier's villas to the postwar glass office tower. POSTMODERN architecture emerged in the 1970s explicitly reacting against Modernism's perceived coldness and uniformity — Robert Venturi's retort was "less is a bore." It brought back ornament, bright colour, symbolism, humour and irony, and free quotation of historical elements (columns, pediments, arches) used playfully rather than reverently, often at exaggerated scale and in clashing combinations. Signature examples: Michael Graves's Portland Building, Philip Johnson's AT&T (now Sony) Building with its broken-pediment "Chippendale" top, and Charles Moore's Piazza d'Italia.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-expansion-joint-bridge',
    title: 'What an Expansion Joint in a Bridge Does',
    category: 'Engineering',
    keywords: [
      'what is the purpose of an expansion joint in a bridge', 'expansion joint gap between deck segments that lets the deck lengthen in heat and shrink in cold', 'thermal expansion and contraction traffic and seismic movement without cracking',
      'finger joint modular joint sliding plate joint', 'paired with bridge bearings that allow the same movement at the supports', 'without expansion joints the deck would buckle or crush against the abutment',
    ],
    content: `A bridge deck is a long piece of steel or concrete out in the weather, so it physically grows when it heats up in summer sun and shrinks when it gets cold — a highway bridge can change length by tens of millimetres to a few centimetres over the year — and it also flexes under traffic and can move suddenly in an earthquake. An expansion joint is the engineered gap, usually where the deck meets an abutment or where two deck sections meet, that lets this movement happen without damage. The gap is bridged by a device that stays trafficable while it opens and closes: a simple sliding plate for small movements, interlocking steel "finger" joints, or multi-element "modular" joints with several sealed gaps for large movements. Expansion joints work together with the bridge bearings at the supports, which allow the same lengthwise sliding (and often rotation) where the deck sits on the piers. Without them the deck would either buckle upward in the heat or crack itself apart in the cold.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-leed-certification',
    title: 'What LEED Certification Is',
    category: 'Architecture',
    keywords: [
      'what is leed certification in building', 'leed leadership in energy and environmental design us green building council usgbc', 'points awarded across categories energy water materials indoor air quality site transport innovation',
      'certified silver gold platinum levels', 'most widely used green building rating system worldwide', 'criticised for being checklist driven not always reflecting operational performance',
    ],
    content: `LEED — Leadership in Energy and Environmental Design — is a green-building rating system created and run by the non-profit U.S. Green Building Council, and it is the most widely used such system in the world. A project earns points by meeting credits across several categories: energy efficiency, water efficiency, sustainable site development, materials and resources (recycled content, low-emitting materials, waste diversion), indoor environmental quality (ventilation, daylight, low-VOC finishes), location and transportation, and innovation. The point total determines the level awarded — Certified, Silver, Gold, or Platinum. LEED certification is used to signal sustainability to tenants and investors and is sometimes required for public buildings. It is also criticised: because it is checklist-driven and assessed largely at the design/construction stage, a highly rated building does not always perform well once it is actually occupied and operating.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-building-sway-wind',
    title: 'Why Tall Buildings Sway in the Wind and How It Is Controlled',
    category: 'Engineering',
    keywords: [
      'what causes a building to sway in the wind and how is it controlled', 'wind pressure and vortex shedding push a tall building back and forth', 'sway is mainly an occupant comfort and serviceability issue not a collapse risk',
      'tuned mass damper large weight near the top moves out of phase taipei 101 660 ton ball', 'aerodynamic shaping tapering rounded corners setbacks reduce vortex shedding', 'stiffening with outriggers and a strong core',
    ],
    content: `Wind makes a tall building sway for two reasons: the direct push of wind pressure on the windward face, and "vortex shedding" — as air peels off alternating sides of the building it creates a rhythmic sideways force that can push the tower back and forth, sometimes at a frequency close to the building's own natural sway. For a well-designed skyscraper this is rarely a collapse risk; it is a serviceability and comfort problem, because occupants near the top feel the motion and can get motion sickness. Engineers control it three ways: (1) make the building stiffer, with a strong central core, perimeter framing, and "outrigger" trusses tying the core to the outer columns; (2) shape the building to confuse the wind — tapering, rounded or chamfered corners, setbacks, and openings that break up the vortex pattern; and (3) add a damper, most famously a tuned mass damper, a huge weight (Taipei 101's is a 660-tonne steel ball) hung near the top and tuned to swing out of phase with the building, absorbing sway energy like a shock absorber.`,
    createdAt: Date.now(),
  },
];
