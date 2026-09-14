import { KnowledgeItem } from '../../types';

// Batch 288 corpus fixes — law topics. 7/25 misses. One real factual error ("senator vs
// congressman" claimed US senators "are NOT elected," apparently confusing US Senate elections with
// the UK's unelected House of Lords) and one surprisingly basic omission ("slander vs libel" never
// mentioned the actual core distinguishing fact — spoken vs written/published defamation — despite
// that being the single most important thing to say).

const now = Date.now();
const k = (id: string, title: string, keywords: string[], content: string): KnowledgeItem => ({
  id,
  title,
  category: 'law',
  keywords,
  content,
  createdAt: now,
});

export const LAW_GAPS: KnowledgeItem[] = [
  k(
    'kb-gap-law-lawyer-vs-solicitor',
    'Lawyer vs solicitor',
    ['lawyer', 'solicitor', 'difference lawyer solicitor'],
    "'Lawyer' is the broad, general umbrella term for anyone qualified and licensed to practice law — in the US it's essentially synonymous with 'attorney,' with no further split. In the UK and other Commonwealth countries, though, the legal profession is split into two more specific roles: a solicitor handles most day-to-day legal work directly with clients — drafting contracts, giving legal advice, handling property transactions, and preparing cases — while a barrister specializes in representing clients in court, arguing cases before judges, especially in more serious or higher-court matters. So in the UK/Commonwealth system, 'lawyer' is the umbrella term covering BOTH solicitors and barristers, not a synonym for barrister specifically — a solicitor is one of the two main types of lawyer, alongside a barrister.",
  ),
  k(
    'kb-gap-law-senator-vs-congressman-correction',
    'Senator vs congressman (correcting an elected-status error)',
    ['senator', 'congressman', 'representative', 'difference senator congressman'],
    "Correcting an error: in the United States, BOTH senators and congressmen (members of the House of Representatives) are directly elected by voters — the US Senate is NOT an appointed body (that confusion sometimes comes from the UK's House of Lords, which historically included appointed/hereditary peers — a completely different system). A US Senator represents an entire STATE, serves a 6-year term, and there are exactly 2 per state (100 total) regardless of population. A congressman (US Representative) represents a smaller district WITHIN a state, serves a 2-year term, and the number of representatives per state is based on that state's population (larger states get more representatives). Both chambers are fully elected; the real differences are term length, what geographic area each represents, and how representation is apportioned (equal per state for the Senate, population-based for the House).",
  ),
  k(
    'kb-gap-law-misdemeanor-vs-citation',
    'Misdemeanor charge vs citation',
    ['misdemeanor', 'citation', 'ticket', 'difference misdemeanor citation'],
    "A misdemeanor is a formal criminal charge — a genuine crime, though less serious than a felony — that typically requires a court appearance, can result in up to a year in county/local jail, fines, or probation, and creates a criminal record. A citation (sometimes called a ticket) is typically issued for a minor INFRACTION — like a traffic violation or a small local ordinance violation — that usually doesn't require a court appearance (you can often just pay a fine to resolve it), doesn't carry jail time, and generally doesn't create a criminal record the way a misdemeanor does. The key difference: a misdemeanor is an actual criminal charge with a court process and potential jail time, while a citation is typically a lower-level infraction resolved by paying a fine, without a criminal record or court appearance in most cases.",
  ),
  k(
    'kb-gap-law-lawsuit-vs-class-action',
    'Lawsuit vs class action lawsuit',
    ['lawsuit', 'class action lawsuit', 'difference lawsuit class action'],
    "A regular lawsuit is filed by one specific person (or a small, specifically named group) against a defendant, seeking compensation or resolution only for that particular plaintiff's own individual claim. A class action lawsuit is filed by one or a few named plaintiffs on behalf of a much larger group of people ('the class') who all suffered a similar harm from the same defendant (like a defective product or a company-wide policy) — the outcome (a settlement or judgment) applies to the entire class of affected people, not just the named plaintiffs, and individuals in the class typically don't need to actively participate in the lawsuit to benefit from its outcome. The key difference: a regular lawsuit resolves one plaintiff's individual claim, while a class action resolves a shared claim on behalf of a large group of similarly affected people all at once.",
  ),
  k(
    'kb-gap-law-slander-vs-libel-core-fact',
    'Slander vs libel (the core spoken vs written distinction)',
    ['slander', 'libel', 'defamation', 'difference slander libel'],
    "The single most important distinction: slander is SPOKEN defamation — a false statement damaging someone's reputation that's said out loud (in a speech, conversation, or broadcast without a fixed script). Libel is WRITTEN or otherwise permanently published defamation — a false, damaging statement that's printed, posted online, or broadcast from a written script, existing in some fixed, more permanent record. Both are forms of defamation (making a false statement that harms someone's reputation), and the spoken-vs-written distinction is exactly why libel is often treated as more serious under the law in many jurisdictions — a written/published falsehood has more permanence and potentially wider, longer-lasting reach than something merely said out loud in the moment.",
  ),
  k(
    'kb-gap-law-eviction-vs-foreclosure',
    'Eviction vs foreclosure',
    ['eviction', 'foreclosure', 'difference eviction foreclosure'],
    "Eviction is a legal process where a LANDLORD removes a TENANT from a rental property — typically because the tenant violated the lease (failed to pay rent, breached terms), and it only affects people who are renting, not owners. Foreclosure is a legal process where a LENDER (like a bank) takes back a property from a HOMEOWNER who has stopped making mortgage payments, forcing the sale of the property to recover the loan balance — this only applies to property owners with a mortgage, not renters. The key difference: eviction removes a renting tenant from a landlord's property over a lease violation, while foreclosure is a lender reclaiming a mortgaged property from an owner who defaulted on their loan — completely different relationships (landlord-tenant vs lender-borrower) and different underlying legal processes.",
  ),
  k(
    'kb-gap-law-mediator-vs-arbitrator',
    'Mediator vs arbitrator',
    ['mediator', 'arbitrator', 'difference mediator arbitrator'],
    "A mediator is a neutral third party who helps two disputing sides communicate and negotiate toward their OWN mutually agreed solution — critically, a mediator has NO power to impose a decision; the mediator can only facilitate discussion, and the dispute is only resolved if both sides voluntarily agree to a resolution. An arbitrator acts more like a private judge — after hearing both sides' arguments and evidence, the arbitrator actually MAKES a decision and that decision is typically legally binding on both parties, similar to a court ruling, whether or not both sides are happy with it. The key difference: a mediator only helps facilitate an agreement that both parties must voluntarily accept, while an arbitrator has the authority to impose a binding decision on the parties regardless of whether they both agree with it.",
  ),
];
