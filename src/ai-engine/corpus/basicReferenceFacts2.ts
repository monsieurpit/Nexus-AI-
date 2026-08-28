import { KnowledgeItem } from '../../types';

export const BASIC_REFERENCE_FACTS_2_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-refnum2-us-states',
    title: 'How Many US States Are There?',
    category: 'everyday-basics',
    keywords: ['how many us states are there', 'how many states in the united states', '50 states', 'last state to join the union'],
    content: `There are **50 US states**. The most recent two to join were Alaska and Hawaii, both admitted in 1959 (Alaska in January, Hawaii in August), becoming the 49th and 50th states respectively — both joined more than 45 years after the previous state (Arizona, in 1912), making them notable outliers in US statehood history. Washington, D.C. (the nation's capital) is a federal district, not a state, and its residents have historically had no full voting representation in Congress — a fact that periodically fuels political debate over DC statehood. Puerto Rico, Guam, American Samoa, the US Virgin Islands, and the Northern Mariana Islands are US territories, also not states, with residents who are largely US citizens (except American Samoa, where residents are US nationals) but likewise lack full voting representation in Congress and cannot vote in presidential elections while residing there.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-refnum2-primary-colors',
    title: 'Primary Colors: Light vs. Pigment',
    category: 'everyday-basics',
    keywords: ['what are the primary colors', 'primary colors of light', 'primary colors of paint', 'rgb vs cmyk', 'red yellow blue vs red green blue'],
    content: `There are actually two different "primary color" systems, which commonly causes confusion. **Additive color (light)**: the primary colors are **red, green, and blue (RGB)** — this system applies when you're mixing light itself, like on a TV, phone, or computer screen, where combining all three primary colors of light at full intensity produces white light (since you're adding more light energy), and the absence of all three produces black. **Subtractive color (pigment/paint)**: the traditional primary colors taught in art class are **red, yellow, and blue**, though modern color theory and professional printing actually use **cyan, magenta, and yellow (plus black — the "CMYK" system)** as the more accurate subtractive primaries, since these produce better and purer secondary/tertiary color mixes. Subtractive mixing works because pigments absorb ("subtract") certain wavelengths of light and reflect the rest — combining all subtractive primaries in theory produces black (or a muddy dark brown in practice with imperfect real-world pigments), the opposite of how additive light mixing works, which is why paint mixing and light mixing follow genuinely different, sometimes counterintuitive rules from each other.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-refnum2-food-groups',
    title: 'What Are the Basic Food Groups?',
    category: 'everyday-basics',
    keywords: ['what are the food groups', 'five food groups', 'basic nutrition food groups', 'myplate food groups'],
    content: `Modern US dietary guidance (via the USDA's "MyPlate" model, which replaced the older "food pyramid" in 2011) organizes food into **5 basic groups**: **Fruits** (fresh, frozen, canned, or dried), **Vegetables** (further divided into subcategories like dark leafy greens, starchy vegetables, and others), **Grains** (bread, rice, pasta, cereal — split into "whole grains," which retain the full grain kernel and more fiber/nutrients, and "refined grains," which have been processed and stripped of some nutrients), **Protein** (meat, poultry, seafood, eggs, beans, nuts, and tofu/other plant-based proteins), and **Dairy** (milk, cheese, yogurt, and fortified plant-based alternatives). MyPlate visually represents recommended relative proportions as sections of a plate — roughly half the plate is meant to be fruits and vegetables combined, with the rest split between grains and protein, and dairy represented as a smaller side portion (like a glass of milk) — though specific recommended amounts vary by age, sex, and activity level, and these are general population guidelines rather than a one-size-fits-all prescription for every individual's needs.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-refnum2-principal-vs-principle',
    title: 'Principal vs. Principle: What\'s the Difference?',
    category: 'everyday-basics',
    keywords: ['difference between principal and principle', 'principal vs principle', 'when to use principal', 'when to use principle'],
    content: `**Principal** (as a noun) most commonly refers to either the head administrator of a school, or, in finance, the original amount of money borrowed or invested (as distinct from the interest earned or owed on top of it) — "the school principal," or "paying down the loan's principal." As an adjective, "principal" means most important or primary ("the principal reason," "principal cause"). **Principle** is a noun referring to a fundamental rule, belief, law, or standard that guides behavior or explains how something works ("a person of strong moral principles," "the basic principles of physics," "as a matter of principle"). A common memory trick: the school "principal" is your "pal" (both end in -pal), while a "principle" is a ruLE (both end in -le, like "rule"). These two words are frequently confused specifically because they sound identical when spoken (they're true homophones) despite having completely unrelated meanings and different Latin roots.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-refnum2-complement-vs-compliment',
    title: 'Complement vs. Compliment: What\'s the Difference?',
    category: 'everyday-basics',
    keywords: ['difference between complement and compliment', 'complement vs compliment', 'when to use complement', 'when to use compliment'],
    content: `**Complement** (with an "e") means something that completes or perfectly goes with something else, making a whole ("the wine complements the meal," "complementary colors" in art, referring to colors opposite each other on the color wheel that enhance each other visually). **Compliment** (with an "i") means a polite expression of praise or admiration ("she gave him a compliment on his work," "complimentary" can also mean free, as in "a complimentary drink," since a free item is often given as a gesture of goodwill/praise for a customer). A simple memory trick: complEment has an E, like "complEte" (it completes something); complIment has an I, like "I like to give you praise" (both relate to the personal, "I"-focused act of praising). These are true homophones (identical pronunciation) with entirely different meanings, making them a very common written mix-up even though they're never confused in spoken conversation.`,
    createdAt: Date.now(),
  },
];
