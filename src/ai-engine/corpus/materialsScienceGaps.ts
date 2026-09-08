import { KnowledgeItem } from '../../types';

// Batch 89 (materials science & engineering). Weak category (~9/25). nexus-4b
// misses: "thermoplastic vs thermoset", "annealing", "stainless steel",
// "brittle vs ductile", "metal fatigue", "sintering" all came back as raw web
// dumps (metal fatigue -> an Allan Holdsworth album and a 2000 RTS game);
// "what is galvanization" -> "using electricity to make metal harder ... the
// Bessemer process was a form of galvanization"; "what is Teflon" -> "silicones
// with a silicon-oxygen backbone"; "what is titanium used for" -> "mostly used
// for making firework trails"; "what is a composite material" -> only bone
// tissue; "what is Kevlar" -> only a spider-silk comparison.
export const MATERIALS_SCIENCE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-thermoplastic-vs-thermoset',
    title: 'Thermoplastic versus Thermoset Plastic',
    category: 'Materials',
    keywords: [
      'what is the difference between thermoplastic and thermoset plastic', 'thermoplastic vs thermoset', 'can thermoset plastic be melted',
      'why can thermoplastics be recycled', 'cross-linking thermoset polymer', 'epoxy bakelite thermoset examples',
    ],
    content: `Both are plastics (polymers), but they respond to heat in opposite ways. THERMOPLASTICS soften when heated and harden again when cooled, and this is reversible — they can be melted and remoulded many times, which is why they are the recyclable plastics. Their long polymer chains are just tangled together, not chemically bonded to each other. Examples: polyethylene (bags, bottles), PET, PVC, polypropylene, nylon, polystyrene, acrylic, polycarbonate. THERMOSETS go through a one-time, irreversible chemical curing reaction ("cross-linking") when first formed, in which the chains bond into a single rigid 3D network. Once set they cannot be melted or reshaped — heating just degrades or burns them. Examples: epoxy, phenolic resin (Bakelite), polyester resin (fibreglass matrix), vulcanized rubber, melamine dishware, the resin in circuit boards. Thermosets are generally harder, more heat- and chemical-resistant, and dimensionally stable; thermoplastics are tougher, easier to process, and reusable.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-annealing-metallurgy',
    title: 'What Annealing Is (Metallurgy)',
    category: 'Materials',
    keywords: [
      'what is annealing', 'annealing heat treatment metal', 'why do you anneal a metal', 'work hardening and annealing',
      'recrystallization annealing', 'annealing vs quenching', 'annealing glass to relieve stress',
    ],
    content: `Annealing is a heat treatment that softens a metal, makes it more ductile, and relieves internal stresses. The metal is heated above a critical temperature, held there long enough for its crystal grains to reorganise and grow fresh, strain-free grains ("recrystallisation"), and then cooled slowly. Cold-working a metal — rolling, drawing, hammering, repeated bending — packs its crystal structure with defects (dislocations) and makes it progressively harder and more brittle ("work hardening"), until it would crack if worked further; annealing resets that so the metal can be shaped again, and it's used between stages of forming wire, sheet and tube. Annealing is essentially the opposite of quenching (rapid cooling to trap a hard structure) and tempering. In glassmaking, "annealing" means cooling a finished piece slowly and evenly through a temperature range so it does not lock in internal stresses that would make it crack or shatter unpredictably.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-kevlar',
    title: 'What Kevlar Is',
    category: 'Materials',
    keywords: [
      'what is kevlar', 'kevlar aramid fiber', 'why is kevlar bulletproof', 'stephanie kwolek kevlar dupont',
      'kevlar stronger than steel by weight', 'what is kevlar used for', 'kevlar hydrogen bonds polymer chains',
    ],
    content: `Kevlar is a synthetic "aramid" (aromatic polyamide) fibre invented at DuPont by chemist Stephanie Kwolek in 1965. Its long, stiff, rod-like polymer molecules line up almost perfectly parallel along the fibre and are locked together by dense arrays of hydrogen bonds, giving a fibre roughly five times stronger than steel for the same weight, while staying lightweight and heat-resistant (it doesn't melt, it chars). Woven into many layers, it catches and spreads the energy of a bullet or blade, which is why it's the core of body armour, ballistic helmets and stab vests. Other uses: radial tyres and brake pads, ropes and cables, sailcloth, cut-resistant gloves, canoe and kayak hulls, protective clothing for firefighters and racing drivers, and reinforcement in aerospace and sporting-goods composites. Weaknesses: it's very strong in tension but weak in compression, can be cut, and degrades with prolonged UV exposure.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-composite-material',
    title: 'What a Composite Material Is',
    category: 'Materials',
    keywords: [
      'what is a composite material', 'composite reinforcement matrix', 'fiberglass carbon fiber reinforced polymer',
      'reinforced concrete composite', 'why are composites strong for their weight', 'examples of composite materials',
    ],
    content: `A composite material is made by combining two or more distinct materials with very different properties so that the result performs better than either one alone. Most engineered composites have a strong, stiff "reinforcement" — usually fibres or particles — held in a softer "matrix" that binds everything together, protects the fibres, and transfers load between them. The reinforcement carries the stress; the matrix keeps it aligned and stops cracks from spreading. Examples: fibreglass (glass fibres in polyester or epoxy resin), carbon-fibre-reinforced polymer (CFRP), reinforced concrete (steel rebar in concrete — the steel takes the tension the concrete can't), plywood and oriented strand board, mud brick with straw, and cermets and metal-matrix composites. Natural composites include wood (cellulose fibres in a lignin matrix) and bone (collagen fibres mineralised with hydroxyapatite). Composites are engineered for high strength-to-weight and stiffness-to-weight, corrosion resistance, and tailored directional properties, at the cost of being expensive and hard to repair or recycle.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-galvanization',
    title: 'What Galvanization Is',
    category: 'Materials',
    keywords: [
      'what is galvanization', 'hot dip galvanizing zinc coating', 'how does galvanization prevent rust', 'sacrificial anode zinc steel',
      'why is galvanized steel not rusty', 'galvanized nails fencing roofing', 'is galvanizing an electrical process',
    ],
    content: `Galvanization is coating steel or iron with a layer of zinc to protect it from rust — it has nothing to do with making the metal "harder" or with the Bessemer process. The usual method is hot-dip galvanizing: the cleaned steel is dipped into a bath of molten zinc at about 450 °C, and a metallurgically bonded zinc coating forms on the surface. Zinc protects in two ways. First, it is a physical barrier keeping air and water off the steel. Second, and more importantly, it provides "sacrificial" (cathodic) protection: zinc is more reactive than iron, so even if the coating is scratched or chipped and bare steel is exposed, the surrounding zinc corrodes preferentially and the steel underneath stays intact until the zinc is used up. Galvanized steel is used for nails and screws, chain-link fencing, guardrails, roofing and ductwork, structural beams, electrical enclosures and car body panels. (Electro-galvanizing, which electroplates a thinner zinc layer, is the electrical version; the common hot-dip process is not.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tempered-glass',
    title: 'What Tempered Glass Is',
    category: 'Materials',
    keywords: [
      'what is tempered glass', 'toughened safety glass', 'why does tempered glass shatter into small pieces', 'surface compression tempered glass',
      'how is tempered glass made rapid cooling', 'tempered glass car windows phone screen', 'nickel sulfide spontaneous breakage',
    ],
    content: `Tempered (toughened) glass is ordinary glass made much stronger and safer by a heat treatment. The glass is heated to about 620 °C and then its surfaces are quenched with jets of cold air. The outsides cool and set first; as the still-hot interior then cools and contracts, it pulls the surfaces into permanent compression while the core is left in tension. Because glass breaks by cracks opening at the surface, a surface that is already squeezed shut is far harder to crack — tempered glass is roughly 4 to 5 times stronger than the same annealed glass and resists thermal shock. When it does finally break, the stored energy makes the whole pane disintegrate at once into a mass of small, cube-like, blunt-edged granules ("dicing") instead of long sharp shards — which is why it's a "safety glass" for car side and rear windows, shower doors, oven doors, glass tables and doors, and phone screens. It cannot be cut, drilled or ground after tempering (that would make it explode), and it can occasionally break years later on its own from tiny nickel-sulfide inclusions.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-stainless-steel',
    title: 'What Stainless Steel Is',
    category: 'Materials',
    keywords: [
      'what is stainless steel', 'stainless steel chromium passive layer', 'why does stainless steel not rust', 'type 304 316 stainless',
      'is stainless steel completely rustproof', 'inox corrosion resistant steel', 'nickel in stainless steel',
    ],
    content: `Stainless steel is a family of iron alloys that contain at least about 10.5% chromium. The chromium reacts with oxygen in the air to form an extremely thin, invisible, tightly bonded layer of chromium oxide on the surface — a "passive layer" — that seals the metal off and immediately re-forms if scratched, which is what stops rust and corrosion. Other elements tune the properties: nickel adds ductility and corrosion resistance and makes it non-magnetic (the common "18/8" or type 304), molybdenum boosts resistance to salt and chlorides (type 316, used in marine and medical settings), and more carbon lets it be hardened for knife blades. Uses: cutlery, sinks and kitchen appliances, surgical instruments and body implants, food, dairy and chemical processing equipment, architectural cladding, and fasteners. It is corrosion-RESISTANT, not corrosion-proof: it can still pit or stain in strong bleach or salt water, or where the passive layer is starved of oxygen (crevices, under deposits).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brittle-vs-ductile',
    title: 'The Difference Between Brittle and Ductile',
    category: 'Materials',
    keywords: [
      'what is the difference between brittle and ductile', 'ductile material plastic deformation before fracture', 'brittle material shatters no warning',
      'ductile to brittle transition temperature', 'necking ductile metal', 'why does glass shatter but copper bends',
    ],
    content: `These describe how a material fails under stress. A DUCTILE material can be deformed permanently by a large amount — stretched, bent, drawn into wire — before it finally breaks, and it gives visible warning first (a metal bar "necks down" and thins at one spot). It absorbs a lot of energy on the way to failure. Most metals at room temperature are ductile: copper, gold, aluminium, lead, mild steel. A BRITTLE material fractures suddenly with little or no permanent deformation, usually shattering, at a stress only slightly above its elastic limit and with no warning. Glass, ceramics, cast iron, concrete, and most rock are brittle. The same material can move from ductile to brittle behaviour when it gets colder, is loaded faster (impact), or contains a notch or crack — the "ductile-to-brittle transition." Cold-induced brittleness in the steel plates contributed to Liberty ships cracking in half in the North Atlantic in WWII and is discussed in relation to the Titanic's hull.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-teflon',
    title: 'What Teflon Is',
    category: 'Materials',
    keywords: [
      'what is teflon', 'ptfe polytetrafluoroethylene', 'why is teflon non-stick and slippery', 'roy plunkett teflon 1938 accident',
      'is teflon a silicone', 'teflon carbon fluorine bonds', 'pfoa teflon safety overheated pan',
    ],
    content: `Teflon is DuPont's brand name for PTFE — polytetrafluoroethylene — a synthetic polymer whose backbone is a chain of carbon atoms completely wrapped in fluorine atoms. It is NOT a silicone (silicones have a silicon-oxygen backbone). The carbon–fluorine bonds are among the strongest in organic chemistry and the fluorine "sheath" is chemically inert, so PTFE is almost unreactive, stable to about 260 °C, an excellent electrical insulator, and one of the most slippery solids known — it has a very low coefficient of friction and almost nothing sticks to it. It was discovered by accident by DuPont chemist Roy Plunkett in 1938. Uses: non-stick coatings on cookware, plumber's thread-seal tape, low-friction bearings, seals and slide surfaces, wire and cable insulation, chemical-plant linings, and the breathable membrane in Gore-Tex (expanded PTFE). Safety notes: PFOA, a chemical once used to process it, has been phased out; and the coating can release irritating fumes only if an empty pan is heated far above normal cooking temperatures (~350 °C+).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-metal-fatigue',
    title: 'What Metal Fatigue Is',
    category: 'Materials',
    keywords: [
      'what is fatigue in metals', 'metal fatigue repeated stress cycles', 'fatigue crack initiation propagation beach marks',
      'why do metal parts fail below their strength', 'de havilland comet fatigue crashes', 'stress concentration fatigue',
    ],
    content: `Metal fatigue is the progressive weakening and eventual sudden fracture of a metal component that is subjected to many cycles of stress, each individually well below the load that would break it in a single pull. Every cycle of loading and unloading causes a tiny amount of slip and damage in the metal's crystal structure. A microscopic crack starts, almost always at a surface flaw, sharp corner, bolt hole, weld or scratch (a "stress concentrator"), and grows a small step with each cycle — often leaving ring-shaped "beach marks" on the fracture surface — until the remaining intact cross-section can no longer bear the load and the part snaps abruptly, with no bending or warning. It is a leading cause of failure in anything that vibrates or flexes: aircraft, bridges, axles, crankshafts, springs, rotors and pipelines. Famous cases: the de Havilland Comet airliner break-ups of the 1950s (fatigue cracks spreading from square window corners) and the 1988 Aloha Airlines fuselage tear-off. Defences: rounded fillets instead of sharp corners, polished surfaces, shot peening, keeping working stresses low, and regular crack inspection.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-concrete-curing',
    title: 'What Concrete Is and How It Cures',
    category: 'Materials',
    keywords: [
      'what is concrete and how does it cure', 'concrete hydration reaction not drying', 'why can concrete set underwater',
      'concrete 28 day strength', 'why keep concrete moist while curing', 'cement aggregate water concrete mix',
    ],
    content: `Concrete is a mixture of cement, water, and aggregate (sand plus gravel or crushed stone). It does not harden by drying out — it hardens by a chemical reaction called HYDRATION: water reacts with the compounds in the cement to grow a dense mesh of interlocking crystals that glues the aggregate particles into a solid rock-like mass. Because it is a chemical reaction with water, not evaporation, concrete can set and cure completely underwater. "Curing" is the deliberate practice of keeping fresh concrete damp and at a moderate temperature for the first days to weeks so hydration can keep going — if the surface dries too soon, the reaction stalls there and the concrete ends up weaker, dusty and prone to shrinkage cracks; builders cover it, spray it, or pond water on top. Concrete gains strength fastest early on (roughly 70% by 7 days, and it is tested for its rated strength at 28 days), but hydration continues very slowly for years, so old concrete keeps getting slightly stronger. It is strong in compression but weak in tension, which is why it is usually cast around steel reinforcing bars.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-titanium-uses',
    title: 'What Titanium Is Used For',
    category: 'Materials',
    keywords: [
      'what is titanium used for', 'titanium strength to weight ratio', 'titanium corrosion resistance', 'titanium medical implants biocompatible',
      'titanium aerospace jet engines', 'is titanium expensive why', 'titanium dioxide pigment',
    ],
    content: `Titanium is valued for a rare combination of properties: an outstanding strength-to-weight ratio (about as strong as many steels but roughly 45% lighter), excellent corrosion resistance (it grows a tough protective oxide film and shrugs off seawater, chlorine and most acids), a high melting point, and being non-toxic and non-reactive with living tissue ("biocompatible"). Its main uses: aerospace — jet-engine compressor blades and discs, airframe structure, landing gear, fasteners (the largest market); medical and dental implants — hip and knee replacements, bone plates and screws, dental posts, pacemaker and cochlear-implant cases; chemical-plant and desalination equipment; marine hardware, submarine components and offshore rigs; premium eyeglass frames, watch cases, and high-end bicycle frames and golf clubs; and armour plating. (Fireworks use only a tiny amount of titanium powder for white sparks — a niche use, not its main one. The white pigment titanium dioxide consumes most titanium ore, but that is a compound, not the metal.) Titanium is costly because it is chemically difficult to extract from its ore and hard to machine and weld.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-corrosion',
    title: 'What Corrosion Is',
    category: 'Materials',
    keywords: [
      'what is corrosion', 'corrosion oxidation metal environment', 'why does iron rust flake off but aluminium oxide protects',
      'galvanic corrosion dissimilar metals', 'how to prevent corrosion coatings sacrificial anode', 'copper patina protective',
    ],
    content: `Corrosion is the gradual destruction of a metal by chemical or electrochemical reaction with its surroundings — most often oxidation by oxygen and water. The behaviour differs by metal. Iron and steel form flaky red iron oxide (rust) that does not adhere or protect, so the reaction keeps eating inward until the metal is consumed. Other metals corrode into a thin, tight, adherent oxide layer that seals the surface and stops further attack: aluminium, zinc, and chromium (the reason stainless steel resists rust), and copper, whose green "patina" protects roofs and statues for centuries. Corrosion is sped up by salt, acids, humidity and pollution, and by "galvanic" action when two different metals are electrically connected in a wet environment — the more reactive one corrodes faster. Protection methods: paint and other coatings, galvanizing (a zinc layer), corrosion-resistant alloys, keeping the metal dry, cathodic protection, and "sacrificial anodes" — a block of zinc or magnesium bolted on to corrode in place of the steel it protects (used on ship hulls and buried pipelines).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cast-vs-wrought-iron',
    title: 'The Difference Between Cast Iron and Wrought Iron',
    category: 'Materials',
    keywords: [
      'what is the difference between cast iron and wrought iron', 'cast iron high carbon brittle poured into molds', 'wrought iron low carbon ductile forged',
      'cast iron cookware engine blocks', 'wrought iron gates railings', 'why was wrought iron replaced by mild steel',
    ],
    content: `Cast iron and wrought iron are both iron, but with very different carbon content and structure. CAST IRON has a high carbon content (about 2–4%). This lowers its melting point and makes it flow easily, so it is melted and POURED into moulds to make complex shapes — engine blocks, frying pans and Dutch ovens, pipes, radiators, machine bases, manhole covers, decorative posts. It is hard, wear-resistant, good in compression, and excellent at damping vibration, but it is BRITTLE: it cracks rather than bends under a sharp impact or in tension. WROUGHT IRON has very low carbon (under about 0.1%) and contains fibrous streaks of slag from its old refining process. It is soft, tough, ductile and easily hammered, bent, twisted and forge-welded when hot — historically used for gates, railings, fences, chains, hooks, horseshoes, nails and ornamental ironwork. True wrought iron is barely produced any more, having been replaced by mild (low-carbon) steel, which is cheaper and has similar working properties — so "wrought iron" today usually just means decorative work made from mild steel.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-sintering',
    title: 'What Sintering Is',
    category: 'Materials',
    keywords: [
      'what is sintering', 'compact powder into solid with heat below melting point', 'powder metallurgy sintering',
      'how are ceramics and bricks fired sintered', 'selective laser sintering 3d printing', 'diffusion bonding particles pores shrink',
    ],
    content: `Sintering is a process that turns a powder into a solid object using heat (and often pressure) WITHOUT melting the material fully. The powder is first pressed into the desired shape (a "green" part), then heated to below its melting point; at that temperature the atoms have enough energy to diffuse across the contact points between particles, so the particles bond and merge, necks grow between them, and the pores in between shrink, making the part denser and stronger. It is the standard way to form things from materials that are hard or impractical to melt and cast: nearly all ceramics (bricks, tiles, porcelain, spark-plug insulators, technical ceramics), "powder metallurgy" parts (small gears, bearings, filters, permanent magnets, and tungsten-carbide cutting tips), and it is the fusing mechanism in some 3D printing methods such as selective laser sintering. Snow packing into firm ice underfoot, and the natural hardening of some sedimentary rock, are examples of sintering in nature.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-steel-vs-iron',
    title: 'What Steel Is and How It Differs from Iron',
    category: 'Materials',
    keywords: [
      'what is steel and how is it different from iron', 'steel is an alloy of iron and carbon', 'why is steel stronger than pure iron',
      'carbon content steel vs cast iron', 'how is steel made from iron', 'alloy steel chromium nickel manganese',
    ],
    content: `Steel is an alloy of iron with a small, carefully controlled amount of carbon — roughly 0.05% to 2% by weight — often with other elements added. Pure iron is relatively soft and weak; adding carbon makes it far stronger and harder, because the carbon atoms wedge into the iron crystal lattice and make it much harder for the layers of atoms to slip past one another. Getting there means starting from pig iron (iron straight from a blast furnace, which is brittle and ~4% carbon) and burning off most of the carbon and impurities — historically with the Bessemer process, today mostly with the basic-oxygen or electric-arc process. Steel's properties are then tuned three ways: carbon content (low-carbon "mild" steel is soft and weldable; high-carbon steel is hard and can hold an edge), alloying elements (chromium for stainless and hardness, nickel for toughness, manganese, vanadium, molybdenum), and heat treatment (quenching to harden, tempering and annealing to adjust hardness and toughness). Cast iron is not steel — it has more carbon (2–4%), making it hard but brittle. Steel is by far the most-used metal in the world.`,
    createdAt: Date.now(),
  },
];
