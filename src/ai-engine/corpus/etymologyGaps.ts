import { KnowledgeItem } from '../../types';

// Batch 43 (etymology & word origins) gap-fills. Live misses on nexus-4b —
// many web dumps and wrong derivations: "robot" -> Asimov's Three Laws;
// "jeep" -> Jeep Gladiator spec sheet; "deadline"/"assassin" -> a "natural on
// packaging" dump; "Wednesday" -> Sheffield Wednesday FC; "saved by the bell"
// -> the sitcom; "disaster" -> "from Latin castra (camp)" (it's "bad star");
// "nightmare" -> "from Old French nerable"; "the john" -> "Richard John Smith,
// patent clerk"; "rule of thumb" -> "from sailing".
export const ETYMOLOGY_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-etym-robot',
    title: 'Where the Word "Robot" Comes From',
    category: 'Etymology',
    keywords: [
      'where does the word robot come from', 'who coined the word robot', 'origin of the word robot', 'karel capek robot',
      'what does robota mean', 'first use of the word robot',
    ],
    content: `"Robot" was coined by the Czech writer Karel Čapek for his 1920 science-fiction play "R.U.R." (Rossum's Universal Robots), about artificial workers who eventually rebel. It comes from the Czech word "robota," meaning forced labour, drudgery or serfdom (related to words for "work" across Slavic languages). Čapek said his brother, the painter Josef Čapek, actually suggested it — Karel had been going to call them "labori" (from Latin). The play was translated and staged around the world within a few years, and "robot" replaced older terms like "automaton" and "mechanical man." Isaac Asimov later coined "robotics" (1941) and wrote the famous Three Laws, but he did not invent the word "robot" itself.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-disaster',
    title: 'Where the Word "Disaster" Comes From',
    category: 'Etymology',
    keywords: [
      'what is the origin of the word disaster', 'where does the word disaster come from', 'disaster bad star',
      'etymology of disaster', 'why does disaster mean bad star', 'aster in disaster',
    ],
    content: `"Disaster" literally means "bad star." It came into English in the late 1500s from Italian "disastro" / Old French "désastre," made of "dis-" (a negative or unfavourable prefix) plus "astro" — star — from Latin "astrum" and ultimately Greek "astron." The word reflects the old astrological belief that the positions of the stars and planets controlled human fortune, so a "disaster" was originally a calamity blamed on an unfavourable alignment of the heavens, an "ill-starred" event. The same star-root shows up in "astronomy," "astronaut," "asterisk" (a "little star"), and "consider" (originally "to observe the stars"). Related: "ill-starred" and "star-crossed" (as in Shakespeare's "star-crossed lovers") carry the same idea directly.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-nightmare',
    title: 'Where the Word "Nightmare" Comes From',
    category: 'Etymology',
    keywords: [
      'where does the word nightmare come from', 'origin of the word nightmare', 'what is a mare in nightmare',
      'nightmare etymology', 'does nightmare have to do with horses', 'old english mare demon',
    ],
    content: `"Nightmare" is "night" + "mare," but the "mare" here has nothing to do with a female horse. It comes from the Old English "mære" (related to words in other Germanic languages), the name of an evil spirit or goblin — a kind of incubus — that folklore said would sit or ride on the chest of a sleeping person, pressing down on them and causing a feeling of suffocation and terrifying dreams. So a "night-mare" was originally that oppressive night-demon and the experience of being "ridden" by it (what we'd now recognise as sleep paralysis). Only later, from the 1500s–1800s, did the word drift to mean simply a very bad dream, and then, figuratively, any awful situation ("a logistical nightmare"). Henry Fuseli's famous 1781 painting "The Nightmare" shows the old sense — a demon crouching on a sleeper, with a ghostly horse's head in the background as a visual pun.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-jeep',
    title: 'Where the Word "Jeep" Comes From',
    category: 'Etymology',
    keywords: [
      'why is it called a jeep', 'where does the word jeep come from', 'origin of the name jeep', 'does jeep mean general purpose',
      'eugene the jeep popeye', 'willys jeep name origin', 'GP jeep',
    ],
    content: `The origin of "jeep" for the WWII quarter-ton army 4x4 is debated, with two main theories. One: it's a slurring of the letters "G.P.," which appeared in the military nomenclature for the vehicle (often read as "General Purpose," though the G actually stood for a Ford model code). Two — favoured by many word historians — it comes from "Eugene the Jeep," a small magical creature in the Popeye comic strip introduced in 1936, who could walk through walls, teleport and go almost anywhere; soldiers already used "jeep" as slang for various new or odd vehicles and gadgets, and it stuck to the go-anywhere little 4x4. The name was in soldier slang by 1941, a journalist printed it that year, and Willys-Overland trademarked "Jeep" after the war for its civilian models. "Jeep" for the vehicle predates any modern SUV of that name.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-deadline',
    title: 'Where the Word "Deadline" Comes From',
    category: 'Etymology',
    keywords: [
      'what is the origin of the word deadline', 'where does the word deadline come from', 'deadline civil war prison',
      'andersonville dead line', 'why is it called a deadline', 'deadline printing press origin',
    ],
    content: `"Deadline" originally meant a literal line you would die for crossing. It's first recorded during the American Civil War as the "dead line" in military prison camps — a boundary, sometimes just a marked line or a light fence set a short distance inside the stockade wall, that any prisoner who stepped over or even reached across would be shot by the guards. It's especially associated with the notorious Confederate camp at Andersonville. After the war the term moved into printing and publishing: a "deadline" was a guideline on the bed of a printing press beyond which text wouldn't print, and then, by the early 1900s, it took on its modern sense of a fixed time by which a piece of work (a news story, a report) must be finished. The "you'll be shot" origin is why the word still feels so absolute.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-bug-computing',
    title: 'Why a Software Fault Is Called a "Bug"',
    category: 'Etymology',
    keywords: [
      'why do we call it a bug in computing', 'origin of the word bug in computing', 'grace hopper moth bug',
      'first computer bug', 'where does software bug come from', 'edison bug engineering',
    ],
    content: `"Bug" for a technical fault is older than computers — engineers, including Thomas Edison in the 1870s, already used it for glitches and defects in machinery. Its computing fame comes from a specific incident: in September 1947, operators of the Harvard Mark II electromechanical computer traced a malfunction to an actual moth caught in one of the machine's relays. They removed it and taped it into the logbook with the note "First actual case of bug being found." Grace Hopper, who was on that team, loved telling the story and helped spread it. So the moth didn't create the word, but it fixed "bug" (and "debug" — literally removing the bug) firmly in programming vocabulary. The logbook page with the taped moth is preserved at the Smithsonian.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-rule-of-thumb',
    title: 'Where the Phrase "Rule of Thumb" Comes From',
    category: 'Etymology',
    keywords: [
      'where does the phrase rule of thumb come from', 'origin of rule of thumb', 'does rule of thumb mean wife beating',
      'rule of thumb wife beating myth', 'rule of thumb meaning', 'thumb width measurement',
    ],
    content: `"Rule of thumb" means a rough, practical guideline based on experience rather than precise measurement or theory. The phrase is recorded from the late 1600s, and the generally accepted explanation is simply that people used the thumb as a handy approximate measuring and estimating tool — the width of an adult thumb is roughly an inch, and thumbs were used to gauge distances, alignment, temperature (dipping a thumb in liquid), and proportions in trades like carpentry, brewing, tailoring and gardening. There is a persistent claim that it refers to an old law allowing a husband to beat his wife with a stick no thicker than his thumb — but historians have found no such law in English or American statute, and the "wife-beating" story only became attached to the phrase in the 1970s. So it's a myth; the real origin is the thumb as a rough ruler.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-the-john',
    title: 'Why the Toilet Is Called "the John"',
    category: 'Etymology',
    keywords: [
      'why is the toilet called the john', 'origin of john for toilet', 'sir john harington toilet', 'why do americans say john for bathroom',
      'the jakes toilet', 'thomas crapper toilet name',
    ],
    content: `Calling the toilet "the john" is American slang recorded from the early 1900s (Harvard used "the Jake" and "the John" earlier still, in the 1730s). The best explanation ties it to older names: an outhouse or privy was long called "the jakes" (from the mid-1500s, possibly from the name "Jacques" or "Jack"), and "cousin John" / "Sir-John" were also polite dodges for the privy. It's often linked to Sir John Harington, the English courtier and godson of Queen Elizabeth I who designed and installed an early flush toilet ("the Ajax," a pun on "a jakes") around 1596 and wrote a book about it — a memorable "John" associated with the device. (Sir John Harington did not invent the modern flush toilet; Alexander Cumming patented the S-bend trap in 1775, and Thomas Crapper later popularised and sold flush toilets, which is where the crude synonym "the crapper" comes from — though "crap" as a word for waste is older than Crapper.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-wednesday',
    title: 'Where the Word "Wednesday" Comes From',
    category: 'Etymology',
    keywords: [
      'what does the word wednesday come from', 'origin of wednesday', 'why is it spelled wednesday', 'wodens day',
      'days of the week norse gods', 'why is there a silent d in wednesday',
    ],
    content: `"Wednesday" comes from Old English "Wōdnesdæg," meaning "Woden's day" — Woden (Wōden) being the Anglo-Saxon name for the chief Germanic god, the same figure as the Norse Odin. It was a direct translation of the Latin "dies Mercurii" ("Mercury's day"), because the Romans and the Germanic peoples matched Woden/Odin with the god Mercury (both were associated with travel, trade, magic and the dead). Several English weekday names work this way: Tuesday = Tiw's day (a war god, matching Mars); Thursday = Thor's day (Jupiter); Friday = Frigg's day (Venus). Sunday and Monday are the Sun's and Moon's days, and Saturday keeps the Roman "Saturn's day." The silent "d" in "Wednesday" is a leftover of the older "Wōdnes-" spelling, even though almost no one pronounces it. (This has nothing to do with the football club Sheffield Wednesday, which is named after the day of the week its members' club met.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-saved-by-the-bell',
    title: 'Where the Phrase "Saved by the Bell" Comes From',
    category: 'Etymology',
    keywords: [
      'where does the phrase saved by the bell come from', 'origin of saved by the bell', 'saved by the bell boxing',
      'saved by the bell coffin myth', 'safety coffin bell', 'buried alive bell string',
    ],
    content: `"Saved by the bell" comes from BOXING. A fighter who has been knocked down and is being counted out can be "saved by the bell" if the bell ringing to end the round stops the count before he's counted out, giving him a minute to recover. The phrase is recorded in this sense from the late 1800s and by the 1930s was being used figuratively for any last-second rescue from a bad situation. There's a popular alternative story that it refers to "safety coffins" of the 1800s — fitted with a bell on a string so a person buried alive could signal for help. Such coffins did exist (out of a genuine fear of premature burial), but there's no evidence anyone was ever actually saved by one, and the boxing origin came first and is the real source. (The TV sitcom simply borrowed the phrase.)`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-assassin',
    title: 'Where the Word "Assassin" Comes From',
    category: 'Etymology',
    keywords: [
      'what is the origin of the word assassin', 'where does the word assassin come from', 'hashashin order of assassins',
      'hassan-i sabbah alamut', 'does assassin come from hashish', 'nizari ismailis assassins',
    ],
    content: `"Assassin" comes, via medieval Latin and Italian, from Arabic "Hashishin" (or "Hashashin"), a name applied to the Nizari Ismailis, a Shia Muslim sect founded by Hassan-i Sabbah in the late 11th century, based in mountain fortresses like Alamut in Persia and later Syria. During the era of the Crusades they became feared for sending trained agents ("fida'i") to kill political and military leaders — sometimes rival Muslim rulers, sometimes Crusader lords — with a dagger, often in public and at great personal risk. Their enemies called them "hashishiyya," usually explained as "hashish users" (from stories, spread by Marco Polo and others, that recruits were drugged with cannabis and shown a garden "paradise" to secure their loyalty) — though many historians think the label was just an insult meaning "riff-raff" or "outcasts." European Crusaders brought the word home, and by Dante's time it already meant a hired or fanatical killer. The order was largely destroyed by the Mongols in 1256.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-bless-you',
    title: 'Why We Say "Bless You" When Someone Sneezes',
    category: 'Etymology',
    keywords: [
      'why do we say bless you when someone sneezes', 'origin of saying bless you', 'why do we say gesundheit',
      'sneeze superstition soul', 'pope gregory bless you plague', 'does your heart stop when you sneeze',
    ],
    content: `There's no single proven origin, but the main explanations are all old superstitions about the sneeze being a dangerous moment. (1) During a plague in Rome around 590 AD, Pope Gregory I is said to have urged people to respond to a sneeze — an early symptom — with a blessing and a prayer, since the person might be about to fall gravely ill. (2) A widespread ancient belief that the soul could briefly escape the body through the nose during a sneeze, or that an evil spirit could take the opportunity to rush in, so the blessing was protective. (3) A folk idea that the heart stops momentarily during a sneeze (it doesn't — the rhythm can just briefly change). Many cultures have an equivalent response: German "Gesundheit" ("health"), and various "long life" or "God protect you" phrases elsewhere. Today it survives simply as a small politeness with the original meaning mostly forgotten.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-sandwich',
    title: 'Where the Word "Sandwich" Comes From',
    category: 'Etymology',
    keywords: [
      'what is the origin of the word sandwich', 'who was the earl of sandwich', 'john montagu sandwich', 'why is a sandwich called a sandwich',
      'earl of sandwich gambling', 'when was the sandwich invented',
    ],
    content: `The sandwich is named after John Montagu, 4th Earl of Sandwich (1718–1792), a British politician. The story, from a French traveller's account written around 1762, is that Montagu, not wanting to leave a long session at the gambling table (some versions say his work desk), asked for slices of meat served between two pieces of bread so he could eat with one hand without getting grease on the cards. Others at the table began ordering "the same as Sandwich," and the name stuck. He didn't invent eating food in bread — that's ancient — but his title attached to it. "Sandwich" the town in Kent gets its name separately, from Old English meaning roughly "sandy market/landing place." So the food is named after an earl, who is named after a town.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-etym-companion',
    title: 'Where the Word "Companion" Comes From',
    category: 'Etymology',
    keywords: [
      'what is the origin of the word companion', 'where does the word companion come from', 'companion bread etymology',
      'com panis one who shares bread', 'company etymology bread', 'what does companion literally mean',
    ],
    content: `"Companion" literally means "one you share bread with." It comes through Old French "compaignon" from Late/Vulgar Latin "companio," built from "com-" ("with, together") + "panis" ("bread"). So a companion was originally a person you broke bread with — someone you shared meals, and by extension a journey or a life, with. The same root gives "company" (a group that eats/travels together, later a business), "accompany," and the military "company." It's a "calque" — a word-for-word translation — of a Germanic term with the same meaning (Gothic "gahlaiba," "with-bread"). Related bread words: "lord" is Old English "hlāfweard," "loaf-keeper/bread-guardian," and "lady" is "hlǣfdīge," "bread-kneader."`,
    createdAt: Date.now(),
  },
];
