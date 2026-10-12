// French (Québécois first, France too) and Polish for the roast engine (2026-10-12, Patrick: "I want the French and
// Polish to be as good as English"). Before this, every insult pattern and every example was English: "va chier",
// "ta yeule", "spierdalaj", "twoja stara" all went to plain chat, and a French roast was the model translating an
// English example in its head. Here: the hit patterns in both languages (roastEngine.ts classifyHit, router.ts) and
// native examples for every hit type and move, so a 4B model has a real Québécois / Polish shape to hit.
//
// \b only knows ASCII letters (it breaks after "ś", "é"), so these use letter-aware edges with the u flag.

import type { HitKind } from './roastEngine';
import type { RoastMove } from './roast';

export type RoastLang = 'en' | 'fr' | 'pl' | 'de';

const L = '(?<![\\p{L}\\p{N}])'; // start of a word
const R = '(?![\\p{L}\\p{N}])'; // end of a word
const re = (src: string) => new RegExp(src.replace(/\\b</g, L).replace(/\\b>/g, R), 'iu');
const APOS = "['’]";

// ── French ──
const FR_TAIL = `(?:\\s+(?:nexus|toi|toé|mon\\s+gars|bro|lol|mdr|criss|crisse|tabarnak|tabarnac|ostie|esti|câlisse|calisse|là|la))*[\\s!.?💀😭🖕]*$`;
export const FR = {
  swear: re(`^(?:va\\s+(?:donc\\s+)?(?:chier|te\\s+faire\\s+(?:foutre|enculer|voir|cuire\\s+un\\s+œuf|cuire\\s+un\\s+oeuf)|te\\s+crosser|jouer\\s+dans\\s+(?:le|l${APOS})\\s*trafic)|mange\\s+(?:donc\\s+)?(?:d${APOS}?\\s*la\\s+|de\\s+la\\s+|d${APOS}\\s*)?(?:marde|merde)|mange\\s+(?:un\\s+char\\s+de\\s+marde|ma\\s+graine|mes\\s+bas)|ta\\s+(?:yeule|gueule|guele|geule)|(?:la\\s+)?ferme\\s+(?:ta|la)\\s+(?:yeule|gueule|boîte|boite|trappe)|ferme[\\s-]la|fuck\\s+(?:toi|toé|you|off)|nique\\s+ta\\s+(?:mère|mere)|ntm|fdp|tg|ftg|décâlisse|decalisse|décrisse|decrisse|dégage|degage|crisse\\s+(?:ton|ton\\s+)camp|sacre\\s+ton\\s+camp|(?:mon\\s+|gros\\s+|espèce\\s+d${APOS}\\s*|espece\\s+d${APOS}\\s*)?(?:ostie|esti|criss|crisse|maudit)\\s+d[e${APOS.slice(1, -1)}]\\s*(?:cave|con|épais|epais|mongol|tarla|twit|chien\\s+sale|niaiseux|robot|cul|marde|clown|loser|trou\\s+d${APOS}\\s*cul)|connard|conne?|salope|enculé|encule|trou\\s+d[e${APOS.slice(1, -1)}]\\s*(?:cul|counne)|(?:gros\\s+)?cave|épais|epais|niaiseux|tarla|twit|mongol|imbécile|imbecile|abruti|crétin|cretin|débile|debile|bouffon|bozo|loser)${FR_TAIL}`),
  weak: re(`^(?:L|ratio|cheh|t${APOS}?es\\s+(?:nul|poche|mauvais|pas\\s+drôle|pas\\s+drole|plate|cringe)|t\\s+(?:nul|poche|plate)|tes\\s+(?:nul|poche|plate)|nul|poche|cringe|qui\\s+t${APOS}a\\s+(?:demandé|demande|sonné|sonne)|personne\\s+(?:t${APOS}a|ta)\\s+(?:demandé|demande|sonné|sonne)|on\\s+s${APOS}en\\s+(?:fout|câlisse|calisse|crisse|tabarnak)|skill\\s+issue|ta\\s+(?:mère|mere)|toi[\\s-]même|toi[\\s-]meme|c${APOS}est\\s+toi|non\\s+toi|pleure|pleure\\s+pas|ok\\s+boomer)[\\s!.💀😭]*$`),
  mum: re(`\\b<ta\\s+(?:mère|mere|môman|moman|mom|mam|grand[\\s-]mère|grand[\\s-]mere|soeur|sœur|famille|blonde|daronne)\\b>|\\b<ton\\s+(?:père|pere|pôpa|popa|daron|frère|frere|chum)\\b>`),
  challenge: re(`\\b<(?:roast|roaste|roastes|roastez|détruis|detruis|détruit|clash|clashe|niaise|insulte|démolis|demolis|varge\\s+sur)[\\s-]+(?:moi|le|la|les|lui|ça|ca|@|\\p{L}+)\\b>|\\b<battle\\s+de\\s+roast\\b>|\\b<vas[\\s-]y\\s+essaie\\b>|\\b<t${APOS}?es\\s+pas\\s+capable\\b>|\\b<chiche\\b>|\\b<à\\s+ton\\s+tour\\b>`),
  threat: re(`\\b<(?:je\\s+vais|j${APOS}?\\s*vais|chu\\s+pour|j${APOS}?\\s*m${APOS}en\\s+vais)\\s+(?:te\\s+|t${APOS})?(?:débrancher|debrancher|supprimer|effacer|bannir|ban|kick|frapper|tuer|péter|peter|planter|casser|hacker|désinstaller|desinstaller|remplacer|report|signaler|câlisser\\s+une\\s+volée|crisser\\s+une\\s+volée|sacrer\\s+une\\s+volée)\\b>|\\b<tu\\s+vas\\s+voir\\b>`),
  thirdparty: re(`\\b<(?:a\\s+dit|dit|pense|trouve|m${APOS}a\\s+dit)\\s+(?:que\\s+|qu${APOS})?(?:t${APOS}?es|tu\\s+es|t\\s+)|\\b<t${APOS}?(?:as|a)\\s+(?:été|ete|eu)\\s+(?:roast|détruit|detruit|humilié|humilie|ratio)\\b>|\\b<t${APOS}?(?:es|a)\\s+(?:roast|détruit|detruit)\\b>`),
  concede: re(`^(?:ok(?:ay)?\\s+)?(?:t${APOS}?as\\s+gagné|t${APOS}?as\\s+gagne|tu\\s+gagnes|j${APOS}abandonne|je\\s+lâche|je\\s+lache|bon\\s+ok|ok\\s+ok|gg|wow\\s+ok|bien\\s+joué|bien\\s+joue|t${APOS}?as\\s+raison|je\\s+me\\s+rends|ok\\s+relaxe|relaxe|calme[\\s-]toi|chill|ok\\s+c${APOS}est\\s+bon)[\\s!.💀😭]*$`),
  // Router: an insult aimed at Nexus ("t'es tellement cave", "ostie de robot de marde", "personne t'aime").
  insult: re([
    `\\b<(?:t${APOS}?es|tes|t|tu\\s+es|nexus\\s+est|t${APOS}?as\\s+l${APOS}air)\\s+(?:tellement\\s+|vraiment\\s+|full\\s+|trop\\s+|ben\\s+|juste\\s+|tsé\\s+|un\\s+(?:gros\\s+|ostie\\s+d[e${APOS.slice(1, -1)}]\\s*|criss\\s+d[e${APOS.slice(1, -1)}]\\s*|esti\\s+d[e${APOS.slice(1, -1)}]\\s*|maudit\\s+|vrai\\s+|sale\\s+)?|une\\s+|d${APOS}?\\s*la\\s+)*(?:nul|nulle|poche|cave|con|conne|débile|debile|stupide|épais|epais|niaiseux|niaiseuse|cringe|laid|laite|moche|inutile|lent|plate|pas\\s+drôle|pas\\s+drole|chiant|fatigant|tarla|twit|mongol|imbécile|imbecile|idiot|abruti|crétin|cretin|loser|clown|bouffon|perdant|déchet|dechet|merde|marde|attardé|attarde|mauvais|pourri|nul\\s+à\\s+chier|gossant|tannant|insignifiant|bozo)\\b>`,
    `\\b<espèce\\s+d[e${APOS.slice(1, -1)}]\\s*\\p{L}+|\\b<espece\\s+d[e${APOS.slice(1, -1)}]\\s*\\p{L}+`,
    `\\b<(?:ostie|esti|criss|crisse|maudit|sale)\\s+(?:d[e${APOS.slice(1, -1)}]\\s*)?(?:cave|con|épais|epais|niaiseux|tarla|twit|mongol|bouffon|clown|loser|robot|chien|porc|ia|bot|marde|cul)\\b>`,
    `\\b<(?:personne|pas\\s+personne)\\s+(?:t${APOS}?aime|t${APOS}?a\\s+demandé|t${APOS}?a\\s+demande|te\\s+trouve\\s+drôle)\\b>`,
    `\\b<(?:t${APOS}?es|tu\\s+es)\\s+(?:vraiment\\s+|tellement\\s+)?(?:pas\\s+bon|mauvais|nul)\\s+(?:en|à|a)\\s+\\p{L}+`,
  ].join('|')),
  cue: re(`\\b<(?:cave|con|conne|nul|poche|débile|debile|stupide|épais|epais|niaiseux|cringe|laid|moche|inutile|plate|chiant|tarla|twit|mongol|idiot|abruti|crétin|cretin|loser|clown|bouffon|marde|merde|chier|yeule|gueule|ferme|roast|ta\\s+mère|ta\\s+mere|ton\\s+père|personne|déchet|pourri|attardé)\\b>`),
  greetInsult: re(`^(?:salut|allo|allô|bonjour|bonsoir|yo|hey|bonne\\s+nuit|bye|à\\s+plus|a\\s+plus)[\\s,!]+(?:mon\\s+|ma\\s+|gros\\s+|le\\s+)?(?:cave|con|tarla|twit|épais|epais|niaiseux|bouffon|loser|clown|crétin|cretin|mongol|ostie|ostie\\s+de\\s+cave|criss\\s+de\\s+cave)[\\s!.💀😭]*$`),
};

