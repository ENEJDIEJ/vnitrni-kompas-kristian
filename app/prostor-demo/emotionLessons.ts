export type EmotionLesson = {
  day: number;
  opening: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  recognition: {
    title: string;
    items: string[];
  };
  education: {
    title: string;
    paragraphs: string[];
    bullets?: Array<{
      title: string;
      text: string;
    }>;
  };
  illustration: {
    src: string;
    alt: string;
    caption: string;
  };
  expert: {
    field: string;
    title: string;
    paragraphs: string[];
    limit: string;
    source?: {
      label: string;
      href: string;
    };
  };
  practice: {
    title: string;
    why: string;
    whyBullets?: string[];
    steps: string[];
    prompt: string;
    fields?: Array<{
      id: string;
      label: string;
      type: "text" | "textarea" | "scale" | "family-select" | "family-multiselect" | "emotion-multiselect";
      placeholder?: string;
      required?: boolean;
      maxSelections?: number;
      dependsOn?: string;
    }>;
  };
  closing: [string, string];
};

export const EMOTION_LESSONS: EmotionLesson[] = [
  {
    day: 1,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Dlouho jsem uměl fungovat. Mnohem méně jsem uměl být u sebe.",
      paragraphs: [
        "Možná to znáš. Ráno vstaneš a začneš řešit všechno, co je potřeba. Práci, zprávy, lidi kolem sebe, termíny. Večer máš za sebou spoustu rozhodnutí, ale kdyby se tě někdo zeptal, co se během dne dělo v tobě, možná chvíli hledáš odpověď.",
        "Přesně tak jsem fungoval i já. Uměl jsem nést odpovědnost. Uměl jsem být silný a postarat se. Jenže jsem si často všiml až poslední reakce. Ostré věty, stažení, únavy nebo chvíle, kdy už jsem nechtěl řešit vůbec nic.",
        "Moje cesta nezačala tím, že jsem změnil celý život. Začala jednou mnohem menší otázkou. Co se ve mně právě změnilo?",
      ],
    },
    recognition: {
      title: "Tohle se možná děje i tobě",
      items: [
        "Navenek funguješ, ale uvnitř už jedeš bez rezervy.",
        "Všimneš si až silné reakce, ne toho, co jí předcházelo.",
        "Na otázku, jak ti je, odpovíš hlavně tím, co se dnes stalo.",
      ],
    },
    education: {
      title: "Dnes ještě nemusíš hledat správnou emoci.",
      paragraphs: [
        "První krok je jednodušší. Všimnout si, že je něco jinak než před chvílí. Možná se změnil dech. Možná se zrychlilo tempo. Možná máš chuť všechno rychle dokončit, odejít nebo se stáhnout.",
        "Tohle není diagnóza ani důkaz, že je něco špatně. Je to první zachycený signál. Když ho začneš poznávat, získáš možnost vrátit pozornost k sobě dřív, než tě reakce úplně předběhne.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-noticing-v1.webp",
      alt: "Ručně kreslená postava, která si všímá změny v těle",
      caption: "Vnější svět může chvíli počkat. Teď jen zjišťuješ, co se změnilo uvnitř.",
    },
    expert: {
      field: "NERVOVÝ SYSTÉM A TĚLO",
      title: "Část emoční zkušenosti se může hlásit tělesnou změnou.",
      paragraphs: [
        "Ve výzkumu lidé spojují různé emoce s odlišnými změnami tělesných pocitů. V běžném životě může být prvním dostupným signálem dech, napětí, teplo, tlak nebo změna tempa.",
      ],
      limit: "Tělesný signál sám o sobě neříká, jaká emoce je správná ani co máš udělat. Je to zdroj informace, ne detektor pravdy.",
      source: {
        label: "Nummenmaa a kol., 2014",
        href: "https://pubmed.ncbi.nlm.nih.gov/24379370/",
      },
    },
    practice: {
      title: "Třikrát se dnes na pár vteřin zastav.",
      why: "Nejde o to něco opravovat. Trénuješ jen okamžik, ve kterém dokážeš obrátit pozornost k sobě.",
      steps: [
        "Zastav se v běžné chvíli, ne až v krizi.",
        "Doplň větu: Právě teď si všímám…",
        "Napiš první poctivou odpověď. Klidně jen: nevím, ale něco je jinak.",
      ],
      prompt: "Co se ve mně právě změnilo?",
    },
    closing: ["Nemusíš ještě vědět, co cítíš.", "Pro dnešek stačí poznat, že se v tobě něco změnilo."],
  },
  {
    day: 2,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Poslední věta často není celý důvod. Je jen chvílí, kdy už toho bylo moc.",
      paragraphs: [
        "Celý den funguješ. Několikrát odložíš jídlo, přeskočíš pauzu a odpovíš na další zprávu. Večer přijde obyčejná otázka. Třeba: „Co bude k večeři?“ A ty odpovíš ostřeji, než jsi chtěl.",
        "Snadno pak uvěříš, že problém byla ta otázka. Jenže ona možná pouze dopadla do systému, který už dlouho neměl rezervu.",
        "Když chceš své reakci porozumět, nezačínej soudem. Vrať se k jedné konkrétní chvíli a odděl, co se opravdu stalo, od toho, co sis o tom začal vyprávět.",
      ],
    },
    recognition: {
      title: "Tohle se možná děje i tobě",
      items: [
        "Popisuješ záměr druhého člověka, i když ho neznáš.",
        "Jedna věta v hlavě rychle vyroste v celý příběh.",
        "Řešíš, kdo je viník, dřív než zachytíš, co se skutečně stalo.",
      ],
    },
    education: {
      title: "Situace je to, co by mohla zachytit kamera.",
      paragraphs: [
        "Věta „Nezáleží mu na mně.“ není situace. Je to význam, který jsi situaci přisoudil. Situace může znít: „Dnes mi neodpověděl na dvě zprávy.“",
        "Obě vrstvy jsou důležité. Když je ale na chvíli oddělíš, získáš přesnější mapu. Můžeš zkoumat, co se stalo, co sis z toho vyložil a co se v tobě potom změnilo.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-event-story-v1.webp",
      alt: "Ručně kreslená postava, která si všímá jedné konkrétní chvíle",
      caption: "Nejdřív popiš okamžik. Výklad můžeš přidat až potom.",
    },
    expert: {
      field: "PSYCHOLOGIE A EMOCE",
      title: "Stejná situace nemusí každý den vyvolat stejnou reakci.",
      paragraphs: [
        "Do prožívání vstupuje nejen samotná událost, ale také aktuální únava, předchozí zátěž, očekávání a význam, který situaci přisoudíš. Proto má smysl zapisovat konkrétní okamžik i okolnosti.",
      ],
      limit: "Z jednoho záznamu nelze určit příčinu ani vytvořit spolehlivý vzorec. První záznam je začátek pozorování.",
    },
    practice: {
      title: "Zachyť dnes jednu situaci bez výkladu.",
      why: "Trénuješ schopnost rozlišit událost od příběhu, který se kolem ní rychle vytvoří.",
      steps: [
        "Vyber jednu chvíli, ve které se změnila tvoje nálada nebo napětí.",
        "Napiš, co by v té chvíli viděla nebo slyšela kamera.",
        "Do druhé věty napiš, co sis o tom začal myslet.",
      ],
      prompt: "Co se skutečně stalo?",
    },
    closing: ["Nehledej celý příběh.", "Najdi jednu konkrétní chvíli, u které můžeš začít."],
  },
  {
    day: 3,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Moje tělo často vědělo dřív než já, že už nemám prostor.",
      paragraphs: [
        "Dřív jsem hledal emoci hlavně v hlavě. Snažil jsem se přijít na správné slovo a vysvětlit si, proč reaguju. Jenže moje první stopa byla často mnohem jednodušší.",
        "Sevřel jsem čelist. Zvedla se mi ramena. Začal jsem mluvit rychleji. Nebo jsem naopak ztichl a chtěl mít od všeho pokoj.",
        "Tělo mi nedávalo hotovou odpověď. Ukazovalo mi ale, že se něco změnilo a že stojí za to na chvíli zpozornět.",
      ],
    },
    recognition: {
      title: "Tohle se možná děje i tobě",
      items: [
        "Zuby svíráš dřív, než si připustíš naštvání.",
        "Dech zadržíš ještě před odpovědí.",
        "Tempo se změní, i když navenek tvrdíš, že jsi v pohodě.",
      ],
    },
    education: {
      title: "Tělo není vedle emoce. Je součástí celé zkušenosti.",
      paragraphs: [
        "Když se něco děje, může se změnit dech, svalové napětí, teplota, tlak nebo pocit energie. U každého člověka to může vypadat trochu jinak.",
        "Proto dnes nehledáš univerzální místo, kde se má cítit strach nebo vztek. Hledáš vlastní první signál. Ten, který se u tebe objevuje dřív než obvyklá reakce.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-body-signal-v1.webp",
      alt: "Ručně kreslená postava v kontaktu se svým tělem",
      caption: "Čelist, ramena, dech, ruce, žaludek a tempo. Začni tam, kde si změny dokážeš všimnout nejsnáze.",
    },
    expert: {
      field: "NERVOVÝ SYSTÉM A TĚLO",
      title: "Vědomé tělesné pocity a emoce spolu souvisejí, ale nejsou totéž.",
      paragraphs: [
        "Výzkum tělesných map ukázal, že lidé spojují různé emoce s různými oblastmi zvýšené nebo snížené tělesné aktivity. Tyto mapy popisují prožitek lidí, ne přesný biologický otisk jedné emoce.",
      ],
      limit: "Napětí v žaludku samo o sobě neznamená strach a sevřená čelist automaticky neznamená vztek. Význam určuješ až v kontextu celé situace.",
      source: {
        label: "Nummenmaa a kol., 2014",
        href: "https://pubmed.ncbi.nlm.nih.gov/24379370/",
      },
    },
    practice: {
      title: "Udělej si krátkou mapu těla.",
      why: "Když poznáš svůj první tělesný signál, můžeš příště zachytit změnu dřív než samotnou reakci.",
      steps: [
        "Na deset vteřin si všimni čelisti, ramen a dechu.",
        "Potom zkontroluj ruce, žaludek a svoje tempo.",
        "Zapiš jedno místo nebo změnu, které sis všiml jako první.",
      ],
      prompt: "Kde jsem změnu poznal nejdřív?",
    },
    closing: ["Tělo ti neříká, co je pravda.", "Může ti říct, že je čas všimnout si sebe."],
  },
  {
    day: 4,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Když jsem byl od sebe odpojený, uměl jsem skvěle popsat všechny kolem.",
      paragraphs: [
        "Věděl jsem, kdo mě naštval. Kdo mě zklamal. Co měl kdo udělat jinak. Měl jsem spoustu vysvětlení a skoro žádný kontakt s tím, co se právě odehrávalo ve mně.",
        "Návrat k sobě pro mě neznamenal omlouvat druhé ani popírat realitu. Znamenal položit si ještě jednu otázku. Co cítím já, ještě než začnu řešit, kdo má pravdu?",
        "Někdy jsem našel jasné slovo. Jindy jen nejistotu mezi dvěma možnostmi. Obojí bylo užitečnější než automatická odpověď.",
      ],
    },
    recognition: {
      title: "Tohle se možná děje i tobě",
      items: [
        "Dokážeš vysvětlit situaci, ale neumíš říct, co cítíš.",
        "Hledáš správné slovo tak dlouho, až se vzdáš.",
        "Pocit zaměníš za soud, třeba: „Cítím se nerespektovaný.“",
      ],
    },
    education: {
      title: "Pojmenování není test správnosti.",
      paragraphs: [
        "Slovo má pomoct přiblížit se zkušenosti. Nemusí ji dokonale uzavřít. Můžeš začít široce. Strach, vztek, smutek, radost, odpor nebo překvapení. Potom zkusit o krok přesnější slovo.",
        "Když váháš mezi dvěma emocemi, nech si obě. Cílem není vyhrát hádanku. Cílem je vytvořit dost přesnosti pro další otázku.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-emotion-naming-v1.webp",
      alt: "Ručně kreslená postava, která hledá nejbližší slovo pro emoci",
      caption: "Začni širokou rodinou. Potom zkus jedno slovo, které je o krok blíž.",
    },
    expert: {
      field: "MOZEK A POZORNOST",
      title: "Pojmenování pocitu může změnit způsob, jakým emoční podnět zpracováváme.",
      paragraphs: [
        "V laboratorních studiích bylo pojmenování emoce spojené se změnami subjektivního prožívání i mozkové aktivity při sledování emočních obrazů. Výsledek ale závisí na situaci, načasování a intenzitě.",
      ],
      limit: "Pojmenování není univerzální uklidňovací technika. Nemusí okamžitě snížit intenzitu a u pozitivních emocí může prožitek také zeslabit.",
      source: {
        label: "Lieberman a kol., 2007; Lieberman a kol., 2011",
        href: "https://pubmed.ncbi.nlm.nih.gov/17576282/",
      },
    },
    practice: {
      title: "Vyber dnes nejvýše dvě slova.",
      why: "Jedno slovo může být příliš úzké. Dvě možnosti dovolí zůstat zvědavý a nepředstírat jistotu.",
      steps: [
        "Vrať se k jedné konkrétní situaci.",
        "Vyber nejbližší širokou rodinu emocí.",
        "Doplň jedno nebo dvě přesnější slova. Když nevíš, napiš nevím.",
      ],
      prompt: "Co cítím dřív, než si to vysvětlím?",
    },
    closing: ["Přesnost není zkouška.", "Je to způsob, jak se k sobě přiblížit."],
  },
  {
    day: 5,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Dřív jsem si emoce všiml hlavně tehdy, když už byla hodně hlasitá.",
      paragraphs: [
        "Když jsem vybuchl, stáhl se nebo už neměl energii, bylo jasné, že se něco děje. Jenže to už jsem často řešil důsledek.",
        "Začal jsem proto sledovat nejen název emoce, ale i její sílu. Ne proto, abych ji snížil za každou cenu. Chtěl jsem poznat, jak u mě vypadá dvojka dřív, než se z ní stane pětka.",
        "To číslo nebyla známka. Byla to moje vlastní orientační značka.",
      ],
    },
    recognition: {
      title: "Tohle se možná děje i tobě",
      items: [
        "Emoci uznáš až ve chvíli, kdy už ovlivňuje tvoje chování.",
        "Slabší signály přejdeš, protože přece ještě funguješ.",
        "Číslo používáš jako hodnocení, místo jako jednoduchý údaj.",
      ],
    },
    education: {
      title: "Stupnice je tvoje. Nesrovnává tě s nikým dalším.",
      paragraphs: [
        "Jednička může znamenat jemnou změnu, kterou sotva zachytíš. Pětka chvíli, kdy je emoce velmi silná a prostoru pro klidnou volbu je méně. Mezi nimi není ostrá hranice.",
        "Nejdůležitější je používat stupnici podobně každý den. Potom můžeš vidět, kdy si změny obvykle všímáš a co se dělo předtím.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-intensity-v1.webp",
      alt: "Ručně kreslená postava, která sleduje sílu své emoce",
      caption: "Číslo neurčuje, jestli reaguješ správně. Pomáhá ti poznat, kdy sis změny všiml.",
    },
    expert: {
      field: "KOUČOVACÍ RÁMEC",
      title: "Číselná stupnice dává prožitku jednoduchý orientační bod.",
      paragraphs: [
        "Stupnice od jedné do pěti není objektivní měření těla ani mysli. Je to způsob, jak porovnávat vlastní zkušenost v různých chvílích a zpřesňovat pozorování.",
      ],
      limit: "Stejné číslo může u dvou lidí znamenat něco jiného. Samotné číslo nevysvětluje příčinu a nenahrazuje popis situace.",
    },
    practice: {
      title: "Třikrát dnes označ jen sílu změny.",
      why: "Trénuješ zachycení jemnějších signálů, ne schopnost být celý den v klidu.",
      steps: [
        "Ráno, odpoledne a večer se krátce zastav.",
        "Označ intenzitu od jedné do pěti.",
        "Jednou větou napiš, podle čeho jsi číslo poznal.",
      ],
      prompt: "Jak silné to bylo od jedné do pěti?",
    },
    closing: ["Cílem není mít jedničku.", "Cílem je všimnout si, kdy se číslo začíná měnit."],
  },
  {
    day: 6,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Emoce se u mě často objevila společně s chutí něco okamžitě udělat.",
      paragraphs: [
        "Když přišla nejistota, chtěl jsem mít hned jasno. Když jsem cítil tlak, chtěl jsem všechno rychle vyřešit. Když už toho bylo moc, chtěl jsem se stáhnout a nemluvit s nikým.",
        "Dlouho jsem tuhle chuť považoval za jedinou logickou reakci. Až později jsem začal rozlišovat dvě věci. Co mám chuť udělat a co se nakonec rozhodnu udělat.",
        "Mezi nimi někdy byla jen jedna věta: „Právě teď mám chuť…“ Tohle pojmenování mi nebralo sílu. Přidávalo mi možnost volby.",
      ],
    },
    recognition: {
      title: "Tohle se možná děje i tobě",
      items: [
        "Odpovíš dřív, než víš, co chceš sdělit.",
        "Začneš kontrolovat, vysvětlovat, útočit nebo mizet.",
        "Svoji první chuť považuješ za pokyn, který musíš poslechnout.",
      ],
    },
    education: {
      title: "Emoce může nést připravenost k určitému jednání.",
      paragraphs: [
        "Vztek může přinést chuť postavit se proti něčemu. Strach může táhnout k úniku, kontrole nebo hledání bezpečí. Smutek může vést ke stažení nebo hledání blízkosti. Neexistuje ale jedna povinná reakce pro každou emoci.",
        "Když zachytíš impulz jako samostatnou vrstvu, nemusíš ho popřít. Můžeš si ho všimnout a potom zvolit další krok podle celé situace.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-impulse-choice-v1.webp",
      alt: "Ručně kreslená postava, která si všímá svého impulzu",
      caption: "Emoce může ukázat směr první chuti. Rozhodnutí může zahrnout i další informace.",
    },
    expert: {
      field: "PSYCHOLOGIE A EMOCE",
      title: "Emoce a tendence jednat spolu souvisejí, ale nevytvářejí pevný automat.",
      paragraphs: [
        "Výzkum akčních tendencí popisuje, že emoční situace mohou být spojené s připraveností přiblížit se, vzdálit se nebo se postavit proti podnětu. V jedné situaci se může objevit i více protichůdných tendencí.",
      ],
      limit: "Z emoce nelze automaticky předpovědět chování. Kontext, zkušenost, další motivy a vědomá volba mohou další krok změnit.",
      source: {
        label: "O'Toole a Mikkelsen, 2021",
        href: "https://pubmed.ncbi.nlm.nih.gov/33538033/",
      },
    },
    practice: {
      title: "Doplň jednu nedokončenou větu.",
      why: "Odděluješ první chuť od rozhodnutí. I krátké pojmenování může vytvořit prostor pro další informaci.",
      steps: [
        "Všimni si chvíle, kdy chceš reagovat rychle.",
        "Doplň větu: „Právě teď mám chuť…“",
        "Potom se zeptej: Chci to opravdu udělat teď, nebo potřebuji ještě chvíli?",
      ],
      prompt: "K jaké reakci mě emoce táhla?",
    },
    closing: ["Impulz může být rychlý.", "Rozhodnutí nemusí být stejně rychlé."],
  },
  {
    day: 7,
    opening: {
      eyebrow: "PRVNÍ OHLÉDNUTÍ",
      title: "Po týdnu nehledáme verdikt. Hledáme první stopu, která se možná vrací.",
      paragraphs: [
        "Když jsem se začal pozorovat, měl jsem tendenci dělat rychlé závěry: „Tohle dělám vždycky. Takový prostě jsem.“ Jenže jeden těžký den ještě není můj celý příběh.",
        "Mnohem užitečnější bylo položit si několik obyčejných otázek. Která situace se opakovala? Čeho jsem si všiml v těle? Jakou sílu měla emoce? Co jsem měl chuť udělat?",
        "Po sedmi dnech ještě nepotřebuješ rozumět všemu. Stačí, když dokážeš pojmenovat jednu věc, které si příští týden chceš všimnout o trochu dřív.",
      ],
    },
    recognition: {
      title: "Pozor na rychlé soudy",
      items: [
        "Jedna emoce z tebe nedělá určitý typ člověka.",
        "Jedna silná situace ještě není opakující se vzorec.",
        "To, co sis nezapsal, není důkaz, že to nezažíváš.",
      ],
    },
    education: {
      title: "Vzorec začíná jako hypotéza, ne jako nálepka.",
      paragraphs: [
        "Když se stejný signál objeví v několika podobných chvílích, stojí za to ho dál sledovat. Nemusíš hned vědět, proč vzniká ani co přesně znamená.",
        "Dobrá osobní mapa se může měnit. Nové záznamy ji zpřesní, někdy potvrdí první dojem a jindy ho úplně promění.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-pattern-clue-v1.webp",
      alt: "Ručně kreslená postava, která se ohlíží za prvním týdnem",
      caption: "Nejprve sbíráš konkrétní chvíle. Teprve potom hledáš, co se v nich vrací.",
    },
    expert: {
      field: "KOUČOVACÍ RÁMEC",
      title: "Shrnutí má otevřít přesnější otázku, ne uzavřít tvoji identitu.",
      paragraphs: [
        "Záznamy používáme jako materiál pro pozorování. Hledáme opakování v situacích, tělesných signálech, intenzitě a impulzech. Z těchto dat formulujeme pracovní otázku pro další týden.",
      ],
      limit: "Aplikace ani krátký sebezáznam neurčují diagnózu, příčinu ani definitivní výklad osobnosti.",
    },
    practice: {
      title: "Vytvoř si první týdenní ohlédnutí.",
      why: "Nejde o známkování týdne. Vybíráš jedinou stopu, kterou budeš dál pozorovat.",
      steps: [
        "Najdi emoci nebo tělesný signál, který se objevil více než jednou.",
        "Napiš, v jakých situacích se objevoval.",
        "Dokonči větu: Příští týden si chci dřív všimnout…",
      ],
      prompt: "Čeho jsem si tento týden všiml?",
    },
    closing: ["Nehledej diagnózu.", "Hledej jednu stopu, kterou dokážeš poznat o chvíli dřív."],
  },
  {
    day: 8,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Dlouho jsem pro spoustu nepříjemných stavů používal jedno slovo.",
      paragraphs: [
        "Byl jsem prostě naštvaný. Někdy to opravdu byl vztek. Jindy pod tím byla nejistota, strach, zklamání nebo smutek.",
        "Dokud jsem měl pro všechno jeden název, pokládal jsem si pořád stejnou otázku a často dělal pořád stejnou věc.",
        "Pomohlo mi nezačínat podrobně. Nejdřív jsem hledal širokou rodinu. Je to blíž strachu, vzteku, smutku, radosti, odporu nebo překvapení? Teprve potom jsem šel o krok dál.",
      ],
    },
    recognition: {
      title: "Možná máš pro různé stavy pořád stejné slovo.",
      items: [
        "Pro většinu nepříjemných stavů používáš slovo „špatně“.",
        "Všechno napětí označuješ jako stres.",
        "Každou silnou nepříjemnou emoci nazýváš vztekem.",
      ],
    },
    education: {
      title: "Rodina emocí je první orientační bod, ne konečný verdikt.",
      paragraphs: [
        "Nemá ti říct, co doopravdy cítíš. Má zmenšit počet možností tak, aby ses v nich neztratil.",
        "Můžeš vybrat jednu nebo dvě rodiny. Můžeš také zvolit „nevím“. Cílem není rozhodnout se správně. Cílem je všimnout si, která možnost s tvojí zkušeností rezonuje o trochu víc než ostatní.",
      ],
    },
    illustration: {
      src: "/prostor-assets/prototypes/kk-hand-drawn-doodle-emotion-families-v1.svg",
      alt: "Ručně kreslená postava mezi několika možnými směry emocí",
      caption: "Začni široce. Jeden směr může být pro tuto chvíli o trochu bližší než ostatní.",
    },
    expert: {
      field: "PSYCHOLOGIE A EMOCE",
      title: "Rozdělení do rodin je praktická pomůcka pro orientaci.",
      paragraphs: [
        "Lidé používají k popisu emocí různé kategorie a slova. Široká rodina může pomoct zúžit výběr a postupně hledat přesnější pojmenování.",
      ],
      limit: "Zvolená rodina sama o sobě neurčuje příčinu, potřebu ani vhodnou reakci. Není to biologický test ani diagnóza.",
    },
    practice: {
      title: "Začni jednou konkrétní chvílí a širokou rodinou.",
      why: "Když začneš široce, nemusíš se ztratit v desítkách slov.",
      steps: [
        "Vrať se k jedné konkrétní chvíli z dneška.",
        "Připomeň si, co se stalo a co se změnilo v těle.",
        "Vyber jednu nebo nejvýše dvě rodiny emocí.",
        "Napiš, proč jsou ti tyto možnosti blízko.",
      ],
      prompt: "Která široká rodina je tomu, co prožívám, nejblíž?",
      fields: [
        { id: "situation", label: "Co se v té chvíli stalo?", type: "textarea", placeholder: "Jedna konkrétní věta o situaci.", required: true },
        { id: "families", label: "Která jedna nebo dvě rodiny jsou nejblíž?", type: "family-multiselect", required: true, maxSelections: 2 },
        { id: "intensity", label: "Jak silné to bylo od jedné do pěti?", type: "scale", required: true },
        { id: "why", label: "Vybral jsem tuto možnost, protože…", type: "textarea", placeholder: "Co ti na této možnosti připadá blízké?", required: true },
      ],
    },
    closing: ["Nemusíš ještě najít přesné slovo.", "Pro dnešek stačí poznat směr, kterým se chceš podívat."],
  },
  {
    day: 9,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Přesnější slovo mi nedalo hotovou odpověď. Otevřelo mi lepší otázku.",
      paragraphs: [
        "Když jsem řekl „jsem naštvaný“, měl jsem pocit, že už svému stavu rozumím.",
        "Jenže podráždění, frustrace, bezmoc a pocit křivdy ve mně pokaždé otevíraly trochu jinou otázku.",
        "Přesnější slovo mi pomohlo přestat zacházet s každou nepříjemnou chvílí stejně.",
      ],
    },
    recognition: {
      title: "Přesnost nemusí znamenat jistotu.",
      items: [
        "Používáš stále stejných několik slov.",
        "Přesnější pojmenování považuješ za zbytečné slovíčkaření.",
        "Hledáš tak dlouho, až raději nevybereš nic.",
      ],
    },
    education: {
      title: "Přesnější slovo není správnější emoce.",
      paragraphs: [
        "Je to bližší popis toho, co právě prožíváš. Když je široká rodina vztek, může být nejblíž podráždění, frustrace, bezmoc nebo pocit křivdy.",
        "Můžeš ponechat dvě možnosti. Nemusíš mezi nimi rozhodnout, pokud si ještě nejsi jistý.",
      ],
    },
    illustration: {
      src: "/prostor-assets/prototypes/kk-hand-drawn-doodle-closer-word-v1.svg",
      alt: "Ručně kreslená postava vybírající bližší emoční slovo",
      caption: "Jedno o trochu bližší slovo může změnit otázku, kterou si položíš dál.",
    },
    expert: {
      field: "PSYCHOLOGIE A EMOCE",
      title: "Přesnější jazyk může pomoct rozlišit podobné zkušenosti.",
      paragraphs: [
        "Rozlišování emočních slov může lidem pomoct zachytit rozdíly mezi stavy, které by jinak popsali jedním obecným názvem.",
      ],
      limit: "Bohatší slovník automaticky neznamená lepší regulaci a sám nevysvětluje, proč emoce vznikla.",
    },
    practice: {
      title: "Jdi od rodiny o jeden krok blíž.",
      why: "Jedno o trochu bližší slovo může otevřít přesnější otázku.",
      steps: [
        "Vyber jednu širokou rodinu emocí.",
        "Přečti si několik slov, která do ní patří.",
        "Označ jedno nebo dvě slova, která s tebou nejvíc rezonují.",
        "Napiš, čeho si při použití tohoto slova všímáš.",
      ],
      prompt: "Které jedno nebo dvě přesnější slova jsou mé zkušenosti nejblíž?",
      fields: [
        { id: "family", label: "Která rodina je nejblíž?", type: "family-select", required: true },
        { id: "emotions", label: "Které jedno nebo dvě slova jsou o krok blíž?", type: "emotion-multiselect", dependsOn: "family", maxSelections: 2, required: true },
        { id: "difference", label: "Když použiju toto slovo, všímám si…", type: "textarea", placeholder: "Co se v popisu tvojí zkušenosti změnilo?", required: true },
      ],
    },
    closing: ["Přesnější slovo tě nemá zavřít do škatulky.", "Má ti pomoct položit si lepší otázku."],
  },
  {
    day: 10,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Dřív jsem svůj výklad situace považoval za emoci.",
      paragraphs: [
        "Když se mě někdo zeptal, co cítím, často jsem odpověděl větou: „Cítím, že si mě neváží.“ Pro mě to byla emoce. Ve skutečnosti v té větě už byl celý výklad situace.",
        "Když jsem to začal rozdělovat, mohl jsem si všimnout něčeho přesnějšího. Situace byla: „Nedostal jsem odpověď.“ Myšlenka byla: „Nejsem pro něj důležitý.“ Emoce mohla být nejistota, smutek nebo vztek.",
        "Teprve s touto mapou jsem mohl zkoumat, co se ve mně opravdu děje.",
      ],
    },
    recognition: {
      title: "Možná se tvoje emoce skrývá uvnitř celého příběhu.",
      items: [
        "Tvoje věta začíná „Cítím, že…“ a pokračuje názorem na druhého člověka.",
        "Svoje vysvětlení považuješ za jediný možný fakt.",
        "Myšlenku chceš vyvrátit dřív, než zachytíš emoci.",
      ],
    },
    education: {
      title: "Situace, myšlenka a emoce se ovlivňují. Přesto je můžeme na chvíli oddělit.",
      paragraphs: [
        "Situace může znít: „Dnes mi neodpověděl na dvě zprávy.“ Myšlenka může znít: „Nezáleží mu na mně.“ Emoce může být nejistota a smutek.",
        "Oddělení neznamená, že je myšlenka chybná. Znamená jen, že z ní neděláme celou zkušenost.",
      ],
    },
    illustration: {
      src: "/prostor-assets/prototypes/kk-hand-drawn-doodle-situation-thought-emotion-v1.svg",
      alt: "Ručně kreslené rozlišení situace, myšlenky a emoce",
      caption: "Jedna chvíle může obsahovat událost, příběh v hlavě i emoci. Každá vrstva přináší jinou informaci.",
    },
    expert: {
      field: "PSYCHOLOGIE A EMOCE",
      title: "Význam, který situaci přisoudíme, souvisí s naším prožíváním.",
      paragraphs: [
        "Myšlenky, tělesné změny a emoce se mohou navzájem ovlivňovat a v běžném životě mohou přicházet téměř současně.",
      ],
      limit: "Krátký zápis neurčuje, která vrstva přišla jako první ani zda je tvoje interpretace pravdivá nebo nepravdivá.",
    },
    practice: {
      title: "Rozděl jednu chvíli do tří vět.",
      why: "Když vrstvy oddělíš, můžeš každou z nich zkoumat samostatně.",
      steps: [
        "Napiš jednu větu, co se skutečně stalo.",
        "Napiš jednu větu, co sis o tom začal říkat.",
        "Vyber jedno nebo dvě emoční slova.",
        "Označ, která vrstva je pro tebe nejtěžší.",
      ],
      prompt: "Co cítím a co si o tom začínám myslet?",
      fields: [
        { id: "situation", label: "Situace: Co by mohla zachytit kamera?", type: "textarea", placeholder: "„Dnes mi neodpověděl na dvě zprávy.“", required: true },
        { id: "thought", label: "Myšlenka: Co sis o tom začal říkat?", type: "textarea", placeholder: "„Nezáleží mu na mně.“", required: true },
        { id: "emotions", label: "Emoce: Která jedna nebo dvě slova jsou nejblíž?", type: "text", placeholder: "Třeba nejistota a smutek.", required: true },
        { id: "hardest", label: "Která vrstva pro tebe byla nejtěžší rozlišit?", type: "text", placeholder: "Situace, myšlenka nebo emoce?", required: true },
      ],
    },
    closing: ["Myšlenka může být důležitá.", "Nemusí ale mluvit za celou tvoji zkušenost."],
  },
  {
    day: 11,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Některé důležité chvíle byly pravdivé ve dvou směrech současně.",
      paragraphs: [
        "Měl jsem za to, že když mám v emocích jasno, měl bych najít jedno správné slovo.",
        "Jenže jsem mohl mít radost z nové příležitosti a zároveň strach, jestli ji zvládnu. Mohl jsem někoho milovat a současně být naštvaný.",
        "Jedna emoce nerušila druhou. Obě mi pomáhaly vidět větší část situace.",
      ],
    },
    recognition: {
      title: "Dvě emoce neznamenají, že v sobě nemáš jasno.",
      items: [
        "Nutíš se vybrat jen jednu emoci.",
        "Smíšené prožívání považuješ za nerozhodnost.",
        "Jednu emoci odmítneš, protože se ti k situaci nehodí.",
      ],
    },
    education: {
      title: "V jedné situaci může být pravdivých více emočních slov.",
      paragraphs: [
        "Někdy spolu souvisejí. Jindy zachycují různé části stejné zkušenosti.",
        "Nemusíš rozhodnout, která emoce je pravdivější. Můžeš se zeptat, co každé slovo zachycuje. Radost může patřit k příležitosti. Strach může patřit k nejistotě, která s ní přichází.",
      ],
    },
    illustration: {
      src: "/prostor-assets/prototypes/kk-hand-drawn-doodle-two-emotions-v1.svg",
      alt: "Ručně kreslená postava prožívající dvě emoce současně",
      caption: "Dvě emoce se nemusí přetahovat o pravdu. Každá může zachytit jinou část stejné chvíle.",
    },
    expert: {
      field: "PSYCHOLOGIE A EMOCE",
      title: "Smíšené emoce jsou běžnou součástí složitých situací.",
      paragraphs: [
        "Současný výskyt více emocí může odrážet různé významy, očekávání nebo části jedné situace.",
      ],
      limit: "Dvě zvolená slova sama nevysvětlují vnitřní konflikt ani neurčují, jak se máš rozhodnout.",
    },
    practice: {
      title: "Dovol dnes dvě možnosti současně.",
      why: "Nemusíš vytlačit část své zkušenosti jen proto, abys měl rychle jasno.",
      steps: [
        "Vrať se k jedné složitější situaci.",
        "Vyber dvě emoční slova, která mohou být pravdivá současně.",
        "Ke každému napiš, co ve tvé zkušenosti zachycuje.",
        "Napiš, co se změnilo, když jsi připustil obě možnosti.",
      ],
      prompt: "Co když jsou pravdivá dvě emoční slova současně?",
      fields: [
        { id: "situation", label: "Která situace v tobě vyvolala více pocitů?", type: "textarea", required: true },
        { id: "emotionOne", label: "První emoční slovo", type: "text", placeholder: "Třeba radost.", required: true },
        { id: "meaningOne", label: "Co první slovo zachycuje?", type: "textarea", required: true },
        { id: "emotionTwo", label: "Druhé emoční slovo", type: "text", placeholder: "Třeba strach.", required: true },
        { id: "meaningTwo", label: "Co druhé slovo zachycuje?", type: "textarea", required: true },
        { id: "change", label: "Co se změnilo, když jsi připustil obě možnosti?", type: "textarea", required: true },
      ],
    },
    closing: ["Dvě emoce se nemusí navzájem rušit.", "Někdy ti společně ukážou víc než jedna rychlá jistota."],
  },
  {
    day: 12,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Někdy jsem opravdu nevěděl, co cítím. Záznam přesto nebyl prázdný.",
      paragraphs: [
        "Dřív jsem odpověď „nevím“ bral jako důkaz, že tohle neumím.",
        "Potom jsem si všiml, že i bez přesného slova pořád můžu zaznamenat spoustu věcí. Věděl jsem, že se mi změnil dech. Že mám chuť odejít. Že je to silné asi na čtyřku.",
        "Slovo přišlo někdy později a někdy vůbec. Kontakt se sebou ale mohl začít i bez něj.",
      ],
    },
    recognition: {
      title: "„Nevím“ může být poctivější než náhodně vybrané slovo.",
      items: [
        "Bez přesného názvu celý záznam vzdáš.",
        "Vybereš náhodné slovo jen proto, abys úkol dokončil.",
        "Za odpověď „nevím“ se stydíš nebo ji považuješ za selhání.",
      ],
    },
    education: {
      title: "Když nemáš slovo, začni u toho, co je dostupné.",
      paragraphs: [
        "Můžeš zaznamenat situaci, tělesnou změnu, intenzitu a chuť něco udělat.",
        "Později se můžeš k záznamu vrátit. Nemusíš ale slovo doplnit za každou cenu.",
      ],
    },
    illustration: {
      src: "/prostor-assets/prototypes/kk-hand-drawn-doodle-not-knowing-v1.svg",
      alt: "Ručně kreslená postava hledající dostupnou stopu bez přesného slova",
      caption: "Když nemáš název, můžeš začít tělem, intenzitou nebo první chutí něco udělat.",
    },
    expert: {
      field: "PSYCHOLOGIE A VNÍMÁNÍ PROŽÍVÁNÍ",
      title: "Pojmenování vnitřního stavu může být v některých chvílích obtížnější.",
      paragraphs: [
        "Únava, zahlcení, intenzita nebo novost situace mohou ovlivnit, kolik detailů svého prožívání právě dokážeš rozlišit.",
      ],
      limit: "Jedna odpověď „nevím“ není diagnóza ani důkaz, že jsi od emocí odpojený.",
    },
    practice: {
      title: "Zapiš dostupné stopy, i když ještě nemáš název.",
      why: "Trénuješ kontakt se zkušeností, ne výkon v pojmenování.",
      steps: [
        "Pokud emoci neznáš, nech odpověď „nevím“.",
        "Napiš, co se změnilo v těle.",
        "Označ intenzitu od jedné do pěti.",
        "Doplň větu: „Právě teď mám chuť…“",
        "Pokud se později objeví slovo, můžeš ho doplnit.",
      ],
      prompt: "Co dokážu zachytit, i když ještě nemám název?",
      fields: [
        { id: "situation", label: "Co se stalo?", type: "textarea", required: true },
        { id: "body", label: "Co se změnilo v těle?", type: "text", placeholder: "Třeba dech, čelist nebo tempo.", required: true },
        { id: "intensity", label: "Jak silné to bylo od jedné do pěti?", type: "scale", required: true },
        { id: "impulse", label: "Právě teď mám chuť…", type: "textarea", required: true },
        { id: "laterWord", label: "Objevilo se později nějaké slovo?", type: "text", placeholder: "Klidně ponech „nevím“.", required: false },
      ],
    },
    closing: ["„Nevím“ není prázdná odpověď.", "Může to být nejpoctivější místo, ze kterého dnes začít."],
  },
  {
    day: 13,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Některých emocí jsem si všiml až v kontaktu s druhými lidmi.",
      paragraphs: [
        "Sám jsem mohl mít pocit, že jsem v klidu. Potom přišla určitá věta, tón hlasu nebo čekání na odpověď a něco ve mně se změnilo.",
        "Neznamenalo to automaticky, že druhý člověk udělal něco špatně. Neznamenalo to ani, že je problém ve mně.",
        "Byl to kontext, ve kterém jsem mohl lépe vidět svoji reakci.",
      ],
    },
    recognition: {
      title: "Vedle různých lidí se můžeš setkat s různými částmi sebe.",
      items: [
        "Vedle některých lidí zrychlíš, ztichneš nebo začneš víc vysvětlovat.",
        "Emoce si všimneš až po skončení rozhovoru.",
        "Z jedné reakce rychle uděláš rozsudek o celém vztahu.",
      ],
    },
    education: {
      title: "Prožívání se mění podle situace a kontaktu.",
      paragraphs: [
        "Jinak se můžeš cítit sám, jinak vedle autority, partnera, rodiče nebo člověka, u kterého nevíš, co čekat.",
        "Dnes nehledáme, kdo je příčinou. Sledujeme změnu před kontaktem, během něj a po něm. Tím vzniká konkrétnější mapa bez obviňování sebe nebo druhých.",
      ],
    },
    illustration: {
      src: "/prostor-assets/prototypes/kk-hand-drawn-doodle-social-context-v1.svg",
      alt: "Ručně kreslené srovnání stavu před kontaktem a během kontaktu",
      caption: "Sleduj změnu v čase. Nemusíš z ní hned vytvářet rozsudek o vztahu.",
    },
    expert: {
      field: "SOCIÁLNÍ PSYCHOLOGIE A TĚLO",
      title: "Sociální kontext může ovlivnit pozornost, tělesný stav i význam situace.",
      paragraphs: [
        "Očekávání, předchozí zkušenosti a aktuální kontakt s druhým člověkem mohou souviset s tím, čeho si všimneš a jak situaci prožiješ.",
      ],
      limit: "Z jedné reakce nelze určit kvalitu vztahu, úmysl druhého člověka ani minulou příčinu.",
    },
    practice: {
      title: "Sleduj jednu změnu před kontaktem, během něj a po něm.",
      why: "Když sleduješ změnu v čase, nemusíš celou situaci vysvětlit jedním rychlým soudem.",
      steps: [
        "Vyber jeden dnešní kontakt s druhým člověkem.",
        "Napiš, jak ti bylo těsně před ním.",
        "Napiš, co se změnilo během kontaktu.",
        "Vyber jednu nebo dvě emoce.",
        "Napiš, co zůstalo po skončení kontaktu.",
      ],
      prompt: "Co se ve mně mění v přítomnosti druhých lidí?",
      fields: [
        { id: "situation", label: "O jaký kontakt šlo?", type: "textarea", required: true },
        { id: "before", label: "Jak ti bylo těsně před kontaktem?", type: "textarea", required: true },
        { id: "during", label: "Co se změnilo během kontaktu?", type: "textarea", required: true },
        { id: "emotions", label: "Která jedna nebo dvě emoční slova jsou nejblíž?", type: "text", required: true },
        { id: "after", label: "Co v tobě zůstalo po skončení kontaktu?", type: "textarea", required: true },
      ],
    },
    closing: ["Vztahy v nás mohou něco zesílit nebo zviditelnit.", "Jeden záznam ale ještě není rozsudek o tobě ani o druhém člověku."],
  },
  {
    day: 14,
    opening: {
      eyebrow: "DRUHÉ OHLÉDNUTÍ",
      title: "Po dvou týdnech už nevidíš jen seznam emocí. Začínáš vidět svůj jazyk.",
      paragraphs: [
        "Když jsem se po čase podíval na svoje záznamy, některá slova se opakovala. Jiná jsem skoro vůbec nepoužíval.",
        "Neudělal jsem z toho závěr, že emoce, které nepíšu, necítím. Vzal jsem to jako otázku.",
        "Která slova jsou mi dostupná? Kterým se možná vyhýbám? A kde ještě potřebuji zůstat zvědavý?",
      ],
    },
    recognition: {
      title: "Tvůj slovník je živá mapa, ne hotový portrét.",
      items: [
        "Několik slov se v tvých záznamech opakuje.",
        "Některé rodiny emocí téměř nepoužíváš.",
        "Z četnosti chceš okamžitě vytvořit závěr o své osobnosti.",
      ],
    },
    education: {
      title: "Emoční slovník ukazuje, co jsi dokázal zachytit v zaznamenaných situacích.",
      paragraphs: [
        "Neukazuje všechny emoce, které jsi zažil. Neukazuje ani to, jaký jsi člověk.",
        "Je to přehled slov, situací a míst nejistoty. S dalšími záznamy se bude měnit.",
      ],
    },
    illustration: {
      src: "/prostor-assets/prototypes/kk-hand-drawn-doodle-emotion-dictionary-v1.svg",
      alt: "Ručně kreslená postava skládající svůj emoční slovník",
      caption: "Některá slova jsou dostupná snadno. Jiná se teprve učíš hledat.",
    },
    expert: {
      field: "KOUČOVACÍ RÁMEC",
      title: "Souhrn záznamů slouží k tvorbě dalších otázek.",
      paragraphs: [
        "Může ukázat četnost použitých slov, související situace a místa, ve kterých sis nebyl jistý.",
      ],
      limit: "Chybějící slovo neznamená, že danou emoci necítíš. Četnost záznamu neznamená diagnózu ani stabilní vlastnost osobnosti.",
    },
    practice: {
      title: "Vytvoř si první verzi svého emočního slovníku.",
      why: "Druhý týden nemá skončit známkou. Má skončit osobním slovníkem a jednou otázkou pro další pozorování.",
      steps: [
        "Vyber tři slova, která pro tebe byla snadno dostupná.",
        "Vyber jedno slovo, které tě překvapilo.",
        "Označ oblast, ve které často volíš „nevím“ nebo váháš.",
        "Napiš, čeho si chceš příští týden všímat.",
      ],
      prompt: "Která slova používám snadno a která zatím hledám?",
      fields: [
        { id: "easyWords", label: "Tři slova, která pro tebe byla snadno dostupná", type: "textarea", required: true },
        { id: "surprisingWord", label: "Které slovo tě překvapilo?", type: "text", required: true },
        { id: "hardArea", label: "Kde často volíš „nevím“ nebo váháš?", type: "textarea", required: true },
        { id: "nextFocus", label: "Příští týden chci víc sledovat…", type: "textarea", required: true },
      ],
    },
    closing: ["Tvůj emoční slovník není hotový portrét.", "Je to jazyk, kterým se k sobě postupně učíš vracet."],
  },
  {
    day: 15,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Dlouho jsem viděl každou nepříjemnou reakci jako nový problém.",
      paragraphs: [
        "Jednou mě rozhodila zpráva. Jindy tón hlasu. Potom změna domluvy nebo chvíle, kdy ode mě někdo chtěl další rozhodnutí. Situace vypadaly pokaždé jinak, a tak jsem je také pokaždé řešil zvlášť.",
        "Teprve když jsem se podíval na více konkrétních chvil vedle sebe, začal jsem vidět něco společného. Často jsem reagoval nejsilněji ve chvíli, kdy už jsem neměl prostor, nevěděl jsem, co se ode mě čeká, nebo jsem měl pocit, že všechno zůstává na mně.",
        "Vzorec pro mě nebyla nálepka. Byl to opakující se děj, kterého jsem si konečně mohl všimnout.",
      ],
    },
    recognition: {
      title: "Možná se mění kulisy, ale některé části děje zůstávají podobné.",
      items: [
        "V různých situacích se vrací podobná emoce nebo tělesný signál.",
        "Opakovaně tě rozhodí chvíle, které mají něco společného.",
        "Každou reakci řešíš zvlášť a zatím nevidíš, co je propojuje.",
      ],
    },
    education: {
      title: "Vzorec vzniká teprve tam, kde se něco podobného opakuje.",
      paragraphs: [
        "Jedna situace ještě vzorec netvoří. Potřebuješ několik konkrétních chvil, ve kterých si všimneš podobnosti.",
        "Podobnost nemusí být v tom, co se stalo navenek. Může být v významu, který pro tebe situace měla, v tělesném signálu, emoci nebo v tom, co jsi potom udělal.",
        "Dnes nic nevysvětlujeme do hloubky. Jen hledáme první společnou nit.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-pattern-clue-v1.webp",
      alt: "Ručně kreslené opakující se situace propojené jednou společnou nití",
      caption: "Kulisy se mohou měnit. Společná nit bývá někdy schovaná uvnitř reakce.",
    },
    expert: {
      field: "UČENÍ A POZORNOST",
      title: "Mozek hledá pravidelnosti, aby se mohl rychleji orientovat.",
      paragraphs: [
        "Když se podobný děj opakuje, může se stát snáze dostupným a rychleji spouštět známou reakci. Záznamy ti umožní porovnat konkrétní situace místo toho, abys spoléhal jen na dojem.",
      ],
      limit: "Podobnost několika záznamů ještě neurčuje příčinu ani neměnnou vlastnost. Je to pracovní stopa, kterou můžeš dál ověřovat.",
    },
    practice: {
      title: "Polož vedle sebe tři konkrétní chvíle.",
      why: "Když je uvidíš vedle sebe, může se objevit společná nit, která v jednotlivé situaci nebyla vidět.",
      steps: [
        "Vyber tři situace, ve kterých se objevila podobná emoce nebo reakce.",
        "Napiš, co měly společného.",
        "Doplň větu: Nejčastěji se to ve mně ozve, když…",
      ],
      prompt: "Co se v mých reakcích začíná opakovat?",
      fields: [
        { id: "situations", label: "Tři konkrétní chvíle, které si jsou něčím podobné", type: "textarea", required: true },
        { id: "commonThread", label: "Co mají společného?", type: "textarea", required: true },
        { id: "whenItReturns", label: "Nejčastěji se to ve mně ozve, když…", type: "textarea", required: true },
      ],
    },
    closing: ["Vzorec není nálepka, kterou si na sebe nalepíš.", "Je to opakující se děj, kterého si můžeš začít všímat."],
  },
  {
    day: 16,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Moje reakce nezačínala větou, kterou jsem řekl nahlas.",
      paragraphs: [
        "Když jsem se k některým situacím vracel, viděl jsem, že ostrá odpověď přišla až na konci. O chvíli dřív jsem sevřel čelist. Zrychlil se mi dech. Přestal jsem druhého opravdu poslouchat a v hlavě už jsem si připravoval obranu.",
        "Dřív jsem tyhle změny považoval za nepodstatné. Jenže právě ony mi začaly ukazovat, že se blížím k místu, kde už budu mít méně prostoru pro volbu.",
        "Nemusel jsem zachytit všechno. Potřeboval jsem poznat jeden svůj časný signál.",
      ],
    },
    recognition: {
      title: "První signál může být nenápadný a přesto se pravidelně vracet.",
      items: [
        "Změní se dech, čelist, ramena, žaludek nebo tempo řeči.",
        "Začneš rychleji vysvětlovat, kontrolovat, ustupovat nebo se stahovat.",
        "Signálu si všimneš až zpětně, když už reakce proběhla.",
      ],
    },
    education: {
      title: "Časný signál je tvoje osobní upozornění, ne univerzální pravidlo.",
      paragraphs: [
        "Stejný tělesný pocit může v různých situacích znamenat něco jiného. Proto nehledáme správný signál pro všechny lidi.",
        "Hledáme změnu, která se vrací právě u tebe a často přichází před známou reakcí. Čím konkrétněji ji popíšeš, tím snadněji ji příště poznáš.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-early-signal-v1.webp",
      alt: "Ručně kreslená postava, která zachytila první malý signál před silnou reakcí",
      caption: "Nečekáš na alarm. Učíš se poznat první malé světlo, které se rozsvítí.",
    },
    expert: {
      field: "NERVOVÝ SYSTÉM A TĚLO",
      title: "Tělesná změna může být dostupná dřív než přesné pojmenování emoce.",
      paragraphs: [
        "Pozornost k dechu, svalovému napětí, teplotě nebo tempu může člověku nabídnout konkrétní bod, kterého si lze všimnout v reálném čase.",
      ],
      limit: "Jeden tělesný signál neurčuje konkrétní emoci ani důvod. Pokud je nový, silný nebo zdravotně znepokojivý, patří také k odbornému posouzení.",
    },
    practice: {
      title: "Najdi jeden signál, který u tebe přichází brzy.",
      why: "Největší hodnotu nemá dlouhý seznam. Má ji signál, který dokážeš poznat v běžné situaci.",
      steps: [
        "Vrať se k jedné opakující se reakci.",
        "Přehraj si několik vteřin před ní.",
        "Vyber první změnu, které by sis mohl všimnout.",
        "Napiš, jak přesně ji poznáš.",
      ],
      prompt: "Co u mě přichází o chvíli dřív než známá reakce?",
      fields: [
        { id: "reaction", label: "Kterou reakci sleduješ?", type: "textarea", required: true },
        { id: "earlySignal", label: "Jaký první signál jí obvykle předchází?", type: "text", required: true },
        { id: "howIKnow", label: "Jak přesně poznáš, že se signál objevil?", type: "textarea", required: true },
      ],
    },
    closing: ["Nemusíš zachytit celou reakci najednou.", "Stačí začít poznávat první signál, který jí předchází."],
  },
  {
    day: 17,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Když přišlo napětí, moje tělo už často znalo další krok.",
      paragraphs: [
        "V některých chvílích jsem začal víc tlačit. Mluvil jsem rychleji, vysvětloval a chtěl situaci okamžitě vyřešit. Jindy jsem se stáhl, přestal mluvit a potřeboval mít od všeho klid.",
        "Dlouho jsem to bral jako důkaz svého charakteru. Až později jsem v tom začal vidět naučené způsoby, kterými jsem se snažil zvládnout nepříjemnou chvíli.",
        "Když jsem svůj obvyklý krok dokázal popsat bez odsouzení, přestal být neviditelný.",
      ],
    },
    recognition: {
      title: "Emoce často přináší chuť udělat něco rychle a známě.",
      items: [
        "Začneš tlačit, vysvětlovat, kontrolovat nebo dokazovat.",
        "Ustoupíš, ztichneš, odejdeš nebo odložíš rozhodnutí.",
        "Reakce proběhne tak rychle, že ji vnímáš jako jedinou možnost.",
      ],
    },
    education: {
      title: "Impulz je chuť jednat. Chování je to, co skutečně uděláš.",
      paragraphs: [
        "Můžeš mít chuť odejít a přesto zůstat. Můžeš mít chuť odpovědět ostře a přesto si dát čas.",
        "Dnes ještě nehledáme lepší reakci. Nejprve přesně pojmenujeme obvyklý krok, který po emoci následuje. Bez toho bychom měnili něco, co jsme pořádně neviděli.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-usual-step-v1.webp",
      alt: "Ručně kreslená postava stojící před několika známými způsoby reakce",
      caption: "Známý krok může působit automaticky. Přesto ho můžeš začít pozorovat.",
    },
    expert: {
      field: "EMOCE A JEDNÁNÍ",
      title: "Emoce může připravovat tělo k určitému směru jednání.",
      paragraphs: [
        "Součástí emoční zkušenosti bývá také impulz přiblížit se, vzdálit se, bránit se, hledat podporu nebo situaci rychle změnit.",
      ],
      limit: "Impulz není příkaz a sám o sobě neurčuje správné chování. Význam i vhodný další krok závisí na situaci a bezpečí.",
    },
    practice: {
      title: "Pojmenuj svůj obvyklý krok bez hodnocení.",
      why: "Když reakci popíšeš jako pozorovatel, můžeš ji později zachytit dřív a přesněji.",
      steps: [
        "Vyber jednu emoci nebo situaci, která se vrací.",
        "Napiš, co máš v takové chvíli chuť udělat.",
        "Napiš, co potom obvykle skutečně uděláš.",
        "Popiš to bez slov jako vždycky, nikdy, správně nebo špatně.",
      ],
      prompt: "Co obvykle udělám, když se takto cítím?",
      fields: [
        { id: "situationEmotion", label: "Která situace nebo emoce se vrací?", type: "textarea", required: true },
        { id: "impulse", label: "Co máš v tu chvíli chuť udělat?", type: "textarea", required: true },
        { id: "usualAction", label: "Co potom obvykle skutečně uděláš?", type: "textarea", required: true },
      ],
    },
    closing: ["Obvyklá reakce není celá tvoje identita.", "Je to známý krok, který se právě učíš vidět."],
  },
  {
    day: 18,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "I reakce, která mi později vadila, mi v dané chvíli něco přinesla.",
      paragraphs: [
        "Když jsem rychle odpověděl, měl jsem na chvíli pocit, že mám situaci pod kontrolou. Když jsem se stáhl, na chvíli jsem nemusel nic dalšího řešit. Když jsem souhlasil, na chvíli zmizelo napětí mezi mnou a druhým člověkem.",
        "Tohle pro mě bylo důležité pochopit. Ne proto, abych si každou reakci omluvil. Ale abych viděl, proč se vrací.",
        "Krátká úleva bývá nenápadná odměna. Když ji přehlédnu, moje chování vypadá nesmyslně. Když ji uvidím, můžu začít hledat jiný způsob, který mě nebude stát tolik.",
      ],
    },
    recognition: {
      title: "Obvyklý krok může krátkodobě ulevit, i když má později cenu.",
      items: [
        "Kontrola na chvíli sníží nejistotu.",
        "Stažení na chvíli zastaví další požadavky.",
        "Souhlas na chvíli uklidní konflikt.",
      ],
    },
    education: {
      title: "Krátká úleva pomáhá vysvětlit, proč se některé reakce vracejí.",
      paragraphs: [
        "Chování nemusí být dlouhodobě užitečné, aby mělo okamžitý účinek. Někdy stačí pár vteřin pocitu kontroly, klidu nebo odstupu.",
        "Dnes nehledáme vinu. Zjišťujeme, co ti reakce v dané chvíli poskytne. Právě tam může být ukrytá důležitá informace pro další volbu.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-short-relief-v1.webp",
      alt: "Ručně kreslená postava, která na chvíli odložila napětí, ale vidí jeho pozdější návrat",
      caption: "Krátká úleva může být skutečná. Stejně skutečná může být i její pozdější cena.",
    },
    expert: {
      field: "UČENÍ A CHOVÁNÍ",
      title: "Chování, které rychle sníží nepohodu, se může snadněji opakovat.",
      paragraphs: [
        "Okamžitý účinek bývá pro učení velmi dostupný. Dlouhodobý dopad přichází později, a proto může mít na příští automatickou reakci menší vliv.",
      ],
      limit: "Tento rámec nevysvětluje každé chování a není omluvou pro ubližování sobě ani druhým. Pomáhá položit přesnější otázku.",
    },
    practice: {
      title: "Najdi krátkou úlevu uvnitř jedné známé reakce.",
      why: "Když pochopíš okamžitý přínos, přestaneš se jen ptát, proč to zase dělám, a získáš konkrétnější mapu.",
      steps: [
        "Vyber svůj obvyklý krok ze včerejška.",
        "Napiš, co se v prvních vteřinách nebo minutách změní.",
        "Doplň větu: Na chvíli mi to přinese…",
      ],
      prompt: "Co mi moje obvyklá reakce na chvíli přinese?",
      fields: [
        { id: "usualAction", label: "Kterou obvyklou reakci sleduješ?", type: "textarea", required: true },
        { id: "immediateChange", label: "Co se díky ní na chvíli změní?", type: "textarea", required: true },
        { id: "shortRelief", label: "Na chvíli mi to přinese…", type: "text", required: true },
      ],
    },
    closing: ["Krátká úleva není důkaz, že je reakce špatná nebo správná.", "Je to odpověď na otázku, proč se k ní tvoje tělo může vracet."],
  },
  {
    day: 19,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Úleva přišla rychle. Skutečnou cenu jsem často uviděl až později.",
      paragraphs: [
        "Když jsem se stáhl, měl jsem chvíli klid. Později ale zůstalo něco nedořečeného mezi mnou a druhým člověkem. Když jsem tlačil, věci se někdy opravdu pohnuly. Já jsem však zůstal vyčerpaný a lidé vedle mě opatrnější.",
        "Dřív jsem se díval jen na to, co reakce vyřešila okamžitě. Potom jsem začal sledovat i to, co po ní zůstalo.",
        "Dopad není trest ani důvod k sebeobviňování. Je to druhá polovina informace.",
      ],
    },
    recognition: {
      title: "To, co pomůže v první minutě, může mít jiný dopad za hodinu nebo za den.",
      items: [
        "Po reakci zůstane únava, stud, napětí nebo odpojení.",
        "Druhý člověk se stáhne, začne se bránit nebo neví, co se stalo.",
        "Situace se vrátí, protože byla přerušená, ale nevyřešená.",
      ],
    },
    education: {
      title: "Celá mapa potřebuje krátkodobý účinek i pozdější dopad.",
      paragraphs: [
        "Kdybys viděl jen pozdější cenu, mohl by ses za reakci odsoudit. Kdybys viděl jen okamžitou úlevu, chyběla by ti informace o tom, co vytváří dál.",
        "Zkus se podívat zvlášť na dopad na sebe, na druhé a na samotnou situaci. Nemusí být ve všech třech oblastech stejný.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-after-impact-v1.webp",
      alt: "Ručně kreslená postava sledující stopu, kterou za sebou zanechala její reakce",
      caption: "Reakce nekončí poslední větou. Něco po ní zůstává v tobě, mezi lidmi i v situaci.",
    },
    expert: {
      field: "REFLEXE A UČENÍ",
      title: "Zpětný pohled propojuje okamžitý účinek s pozdějším výsledkem.",
      paragraphs: [
        "Bez zpětného pohledu bývá nejsnáze dostupná část, která přišla okamžitě. Reflexe umožňuje zahrnout i informace, které se ukázaly s odstupem.",
      ],
      limit: "Dopad nelze vždy přesně určit a nemůžeš automaticky vědět, co prožíval druhý člověk. Odděluj pozorování od domněnky.",
    },
    practice: {
      title: "Podívej se, co po reakci zůstalo.",
      why: "Dopad doplní mapu o část, kterou v samotné chvíli často nemáš kapacitu vidět.",
      steps: [
        "Vyber jednu konkrétní reakci z posledních dní.",
        "Napiš, co po ní zůstalo v tobě.",
        "Napiš, co bylo vidět mezi tebou a druhými.",
        "Napiš, co se stalo se samotnou situací.",
      ],
      prompt: "Co moje reakce vytvořila potom?",
      fields: [
        { id: "reaction", label: "Kterou konkrétní reakci sleduješ?", type: "textarea", required: true },
        { id: "impactSelf", label: "Co po ní zůstalo v tobě?", type: "textarea", required: true },
        { id: "impactOthers", label: "Co bylo vidět mezi tebou a druhými?", type: "textarea", required: true },
        { id: "impactSituation", label: "Co se stalo se samotnou situací?", type: "textarea", required: true },
      ],
    },
    closing: ["Dopad není rozsudek nad minulostí.", "Je to informace, kterou můžeš použít pro příští volbu."],
  },
  {
    day: 20,
    opening: {
      eyebrow: "KRISTIÁNŮV VSTUP",
      title: "Největší změna nepřišla ve chvíli, kdy jsem našel dokonalou reakci.",
      paragraphs: [
        "Přišla ve chvíli, kdy jsem dokázal zachytit jeden článek o něco dřív. Sevřenou čelist. Myšlenku, že to musím vyřešit hned. Chuť odejít nebo začít tlačit.",
        "Někdy jsem potom udělal něco jinak. Jindy ne. Ale automatický děj už nebyl úplně neviditelný.",
        "Místo pro volbu pro mě neznamenalo naprostý klid. Znamenalo malou chvíli, ve které jsem mohl vidět, co se právě děje.",
      ],
    },
    recognition: {
      title: "Nemusíš změnit celou reakci, aby vznikla první odbočka.",
      items: [
        "Dokážeš si všimnout signálu, i když potom zareaguješ stejně.",
        "Umíš reakci o pár vteřin odložit nebo ji pojmenovat nahlas.",
        "Místo dokonalého řešení potřebuješ jeden realistický další krok.",
      ],
    },
    education: {
      title: "Místo pro volbu může vzniknout v různých částech děje.",
      paragraphs: [
        "Můžeš upravit podmínky ještě před náročnou situací. Můžeš zachytit tělesný signál. Můžeš si ověřit svůj výklad. Můžeš nechat impulz chvíli být, zvolit jinou reakci nebo později napravit dopad.",
        "Nejlepší místo není stejné pro všechny situace. Vyber to, které je pro tebe teď nejdostupnější a bezpečné.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-impulse-choice-v1.webp",
      alt: "Ručně kreslená postava, která mezi impulzem a reakcí objevila malou odbočku",
      caption: "Volba nemusí být velká. Někdy začíná jednou větou, jedním nádechem nebo krátkým odkladem.",
    },
    expert: {
      field: "SEBEREGULACE A UČENÍ",
      title: "Nový krok se snáze trénuje v situaci, ve které máš ještě dostupnou kapacitu.",
      paragraphs: [
        "Když je aktivace velmi silná nebo se necítíš bezpečně, prostor pro složité rozhodování může být menší. Proto má smysl nový krok nejdřív zkoušet v mírnější a opakující se situaci.",
      ],
      limit: "Krátká technika neodstraní dlouhodobé přetížení, hlad, nebezpečí ani škodlivé podmínky. Někdy je důležitým krokem odejít, požádat o pomoc nebo změnit prostředí.",
    },
    practice: {
      title: "Navrhni jednu malou a bezpečnou odbočku.",
      why: "Neplánuješ ideální verzi sebe. Vybíráš krok, který můžeš opravdu zkusit v podobné situaci.",
      steps: [
        "Vyber jeden svůj časný signál.",
        "Napiš, co obvykle následuje.",
        "Vyber jednu malou odbočku, kterou můžeš zkusit.",
        "Napiš konkrétní větu nebo čin.",
      ],
      prompt: "Které chvíle ve své reakci si dokážu všimnout dřív a co potom zkusím?",
      fields: [
        { id: "earlySignal", label: "Můj časný signál", type: "text", required: true },
        { id: "usualAction", label: "Co po něm obvykle následuje?", type: "textarea", required: true },
        { id: "choicePoint", label: "Kde může vzniknout malý prostor pro volbu?", type: "textarea", required: true },
        { id: "nextStep", label: "Konkrétní věta nebo čin, který zkusím", type: "textarea", required: true },
      ],
    },
    closing: ["Cílem není reagovat dokonale.", "Cílem je poznat jednu chvíli, ve které může vzniknout další možnost."],
  },
  {
    day: 21,
    opening: {
      eyebrow: "TŘETÍ OHLÉDNUTÍ",
      title: "Po jednadvaceti dnech nemáš hotový výklad sebe. Máš něco cennějšího.",
      paragraphs: [
        "Máš konkrétní chvíle, vlastní slova, tělesné signály a reakce, které se u tebe objevily. Můžeš vidět, co se opakuje a co jsi dokázal zachytit dřív než na začátku.",
        "Když jsem podobnou mapu začal skládat já, nepřinesla mi jednu velkou odpověď. Přinesla mi více malých míst, ve kterých jsem se mohl vrátit k sobě.",
        "Dnes z těchto míst vytvoříš první verzi svého osobního emočního manuálu. Ne proto, aby tě definoval. Proto, aby ti byl příště k dispozici.",
      ],
    },
    recognition: {
      title: "Dobrá mapa obsahuje jistoty, otázky i místa, která zatím neznáš.",
      items: [
        "Některé emoce, situace nebo signály se opakují.",
        "U jedné reakce už vidíš krátkou úlevu i pozdější dopad.",
        "Máš alespoň jednu otázku, kterou si chceš nést dál.",
      ],
    },
    education: {
      title: "Tvoje emoční mapa je souhrn pozorování z jednadvaceti dní.",
      paragraphs: [
        "Ukazuje jen to, co jsi zachytil a uložil. Není testem osobnosti, diagnózou ani definitivním vysvětlením tvého života.",
        "Její hodnota je v konkrétnosti. Místo věty jsem prostě takový můžeš vidět situaci, emoci, signál, obvyklý krok, krátkou úlevu, dopad a možné místo pro volbu.",
        "Mapa se s dalšími zkušenostmi může měnit. Přesně tak je to v pořádku.",
      ],
    },
    illustration: {
      src: "/prostor-assets/kk-hand-drawn-doodle-emotional-map-v1.webp",
      alt: "Ručně kreslená osobní mapa propojující situaci, emoci, signál, reakci a místo pro volbu",
      caption: "Mapa ti neříká, kdo jsi. Vrací ti to, čeho sis dokázal všimnout.",
    },
    expert: {
      field: "KOUČOVACÍ RÁMEC",
      title: "Souhrn vlastních záznamů může podpořit přesnější otázky pro další období.",
      paragraphs: [
        "Když se člověk opírá o konkrétní situace a vlastní slova, může lépe rozlišit pozorování od rychlého obecného závěru.",
      ],
      limit: "Mapa neurčuje příčinu, diagnózu ani jediný správný další krok. Pokud se v záznamech objevuje ohrožení, násilí nebo závažná krize, patří další krok k odborné nebo krizové pomoci.",
    },
    practice: {
      title: "Dokonči první verzi svého emočního manuálu.",
      why: "Vybereš jen to nejdůležitější, co chceš mít po ruce, až se známá situace objeví znovu.",
      steps: [
        "Pojmenuj situaci, která se u tebe vrací.",
        "Vyber emoci a první signál, které v ní často zachytíš.",
        "Napiš svůj obvyklý krok, krátkou úlevu a pozdější dopad.",
        "Vyber jedno místo pro volbu.",
        "Napiš otázku, kterou si chceš vzít do dalšího modulu.",
      ],
      prompt: "Čeho jsem si u své reakce všiml a co chci příště zachytit dřív?",
      fields: [
        { id: "repeatingSituation", label: "Situace, která se u mě vrací", type: "textarea", required: true },
        { id: "emotion", label: "Emoce, která v ní bývá nejblíž", type: "text", required: true },
        { id: "earlySignal", label: "První signál, kterého si mohu všimnout", type: "text", required: true },
        { id: "usualAction", label: "Můj obvyklý krok", type: "textarea", required: true },
        { id: "shortRelief", label: "Co mi na chvíli přinese", type: "textarea", required: true },
        { id: "impact", label: "Co po něm často zůstane", type: "textarea", required: true },
        { id: "choicePoint", label: "Kde může vzniknout malý prostor pro volbu", type: "textarea", required: true },
        { id: "nextQuestion", label: "Otázka, kterou si beru dál", type: "textarea", required: true },
      ],
    },
    closing: ["Tvoje mapa není konečná odpověď na to, kdo jsi.", "Je to první osobní návod, jak se k sobě vrátit o chvíli dřív."],
  },
];

export function getEmotionLesson(day: number) {
  return EMOTION_LESSONS.find((lesson) => lesson.day === day) ?? EMOTION_LESSONS[0];
}
