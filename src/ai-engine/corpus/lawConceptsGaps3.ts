import { KnowledgeItem } from '../../types';

/**
 * LAW_CONCEPTS_GAPS_3 — batch 235 corrections.
 * nexus-4b handled most legal contrasts well (civil/criminal, felony/
 * misdemeanor, solicitor/barrister, libel/slander, tort/crime, jurisdiction/
 * venue, burdens of proof). Misses:
 * - "judge vs magistrate" got tangled up with warrant/probable-cause language.
 * - "arrest vs detention" rambled about habeas corpus instead of the
 *   reasonable-suspicion stop vs probable-cause custody distinction.
 * - "first vs second degree murder" described accomplice liability.
 * - "theft vs larceny" answered about embezzlement and breach of trust.
 * - "testimony vs evidence" ended "it's basically the same thing".
 * - "robbery vs burglary" was a raw web dump.
 */
const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id, title, category: 'law', keywords, content, createdAt: now,
});

export const LAW_CONCEPTS_GAPS_3: KnowledgeItem[] = [
  k(
    'kb-gap-law3-judge-vs-magistrate',
    'Judge vs magistrate',
    [
      'difference between a judge and a magistrate', 'magistrate handles minor cases and preliminary matters', 'lay magistrate justice of the peace England Wales',
      'US magistrate judge federal preliminary hearings warrants bail', 'a judge presides over full trials and sentencing', 'not about issuing warrants only',
    ],
    `Both are judicial officers, but a magistrate is a lower-tier one with limited powers.

A JUDGE is a fully qualified judicial officer (almost always a former lawyer, appointed or elected) who presides over trials, rules on law and procedure, instructs juries, decides cases tried without a jury, and passes sentence. Judges sit at every level from trial courts up to supreme courts.

A MAGISTRATE handles the lower end of the workload:
- In England and Wales, most magistrates are unpaid lay volunteers ("Justices of the Peace") with no legal training, sitting in threes with a legal adviser. They deal with minor criminal cases, decide bail, and pass the serious cases up to the Crown Court. (A small number are legally qualified paid "district judges (magistrates' court)".)
- In the US federal system, a "magistrate judge" is a lawyer appointed by the district court to handle preliminary matters — issuing warrants, initial appearances, bail hearings, misdemeanor trials, and pre-trial motions — freeing the district judges for full trials. Many US states have similar lower judicial officers called magistrates.

So the distinction is scope and seniority: magistrates deal with minor matters and the early stages of serious ones; judges handle full trials, complex law, and sentencing on serious charges.`,
  ),
  k(
    'kb-gap-law3-arrest-vs-detention',
    'Arrest vs detention',
    [
      'difference between arrest and detention', 'investigative detention brief stop reasonable suspicion Terry stop', 'arrest taking into custody probable cause booking',
      'not free to leave', 'how long can police hold you', 'seizure of the person',
    ],
    `Both are seizures of a person by police, differing in how much justification they need and how far they go.

A DETENTION (investigative detention, "Terry stop" in the US) is a brief, temporary hold so an officer can investigate. It requires only REASONABLE SUSPICION — specific facts suggesting the person may be involved in a crime. During it you are not free to leave, the officer may pat you down for weapons, and it must last only as long as needed to confirm or dispel the suspicion (minutes, typically). You are not booked or charged.

An ARREST is taking a person into custody to face a criminal charge. It requires the higher standard of PROBABLE CAUSE — enough facts for a reasonable person to believe the individual committed a crime — or an arrest warrant. It triggers the full set of protections (in the US, Miranda warnings before custodial questioning), booking, fingerprinting, and either release on bail or being brought before a court within a set time (often 24-72 hours).

The line matters because evidence found after an unlawful arrest — or a "detention" that lasted far too long or went too far without probable cause — can be excluded from trial. A lawful detention can ripen into an arrest once probable cause develops.`,
  ),
  k(
    'kb-gap-law3-first-vs-second-degree-murder',
    'First-degree vs second-degree murder',
    [
      'difference between first degree and second degree murder', 'first degree premeditated deliberate willful or felony murder', 'second degree intentional but not premeditated',
      'depraved heart extreme recklessness', 'not accomplice or accessory liability', 'malice aforethought degrees of murder',
    ],
    `Both are murder — an unlawful killing with "malice aforethought" — and the degree reflects how deliberate it was. (This is about the killer's own state of mind, not about helping someone else kill; assisting a killer is accomplice or accessory liability, a separate doctrine.)

FIRST-DEGREE MURDER is the most culpable: the killing was PREMEDITATED and DELIBERATE — the person formed the intent to kill and had at least a moment to reflect on it before acting (lying in wait, poisoning, a planned hit). Most US states also fold in "felony murder": a death caused during a dangerous felony such as robbery, rape, kidnapping, or arson, even without intent to kill. First-degree carries the harshest penalties (life without parole, or the death penalty where it exists).

SECOND-DEGREE MURDER covers intentional killings that were NOT premeditated — a sudden intent to kill formed in the moment (but without the "heat of passion" provocation that would reduce it to manslaughter) — and "depraved heart" killings, where the person did not specifically intend death but acted with extreme, reckless disregard for human life (firing a gun into an occupied room). It is punished less severely than first-degree but more than manslaughter.

Exact labels and definitions vary by jurisdiction; some states use different names or add a third degree.`,
  ),
  k(
    'kb-gap-law3-theft-vs-larceny',
    'Theft vs larceny',
    [
      'difference between theft and larceny', 'larceny is the common law term for taking and carrying away property', 'theft is the broad modern umbrella term',
      'theft includes larceny embezzlement false pretenses', 'intent to permanently deprive', 'many modern codes merge them',
    ],
    `LARCENY is the traditional common-law crime: the unlawful taking and carrying away of someone else's tangible personal property, without their consent, with the intent to permanently deprive them of it. Classic pickpocketing or shoplifting is larceny. It does NOT cover situations where you already lawfully held the property (that is embezzlement) or where the owner handed it over because you tricked them (that is false pretenses / larceny by trick).

THEFT is the broad modern statutory umbrella term. Most modern criminal codes have consolidated the old separate offences — larceny, embezzlement, obtaining property by false pretenses, receiving stolen goods, extortion — into a single crime called "theft", precisely so prosecutors no longer have to guess which technical pigeonhole a dishonest taking fits. Where that consolidation has happened, "larceny" survives only as the historical name for the core taking-and-carrying-away conduct.

So: all larceny is theft; not all theft is larceny. Larceny is one specific way of stealing; theft is stealing in general. (Grades like "petty/petit theft" vs "grand theft" then turn on the value of what was taken.)`,
  ),
  k(
    'kb-gap-law3-testimony-vs-evidence',
    'Testimony vs evidence',
    [
      'difference between testimony and evidence', 'evidence is the broad category of anything offered to prove a fact', 'testimony is a witness spoken statements under oath',
      'documentary physical demonstrative real evidence', 'testimony is one type of evidence', 'exhibits versus witness statements',
    ],
    `EVIDENCE is the whole category of material presented in a legal proceeding to prove or disprove a fact. It includes several types:
- testimonial evidence — what witnesses say under oath;
- documentary evidence — contracts, letters, emails, records;
- physical / real evidence — the weapon, the drugs, DNA, fingerprints;
- demonstrative evidence — diagrams, models, animations that illustrate other evidence.
All of it is subject to rules of admissibility (relevance, hearsay, authentication, etc.).

TESTIMONY is specifically the spoken (or signed) statements a competent witness gives under oath, in a deposition or in court, in response to questions. It is just ONE type of evidence — the testimonial type.

So testimony is a subset of evidence, not a synonym. A document sitting in a file is evidence but not testimony; a witness must usually testify to identify and introduce it. Conversely, testimony about something the witness personally perceived can itself be powerful evidence with no physical exhibit at all.`,
  ),
  k(
    'kb-gap-law3-robbery-vs-burglary',
    'Robbery vs burglary',
    [
      'difference between robbery and burglary', 'robbery is taking property by force or threat from a person', 'burglary is unlawful entry into a structure with intent to commit a crime',
      'robbery is a crime against a person', 'burglary is a crime against property no victim confrontation needed', 'larceny plus force equals robbery',
    ],
    `ROBBERY is theft from a PERSON by FORCE or the THREAT of force. Three things must be present: property is taken, it is taken directly from someone's person or immediate presence, and it is done by violence or intimidation ("hand over your wallet or I'll shoot"). Robbery is a crime against the person as well as against property, which is why it is graded seriously (armed robbery more so). No building is required — a street mugging is robbery.

BURGLARY is unlawfully ENTERING a building or structure with the INTENT to commit a crime inside (usually theft, but it can be any felony or, in many places, any crime). The crime is complete at the moment of unlawful entry with that intent — you need not actually steal anything, and no one need be home or even aware. Traditional common law required breaking and entering a dwelling at night; modern statutes have dropped most of those limits.

Key contrasts: robbery needs a victim confronted with force; burglary needs an unlawful entry and a criminal intent but no confrontation. You can have one without the other, or both at once (breaking into a house and then forcing the occupant at knifepoint to hand over jewellery is burglary plus robbery).`,
  ),
];
