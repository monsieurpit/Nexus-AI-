import { KnowledgeItem } from '../../types';

export const TRAVEL_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-travel-passports-documents',
    title: 'Travel Documents Basics: Passports, Visas, and What You Actually Need',
    category: 'Daily Life',
    keywords: [
      'passport basics', 'do i need a visa', 'passport expiration rule', 'travel documents',
      'how long does a passport take', 'passport basics international travel',
    ],
    content: `Many countries require your passport to be valid for at least 6 months BEYOND your travel dates (the "six-month rule"), not just valid on the day you enter — this trips up a lot of first-time travelers who check the expiration date and assume it's fine because it's after their trip, then get denied boarding at check-in. A visa is separate permission from a passport — some countries require no visa for short tourist stays from certain nationalities, some offer "visa on arrival," and others require applying and getting approval in advance; requirements depend entirely on your specific passport's nationality and destination, so always check the actual current government/embassy source rather than assuming based on a friend's different-nationality experience. Standard passport processing in most countries takes several weeks (commonly cited as roughly 6-8 weeks for standard service in the US, for example), with expedited paid options available in many countries — applying well before a planned trip, not last-minute, avoids real risk of missing it. A visa or passport requirement can also apply even for a layover in some countries depending on whether you leave the airport transit area — worth checking specifically for connecting flights through unfamiliar countries. Always keep a digital copy (photo or cloud-stored scan) of your passport's photo page separate from the physical document — it doesn't replace a lost passport but massively speeds up getting an emergency replacement at an embassy.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-travel-packing-jetlag',
    title: 'Packing and Jet Lag: Practical Travel Basics',
    category: 'Daily Life',
    keywords: [
      'how to pack for a trip', 'jet lag tips', 'how to beat jet lag', 'carry on essentials',
      'packing tips', 'time zone adjustment travel',
    ],
    content: `Jet lag comes from your body's circadian rhythm (internal clock) being out of sync with the local time zone, and generally gets worse the more time zones you cross — a widely-cited rule of thumb is roughly one day of adjustment per time zone crossed, though this varies by person. Traveling east (losing time, e.g. US to Europe) is generally reported as harder to adjust to than traveling west (gaining time), since it's easier for the body's natural rhythm to stay up later than to fall asleep earlier. Practical mitigation that's fairly well-supported: getting sunlight exposure at the RIGHT time for your new time zone (morning light helps shift your clock earlier, evening light helps shift it later), adjusting your sleep schedule a bit before departure if possible, staying hydrated (cabin air is very dry, and dehydration worsens fatigue symptoms generally), and avoiding alcohol on the flight (it disrupts sleep quality even though it can make you feel drowsy short-term). For packing: rolling clothes instead of folding generally saves more space and reduces deep creases; packing a full outfit change plus essential medications/documents in your carry-on protects against checked-bag delays or loss; and checking your specific airline's carry-on liquid rules (commonly around 100mL/3.4oz per container in many countries, all fitting in one quart/liter bag) before packing toiletries avoids last-minute confiscation at security.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-travel-safety-scams',
    title: 'Travel Safety Basics: Common Scams and Staying Safe Abroad',
    category: 'Daily Life',
    keywords: [
      'common travel scams', 'travel safety tips', 'how to avoid tourist scams', 'staying safe while traveling',
      'travel safety basics', 'pickpocket prevention',
    ],
    content: `Common tourist scams that show up across many countries in similar forms: someone "accidentally" spills something on you then their accomplice pickpockets you during the distraction; a "free" bracelet/item is aggressively tied on and then payment is demanded; unofficial taxis quote a flat "special price" far above the metered rate (using an official taxi stand or a rideshare app when available generally avoids this); and fake petitions/surveys are used as a distraction for pickpocketing while you're focused on signing something. Basic pickpocket prevention: keep valuables in a front pocket or a bag worn across the body in front of you rather than a back pocket or over-the-shoulder bag that can be accessed unnoticed in a crowd, and be especially alert in dense tourist areas and public transit, the two most commonly cited high-risk locations. Registering rough travel plans with your government (many countries offer a free traveler registration service) means they can reach/assist you faster in an emergency (natural disaster, civil unrest, family emergency at home). Keeping a digital and/or physical copy of important documents (passport, travel insurance, emergency contacts) separate from where you carry the originals is standard, low-effort risk mitigation. Researching common local scams for your SPECIFIC destination before a trip (they vary a lot by location) is generally more useful than general paranoia — most travel goes completely fine, and over-caution can also just make a trip less enjoyable.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-travel-jet-lag-basics',
    title: 'Jet Lag: Why It Happens and What Actually Helps',
    category: 'Daily Life',
    keywords: [
      'jet lag explained', 'how to beat jet lag', 'jet lag science', 'circadian rhythm travel',
      'jet lag east vs west',
    ],
    content: `Jet lag happens when travel across multiple time zones outpaces the body's internal circadian rhythm — the roughly 24-hour internal clock, regulated mainly by the suprachiasmatic nucleus in the brain and driven heavily by light exposure, that governs sleep-wake timing, hormone release, body temperature, and digestion — leaving the body's internal sense of time out of sync with the actual local time at the destination. As a rough rule of thumb, the body's internal clock adjusts at roughly one time zone per day, meaning a trip crossing many time zones can genuinely take the better part of a week to fully adjust, which is part of why jet lag feels disproportionately worse the more time zones are crossed. Traveling eastward is consistently reported as harder to adjust to than traveling westward, for a specific physiological reason: eastward travel requires the body to shift its clock forward (effectively "shortening" the day), while westward travel requires shifting it backward (effectively "lengthening" the day) — and most people's natural internal circadian cycle actually runs very slightly longer than 24 hours on its own, making it biologically easier to adapt to a lengthened day than a shortened one. Light exposure is the single most powerful tool for actually resetting the circadian clock, more so than any supplement: seeking bright light (ideally natural sunlight) at the destination's local morning, and avoiding light in the destination's evening, sends a strong signal that helps reset the internal clock faster than passively waiting it out. Other genuinely evidence-supported strategies include gradually shifting sleep/wake times a few days before departure to partially pre-adjust toward the destination's schedule, staying well-hydrated (dehydration measurably worsens perceived jet lag symptoms), and avoiding alcohol during the flight, which disrupts sleep quality even when it might feel like it helps someone fall asleep faster initially. Melatonin supplements, taken at the destination's local bedtime, have reasonable supporting evidence for helping resync the circadian rhythm faster, though they work best as one part of a broader light-exposure and schedule-adjustment strategy rather than a standalone fix.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-travel-packing-carry-on-basics',
    title: 'Smart Travel Packing: Carry-On Rules and Practical Habits',
    category: 'Daily Life',
    keywords: [
      'carry on luggage rules', 'how to pack a carry on', 'travel packing tips', 'liquids rule airport',
      'packing cubes',
    ],
    content: `Most international flights allow one carry-on bag plus one personal item (like a backpack or purse), though exact size and weight limits vary meaningfully by airline and region — budget airlines in particular are often strict and charge significant fees for bags that don't precisely meet their stated dimensions, so checking the specific airline's current policy before packing (rather than assuming a generic standard) avoids an unpleasant gate surprise. The TSA liquids rule in the US (and broadly similar rules in many other countries) limits carry-on liquids, gels, and aerosols to containers of 3.4 oz/100 ml or less, all of which must fit together in a single quart-sized clear bag — this applies per container, not total liquid volume, meaning a mostly-empty large bottle still isn't allowed just because the remaining liquid inside is under the limit. Rolling clothes instead of folding them flat is a widely recommended space-saving technique that genuinely works for reducing wrinkles in casual fabrics and maximizing usable bag space, though structured or dressier items (blazers, dress shirts) often still travel better folded, sometimes using a "bundle wrapping" technique that layers garments around a central core to minimize sharp creases. Packing cubes (small fabric zippered pouches that compress and organize clothing into distinct sections within a bag) are popular specifically because they let a traveler compress the same amount of clothing into meaningfully less space while keeping items organized and quick to locate, rather than digging through a single loose jumble. A genuinely useful habit for any trip: packing a small "just in case" kit in the carry-on itself (a change of underwear/basic toiletries, any essential medication, a phone charger) covers the realistic scenario of checked luggage being delayed or lost, which — while relatively uncommon on any single flight — is common enough across a lifetime of travel to be worth the minimal extra carry-on space it costs.`,
    createdAt: Date.now(),
  },
];
