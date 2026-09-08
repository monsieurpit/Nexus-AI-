import { KnowledgeItem } from '../../types';

// Batch 17 (cooking & food science) gap-fills. Live misses on nexus-4b:
// "why does bread rise" -> matzah/Exodus non-answer; "caramelization" -> "that's
// the Maillard reaction too" (wrong, sugar only); "why does pasta water need
// salt" -> generic "fixing a dish" dump; "why does cut fruit turn brown" ->
// how-to-pick-up-an-apple dump; "emulsification" -> confused with egg
// coagulation; "why does dough need kneading" -> cats-kneading + doughnut dump;
// "smoke point" -> "the oven instructions said"; "why is stock simmered" ->
// wrong "boiling strips the vitamins" reason; "deglazing" -> "removal of a
// shiny surface".
export const FOOD_SCIENCE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-why-bread-rises',
    title: 'Why Bread Rises',
    category: 'Food Science',
    keywords: [
      'why does bread rise', 'what makes bread rise', 'how does bread rise', 'why does dough rise',
      'what makes dough puff up', 'why does bread get fluffy', 'what causes bread to rise',
    ],
    content: `Bread rises because a gas gets produced inside the dough and trapped there. In most bread the gas is carbon dioxide made by yeast: the yeast feeds on sugars in the flour and gives off CO2 and a little alcohol (fermentation). Those CO2 bubbles are held in place by the gluten — an elastic, stretchy protein network that forms when wheat flour is mixed with water and kneaded. The gluten inflates like thousands of tiny balloons, so the dough expands ("proofs"). In the oven the trapped gas and steam expand further from the heat ("oven spring") before the crust and crumb set solid. Other leavening works the same way with a different gas source: baking soda/powder release CO2 by a chemical reaction, and in puff pastry it's steam alone. Unleavened bread like matzah or tortillas has no gas source, so it stays flat.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-onions-make-you-cry',
    title: 'Why Onions Make You Cry',
    category: 'Food Science',
    keywords: [
      'why do onions make you cry', 'what makes onions make you cry', 'why does cutting onions hurt your eyes',
      'how to cut onions without crying', 'why do onions sting your eyes', 'what chemical in onions makes you cry',
    ],
    content: `Onions take up sulfur from the soil and store sulfur compounds and an enzyme (alliinase) in separate compartments inside their cells. When you cut the onion you rupture those cells and the two mix. A chain of reactions produces a volatile gas called syn-propanethial-S-oxide, which drifts up to your eyes. There it reacts with the moisture on the eye's surface to form a small amount of sulfuric acid, which stings; your eyes flood with tears to flush the irritant out. Ways to reduce it: chill the onion first (cold slows the reaction and the gas is less volatile), use a very sharp knife (less cell damage), cut near running water or a fan, or cut out and discard the root end last (it has the highest concentration of the enzyme).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-caramelization-vs-maillard',
    title: 'Caramelization (and How It Differs from the Maillard Reaction)',
    category: 'Food Science',
    keywords: [
      'what is caramelization', 'what is caramelisation', 'how does caramelization work', 'caramelization vs maillard',
      'difference between caramelization and the maillard reaction', 'what temperature does sugar caramelize',
      'why do onions caramelize',
    ],
    content: `Caramelization is the browning of SUGAR alone by heat. When sugar is heated past its caramelization point (about 160 °C / 320 °F for table sugar/sucrose, lower for fructose, higher for maltose), the sugar molecules break apart and recombine into hundreds of new compounds that are brown in colour and give nutty, buttery, bitter and rum-like flavours. It needs no protein. This is DIFFERENT from the Maillard reaction, which is a browning reaction between amino acids (from protein) AND reducing sugars, starts at a lower temperature (around 140–165 °C / 285–330 °F), and produces its own distinct savoury, roasted, meaty flavours. Both often happen at once on a seared steak or roasted vegetables, but "caramelized onions" are mostly caramelization (onions are sugary), while the crust on a steak is mostly Maillard.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-pasta-water-salt',
    title: 'Why Pasta Water Needs Salt',
    category: 'Food Science',
    keywords: [
      'why does pasta water need salt', 'why do you salt pasta water', 'why add salt to pasta water',
      'how much salt in pasta water', 'does salt make pasta water boil faster', 'should you salt pasta water',
    ],
    content: `The main reason is flavour from the inside. Pasta dough is basically just flour and water — bland. As it cooks it absorbs water and swells, so if that water is well salted, the pasta itself takes on seasoning all the way through; salting only the sauce afterward leaves the noodle itself flat. A common guideline is about 1 tablespoon of salt per 4–6 litres (roughly "salty like the sea, but not quite"). Salt also very slightly firms the surface starch, which can help texture a little. What salt does NOT meaningfully do: the amount used has a negligible effect on the boiling temperature (you'd need far more salt to raise it even 1 °C) and it does not make the water boil faster.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-cut-fruit-turns-brown',
    title: 'Why Cut Fruit Turns Brown',
    category: 'Food Science',
    keywords: [
      'why does cut fruit turn brown', 'why do apples turn brown', 'why does avocado turn brown',
      'what causes fruit to brown', 'how to stop cut fruit from browning', 'why does banana turn brown when cut',
      'enzymatic browning',
    ],
    content: `This is "enzymatic browning." Fruit cells contain an enzyme (polyphenol oxidase, PPO) and colourless phenolic compounds kept apart. Cutting or bruising breaks the cells so the enzyme, the phenols and oxygen from the air all meet. The enzyme uses the oxygen to convert the phenols into brownish pigments called melanins — the same family of pigment that colours human skin. It's harmless, just unappealing, and it's why apples, pears, bananas, avocados and potatoes discolour when cut. Ways to slow it: coat the cut surface with an acid (lemon or pineapple juice — the low pH disables the enzyme and vitamin C is an antioxidant), cut down oxygen contact (water, plastic wrap pressed to the surface, vacuum), chill it (cold slows the enzyme), or briefly blanch it (heat destroys the enzyme).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-emulsification',
    title: 'What Emulsification Is',
    category: 'Food Science',
    keywords: [
      'what is emulsification', 'what is an emulsion', 'how does emulsification work', 'what is an emulsifier',
      'how does mayonnaise work', 'why does vinaigrette separate', 'what does lecithin do',
    ],
    content: `Emulsification is getting two liquids that don't normally mix — typically oil and water — to stay blended as tiny droplets of one suspended throughout the other. Left alone they separate because oil and water repel each other. An emulsifier is a molecule with a water-loving end and an oil-loving end; it coats the droplets and keeps them from merging back together. In the kitchen the classic emulsifier is lecithin from egg yolk (mayonnaise and hollandaise are oil-in-water emulsions stabilised by yolk); mustard, and the proteins in cream and milk, also work. A vinaigrette is a temporary emulsion — whisking breaks the oil into droplets but with a weak emulsifier it separates again in minutes. This is a physical dispersion, completely different from egg proteins setting solid when heated, which is coagulation.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-boiling-eggs',
    title: 'What Happens When You Cook an Egg',
    category: 'Food Science',
    keywords: [
      'why do we boil eggs', 'what happens when you boil an egg', 'what happens when you cook an egg',
      'why does an egg go from liquid to solid', 'why does egg white turn white', 'how does cooking an egg work',
      'what is egg coagulation',
    ],
    content: `Raw egg white and yolk are mostly water with dissolved proteins coiled up into little balls. Heat makes those protein molecules unfold and then link together into a solid three-dimensional mesh that traps the water — this is coagulation, and it's irreversible. The white sets first: it starts thickening around 60 °C and is firm by about 65–70 °C, turning from clear to opaque white as the protein network scatters light. The yolk sets later, around 65–70 °C, going from runny to jammy to crumbly. We "boil" (or steam, poach, fry, scramble) eggs to trigger this — it makes them safe to eat (heat kills any Salmonella), firm enough to handle and slice, and changes the texture and flavour. Overcooking squeezes water out (rubbery white) and can turn the yolk's surface green-grey from an iron–sulfur reaction.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-why-knead-dough',
    title: 'Why Dough Needs to Be Kneaded',
    category: 'Food Science',
    keywords: [
      'why does dough need to be kneaded', 'what does kneading dough do', 'why do you knead bread dough',
      'what happens if you dont knead dough', 'purpose of kneading', 'how does kneading develop gluten',
    ],
    content: `Kneading develops the gluten. Wheat flour contains two proteins, glutenin and gliadin; when they're wetted and then worked mechanically, they bond and align into long, cross-linked chains — the gluten network. That network is both stretchy and strong, which is exactly what bread dough needs: it lets the dough expand as the yeast produces gas, and it holds those gas bubbles instead of letting them escape, so the loaf rises tall and has a chewy, open crumb. Under-kneaded dough is slack, tears easily and bakes into a dense, flat loaf; well-kneaded dough is smooth, springy and passes the "windowpane test" (you can stretch a piece thin enough to see light through it without it ripping). Some methods replace kneading with time — long slow fermentation and periodic folds let the gluten organise itself ("no-knead" bread).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-smoke-point',
    title: 'The Smoke Point of Oil',
    category: 'Food Science',
    keywords: [
      'what is the smoke point of oil', 'what does smoke point mean', 'smoke point of olive oil', 'best oil for frying',
      'which oils have a high smoke point', 'why does oil smoke', 'what oil for high heat cooking',
    ],
    content: `The smoke point is the temperature at which a heated fat starts to visibly smoke and break down. At that point the fat's molecules split apart, releasing acrid-smelling, bitter-tasting compounds (including acrolein) and free fatty acids, and past it the oil can catch fire. So for high-heat cooking — searing, stir-frying, deep-frying (typically 175–230 °C / 350–450 °F) — you want an oil with a smoke point comfortably above that: refined oils like canola, peanut, sunflower, refined olive, avocado (~250 °C) and light/refined vegetable oils. Low-smoke-point fats — butter (~150 °C, less if not clarified), unrefined extra-virgin olive oil (~190–210 °C), flaxseed oil — are better for low heat, finishing or dressings. Refining raises the smoke point by removing the free fatty acids and impurities that break down first; an oil's smoke point also drops each time it's reused.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-stock-simmer-not-boil',
    title: 'Why Stock Is Simmered, Not Boiled',
    category: 'Food Science',
    keywords: [
      'why is stock simmered not boiled', 'why do you simmer stock', 'why not boil stock', 'why simmer broth',
      'how to make clear stock', 'why is my stock cloudy', 'difference between simmering and boiling stock',
    ],
    content: `Stock is kept at a bare simmer (around 82–96 °C, just a few bubbles rising) rather than a rolling boil mainly for clarity and texture, not nutrition. A hard boil violently agitates the pot: it emulsifies the rendered fat into the liquid instead of letting it float to the top to be skimmed, and it churns up the small protein and bone particles and scum, breaking them apart and keeping them suspended. The result is a cloudy, greasy, sometimes bitter stock. A gentle simmer lets the fat and impurities rise so you can skim them, and lets the liquid stay clear. It also extracts collagen into gelatin gradually without driving off too much liquid too fast. (Boiling doesn't meaningfully "destroy the vitamins" — that's not the reason.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-deglazing',
    title: 'What Deglazing Is',
    category: 'Food Science',
    keywords: [
      'what is deglazing', 'what does deglaze mean', 'how to deglaze a pan', 'what is fond in cooking',
      'why do you deglaze a pan', 'deglaze with wine', 'how to make pan sauce',
    ],
    content: `Deglazing is adding a liquid to a hot pan after you've seared or roasted something, to dissolve and lift the browned bits stuck to the bottom. Those bits are called the "fond" (French for "base") — they're concentrated Maillard-reaction flavour, mostly caramelised proteins and sugars. You pour off excess fat, put the pan back on heat, add a splash of liquid (wine, stock, beer, vinegar, even water), and scrape with a wooden spoon while it bubbles; the fond dissolves into the liquid. That liquid then becomes the base of a pan sauce or gravy, often reduced and finished with butter or cream. It's one of the simplest ways to get a lot of flavour out of the pan you already dirtied.`,
    createdAt: Date.now(),
  },
];
