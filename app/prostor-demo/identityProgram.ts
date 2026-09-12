import type { EmotionDay } from "./emotionProgram";

export const IDENTITY_PHASES = [
  {
    number: "01",
    title: "Vidím, kdo jsem dnes",
    days: "Dny 1 až 7",
    text: "Rozlišuji svoje role, staré příběhy a skutečné důkazy toho, jak dnes žiju.",
  },
  {
    number: "02",
    title: "Volím, kým se stávám",
    days: "Dny 8 až 14",
    text: "Vytvářím směr identity, který není další nálepkou, ale pozvánkou k vědomějším činům.",
  },
  {
    number: "03",
    title: "Tvořím svůj život",
    days: "Dny 15 až 21",
    text: "Překládám vizi do obyčejného dne, vztahů, práce, prostředí a nejmenšího dalšího kroku.",
  },
] as const;

export const IDENTITY_DAYS: EmotionDay[] = [
  { day: 1, phase: 1, title: "Role, které žiju", focus: "Ve kterých rolích dnes trávím nejvíc života?", minutes: 6 },
  { day: 2, phase: 1, title: "Kdo jsem mimo role", focus: "Co ze mě zůstává, když na chvíli odložím funkce a výkon?", minutes: 7 },
  { day: 3, phase: 1, title: "Můj příběh o sobě", focus: "Jakou větu o sobě opakuju tak dlouho, až zní jako fakt?", minutes: 7 },
  { day: 4, phase: 1, title: "Nálepka není identita", focus: "Která moje nálepka už nedává prostor změně?", minutes: 6 },
  { day: 5, phase: 1, title: "Co už ve mně je", focus: "Které kvality už dnes dokazuju svými činy?", minutes: 7 },
  { day: 6, phase: 1, title: "Co opakovaně potvrzuju", focus: "Jakou identitu dnes posilují moje běžné volby?", minutes: 7 },
  { day: 7, phase: 1, title: "Mapa dnešní identity", focus: "Které role, příběhy a důkazy se během týdne ukázaly?", minutes: 12 },
  { day: 8, phase: 2, title: "Směr místo dokonalosti", focus: "Jakým směrem se chci posouvat bez požadavku být hotový?", minutes: 7 },
  { day: 9, phase: 2, title: "Jaký člověk chci být", focus: "Jakou kvalitu chci přinášet do běžných situací?", minutes: 8 },
  { day: 10, phase: 2, title: "Já ve vztazích", focus: "Kým chci být ve chvíli, kdy je vztah náročný?", minutes: 7 },
  { day: 11, phase: 2, title: "Já v práci", focus: "Jakým člověkem chci být při výkonu, vedení a spolupráci?", minutes: 7 },
  { day: 12, phase: 2, title: "Já v péči o sebe", focus: "Jak se k sobě chová člověk, kterým se chci stávat?", minutes: 7 },
  { day: 13, phase: 2, title: "Důkaz identity", focus: "Jaký malý čin dnes potvrdí můj směr?", minutes: 6 },
  { day: 14, phase: 2, title: "Mapa budoucího já", focus: "Které věty o svém směru chci začít dokazovat životem?", minutes: 12 },
  { day: 15, phase: 3, title: "Vize běžného dne", focus: "Jak vypadá obyčejný den života, který mi dává smysl?", minutes: 9 },
  { day: 16, phase: 3, title: "Vztahy, které chci žít", focus: "Jak chci ve vztazích mluvit, naslouchat a chránit hranice?", minutes: 8 },
  { day: 17, phase: 3, title: "Práce a přínos", focus: "Čemu chci věnovat energii a jaký dopad mi dává smysl?", minutes: 8 },
  { day: 18, phase: 3, title: "Energie a prostředí", focus: "Jaké prostředí a podmínky mi pomáhají žít tak, jak chci?", minutes: 7 },
  { day: 19, phase: 3, title: "Největší rozdíl", focus: "Ve které oblasti je dnes největší rozdíl mezi realitou a mojí vizí?", minutes: 8 },
  { day: 20, phase: 3, title: "Nejmenší další krok", focus: "Co můžu udělat během sedmi dní, aniž bych měnil celý život?", minutes: 7 },
  { day: 21, phase: 3, title: "Můj osobní kompas", focus: "Kdo jsem, kým se stávám a jaký krok si beru dál?", minutes: 14 },
];
