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
  {
    id: 'kb-relationships-long-distance',
    title: 'Long-Distance Relationships: What Actually Makes Them Work',
    category: 'Daily Life',
    keywords: [
      'long distance relationship tips', 'ldr basics', 'how to make long distance work',
      'long distance relationship communication', 'ldr survival tips',
    ],
    content: `Research on long-distance relationships (LDRs) has consistently found a counterintuitive result: couples in LDRs often report similar or even higher relationship satisfaction and communication quality than geographically close couples, largely because distance forces more intentional, explicit communication that close couples can coast without — the "out of sight, out of mind" fear isn't well supported when both people are actually putting in effort. The most consistently cited success factor isn't communication frequency for its own sake but communication quality and reliability — a predictable rhythm of calls/texts that both people can actually count on beats sporadic marathon calls followed by silence. Having a concrete plan for closing the distance (an actual timeline or set of conditions, not just "eventually") is strongly associated with better outcomes than open-ended indefinite distance, since uncertainty about the future is itself a major source of LDR stress. Trust issues in LDRs are usually not about the distance itself but about pre-existing attachment patterns (see attachment styles) surfacing more visibly when reassurance can't come from physical presence — anxious attachment in particular tends to struggle more with LDR uncertainty. Shared virtual activities (watching something together on a call, playing games online, virtual "dates") measurably help maintain a sense of shared life rather than just parallel, disconnected lives. Visits are valuable but the honeymoon-reunion/painful-goodbye cycle can itself become emotionally exhausting if the couple doesn't also invest in day-to-day connection between visits.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-relationships-conflict-repair',
    title: 'Conflict Repair: Effective Apologies and Rebuilding After a Fight',
    category: 'Daily Life',
    keywords: [
      'how to apologize properly', 'effective apology', 'repair after a fight', 'relationship repair attempts',
      'how to make up after an argument', 'gottman repair',
    ],
    content: `Relationship researcher John Gottman's widely-cited work found that the presence of conflict itself isn't what predicts a relationship's success or failure — nearly all long-term couples fight — what matters far more is whether "repair attempts" (any small gesture, joke, or statement aimed at de-escalating tension during or after conflict) are made and, critically, whether the other partner actually accepts them rather than rebuffing them. A genuinely effective apology has a few well-supported components beyond just saying "sorry": specifically naming what was done wrong (not a vague "sorry you're upset," which shifts blame onto the other person's reaction rather than owning the action), acknowledging the actual impact on the other person, and a concrete statement of how it will be different going forward — an apology with no change in behavior tends to erode trust further over repeated instances rather than repair it. Gottman's research also identified four communication patterns ("the Four Horsemen") that are unusually strong predictors of relationship breakdown: criticism (attacking character rather than a specific behavior), contempt (mockery, eye-rolling, sarcasm meant to belittle — considered the single most damaging of the four), defensiveness (deflecting instead of hearing the complaint), and stonewalling (shutting down and withdrawing from the conversation entirely). Taking a deliberate time-out during a heated argument (with an explicit agreement to return to the conversation, not just walking away) is well-supported for preventing escalation, since physiological arousal during a fight measurably impairs the ability to communicate calmly or listen well until it settles, commonly taking 20+ minutes.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-relationships-boundaries-basics',
    title: 'Setting Boundaries: The Basics of a Skill Most People Never Learn',
    category: 'Daily Life',
    keywords: [
      'how to set boundaries', 'boundaries in relationships', 'what are healthy boundaries',
      'boundary setting basics', 'saying no without guilt',
    ],
    content: `A boundary, in the relationship-psychology sense, is a statement of what you will or won't accept, or what you will or won't do in response to something — it's about your own actions, not a rule you're imposing on someone else's behavior; "I'll leave the room if yelling starts" is a boundary, while "you're not allowed to raise your voice" is a demand on someone else's behavior, a subtle but important distinction commonly taught in therapy contexts. Boundaries can be physical (personal space, touch), emotional (not being someone's only emotional outlet, not accepting insults), time-based (not answering work messages after a certain hour), or material (money, possessions) — the common thread is they protect a person's wellbeing rather than control another person's. A frequently cited reason people struggle to set boundaries is conflating them with being unkind or selfish — but a boundary stated calmly and directly is generally considered healthier long-term than silently resenting a repeated violation until it explodes into a bigger conflict. Effective boundary-setting is typically described as clear, calm, and stated in advance where possible ("I need alone time after work before talking about the day") rather than only as an angry reaction in the moment. A partner or friend who consistently reacts to a reasonable boundary with anger, guilt-tripping, or ignoring it entirely is a commonly cited red flag, since respecting a boundary doesn't require agreeing with or liking it — it just requires not violating it.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-relationships-infidelity-trust-rebuilding',
    title: 'Infidelity and Rebuilding Trust: What the Research Actually Shows',
    category: 'Daily Life',
    keywords: [
      'rebuilding trust after cheating', 'can a relationship survive infidelity', 'infidelity recovery',
      'trust after betrayal', 'cheating recovery basics',
    ],
    content: `Infidelity is generally defined by the violation of an explicit or implicit agreement about exclusivity between partners, rather than by a specific act alone — which is part of why some couples consider emotional affairs (deep secretive emotional intimacy with someone outside the relationship, without physical involvement) just as damaging as a physical one, since the core injury researchers point to is usually the deception and broken trust itself, not only the specific act. Research on relationships surviving infidelity finds it's genuinely possible but not guaranteed, and outcomes depend heavily on a few consistent factors: full honesty going forward (continued deception discovered later is far more damaging than the original act), the unfaithful partner taking full ownership without minimizing or blaming the other partner for "driving them to it," and both partners being willing to examine what happened in the relationship's dynamics beforehand — not to excuse the infidelity, but because rebuilding requires understanding root causes, not just the incident. Trust, once broken, is well-documented to rebuild slowly and non-linearly — a hurt partner needing reassurance, evidence, or time well beyond what feels proportionate to the unfaithful partner is a normal, expected part of the process, not being "unable to move on." Many couples benefit substantially from couples therapy specifically trained in infidelity recovery, since well-meaning attempts to just "get past it" without professional structure commonly stall or relapse into renewed conflict. Whether to stay or leave after infidelity is a deeply personal decision with no universally "correct" answer — research doesn't support a blanket claim that staying is either always healthier or always a mistake.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-relationships-codependency-basics',
    title: 'Codependency vs. Healthy Interdependence',
    category: 'Daily Life',
    keywords: [
      'codependency signs', 'codependent relationship', 'healthy interdependence',
      'codependency vs love', 'signs of codependency',
    ],
    content: `Codependency describes a relationship pattern where one or both people's sense of identity, self-worth, or emotional stability becomes excessively dependent on the relationship or on managing/fixing the other person — commonly (though not exclusively) discussed in the context of a partner with addiction or significant dysfunction, where the codependent partner's life increasingly organizes around monitoring, enabling, or rescuing them. Warning signs commonly cited: difficulty identifying your own needs or feelings separately from your partner's, excessive people-pleasing driven by fear of conflict or abandonment, a compulsion to "fix" a partner's problems even when not asked, and a shrinking sense of individual identity/interests outside the relationship. This is distinct from healthy interdependence, which is the normal, well-supported degree of mutual reliance in any close relationship — needing and relying on a partner emotionally isn't itself unhealthy; the distinguishing factor researchers point to is whether both people maintain a stable individual identity and can tolerate the relationship not being the sole source of their self-worth. A useful rough distinction sometimes used in therapy: interdependence is "I want you," codependency drifts toward "I need you in order to be okay," where the anxiety of losing the relationship starts driving behavior more than genuine desire does. Codependent patterns often trace back to early caregiving dynamics (a parent who was inconsistently available, or a child who took on a caretaking role early) and are commonly addressed in individual therapy, not solely couples therapy, since the pattern usually shows up across multiple relationships, not just the current one.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-relationships-long-term-maintenance',
    title: 'Long-Term Relationship Maintenance: Avoiding the Slow Fade',
    category: 'Daily Life',
    keywords: [
      'keeping a relationship strong long term', 'relationship maintenance', 'avoiding complacency in relationships',
      'long term relationship tips', 'how to keep a spark alive',
    ],
    content: `A well-documented pattern in long-term relationships is the gradual replacement of novelty and active effort with routine — not a dramatic rupture, but a slow reduction in the small intentional gestures (genuine questions about each other's day, physical affection, expressed appreciation) that characterized the relationship early on, sometimes called relationship "languishing" or complacency. Relationship researchers consistently find that expressed gratitude and appreciation (explicitly saying what you value about a partner, not just assuming they know) has an outsized, ongoing effect on long-term satisfaction relative to how little effort it takes — its absence over time is one of the more reliable predictors of quiet dissatisfaction. Shared novel experiences (trying something genuinely new together, not just repeating the same routine activities) are linked in relationship research to renewed feelings of excitement and closeness, tied to the same psychological mechanism that makes early relationships feel exciting — arousal and novelty are associated with attraction, and long-term couples who deliberately keep introducing new shared experiences report higher satisfaction than those who let routine fully take over. Regular, low-stakes check-ins about the relationship itself (not only logistics, but "how are we doing") prevent small unaddressed frustrations from accumulating into a larger rupture — many long-term breakups are described in retrospect not as one big event but as a long accumulation of small unspoken resentments. Physical affection independent of sex (holding hands, hugging, casual touch) is separately linked to relationship satisfaction and is commonly one of the first things to quietly disappear as a relationship settles into long-term routine, worth protecting deliberately rather than assuming it'll persist on its own.`,
    createdAt: Date.now(),
  },
];
