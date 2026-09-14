import { KnowledgeItem } from '../../types';

// Batch 307 corpus fixes — cocktails/spirits "what's the difference between X and Y" topics.
// Zero prior dedicated corpus coverage of distilled spirits/mixology (wine and coffee/tea were
// already covered in coffeeTeaWineGaps.ts, but spirits, cocktails, and bar terminology had
// nothing) — 22/26 misses, in line with other brand-new zero-coverage domains (watches 20/25,
// martial arts 17/25). Failure patterns: severe wrong-domain hallucinations (gin question
// answered with the 1794 COTTON GIN/Eli Whitney; margarita vs paloma answered with a 2014
// Bollywood film "Margarita with a Straw" and Spanish royal family trivia; proof vs ABV answered
// with ART-PRINT "proof" numbering; absinthe vs ouzo answered with generic cocktail/beer-brewing
// definitions, never touching either drink), one severe factual inversion (claimed "neat" means
// serving over ice and "up" means a large ice chunk — both backwards, neat is no ice at all and
// up is chilled with no ice), one flat factual error (claimed stirring and shaking a cocktail are
// "basically the same thing"), and a large number of severe cut-offs where only the first half of
// a comparison was ever explained (martini/manhattan, mojito/daiquiri, simple syrup/grenadine,
// liqueur/spirit, dry/sweet vermouth, old fashioned/sazerac, muddler/jigger all one-sided).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'culture',
  keywords,
  content,
  createdAt: now,
});