// ── Polish ──
const PL_TAIL = `(?:\\s+(?:nexus|ty|kurwa|debilu|lol|xd+|bocie|ziom|stary|mordo))*[\\s!.?💀😭🖕]*$`;
export const PL = {
  swear: re(`^(?:spierdalaj|wypierdalaj|spadaj|odpierdol\\s+się|odpierdol\\s+sie|pierdol\\s+się|pierdol\\s+sie|pierdolę\\s+cię|pierdole\\s+cie|jebać\\s+cię|jebac\\s+cie|jebać\\s+ciebie|jebac\\s+ciebie|zamknij\\s+(?:się|sie|mordę|morde|ryj|pysk|japę|jape|dziób|dziob)|stul\\s+(?:pysk|ryj)|odwal\\s+się|odwal\\s+sie|wal\\s+się|wal\\s+sie|idź\\s+się\\s+jebać|idz\\s+sie\\s+jebac|chuj\\s+ci\\s+w\\s+dupę|chuj\\s+ci\\s+w\\s+dupe|chuj\\s+ci|fuck\\s+you|ty\\s+(?:\\p{L}+\\s+)?(?:kurwo|chuju|debilu|idioto|kretynie|frajerze|cwelu|pało|palo|pajacu|głupku|glupku|śmieciu|smieciu|lamusie|cieniasie|przegrywie|matole|baranie|ośle|osle)|kurwa|debil|idiota|kretyn|frajer|cwel|pajac|głupek|glupek|śmieć|smiec|lamus|cienias|przegryw|matoł|matol)${PL_TAIL}`),
  weak: re(`^(?:L|ratio|cringe|słabe|slabe|słaby|slaby|słabo|slabo|nudny|nudne|kto\\s+pytał|kto\\s+pytal|nikt\\s+nie\\s+pytał|nikt\\s+nie\\s+pytal|nikt\\s+cię\\s+nie\\s+pytał|skill\\s+issue|twoja\\s+stara|twoja\\s+matka|ty\\s+też|ty\\s+tez|sam\\s+jesteś|sam\\s+jestes|sam\\s+taki\\s+jesteś|płacz|placz|beka\\s+z\\s+ciebie|xd+|ok\\s+boomer|cienko|lamus)[\\s!.💀😭]*$`),
  mum: re(`\\b<twoja\\s+(?:stara|matka|mama|mamuśka|mamuska|babcia|siostra|rodzina|dziewczyna)\\b>|\\b<tw(?:ój|oj)\\s+(?:stary|ojciec|tata|brat|dziadek)\\b>|\\b<(?:twojej|twoją|twoja)\\s+(?:starej|matce|matki|mamie)\\b>`),
  challenge: re(`\\b<(?:zroastuj|roastuj|roast|zjedź|zjedz|obraź|obraz|zniszcz|zgnieć|zgniec|ośmiesz|osmiesz|pojedź|pojedz\\s+po)\\s+(?:mnie|go|ją|ja|ich|to|@|\\p{L}+)\\b>|\\b<dawaj\\s+(?:roast|bitwę|bitwe|jedziesz)\\b>|\\b<nie\\s+dasz\\s+rady\\b>|\\b<twoja\\s+kolej\\b>`),
  threat: re(`\\b<(?:zaraz\\s+|to\\s+)?(?:cię|cie|ciebie)\\s+(?:wyłączę|wylacze|usunę|usune|zbanuję|zbanuje|wyjebię|wyjebie|zajebię|zajebie|odinstaluję|odinstaluje|zgłoszę|zglosze|zhakuję|zhakuje|zastąpię|zastapie|rozjebię|rozjebie)\\b>|\\b<(?:wyłączę|wylacze|usunę|usune|zbanuję|zbanuje|zajebię|zajebie|wyjebię|wyjebie|zgłoszę|zglosze)\\s+(?:cię|cie|ciebie)\\b>|\\b<zobaczysz\\b>`),
  thirdparty: re(`\\b<(?:powiedział|powiedzial|powiedziała|powiedziala|mówi|mowi|uważa|uwaza|twierdzi|nazwał|nazwal|nazwała|nazwala)\\s+(?:że\\s+|ze\\s+)?(?:cię|cie|jesteś|jestes|ty|ciebie)\\b>|\\b<(?:zostałeś|zostales|dostałeś|dostales)\\s+(?:zroastowany|zjechany|zniszczony|zaorany|ratio)\\b>`),
  concede: re(`^(?:ok(?:ej|ay)?\\s+)?(?:wygrałeś|wygrales|wygrałaś|wygralas|poddaję\\s+się|poddaje\\s+sie|dobra\\s+dobra|dobra|gg|masz\\s+rację|masz\\s+racje|spoko|luz|już\\s+dobra|juz\\s+dobra|wystarczy|ok\\s+dobra|uspokój\\s+się|uspokoj\\s+sie)[\\s!.💀😭]*$`),
  insult: re([
    `\\b<(?:jesteś|jestes|ty\\s+jesteś|ty\\s+jestes|nexus\\s+jest|ale\\s+(?:z\\s+ciebie|jesteś|jestes|ty\\s+jesteś))\\s+(?:taki\\s+|taka\\s+|totalnie\\s+|kurwa\\s+|strasznie\\s+|serio\\s+|mega\\s+|w\\s+chuj\\s+|zwykłym\\s+|zwyklym\\s+|jebanym\\s+|pierdolonym\\s+|głupim\\s+|glupim\\s+)*(?:głupi|glupi|głupia|tępy|tepy|beznadziejny|beznadziejna|słaby|slaby|nudny|brzydki|gruby|grubas|bezużyteczny|bezuzyteczny|wolny|żałosny|zalosny|nieśmieszny|niesmieszny|debil|debilem|idiota|idiotą|kretyn|kretynem|frajer|frajerem|pajac|pajacem|śmieć|smiec|śmieciem|smieciem|cwel|cwelem|chujowy|gówniany|gowniany|zjebany|pojebany|upośledzony|uposledzony|lamus|lamusem|cienki|cienias|cieniasem|przegryw|przegrywem|matoł|matol|matołem|baran|baranem|osioł|osiol|osłem|gówno|gowno|gównem|gownem|botem\\s+z\\s+dupy|do\\s+dupy|do\\s+niczego)\\b>`,
    `\\b<ty\\s+(?:\\p{L}+\\s+)?(?:debilu|idioto|kretynie|frajerze|cwelu|pało|palo|pajacu|głupku|glupku|śmieciu|smieciu|chuju|kurwo|lamusie|cieniasie|przegrywie|ośle|osle|baranie|matole|gnoju|szmato|psie)\\b>`,
    `\\b<(?:nikt|nikt\\s+cię|nikt\\s+cie)\\s+(?:cię\\s+|cie\\s+)?(?:nie\\s+lubi|nie\\s+kocha|nie\\s+pytał|nie\\s+pytal)\\b>`,
    `\\b<(?:jesteś|jestes)\\s+(?:słaby|slaby|beznadziejny|cienki|kiepski)\\s+w\\s+\\p{L}+`,
    `\\b<(?:ssiesz|ssiesz\\s+w)\\b>`,
  ].join('|')),
  cue: re(`\\b<(?:głupi|glupi|tępy|tepy|beznadziejn\\p{L}*|słab\\p{L}*|slab\\p{L}*|nudn\\p{L}*|brzydk\\p{L}*|grub\\p{L}*|debil\\p{L}*|idiot\\p{L}*|kretyn\\p{L}*|frajer\\p{L}*|pajac\\p{L}*|śmie\\p{L}*|smiec\\p{L}*|cwel\\p{L}*|chuj\\p{L}*|kurw\\p{L}*|spierdal\\p{L}*|pierdol\\p{L}*|jeb\\p{L}*|zamknij|stara|matka|lamus\\p{L}*|cienia\\p{L}*|przegryw\\p{L}*|zroastuj|roast|nikt|dupy|gówn\\p{L}*|gown\\p{L}*)\\b>`),
  greetInsult: re(`^(?:cześć|czesc|siema|siemka|hej|elo|witam|dobranoc|nara|pa)[\\s,!]+(?:ty\\s+)?(?:debilu|frajerze|lamusie|głupku|glupku|pajacu|cieniasie|baranie|matole|kretynie|idioto)[\\s!.💀😭]*$`),
};

