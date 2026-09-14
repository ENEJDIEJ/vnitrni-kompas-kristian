import type { EmotionLesson } from "./emotionLessons";

export const NEEDS_LESSONS: EmotionLesson[] = [
  {
    day: 1,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Dlouho jsem řešil hlavně to, co mám udělat. Méně jsem zkoumal, co je pro mě důležité.",
      paragraphs: [
        "Když se ve mně objevilo napětí, šel jsem rovnou do akce. Snažil jsem se situaci vyřešit, získat kontrolu nebo rychle zjistit odpověď. Neptal jsem se, co se za tou reakcí ozývá.",
        "Postupně jsem začal zjišťovat, že emoce často ukazuje k něčemu, na čem mi záleží. Za nejistotou mohla být potřeba bezpečí. Za vztekem prostor rozhodovat o sobě. Za smutkem blízkost, o kterou jsem nechtěl přijít.",
        "Potřeba není hotové vysvětlení. Je to další vrstva, které se můžu zvědavě zeptat: Co je pro mě v téhle chvíli důležité?",
      ],
    },
    recognition: {
      title: "Možná to znáš i ty",
      items: [
        "Víš, co chceš udělat, ale nevíš, co se za tím ozývá.",
        "Čekáš, že druhý člověk pozná, co potřebuješ, aniž to pojmenuješ.",
        "Řešíš hlavně reakci a přeskočíš to, co je pro tebe důležité.",
      ],
    },
    education: {
      title: "Emoce může být stopa. Potřeba je jedna z možností, kam ta stopa vede.",
      paragraphs: [
        "Když se něco dotkne bezpečí, blízkosti, svobody, odpočinku, růstu nebo smyslu, může se změnit tvoje prožívání. Emoce sama ale neurčuje jedinou správnou potřebu.",
        "Proto dnes nehledáš definitivní odpověď. Zkoušíš jen jednu poctivou možnost. Co by v této chvíli mohlo být důležité právě pro tebe?",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-01-important.webp",
      alt: "Ručně kreslená postava sleduje stopu od emoce k tomu, co je pro ni důležité",
      caption: "Nemusíš hned vědět. Stačí se vydat po první stopě.",
    },
    expert: {
      field: "EMOCE A POTŘEBY",
      title: "Emoce může upozornit, že se změnil vztah k něčemu důležitému.",
      paragraphs: [
        "Prožívání nevzniká pouze z události. Ovlivňuje ho také význam situace, aktuální kapacita a to, na čem člověku záleží. Otázka po potřebě pomáhá tuto osobní důležitost zpřesnit.",
      ],
      limit: "Z jedné emoce nelze spolehlivě určit jednu konkrétní potřebu. Význam své zkušenosti určuješ ty.",
    },
    practice: {
      title: "Vrať se k jedné dnešní emoci a zkus pod ní najít důležitou věc.",
      why: "Nejde o správnou odpověď. Trénuješ zvědavost vůči tomu, co se v tobě ozývá.",
      steps: [
        "Vyber jednu konkrétní dnešní situaci.",
        "Pojmenuj emoci nebo tělesný signál, kterého sis všiml.",
        "Doplň větu: Možná je pro mě v této chvíli důležité…",
      ],
      prompt: "Co pro mě v této chvíli mohlo být důležité?",
      fields: [
        { id: "situation", label: "Co se stalo", type: "textarea", required: true },
        { id: "emotion", label: "Co jsem cítil nebo pozoroval v těle", type: "text", required: true },
        { id: "important", label: "Možná pro mě bylo důležité", type: "textarea", required: true },
      ],
    },
    closing: ["Potřeba není hotová odpověď.", "Je to otázka, která tě může přivést blíž k sobě."],
  },
  {
    day: 2,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Měl jsem pocit, že silný člověk má zvládnout všechno sám.",
      paragraphs: [
        "Dlouho pro mě bylo jednodušší postarat se o druhé než říct, že něco potřebuju já. Potřeba mi zněla jako závislost, slabost nebo další problém, který bych měl vyřešit bez pomoci.",
        "Jenže potřeby nezmizely tím, že jsem je nepojmenoval. Ozývaly se únavou, podrážděností, stažením i pocitem, že pořád dávám víc, než se mi vrací.",
        "Dospělost pro mě dnes neznamená nikoho nepotřebovat. Znamená všimnout si potřeby, převzít za ni svůj díl odpovědnosti a umět o ní mluvit.",
      ],
    },
    recognition: {
      title: "Kde se v tom můžeš poznat",
      items: [
        "O pomoc si řekneš až ve chvíli, kdy už nemůžeš.",
        "Odpočinek si dovolíš teprve po splnění všeho.",
        "Potřebu druhých bereš vážněji než vlastní.",
      ],
    },
    education: {
      title: "Potřeba není slabost ani důkaz, že něco nezvládáš.",
      paragraphs: [
        "Všichni lidé potřebují bezpečí, vztahy, možnost volby, odpočinek, růst a smysl. Rozdíl není v tom, kdo potřeby má. Rozdíl bývá v tom, jestli je člověk umí rozpoznat a jak s nimi zachází.",
        "Pojmenovaná potřeba ti nedává nárok řídit druhé. Dává ti přesnější informaci, se kterou můžeš hledat další krok.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-02-strength.webp",
      alt: "Ručně kreslená postava odkládá těžký batoh a přijímá pomocnou ruku",
      caption: "Síla nemusí znamenat nést všechno bez pomoci.",
    },
    expert: {
      field: "VZTAH K SOBĚ",
      title: "Ignorovaná potřeba nezmizí. Může se promítnout do kapacity i chování.",
      paragraphs: [
        "Když člověk dlouhodobě přehlíží spánek, vztahový kontakt, možnost ovlivnit situaci nebo prostor pro obnovu, může mít méně kapacity pro soustředění a regulaci reakcí.",
      ],
      limit: "Pojmenování potřeby samo o sobě neřeší dlouhodobou zátěž ani nebezpečné prostředí. Někdy je potřeba praktická změna nebo odborná pomoc.",
    },
    practice: {
      title: "Všimni si jedné potřeby, kterou u sebe obvykle zlehčuješ.",
      why: "Dnes ji nemusíš vyřešit. Stačí ji vzít vážně jako skutečnou informaci.",
      steps: [
        "Vyber chvíli, kdy sis řekl, že to přece zvládneš.",
        "Napiš, co jsi ve skutečnosti potřeboval.",
        "Zkus potřebu pojmenovat bez omluvy a bez soudu.",
      ],
      prompt: "Co potřebuju, i když jsem zvyklý všechno zvládat?",
      fields: [
        { id: "moment", label: "Chvíle, ve které jsem potřebu zlehčil", type: "textarea", required: true },
        { id: "need", label: "Co jsem ve skutečnosti potřeboval", type: "textarea", required: true },
        { id: "belief", label: "Co si o této potřebě obvykle říkám", type: "textarea" },
      ],
    },
    closing: ["Potřeba z tebe nedělá slabého člověka.", "Dává ti možnost zacházet se sebou poctivěji."],
  },
  {
    day: 3,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Když jsem měl pro potřeby víc slov, přestal jsem všechno nazývat jen nepohodou.",
      paragraphs: [
        "Někdy jsem potřeboval klid a bezpečí. Jindy blízkost, prostor rozhodnout se sám, odpočinek, pocit, že se někam posouvám, nebo vědomí, že to celé dává smysl.",
        "Když jsem tyto oblasti nerozlišoval, hledal jsem často stejné řešení na různé situace. Ještě víc pracovat. Ještě rychleji rozhodnout. Ještě chvíli vydržet.",
        "Jednoduchá mapa mi pomohla začít otázkou, do které rodiny moje dnešní potřeba patří.",
      ],
    },
    recognition: {
      title: "Jedna z těchto oblastí se možná ozývá i dnes",
      items: [
        "Potřebuješ víc jistoty, klidu nebo předvídatelnosti.",
        "Chybí ti kontakt, přijetí nebo pocit, že jsi slyšený.",
        "Toužíš po prostoru, odpočinku, růstu nebo větším smyslu.",
      ],
    },
    education: {
      title: "Pro první orientaci použijeme šest praktických rodin potřeb.",
      paragraphs: [
        "Rodiny nejsou test ani definitivní psychologická klasifikace. Jsou jednoduchou mapou, která ti pomůže začít.",
      ],
      bullets: [
        { title: "Bezpečí", text: "Stabilita, ochrana a předvídatelnost." },
        { title: "Blízkost", text: "Vztah, kontakt, přijetí a pocit, že někam patříš." },
        { title: "Autonomie", text: "Možnost volby a prostor rozhodovat o sobě." },
        { title: "Růst", text: "Učení, rozvoj a pocit, že něco zvládáš." },
        { title: "Péče o sebe", text: "Odpočinek, obnova a respekt k vlastní kapacitě." },
        { title: "Smysl", text: "Význam, soulad a vědomí, proč něco děláš." },
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-03-families.webp",
      alt: "Ručně kreslená mapa šesti cest k rodinám potřeb",
      caption: "Šest cest. Ne šest škatulek.",
    },
    expert: {
      field: "PRAKTICKÁ MAPA",
      title: "Kategorie zjednodušují orientaci, ale lidská zkušenost se často překrývá.",
      paragraphs: [
        "Jedna situace může současně zasáhnout více oblastí. Konflikt v práci se může dotknout bezpečí, autonomie i uznání. Proto je možné vybrat více možností a potom hledat, která je právě nejživější.",
      ],
      limit: "Mapa neříká, jaké potřeby máš mít. Je to pracovní pomůcka, kterou můžeš přizpůsobit vlastní zkušenosti.",
    },
    practice: {
      title: "Zařaď jednu dnešní potřebu do nejbližší rodiny.",
      why: "Širší rodina ti pomůže začít, i když ještě neznáš přesné slovo.",
      steps: [
        "Vrať se k jedné dnešní chvíli.",
        "Vyber jednu nebo dvě nejbližší rodiny.",
        "Napiš vlastní slovo, které ti dává největší smysl.",
      ],
      prompt: "Do které oblasti moje dnešní potřeba patří?",
      fields: [
        { id: "situation", label: "Moje dnešní situace", type: "textarea", required: true },
        { id: "families", label: "Nejbližší rodina nebo rodiny", type: "text", required: true, placeholder: "Například bezpečí a autonomie" },
        { id: "ownWord", label: "Moje vlastní přesnější slovo", type: "text", required: true },
      ],
    },
    closing: ["Mapa tě nemá zavřít do škatulky.", "Má ti nabídnout první místo, odkud se můžeš rozhlédnout."],
  },
  {
    day: 4,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Vztek nebyl moje potřeba. Byl to způsob, jak se mi něco důležitého hlásilo.",
      paragraphs: [
        "Když jsem řekl, že potřebuju přestat být naštvaný, míchal jsem dohromady dvě různé vrstvy. Vztek byl emoce. Pod ním mohl být prostor, respekt, spravedlnost nebo možnost rozhodnout o sobě.",
        "Stejně tak strach není potřeba. Může ale upozornit na bezpečí, jistotu nebo podporu. Smutek může ukazovat k blízkosti, ztrátě nebo něčemu, na čem mi záleželo.",
        "Když tyto vrstvy oddělím, nemusím emoci umlčet. Můžu se zeptat, co mi pomáhá uvidět.",
      ],
    },
    recognition: {
      title: "Emoce a potřeba se ti možná slévají",
      items: [
        "Říkáš, že potřebuješ nebýt ve stresu.",
        "Chceš odstranit emoci dřív, než zjistíš, co upozorňuje.",
        "Jednu emoci automaticky spojuješ vždy se stejnou potřebou.",
      ],
    },
    education: {
      title: "Emoce popisuje prožívání. Potřeba pojmenovává, co je pro tebe důležité.",
      paragraphs: [
        "Můžeš cítit nejistotu a potřebovat více informací. Ve stejné emoci ale může být pro jiného člověka důležitá blízkost nebo bezpečí.",
        "Proto neexistuje jednoduchý slovník, ve kterém jedna emoce vždy znamená jednu potřebu. Přesnější je ptát se a ověřovat odpověď ve vlastním kontextu.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-04-emotion-need.webp",
      alt: "Ručně kreslená postava odděluje emoci od potřeby do dvou propojených bublin",
      caption: "Emoce a potřeba spolu souvisejí. Nejsou to ale stejné věci.",
    },
    expert: {
      field: "ROZLIŠOVÁNÍ VRSTEV",
      title: "Přesnější pojmenování může rozšířit možnosti reakce.",
      paragraphs: [
        "Když člověk oddělí situaci, emoci, význam a potřebu, získá více informací než z obecného výroku, že je mu špatně. Větší přesnost může podpořit promyšlenější další krok.",
      ],
      limit: "Přesnost není povinnost. Když dnes nevíš, můžeš zůstat u první možné hypotézy a později ji změnit.",
    },
    practice: {
      title: "Rozděl jednu zkušenost na dvě věty.",
      why: "Jedna věta pojmenuje, co cítíš. Druhá zkusí pojmenovat, co je pro tebe důležité.",
      steps: [
        "Vyber jednu dnešní emoci.",
        "Napiš: Cítím…",
        "Potom napiš: Možná potřebuju nebo je pro mě důležité…",
      ],
      prompt: "Co cítím a co je pro mě pod tím důležité?",
      fields: [
        { id: "emotion", label: "Cítím", type: "text", required: true },
        { id: "need", label: "Možná potřebuju nebo je pro mě důležité", type: "textarea", required: true },
        { id: "difference", label: "Co se změnilo, když jsem tyto dvě vrstvy oddělil", type: "textarea" },
      ],
    },
    closing: ["Nemusíš emoci odstranit, abys jí porozuměl.", "Můžeš ji nechat ukázat, co je pro tebe důležité."],
  },
  {
    day: 5,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Nejvíc jsem se učil z nepohody. Dlouho jsem přehlížel chvíle, kdy mi bylo dobře.",
      paragraphs: [
        "Když jsem cítil úlevu, klid nebo radost, bral jsem to jako samozřejmost. Neptal jsem se, co se právě naplnilo a proč mi tahle chvíle dělá dobře.",
        "Přitom právě příjemné emoce mi ukazovaly důležitá data. Když jsem mohl říct pravdu, cítil jsem větší soulad. Když jsem byl s blízkými bez výkonu, ozýval se kontakt. Když jsem dokončil smysluplnou práci, cítil jsem dopad.",
        "Potřeby se neozývají jen nedostatkem. Můžeme je poznávat také ve chvílích, kdy jsou naplněné.",
      ],
    },
    recognition: {
      title: "Dobré chvíle možná rychle přejdeš",
      items: [
        "Úlevu bereš jen jako konec problému.",
        "Radost si užiješ, ale nezkoumáš, co ji podpořilo.",
        "Snadněji popíšeš, co nechceš, než co ti opravdu dělá dobře.",
      ],
    },
    education: {
      title: "Naplněná potřeba je stejně užitečná informace jako nenaplněná.",
      paragraphs: [
        "Když se objeví klid, vděčnost, úleva nebo spokojenost, můžeš hledat, co bylo v tu chvíli v souladu. Možná jsi měl prostor, podporu, smysl, kontakt nebo čas na obnovu.",
        "Tím nevytváříš recept na štěstí. Učíš se poznávat podmínky, které tvůj život podporují.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-05-fulfilled.webp",
      alt: "Ručně kreslená postava si všímá malé dobré chvíle a toho, co ji podpořilo",
      caption: "I úleva a radost nesou informaci.",
    },
    expert: {
      field: "UČENÍ Z DOBRÝCH CHVIL",
      title: "Pozornost k tomu, co funguje, doplňuje obraz o vlastní potřebě.",
      paragraphs: [
        "Když člověk sleduje pouze nepříjemné situace, může přehlédnout konkrétní podmínky, ve kterých má více kapacity a cítí větší soulad. Záznam příjemné chvíle rozšiřuje osobní mapu.",
      ],
      limit: "Příjemná emoce neznamená, že je všechno v pořádku. Je jedním zdrojem informace v konkrétním okamžiku.",
    },
    practice: {
      title: "Zachyť jednu chvíli, ve které ti dnes bylo dobře.",
      why: "Trénuješ schopnost uvidět, co tě podporuje, nejen co tě vyčerpává.",
      steps: [
        "Vyber malou konkrétní chvíli.",
        "Pojmenuj emoci nebo tělesný pocit.",
        "Zeptej se, co v té chvíli bylo naplněné.",
      ],
      prompt: "Která potřeba byla v této příjemné chvíli naplněná?",
      fields: [
        { id: "goodMoment", label: "Moje dobrá chvíle", type: "textarea", required: true },
        { id: "feeling", label: "Co jsem cítil", type: "text", required: true },
        { id: "fulfilled", label: "Co v té chvíli mohlo být naplněné", type: "textarea", required: true },
      ],
    },
    closing: ["Neuč se o sobě jen z bolesti.", "Všímej si také toho, při čem se v tobě objeví více života."],
  },
  {
    day: 6,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Potřeba mi vysvětlila, co je důležité. Neříkala mi ale, co musí udělat druhý.",
      paragraphs: [
        "Když jsem potřeboval blízkost, snadno jsem z toho udělal požadavek na konkrétního člověka. Když jsem potřeboval jistotu, chtěl jsem okamžitou odpověď. Když jsem potřeboval respekt, očekával jsem jednu přesnou reakci.",
        "Postupně jsem začal rozlišovat potřebu a způsob, kterým se ji snažím naplnit. Potřeba mohla být oprávněná. Moje první strategie ale nebyla jediná možná cesta.",
        "Tohle rozlišení mi vrátilo odpovědnost i svobodu. Mohl jsem potřebu respektovat a současně hledat způsob, který neřídí druhé.",
      ],
    },
    recognition: {
      title: "Potřeba se ti možná změnila v jediný požadavek",
      items: [
        "Máš pocit, že úleva přijde jen po jedné konkrétní odpovědi.",
        "Jednoho člověka vnímáš jako jediný zdroj naplnění.",
        "Když první cesta nefunguje, připadáš si úplně bezmocně.",
      ],
    },
    education: {
      title: "Potřeba je důležitá informace. Strategie je jeden způsob, jak o ni pečovat.",
      paragraphs: [
        "Potřebou může být blízkost. Strategií může být telefonát konkrétnímu člověku. Potřebou může být bezpečí. Strategií může být získat více informací, vytvořit plán nebo požádat o podporu.",
        "Jedna potřeba může mít více strategií. Některé jsou dostupné tobě, jiné vznikají ve spolupráci a některé vyžadují souhlas druhého člověka.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-06-options.webp",
      alt: "Ručně kreslená postava vidí více cest od jedné potřeby",
      caption: "Jedna potřeba může mít více cest.",
    },
    expert: {
      field: "AUTONOMIE A VZTAHY",
      title: "Rozlišení potřeby a strategie rozšiřuje volbu.",
      paragraphs: [
        "Když člověk spojí potřebu s jediným řešením, může růst pocit bezmoci nebo tlak na druhé. Více možných strategií podporuje vlastní vliv i respekt k hranicím druhého člověka.",
      ],
      limit: "Ne všechny potřeby lze naplnit samostatně. Vztahové potřeby přirozeně zahrnují druhé lidi a vzájemnou domluvu.",
    },
    practice: {
      title: "Najdi k jedné potřebě tři možné cesty.",
      why: "Nejlepší cestu dnes nemusíš vybrat. Rozšiřuješ nabídku možností.",
      steps: [
        "Pojmenuj jednu aktuální potřebu.",
        "Napiš svoji první automatickou strategii.",
        "Přidej dvě další možnosti, které respektují tebe i druhé.",
      ],
      prompt: "Jak můžu svoji potřebu respektovat bez řízení druhých?",
      fields: [
        { id: "need", label: "Moje potřeba", type: "text", required: true },
        { id: "automaticStrategy", label: "Moje první automatická strategie", type: "textarea", required: true },
        { id: "optionTwo", label: "Další možná cesta", type: "textarea", required: true },
        { id: "optionThree", label: "Ještě jedna možná cesta", type: "textarea", required: true },
      ],
    },
    closing: ["Tvoje potřeba si zaslouží pozornost.", "Druhý člověk ale nemusí být jedinou cestou k jejímu naplnění."],
  },
  {
    day: 7,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "První týden mi nepřinesl hotový návod. Přinesl mi přesnější otázky.",
      paragraphs: [
        "Začal jsem si všímat, že některé potřeby se u mě vracejí. Když jsem byl pod tlakem, chyběl mi prostor a možnost rozhodnout o tempu. Ve vztazích se často ozývala blízkost, jistota a potřeba být skutečně slyšený.",
        "Nebyla to diagnóza ani důkaz, že jsem nějaký typ člověka. Byla to první mapa sestavená z konkrétních situací.",
        "Dnes se ohlédneš za vlastními záznamy. Nehledej závěr o sobě. Hledej jednu potřebu, která si zaslouží další pozornost.",
      ],
    },
    recognition: {
      title: "Po týdnu už můžeš vidět první stopy",
      items: [
        "Některá potřeba se objevila v různých situacích.",
        "Jednu potřebu pojmenováváš snadno a jiné se ti hledají hůř.",
        "Začínáš rozlišovat, co potřebuješ a jak se to snažíš získat.",
      ],
    },
    education: {
      title: "Vzorec nevzniká z jedné odpovědi. Začíná být vidět v opakování.",
      paragraphs: [
        "Vrať se k zápisům bez hodnocení. Všímej si situací, emocí, rodin potřeb a strategií. Hledej společné nitě, ne definitivní příčiny.",
        "První mapa ti má pomoct pokračovat přesněji. Neříká, kdo jsi. Ukazuje, čemu ses během sedmi dní věnoval.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-07-map.webp",
      alt: "Ručně kreslená postava skládá z několika stop první mapu potřeb",
      caption: "Mapa nevzniká z jedné chvíle. Vzniká z toho, co se začne opakovat.",
    },
    expert: {
      field: "POZOROVÁNÍ VZORCŮ",
      title: "Více záznamů umožňuje hledat opakování, stále však ne hotový výklad.",
      paragraphs: [
        "Pravidelné záznamy mohou ukázat, v jakých situacích se určité potřeby objevují a jaké strategie člověk používá. Smyslem je podpořit další otázky a malé experimenty.",
      ],
      limit: "Sedm dní je krátké období. Mapa nehodnotí osobnost a neměla by být použita jako diagnóza.",
    },
    practice: {
      title: "Sestav první verzi svojí mapy potřeb.",
      why: "Vybereš jen to, co se v tomto týdnu ukázalo nejjasněji a co chceš dál pozorovat.",
      steps: [
        "Pojmenuj situaci, ve které se potřeba opakovala.",
        "Vyber potřebu nebo rodinu, která byla nejčastěji blízko.",
        "Napiš svoji obvyklou strategii.",
        "Vyber jednu otázku pro další týden.",
      ],
      prompt: "Co se u mě během týdne opakovalo?",
      fields: [
        { id: "repeatingSituation", label: "Situace, která se vracela", type: "textarea", required: true },
        { id: "repeatingNeed", label: "Potřeba nebo rodina potřeb", type: "text", required: true },
        { id: "usualStrategy", label: "Jak jsem se ji obvykle snažil naplnit", type: "textarea", required: true },
        { id: "fulfilledMoment", label: "Chvíle, kdy byla potřeba naplněná", type: "textarea" },
        { id: "nextQuestion", label: "Čeho si chci příští týden všimnout dřív", type: "textarea", required: true },
      ],
    },
    closing: ["První mapa není rozsudek o tom, kdo jsi.", "Je to začátek poctivějšího rozhovoru se sebou."],
  },
  {
    day: 8,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Dlouho jsem si myslel, že moje první řešení je zároveň moje potřeba.",
      paragraphs: [
        "Když jsem potřeboval jistotu, kontroloval jsem telefon. Když jsem chtěl klid, přestal jsem mluvit. Když jsem toužil po uznání, vzal jsem si další práci. Ty kroky mi připadaly samozřejmé.",
        "Až později jsem uviděl, že potřeba a způsob, kterým se ji snažím naplnit, jsou dvě různé věci. Potřeba mohla být naprosto skutečná. První strategie ale nebyla jediná možnost.",
        "Tohle rozlišení mi nebralo právo něco potřebovat. Naopak mi vracelo větší prostor rozhodnout se, co s tím udělám.",
      ],
    },
    recognition: {
      title: "Možná zaměňuješ potřebu za první známý krok",
      items: [
        "Řekneš si: „Potřebuju to hned zkontrolovat.“",
        "Úlevu spojuješ jen s jedním konkrétním řešením.",
        "Když první cesta nejde, připadáš si bez možnosti.",
      ],
    },
    education: {
      title: "Potřeba říká, co je důležité. Strategie říká, jak se o to právě snažíš postarat.",
      paragraphs: [
        "Potřebou může být jistota. Strategií může být kontrola telefonu. Potřebou může být prostor. Strategií může být odchod z rozhovoru. Potřebou může být uznání. Strategií může být další výkon.",
        "Strategie není automaticky špatná. Dnes ji jen oddělíš od potřeby a všimneš si, co ti přinese jako první.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-08-strategy.webp",
      alt: "Ručně kreslená postava odděluje důležitou potřebu od konkrétního kroku",
      caption: "To, co potřebuješ, není totéž jako první krok, který tě napadne.",
    },
    expert: {
      field: "KOUČOVACÍ RÁMEC",
      title: "Oddělení potřeby a strategie vytváří prostor pro další možnosti.",
      paragraphs: [
        "Když člověk vnímá jediný krok jako samotnou potřebu, může mít menší pocit volby. Pojmenování obou vrstev pomáhá sledovat, jaký účinek strategie přináší a zda existují i jiné cesty.",
      ],
      limit: "Strategie není diagnóza ani chyba charakteru. Je to konkrétní způsob jednání, který může být v některých situacích užitečný a v jiných příliš drahý.",
    },
    practice: {
      title: "Rozděl jednu dnešní zkušenost na potřebu a strategii.",
      why: "Trénuješ schopnost uvidět, že to důležité může zůstat stejné, i když změníš způsob, jak o to pečuješ.",
      steps: [
        "Vyber jednu potřebu z prvního týdne.",
        "Napiš, co v takové chvíli obvykle uděláš.",
        "Zachyť, co ti tento krok přinese jako první.",
      ],
      prompt: "Co potřebuju a jakým krokem se to snažím získat?",
      fields: [
        { id: "need", label: "Co je pro mě důležité", type: "text", required: true },
        { id: "strategy", label: "Co v takové chvíli obvykle udělám", type: "textarea", required: true },
        { id: "shortEffect", label: "Co mi to přinese jako první", type: "textarea", required: true },
      ],
    },
    closing: ["Potřeba může zůstat stejná.", "Způsob, kterým o ni pečuješ, se může změnit."],
  },
  {
    day: 9,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Když jsem viděl jen jednu cestu, každý člověk, který mi nevyhověl, vypadal jako překážka.",
      paragraphs: [
        "Potřeboval jsem kontakt a chtěl jsem ho od jednoho konkrétního člověka. Potřeboval jsem klid a věřil jsem, že ho získám teprve tehdy, až bude hotová všechna práce.",
        "V obou případech byla potřeba skutečná. Jen jsem ji zamkl do jediného řešení. Když nevyšlo, rostl ve mně tlak a bezmoc.",
        "Nešlo o to přesvědčit se, že nikoho nepotřebuju. Šlo o to přidat další dveře. Něco můžu udělat sám. O něco můžu požádat. Někdy můžu změnit podmínky.",
      ],
    },
    recognition: {
      title: "Jedna cesta se možná stala jedinou",
      items: [
        "Čekáš na jednu konkrétní odpověď, abys mohl být v klidu.",
        "Odpočinek si spojuješ pouze s dokončením všeho.",
        "Jinou možnost začneš hledat až ve chvíli, kdy první selže.",
      ],
    },
    education: {
      title: "Jedna potřeba může mít více zdravých a realistických cest.",
      paragraphs: [
        "Potřebu podpory může naplnit rozhovor, konkrétní pomoc, společný čas nebo kontakt s více lidmi. Potřebu prostoru může podpořit hranice, změna tempa, odložení úkolu nebo chvíle bez vstupů.",
        "Více možností neznamená, že jsou všechny stejně dobré. Nejdřív je ale potřebuješ vůbec uvidět. Teprve potom můžeš vybírat.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-09-paths.webp",
      alt: "Ručně kreslená postava stojí před několika otevřenými cestami",
      caption: "Nemusíš hned vybrat nejlepší cestu. Nejdřív potřebuješ vidět, že jich je víc.",
    },
    expert: {
      field: "FLEXIBILITA V JEDNÁNÍ",
      title: "Větší nabídka kroků může snížit pocit, že existuje jen jedno řešení.",
      paragraphs: [
        "Když má člověk k jedné potřebě více realistických možností, může lépe reagovat na kontext, svoje možnosti i hranice druhých lidí.",
      ],
      limit: "Ne každá možnost je vždy dostupná. Smyslem není vyrábět optimismus, ale hledat konkrétní cesty, které jsou v dané situaci skutečně možné.",
    },
    practice: {
      title: "Vytvoř čtyři cesty k jedné potřebě.",
      why: "Nejde o plán, který musíš splnit. Rozšiřuješ si osobní nabídku pro chvíli, kdy první strategie nefunguje.",
      steps: [
        "Pojmenuj jednu potřebu.",
        "Napiš svoji nejčastější strategii.",
        "Přidej vlastní krok, vztahovou možnost a změnu prostředí.",
      ],
      prompt: "Jakými dalšími způsoby se o tuto potřebu můžu postarat?",
      fields: [
        { id: "need", label: "Moje potřeba", type: "text", required: true },
        { id: "usual", label: "Moje nejčastější cesta", type: "textarea", required: true },
        { id: "self", label: "Co můžu udělat já", type: "textarea", required: true },
        { id: "relationship", label: "Co může vzniknout ve vztahu", type: "textarea", required: true },
        { id: "environment", label: "Co můžu změnit v podmínkách", type: "textarea", required: true },
      ],
    },
    closing: ["Jedna potřeba nemusí mít jedno řešení.", "Více cest ti vrací větší možnost volby."],
  },
  {
    day: 10,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Převzít odpovědnost neznamená přesvědčit se, že všechno musím zvládnout sám.",
      paragraphs: [
        "Dřív jsem odpovědnost snadno zaměnil za úplnou soběstačnost. Když jsem něco potřeboval, hledal jsem, jak to zařídit bez druhých. Nebo jsem naopak čekal, že se změní oni, a cítil se bezmocně.",
        "Pomohlo mi rozdělit situaci na tři části. Co můžu udělat přímo. O co můžu srozumitelně požádat. A co v tuto chvíli opravdu nemám pod kontrolou.",
        "Tahle třetí část byla někdy nejtěžší. Přiznat si hranici vlivu ale není rezignace. Je to přesnější práce s realitou.",
      ],
    },
    recognition: {
      title: "Možná přebíráš příliš mnoho nebo čekáš příliš dlouho",
      items: [
        "Snažíš se sám vytvořit něco, co potřebuje spolupráci.",
        "Čekáš na změnu druhého a přehlížíš vlastní dostupný krok.",
        "Vyčerpává tě něco, co právě nemůžeš ovládat.",
      ],
    },
    education: {
      title: "Vlastní vliv, vztahová prosba a realita mimo kontrolu jsou tři různé oblasti.",
      paragraphs: [
        "Můžeš upravit svoje tempo, odejít na chvíli z hluku nebo pojmenovat hranici. Můžeš druhého požádat o konkrétní pomoc. Nemůžeš ale ovládat jeho odpověď, pocity ani ochotu.",
        "Když tyto části oddělíš, lépe uvidíš, kam může jít tvoje energie a kde potřebuješ přijmout nejistotu nebo udělat jiné rozhodnutí.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-10-influence.webp",
      alt: "Ručně kreslená postava třídí situaci na vlastní vliv, prosbu a oblast mimo kontrolu",
      caption: "Odpovědnost začíná přesným rozlišením toho, co můžeš a nemůžeš ovlivnit.",
    },
    expert: {
      field: "KOUČOVACÍ RÁMEC",
      title: "Rozlišení vlivu pomáhá zaměřit pozornost na dostupný další krok.",
      paragraphs: [
        "Nejistota často roste, když člověk vynakládá energii na výsledek, který závisí na mnoha lidech nebo podmínkách. Praktické rozdělení situace může zpřesnit, co je právě možné.",
      ],
      limit: "Rozlišení vlivu nesmí sloužit k obviňování člověka za podmínky, které nezpůsobil. V nebezpečné situaci je prioritou bezpečí a dostupná pomoc.",
    },
    practice: {
      title: "Rozděl jednu potřebu do tří oblastí.",
      why: "Uvidíš, kde můžeš jednat, kde potřebuješ domluvu a kde je důležité respektovat hranici reality.",
      steps: [
        "Pojmenuj aktuální potřebu.",
        "Napiš jeden krok, který můžeš udělat přímo.",
        "Přidej prosbu a oblast, kterou právě neovládáš.",
      ],
      prompt: "Co pro tuto potřebu můžu udělat já?",
      fields: [
        { id: "need", label: "Moje potřeba", type: "text", required: true },
        { id: "myInfluence", label: "Co můžu ovlivnit přímo", type: "textarea", required: true },
        { id: "request", label: "O co můžu požádat", type: "textarea", required: true },
        { id: "outside", label: "Co teď nemůžu ovládat", type: "textarea", required: true },
      ],
    },
    closing: ["Nemusíš mít pod kontrolou celý výsledek.", "Potřebuješ poznat svoji skutečnou část."],
  },
  {
    day: 11,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Některé věci pro sebe udělat můžu. Vzájemnost ale sám nevyrobím.",
      paragraphs: [
        "Můžu přijít otevřeně. Můžu mluvit pravdivě. Můžu vytvořit prostor a naslouchat. Nemůžu ale sám zařídit důvěru, blízkost nebo spolupráci, pokud druhý člověk nechce nebo nemůže přispět.",
        "Dřív jsem v takových chvílích často přidal ještě větší snahu. Více vysvětlování. Více péče. Více přizpůsobení. Jako bych mohl vztahovou část odpracovat za oba.",
        "Přijmout, že některá potřeba vzniká mezi lidmi, mi pomohlo vidět vlastní příspěvek i hranici reality.",
      ],
    },
    recognition: {
      title: "Možná se snažíš vytvořit vztah za dva",
      items: [
        "Přidáváš úsilí, když druhý člověk ustupuje.",
        "Svoji potřebu blízkosti měníš v dokazování vlastní hodnoty.",
        "Dlouho přehlížíš, že spolupráce není oboustranná.",
      ],
    },
    education: {
      title: "Blízkost, důvěra a spolupráce potřebují vlastní příspěvek i odpověď druhého.",
      paragraphs: [
        "Tvoje část může být otevřenost, spolehlivost, zájem nebo jasná komunikace. Společná část vzniká teprve tehdy, když oba lidé přinášejí ochotu a prostor.",
        "Když druhý nemůže nebo nechce, neznamená to, že tvoje potřeba není důležitá. Znamená to, že tato konkrétní cesta má reálnou hranici.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-11-together.webp",
      alt: "Dvě ručně kreslené postavy společně drží jeden most",
      caption: "Některé potřeby jsou tvoje. Jejich naplnění ale vzniká mezi lidmi.",
    },
    expert: {
      field: "VZTAHOVÝ KONTEXT",
      title: "Vzájemnost nelze vytvořit pouze zvýšením úsilí jednoho člověka.",
      paragraphs: [
        "Vztahové potřeby přirozeně zahrnují druhé lidi. Praktická reflexe proto sleduje vlastní příspěvek, společnou část i signály, že konkrétní vztah tuto možnost nyní nenabízí.",
      ],
      limit: "Tento rámec neospravedlňuje manipulaci, násilí ani zneužívání. V nebezpečném vztahu není cílem lepší komunikace, ale bezpečí a odborná podpora.",
    },
    practice: {
      title: "Podívej se na jednu vztahovou potřebu bez obviňování sebe i druhého.",
      why: "Rozlišuješ, co můžeš přinést ty, co musí vzniknout společně a kde už narážíš na hranici reality.",
      steps: [
        "Pojmenuj jednu vztahovou potřebu.",
        "Napiš svůj možný příspěvek.",
        "Popiš společnou část a jeden signál reálné hranice.",
      ],
      prompt: "Co potřebuji sdílet nebo vytvořit společně s druhým?",
      fields: [
        { id: "need", label: "Moje vztahová potřeba", type: "text", required: true },
        { id: "myPart", label: "Čím můžu přispět já", type: "textarea", required: true },
        { id: "sharedPart", label: "Co musí vzniknout mezi námi", type: "textarea", required: true },
        { id: "reality", label: "Jak poznám hranici této cesty", type: "textarea", required: true },
      ],
    },
    closing: ["Nemusíš vztah odpracovat za dva.", "Můžeš přinést svůj díl a zároveň vidět odpověď druhého."],
  },
  {
    day: 12,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Někdy jsem byl zklamaný z dohody, kterou druhý člověk nikdy neslyšel.",
      paragraphs: [
        "V hlavě jsem měl jasnou představu. Když mu na mně záleží, pozná, že potřebuju pomoc. Když mě respektuje, ozve se sám. Když spolu pracujeme, uvidí, kolik toho nesu.",
        "Jenže tahle dohoda existovala pouze ve mně. Druhý člověk neznal pravidla, podle kterých jsem jeho chování vyhodnocoval.",
        "Když jsem si začal nevyslovená očekávání zapisovat, uviděl jsem, co můžu říct jasněji a kde potřebuji přijmout, že druhý může odpovědět jinak, než bych si přál.",
      ],
    },
    recognition: {
      title: "Možná čekáš, že druhý pozná pravidlo sám",
      items: [
        "Říkáš si: „Kdyby mu na mně záleželo, věděl by to.“",
        "Zklamání přijde dřív, než svoji potřebu vyslovíš.",
        "Druhého hodnotíš podle očekávání, které jste spolu neprobrali.",
      ],
    },
    education: {
      title: "Nevyslovené očekávání může působit jako dohoda, kterou zná jen jedna strana.",
      paragraphs: [
        "Očekávání je lidské. Problém vzniká, když jej považujeme za společné pravidlo bez společné domluvy. Potom druhý neví, co jeho chování znamená v našem vnitřním příběhu.",
        "Přepsat očekávání do informace nebo prosby neznamená vzdát se potřeby. Znamená dát vztahu šanci reagovat na něco, co je skutečně slyšet.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-12-hidden-agreement.webp",
      alt: "Dvě ručně kreslené postavy, z nichž jedna drží neviditelnou dohodu",
      caption: "Druhý člověk nemůže znát pravidlo, které zůstalo jen v tvojí hlavě.",
    },
    expert: {
      field: "KOMUNIKACE VE VZTAHU",
      title: "Srozumitelně sdělená informace snižuje prostor pro hádání.",
      paragraphs: [
        "Když člověk popíše konkrétní situaci, vlastní prožívání a potřebu, druhý dostává více informací než ze stažení, narážky nebo testu, jehož pravidla nezná.",
      ],
      limit: "Jasná komunikace nezaručuje souhlas ani změnu druhého. Jejím výsledkem může být i přesnější poznání, že se vaše možnosti nebo očekávání liší.",
    },
    practice: {
      title: "Najdi jednu neviditelnou dohodu a udělej ji srozumitelnou.",
      why: "Netrénuješ dokonalou formulaci. Učíš se poznat, co jsi čekal, aniž jsi to řekl.",
      steps: [
        "Vyber chvíli, ve které jsi byl zklamaný.",
        "Doplň větu: „Čekal jsem, že…“",
        "Přepiš očekávání do informace nebo konkrétní prosby.",
      ],
      prompt: "Co jsem očekával, aniž jsem to řekl?",
      fields: [
        { id: "situation", label: "Co se stalo", type: "textarea", required: true },
        { id: "expectation", label: "Čekal jsem, že", type: "textarea", required: true },
        { id: "didTheyKnow", label: "Jak mohl druhý vědět, co čekám", type: "textarea", required: true },
        { id: "clearVersion", label: "Moje srozumitelnější verze", type: "textarea", required: true },
      ],
    },
    closing: ["Nevyslovené očekávání není společná dohoda.", "Pojmenování dává druhému možnost skutečně odpovědět."],
  },
  {
    day: 13,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Prosba pro mě začala být prosbou teprve tehdy, když odpověď mohla znít také ne.",
      paragraphs: [
        "Dřív jsem někdy formuloval prosbu, ale uvnitř jsem čekal jedinou správnou odpověď. Když nepřišla, cítil jsem odmítnutí nebo nespravedlnost.",
        "Postupně jsem se učil říct, co se stalo, co cítím, co je pro mě důležité a o co konkrétně žádám. Současně jsem se učil přemýšlet, co udělám, pokud druhý nemůže nebo nechce.",
        "Tím moje potřeba neztratila váhu. Jen jsem přestal zaměňovat její důležitost za povinnost druhého vyhovět.",
      ],
    },
    recognition: {
      title: "Prosba se možná mění v test",
      items: [
        "Odpověď „ne“ vnímáš jako důkaz, že na tobě nezáleží.",
        "Prosbu formuluješ neurčitě a čekáš, že druhý doplní zbytek.",
        "Nemáš žádnou další možnost, pokud druhý nevyhoví.",
      ],
    },
    education: {
      title: "Konkrétní prosba je srozumitelná a ponechává druhému možnost skutečně odpovědět.",
      paragraphs: [
        "Může začít situací: „Dnes jsme se dvakrát minuli.“ Potom přidáš prožívání a potřebu: „Jsem z toho zklamaný a chybí mi kontakt.“ Nakonec konkrétní krok: „Můžeme si dnes večer dát dvacet minut bez telefonů?“",
        "Pokud odpověď zní ne, může následovat otázka na jinou možnost. Někdy ale odpověď ukáže skutečnou hranici vztahu nebo situace.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-13-request.webp",
      alt: "Ručně kreslená postava podává otevřenou prosbu a druhá má prostor odpovědět",
      caption: "Prosba otevírá rozhovor. Nekontroluje jeho výsledek.",
    },
    expert: {
      field: "KOMUNIKAČNÍ RÁMEC",
      title: "Konkrétnost pomáhá oddělit sdělení potřeby od skrytého požadavku.",
      paragraphs: [
        "Srozumitelná prosba popisuje pozorovatelnou situaci a konkrétní možný krok. Tím dává oběma stranám lepší podklad pro domluvu.",
      ],
      limit: "Ani dobře formulovaná prosba nezaručuje bezpečnou nebo respektující odpověď. V prostředí s násilím či manipulací má přednost bezpečí, ne komunikační technika.",
    },
    practice: {
      title: "Napiš jednu krátkou prosbu pro bezpečnou běžnou situaci.",
      why: "Trénuješ jasnost, ne přesvědčování. Prosba má být pochopitelná i pro člověka, který nevidí do tvojí hlavy.",
      steps: [
        "Popiš jednu konkrétní situaci.",
        "Pojmenuj emoci a potřebu.",
        "Napiš konkrétní prosbu a jednu alternativu.",
      ],
      prompt: "Jak můžu potřebu sdělit a ponechat druhému možnost odpovědi?",
      fields: [
        { id: "situation", label: "Co se konkrétně stalo", type: "textarea", required: true },
        { id: "emotionNeed", label: "Co cítím a co je pro mě důležité", type: "textarea", required: true },
        { id: "request", label: "O co konkrétně žádám", type: "textarea", required: true },
        { id: "alternative", label: "Jakou jinou možnost máme, pokud odpověď zní ne", type: "textarea", required: true },
      ],
    },
    closing: ["Prosba není test lásky ani respektu.", "Je to pozvání k domluvě, na které může druhý skutečně odpovědět."],
  },
  {
    day: 14,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Když jsem oddělil potřebu od strategie, přestal jsem se soudit za každou automatickou reakci.",
      paragraphs: [
        "Začal jsem vidět celý obraz. Co je pro mě důležité. Co v takové chvíli obvykle udělám. Jakou rychlou úlevu mi to přinese. A co po té úlevě někdy zůstane.",
        "Kontrola mi na chvíli dala jistotu. Stažení mi na chvíli dalo klid. Výkon mi přinesl uznání. Každá z těchto strategií měla svůj důvod i svoji cenu.",
        "Dnes nesestavuješ seznam chyb. Vytváříš mapu, díky které můžeš příště poznat, že máš víc než jednu cestu.",
      ],
    },
    recognition: {
      title: "Po druhém týdnu už můžeš vidět celý vzorec",
      items: [
        "Jedna potřeba se propojuje s podobnou strategií.",
        "Strategie přinese rychlý účinek, ale později může něco stát.",
        "Začínáš rozlišovat vlastní vliv, prosbu a oblast mimo kontrolu.",
      ],
    },
    education: {
      title: "Mapa strategií propojí potřebu, obvyklý krok, krátký účinek a další možnost.",
      paragraphs: [
        "Smyslem není starou strategii zakázat. Některé kroky ti mohly dlouho pomáhat. Mapa ukazuje, kdy fungují, co přinášejí a kde už potřebuješ širší nabídku.",
        "Důležitá je také realita. Něco můžeš udělat sám. Něco vznikne pouze s druhým. A něco právě nemůžeš ovládat.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-14-strategy-map.webp",
      alt: "Ručně kreslená postava skládá mapu potřeby, strategie, účinku a nové cesty",
      caption: "Mapa není seznam chyb. Je to přehled možností, které už dokážeš vidět.",
    },
    expert: {
      field: "POZOROVÁNÍ VZORCŮ",
      title: "Opakované záznamy mohou ukázat souvislost mezi potřebou a používaným způsobem péče.",
      paragraphs: [
        "Když se podobná strategie objevuje v několika situacích, může mít smysl sledovat její krátký účinek i pozdější dopad. Tím vzniká podklad pro bezpečný malý experiment.",
      ],
      limit: "Mapa vychází z krátkého období a vlastních záznamů. Není psychologickým posudkem ani definitivním vysvětlením chování.",
    },
    practice: {
      title: "Sestav první mapu jedné opakující se potřeby.",
      why: "Spojíš svoje záznamy do jedné srozumitelné cesty, ke které se můžeš vracet.",
      steps: [
        "Vyber potřebu, která se opakovala.",
        "Pojmenuj obvyklou strategii, rychlý účinek a pozdější cenu.",
        "Doplň vlastní vliv, prosbu a jednu další cestu.",
      ],
      prompt: "Jak se dnes snažím starat o svoje potřeby?",
      fields: [
        { id: "need", label: "Potřeba, která se opakuje", type: "text", required: true },
        { id: "strategy", label: "Moje nejčastější strategie", type: "textarea", required: true },
        { id: "shortEffect", label: "Co mi přinese jako první", type: "textarea", required: true },
        { id: "laterCost", label: "Co mě může stát později", type: "textarea", required: true },
        { id: "myInfluence", label: "Co můžu udělat sám", type: "textarea", required: true },
        { id: "request", label: "O co můžu požádat", type: "textarea", required: true },
        { id: "outside", label: "Co nemůžu ovládat", type: "textarea", required: true },
        { id: "newPath", label: "Jedna další možná cesta", type: "textarea", required: true },
      ],
    },
    closing: ["Strategie není tvoje identita.", "Je to cesta, kterou můžeš pochopit, prověřit a rozšířit."],
  },
  {
    day: 15,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Některé potřeby se ve mně ozývaly hlasitěji než jiné.",
      paragraphs: [
        "Když někdo změnil domluvu, nešlo pro mě jen o praktickou komplikaci. Rychle se ozvala nejistota, ztráta prostoru a pocit, že zase musím všechno podržet.",
        "U jiných potřeb jsem dokázal chvíli čekat nebo hledat další cestu. Tady přišla naléhavost rychle. Chtěl jsem rozhodnout, vysvětlit nebo získat kontrolu.",
        "Dnes nehledáš, proč to tak je. Všímáš si jen, u které potřeby se tvoje reakce nejčastěji zesílí.",
      ],
    },
    recognition: {
      title: "Citlivá potřeba může mít větší hlas",
      items: [
        "Podobná situace v tobě opakovaně vyvolá silnou naléhavost.",
        "První strategie přijde rychleji než u jiných potřeb.",
        "I malá nejistota působí jako něco, co musíš okamžitě vyřešit.",
      ],
    },
    education: {
      title: "Citlivá potřeba není slabé místo ani diagnóza.",
      paragraphs: [
        "Je to pracovní označení pro oblast, u které ve svých záznamech vidíš větší intenzitu, naléhavost nebo opakování. Může jít o bezpečí, kontakt, prostor, uznání, odpočinek nebo něco úplně jiného.",
        "Pro dnešek stačí pozorování: „Tahle oblast se u mě ozývá silně.“ Příčinu nemusíš znát ani dokazovat.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-15-sensitive.webp",
      alt: "Ručně kreslená postava si všímá jedné potřeby, která se ozývá výrazněji",
      caption: "Citlivost není závada. Je to místo, které si zaslouží přesnější pozornost.",
    },
    expert: {
      field: "PSYCHOLOGIE A POTŘEBY",
      title: "Stejná potřeba může mít pro různé lidi i situace odlišnou naléhavost.",
      paragraphs: [
        "Aktuální kapacita, zkušenost, význam situace i okolní podmínky mohou ovlivnit, jak silně se určitá potřeba ozve. Proto se pracuje s opakováním v konkrétních záznamech.",
      ],
      limit: "Silná reakce sama neurčuje její původ. Z krátkého pozorování nelze vyvozovat trauma, diagnózu ani jedno definitivní vysvětlení.",
    },
    practice: {
      title: "Najdi jednu potřebu, u které se tvoje reakce často zesílí.",
      why: "Vytváříš pracovní pozorování, které můžeš v dalších dnech prověřovat.",
      steps: [
        "Projdi záznamy z předchozích dvou týdnů.",
        "Vyber potřebu s větší intenzitou nebo opakováním.",
        "Napiš typické situace a míru jistoty svého pozorování.",
      ],
      prompt: "U které potřeby reaguju nejsilněji?",
      fields: [
        { id: "sensitiveNeed", label: "Moje citlivá potřeba", type: "text", required: true },
        { id: "situations", label: "Situace, ve kterých se ozývá", type: "textarea", required: true },
        { id: "signs", label: "Jak poznám větší naléhavost", type: "textarea", required: true },
        { id: "certainty", label: "Jak jistý si tím zatím jsem", type: "scale", required: true },
      ],
    },
    closing: ["Nemusíš hned vědět, proč je tahle potřeba citlivá.", "Pro dnešek stačí vidět, kdy se ozývá nejsilněji."],
  },
  {
    day: 16,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Můj způsob nebyl hloupý. Dlouho mi pomáhal fungovat.",
      paragraphs: [
        "Odpovědnost, výkon a přesvědčení, že všechno musím zvládnout sám, nevznikly jako náhodná chyba. Viděl jsem je kolem sebe, dostával za ně uznání a v mnoha situacích mi skutečně pomáhaly.",
        "Později ale stejný způsob začal mít cenu. Potřebu podpory jsem převedl do ještě většího výkonu. Potřebu odpočinku do věty: „Ještě tohle dokončím.“",
        "Když zkoumám, odkud strategii znám, nehledám viníka. Snažím se pochopit, proč dávala smysl a proč dnes potřebuju větší nabídku.",
      ],
    },
    recognition: {
      title: "Známý způsob mohl být kdysi velmi užitečný",
      items: [
        "Naučil ses být samostatný, protože na tebe bylo spolehnutí.",
        "Přizpůsobení ti pomáhalo udržet klid nebo vztah.",
        "Výkon přinášel uznání, bezpečí nebo pocit vlastní hodnoty.",
      ],
    },
    education: {
      title: "Původ strategie pomáhá pochopit její logiku, ne vytvořit omluvu.",
      paragraphs: [
        "Strategii můžeš znát z rodiny, školy, práce, kultury nebo vlastní opakované zkušenosti. To, že kdysi pomáhala, nevylučuje, že dnes přináší i omezení.",
        "Můžeš uznat její původní užitek a současně rozhodnout, že v některých situacích chceš zkusit jiný krok.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-16-origin.webp",
      alt: "Ručně kreslená postava sleduje stopu známé strategie do minulosti a zpět do současnosti",
      caption: "Porozumět původu neznamená zůstat ve starém způsobu.",
    },
    expert: {
      field: "TERAPEUTICKÝ KONTEXT",
      title: "Známé strategie mohou být spojené s učením, prostředím a předchozí zkušeností.",
      paragraphs: [
        "Lidé si osvojují způsoby jednání opakováním, pozorováním i reakcemi okolí. Reflexe může pomoci uvidět, v čem byl určitý způsob dříve užitečný a kde dnes omezuje volbu.",
      ],
      limit: "Samostatná aplikace nemůže spolehlivě určit původ vzorce ani zpracovat trauma. Pokud se otevírá silná bolest nebo zahlcení, je vhodná práce s kvalifikovaným odborníkem.",
    },
    practice: {
      title: "Podívej se na obvyklou strategii s respektem k tomu, čemu sloužila.",
      why: "Když přestaneš strategii jen odsuzovat, můžeš přesněji uvidět její užitek i dnešní omezení.",
      steps: [
        "Napiš svoji obvyklou strategii.",
        "Zkus pojmenovat, odkud ji můžeš znát.",
        "Doplň, v čem pomáhala a v čem dnes nestačí.",
      ],
      prompt: "Odkud znám svůj obvyklý způsob, jak se o tuto potřebu starám?",
      fields: [
        { id: "strategy", label: "Moje obvyklá strategie", type: "textarea", required: true },
        { id: "origin", label: "Odkud ji možná znám", type: "textarea", required: true },
        { id: "oldUse", label: "V čem mi pomáhala", type: "textarea", required: true },
        { id: "currentLimit", label: "V čem mi dnes nestačí", type: "textarea", required: true },
      ],
    },
    closing: ["Starý způsob nemusel být špatný.", "Možná jen už nemusí být jediný."],
  },
  {
    day: 17,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Ke známé strategii jsem se nevracel proto, že jsem byl nepoučitelný.",
      paragraphs: [
        "Vracíval jsem se k ní, protože fungovala rychle. Kontrola na chvíli snížila nejistotu. Stažení zastavilo další podněty. Výkon mi dal pocit, že mám svoji hodnotu zase v rukou.",
        "Pozdější cena byla skutečná. Ale v okamžiku napětí bývá rychlá úleva velmi přesvědčivá.",
        "Když jsem si všiml, co přesně strategie přinese jako první, přestal jsem s ní bojovat naslepo. Mohl jsem hledat jiný krok, který se postará o stejnou potřebu.",
      ],
    },
    recognition: {
      title: "Rychlý účinek může být důvodem návratu",
      items: [
        "Kontrola na chvíli sníží nejistotu.",
        "Stažení rychle omezí další tlak.",
        "Výkon přinese pocit hodnoty nebo bezpečí.",
      ],
    },
    education: {
      title: "Strategie se často vrací kvůli tomu, co přinese v prvních minutách.",
      paragraphs: [
        "Krátký účinek může být klid, pocit kontroly, úleva od čekání, přijetí nebo oddálení nepříjemného rozhovoru. Tento účinek je důležitá část mapy.",
        "Když ho znáš, můžeš hledat alternativu, která se o stejnou potřebu postará s menší pozdější cenou.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-17-return.webp",
      alt: "Ručně kreslená postava se vrací ke známé cestě, protože nabízí rychlou úlevu",
      caption: "Známá strategie se vrací, protože něco umí udělat opravdu rychle.",
    },
    expert: {
      field: "UČENÍ A CHOVÁNÍ",
      title: "Rychlá úleva může podporovat opakování určitého chování.",
      paragraphs: [
        "Pokud krok bezprostředně sníží nepříjemný stav nebo přinese žádoucí pocit, může být příště dostupnější. Proto má smysl zachytit nejen pozdější cenu, ale i jeho skutečný krátký účinek.",
      ],
      limit: "Tento princip sám nevysvětluje celé chování člověka. Do rozhodování vstupuje kontext, vztahy, zdraví, prostředí i dostupné možnosti.",
    },
    practice: {
      title: "Pojmenuj rychlou odměnu svojí známé strategie.",
      why: "Neobhajuješ ji. Zjišťuješ, co přesně potřebuje nabídnout i tvoje nová možnost.",
      steps: [
        "Vyber jednu opakující se strategii.",
        "Pojmenuj první změnu, kterou přinese.",
        "Spoj ji s potřebou, o kterou se snaží postarat.",
      ],
      prompt: "Co mi tato strategie přinese tak rychle, že se k ní vracím?",
      fields: [
        { id: "strategy", label: "Moje známá strategie", type: "textarea", required: true },
        { id: "quickEffect", label: "Co se změní jako první", type: "textarea", required: true },
        { id: "relief", label: "Jakou krátkou úlevu dostanu", type: "textarea", required: true },
        { id: "need", label: "O jakou potřebu se tím snažím postarat", type: "text", required: true },
      ],
    },
    closing: ["Strategie se nevrací bez důvodu.", "Když znáš její rychlý účinek, můžeš hledat přesnější náhradu."],
  },
  {
    day: 18,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Krátká úleva byla vidět hned. Cenu jsem často zaplatil až později.",
      paragraphs: [
        "Když jsem převzal kontrolu, nejistota na chvíli klesla. Po několika hodinách jsem ale cítil únavu a lidé kolem mě měli menší chuť přinášet vlastní pohled.",
        "Když jsem se stáhl, získal jsem klid. Později mezi námi zůstalo něco nevyřčeného. Když jsem přidal výkon, přišlo uznání. Za ním ale další vyčerpání.",
        "Strategii nemusím označit za špatnou. Potřebuju jen vidět celý účet, nejen první položku.",
      ],
    },
    recognition: {
      title: "Pozdější cena se může objevit na více místech",
      items: [
        "V těle zůstane únava, napětí nebo menší kapacita.",
        "Ve vztahu přibude odstup, ticho nebo nedůvěra.",
        "Situace se vrátí, protože se vyřešila jen rychlá úleva.",
      ],
    },
    education: {
      title: "Celý účinek strategie zahrnuje první úlevu i to, co vytvoří později.",
      paragraphs: [
        "Dopad může být v tobě, ve vztazích, v energii nebo v samotné situaci. Některá strategie může být krátkodobě velmi účinná a současně dlouhodobě drahá.",
        "Tímto pohledem nevytváříš zákaz. Získáváš podklad pro rozhodnutí, kdy strategii použít a kdy potřebuješ jinou cestu.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-18-cost.webp",
      alt: "Ručně kreslená postava vidí rychlou úlevu a pozdější cenu stejné strategie",
      caption: "Podívej se na celý účinek, ne jen na první minutu.",
    },
    expert: {
      field: "KOUČOVACÍ REFLEXE",
      title: "Porovnání okamžitého a pozdějšího dopadu podporuje vědomější volbu.",
      paragraphs: [
        "Záznam časového průběhu pomáhá odlišit, co strategie řeší okamžitě a co může vytvářet po hodinách či dnech. Uživatel tak pracuje s vlastními zkušenostmi místo obecného seznamu správných technik.",
      ],
      limit: "Jedna zkušenost nestačí k pevnému závěru. Sleduj opakování a ber v úvahu konkrétní situaci.",
    },
    practice: {
      title: "Dopiš ke krátké úlevě celý pozdější účet.",
      why: "Uvidíš, zda ti strategie skutečně slouží i po odeznění první naléhavosti.",
      steps: [
        "Pojmenuj strategii a její rychlý účinek.",
        "Popiš pozdější dopad na sebe a vztahy.",
        "Doplň dopad na energii a samotnou situaci.",
      ],
      prompt: "Co tato strategie vytváří po několika hodinách nebo dnech?",
      fields: [
        { id: "strategy", label: "Moje strategie", type: "textarea", required: true },
        { id: "shortEffect", label: "Krátký účinek", type: "textarea", required: true },
        { id: "impactSelf", label: "Dopad na mě", type: "textarea", required: true },
        { id: "impactRelationship", label: "Dopad na vztahy", type: "textarea", required: true },
        { id: "impactEnergy", label: "Dopad na energii", type: "textarea", required: true },
        { id: "impactSituation", label: "Dopad na situaci", type: "textarea", required: true },
      ],
    },
    closing: ["Rychlá úleva není celý výsledek.", "Podívej se, co po ní zůstane v tobě i kolem tebe."],
  },
  {
    day: 19,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Změna pro mě nezačala zákazem staré reakce. Začala další možností.",
      paragraphs: [
        "Když jsem si řekl, že už nikdy nesmím kontrolovat, stáhnout se nebo tlačit na výkon, vytvořil jsem jen další tlak. Ve chvíli napětí jsem navíc často žádnou jinou cestu neměl připravenou.",
        "Pomohlo mi přidávat konkrétní možnosti. Upravit svoje tempo. Změnit podmínky. Požádat o pomoc. Pojmenovat hranici. Něco odložit.",
        "Nemusel jsem všechny použít. Potřeboval jsem vědět, že stará strategie není jediná položka v nabídce.",
      ],
    },
    recognition: {
      title: "Zákaz staré strategie nemusí vytvořit novou",
      items: [
        "Víš, co už nechceš dělat, ale nevíš, co uděláš místo toho.",
        "Alternativy tě napadnou až po situaci.",
        "Nový krok je tak velký, že v běžném dni není dostupný.",
      ],
    },
    education: {
      title: "Nová možnost musí být konkrétní, malá a dostupná v reálném životě.",
      paragraphs: [
        "Můžeš něco udělat se sebou, změnit podmínky, o něco požádat, vyjádřit hranici nebo část zátěže odložit. Každá kategorie otevírá jiný druh kroku.",
        "Cílem není najít ideální řešení. Vybereš tři realistické možnosti, které respektují tvoji potřebu i realitu situace.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-19-menu.webp",
      alt: "Ručně kreslená postava si vytváří nabídku tří nových možností",
      caption: "Volba vzniká ve chvíli, kdy máš v nabídce víc než jeden známý krok.",
    },
    expert: {
      field: "TRÉNINK VOLBY",
      title: "Připravená alternativa může být v náročné chvíli dostupnější než obecné rozhodnutí.",
      paragraphs: [
        "Věta „Budu reagovat lépe“ neříká, co člověk skutečně udělá. Konkrétní krok, situace a hranice použití vytvářejí jasnější podklad pro experiment.",
      ],
      limit: "Nové možnosti je vhodné testovat v bezpečných běžných situacích. V krizi nebo ohrožení má přednost bezpečnostní plán a odborná pomoc.",
    },
    practice: {
      title: "Přidej ke známé strategii tři realistické možnosti.",
      why: "Připravuješ si nabídku dřív, než přijde další naléhavá chvíle.",
      steps: [
        "Pojmenuj citlivou potřebu a starou strategii.",
        "Vyber tři různé kategorie možného kroku.",
        "Napiš jen kroky, které jsou malé a skutečně proveditelné.",
      ],
      prompt: "Jaké tři další možnosti chci mít k dispozici?",
      fields: [
        { id: "need", label: "Moje potřeba", type: "text", required: true },
        { id: "oldStrategy", label: "Moje známá strategie", type: "textarea", required: true },
        { id: "optionOne", label: "První realistická možnost", type: "textarea", required: true },
        { id: "optionTwo", label: "Druhá realistická možnost", type: "textarea", required: true },
        { id: "optionThree", label: "Třetí realistická možnost", type: "textarea", required: true },
      ],
    },
    closing: ["Starou strategii nemusíš zakázat.", "Potřebuješ si vedle ní postavit další skutečné možnosti."],
  },
  {
    day: 20,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Nový krok jsem nezačal testovat v největší krizi.",
      paragraphs: [
        "Vybral jsem si menší situaci. Chvíli, kdy jsem cítil napětí, ale pořád měl trochu prostoru. Místo okamžité odpovědi jsem si vzal deset minut a potom se k rozhovoru vrátil.",
        "Nesledoval jsem, jestli jsem byl dokonale klidný. Zajímal mě účinek. Co se změnilo v těle. Jaká byla emoce. Co udělal nový krok se situací.",
        "Experiment není zkouška charakteru. Je to způsob, jak získat vlastní zkušenost a zjistit, co ti v konkrétním životě skutečně pomáhá.",
      ],
    },
    recognition: {
      title: "Experiment může být menší, než čekáš",
      items: [
        "Nemusíš změnit celý rozhovor ani vztah.",
        "Nemusíš testovat nový krok ve chvíli největšího zahlcení.",
        "Neúspěšný pokus není selhání. Je to informace pro další verzi.",
      ],
    },
    education: {
      title: "Bezpečný experiment má konkrétní situaci, malý krok a jasné pozorování.",
      paragraphs: [
        "Předem víš, kde ho zkusíš, jakou potřebu sleduješ a co děláš obvykle. Potom vybereš jeden nový krok a určíš, co budeš pozorovat.",
        "Součástí je i záložní možnost. Když nový krok nepomůže, můžeš se vrátit, odejít, požádat o podporu nebo situaci ukončit.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-20-experiment.webp",
      alt: "Ručně kreslená postava bezpečně zkouší jeden malý nový krok",
      caption: "Nezkoušíš, jestli jsi dost dobrý. Zjišťuješ, co ti pomáhá.",
    },
    expert: {
      field: "BEZPEČNÝ EXPERIMENT",
      title: "Malý test v běžné situaci umožňuje porovnat očekávání se skutečným účinkem.",
      paragraphs: [
        "Konkrétní experiment pomáhá sledovat změnu v těle, emoci, chování i výsledku. Opakování v podobných podmínkách může ukázat, zda je nová možnost pro člověka užitečná.",
      ],
      limit: "Experiment nepatří do situací násilí, akutního ohrožení nebo závažné krize. Tam má přednost bezpečí a profesionální pomoc.",
    },
    practice: {
      title: "Navrhni jeden malý experiment pro bezpečnou běžnou situaci.",
      why: "Převádíš porozumění do zkušenosti. Úspěchem není dokonalý výsledek, ale poctivě zachycený účinek.",
      steps: [
        "Vyber konkrétní bezpečnou situaci a potřebu.",
        "Pojmenuj starou strategii a nový malý krok.",
        "Napiš, co budeš sledovat a co uděláš, když krok nepomůže.",
      ],
      prompt: "Kterou novou možnost vyzkouším v malé běžné situaci?",
      fields: [
        { id: "situation", label: "Situace", type: "textarea", required: true },
        { id: "need", label: "Potřeba", type: "text", required: true },
        { id: "usualStrategy", label: "Obvyklá strategie", type: "textarea", required: true },
        { id: "newStep", label: "Nový malý krok", type: "textarea", required: true },
        { id: "observe", label: "Co budu sledovat v těle, emoci a výsledku", type: "textarea", required: true },
        { id: "backup", label: "Co udělám, pokud krok nepomůže", type: "textarea", required: true },
      ],
    },
    closing: ["Experiment není zkouška tvojeho charakteru.", "Je to malý způsob, jak zjistit, co ti skutečně slouží."],
  },
  {
    day: 21,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Po třech týdnech nemám hotový návod na sebe. Mám ale mnohem přesnější mapu.",
      paragraphs: [
        "Vím, ve kterých situacích se moje potřeba ozývá. Poznám emoci, která bývá blízko. Vidím obvyklou strategii, rychlou úlevu i cenu, kterou někdy zaplatím později.",
        "Také vím, co můžu udělat sám, o co můžu požádat a co nemám pod kontrolou. Vedle známého kroku už mám další možnosti a jeden vlastní experiment.",
        "Tohle není konečný výklad. Je to manuál, který vznikl z mojí zkušenosti a může se dál měnit. Poslední otázka už míří k další vrstvě. Když nemůžu naplnit všechno najednou, podle čeho se chci rozhodnout?",
      ],
    },
    recognition: {
      title: "Tvoje mapa už propojuje více vrstev",
      items: [
        "Vidíš potřebu i způsob, kterým se o ni obvykle staráš.",
        "Znáš rychlou úlevu a pozdější dopad.",
        "Máš další možnosti a první bezpečný experiment.",
      ],
    },
    education: {
      title: "Osobní manuál potřeb je pracovní mapa vytvořená z tvých vlastních záznamů.",
      paragraphs: [
        "Neříká, jaký jsi člověk. Ukazuje, co se v posledních třech týdnech opakovalo a jaké kroky sis vyzkoušel nebo připravil.",
        "Můžeš se k němu vracet, doplňovat ho a měnit. Jeho smyslem je pomoct ti zachytit potřebu dřív a mít pro ni víc vědomých cest.",
      ],
    },
    illustration: {
      src: "/prostor-assets/needs-day-21-manual.webp",
      alt: "Ručně kreslená postava drží dokončený osobní manuál potřeb",
      caption: "Nezískal jsi nálepku. Získal jsi mapu, se kterou můžeš dál pracovat.",
    },
    expert: {
      field: "INTEGRACE",
      title: "Shrnutí vlastních záznamů podporuje navazující pozorování a rozhodování.",
      paragraphs: [
        "Manuál propojuje situace, prožívání, potřeby, strategie a jejich účinky. Jeho hodnota spočívá v konkrétnosti a možnosti průběžné aktualizace.",
      ],
      limit: "Výstup není diagnostika ani doporučení léčby. Pokud potřeby souvisejí s dlouhodobou krizí, násilím nebo závažnými psychickými či tělesnými potížemi, je vhodná odborná pomoc.",
    },
    practice: {
      title: "Sestav svoji první verzi manuálu potřeb.",
      why: "Spojíš nejdůležitější poznání do jedné mapy, kterou uvidíš ve svém osobním kompasu.",
      steps: [
        "Vyber jednu potřebu a situaci, ve které se často ozývá.",
        "Doplň strategii, úlevu, cenu a oblasti vlivu.",
        "Přidej nové možnosti, experiment a otázku pro modul Hodnoty.",
      ],
      prompt: "Co už vím o tom, co potřebuju a jak o to chci pečovat?",
      fields: [
        { id: "situation", label: "Situace, ve které se potřeba často ozývá", type: "textarea", required: true },
        { id: "emotion", label: "Emoce, která bývá nejblíž", type: "text", required: true },
        { id: "need", label: "Moje potřeba", type: "text", required: true },
        { id: "strategy", label: "Obvyklá strategie", type: "textarea", required: true },
        { id: "shortRelief", label: "Krátká úleva", type: "textarea", required: true },
        { id: "laterCost", label: "Pozdější cena", type: "textarea", required: true },
        { id: "myInfluence", label: "Co můžu ovlivnit sám", type: "textarea", required: true },
        { id: "request", label: "O co můžu požádat", type: "textarea", required: true },
        { id: "outside", label: "Co nemůžu ovládat", type: "textarea", required: true },
        { id: "options", label: "Tři další možnosti", type: "textarea", required: true },
        { id: "experiment", label: "Můj bezpečný experiment", type: "textarea", required: true },
        { id: "nextQuestion", label: "Otázka pro modul Hodnoty", type: "textarea", required: true, placeholder: "Když nemůžu naplnit všechno najednou, podle čeho se chci rozhodnout?" },
      ],
    },
    closing: ["Tvoje potřeby ti neříkají, jak musíš žít.", "Pomáhají ti poznat, co chceš při svých volbách brát vážně."],
  },
];

export function getNeedsLesson(day: number) {
  return NEEDS_LESSONS.find((lesson) => lesson.day === day) ?? NEEDS_LESSONS[0];
}
