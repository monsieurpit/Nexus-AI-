import { KnowledgeItem } from '../../types';

export const RELATIONSHIPS_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-relationships-dating-basics',
    title: 'Modern Dating Basics: Apps, First Dates, and Reading Interest',
    category: 'Daily Life',
    keywords: [
      'dating apps', 'tinder', 'hinge', 'bumble', 'first date tips', 'how to know if someone likes you',
      'dating basics', 'texting etiquette dating', 'left on read',
    ],
    content: `Dating apps work differently by design: Tinder is swipe-based and leans toward high volume/casual matching, Bumble requires the woman (in heterosexual matches) to message first within 24 hours or the match expires, and Hinge markets itself as "designed to be deleted" with prompt-based profiles meant to encourage more intentional, conversation-starting matches over pure photo-swiping. A first date is generally easier low-pressure when it's short and activity-based (coffee, a walk) rather than a long dinner where there's no natural exit point if it's not clicking — this is common, practical dating advice, not a hard rule. Reading interest through texting is notoriously unreliable — response time, message length, and "double texting" anxiety vary hugely by personality and aren't reliable signals on their own; consistent effort to make plans and follow through on them is a much stronger signal than text-message analysis. "Left on read" (a message shown as read with no reply) causes outsized anxiety relative to how often it just means someone's genuinely busy, not necessarily disinterested — though a consistent pattern over time is more informative than one instance. General, widely-agreed-on healthy-relationship basics: clear communication about expectations, respecting a "no" (to a date, to escalating physical contact, to anything) without pressure, and treating ghosting (ending contact abruptly with no explanation) as a signal to move on rather than something to chase.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-relationships-healthy-communication',
    title: 'Relationship Basics: Communication, Conflict, and Red Flags',
    category: 'Daily Life',
    keywords: [
      'healthy relationship signs', 'relationship red flags', 'how to communicate in a relationship',
      'love languages', 'relationship conflict', 'toxic relationship signs', 'relationship basics',
    ],
    content: `The "love languages" concept (words of affirmation, quality time, physical touch, acts of service, receiving gifts) is a popular, simple framework for the idea that people give and want to receive affection differently — useful as a conversation-starter about what makes a partner feel appreciated, though it's a pop-psychology framework rather than a rigorously validated psychological model. Healthy conflict looks like addressing the specific issue ("I felt hurt when X happened") rather than global character attacks ("you always do this"), and taking breaks when a discussion gets too heated rather than escalating — the goal is resolving the issue, not winning the argument. Widely-recognized relationship red flags include: controlling behavior (dictating who a partner can see or what they can wear), consistent disrespect of stated boundaries, love-bombing (intense, overwhelming affection very early on, sometimes used to fast-track trust before boundaries are established), refusal to ever apologize or take any responsibility, and isolating a partner from friends/family. Jealousy in small doses is a normal human emotion, but controlling behavior justified BY jealousy (checking a partner's phone, dictating their friendships) is a different, more serious thing than the feeling itself. Healthy relationships generally involve both people maintaining individual friendships/interests outside the relationship, not just shared ones — losing your entire separate identity into a relationship is a commonly-cited warning sign, not a sign of how much you care.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-relationships-friendship-basics',
    title: 'Friendship Basics: Making Friends as an Adult and Maintaining Them',
    category: 'Daily Life',
    keywords: [
      'how to make friends as an adult', 'maintaining friendships', 'why is it hard to make friends as an adult',
      'friendship basics', 'losing touch with friends', 'how to be a good friend',
    ],
    content: `Making friends gets structurally harder as an adult mainly because the built-in "proximity + repeated unplanned interaction" that school/college provides (seeing the same people daily, with no extra effort required) disappears — research on friendship formation consistently points to repeated, low-stakes contact over time as the biggest driver of new friendships, which is why recurring activities (a class, a sports league, a regular hobby group) tend to work much better for adult friend-making than one-off events. Maintaining friendships long-term is less about grand gestures and more about consistency — regularly checking in, remembering details from previous conversations, and actually following through on plans. It's normal and not a moral failing for some friendships to naturally fade as life circumstances change (moving cities, different life stages like having kids vs. not) — not every friendship needs to be actively maintained forever, and forcing a fading friendship can be more draining than letting it go with no hard feelings. Being a reliable, low-drama presence (showing up when you say you will, not constantly relying on a friend as your only emotional support) is consistently cited by relationship researchers as one of the biggest factors in long-term friendship satisfaction — friendships with heavy one-directional emotional labor tend not to last.`,
    createdAt: Date.now(),
  },
];
