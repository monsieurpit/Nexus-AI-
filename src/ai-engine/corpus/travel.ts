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
];
