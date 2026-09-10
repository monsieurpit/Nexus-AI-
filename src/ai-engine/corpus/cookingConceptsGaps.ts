import { KnowledgeItem } from '../../types';

/**
 * COOKING_CONCEPTS_GAPS — batch 223 corrections.
 * Homonym / wrong-domain misses: "chef vs cook" -> active/passive voice,
 * "stock vs broth" -> company shares, "reduction vs glaze" -> yapping +
 * freezing rain + emissions, "mincing vs dicing" -> a Wikipedia dump. Plus
 * factual errors: brown sugar is "caramelized", a latte is "espresso + hot
 * water", whipping cream involves "folding in egg whites", dark chocolate is
 * "past its best".
 */
export const COOKING_CONCEPTS_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-cook-chef-vs-cook',
    title: 'Chef vs cook',
    category: 'food',
    keywords: [
      'difference between a chef and a cook', 'chef vs cook', 'trained kitchen professional',
      'runs the kitchen', 'menu and creativity', 'follows recipes and instructions', 'brigade system',
      'not active versus passive voice', 'sous chef line cook',
    ],
    content: `This is about kitchen roles, not grammar (active vs passive voice).

A cook prepares food, usually by following established recipes and instructions. Cooks can be highly skilled (a line cook running a hot station in a busy restaurant is very good at their job), but the role is executing dishes as designed rather than designing them. Home cooking, diner cooks, and prep cooks fall here.

A chef ("chef de cuisine" means "head of the kitchen") is the professional who runs a kitchen: creating and costing the menu, developing recipes, setting the standards, ordering and managing food, and directing and training the staff. It usually implies formal culinary training or a long apprenticeship. In the classic "brigade" system there is an executive chef at the top, then a sous chef (second in command), then "chefs de partie" who each run a section (sauce, fish, pastry, grill).

Short version: every chef can cook, but a chef leads the kitchen and owns the food; a cook produces the food. "Chef" is a rank and a job, not just a fancy word for someone who cooks.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-stock-vs-broth',
    title: 'Stock vs broth (cooking)',
    category: 'food',
    keywords: [
      'difference between stock and broth', 'stock vs broth cooking', 'simmered bones versus meat',
      'gelatin body', 'seasoned to drink', 'unseasoned base', 'bone broth', 'not company stock or shares',
      'roasted bones', 'mirepoix',
    ],
    content: `This is the kitchen liquid, not a share of a company.

Stock is made primarily from BONES (with some meat scraps, and aromatic vegetables — "mirepoix" of onion, carrot, celery — plus herbs), simmered gently for a long time (chicken 3-4 hours, beef/veal 6-8+). The long extraction of collagen from the bones gives stock BODY: it turns to jelly when cold. Stock is usually left UNSEASONED (no or little salt) because it is a building block for sauces, soups, braises and risottos that will be reduced and seasoned later.

Broth is made primarily from MEAT (and often some bones), simmered for a shorter time (1-2 hours), and is SEASONED so it is pleasant to drink on its own. It is lighter in body and richer in immediate savoury flavour, but it does not gel as firmly. Chicken noodle soup, consomme and a bowl of pho broth start here.

In everyday use and on supermarket labels the two words are used almost interchangeably. "Bone broth" is essentially a long-simmered, seasoned stock marketed as a health drink.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-reduction-vs-glaze',
    title: 'Reduction vs glaze (cooking)',
    category: 'food',
    keywords: [
      'difference between a reduction and a glaze', 'reduction vs glaze cooking', 'simmering to concentrate',
      'thick syrupy coating', 'balsamic reduction', 'meat glaze glace de viande', 'brushing on a shiny finish',
      'not freezing rain or emissions', 'nappe consistency',
    ],
    content: `Both come from cooking down a liquid; this is not about freezing rain ("glaze ice") or emissions reduction.

A reduction is any liquid — stock, wine, cream, vinegar, fruit juice, a pan sauce — that has been simmered so that water evaporates and the flavour, sugars and body concentrate. You reduce a sauce "by half" or "until it coats the back of a spoon" (nappe consistency). A "balsamic reduction" is balsamic vinegar simmered until syrupy. Reduction is the general technique for intensifying and thickening a sauce without flour or starch.

A glaze is a thin, glossy coating brushed or spooned onto food to add shine, flavour and sometimes a bit of sweetness or lacquer. Examples: a sugar or honey glaze on ham or carrots, an egg wash "glaze" on pastry for browning, an apricot-jam glaze on a fruit tart, a soy-mirin glaze on salmon. In classical French cooking, a "glace" (glace de viande) is a stock reduced so far it becomes a thick, intensely flavoured syrup used to finish sauces.

So a reduction is a process (boil it down); a glaze is the shiny finishing layer you put on the outside of a dish — and a heavily reduced sweet or savoury liquid is often exactly what you use as that glaze.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-mincing-vs-dicing',
    title: 'Mincing vs dicing (knife cuts)',
    category: 'food',
    keywords: [
      'difference between mincing and dicing', 'mincing vs dicing', 'very fine irregular pieces',
      'uniform cubes', 'knife skills', 'garlic and herbs minced', 'brunoise small dice large dice',
      'even cooking', 'not ground beef or pelmeni',
    ],
    content: `Both are ways of cutting food small with a knife; the difference is size and uniformity.

