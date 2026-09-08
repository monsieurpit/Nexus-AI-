import { KnowledgeItem } from '../../types';

// Batch 61 (classic literature) gap-fills. Live misses on nexus-4b:
// "who wrote Romeo and Juliet" -> "penned by Jane Austen... a romantic comedy";
// "what is Jane Eyre about" -> "'Pride and Prejudice' is about Eliza Bennet, not
// Jane Eyre"; "Brothers Karamazov" -> a Wright-brothers / Kitty Hawk web dump;
// "who wrote Ulysses" -> "Ulysses S. Grant, the 18th president"; "Wuthering
// Heights" -> a 2026 Emerald Fennell film + Charli XCX album web dump;
// "Grapes of Wrath" -> "you just pull grapes from the stem and pop them in your
// mouth"; "Divine Comedy" -> "a baroque pop band from Northern Ireland."
export const CLASSIC_LITERATURE_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-romeo-and-juliet',
    title: 'Who Wrote Romeo and Juliet and What It Is About',
    category: 'Literature',
    keywords: [
      'who wrote romeo and juliet and what is it about', 'who wrote romeo and juliet', 'romeo and juliet plot',
      'montagues and capulets', 'star-crossed lovers', 'is romeo and juliet a comedy or tragedy', 'romeo and juliet ending',
    ],
    content: `Romeo and Juliet is a TRAGEDY (not a comedy) written by WILLIAM SHAKESPEARE around 1595 — not Jane Austen, who lived 200 years later and wrote novels, not plays. It is set in Verona, Italy, where two noble families, the Montagues and the Capulets, are locked in a long-running feud. Romeo (a Montague) and Juliet (a Capulet), both teenagers, meet at a masked ball, fall instantly in love, and are secretly married by Friar Laurence, who hopes the union will end the feud. Things unravel fast: Romeo kills Juliet's cousin Tybalt in a street fight and is banished; Juliet's parents try to force her to marry Count Paris; the Friar gives Juliet a potion to fake her death so she can escape with Romeo, but the message explaining the plan never reaches him. Believing her dead, Romeo drinks poison beside her tomb; Juliet wakes, finds him dead, and stabs herself. Their deaths finally reconcile the two families. Famous lines include "But soft, what light through yonder window breaks?" and "A plague o' both your houses."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-jane-eyre',
    title: 'What Jane Eyre Is About',
    category: 'Literature',
    keywords: [
      'what is jane eyre about', 'who wrote jane eyre', 'jane eyre plot', 'mr rochester bertha mason', 'thornfield hall',
      'jane eyre madwoman in the attic', 'charlotte bronte jane eyre',
    ],
    content: `Jane Eyre (1847) is a novel by CHARLOTTE BRONTË — it is not Pride and Prejudice and has nothing to do with Elizabeth Bennet. It follows its title character from a miserable childhood as an unloved orphan, through a harsh charity boarding school (Lowood), to a post as governess at Thornfield Hall, home of the brooding, sardonic Edward Rochester. Jane and Rochester fall in love, but on their wedding day it is revealed that he already has a wife — Bertha Mason, a violently insane woman he keeps locked in the attic (the origin of the phrase "the madwoman in the attic"). Refusing to become his mistress, Jane flees penniless, is taken in by the cold, dutiful clergyman St. John Rivers, and nearly marries him for missionary work — but hears Rochester's voice calling and returns to find Thornfield burned down by Bertha, who died in the fire, and Rochester blinded and maimed trying to save her. Now his equal in fortune and free of impediments, Jane marries him. It's a landmark of English fiction and an early feminist "bildungsroman" about self-respect, conscience and independence.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brothers-karamazov',
    title: 'What The Brothers Karamazov Is About',
    category: 'Literature',
    keywords: [
      'what is the plot of the brothers karamazov', 'dostoevsky the brothers karamazov', 'dmitri ivan alyosha karamazov',
      'the grand inquisitor', 'if god does not exist everything is permitted', 'who killed fyodor karamazov',
    ],
    content: `The Brothers Karamazov (1880) is Fyodor Dostoevsky's last and greatest novel — nothing to do with the Wright brothers. It centres on a squalid, comic-monstrous father, Fyodor Karamazov, and his sons: DMITRI (Mitya), a passionate, dissipated ex-officer feuding with his father over money and a woman; IVAN, a brilliant, tormented intellectual who cannot reconcile a good God with the suffering of innocent children (his poem "The Grand Inquisitor" is one of the most famous passages in literature) and voices the idea that "if there is no God, everything is permitted"; ALYOSHA, a gentle, faithful young novice monk, the moral heart of the book and disciple of the elder Zosima; and the sickly, resentful illegitimate servant SMERDYAKOV. When old Karamazov is murdered, Dmitri is arrested and wrongly convicted, though Smerdyakov did it — encouraged, he claims, by Ivan's ideas. The novel is a vast philosophical drama about faith and doubt, free will, guilt, family and moral responsibility.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-ulysses-joyce',
    title: 'Who Wrote Ulysses and Why It Is Hard',
    category: 'Literature',
    keywords: [
      'who wrote ulysses and why is it hard', 'james joyce ulysses', 'why is ulysses so difficult', 'bloomsday june 16',
      'leopold bloom stephen dedalus molly', 'stream of consciousness ulysses', 'ulysses banned obscenity',
    ],
    content: `Ulysses (1922) is a modernist novel by the Irish writer JAMES JOYCE — not the American president Ulysses S. Grant. It records a single ordinary day, 16 June 1904 (now celebrated as "Bloomsday"), in the lives of a few Dubliners: the mild-mannered advertising canvasser Leopold Bloom, the young intellectual Stephen Dedalus, and Bloom's wife Molly. Its 18 episodes loosely parallel the adventures of Homer's Odysseus (Ulysses). It's considered hard for several reasons at once: there is almost no conventional plot; Joyce writes much of it in "stream of consciousness," following characters' unfiltered thoughts mid-sentence; each episode is written in a DIFFERENT and often extreme style (newspaper headlines, a musical fugue, a question-and-answer catechism, a parody of English prose through the centuries, and Molly's closing 40-page monologue with almost no punctuation); and it's packed with obscure allusions to Irish history, Catholicism, Shakespeare and classical literature. It was banned for obscenity in the US and UK for over a decade, and is now regarded as one of the most important novels of the 20th century.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-wuthering-heights',
    title: 'What Wuthering Heights Is About',
    category: 'Literature',
    keywords: [
      'what is wuthering heights about', 'who wrote wuthering heights', 'heathcliff and catherine', 'wuthering heights plot',
      'emily bronte wuthering heights', 'the moors wuthering heights', 'is wuthering heights a love story',
    ],
    content: `Wuthering Heights (1847) is the only novel by EMILY BRONTË (sister of Charlotte, who wrote Jane Eyre) — not a 2026 film or a pop album. Set on the bleak Yorkshire moors and told through the framing narration of a visitor, Lockwood, and the old housekeeper Nelly Dean, it traces a destructive obsession across two generations of two families, the Earnshaws of Wuthering Heights and the Lintons of Thrushcross Grange. Old Mr Earnshaw brings home a dark orphan boy, HEATHCLIFF, who grows up wild and inseparable from Earnshaw's daughter CATHERINE. After Earnshaw dies, Catherine's brother Hindley degrades Heathcliff to a servant; Catherine, though she loves Heathcliff, marries the gentle, wealthy Edgar Linton for status. Heathcliff vanishes, returns years later rich and vengeful, and spends the rest of his life systematically ruining both families — seizing their property, marrying and abusing Edgar's sister, and tormenting the next generation — driven by grief and rage after Catherine dies in childbirth. It's a Gothic story of passion, cruelty and class, shocking in its violence and moral bleakness when it appeared.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-grapes-of-wrath',
    title: 'What The Grapes of Wrath Is About',
    category: 'Literature',
    keywords: [
      'what is the plot of the grapes of wrath', 'john steinbeck grapes of wrath', 'the joad family dust bowl',
      'okie migration to california', 'grapes of wrath great depression', 'grapes of wrath meaning of the title',
    ],
    content: `The Grapes of Wrath (1939) is a novel by JOHN STEINBECK — not a guide to eating grapes. It follows the Joad family, tenant farmers in Oklahoma who lose their land during the Great Depression, when drought and dust storms (the Dust Bowl) ruin the crops and the banks foreclose and send tractors to bulldoze the tenants' homes. Like hundreds of thousands of real "Okies," the Joads load everything onto a broken-down truck and drive Route 66 west to California, lured by handbills promising plenty of work. Instead they find a glut of desperate migrants, starvation wages, squalid camps, and violent hostility from locals and growers. The family disintegrates along the way — deaths, a stillbirth, members leaving — but the novel argues for human dignity and solidarity among the poor, ending on the famous image of Rose of Sharon nursing a starving stranger. The title, from "The Battle Hymn of the Republic," evokes gathering anger. It won the Pulitzer Prize, was banned and burned in places for its politics, and helped earn Steinbeck the Nobel Prize.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-divine-comedy',
    title: 'Who Wrote the Divine Comedy',
    category: 'Literature',
    keywords: [
      'who wrote the divine comedy', 'dante alighieri divine comedy', 'inferno purgatorio paradiso', 'dantes journey through hell',
      'virgil and beatrice divine comedy', 'nine circles of hell', 'terza rima divine comedy',
    ],
    content: `The Divine Comedy is a long narrative poem by the Italian writer DANTE ALIGHIERI, begun around 1308 and finished shortly before his death in 1321 — not a Northern Irish pop band. It describes the narrator's imagined journey through the three realms of the afterlife: INFERNO (Hell), a funnel of nine descending circles where sinners suffer punishments fitted to their sins, guided by the Roman poet Virgil; PURGATORIO (Purgatory), a mountain the penitent climb to purify themselves; and PARADISO (Heaven), the nine spheres, where Dante is guided by Beatrice, the woman he idealised, up to a vision of God. It has 100 cantos, is written in a demanding three-line rhyme scheme (terza rima), and is packed with medieval theology, philosophy, politics and score-settling against Dante's Florentine enemies. Written in the Tuscan vernacular rather than Latin, it effectively founded literary Italian and is one of the greatest works of world literature.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-frankenstein',
    title: 'What Frankenstein Is Actually About',
    category: 'Literature',
    keywords: [
      'what is frankenstein actually about', 'who wrote frankenstein', 'is frankenstein the monster or the doctor',
      'mary shelley frankenstein', 'the modern prometheus', 'frankenstein themes', 'why does the creature become a murderer',
    ],
    content: `Frankenstein; or, The Modern Prometheus (1818) was written by MARY SHELLEY when she was only 18–19, out of a ghost-story challenge among her, her future husband Percy Shelley, and Lord Byron. "Frankenstein" is the name of the CREATOR, Victor Frankenstein — an ambitious young scientist — not of the creature, a very common mix-up. Victor discovers how to give life to dead matter, assembles a being from body parts, and animates it — then is so repulsed by the result that he abandons it. The creature, who in the book is intelligent, eloquent and initially gentle, teaches itself to speak and read, but is met everywhere with terror and violence because of its appearance. Rejected even by Victor when it begs him to make a companion, it turns to murder, killing Victor's brother, friend and bride, and the two pursue each other to the Arctic, where Victor dies and the creature vanishes to end its own life. It's often called the first science-fiction novel and explores ambition and hubris ("playing God"), responsibility for what you create, isolation, and how prejudice makes monsters.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-crime-and-punishment',
    title: 'What Crime and Punishment Is About',
    category: 'Literature',
    keywords: [
      'what is crime and punishment about', 'dostoevsky crime and punishment', 'raskolnikov murder pawnbroker',
      'extraordinary man theory raskolnikov', 'sonya crime and punishment', 'porfiry petrovich', 'raskolnikov confession',
    ],
    content: `Crime and Punishment (1866) is a novel by Fyodor Dostoevsky. A poor, proud, isolated former student in St Petersburg, Rodion RASKOLNIKOV, has convinced himself of an "extraordinary man" theory — that a truly great person is entitled to break moral laws, even to kill, if it serves a higher purpose. To prove he is such a man (and out of poverty), he murders a miserly old pawnbroker with an axe, and, when caught in the act, kills her innocent sister too. The rest of the novel is the psychological aftermath: instead of the clean, rational act he imagined, Raskolnikov is wracked by fever, paranoia, guilt and self-disgust, drawn to and repelled by confessing, and mentally sparred with by the shrewd investigator Porfiry Petrovich. His redemption comes through SONYA, a devout young woman forced into prostitution to feed her family, whose faith and self-sacrifice slowly break through his intellectual pride. He confesses, is sentenced to Siberia, and there, with Sonya following him, begins the long process of moral rebirth. It's a study of nihilism, conscience, suffering and grace.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-heart-of-darkness',
    title: 'What Heart of Darkness Is About',
    category: 'Literature',
    keywords: [
      'what is heart of darkness about', 'joseph conrad heart of darkness', 'marlow congo river', 'the horror the horror kurtz',
      'heart of darkness colonialism critique', 'apocalypse now heart of darkness', 'chinua achebe heart of darkness',
    ],
    content: `Heart of Darkness (1899) is a short novel by Joseph Conrad, based partly on his own time as a steamboat captain in the Congo. The narrator, Marlow, tells shipmates about a journey he made up the Congo River for a Belgian ivory-trading company, deep into the African interior to retrieve KURTZ — a star agent who collects more ivory than anyone else, and who was sent as an idealist bringing "civilisation," but has set himself up in the jungle as a brutal demigod worshipped by the local people, surrounded by severed heads on posts. By the time Marlow reaches him, Kurtz is dying; his last words are "The horror! The horror!" The book is a dark meditation on how the "civilised" veneer can collapse when a person is far from society and armed with unchecked power, and a bleak indictment of the greed and hypocrisy of colonial exploitation (Belgium's rule of the Congo was among the most murderous). It inspired the film Apocalypse Now, and the Nigerian writer Chinua Achebe famously attacked it for reducing Africans to a backdrop for a European's crisis.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-hamlet-plot',
    title: 'The Plot of Hamlet',
    category: 'Literature',
    keywords: [
      'what is the plot of hamlet', 'shakespeare hamlet summary', 'to be or not to be', 'claudius murders hamlets father',
      'ophelia hamlet', 'the mousetrap play within a play', 'how does hamlet end',
    ],
    content: `Hamlet (c. 1600) is Shakespeare's longest tragedy. Prince Hamlet of Denmark is mourning his father, the late king — and is disgusted that his mother Gertrude has quickly married his uncle, CLAUDIUS, now king. His father's ghost appears and tells Hamlet that Claudius murdered him by pouring poison in his ear, and demands revenge. Hamlet feigns madness while he tries to confirm the ghost's story and screws up his nerve to act, delivering famous speeches on death and doubt ("To be, or not to be"). He stages a play re-enacting the murder ("The Mousetrap") to watch Claudius's reaction, which convinces him. Mistaking the eavesdropping courtier Polonius for Claudius, Hamlet kills him behind a curtain; Polonius's daughter Ophelia, whom Hamlet had courted, goes mad and drowns. Claudius sends Hamlet to England to be executed and, when that fails, arranges a rigged fencing match with Polonius's son Laertes, using a poisoned blade and a poisoned cup. In the final scene almost everyone dies: Gertrude drinks the poison meant for Hamlet, Laertes and Hamlet wound each other with the envenomed sword, and Hamlet kills Claudius before dying himself.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-war-and-peace',
    title: 'What War and Peace Is About',
    category: 'Literature',
    keywords: [
      'who wrote war and peace', 'what is war and peace about', 'tolstoy war and peace', 'pierre bezukhov andrei natasha',
      'war and peace napoleon 1812', 'battle of borodino', 'why is war and peace so long',
    ],
    content: `War and Peace (1869) is an epic novel by the Russian writer Leo Tolstoy — about 1,200 pages, which is why it's a byword for a very long book. It follows several aristocratic families through Russian society during the Napoleonic Wars of 1805–1812, above all: PIERRE Bezukhov, an awkward, searching illegitimate heir who suddenly inherits a fortune and spends the book looking for a meaningful way to live; Prince ANDREI Bolkonsky, a proud, disillusioned officer; and NATASHA Rostova, a vivid, impulsive young woman the two men both love at different times. Around their marriages, love affairs, duels, disgraces and spiritual crises, Tolstoy stages huge set-pieces — the disastrous Battle of Austerlitz, the bloody stalemate of Borodino, Napoleon's occupation and the burning of Moscow, and the catastrophic French retreat through the Russian winter. Interwoven are long essays in which Tolstoy argues his own theory of history: that great events are driven not by "great men" like Napoleon but by the accumulated actions of countless ordinary people, and that leaders only imagine they are in control.`,
    createdAt: Date.now(),
  },
];
