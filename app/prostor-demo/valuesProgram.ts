import type { EmotionDay } from "./emotionProgram";

export const VALUES_PHASES = [
  {
    number: "01",
    title: "Odhaluju",
    days: "Dny 1 až 7",
    text: "Dívám se na to, co mě dnes skutečně vede a co jsem jen dlouho považoval za samozřejmé.",
  },
  {
    number: "02",
    title: "Prověřuju",
    days: "Dny 8 až 14",
    text: "Rozlišuji vlastní hodnoty, převzatá pravidla a chvíle, kdy se dobrý směr mění v tlak.",
  },
  {
    number: "03",
    title: "Vybírám si",
    days: "Dny 15 až 21",
    text: "Vědomě volím, co chci žít, a překládám to do malých činů, které jsou vidět v běžném dni.",
  },
] as const;

export const VALUES_DAYS: EmotionDay[] = [
  { day: 1, phase: 1, title: "Co mě dnes vedlo", focus: "Podle čeho jsem se v jedné konkrétní chvíli rozhodl?", minutes: 6 },
  { day: 2, phase: 1, title: "Hodnota nebo pravidlo", focus: "Vybírám si to sám, nebo jen plním staré „musím“?", minutes: 7 },
  { day: 3, phase: 1, title: "Odkud to znám", focus: "Kde jsem se naučil, že takhle se má žít?", minutes: 7 },
  { day: 4, phase: 1, title: "Co bylo odměňované", focus: "Za co jsem získával uznání, přijetí nebo klid?", minutes: 6 },
  { day: 5, phase: 1, title: "Cena za přijetí", focus: "Co jsem se naučil potlačit, abych byl v pořádku?", minutes: 7 },
  { day: 6, phase: 1, title: "Hodnota v činu", focus: "Co moje dnešní chování ukazuje, i když o sobě říkám něco jiného?", minutes: 6 },
  { day: 7, phase: 1, title: "Moje první mapa hodnot", focus: "Které směry a pravidla se během týdne opakovaly?", minutes: 11 },
  { day: 8, phase: 2, title: "Převzaté „musím“", focus: "Které vnitřní pravidlo dnes řídilo moje rozhodnutí?", minutes: 7 },
  { day: 9, phase: 2, title: "Podmínky vlastní hodnoty", focus: "Co musím splnit, abych se cítil dost dobrý?", minutes: 8 },
  { day: 10, phase: 2, title: "Když hodnota pomáhá", focus: "Jak tato hodnota vypadá ve zdravé podobě?", minutes: 6 },
  { day: 11, phase: 2, title: "Když se změní v tlak", focus: "Kdy mě stejná hodnota přestává vést a začíná mě řídit?", minutes: 7 },
  { day: 12, phase: 2, title: "Střet dvou hodnot", focus: "Které dvě důležité hodnoty se dnes dostaly do střetu?", minutes: 8 },
  { day: 13, phase: 2, title: "Vědomá priorita", focus: "Čemu chci v této chvíli dát přednost a proč?", minutes: 7 },
  { day: 14, phase: 2, title: "Mapa hodnotových konfliktů", focus: "Které střety se u mě vracejí a jak je dnes řeším?", minutes: 12 },
  { day: 15, phase: 3, title: "Co chci zachovat", focus: "Která hodnota už dnes můj život podpírá?", minutes: 6 },
  { day: 16, phase: 3, title: "Co chci pustit", focus: "Které pravidlo už nepotřebuju dál dokazovat?", minutes: 7 },
  { day: 17, phase: 3, title: "Moje zvolená hodnota", focus: "Jaký směr si vybírám, i když ho nikdo neocení?", minutes: 7 },
  { day: 18, phase: 3, title: "Překlad do chování", focus: "Jak bude tato hodnota zítra konkrétně vidět?", minutes: 7 },
  { day: 19, phase: 3, title: "Malý důkaz hodnoty", focus: "Jaký drobný čin dnes potvrdil můj zvolený směr?", minutes: 6 },
  { day: 20, phase: 3, title: "Týden v souladu", focus: "Jak budu sedm dní bezpečně testovat jednu hodnotu?", minutes: 8 },
  { day: 21, phase: 3, title: "Můj hodnotový manifest", focus: "Podle čeho chci žít a jak to poznám v běžném životě?", minutes: 13 },
];
