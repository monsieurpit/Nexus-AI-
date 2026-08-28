import { KnowledgeItem } from '../../types';

export const GEOLOGIC_TIME_AND_DINOSAURS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-geology-time-scale',
    title: 'The Geologic Time Scale: How Earth\'s History Is Divided',
    category: 'earth-science',
    keywords: ['what is the geologic time scale', 'jurassic period', 'cretaceous period', 'how old is the earth'],
    content: `Earth is roughly **4.5 billion years old**, and scientists organize its immense history using the **geologic time scale**, a hierarchical system dividing time into eons, eras, periods, and epochs, primarily defined by distinct layers of rock and the fossil evidence found within them, marking major shifts in climate, geology, or life. The current eon, the Phanerozoic (beginning about 540 million years ago), is divided into three eras: the **Paleozoic** ("ancient life," including the Cambrian Explosion, when most major animal groups first appear in the fossil record, and ending with Earth's most severe mass extinction roughly 252 million years ago, which wiped out an estimated 90%+ of marine species), the **Mesozoic** ("middle life," the age of dinosaurs, spanning the Triassic, **Jurassic**, and **Cretaceous** periods, from roughly 252 to 66 million years ago), and the **Cenozoic** ("recent life," from 66 million years ago to today, the age of mammals following the dinosaurs' extinction). Humans (Homo sapiens) are extremely recent by this scale, having existed for only roughly 300,000 years — if Earth's entire history were compressed into a single 24-hour day, humans would appear in only the final couple of seconds before midnight, a perspective often used to illustrate just how vast geologic time truly is compared to the scale of human history.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-geology-dinosaur-extinction',
    title: 'What Killed the Dinosaurs? The Asteroid Impact Theory',
    category: 'earth-science',
    keywords: ['what killed the dinosaurs', 'asteroid extinction dinosaurs', 'chicxulub crater', 'dinosaur extinction event'],
    content: `Non-avian dinosaurs went extinct roughly **66 million years ago**, at the end of the Cretaceous period, in an event scientists call the K-Pg (Cretaceous-Paleogene) extinction, which wiped out an estimated 75% of all species on Earth at the time. The leading and most thoroughly evidenced explanation is a massive **asteroid impact**: a space object roughly 10-15 kilometers (6-9 miles) wide struck the Yucatán Peninsula in modern-day Mexico, creating the **Chicxulub crater**, which measures around 150-200 kilometers wide and was confirmed through decades of geological research, including a distinctive layer of iridium-rich sediment (iridium is rare on Earth's surface but common in asteroids) found in rock layers worldwide dating to precisely this period. The impact would have triggered catastrophic immediate effects — massive fires, tsunamis, and earthquakes — followed by longer-term devastation as debris thrown into the atmosphere blocked sunlight for months or years, collapsing photosynthesis-based food chains and dramatically cooling the global climate. Many scientists believe the impact combined with existing environmental stress from massive, prolonged volcanic activity in what's now India (the Deccan Traps) to compound the extinction's severity. Not all dinosaurs died out, though — birds are now understood by paleontologists to be direct evolutionary descendants of a specific lineage of theropod dinosaurs, meaning dinosaurs, in a very real technical sense, never actually went fully extinct.`,
    createdAt: Date.now(),
  },
];
