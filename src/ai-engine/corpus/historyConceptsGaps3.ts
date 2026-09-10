import { KnowledgeItem } from '../../types';

/**
 * HISTORY_CONCEPTS_GAPS_3 — batch 246 corrections.
 * nexus-4b handled most history contrasts well. Misses:
 * - "League of Nations vs UN": said the UN was "redesigned by Woodrow Wilson"
 *   (Wilson championed the League and died in 1924).
 * - "Western vs Eastern Front in WWI": used WWII figures (27 million Soviet
 *   dead, 80% of German losses).
 * - "primary source vs secondary source": answered about primary/secondary
 *   ENERGY.
 * - "knight vs samurai", "archaeology vs anthropology", "propaganda vs
 *   censorship" were web dumps.
 * - "BC vs BCE" was garbled ("counted down from 500 bc").
 * - "Union vs Confederacy", "artifact vs fossil", "dictatorship vs
 *   authoritarian regime" were cut off.
 * - "communism vs socialism" conflated Marxist transitional socialism, social
 *   democracy, and the Nordic model.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'history', keywords, content, createdAt: now,
});

export const HISTORY_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  k(
    'kb-gap-hist3-league-vs-un',
    'League of Nations vs United Nations',
    [
      'difference between the League of Nations and the United Nations', 'the League of Nations was founded in 1920 after World War I championed by US President Woodrow Wilson but the US Senate never joined', 'the United Nations was founded in 1945 after World War II under Roosevelt and Truman',
      'the League had no armed force and required unanimity and it failed to stop aggression in the 1930s', 'the UN Security Council has five permanent members with a veto and can authorise peacekeeping and sanctions', 'Wilson had nothing to do with the UN he died in 1924',
    ],
    `Both are international organisations created to keep the peace after a world war; the UN replaced the failed League.

The LEAGUE OF NATIONS was founded in 1920, after World War I, as part of the Treaty of Versailles. Its creation was championed by US President Woodrow WILSON — but, ironically, the US Senate refused to ratify the treaty, so the United States NEVER JOINED, badly weakening it. The League had no armed force of its own, most decisions required UNANIMITY, and it proved unable to stop Japanese aggression in Manchuria (1931), the Italian invasion of Ethiopia (1935), or German rearmament. It effectively collapsed as WWII began.

The UNITED NATIONS was founded in 1945, after World War II, under US Presidents Roosevelt and then Truman (Wilson had died in 1924 and had nothing to do with it). It learned from the League's weaknesses: a SECURITY COUNCIL with five permanent members (US, UK, France, Russia, China) that can authorise sanctions and peacekeeping forces, though each holds a VETO; near-universal membership (193 states today); and a wide range of specialised agencies (WHO, UNICEF, UNHCR). It is still operating.

Short version: the League (1920, post-WWI, Wilson, US absent, toothless, failed); the UN (1945, post-WWII, Roosevelt/Truman, US central, Security Council, still running).`,
  ),
  k(
    'kb-gap-hist3-ww1-western-vs-eastern-front',
    'Western Front vs Eastern Front in World War I',
    [
      'difference between the Western Front and the Eastern Front in World War I', 'the Western Front ran through Belgium and northeastern France Germany against Britain France and later the US locked in trench-warfare stalemate for four years', 'the Eastern Front ran across the vast plains of Poland and western Russia the Central Powers Germany and Austria-Hungary against the Russian Empire far more movement',
      'the Eastern Front ended in 1917-18 when Russia collapsed in revolution and signed the Treaty of Brest-Litovsk', 'Russian Empire not the Soviet Union no 27 million deaths that is World War II', 'about 1.7 to 2 million Russian military deaths in WWI',
    ],
    `The WESTERN FRONT of WWI ran through Belgium and north-eastern France. Germany faced Britain, France, and (from 1917) the United States. After the opening months it froze into a continuous line of TRENCHES from the North Sea to Switzerland and became a four-year STALEMATE of attrition — the Somme, Verdun, Passchendaele — where huge offensives moved the line only a few kilometres at enormous cost.

The EASTERN FRONT ran across the wide plains of East Prussia, Poland, Galicia, and western Russia. The Central Powers (Germany and Austria-Hungary) fought the RUSSIAN EMPIRE (there was no Soviet Union yet). Because the front was so long and the armies relatively thinner, it saw far MORE MOVEMENT — big advances and retreats — with battles like Tannenberg (1914) and the Brusilov Offensive (1916). It ENDED before the war did: after the 1917 Russian Revolutions, the new Bolshevik government pulled out and signed the Treaty of Brest-Litovsk in March 1918.

(Figures like "27 million Soviet dead" or "80% of German losses on the Eastern Front" belong to WORLD WAR II, not WWI. Russian military deaths in WWI were roughly 1.7-2 million.)`,
  ),
  k(
    'kb-gap-hist3-primary-vs-secondary-source',
    'Primary source vs secondary source',
    [
      'difference between a primary source and a secondary source', 'a primary source is a firsthand original record from the time under study a diary letter photograph government document interview artifact eyewitness account original research paper', 'a secondary source analyses interprets or summarises primary sources a textbook biography review article documentary encyclopedia',
      'not about primary and secondary energy', 'a tertiary source compiles and indexes', 'the same document can be primary for one question and secondary for another',
    ],
    `This is about EVIDENCE in research and history (not about energy).

A PRIMARY SOURCE is a FIRSTHAND, original record created AT THE TIME of the event or by a direct participant or observer. Examples: diaries, letters, speeches, photographs, film footage, government records, treaties, court transcripts, newspaper reports from the day, an artifact, an interview or oral history, raw data, and the original paper reporting a scientific experiment. It gives you direct, unmediated material.

A SECONDARY SOURCE is created LATER by someone who did NOT witness the events, and it ANALYSES, INTERPRETS, SUMMARISES, or comments on primary sources. Examples: a history textbook, a scholarly monograph, a biography, a review article, a documentary, an encyclopedia entry, a literary critique.

(A TERTIARY SOURCE compiles and organises the others — bibliographies, indexes, some reference works.)

The label can depend on the QUESTION: a 1950s history book is a secondary source about the 1500s, but a primary source about how historians thought in the 1950s.`,
  ),
  k(
    'kb-gap-hist3-knight-vs-samurai',
    'Knight vs samurai',
    [
      'difference between a knight and a samurai', 'a knight was the mounted armoured warrior of medieval Europe holding a fief in exchange for military service to a lord ideally following chivalry tied to Christianity', 'a samurai was the hereditary warrior class of feudal Japan serving a daimyo under the shogun following bushido master of the sword and bow tied to Zen Buddhism and Confucian loyalty',
      'knights fought with lance and sword in heavy plate armour samurai with the katana and yumi in lighter lamellar armour', 'knighthood could sometimes be earned samurai status was largely hereditary', 'both declined with gunpowder and centralised states',
    ],
    `Both were the mounted WARRIOR ELITE of a feudal society, bound to a lord by service and to a code of honour, and both declined as gunpowder and centralised armies took over.

A KNIGHT was the armoured cavalryman of MEDIEVAL EUROPE (roughly 10th-15th centuries). Within the feudal system he was granted land (a "fief") by a lord in return for military service, typically ~40 days a year. He fought on horseback with lance and sword, increasingly in full plate armour, and was expected to follow CHIVALRY — courage, loyalty, protection of the weak, courtly manners — bound up with the Catholic Church (knights were "dubbed" in a religious ceremony and went on Crusade). Knighthood could sometimes be EARNED through service or valour.

A SAMURAI was the hereditary warrior of FEUDAL JAPAN (roughly 12th-19th centuries). He served a DAIMYO (regional lord) who in turn served the SHOGUN. His code was BUSHIDO — loyalty, honour, discipline, readiness to die (and, in extremis, ritual suicide, seppuku) — shaped by Zen Buddhism and Confucian ideas of duty. He fought first with the bow (yumi) and later famously with the paired swords (katana and wakizashi), in lighter lamellar armour. Samurai status was largely HEREDITARY and, in the Edo period, a legally fixed class that also filled administrative posts.`,
  ),
  k(
    'kb-gap-hist3-archaeology-vs-anthropology',
    'Archaeology vs anthropology',
    [
      'difference between archaeology and anthropology', 'anthropology is the broad study of humanity human biology evolution culture society and language past and present', 'archaeology studies past human societies through their material remains artifacts structures settlements ecofacts via excavation',
      'archaeology is one of the four subfields of anthropology in the US along with cultural linguistic and biological anthropology', 'in Europe archaeology is often a separate discipline', 'anthropology can study living peoples directly archaeology works from what was left behind',
    ],
    `ANTHROPOLOGY is the broad, holistic study of HUMANITY — across time and across the world — covering human biology and evolution, culture, social organisation, and language. In the North American tradition it has FOUR subfields:
- cultural (social) anthropology — living societies, beliefs, kinship, ritual, often through fieldwork and participant observation;
- linguistic anthropology — language in social and cultural context;
- biological (physical) anthropology — human evolution, primates, genetics, forensics;
- ARCHAEOLOGY.

ARCHAEOLOGY is the study of PAST human societies through their MATERIAL REMAINS — artifacts (tools, pottery), structures (buildings, tombs), settlements, and ecofacts (bones, seeds, pollen) — recovered mainly by excavation and analysed in the lab. It reconstructs how people lived, especially for periods and places with little or no writing.

So: archaeology is one WAY of doing anthropology, focused on the physical traces the past left behind; anthropology is the wider umbrella that also studies people who are alive now, directly. (In Britain and much of Europe, archaeology is usually organised as its own department rather than as a branch of anthropology, but the intellectual relationship is the same.)`,
  ),
  k(
    'kb-gap-hist3-propaganda-vs-censorship',
    'Propaganda vs censorship',
    [
      'difference between propaganda and censorship', 'propaganda is the deliberate spreading of biased misleading or emotionally manipulative information to promote a political cause or point of view it adds content to shape opinion', 'censorship is the suppression or prohibition of speech writing or information deemed objectionable harmful or inconvenient it removes or blocks content',
      'authoritarian states use both censor the opposition and flood the space with propaganda', 'one pushes a message the other silences messages',
    ],
    `They are opposite techniques of information control, often used together.

PROPAGANDA is the deliberate creation and spreading of information — frequently biased, one-sided, emotionally loaded, or outright false — designed to shape people's beliefs and behaviour in favour of a particular cause, government, or ideology. It ADDS material to the information environment: posters, slogans, staged news, films, rallies, "patriotic" education, bot-amplified messaging. The aim is to make you think and feel a certain way.

CENSORSHIP is the suppression, blocking, or prohibition of speech, writing, images, or other information that an authority considers objectionable, dangerous, embarrassing, or inconvenient. It REMOVES or prevents material: banning books, jamming broadcasts, deleting posts, jailing journalists, requiring pre-publication approval, blacking out news of a defeat or a disaster. The aim is to stop you from encountering certain ideas or facts.

Authoritarian regimes typically run both at once: censor independent journalism and dissent, and fill the resulting vacuum with state propaganda. In short — propaganda pushes a message in; censorship keeps messages out.`,
  ),
  k(
    'kb-gap-hist3-bc-vs-bce',
    'BC vs BCE (and AD vs CE)',
    [
      'difference between BC and BCE', 'BC means Before Christ and AD means Anno Domini in the year of the Lord the traditional Christian-era labels', 'BCE means Before the Common Era and CE means Common Era the religiously neutral equivalents',
      'the year numbering is identical 1 BCE equals 1 BC and 2026 CE equals AD 2026', 'there is no year zero AD follows the year name BC and both era abbreviations follow it', 'the count is based on a medieval estimate of the birth of Jesus',
    ],
    `They are two labelling systems for the SAME calendar and the SAME year numbers.

BC / AD is the traditional Western Christian labelling: "BC" = "Before Christ", and "AD" = "Anno Domini", Latin for "in the year of the Lord". The count is anchored to a 6th-century monk's estimate of the birth of Jesus (probably off by a few years). Convention: AD normally goes BEFORE the number (AD 1066) and BC after it (44 BC); there is NO year zero, so 1 BC is followed directly by AD 1.

BCE / CE is the religiously NEUTRAL alternative, increasingly standard in academia, publishing, and multicultural contexts: "BCE" = "Before the Common Era", "CE" = "Common Era". It keeps the exact same numbering — 1 BCE is the same year as 1 BC, and 2026 CE is the same year as AD 2026 — but drops the explicitly Christian phrasing "Christ" and "the Lord". Both abbreviations go after the number (2026 CE, 44 BCE).

So the only difference is the WORDS, not the dates: BC = BCE, AD = CE.`,
  ),
  k(
    'kb-gap-hist3-union-vs-confederacy',
    'The Union vs the Confederacy (American Civil War)',
    [
      'difference between the Union and the Confederacy', 'the Union was the northern states that stayed loyal to the United States federal government under Abraham Lincoln opposing secession', 'the Confederacy the Confederate States of America was the eleven southern slaveholding states that seceded in 1860-61 to form their own government under Jefferson Davis',
      'the central cause was the preservation and expansion of slavery', 'the Union won in 1865 secession was defeated slavery abolished by the 13th Amendment', 'blue versus grey uniforms',
    ],
    `In the American Civil War (1861-1865):

The UNION (also "the North", "the Federals", "the Yankees") was the United States government and the roughly 20 states, plus territories, that remained loyal to it. Its president was Abraham LINCOLN. It fought to preserve the country as one nation — to reject the right of states to secede — and, from 1863 (the Emancipation Proclamation), increasingly to end slavery. It had far more people, industry, railroads, and money. Its soldiers wore blue.

The CONFEDERACY (the "Confederate States of America", "the South", "the Rebels", "the Grey") was the 11 slaveholding states that SECEDED in 1860-61 (South Carolina first, after Lincoln's election) and formed their own government with a constitution, under president Jefferson DAVIS, capital Richmond, Virginia. The declared central reason for secession, stated plainly in the states' own declarations, was to protect and extend SLAVERY against a federal government they feared would restrict it. Its soldiers wore grey.

The Union won. The Confederacy collapsed in April 1865, secession was permanently defeated, and the 13th Amendment (1865) abolished slavery throughout the country.`,
  ),
  k(
    'kb-gap-hist3-artifact-vs-fossil',
    'Artifact vs fossil',
    [
      'difference between an artifact and a fossil', 'a fossil is the preserved remains or traces of a once-living organism bones shells imprints footprints formed by natural processes studied by palaeontology', 'an artifact is any object made modified or used by humans tools pottery weapons jewellery buildings studied by archaeology',
      'a fossil is about natural life an artifact is about human activity', 'a carved ivory figurine is an artifact ancient pollen in a core is an ecofact not an artifact',
    ],
    `A FOSSIL is the preserved REMAINS or TRACE of a once-living ORGANISM — an animal, plant, or microbe. It forms through natural processes over long periods: bones and shells mineralising into rock, leaf impressions, footprints, burrows, amber-trapped insects, coprolites (fossil dung). Fossils are the evidence base of PALAEONTOLOGY and tell us about the history of LIFE and of the Earth.

An ARTIFACT is any object that was MADE, MODIFIED, or USED by HUMANS (or human ancestors) — a stone hand-axe, a pot, a coin, a sword, a bead, a wall, a written tablet. Artifacts are the evidence base of ARCHAEOLOGY and tell us about human behaviour, technology, trade, and belief.

So the dividing line is NATURAL LIFE vs HUMAN ACTIVITY. Edge cases: a figurine carved from mammoth ivory is an artifact (human-made) even though the ivory came from an animal; a naturally fossilised shell that ancient people collected and drilled into a pendant becomes an artifact by that human use; and plant/animal remains found at a human site but not shaped by people (seeds, animal bones from meals) are called "ecofacts".`,
  ),
  k(
    'kb-gap-hist3-dictatorship-vs-authoritarian',
    'Dictatorship vs authoritarian regime',
    [
      'difference between a dictatorship and an authoritarian regime', 'authoritarianism is a broad category of political system with concentrated power limited pluralism and few civil liberties but which may keep some institutions controlled elections a dominant-party legislature some private life', 'a dictatorship is a form of rule where power is held by one person or a small clique with few or no legal or constitutional limits often seized or held by force',
      'not all authoritarian regimes are dictatorships one-party states military juntas absolute monarchies', 'dictatorship emphasises the personalisation and lack of constraint totalitarianism goes further controlling all of society',
    ],
    `AUTHORITARIANISM is the BROAD category: any political system in which power is highly concentrated, political pluralism and opposition are sharply limited, elections (if held) are unfair or purely ratifying, and civil liberties — press, assembly, speech — are restricted. But an authoritarian regime often KEEPS some institutions and some space: a rubber-stamp parliament, a dominant party, courts that function in non-political cases, private economic and family life left mostly alone. Examples across the spectrum: modern China, Russia, Singapore, Egypt, Gulf monarchies.

A DICTATORSHIP is a narrower idea — a form of rule in which power is held by a SINGLE person (or a small tight clique) with FEW OR NO effective legal, constitutional, or institutional limits, and typically seized or maintained by FORCE. The emphasis is on the personalisation of power and the absence of constraint.

So the relationship: dictatorships are a SUBSET of authoritarian regimes. An authoritarian state can also be a one-party state, a military junta, or an absolute monarchy without being a personal dictatorship. And TOTALITARIANISM goes a step beyond dictatorship — an all-controlling ideology and party that tries to reach into every part of society and the individual (Nazi Germany, Stalin's USSR, North Korea).`,
  ),
  k(
    'kb-gap-hist3-communism-vs-socialism',
    'Communism vs socialism',
    [
      'difference between communism and socialism', 'socialism is a broad family of ideologies calling for social or collective ownership of the means of production ranging from revolutionary to democratic and reformist', 'communism in the Marxist sense is the envisioned final stateless classless moneyless society and also the name of the 20th-century one-party states that claimed to be building it',
      'Marxism-Leninism treats socialism as a transitional stage communism as the end goal', 'the Nordic countries are social democracies market economies with large welfare states not socialist', 'democratic socialists want socialism achieved through elections',
    ],
    `SOCIALISM is a broad FAMILY of political and economic ideas whose common thread is that the "means of production" (factories, land, major capital) should be owned or controlled SOCIALLY — by the state, by the workers, by the community — rather than privately, so the economy serves collective need rather than private profit. It ranges widely: revolutionary Marxist socialism, democratic socialism (achieved through elections), market socialism, syndicalism, and more.

COMMUNISM has two related meanings:
1. In Karl Marx's theory, communism is the envisioned FINAL stage of history — a STATELESS, CLASSLESS, MONEYLESS society of common ownership and "from each according to ability, to each according to need". It is the end goal, never actually reached.
2. As a common label, "Communist" also names the 20th-century one-party states (the USSR, Maoist China, Cuba, North Korea) and the parties that ran them, following Marxism-LENINISM, which treated "socialism" as a TRANSITIONAL stage — a workers' state suppressing the old ruling class — on the road to communism.

Important: the NORDIC countries are NOT socialist. They are SOCIAL DEMOCRACIES — capitalist market economies with private ownership, plus heavy regulation, strong unions, and a large tax-funded welfare state.`,
  ),
  k(
    'kb-gap-hist3-genocide-vs-ethnic-cleansing',
    'Genocide vs ethnic cleansing',
    [
      'difference between genocide and ethnic cleansing', 'genocide is acts committed with intent to destroy in whole or in part a national ethnic racial or religious group a defined crime under the 1948 Genocide Convention', 'ethnic cleansing is the forced removal or expulsion of an ethnic group from a territory to make it ethnically homogeneous through deportation terror and destruction of property and culture',
      'genocide aims to destroy the group as such ethnic cleansing aims to remove it from a place', 'ethnic cleansing is not itself a distinct crime in international law though its component acts are', 'the two overlap campaigns can escalate from one to the other',
    ],
    `Both target a group defined by ethnicity, but the AIM differs.

GENOCIDE is a defined CRIME under international law (the 1948 UN Genocide Convention): acts committed with the INTENT TO DESTROY, in whole or in part, a national, ethnic, racial, or religious group AS SUCH. The listed acts include killing members of the group, causing serious bodily or mental harm, deliberately inflicting conditions of life calculated to destroy the group, preventing births, and forcibly transferring children. The key element is the specific intent to eliminate the group's existence. The Holocaust, Rwanda 1994, and the Armenian genocide are examples.

ETHNIC CLEANSING is the forced REMOVAL of an ethnic (or religious) group from a territory to make that area ethnically homogeneous — through mass expulsion, deportation, terror, massacres, rape, and the destruction of homes, mosques, churches, and cultural sites so people have nothing to return to. Its aim is to clear the group OUT OF A PLACE, not necessarily to destroy the group everywhere. It is NOT itself a separate named crime in international law, though its component acts are crimes against humanity or war crimes, and campaigns of ethnic cleansing frequently involve or escalate into genocide (as in Bosnia in the 1990s).`,
  ),
  k(
    'kb-gap-hist3-capitalism-vs-free-market',
    'Capitalism vs a free market',
    [
      'difference between capitalism and a free market', 'capitalism is an economic system based on private ownership of the means of production and the pursuit of profit', 'a free market is a way of coordinating an economy through voluntary exchange guided by prices and competition with minimal government intervention',
      'you can have capitalism that is heavily regulated not a free market', 'markets can exist without full private capitalism', 'most real economies are mixed regulated capitalism with markets plus a state role',
    ],
    `CAPITALISM is an ECONOMIC SYSTEM defined by PRIVATE OWNERSHIP of the "means of production" — businesses, land, factories, capital — operated for PROFIT by their owners, with labour hired for wages. It is about WHO OWNS things and WHY they produce.

A FREE MARKET is a MECHANISM for coordinating economic activity: buyers and sellers making VOLUNTARY exchanges, with prices set by supply and demand and competition, and with MINIMAL government intervention (no price controls, few regulations, low barriers to entry). It is about HOW decisions are coordinated.

They usually go together but are not the same:
- You can have CAPITALISM that is NOT a free market: private firms operating under heavy regulation, tariffs, licensing, subsidies, monopolies, and state direction (much of the modern world, and historically mercantilism).
- You can have MARKETS without full private capitalism: "market socialism", where worker-owned or state-owned firms still compete and trade at market prices.

Most real economies are MIXED — mostly private ownership (capitalist) with markets doing most of the coordinating, plus regulation, taxes, public services, and a safety net. "Free-market capitalism" is one point on that spectrum, not the only form capitalism takes.`,
  ),
  k(
    'kb-gap-hist3-ww1-vs-ww2',
    'World War I vs World War II',
    [
      'difference between World War I and World War II', 'WWI 1914-1918 triggered by an assassination and a chain of alliances mostly static trench warfare of attrition about 17 million dead ended with the armistice and the Treaty of Versailles', 'WWII 1939-1945 started by Nazi Germany and Japan mobile mechanised warfare blitzkrieg air power the Holocaust the atomic bomb about 70 to 85 million dead ended with unconditional surrender',
      'WWI empires Germany Austria-Hungary Ottoman Russia WWII ideologies fascism versus the Allies', 'the harsh Versailles settlement helped cause WWII',
    ],
    `WORLD WAR I (1914-1918): triggered by the assassination of Archduke Franz Ferdinand and a cascade of ALLIANCE commitments that pulled the European empires in. Fought mainly as STATIC TRENCH WARFARE — especially the deadlocked Western Front — a war of ATTRITION with new industrial weapons (machine guns, poison gas, artillery). Combatants were largely EMPIRES: Germany, Austria-Hungary, the Ottomans, and Russia. About 17 million dead. It ended with an ARMISTICE (11 November 1918) and the punitive Treaty of VERSAILLES, which stripped Germany of territory, forces, and money and assigned it "war guilt".

WORLD WAR II (1939-1945): started by deliberate AGGRESSION — Nazi Germany invading Poland, after earlier expansion, and Japan's war in Asia. Fought as MOBILE, MECHANISED warfare — tanks, "blitzkrieg", carrier air power, strategic bombing of cities — and defined by IDEOLOGY (fascism and militarism vs the Allies) and by the HOLOCAUST, the genocide of six million Jews and millions of others. It ended the war in Europe with Germany's UNCONDITIONAL SURRENDER (May 1945) and in the Pacific after the ATOMIC BOMBINGS of Hiroshima and Nagasaki (August 1945). About 70-85 million dead, most of them civilians.

The two are linked: the harsh WWI settlement, plus the Great Depression, fed the grievances and extremism that produced WWII.`,
  ),
  k(
    'kb-gap-hist3-civil-war-vs-revolution',
    'Civil war vs revolution',
    [
      'difference between a civil war and a revolution', 'a civil war is an armed conflict between organised groups within one country over control of the state or a region or secession defined by scale of fighting', 'a revolution is a fundamental and relatively rapid transformation of a societys political and often social and economic order the overthrow of the existing regime and its replacement',
      'a civil war is about the means large-scale internal armed conflict a revolution is about the outcome deep systemic change', 'a revolution may or may not involve a civil war and a civil war may not produce a revolution',
    ],
    `A CIVIL WAR describes the FORM of a conflict: sustained, large-scale ARMED fighting between organised groups WITHIN a single country — typically the government against one or more rebel forces, or two would-be governments — over control of the state, control of a region, or the right to secede. The defining features are that it is internal and that the violence is on the scale of a war (not a riot or a coup). The American Civil War (secession), the Spanish Civil War, the Syrian Civil War.

A REVOLUTION describes an OUTCOME: a fundamental, relatively rapid transformation of a society's POLITICAL order — the existing regime is overthrown and replaced by a different kind of government — and often its social and economic structure too. The French, Russian, and Iranian Revolutions.

They can overlap or not:
- a revolution WITH a civil war: the Russian Revolution (1917) was followed by the Russian Civil War (1918-22);
- a revolution WITHOUT much of a civil war: the largely non-violent 1989 collapses in Eastern Europe;
- a civil war WITHOUT a revolution: the American Civil War preserved the existing constitutional order rather than overturning it.

Short version: "civil war" is about the means (internal armed conflict); "revolution" is about the result (systemic change of regime).`,
  ),
];
