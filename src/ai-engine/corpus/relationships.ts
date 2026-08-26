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
  {
    id: 'kb-relationships-breakups-heartbreak',
    title: 'Breakups and Heartbreak: Why It Hurts and How Recovery Actually Works',
    category: 'Daily Life',
    keywords: [
      'how to get over a breakup', 'heartbreak', 'breakup recovery', 'no contact rule',
      'why do breakups hurt so much', 'getting over an ex', 'breakup basics',
    ],
    content: `Heartbreak isn't just a metaphor — brain-imaging studies have found that the pain of social/romantic rejection activates some of the same neural regions as physical pain, and withdrawal from a relationship shares mechanisms with substance withdrawal (romantic attachment involves dopamine reward circuitry, so losing consistent contact with a partner can genuinely feel like withdrawal). The "no contact rule" (cutting off communication with an ex for a defined period, commonly suggested as roughly 30-90 days though there's no universal number) is widely recommended specifically because continued contact — checking their social media, texting "just to talk" — repeatedly reactivates attachment and grief, slowing the emotional adjustment that distance allows. Grief over a relationship's end shares real structural similarity to other grief (a version of the commonly-cited stages — denial, anger, bargaining, depression, acceptance — though these aren't a strict linear checklist in practice, more a rough description of the range of emotions people cycle through). Common, generally solid recovery advice: maintaining routine and sleep (heartbreak often disrupts both, which then worsens mood further), leaning on friends rather than isolating, resisting the urge to immediately rebound as a distraction (it can delay actually processing what happened), and being wary of idealizing the relationship in memory once the day-to-day frustrations fade from immediate memory. There's no fixed universal timeline for "getting over" a breakup — length and relationship significance both matter, and needing more or less time than someone else isn't a sign anything is wrong with you.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-relationships-attachment-styles',
    title: 'Attachment Styles: Why People Approach Relationships Differently',
    category: 'Daily Life',
    keywords: [
      'attachment styles', 'anxious attachment', 'avoidant attachment', 'secure attachment',
      'fearful avoidant', 'attachment theory relationships', 'attachment style basics',
    ],
    content: `Attachment theory (originally developed from studying infant-caregiver bonds, later extended to adult romantic relationships) describes four broad patterns in how people approach closeness and security in relationships. Secure attachment (roughly the most common pattern in most studied populations) is comfortable with both intimacy and independence, communicates needs fairly directly, and doesn't catastrophize normal relationship friction. Anxious attachment tends to crave closeness and reassurance, can read neutral situations (a slow text reply) as signs of rejection, and may seek frequent validation from a partner. Avoidant attachment tends to value independence strongly, can feel smothered by too much closeness or emotional demand, and may withdraw when a relationship starts feeling too intense or vulnerable. Fearful-avoidant (sometimes called "disorganized") combines aspects of both — wanting closeness but also fearing it, sometimes producing a push-pull pattern. Attachment style is generally understood as shaped by early relationships but NOT fixed for life — it's considered changeable over time, especially through a stable, securely-attached partner or relationship, or through therapy specifically addressing it ("earned security"). It's a useful lens for understanding recurring relationship patterns (why the same conflict keeps happening across different partners, for instance) rather than a rigid label — most people show some mix of tendencies rather than a pure textbook type, and self-assessment quizzes online are popular but not clinically rigorous diagnostic tools.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-relationships-flirting-texting',
    title: 'Flirting and Texting Basics: What Actually Works',
    category: 'Daily Life',
    keywords: [
      'how to flirt', 'texting tips dating', 'how to start a conversation with your crush',
      'flirting basics', 'banter dating', 'how to keep a conversation going texting',
    ],
    content: `Genuine, specific interest reads as far more attractive in practice than generic lines — a message referencing something specific from someone's profile or a shared conversation ("wait, you actually climbed that?") consistently outperforms a copy-paste opener, both because it signals real attention and because it gives the other person an easy, specific thing to respond to. Playful teasing ("banter") works as flirting because it signals comfort and confidence, but the tone matters enormously — it should feel warm and mutual, not like an actual insult, and reading the other person's response (are they teasing back and enjoying it, or going quiet/short) is the real signal of whether it's landing well, not a fixed script. Asking open-ended questions ("what's been the best part of your week") keeps a conversation moving far better than yes/no questions, which tend to produce one-word dead ends. Mirroring effort is a simple, reliable heuristic — if someone's sending short, infrequent replies, matching that energy (rather than sending increasingly long messages into the void) avoids the common trap of one-sided over-investment; conversely, consistently low effort from the other side over time is itself useful information, not something to keep trying to fix through more effort. In-person or voice-call chemistry doesn't always match text chemistry (texting rewards quick wit, in-person conversation rewards different things), which is a big part of why moving from texting to an actual call or date reasonably early is common, practical advice rather than something to over-delay.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-relationships-commitment-milestones',
    title: 'Relationship Milestones: Moving In Together, Meeting Family, and Marriage',
    category: 'Daily Life',
    keywords: [
      'moving in together tips', 'when to meet the parents', 'signs you should get married',
      'relationship milestones', 'living together basics', 'engagement basics',
    ],
    content: `There's no universal "right" timeline for relationship milestones — how fast a couple moves is shaped by age, past relationship experience, living situation, and simple personal preference, and comparing a relationship's pace to someone else's (or to a generic online timeline) is a common but not very useful habit. That said, a few practical, widely-cited signals are worth more than pure time-elapsed: consistently resolving disagreements without it turning into stonewalling or contempt, both people independently wanting the same next step (not one person convincing/pressuring the other), and financial/lifestyle compatibility being discussed openly before combining households, since money is one of the most consistently cited sources of relationship conflict in research on the topic. Moving in together works best with explicit upfront conversations about splitting bills, chores, and personal space/alone-time needs — assuming these will "just work out" is a common source of early friction, since two people's defaults (cleanliness standards, guest habits, morning routines) are rarely identical. Meeting a partner's family is generally a signal of seriousness in most Western dating cultures, though norms vary by culture and family closeness. Engagement/marriage decisions are deeply personal, but relationship researchers consistently flag a few practical conversations worth having explicitly beforehand rather than assuming alignment: whether/when to have kids, where to live long-term, and how finances will be handled jointly vs. separately.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-relationships-nonmonogamy-basics',
    title: 'Non-Monogamy and Open Relationships: The Basics',
    category: 'Daily Life',
    keywords: [
      'open relationship basics', 'ethical non-monogamy', 'polyamory basics', 'what is enm',
      'non monogamy explained', 'polyamory vs open relationship',
    ],
    content: `"Ethical non-monogamy" (ENM) is the umbrella term for relationship structures involving more than one consensual romantic and/or sexual connection, with the "ethical" part specifically emphasizing honesty and consent from everyone involved — as opposed to cheating, which by definition involves deception. Polyamory generally refers to having multiple simultaneous romantic relationships (not just sexual ones), while "open relationship" more often describes a primary couple who've agreed to allow outside sexual connections, though usage of both terms varies a lot between individuals and communities, and there's no single rulebook — every non-monogamous relationship structure is defined by whatever explicit agreements the people involved actually make. Common structures include "primary/secondary" (a hierarchy between a main partnership and other relationships), "kitchen table polyamory" (partners' partners are all comfortable interacting, at least casually), and "solo polyamory" (someone dating multiple people without any one relationship structured as the central "primary" one). Widely-cited practical basics for people newer to non-monogamy: explicit agreements about STI testing/protection given multiple partners, jealousy being treated as a normal emotion to communicate about rather than a sign the structure is automatically wrong, and regular, honest check-ins between partners about boundaries — the same communication skills that matter in monogamous relationships matter here too, just applied across more people. Like any relationship structure, it isn't for everyone and isn't inherently more or less "evolved" than monogamy — the research-backed predictor of relationship satisfaction in either structure is the quality of communication and consent, not the structure itself.`,
    createdAt: Date.now(),
  },
];
