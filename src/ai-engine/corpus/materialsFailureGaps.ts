import { KnowledgeItem } from '../../types';

// Batch 132 (materials science — fracture & failure) — a gap. On nexus-4b:
// "fretting" collided with guitar frets ("a fret is any of the thin strips of
// material inserted along the neck of a stringed instrument"); "spalling"
// collided with the actor Timothy Spall; "fatigue limit / endurance limit"
// was answered about audio loudness-war listener fatigue; "quenching and
// tempering" was answered about tempered glass; "stress corrosion cracking"
// was answered as metal fatigue (beach marks); "fracture toughness" was
// answered about broken bones. Raw web dumps for Young's modulus, the Charpy
// test, and Griffith crack theory. "Delamination" got a refusal.
export const MATERIALS_FAILURE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-matfail-fretting',
    title: 'Fretting Wear and Fretting Corrosion',
    category: 'Materials Science',
    keywords: [
      'what is fretting in engineering fretting wear fretting corrosion', 'surface damage that happens where two clamped or press-fit parts touch and undergo tiny repeated back and forth sliding motions of a few micrometres from vibration or cyclic load this has nothing to do with guitar frets',
      'the micro sliding tears off tiny asperities the debris oxidises and is trapped between the surfaces forming a hard abrasive powder often reddish on steel cocoa or blood coloured that grinds pits into the metal',
      'the pits act as stress concentrations and start fatigue cracks so fretting fatigue can drop a components fatigue life dramatically common at bolted joints splined shafts press fitted bearings wire ropes riveted lap joints fixed by reducing slip better clamping lubrication coatings or shot peening',
    ],
    content: `Fretting is surface damage that occurs where two solid parts are pressed together and then subjected to very small, repeated relative sliding — typically only a few to a few tens of micrometres of movement, driven by vibration or a cyclic load. It has nothing to do with the metal frets on a guitar neck. The mechanism: the tiny oscillating motion shears off the microscopic high spots (asperities) where the surfaces actually touch; the freed particles immediately oxidise in the trapped, poorly ventilated contact and cannot escape, so they build up as a hard, abrasive oxide powder (rust-red "cocoa" on steel, black on aluminium or titanium) that then grinds pits and grooves into both faces. This is "fretting wear," and when oxidation dominates it is called "fretting corrosion." The real danger is "fretting fatigue": the pits and the local stress from the micro-slip act as crack initiation sites, so a joint that never actually moves under design load can still nucleate fatigue cracks and fail at a small fraction of the material's plain fatigue strength. It is common at bolted and riveted joints, press-fit bearing races, splined and keyed shafts, dovetail turbine-blade roots, and the strands of wire rope. It is fought by eliminating the micro-slip (higher clamping force, interference fits, better joint design), by lubricants and solid coatings, and by inducing compressive residual stress with shot peening.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-matfail-spalling',
    title: 'Spalling (Material Flaking Off a Surface)',
    category: 'Materials Science',
    keywords: [
      'what is spalling', 'the process where flakes chips or fragments break away from the surface of a solid body it is an engineering and materials term not a person',
      'in rolling bearings and gears contact fatigue spalling subsurface cracks from repeated hertzian contact stress link up and lift out a pit in concrete spalling is when the surface cracks and flakes off from corroding rebar that expands freeze thaw fire or salt',
      'in armour and geology spalling is fragments flung off the back face of a plate hit by a projectile even without full penetration also thermal spalling from rapid heating rock bursts and cavitation spalling',
    ],
    content: `Spalling is the breaking away of flakes, chips, or fragments from the surface of a solid material. It is a general failure mode in materials and structural engineering. Common forms: (1) CONTACT-FATIGUE SPALLING in rolling-element bearings and gear teeth — repeated Hertzian contact stress drives fatigue cracks a fraction of a millimetre below the surface; they propagate parallel to the surface and then turn up, popping out a shallow pit and rapidly destroying the running surface. This is the normal end-of-life mode for a well-lubricated bearing. (2) CONCRETE SPALLING — the surface layer cracks and falls away in sheets, usually because the embedded reinforcing steel is corroding (rust occupies several times the volume of the steel and wedges the cover off), or from freeze-thaw cycling of absorbed water, de-icing salt, fire (trapped moisture flashes to steam), or alkali-silica reaction. (3) BALLISTIC SPALL — when a projectile or blast wave strikes an armour plate, a compressive shock travels through and reflects off the far face as a tension wave, flinging fragments off the *inside* of the plate even if nothing penetrates (spall liners exist to catch these). (4) THERMAL SPALLING — rapid, uneven heating (or a coating with a different thermal expansion than its substrate) sets up stresses that flake the surface; also seen as rock spalling in tunnels and cavitation spalling on propellers and pump parts.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-matfail-fatigue-limit',
    title: 'Fatigue Limit / Endurance Limit',
    category: 'Materials Science',
    keywords: [
      'what is a fatigue limit or endurance limit in materials engineering', 'a stress amplitude below which a material can be cyclically loaded essentially forever without failing by fatigue this is a mechanical property it has nothing to do with audio loudness or listener fatigue',
      'on an s n curve stress versus number of cycles to failure plain carbon and low alloy steels and titanium show a distinct knee that flattens out around ten million cycles the stress at that plateau roughly 40 to 50 percent of the tensile strength is the endurance limit design below it and the part has infinite life',
      'most non ferrous metals aluminium copper magnesium have no true fatigue limit the s n curve keeps sloping down so engineers quote a fatigue strength at a set number of cycles like ten to the eight corrosion or a notch can remove the limit entirely',
    ],
    content: `The fatigue limit (also called the endurance limit) is the cyclic stress amplitude below which a material will endure an effectively unlimited number of load cycles without a fatigue crack forming. It is a mechanical property of the material and has nothing to do with audio, loudness, or a listener getting tired. It comes from the S-N curve (Wöhler curve), a plot of applied stress amplitude against the number of cycles to failure: for plain-carbon and low-alloy steels, and for titanium alloys, the curve slopes down and then bends into a horizontal plateau at around 10^6–10^7 cycles. The stress at that plateau — roughly 40–50% of the material's ultimate tensile strength for many steels — is the fatigue limit; keep the working stress below it and the component has "infinite life." Most non-ferrous metals (aluminium, copper, magnesium alloys) show NO true plateau — the S-N curve keeps descending — so for them engineers instead quote a "fatigue strength" at a specified life, such as the stress that gives 5×10^8 cycles. The fatigue limit is fragile: a corrosive environment, a sharp notch or surface scratch, fretting, or a tensile mean stress can lower it drastically or remove it altogether, which is why the fatigue limit is treated cautiously in real design.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-matfail-quench-temper',
    title: 'Quenching and Tempering of Steel',
    category: 'Materials Science',
    keywords: [
      'what is quenching and tempering of steel heat treatment', 'quenching is heating steel above its critical temperature so the carbon dissolves into austenite then cooling it very fast in water oil or forced air',
      'the fast cool traps the carbon and transforms the structure to martensite which is extremely hard and strong but also very brittle and full of internal stress so quenched steel can crack on its own',
      'tempering is a second lower temperature reheat typically 150 to 650 celsius that lets a little carbon precipitate out relieving stress and trading some hardness for toughness and ductility higher tempering temperature means softer and tougher this is different from tempered glass which is made by rapid air cooling to put the surface in compression',
    ],
    content: `Quench-and-temper is the standard two-step heat treatment that gives steel its strength. QUENCHING: the steel is heated above its critical temperature (about 800–900°C for medium-carbon steel) and held until the carbon dissolves into the face-centred-cubic phase austenite, then cooled very rapidly by plunging it into water, oil, brine, or a blast of air. The carbon atoms have no time to diffuse out, so instead of forming soft pearlite the structure shears into martensite — a highly strained, body-centred-tetragonal phase that is extremely hard and strong but so brittle and internally stressed that a freshly quenched part can crack spontaneously ("quench cracking") and will shatter rather than bend. TEMPERING: the quenched part is reheated to a moderate temperature (roughly 150–650°C) and held, which lets a controlled amount of carbon precipitate as fine carbides. This relieves the internal stress and restores toughness and ductility at the cost of some hardness — and the trade-off is tunable: temper low (200°C) for a hard cutting edge, temper high (600°C) for a tough, shock-resistant machine part. (This is unrelated to "tempered" or toughened glass, which is made by heating float glass and then rapidly cooling its surfaces with air jets so the outside goes into compression — quite a different process and purpose.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-matfail-scc',
    title: 'Stress Corrosion Cracking (SCC)',
    category: 'Materials Science',
    keywords: [
      'what is stress corrosion cracking scc', 'brittle cracking of a normally ductile metal caused by the combination of a sustained tensile stress and a specific corrosive environment acting together neither alone would do it',
      'the stress can be an applied load or leftover residual stress from welding or forming the cracks grow slowly branch like a river network and are often invisible from outside until sudden failure this is different from fatigue which needs cyclic not static stress and leaves beach marks',
      'classic pairings austenitic stainless steel with chlorides hot swimming pool ceiling collapses brass with ammonia season cracking of cartridge cases carbon steel with caustic or nitrate solutions aluminium alloys and high strength steel in humid air prevention lower the stress stress relief anneal shot peen change alloy remove the chemical add inhibitors',
    ],
    content: `Stress corrosion cracking is the brittle, often catastrophic cracking of a normally ductile metal when two conditions are present at the same time: a sustained (static) tensile stress AND a particular corrosive environment for that alloy. Remove either factor and it does not happen. The tensile stress can be an external load or, very commonly, residual stress left in the part by welding, bending, or machining. The cracks initiate at a pit or flaw and then grow slowly — over weeks to years — usually branching in a fine, river-like or tree-like network, and they frequently run below the surface so the part looks fine right up until it fails suddenly with little or no yielding. This distinguishes SCC from metal fatigue (which needs a *cyclic* stress and leaves smooth "beach marks" on the fracture) and from uniform corrosion (which just thins the section). Classic alloy/environment pairs: austenitic stainless steel + chlorides + warmth (indoor swimming-pool ceiling collapses, offshore piping); brass + ammonia or amines ("season cracking" of drawn cartridge cases); carbon steel + hot caustic ("caustic embrittlement" of old boilers) or nitrate solutions; high-strength aluminium alloys and high-strength steels + humid air. Prevention: reduce the stress (design, stress-relief annealing, shot peening to impose surface compression), remove or neutralise the offending chemical, add corrosion inhibitors, or switch to a resistant alloy.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-matfail-fracture-toughness',
    title: 'Fracture Toughness',
    category: 'Materials Science',
    keywords: [
      'what is fracture toughness in materials science', 'a material property that measures how well a material resists the propagation of a pre existing crack how much stress a component can carry when it already contains a flaw of known size this is about engineering materials not broken bones',
      'the plane strain fracture toughness is written k1c and has odd units of megapascal root metre it combines with the applied stress and the crack length in the equation k equals y times stress times root pi a fracture happens when k reaches k1c',
      'high toughness materials like structural steel and titanium tolerate large cracks before fast fracture low toughness materials like ceramics glass and hardened steel snap from a tiny flaw toughness usually drops as strength or hardness rises and as temperature falls it is measured with a pre cracked notched bend or compact tension specimen',
    ],
    content: `Fracture toughness is the property that describes a material's resistance to the rapid growth of a crack that is already present. Real components always contain small flaws — pores, inclusions, weld defects, scratches — and fracture toughness answers the question "how large a flaw, at how much stress, before this thing suddenly breaks?" (It is a materials-engineering concept and has nothing to do with bone fractures.) The key quantity is the plane-strain fracture toughness, written K_IC, measured in the unusual units MPa·√m. It ties together with the applied stress σ and the crack length a through the stress-intensity factor K = Yσ√(πa), where Y is a geometry factor. Fast, unstable fracture occurs when K reaches K_IC. Practical meaning: a tough material (structural steel ~50–200 MPa·√m, titanium alloys, many polymers) can carry load with a crack several centimetres long and will tear slowly with warning; a low-toughness material (glass and ceramics ~1–5, fully hardened tool steel, grey cast iron) fast-fractures from a flaw you can barely see. Toughness generally falls as a material is made stronger or harder, and falls sharply as temperature drops (the ductile-to-brittle transition). It is measured on a fatigue-pre-cracked specimen — a notched three-point bend bar or a compact-tension (CT) specimen — loaded to fracture. Related measures: K_IC (linear-elastic), J-integral and CTOD (for ductile materials that yield before fracture), and the energy-based Charpy impact value as a cheap quality screen.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-matfail-creep',
    title: 'Creep in Materials',
    category: 'Materials Science',
    keywords: [
      'what is creep in materials', 'the slow continuous permanent deformation of a solid under a constant load that is well below its yield strength it matters most for metals and ceramics at high temperature not just soft plastics',
      'it becomes significant above roughly 0.4 times the absolute melting temperature so it governs the design of jet engine turbine blades steam boiler and superheater tubes power station piping rocket nozzles and lead pipes and solder at room temperature',
      'the creep curve has three stages primary decelerating secondary steady state constant minimum rate the design regime and tertiary accelerating as voids and necking take over ending in creep rupture higher stress and higher temperature both speed every stage remedies single crystal blades solid solution and precipitate strengthening ceramic coatings',
    ],
    content: `Creep is the slow, continuous, permanent deformation of a solid held under a constant stress that is below its yield strength — given enough time, the part keeps stretching and eventually fails. It is often described with soft materials (a stretched plastic clothes-line sagging, old lead roofing flowing), but in engineering it matters most for METALS and ceramics at elevated temperature. Creep becomes significant above roughly 0.3–0.4 of the absolute (kelvin) melting temperature, so it is the limiting factor in the design of gas-turbine and jet-engine blades and discs, steam-boiler and superheater tubes, high-pressure steam piping, rocket nozzles, and furnace hardware — and at room temperature for low-melting metals like solder and lead, and for polymers. The classic creep curve (strain vs time at fixed load and temperature) has three stages: PRIMARY (transient) — a fast rate that decelerates as the material work-hardens; SECONDARY (steady-state) — a long period of roughly constant minimum creep rate, which is what designers use; TERTIARY — the rate accelerates as internal voids form at grain boundaries and the section necks, ending in "creep rupture." Raising either the stress or the temperature shortens all three stages dramatically. It is combated with creep-resistant superalloys, large or elongated ("directionally solidified") grains or single-crystal castings that remove transverse grain boundaries, solid-solution and precipitate strengthening, and thermal-barrier coatings.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-matfail-youngs-modulus',
    title: "Young's Modulus (Elastic Modulus)",
    category: 'Materials Science',
    keywords: [
      'what is youngs modulus elastic modulus', 'a measure of a materials stiffness how much it stretches elastically for a given pull it is the slope of the straight initial part of the stress strain curve stress divided by strain',
      'units of pressure gigapascals rubber about 0.01 to 0.1 gpa plastics 1 to 4 wood along the grain 10 to 15 aluminium 69 titanium 110 steel about 200 tungsten 400 diamond over 1000',
      'stiffness is not the same as strength youngs modulus tells you deflection under load not the force to break or permanently bend it a stiff beam of steel and a flexible beam of nylon can have the same yield strength for a metal the modulus barely changes with heat treatment or alloying it is set by the atomic bonding',
    ],
    content: `Young's modulus (E), also called the elastic modulus or modulus of elasticity, measures a material's stiffness — its resistance to being stretched or compressed elastically. It is defined as stress divided by strain in the linear elastic region: the slope of the straight initial portion of the stress-strain curve, before any permanent deformation. A high E means the material barely deflects under load and springs straight back; a low E means it stretches a lot for the same stress. Units are those of pressure, usually gigapascals (GPa): rubber ~0.01–0.1, polymers ~1–4, concrete ~30, aluminium alloys ~69, titanium alloys ~110, steels ~200 (essentially the same for all steels), tungsten ~400, diamond >1000. Two important points: (1) Stiffness is NOT strength. Young's modulus predicts how far a part bends or a cable stretches under working load; it says nothing about the stress needed to yield it or break it. A component can be stiff but weak (a ceramic) or flexible but strong (a nylon rope). (2) For a given metal, E is set by the strength of the interatomic bonds and is almost unaffected by alloying, cold work, or heat treatment — you cannot make a steel spring "stiffer" by hardening it, only stronger. E does decrease gradually as temperature rises. Related moduli: the shear modulus G (resistance to twisting) and the bulk modulus K (resistance to uniform pressure), linked to E through Poisson's ratio.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-matfail-charpy',
    title: 'The Charpy Impact Test',
    category: 'Materials Science',
    keywords: [
      'what is a charpy impact test charpy v notch',
      'a standardised test that measures how much energy a material absorbs when it is broken by a sudden blow a notch toughness indicator a small bar 10 by 10 by 55 mm with a machined v notch is placed horizontally and struck behind the notch by a heavy pendulum',
      'the pendulum swings through the broken specimen and the height it rises to on the far side shows how much energy was absorbed reported in joules a ductile break absorbs a lot and the specimen bends a brittle break absorbs little and the pieces fly apart',
      'run at a range of temperatures it maps the ductile to brittle transition of steels which is why it is a standard acceptance test for pressure vessel ship and bridge steel the izod test is similar but the specimen is clamped vertically as a cantilever',
    ],
    content: `The Charpy impact test (usually the Charpy V-notch or CVN test) measures the energy a material absorbs when it is fractured by a single sudden blow — a practical index of "notch toughness" and of a steel's tendency to fail in a brittle way. A standard specimen is a bar 10 × 10 × 55 mm with a precise 2 mm-deep 45° V-notch machined in one face. It is laid horizontally against two anvils, notch facing away from the strike, and a heavy pendulum hammer is released from a fixed height to smash through it at the notch. The pendulum continues past and swings up on the other side; the height it fails to reach, compared with a free swing, gives the energy absorbed by the fracture, reported in joules (or ft-lb). A tough, ductile break absorbs a lot of energy, the specimen bends and tears, and the fracture surface is dull and fibrous; a brittle break absorbs little energy, the halves fly clear, and the surface is bright and crystalline. Because the result is so temperature-sensitive for body-centred-cubic metals, the test is run at a series of temperatures to plot the ductile-to-brittle transition curve and pick a minimum service temperature — this is why a minimum Charpy value at a stated temperature is a standard acceptance requirement for pressure-vessel, pipeline, ship, and bridge steel. The Izod test is the same idea but the specimen is clamped vertically as a cantilever and struck above the notch.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-matfail-griffith',
    title: 'Griffith Crack Theory',
    category: 'Materials Science',
    keywords: [
      'what is the griffith crack theory of brittle fracture', 'a. a. griffiths 1920 energy explanation for why brittle materials break at stresses far below the theoretical strength of their atomic bonds the answer is pre existing microscopic cracks',
      'a crack grows only if the elastic strain energy released by extending it is at least equal to the energy needed to create the two new fracture surfaces this gives a critical stress that scales with one over the square root of the crack length so longer cracks are far more dangerous',
      'griffith tested it on glass fibres and rods showing strength rose as diameter and flaw size fell it works for truly brittle solids like glass and ceramics irwin later extended it with the strain energy release rate g and plastic work term to cover metals launching fracture mechanics',
    ],
    content: `Griffith crack theory, published by A. A. Griffith in 1920, explains why brittle materials such as glass fracture at applied stresses one hundred times lower than the stress that should be needed to pull their atomic bonds apart. Griffith's insight was that real materials are full of tiny pre-existing cracks and flaws, and that fracture is governed by an energy balance, not by the bond strength directly. As a crack extends, the material around it relaxes and releases stored elastic strain energy; at the same time, creating the two new crack faces costs surface energy. The crack will only run if the elastic energy released per unit of crack advance is at least as large as the surface energy required. Working this through gives a critical fracture stress proportional to √(2Eγ / πa), where E is Young's modulus, γ the surface energy, and a the half-length of the crack. The crucial consequence is the 1/√a dependence: doubling the flaw size drops the breaking stress by about 30%, and a barely visible scratch can halve the strength of a glass sheet. Griffith confirmed it experimentally by showing that thin glass fibres, which contain smaller flaws, are far stronger than bulk glass. The pure theory applies to ideally brittle solids (glass, ceramics). In the 1950s G. R. Irwin generalised it by replacing surface energy with the "strain energy release rate" G and adding a plastic-work term, so it could describe metals — the birth of modern fracture mechanics and the stress-intensity factor K.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-matfail-delamination',
    title: 'Delamination in Composites',
    category: 'Materials Science',
    keywords: [
      'what is delamination in composite materials', 'the separation of the layers plies of a laminated composite like carbon fibre or fibreglass a crack that runs between plies rather than through the fibres',
      'it forms where the interlaminar stresses are highest at free edges holes ply drop offs and joints and it is driven by low velocity impact a dropped tool a bird strike hail manufacturing voids or thermal cycling the resin rich layer between plies is the weak plane and it carries no reinforcing fibres across it',
      'dangerous because it is often invisible on the surface barely visible impact damage yet it can cut compression strength by half by letting the sub laminates buckle independently found by tap testing ultrasonic c scan or thermography',
    ],
    content: `Delamination is the separation of the layers ("plies") of a laminated composite — carbon-fibre-reinforced polymer, fibreglass, plywood, laminated glass. Instead of a crack breaking fibres, it runs in the thin resin-rich plane *between* two plies, where there is no reinforcement bridging the gap, so that plane is the laminate's weakest link. Delaminations start where the through-thickness ("interlaminar") stresses are highest: at free edges, around fastener holes and cut-outs, at ply drop-offs where the laminate changes thickness, and at bonded or bolted joints. The usual causes are out-of-plane loads the laminate is not designed for: low-velocity impact (a dropped tool, hail, a bird or runway-debris strike), plus manufacturing defects (voids, contamination, poor cure), and repeated thermal or moisture cycling. The reason it is a serious concern is that impact often leaves little or no mark on the surface — "barely visible impact damage" — while internally splitting the laminate into several thin sub-laminates. Under compression those sub-laminates can buckle independently, so a delaminated panel can lose 30–60% of its compressive strength with nothing visible from outside, and the delamination can then grow under fatigue. It is detected by coin-tap testing, ultrasonic C-scan, thermography, or X-ray, and resisted with toughened resins, through-thickness stitching or Z-pins, and interleaved thermoplastic layers.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-matfail-bridge-collapse',
    title: 'Why Bridges Collapse',
    category: 'Engineering',
    keywords: [
      'what causes a bridge to collapse structurally', 'bridges fail from more than one cause not just missing triangulation the main structural ones are overload scour fatigue brittle fracture buckling resonance corrosion and progressive collapse',
      'scour is the number one cause of bridge failure in service flowing water erodes the sediment from around a pier or abutment foundation until it undermines it fatigue cracks grow at welded connections under millions of traffic cycles brittle fracture of a single fracture critical member in cold weather can drop a whole span',
      'resonance wind or marching or traffic matching a natural frequency tacoma narrows 1940 a design or detailing error hyatt regency walkway 1981 the connection carried double load corrosion section loss and construction error or impact from a ship or truck also progressive collapse where one member failing overloads its neighbours',
    ],
    content: `Bridges collapse for several distinct structural reasons, not only from a lack of triangulation. The main ones: (1) SCOUR — flowing water erodes the streambed sediment from around a pier or abutment foundation; it is the leading cause of bridge failure in service worldwide (e.g. Schoharie Creek, 1987). (2) OVERLOAD — a load heavier than the design allowance, sometimes combined with deterioration that has quietly reduced capacity. (3) FATIGUE — cracks grow at welds, rivet holes, and connection details under the millions of stress cycles from traffic, eventually severing a member. (4) BRITTLE FRACTURE — a "fracture-critical" member (one whose failure drops a span) cracks suddenly, usually in cold weather when steel toughness is low, from a pre-existing flaw (Point Pleasant / Silver Bridge, 1967, an eyebar). (5) BUCKLING — a compression member or the deck of a girder fails by bowing sideways rather than by crushing. (6) RESONANCE / AERODYNAMIC INSTABILITY — wind, marching soldiers, or rhythmic pedestrian load matching a natural frequency (Tacoma Narrows, 1940; the Millennium Bridge wobble, 2000). (7) DESIGN OR DETAILING ERROR — the Hyatt Regency walkway (1981) and I-35W in Minneapolis (2007, undersized gusset plates). (8) IMPACT — a ship striking a pier or an over-height truck hitting a beam. (9) CORROSION section loss. Many real collapses are "progressive": one member or connection fails, its load redistributes to neighbours that were not designed for it, and the failure cascades through the structure.`,
    createdAt: Date.now(),
  },
];