Mincing means cutting food into very small, fine pieces, without worrying about them being the same shape or size — you rock the knife rapidly over a pile until it is almost a paste. It is used for ingredients that should melt into a dish and distribute their flavour evenly: garlic, ginger, shallots, chillies, fresh herbs, anchovies. Minced pieces are typically 1-2 mm or smaller.

Dicing means cutting food into UNIFORM CUBES of a specified size, so the pieces cook at the same rate and look neat. The standard sizes are: brunoise (~3 mm), small dice (~6 mm), medium dice (~12 mm), and large dice (~20 mm). You dice by first cutting the food into planks, then into sticks (batons/julienne), then crosswise into cubes. Onions, potatoes, carrots and peppers for a mirepoix, a stew or a salsa are diced.

Short version: mince = as small as possible, shape doesn't matter, flavour disappears into the dish; dice = deliberate even cubes, pieces stay visible and cook evenly. ("Minced meat" is a separate use of the word, meaning ground meat.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-white-vs-brown-sugar',
    title: 'White sugar vs brown sugar',
    category: 'food',
    keywords: [
      'difference between white and brown sugar', 'white sugar vs brown sugar', 'refined sucrose',
      'molasses content', 'light and dark brown sugar', 'moisture', 'not caramelized', 'muscovado',
      'chewier cookies', 'baking substitution',
    ],
    content: `White (granulated) sugar is fully refined sucrose — crystallised from sugar cane or beet juice with all the molasses removed, leaving pure, dry, neutral-sweet crystals.

Brown sugar is white sugar with MOLASSES added back in (or, for "raw"/muscovado sugars, less molasses removed in the first place). It is NOT sugar that has been caramelised. Light brown sugar has about 3-4% molasses; dark brown has about 6-7%. The molasses gives it a soft, moist, clumpy texture, a light-toffee colour, and a deeper flavour with hints of caramel, treacle and a slight acidity.

In baking this matters: the molasses in brown sugar adds moisture and acidity, so brown-sugar cookies are chewier, softer and browner, and cakes made with it are denser and more moist. The acidity also reacts with baking soda. You can substitute one for the other in a pinch (adding a spoon of molasses to white sugar makes a rough brown sugar), but the texture and colour of the result will change. Powdered/icing sugar is white sugar ground fine with a little cornstarch.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-latte-vs-cappuccino',
    title: 'Latte vs cappuccino (vs americano)',
    category: 'food',
    keywords: [
      'difference between a latte and a cappuccino', 'latte vs cappuccino', 'steamed milk and microfoam',
      'equal thirds espresso milk foam', 'more milk less foam', 'not espresso plus hot water',
      'flat white', 'americano is espresso and water', 'milk texture',
    ],
    content: `All start with a shot (or two) of espresso; the difference is the milk. NEITHER is espresso diluted with hot water — that is an AMERICANO.

A cappuccino is traditionally roughly EQUAL THIRDS: espresso, steamed milk, and a thick, airy layer of milk foam on top (about 1-2 cm). It is smaller (about 150-180 ml), stronger-tasting, and has a distinct foamy cap you can dust with cocoa. The milk-to-coffee ratio is around 1:1.

A latte (caffe latte, "milk coffee") is mostly STEAMED MILK — a larger drink (about 240-350 ml) with a shot of espresso and only a thin (about 0.5 cm) layer of microfoam. The ratio is more like 1 part coffee to 3-4 parts milk, so it tastes milder and creamier, and it is the usual canvas for latte art.

