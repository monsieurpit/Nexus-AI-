import { KnowledgeItem } from '../../types';

/**
 * GEOLOGY_CONCEPTS_GAPS_3 — batch 256 corrections. nexus-4b did well on much of
 * this batch (rock/mineral, the rock cycle, magma/lava, shield/stratovolcano,
 * focus/epicentre, Richter/Mw, oceanic/continental crust, subduction/obduction,
 * hardness/streak, diamond/graphite, ore/mineral). Misses:
 * - "coal vs charcoal" said "coal is crude oil refined into something to burn".
 * - "P-wave vs S-wave" was a web dump about light waves (gamma vs radio).
 * - "fault vs fracture" and "cleavage vs fracture in minerals" answered about
 *   BONE fractures.
 * - "active/dormant/extinct volcano" answered about hotspot tracks.
 * - "intrusive vs extrusive" was a granite/basalt web dump.
 * - "sandstone vs quartzite", "shale vs slate", "asthenosphere vs mantle" were
 *   cut before the second half.
 * - "calcite vs aragonite" was a web dump.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'geology', keywords, content, createdAt: now,
});

export const GEOLOGY_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  k(
    'kb-gap-geo3-coal-vs-charcoal',
    'Coal vs charcoal',
    [
      'difference between coal and charcoal', 'coal is a sedimentary rock formed over millions of years from ancient plant matter buried compacted and heated peat lignite bituminous anthracite mined from the ground a fossil fuel', 'charcoal is manufactured by heating wood or biomass in the absence of oxygen pyrolysis driving off water and volatile gases leaving lightweight porous nearly pure carbon that ignites easily and burns hot and clean',
      'coal is not made from oil charcoal is a made product from cooking wood without air', 'activated charcoal for filtration',
    ],
    `They are both carbon-rich black solids you can burn, but one is a natural rock and the other is a manufactured product. (Coal is NOT "refined crude oil" — that is wrong; oil and coal are separate fossil fuels.)

COAL is a SEDIMENTARY ROCK. It forms over MILLIONS OF YEARS from the remains of ancient land PLANTS that accumulated in swamps as PEAT, were buried under sediment, and were then compressed and heated. As burial deepens, water and volatile compounds are driven off and the carbon content rises, progressing through ranks: peat -> LIGNITE (brown coal) -> sub-bituminous -> BITUMINOUS -> ANTHRACITE (hardest, ~95% carbon, burns hottest and cleanest). Coal is MINED from underground seams or surface pits and burned for electricity and steelmaking (as coke).

CHARCOAL is MADE by people. You heat WOOD (or coconut shell, bamboo, other biomass) to a few hundred degrees in a LOW- or NO-OXYGEN environment — a kiln, a pit, or a retort — so it cannot actually catch fire. This "PYROLYSIS" (destructive distillation) drives off the water, sap, resins, and flammable gases (which can be captured as wood gas, tar, and "wood vinegar"), leaving behind a light, porous, brittle mass that is mostly pure CARBON. Charcoal LIGHTS EASILY, burns HOT with a steady glow and little smoke or flame, and leaves only fine mineral ash. Uses: barbecue and cooking fuel, historical iron smelting and gunpowder, artists' drawing sticks, and — when treated to open millions of tiny pores — "activated charcoal" for water and air filtration and medical use.`,
  ),
  k(
    'kb-gap-geo3-p-wave-vs-s-wave',
    'P-wave vs S-wave (seismic waves)',
    [
      'difference between a P-wave and an S-wave', 'both are seismic body waves that travel through the Earths interior', 'P-waves primary compressional push-pull are the fastest arrive first move by compression and expansion in the direction of travel like sound and travel through solids liquids and gases',
      'S-waves secondary shear transverse are slower arrive second shake material perpendicular to the direction of travel and can only travel through solids not liquids or gases which is how we know the outer core is liquid the S-wave shadow zone', 'surface waves Love and Rayleigh arrive last and do the most building damage',
    ],
    `Both are SEISMIC BODY WAVES — vibrations from an earthquake that travel THROUGH the Earth's interior (this is not about light or electromagnetic waves).

P-WAVES ("Primary", also "compressional" or "push-pull"):
- are the FASTEST seismic wave, so they ARRIVE FIRST at a seismograph;
- travel by COMPRESSING and stretching the rock BACK AND FORTH along the direction the wave is moving — exactly like a sound wave (a P-wave IS sound, in effect);
- can pass through SOLIDS, LIQUIDS, AND GASES;
- typically felt as a sharp jolt or thud.

S-WAVES ("Secondary", also "shear" or "transverse"):
- are SLOWER (about 60% of P-wave speed), so they ARRIVE SECOND — the time gap between P and S arrivals tells you how far away the quake was;
- shake the rock SIDE TO SIDE / up and down, PERPENDICULAR to the direction of travel;
- can ONLY travel through SOLIDS — liquids and gases have no shear strength, so they cannot transmit an S-wave. This is the key evidence that Earth's OUTER CORE is LIQUID: S-waves are blocked by it, producing an "S-wave shadow zone" on the far side of the planet from a quake;
- carry more of the strong, rolling, damaging motion.

(After the body waves come the SURFACE WAVES — Love and Rayleigh waves — which travel along the ground surface, arrive last, and cause the most destruction to buildings.)`,
  ),
  k(
    'kb-gap-geo3-fault-vs-fracture',
    'Fault vs fracture (geology)',
    [
      'difference between a fault and a fracture geology', 'a fracture or joint is any crack or break in rock where the two sides have not moved past each other or have only pulled apart', 'a fault is a fracture along which the two sides have slipped past each other from millimetres to hundreds of kilometres over time',
      'all faults are fractures a fracture becomes a fault once there is displacement along it', 'a set of parallel fractures with no slip is a joint set', 'not a broken bone',
    ],
    `In geology (not medicine — this is not a broken bone):

A FRACTURE is ANY crack or break in a rock. If the two sides of the crack have NOT moved relative to each other along the crack — they may have just pulled slightly apart, or not moved at all — it is specifically called a JOINT. Joints form from cooling contraction, unloading (pressure release as overlying rock erodes away), and regional stress, and they usually occur in parallel "joint sets". Fractures/joints are important because they control how water, oil, and mineralising fluids move through rock, and where it weathers and breaks.

A FAULT is a fracture along which the two blocks of rock HAVE MOVED past each other — there is measurable DISPLACEMENT (offset) of features from one side to the other. That slip can be a few millimetres or, on a great plate-boundary fault built up over millions of years, hundreds of kilometres. Faults are where earthquakes happen: stress builds until the rock suddenly slips.

So the relationship is: every fault is a fracture, but a fracture only qualifies as a FAULT once there has been RELATIVE MOVEMENT of the two sides along it. Faults are then classified by the direction of that movement — normal, reverse, and strike-slip.`,
  ),
  k(
    'kb-gap-geo3-cleavage-vs-fracture-minerals',
    'Cleavage vs fracture (in minerals)',
    [
      'difference between cleavage and fracture in minerals', 'cleavage is the tendency of a mineral to break along specific flat planes of weakness set by its atomic structure producing smooth often shiny parallel surfaces at characteristic angles mica sheets halite and galena cubes calcite rhombs fluorite octahedra', 'fracture is how a mineral breaks when it does NOT cleave an irregular surface conchoidal curved shell-like as in quartz and glass hackly jagged splintery earthy uneven',
      'a mineral cleaves where its bonds are weakest and fractures where bonding is uniform quartz has no cleavage only fracture', 'not a bone fracture',
    ],
    `In mineral identification (not medicine):

CLEAVAGE is the way a mineral breaks along PLANES OF WEAKNESS built into its crystal structure — where the atomic bonds are weakest, in one or more specific directions. Broken along a cleavage plane, the surface is FLAT, smooth, and often reflective, and repeated breaks produce parallel faces or a distinctive shape. Cleavage is described by the NUMBER of directions and the ANGLES between them:
- 1 direction -> splits into SHEETS (mica, graphite);
- 2 directions at 90 degrees -> prismatic (feldspar, pyroxene);
- 3 directions at 90 degrees -> CUBES (halite/rock salt, galena);
- 3 directions NOT at 90 -> RHOMBS (calcite);
- 4 directions -> OCTAHEDRA (fluorite, diamond).
Cleavage is a reliable ID clue because it is the same for every specimen of that mineral.

FRACTURE is how a mineral breaks when there is NO plane of weakness — where the bonding is roughly equal in all directions, so it breaks IRREGULARLY. Fracture types: CONCHOIDAL (smooth, curved, shell- or lens-shaped, like broken glass — quartz, obsidian), HACKLY (jagged, sharp points — native copper and other metals), SPLINTERY (like broken wood — asbestos, kyanite), and uneven/earthy.

Many minerals show both — e.g. hornblende has good cleavage in two directions and uneven fracture across the third. Quartz is the classic mineral with NO cleavage at all: it only fractures (conchoidally).`,
  ),
  k(
    'kb-gap-geo3-volcano-status',
    'Active vs dormant vs extinct volcano',
    [
      'difference between an active dormant and extinct volcano', 'active has erupted in recorded history or within the last roughly 10000 years the Holocene and is expected to erupt again may be currently erupting or showing unrest', 'dormant sleeping has not erupted in a long time but still has a magma supply and could erupt again Rainier Yellowstone',
      'extinct has not erupted in tens of thousands of years and is not expected to ever erupt again its magma supply is cut off Arthurs Seat Edinburgh the Auvergne', 'the categories are fuzzy volcanoes thought extinct have occasionally reawakened',
    ],
    `These describe how likely a volcano is to erupt (nothing to do with a "hotspot moving on" — that is one specific mechanism for volcanic island chains).

ACTIVE: a volcano that has ERUPTED WITHIN RECORDED HISTORY, or (a common scientific cutoff) within the last roughly 10,000 years (the Holocene), AND is considered likely to erupt again. It may be erupting right now, or quietly between eruptions, or showing UNREST — swelling ground, earthquake swarms, increased gas — that hints at magma moving. Examples: Kilauea, Etna, Stromboli, Merapi.

DORMANT ("sleeping"): a volcano that has NOT erupted for a long time — long enough that it isn't obviously active — but that still has (or is thought to still have) a MAGMA SUPPLY beneath it and COULD reawaken. Examples: Mount Rainier, Mount Fuji (last erupted 1707), the Yellowstone caldera.

EXTINCT ("dead"): a volcano that has not erupted in tens of thousands of years and, because its magma source has moved away or cooled off, is NOT expected to EVER erupt again. Examples: Edinburgh's Castle Rock and Arthur's Seat, the chain of old volcanoes in the Auvergne (France), Mount Slemish (Ireland).

The lines are blurry and judged case by case — several volcanoes long believed extinct or dormant (Chaiten in Chile in 2008, Pinatubo in 1991) have erupted violently after centuries or millennia of silence.`,
  ),
  k(
    'kb-gap-geo3-intrusive-vs-extrusive',
    'Intrusive vs extrusive igneous rock',
    [
      'difference between intrusive and extrusive igneous rock', 'both form from cooling magma the difference is where it cooled', 'intrusive plutonic cools slowly deep underground crystals have time to grow large and interlocking coarse-grained visible crystals granite gabbro diorite',
      'extrusive volcanic forms when lava erupts onto the surface and cools quickly crystals have little time to grow fine-grained crystals too small to see glassy obsidian or full of gas holes pumice scoria basalt rhyolite andesite', 'same magma composition can make either granite and rhyolite are twins gabbro and basalt are twins',
    ],
    `Both are IGNEOUS rocks — solidified from molten rock — and both can have the same chemical composition. The difference is WHERE the magma cooled, and that controls the CRYSTAL SIZE (texture).

INTRUSIVE (also "plutonic") igneous rock cools SLOWLY, DEEP UNDERGROUND, where the surrounding rock insulates the magma and it can take thousands to millions of years to fully solidify. Slow cooling gives the mineral crystals plenty of time to grow, so intrusive rocks are COARSE-GRAINED — you can see individual interlocking crystals with the naked eye. It is exposed at the surface only after the overlying rock erodes away. Examples: GRANITE, gabbro, diorite, peridotite.

EXTRUSIVE (also "volcanic") igneous rock forms when magma reaches the SURFACE as LAVA (or intrudes as a very shallow, thin sheet) and cools FAST — minutes to years — in air or water. Fast cooling gives crystals almost no time to grow, so extrusive rocks are FINE-GRAINED (crystals too small to see without a microscope), or GLASSY with no crystals at all (obsidian), or riddled with frozen GAS BUBBLES (pumice, scoria). Examples: BASALT, rhyolite, andesite, obsidian, pumice.

Chemical twins: granite (intrusive) and RHYOLITE (extrusive) have the same silica-rich composition; GABBRO (intrusive) and BASALT (extrusive) are the same silica-poor composition. A rock with BOTH large and tiny crystals ("porphyritic") cooled slowly at depth, then erupted and finished cooling quickly.`,
  ),
  k(
    'kb-gap-geo3-sandstone-vs-quartzite',
    'Sandstone vs quartzite',
    [
      'difference between sandstone and quartzite', 'sandstone is a sedimentary rock of cemented sand grains mostly quartz with visible pore space it breaks around the grains relatively soft can be scratched or crumbled often shows bedding layers', 'quartzite is metamorphosed sandstone heat and pressure have fused the quartz grains and filled the pores with silica so it is extremely hard non-porous and glassy and fractures through the grains not around them',
      'quartzite is one of the most weathering-resistant rocks forming ridges and peaks', 'a drop of the fresh break looks sugary in sandstone glassy in quartzite',
    ],
    `They are made of the same stuff — mostly quartz sand — but sandstone is SEDIMENTARY and quartzite is what it becomes after METAMORPHISM.

SANDSTONE is formed by SAND grains (0.06-2 mm, mostly quartz, sometimes with feldspar and rock fragments) being deposited by water or wind, buried, and CEMENTED together by minerals (silica, calcite, or iron oxide) precipitating in the pore spaces. Key traits: you can often see and even rub off individual grains; there is visible PORE SPACE (so it can hold water, oil, and gas — many are aquifers and reservoirs); it usually shows BEDDING and cross-bedding; it is relatively SOFT (a knife or even a fingernail can score the weaker ones); and when it breaks, the break goes AROUND the grains, leaving a rough, sugary surface.

QUARTZITE is sandstone that has been subjected to enough HEAT and PRESSURE (regional metamorphism, or contact with an intrusion) that the quartz grains have RECRYSTALLISED and FUSED together, and any remaining pores have filled with silica. The result: it is extremely HARD (harder than a steel knife, Mohs ~7), essentially NON-POROUS, dense, and has a GLASSY or waxy sheen. Crucially, when quartzite breaks, the fracture cuts straight THROUGH the individual grains rather than around them, giving a smooth, sharp, glassy surface. Because it is so resistant to weathering, quartzite forms prominent RIDGES, cliffs, and mountain peaks and produces poor, thin soils.

Quick field test: try to scratch it and look at a fresh break — sandstone crumbles and looks granular; quartzite resists the knife and breaks with a glassy sheen across the grains.`,
  ),
  k(
    'kb-gap-geo3-shale-vs-slate',
    'Shale vs slate',
    [
      'difference between shale and slate', 'shale is a sedimentary rock fine mud clay and silt compacted into thin layers fissile splits along the bedding soft dull crumbly can be scratched with a fingernail', 'slate is shale that has been metamorphosed by low-grade heat and pressure the clay minerals recrystallise into mica aligned perpendicular to the pressure giving slaty cleavage that splits into thin flat strong smooth sheets which need not follow the original bedding',
      'slate is harder denser rings when tapped used for roofing tiles flooring and blackboards', 'phyllite schist and gneiss are the higher-grade steps',
    ],
    `SHALE is a SEDIMENTARY rock — the most common one. It forms when very fine MUD (clay and silt particles) settles out of still water and is slowly compacted and lightly cemented. Traits: it is SOFT (you can scratch it with a fingernail and it disintegrates in water over time), DULL, thinly LAYERED, and "fissile" — it splits readily into flakes and slabs ALONG the original bedding planes. It often contains fossils and is the source rock for oil and gas.

SLATE is shale that has been METAMORPHOSED — subjected to LOW-GRADE heat and directed PRESSURE (mountain-building). Under that stress the clay minerals dissolve and re-grow as tiny flat MICA crystals, all aligned PERPENDICULAR to the direction of squeezing. This new alignment creates "SLATY CLEAVAGE" — the rock now splits into thin, flat, remarkably STRONG, smooth SHEETS along the cleavage planes, which are often at an ANGLE to the original bedding, not parallel to it. Slate is HARDER and denser than shale, has a slight sheen, RINGS with a clear note when tapped (shale gives a dull thud), and does not fall apart in water. Uses: roofing tiles, floor and paving flags, worktops, snooker-table beds, gravestones, and old-fashioned writing "slates" and blackboards.

If metamorphism continues, slate coarsens into PHYLLITE (silky sheen), then SCHIST (visible mica flakes, wavy foliation), then GNEISS (banded).`,
  ),
  k(
    'kb-gap-geo3-asthenosphere-vs-mantle',
    'Asthenosphere vs mantle',
    [
      'difference between the asthenosphere and the mantle', 'the mantle is the thick layer about 2900 km between the crust and the core about 84 percent of Earths volume dense iron magnesium silicate rock peridotite mostly solid but slowly convecting', 'the asthenosphere is a zone within the upper mantle roughly 100 to 350 km deep hot enough and near enough to its melting point to be weak and plastic deforming and flowing slowly like putty',
      'the asthenosphere is the lubricating layer on which the rigid lithospheric plates slide it is part of the mantle not separate from it below it the lower mantle is stiffer again due to pressure',
    ],
    `The MANTLE is the huge middle layer of the Earth, between the CRUST above and the CORE below. It is about 2,900 km thick and makes up roughly 84% of the planet's VOLUME (67% of its mass). It is made of dense, iron- and magnesium-rich SILICATE rock (peridotite, dominated by the mineral olivine). Despite temperatures of 1,000-3,700 degrees C, most of the mantle is SOLID rock — but over millions of years it CONVECTS, flowing very slowly in giant cells that drive plate tectonics.

The ASTHENOSPHERE is not a separate layer from the mantle — it is a ZONE within the UPPER mantle, roughly 100 to 350 km deep. What makes it special is its MECHANICAL behaviour: here the rock is hot enough, and close enough to its melting point (with perhaps 1% partial melt), that it is WEAK, DUCTILE, and PLASTIC — it deforms and flows like extremely stiff putty rather than fracturing. It is the layer the rigid TECTONIC PLATES (the lithosphere) slide over, and it flows to fill in behind plates as they move and to rise where plates spread apart.

Above the asthenosphere, the LITHOSPHERE (crust + rigid uppermost mantle) is cool and brittle. Below the asthenosphere, the LOWER MANTLE ("mesosphere") is hot but so compressed by pressure that it is stiffer and stronger again.

So: "mantle" is the whole compositional layer; "asthenosphere" is a soft, flowing shell near the top of it.`,
  ),
  k(
    'kb-gap-geo3-strike-slip-vs-dip-slip',
    'Strike-slip fault vs dip-slip fault',
    [
      'difference between a strike-slip fault and a dip-slip fault', 'dip-slip the movement is up or down the dip slope of the fault plane vertical component dominant includes normal faults from extension hanging wall down and reverse or thrust faults from compression hanging wall up which build mountains', 'strike-slip transform lateral the movement is horizontal parallel to the strike the fault compass direction the two blocks slide past each other sideways with little vertical motion San Andreas',
      'oblique-slip faults have both components left-lateral and right-lateral describe which way the far side appears to move',
    ],
    `Faults are classified by the DIRECTION the two blocks slip relative to the fault plane. A fault plane has a "STRIKE" (its compass line where it meets the ground) and a "DIP" (how steeply it tilts down into the ground).

DIP-SLIP faults: the movement is UP or DOWN the DIP of the fault — i.e. the dominant motion is VERTICAL, one block riding up or dropping down relative to the other. Two kinds:
- NORMAL fault: the upper block (the "hanging wall") slides DOWN relative to the lower block ("footwall"). Caused by EXTENSION (the crust being pulled apart); it stretches and thins the crust. Rift valleys, the Basin and Range.
- REVERSE fault (a low-angle one is a THRUST fault): the hanging wall is pushed UP and over the footwall. Caused by COMPRESSION (the crust being squeezed); it shortens and thickens the crust and BUILDS MOUNTAINS. The Himalayan front, subduction-zone megathrusts.

STRIKE-SLIP faults (also "transform" or "lateral"): the movement is HORIZONTAL, PARALLEL to the strike — the two blocks grind PAST each other sideways with little or no vertical offset. Caused by shear. They are described as "left-lateral" or "right-lateral" depending on which way the block on the far side appears to move. The San Andreas (right-lateral), the North Anatolian, and the Alpine Fault of New Zealand are strike-slip.

A fault with BOTH a vertical and a horizontal component is called "oblique-slip".`,
  ),
  k(
    'kb-gap-geo3-calcite-vs-aragonite',
    'Calcite vs aragonite',
    [
      'difference between calcite and aragonite', 'both are natural crystal forms polymorphs of calcium carbonate CaCO3 same chemistry different crystal structure', 'calcite is trigonal the more stable form at Earth-surface conditions the main mineral of most limestone marble chalk and cave stalactites',
      'aragonite is orthorhombic denser forms in specific settings many mollusc shells and pearls coral skeletons hot springs high-pressure metamorphism and some cave flowstone and slowly converts to calcite over geological time',
    ],
    `Calcite and aragonite are POLYMORPHS of calcium carbonate (CaCO3) — the SAME chemical compound, but crystallised in DIFFERENT atomic arrangements, which gives them different physical properties. (A third, rare polymorph is vaterite.)

CALCITE has a TRIGONAL (rhombohedral) crystal structure. It is the THERMODYNAMICALLY STABLE form of CaCO3 at Earth's surface temperatures and pressures, so it is by far the more common: it is the dominant mineral of most LIMESTONE, MARBLE, CHALK, travertine, and calcareous tufa, and it is what stalactites, stalagmites, and most cave formations are made of. It has perfect rhombohedral cleavage in three directions, a hardness of 3, shows strong double refraction (Iceland spar), and fizzes readily in dilute acid.

ARAGONITE has an ORTHORHOMBIC crystal structure and is slightly DENSER and harder (Mohs ~3.5-4). It is METASTABLE at the surface — over thousands to millions of years it slowly recrystallises into calcite. It forms mainly under SPECIFIC conditions:
- BIOLOGICALLY: it is the CaCO3 that most mollusc SHELLS, PEARLS, and the nacre ("mother-of-pearl") lining, and CORAL skeletons, are built from;
- from HOT SPRINGS and rapidly precipitating water (some cave "flowstone", "cave coral", and sprays of needle crystals);
- from HIGH-PRESSURE, low-temperature METAMORPHISM (in subduction-zone "blueschists"), where the dense structure is favoured.

So: same formula, but calcite is the stable, ubiquitous rock-forming form, and aragonite is the denser form that life and special environments make, which eventually turns into calcite.`,
  ),
];