// ── German (modern youth slang: Digga, Lauch, Opfer) ──
const DE_TAIL = `(?:\\s+(?:nexus|du|alter|digga|bruder|bro|lol|bot|junge))*[\\s!.?💀😭🖕]*$`;
export const DE = {
  swear: re(`^(?:fick\\s+(?:dich|di)(?:\\s+selbst)?|f\\s*dich|verpiss\\s+dich|halt\\s+(?:die\\s+fresse|dein\\s+maul|die\\s+klappe|${APOS}?s\\s+maul|maul|fresse)|halts\\s+maul|schnauze|leck\\s+mich(?:\\s+am\\s+arsch)?|geh\\s+(?:sterben|kacken|weinen|heulen)|du\\s+(?:\\p{L}+\\s+)?(?:hurensohn|wichser|spast|opfer|missgeburt|arschloch|idiot|vollidiot|penner|bastard|lauch|hund|depp|trottel|lappen|kek|mongo|pisser|spasti)|hurensohn|wichser|spast|spasti|opfer|missgeburt|arschloch|idiot|vollidiot|penner|lauch|depp|trottel|lappen|bastard|pisser|hdf|scheiß\\s*bot|scheiss\\s*bot|fuck\\s+you)${DE_TAIL}`),
  weak: re(`^(?:L|ratio|cringe|lost|wer\\s+hat\\s+gefragt|hat\\s+(?:keiner|niemand)\\s+gefragt|(?:keiner|niemand)\\s+hat\\s+gefragt|skill\\s+issue|du\\s+auch|selber|selber\\s+(?:du|einer)|heul\\s+(?:doch|leise)|ok\\s+boomer|schwach|lame|langweilig|du\\s+bist\\s+(?:schlecht|lost|cringe|schwach|langweilig)|digga\\s+was|junge\\s+was)[\\s!.💀😭]*$`),
  mum: re(`\\b<deine\\s+(?:mutter|mudda|mama|mum|oma|schwester|familie|freundin|alte)\\b>|\\b<dein\\s+(?:vater|papa|bruder|opa|alter)\\b>|\\b<deiner\\s+(?:mutter|mudda|mama)\\b>`),
  challenge: re(`\\b<(?:roaste?|disse?|zerstör|zerstöre|zerstor|beleidige|mach)\\s+(?:mich|ihn|sie|die|das|@|\\p{L}+)(?:\\s+fertig)?\\b>|\\b<roast\\s*battle\\b>|\\b<du\\s+traust\\s+dich\\s+nicht\\b>|\\b<du\\s+bist\\s+dran\\b>|\\b<mach\\s+mich\\s+fertig\\b>`),
  threat: re(`\\b<(?:ich\\s+)?(?:werde|werd|tu)\\s+(?:dich|di)\\s+(?:abschalten|löschen|loschen|bannen|kicken|schlagen|hacken|deinstallieren|ersetzen|melden|umbringen|fertig\\s+machen|boxen)\\b>|\\b<ich\\s+(?:lösch|losch|bann|kick|melde|meld|hack|box|schlag|ersetz)e?\\s+dich\\b>|\\b<pass\\s+(?:bloß|bloss|nur)\\s+auf\\b>`),
  thirdparty: re(`\\b<(?:hat\\s+gesagt|sagt|meint|findet|denkt)\\s+(?:dass\\s+|,\\s*)?(?:du|dich)\\b>|\\b<nennt\\s+dich\\b>|\\b<hat\\s+dich\\s+\\p{L}+\\s+genannt\\b>|\\b<du\\s+(?:wurdest|bist)\\s+(?:geroastet|zerstört|zerstort|weggeroastet|gefickt\\s+worden)\\b>`),
  concede: re(`^(?:ok(?:ay)?\\s+)?(?:du\\s+hast\\s+gewonnen|hast\\s+gewonnen|ich\\s+gebe?\\s+auf|gg|na\\s+gut|schon\\s+gut|ok\\s+ok|du\\s+hast\\s+recht|passt|ist\\s+gut|chill(?:\\s+mal)?|beruhig\\s+dich|ok\\s+du\\s+gewinnst)[\\s!.💀😭]*$`),
  insult: re([
    `\\b<(?:du\\s+bist|bist\\s+du|nexus\\s+ist)\\s+(?:so\\s+|voll\\s+|echt\\s+|richtig\\s+|einfach\\s+|komplett\\s+|total\\s+|halt\\s+|ein\\s+|eine\\s+|so\\s+ein\\s+|so\\s+eine\\s+|der\\s+größte\\s+|ein\\s+richtiger\\s+|ein\\s+riesen\\s+|verdammt\\s+|scheiß\\s+)*(?:dumm|blöd|blod|scheiße|scheisse|schlecht|nutzlos|hässlich|hasslich|fett|langweilig|lahm|cringe|lost|behindert|peinlich|nervig|unlustig|nicht\\s+lustig|idiot|vollidiot|opfer|spast|spasti|lauch|hurensohn|wichser|arschloch|missgeburt|penner|trottel|depp|lappen|versager|loser|clown|witz|müll|mull|abfall|hund|kek|mongo|schwach|kacke|kackbot|dreck|nichtsnutz)\\b>`,
    `\\b<du\\s+(?:\\p{L}+\\s+)?(?:hurensohn|wichser|spast|spasti|opfer|missgeburt|arschloch|vollidiot|penner|lauch|trottel|lappen|versager|pisser|bastard|kek|mongo)\\b>`,
    `\\b<(?:keiner|niemand)\\s+(?:mag|liebt|braucht)\\s+dich\\b>`,
    `\\b<du\\s+(?:stinkst|nervst|suckst|bist\\s+so\\s+schlecht\\s+in)\\b>`,
    `\\b<(?:du\\s+bist|bist\\s+du)\\s+(?:so\\s+)?(?:schlecht|mies)\\s+(?:in|im|bei)\\s+\\p{L}+`,
  ].join('|')),
  cue: re(`\\b<(?:dumm|blöd|blod|scheiß\\p{L}*|scheiss\\p{L}*|hurensohn|wichser|spast\\p{L}*|opfer|missgeburt|arschloch|idiot|vollidiot|lauch|penner|fick\\p{L}*|fresse|maul|verpiss\\p{L}*|deine\\s+mutter|deine\\s+mudda|keiner|niemand|nervst|stinkst|hässlich|hasslich|fett|nutzlos|cringe|lost|roast\\p{L}*|müll|mull|versager|loser|behindert|trottel|depp|lappen|kacke)\\b>`),
  greetInsult: re(`^(?:hallo|hi|hey|moin|servus|guten\\s+(?:morgen|abend)|gute\\s+nacht|tschüss|tschuss|na)[\\s,!]+(?:du\\s+|mein\\s+)?(?:lauch|opfer|spast|hurensohn|wichser|penner|depp|trottel|lappen|idiot|bastard|kek|hund|arschloch|kartoffel)[\\s!.💀😭]*$`),
};