A flat white sits between them: espresso with steamed milk and a very thin microfoam, smaller than a latte (about 160 ml), so it is stronger and silkier. A macchiato is espresso "stained" with just a dollop of foam. A cortado is espresso with an equal amount of warm milk, no foam.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-dark-vs-milk-chocolate',
    title: 'Dark chocolate vs milk chocolate (vs white)',
    category: 'food',
    keywords: [
      'difference between dark and milk chocolate', 'dark vs milk chocolate', 'cocoa solids percentage',
      'milk solids added', 'more sugar in milk chocolate', 'no or little milk in dark', 'not past its best',
      'bittersweet semisweet', 'white chocolate has no cocoa solids',
    ],
    content: `The difference is what is in the bar, not freshness or "roast level".

Dark chocolate is cocoa mass (ground cocoa nibs) plus cocoa butter and sugar, with little or NO milk. It is labelled by "cocoa content" — the total percentage of the bar that comes from the cocoa bean (mass plus butter). 50-60% is "semisweet", 60-70% "bittersweet", 85%+ is intense and barely sweet. Higher cocoa % means more chocolate flavour, more bitterness, less sugar, and firmer snap.

Milk chocolate adds milk solids (dry milk powder or condensed milk) and usually more sugar, and has a lower cocoa content (often just 25-40%). This makes it sweeter, creamier, softer, paler and milder, with a lower melting point. It was invented in Switzerland in the 1870s (Daniel Peter / Nestle).

White chocolate contains cocoa BUTTER (the fat) but NO cocoa solids, plus milk and sugar — which is why some argue it is not really "chocolate". It has no chocolate-brown colour or cocoa flavour, just sweet, milky, vanilla notes.

For baking, recipes usually specify a cocoa percentage because it changes the sugar and fat balance of the final result.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-whipping-vs-heavy-cream',
    title: 'Whipping cream vs heavy cream',
    category: 'food',
    keywords: [
      'difference between whipping cream and heavy cream', 'whipping cream vs heavy cream', 'milk fat percentage',
      'heavy cream 36 percent', 'whipping cream 30 to 36', 'holds its shape', 'no egg whites involved',
      'double cream', 'single cream half and half',
    ],
    content: `The only real difference is FAT CONTENT. Neither involves folding in whipped egg whites.

Heavy cream (heavy whipping cream) has about 36-40% milk fat. The high fat lets it whip up thick and stable, holding stiff peaks that keep their shape for hours, and it stands up to being boiled in sauces without splitting. It is the richest common cream.

"Whipping cream" (light whipping cream) has about 30-36% fat. It still whips, but the peaks are softer and less stable and collapse sooner, and it is a bit less rich in sauces. In many countries the labels overlap, so "whipping cream" and "heavy cream" can be nearly the same product; check the fat percentage on the carton if it matters.

For reference: "double cream" (UK) is even higher, about 48% fat; "single cream" (UK) is about 18% and will not whip; "half-and-half" (US) is about 10-18% and is for coffee, not whipping. More fat = whips stiffer, holds longer, resists curdling; less fat = lighter, softer, cheaper.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-herb-vs-spice',
    title: 'Herb vs spice',
    category: 'food',
    keywords: [
      'difference between a herb and a spice', 'herb vs spice', 'leafy green part of the plant',
      'seeds bark roots fruits buds', 'basil parsley thyme rosemary', 'cinnamon cumin pepper nutmeg ginger',
      'usually temperate versus tropical', 'not fresh versus dried',
    ],
    content: `The distinction is which PART of the plant is used, not whether it is fresh or dried.

A herb is the LEAFY GREEN part of a plant — the leaves and sometimes the soft stems. Examples: basil, parsley, coriander/cilantro leaf, mint, thyme, rosemary, sage, oregano, dill, chives, bay leaf. Culinary herbs mostly come from soft-stemmed plants of temperate climates, and many are used fresh (though also dried).

A spice is any other part of an aromatic plant: seeds (cumin, coriander seed, fennel, mustard, nutmeg), bark (cinnamon), roots or rhizomes (ginger, turmeric, galangal), flower buds (cloves), berries or fruit (black pepper, allspice, star anise, vanilla pod, chilli), stigmas (saffron), or resin (asafoetida). Spices are usually dried, are often from tropical plants, and tend to be more pungent and used in smaller amounts.

Some plants give both: coriander leaf is a herb, coriander seed is a spice; dill weed is a herb, dill seed is a spice. A "spice blend" like garam masala or curry powder is a mix of ground spices (sometimes with dried herbs).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-olive-vs-vegetable-oil',
    title: 'Olive oil vs vegetable oil',
    category: 'food',
    keywords: [
      'difference between olive oil and vegetable oil', 'olive oil vs vegetable oil', 'extra virgin cold pressed',
      'refined neutral oil', 'smoke point', 'flavour', 'monounsaturated fat', 'canola sunflower soybean',
      'when to use each',
    ],
    content: `Olive oil is pressed from olives. "Extra virgin" (EVOO) is the first cold press, unrefined, with a strong fruity/peppery flavour, lots of antioxidants and monounsaturated fat, and a relatively LOW smoke point (about 190-207 C) — best for dressings, drizzling, dips, and low-to-medium-heat cooking. "Pure"/"light" olive oil is refined (flavour and colour stripped out), blander, and has a higher smoke point (about 240 C), fine for general frying.

