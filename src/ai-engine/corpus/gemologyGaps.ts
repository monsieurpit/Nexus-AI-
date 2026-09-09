import { KnowledgeItem } from '../../types';

// Batch 134 (gemology / gemstones) — a gap. On nexus-4b: "what is jade"
// collided with the Jade Emperor ("the supreme ruler of heaven and overseer of
// the celestial bureaucracy"); "what is a pearl" collided with hail formation
// ("supercooled water droplets freeze onto an ice particle"); "what varieties
// are quartz" listed feldspar, calcite, halite and pyrite as "forms of
// quartz." Raw web dumps for carat, cubic zirconia/moissanite, treated
// gemstones, and the rarest gemstone. Lab-grown diamonds were called "not
// minerals, made from table salt or sugar."
export const GEMOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-gem-mineral-vs-rock',
    title: 'Mineral vs Gemstone vs Rock',
    category: 'Gemology',
    keywords: [
      'what is the difference between a mineral a gemstone and a rock', 'a mineral is a naturally occurring inorganic solid with a definite chemical composition and an ordered internal crystal structure examples quartz calcite feldspar mica pyrite',
      'a rock is an aggregate of one or more minerals stuck together with no fixed composition granite basalt limestone sandstone marble are rocks not minerals',
      'a gemstone is a mineral or occasionally a rock like lapis lazuli or an organic material like pearl amber jet that is beautiful durable and rare enough to be cut and polished for jewellery so every mineral gem is a mineral but only a tiny fraction of minerals are gem quality',
    ],
    content: `Three distinct ideas that are easy to mix up. A MINERAL is a naturally occurring, inorganic solid with a specific chemical composition (within a range) and an orderly, repeating internal atomic arrangement — a crystal structure. Quartz (SiO₂), calcite (CaCO₃), the feldspars, micas, garnet, corundum, and diamond are all minerals. A ROCK is an aggregate — a naturally bonded mixture — of one or more minerals (or mineraloids or organic matter), with no fixed chemical formula. Granite (mostly quartz + feldspar + mica), basalt, limestone, sandstone, and marble are rocks, NOT minerals; granite is a common wrong answer to "name a mineral." A GEMSTONE (or gem) is a material — usually a mineral, occasionally a rock such as lapis lazuli, occasionally an organic substance such as pearl, amber, jet, or coral — that is prized for jewellery because it is beautiful (colour, transparency, lustre, optical effects), durable (hard and tough enough to wear), and rare. So a cut amethyst is a mineral and a gem; granite is a rock and not a gem; ordinary quartz is a mineral but not a gem. Fewer than a couple of hundred of the ~5,900 known minerals are ever used as gems, and only a handful of those (diamond, ruby, sapphire, emerald) in quantity.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gem-carat',
    title: 'What a Carat Is (and Karat)',
    category: 'Gemology',
    keywords: [
      'what is a carat gemstone weight', 'the carat abbreviated ct is the unit of mass for gemstones and pearls equal to exactly 200 milligrams that is one fifth of a gram this is the metric carat standardised in 1907',
      'one carat is divided into 100 points so a 0.25 ct stone is a twenty five point or quarter carat stone price per carat rises steeply with size because large clean crystals are far rarer so a 2 carat diamond costs much more than two 1 carat diamonds of the same quality',
      'not the same as karat spelled with a k which is the measure of gold purity out of 24 24k pure 18k 75 percent gold the name comes from the carob seed once used as a small standard weight',
    ],
    content: `The carat (ct) is the unit of weight used for gemstones and pearls. One metric carat equals exactly 200 milligrams (0.2 g, 0.007 oz) — a definition adopted internationally in 1907. Each carat is subdivided into 100 "points," so jewellers speak of a "twenty-five pointer" (0.25 ct) or a "fifty-point" stone (0.50 ct, a half carat). Carat is a measure of mass, not size, though for a given gem species and cut it correlates with visible dimensions (a round brilliant diamond of 1.00 ct is about 6.5 mm across). Because large, transparent, flawless crystals are dramatically rarer than small ones, the price PER carat jumps at each size threshold, so a single 2 ct diamond is worth far more than two 1 ct diamonds of otherwise identical quality — and stones are often cut to just reach a round number like 1.00 ct. Do NOT confuse it with KARAT (spelled with a K in North America), which measures the purity of gold on a scale of 24: 24K is (nearly) pure gold, 18K is 75% gold, 14K is 58.3%. Both words derive from the carob seed, whose fairly uniform mass was used in antiquity as a small reference weight.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gem-lab-diamond',
    title: 'Lab-Grown (Synthetic) Diamonds',
    category: 'Gemology',
    keywords: [
      'what is a lab grown or synthetic diamond and how is it different from a mined diamond', 'a real diamond made in a factory in weeks instead of in the earth over billions of years it is pure crystalline carbon with the exact same chemical composition crystal structure hardness and optical properties as a natural diamond it is not a fake or a simulant',
      'grown two ways hpht high pressure high temperature which mimics the mantle and cvd chemical vapour deposition which builds the crystal atom by atom from a carbon rich gas onto a diamond seed',
      'a jeweller cannot tell them apart only a gem lab can using magnification for growth patterns and strain plus fluorescence and spectroscopy natural diamonds usually have nitrogen and different inclusions lab diamonds cost roughly 60 to 85 percent less and are graded on the same four cs',
    ],
    content: `A lab-grown diamond (also called synthetic, man-made, or created) is a genuine diamond — pure crystalline carbon with the same cubic crystal structure, the same hardness (Mohs 10), the same refractive index, dispersion, thermal conductivity, and appearance as a diamond mined from the earth. It is NOT a "fake," a "simulant," or "made from salt or sugar"; the only difference is that it formed in a growth chamber over a few weeks rather than in the mantle over billions of years. Two methods are used: HPHT (High Pressure High Temperature), which squeezes a carbon source around a diamond seed at ~5 GPa and ~1,400°C, recreating mantle conditions; and CVD (Chemical Vapour Deposition), which cracks a carbon-rich gas (methane) in a vacuum chamber so carbon atoms settle layer by layer onto a thin diamond seed plate. Because the material is physically identical, a jeweller with a loupe cannot distinguish a lab diamond from a natural one, and simple "diamond testers" (which measure thermal conductivity) read both as diamond. Separating them requires a gem laboratory: natural diamonds typically contain traces of nitrogen and characteristic mineral inclusions and take on a particular strain pattern under crossed polarisers, while HPHT and CVD stones show distinctive metallic inclusions, growth-sector zoning, or fluorescence patterns. Lab diamonds are graded on the same 4 Cs and sell for roughly 60–85% less than an equivalent natural stone; major labs (GIA, IGI) issue reports that state "laboratory-grown."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gem-cz-moissanite',
    title: 'Cubic Zirconia and Moissanite (Diamond Simulants)',
    category: 'Gemology',
    keywords: [
      'what is cubic zirconia and moissanite diamond simulant', 'a simulant is something that looks like a diamond but is a completely different material unlike a lab grown diamond which really is diamond',
      'cubic zirconia cz is zirconium dioxide zro2 a fully synthetic material mohs hardness about 8 to 8.5 noticeably softer denser than diamond so a cz weighs more for the same size and it shows more coloured fire but less white brilliance it also scratches and gets cloudy over years and is very cheap',
      'moissanite is silicon carbide sic mohs 9.25 second only to a few materials nearly as hard as diamond it has more dispersion than diamond so it flashes rainbow colours strongly it is doubly refractive fools a basic thermal diamond tester so jewellers use a dedicated moissanite tester or look for facet doubling',
    ],
    content: `Both are "diamond simulants" — stones that mimic a diamond's look but are chemically and structurally unrelated to it (the key contrast with a lab-grown diamond, which actually IS diamond). CUBIC ZIRCONIA (CZ) is synthetic zirconium dioxide (ZrO₂), first mass-produced by Soviet scientists in the 1970s. It is colourless and clean, but Mohs ~8–8.5 (softer, so facet edges abrade and it can go cloudy over years), about 1.7× as dense as diamond (a CZ is visibly small for its carat weight, or heavy for its size), and it has higher dispersion but lower refractive index than diamond, giving lots of coloured "fire" but a slightly glassy, less lively white sparkle. It costs a few dollars a carat. MOISSANITE is synthetic silicon carbide (SiC) — the natural mineral is extremely rare, discovered by Henri Moissan in a meteorite crater. It is Mohs 9.25 (very hard and durable), close to diamond in weight, and has a higher refractive index than diamond plus much greater dispersion, so it throws off strong rainbow flashes that some find too "disco." Moissanite is doubly refractive, so under magnification you can see facet edges appear doubled, and because it conducts heat like diamond it fools old thermal "diamond testers" — jewellers use a moissanite tester that also checks electrical conductivity. Moissanite costs far more than CZ but far less than diamond.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gem-emerald',
    title: 'Emerald and Why Emeralds Have Inclusions',
    category: 'Gemology',
    keywords: [
      'what is an emerald and why do emeralds have inclusions jardin', 'emerald is the green gem variety of the mineral beryl a beryllium aluminium silicate its green comes from traces of chromium and or vanadium replacing aluminium pale green or blue green beryl is called green beryl or aquamarine not emerald',
      'nearly every natural emerald contains visible inclusions fingerprints of gas liquid and tiny crystals trapped as the crystal grew in turbulent silica poor hydrothermal veins collectively called the jardin french for garden',
      'because clean emeralds barely exist inclusions are expected and tolerated far more than in other gems and the trade routinely fills the surface reaching fractures with cedarwood oil or clear resin to reduce their visibility a treatment that must be disclosed and can need re oiling',
    ],
    content: `An emerald is the green gem variety of beryl, a beryllium-aluminium-silicate mineral (Be₃Al₂Si₆O₁₈). Its colour comes from small amounts of chromium and/or vanadium substituting for aluminium in the structure; iron can push the hue toward bluish-green. Beryl of a weaker green or greenish-blue is called "green beryl" (and blue beryl is aquamarine), not emerald — where the line falls is a long-running trade debate. Emeralds are Mohs 7.5–8, hard enough for jewellery but brittle. The defining feature is inclusions: almost every natural emerald contains visible internal features — trapped pockets of gas and liquid ("two- and three-phase inclusions"), fine healing fractures ("fingerprints"), and small crystals of other minerals — because emeralds crystallise slowly in cramped, chemically messy hydrothermal veins and pegmatites where the rare elements beryllium and chromium happen to meet. Gemmologists call this internal landscape the "jardin" (French for garden), and a completely clean, transparent emerald of any size is so rare that it is often suspected of being synthetic. As a result, some inclusion is expected and accepted in emeralds far more than in ruby, sapphire, or diamond, and the trade very commonly fills the surface-reaching cracks with colourless cedarwood oil or a polymer resin to make them less obvious — a treatment that improves apparent clarity, must be disclosed, and may need redoing over time.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gem-jade',
    title: 'Jade (Nephrite and Jadeite)',
    category: 'Gemology',
    keywords: [
      'what is jade nephrite jadeite', 'jade is a gem material this is the stone not the jade emperor of chinese mythology two entirely different minerals are sold as jade nephrite and jadeite they were only distinguished in 1863',
      'nephrite is a calcium magnesium silicate an amphibole its tightly interlocked fibrous crystals make it exceptionally tough hard to break though only about mohs 6 to 6.5 it is the jade worked in china for thousands of years usually creamy white spinach green or grey green',
      'jadeite is a sodium aluminium silicate a pyroxene rarer harder mohs 6.5 to 7 and able to take a more vivid colour the emerald green translucent imperial jade from myanmar is the most valuable also comes in lavender white and orange most fine jade jewellery today is jadeite',
    ],
    content: `Jade is a tough, lustrous ornamental stone (this is the gem, not the "Jade Emperor" of Chinese folk religion). Confusingly, two completely different minerals are both called jade, a fact only established by the French mineralogist Alexis Damour in 1863. NEPHRITE is a calcium-magnesium-iron silicate of the amphibole group. Its microstructure is a dense felt of interlocking fibrous crystals, which makes it one of the toughest natural materials known — very hard to chip or fracture — even though its scratch hardness is only about Mohs 6–6.5. Nephrite is the jade carved in China since the Neolithic, in New Zealand by Māori (pounamu), and by Indigenous peoples of the Pacific Northwest; typical colours are creamy "mutton fat" white, spinach green, and grey-green. JADEITE is a sodium-aluminium silicate of the pyroxene group, rarer and slightly harder (Mohs 6.5–7), also extremely tough due to interlocked granular crystals. It can reach more saturated, translucent colours; the most prized is the vivid, semi-transparent emerald-green "Imperial jade" from Myanmar (Burma), which can sell for more per carat than diamond, and it also occurs in lavender, white, russet, and near-black. Most high-quality "jade" jewellery sold today is jadeite. Both are commonly treated — bleached and polymer-impregnated ("Type B") or dyed ("Type C") — which must be disclosed.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gem-pearl',
    title: 'What a Pearl Is and How It Forms',
    category: 'Gemology',
    keywords: [
      'what is a pearl and how is it formed', 'a pearl is made by a living mollusc an oyster or a freshwater mussel it is not formed like hail or a snowball it has nothing to do with freezing water',
      'when an irritant lodges in the soft tissue the mollusc coats it layer after layer with nacre mother of pearl the same material it lines its shell with microscopic platelets of aragonite calcium carbonate cemented by the protein conchiolin the stacked translucent layers cause the iridescent lustre and orient',
      'natural pearls formed with no human help are extremely rare almost all pearls today are cultured a technician implants a shell bead nucleus or a piece of mantle tissue and the animal does the rest over months to years types akoya white saltwater tahitian dark south sea large freshwater mussel pearls',
    ],
    content: `A pearl is a hard, rounded object grown inside a living mollusc — a saltwater oyster (Pinctada species) or a freshwater mussel. It has nothing to do with freezing, hail, or snowballs. The process: when a foreign particle or (more often) a fragment of the mollusc's own tissue becomes lodged in the soft body, epithelial cells form a "pearl sac" around it and secrete nacre — the same lustrous material, also called mother-of-pearl, that lines the inside of the shell. Nacre is built from microscopic hexagonal platelets of aragonite (a form of calcium carbonate) stacked in overlapping layers and glued together by an organic protein-polysaccharide matrix called conchiolin. Light passing through and reflecting between these thin translucent layers produces the pearl's deep lustre and the subtle rainbow sheen called "orient." NATURAL pearls, formed with no human involvement, are so rare (historically maybe one in thousands of wild oysters, usually misshapen) that a matched strand was a royal treasure. Essentially all pearls sold now are CULTURED: a technician surgically inserts a polished shell bead and/or a piece of donor mantle tissue into the mollusc, which then coats it with nacre over months to several years. Main types: akoya (small, round, white/cream, saltwater, Japan); Tahitian (grey to black to peacock, saltwater); South Sea (large, white or golden, saltwater, Australia/Indonesia/Philippines); and freshwater (many shapes and pastel colours, grown in mussels, mostly China, often nucleated only with tissue so they are nearly solid nacre).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gem-treatments',
    title: 'Gemstone Treatments and Enhancements',
    category: 'Gemology',
    keywords: [
      'what does it mean when a gemstone is treated or enhanced', 'any process beyond cutting and polishing that improves a gems colour clarity or durability treatments must be disclosed and a treated stone is worth less than an untreated one of the same appearance',
      'heat treatment the most common heats ruby sapphire aquamarine tanzanite zircon amethyst citrine to change or deepen colour usually permanent and widely accepted irradiation makes blue topaz and some coloured diamonds oiling and resin filling hides fractures in emeralds',
      'fracture or glass filling in ruby and diamond diffusion adds colour only at the surface dyeing colours porous stones jade agate howlite hpht decolourises brown diamonds coating puts a colour film on the surface some treatments are stable some fade or can be damaged by heat ultrasonic cleaning or chemicals',
    ],
    content: `A gemstone is "treated" or "enhanced" when it has undergone some process, beyond ordinary cutting and polishing, to improve its colour, clarity, or durability. Ethical trade practice requires that any treatment be disclosed, and an equivalent-looking untreated stone is always worth more. The common treatments: HEAT — by far the most widespread; controlled heating permanently improves or changes colour in the great majority of rubies and sapphires (also removes silk, or creates it for star stones), turns most tanzanite from brown to blue-violet, lightens dark aquamarine, and converts amethyst to citrine. Generally stable and broadly accepted. IRRADIATION — gives most blue topaz its colour, and produces some blue, green, and black diamonds; usually followed by heating; results are stable but the process is regulated. OILING / RESIN FILLING — colourless oil or polymer worked into surface-reaching fractures to make them less visible; standard for emeralds, sometimes not permanent. FRACTURE / GLASS FILLING — lead glass poured into cavities of low-grade "ruby," or fractures in diamond; dramatically improves apparent clarity but is fragile and can be damaged by a jeweller's torch or ultrasonic cleaner. DIFFUSION — high-temperature treatment that adds colour (blue, or a star) only in a thin surface layer, lost if the stone is recut. DYEING — colours porous or fractured material: jade, agate, low-grade emerald, dyed howlite sold as "turquoise." HPHT — high-pressure high-temperature processing that removes brown tint from certain diamonds. COATING — a thin coloured or iridescent film on the surface ("mystic topaz"), the least durable.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gem-quartz',
    title: 'Quartz and Its Gem Varieties',
    category: 'Gemology',
    keywords: [
      'what is quartz and what gems are varieties of quartz', 'quartz is silicon dioxide sio2 one of the most abundant minerals in the earths crust feldspar calcite halite and pyrite are NOT quartz they are entirely separate minerals',
      'macrocrystalline quartz single visible crystals amethyst purple from iron plus natural irradiation citrine yellow to orange mostly heated amethyst rose quartz pink smoky quartz grey to brown clear rock crystal milky quartz ametrine prasiolite green',
      'cryptocrystalline quartz chalcedony made of microscopic fibres agate banded onyx black and white bands carnelian orange sard brown chrysoprase apple green jasper opaque red brown bloodstone tiger eye golden chatoyant from replaced asbestos fibres aventurine green with mica flecks',
    ],
    content: `Quartz is silicon dioxide (SiO₂), the second most abundant mineral in Earth's continental crust and the main component of most sand. (Feldspar, calcite, halite/rock salt, and pyrite are separate mineral species — they are not "varieties of quartz.") Its gem varieties fall into two structural groups. MACROCRYSTALLINE quartz grows as single crystals large enough to see: rock crystal (colourless), amethyst (purple — from iron impurities plus natural gamma irradiation; heating turns it yellow), citrine (yellow to golden to madeira-orange — rare in nature, most commercial citrine is heat-treated amethyst), rose quartz (pink — usually cloudy, from microscopic mineral fibres), smoky quartz (grey-brown to near-black — from irradiation of aluminium-bearing quartz), milky quartz (white, from fluid inclusions), ametrine (amethyst-citrine bicolour), and prasiolite (leek-green, heat-treated). CRYPTOCRYSTALLINE quartz (chalcedony) is built of sub-microscopic fibres and is translucent to opaque: agate (curved colour banding), onyx (straight black-and-white bands), carnelian (translucent orange-red), sard (brown-red), chrysoprase (apple-green, from nickel), bloodstone/heliotrope (dark green with red spots), and jasper (opaque, patterned, iron-rich). Quartz also hosts chatoyant "eye" stones — tiger's eye and hawk's eye form when quartz replaces fibrous crocidolite — and aventurine (green quartzite spangled with mica or fuchsite). Quartz is Mohs 7, the benchmark for "will it scratch window glass."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gem-rarest',
    title: 'The Rarest Gemstones',
    category: 'Gemology',
    keywords: [
      'what is the rarest gemstone', 'diamond is not rare it is common and its price is supported by marketing and controlled supply the genuinely rare gems are ones found at only one or two localities in tiny quantities',
      'painite for decades held the guinness record as the rarest mineral only a few crystals known until a new find in myanmar red beryl bixbite from a single mountain in utah grandidierite jeremejevite musgravite benitoite the state gem of california taaffeite alexandrite the rare colour change chrysoberyl',
      'among diamonds fancy red is the rarest colour a few dozen known followed by blue and pink rarity and value are not the same thing many extremely rare gems are too soft or too small to cut and have little market price',
    ],
    content: `There is no single answer, because "rarest" can mean fewest specimens known, fewest gem-quality crystals, or fewest that ever reach the market — and rarity is not the same as price. What is clear is that DIAMOND is not rare: it is one of the more common gem minerals, and its high, stable retail price reflects a century of marketing and historically tight control of supply, not scarcity. Genuinely rare gems, most found at only one or two places on Earth: PAINITE (a borate that for decades held the Guinness record as the world's rarest mineral — only two crystals were known until a deposit was found in Myanmar in the 2000s); RED BERYL / "bixbite" (gem-quality only from the Wah Wah Mountains of Utah, a few thousand cut stones ever); GRANDIDIERITE, JEREMEJEVITE, POUDRETTEITE, and MUSGRAVITE (each known from a handful of faceted stones); BENITOITE (the state gem of California, essentially one mine); TAAFFEITE (first identified from an already-cut stone in a jeweller's parcel); and ALEXANDRITE (the colour-change variety of chrysoberyl, green in daylight and red under incandescent light, the fine Russian material long exhausted). Among diamonds, fancy RED is the rarest colour — only a few dozen are known — ahead of blue and vivid pink. Many of the rarest minerals of all are never seen as gems because they are too soft, too small, or too unstable to cut.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gem-real-vs-fake',
    title: 'Telling a Real Gemstone from a Fake',
    category: 'Gemology',
    keywords: [
      'how do you tell a real gemstone from a fake', 'no single home test is reliable a proper identification uses several instruments a refractometer to read the refractive index a specific gravity measurement a polariscope for single vs double refraction and a spectroscope for absorption lines',
      'magnification is the most useful look for natural inclusions crystals healing fractures colour zoning versus the round gas bubbles swirl marks and mould lines of glass or the curved growth striae of some synthetics glass and paste also feel warmer and can show chips with conchoidal fractures',
      'a thermal and electrical conductivity probe separates diamond from moissanite from cubic zirconia do not rely on the scratch a steel file test many simulants sapphire cz moissanite also scratch steel when in doubt send it to a lab like gia for a report',
    ],
    content: `There is no one reliable kitchen-table test; gemmologists identify stones by combining several measurements. INSTRUMENTS: a refractometer reads the refractive index (each species has a characteristic value or range); a hydrostatic balance gives specific gravity (density); a polariscope shows whether the stone is singly refractive (diamond, spinel, garnet, glass) or doubly refractive (quartz, corundum, tourmaline); a dichroscope checks for pleochroism; a spectroscope reveals element-specific absorption lines (chromium in ruby and emerald, iron in sapphire). MAGNIFICATION (a 10× loupe or microscope) is often decisive: natural stones show natural inclusions — mineral crystals, "fingerprint" healed fractures, angular colour zoning, silk; imitation glass ("paste") shows round or elongated gas bubbles, swirl striae, and moulded facet edges, and it chips with curved conchoidal fractures; flame-fusion synthetic corundum shows curved growth lines and gas bubbles rather than the straight, angular growth of natural crystals. A thermal-plus-electrical conductivity probe distinguishes diamond, moissanite, and cubic zirconia from one another. Do NOT trust folk tests: the "it scratches steel so it's real" test fails because sapphire, moissanite, and even cubic zirconia all scratch a steel knife; the "fog test," "water test," and "breathe on it" tests are unreliable. Colour that looks too perfect, a suspiciously low price, and "too clean" clarity are warning signs. When it matters, submit the stone to a recognised laboratory (GIA, AGS, Gübelin, SSEF) for a report.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-gem-clarity-vs-cut',
    title: "A Gemstone's Clarity vs Its Cut",
    category: 'Gemology',
    keywords: [
      'what is the difference between a gemstones clarity and its cut', 'clarity describes how free the stone is of internal inclusions and surface blemishes it is a property of the rough crystal that nature produced graded from flawless down through very slightly included to included',
      'cut describes what the cutter did with that rough the shape the number and arrangement of facets and above all the proportions and angles and the quality of the polish and symmetry',
      'cut is the only one of the four cs entirely controlled by humans and it has the biggest effect on how lively a stone looks a well cut stone returns light as brilliance fire and sparkle a poorly cut one leaks light through the back and looks dull or dark no matter how good its clarity colour and carat are',
    ],
    content: `Clarity and cut are two separate things people often confuse. CLARITY is how free the finished gem is of internal features (inclusions — crystals, fractures, clouds, "silk") and external ones (blemishes — scratches, nicks, naturals). It is essentially a report card on the rough crystal nature grew: diamonds are graded Flawless, Internally Flawless, VVS1–2, VS1–2, SI1–2, and I1–3 by what is visible at 10× magnification; coloured stones are judged more loosely and by stone type (an "eye-clean" emerald still has a garden of inclusions). Clarity can be nudged by treatment (oiling, fracture filling) but not fundamentally created. CUT is what the cutter did with the rough: the shape (round, oval, emerald-cut, cushion...), the number and layout of facets, and — most importantly — the proportions and facet angles, plus the quality of the polish and the symmetry. Cut is the only one of the "4 Cs" that is entirely a human decision, and it has the largest single effect on beauty: a stone cut to the right angles returns light out of the top as brilliance (white light), fire (spectral colours), and scintillation (sparkle as it moves), while one cut too deep or too shallow leaks light out of the pavilion and looks dark or glassy, however good its clarity, colour, and carat weight.`,
    createdAt: Date.now(),
  },
];