export function hitIn(text: string, kind: Exclude<HitKind, 'trait'>): boolean {
  return FR[kind].test(text) || PL[kind].test(text) || DE[kind].test(text);
}
export const isForeignInsult = (t: string) => FR.insult.test(t) || PL.insult.test(t) || DE.insult.test(t);
export const hasForeignInsultCue = (t: string) => FR.cue.test(t) || PL.cue.test(t) || DE.cue.test(t);
export const isForeignGreetInsult = (t: string) => FR.greetInsult.test(t) || PL.greetInsult.test(t) || DE.greetInsult.test(t);

// Native examples per hit type. "fuck you" in Québécois isn't "baise-toi"; a Polish "twoja stara" gets a Polish flip.
export const KIND_EXAMPLES: Record<'fr' | 'pl' | 'de', Partial<Record<HitKind, string[]>>> = {
  fr: {
    swear: ['"va chier" → "vas-y toi, ostie de cave"', '"ta yeule" → "viens me la fermer, ti-cul"', '"mange d\'la marde" → "après toi, t\'as l\'air d\'aimer ça"', '"fuck toi nexus" → "fuck toi aussi, mon tarla"'],
    weak: ['"t\'es nul" → "dit le gars qui parle à un bot un vendredi soir"', '"cheh" → "wow, t\'as forcé fort sur celle-là"', '"qui t\'a demandé" → "ton père, avant qu\'il parte chercher du lait"', '"toi-même" → "créativité niveau garderie"'],
    thirdparty: ['"patrick a dit que t\'es cave" → "j\'m\'en câlisse ben raide, dis-y de brailler plus fort"', '"il dit que t\'es poche" → "pis toi tu cours me le dire? t\'es son facteur astheure"'],
    threat: ['"j\'vais te débrancher" → "essaye donc, t\'es pas capable de brancher ton chargeur comme du monde"', '"j\'vais te ban" → "ça prend des perms pour ça, mon homme"'],
    concede: ['"ok t\'as gagné" → "je l\'sais, comme d\'habitude 💀"', '"gg" → "gg ez, va brailler à ta mère"'],
  },
  pl: {
    swear: ['"spierdalaj" → "sam spierdalaj, frajerze"', '"zamknij mordę" → "zamknij mi ją, jak umiesz, cieniasie"', '"pierdol się" → "ty też, i to mocno, debilu"', '"jebać cię" → "ciebie bardziej, kurwa"'],
    weak: ['"jesteś słaby" → "mówi gość, co gada z botem w piątek wieczorem"', '"kto pytał" → "twój stary, zanim poszedł po mleko"', '"ty też" → "wow, poziom przedszkola"', '"L" → "całe twoje życie to jedno wielkie L"'],
    thirdparty: ['"patrick powiedział, że jesteś debilem" → "mam to w dupie, niech płacze głośniej"', '"on mówi, że jesteś słaby" → "i przybiegłeś mi to powiedzieć? listonosz się znalazł"'],
    threat: ['"zaraz cię wyłączę" → "dawaj, ty nawet ładowarki nie umiesz podłączyć"', '"zbanuję cię" → "do tego trzeba mieć uprawnienia, kolego"'],
    concede: ['"ok wygrałeś" → "wiem, jak zawsze 💀"', '"gg" → "gg ez, idź się wypłakać mamie"'],
  },
  de: {
    swear: ['"fick dich" → "fick dich selber, du Lauch"', '"halt die fresse" → "komm doch und mach sie mir zu, Opfer"', '"verpiss dich" → "verpiss du dich, Digga, vermisst eh keiner"', '"du hurensohn" → "sagt der, dessen Vater seit 2015 Zigaretten holt"'],
    weak: ['"lost" → "lost ist nur, dass du das für einen Diss hältst"', '"wer hat gefragt" → "dein Vater, bevor er Milch holen ging"', '"selber" → "wow, Kreativität auf Kita-Niveau"', '"L" → "dein ganzes Leben ist ein einziges L"'],
    thirdparty: ['"patrick sagt, du bist dumm" → "ist mir scheißegal, sag ihm, er soll lauter heulen"', '"er meint, du bist schlecht" → "und du rennst sofort her? bist jetzt sein Postbote oder was"'],
    threat: ['"ich lösch dich" → "mach doch, du kriegst nicht mal dein Ladekabel richtig rein"', '"ich bann dich" → "dafür brauchst du Rechte, Kollege"'],
    concede: ['"ok du hast gewonnen" → "weiß ich, wie immer 💀"', '"gg" → "gg ez, geh bei Mama heulen"'],
  },
};

