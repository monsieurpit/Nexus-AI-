import { KnowledgeItem } from '../../types';

/**
 * COOKING_CONCEPTS_GAPS_2 — batch 250 corrections.
 * nexus-4b handled most cooking contrasts well. Misses:
 * - "marinade vs brine": said a brine is "for lean proteins... you want to dry
 *   'em out quickly" (a brine keeps lean meat JUICY).
 * - "rub vs seasoning": answered about seasoning a cast-iron pan.
 * - "yogurt vs sour cream": said sour cream is "heavy cream left out for ages
 *   until it goes dodgy".
 * - "yeast vs baking powder": called yeast "bacteria" (it is a fungus).
 * - "cake flour vs pastry flour": gave pastry flour 12-14% protein (it is
 *   ~8-10%).
 * - "curing vs smoking meat": answered about stewing and braising.
 * - "ground beef vs minced beef": said ground beef is "a paste" and minced
 *   beef is "cut with a knife".
 * - "knife's edge vs bevel", "steaming vs blanching", "stock vs consomme"
 *   were web dumps.
 * - "whole vs skim milk", "custard vs pudding", "al dente vs fully cooked",
 *   "fillet vs cutlet" were cut or thin.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'cooking', keywords, content, createdAt: now,
});

export const COOKING_CONCEPTS_GAPS_2: KnowledgeItem[] = [
  k(
    'kb-gap-cook2-marinade-vs-brine',
    'Marinade vs brine',
    [
      'difference between a marinade and a brine', 'a brine is a salt-water solution sometimes with sugar and aromatics that food soaks in the salt makes lean meat absorb and retain moisture and seasons it all the way through keeps turkey chicken breast and pork chops juicy', 'a marinade is an acidic and or oily seasoned liquid used mainly to add flavour to the surface plus a little tenderising from acid or enzymes for a shorter time',
      'brine equals moisture and deep seasoning marinade equals surface flavour', 'not that a brine dries meat out it does the opposite',
    ],
    `A BRINE is a solution of SALT in water (typically 5-8% salt, often with some sugar and aromatics like bay, peppercorns, garlic) that you SOAK food in for hours. The salt changes the meat's proteins so it ABSORBS water and, crucially, HOLDS ON to it during cooking — so lean, easy-to-overcook cuts (whole turkey, chicken breasts, pork chops, shrimp) stay noticeably JUICIER, and they are seasoned all the way through, not just on the surface. A brine does NOT dry meat out — that is backwards; keeping it moist is the whole point. (A "dry brine" is just salting the surface generously ahead of time for a similar effect with less fuss.)

A MARINADE is a seasoned liquid — usually built on an ACID (citrus, vinegar, wine, yoghurt) and/or OIL, plus herbs, spices, garlic, soy, etc. — used mainly to add FLAVOUR to the OUTER layer of the food, over a shorter time (30 minutes to a few hours; long acidic marinades can turn the surface mushy). The acid or any enzymes (from pineapple, papaya) give a little surface TENDERISING, and the oil helps browning and carries fat-soluble flavours. Marinades penetrate only a few millimetres.

Short version: brine = salt water for deep moisture and seasoning; marinade = acid/oil for surface flavour.`,
  ),
  k(
    'kb-gap-cook2-rub-vs-seasoning',
    'Rub vs seasoning (cooking)',
    [
      'difference between a rub and a seasoning', 'seasoning in cooking means adding salt pepper herbs or spices to food to enhance its flavour the general act and the substances used', 'a rub is a specific blend of dry spices herbs salt and sugar a dry rub or a paste with oil a wet rub massaged onto the surface of meat before cooking to form a flavourful crust',
      'a rub is a type of seasoning applied a particular way not the cast-iron pan kind of seasoning',
    ],
    `SEASONING, in cooking, means adding SALT, pepper, herbs, or spices to food to bring out and balance its flavour — both the ACT ("season to taste", "under-seasoned") and the substances used ("a jar of seasoning"). At its simplest, seasoning is salt and pepper; more broadly it is any flavouring you add. Good seasoning is done in layers, throughout cooking, and adjusted at the end. (This is NOT the same as "seasoning" a cast-iron pan, which means baking on a layer of polymerised oil to make it non-stick and rust-resistant.)

A RUB is a specific kind of seasoning applied in a specific way: a BLEND of ground spices, dried herbs, salt, and usually sugar, MASSAGED onto the SURFACE of meat (or fish, or vegetables) before cooking — especially for barbecue, roasts, and grilling. A DRY RUB is powder; a WET RUB (or "paste") is the same mix bound with a little oil, mustard, or water. As the meat cooks, the rub forms a concentrated, flavourful CRUST (the "bark" on smoked brisket). Rubs can be applied just before cooking or left on for hours (the salt then also acts like a dry brine).

So a rub IS a seasoning — a designed dry blend put on the outside of meat to build a crust; "seasoning" is the wider idea of adding salt and flavourings to food.`,
  ),
  k(
    'kb-gap-cook2-yogurt-vs-sour-cream',
    'Yogurt vs sour cream',
    [
      'difference between yogurt and sour cream', 'both are cultured dairy fermented deliberately with lactic-acid bacteria not spoilage', 'yogurt is made from milk fermented with thermophilic bacteria Lactobacillus bulgaricus and Streptococcus thermophilus at about 43 degrees tangy thinner or thick if strained Greek higher protein',
      'sour cream is made from light cream about 18 to 20 percent fat fermented with mesophilic cultures at cooler temperatures rich thick less tangy higher fat lower protein',
    ],
    `Both are CULTURED dairy — made by deliberately adding LACTIC-ACID BACTERIA that ferment the milk sugar (lactose) into lactic acid, thickening it and giving it tang. Neither is spoilage; "cream left out until it goes off" is a health hazard, not sour cream.

YOGURT is made from MILK (whole, low-fat, or skim). It is fermented with THERMOPHILIC (heat-loving) bacteria — classically Lactobacillus delbrueckii subsp. bulgaricus and Streptococcus thermophilus — held warm at around 43 C for several hours. The result is fairly TANGY, with a clean acidity, and can be thin (drinking yogurt) or very thick (Greek yogurt / labneh, which are strained to remove whey). Fat content follows the milk used; yogurt is relatively HIGH in PROTEIN.

SOUR CREAM is made from CREAM — specifically light cream of about 18-20% fat. It is fermented with MESOPHILIC (cool-loving) cultures (Lactococcus, Leuconostoc) at cooler temperatures. The result is RICH and THICK, with a milder, softer tang than yogurt, HIGHER in FAT and LOWER in protein.

In cooking: yogurt is lighter and more acidic (marinades, dressings, breakfast); sour cream is richer and more stable in some contexts (dolloped on chili, in dips, in baking). Full-fat versions of each resist curdling when heated better than low-fat.`,
  ),
  k(
    'kb-gap-cook2-yeast-vs-baking-powder',
    'Yeast vs baking powder',
    [
      'difference between yeast and baking powder', 'yeast is a living single-celled fungus not bacteria that ferments sugars over time producing carbon dioxide alcohol and flavour compounds needs warmth and time 30 minutes to hours used for breads', 'baking powder is a chemical leavener baking soda plus a dry acid plus starch it reacts instantly on wetting and again with heat no wait no fermentation flavour used for quick breads cakes muffins pancakes',
      'yeast rise is slow and flavourful chemical rise is fast and neutral',
    ],
    `YEAST is a LIVING organism — a single-celled FUNGUS (not a bacterium). When it has moisture, warmth, and sugars/starch to feed on, it FERMENTS them, releasing carbon dioxide (which raises the dough), a little alcohol (which bakes off), and a range of flavour and aroma compounds that give bread its characteristic taste and smell. It works SLOWLY — 30 minutes to many hours, or overnight in the fridge — and the dough must be given time to rise, sometimes twice. Used for breads, pizza dough, and enriched doughs.

BAKING POWDER is a CHEMICAL leavener: BAKING SODA (sodium bicarbonate) pre-blended with one or more dry ACIDS (cream of tartar, sodium aluminium sulfate, monocalcium phosphate) and a little cornstarch to keep it dry. As soon as it gets WET the acid and soda react and release CO2; "double-acting" powders release a first burst on mixing and a second burst from HEAT in the oven. It works INSTANTLY, needs no rest, and adds no fermentation flavour. Used for cakes, muffins, pancakes, biscuits, scones, and other "quick breads".

(Baking soda alone also leavens, but it needs a separate acidic ingredient in the recipe — buttermilk, yoghurt, brown sugar, cocoa — to react with.)`,
  ),
  k(
    'kb-gap-cook2-cake-flour-vs-pastry-flour',
    'Cake flour vs pastry flour (vs all-purpose)',
    [
      'difference between cake flour and pastry flour', 'cake flour is the lowest protein about 7 to 9 percent finely milled often chlorine-bleached for very tender fine-crumbed cakes', 'pastry flour is between cake flour and all-purpose about 8 to 10 percent protein for flaky pie crusts biscuits and cookies',
      'all-purpose is about 10 to 12 percent bread flour 12 to 14 percent', 'less protein means less gluten means more tender',
    ],
    `Wheat flours are sorted mainly by PROTEIN content, because protein forms GLUTEN when flour meets water and is worked — more gluten means more chew and structure, less gluten means more tenderness.

CAKE FLOUR has the LOWEST protein, about 7-9%. It is very finely milled and is often chlorine-treated ("bleached"), which also helps it absorb more liquid and sugar. It produces a very TENDER, soft, fine, even crumb — ideal for delicate layer cakes, sponge cakes, and cupcakes.

PASTRY FLOUR sits BETWEEN cake flour and all-purpose, about 8-10% protein. It gives enough structure to hold together but stays tender and, when kept cold with fat, FLAKY — ideal for pie and tart crusts, biscuits, scones, and many cookies. (The earlier claim that pastry flour is "12-14%" is wrong — that is BREAD flour.)

For reference: ALL-PURPOSE flour is about 10-12% (a compromise for general use); BREAD flour is about 12-14% (strong, chewy, for yeast breads).

If you have no cake flour, a common substitute is all-purpose with some of it (about 2 tablespoons per cup) swapped for cornstarch.`,
  ),
  k(
    'kb-gap-cook2-curing-vs-smoking',
    'Curing vs smoking meat',
    [
      'difference between curing and smoking meat', 'curing preserves meat by drawing out moisture and inhibiting bacteria using salt dry cure or wet brine cure often with nitrites or nitrates which fix the pink colour add flavour and prevent botulism plus sometimes sugar and spices bacon ham corned beef prosciutto', 'smoking exposes meat to smoke from smouldering wood adding flavour colour and some antimicrobial compounds',
      'cold smoking below about 30 degrees flavours without cooking usually done after curing hot smoking about 65 to 120 degrees both flavours and cooks', 'many products are both cured and smoked',
    ],
    `They are two different meat processes that are often COMBINED (bacon, ham, smoked salmon are usually both). Neither is stewing or braising.

CURING preserves meat chemically. The core agent is SALT — applied as a dry rub ("dry cure") or as a soaking solution ("wet cure" / brine cure) — which draws out moisture and creates conditions bacteria cannot grow in. Cures usually also contain NITRITES and/or NITRATES (pink curing salt, saltpetre), which fix the characteristic PINK colour, contribute the "cured" tangy flavour, prevent fat going rancid, and — most importantly — inhibit Clostridium botulinum (botulism). Sugar and spices are common too. Bacon, ham, corned beef, pastrami, pancetta, prosciutto, and salami all start as cured meat, then are either aged, cooked, or smoked.

SMOKING exposes meat to SMOKE from smouldering hardwood, which deposits flavour and colour and some antibacterial/antioxidant compounds on the surface.
- COLD SMOKING (below about 30 C) adds smoke flavour WITHOUT cooking the meat, so it must be done on meat that is already safe — i.e. already CURED (cold-smoked salmon, traditional bacon).
- HOT SMOKING (about 65-120 C) both FLAVOURS and COOKS the meat over many hours (smoked brisket, ribs, pulled pork, hot-smoked salmon).

Short version: curing = salt (and nitrite) preservation and colour/flavour; smoking = wood smoke for flavour, and, when hot, also cooking.`,
  ),
  k(
    'kb-gap-cook2-ground-vs-minced-beef',
    'Ground beef vs minced beef',
    [
      'difference between ground beef and minced beef', 'ground beef and minced beef are essentially the same product beef chopped into small pieces through a grinder or mincer', 'ground beef is the American term minced beef or beef mince is the British and Commonwealth term for the identical thing',
      'neither is a paste and modern mince is machine-minced not hand-cut with a knife', 'the real differences are regional vocabulary and grind coarseness and fat content labelling 80/20 or 5 percent fat',
    ],
    `"Ground beef" and "minced beef" (also "beef mince") are ESSENTIALLY THE SAME THING: beef that has been cut into small pieces by pushing it through a plate of holes in a MEAT GRINDER (US) / MINCER (UK). It is not a paste, and modern mince is machine-processed, not chopped by hand with a knife.

The main difference is just VOCABULARY:
- "GROUND BEEF" is the American / North American term.
- "MINCED BEEF" or "BEEF MINCE" is the British, Irish, Australian, and wider Commonwealth term.

The real variables to care about when buying either are:
- FAT CONTENT: the US labels by lean-to-fat ratio ("80/20" = 80% lean, common for burgers; "90/10" leaner; "73/27" fattier). The UK labels by fat percentage ("20% fat", "5% fat"). More fat = juicier and more flavourful burgers but more shrinkage; leaner is better for bolognese-style sauces where you drain fat.
- CUT: mince from CHUCK is the all-round standard; SIRLOIN or ROUND is leaner; a BRISKET/SHORT-RIB blend is prized for burgers.
- COARSENESS: some butchers offer a coarse or double grind.

So if a US recipe says "ground beef" and you are in the UK, use "beef mince" of a similar fat level — they are interchangeable.`,
  ),
  k(
    'kb-gap-cook2-knife-edge-vs-bevel',
    "Knife's edge vs bevel",
    [
      'difference between a knifes edge and its bevel', 'the edge is the actual thin cutting line at the very bottom where the two sides meet the apex', 'the bevel is the angled ground surface that tapers from the thicker blade body down to that edge',
      'primary bevel main grind secondary bevel or micro-bevel right at the edge', 'single-bevel Japanese knives ground on one side double-bevel Western knives ground on both about 15 to 20 degrees per side', 'lower bevel angle sharper but more fragile',
    ],
    `The EDGE of a knife is the actual CUTTING LINE — the extremely thin apex at the very bottom of the blade where the two ground sides meet and come to a point. It is what does the cutting, it is only microns wide when sharp, and it is what dulls (rolls or chips) with use and what you restore with a whetstone or steel.

The BEVEL is the angled, ground SURFACE (a flat or slightly hollow facet) that slopes from the thicker BODY of the blade DOWN to that edge. It is the part you actually lay against a sharpening stone. Knives usually have:
- a PRIMARY bevel: the main grind that thins the blade toward the edge;
- often a SECONDARY bevel or "micro-bevel": a tiny, slightly steeper facet right at the apex that makes the edge stronger and quicker to sharpen.

Knives differ by how the bevel is arranged:
- DOUBLE-BEVEL (Western chef's knives, most kitchen knives): ground symmetrically on BOTH sides, typically 15-20 degrees per side, so the edge sits on the centreline; cuts straight, easy to use either-handed.
- SINGLE-BEVEL (many traditional Japanese knives — yanagiba, deba): ground on ONE side only, the other side flat or slightly hollow; gives an extremely keen edge and very clean cuts, but is handed and harder to sharpen.

A LOWER bevel angle = a keener, sharper edge but a more fragile one; a HIGHER angle = a more durable edge for heavy work. So: the bevel is the slope you sharpen; the edge is the line it creates.`,
  ),
  k(
    'kb-gap-cook2-steaming-vs-blanching',
    'Steaming vs blanching',
    [
      'difference between steaming and blanching', 'steaming is cooking food fully by surrounding it with steam vapour no direct water contact gentle retains nutrients colour and shape a complete cooking method', 'blanching is briefly plunging food usually vegetables into rapidly boiling water for 30 seconds to a few minutes then immediately shocking it in ice water to stop the cooking',
      'blanching is a prep technique not full cooking it sets colour loosens skins reduces bitterness and prepares vegetables for freezing',
    ],
    `STEAMING is a full COOKING method. Food is placed above (not in) boiling water in a covered pot or steamer basket, and the rising STEAM condenses on the food and cooks it. It is gentle, adds no fat, does not leach out water-soluble vitamins and minerals the way boiling does, and keeps vegetables bright, firm, and whole. You steam broccoli, dumplings, fish, rice, and puddings until they are DONE and ready to eat.

BLANCHING is a brief PREP technique, not a way to cook something through. You plunge food — usually vegetables, sometimes fruit or nuts — into RAPIDLY BOILING water (occasionally steam) for a SHORT time (30 seconds to 2-3 minutes), then IMMEDIATELY transfer it to ICE WATER ("shocking" / "refreshing") to halt the cooking. Purposes:
- set and brighten the COLOUR of green vegetables;
- stop the enzyme activity that would otherwise dull colour, flavour, and texture during FREEZING (blanch before you freeze beans, peas, spinach);
- LOOSEN skins for peeling (tomatoes, peaches, almonds);
- reduce strong or bitter flavours (onions, kale, some greens);
- par-cook firm vegetables so they finish quickly in a stir-fry or salad.

Short version: steaming cooks food all the way with vapour; blanching briefly dips food in boiling water and then chills it, as a step toward something else.`,
  ),
  k(
    'kb-gap-cook2-stock-vs-consomme',
    'Stock vs consommé',
    [
      'difference between a stock and a consomme', 'stock is a flavourful liquid made by simmering bones meat and or vegetables cloudy to translucent used as a base sets to jelly when cold if bone-rich', 'a consomme is a stock or broth that has been clarified into a perfectly clear intense liquid traditionally with a raft of egg whites ground meat and mirepoix that coagulates and traps the fine particles',
      'consomme is refined concentrated crystal-clear stock often served as an elegant soup',
    ],
    `A STOCK is the foundational flavoured liquid of the kitchen: water simmered slowly with BONES (roasted or not), sometimes meat trimmings, and aromatic vegetables (mirepoix: onion, carrot, celery) plus herbs and peppercorns. Long simmering extracts gelatin from the bones' connective tissue, so a good stock has BODY and sets to a soft JELLY when cold. It is usually cloudy or translucent, lightly seasoned or unseasoned, and used as a BASE for soups, sauces, braises, and risottos rather than served on its own.

A CONSOMMÉ is a stock (or broth) that has been CLARIFIED and concentrated into a perfectly CLEAR, deeply flavoured liquid. The classic method: mix cold stock with a "raft" of egg whites (and often lean ground meat, mirepoix, and tomato), then bring it slowly to a bare simmer. The egg-white proteins coagulate, rise as a floating mat, and TRAP all the fine particles and fat that made the stock cloudy. The raft is left undisturbed, then the crystal-clear liquid is gently ladled or strained out from beneath it. The result is intense, elegant, and fat-free, traditionally served as a refined first-course SOUP (consommé, sometimes with a tiny garnish) or used as the base for aspic.

Short version: stock is the flavourful, slightly cloudy base; consommé is that base clarified into a clear, concentrated, restaurant-grade soup.`,
  ),
  k(
    'kb-gap-cook2-whole-vs-skim-milk',
    'Whole milk vs skim milk',
    [
      'difference between whole milk and skim milk', 'whole milk is about 3.25 percent milkfat', 'skim or nonfat milk has almost all the fat removed under 0.5 percent often about 0.1 percent', '2 percent reduced fat and 1 percent low fat sit in between',
      'removing fat lowers calories removes fat-soluble vitamins A and D usually added back makes it thinner less creamy slightly bluish protein calcium and lactose stay about the same',
    ],
    `The difference is FAT content, and what follows from removing it.

WHOLE milk contains about 3.25% milkfat (the natural amount, once standardised). It is rich and creamy, with fuller flavour and mouthfeel, and it carries the fat-soluble vitamins A and D naturally.

SKIM (or "nonfat") milk has had virtually ALL the fat removed — under 0.5% by law, and often around 0.1%. Between the two sit "2%" (reduced-fat) and "1%" (low-fat) milk.

Removing the fat:
- LOWERS calories (whole ~150 kcal per cup, skim ~80);
- removes the natural vitamins A and D — which is why skim and low-fat milk are FORTIFIED (vitamins added back);
- makes the milk THINNER, less creamy, with a slightly watery or BLUISH look and a fainter flavour;
- concentrates the milk sugar and protein very slightly per calorie, but PROTEIN, CALCIUM, and LACTOSE are essentially the same in all of them.

In cooking, whole milk gives richer sauces, custards, and coffee, and is less prone to curdling; skim is fine for drinking and cereal but makes thinner results and can scorch more easily.`,
  ),
  k(
    'kb-gap-cook2-custard-vs-pudding',
    'Custard vs pudding',
    [
      'difference between a custard and a pudding', 'a custard is thickened by the coagulation of eggs yolks or whole eggs with milk or cream and sugar cooked gently stirred creme anglaise pastry cream or baked creme caramel flan quiche is a savoury custard', 'an American pudding is thickened primarily by starch cornstarch or flour rather than relying on eggs cooked on the stovetop always soft and spoonable chocolate or vanilla pudding',
      'in British usage pudding means dessert in general or specific dishes sticky toffee pudding Christmas pudding Yorkshire pudding',
    ],
    `A CUSTARD is a mixture of milk or cream, sugar, and EGGS (yolks, or whole eggs), thickened by the gentle COAGULATION of the egg proteins as it heats. There are two families:
- STIRRED custards, cooked on the stovetop while stirring so they thicken but stay POURABLE or spoonable: crème anglaise (pouring custard), pastry cream (crème pâtissière), lemon curd, the base for ice cream.
- BAKED custards, set firm in the oven (usually in a water bath) so they HOLD THEIR SHAPE when turned out: crème caramel / flan, crème brûlée, baked custard, and savoury versions like QUICHE and a proper egg tart.

An American PUDDING is thickened mainly by STARCH — cornstarch or flour — rather than by eggs (though a pudding may contain a little egg for richness). It is cooked on the stovetop and is always SOFT and SPOONABLE, never unmoulded: chocolate pudding, vanilla pudding, butterscotch pudding, banana pudding.

Watch the vocabulary: in BRITISH English, "pudding" often just means DESSERT ("what's for pudding?"), or names specific steamed/baked dishes — sticky toffee pudding, Christmas pudding, bread-and-butter pudding, and the savoury Yorkshire pudding and black pudding. The "starch-thickened, egg-free" meaning is chiefly American.`,
  ),
  k(
    'kb-gap-cook2-al-dente-vs-fully-cooked',
    'Al dente vs fully cooked pasta',
    [
      'difference between al dente and fully cooked pasta', 'al dente means to the tooth cooked until tender but still firm with a slight resistance when chewed and a thin opaque core at the very centre the preferred doneness in Italian cooking', 'fully cooked or well done pasta is cooked longer until soft all the way through with no firmness or core softer and can become mushy',
      'al dente holds up better when tossed with sauce and has a lower glycaemic response finish cooking in the sauce', 'for baked pasta undercook slightly because it cooks more in the oven',
    ],
    `"AL DENTE" is Italian for "to the tooth". Pasta cooked al dente is TENDER but still has a slight FIRMNESS and RESISTANCE when you bite it, with a very thin line of paler, opaque, barely-underdone starch right at the CENTRE. This is the standard target in Italian cooking, for good reasons: the texture is more pleasant and springy, the pasta holds its shape and doesn't turn to mush when TOSSED with hot sauce (and it is usually finished for a minute IN the sauce, absorbing flavour), and it produces a slower rise in blood sugar than fully softened pasta.

FULLY COOKED (or "well done") pasta has been boiled LONGER, until it is SOFT all the way through with NO firmness and no core. It is more yielding, closer to the texture many people grew up with outside Italy, but it is more fragile, can become sticky or MUSHY, and breaks down faster in sauce.

Practical notes: package times usually give the al dente time (or a range — the lower end is al dente); taste-test a strand a minute or two before. For pasta that will be BAKED (lasagne, ziti), deliberately undercook it — even below al dente — because it keeps cooking in the oven in the sauce.`,
  ),
  k(
    'kb-gap-cook2-fillet-vs-cutlet',
    'Fillet vs cutlet',
    [
      'difference between a fillet and a cutlet', 'a fillet is a boneless piece of meat or fish cut from along the side or backbone often a whole tender muscle beef tenderloin filet mignon a fish fillet a chicken breast fillet', 'a cutlet is a thin slice of meat veal pork chicken turkey cut from the leg or ribs often pounded thin to an even thickness and typically breaded and pan-fried schnitzel veal Milanese',
      'a cutlet can also mean a small rib chop a lamb cutlet is a rib chop with bone', 'fillet emphasises boneless from a specific muscle cutlet emphasises a thin slice for quick frying',
    ],
    `A FILLET (US spelling often "filet") is a BONELESS piece of meat or fish, cut to follow and separate a whole muscle from the bone — usually a TENDER one, running along the animal's side or backbone. Examples: BEEF tenderloin, from which "filet mignon" steaks are cut; a FISH fillet, sliced from the side of the fish away from the ribs and backbone; a CHICKEN breast fillet (and the small "chicken tender" attached to it). The word stresses that it is boneless and from a specific, often prized muscle. As a verb, "to fillet" means to cut those boneless pieces off the bones.

A CUTLET is a THIN SLICE of meat — veal, pork, chicken, turkey — cut from the leg or loin and very often POUNDED with a mallet to an even, thin thickness so it cooks fast and evenly. Cutlets are the classic candidate for BREADING and PAN-FRYING: Wiener Schnitzel (veal), pork schnitzel, cotoletta / veal Milanese, chicken cutlets for parmigiana. The word stresses that it is a thin, quick-cooking slice.

Confusingly, "cutlet" ALSO means a small RIB CHOP in some contexts — a "lamb cutlet" is a single rib chop with the bone, and a "veal cutlet" can mean a rib chop too.

Short version: fillet = boneless, from a tender lengthwise muscle; cutlet = a thin (often pounded, often breaded) slice for fast frying — or, for lamb, a rib chop.`,
  ),
];
