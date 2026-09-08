import { KnowledgeItem } from '../../types';

// Batch 128 (coffee, tea & wine) — a total gap. Wrong and web-dump answers on
// nexus-4b: "how does tea oxidize / what does oxidation do" -> "tea isn't
// actually oxidized, oxidation doesn't do anything to the tea"; "main wine
// grape varietals" -> a paragraph about the god Dionysus; "wine legs or tears"
// -> bios of Bobi Wine and Billie Eilish; "how does altitude affect coffee
// flavor" -> a discussion of the boiling point of water when BREWING at
// altitude; "espresso vs drip" -> a flat refusal. Web dumps: arabica vs
// robusta, roast level, decanting, champagne vs prosecco vs cava, crema,
// tea flush.
export const COFFEE_TEA_WINE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-ctw-tea-oxidation',
    title: 'How Tea Is Oxidized and What Oxidation Does',
    category: 'Food & Drink',
    keywords: [
      'how is tea oxidized and what does oxidation do', 'oxidation in tea happens before brewing during processing when leaves are bruised or rolled the cell walls rupture and enzymes polyphenol oxidase meet the leafs catechins and oxygen from the air',
      'over minutes to hours the catechins convert into larger molecules theaflavins and thearubigins turning the leaf from green to coppery to brown black and the flavor from fresh and vegetal to malty fruity and robust while changing astringency',
      'the maker controls the tea type by controlling oxidation kill the enzymes early with heat green let it run to completion black stop it partway oolong it is enzymatic not microbial fermentation',
    ],
    content: `Oxidation is the single most important process that determines what type of tea a leaf becomes, and it happens BEFORE brewing, during manufacture. When a fresh tea leaf is picked and then bruised, rolled, or torn, its cell walls break and an enzyme in the leaf (polyphenol oxidase) comes into contact with the leaf's catechins (a family of polyphenols) and with oxygen from the air. Over the next minutes to hours, that enzyme converts the small, pale, astringent catechins into larger molecules — theaflavins (bright and brisk) and thearubigins (dark and full) — which is exactly what turns a bruised leaf from green, to coppery-red at the edges, to uniform brown-black, and which transforms the taste from fresh, grassy, and vegetal into malty, fruity, dark, and robust, while smoothing out the sharp green astringency. The tea maker steers this: apply heat quickly (steaming or pan-firing) to kill the enzyme before it can act, and you get GREEN tea (essentially no oxidation); let the process run all the way, then dry, and you get BLACK tea (full oxidation); halt it partway with heat, and you get OOLONG (partial, 10–80%). This is enzymatic oxidation, not microbial fermentation — the common term "fermented tea" for black tea is a misnomer; only pu-erh is genuinely fermented by microbes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ctw-tea-types',
    title: 'Green vs Black vs White vs Oolong Tea',
    category: 'Food & Drink',
    keywords: [
      'what is the difference between green black white and oolong tea', 'all true tea is camellia sinensis the type is set by how the picked leaf is processed mainly how much it is oxidized enzymatic browning like a cut apple',
      'white just withered and dried barely handled minimal oxidation delicate sweet green heated quickly steamed or pan fired to kill the enzymes then rolled and dried grassy fresh no oxidation',
      'oolong partially oxidized 10 to 80 percent bruised and rolled huge range floral to roasty black fully oxidized about 100 percent malty robust dark pu-erh green tea then aged and microbially fermented earthy',
    ],
    content: `Green, black, white, and oolong tea all come from the same plant — Camellia sinensis. The differences are entirely in how the picked leaf is processed, and the key variable is OXIDATION (the enzymatic browning of the leaf, like a cut apple turning brown). WHITE tea is the least processed: the young buds and top leaves are simply withered in the air and dried, with very little handling, so oxidation is minimal — the flavour is pale, subtle, soft, and naturally sweet. GREEN tea is picked and then heated almost immediately (steamed, in Japan; pan-fired or roasted, in China) to destroy the oxidising enzymes, then rolled and dried — so it stays green and its flavour is fresh, grassy, marine, or nutty depending on the method. OOLONG is partially oxidised: the leaves are withered, then repeatedly shaken/bruised and rolled and rested to let oxidation build to somewhere between about 10% and 80%, then fixed with heat — this covers an enormous range, from pale, floral, green-leaning oolongs to dark, roasted, honeyed ones. BLACK tea (called "red tea" in China) is fully oxidised: withered, rolled to rupture the cells, left to oxidise completely, then dried — giving the dark colour and the malty, brisk, robust character. A fifth category, PU-ERH, starts as a rough green tea and is then genuinely fermented and aged by microbes over months to decades, developing deep, earthy, woody flavours.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ctw-arabica-robusta',
    title: 'Arabica vs Robusta Coffee',
    category: 'Food & Drink',
    keywords: [
      'what is the difference between arabica and robusta coffee', 'arabica about 60 to 70 percent of world production all specialty coffee grown at higher altitudes more delicate plant lower yield the bean has about 1.5 percent caffeine more sugars and lipids a sweeter more acidic more complex aromatic flavor fruit chocolate floral',
      'robusta coffea canephora about 30 to 40 percent grown low and hot hardy high yield cheaper about 2.7 percent caffeine nearly double less sugar more chlorogenic acids a stronger harsher more bitter rubbery woody peanutty taste heavier body more and thicker crema',
      'robusta is blended into espresso and used for instant coffee',
    ],
    content: `There are two commercially important coffee species. ARABICA (Coffea arabica) makes up roughly 60–70% of the world's coffee and essentially all specialty and premium coffee. The plant is fussy — it wants cool highland conditions (about 600–2000 m), yields less, and is prone to disease and frost. Its bean contains around 1.5% caffeine and comparatively more sugars and oils, which gives arabica a sweeter, brighter, more acidic, and more aromatically complex cup, with notes ranging over fruit, berry, chocolate, caramel, and floral. ROBUSTA (Coffea canephora) is about 30–40% of production. The plant is tough, tolerates heat and low altitude, resists pests, and yields heavily, so it is far cheaper. Its bean has roughly 2.7% caffeine — nearly double arabica — plus more chlorogenic acids and less sugar, producing a stronger, harsher, more bitter cup often described as rubbery, woody, grainy, or peanut-like, with a heavy body. Robusta also produces more and thicker crema on espresso, and it holds up to milk, so it is deliberately blended into espresso (traditional Italian espresso often contains 10–40% robusta) and is the standard for instant coffee and cheap commodity blends.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ctw-roast-level',
    title: 'What Coffee Roast Level (Light, Medium, Dark) Changes',
    category: 'Food & Drink',
    keywords: [
      'what does coffee roast level light medium dark actually change', 'roasting develops flavor via the maillard reaction and caramelization roast level is judged by bean color and internal temperature',
      'light roast stopped around first crack light brown dry surface retains the most origin character bright acidity fruit floral tea like higher density', 'medium medium brown balanced acidity and body caramel nutty chocolate origin character still present',
      'dark roast into or past second crack dark brown to nearly black oily surface origin flavors burned off replaced by roast flavors bittersweet smoky roasty heavy body low acidity more soluble dark has slightly less caffeine than light',
    ],
    content: `Roasting turns green coffee (which tastes grassy and unpleasant) into brown, aromatic coffee, mainly through the Maillard browning reaction and caramelization of the bean's sugars. Roasters track two "cracks" — audible pops as the beans expand: "first crack" around 196–205°C and "second crack" around 224–230°C. LIGHT roast is stopped at or just after first crack: the beans are light brown with a dry surface, dense and hard, and they keep the most of the bean's origin character — bright, sometimes sharp acidity, distinct fruit, berry, floral, or tea-like notes, and a lighter body. If under-roasted it tastes sour, grassy, or "green." MEDIUM roast (between the cracks) is medium brown, still dry-surfaced, and gives a balance of acidity and body with more caramel, toasted-nut, and milk-chocolate notes while retaining some origin flavour. DARK roast is taken into or past second crack: the beans are dark brown to nearly black with an oily sheen, the delicate origin flavours are burned away and replaced by roast-derived ones — bittersweet, smoky, "roasty," ashy at the extreme — with a heavy body and very low acidity. Dark-roasted coffee is more brittle and soluble, so it extracts faster. Note on caffeine: caffeine is fairly heat-stable, so light and dark roasts are close, but roasting does burn off a little, so a dark roast has marginally LESS caffeine by weight than a light one (the opposite of the common belief).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ctw-espresso-vs-drip',
    title: 'Espresso vs Drip (Filter) Coffee',
    category: 'Food & Drink',
    keywords: [
      'what is the difference between espresso and drip coffee and why', 'drip filter coffee hot water about 93 to 96 celsius passes through a bed of medium ground coffee by gravity over 3 to 5 minutes one pass a paper filter removes oils and fine sediment result is a clean light bodied larger drink moderate concentration',
      'espresso near boiling water is forced through a compacted puck of finely ground coffee at about 9 bar of pressure for 25 to 30 seconds produces a small 25 to 30 ml highly concentrated syrupy shot with emulsified oils and dissolved co2 forming the crema intense flavor and body',
      'per ml espresso has far more caffeine but a whole shot has less total caffeine than a mug of drip because it is so much smaller espresso is the base for cappuccino latte americano',
    ],
    content: `Drip and espresso are different brewing methods that produce very different drinks. DRIP / FILTER coffee: hot water (about 93–96°C) is poured over a bed of medium-ground coffee and drains through it under gravity in a single pass, taking roughly 3–5 minutes; a paper filter catches the oils and the finest particles. The result is a comparatively large drink (120–350 ml), clean and transparent in flavour, light to medium in body, with a moderate concentration — you can taste subtle origin and acidity notes. ESPRESSO: an espresso machine forces near-boiling water through a tightly compacted "puck" of very finely ground coffee at about 9 bars of pressure (about nine times atmospheric) for 25–35 seconds. This produces a tiny shot (25–30 ml) that is intensely concentrated and slightly syrupy, with the oils emulsified into the liquid and dissolved CO2 forming the "crema" foam on top. Espresso has a powerful flavour and heavy body. On caffeine: per millilitre espresso is far stronger, but because a whole shot is so small, one espresso (~63–80 mg) actually contains LESS total caffeine than a mug of drip coffee (~95–165 mg). Espresso is the base for milk drinks — cappuccino, latte, flat white, macchiato — and, diluted with hot water, for the americano.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ctw-wine-varietals',
    title: 'The Main Wine Grape Varieties and Their Character',
    category: 'Food & Drink',
    keywords: [
      'what are the main wine grape varietals and their character', 'reds cabernet sauvignon full bodied high tannin blackcurrant cedar tobacco ages well merlot softer plummy rounder pinot noir light bodied delicate red cherry earth mushroom thin skinned syrah shiraz dark peppery blackberry meaty',
      'sangiovese savory sour cherry chianti tempranillo rioja malbec zinfandel jammy grenache', 'whites chardonnay versatile apple to tropical often oaked buttery sauvignon blanc high acid grassy gooseberry citrus riesling high acid floral stone fruit bone dry to sweet ages superbly pinot grigio gewurztraminer lychee spice chenin blanc',
    ],
    content: `A handful of "international" grape varieties account for most of the wine sold, each with a recognizable character. RED grapes: CABERNET SAUVIGNON — full-bodied, firmly tannic, blackcurrant and cassis with cedar, tobacco, and green-pepper notes, ages for decades (Bordeaux left bank, Napa). MERLOT — softer, rounder, and less tannic, plum and black cherry, often blended with Cabernet. PINOT NOIR — light-bodied, pale, silky and delicate, red cherry, raspberry, forest floor, mushroom; thin-skinned and site-sensitive (Burgundy). SYRAH / SHIRAZ — dark and full, black fruit, black pepper, smoked meat, licorice. SANGIOVESE — savoury, high-acid, sour cherry and dried herb (Chianti). TEMPRANILLO — leather, cherry, tobacco (Rioja). MALBEC — plush, inky, plummy (Argentina). ZINFANDEL — jammy, high-alcohol, brambly. GRENACHE, NEBBIOLO (Barolo — tar and roses, ferocious tannin), GAMAY (Beaujolais — light and fruity). WHITE grapes: CHARDONNAY — the chameleon, from lean and mineral (Chablis) to ripe, oaky, and buttery (California), apple to tropical fruit. SAUVIGNON BLANC — zingy acidity, grass, gooseberry, grapefruit, passionfruit (Loire, Marlborough NZ). RIESLING — piercing acidity, lime, green apple, stone fruit, floral and petrol with age, made bone-dry to intensely sweet, and one of the longest-lived whites (Germany, Alsace). PINOT GRIGIO / GRIS, GEWÜRZTRAMINER (lychee, rose, ginger), CHENIN BLANC, VIOGNIER (peach, honeysuckle), and ALBARIÑO. (Dionysus / Bacchus is the god of wine, not a grape.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ctw-wine-legs',
    title: 'What "Legs" or "Tears" on a Wine Glass Mean',
    category: 'Food & Drink',
    keywords: [
      'what does it mean when wine has legs or tears', 'legs also tears or church windows are the streams of liquid that run back down the inside of the glass after you swirl the wine',
      'caused by the marangoni effect alcohol evaporates faster than water and has lower surface tension so a thin film of wine climbs the glass the alcohol evaporates the remaining higher surface tension liquid beads up and being denser drips back down',
      'slow thick numerous legs indicate a wine higher in alcohol or sugar more viscous not higher quality the belief that legs signal a great wine is a myth',
    ],
    content: `"Legs" (also called "tears" or "church windows") are the rivulets of liquid that form on the inside of a wine glass and run slowly back down after you swirl the wine and let it settle. They are a physics phenomenon called the Marangoni effect, driven by the difference between alcohol and water. When wine coats the side of the glass, alcohol evaporates from that thin film faster than water does (it's more volatile) and it also has a lower surface tension. The evaporation leaves behind liquid that is more watery, has higher surface tension, and is slightly denser; higher surface tension pulls this liquid up the glass into a rising film, then it collects into beads and droplets that, being heavier, slide back down as "legs." Prominent, slow, oily-looking legs mean the wine is relatively high in alcohol and/or residual sugar — that is, more viscous. They tell you nothing reliable about quality: the old idea that "good legs" indicate a fine wine is a myth (glass shape, cleanliness, humidity, and temperature all affect them too). What legs genuinely hint at is body and alcohol level. (This has nothing to do with the musicians Bobi Wine or Billie Eilish.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ctw-sparkling-wine',
    title: 'Champagne vs Prosecco vs Cava',
    category: 'Food & Drink',
    keywords: [
      'what is the difference between champagne prosecco and cava', 'three sparkling wines that differ by region grape and method champagne only from the champagne region of northeast france chardonnay pinot noir pinot meunier made by the traditional method second fermentation inside the individual bottle plus extended aging on the dead yeast lees giving bready brioche toasty notes fine persistent bubbles',
      'cava spanish mostly catalonia native grapes macabeo xarel-lo parellada plus chardonnay pinot same traditional bottle method as champagne also toasty but cheaper and fruitier earthier',
      'prosecco italian veneto the glera grape tank method charmat second fermentation in a large pressurized tank fruitier floral off dry softer frothier bubbles no bready character',
    ],
    content: `All three are sparkling wines, and they differ by where they're from, which grapes they use, and — most importantly — how the bubbles are made. CHAMPAGNE comes only from the Champagne region in northeastern France, made from Chardonnay, Pinot Noir, and Pinot Meunier. It is made by the "traditional method" (méthode champenoise): a still base wine is bottled with a little yeast and sugar, undergoes a SECOND fermentation inside that individual bottle (trapping the CO2), and is then aged for months to years on the spent yeast ("lees"), which gives Champagne its hallmark toasty, brioche, biscuit, and hazelnut notes on top of citrus and apple, plus very fine, long-lasting bubbles. It is the most expensive and complex. CAVA is the Spanish equivalent, made mostly in Catalonia from local grapes (Macabeo, Xarel·lo, Parellada) sometimes with Chardonnay and Pinot Noir, using the SAME traditional in-bottle second fermentation and lees ageing — so it also has toasty, nutty character, but it is generally cheaper and tends to be earthier and more citrus-and-quince in flavour. PROSECCO is Italian, from the Veneto and Friuli, made from the Glera grape by the "tank method" (Charmat/Martinotti): the second fermentation happens in a big sealed pressurised steel tank and the wine is then bottled under pressure. This is faster and cheaper and produces a fruitier, floral, often slightly sweet wine (green apple, pear, honeysuckle) with softer, frothier, shorter-lived bubbles and no bready/yeasty character.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ctw-decanting',
    title: 'Decanting and Aerating Wine',
    category: 'Food & Drink',
    keywords: [
      'what is decanting and aerating wine and why do it', 'decanting is pouring wine from its bottle into a separate vessel a decanter two reasons to separate the clear wine from the sediment that older reds throw and to aerate expose the wine to oxygen',
      'aeration softens harsh tannins blows off unpleasant reductive sulfur smells and opens up the aromatics making a young tannic red more approachable young tight wines benefit from an hour or more of air',
      'very old fragile wines can fall apart with too much air and are decanted only briefly right before serving just for the sediment swirling in the glass also aerates',
    ],
    content: `DECANTING is simply pouring wine out of its bottle into a separate open-topped vessel (a decanter or even a clean jug) before serving. There are two distinct reasons to do it. (1) To remove SEDIMENT: older red wines, and unfiltered wines, throw a deposit of tannin and colour pigments that settle at the bottom of the bottle; you stand the bottle upright for a day, then pour slowly and steadily into the decanter, watching the shoulder or neck against a light, and stop the moment the cloudy sediment reaches the neck — so the clear wine ends up in the decanter and the gritty dregs stay in the bottle. (2) To AERATE: exposing wine to a large surface area of air lets oxygen soften aggressively tight tannins, drives off "reductive" off-smells (a struck-match or rotten-egg whiff from bound sulfur compounds), and lets the closed-up aromatics of a young wine "open up" and become expressive. Young, tannic, powerful reds can benefit from one to several hours in a decanter; robust whites and some orange wines benefit too. The exception is very old, delicate wines: their fragile aromatics can dissipate within minutes of contact with air, so they are decanted only for the sediment and only right before pouring. Swirling wine in the glass, or using a pour-through aerator, achieves a quick version of the same effect.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ctw-crema',
    title: 'What the Crema on an Espresso Is',
    category: 'Food & Drink',
    keywords: [
      'what is the crema on an espresso', 'the layer of reddish brown foam that sits on top of a freshly pulled espresso shot',
      'it forms because the roughly 9 bar of pressure forces co2 still trapped in the beans from roasting and coffee oils into an emulsion with the water as the pressure drops at the cup the dissolved gas comes out as tiny bubbles stabilized by the oils and melanoidins creating a persistent mousse',
      'good crema is a sign of fresh beans and a well dialed shot it carries aroma and some bitterness thicker with robusta and darker roasts not a reliable indicator of quality on its own it dissipates within a couple of minutes',
    ],
    content: `Crema is the layer of dense, reddish-brown to hazelnut foam that sits on top of a freshly pulled espresso shot. It forms during extraction: the espresso machine's roughly 9 bar of pressure dissolves large amounts of CO2 — gas still trapped inside the coffee from roasting — into the hot water, and also emulsifies the coffee's oils. When the pressurised liquid emerges into the cup at normal atmospheric pressure, that dissolved CO2 rushes out of solution as a mass of tiny bubbles, and those bubbles are held stable by the emulsified oils and by melanoidins (brown Maillard-reaction compounds) and fine coffee particles, producing a thick, persistent mousse. A good, even, tiger-striped crema is usually a sign of fresh beans (stale coffee has released most of its CO2 and gives thin, pale crema) and a well-dialled-in grind and dose. The crema carries a lot of the shot's aroma and contributes a slight bitterness and body. However, it is NOT a stand-alone quality indicator — robusta beans and very dark roasts naturally produce a thick crema regardless of quality, and some excellent light-roast espressos have modest crema. It thins and dissolves back into the drink within a couple of minutes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ctw-altitude-coffee',
    title: 'How Growing Altitude Affects Coffee Flavor',
    category: 'Food & Drink',
    keywords: [
      'how does altitude affect coffee flavor', 'coffee grown at high altitude typically 1200 to 2200 metres for arabica develops more prized complex acidic flavors',
      'cooler temperatures at elevation slow the cherrys maturation so the bean has more time to develop sugars and aromatic precursors and grows denser and harder hard bean strictly high grown the greater day night temperature swing concentrates acids and sugars',
      'high grown coffee tends to be brighter more acidic more floral fruity and complex low grown coffee is milder softer nuttier and lower in acidity bags are often labeled with the farms altitude',
    ],
    content: `The altitude a coffee is GROWN at (not brewed at) has a big effect on its flavour. Arabica for specialty coffee is typically grown between about 1,200 and 2,200 metres. At higher elevations the air is cooler, which slows down the ripening of the coffee cherry, so the seed inside spends longer developing sugars, acids, and the precursor compounds that become aroma during roasting. The cool nights and warm days (a larger diurnal temperature swing at altitude) further concentrate those sugars and organic acids. And the slower growth produces a physically denser, harder bean — which is why high-grown coffees are graded and sold as "Strictly Hard Bean" (SHB) or "Strictly High Grown" (SHG). The upshot: high-altitude coffee tends to have brighter, crisper acidity and more complex, floral, fruity, wine-like flavours; lower-grown coffee ripens fast, develops less complexity, and tastes milder, softer, nuttier, chocolatey, and lower in acidity. This is why bags of specialty coffee proudly print the farm's elevation (e.g. "1,850–2,000 masl") as a shorthand for expected quality and acidity. (Altitude also matters when BREWING — water boils cooler where the pressure is lower, which affects extraction — but that is a separate issue from growing altitude.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ctw-tea-flush',
    title: 'What a Tea Flush Is and Why First Flush Is Prized',
    category: 'Food & Drink',
    keywords: [
      'what is a tea flush and why is first flush prized', 'a flush is a harvest of new tea shoots the tea bush pushes out fresh growth several times a year and each round is a flush',
      'first flush is the first plucking of the spring after the plants winter dormancy of the tender new buds and top two leaves prized in darjeeling in japan as shincha and chinese pre qingming greens because the slow winter and cool spring concentrate flavor and aromatics into that first tender growth a lighter more delicate floral aromatic complex tea',
      'the crop is small and fleeting so it commands premium prices second flush early summer is fuller bodied muscatel later flushes coarser',
    ],
    content: `A tea plant does not grow continuously — it pushes out fresh shoots of new leaves in bursts several times over the growing season, and each burst is called a "flush." The FIRST FLUSH is the very first plucking of the year, taken in early spring after the bush has been dormant through the cold months; only the tenderest new buds and top two leaves are picked. First-flush tea is highly prized in several traditions — the spring "first flush" Darjeeling from India, Japanese "shincha" (the first green tea of the year), and Chinese green teas picked before the Qingming festival ("pre-rain" / Ming Qian teas). The reason: over the slow, cold winter and cool early spring, the plant builds up amino acids (especially L-theanine, which tastes sweet and umami), aromatic oils, and flavour compounds in its roots and stored reserves, and it pours all of that into the first small, tender growth. The result is a lighter-bodied but exceptionally delicate, aromatic, floral, and complex tea. Because the crop is tiny and the window is only a couple of weeks, first-flush teas fetch the highest prices. Later harvests — the SECOND FLUSH (early summer, fuller-bodied, "muscatel" in Darjeeling), monsoon flush, and autumn flush — are progressively more abundant, more robust, and cheaper.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ctw-red-white-malo-matcha',
    title: 'Red vs White Winemaking, Malolactic Fermentation, and Matcha',
    category: 'Food & Drink',
    keywords: [
      'what is the difference between a red and a white wine in how they are made and malolactic fermentation and matcha',
      'red wine ferment the juice with the crushed skins seeds and sometimes stems which extracts colour and tannin white wine press the grapes first and ferment the clear juice alone so no colour or tannin the colour is only in the skins you can make a white wine from red grapes most champagne is',
      'malolactic fermentation lactic acid bacteria oenococcus oeni convert sharp malic acid into softer lactic acid making the wine rounder and can add a buttery diacetyl note used in nearly all reds and oaked chardonnay blocked in crisp whites like riesling and sauvignon blanc',
      'matcha shade grown green tea leaves stems and veins removed stone ground to a fine powder whisked into water so you drink the whole leaf more caffeine and l-theanine umami and a calm alert effect',
    ],
    content: `RED vs WHITE WINEMAKING: the colour and tannin of red wine come from the grape SKINS, so red wine is made by fermenting the juice in contact with the crushed skins (and seeds, and sometimes stems), which leaches out anthocyanin pigments and tannins over days to weeks. White wine is made by pressing the grapes first and fermenting only the clear juice, with no skin contact, so it stays pale and low in tannin. Because the juice of almost all grapes is colourless, you can make a white wine from red ("black") grapes — most Champagne is made from the red grapes Pinot Noir and Pinot Meunier. Rosé is made with a short skin contact of a few hours. Reds are usually fermented warmer (for extraction) and go through malolactic; whites are fermented cool to keep fruit and acidity. MALOLACTIC FERMENTATION ("malo," MLF) is not really a fermentation — it is a conversion by the bacterium Oenococcus oeni that turns the wine's sharp, green-apple malic acid into softer, creamier lactic acid, lowering total acidity and making the wine rounder and more stable; it also produces diacetyl, the compound behind the "buttery" note in oak-aged Chardonnay. Nearly all red wine goes through MLF; it is deliberately prevented (with cold, sulfur, and filtration) in crisp, zesty whites like Riesling, Sauvignon Blanc, and most Pinot Grigio to keep their bright acidity. MATCHA is powdered green tea: the tea bushes are shaded for about three weeks before harvest (which boosts chlorophyll for a vivid green colour and L-theanine for umami sweetness and a "calm alert" feeling), the best leaves are steamed, dried, and destemmed/deveined ("tencha"), then stone-ground into an ultrafine powder. Instead of steeping and discarding leaves, you whisk the powder directly into hot water and drink the whole leaf — so you get more of everything, including caffeine, antioxidants, and L-theanine, and a much more intense, concentrated, grassy-sweet flavour than steeped green tea.`,
    createdAt: Date.now(),
  },
];
