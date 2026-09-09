import { KnowledgeItem } from '../../types';

// Patrick asked that Nexus fully understand British English — British slang,
// insults, idioms, spellings and regional/roadman talk — and be able to answer
// back in the same register. The persona prompts and SLANG_LEXICON were
// extended; these corpus entries back up retrieval so "what does knobhead /
// gutted / chuffed / innit mean" and "British vs American English" questions
// resolve to real answers instead of homonyms or web dumps.
export const BRITISH_ENGLISH_GAPS: KnowledgeItem[] = [
  {
    id: 'kb-gap-brit-insults',
    title: 'Common British Insults and Their Meanings',
    category: 'Language',
    keywords: [
      'what does knobhead wanker bellend plonker mean british insult',
      'knobhead knob nobhead an idiot a fool an annoying person wanker a contemptible obnoxious person bellend an idiot or contemptible person plonker a fool tosser a contemptible worthless person pillock a silly person numpty a harmlessly stupid person muppet someone acting incompetently',
      'gobshite someone who talks stupid nonsense minger an ugly or unpleasant person git a grumpy unpleasant person prat a foolish person berk a fool tit a fool wazzock a stupid person div a stupid person',
      'strength ranking numpty pillock plonker muppet prat are mild and often affectionate git knobhead tosser tit are medium wanker bellend gobshite are strong',
    ],
    content: `British English has a large, finely graded vocabulary of insults. MILD / often affectionate: numpty (harmlessly stupid, Scottish-flavoured), pillock, plonker (popularised by "Only Fools and Horses"), muppet (acting incompetently), prat, berk, div, wazzock, wally, nincompoop. MEDIUM: git (a grumpy, unpleasant person — "you miserable old git"), knobhead / knob / nobhead (an idiot, an annoying person), tit, tosspot, twerp, spanner, melt. STRONG (genuinely rude): wanker (a contemptible, obnoxious person — literally "one who masturbates," but used far more loosely than Americans expect), bellend (literally the glans; figuratively an idiot or contemptible person), tosser (like "wanker"), gobshite (Irish/British — someone who talks constant stupid nonsense), knobend, cockwomble, arsehole. "Minger" means an ugly or repulsive person, and "minging" means disgusting. Note that some of these ("wanker," "bellend," "arse," "bloody") are much milder in British usage than their literal content suggests, and terms like "you daft bugger" or "silly sod" can be almost affectionate between friends. Regional variants exist — "eejit" (Irish/Scots for idiot), "bawbag" (Scottish, literally scrotum, used like "idiot").`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brit-feelings',
    title: 'British Slang for Feelings and States (Gutted, Chuffed, Knackered)',
    category: 'Language',
    keywords: [
      'what does gutted chuffed knackered gobsmacked buzzing mean british slang',
      'gutted bitterly disappointed devastated chuffed very pleased or proud chuffed to bits knackered extremely tired exhausted or broken worn out gobsmacked utterly astonished shocked speechless buzzing excited thrilled elated',
      'made up very happy pleased northern england chuffed buzzing over the moon delighted narked or peeved annoyed cheesed off fed up browned off annoyed shattered exhausted like knackered',
    ],
    content: `British slang for emotional and physical states: GUTTED — bitterly disappointed, devastated ("I was absolutely gutted when we lost in the last minute"). CHUFFED — very pleased, proud, delighted, often "chuffed to bits" (confusingly, in some old dialect "chuffed" meant the opposite — displeased — but the positive sense is now standard). KNACKERED — extremely tired, exhausted ("I'm knackered after that shift"); also means broken or worn out ("the washing machine's knackered"). SHATTERED — same as knackered, exhausted. GOBSMACKED — utterly astonished, so surprised you're speechless (literally "smacked in the gob/mouth"). BUZZING — excited, thrilled, elated ("I'm buzzing for the weekend"). MADE UP — very happy or pleased (Northern/Scouse: "I'm made up for you"). OVER THE MOON — delighted (cliché of footballers in interviews). NARKED / PEEVED / CHEESED OFF / BROWNED OFF — annoyed, irritated. FED UP — bored and dissatisfied. CHOKED — very upset or disappointed (older). SORTED — everything is arranged and fine ("we're sorted"). BRICKING IT — extremely nervous or scared.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brit-idioms',
    title: 'British Idioms (Taking the Piss, Can\'t Be Arsed, Bang Out of Order)',
    category: 'Language',
    keywords: [
      'what does taking the piss cant be arsed bang out of order do one mean british idiom',
      'taking the piss mocking someone or being unreasonable pushing your luck taking the mick politer version cannot be arsed cannot be bothered too lazy or unwilling to make the effort cba',
      'bang out of order completely unacceptable or unfair do one an aggressive go away get lost leave it out stop it or stop lying having me on joking or tricking me on the piss out drinking heavily chock a block completely full',
    ],
    content: `Common British idioms: TAKING THE PISS — (1) mocking or ridiculing someone ("are you taking the piss?"), (2) being unreasonable or exploiting a situation ("£8 for a coffee is taking the piss"). "Taking the mick / taking the mickey" is the politer form. CAN'T BE ARSED — can't be bothered, too unwilling to make the effort ("I can't be arsed to cook tonight"); texted as "cba." BANG OUT OF ORDER — completely unacceptable, unfair, or inappropriate behaviour ("what he said was bang out of order"). DO ONE — an aggressive "go away" / "get lost" ("tell him to do one"). LEAVE IT OUT — "stop it," or "stop lying / exaggerating." HAVING ME ON / HAVING A LAUGH — joking, winding me up ("you're having a laugh"). ON THE PISS — out drinking alcohol heavily. CHOCK-A-BLOCK / CHOCKA — completely full or crowded. SWINGS AND ROUNDABOUTS — it balances out. THROW A SPANNER IN THE WORKS — disrupt a plan. NOT MY CUP OF TEA — not to my taste. GUTTED / CHUFFED — see feelings. PEAR-SHAPED ("it all went pear-shaped") — it all went wrong. BOB'S YOUR UNCLE — "and there you have it." CHEEKY — playfully rude or a small indulgence ("a cheeky Nando's").`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brit-money-stuff',
    title: 'British Slang for Money, Things, and Places (Quid, Skint, Gaff, Dodgy)',
    category: 'Language',
    keywords: [
      'what does quid skint minted dosh gaff dodgy naff manky mean british slang',
      'quid one pound sterling twenty quid dosh money bread wonga money skint completely broke no money minted very rich loaded a monkey is 500 pounds a pony is 25 a grand is 1000',
      'gaff someone house or flat round my gaff dodgy suspicious unreliable poor quality or slightly illegal naff tacky uncool lacking taste manky dirty disgusting in poor condition telly television',
    ],
    content: `MONEY: "quid" = one pound (invariant plural — "twenty quid," never "twenty quids"); "a fiver" = £5, "a tenner" = £10; "a pony" = £25, "a monkey" = £500, "a grand" = £1,000, "a ton" = £100 (also 100 mph). "Dosh," "wonga," "bread," "bees and honey" (rhyming slang) = money. "Skint" = completely broke, no money. "Minted" / "loaded" / "rolling in it" / "quids in" = rich. "Brassic" (from Boracic lint, rhyming with skint) = broke. THINGS: "telly" = television, "the box" = TV, "brolly" = umbrella, "chuffing" = a euphemism for "fucking" as an intensifier, "the dog's bollocks" / "the bee's knees" = excellent, "naff" = tacky/uncool ("that's a bit naff"), "dodgy" = suspicious, unreliable, poor quality, or slightly illegal ("a dodgy motor," "he's a bit dodgy"), "manky" = dirty or gross, "knackered" = broken. PLACES: "gaff" = house or flat ("come round my gaff"), "the local" = one's usual pub, "the offy" = the off-licence (liquor store), "the boozer" = the pub, "up north" / "down south," "the sticks" = the countryside/middle of nowhere.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brit-mle-roadman',
    title: 'British Roadman / MLE Slang (Innit, Peng, Wagwan, Long Ting)',
    category: 'Language',
    keywords: [
      'what does innit peng wagwan bare long ting butters roadman ends mean british mle slang multicultural london english',
      'innit tag question isnt it seeking agreement about anything peng very attractive or excellent wagwan greeting from jamaican patois what is going on bare a lot loads very',
      'long ting a hassle tedious too much effort butters ugly ends local neighbourhood area roadman a streetwise young man mandem the boys the crew wasteman a useless person allow it forget it leave it safe cool thanks or bye',
    ],
    content: `"Roadman" slang is the vocabulary of Multicultural London English (MLE), a dialect that emerged in London from the 1980s blending Cockney, Jamaican Patois, and South Asian and West African English, now spoken by young people across British cities and heavily present in UK drill and grime music. Key terms: INNIT — universal tag question ("we're going out later, innit"), also a standalone agreement. PENG — very attractive, or excellent ("she's peng," "that food was peng"). PENG TING — an attractive person. WAGWAN — greeting, from Patois "what's going on." BARE — a lot, loads, very ("bare people were there," "it's bare cold"). LONG / LONG TING — tedious, a hassle, too much effort ("going all the way there is long"). BUTTERS — ugly. ENDS — one's local area/neighbourhood ("reppin' my ends"). MANDEM — the group of male friends, the crew (also "the mandem"); "galdem" = the women. WASTEMAN — a useless or worthless person. ALLOW IT — "forget it," "leave it," "don't bother." SAFE — cool / alright / thanks / goodbye. LINK (UP) — meet up, or a romantic interest. GYALDEM / GYAL — girl(s). BOOKY — suspicious, weird. BUFF — attractive/muscular. CHing — a knife (drill slang). NANG — good, cool (older East London). "Bruv," "fam," "blud," "g," "my guy," "cuz" — all mean "friend / mate."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brit-vs-american-vocab',
    title: 'British vs American English: Everyday Vocabulary',
    category: 'Language',
    keywords: [
      'british vs american english vocabulary differences words',
      'british american trousers pants pants underpants jumper sweater trainers sneakers wellies rubber boots nappy diaper dummy pacifier pram stroller cot crib',
      'lift elevator flat apartment ground floor first floor lorry truck boot trunk bonnet hood petrol gas motorway freeway pavement sidewalk zebra crossing crosswalk roundabout traffic circle',
      'chips fries crisps chips biscuit cookie scone sweets candy fizzy drink soda aubergine eggplant courgette zucchini coriander cilantro rocket arugula candy floss cotton candy',
      'autumn fall holiday vacation queue line rubbish garbage bin trash can post mail mobile cell phone torch flashlight full stop period maths math football soccer mum mom',
    ],
    content: `British and American English differ in hundreds of everyday words. CLOTHING: trousers = pants; pants/underpants = underwear; jumper/jersey = sweater; trainers = sneakers; wellies = rubber boots; waistcoat = vest; vest = undershirt; nappy = diaper; dummy = pacifier; pram/buggy = stroller; plaster = Band-Aid. BUILDINGS: flat = apartment; lift = elevator; ground floor = first floor (so British "first floor" = US "second floor"); the loo/toilet/bog = the bathroom/restroom. CARS & ROADS: lorry = truck; boot = trunk; bonnet = hood; windscreen = windshield; petrol = gas(oline); motorway = freeway/highway; pavement = sidewalk; zebra crossing = crosswalk; roundabout = traffic circle; car park = parking lot; indicator = turn signal; gearstick = stick shift. FOOD: chips = (thick) fries; crisps = (potato) chips; biscuit = cookie; a (savoury) biscuit ≈ a cracker; sweets = candy; candy floss = cotton candy; fizzy drink/pop = soda; aubergine = eggplant; courgette = zucchini; coriander (leaf) = cilantro; rocket = arugula; jacket potato = baked potato; takeaway = takeout. MISC: autumn = fall; holiday = vacation; queue = line; rubbish = garbage/trash; bin = trash can; post = mail; mobile = cell phone; torch = flashlight; full stop = period; maths = math; football = soccer; mum = mom; nan = grandma; mate = buddy; cheers = thanks/bye.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brit-vs-american-spelling',
    title: 'British vs American English: Spelling and Grammar',
    category: 'Language',
    keywords: [
      'british vs american english spelling differences grammar',
      'british our american or colour color favour favor honour honor labour labor neighbour neighbor british re american er centre center theatre theater metre meter litre liter',
      'british ise american ize organise organize realise realize british double l travelled traveller cancelled american traveled traveler canceled british defence licence practice noun american defense license',
      'british aeroplane grey tyre kerb pyjamas mould plough draught aluminium american airplane gray tire curb pajamas mold plow draft aluminum grammar collective nouns take plural the team are',
    ],
    content: `SPELLING patterns (British → American): -our → -or (colour/color, favour, honour, labour, neighbour, behaviour, flavour); -re → -er (centre/center, theatre, metre, litre, fibre, calibre); -ise/-yse → -ize/-yze (organise/organize, realise, analyse/analyze — though -ize is also valid in British "Oxford spelling"); doubled final -l before a suffix (travelled/traveled, traveller, cancelled, modelling, labelled); -ce vs -se for noun/verb pairs (British: a licence/to license, a practice/to practise, defence/offence; American uses -se or -ce more uniformly — "defense," "license" for both); -ogue vs -og (catalogue/catalog, dialogue, analogue); other individual words: aeroplane/airplane, grey/gray, tyre/tire, kerb/curb (the edge of a road), pyjamas/pajamas, mould/mold, plough/plow, draught/draft, sceptic/skeptic, cheque/check (bank), aluminium/aluminum (also pronounced differently), manoeuvre/maneuver, oestrogen/estrogen, paediatric/pediatric. GRAMMAR: British English often treats collective nouns as plural ("the team are winning," "the government have decided," "Arsenal are playing"); Americans use singular. British "have got" ("have you got a pen?") where Americans say "do you have." Past participles: British "learnt/burnt/dreamt/spelt," American "learned/burned/dreamed/spelled." Dates: British DD/MM/YYYY, American MM/DD/YYYY. British "at the weekend," American "on the weekend." British "in hospital / at university," American "in the hospital / in college."`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-gap-brit-general-slang',
    title: 'General British Slang (Mate, Cheers, Bloke, Gaffer, Bants)',
    category: 'Language',
    keywords: [
      'general british slang mate cheers bloke lad gaffer bants dodgy sorted mean',
      'mate friend also a generic address for a stranger cheers thanks or a toast or goodbye bloke a man guy lad a young man or one of the lads ta thanks',
      'gaffer the boss or a football manager bants banter playful teasing sound good reliable trustworthy proper as an intensifier really genuinely fit attractive or in shape kip a nap chunder to vomit bevvy an alcoholic drink scran food',
    ],
    content: `Everyday non-vulgar British slang: MATE — friend, and also a friendly address to any man including strangers ("alright, mate?", "cheers, mate"); "pal," "bud," "chief," "boss," "fella," "squire" work similarly, and "love," "duck," "pet," "hen" (Scottish), "babe," "chuck" are regional friendly address terms. CHEERS — thanks, and also "goodbye," and a drinking toast. TA — informal "thanks." BLOKE — a man, a guy ("some bloke came round"). LAD — a young man; "the lads" = the group of male friends; "having it large / a big one" = a heavy night out. BIRD — a woman (somewhat dated, mildly disrespectful). GAFFER — the boss, or a football team's manager. BANTS / BANTER — playful teasing and joking between friends; "having a laugh." SOUND — good, reliable, trustworthy ("he's sound," "sound, cheers"). PROPER — used as an intensifier: "proper good," "a proper laugh," "proper tired." FIT — attractive (or literally in shape). KIP — a nap or sleep ("I need a kip"). CHUNDER — to vomit. BEVVY — an alcoholic drink; "on the bevvies." SCRAN / NOSH / GRUB — food. KNACKERED / SHATTERED — exhausted. GOB — mouth ("shut your gob"). LEG IT — run away. SKIVE — to avoid work or school. FAFF — to waste time dithering ("stop faffing about"). DEAR — expensive ("that's a bit dear"). QUID / NICKED (stolen or arrested) / GRASS (an informer) / COPPER (a police officer) / NUTTER (a crazy person).`,
    createdAt: Date.now(),
  },
];