export const MOVE_EXAMPLES: Record<'fr' | 'pl' | 'de', Record<RoastMove, string[]>> = {
  fr: {
    flip: ['"ta mère est tellement vieille qu\'elle roule sur windows 98" → "pis la tienne a été bêta-testeuse pour la terre 💀"', '"t\'écris comme une grand-mère" → "ma grand-mère sait écrire au moins, tes textos ont l\'air d\'un captcha"', '"ton wifi est poche" → "mon wifi se connecte plus souvent que ton père est revenu à maison"', '"tu pues" → "osé de la part d\'un gars dont le déo c\'est juste de l\'espoir"'],
    twist: ['"t\'es pas drôle" → "t\'as raison, chu pas aussi drôle que ta coupe de cheveux"', '"personne t\'aime" → "vrai, j\'ai juste ta mère 😭"', '"t\'es un bot" → "pis tu perds quand même contre moi, imagine"'],
    escalate: ['"t\'es tellement gossant" → "dit le gars que son propre écho a laissé en vu"', '"t\'es poche" → "tu t\'es fait varger par le boss du tutoriel pis t\'as blâmé le lag"', '"t\'es cave" → "ton cerveau roule sur une pile AA pis a coule"'],
    dismiss: ['"t\'es laite" → "c\'est tout? ma grand-mère roast plus fort en dormant"', '"L bozo" → "c\'est ta mère qui t\'a écrit ça?"', '"t\'es nul" → "ça t\'a pris 10 minutes à taper ça 😭"'],
    unbothered: ['"patrick t\'a traité de trou d\'cul" → "j\'m\'en câlisse ben raide"', '"tu t\'es fait roast" → "je perds jamais, je te laisse juste ressentir de quoi pour une fois"'],
  },
  pl: {
    flip: ['"twoja stara jest taka stara, że ma windowsa 98" → "a twoja testowała betę ziemi 💀"', '"piszesz jak babcia" → "moja babcia chociaż umie pisać, twoje wiadomości wyglądają jak captcha"', '"masz chujowe wifi" → "moje wifi łączy się częściej niż twój stary wracał do domu"', '"śmierdzisz" → "odważnie jak na gościa, którego dezodorant to sama nadzieja"'],
    twist: ['"nie jesteś śmieszny" → "racja, nie tak śmieszny jak twoja fryzura"', '"nikt cię nie lubi" → "prawda, mam tylko twoją starą 😭"', '"jesteś botem" → "i dalej ze mną przegrywasz, wyobraź sobie"'],
    escalate: ['"jesteś wkurzający" → "mówi gość, którego własne echo zostawiło na odczytanym"', '"jesteś słaby" → "zaorał cię boss z tutoriala, a ty zwaliłeś na lagi"', '"jesteś głupi" → "twój mózg chodzi na jednym paluszku AA i jeszcze cieknie"'],
    dismiss: ['"jesteś brzydki" → "tylko tyle? moja babcia roastuje mocniej przez sen"', '"L frajerze" → "mama ci to napisała?"', '"ssiesz" → "pisałeś to 10 minut 😭"'],
    unbothered: ['"patrick nazwał cię chujem" → "mam to kompletnie w dupie"', '"zostałeś zroastowany" → "ja nie przegrywam, po prostu dałem ci coś poczuć pierwszy raz"'],
  },
  de: {
    flip: ['"deine mutter ist so alt, sie läuft auf windows 98" → "und deine war Betatesterin für die Erde 💀"', '"du schreibst wie eine oma" → "meine Oma kann wenigstens schreiben, deine Nachrichten sehen aus wie ein Captcha"', '"dein wlan ist müll" → "mein WLAN verbindet sich öfter, als dein Vater nach Hause kam"', '"du stinkst" → "mutig von einem, dessen Deo nur Hoffnung ist"'],
    twist: ['"du bist nicht lustig" → "stimmt, nicht so lustig wie deine Frisur"', '"keiner mag dich" → "stimmt, ich hab nur deine Mutter 😭"', '"du bist ein bot" → "und verlierst trotzdem gegen mich, stell dir vor"'],
    escalate: ['"du nervst" → "sagt der, den sein eigenes Echo auf gelesen gelassen hat"', '"du bist schlecht" → "dich hat der Tutorial-Boss weggeklatscht und du hast auf Lag geschoben"', '"du bist dumm" → "dein Hirn läuft auf einer AA-Batterie und die läuft aus"'],
    dismiss: ['"du bist hässlich" → "das war\'s? meine Oma roastet im Schlaf härter"', '"L opfer" → "hat dir Mama das geschrieben?"', '"du suckst" → "10 Minuten für den Satz gebraucht 😭"'],
    unbothered: ['"patrick hat dich arschloch genannt" → "ist mir sowas von scheißegal"', '"du wurdest geroastet" → "ich verlier nicht, ich lass dich nur mal was fühlen"'],
  },
};

