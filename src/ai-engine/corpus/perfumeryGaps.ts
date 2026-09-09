import { KnowledgeItem } from '../../types';

// Batch 136 (perfumery) — a weak category on nexus-4b. "what are aldehydes in
// perfume" dumped the Wikipedia articles for the perfumes Kouros and Arpège;
// "absolute vs essential oil" was answered about the ASTRONOMICAL absolute
// magnitude of stars; "what is musk in perfume" rambled about Elon Musk buying
// Twitter and invented a perfume called "Communissima"; "role of alcohol in
// perfume" was answered about the placenta and alcohol; "dry down" dumped a
// film plot summary. Raw web dumps for fixative, sillage, oud, chypre,
// fougère, fragrance families and headspace technology.
export const PERFUMERY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-perf-notes',
    title: 'Top, Heart, and Base Notes (the Fragrance Pyramid)',
    category: 'Perfumery',
    keywords: [
      'what are the top middle heart and base notes in perfume the fragrance pyramid', 'notes are grouped by how fast the molecules evaporate their volatility a perfume unfolds over time as the lighter molecules leave first',
      'top notes the most volatile the first impression last about 5 to 15 minutes citrus bergamot lemon light herbs aldehydes heart or middle notes emerge as the top fades last around 30 minutes to a few hours the florals and spices rose jasmine geranium cinnamon the character of the scent',
      'base notes the heaviest least volatile molecules last many hours to days and also slow the evaporation of everything above them fixatives musk amber vanilla sandalwood cedar patchouli oakmoss benzoin labdanum',
    ],
    content: `A perfume is not one smell — it is a sequence, because its ingredients evaporate at different rates. Perfumers describe this as a three-tier "pyramid." TOP NOTES (head notes): the smallest, most volatile molecules, which you smell in the first seconds and which are gone in roughly 5–15 minutes. They are the opening impression — typically citrus (bergamot, lemon, grapefruit), light aromatic herbs, ozonic/marine notes, and aldehydes. HEART NOTES (middle notes): emerge as the top notes burn off and dominate for the next 30 minutes to a few hours. They carry the perfume's personality — most florals (rose, jasmine, ylang-ylang, tuberose, geranium), spices (cardamom, cinnamon, pepper), and fruity notes. BASE NOTES: the largest, heaviest, least volatile molecules, which appear after an hour or so and can last many hours or even days on skin and clothing. They give depth and staying power and also act as fixatives, slowing the evaporation of the lighter notes above them: musks, ambergris/amber, vanilla, tonka, sandalwood, cedar, vetiver, patchouli, oakmoss, benzoin, labdanum, leather. The transitions overlap rather than switching cleanly, and the final base-note phase is called the "dry down."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-concentrations',
    title: 'Parfum vs Eau de Parfum vs Eau de Toilette vs Eau de Cologne',
    category: 'Perfumery',
    keywords: [
      'what is the difference between eau de parfum eau de toilette and eau de cologne concentration', 'the names refer to the percentage of fragrance oil aromatic compounds dissolved in the alcohol and water base a higher percentage means a stronger and longer lasting scent and usually a higher price',
      'parfum or extrait de parfum about 15 to 40 percent lasts 6 to 12 hours plus eau de parfum edp about 10 to 20 percent 4 to 8 hours eau de toilette edt about 5 to 15 percent 2 to 4 hours',
      'eau de cologne edc about 2 to 5 percent 1 to 2 hours eau fraiche about 1 to 3 percent note that classic eau de cologne also refers to a specific light citrus herbal style from cologne germany 4711',
    ],
    content: `These names indicate the concentration of fragrance oil ("aromatic compounds" or "juice") dissolved in the alcohol/water carrier — not "richness" or quality as such, though a higher concentration does make a scent stronger and longer-lasting (and usually pricier, since the oils are the expensive part). Approximate ranges (brands vary widely): PARFUM / EXTRAIT DE PARFUM ~15–40%, lasts 6–12+ hours, applied sparingly, often dabbed. EAU DE PARFUM (EDP) ~10–20%, lasts 4–8 hours — the most common format for modern releases. EAU DE TOILETTE (EDT) ~5–15%, lasts 2–4 hours, brighter and more "spray-able." EAU DE COLOGNE (EDC) ~2–5%, lasts 1–2 hours. EAU FRAÎCHE ~1–3%. Two cautions: (1) longevity also depends heavily on the specific ingredients — a woody-amber EDT can outlast a citrus EDP; (2) "eau de cologne" also names a distinct fragrance STYLE — the light, sparkling citrus-and-herb blend originating in Cologne, Germany in the 1700s (4711, Roger & Gallet) — separate from the concentration meaning. In North America "cologne" is also used loosely to mean any men's fragrance regardless of strength.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-accord',
    title: 'What a Perfume Accord Is',
    category: 'Perfumery',
    keywords: [
      'what is a perfume accord', 'a blend of two or more raw materials that together smell like a single new unified scent that no longer smells like its parts the perfumery equivalent of a chord in music this is not the same as the top middle base note pyramid',
      'examples a rose accord is not just rose oil it is rose oil plus phenylethyl alcohol plus geraniol plus damascones plus other materials tuned to read as a fuller more radiant rose than any single ingredient',
      'abstract accords exist for things with no natural material a marine or ozonic accord built around calone an amber accord from labdanum plus vanilla plus benzoin a fresh cut grass accord a leather accord perfumers build a formula out of a handful of accords rather than dozens of loose notes',
    ],
    content: `An accord is a combination of two or more perfumery raw materials that, blended in the right proportions, fuse into a single new smell — one that reads as its own thing rather than as its separate ingredients. It is the direct analogy of a chord in music (the word is the same root), and it is the basic building block a perfumer actually works with: a modern formula is assembled from perhaps five to fifteen accords rather than from dozens of individual notes. Two kinds: (1) a REINFORCED-NATURAL accord — for example a "rose accord" is rarely just rose oil; it is rose oil plus phenylethyl alcohol, geraniol, citronellol, rose damascones and other materials chosen to make a rounder, brighter, more three-dimensional rose than the oil alone. (2) an ABSTRACT or FANTASY accord — a smell that has no single natural source, built from scratch: a "marine/ozonic" accord around the aroma-chemical Calone, an "amber" accord from labdanum + vanillin + benzoin + labdanum, a "fresh laundry" musk accord, a "leather" accord from birch tar and isoquinolines, a "fig" or "rain" accord. Naming an accord after a flower or object is a claim about the impression it creates, not its contents.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-fixative',
    title: 'What a Fixative Does in Perfume',
    category: 'Perfumery',
    keywords: [
      'what is a fixative in perfume', 'a material that slows down the evaporation of the more volatile ingredients so the fragrance lasts longer on the skin and its different notes fade at a more even rate instead of the top notes vanishing all at once',
      'it works by lowering the overall vapour pressure of the blend heavy low volatility molecules physically hold the lighter ones the base notes of a perfume are almost always also its fixatives',
      'classic fixatives natural musks ambergris civet castoreum benzoin labdanum myrrh orris root oakmoss and synthetic ones iso e super ambroxan galaxolide and other musks',
    ],
    content: `A fixative is an ingredient added to a perfume specifically to make it last longer and evolve more gracefully. Without fixatives, the light, volatile top-note molecules flash off within minutes and the scent collapses; a fixative slows that evaporation and "holds" the composition together. It works physically: heavy, low-volatility molecules lower the average vapour pressure of the whole blend and reduce how fast the lighter molecules can leave the skin's surface, so the fragrance releases its notes more slowly and in a more balanced way. In practice a perfume's base notes ARE its fixatives — they do both jobs at once. Classic natural fixatives: the animal materials (musk, ambergris, civet, castoreum — now almost all replaced by synthetics), balsams and resins (benzoin, labdanum, myrrh, tolu, styrax), orris (iris root), oakmoss, patchouli, vetiver, sandalwood. Key synthetic fixatives: the musks (Galaxolide, Habanolide, Exaltolide), Iso E Super, Ambroxan/Cetalox (an ambergris substitute), and Hedione. Fixation is also why a perfume smells "better" a few weeks after it is made — the maceration period lets the fixatives bind the blend.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-sillage',
    title: 'Sillage (and Projection and Longevity)',
    category: 'Perfumery',
    keywords: [
      'what is sillage in perfume', 'french for wake as in the trail a boat leaves in water sillage is the scent trail a person leaves behind them as they move through a space so that someone walking behind them or entering the room after can smell it',
      'it is not the same as projection which is how far the scent radiates from the wearer while they are standing still the bubble around them nor longevity which is how many hours the scent lasts on skin',
      'a perfume can be low sillage but long lasting a skin scent or high sillage a room filler heavy oriental and animalic base notes and aldehydes tend to give strong sillage',
    ],
    content: `"Sillage" (pronounced roughly "see-yazh") is French for the wake a boat leaves behind it in the water, and in perfume it means the trail of scent a wearer leaves in the air as they move — what a person walking behind them, or entering a lift after they have left it, smells. It is one of three separate qualities that fragrance enthusiasts distinguish: (1) SILLAGE — the trail left in your wake; (2) PROJECTION — how far the scent radiates outward from you while you are standing still, the size of the "scent bubble" around you (also called "throw"); and (3) LONGEVITY — how many hours the fragrance remains detectable on your skin. These vary independently: a soft musky "skin scent" can last twelve hours with almost no sillage, while a loud aldehydic or oriental fragrance can announce itself across a room and fade in four. Heavy, radiant materials — big white florals, aldehydes, ambers, oud, animalic notes, and some musks — tend to produce strong sillage; sheer citrus and delicate musks produce little. (Sillage is also, unrelatedly, the French title of a sci-fi comic series — nothing to do with perfume.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-aldehydes',
    title: 'Aldehydes in Perfume',
    category: 'Perfumery',
    keywords: [
      'what are aldehydes in perfume', 'a class of reactive organic compounds with a cho group at the end of the molecule in perfumery the word usually means the aliphatic or fatty aldehydes c8 through c12 which have a distinctive abstract smell',
      'the smell is hard to place soapy waxy metallic snuffed candle citrus peel starchy clean laundry with a fizzy sparkling lift they do not smell like any single flower or fruit they add radiance and a cool abstract quality on top of florals',
      'they became famous through chanel no 5 in 1921 where perfumer ernest beaux dosed them heavily creating the aldehydic floral genre other examples arpege white linen rive gauche calandre note some fruity and green notes are also technically aldehydes',
    ],
    content: `Aldehydes are a large family of organic compounds defined by a -CHO group (a carbonyl with a hydrogen) at the end of the carbon chain — they are chemically reactive and found throughout nature (in citrus peel, in cilantro, in rose). In perfumery, though, "aldehydes" as a stylistic term almost always means the long-chain ALIPHATIC ("fatty") aldehydes, roughly C-8 to C-13, especially C-10 (decanal), C-11 (undecanal) and C-12 (lauric aldehyde). Their smell is famously hard to name: soapy, waxy, starchy, faintly metallic, like a just-snuffed candle or hot ironing, with a cold citrus-peel zestiness and a fizzing, effervescent lift. They don't smell like a flower or a fruit — they add abstraction, sparkle, and a "clean" radiance floating above the rest of a composition. Their landmark use was Chanel No. 5 (1921), where the perfumer Ernest Beaux dosed the aldehydes far higher than anyone had dared, launching the whole "aldehydic floral" category (Arpège, Rive Gauche, White Linen, Calandre, Climat). Because they are reactive, aldehydes can also cause a perfume to change or "turn" with age.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-natural-synthetic',
    title: 'Natural vs Synthetic Fragrance Materials',
    category: 'Perfumery',
    keywords: [
      'what is the difference between natural and synthetic fragrance perfume', 'a natural material is a complex mixture of dozens or hundreds of molecules extracted from a plant or animal rose oil contains over 300 compounds it varies batch to batch by weather and harvest and can be very expensive or unsustainable',
      'a synthetic aroma chemical is usually a single defined molecule made in a lab it is consistent cheap per unit clean and often stronger and it can provide smells that no natural gives calone marine iso e super woody amber ethyl maltol candy floss helional',
      'almost every modern perfume blends both naturals for richness and depth synthetics for structure radiance longevity and cost natural does not mean safer many naturals are strong allergens and ifra restricts oakmoss bergamot and others',
    ],
    content: `A NATURAL fragrance material is an extract of a plant (or, rarely now, an animal) — an essential oil, absolute, resinoid, or CO₂ extract. It is a complex chemical soup: rose otto contains 300+ identified compounds, sandalwood dozens. Consequences: it smells rich and multifaceted, but it varies from batch to batch with the weather, soil, and harvest; supply and price swing wildly (a poor rose year, a jasmine shortage); some are unsustainable or ecologically damaging (rosewood, some sandalwood, agarwood); and many are potent skin allergens. A SYNTHETIC ("aroma-chemical") is typically a single, defined molecule made by chemical synthesis — sometimes an exact copy of a molecule found in nature (nature-identical), sometimes entirely new. It is perfectly consistent, far cheaper per unit of odour, often cleaner and more powerful, and it can deliver smells nothing in nature provides: Calone (melon/sea breeze), Iso E Super (transparent woody-amber), ethyl maltol (candy floss), Helional (cyclamen/watery), Ambroxan (dry amber). Essentially every commercial perfume blends the two — naturals for depth and "soul," synthetics for structure, radiance, longevity, safety compliance, and affordability. "Natural" is not synonymous with "safe": oakmoss, bergamot (bergapten), cinnamon, and citrus oils are among the materials most restricted by IFRA, the industry safety body.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-absolute-essential-oil',
    title: 'Absolute vs Essential Oil',
    category: 'Perfumery',
    keywords: [
      'what is an absolute vs an essential oil perfumery', 'both are concentrated aromatic plant extracts the difference is how they are obtained this has nothing to do with absolute magnitude of stars',
      'an essential oil is produced by distillation usually steam distillation where steam carries the volatile oil out of the plant material and it is condensed and separated from water or by cold expression pressing for citrus peels',
      'an absolute is produced by solvent extraction a solvent like hexane dissolves the aromatics and waxes into a concrete then the concrete is washed with alcohol which is chilled and filtered to remove the wax and evaporated leaving the absolute absolutes are used for delicate flowers that cannot survive the heat of distillation jasmine tuberose narcissus mimosa and often smell truer to the living flower',
    ],
    content: `An essential oil and an absolute are both concentrated aromatic extracts of a plant; the difference is the extraction method (and it has nothing to do with the astronomical "absolute magnitude" of stars). ESSENTIAL OIL: obtained by DISTILLATION — most often steam distillation, where steam passed through the plant material vaporises the volatile aromatic molecules, which are then condensed back to liquid and separated from the water (the aromatic water left over is a "hydrosol," e.g. rose water). Citrus oils are instead obtained by COLD EXPRESSION — mechanically pressing the peel. Distillation involves heat, which can damage or alter the most delicate floral molecules and cannot extract anything from flowers whose scent is not steam-volatile. ABSOLUTE: obtained by SOLVENT EXTRACTION. A volatile solvent (historically hexane) washes the aromatic compounds and plant waxes out of the material, and evaporating the solvent leaves a waxy semi-solid called a "concrete." The concrete is then stirred with ethanol, which dissolves the fragrant part but not most of the wax; chilling and filtering removes the wax, and evaporating the alcohol yields the "absolute" — a thick, deeply coloured, highly concentrated liquid. Absolutes are used for jasmine, tuberose, rose de mai, narcissus, mimosa, orange blossom, oakmoss, and other materials that yield little or nothing by distillation, and they generally smell rounder and closer to the living flower.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-rose',
    title: 'How Rose Oil and Rose Absolute Are Made',
    category: 'Perfumery',
    keywords: [
      'how is rose oil or rose absolute made', 'there are two products rose otto and rose absolute made from two methods and often two different rose species',
      'rose otto also called attar of roses is steam distilled usually from rosa damascena grown in the valley of roses in bulgaria and in turkey and iran the flowers are hand picked before dawn while the oil content is highest and it takes roughly 3 to 5 tonnes of petals to make one kilogram of oil which is why it costs thousands per kilo rose otto can solidify at cool temperatures',
      'rose absolute is solvent extracted often from rosa centifolia the rose de mai grown around grasse in france and in morocco it gives a higher yield and a deeper sweeter more honeyed jammy scent closer to sniffing the fresh flower',
    ],
    content: `"Rose oil" is really two different products. ROSE OTTO (also "attar of roses" or "rose essential oil") is made by STEAM DISTILLATION, almost always from Rosa damascena, the Damask rose, grown mainly in Bulgaria's Valley of Roses (around Kazanlak), Turkey (Isparta), and Iran. The blooms are picked by hand in the few hours around dawn, when their essential-oil content peaks, and distilled the same day; a first distillation plus a "cohobation" (re-distilling the aromatic water) captures the water-soluble phenylethyl alcohol. Yield is tiny — roughly 3,000–5,000 kg of petals per 1 kg of oil, about one flower per drop — so rose otto sells for several thousand euros a kilo. It is pale, and it can go semi-solid ("congeal") at room temperature because of its waxy stearoptene content. ROSE ABSOLUTE is made by SOLVENT EXTRACTION (hexane to a concrete, then alcohol washing to the absolute), often from Rosa centifolia, the "rose de mai" or cabbage rose, grown around Grasse in France and in Morocco. It has a much higher yield, a deeper red-orange colour, and a richer, sweeter, jammier, more "true to the fresh petal" smell. Perfumers frequently use both together — otto for lift and transparency, absolute for depth — plus reconstruction materials (geraniol, citronellol, rose ketones/damascones, phenylethyl alcohol) to build a full "rose accord."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-enfleurage',
    title: 'Enfleurage',
    category: 'Perfumery',
    keywords: [
      'what is enfleurage perfumery', 'an old fat based method of capturing flower scent used before solvent extraction especially for flowers like jasmine and tuberose that keep producing perfume after being picked and are ruined by the heat of distillation',
      'cold enfleurage fresh petals are pressed into a layer of odourless purified animal fat spread on a glass plate in a wooden frame a chassis every day or two the spent petals are picked off and replaced with fresh ones for weeks until the fat is saturated with scent this scented fat is the pomade',
      'the pomade is then washed repeatedly with alcohol which pulls the aromatics out of the fat and evaporating the alcohol gives the absolute of enfleurage the method is extremely labour intensive and is essentially obsolete kept alive only by a few artisan producers in grasse',
    ],
    content: `Enfleurage is a historic technique for capturing the scent of flowers using fat, used in Grasse from the 18th century until solvent extraction replaced it in the early 20th. It exists because some of the most valuable flowers — jasmine, tuberose, and to a lesser extent mimosa and orange blossom — keep biosynthesising fragrance for a day or more AFTER being picked ("living flowers"), and their scent is destroyed by the heat of steam distillation. COLD ENFLEURAGE: a thin layer of odourless, highly purified animal fat (a blend of lard and tallow) is spread on both sides of a sheet of glass mounted in a wooden frame called a "chassis." Fresh flower petals are pressed lightly into the fat and left for 24–72 hours while they continue releasing scent into it; the spent petals are then removed by hand and replaced with a fresh batch, over and over for one to three months, until the fat is fully saturated. The scented fat is now called the "pomade." HOT ENFLEURAGE (maceration) is a faster variant where petals are steeped in warmed fat. The pomade is then washed repeatedly with ethanol, which extracts the aromatics out of the fat; chilling out any dissolved fat and evaporating the alcohol yields the "absolute of enfleurage" (or "absolute de chassis"). It is prized for being extraordinarily true to the flower, but it is so labour-intensive that it is now essentially a museum process, done only by a handful of artisans.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-oud',
    title: 'Oud (Agarwood)',
    category: 'Perfumery',
    keywords: [
      'what is oud or agarwood oudh', 'a dark aromatic resin that forms inside aquilaria and gyrinops trees of south east asia when the tree is infected by a particular mould or fungus healthy agarwood is pale and odourless the infected resin soaked heartwood is dense dark and intensely fragrant this is the wood not the middle eastern lute also called oud',
      'the smell is complex woody smoky sweet leathery and animalic often described as barnyard or medicinal it is one of the most expensive raw materials in the world wild aquilaria is now cites protected and most oud is from inoculated plantation trees or is a distilled oil dehn al oud',
      'oud is central to middle eastern and south asian perfumery burned as chips as incense bakhoor worn as oil and it became a major western fragrance trend from the mid 2000s often as a synthetic oud accord rather than the real oil',
    ],
    content: `Oud (also "oudh," "aoud," "agarwood," "aloeswood," "eaglewood") is the fragrant, dark, resin-impregnated heartwood that forms inside certain tropical trees — mainly Aquilaria and Gyrinops species of Southeast Asia and India — as a defence response when the tree is infected by a specific mould (Phaeoacremonium and related fungi). An uninfected Aquilaria tree is soft, pale, and has no scent; only the wood around a long-established infection becomes dense, resinous, dark, and intensely aromatic. The smell is deep and complex — woody, smoky, sweet-balsamic, leathery, and strongly animalic, with facets often described as "barnyard," "medicinal," or "blue cheese" in raw form, mellowing as it develops. It is among the most expensive natural materials on earth (fine wild wood has sold for more per gram than gold). Because wild Aquilaria has been logged nearly to extinction, all Aquilaria species are CITES-listed, and the market now runs on plantation trees deliberately inoculated with the fungus, and on distilled oud oil ("dehn al oud" / "attar"). Oud is the heart of Gulf and South Asian perfumery — burned as wood chips or "bakhoor" incense, worn as neat oil — and it drove a huge Western fragrance trend from around 2002 (YSL M7, then Tom Ford, Montale, By Kilian), mostly built on synthetic "oud accords" rather than real oil. (The word "oud" also names an unrelated fretless Middle Eastern lute.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-ambergris',
    title: 'Ambergris',
    category: 'Perfumery',
    keywords: [
      'what is ambergris and where does it come from', 'a waxy grey substance that forms in the digestive tract of sperm whales around the indigestible horny beaks of the squid they eat it is passed from the body then floats on the ocean for years',
      'while it cures in sunlight and salt water it changes from a soft black foul smelling tarry lump into a hard grey or white waxy piece with a sweet marine musky earthy tobacco smell it is a prized fixative that also adds a glowing radiance to a perfume',
      'it is rare and found by chance on beaches and sells for very high prices its legal status varies it is banned from trade in the united states legal in the eu and uk if beach found and illegal where sperm whales are protected most perfumes now use synthetic substitutes ambroxan cetalox ambrox which reproduce the main odour molecule',
    ],
    content: `Ambergris is a solid, waxy, usually grey material that originates inside the sperm whale. Sperm whales eat large quantities of squid and cannot digest the hard, sharp squid beaks; a mass of these accumulates in the gut and becomes coated in a bile-like secretion, forming a lump that the whale eventually passes (or, some argue, occasionally vomits). Fresh ambergris is soft, black, tarry, and smells foul. It then floats on the sea, sometimes for years or decades, and as it CURES — oxidised by sunlight, air, and salt water — it hardens into a grey, brown, or white waxy piece and develops its prized smell: sweet, marine, musky, animalic-but-clean, with facets of tobacco, damp earth, seaweed, and old wood. In perfume it is one of the great fixatives and also gives compositions a distinctive luminous, "glowing" quality. It is found only by chance, washed up on beaches or floating, which (with whale protection) makes it rare and extremely expensive — kilograms sell for tens of thousands. Legal status varies: trade is banned in the United States under the Marine Mammal Protection Act, but beachcast ambergris can be legally collected and sold in the UK, EU, and much of the world. The great majority of modern "amber" and "ambergris" effects use synthetic Ambroxan / Ambroxide / Cetalox / Ambrox, which reproduces ambrein's main breakdown odorant.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-musk',
    title: 'Musk in Perfume (and Why It Is No Longer From Animals)',
    category: 'Perfumery',
    keywords: [
      'what is musk in perfume and is it still from animals', 'this is about the fragrance material not elon musk originally musk was a dried secretion from a scent gland the musk pod of the male musk deer moschus a native of the himalayas',
      'natural deer musk is intensely animalic warm and skin like and was one of the most valuable fixatives in perfumery but obtaining it historically meant killing the deer so trade is now banned under cites and it is essentially never used today',
      'virtually all musk in modern perfume is synthetic three generations nitro musks mostly banned or phased out polycyclic musks galaxolide tonalide now restricted for environmental persistence and macrocyclic musks exaltolide habanolide muscone which are biodegradable smell closest to the real thing and are the current standard white musk is a clean laundry synthetic musk accord',
    ],
    content: `"Musk" in perfumery is a fragrance material (nothing to do with Elon Musk). Originally it was a genuine animal product: the dried, granular secretion from an abdominal scent gland — the "musk pod" — of the male musk deer (genus Moschus), a small deer of the Himalayas and Siberia. Raw deer musk is powerfully animalic, warm, sweet, faintly fecal, and uncannily "skin-like," and diluted it becomes soft, sensual, and an outstanding fixative; it was one of the most valuable substances in historic perfumery. But harvesting it meant killing the deer, populations collapsed, and all musk deer species are now CITES-protected, so natural deer musk has been effectively out of legal commercial use for decades. Today essentially every "musk" in perfume is SYNTHETIC, in three historical generations: (1) NITRO-MUSKS (musk ketone, musk xylene) — cheap, discovered 1888, now largely banned or abandoned over toxicity and photo-instability; (2) POLYCYCLIC musks (Galaxolide, Tonalide) — the workhorses of 1970s–2000s laundry and fine fragrance, now restricted because they are environmentally persistent and bioaccumulative; (3) MACROCYCLIC musks (Exaltolide/Habanolide, Ethylene Brassylate, Muscone, Ambrettolide) — large-ring molecules closest to the natural smell, biodegradable, and the current industry standard. "White musk" is a marketing term for a clean, soft, "fresh laundry" synthetic musk accord. Plant-derived musk-like materials also exist (ambrette seed, from a hibiscus relative).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-families',
    title: 'The Main Fragrance Families',
    category: 'Perfumery',
    keywords: [
      'what are the main fragrance families olfactory families', 'the broad categories used to classify perfumes by their dominant character the classic set is floral oriental or amber woody and fresh with several important named structures alongside them',
      'floral single flower or bouquet oriental amber warm sweet resinous vanilla amber spices incense woody sandalwood cedar vetiver patchouli oud fresh split into citrus aromatic lavender rosemary herbs green cut grass leaves and aquatic marine ozonic',
      'named structural families chypre citrus over oakmoss labdanum patchouli fougere lavender oakmoss coumarin the classic barbershop base gourmand edible notes vanilla caramel chocolate coffee leather michael edwards fragrance wheel is the common modern chart',
    ],
    content: `Fragrance (olfactory) families are the broad buckets used to classify perfumes by their dominant accord. The classic four are: FLORAL — built around one flower (a "soliflore") or a bouquet (rose, jasmine, tuberose, lily of the valley, violet, peony). ORIENTAL / AMBER — warm, sweet, resinous, opulent: vanilla, amber, benzoin, labdanum, tonka, spices, incense, balsams (the industry has largely renamed this family "amber"). WOODY — sandalwood, cedar, vetiver, patchouli, guaiac, oud, and dry woody-amber synthetics. FRESH — the modern catch-all, itself split into Citrus (bergamot, lemon, neroli), Aromatic (lavender, rosemary, sage, mint), Green (cut grass, galbanum, violet leaf, tomato leaf), and Aquatic/Ozonic/Marine (Calone-type sea and "clean air" notes). Alongside these sit several important STRUCTURAL families named after landmark perfumes: CHYPRE (citrus over an oakmoss–labdanum–patchouli base), FOUGÈRE (lavender + oakmoss + coumarin, the "barbershop" men's structure), LEATHER (birch tar, styrax, quinolines), and the recent GOURMAND (edible notes — vanilla, caramel, chocolate, coffee, praline; pioneered by Thierry Mugler Angel, 1992). The most-used modern chart is Michael Edwards's "Fragrance Wheel," which arranges Floral, Amber (Oriental), Woody, and Fresh around a circle with sub-families so that neighbouring segments blend into each other.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-chypre',
    title: 'Chypre Perfumes',
    category: 'Perfumery',
    keywords: [
      'what is a chypre perfume', 'a fragrance family and structure built on the contrast between bright fresh citrus top notes usually bergamot and a warm dark mossy base of oakmoss labdanum and patchouli sometimes with animalic notes',
      'the name is french for cyprus and comes from francois cotys 1917 perfume chypre which was inspired by the aromatic materials of the mediterranean island the structure defined a whole genre',
      'because oakmoss is now heavily restricted by ifra for allergens modern chypres use substitutes and reconstructions subtypes include floral chypre aromatics puissantes fruity chypre mitsouko with its peach lactone green chypre and leather chypre examples mitsouko femme miss dior original knowing paloma picasso',
    ],
    content: `"Chypre" (French for "Cyprus," pronounced "SHEE-pruh") names both a fragrance family and a structural formula. The chypre accord is built on a deliberate contrast: sparkling, hesperidic TOP NOTES — above all bergamot, plus other citrus and sometimes a floral heart of rose and jasmine — sitting over a warm, dark, earthy BASE of oakmoss, labdanum (cistus/rockrose resin), and patchouli, frequently with a whisper of animalic musk or civet. The result reads as simultaneously fresh and mossy-mysterious. The name comes from François Coty's 1917 perfume "Chypre," which crystallised into a formula ideas that had circulated for a century (there were "Chypre" fragrances referencing the aromatic flora of Cyprus much earlier); Coty's success made it a template that hundreds of perfumes followed. Because REAL oakmoss is now sharply limited by the IFRA safety standard (its atranol/chloroatranol content is a strong sensitiser), most modern "chypres" are reconstructions using low-atranol oakmoss and synthetic mossy-woody bases (Evernyl, patchouli fractions). Recognised sub-types: floral chypre, fruity chypre (Guerlain Mitsouko, with its peach-skin aldehyde C-14), green chypre (Bandit, Givenchy III), leather chypre (Cabochard), and aromatic chypre. Landmark chypres: Mitsouko, Rochas Femme, Miss Dior (1947), Diorella, Aromatics Elixir, Paloma Picasso, Knowing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-fougere',
    title: 'Fougère Perfumes',
    category: 'Perfumery',
    keywords: [
      'what is a fougere perfume', 'french for fern even though ferns have almost no smell fougere is an abstract fantasy accord it is the dominant structure of mens fragrance and classic barbershop scents',
      'the core accord is lavender plus oakmoss plus coumarin the sweet hay and tobacco note from tonka bean often with bergamot geranium and a woody or spicy element it smells clean aromatic slightly powdery and green',
      'the genre began with houbigant fougere royale in 1882 the first perfume built around a synthetic isolated coumarin classic examples canoe brut paco rabanne pour homme azzaro pour homme drakkar noir cool water is an aquatic fougere jazz',
    ],
    content: `"Fougère" is French for "fern," and it is one of the principal fragrance families — the backbone of men's perfumery for over a century and the smell most people mean by "classic aftershave" or "barbershop." The joke is that ferns have essentially no scent: fougère is a wholly ABSTRACT, invented accord, not a reconstruction of anything. Its core is a triangle of LAVENDER (fresh, aromatic, herbal) + OAKMOSS (dark, green, earthy) + COUMARIN (a sweet, soft, hay-and-almond, warm tobacco note, originally isolated from the tonka bean), usually rounded out with bergamot on top and geranium, and often extended with woods, spices (nutmeg, clove), or a barbershop "shaving cream" powderiness. The genre was born with Houbigant's "Fougère Royale" (1882), composed by Paul Parquet, which was the first fine fragrance built around a synthetic aroma-chemical (coumarin). It defined masculine scent: Canoe, Brut, Paco Rabanne Pour Homme, Azzaro Pour Homme, Drakkar Noir, and — as the "aquatic fougère" that started the 1990s fresh trend — Cool Water. Because IFRA now restricts oakmoss, modern fougères substitute synthetic mossy materials.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-dry-down',
    title: 'What "Dry Down" Means',
    category: 'Perfumery',
    keywords: [
      'what does dry down mean in perfume', 'the final phase of a fragrances evolution on the skin once the top and heart notes have evaporated and only the heaviest base notes remain typically from a few hours after application onwards this is a perfumery term not a movie plot',
      'the word is also used for the overall smell and character of that base note stage a perfume might have a citrus opening but a warm woody amber dry down',
      'perfumers evaluate a composition heavily on its dry down because that is what the wearer lives with for most of the day and what is left on clothing the next morning a scent that is beautiful on the strip but has a thin or harsh dry down is considered a failure',
    ],
    content: `The "dry down" (or "drydown") is the last stage in the life of a fragrance on the skin: the point, usually a few hours after application, when the volatile top notes and most of the heart notes have evaporated and only the heaviest, longest-lasting base notes remain — the musks, woods, amber, vanilla, resins, and fixatives. (It is a standard perfumery term; it is not a film or a plot device.) The phrase is used two ways: (1) the time period — "the dry down starts after about three hours"; and (2) the character of what is left — "it opens with grapefruit but the dry down is all cedar and tonka." Perfumers and reviewers pay disproportionate attention to the dry down because it is what the wearer actually smells for most of the day, what other people notice up close hours later, and what is still on a scarf or pillow the next morning. A composition that dazzles on a paper strip in the first ten minutes but collapses into something thin, synthetic, or scratchy in the dry down is regarded as poorly built; conversely, some perfumes are considered to have their whole point in the dry down.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-alcohol',
    title: 'The Role of Alcohol in Perfume',
    category: 'Perfumery',
    keywords: [
      'what is the role of alcohol in perfume', 'perfumers alcohol is denatured ethanol usually with a little water it is the solvent and carrier that dissolves the concentrated fragrance oils and lets them be sprayed evenly',
      'on the skin the alcohol flash evaporates within seconds which lifts the fragrance molecules off the skin and throws them into the air launching the top notes and helping the scent diffuse it also acts as a mild antiseptic and preservative',
      'a fresh blend of oils and alcohol is harsh so the bottled perfume is left to rest for weeks to months maceration during which the components marry and the scent becomes smoother and rounder oil based and solid perfumes skip alcohol and project less',
    ],
    content: `Alcohol is the solvent and delivery system of a conventional perfume, typically making up 70–90% of the liquid. "Perfumer's alcohol" is high-purity ethanol that has been "denatured" (made undrinkable with a bittering or toxic additive so it isn't taxed as a beverage) and usually cut with a small percentage of water. Its jobs: (1) DISSOLVE the concentrated fragrance oils and aroma-chemicals — most of which don't mix with water — into a clear, stable, uniform liquid that can pass through an atomiser. (2) DISPERSE and PROJECT — when sprayed, the alcohol flash-evaporates off the skin within seconds, and as it goes it carries the fragrance molecules with it, lifting them into the air so the top notes "bloom" and the scent radiates rather than just sitting flat on the skin. (3) Act as a mild ANTISEPTIC/PRESERVATIVE, keeping the juice stable for years. A freshly mixed batch of oils and alcohol smells raw and sharp, so bottled perfume is "macerated" — left to rest, often for several weeks to a few months, sometimes chilled and filtered — during which the ingredients chemically settle and "marry" into a smoother, more integrated scent. Alcohol-free formats (perfume oils, solid perfumes, water-based sprays) trade sillage and top-note lift for gentleness on sensitive skin and closeness to the body.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-iso-e-super',
    title: 'Iso E Super',
    category: 'Perfumery',
    keywords: [
      'what is iso e super perfumery aroma chemical', 'a synthetic aroma chemical made by international flavors and fragrances first used in the 1970s it is one of the most widely used materials in modern perfumery',
      'its smell is soft smooth woody ambery velvety and almost transparent like a very clean dry cedar with a warm skin like touch it is not lily like it is prized because it rounds out sharp edges adds a glowing radiance and extends other notes without adding a strong character of its own',
      'many people are partly anosmic to it they can barely smell it which is part of why it works as a subtle amplifier the pure material is the basis of escentric molecules molecule 01 which is 100 percent iso e super technically it is a mix of isomers and one minor isomer isomer e is the potent odorant',
    ],
    content: `Iso E Super is a synthetic aroma-chemical (a substituted tetrahydro-acetonaphthone), created by IFF and introduced around 1973, now one of the single most-used ingredients in the entire fragrance industry — it appears in a large fraction of modern fine fragrances, and in shampoos, detergents and air fresheners. Its smell is soft, smooth, WOODY-AMBERY, "velvety," dry, and almost see-through — often described as a very clean, sheer cedar with a warm, radiant, faintly skin-like quality. (It is not "lily-like.") Perfumers love it because it does not push a strong character of its own; instead it rounds off harsh edges, adds volume and a shimmering "halo," makes a composition feel bigger and more diffusive, and lengthens the life of other materials — a near-universal blender and extender. A well-known quirk: a large share of people are partially or fully anosmic to Iso E Super, smelling almost nothing even from the neat material, which is part of why it can be used at very high levels as an invisible amplifier. The pure ingredient carried a boutique fragrance to fame: Escentric Molecules "Molecule 01" (2006) is 100% Iso E Super. Technically the commercial material is a mixture of stereoisomers, and one minor isomer ("Isomer E" / the arbre component) is far more powerful than the rest; purified high-isomer grades ("Iso E Super Plus") are sold separately.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-soliflore',
    title: 'Soliflore',
    category: 'Perfumery',
    keywords: [
      'what is a soliflore perfume', 'a perfume built to smell like a single named flower as faithfully as possible rather than an abstract bouquet or a composed fantasy the whole composition is arranged to render one bloom rose violet jasmine lily of the valley tuberose lilac',
      'it is the opposite of an abstract floral bouquet which blends several flowers into a new impression a soliflore may still use dozens of ingredients top notes and a base but they all serve to reconstruct and flatter that one flower',
      'classic soliflores diorissimo lily of the valley by edmond roudnitska penhaligons bluebell caron bellodgia carnation frederic malle une rose yardley english lavender many muguet violet and rose scents',
    ],
    content: `A soliflore (from French "seule fleur," single flower) is a perfume designed to smell as much as possible like one specific flower — a lifelike rendering of a single bloom rather than a blended bouquet or an abstract fantasy composition. The whole formula is bent toward that one goal: a rose soliflore aims to smell like burying your nose in a rose, a muguet soliflore like a sprig of lily of the valley. It is the counterpart of the abstract "floral bouquet," where several flowers are combined into a new imaginary flower that exists only in the bottle. A soliflore is not necessarily simple — it may contain dozens of materials, a citrus lift on top and a soft musky base — but every component is chosen to build up, correct, and flatter the target flower rather than to add its own idea. Soliflores are especially common for flowers that yield no natural oil and must be recreated entirely from aroma-chemicals: lily of the valley (muguet), lilac, freesia, hyacinth, sweet pea, gardenia. Landmark examples: Diorissimo (muguet, Edmond Roudnitska, 1956), Caron Bellodgia (carnation), Penhaligon's Bluebell, Annick Goutal Rose Absolue, Frédéric Malle Une Rose, Serge Lutens Sa Majesté la Rose, Yardley English Lavender.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-apply-store',
    title: 'How to Apply and Store Perfume',
    category: 'Perfumery',
    keywords: [
      'how do you properly apply and store perfume', 'apply to warm pulse points wrists sides of the neck behind the ears inner elbows where blood vessels are close to the surface and body heat helps the scent radiate spray onto skin from a few centimetres not just onto clothes',
      'do not rub the wrists together after spraying the friction and heat crush the delicate top notes apply to moisturised or unscented lotioned skin so it lasts longer and reapply through the day since it fades',
      'store the bottle upright tightly closed in a cool dark place in its box away from sunlight heat and humidity a bathroom is the worst place temperature swings and light break down the fragrance an opened bottle keeps its best for about 3 to 5 years',
    ],
    content: `APPLYING: spray onto warm "pulse points" — the inner wrists, the sides of the neck, behind the ears, the inner elbows, and (for a subtle version) the chest — where blood vessels near the surface keep the skin warm and help the fragrance diffuse. Spray from about 10–15 cm away, one to a few sprays depending on the concentration. Apply to skin, not only to clothing: skin warmth develops the scent and lets it evolve, whereas fabric holds mostly the flat base and can be stained by darker juices (though a little on a scarf makes a long-lasting trail). Do NOT rub your wrists together after spraying — the friction and heat "bruise" and shorten the fragile top notes and speed everything up. Perfume lasts noticeably longer on moisturised skin, so apply an unscented lotion or a little Vaseline first, especially if your skin is dry. Reapply during the day; fading is normal, not a fault. STORING: keep the bottle upright, tightly capped, in its original box, somewhere cool, dark, and dry — a drawer or closet, not the bathroom (the single worst spot: heat, steam, and humidity swings degrade the oils and can turn the colour and smell). Avoid direct sunlight and radiators. Kept well, an unopened bottle lasts many years; once opened and exposed to air, most perfumes hold their character for roughly 3–5 years, citrus-heavy ones less, heavy orientals longer.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-perf-headspace',
    title: 'Headspace Technology in Perfumery',
    category: 'Perfumery',
    keywords: [
      'what is headspace technology in perfumery', 'a method for capturing the exact smell of something living or fragile without picking cutting or destroying it developed from the 1970s and 80s notably by roman kaiser at givaudan',
      'a glass bell dome or inert bag is placed over the object a flower still on the plant a fruit a handful of soil and the air around it the headspace is gently drawn through a small trap packed with an adsorbent that captures the odour molecules',
      'the trapped molecules are then analysed by gas chromatography mass spectrometry gc ms to identify and quantify every compound and the perfumer reconstructs the smell from aroma chemicals it made it possible to recreate flowers that yield no oil lilac lily of the valley gardenia hyacinth and to capture scents of places like rainforest air or wet stone',
    ],
    content: `Headspace technology is a set of techniques for analysing and recreating the smell of a subject without harvesting or harming it — used when the thing you want to capture is a flower still growing on the plant, a living fruit, a whole landscape, or something too delicate or too scent-poor for extraction. It was developed from the late 1970s onward, with the perfumer-chemist Roman Kaiser at Givaudan a key pioneer (and later portable "field" versions for jungle and mountain work). Method: an inert glass bell jar, dome, or Teflon/PET bag is placed over the subject and the air trapped around it — the "headspace" — is left to equilibrate, then gently pumped through a tiny cartridge packed with an adsorbent polymer (Tenax) or activated charcoal that traps the volatile odour molecules. The trap is then eluted or thermally desorbed and run through gas chromatography–mass spectrometry (GC-MS), which separates and identifies every compound present and its concentration. A perfumer uses that analysis, plus their nose, to reconstruct the scent from available aroma-chemicals. Headspace made it possible to render flowers that give no usable natural oil (lilac, lily of the valley, hyacinth, gardenia, sweet pea, honeysuckle, cactus flower) and to bottle abstract "captured moments" — sea air, rain on hot stone, a forest floor, the inside of an old book.`,
    createdAt: Date.now(),
  },
];
