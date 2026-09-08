import { KnowledgeItem } from '../../types';

// Batch 94 (cooking science, deeper — batches 17 and 55 covered the basics).
// nexus-4b misses: "what makes something spicy" answered about a Hilary Duff
// album and an Irish "spice bag" takeaway dish; "what is a roux" and "what is
// curing meat" were raw web dumps ("Roux is a French surname"); "difference
// between broth and stock" said "stocks are owned shares in companies, while
// broth is just broth"; "Dutch process vs natural cocoa" invented an answer
// about roasting beans and stirring for hours (that is conching); "what is
// tempering chocolate" gave a vague "like tempering glass" answer.
export const COOKING_CHEMISTRY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-what-makes-something-spicy',
    title: 'What Makes Food Spicy',
    category: 'Cooking',
    keywords: [
      'what makes something spicy', 'capsaicin chili peppers heat', 'trpv1 receptor pain heat capsaicin', 'scoville scale pepper heat',
      'why does milk stop chili burn', 'is spicy a taste', 'black pepper piperine wasabi isothiocyanate',
    ],
    content: `The "heat" of spicy food is not one of the tastes — it is a pain-and-warmth sensation. Chili peppers contain capsaicin, an oily compound concentrated in the pale inner membrane (pith) that holds the seeds, not really the seeds themselves. Capsaicin binds to TRPV1, a receptor on your sensory nerves that normally fires in response to genuine high temperature (above about 43 °C) and abrasion — so your brain registers a real "burning" feeling, with sweating, flushing and an endorphin rush, even though nothing is actually hot or being damaged. The Scoville scale rates how much a pepper must be diluted before the heat becomes undetectable: bell pepper 0, jalapeño about 5,000, habanero about 200,000, Carolina Reaper about 2 million, pure capsaicin 16 million. Because capsaicin is oil-soluble, plain water just spreads it around, while fat, dairy (the casein protein in milk binds capsaicin), starch (rice, bread) and something sweet or acidic give relief. Other "spicy" sensations come from different chemicals: black pepper's bite is piperine; mustard, horseradish and wasabi are pungent isothiocyanates that mainly hit the sinuses; ginger's warmth is gingerol.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-broth-vs-stock',
    title: 'The Difference Between Broth and Stock',
    category: 'Cooking',
    keywords: [
      'what is the difference between broth and stock', 'stock made from bones collagen gelatin', 'broth made from meat seasoned drinkable',
      'why does stock gel when cold', 'is bone broth just stock', 'stock unseasoned building block broth ready to eat',
    ],
    content: `Both are savoury liquids made by simmering ingredients in water, and cooks and product labels often use the words interchangeably — but there is a traditional distinction. STOCK is made mainly from BONES (plus a few meat scraps, aromatic vegetables — the mirepoix of onion, carrot, celery — and herbs), simmered long (4 to 8-plus hours) and left unseasoned. The collagen in the bones and connective tissue breaks down into gelatin, which gives stock body and a silky mouthfeel and makes it set into a soft jelly when cold. Stock is a building block for sauces, risottos and braises, not usually eaten on its own. BROTH is made mainly from MEAT (and vegetables), simmered a shorter time, and is seasoned so it can be sipped or eaten directly — chicken broth, beef broth, the base of many soups. "Bone broth" sold as a health drink is essentially a long-simmered, seasoned stock. Stock is unrelated to the finance meaning of "stock" (shares in a company).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-dutch-vs-natural-cocoa',
    title: 'Dutch-Process versus Natural Cocoa',
    category: 'Cooking',
    keywords: [
      'what is the difference between dutch process and natural cocoa', 'dutched alkalized cocoa neutral pH darker milder', 'natural cocoa acidic reddish sharp fruity',
      'natural cocoa baking soda dutch cocoa baking powder', 'why does cocoa type matter for leavening', 'coenraad van houten dutch process',
    ],
    content: `Both are made from cocoa solids, but Dutch-process cocoa has been treated with an alkali (potassium carbonate) that neutralises its natural acidity — a method developed by the Dutchman Coenraad van Houten. NATURAL cocoa is acidic (pH about 5–6), lighter reddish-brown, and has a sharp, fruity, sometimes bitter "chocolatey" flavour. DUTCH-PROCESS ("Dutched," "alkalized") cocoa is close to neutral (pH about 7–8), darker — reddish to almost black — milder and smoother, and dissolves more readily in liquid. The difference matters in baking because of leavening chemistry: natural cocoa is an acid, so recipes built around it usually use baking SODA (a base) to react with it and create lift; Dutch cocoa is neutral, so recipes usually use baking POWDER (which brings its own acid). Substituting one cocoa for the other without adjusting the leavening can leave a cake dense, flat, or with a soapy/metallic taste. It has nothing to do with roasting time or how long the beans are stirred.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-what-is-a-roux',
    title: 'What a Roux Is',
    category: 'Cooking',
    keywords: [
      'what is a roux', 'equal parts flour and fat cooked together thickener', 'white blond brown dark roux color and flavor',
      'bechamel veloute gumbo roux', 'how to make a roux without lumps', 'why cook the raw flour taste out of a roux',
    ],
    content: `A roux is a cooked paste of roughly equal parts (by weight) flour and fat — usually butter, but also oil or bacon drippings — used to thicken sauces, soups and gravies. The flour is stirred into the melted fat and cooked; coating each starch granule in fat lets them disperse without clumping when liquid is added, and the cooking also removes the raw-flour flavour. How long you cook it changes its colour, flavour and thickening power. A WHITE roux (a few minutes, pale) has the greatest thickening power and is the base of béchamel. A BLOND roux (a little longer, light golden) is used for velouté and many gravies. A BROWN or DARK roux (cooked slowly to the colour of peanut butter, then chocolate) develops a deep, toasty, nutty flavour but loses most of its thickening power — it is the foundation of Cajun and Creole gumbo. To keep it lump-free, whisk the liquid in gradually and keep one of the two (roux or liquid) hot and the other cool. It is unrelated to "Roux" as a surname.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-tempering-chocolate',
    title: 'What Tempering Chocolate Is',
    category: 'Cooking',
    keywords: [
      'what is tempering chocolate', 'tempering aligns cocoa butter crystals form v beta', 'tempered chocolate shine snap smooth melt no bloom',
      'chocolate tempering temperatures 45 27 31', 'why does chocolate bloom grey streaks', 'seed method tempering chocolate',
    ],
    content: `Tempering is heating, cooling, and gently rewarming chocolate through specific temperatures so that its cocoa butter sets into one particular stable crystal form (called Form V, or beta crystals) rather than a mixture of forms. Cocoa butter can solidify into six different crystal structures with different melting points; only Form V gives chocolate the properties you want: a glossy sheen, a firm "snap" when you break it, a smooth melt on the tongue, and resistance to "bloom" (the dull, streaky, grey-white film and grainy texture that appear when unstable crystals slowly take over). A typical method: melt the chocolate to about 45 °C to wipe out all existing crystals, cool it while stirring to about 27 °C to form many seed crystals (including unwanted ones), then warm it slightly to about 31–32 °C for dark chocolate (a degree or two lower for milk and white) to melt the unstable crystals and leave only Form V. Tempering matters for chocolate bars, dipped and moulded chocolates, and decorations; it does not matter when you are simply melting chocolate into a cake batter, ganache or frosting. (It is not the same idea as tempering glass or steel.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-curing-meat',
    title: 'What Curing Meat Is',
    category: 'Cooking',
    keywords: [
      'what is curing meat', 'curing preserves meat salt draws out water osmosis', 'nitrite curing salt pink salt prague powder botulism color',
      'dry cure vs wet cure brine', 'bacon ham prosciutto salami curing', 'why is cured meat pink processed meat nitrosamines',
    ],
    content: `Curing preserves meat and fish by drawing out moisture and making conditions hostile to spoilage microbes. Salt is the core ingredient: it pulls water out by osmosis and lowers the meat's "water activity" so bacteria and mould cannot grow; sugar is often added to soften the flavour and feed beneficial fermentation. Most curing also uses a small amount of nitrite (in "curing salt," also called pink salt, Prague powder or sodium nitrite, dyed pink so it is never confused with table salt), which does three things: it inhibits Clostridium botulinum, the bacterium that causes botulism; it fixes the pink or red colour so ham, bacon and salami stay pink instead of turning grey; and it produces the characteristic tangy "cured" flavour. Curing can be DRY (rubbed with the salt mixture and aged, as for prosciutto and dry salami) or WET (submerged in or injected with a brine, as for most supermarket bacon and ham). It is the basis of bacon, ham, pancetta, prosciutto, salami, pastrami, corned beef and gravlax. Health concerns about cured meats centre on nitrosamines, which can form when nitrite-cured meat is cooked at high heat, which is why processed meats are treated cautiously in dietary guidance.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-proofing-dough',
    title: 'What Proofing Dough Is',
    category: 'Cooking',
    keywords: [
      'what is proofing dough', 'final rise of shaped bread before baking', 'bulk fermentation vs proofing vs shaping', 'yeast carbon dioxide gluten network gas bubbles',
      'under-proofed dense over-proofed collapsed', 'poke test proofing bread', 'oven spring proofing',
    ],
    content: `Proofing (or "proving") is the final rest that a shaped loaf, roll or pastry gets just before it goes into the oven. During it, the yeast keeps producing carbon dioxide, which inflates the thousands of tiny gas pockets held in the stretchy gluten network (or, in laminated pastry, expands trapped air and steam), so the dough puffs up and becomes light. It comes after "bulk fermentation" — the first rise of the whole mass of dough — and after the dough has been divided and shaped. UNDER-proofed dough bakes up dense and tight and can tear or burst unevenly in the oven; OVER-proofed dough has overstretched gluten that can no longer hold the gas, so it deflates into a flat, wrinkled, sour loaf with poor "oven spring." Bakers judge readiness with the "poke test": gently press a fingertip into the dough — if the dent springs back slowly and only partway, it is ready; if it bounces straight back it needs more time, and if it stays fully dented it is over-proofed. Cold proofing overnight in the fridge deepens flavour and makes timing flexible.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-smoke-point',
    title: 'What the Smoke Point of an Oil Is',
    category: 'Cooking',
    keywords: [
      'what is the smoke point of an oil', 'temperature oil starts to smoke and break down', 'acrolein free fatty acids oil smoking',
      'refined vs unrefined oil smoke point', 'which oil for high heat searing frying', 'extra virgin olive oil smoke point',
    ],
    content: `The smoke point is the temperature at which a heated cooking oil starts to visibly smoke, which signals that the fat is breaking down: it releases free fatty acids, glycerol and acrolein (a bitter, throat-irritating and mildly harmful compound), develops off-flavours, and loses some nutritional value. It depends mostly on how refined the oil is — refining removes the free fatty acids, water, and plant particles that lower the smoke point — so refined ("light") olive oil, refined avocado oil, canola and peanut oil all smoke around 200–230 °C, while unrefined extra-virgin olive oil is lower (around 160–190 °C) and unrefined ("cold-pressed") oils generally lower still. For high-heat cooking like searing, stir-frying or deep-frying (roughly 175–220 °C in the pan) you want an oil rated comfortably above that; for dressings and low-heat cooking the smoke point barely matters and flavour is the deciding factor. Below its smoke point, every common cooking oil is safe to use.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-baking-vs-roasting',
    title: 'The Difference Between Baking and Roasting',
    category: 'Cooking',
    keywords: [
      'what is the difference between baking and roasting', 'roasting high heat meat vegetables browning', 'baking moderate heat dough batter delicate dishes',
      'why do you roast a chicken but bake a cake', 'dry oven heat baking roasting', 'roasting temperature vs baking temperature',
    ],
    content: `Both mean cooking food with the dry, indirect heat of an oven, and the line between them is loose — it comes down mostly to the food and the temperature. ROASTING usually means cooking meat and firm vegetables at a relatively HIGH temperature (about 200–230 °C / 400–450 °F), which browns and crisps the surface through the Maillard reaction and caramelisation while the interior stays moist — roast chicken, roast beef, roast potatoes, roasted peppers or squash. BAKING usually means cooking foods that begin as a batter or dough, or more delicate dishes, at a MODERATE temperature (about 150–190 °C / 300–375 °F), where the food sets, rises and firms rather than forming a hard crust — bread, cakes, cookies, pastry, casseroles, gratins, baked fish, baked potatoes. So a cook "roasts" a chicken but "bakes" a cake, even though the oven is doing the same basic job; some foods (a whole fish, a ham) can reasonably be called either.`,
    createdAt: Date.now(),
  },
];