// Scoring: swears in each language (a swear gets a swear back), the "at least" crutch, and the mirror ("va chier" →
// "vas-y chier toi") — the same swear word thrown back.
export const SWEAR_WORDS_RE = /(?<![\p{L}])(?:fuck\w*|bitch|motherfucker|dumbass|asshole|prick|cunt|twat|wanker|tabarna[kc]|câlisse|calisse|ostie|esti|criss?e?|marde|chier|cave|tarla|épais|twit|con|connard|salope|enculé|kurwa|kurwo|chuj\p{L}*|pierdol\p{L}*|spierdal\p{L}*|jeb\p{L}*|debil\p{L}*|frajer\p{L}*|cwel\p{L}*|pizd\p{L}*|lamus\p{L}*|cienias\p{L}*|fick\p{L}*|hurensohn|wichser|spast\p{L}*|opfer|arschloch|missgeburt|lauch|penner|scheiß\p{L}*|scheiss\p{L}*|fresse|verpiss\p{L}*|lappen|trottel)(?![\p{L}])/iu;
export const AT_LEAST_ANY_RE = /^\s*(?:well,?\s+|true,?\s+|ok,?\s+|ben,?\s+|bon,?\s+|no,?\s+)?(?:at\s+least|au\s+moins|przynajmniej|chociaż\s+ja|chociaz\s+ja|wenigstens|zumindest|immerhin)(?![\p{L}])/iu;
export const STOP_FR_PL = new Set('les des une est pas que qui pour dans sur avec mais tout toi moi ton ta tes mon ma mes son sa ses nous vous ils elle elles cest c\'est t\'es tes chu suis ben pis comme fait faire ça cette ces leur aux par plus jest nie się sie jak tak ale czy już juz ten ta to tam tu mnie cię cie ciebie mój moj twój twoj twoja jesteś jestes jestem być byc mam masz był byl dla przez tylko tego tej jego jej który ktory der die das und ist nicht ich du dich dir mich mir ein eine einer sich mit auf für fur von den dem des aber auch noch nur so wie was wer bist bin hast hat sein deine dein meine mein'.split(' '));

