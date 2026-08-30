import { KnowledgeItem } from '../../types';

// A matter-of-fact glossary of crude/informal slang for body parts and sex-adjacent topics,
// written the same way src/ai-engine/corpus/slang.ts and sexualHealth.ts handle these subjects:
// definitions and etymology so the bot correctly UNDERSTANDS what users type, never explicit
// content, never slurs. See the hard exclusion rule in the task this file was created for.
export const CRUDE_SLANG_GLOSSARY_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-crude-slang-general-body-part-terms',
    title: 'Informal/Crude Slang for Body Parts: A Glossary',
    category: 'Slang',
    keywords: [
      'dih meaning', 'dick slang', 'thicc meaning', 'bussy meaning', 'ass slang terms', 'booty meaning',
      'chest slang terms', 'informal body part slang', 'crude body slang glossary',
    ],
    content: `A reference glossary of common informal/crude slang terms for body parts, used constantly in casual online chat, memes, and jokes — included here so the bot can correctly recognize what a term refers to, not as explicit content. "Dih" is a stylized, meme-ified spelling of "dick" (the penis), popularized by TikTok/Discord voice-changer meme audio and used as a joking alternate spelling rather than a distinct word. "Thicc" (spelled with a doubled c to distinguish it from the plain adjective "thick") describes a curvy body shape, usually emphasizing the hips, thighs, or butt — used as a compliment in both sincere and joking registers. "Bussy" is internet slang, popularized by gaming and Discord meme culture, most commonly used as an exaggerated, joking term referencing a buttocks/anus, frequently used in absurdist non-literal jokes and copypasta rather than literal description — its usage online is overwhelmingly comedic/meme-based rather than descriptive. "Booty" and "ass" are common informal terms for the buttocks, used across nearly all registers of casual speech from mild to crude depending on context. "Chest" slang ("chesty," or crude terms for breasts) shows up constantly in body-image and attraction-related banter; "abs" and "six pack" refer to visible abdominal muscle definition, a common fitness/attraction reference. These terms are near-ubiquitous in casual gaming voice chat, meme captions, and Discord banter, and are typically used for humor, exaggeration, or casual body-positive/attraction commentary rather than literal explicit description.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-flirting-attraction-terms',
    title: 'Flirting & Attraction Slang: Rizz, Smash, Thirst, DTF',
    category: 'Slang',
    keywords: [
      'rizz meaning flirting', 'smash meaning slang', 'thirsty meaning slang', 'dtf meaning', 'simp meaning',
      'freak meaning slang', 'down bad meaning', 'flirting slang glossary',
    ],
    content: `A glossary of common flirting/attraction slang used across Discord, TikTok, and texting. "Rizz" (short for charisma) refers to skill at flirting or attracting someone — "he's got rizz" means he's smooth and effective at charming people he's interested in; "unspoken rizz" jokingly refers to attracting someone without needing to say anything at all. "Smash" is casual slang meaning to have sex with someone, generally used bluntly/crudely ("would you smash?") rather than romantically — "smash or pass" is a common casual game format asking whether someone finds a person attractive enough to be interested. "Thirsty" describes someone who is obviously, sometimes desperately, seeking sexual or romantic attention — "thirst trap" is a photo or video (usually on social media) specifically posted to attract that kind of attention through a revealing or suggestive pose. DTF is a blunt, crude abbreviation meaning "down to f***" — asking or stating openness to a casual sexual encounter, most common on dating apps and in blunt casual texting. "Simp" describes someone doing excessive one-sided favors or showing excessive devotion toward someone they're attracted to, typically without reciprocation — used as a lighthearted insult. "Freak" (as in "she's a freak"/"he's a freak") is crude slang implying someone is very sexually adventurous or enthusiastic — used both as a compliment and a tease depending on context. "Down bad" describes someone embarrassingly desperate or overly invested in pursuing someone they're attracted to.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-goon-edging-terms',
    title: 'Crude Slang: Goon/Gooning and Related Extended-Arousal Terms',
    category: 'Slang',
    keywords: [
      'gooning meaning', 'goon session meaning', 'edging meaning slang', 'goon cave meaning', 'nut meaning slang',
      'busting meaning slang', 'what does gooning mean',
    ],
    content: `A glossary entry for crude arousal-related internet slang, included so the bot recognizes these terms rather than misreading them, written descriptively rather than explicitly. "Gooning" is slang, common in meme and adult-content-adjacent online spaces, describing an extended, low-focus, trance-like state of arousal or masturbation — the term likely derives from older slang for a dazed, slack-jawed ("goony") expression, which the newer usage plays on. It's used both descriptively and as an exaggerated joke or insult about someone seeming checked-out or unproductive ("he's been gooning all day"), and a "goon cave" jokingly refers to a private space associated with the activity. "Edging" is a real, commonly discussed sexual technique referring to deliberately approaching and then backing off from orgasm repeatedly to prolong arousal — used both in genuine sexual-wellness discussion and as internet slang/joke material. "Nut" and "busting" are crude slang verbs for reaching orgasm/ejaculating, extremely common in casual/crude online joking, meme captions, and blunt chat, generally used in exaggerated or comedic rather than literal-explicit contexts (e.g. "nut tax," a joke term for something taking a portion of enjoyment or resources, riffing on "fanum tax"). These terms appear constantly in Discord meme culture and crude joke exchanges without necessarily indicating any literal explicit conversation is happening — recognizing them correctly is about comprehension, not generation of explicit content.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-insult-terms-nonhateful',
    title: 'Crude But Non-Hateful Insult Slang: Simp, Clown, L, Ratio, Cooked',
    category: 'Slang',
    keywords: [
      'simp insult meaning', 'clown meaning insult', 'take the l meaning', 'ratio meaning insult', 'cooked insult meaning',
      'dickrider meaning', 'glazer meaning', 'crude insult slang glossary',
    ],
    content: `A glossary of common crude-but-not-hateful insult slang used in gaming/Discord banter — these are informal, playground-style put-downs, distinct from slurs or genuinely hateful language. "Simp" (see also the flirting slang entry) is used as a mild insult for excessive, one-sided devotion to someone. "Clown" or "clowning" describes someone acting foolish or embarrassing themselves, generally used lightly among friends ("stop clowning yourself"). "Take the L" means accepting a loss or a mistake gracefully — "L" is shorthand for "loss," with "W" as its opposite (win). "Ratio'd" (see also the internet-economy slang entry) implies someone's post/comment was publicly unpopular. "Cooked" implies someone is in serious trouble, doomed, or about to lose. "Dickrider" and "glazer"/"glazing" are crude terms for someone excessively, often embarrassingly, praising or defending another person — implying the praise is over-the-top or insincere rather than genuine support. "L take" describes an opinion widely considered bad or wrong. "Mald" (a blend of "mad" and "bald," originating in competitive gaming communities) describes someone visibly seething with anger, usually after losing. None of these terms target a protected characteristic (race, ethnicity, sexual orientation, disability) — they're general-purpose, competitive-banter insults about behavior, performance, or attitude, common across gaming Discords and comment sections.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-body-attractiveness-terms',
    title: 'Crude Body/Attractiveness Slang: Mog, Looksmaxxing, Gyat, Snacc',
    category: 'Slang',
    keywords: [
      'mog meaning slang', 'looksmaxxing meaning', 'gyat meaning slang', 'snacc meaning', 'baddie meaning',
      'zaddy meaning', 'hunk meaning', 'attractiveness slang glossary',
    ],
    content: `A glossary of crude/casual attractiveness slang common in meme captions and Discord banter about appearance. "Mog"/"mogging" means visibly outshining someone else in attractiveness or presence when compared side by side. "Looksmaxxing" refers to attempts to maximize physical attractiveness — ranging from legitimate grooming/fitness/skincare advice to pseudo-scientific or extreme methods, and the term is used both sincerely and mockingly. "Gyat" (from "goddamn") is an exclamation reacting to someone's attractive physique, most commonly used crudely about someone's butt. "Snacc" (deliberately misspelled with a double c) is slang for someone considered very attractive — an evolution of calling an attractive person a "snack." "Baddie" describes a woman with a bold, glamorous, and confident look/style (makeup, fashion, attitude), a term popularized heavily through Instagram/TikTok beauty and fashion culture. "Zaddy" is slang for an attractive, stylish, usually somewhat older or more mature-presenting man — playing off "daddy" but implying more style/charm than the more purely age-based original term. "Hunk" is an older but still-used term for a muscular, conventionally attractive man. These terms are used constantly and casually in appearance-focused banter, selfie/fit-check threads, and reaction comments across Discord and social media, generally without any explicit content attached.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-porn-adjacent-terms',
    title: 'Crude Slang Around Adult Content: Thirst Trap, NSFW, Onlyfans References',
    category: 'Slang',
    keywords: [
      'nsfw meaning', 'thirst trap meaning', 'onlyfans slang meaning', 'sfw meaning', 'spicy content meaning',
      'lewd meaning slang', 'nsfw channel discord',
    ],
    content: `A glossary of common terms around adult/sexual content used in casual and Discord conversation, included for comprehension purposes. NSFW means "not safe for work" — content (images, videos, jokes, or full channels) that's sexual, violent, or otherwise inappropriate to view in a public/professional setting; Discord servers commonly mark specific channels NSFW, which applies an age gate and content warning. SFW ("safe for work") is the inverse, describing content fine to view anywhere. "Thirst trap" (see also the flirting slang entry) is a photo/video specifically posted to attract sexual/romantic attention through a revealing or suggestive pose. "Spicy" or "spicy content" is a euphemistic, joking way to refer to sexual/suggestive content without stating it explicitly. "Lewd" is a more old-fashioned but still-used term for sexually explicit content, common in anime/manga fan community slang specifically. "OnlyFans" is a subscription content platform associated heavily (though not exclusively) with adult content creators, and "having an OF" or referencing someone's "Onlyfans" has become common shorthand in casual conversation for someone selling adult content online, whether accurate or used as a joke/tease about someone. Recognizing these terms helps the bot correctly interpret casual references to content ratings and context without needing to generate or describe explicit material itself.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-menstrual-bodily-euphemisms',
    title: 'Casual Euphemisms for Bodily Functions and Menstruation',
    category: 'Slang',
    keywords: [
      'shark week meaning', 'aunt flo meaning', 'on the rag meaning', 'code red meaning slang', 'nature calls meaning',
      'take a leak meaning', 'bodily function euphemisms',
    ],
    content: `A glossary of common casual/crude euphemisms for bodily functions, used constantly in everyday informal speech and texting. For menstruation: "shark week," "aunt flo," "that time of the month," "on the rag" (an older, somewhat more crude/dated phrase), and "code red" are all common casual euphemisms referring to a menstrual period, generally used lightheartedly among friends rather than clinically. "Nature calls" or "gotta go" euphemistically refer to needing to use the bathroom, as does the cruder "take a leak" (urinate) or "drop a deuce"/"number two" (defecate) — these are extremely common casual/crude terms used constantly in everyday conversation and gaming voice chat without much sensitivity attached, generally just informal alternatives to clinical terms. "Morning breath" refers to bad breath upon waking. Understanding these lighthearted, extremely common euphemisms helps correctly interpret a large amount of ordinary casual chat that would otherwise seem confusing if only clinical vocabulary were recognized.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-relationship-crude-terms',
    title: 'Crude Relationship & Hookup Slang: Sneaky Link, Body Count, Ghosting',
    category: 'Slang',
    keywords: [
      'sneaky link meaning', 'body count meaning slang', 'ghosting meaning', 'hit it and quit it meaning',
      'situationship meaning', 'netflix and chill meaning', 'hookup slang glossary',
    ],
    content: `A glossary of crude/casual relationship and hookup slang common in texting and Discord banter. A "sneaky link" is a secret, usually casual, hookup/relationship kept hidden from friends, family, or a wider social circle — implying discretion is part of the arrangement. "Body count" is crude slang for the number of sexual partners someone has had — a frequently debated topic online regarding whether it's a reasonable thing to ask about or judge someone by, with most modern discourse pushing back on it as a meaningful metric of anything. "Ghosting" means abruptly cutting off all communication with someone (typically a romantic interest) without explanation, rather than having a conversation about ending things — one of the most commonly cited frustrations in modern dating-app culture. "Hit it and quit it" is a crude, dismissive phrase describing a purely physical one-time or short-lived sexual encounter with no interest in anything further. "Netflix and chill" is a well-known euphemism where an invitation to watch something together is actually (or jokingly implied to be) an invitation for a hookup rather than literally just watching a show. A "situationship" (see also the texting/dating abbreviations entry) is an undefined, ongoing romantic/physical relationship without a clear label or commitment. These terms are extremely common in casual conversation about dating and relationships across group chats and Discord servers, generally discussed candidly rather than explicitly.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-masculinity-terms',
    title: 'Crude Masculinity/Femininity Slang: Alpha, Beta, Girlboss, Pick Me',
    category: 'Slang',
    keywords: [
      'alpha male meaning slang', 'beta male meaning', 'girlboss meaning', 'pick me meaning', 'himbo meaning',
      'e-girl e-boy meaning', 'soft launch hard launch meaning',
    ],
    content: `A glossary of crude/casual gender-presentation and dating-persona slang common online. "Alpha male" and "beta male" are internet pseudo-sociology terms (borrowed loosely and inaccurately from outdated wolf-pack research) describing an assumed hierarchy of masculine social dominance — used both sincerely by some online communities and mockingly/ironically by others; "sigma male" (see the brainrot entry) was coined as a joking addition to this hierarchy. "Pick me" (as in "pick me girl/boy") describes someone perceived as seeking approval, especially from the opposite sex, by putting down their own gender or exaggerating how "different" or "low-maintenance" they are compared to others — used as a callout/insult for perceived attention-seeking behavior. "Girlboss" originally described an ambitious, career-focused woman, but is now used equally often ironically/sarcastically, especially mocking corporate feminism that doesn't address deeper structural issues. "Himbo" describes an attractive man who is sweet, good-natured, and not particularly intellectual — used affectionately, not as an insult. "E-girl" and "e-boy" describe a specific internet-native alternative aesthetic/persona (distinctive makeup, styling, edgy-but-soft internet-culture presentation) popularized on TikTok and via influencer culture. "Soft launch" and "hard launch" refer to how someone reveals a new relationship on social media — a soft launch is a vague, partial hint (a photo cropped to hide the partner's face), while a hard launch is a clear, explicit relationship announcement.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-general-crude-exclamations',
    title: 'Crude General-Purpose Exclamations and Intensifiers',
    category: 'Slang',
    keywords: [
      'af meaning', 'as hell meaning intensifier', 'hell yeah meaning', 'damn meaning intensifier', 'bruh moment meaning',
      'crude exclamations glossary', 'mild swear intensifiers',
    ],
    content: `A glossary of crude-but-mild general-purpose intensifiers and exclamations used constantly in casual speech and texting. "AF" (short for "as f***") is used as an intensifier suffix on almost any adjective ("tired af," "funny af") — extremely common and generally treated as a mild, casual intensifier rather than a genuinely crude statement, similar to how "as hell" functions ("tired as hell"). "Hell yeah" and "hell no" are emphatic, casual versions of "yes"/"no." "Damn" is used both as a mild exclamation of surprise and as an intensifier ("that's damn good"). "Bruh moment" describes an embarrassing or facepalm-worthy situation. "For f***'s sake" (often abbreviated FFS) expresses frustration or exasperation. These mild-crude intensifiers are near-ubiquitous across nearly all casual online speech and gaming voice chat, generally not considered offensive in casual contexts (distinct from genuinely hateful or targeted language), and recognizing them helps parse tone and emphasis in typical Discord/gaming conversation correctly.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-body-hair-grooming-terms',
    title: 'Crude/Casual Grooming and Body-Hair Slang',
    category: 'Slang',
    keywords: [
      'manscaping meaning', 'bush meaning slang', 'yeezy meaning grooming', 'hygiene slang terms',
      'grooming slang glossary', 'stubble meaning',
    ],
    content: `A glossary of casual/crude grooming-related slang used in everyday conversation. "Manscaping" is a widely used, semi-jokey term for a man trimming or removing body hair for grooming purposes, a blend of "man" and "landscaping." "Bush" is crude slang for pubic hair, used casually and matter-of-factly in body-grooming discussions online without much shock value attached in casual contexts. "Stubble" refers to short, regrown facial hair after shaving, a completely standard, non-crude grooming term. "Glow up" describes a significant, often dramatic positive transformation in someone's appearance/style/confidence over time — extremely common as a before/after social media content format, not limited to grooming specifically but frequently used in that context. Recognizing this vocabulary helps interpret ordinary lifestyle/grooming conversation correctly.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-hookup-app-terms',
    title: 'Dating & Hookup App Slang: Ghosted, Breadcrumbing, Left On Read',
    category: 'Slang',
    keywords: [
      'breadcrumbing meaning', 'love bombing meaning', 'benching meaning dating', 'orbiting meaning dating',
      'dating app slang glossary', 'situationship red flags meaning',
    ],
    content: `A glossary of modern dating/hookup app slang describing common relationship-avoidance patterns. "Breadcrumbing" describes someone giving just enough intermittent attention (a text here, a like there) to keep another person interested without any real intention of committing to a relationship. "Love bombing" describes an intense, overwhelming display of affection and attention early in a relationship, often used as a manipulation tactic to quickly build attachment and trust before behavior changes — a term that started in psychology/abuse-pattern discussion and spread into general dating vocabulary. "Benching" means keeping someone as a backup romantic option without fully committing, similar to breadcrumbing but implying the person is being deliberately kept "on the bench" in case better options don't work out. "Orbiting" describes someone who has stopped directly messaging a person but continues passively watching/engaging with their social media (viewing stories, liking posts) without real contact — an update on "ghosting" reflecting how visible online activity is now. "Left on read" (see also the texting entry) describes a message seen but deliberately not replied to. These terms are extremely common in dating-app-focused conversation across Discord relationship-advice channels and social media.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-jealousy-possessive-terms',
    title: 'Crude Jealousy/Possessiveness Slang: Beta, Cuck, Side Piece',
    category: 'Slang',
    keywords: [
      'side piece meaning', 'main squeeze meaning', 'jealous type meaning', 'possessive partner slang',
      'crude relationship slang glossary', 'toxic ex meaning',
    ],
    content: `A glossary of crude relationship/jealousy slang. "Side piece" is a crude, blunt term for a secondary romantic/sexual partner someone is seeing outside their primary relationship without their main partner's knowledge — implies infidelity and is generally used disapprovingly or as gossip description rather than as a neutral term. "Main squeeze" is an older but still-used affectionate slang term for a primary romantic partner. "Toxic" (as in a "toxic relationship" or "toxic ex") describes a relationship pattern involving manipulation, control, excessive jealousy, or other consistently harmful dynamics — a heavily used, sometimes overused term in modern relationship-discourse online, occasionally applied loosely to any difficult relationship rather than strictly a genuinely abusive one. "Green with envy" and just calling someone "jelly" (jealous) are common casual ways of describing envy over someone else's relationship, possessions, or success. Recognizing this vocabulary helps interpret casual relationship gossip/drama conversations in Discord and group chats correctly, without the bot needing to make judgments about specific real situations described this way.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-attraction-compliment-terms-2',
    title: 'More Crude Compliment Slang: Snack, Bad, Fine, Ten',
    category: 'Slang',
    keywords: [
      'bad meaning attractive slang', 'fine meaning attractive slang', 'snack meaning attractive', 'ten out of ten meaning',
      'crude compliment slang glossary', 'stacked meaning slang',
    ],
    content: `A glossary of crude/casual attractiveness-rating slang used across texting and social media comments. "Bad" (in AAVE-origin slang, distinct from its literal negative meaning) means very attractive — "she's bad" is a compliment, understood entirely from context/tone rather than literal meaning. "Fine" works similarly, an older but still-common term meaning attractive. "Snack" describes someone considered very attractive, treating them (playfully, not literally objectifying in intent) as something desirable to look at. Rating someone "a ten" (out of ten) or "a solid eight" is a common, blunt shorthand for how attractive someone is considered, used constantly in casual conversation about crushes, celebrities, or people in photos. "Stacked" is crude slang describing someone (usually a woman) with a curvy, well-proportioned figure. These compliment terms are used constantly and casually across group chats and Discord servers when discussing attraction, generally understood as lighthearted rather than crude in intent even when the vocabulary itself is informal.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-nervous-embarrassed-terms',
    title: 'Crude Slang for Nervousness/Embarrassment: Shook, Pressed, Salty',
    category: 'Slang',
    keywords: [
      'shook meaning', 'pressed meaning slang', 'salty meaning slang', 'triggered meaning slang', 'big mad meaning',
      'emotional reaction slang glossary',
    ],
    content: `A glossary of common slang describing emotional reactions, some of which have crude-adjacent intensity but aren't inherently vulgar. "Shook" describes being visibly surprised, shaken, or unsettled by something. "Pressed" means being visibly annoyed, upset, or bothered by something, often implying more than the situation warrants ("why are you so pressed about this"). "Salty" describes being irritated or bitter, especially after losing or being rejected. "Triggered" (originally clinical/trauma-related terminology, now widely used more loosely online, sometimes controversially) describes a strong negative emotional reaction to something — used both in its more serious original sense and, much more commonly online, as an exaggerated/joking way to describe mild annoyance. "Big mad" is an intensified, deliberately informal way of saying someone is extremely angry, used both sincerely and mockingly. These terms are used constantly in casual conversation and Discord banter to describe someone's visible emotional reaction, generally without deep offense intended even when the tone is teasing.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-testosterone-masculinity-humor',
    title: 'Crude Masculinity-Humor Slang: Alpha Grindset, Cooked (Romantically), Simp Nation',
    category: 'Slang',
    keywords: [
      'alpha grindset meaning', 'simp nation meaning', 'romantically cooked meaning', 'ls meaning slang',
      'masculinity humor slang glossary', 'chad meaning',
    ],
    content: `A glossary of crude/joking masculinity-humor slang, generally used ironically or self-deprecatingly rather than as genuine ideology in most casual Discord contexts. "Chad" describes an idealized, hyper-confident, physically imposing man, originally 4chan slang contrasted against a "virgin" stereotype in an old meme format, now used loosely as a general compliment or joking exaggerated praise ("absolute chad move"). "Alpha grindset" (see also the brainrot sigma entry) mocks hustle-culture self-improvement content, often through ironic captions about extreme daily routines. "LS" (short for "loss," referencing a specific viral surreal 4-panel comic meme that became a running joke through repeated distorted retellings) is internet slang used to react to unfortunate or ironic outcomes, though its exact usage/meaning has become deliberately murky as an in-joke about how confusing the original meme format is. "Simp nation" is a joking collective term poking fun at men perceived as excessively devoted to someone they're attracted to, used the same way as "simp" but framed as a whole community/in-group. These terms are used constantly in gaming Discord banter, generally understood as ironic exaggeration rather than sincere ideology.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-anatomy-euphemism-terms',
    title: 'Casual Anatomy Euphemisms Used in Comedy/Memes',
    category: 'Slang',
    keywords: [
      'family jewels meaning', 'boys meaning slang', 'goods meaning slang', 'package meaning slang',
      'anatomy euphemism glossary', 'privates meaning',
    ],
    content: `A reference glossary of common comedic/casual euphemisms for genitals used constantly in everyday joking speech, included for comprehension rather than explicit description. "Privates" or "private parts" is a mild, family-friendly general term. "Package" and "goods" are casual, joking euphemisms for male genitals, generally used in a lighthearted or complimentary context ("he's got a nice package" as a crude compliment) rather than clinical description. "Family jewels" and "the boys" are joking, euphemistic terms specifically for testicles, almost always used comedically (e.g., describing an injury) rather than in a genuinely explicit context — "kicked in the boys" is a common, very mild way to describe that specific type of injury without being graphic. These terms are used constantly in everyday joking conversation and comedy, generally carrying low shock value in casual contexts, and recognizing them helps correctly interpret ordinary joking banter rather than assuming genuinely explicit intent.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-alcohol-party-terms',
    title: 'Crude Party/Drinking Slang: Turnt, Wasted, Rager, Pregame',
    category: 'Slang',
    keywords: [
      'turnt meaning', 'wasted meaning slang', 'rager meaning party', 'pregame meaning party', 'party slang glossary',
      'blackout meaning drinking',
    ],
    content: `A glossary of party/drinking slang common in casual conversation about social events, included for comprehension. "Turnt" (or "turnt up") describes being very excited, energetic, or intoxicated at a party. "Wasted," "hammered," and "smashed" are all casual, crude terms meaning very drunk. "Rager" describes a particularly wild, high-energy party. "Pregame" (or "preloading" in some regions) means drinking before heading out to a bigger event, often to save money or get a head start on the night. "Blackout" (as in "blacked out") describes drinking to the point of having no memory of events that happened, a genuinely concerning level of intoxication worth taking seriously as a safety issue rather than purely a punchline, even though it's often referenced casually/jokingly in party stories. These terms are extremely common in casual conversation among young adults discussing social plans and past events, generally used descriptively rather than as an endorsement of excessive drinking.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-flirty-compliment-emoji-terms',
    title: 'Flirty Emoji/Symbol Slang: Eggplant, Peach, Water Drops',
    category: 'Slang',
    keywords: [
      'eggplant emoji meaning', 'peach emoji meaning', 'water drops emoji meaning', 'flirty emoji slang',
      'emoji innuendo glossary', 'fire emoji meaning flirty',
    ],
    content: `A glossary of emoji used as crude/flirty innuendo in casual texting, included for comprehension purposes. The eggplant emoji (🍆) is very widely used as a crude stand-in for a penis, due to its shape. The peach emoji (🍑) is similarly used as a crude stand-in for buttocks. Water droplet emoji (💦) are used to imply arousal or a suggestive context, often paired with the above. The fire emoji (🔥) is used far more broadly than just flirtation (general excitement, "this is fire" meaning excellent) but is also commonly used flirtatiously to compliment someone's attractiveness in a photo. Recognizing this emoji-based innuendo shorthand helps correctly interpret flirty or crude subtext in casual texting/DMs without the bot needing to generate or elaborate on it explicitly — understanding context is the goal, not producing similar content.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-body-count-adjacent-terms',
    title: 'More Crude Dating/Body Terms: High Maintenance, Chad Rizz, Cuffing Season',
    category: 'Slang',
    keywords: [
      'cuffing season meaning', 'high maintenance meaning', 'low maintenance meaning', 'summer fling meaning',
      'dating slang glossary 2', 'rebound meaning dating',
    ],
    content: `A glossary of more casual dating/relationship slang common in texting and Discord banter. "Cuffing season" refers to the fall/winter months, when colder weather and holiday season are jokingly said to drive people toward seeking a relationship for company/warmth rather than staying single — a well-known, widely referenced seasonal dating meme. "High maintenance" describes someone perceived as needing a lot of effort, attention, or resources to keep happy in a relationship, generally used critically; "low maintenance" is the positive-framed opposite. "Summer fling" describes a short-term, casual romantic relationship understood by both people to be temporary, often tied to a specific season or circumstance (like a vacation). "Rebound" describes a relationship entered into soon after a breakup, often to help cope with or distract from the previous relationship's end, generally considered less likely to be a lasting, well-considered match. These terms are constantly used in casual conversation about dating patterns and relationship stages across group chats and Discord relationship-advice channels.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-body-positivity-adjacent-terms',
    title: 'Body-Positivity Adjacent Crude Slang: Curvy, Slim Thick, Dad Bod',
    category: 'Slang',
    keywords: [
      'slim thick meaning', 'dad bod meaning', 'curvy meaning slang', 'body positivity slang glossary',
      'skinny legend meaning', 'mom bod meaning',
    ],
    content: `A glossary of body-shape descriptive slang used casually and generally positively in body-image and attraction conversation. "Slim thick" describes a figure combining a slim waist with a curvier lower body (hips/thighs/butt), a specific body-shape descriptor that became especially prominent through social media beauty standards discourse. "Dad bod" describes an average, softer/less toned male physique, generally used affectionately/positively rather than critically — a body-positivity-adjacent term specifically pushing back against unrealistic hyper-fit male beauty standards. "Mom bod" is a parallel, similarly affectionate term for a mother's post-pregnancy body shape. "Curvy" broadly and generally positively describes a fuller figure. "Skinny legend" is an affectionate, joking compliment for a slim person, often used self-deprecatingly. These terms are generally used within body-positive, affirming contexts online, though beauty-standard discourse around any of these terms (which shapes are praised versus criticized, and why) is itself a common, sometimes contentious topic of online discussion.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-crude-slang-innuendo-double-meaning-terms',
    title: 'Crude Double-Meaning Slang: That\'s What She Said, Sausage Fest',
    category: 'Slang',
    keywords: [
      'thats what she said meaning', 'sausage fest meaning', 'no homo meaning', 'not gonna lie thats crazy meaning',
      'double meaning innuendo slang glossary', 'awkward meaning slang',
    ],
    content: `A glossary of crude double-meaning/innuendo phrases common in casual joking conversation. "That's what she said" is a stock joke response added after an innocent statement that could also be read as a sexual innuendo, a widely recognized and extremely common comedic format popularized heavily by the sitcom The Office. "Sausage fest" is crude slang describing a gathering or group made up overwhelmingly or entirely of men. "No homo" is a phrase (increasingly viewed as dated and somewhat outdated/cringe by younger internet users, and worth understanding but not necessary to use) historically added after a statement between male friends that could be read as affectionate, meant to clarify non-romantic intent — its use and reception has shifted over time as attitudes around platonic male affection have become more relaxed in many online spaces. Recognizing these phrases helps interpret common joking conversational patterns without needing to generate or extend the joke itself.`,
    createdAt: Date.now(),
  },
];
