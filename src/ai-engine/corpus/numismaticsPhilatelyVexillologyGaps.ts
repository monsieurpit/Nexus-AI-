import { KnowledgeItem } from '../../types';

// Batch 309 corpus fixes — numismatics (coin collecting), philately (stamp collecting), and
// vexillology/heraldry (flags and coats of arms), "what's the difference between X and Y" topics.
// Zero prior dedicated corpus coverage of this whole domain (grep for numismatic/philately/
// heraldry/vexillology across the entire corpus returned nothing) — 22/25 misses, in line with
// other brand-new zero-coverage domains (martial arts 17/25, cocktails/spirits 22/25). Failure
// patterns: severe wrong-domain hallucinations (proof coin/uncirculated coin answered with
// alcohol ABV "proof"; mint mark/hallmark answered with printmaking/etching press trivia; coin/
// medal answered with cryptocurrency "coins" like Bitcoin/Ether; proof set/mint set answered with
// trading-card "mint condition" and art-print "artist's proof" trivia; flag/banner and heraldry/
// vexillology both dumped unrelated Wikipedia trivia about UN member states and 11th-century Italy
// respectively without ever defining the second term), outright dodges with zero information given
// (ensign/standard, seal/coat of arms), and one-sided answers that only explained the first term
// (stamp/postmark, first day cover/commemorative stamp, perforated/imperforate stamp, definitive/
// commemorative stamp, coat of arms/crest, cancelled stamp/mint stamp).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'Collecting',
  keywords,
  content,
  createdAt: now,
});