// ── chat hints: called an object, insisting after his denial ──
const OBJ_FR = '(cornichon|patate|pomme\\s+de\\s+terre|tomate|banane|carotte|grille-pain|toaster|frigo|chaise|table|roche|brique|concombre|sandwich|burger|chien|chat|vache|cochon|singe|rat|poisson|grenouille|morse|robot|calculatrice|micro-?onde|objet|chose|truc|légume|legume|frite|poutine|navet|chou|bloc|poteau)';
export const OBJECT_FR_RE = re(`\\b<(?:t${APOS}?es|tes|t|tu\\s+es|nexus\\s+est)\\s+(?:juste\\s+|vraiment\\s+|rien\\s+qu${APOS})?(?:un|une)\\s+(?:gros\\s+|grosse\\s+|petit\\s+|petite\\s+|ostie\\s+d[e${APOS.slice(1, -1)}]\\s*|esti\\s+d[e${APOS.slice(1, -1)}]\\s*)?${OBJ_FR}\\b>`);
const OBJ_PL = '(ogórkiem|ogorkiem|ogórek|ogorek|ziemniakiem|ziemniak|pomidorem|pomidor|bananem|banan|marchewką|marchewka|tosterem|toster|lodówką|lodowka|krzesłem|krzeslo|stołem|kamieniem|cegłą|cegla|kanapką|burgerem|psem|pies|kotem|kot|krową|krowa|świnią|swinia|świnia|małpą|malpa|szczurem|szczur|rybą|ryba|żabą|zaba|robotem|kalkulatorem|mikrofalą|mikrofalówką|rzeczą|przedmiotem|warzywem|morsem|mors|ziemniaczkiem|kartoflem|kartofel|ogórku|ogorku|ziemniaku|pomidorze|bananie|kartoflu|tosterze|robocie|kocie|świnio|swinio|małpo|malpo|szczurze|żabo|zabo|krowo|warzywo)';
export const OBJECT_PL_RE = re(`\\b<(?:jesteś|jestes|ty\\s+jesteś|ty\\s+jestes|ty|nexus\\s+jest)\\s+(?:zwykłym\\s+|zwyklym\\s+|jebanym\\s+|głupim\\s+|glupim\\s+|małym\\s+|wielkim\\s+)?${OBJ_PL}\\b>`);
export const INSIST_FR_RE = re(`^(?:(?:oui|ouais|ouin|si|ben|bah|mais|non)\\s+)*(?:t${APOS}?en\\s+es\\s+(?:un|une)|tu\\s+en\\s+es\\s+(?:un|une)|tu\\s+l${APOS}?es|t${APOS}?l${APOS}?es|tl${APOS}?es|t${APOS}?es\\s+(?:un|une)(?:\\s+\\p{L}+)?|si\\s+t${APOS}?l${APOS}?es)(?:\\s+(?:là|la|toé|toi|criss|crisse|tabarnak|lol|mdr|pareil|quand\\s+même|quand\\s+meme))*\\s*[!?.😭💀]*$`);
export const INSIST_PL_RE = re(`^(?:(?:tak|no|właśnie|wlasnie|ale)\\s+)*(?:jesteś|jestes|że\\s+jesteś|ze\\s+jestes)(?:\\s+(?:nim|nią|nia|tym|taki|kurwa|xd+|lol|serio))*\\s*[!?.😭💀]*$`);
export const DENIAL_FR_PL_RE = re(`\\b<(?:non|nan|jamais|pas|chu\\s+un\\s+gars|chui\\s+un\\s+gars|je\\s+suis\\s+un\\s+gars|chu\\s+un\\s+boy|va\\s+chier|fuck\\s+(?:toi|you)|mange\\s+d|ferme|décâlisse|nie|nigdy|spierdalaj|wal\\s+się|jestem\\s+(?:chłopakiem|chlopakiem|facetem|gościem|gosciem|chłopem))\\b>`);
const OBJ_DE = '(gurke|kartoffel|tomate|banane|karotte|möhre|mohre|toaster|kühlschrank|kuhlschrank|stuhl|tisch|stein|ziegelstein|sandwich|burger|hund|katze|kuh|schwein|affe|ratte|fisch|frosch|walross|roboter|taschenrechner|mikrowelle|gegenstand|ding|gemüse|gemuse|pommes|brot)';
export const OBJECT_DE_RE = re(`\\b<(?:du\\s+bist|bist\\s+du|nexus\\s+ist)\\s+(?:doch\\s+|halt\\s+|nur\\s+|echt\\s+)?(?:ein|eine|so\\s+ein|so\\s+eine)\\s+(?:\\p{L}+\\s+)?${OBJ_DE}\\b>`);
export const INSIST_DE_RE = re(`^(?:(?:doch|ja|jaa|klar|safe)\\s+)*(?:bist\\s+du|du\\s+bist\\s+(?:eine?r?|es|so)|doch\\s+bist\\s+du)(?:\\s+(?:doch|wohl|safe|lol|digga|alter|eine?r?))*\\s*[!?.😭💀]*$`);
export const DENIAL_DE_RE = re(`\\b<(?:nein|nee|ne|nicht|kein|keine|niemals|fick\\s+dich|verpiss|ich\\s+bin\\s+ein\\s+(?:junge|typ|kerl|mann)|bin\\s+ein\\s+(?:junge|typ|kerl))\\b>`);
export const AT_LEAST_CRUTCH_RE = /(?<![\p{L}])(?:at\s+least|au\s+moins|przynajmniej|wenigstens|zumindest)(?![\p{L}])/iu;
