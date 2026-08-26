import { KnowledgeItem } from '../../types';

export const PETS_AND_ANIMALS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-pets-dog-basics',
    title: 'Dog Care Basics: Feeding, Walking, Training, and Health',
    category: 'Daily Life',
    keywords: [
      'dog care', 'how often to walk a dog', 'how much to feed a dog', 'dog training basics',
      'puppy training', 'dog vaccines', 'how to potty train a puppy', 'dog basics',
    ],
    content: `Most adult dogs need 1-2 walks a day (roughly 30-60 minutes total, though this varies hugely by breed and size — a Border Collie needs far more exercise than a Bulldog), both for physical health and mental stimulation; under-exercised dogs commonly develop destructive or anxious behaviors out of pent-up energy. Feeding amount depends on the dog's weight, age, and activity level — commercial dog food bags list guidelines by weight, and puppies typically eat 3-4 smaller meals a day while adult dogs usually do well on 2. Basic training (sit, stay, come, leash manners) works best with positive reinforcement (treats/praise for correct behavior) rather than punishment, and is most effective started early — the "critical socialization period" for puppies is roughly 3-14 weeks old, when they're most receptive to new experiences, people, and other animals without developing fear responses. Potty training a puppy typically takes several weeks to a few months of consistency: taking them out frequently (after eating, waking up, and playing), rewarding successful outdoor bathroom breaks immediately, and never punishing accidents after the fact (a dog can't connect punishment to something that happened minutes earlier). Core vaccines (rabies, distemper, parvovirus) are typically given in a puppy series starting around 6-8 weeks, with boosters through about 16 weeks, then periodic adult boosters — exact schedules vary by vet and location. Spaying/neutering is commonly recommended (timing varies by vet and breed size) and reduces certain health risks along with preventing unwanted litters.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-pets-cat-basics',
    title: 'Cat Care Basics: Litter Boxes, Feeding, Scratching, and Health',
    category: 'Daily Life',
    keywords: [
      'cat care', 'litter box basics', 'how often to feed a cat', 'why do cats scratch', 'indoor vs outdoor cat',
      'cat vaccines', 'cat basics', 'how to introduce a new cat',
    ],
    content: `The general litter box rule is one box per cat plus one extra (so 2 cats means 3 boxes), placed in quiet, accessible, and separate-from-food locations — cats are naturally private about elimination and can develop stress or start avoiding the box (sometimes urinating elsewhere) if it's dirty, too enclosed, or in a high-traffic area; scoop daily and fully change the litter regularly. Adult cats typically do well with 2 measured meals a day (free-feeding dry food all day is common but contributes to obesity in many cats); portion depends on the food's calorie density and the cat's weight — check packaging guidelines or ask a vet. Scratching is completely natural cat behavior — it sheds the outer layer of their claws, marks territory via scent glands in their paws, and stretches their muscles — so the fix for furniture damage is providing appealing scratching posts/pads (ideally tall and stable enough not to wobble) near the furniture they already scratch, not punishment, which mostly just teaches a cat to avoid you rather than to stop scratching. Indoor cats generally live significantly longer on average than outdoor cats (outdoor cats face traffic, predators, disease, and fights), which is why full-time indoor (or supervised outdoor access, like a "catio") is the most commonly recommended setup by vets in many regions. Core vaccines (rabies, feline distemper/panleukopenia, calicivirus, herpesvirus) typically start around 6-8 weeks with a kitten booster series, then periodic adult boosters. Introducing a new cat to an existing one should be gradual — separate spaces at first, scent-swapping, then supervised short visits — rushing it is the most common cause of lasting conflict between cats in the same home.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-pets-common-myths-safety',
    title: 'Common Pet Myths and Basic Household Pet Safety',
    category: 'Daily Life',
    keywords: [
      'foods toxic to dogs', 'foods toxic to cats', 'chocolate dogs', 'do dogs see color', 'do cats always land on feet',
      'pet myths', 'pet safety', 'grapes dogs toxic', 'onions dogs toxic',
    ],
    content: `Chocolate is genuinely toxic to dogs (and cats) — it contains theobromine, which they metabolize far more slowly than humans do, and darker/more concentrated chocolate (baking chocolate, dark chocolate) is more dangerous than milk chocolate for a given amount. Other common toxic foods for dogs include grapes and raisins (can cause acute kidney failure, and the toxic mechanism still isn't fully understood by veterinary science), onions and garlic (damage red blood cells), and xylitol (an artificial sweetener in many sugar-free gums/candies, extremely dangerous even in small amounts — causes a rapid insulin spike and can cause liver failure). "Dogs are colorblind" is a myth in its strong form — dogs see color, just a more limited range than humans (similar to red-green colorblindness in people), seeing blues and yellows well but struggling to distinguish reds and greens. "Cats always land on their feet" (the righting reflex) is real and genuinely remarkable — cats have an exceptional ability to reorient mid-fall using their flexible spine and inner-ear balance system — but it isn't guaranteed, especially from very short falls (not enough time to rotate) or very long ones (impact force alone can cause serious injury regardless of landing position), so "high-rise syndrome" (falls from windows/balconies) is a real veterinary concern, not something the reflex fully protects against. A warm, dry nose does NOT reliably mean a dog is sick, contrary to a very common belief — nose temperature/moisture fluctuates normally throughout the day for harmless reasons (sleep, weather, hydration).`,
    createdAt: Date.now(),
  },
];