"Vegetable oil" on a bottle is a REFINED, neutral-tasting blend or single oil made from seeds — usually soybean, canola (rapeseed), sunflower, corn, or a mix. It is highly processed (that is what makes it neutral and shelf-stable), has a HIGH smoke point (about 200-230 C, canola ~205, sunflower ~230), and adds no flavour of its own. It is the default for deep-frying, high-heat sauteing, and baking where you do not want a taste.

Rule of thumb: EVOO where you can taste it and the heat is moderate; a neutral vegetable/canola oil for high heat, deep-frying, and neutral flavour. (Nutritionally EVOO and canola are both good; the concern with "vegetable oil" is mostly about heavily processed blends and reused frying oil.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-sauce-vs-condiment',
    title: 'Sauce vs condiment',
    category: 'food',
    keywords: [
      'difference between a sauce and a condiment', 'sauce vs condiment', 'cooked component of a dish',
      'added at the table to taste', 'gravy hollandaise bolognese', 'ketchup mustard hot sauce soy sauce',
      'part of the recipe versus optional accompaniment', 'overlap',
    ],
    content: `The two overlap heavily and the line is about how it is used.

A sauce is a liquid or semi-liquid component that is part of a dish, usually prepared as part of the cooking and served ON or WITH the food to add moisture, flavour and richness — gravy on a roast, tomato sauce on pasta, hollandaise on eggs, a pan sauce for a steak, bechamel in a lasagne. Classical cuisine has whole systems of sauces (the French "mother sauces": bechamel, veloute, espagnole, tomato, hollandaise). A sauce is generally made fresh (or at least finished) for that meal and is integral to the dish.

A condiment is a prepared flavouring — usually bottled, jarred or packaged, and shelf-stable — that is added by the diner AT THE TABLE, to taste, as an optional accompaniment: ketchup, mustard, mayonnaise, hot sauce, relish, chutney, soy sauce, fish sauce, pickles, salsa, sriracha. It is not specific to one dish; you keep it and use it across many meals.

The overlap: many things (soy sauce, hot sauce, salsa, pesto) are both — a "sauce" by texture and a "condiment" by how it is served. Short version: a sauce is cooked into or served as part of the dish; a condiment is a ready-made extra added on the side by choice.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-yeast-vs-sourdough',
    title: 'Commercial yeast vs sourdough',
    category: 'food',
    keywords: [
      'difference between yeast and sourdough', 'commercial yeast vs sourdough starter', 'single strain fast rise',
      'wild yeast and lactobacillus', 'tangy flavour', 'longer fermentation', 'levain', 'baker\'s yeast',
      'natural leaven',
    ],
    content: `Both leaven bread by producing carbon dioxide gas that inflates the dough; the difference is the organisms and the process.

Commercial (baker's) yeast is a single cultivated strain of Saccharomyces cerevisiae, sold as fresh cake, active dry or instant granules. It is fast and predictable: added to the dough, it ferments the sugars and raises a loaf in 1-3 hours, producing a mild, clean bread flavour. It is what most everyday bread, pizza dough and buns use.

Sourdough uses a "starter" (also called a levain or natural leaven) — a living culture of WILD yeasts plus LACTOBACILLUS bacteria that a baker maintains by regularly feeding it flour and water. The wild yeasts raise the dough (more slowly, often 4-12+ hours or an overnight cold rise), and the bacteria produce lactic and acetic acid, which give sourdough its characteristic TANG, a chewier crumb, a thicker crust, better keeping quality, and (from the long fermentation) a lower glycemic response and easier digestibility for some people.

Short version: commercial yeast = one fast strain, mild flavour, quick; sourdough = a maintained wild culture of yeast and bacteria, slow, tangy, more complex.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-searing-vs-blackening',
    title: 'Searing vs blackening',
    category: 'food',
    keywords: [
      'difference between searing and blackening', 'searing vs blackening', 'browning the surface at high heat',
      'Cajun spice crust', 'Paul Prudhomme', 'Maillard reaction', 'not just burning it', 'butter and spice mix in a hot cast-iron pan',
    ],
    content: `Searing is browning the surface of food (usually meat or fish) quickly at high heat in a hot, lightly oiled pan or grill, to develop colour and flavour via the Maillard reaction and to build a crust. The goal is a deep golden-brown exterior, not a black one; you control the heat so it browns without burning. Searing is a step in many recipes (sear then roast, sear then braise) as well as a finish.

Blackening is a specific Cajun cooking technique, popularised by chef Paul Prudhomme in the 1980s (blackened redfish). The food is coated in melted butter and a robust spice mix (paprika, cayenne, garlic and onion powder, thyme, oregano, black and white pepper) and then cooked in a very hot cast-iron skillet. The butter and spices char and form a dark, almost black, crust that is intensely flavoured — bitter-edged, smoky and spicy — but not simply burnt food; it is a deliberate spice-crust technique with a lot of smoke (best done outdoors or with strong ventilation).

Short version: searing = high-heat browning for a golden crust and flavour; blackening = a Cajun method of cooking spice-and-butter-coated food in a screaming-hot skillet to form a dark, aromatic charred crust.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-wok-vs-frying-pan',
    title: 'Wok vs frying pan (skillet)',
    category: 'food',
    keywords: [
      'difference between a wok and a frying pan', 'wok vs skillet', 'round or bowl-shaped', 'flat bottom',
      'heat zones', 'stir-frying tossing', 'high heat over a small area', 'sloped sides', 'carbon steel seasoning',
    ],
    content: `A frying pan (skillet) has a flat bottom and low, gently flared sides. The whole base sits on the burner, so heat is fairly even across it. It is made for shallow frying, searing, sauteing, making pancakes and omelettes, and pan sauces — anything where food mostly stays put and gets direct contact with the hot surface.

A wok is deep and bowl-shaped (round-bottomed on a traditional Chinese stove, flat-bottomed for Western burners), with high sloping sides. On a strong burner the bottom gets extremely hot while the sides are progressively cooler, creating heat zones. This shape is built for STIR-FRYING: a small amount of oil pools in the hot centre, ingredients are added in stages and constantly tossed up the sides and back, so everything cooks fast at high heat with lots of surface contact and steam escaping. The sloped sides also make tossing, steaming, and deep-frying with less oil practical. A wok is usually thin carbon steel that must be seasoned and heats/cools quickly; the framing of "convection vs conduction" is not really the point — both cook mainly by direct contact and radiant heat, but the wok's shape concentrates intense heat and enables the constant motion stir-frying needs.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cook-fillet-vs-cut',
    title: 'Fillet vs cut of meat',
    category: 'food',
    keywords: [
      'difference between a fillet and a cut of meat', 'fillet vs cut', 'boneless strip of muscle',
      'general term for a butchered portion', 'filet mignon tenderloin', 'fish fillet along the backbone',
      'primal and sub-primal cuts',
    ],
    content: `A "cut" of meat is the general term for any portion that a butcher separates from the carcass. Cuts are organised into "primal cuts" (large sections like the chuck, rib, loin, round in beef) and then "sub-primal" and retail cuts (ribeye, sirloin, brisket, chuck roast). A cut can be bone-in or boneless, tough or tender, and is defined by which muscles and part of the animal it comes from.

A "fillet" (US spelling often "filet") is a specific KIND of cut: a boneless piece taken by slicing a whole muscle away from the bone, along its length. In beef, "the fillet" or "tenderloin" is the long, very tender muscle running along the spine, and "filet mignon" is a small round steak cut from its narrow end. In fish, a fillet is the flesh cut lengthways from one side of the fish, away from the backbone and ribs (as opposed to a "steak", which is cut crosswise through the bone). "Fillet" also just means "a boneless slice" of chicken breast or pork.

So a fillet is always a cut, but a particular one: boneless, taken along the grain, usually from a tender muscle.`,
    createdAt: Date.now(),
  },
];