export const COCKTAILS_SPIRITS_COMPARISONS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-cocktails-gin-vs-vodka',
    'Gin vs vodka',
    ['gin', 'vodka', 'difference gin vodka'],
    "Vodka is a neutral spirit — distilled (traditionally from grain or potatoes) to a very high proof and then typically filtered until it has as little distinctive flavor and aroma as possible, prized for being clean and nearly odorless. Gin starts out the same way, as a neutral base spirit, but is then redistilled or infused with botanicals — juniper berries are the legally required, defining flavor, alongside a mix of other botanicals like coriander, citrus peel, angelica root, or cardamom depending on the style. That's why gin tastes distinctly herbal/piney while vodka is designed to taste like almost nothing. The key difference: vodka is a neutral spirit distilled and filtered to have minimal flavor, while gin is that same kind of base spirit flavored with juniper and other botanicals, giving it a distinct herbal taste vodka doesn't have.",
  ),
  k(
    'kb-gap-cocktails-bourbon-vs-whiskey',
    'Bourbon vs whiskey in general',
    ['bourbon', 'whiskey', 'whisky', 'difference bourbon whiskey'],
    "Whiskey (or whisky) is the broad umbrella category: any distilled spirit made from fermented grain mash and aged in wooden barrels — it includes bourbon, Scotch, rye, Irish whiskey, Tennessee whiskey, and more. Bourbon is one specific type of American whiskey within that category, legally required (in the US) to be made from a mash of at least 51% corn, distilled to no more than 160 proof, aged in new charred oak barrels, and produced in the United States (not just Kentucky, despite the association). So bourbon isn't a competing category to whiskey — it's a subset of it, the same way a golden retriever is a subset of 'dog.' The key difference: whiskey is the general category of grain-based, barrel-aged spirits, while bourbon is one specific legally defined American type of whiskey within that broader category.",
  ),
  k(
    'kb-gap-cocktails-bourbon-vs-scotch',
    'Bourbon vs Scotch',
    ['bourbon', 'scotch', 'scotch whisky', 'difference bourbon scotch'],
    "Bourbon is American whiskey made from a mash that's at least 51% corn, aged in brand-new charred oak barrels (which can only be used once for bourbon), giving it a sweeter profile with notes of vanilla, caramel, and oak. Scotch is whisky made in Scotland, legally required to be aged at least 3 years, made primarily from malted barley (single malt) or a mix of malted barley and other grains (blended), and typically aged in used barrels (often ones that previously held bourbon or sherry), which gives a drier, more restrained flavor profile that lets the grain and sometimes peat-smoke character come through rather than heavy vanilla-oak sweetness. Scotch is also spelled without the 'e' (whisky), while American whiskey typically keeps it. The key difference: bourbon is corn-based, aged in new charred oak barrels for a sweeter profile, while Scotch is barley-based, made in Scotland, aged in used barrels for a drier, often smokier character.",
  ),
  k(
    'kb-gap-cocktails-rye-vs-bourbon',
    'Rye whiskey vs bourbon',
    ['rye whiskey', 'bourbon', 'difference rye bourbon'],
    "Both are American whiskeys made under very similar legal rules (new charred oak barrels, distilled below 160 proof), but the mash bill requirement is different: bourbon must be at least 51% corn, while rye whiskey must be at least 51% rye grain. That grain difference drives the flavor — corn brings natural sweetness (vanilla, caramel, honey notes), while rye brings a spicier, drier, peppery bite with less sweetness. Because of that spicier edge, rye is often preferred in classic cocktails like the Manhattan or Sazerac where bartenders want the drink to stay balanced rather than turn cloying. The key difference: bourbon's mash is at least 51% corn for a sweeter profile, while rye whiskey's mash is at least 51% rye grain for a spicier, drier profile.",
  ),
  k(
    'kb-gap-cocktails-single-malt-vs-blended-scotch',
    'Single malt vs blended Scotch',
    ['single malt scotch', 'blended scotch', 'difference single malt blended scotch'],
    "Single malt Scotch is made entirely from malted barley at one single distillery — it can still be a blend of many different casks and years from that one distillery, but everything in the bottle comes from that one place, giving each single malt a distinctive, distillery-specific character. Blended Scotch (which makes up the large majority of Scotch sold worldwide, including big names like Johnnie Walker and Chivas Regal) combines whiskies from multiple different distilleries — typically mixing flavorful single malts with lighter, cheaper single grain whiskies (made from other grains like wheat or corn, not just malted barley) — blended by a master blender to hit a consistent house flavor profile year after year. The key difference: single malt Scotch comes entirely from one distillery using only malted barley, while blended Scotch combines whiskies (often several single malts plus grain whisky) from multiple distilleries into one consistent blend.",
  ),
  k(
    'kb-gap-cocktails-rum-vs-whiskey',
    'Rum vs whiskey',
    ['rum', 'whiskey', 'difference rum whiskey'],
    "Whiskey is distilled from fermented grain mash — barley, corn, rye, or wheat. Rum is distilled from sugarcane byproducts instead: either fresh sugarcane juice or, far more commonly, molasses (the thick, dark syrup left over after sugar is refined from cane). That base ingredient difference is what separates the two categories entirely — whiskey's flavor comes from grain and the barrel, while rum's flavor comes from sugarcane/molasses and the barrel, giving rum a characteristic sweetness whiskey doesn't have even when aged in similar oak barrels. Rum is also mostly produced in the Caribbean and Latin America, while whiskey production is centered in places like Scotland, Ireland, and the US. The key difference: whiskey is distilled from fermented grain, while rum is distilled from sugarcane juice or molasses, which is why rum tastes sweeter even when both are barrel-aged.",
  ),
  k(
    'kb-gap-cocktails-white-vs-dark-rum',
    'White rum vs dark rum',
    ['white rum', 'dark rum', 'light rum', 'difference white rum dark rum'],
    "White (or 'light'/'silver') rum is aged only briefly, then filtered (often through charcoal) to strip out color and much of the barrel flavor, leaving a clean, relatively neutral, mildly sweet spirit that's why it's the standard choice for mojitos and daiquiris where the rum shouldn't overpower other ingredients. Dark rum is aged much longer in charred oak barrels (sometimes ones previously used for bourbon or sherry) without that stripping/filtering step, so it picks up deep caramel, molasses, vanilla, and spice notes from extended wood contact, and often has caramel coloring added for consistency — it's richer and more sipping-friendly, and shows up in drinks like a dark 'n' stormy or rum old fashioned where that bolder flavor is wanted. The key difference: white rum is lightly aged and filtered for a clean, neutral taste, while dark rum is aged much longer in oak (unfiltered) for a deep caramel, spiced, molasses-forward flavor.",
  ),
  k(
    'kb-gap-cocktails-tequila-vs-mezcal',
    'Tequila vs mezcal',
    ['tequila', 'mezcal', 'agave spirit', 'difference tequila mezcal'],
    "Tequila is actually a specific type of mezcal, legally restricted to being made only from blue Weber agave, only in designated regions of Mexico (mainly around the town of Tequila, Jalisco), and it's almost always produced by steaming the agave hearts in large ovens or autoclaves before distillation, typically in column stills — a process that yields a relatively clean, smooth spirit. Mezcal is the broader category: it can legally be made from over 30 different agave species, produced across several Mexican states (Oaxaca is the biggest producer), and traditionally roasted in underground pits lined with hot rocks and wood — that roasting is what gives most mezcal its signature smoky flavor, which tequila almost never has. The key difference: tequila is one narrowly defined type of mezcal made only from blue agave with no traditional smoking step, while mezcal is the broader category made from many agave species, traditionally pit-roasted for a smoky flavor.",
  ),
  k(
    'kb-gap-cocktails-cocktail-vs-mocktail',
    'Cocktail vs mocktail',
    ['cocktail', 'mocktail', 'difference cocktail mocktail'],
    "A cocktail is a mixed drink that includes at least one distilled spirit (vodka, gin, rum, whiskey, tequila, etc.) as its alcoholic base, combined with other ingredients like juice, syrup, bitters, or soda to balance and flavor it. A mocktail is built the exact same way — mixed with the same kind of care around balancing sweet, sour, and bitter elements, often even garnished identically — but deliberately leaves out the alcohol entirely, using non-alcoholic substitutes (like flavored syrups, shrubs, or non-alcoholic spirit alternatives) in place of the spirit, so it can be enjoyed by people who aren't drinking alcohol without missing out on the presentation or flavor complexity. The key difference: a cocktail always contains at least one alcoholic spirit as its base, while a mocktail is a non-alcoholic drink built with the same mixing technique but no alcohol at all.",
  ),
  k(
    'kb-gap-cocktails-stirring-vs-shaking',
    'Stirring vs shaking a cocktail',
    ['stirring cocktail', 'shaking cocktail', 'difference stirring shaking cocktail'],
    "These are not the same thing, and bartenders choose between them deliberately. Stirring (mixing spirits and ice gently with a bar spoon in a mixing glass, then straining) is used for drinks made entirely of spirits — like a Martini or Manhattan — because it chills and slightly dilutes the drink without introducing air bubbles, keeping the final drink silky-smooth and crystal clear. Shaking (violently agitating the ingredients with ice in a cocktail shaker) is used for drinks that include juice, egg white, cream, or other non-alcoholic mixers — like a Daiquiri or Whiskey Sour — because the vigorous motion chills and dilutes the drink faster, aerates it, and emulsifies those thicker ingredients, producing a drink with a slight foam and a cloudier appearance that would look and feel wrong (and over-dilute or over-aerate) if it were done to an all-spirit drink. The key difference: stirring is used for clear, all-spirit drinks to chill them gently without adding air or cloudiness, while shaking is used for drinks with juice or other mixers to chill, dilute, and aerate them faster, producing a frothier, slightly cloudy result.",
  ),
  k(
    'kb-gap-cocktails-martini-vs-manhattan',
    'Martini vs Manhattan',
    ['martini', 'manhattan', 'difference martini manhattan cocktail'],
    "A Martini is built around gin (or sometimes vodka) and dry vermouth, stirred with ice and strained into a chilled glass, typically garnished with an olive or a lemon twist — it's crisp, dry, and botanical-forward. A Manhattan is built around whiskey (traditionally rye, though bourbon is also common) and sweet vermouth, plus a couple dashes of Angostura bitters, also stirred and strained, typically garnished with a maraschino cherry — it's a richer, sweeter, spicier drink than a Martini. Both are classic 'stirred, all-spirit' cocktails served up in a stemmed glass, but the base spirit (clear/botanical gin vs. brown/grain whiskey), the vermouth style (dry vs. sweet), and the bitters (none vs. Angostura) all differ. The key difference: a Martini is gin and dry vermouth for a crisp, dry drink, while a Manhattan is whiskey, sweet vermouth, and bitters for a richer, sweeter, spicier one.",
  ),
  k(
    'kb-gap-cocktails-mojito-vs-daiquiri',
    'Mojito vs daiquiri',
    ['mojito', 'daiquiri', 'difference mojito daiquiri'],
    "A daiquiri is a simple, three-ingredient shaken cocktail: white rum, fresh lime juice, and simple syrup, shaken with ice and strained into a chilled glass — sharp, clean, and fast to make. A mojito starts from a similar rum/lime/sugar base but is a fundamentally different style of drink: fresh mint leaves are muddled right in the glass to release their oils, the ingredients are built (not shaken) over crushed or cubed ice, and it's topped off with soda water for effervescence, making it a longer, more refreshing, lower-ABV sipping drink rather than a short, punchy shaken cocktail. The key difference: a daiquiri is a short, shaken rum-lime-sugar drink with no mint or soda, while a mojito adds muddled mint and a soda-water top, built over ice into a longer, fizzier drink.",
  ),
  k(
    'kb-gap-cocktails-margarita-vs-paloma',
    'Margarita vs paloma',
    ['margarita', 'paloma', 'difference margarita paloma'],
    "A Margarita is tequila, orange liqueur (like triple sec or Cointreau), and fresh lime juice, shaken with ice, often served in a salt-rimmed glass — it's tart, citrus-forward, and relies on the orange liqueur for its sweetness. A Paloma is also tequila-based but swaps the orange liqueur and shaking for grapefruit soda (or fresh grapefruit juice plus soda water) and lime juice, typically built directly in a tall glass over ice rather than shaken — it's lighter, fizzier, and more refreshing, with grapefruit's bittersweet flavor replacing the Margarita's orange-liqueur sweetness. In Mexico, the Paloma is actually more commonly ordered than the Margarita. The key difference: a Margarita mixes tequila, orange liqueur, and lime juice shaken together, while a Paloma mixes tequila with grapefruit soda and lime, built over ice rather than shaken.",
  ),
  k(
    'kb-gap-cocktails-simple-syrup-vs-grenadine',
    'Simple syrup vs grenadine',
    ['simple syrup', 'grenadine', 'difference simple syrup grenadine'],
    "Simple syrup is just sugar dissolved in water (typically a 1:1 ratio by volume, heated or stirred until the sugar fully dissolves) — it's flavorless beyond pure sweetness, used purely to sweeten a cocktail without adding any other taste or color. Grenadine is a specific flavored syrup traditionally made from pomegranate juice and sugar, giving it a distinct tart-sweet fruit flavor and a deep red color — it's used both for its taste (in drinks like the Jack Rose or Clover Club) and for its color, famously used to create the sunset-layered look in a Tequila Sunrise by letting it sink and pool at the bottom of the glass. The key difference: simple syrup is plain sugar water used only to add sweetness with no flavor or color, while grenadine is a pomegranate-flavored red syrup used to add both a distinct tart-sweet taste and a visible red color.",
  ),
  k(
    'kb-gap-cocktails-liqueur-vs-spirit',
    'Liqueur vs spirit',
    ['liqueur', 'spirit', 'difference liqueur spirit'],
    "A spirit is a distilled alcoholic drink on its own — vodka, gin, rum, whiskey, tequila — generally unsweetened and bottled at a relatively high, fairly consistent proof, meant to be a base that can be sipped neat or mixed into other drinks. A liqueur starts from a spirit base but has sugar and flavoring added afterward — fruit, herbs, spices, cream, coffee, or nuts, depending on the type (think Cointreau, Kahlúa, Baileys, or amaretto) — which makes liqueurs noticeably sweeter and usually lower in alcohol content than the base spirits they're built from. Liqueurs are almost never the sole alcohol in a cocktail; they're used in smaller amounts alongside a base spirit to add flavor and sweetness. The key difference: a spirit is an unsweetened distilled base alcohol, while a liqueur is a spirit that's had sugar and flavoring added, making it sweeter and typically lower-proof.",
  ),
  k(
    'kb-gap-cocktails-dry-vs-sweet-vermouth',
    'Dry vermouth vs sweet vermouth',
    ['dry vermouth', 'sweet vermouth', 'difference dry sweet vermouth'],
    "Dry vermouth (typically made from white wine) is pale, herbal, and notably less sweet — it's flavored with botanicals but has much less added sugar than sweet vermouth, giving it a crisp, slightly bitter, aromatic profile. It's the vermouth used in a classic dry Martini. Sweet vermouth (traditionally made from red wine, sometimes called 'rosso' or Italian vermouth) has significantly more sugar added along with caramel coloring and a heavier botanical/spice profile, giving it a darker color and a rich, syrupy, slightly bitter-sweet character. It's the vermouth used in a Manhattan or a Negroni. Both are aromatized, fortified wines, but they're used for very different flavor roles behind the bar. The key difference: dry vermouth is pale, herbal, and low in sugar (used in Martinis), while sweet vermouth is darker, richer, and noticeably sweeter (used in Manhattans and Negronis).",
  ),
  k(
    'kb-gap-cocktails-old-fashioned-vs-sazerac',
    'Old Fashioned vs Sazerac',
    ['old fashioned', 'sazerac', 'difference old fashioned sazerac'],
    "An Old Fashioned is whiskey (bourbon or rye), sugar, a few dashes of Angostura bitters, and a bit of water, stirred with ice and garnished with an orange peel (and often a cherry) — one of the oldest and simplest whiskey cocktails, letting the whiskey stay the clear star. A Sazerac is a similar whiskey-sugar-bitters build (traditionally rye, with Peychaud's bitters instead of Angostura) but with two key differences: the glass is first rinsed with absinthe (swirled around and discarded, leaving just a faint anise aroma coating the glass) rather than any absinthe going into the mix itself, and it's served without ice, 'up' in a chilled glass with a lemon peel expressed over the top rather than added directly. Both hail from New Orleans-adjacent whiskey cocktail history, but the absinthe rinse and no-ice serving style set the Sazerac apart. The key difference: an Old Fashioned is whiskey, sugar, and Angostura bitters served over ice, while a Sazerac swaps in Peychaud's bitters, adds an absinthe-rinsed glass, and is served up with no ice.",
  ),
  k(
    'kb-gap-cocktails-proof-vs-abv',
    'Proof vs ABV',
    ['proof alcohol', 'abv', 'alcohol by volume', 'difference proof abv'],
    "ABV (alcohol by volume) is the straightforward, internationally standard measure of how much of a drink's total volume is pure ethanol, expressed as a percentage — a beer at 5% ABV is 5% alcohol by volume. Proof is an older way of expressing the same underlying alcohol content, but the math differs by country: in the US, proof is simply double the ABV (so 80 proof = 40% ABV, 100 proof = 50% ABV), while historically the UK used a different formula based on gunpowder ignition tests (proof spirit was the point at which alcohol-soaked gunpowder would still ignite), which worked out to roughly 1.75 times the ABV rather than exactly double — most countries have since standardized around the simpler US-style doubling convention or dropped 'proof' in favor of ABV alone. The key difference: ABV is the direct percentage of alcohol in a drink, while proof is an alternate scale for the same thing that (in the US system) is always exactly double the ABV number.",
  ),
  k(
    'kb-gap-cocktails-neat-vs-rocks-vs-up',
    'Neat vs on the rocks vs up',
    ['neat drink', 'on the rocks', 'up drink', 'difference neat rocks up'],
    "'Neat' means a spirit poured straight, at room temperature, with absolutely no ice, water, or mixer added — just the pure liquor in a glass. 'On the rocks' means the drink is served over ice cubes in the glass, which chills it and gradually dilutes it as the ice melts while you drink. 'Up' means the drink (which may include multiple ingredients, like a Martini or Manhattan) was chilled with ice during mixing — shaken or stirred — but then strained so the finished drink is served in a stemmed glass with no ice at all, cold but never diluting further. So neat and up both end up with no ice in the glass, but neat was never chilled or mixed with ice at all, while up was chilled and diluted during mixing before the ice was strained out. The key difference: neat is unchilled with no ice ever involved, on the rocks is served over ice in the glass, and up is chilled/mixed with ice first but then strained so no ice makes it into the final glass.",
  ),
  k(
    'kb-gap-cocktails-muddler-vs-jigger',
    'Muddler vs jigger',
    ['muddler', 'jigger', 'bar tools', 'difference muddler jigger'],
    "A muddler is a blunt tool, usually a heavy wooden or plastic stick with a flat or rounded end, used to press and crush ingredients like mint leaves, fruit, or sugar directly in the glass or shaker — releasing their juices, oils, or aromatics (crucial for drinks like a mojito or a whiskey smash) without pureeing them into mush. A jigger is a completely different kind of tool: a small, usually hourglass-shaped double-sided metal measuring cup (one side typically holds 1 oz/1.5 oz, the other side a different measure) used to precisely measure liquid ingredients — spirits, juices, syrups — so a recipe's ratios come out consistent every time rather than 'eyeballed.' One is for crushing/releasing flavor, the other is purely for measuring volume. The key difference: a muddler is used to crush and release flavor from ingredients like mint or fruit, while a jigger is a measuring tool used to precisely portion liquid ingredients — they serve completely different functions behind the bar.",
  ),
  k(
    'kb-gap-cocktails-mixologist-vs-bartender',
    'Mixologist vs bartender',
    ['mixologist', 'bartender', 'difference mixologist bartender'],
    "A bartender is anyone who serves drinks — including beer, wine, and simple standard cocktails — behind a bar, and the role also typically covers running a tab, managing inventory, and general customer service; it's a broad job title covering everything from a casual pub to a five-star hotel bar. 'Mixologist' is a more specific (and somewhat trendier/self-styled) term for someone who treats cocktail-making as a craft: developing original recipes, deeply understanding spirit production and flavor pairing, using techniques like house-made syrups, infusions, or unusual bitters, and often working in cocktail-focused bars where drink-making itself is the main draw rather than just one part of the job. Every mixologist is functionally doing bartending work, but not every bartender identifies as (or is doing) mixology — the term is about specialization and craft focus, not a separate licensed profession. The key difference: bartender is the broad job title for anyone serving drinks at a bar, while mixologist specifically describes someone focused on cocktail craft — recipe development, technique, and flavor pairing — as a specialized skill within that job.",
  ),
  k(
    'kb-gap-cocktails-absinthe-vs-ouzo',
    'Absinthe vs ouzo (and other anise liqueurs)',
    ['absinthe', 'ouzo', 'anise liqueur', 'pastis', 'sambuca', 'difference absinthe ouzo'],
    "Absinthe is a very high-proof (typically 45-74% ABV) distilled spirit flavored primarily with wormwood (Artemisia absinthium, which contains thujone, the compound behind absinthe's old 'hallucinogenic' reputation — largely a myth, since legal absinthe contains only trace thujone), along with anise and other herbs; it's traditionally diluted with iced water dripped slowly over a sugar cube, which turns it cloudy (the 'louche' effect). Ouzo is a lower-proof (typically 37-45% ABV) Greek anise-flavored spirit or liqueur, made by redistilling or flavoring a neutral spirit with anise (and often other spices) but with no wormwood at all, and is usually sipped mixed with water or over ice rather than through a sugar-cube ritual, also turning cloudy from the anise oils when water is added. Other anise spirits like French pastis and Italian sambuca follow similar wormwood-free anise-flavor patterns to ouzo, just from different regions and recipes. The key difference: absinthe is a very high-proof spirit built around wormwood (plus anise) traditionally served with a sugar-cube water ritual, while ouzo is a lower-proof Greek anise spirit with no wormwood, simply mixed with water or ice.",
  ),
];
