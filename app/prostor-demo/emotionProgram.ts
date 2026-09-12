export type EmotionDay = {
  day: number;
  phase: 1 | 2 | 3;
  title: string;
  focus: string;
  minutes: number;
};

export const EMOTION_PHASES = [
  {
    number: "01",
    title: "Všímám si",
    days: "Dny 1 až 7",
    text: "Zastavím se u konkrétní chvíle a všimnu si, že se ve mně něco změnilo.",
  },
  {
    number: "02",
    title: "Pojmenovávám",
    days: "Dny 8 až 14",
    text: "Nehledám dokonalý název. Učím se rozlišit, co se stalo, co cítím a co jsem si o tom začal vyprávět.",
  },
  {
    number: "03",
    title: "Poznávám svůj vzorec",
    days: "Dny 15 až 21",
    text: "Sleduji, co se opakuje, co obvykle udělám a kde může vzniknout malý prostor pro volbu.",
  },
] as const;

export const EMOTION_DAYS: EmotionDay[] = [
  { day: 1, phase: 1, title: "První zastavení", focus: "Co se ve mně právě změnilo?", minutes: 3 },
  { day: 2, phase: 1, title: "Jedna konkrétní chvíle", focus: "Co se skutečně stalo?", minutes: 4 },
  { day: 3, phase: 1, title: "Signál v těle", focus: "Kde jsem změnu poznal nejdřív?", minutes: 4 },
  { day: 4, phase: 1, title: "Návrat k sobě", focus: "Co cítím dřív, než si to vysvětlím?", minutes: 4 },
  { day: 5, phase: 1, title: "Síla emoce", focus: "Jak silné to bylo od jedné do pěti?", minutes: 3 },
  { day: 6, phase: 1, title: "Chuť něco udělat", focus: "K jaké reakci mě emoce táhla?", minutes: 5 },
  { day: 7, phase: 1, title: "První ohlédnutí", focus: "Čeho jsem si tento týden všiml?", minutes: 7 },
  { day: 8, phase: 2, title: "Rodiny emocí", focus: "Která široká rodina je nejblíž?", minutes: 5 },
  { day: 9, phase: 2, title: "O krok přesnější slovo", focus: "Které jedno nebo dvě přesnější slova jsou nejblíž?", minutes: 5 },
  { day: 10, phase: 2, title: "Emoce není myšlenka", focus: "Co cítím a co si o tom myslím?", minutes: 6 },
  { day: 11, phase: 2, title: "Dvě emoce najednou", focus: "Které dvě emoce můžou být pravdivé zároveň?", minutes: 5 },
  { day: 12, phase: 2, title: "„Nevím“ je informace", focus: "Co dokážu zachytit, i když nemám název?", minutes: 4 },
  { day: 13, phase: 2, title: "Emoce v kontaktu", focus: "Co se ve mně mění, když jsem s druhými lidmi?", minutes: 6 },
  { day: 14, phase: 2, title: "Můj emoční slovník", focus: "Která slova používám často a která skoro vůbec?", minutes: 8 },
  { day: 15, phase: 3, title: "Co se opakuje", focus: "V jakých situacích se emoce vrací?", minutes: 6 },
  { day: 16, phase: 3, title: "První signál", focus: "Co přichází o chvíli dřív než moje reakce?", minutes: 5 },
  { day: 17, phase: 3, title: "Můj obvyklý krok", focus: "Co dělám, když se takto cítím?", minutes: 6 },
  { day: 18, phase: 3, title: "Krátká úleva", focus: "Co mi moje reakce na chvíli přinese?", minutes: 6 },
  { day: 19, phase: 3, title: "Dopad", focus: "Co se stane potom se mnou a s druhými?", minutes: 6 },
  { day: 20, phase: 3, title: "Místo pro volbu", focus: "Které chvíle ve své reakci si dokážu všimnout dřív?", minutes: 7 },
  { day: 21, phase: 3, title: "Moje emoční mapa", focus: "Čeho jsem si u sebe všiml a co chci příště zachytit dřív?", minutes: 10 },
];
