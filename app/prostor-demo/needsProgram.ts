import type { EmotionDay } from "./emotionProgram";

export const NEEDS_PHASES = [
  {
    number: "01",
    title: "Rozpoznávám",
    days: "Dny 1 až 7",
    text: "Učím se všimnout si toho, co je pro mě v konkrétní chvíli důležité.",
  },
  {
    number: "02",
    title: "Rozlišuji",
    days: "Dny 8 až 14",
    text: "Odděluji potřebu od strategie a hledám, co se za mojí reakcí skutečně ozývá.",
  },
  {
    number: "03",
    title: "Rozšiřuji možnosti",
    days: "Dny 15 až 21",
    text: "Hledám více zdravých cest, jak o své potřeby pečovat sám i ve vztazích.",
  },
] as const;

export const NEEDS_DAYS: EmotionDay[] = [
  { day: 1, phase: 1, title: "Co je pro mě důležité", focus: "Co se za mojí emocí možná ozývá?", minutes: 5 },
  { day: 2, phase: 1, title: "Potřeba není slabost", focus: "Co potřebuju, i když jsem zvyklý všechno zvládat?", minutes: 6 },
  { day: 3, phase: 1, title: "Šest rodin potřeb", focus: "Do které oblasti moje dnešní potřeba patří?", minutes: 7 },
  { day: 4, phase: 1, title: "Emoce a potřeba", focus: "Co cítím a co je pro mě pod tím důležité?", minutes: 6 },
  { day: 5, phase: 1, title: "Když je potřeba naplněná", focus: "Která potřeba byla v této příjemné chvíli naplněná?", minutes: 5 },
  { day: 6, phase: 1, title: "Potřeba není příkaz", focus: "Jak ji můžu respektovat, aniž bych řídil druhé?", minutes: 7 },
  { day: 7, phase: 1, title: "Moje první mapa potřeb", focus: "Co se u mě během týdne opakovalo?", minutes: 10 },
  { day: 8, phase: 2, title: "Potřeba a způsob", focus: "Co potřebuju a co obvykle udělám, abych to získal?", minutes: 6 },
  { day: 9, phase: 2, title: "Více cest", focus: "Jakými dalšími způsoby se o tuto potřebu můžu postarat?", minutes: 6 },
  { day: 10, phase: 2, title: "Co můžu ovlivnit já", focus: "Co pro tuto potřebu můžu udělat já?", minutes: 6 },
  { day: 11, phase: 2, title: "Co vzniká ve vztahu", focus: "Co potřebuji sdílet nebo vytvořit společně s druhým?", minutes: 6 },
  { day: 12, phase: 2, title: "Neviditelná dohoda", focus: "Co jsem očekával, aniž jsem to řekl?", minutes: 6 },
  { day: 13, phase: 2, title: "Prosba není kontrola", focus: "Jak potřebu sdělit a ponechat druhému možnost odpovědi?", minutes: 7 },
  { day: 14, phase: 2, title: "Moje mapa strategií", focus: "Jak se dnes snažím starat o svoje potřeby?", minutes: 10 },
  { day: 15, phase: 3, title: "Citlivá potřeba", focus: "U které potřeby reaguju nejsilněji?", minutes: 6 },
  { day: 16, phase: 3, title: "Kde jsem se to naučil", focus: "Odkud znám svůj obvyklý způsob péče?", minutes: 7 },
  { day: 17, phase: 3, title: "Proč se můj známý způsob vrací", focus: "Jakou rychlou úlevu mi přinese?", minutes: 6 },
  { day: 18, phase: 3, title: "Cena, kterou platím", focus: "Co po mém obvyklém kroku zůstane za několik hodin nebo dní?", minutes: 6 },
  { day: 19, phase: 3, title: "Rozšiřuju nabídku", focus: "Jaké tři další možnosti chci mít k dispozici?", minutes: 7 },
  { day: 20, phase: 3, title: "Bezpečný experiment", focus: "Kterou novou možnost vyzkouším v malé běžné situaci?", minutes: 7 },
  { day: 21, phase: 3, title: "Můj manuál potřeb", focus: "Co už vím o tom, co potřebuju a jak o to chci pečovat?", minutes: 12 },
];
