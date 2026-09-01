import { KnowledgeItem } from '../../types';

// Native Polish-language content, not just Polish keywords bolted onto English text (the pattern
// used elsewhere in the corpus, e.g. worldCapitalsAndCountries.ts). Directly tested this session
// (via embed() in localLlmClient.ts) that this system's embedding model has essentially no real
// cross-lingual semantic alignment for Polish<->English — cosine similarity between "czarna
// dziura" and its correct translation "black hole" (0.361) came out LOWER than similarity to a
// totally unrelated control phrase (0.380). That means a Polish query retrieving only English
// corpus content is relying on BM25 keyword overlap alone (which does work, since keywords are
// bilingual), not on any real vector-space understanding that the two languages are talking about
// the same thing — and even where BM25 finds the right document, the grounding content itself
// being in English forces the model to translate on the fly mid-generation, which is exactly the
// kind of extra unforced work that produces subtly worse or more halting phrasing. Writing the
// content natively in Polish for a handful of genuinely high-traffic topics removes that
// translation step entirely and gives the embedding model actual Polish text to embed and match
// against, rather than depending on cross-lingual alignment that this system doesn't reliably have.
export const POLISH_LANGUAGE_CONTENT_CORPUS: KnowledgeItem[] = [
  {
    id: 'kb-pl-fotosynteza',
    title: 'Fotosynteza — jak rośliny wytwarzają energię ze światła',
    category: 'science',
    keywords: [
      'fotosynteza',
      'jak działa fotosynteza',
      'co to jest fotosynteza',
      'jak rośliny wytwarzają energię',
      'jak rośliny robią tlen',
      'proces fotosyntezy',
    ],
    content: `Fotosynteza to proces, w którym rośliny, glony i niektóre bakterie zamieniają energię światła słonecznego w energię chemiczną, magazynowaną w postaci cukru (glukozy). Zachodzi głównie w liściach, w wyspecjalizowanych organellach zwanych chloroplastami, które zawierają zielony barwnik — chlorofil — odpowiedzialny za pochłanianie światła (i za to, że rośliny są zielone, bo odbijają akurat ten kolor). Uproszczone równanie fotosyntezy wygląda tak: dwutlenek węgla (CO2) pobrany z powietrza przez małe otworki w liściach zwane aparatami szparkowymi, plus woda (H2O) pobrana przez korzenie, przy udziale energii świetlnej, dają glukozę (C6H12O6) oraz tlen (O2) jako produkt uboczny. Ten tlen jest uwalniany do atmosfery — to właśnie dzięki fotosyntezie roślin i glonów w oceanach mamy tlen do oddychania. Proces dzieli się na dwie główne fazy: fazę jasną (zależną od światła, zachodzącą w błonach tylakoidów, gdzie energia świetlna zamieniana jest na ATP i NADPH) oraz fazę ciemną, czyli cykl Calvina (niezależną bezpośrednio od światła, gdzie ATP i NADPH są wykorzystywane do budowy cząsteczek glukozy z CO2). Fotosynteza jest fundamentem niemal wszystkich łańcuchów pokarmowych na Ziemi — rośliny są producentami, którzy przekształcają energię słoneczną w formę, którą mogą wykorzystać zwierzęta zjadające te rośliny (i dalej — zwierzęta zjadające te zwierzęta).`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-pl-czarna-dziura',
    title: 'Czarne dziury — czym naprawdę są i jak powstają',
    category: 'science',
    keywords: [
      'czarna dziura',
      'czarne dziury',
      'co to jest czarna dziura',
      'jak powstaje czarna dziura',
      'horyzont zdarzeń',
      'jak działają czarne dziury',
    ],
    content: `Czarna dziura to obszar w przestrzeni kosmicznej, gdzie grawitacja jest tak silna, że nic — nawet światło — nie jest w stanie się z niego wydostać. Nie jest to "dziura" w sensie dosłownym ani jakiś kosmiczny odkurzacz zasysający wszystko dookoła — to po prostu ogromna masa skupiona w bardzo małej objętości, powodująca ekstremalne zakrzywienie czasoprzestrzeni zgodnie z ogólną teorią względności Einsteina. Większość znanych czarnych dziur powstaje, gdy bardzo masywna gwiazda (co najmniej kilkadziesiąt razy masywniejsza od Słońca) zużyje całe swoje paliwo jądrowe i zapada się pod wpływem własnej grawitacji podczas eksplozji supernowej — jądro gwiazdy kurczy się do punktu o teoretycznie nieskończonej gęstości, zwanego osobliwością. Granica, poza którą nic nie może już uciec, nazywana jest horyzontem zdarzeń — to nie jest fizyczna powierzchnia, tylko punkt bez powrotu. Istnieją też znacznie większe supermasywne czarne dziury, miliony lub miliardy razy masywniejsze od Słońca, które znajdują się w centrach niemal wszystkich dużych galaktyk, w tym naszej Drogi Mlecznej (nazywana Sagittarius A*). Mimo że nic nie może uciec spod horyzontu zdarzeń, same czarne dziury można wykryć pośrednio — obserwując, jak ich grawitacja wpływa na pobliskie gwiazdy i gaz, oraz dzięki pierwszemu bezpośredniemu zdjęciu cienia czarnej dziury, opublikowanemu w 2019 roku przez konsorcjum Event Horizon Telescope.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-pl-sztuczna-inteligencja',
    title: 'Sztuczna inteligencja — czym jest i jak działa',
    category: 'ai-tech',
    keywords: [
      'sztuczna inteligencja',
      'co to jest sztuczna inteligencja',
      'jak działa ai',
      'jak działa sztuczna inteligencja',
      'czym jest ai',
      'co to jest uczenie maszynowe',
    ],
    content: `Sztuczna inteligencja (AI, od angielskiego "artificial intelligence") to szeroka dziedzina informatyki zajmująca się tworzeniem systemów zdolnych do wykonywania zadań, które normalnie wymagają ludzkiej inteligencji — rozpoznawania wzorców, rozumienia języka, podejmowania decyzji czy uczenia się na podstawie danych. Warto rozróżnić kilka pojęć, które często są mylone: sztuczna inteligencja to najszersza kategoria, uczenie maszynowe (machine learning) to jej poddziedzina, w której systemy uczą się na podstawie danych zamiast być ręcznie zaprogramowane na każdy przypadek, a głębokie uczenie (deep learning) to dalsza poddziedzina uczenia maszynowego wykorzystująca sieci neuronowe złożone z wielu warstw, inspirowane (bardzo luźno) budową ludzkiego mózgu. Współczesne duże modele językowe (LLM, jak te napędzające chatboty) są trenowane na ogromnych ilościach tekstu i uczą się przewidywać najbardziej prawdopodobne kolejne słowo w zdaniu — z tego prostego mechanizmu, przy odpowiedniej skali, wyłaniają się zaskakująco zaawansowane zdolności do rozumowania i generowania spójnego tekstu. Ważne jest jednak, że te modele nie "myślą" ani nie "rozumieją" w ludzkim sensie tego słowa — nie mają świadomości ani rzeczywistej wiedzy o świecie, tylko statystyczne wzorce wyuczone z danych treningowych, co oznacza, że mogą z pełnym przekonaniem podawać nieprawdziwe informacje (zjawisko nazywane "halucynacją"). AI dzieli się też na wąską (specjalizującą się w jednym konkretnym zadaniu, jak rozpoznawanie twarzy czy gra w szachy — to jedyny rodzaj AI, który realnie istnieje dzisiaj) oraz hipotetyczną ogólną sztuczną inteligencję (AGI), która dorównywałaby lub przewyższała ludzi we wszystkich dziedzinach jednocześnie — coś, co na razie pozostaje w sferze badań i spekulacji, a nie rzeczywistości.`,
    createdAt: Date.now(),
  },
  {
    id: 'kb-pl-grawitacja',
    title: 'Grawitacja — dlaczego rzeczy spadają i planety krążą po orbitach',
    category: 'Physics',
    keywords: [
      'grawitacja',
      'co to jest grawitacja',
      'jak działa grawitacja',
      'dlaczego rzeczy spadają',
      'siła grawitacji',
      'prawo powszechnego ciążenia',
    ],
    content: `Grawitacja to jedna z czterech podstawowych sił fizyki — ta, dzięki której przedmioty spadają na ziemię, planety krążą wokół gwiazd, a księżyc krąży wokół Ziemi. W klasycznym opisie Isaaca Newtona (prawo powszechnego ciążenia, 1687 rok) każde dwa obiekty posiadające masę przyciągają się nawzajem siłą proporcjonalną do iloczynu ich mas i odwrotnie proporcjonalną do kwadratu odległości między nimi — im większa masa, tym silniejsze przyciąganie, a im większa odległość, tym słabsze. To dlatego Ziemia (ogromna masa) przyciąga nas ku sobie znacznie silniej niż na przykład pobliski budynek, mimo że technicznie każdy obiekt z masą przyciąga każdy inny. Nowocześniejszy i dokładniejszy opis pochodzi z ogólnej teorii względności Alberta Einsteina (1915 rok), według której grawitacja nie jest w istocie "siłą" w tradycyjnym sensie, lecz efektem zakrzywienia czasoprzestrzeni przez masę i energię — masywny obiekt, jak gwiazda, zakrzywia przestrzeń wokół siebie, a inne obiekty poruszające się w tej zakrzywionej przestrzeni podążają po torach, które z naszej perspektywy wyglądają jak przyciąganie grawitacyjne. Opis Einsteina jest potrzebny do dokładnego wyjaśnienia zjawisk ekstremalnych, jak zachowanie światła w pobliżu czarnych dziur czy drobne odchylenia w orbicie Merkurego, których teoria Newtona nie potrafiła w pełni wyjaśnić, choć dla większości codziennych zastosowań (jak obliczanie trajektorii pocisku czy budowanie mostu) prostsza fizyka Newtona nadal wystarcza. Grawitacja jest też najsłabszą z czterech podstawowych sił fizyki (obok elektromagnetyzmu oraz silnego i słabego oddziaływania jądrowego), ale jej zasięg jest nieskończony i zawsze działa przyciągająco, nigdy odpychająco, dlatego w dużej skali (planety, gwiazdy, galaktyki) to właśnie ona dominuje.`,
    createdAt: Date.now(),
  },
];
