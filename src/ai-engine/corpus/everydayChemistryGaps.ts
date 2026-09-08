import { KnowledgeItem } from '../../types';

// Batch 55 (everyday chemistry) gap-fills. Live misses on nexus-4b:
// "chemistry of a candle flame" -> "same thing as fireworks, metal salts... one
// candle lighting another, causal continuation" (firework + Buddhist-rebirth
// bleed); "why does copper turn green" -> "because barium compounds produce
// green firework colors"; "why does hydrogen peroxide bubble on a cut" -> "it's
// got enzymes in it" (the enzyme is in your cells); "why does bleach remove
// colour" -> "the triangle symbol on the care label means bleach is okay";
// "baking soda and vinegar" -> "baking soda is alkaline, has a bunch of
// hydrogen ions" (backwards); "why does an ice pack get cold" -> only the
// frozen-gel case; "why does salt melt ice" -> cut-off dump.
export const EVERYDAY_CHEMISTRY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-candle-flame',
    title: 'The Chemistry of a Candle Flame',
    category: 'Chemistry',
    keywords: [
      'what is the chemistry of a candle flame', 'how does a candle burn', 'why is a candle flame yellow',
      'what is the wick for', 'why is the bottom of a flame blue', 'what does a candle turn into',
      'is a candle flame plasma',
    ],
    content: `A candle burns in a self-sustaining cycle. The flame's heat MELTS the solid wax at the top of the candle; the wick draws that liquid wax upward by capillary action (like a paper towel soaking up water); near the flame the heat VAPORISES the liquid wax into a gas. That wax vapour — a hydrocarbon — then reacts with oxygen from the air (combustion), producing carbon dioxide, water vapour, and a lot of heat and light, and that heat keeps the cycle going. The colours: the faint BLUE at the very base is where oxygen is plentiful and combustion is most complete. The bright YELLOW-orange bulk of the flame is glowing soot — tiny specks of unburned carbon heated white-hot; most of them burn up before they leave the top of the flame, but if the flame is starved of air they escape as visible smoke. A candle flame is mostly hot glowing gas, not plasma. (It has nothing to do with fireworks or metal salts.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-copper-green',
    title: 'Why Copper Turns Green',
    category: 'Chemistry',
    keywords: [
      'why does copper turn green', 'what is copper patina', 'why is the statue of liberty green', 'verdigris',
      'does copper rust', 'what causes the green coating on old pennies and pipes', 'is copper patina bad',
    ],
    content: `Copper turns green because it slowly reacts with substances in the air. First it forms a dark brown-black layer of copper oxide. Then, over years, that reacts further with moisture, carbon dioxide, and sulfur compounds (from air pollution) or chloride (near the sea) to build up a green coating of copper carbonate, sulfate and chloride compounds — collectively called "patina" or "verdigris." The Statue of Liberty, originally shiny reddish-brown copper, took about 30 years to turn fully green after 1886. Unlike iron rust, which flakes off and lets corrosion eat deeper, copper patina is stable and tightly bonded, so it actually PROTECTS the metal underneath — which is why copper roofs and church domes last for centuries. (This is not caused by barium or anything to do with fireworks.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-peroxide-bubbles-cut',
    title: 'Why Hydrogen Peroxide Bubbles on a Cut',
    category: 'Chemistry',
    keywords: [
      'why does hydrogen peroxide bubble on a cut', 'why does peroxide foam on a wound', 'what is catalase',
      'why does peroxide not bubble on intact skin', 'should you use hydrogen peroxide on wounds',
      'what gas does hydrogen peroxide release',
    ],
    content: `Hydrogen peroxide (H2O2) is an unstable molecule — it "wants" to break down into water (H2O) and oxygen gas (O2). On its own in the bottle it does this only slowly. But your blood and body tissue cells contain an enzyme called CATALASE (as do most living things — it protects cells from peroxide made during normal metabolism), and catalase is an extremely fast catalyst for that breakdown: one catalase molecule can split millions of H2O2 molecules per second. So when hydrogen peroxide touches a cut — where cells are broken open and blood is exposed — the catalase there flings it apart into water and a rush of oxygen bubbles, which is the white foaming you see. It doesn't bubble on intact skin because the catalase is inside the cells, not on the surface. The enzyme is NOT in the peroxide bottle. (Note: modern wound-care advice is to skip peroxide on cuts — the oxidation also damages healthy tissue and slows healing; clean water or saline is better.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-bleach-removes-colour',
    title: 'Why Bleach Removes Colour From Fabric',
    category: 'Chemistry',
    keywords: [
      'why does bleach remove color from clothes', 'how does bleach whiten', 'what is a chromophore', 'chlorine bleach vs oxygen bleach',
      'why does bleach turn things white', 'does bleach destroy the dye', 'how does stain removal work',
    ],
    content: `Colour in a dye or stain comes from part of the molecule called a "chromophore" — a region with a chain of alternating double bonds (a "conjugated" system) that absorbs particular wavelengths of visible light; the light it doesn't absorb is the colour you see. Bleach works by OXIDATION: it attacks and breaks those double bonds, disrupting the chromophore so the molecule no longer absorbs visible light and therefore looks colourless/white. The dye molecule is usually still on the fabric — it's just been chemically "switched off." Chlorine bleach (sodium hypochlorite) is a strong oxidiser that also disinfects and can weaken fabric fibres and yellow some materials over time. "Colour-safe" or "oxygen" bleach (hydrogen peroxide or sodium percarbonate) is a gentler oxidiser that targets many stain chromophores while leaving most clothing dyes intact. Enzyme and surfactant cleaners remove stains a different way — by digesting or lifting the stain material rather than decolourising it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-baking-soda-vinegar',
    title: 'Why Baking Soda and Vinegar Fizz',
    category: 'Chemistry',
    keywords: [
      'why does baking soda and vinegar fizz', 'acid base reaction baking soda', 'what gas is made by baking soda and vinegar',
      'is baking soda an acid or a base', 'sodium acetate baking soda vinegar', 'why do acids and bases react',
    ],
    content: `It's an acid–base reaction. Vinegar is a dilute solution of acetic acid — an ACID, meaning it readily donates hydrogen ions (H⁺). Baking soda is sodium bicarbonate — a BASE, meaning it accepts hydrogen ions (bases have relatively FEW free H⁺ ions and mop up more; it's acids that have the extra H⁺). When you mix them, the acetic acid gives its H⁺ to the bicarbonate, producing carbonic acid (H2CO3), which is unstable and immediately falls apart into water and carbon dioxide gas — plus sodium acetate left dissolved in the liquid. Overall: CH3COOH + NaHCO3 → CH3COONa + H2O + CO2. The fizzing foam is the CO2 gas bubbling out. It feels slightly cold because the reaction absorbs a little heat. As a cleaner it's mostly mechanical (the bubbling loosens debris) — and once they've reacted, the acid and base have neutralised each other, so the leftover liquid is nearly plain salty water.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-salt-melts-ice',
    title: 'Why Salt Melts Ice',
    category: 'Chemistry',
    keywords: [
      'why does salt melt ice', 'how does road salt work', 'freezing point depression', 'why does salt water freeze at a lower temperature',
      'at what temperature does road salt stop working', 'why do they salt roads before it snows', 'is salt endothermic on ice',
    ],
    content: `Even at temperatures below 0 °C, an ice surface has a microscopically thin film of liquid water, with molecules constantly leaving the ice (melting) and rejoining it (freezing) at equal rates. When you add salt, it dissolves into that liquid film, and the dissolved ions get in the way of water molecules trying to re-attach to the ice crystal — so freezing slows down while melting continues, and the ice melts. Put another way, salt water has a lower freezing point than pure water ("freezing-point depression," a "colligative" property that depends on how many dissolved particles there are, not what they are), so ice that was stable at, say, −4 °C now finds itself above its new melting point and turns to liquid. This is why roads are salted. It has limits: ordinary rock salt (sodium chloride) stops being effective below about −10 °C, and calcium chloride is used for colder conditions. Salt melting ice does also make the mixture noticeably colder, because melting absorbs heat — the trick behind old hand-cranked ice-cream makers.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ice-pack-cold',
    title: 'Why an Ice Pack Gets Cold',
    category: 'Chemistry',
    keywords: [
      'why does an ice pack get cold', 'how does an instant cold pack work', 'endothermic reaction cold pack',
      'ammonium nitrate cold pack', 'difference between a gel ice pack and an instant cold pack', 'why does dissolving salt get cold',
    ],
    content: `There are two kinds. A reusable GEL ice pack was simply frozen in a freezer; it feels cold and stays cold for a while because it's absorbing heat from your skin as its contents slowly warm up (and the gel resists melting into a runny mess). An INSTANT ("snap" or "squeeze") cold pack works by chemistry: inside are a pouch of water and a separate compartment of a salt — usually ammonium nitrate or urea. When you squeeze the pack, the inner barrier breaks and the salt dissolves in the water. Dissolving those particular salts is strongly ENDOTHERMIC — pulling apart the salt crystal takes more energy than is released when the ions are surrounded by water, and that energy is drawn as heat OUT of the surroundings (the pack, your skin, the injury). So the pack gets cold from the reaction itself, no freezer needed, dropping to around 0–5 °C for 15–30 minutes. Hand-warmer packs are the reverse — they use a substance whose crystallisation or oxidation RELEASES heat.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-baking-a-cake',
    title: 'The Chemistry of Baking a Cake',
    category: 'Chemistry',
    keywords: [
      'what is the chemistry of baking a cake', 'how does a cake rise', 'why do you cream butter and sugar', 'what do eggs do in baking',
      'baking soda vs baking powder in cake', 'why does a cake set', 'why does a cake go brown on top',
    ],
    content: `Baking a cake is a sequence of chemical and physical changes triggered by heat. (1) Creaming butter and sugar beats tiny air bubbles into the fat — the seeds of the cake's texture. (2) Leavening: baking soda (needs an acidic ingredient like buttermilk, cocoa or brown sugar) or baking powder (contains its own acid) reacts to release carbon dioxide gas, which inflates the existing air bubbles; some rise also comes from steam and, in whisked sponges, from beaten egg. (3) As the batter heats past ~40–70 °C, egg and gluten proteins unfold and link together (coagulate), and the flour's starch granules swell and gelatinise, turning the runny batter into a solid, elastic foam that traps the gas — this is what "sets" the cake. (4) On the surface, where it's driest and hottest, sugars caramelise and sugars-plus-proteins undergo the Maillard reaction, giving the golden-brown crust and much of the flavour and aroma. Getting the ratios of flour, sugar, fat, egg and liquid right is what balances tenderness, structure, moisture and rise.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-pool-chlorine',
    title: 'How Chlorine Keeps a Pool Clean',
    category: 'Chemistry',
    keywords: [
      'why does chlorine keep pools clean', 'how does pool chlorine work', 'what is hypochlorous acid', 'what are chloramines',
      'why does a pool smell like chlorine', 'what does shocking a pool do', 'free chlorine vs combined chlorine',
    ],
    content: `When you add chlorine to pool water (as a gas, hypochlorite, or a tablet of trichlor), it forms hypochlorous acid (HOCl) — this is the active disinfectant ("free chlorine"). HOCl is small and uncharged, so it slips through the outer membranes of bacteria, algae and viruses and oxidises the proteins and enzymes inside, killing them. The catch: HOCl also reacts with ammonia and nitrogen compounds that swimmers bring in (sweat, urine, skin cells) to form CHLORAMINES ("combined chlorine"). Chloramines are much weaker disinfectants, and they're what actually causes the harsh "chlorine smell," red stinging eyes and irritated skin — signs of a pool that needs attention, not a clean one. "Shocking" the pool means adding a large dose of chlorine (or a non-chlorine oxidiser) to burn through the built-up chloramines and free up the chlorine again. Chlorine is also steadily destroyed by sunlight, so outdoor pools use a stabiliser (cyanuric acid) and need topping up.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-soap-cleans',
    title: 'What Soap Is and How It Cleans',
    category: 'Chemistry',
    keywords: [
      'what is soap and how does it clean', 'how does soap remove dirt', 'what is a micelle', 'why does soap need water',
      'what is soap made of', 'saponification', 'hydrophobic and hydrophilic soap molecule',
    ],
    content: `Soap is made by "saponification" — reacting fats or oils with a strong alkali (lye: sodium or potassium hydroxide), which splits the fat into glycerine and soap molecules. Each soap molecule has two ends with opposite personalities: a long "tail" that is hydrophobic (repels water, sticks to oil and grease) and a charged "head" that is hydrophilic (loves water). Most everyday dirt — skin oils, food grease, and the grime that clings to them — is oily, and plain water can't lift it because oil and water don't mix. When you work up a lather, the soap tails bury themselves in the grease while the heads face outward into the water, breaking the grease into tiny droplets each wrapped in a ball of soap molecules called a "micelle." The water-loving outsides of the micelles let the whole package be suspended in the rinse water and washed away, taking the trapped dirt (and many microbes) with it. Detergents work the same way with synthetic versions of these molecules ("surfactants") that also work in hard water.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hard-water',
    title: 'What Hard Water Is and Why It Leaves Deposits',
    category: 'Chemistry',
    keywords: [
      'what is hard water and why does it leave deposits', 'what causes limescale', 'why does my kettle get chalky',
      'calcium and magnesium in water', 'temporary vs permanent hardness', 'why does hard water make soap scum',
      'how does a water softener work',
    ],
    content: `Hard water is water that contains a lot of dissolved calcium and magnesium ions, picked up as rain and groundwater seep through limestone and chalk (calcium carbonate) or gypsum. The white chalky crust ("limescale") appears mainly when hard water is HEATED or left to evaporate: much of the hardness is in the form of dissolved calcium bicarbonate, and heating drives off carbon dioxide and turns it back into solid, insoluble calcium carbonate, which coats kettle elements, boilers, pipes and taps and can clog them and waste energy. This is called "temporary hardness" because boiling removes it (as scale); hardness from calcium sulfate is "permanent" and stays through boiling. Hard water also reacts with soap to make an insoluble grey "soap scum," so you need more soap and get less lather. Water softeners fix it by swapping the calcium and magnesium ions for sodium ions on a resin bed, then flushing the resin with brine.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-milk-sour',
    title: 'Why Milk Goes Sour',
    category: 'Chemistry',
    keywords: [
      'why does milk go sour', 'why does milk curdle when it goes off', 'what is lactic acid fermentation',
      'why does refrigeration keep milk fresh', 'what is the difference between sour and spoiled milk', 'why does uht milk last longer',
    ],
    content: `Milk contains a sugar called lactose. Bacteria naturally present in milk (mostly lactic-acid bacteria like Lactobacillus) feed on the lactose and ferment it into LACTIC ACID. As the acid builds up, the milk first tastes sour, and then, as the pH drops far enough (below about 4.6), the milk's main protein, casein, which is normally held apart by its electric charge, loses that charge and clumps together — the milk "curdles" into solid curds and watery whey (the same chemistry deliberately used to make cheese, yoghurt and buttermilk). Warmth speeds the bacteria up, which is why refrigeration keeps milk fresh for a week or two rather than a day. Pasteurisation kills most of the bacteria at the start, extending shelf life; UHT ("long-life") milk is heated much hotter to sterilise it, so it keeps unopened for months. Note "sour" (acid-fermented) is different from "spoiled" by other microbes, which can smell rotten or bitter and may be unsafe.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-burning-wood',
    title: 'What Happens Chemically When You Burn Wood',
    category: 'Chemistry',
    keywords: [
      'what happens when you burn wood', 'chemistry of a wood fire', 'what is pyrolysis', 'why does wood produce smoke',
      'what is charcoal made of', 'why does a fire have flames then embers', 'what does wood turn into when it burns',
    ],
    content: `Wood is mostly cellulose and lignin — large molecules made of carbon, hydrogen and oxygen. Burning it happens in stages. First, heat drives off the water in the wood (you can see steam and hear hissing). Then, at higher temperature, "pyrolysis" begins: the wood decomposes without needing oxygen, releasing a mix of flammable gases and vapours (methane, hydrogen, tars, volatile organic compounds). Those gases mix with air and ignite above the wood — that's the visible FLAMES, and complete burning of them yields carbon dioxide and water vapour plus heat and light. What's left behind is mostly pure carbon — charcoal — which then glows and burns directly with oxygen at the surface (the red EMBERS), leaving only mineral ash. If there isn't enough oxygen or heat, the pyrolysis gases and unburned carbon particles escape as SMOKE and soot, along with toxic carbon monoxide. Overall, burning wood releases the solar energy the tree stored by photosynthesis, and returns its carbon to the air as CO2.`,
    createdAt: Date.now(),
  },
];