export const NUMISMATICS_PHILATELY_VEXILLOLOGY_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-collect-numismatics-vs-philately',
    'Numismatics vs philately',
    ['numismatics', 'philately', 'difference numismatics philately'],
    "Numismatics is the study and collecting of currency — coins, banknotes, tokens, and medals — including their history, production methods, and value. Philately is the study and collecting of postage stamps and related material (postmarks, first day covers, revenue stamps). Both are collecting hobbies with their own specialist terminology, grading systems, and dedicated societies, but they cover completely different physical objects: numismatics is about money and coinage, philately is about stamps and mail. The key difference: numismatics is the study/collecting of coins and currency, while philately is the study/collecting of postage stamps — a numismatist collects coins, a philatelist collects stamps.",
  ),
  k(
    'kb-gap-collect-coin-vs-medal',
    'Coin vs medal',
    ['coin', 'medal', 'difference coin medal'],
    "A coin is a piece of metal currency issued by a government or monetary authority with an official face value, intended to be used as legal tender to buy and sell things (though some are struck purely as collectibles). A medal (or medallion) is not currency at all and has no monetary face value — it's a struck or cast piece of metal awarded to commemorate an event, achievement, or act (like a sports medal, military medal, or commemorative medallion), meant to be kept or displayed rather than spent. The key difference: a coin is legal-tender currency with an official face value meant to be used as money, while a medal has no monetary value at all and exists purely to commemorate or honor something.",
  ),
  k(
    'kb-gap-collect-obverse-vs-reverse',
    'Obverse vs reverse of a coin',
    ['obverse', 'reverse', 'heads tails', 'difference obverse reverse coin'],
    "The obverse of a coin is what's commonly called 'heads' — the front, primary side, which typically carries the main design, such as a portrait of a monarch, president, or national emblem, along with the year of minting. The reverse is what's commonly called 'tails' — the back side of the coin, which usually carries a secondary design, like a national symbol, building, or denomination value. Which side counts as the 'obverse' is set by the minting authority's convention, not just by which side happens to face up. The key difference: the obverse is the coin's front/'heads' side carrying the primary design (often a portrait), while the reverse is the back/'tails' side carrying the secondary design.",
  ),
  k(
    'kb-gap-collect-mintmark-vs-hallmark',
    'Mint mark vs hallmark',
    ['mint mark', 'hallmark', 'difference mint mark hallmark'],
    "A mint mark is a small letter or symbol stamped on a coin indicating which specific mint (production facility) struck it — for example 'D' for Denver or 'S' for San Francisco on US coins — used to track production and identify rarer coins from certain mints. A hallmark is a completely different kind of mark, stamped on precious-metal items like gold or silver jewelry and silverware (not coins) to certify the purity/fineness of the metal and often the maker and assay office that tested it, protecting buyers from fraud. The key difference: a mint mark identifies which mint produced a coin, while a hallmark certifies the purity and origin of a precious-metal item like jewelry or silverware — they appear on completely different kinds of objects for completely different purposes.",
  ),
  k(
    'kb-gap-collect-proof-vs-uncirculated',
    'Proof coin vs uncirculated coin',
    ['proof coin', 'uncirculated coin', 'difference proof uncirculated coin'],
    "A proof coin is struck using a special, deliberate process — specially polished dies and planchets (blanks), often struck multiple times — to produce an exceptionally sharp, mirror-like, high-detail finish specifically for collectors; proof coins are never intended to circulate as everyday money. An uncirculated coin (sometimes called 'mint state') is a coin struck by the normal production process for regular circulation, but pulled aside and preserved before it ever entered circulation, so it has no wear — but it lacks the deliberately enhanced mirror finish and extra striking care that goes into a proof coin. The key difference: a proof coin is specially struck with extra care for a mirror-like collector finish and never meant to circulate, while an uncirculated coin is a regular-production coin that simply hasn't been used yet, without that same deliberate finishing process.",
  ),
  k(
    'kb-gap-collect-stamp-vs-postmark',
    'Stamp vs postmark',
    ['postage stamp', 'postmark', 'difference stamp postmark'],
    "A postage stamp is a small adhesive label affixed to mail to show that postage has been paid, issued and sold by a postal authority, and often bearing artistic or commemorative designs that make it collectible. A postmark is not something you buy or stick on — it's a mark stamped or printed directly onto the mail piece (usually cancelling the stamp) by the postal service, recording the date, time, and location the item was processed, and serving to prevent stamp reuse as well as documenting when/where it was sent. The key difference: a stamp is the purchased adhesive label that pays for postage, while a postmark is the ink stamp applied by the post office itself to cancel that stamp and record where and when the mail was processed.",
  ),
  k(
    'kb-gap-collect-fdc-vs-commemorative',
    'First day cover vs commemorative stamp',
    ['first day cover', 'fdc', 'commemorative stamp', 'difference first day cover commemorative stamp'],
    "A commemorative stamp is a stamp issued for a limited time to honor a specific person, event, or anniversary, printed in a fixed limited quantity and then permanently retired (unlike ordinary stamps, which stay in production for regular postage needs). A first day cover (FDC) is a different thing entirely — it's an envelope bearing a stamp (commemorative or otherwise) that has been postmarked specifically on the very first day that stamp was officially issued/sold, often with a special first-day-of-issue cancellation and sometimes a decorative 'cachet' design. The key difference: a commemorative stamp is the limited-run stamp itself honoring a specific subject, while a first day cover is an envelope bearing any stamp postmarked specifically on that stamp's official release day — a commemorative stamp can exist without ever being made into a first day cover, and an FDC can carry a stamp that isn't commemorative at all.",
  ),
  k(
    'kb-gap-collect-perforated-vs-imperforate',
    'Perforated stamp vs imperforate stamp',
    ['perforated stamp', 'imperforate stamp', 'difference perforated imperforate stamp'],
    "A perforated stamp has a row of small punched holes running around its edges (perforations), letting it be cleanly torn away from the surrounding sheet along a straight line without scissors — this became the standard for postage stamps starting in the 1850s. An imperforate stamp has no such holes at all — it has plain, unbroken edges, meaning it must be cut apart with scissors or a knife from the sheet it was printed on, which was the norm for the earliest postage stamps (like the 1840 Penny Black) before perforation was introduced, and is sometimes deliberately reproduced today as a rare collector variant. The key difference: a perforated stamp has punched holes along its edges for clean tearing, while an imperforate stamp has plain, unperforated edges that must be cut apart with scissors.",
  ),
  k(
    'kb-gap-collect-definitive-vs-commemorative-stamp',
    'Definitive stamp vs commemorative stamp',
    ['definitive stamp', 'commemorative stamp', 'difference definitive commemorative stamp'],
    "A definitive stamp is a standard, everyday postage stamp printed in large ongoing quantities over a long period (often years), usually featuring a simple, unchanging design like a national leader's portrait or a landscape, used for regular day-to-day mail. A commemorative stamp is the opposite in production terms — it's issued for a limited time in a fixed, smaller print run to specifically honor a particular person, event, or anniversary, and is permanently retired from sale once that run sells out or its issue period ends, rather than staying in ongoing production. The key difference: a definitive stamp is a long-running, unchanging, everyday stamp for regular mail, while a commemorative stamp is a special, limited-run stamp issued temporarily to honor a specific subject and then retired.",
  ),
  k(
    'kb-gap-collect-flag-vs-banner',
    'Flag vs banner',
    ['flag', 'banner', 'difference flag banner'],
    "A flag is a piece of fabric with a distinctive design that is typically flown from a pole or mast, most often attached along one edge (the hoist) so it can fly freely and flap in the wind — it usually represents a nation, organization, or cause with an officially defined design. A banner is a broader, looser term — it can refer to fabric hung or displayed in other ways (suspended horizontally between two points, hung vertically against a wall, or carried at both ends in a procession), is often used for a specific temporary occasion or message rather than a permanent national/organizational symbol, and in heraldry specifically refers to a square or rectangular flag bearing a full coat of arms. The key difference: a flag is specifically designed to fly from a pole/mast attached at the hoist edge and usually represents a permanent entity like a nation, while a banner is a broader term for fabric displayed in other ways (hung, suspended, carried), often for a temporary message or occasion.",
  ),
  k(
    'kb-gap-collect-ensign-vs-standard',
    'Ensign vs standard (flags)',
    ['ensign', 'standard flag', 'difference ensign standard'],
    "An ensign is a flag flown specifically to show nationality or allegiance, most commonly at sea — ships fly a national ensign (like the UK's Red, White, or Blue Ensign) from the stern to identify which country they're registered to or which branch of service they belong to. A standard is historically a large, often elaborately decorated flag that identifies a specific individual, monarch, military unit, or regiment — it was traditionally carried into battle as a rallying point and to mark the presence of its owner (a royal standard flies wherever that monarch currently is, for instance), rather than marking a vessel's nationality. The key difference: an ensign is a national/service flag flown mainly by ships to show nationality, while a standard is a flag tied to a specific individual, monarch, or military unit, traditionally used as a battlefield rallying marker and personal identifier.",
  ),
  k(
    'kb-gap-collect-coat-of-arms-vs-crest',
    'Coat of arms vs crest',
    ['coat of arms', 'crest', 'difference coat of arms crest'],
    "A coat of arms is the full heraldic design displayed on a shield (escutcheon) — the pattern of colors, symbols, and charges that identifies a specific person, family, or institution, and it's the central element of a complete heraldic 'achievement.' A crest is only one specific component that can sit ON TOP of a complete heraldic achievement, above the helmet and wreath, separate from the shield itself — originally a three-dimensional ornament attached to the top of a knight's helmet for identification in battle. In everyday casual speech people often say 'family crest' to mean the whole coat of arms, but technically the crest is just the topmost helmet ornament, while the coat of arms refers to the full shield design (and can also loosely mean the entire achievement, shield plus crest plus supporters plus motto). The key difference: a coat of arms is the full heraldic shield design that identifies a person or family, while a crest is specifically the separate ornamental figure that sits above the helmet at the top of a full heraldic achievement — not the same as the shield itself.",
  ),
  k(
    'kb-gap-collect-heraldry-vs-vexillology',
    'Heraldry vs vexillology',
    ['heraldry', 'vexillology', 'difference heraldry vexillology'],
    "Heraldry is the centuries-old discipline concerned with the design, display, and regulation of coats of arms and armorial bearings — originally developed in medieval Europe so knights could be identified on the battlefield or in tournaments by their shield/surcoat designs, and it has its own formal rules and vocabulary (blazon) for describing those designs. Vexillology is a much newer field (the term was coined in the 1950s) specifically focused on the study of flags — their history, symbolism, usage, and design, covering national, regional, military, and organizational flags. The two fields overlap in some cases (a heraldic banner IS a flag bearing a coat of arms), but heraldry is broader and centers on shields/coats of arms specifically, while vexillology is entirely about flags as a category. The key difference: heraldry is the study and design of coats of arms and armorial bearings (mainly displayed on shields), while vexillology is the specific study of flags as a category, a separate and much more recently named field.",
  ),
  k(
    'kb-gap-collect-pennant-vs-flag',
    'Pennant vs flag',
    ['pennant', 'flag', 'difference pennant flag'],
    "A flag is typically rectangular (or occasionally another regular shape) and represents a nation, organization, or cause with an official, fixed design meant to be permanently recognized. A pennant is a distinctly different shape — long, narrow, and tapering to a point or a swallowtail at the end (triangular or forked), traditionally used at sea for signaling, ship identification, or decoration, and today more commonly seen as a sports team souvenir or celebratory banner rather than representing a nation or formal entity. The key difference: a flag is usually rectangular and represents a nation or fixed organization with an official design, while a pennant is long and tapering to a point, traditionally used for naval signaling and today mostly for sports/decorative purposes rather than formal national representation.",
  ),
  k(
    'kb-gap-collect-national-vs-state-flag',
    'National flag vs state/subnational flag',
    ['national flag', 'state flag', 'difference national state flag'],
    "A national flag represents an entire sovereign country as a whole on the international stage — it's the flag flown at national embassies, the UN, and international events, and there's only one official national flag per country. A state (or subnational/provincial) flag represents a smaller political division within that country — like a US state flag (e.g. Texas or California) or a Canadian provincial flag (e.g. Quebec or Ontario) — used for that specific region's local government and identity, flown alongside (not instead of) the national flag, and it has no standing to represent the country as a whole internationally. The key difference: a national flag represents an entire sovereign country and is used in international contexts, while a state/provincial flag represents just one internal region of that country and is used only for that region's local identity, flown alongside the national flag rather than replacing it.",
  ),
  k(
    'kb-gap-collect-seal-vs-coat-of-arms',
    'Seal vs coat of arms',
    ['seal', 'coat of arms', 'difference seal coat of arms'],
    "A coat of arms is a heraldic design — a pattern of colors, symbols, and charges displayed on a shield — that identifies a specific person, family, or institution, following formal heraldic rules of design (blazon). A seal is a device (historically stamped into wax, now often just printed or embossed) used to authenticate an official document by pressing an impression into it — a seal's design very often incorporates a coat of arms as its central image (like many government or university seals), but a seal is fundamentally a tool of AUTHENTICATION for documents, while a coat of arms is fundamentally a heraldic IDENTIFYING design that can be displayed on a shield, flag, or many other surfaces, not just stamped onto paperwork. The key difference: a coat of arms is a heraldic identifying design, while a seal is a stamping device used to authenticate official documents — a seal often features a coat of arms as its artwork, but the seal itself is defined by its authenticating function, not by the design it carries.",
  ),
  k(
    'kb-gap-collect-shield-vs-escutcheon',
    'Shield vs escutcheon in heraldry',
    ['shield', 'escutcheon', 'difference shield escutcheon heraldry'],
    "In everyday usage, 'shield' just means the general protective object a warrior carries, or loosely any shield-shaped image. 'Escutcheon' is the specific heraldic term for the shield shape used as the surface on which a coat of arms is formally displayed — it's not a different physical object, it's the precise technical name heraldry uses for that shield-shaped background. So an escutcheon IS a shield in the heraldic sense — the terms aren't describing two different things, escutcheon is simply the formal, specialized vocabulary word heraldry uses where everyday speech would just say 'shield.' The key difference: there isn't a real difference in what they refer to within heraldry — 'escutcheon' is just the precise heraldic term for the shield shape that displays a coat of arms, while 'shield' is the everyday, general word for the same shape.",
  ),
  k(
    'kb-gap-collect-banknote-vs-coin',
    'Banknote vs coin',
    ['banknote', 'coin', 'difference banknote coin'],
    "A coin is a piece of struck metal currency, typically used for lower denominations, valued in part historically for the metal itself (though modern coins are mostly base metal tokens rather than holding metal value equal to their face value) and built to withstand heavy physical wear from constant handling. A banknote (bill) is printed paper (or polymer) currency, typically used for higher denominations, made from paper/polymer rather than metal, and — unlike a coin — represents a promissory claim issued by a central bank/monetary authority rather than carrying any intrinsic material value at all. The key difference: a coin is struck metal currency valued mainly for lower denominations and physical durability, while a banknote is printed paper or polymer currency used mainly for higher denominations, representing a central bank's issued promissory value rather than metal worth.",
  ),
  k(
    'kb-gap-collect-denomination-vs-face-value',
    'Denomination vs face value',
    ['denomination', 'face value', 'difference denomination face value'],
    "Denomination refers to the specific CATEGORY or unit of a piece of currency — it's the label that identifies which value-tier a coin or banknote belongs to, like 'a $20 bill,' 'a quarter,' or 'a €5 note' — essentially the currency's designation. Face value is the specific NUMERIC monetary amount that denomination is officially worth, printed or stamped on the currency itself — for example, a coin's denomination might be 'quarter dollar' and its face value is '25 cents.' In everyday practice the two terms are used almost interchangeably for standard currency, but denomination technically names the type/tier of currency, while face value is the actual stated numeric worth of that specific denomination. The key difference: denomination is the named category or type of currency (e.g. 'a ten-dollar bill'), while face value is the specific numeric monetary amount that denomination represents (e.g. '$10') — denomination names the tier, face value states the number.",
  ),
  k(
    'kb-gap-collect-proof-set-vs-mint-set',
    'Proof set vs mint set (coins)',
    ['proof set', 'mint set', 'difference proof set mint set'],
    "A proof set is a specially packaged collection of proof coins from a given year — coins struck with the special, deliberate proof process (polished dies, sharp mirror-like finish) purely for collectors, never intended to circulate as regular money, and typically sold directly by the mint at a premium price. A mint set (also called an uncirculated set) is a collection of regular circulation-quality coins from that year's production, pulled aside before entering circulation and packaged together — these have normal production quality (not the enhanced mirror finish of proofs), but are still fresh, uncirculated examples of that year's standard coinage. The key difference: a proof set contains specially struck proof coins with an enhanced mirror finish made purely for collectors, while a mint set contains regular circulation-quality coins simply pulled aside before circulation — proof sets get the deliberate extra finishing process, mint sets don't.",
  ),
  k(
    'kb-gap-collect-cancelled-vs-mint-stamp',
    'Cancelled stamp vs mint stamp',
    ['cancelled stamp', 'mint stamp', 'difference cancelled mint stamp'],
    "A mint stamp is one that has never been used — it has never been affixed to mail, was never postmarked, still has its original gum on the back intact, and generally hasn't been mounted or handled in a way that damages it, making it the most pristine and often most valuable collector condition. A cancelled stamp is one that HAS been used — it was affixed to a piece of mail and then marked with a postmark or other cancellation ink by the postal service specifically to prevent reuse, which is a permanent mark on the stamp. The key difference: a mint stamp is unused, uncancelled, and still has its original gum, while a cancelled stamp has been used and bears a permanent postmark/cancellation mark applied by the post office to stop it being reused.",
  ),
  k(
    'kb-gap-collect-watermark-vs-perforation',
    'Watermark vs perforation on a stamp',
    ['watermark', 'perforation', 'difference watermark perforation stamp'],
    "A watermark is a faint design pressed into the stamp's paper itself during manufacturing (a variation in the paper's thickness/density created while the paper is being made), invisible under normal light but visible when the stamp is held up to light or examined with special fluid — it's used mainly to authenticate genuine stamps and detect forgeries, since faking the exact watermark pattern is difficult. A perforation is something entirely different and visible at a glance — it's the row of small punched holes running around a stamp's edges, added after printing specifically so the stamp can be cleanly torn away from the surrounding sheet without scissors. The key difference: a watermark is a hidden paper-density marking embedded during manufacturing used mainly for authentication, while a perforation is a visible row of punched holes around the edges used to let the stamp be torn cleanly from its sheet — completely different features serving completely different purposes.",
  ),
];
