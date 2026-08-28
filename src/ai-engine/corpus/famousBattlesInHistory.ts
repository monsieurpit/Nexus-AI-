import { KnowledgeItem } from '../../types';

export const FAMOUS_BATTLES_IN_HISTORY_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-battles-hastings',
    title: 'The Battle of Hastings, 1066',
    category: 'History',
    keywords: ['battle of hastings 1066', 'william the conqueror', 'norman conquest of england', 'king harold arrow eye'],
    content: `The **Battle of Hastings**, fought on October 14, 1066, in southern England, was a decisive battle in which **William, Duke of Normandy** (later known as William the Conqueror) defeated the forces of King Harold II of England, killing Harold in the process — according to a famous but disputed tradition, depicted in the Bayeux Tapestry (an extraordinary 70-meter embroidered chronicle of the invasion), Harold was killed by an arrow through the eye, though this detail remains debated among historians. William claimed a right to the English throne based on a disputed prior promise from the previous king, Edward the Confessor, and had invaded from Normandy (in modern-day France) specifically to enforce that claim after Harold was crowned instead. William's victory led to the **Norman Conquest of England**, one of the most consequential events in English history: it replaced much of the existing Anglo-Saxon nobility with Norman French lords, introduced French as the language of the English court and aristocracy for centuries (permanently reshaping the English language, which absorbed enormous amounts of French vocabulary as a result), and imported Norman feudal and administrative systems. William also commissioned the Domesday Book (1086), an extraordinarily detailed land and property survey of England used for taxation, which remains one of medieval Europe's most valuable historical records today.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-battles-waterloo',
    title: 'The Battle of Waterloo, 1815',
    category: 'History',
    keywords: ['battle of waterloo 1815', 'napoleon defeated waterloo', 'duke of wellington', 'napoleon final defeat'],
    content: `The **Battle of Waterloo**, fought on June 18, 1815, near Waterloo in present-day Belgium, marked the final, decisive defeat of French emperor **Napoleon Bonaparte**, ending his brief return to power (known as the "Hundred Days") after he had escaped exile on the island of Elba earlier that year and reclaimed the French throne. Napoleon's forces were defeated by a coalition army led by the Duke of Wellington (commanding British and allied troops) and Prussian forces under Field Marshal Gebhard von Blücher, whose timely arrival late in the battle proved decisive in overwhelming Napoleon's army after a grueling, closely fought day of combat. Following the defeat, Napoleon abdicated for a second and final time and was exiled to the remote South Atlantic island of St. Helena, where he died in 1821. Waterloo effectively ended over two decades of nearly continuous warfare across Europe stemming from the French Revolution and Napoleon's subsequent conquests, and it led directly to the Congress of Vienna's redrawing of European borders and power balances, ushering in a period of relative great-power stability in Europe that lasted, with exceptions, for roughly a century. The battle's name has since become a lasting cultural shorthand in English for any decisive, final, career-ending defeat — as in the common phrase "meeting one's Waterloo."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-battles-gettysburg',
    title: 'The Battle of Gettysburg and the Gettysburg Address',
    category: 'History',
    keywords: ['battle of gettysburg 1863', 'gettysburg address lincoln', 'turning point civil war', 'picketts charge'],
    content: `The **Battle of Gettysburg**, fought July 1-3, 1863, near Gettysburg, Pennsylvania, is widely considered the turning point of the American Civil War. Confederate General Robert E. Lee had launched an invasion into Union territory in the North, hoping a decisive victory there might shift war-weary Northern public opinion toward negotiating peace and potentially secure European recognition of the Confederacy. Instead, Union forces under General George Meade repelled repeated Confederate assaults over three brutal days, including the disastrous **Pickett's Charge** on the final day — a massive, doomed frontal infantry assault across open ground against entrenched Union positions that suffered catastrophic casualties. The battle produced roughly 46,000-51,000 combined casualties, making it the bloodiest single battle of the entire Civil War, and Lee's defeated army retreated back into Confederate territory, never again mounting a major offensive into the North. Several months later, President Abraham Lincoln delivered the brief but enormously influential **Gettysburg Address** at the dedication of a military cemetery on the battlefield — just around 270 words long, yet it redefined the war's purpose in soaring terms as a struggle to preserve not just the Union but the broader democratic ideal that government should be "of the people, by the people, for the people," and it remains one of the most quoted speeches in American history.`,
    createdAt: Date.now(),
  },
];
