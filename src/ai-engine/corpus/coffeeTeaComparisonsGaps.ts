import { KnowledgeItem } from '../../types';

// Batch 298 corpus fixes — coffee/tea brewing "what's the difference between X and Y" topics.
// Strong domain overall, only 6/25 misses: one answer compared the wrong pair entirely
// (drip vs pour-over answered as drip vs espresso), a severe wrong-topic dodge (french press vs
// percolator answered with a Wikipedia dump about vacuum/siphon coffee makers and the history of
// the term "specialty coffee"), two incomplete answers that only covered one side of the
// comparison (cold brew vs iced coffee, kombucha vs tea), a weak/incomplete one (tea bag vs
// loose leaf), and one factual error (claiming espresso is "primarily robusta beans" — espresso
// isn't a bean species, it's a roast/blend choice, and can be made from arabica, robusta, or both).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Cooking',
  keywords,
  content,
  createdAt: now,
});

export const COFFEE_TEA_COMPARISONS_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-coffeetea-drip-vs-pourover',
    'Drip coffee vs pour-over coffee',
    ['drip coffee', 'pour-over coffee', 'difference drip pour-over'],
    "Both drip coffee and pour-over use gravity and hot water passing through a filter of ground coffee, so they can sound similar, but the real difference is control and automation. Drip coffee usually means an automatic drip coffee maker: a machine heats water and drips it over grounds in a basket at a fixed, preset rate with no manual involvement once you hit start, typically brewing a full pot at once. Pour-over is a fully manual, hands-on method — you personally pour hot water over grounds sitting in a cone-shaped filter (like a Hario V60 or Chemex), slowly and deliberately, often in stages starting with a short 'bloom' pour, giving you direct control over water temperature, pour rate, and how evenly the grounds get saturated — usually done one cup at a time for a cleaner, more deliberate cup. The key difference: drip coffee is made by an automatic machine at a fixed rate with minimal control, usually brewing a full pot, while pour-over is a manual, single-serving method where the person pouring controls the water temperature, speed, and technique.",
  ),
  k(
    'kb-gap-coffeetea-coldbrew-vs-icedcoffee',
    'Cold brew vs iced coffee',
    ['cold brew', 'iced coffee', 'difference cold brew iced coffee'],
    "Iced coffee is just regular coffee, brewed hot the normal way (drip, French press, whatever method), then poured over ice to cool it down quickly — the whole process takes minutes, same as making a regular cup. Cold brew is a completely different, much slower process: coarsely ground coffee is steeped in room-temperature or cold water for a long time, typically 12 to 24 hours, with no heat involved at all, then strained/filtered. Because heat is never applied, cold brew extracts differently than hot brewing — it pulls out less of the acids and oils that heat typically extracts, giving a smoother, less bitter, naturally sweeter taste, and it's usually made as a concentrate that gets diluted with water, milk, or ice before drinking. The key difference: iced coffee is hot-brewed coffee simply cooled down with ice in minutes, while cold brew is steeped in cold water with no heat for 12-24 hours, producing a smoother, less acidic, less bitter concentrate.",
  ),
  k(
    'kb-gap-coffeetea-teabag-vs-looseleaf',
    'Tea bag vs loose leaf tea',
    ['tea bag', 'loose leaf tea', 'difference tea bag loose leaf'],
    "Tea bags typically contain smaller, more broken-down tea particles — often called 'fannings' or 'dust,' the leftover fragments from processing whole leaves — packed tightly into a small bag; that smaller particle size means faster flavor release when steeping, but also faster staling and generally less complex flavor, since more surface area is exposed to air during storage and the confined bag doesn't give the tiny pieces much room to expand. Loose leaf tea uses whole or large pieces of leaf, generally considered higher quality, which have plenty of room to fully unfurl and expand as they steep, releasing their oils and flavor more gradually and giving a more complex, nuanced cup — but it requires a separate infuser, strainer, or teapot with a built-in filter rather than just dunking a bag. The key difference: tea bags usually hold small, broken leaf fragments confined in a bag for fast, convenient steeping, while loose leaf tea uses whole or large leaf pieces that expand fully during steeping, generally producing a more complex, higher-quality cup but requiring separate infusing equipment.",
  ),
  k(
    'kb-gap-coffeetea-frenchpress-vs-percolator',
    'French press vs percolator',
    ['french press', 'percolator', 'difference french press percolator'],
    "A French press is an immersion brewing method — coarsely ground coffee sits steeping directly in hot water inside a cylindrical carafe for several minutes, and then a mesh plunger is pressed straight down through the liquid to separate the grounds from the brewed coffee; because that mesh filter lets through more oils and fine particles than a paper filter would, French press coffee tends to come out fuller-bodied and richer. A percolator works completely differently — it's a pot with a heating chamber at the bottom, and as the water heats, it continuously bubbles up through a tube and sprays back down over the grounds sitting in a metal basket, cycling over and over until the coffee reaches the desired strength. Brewing this way tends to over-extract the coffee, because the same near-boiling water keeps passing over the same grounds repeatedly, which is why percolator coffee often comes out harsher, more bitter, or even a bit burnt-tasting compared to other methods. The key difference: a French press is a one-time immersion method (steep once, then press/filter) giving a rich, full-bodied cup, while a percolator repeatedly cycles boiling water through the same grounds, which tends to over-extract and produce a harsher, more bitter cup.",
  ),
  k(
    'kb-gap-coffeetea-kombucha-vs-tea',
    'Kombucha vs tea',
    ['kombucha', 'tea', 'difference kombucha tea'],
    "Tea, in the strict 'true tea' sense, is simply brewed leaves of Camellia sinensis steeped in hot water — depending on how those leaves were processed and oxidized, you get black, green, white, or oolong tea, but it's just a plain infusion with no fermentation involved. Kombucha starts from that same idea — brewed, sweetened tea (usually black or green) as its base — but then that sweet tea gets fermented for anywhere from about a week to several weeks using a SCOBY (a Symbiotic Culture Of Bacteria and Yeast), which consumes the sugar and produces carbon dioxide (giving kombucha its natural fizz), a small amount of alcohol (typically under 0.5%), and various acids like acetic acid, giving kombucha its distinctly tangy, vinegary, effervescent taste that's completely different from the plain, unfermented flavor of tea itself. The key difference: tea is a simple, unfermented infusion of Camellia sinensis leaves, while kombucha starts from that same brewed tea but is then fermented for days or weeks with a SCOBY, turning it into a tangy, fizzy, slightly alcoholic drink very different from plain tea.",
  ),
  k(
    'kb-gap-coffeetea-espressobeans-vs-regularbeans',
    'Espresso beans vs regular coffee beans',
    ['espresso beans', 'regular coffee beans', 'difference espresso beans regular coffee beans'],
    "There's actually no separate botanical species called 'espresso beans' — espresso can be made from arabica beans, robusta beans, or a blend of both, exactly like regular drip coffee can; the beans themselves aren't a different plant. What people usually mean by 'espresso beans' or 'espresso roast' is really about the ROAST LEVEL and BLEND, not a different type of bean: beans sold and labeled for espresso are typically roasted darker, bringing out bolder, less acidic, more caramelized and bittersweet flavors that hold up well when mixed with milk, and are often blended specifically to produce good crema and a balanced intensity under high-pressure extraction. 'Regular' coffee beans sold for drip brewing, by contrast, are often roasted lighter to preserve more of the bean's original, brighter, more acidic flavor notes, since they won't be facing the same high-pressure extraction or milk dilution. The key difference: 'espresso beans' and 'regular coffee beans' aren't different species of bean — the real difference is roast level and blending choice (espresso beans are usually roasted darker and blended for pressure-brewing), not the underlying type of bean.",
  ),
];
