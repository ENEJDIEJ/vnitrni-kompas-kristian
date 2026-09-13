"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { EMOTION_DAYS, EMOTION_PHASES } from "./emotionProgram";
import { getEmotionLesson } from "./emotionLessons";
import type { EmotionLesson } from "./emotionLessons";
import { NEEDS_DAYS, NEEDS_PHASES } from "./needsProgram";
import { getNeedsLesson } from "./needsLessons";
import { VALUES_DAYS, VALUES_PHASES } from "./valuesProgram";
import { IDENTITY_DAYS, IDENTITY_PHASES } from "./identityProgram";
import { getIdentityLesson, getValuesLesson } from "./laterLessons";
import {
  loadProgramState,
  localProgramDate,
  recordProgramActivity,
  saveProgramState,
} from "@/lib/program-client";
import {
  hasCompletePracticeEntry,
  type ProgramModuleStateCode,
  type ProgramStatePayload,
} from "@/lib/program-state";
import { WebOnly } from "@/components/program/WebOnly";
import flow from "./flow.module.css";
import styles from "./prostor.module.css";

type View = "dnes" | "cesta" | "lekce" | "potreby" | "potreby-lekce" | "potreby-mapa" | "hodnoty" | "hodnoty-lekce" | "hodnoty-mapa" | "identita" | "identita-lekce" | "identita-mapa" | "vize-board" | "zaznam" | "historie" | "mapa" | "report";
type EmotionFamily = "strach" | "vztek" | "smutek" | "radost" | "odpor" | "prekvapeni";
type ModuleKey = "emotion" | "needs" | "values" | "identity";
type AccessModuleCode = "emotions" | "needs" | "values" | "identity";
type PrimaryNavId = "dnes" | "cesta" | "zaznam" | "mapa";
type TourStep = { target: string; title: string; text: string };

type EmotionEntry = {
  id: string;
  day: number;
  situation: string;
  family: EmotionFamily;
  emotion: string;
  intensity: number;
  body: string;
  response: string;
  createdAt: string;
};

type PracticeEntry = {
  day: number;
  question: string;
  answer?: string;
  answers?: Record<string, string | string[] | number>;
  updatedAt: string;
};

type VisionBoardData = {
  ordinaryDay: string;
  relationships: string;
  work: string;
  body: string;
  environment: string;
  boldDream: string;
  image: string;
};

const STORAGE_KEY = "kk-emotion-prototype-entries";
const ONBOARDING_KEY = "kk-emotion-prototype-entered";
const TOUR_KEY = "kk-program-tour-v1-completed";
const MODULE_TOUR_KEY_PREFIX = "kk-program-module-tour-v1-";
const READ_DAYS_KEY = "kk-emotion-prototype-read-days";
const PRACTICE_ENTRIES_KEY = "kk-emotion-prototype-practice-entries";
const NEEDS_READ_DAYS_KEY = "kk-needs-prototype-read-days";
const NEEDS_PRACTICE_ENTRIES_KEY = "kk-needs-prototype-practice-entries";
const VALUES_READ_DAYS_KEY = "kk-values-prototype-read-days";
const VALUES_PRACTICE_ENTRIES_KEY = "kk-values-prototype-practice-entries";
const IDENTITY_READ_DAYS_KEY = "kk-identity-prototype-read-days";
const IDENTITY_PRACTICE_ENTRIES_KEY = "kk-identity-prototype-practice-entries";
const VISION_BOARD_KEY = "kk-identity-vision-board";
const INTEGRATION_DAYS_KEY = "kk-program-integration-days";
const PROFILE_PHOTO_KEY = "kk-emotion-prototype-profile-photo";
const PROFILE_PHOTO_POSITION_KEY = "kk-emotion-prototype-profile-photo-position";
const PROFILE_NAME_KEY = "vnitrni-kompas-profile-name-v1";
const LAST_LOCATION_KEY = "kk-program-last-location-v1";
const AVAILABLE_LESSON_DAYS = 21;
const ALL_VIEWS: View[] = ["dnes", "cesta", "lekce", "potreby", "potreby-lekce", "potreby-mapa", "hodnoty", "hodnoty-lekce", "hodnoty-mapa", "identita", "identita-lekce", "identita-mapa", "vize-board", "zaznam", "historie", "mapa", "report"];
const MODULE_KEYS: ModuleKey[] = ["emotion", "needs", "values", "identity"];
const ACCESS_CODE: Record<ModuleKey, AccessModuleCode> = {
  emotion: "emotions",
  needs: "needs",
  values: "values",
  identity: "identity",
};
const MODULE_DAY_OFFSET: Record<ModuleKey, number> = {
  emotion: 0,
  needs: 21,
  values: 42,
  identity: 63,
};
const MODULE_ROOT_VIEW: Record<ModuleKey, View> = {
  emotion: "cesta",
  needs: "potreby",
  values: "hodnoty",
  identity: "identita",
};
const MODULE_MAP_VIEW: Record<ModuleKey, View> = {
  emotion: "mapa",
  needs: "potreby-mapa",
  values: "hodnoty-mapa",
  identity: "identita-mapa",
};
const VIEW_MODULE: Partial<Record<View, ModuleKey>> = {
  cesta: "emotion",
  lekce: "emotion",
  mapa: "emotion",
  potreby: "needs",
  "potreby-lekce": "needs",
  "potreby-mapa": "needs",
  hodnoty: "values",
  "hodnoty-lekce": "values",
  "hodnoty-mapa": "values",
  identita: "identity",
  "identita-lekce": "identity",
  "identita-mapa": "identity",
  "vize-board": "identity",
};
const STORY_PHOTO_BY_MODULE: Record<ModuleKey, string> = {
  emotion: "/prostor-assets/kristian-module-emotions.jpg",
  needs: "/prostor-assets/kristian-module-needs.jpg",
  values: "/prostor-assets/kristian-module-values.jpg",
  identity: "/prostor-assets/kristian-module-identity.jpg",
};
const EMPTY_VISION_BOARD: VisionBoardData = {
  ordinaryDay: "",
  relationships: "",
  work: "",
  body: "",
  environment: "",
  boldDream: "",
  image: "",
};

const NAV: Array<{ id: PrimaryNavId; label: string; mobileLabel: string; icon: string }> = [
  { id: "dnes", label: "Dnes", mobileLabel: "Dnes", icon: "⌂" },
  { id: "cesta", label: "Moje cesta", mobileLabel: "Cesta", icon: "↗" },
  { id: "zaznam", label: "Zapsat emoci", mobileLabel: "Zapsat", icon: "●" },
  { id: "mapa", label: "Moje mapa", mobileLabel: "Mapa", icon: "◎" },
];

const INTEGRATION_DAYS = [
  ["85", "Čtu svoje mapy", "Vracím se k větám a momentům, které jsou pro mě stále živé."],
  ["86", "Dál si všímám emocí", "Zachytím jednu skutečnou chvíli. Nic z ní nemusím hned vyvozovat."],
  ["87", "Beru kompas do reality", "Použiju jednu vlastní otázku nebo krok v obyčejné situaci."],
  ["88", "Pozoruju odchýlení", "Všimnu si známého automatu bez známkování a zapíšu, co se stalo."],
  ["89", "Vracím se ke směru", "Zopakuju nebo upravím jeden pokus, který už jsem si vytvořil."],
  ["90", "Čtu svůj Vnitřní kompas", "Projdu osobní report a vyberu si, k čemu se chci dál vracet."],
] as const;

const TOUR_STEPS = [
  {
    target: "dnes",
    title: "Tady začíná každý návrat",
    text: "Na stránce Dnes najdeš jednu doporučenou část. Nemusíš dohánět celý program ani plnit dlouhý seznam.",
  },
  {
    target: "cesta",
    title: "Celou cestu máš stále před sebou",
    text: "V Mojí cestě uvidíš jednotlivé dny, přečtené části i to, co tě čeká dál. Vlastní tempo je v pořádku.",
  },
  {
    target: "zaznam",
    title: "Emoci můžeš zachytit kdykoli",
    text: "Tento záznam vede napříč celým systémem. Můžeš ho otevřít z libovolného modulu a po uložení se vrátíš přesně tam, odkud jsi přišel.",
  },
  {
    target: "mapa",
    title: "V mapách uvidíš, co se u tebe opakuje",
    text: "Nenajdeš tu diagnózu ani hotový výklad. Uvidíš konkrétní situace, emoce a reakce, které se v tvých záznamech vracejí. Díky tomu si můžeš vybrat, čeho si chceš příště všimnout o chvíli dřív.",
  },
] as const;

const MODULE_TOURS: Record<ModuleKey, { label: string; steps: TourStep[] }> = {
  emotion: {
    label: "Emoce",
    steps: [
      {
        target: "module-current",
        title: "Nejdřív se učíš zachytit, co cítíš",
        text: "Emoce nejsou chyba ani příkaz. V tomto modulu se učíš všimnout si, že se v tobě něco změnilo, ještě než začneš automaticky jednat.",
      },
      {
        target: "zaznam",
        title: "Začínáš jednou konkrétní chvílí",
        text: "V krátkém záznamu oddělíš situaci, emoci, tělesný signál a reakci. Nemusíš mít jistotu ani najít dokonalé slovo.",
      },
      {
        target: "mapa",
        title: "Z více dní vznikne tvoje emoční mapa",
        text: "Po jednadvaceti dnech uvidíš, které emoce, situace a první signály se u tebe opakují. Tato mapa připraví půdu pro další otázku: co je pro mě v těch chvílích důležité?",
      },
    ],
  },
  needs: {
    label: "Potřeby",
    steps: [
      {
        target: "module-current",
        title: "Pod emocí začneš hledat, co je pro tebe důležité",
        text: "Potřeba není slabost ani požadavek na druhého. Je to informace o tom, co ti v dané chvíli chybí nebo co už je dobře naplněné.",
      },
      {
        target: "zaznam",
        title: "Oddělíš potřebu od způsobu, kterým ji získáváš",
        text: "Můžeš potřebovat jistotu a snažit se ji získat kontrolou. Nebo potřebovat blízkost a vyžadovat okamžitou odpověď. V modulu začneš rozšiřovat svoje možnosti.",
      },
      {
        target: "mapa",
        title: "Vznikne mapa potřeb a tvých obvyklých strategií",
        text: "Uvidíš, co se u tebe vrací, co můžeš ovlivnit sám, o co potřebuješ požádat a které způsoby už ti dnes přinášejí zbytečnou cenu.",
      },
    ],
  },
  values: {
    label: "Hodnoty",
    steps: [
      {
        target: "module-current",
        title: "Když nemůžeš naplnit všechno, potřebuješ směr",
        text: "Hodnoty ti nepředepisují jedinou správnou odpověď. Pomáhají ti rozpoznat, podle čeho chceš jednat, když se střetne více důležitých věcí.",
      },
      {
        target: "zaznam",
        title: "Rozlišíš svoji volbu od převzatého pravidla",
        text: "Budeš zkoumat věty jako „musím všechno zvládnout“ nebo „nesmím nikoho zklamat“ a porovnáš je s tím, co chceš vědomě žít dnes.",
      },
      {
        target: "mapa",
        title: "Hodnotová mapa převede slova do chování",
        text: "Nezůstaneš u seznamu hezkých slov. Uvidíš konkrétní rozhodnutí, opakující se střety a malé činy, podle kterých poznáš, že hodnotu skutečně žiješ.",
      },
    ],
  },
  identity: {
    label: "Identita a vize",
    steps: [
      {
        target: "module-current",
        title: "Nakonec spojíš poznání s člověkem, kterým se stáváš",
        text: "Identita není nálepka ani konečný rozsudek. Je to směr, který potvrzuješ opakovanými činy ve vztazích, práci i péči o sebe.",
      },
      {
        target: "zaznam",
        title: "Začneš sbírat skutečné důkazy svého směru",
        text: "Místo čekání na velkou proměnu budeš zachycovat malé činy. Právě na nich uvidíš, jakým člověkem už dnes dokážeš být a který další čin chceš zopakovat.",
      },
      {
        target: "mapa",
        title: "Vytvoříš osobní kompas a vlastní vizi",
        text: "Propojíš role, hodnoty, běžný den, vztahy, práci a odvážný sen. Výstupem nebude cizí plán, ale tvoje psaná a obrazová vize dalšího směru.",
      },
    ],
  },
};

const FAMILIES: Array<{ id: EmotionFamily; label: string; hint: string; color: string; words: string[] }> = [
  { id: "strach", label: "Strach", hint: "něco může být v ohrožení", color: "#87BCE8", words: ["nejistota", "obava", "napětí", "úzkost", "bezmoc"] },
  { id: "vztek", label: "Vztek", hint: "něco překročilo tvoji hranici", color: "#EE7770", words: ["podráždění", "frustrace", "naštvání", "rozhořčení", "zlost"] },
  { id: "smutek", label: "Smutek", hint: "na něčem ti záleželo", color: "#9A98CE", words: ["zklamání", "osamělost", "lítost", "sklíčenost", "žal"] },
  { id: "radost", label: "Radost", hint: "něco je v souladu nebo se daří", color: "#F3D45B", words: ["úleva", "vděčnost", "nadšení", "spokojenost", "hrdost"] },
  { id: "odpor", label: "Odpor", hint: "něco ti není příjemné nebo bezpečné", color: "#83C784", words: ["nechuť", "znechucení", "odtažitost", "nedůvěra", "odmítání"] },
  { id: "prekvapeni", label: "Překvapení", hint: "stalo se něco nečekaného", color: "#E1AC63", words: ["údiv", "zaskočení", "ohromení", "zvědavost", "zmatení"] },
];

const STARTING_ENTRIES: EmotionEntry[] = [
  { id: "1", day: 3, situation: "Přišla další zpráva od kolegy", family: "vztek", emotion: "podráždění", intensity: 4, body: "sevřená čelist", response: "odpověděl jsem krátce", createdAt: "2026-07-19T17:20:00.000Z" },
  { id: "2", day: 2, situation: "Čekal jsem na odpověď", family: "strach", emotion: "nejistota", intensity: 3, body: "tlak v žaludku", response: "kontroloval jsem telefon", createdAt: "2026-07-18T12:15:00.000Z" },
  { id: "3", day: 1, situation: "Dokončil jsem důležitou práci", family: "radost", emotion: "úleva", intensity: 4, body: "volnější dech", response: "na chvíli jsem se zastavil", createdAt: "2026-07-17T08:40:00.000Z" },
];

const MAP_DEMO_ENTRIES: EmotionEntry[] = [
  { id: "demo-1", day: 1, situation: "Ráno jsem otevřel zprávy dřív, než jsem vstal z postele", family: "strach", emotion: "napětí", intensity: 3, body: "stažený žaludek", response: "začal jsem hned odpovídat", createdAt: "2026-07-01T07:20:00.000Z" },
  { id: "demo-2", day: 2, situation: "Kolega změnil domluvený termín", family: "vztek", emotion: "podráždění", intensity: 4, body: "sevřená čelist", response: "napsal jsem krátkou odpověď", createdAt: "2026-07-02T10:15:00.000Z" },
  { id: "demo-3", day: 3, situation: "Čekal jsem na odpověď od blízkého člověka", family: "strach", emotion: "nejistota", intensity: 4, body: "tlak v žaludku", response: "opakovaně jsem kontroloval telefon", createdAt: "2026-07-03T18:40:00.000Z" },
  { id: "demo-4", day: 4, situation: "Dokončil jsem úkol, který jsem dlouho odkládal", family: "radost", emotion: "úleva", intensity: 4, body: "volnější dech", response: "na chvíli jsem se zastavil", createdAt: "2026-07-04T16:05:00.000Z" },
  { id: "demo-5", day: 5, situation: "Doma po mně někdo chtěl další rozhodnutí", family: "vztek", emotion: "frustrace", intensity: 5, body: "sevřená čelist", response: "odpověděl jsem ostřeji, než jsem chtěl", createdAt: "2026-07-05T20:30:00.000Z" },
  { id: "demo-6", day: 6, situation: "Zrušil jsem večer, na který jsem se těšil", family: "smutek", emotion: "zklamání", intensity: 3, body: "tíha na hrudi", response: "stáhl jsem se a přestal mluvit", createdAt: "2026-07-06T21:10:00.000Z" },
  { id: "demo-7", day: 7, situation: "Šel jsem ven bez telefonu", family: "radost", emotion: "spokojenost", intensity: 3, body: "klidnější dech", response: "zůstal jsem venku déle", createdAt: "2026-07-07T19:05:00.000Z" },
  { id: "demo-8", day: 8, situation: "Na poradě mi někdo skočil do řeči", family: "vztek", emotion: "rozhořčení", intensity: 4, body: "horko v obličeji", response: "začal jsem mluvit rychleji", createdAt: "2026-07-08T11:25:00.000Z" },
  { id: "demo-9", day: 9, situation: "Dostal jsem pochvalu za svoji práci", family: "radost", emotion: "hrdost", intensity: 4, body: "teplo na hrudi", response: "poděkoval jsem bez zlehčování", createdAt: "2026-07-09T14:35:00.000Z" },
  { id: "demo-10", day: 10, situation: "Měl jsem říct, že další úkol už nevezmu", family: "strach", emotion: "obava", intensity: 4, body: "stažené hrdlo", response: "souhlasil jsem a litoval toho", createdAt: "2026-07-10T15:20:00.000Z" },
  { id: "demo-11", day: 11, situation: "Někdo mi dlouho neodpovídal", family: "smutek", emotion: "osamělost", intensity: 3, body: "prázdno v břiše", response: "začal jsem si domýšlet důvod", createdAt: "2026-07-11T22:00:00.000Z" },
  { id: "demo-12", day: 12, situation: "Nečekaně se uvolnil celý večer", family: "prekvapeni", emotion: "zvědavost", intensity: 2, body: "lehčí ramena", response: "nechal jsem večer bez plánu", createdAt: "2026-07-12T17:45:00.000Z" },
  { id: "demo-13", day: 13, situation: "Přišel jsem do hlučného prostoru po náročném dni", family: "odpor", emotion: "nechuť", intensity: 4, body: "napětí v ramenou", response: "odešel jsem po chvíli ven", createdAt: "2026-07-13T19:15:00.000Z" },
  { id: "demo-14", day: 14, situation: "Řekl jsem nahlas, že potřebuji chvíli pro sebe", family: "radost", emotion: "úleva", intensity: 5, body: "volnější dech", response: "dal jsem si deset minut bez telefonu", createdAt: "2026-07-14T20:05:00.000Z" },
  { id: "demo-15", day: 15, situation: "Přišla změna domluvy ve chvíli, kdy jsem měl málo času", family: "vztek", emotion: "frustrace", intensity: 4, body: "sevřená čelist", response: "začal jsem vysvětlovat, proč to nejde", createdAt: "2026-07-15T13:10:00.000Z" },
  { id: "demo-16", day: 16, situation: "Doma po mně někdo chtěl rychlé rozhodnutí", family: "vztek", emotion: "podráždění", intensity: 4, body: "zrychlený dech", response: "odpověděl jsem dřív, než jsem si otázku promyslel", createdAt: "2026-07-16T19:40:00.000Z" },
  { id: "demo-17", day: 17, situation: "Čekal jsem na důležitou odpověď", family: "strach", emotion: "nejistota", intensity: 4, body: "tlak v žaludku", response: "opakovaně jsem kontroloval telefon", createdAt: "2026-07-17T16:25:00.000Z" },
  { id: "demo-18", day: 18, situation: "Na poradě jsem začal tlačit na rychlé rozhodnutí", family: "vztek", emotion: "napětí", intensity: 4, body: "horko v obličeji", response: "převzal jsem řízení celé debaty", createdAt: "2026-07-18T11:35:00.000Z" },
  { id: "demo-19", day: 19, situation: "Po ostré odpovědi doma nastalo ticho", family: "smutek", emotion: "lítost", intensity: 3, body: "tíha na hrudi", response: "po chvíli jsem se vrátil a rozhovor otevřel znovu", createdAt: "2026-07-19T21:00:00.000Z" },
  { id: "demo-20", day: 20, situation: "Přišla další žádost na konci pracovního dne", family: "vztek", emotion: "frustrace", intensity: 3, body: "sevřená čelist", response: "řekl jsem, že odpovím za deset minut", createdAt: "2026-07-20T17:15:00.000Z" },
  { id: "demo-21", day: 21, situation: "Všiml jsem si napětí dřív, než jsem začal mluvit ostře", family: "radost", emotion: "úleva", intensity: 4, body: "volnější dech", response: "pojmenoval jsem, že potřebuji chvíli", createdAt: "2026-07-21T20:15:00.000Z" },
];

const MAP_DEMO_PRACTICE: PracticeEntry[] = [
  { day: 1, question: "Co se ve mně právě změnilo?", answer: "Když jsem otevřel pracovní zprávy, zrychlil se mi dech a zvedla se mi ramena. Ještě nevím, jakou emoci to znamená, ale něco bylo jinak.", updatedAt: "2026-07-01T20:00:00.000Z" },
  { day: 2, question: "Co se skutečně stalo?", answer: "Partner mi na dvě zprávy odpověděl až večer. Příběh v mojí hlavě zněl: „Nejsem pro něj důležitý.“", updatedAt: "2026-07-02T20:00:00.000Z" },
  { day: 3, question: "Kde jsem změnu poznal nejdřív?", answer: "Nejdřív jsem si všiml sevřené čelisti. Až potom mi došlo, že také mluvím rychleji a skoro nedýchám do břicha.", updatedAt: "2026-07-03T20:00:00.000Z" },
  { day: 4, question: "Co cítím dřív, než si to vysvětlím?", answer: "Nejblíž je mi frustrace a trochu bezmoc. Nemám v tom úplně jasno, ale tato dvě slova jsou přesnější než jen „jsem naštvaný“.", updatedAt: "2026-07-04T20:00:00.000Z" },
  { day: 5, question: "Jak silná byla emoce?", answers: { intensity: 4, note: "Nejsilnější byla ve chvíli, kdy jsem měl rychle rozhodnout za ostatní." }, updatedAt: "2026-07-05T20:00:00.000Z" },
  { day: 6, question: "K jaké reakci mě emoce táhla?", answer: "Měl jsem chuť okamžitě odpovědět a převzít celé rozhodnutí. Když jsem to pojmenoval, dokázal jsem si dát deset minut.", updatedAt: "2026-07-06T20:00:00.000Z" },
  { day: 7, question: "Co se tento týden opakovalo?", answer: "Když už nemám kapacitu, nejdřív sevřu čelist a zrychlím. Všimnu si toho většinou až podle tónu hlasu.", updatedAt: "2026-07-07T20:00:00.000Z" },
  { day: 8, question: "Která široká rodina je tomu, co prožívám, nejblíž?", answers: { situation: "Na konci porady přišel další požadavek a čekala se ode mě okamžitá odpověď.", families: ["vztek", "strach"], intensity: 4, why: "Vztek zachycuje překročenou kapacitu. Strach nejistotu, že druhé zklamu, když odmítnu." }, updatedAt: "2026-07-08T20:00:00.000Z" },
  { day: 9, question: "Které slovo bylo o krok přesnější?", answers: { answer: "Pod vztekem jsem dvakrát našel frustraci. Pomohlo mi to hledat, kde jsem neměl prostor rozhodnout." }, updatedAt: "2026-07-09T20:00:00.000Z" },
  { day: 10, question: "Co cítím a co si o tom začínám myslet?", answers: { situation: "Dnes mi blízký člověk neodpověděl na dvě zprávy.", thought: "Začal jsem si říkat, že mu na mně nezáleží.", emotions: "Nejistota a smutek.", hardest: "Nejtěžší bylo oddělit myšlenku od toho, co se skutečně stalo." }, updatedAt: "2026-07-10T20:00:00.000Z" },
  { day: 11, question: "Která dvě slova mohla být pravdivá?", answers: { answer: "Nejistota i zklamání. Každé slovo otevřelo jinou otázku." }, updatedAt: "2026-07-11T20:00:00.000Z" },
  { day: 12, question: "Co dokážu zachytit, i když ještě nemám název?", answers: { situation: "Přišla změna plánu, se kterou jsem nepočítal.", body: "Zadržel jsem dech a ztuhla mi ramena.", intensity: 4, impulse: "Odejít a nic teď nevysvětlovat.", laterWord: "Později mi byla nejblíž nejistota." }, updatedAt: "2026-07-12T20:00:00.000Z" },
  { day: 13, question: "Co se ve mně mění v přítomnosti druhých lidí?", answers: { situation: "Rozhovor s člověkem, před kterým se snažím působit jistě.", before: "Před setkáním jsem byl klidný.", during: "Začal jsem mluvit rychleji, vysvětlovat a hlídat jeho reakci.", emotions: "Napětí a obava.", after: "Únava a úleva, že už nemusím nic dokazovat." }, updatedAt: "2026-07-13T20:00:00.000Z" },
  { day: 14, question: "Jak vypadá tvůj první emoční slovník?", answers: { easyWords: "napětí, podráždění, úleva", surprisingWord: "hrdost", hardArea: "smutek a chvíle, kdy se stáhnu", nextFocus: "Co se děje těsně předtím, než začnu mluvit ostře?" }, updatedAt: "2026-07-14T20:00:00.000Z" },
  { day: 15, question: "Co se v mých reakcích začíná opakovat?", answers: { situations: "Změna domluvy, další požadavek na konci dne a rychlé rozhodování doma.", commonThread: "Málo prostoru a pocit, že musím vše vyřešit hned.", whenItReturns: "Když už nemám rezervu a někdo ode mě chce rychlou odpověď." }, updatedAt: "2026-07-15T20:00:00.000Z" },
  { day: 16, question: "Co u mě přichází o chvíli dřív než známá reakce?", answers: { reaction: "Začnu mluvit ostře a všechno rychle vysvětlovat.", earlySignal: "Sevřená čelist a rychlejší dech.", howIKnow: "Přestanu druhého poslouchat a v hlavě si připravuji odpověď." }, updatedAt: "2026-07-16T20:00:00.000Z" },
  { day: 17, question: "Co obvykle udělám, když se takto cítím?", answers: { situationEmotion: "Frustrace, když mám málo času a přichází další požadavek.", impulse: "Rychle to uzavřít a převzít kontrolu.", usualAction: "Začnu rozhodovat za ostatní nebo odpovím ostře." }, updatedAt: "2026-07-17T20:00:00.000Z" },
  { day: 18, question: "Co mi moje obvyklá reakce na chvíli přinese?", answers: { usualAction: "Převezmu kontrolu a rozhodnu rychle.", immediateChange: "Na chvíli zmizí nejistota a čekání.", shortRelief: "Pocit, že mám situaci zase v rukou." }, updatedAt: "2026-07-18T20:00:00.000Z" },
  { day: 19, question: "Co moje reakce vytvořila potom?", answers: { reaction: "Odpověděl jsem ostře a rozhovor ukončil.", impactSelf: "Únavu a později lítost.", impactOthers: "Druhý člověk ztichl a přestal se ptát.", impactSituation: "Téma zůstalo nedořešené a vrátili jsme se k němu večer." }, updatedAt: "2026-07-19T20:00:00.000Z" },
  { day: 20, question: "Které chvíle ve své reakci si dokážu všimnout dřív a co potom zkusím?", answers: { earlySignal: "Sevřená čelist.", usualAction: "Začnu mluvit rychleji a tlačit na řešení.", choicePoint: "Všimnout si čelisti ještě před první odpovědí.", nextStep: "Řeknu: „Dej mi deset minut a potom se domluvíme.“" }, updatedAt: "2026-07-20T20:00:00.000Z" },
  { day: 21, question: "Čeho jsem si u své reakce všiml a co chci příště zachytit dřív?", answers: { repeatingSituation: "Další požadavek ve chvíli, kdy už nemám rezervu.", emotion: "Frustrace a napětí.", earlySignal: "Sevřená čelist a zrychlený dech.", usualAction: "Začnu tlačit na rychlé řešení.", shortRelief: "Pocit kontroly.", impact: "Únava, lítost a menší otevřenost druhých.", choicePoint: "Zachytit čelist a odložit odpověď o deset minut.", nextQuestion: "Co v takové chvíli skutečně potřebuji?" }, updatedAt: "2026-07-21T20:00:00.000Z" },
];

const NEEDS_DEMO_PRACTICE: PracticeEntry[] = [
  { day: 1, question: "Co pro mě v této chvíli mohlo být důležité?", answers: { situation: "Kolega změnil domluvený termín.", emotion: "Podráždění a sevřená čelist.", important: "Potřeboval jsem předvídatelnost a prostor rozhodnout o svém čase." }, updatedAt: "2026-07-01T20:00:00.000Z" },
  { day: 2, question: "Kdy jsem svoji potřebu zlehčil nebo odsunul?", answers: { moment: "Souhlasil jsem s dalším úkolem, i když jsem už cítil únavu.", need: "Potřeboval jsem odpočinek a možnost rozhodnout o své kapacitě.", belief: "Říkal jsem si, že to přece ještě zvládnu a že odmítnutí by bylo sobecké." }, updatedAt: "2026-07-02T20:00:00.000Z" },
  { day: 3, question: "Do které oblasti moje dnešní potřeba patří?", answers: { situation: "Na poradě se změnilo zadání.", families: "Bezpečí a autonomie", ownWord: "Jasnost a možnost ovlivnit další krok." }, updatedAt: "2026-07-03T20:00:00.000Z" },
  { day: 4, question: "Co cítím a co možná potřebuju?", answers: { emotion: "Frustraci a tlak v čelisti.", need: "Potřebuju jasnou prioritu a čas dokončit jednu věc.", difference: "Když jsem vrstvy oddělil, nemusel jsem bojovat se vztekem. Mohl jsem se ptát, o co konkrétně potřebuju požádat." }, updatedAt: "2026-07-04T20:00:00.000Z" },
  { day: 5, question: "Která potřeba byla v této příjemné chvíli naplněná?", answers: { goodMoment: "Šel jsem hodinu sám bez telefonu.", feeling: "Klid a úleva.", fulfilled: "Prostor, ticho a možnost nikomu právě neodpovídat." }, updatedAt: "2026-07-05T20:00:00.000Z" },
  { day: 6, question: "Kolika způsoby se můžu postarat o jednu potřebu?", answers: { need: "Prostor a klid.", automaticStrategy: "Stáhnu se bez vysvětlení a přestanu odpovídat.", optionTwo: "Řeknu, že potřebuju deset minut, a domluvím čas návratu.", optionThree: "Ztlumím telefon a dokončím jednu důležitou věc." }, updatedAt: "2026-07-06T20:00:00.000Z" },
  { day: 7, question: "Co se u mě během týdne opakovalo?", answers: { repeatingSituation: "Další požadavek ve chvíli, kdy už mám plný den.", repeatingNeed: "Prostor a autonomie", usualStrategy: "Převezmu kontrolu nebo odpovím ostře.", fulfilledMoment: "Když si před odpovědí nechám čas.", nextQuestion: "Jak můžu potřebu prostoru respektovat bez řízení druhých?" }, updatedAt: "2026-07-07T20:00:00.000Z" },
  { day: 8, question: "Co potřebuju a jakým krokem se to snažím získat?", answers: { need: "Jistotu a prostor.", strategy: "Rychle rozhodnu za všechny.", shortEffect: "Na chvíli mám pocit kontroly." }, updatedAt: "2026-07-08T20:00:00.000Z" },
  { day: 9, question: "Jaké další cesty mohou vést ke stejné potřebě?", answers: { need: "Jasnost.", usual: "Začnu se vyptávat a kontrolovat všechny podrobnosti.", self: "Sepíšu si, co skutečně vím a co je jen moje domněnka.", relationship: "Požádám druhého o jednu konkrétní informaci.", environment: "Omezím počet otevřených úkolů a zpráv." }, updatedAt: "2026-07-09T20:00:00.000Z" },
  { day: 10, question: "Co pro tuto potřebu můžu udělat já?", answers: { need: "Prostor.", myInfluence: "Můžu si vzít deset minut před odpovědí.", request: "Můžu požádat, ať se k tématu vrátíme v domluvený čas.", outside: "Nemůžu ovládat, zda bude druhý s odkladem spokojený." }, updatedAt: "2026-07-10T20:00:00.000Z" },
  { day: 11, question: "Která část vztahové potřeby je moje a která vzniká mezi námi?", answers: { need: "Důvěra a otevřenost.", myPart: "Můžu říct pravdu o tom, co cítím a co potřebuju.", sharedPart: "Důvěra vzniká, když oba nasloucháme a dodržujeme domluvy.", reality: "Nemůžu otevřenost vytvořit sám, pokud druhý dlouhodobě odmítá kontakt." }, updatedAt: "2026-07-11T20:00:00.000Z" },
  { day: 12, question: "Co jsem čekal a věděl o tom druhý člověk?", answers: { situation: "Partner večer naplánoval návštěvu bez předchozí domluvy.", expectation: "Čekal jsem, že pochopí, že po náročném dni potřebuju klid.", didTheyKnow: "Nevěděl to. Únavu jsem nepojmenoval a navenek jsem dál fungoval.", clearVersion: "„Dnes už nemám kapacitu na návštěvu. Můžeme ji přesunout na sobotu?“" }, updatedAt: "2026-07-12T20:00:00.000Z" },
  { day: 13, question: "Jak můžu potřebu sdělit a ponechat druhému možnost odpovědi?", answers: { situation: "Přišel další požadavek na konci dne.", emotionNeed: "Jsem unavený a potřebuju prostor dokončit jednu věc.", request: "Můžeme to otevřít zítra v devět?", alternative: "Pokud to hoří, řekni mi prosím jednu část, která opravdu nemůže počkat." }, updatedAt: "2026-07-13T20:00:00.000Z" },
  { day: 14, question: "Jak se dnes snažím starat o svoje potřeby?", answers: { need: "Prostor a možnost volby.", strategy: "Převezmu kontrolu a rozhodnu rychle.", shortEffect: "Klesne nejistota.", laterCost: "Únava a menší otevřenost druhých.", myInfluence: "Odložit odpověď a pojmenovat kapacitu.", request: "Požádat o jasnou prioritu.", outside: "Reakce druhého člověka.", newPath: "Domluvit konkrétní čas pro rozhodnutí." }, updatedAt: "2026-07-14T20:00:00.000Z" },
  { day: 15, question: "Která potřeba je u mě citlivější a jak ji poznám?", answers: { sensitiveNeed: "Možnost volby.", situations: "Když se plán změní bez domluvy nebo když mám odpovědět okamžitě.", signs: "Zrychlím, sevřu čelist a začnu vysvětlovat, proč něco nejde.", certainty: 4 }, updatedAt: "2026-07-15T20:00:00.000Z" },
  { day: 16, question: "Odkud znám svůj obvyklý způsob, jak se o tuto potřebu starám?", answers: { strategy: "Všechno rychle převezmu.", origin: "Dlouho jsem byl člověk, na kterého bylo vždy spolehnutí.", oldUse: "Přinášelo mi to uznání a pocit bezpečí.", currentLimit: "Dnes mě to vyčerpává a bere prostor ostatním." }, updatedAt: "2026-07-16T20:00:00.000Z" },
  { day: 17, question: "Jakou úlevu mi moje známá strategie přináší?", answers: { strategy: "Převezmu vedení a rozhodnu za ostatní.", quickEffect: "Zmizí čekání a nejasnost.", relief: "Na chvíli se cítím jistě a užitečně.", need: "Jistota a pocit kompetence." }, updatedAt: "2026-07-17T20:00:00.000Z" },
  { day: 18, question: "Co tato strategie vytváří po několika hodinách nebo dnech?", answers: { strategy: "Převezmu kontrolu.", shortEffect: "Rychlá jistota.", impactSelf: "Únava a lítost.", impactRelationship: "Druzí přestanou přinášet vlastní pohled.", impactEnergy: "Večer už nemám rezervu.", impactSituation: "Rozhodnutí je rychlé, ale ne společné." }, updatedAt: "2026-07-18T20:00:00.000Z" },
  { day: 19, question: "Jaké tři realistické možnosti mám místo známé strategie?", answers: { need: "Jistota a spolupráce.", oldStrategy: "Rychle rozhodnu za všechny.", optionOne: "Požádám o dvě možné varianty.", optionTwo: "Domluvím si čas, kdy rozhodnutí uděláme společně.", optionThree: "Řeknu, kterou část můžu převzít a kterou nechám druhému." }, updatedAt: "2026-07-19T20:00:00.000Z" },
  { day: 20, question: "Kterou novou možnost vyzkouším v malé běžné situaci?", answers: { situation: "Další neurgentní požadavek během soustředěné práce.", need: "Prostor.", usualStrategy: "Odpovědět hned a podrážděně.", newStep: "Napsat, kdy se k tomu vrátím.", observe: "Čelist, dech, pocit tlaku a kvalitu pozdější odpovědi.", backup: "Pokud tlak neklesne, požádám o upřesnění priority." }, updatedAt: "2026-07-20T20:00:00.000Z" },
  { day: 21, question: "Co už vím o tom, co potřebuju a jak o to chci pečovat?", answers: { situation: "Další požadavek ve chvíli, kdy už nemám rezervu.", emotion: "Frustrace a nejistota.", need: "Prostor, jasnost a možnost volby.", strategy: "Převezmu kontrolu a rozhodnu rychle.", shortRelief: "Pocit jistoty.", laterCost: "Únava, lítost a menší otevřenost druhých.", myInfluence: "Zachytit čelist a odložit odpověď.", request: "Požádat o prioritu nebo konkrétní termín.", outside: "Nemůžu řídit reakci druhého.", options: "Deset minut pauza. Jasná prosba. Změna termínu.", experiment: "U tří neurgentních požadavků napíšu, kdy se k nim vrátím.", nextQuestion: "Když nemůžu naplnit všechno najednou, podle čeho se chci rozhodnout?" }, updatedAt: "2026-07-21T20:00:00.000Z" },
];

const VALUES_DEMO_PRACTICE: PracticeEntry[] = [
  { day: 1, question: "Co o mých prioritách ukazuje jeden obyčejný den?", answers: { trace: "Večer jsem místo společného času ještě hodinu odpovídal na pracovní zprávy.", space: "Práce a pocit spolehlivosti.", aside: "Blízkost, klid a odpočinek." }, updatedAt: "2026-07-01T20:00:00.000Z" },
  { day: 2, question: "Co se změnilo, když jsem neodpověděl okamžitě?", answers: { request: "Kolega mě požádal o další úkol do zítřka.", options: "Přijmout ho. Odmítnout ho. Domluvit menší rozsah a nový termín.", choice: "Po deseti vteřinách jsem navrhl menší rozsah. Cítil jsem napětí, ale domluva zůstala v pořádku." }, updatedAt: "2026-07-02T20:00:00.000Z" },
  { day: 3, question: "Kterou převzatou větu si chci znovu vybrat po svém?", answers: { rule: "Nejdřív povinnosti.", origin: "Slýchal jsem ji doma. Pomáhala držet závazky, ale odpočinek se v ní nikdy nedostal na řadu.", rewrite: "Povinnosti i obnova patří do stejného reálného dne." }, updatedAt: "2026-07-03T20:00:00.000Z" },
  { day: 4, question: "Co se stane, když výsledek na chvíli nemusí nic dokazovat?", answers: { result: "Dokončil jsem náročný návrh a klient ho schválil.", relief: "Asi deset minut.", nextDemand: "Hned jsem začal hledat, co v projektu ještě není dokonalé.", otherWorth: "Poctivost, schopnost učit se, vztahy a odvaha přiznat chybu." }, updatedAt: "2026-07-04T20:00:00.000Z" },
  { day: 5, question: "Jaké to je ukázat malý kousek sebe a zůstat v kontaktu?", answers: { hidden: "Chtěl jsem klidný večer doma, ale skupina plánovala další program.", sentence: "Dnes se nepřidám. Potřebuju večer pro sebe.", impact: "Nikdo se neurazil. Ve mně nejdřív přišlo napětí a potom úleva." }, updatedAt: "2026-07-05T20:00:00.000Z" },
  { day: 6, question: "Jakou hodnotu ukázal můj čin bez komentáře?", answers: { camera: "Po ostré odpovědi jsem se vrátil, omluvil se a nechal druhého domluvit.", value: "Odpovědnost a péče o vztah.", edit: "Příště se chci vrátit dřív, ne až večer." }, updatedAt: "2026-07-06T20:00:00.000Z" },
  { day: 7, question: "Jaký vzorec se ukáže, když položím několik dní vedle sebe?", answers: { chosen: "Opravil jsem chybu. Dodržel jsem důležitou domluvu. Řekl jsem pravdu o kapacitě.", automatic: "Automaticky jsem přijal dva požadavky a odložil odpočinek.", price: "Únava, podráždění a méně pozornosti doma.", pattern: "Odpovědnost chci zachovat, automatické přebírání všeho chci pozorovat." }, updatedAt: "2026-07-07T20:00:00.000Z" },
  { day: 8, question: "Kde uvnitř povinnosti ještě zůstává moje volba?", answers: { must: "Musím to zvládnout sám.", facts: "Za výsledek odpovídám, ale části práce lze delegovat.", fear: "Že budu působit neschopně a někdo udělá věc jinak než já.", choice: "Můžu si ponechat rozhodnutí a požádat o zpracování podkladů." }, updatedAt: "2026-07-08T20:00:00.000Z" },
  { day: 9, question: "Jakou podmínku vlastní hodnoty dnes můžu uvidět přesněji?", answers: { successMeaning: "Jsem schopný a můžu být v klidu.", failureMeaning: "Nejsem dost dobrý a ostatní to poznají.", both: "Jsem člověk, který se může učit, napravovat chyby a neztrácí hodnotu jedním výsledkem." }, updatedAt: "2026-07-09T20:00:00.000Z" },
  { day: 10, question: "Jak chci tuto hodnotu žít pevně a současně lidsky?", answers: { value: "Odpovědnost.", healthy: "Řeknu pravdu o kapacitě, držím realistické sliby a včas komunikuju změnu.", hard: "Přijmu všechno a mlčím, dokud nejsem vyčerpaný.", signal: "Začnu slibovat bez pohledu do kalendáře." }, updatedAt: "2026-07-10T20:00:00.000Z" },
  { day: 11, question: "Co se změní, když hodnotu nezruším, ale upravím její dávku?", answers: { value: "Efektivita.", intensity: 5, impact: "Přerušil jsem pomalejšího kolegu a přišel o jeho důležitý postřeh.", softer: "Nechám ho dokončit myšlenku a až potom shrnu rozhodnutí." }, updatedAt: "2026-07-11T20:00:00.000Z" },
  { day: 12, question: "Jak vypadá konflikt, když mají obě strany legitimní důvod?", answers: { valueA: "Odpovědnost", voiceA: "Chce dodržet slíbený termín. Cena je další večer bez rodiny.", valueB: "Blízkost", voiceB: "Chce být dnes přítomný doma. Cena je změna pracovního plánu.", priority: "Dnes dám přednost blízkosti a ráno otevřeně upravím termín." }, updatedAt: "2026-07-12T20:00:00.000Z" },
  { day: 13, question: "Dokážu svoji prioritu říct bez znehodnocení druhé hodnoty?", answers: { choice: "Dnes dávám přednost obnově, protože bez ní zítra nebudu přítomný v práci ani doma.", price: "Odmítnu zajímavou večerní schůzku.", return: "Navrhnu dva termíny na příští týden." }, updatedAt: "2026-07-13T20:00:00.000Z" },
  { day: 14, question: "Kde je na mapě nejčasnější místo pro vědomou volbu?", answers: { conflict: "Odpovědnost a péče o sebe.", trigger: "Nový požadavek přijde na konci už plného dne.", script: "Řeknu ano, pracuju večer, ztratím energii a doma jsem podrážděný.", choicePoint: "Před odpovědí otevřít kalendář a říct, kdy se ozvu." }, updatedAt: "2026-07-14T20:00:00.000Z" },
  { day: 15, question: "Na čem už můžu stavět, místo abych začínal od nuly?", answers: { moments: "Přiznal jsem chybu. Dodržel jsem slib synovi. Vrátil jsem se po konfliktu k rozhovoru.", sharedValue: "Pravdivost a péče.", conditions: "Nespěchal jsem, znal jsem svoji kapacitu a téma pro mě bylo opravdu důležité.", repeat: "Před důležitou odpovědí si nechám krátkou pauzu." }, updatedAt: "2026-07-15T20:00:00.000Z" },
  { day: 16, question: "Co může zůstat, i když staré pravidlo pustím?", answers: { core: "Odpovědnost.", shell: "Všechno musím unést sám a bez stížnosti.", options: "Včas požádat o pomoc. Jasně rozdělit odpovědnost a kontrolní body." }, updatedAt: "2026-07-16T20:00:00.000Z" },
  { day: 17, question: "Co zůstane důležité, když zmizí potlesk?", answers: { goal: "Vytvořit opravdu užitečný systém pro práci se sebou.", withoutAudience: "Stále bych chtěl, aby byl lidský, přesný a praktický.", change: "Méně bych řešil dojem a víc skutečnou použitelnost.", ownReason: "Chci lidem pomoct lépe slyšet vlastní směr." }, updatedAt: "2026-07-17T20:00:00.000Z" },
  { day: 18, question: "Jak se moje hodnota přestane schovávat za abstraktní slovo?", answers: { value: "Respekt.", verbs: "Naslouchat. Zeptat se. Říct hranici bez útoku.", chosenVerb: "Naslouchat.", scene: "Zítra na poradě nechám kolegu dokončit první myšlenku." }, updatedAt: "2026-07-18T20:00:00.000Z" },
  { day: 19, question: "Co dnes představuje malý, ale skutečný důkaz mého směru?", answers: { act: "Odmítl jsem neurgentní požadavek bez útoku a dlouhé obhajoby.", effect: "Měl jsem víc prostoru a pracovní vztah zůstal v pořádku.", next: "Stejnou jasnost chci zkusit před souhlasem, ne až po přetížení." }, updatedAt: "2026-07-19T20:00:00.000Z" },
  { day: 20, question: "Jak bude vypadat můj bezpečný sedmidenní experiment?", answers: { value: "Respekt.", situations: "Porada, domluva doma a odpověď na nový pracovní požadavek.", behavior: "Nechám druhého dokončit větu a potom jasně pojmenuju svoji kapacitu.", observe: "Napětí, kvalitu domluvy a pozdější energii.", adjust: "Pokud bude situace příliš vyhrocená, požádám o deset minut a vrátím se." }, updatedAt: "2026-07-20T20:00:00.000Z" },
  { day: 21, question: "Jak zní dohoda, která mě vede, ale nesvazuje?", answers: { directions: "Pravdivost, respekt a odpovědnost.", behaviors: "Mluvím jasně. Naslouchám. Neslibuju víc, než můžu unést.", conflict: "Pojmenuju obě hodnoty, zvolím prioritu pro danou chvíli a přiznám cenu.", return: "Když se odchýlím, vrátím se k nejmenšímu dostupnému činu bez trestání sebe.", manifest: "Chci být pravdivý a spolehlivý člověk, který respektuje druhé i svoji kapacitu." }, updatedAt: "2026-07-21T20:00:00.000Z" },
];

const IDENTITY_DEMO_PRACTICE: PracticeEntry[] = [
  { day: 1, question: "Co se objeví, když vedle rolí nechám místo i pro člověka?", answers: { roles: "Vedoucí, partner, táta, přítel a tvůrce.", largest: "Vedoucí a člověk, který zařizuje.", beyond: "Zvědavost, humor, citlivost a chuť tvořit bez okamžitého výsledku." }, updatedAt: "2026-07-01T20:00:00.000Z" },
  { day: 2, question: "Jaké je být chvíli člověkem, ne úkolem?", answers: { when: "Dnes od 19:30 do 20:00.", voices: "Měl bych ještě odpovědět na zprávy. Tohle je ztráta času. Co když něco zapomenu?", remains: "Jsem partner, táta, zvídavý člověk a někdo, kdo dokáže být přítomný i bez řešení." }, updatedAt: "2026-07-02T20:00:00.000Z" },
  { day: 3, question: "Jaký rozsudek obstojí před všemi dostupnými důkazy?", answers: { oldStory: "Musím mít všechno pod kontrolou.", support: "V nejistotě opravdu rychle přebírám řízení.", exceptions: "Nechal jsem kolegu vést projekt. Doma jsem přijal plán, který nevznikl podle mě.", newStory: "Kontrolu často hledám ve stresu, ale dokážu důvěřovat a nechat prostor." }, updatedAt: "2026-07-03T20:00:00.000Z" },
  { day: 4, question: "Co se změní, když nálepku použiju jako popis, ne jako zákaz?", answers: { label: "Jsem příliš tvrdý.", fits: "Ve stresu mluvím rychle a zkracuju druhé.", doesNotFit: "Umím se vrátit, omluvit a být citlivý k tomu, co druhý prožívá.", experiment: "Po jedné napjaté větě se zastavím a řeknu ji znovu přesněji." }, updatedAt: "2026-07-04T20:00:00.000Z" },
  { day: 5, question: "Jakou kvalitu už dokládá moje vlastní zkušenost?", answers: { quality: "Odvaha a péče.", evidence: "Řekl jsem nepříjemnou pravdu. Požádal jsem o pomoc. Vrátil jsem se k rozhovoru po chybě.", conditions: "Měl jsem chvíli na přípravu, cítil jsem bezpečí a věděl jsem, proč je čin důležitý." }, updatedAt: "2026-07-05T20:00:00.000Z" },
  { day: 6, question: "Pro který příběh o sobě chci příště hlasovat?", answers: { automatic: "Na každou zprávu odpovím okamžitě.", story: "Jsem člověk, který musí být stále dostupný.", newVote: "Na jednu neurgentní zprávu odpovím v čase, který jsem si pro komunikaci určil." }, updatedAt: "2026-07-06T20:00:00.000Z" },
  { day: 7, question: "Jak vypadá moje dnešní mapa bez jediné konečné nálepky?", answers: { roles: "Vedoucí, partner, táta, přítel a tvůrce.", stories: "Musím být silný a vždy vědět, co dál.", qualities: "Odvaha, péče, vytrvalost a schopnost vrátit se po chybě.", patterns: "Ve stresu přebírám kontrolu a odpovídám příliš rychle.", focus: "Chci sledovat okamžik těsně před převzetím kontroly." }, updatedAt: "2026-07-07T20:00:00.000Z" },
  { day: 8, question: "Kam ukazuje moje šipka, i když ještě nejsem v cíli?", answers: { ideal: "Čekám, až budu klidný a sebevědomý člověk, kterého nic nerozhodí.", direction: "Zpomalit a dát před rozhodnutím prostor sobě i druhým.", step: "Před jedním rozhodnutím položím dvě otázky místo okamžitého řešení." }, updatedAt: "2026-07-08T20:00:00.000Z" },
  { day: 9, question: "Jak chci jít, ne jen kam chci dojít?", answers: { goal: "Dokončit nový systém a uvést ho mezi lidi.", notThisWay: "Nechci ho vytvořit tlakem, vyčerpáním a rozhodováním za všechny.", qualities: "Jasnost a lidskost.", scene: "Na příští poradě shrnu cíl a nechám každého přinést vlastní pohled." }, updatedAt: "2026-07-09T20:00:00.000Z" },
  { day: 10, question: "Jak chci znít ve vztahu, když se neshodneme?", answers: { topic: "Jak rozdělíme společný víkend.", mySentence: "Potřebuju, aby část víkendu zůstala bez programu.", space: "Chci slyšet, co je pro tebe na společném plánu důležité.", repair: "Mluvil jsem příliš tvrdě. Chci to zkusit znovu bez útoku." }, updatedAt: "2026-07-10T20:00:00.000Z" },
  { day: 11, question: "Jak vypadá odpovědnost bez rozsudku nad sebou?", answers: { error: "Rozhodl jsem příliš rychle a nezahrnul důležitý podklad od kolegy.", repair: "Přiznám chybu, doplním podklad a změním rozhodnutí do zítřka.", notVerdict: "Nevypovídá to, že jsem neschopný vedoucí nebo špatný člověk." }, updatedAt: "2026-07-11T20:00:00.000Z" },
  { day: 12, question: "Jak se dnes zachová člověk, který bere svoji kapacitu vážně?", answers: { signal: "Sevřená čelist, hlad a zrychlené přepínání mezi úkoly.", care: "Dám si jídlo a dvacet minut bez obrazovky.", when: "V 17:30, i když nebude všechno dokončené.", realistic: 5 }, updatedAt: "2026-07-12T20:00:00.000Z" },
  { day: 13, question: "Jaký důkaz můžu vytvořit dřív, než budu mít pocit, že jsem připravený?", answers: { identity: "Jsem člověk, který si dovolí čas na vlastní odpověď.", act: "Řeknu: „Potřebuju si to promyslet. Ozvu se zítra dopoledne.“", result: "Druhý souhlasil a já jsem odpověděl bez pozdějšího odporu." }, updatedAt: "2026-07-13T20:00:00.000Z" },
  { day: 14, question: "Jak bude můj budoucí směr vidět ve třech částech života?", answers: { relations: "Pravdivost: řeknu potřebu dřív, než se stáhnu.", work: "Jasnost: určím prioritu bez přebírání všeho.", care: "Respekt ke kapacitě: skončím dva večery v domluvený čas.", first: "Otevřený rozhovor doma." }, updatedAt: "2026-07-14T20:00:00.000Z" },
  { day: 15, question: "Který detail obyčejného dne ukazuje, že je tato vize opravdu moje?", answers: { morning: "První hodinu nezačínám telefonem. Snídám s rodinou a krátce se hýbu.", day: "Pracuju ve dvou soustředěných blocích a mezi nimi mám prostor na jídlo a rozhovor.", evening: "V šest práci zavírám. Jsem doma hlavou i tělem a neusínám u posledního úkolu.", difference: "Práce má jasný konec a nepřetéká do každé volné chvíle." }, updatedAt: "2026-07-15T20:00:00.000Z" },
  { day: 16, question: "Co je na mojí polovině vztahového hřiště?", answers: { bring: "Mluvit pravdivě, naslouchat bez přerušení a pojmenovat svůj stav.", boundary: "Říct hranici bez trestu a po chybě se vrátit.", shared: "Důvěra, ochota mluvit a respekt k domluvě.", outside: "Nemůžu řídit, zda druhý moji hranici přijme nebo se mnou bude souhlasit." }, updatedAt: "2026-07-16T20:00:00.000Z" },
  { day: 17, question: "Jaká práce dává smysl nejen z dálky, ale i v běžném týdnu?", answers: { activities: "Tvořit srozumitelné systémy, psát, vést rozhovory a proměňovat složité věci v použitelné kroky.", contribution: "Pomáhat lidem lépe rozumět sobě a vést vlastní život.", conditions: "Soustředěné bloky, malý tým, otevřenost a méně provozních schůzek.", needs: "Stabilní příjem, čas pro rodinu a práce bez pravidelných večerů." }, updatedAt: "2026-07-17T20:00:00.000Z" },
  { day: 18, question: "Co může moje prostředí udělat za mě dřív, než zapojím vůli?", answers: { behavior: "Ráno tvořit devadesát minut bez přerušení.", friction: "Telefon na stole, otevřený e-mail a nejasný první úkol.", remove: "Telefon nechám v jiné místnosti a e-mail otevřu až po bloku.", support: "Večer si připravím jediný první úkol a čistý pracovní stůl." }, updatedAt: "2026-07-18T20:00:00.000Z" },
  { day: 19, question: "Která jedna změna může otevřít další možnosti?", answers: { gaps: "Práce přetéká do večerů. Málo pohybu. Málo klidného času doma. Neustálá dostupnost.", domino: "Nejasný konec pracovního dne.", impact: "Ovlivňuje spánek, vztahy, pohyb i energii dalšího rána.", move: "Dva večery tento týden ukončím práci v 18:00." }, updatedAt: "2026-07-19T20:00:00.000Z" },
  { day: 20, question: "Jak vypadají tři prkna mezi dneškem a jedním krokem vize?", answers: { when: "Ve středu v 18:00.", action: "Zavřu práci a půjdu s rodinou ven bez pracovního telefonu.", obstacle: "Objeví se pocit, že ještě musím dokončit poslední úkol.", ifThen: "Když přijde, zapíšu úkol na ráno a notebook zavřu.", observe: "Napětí při odchodu a kvalitu kontaktu během večera." }, updatedAt: "2026-07-20T20:00:00.000Z" },
  { day: 21, question: "Jak zní moje krátká navigace pro další náročnou chvíli?", answers: { signal: "Když si všimnu sevřené čelisti a potřeby všechno rychle rozhodnout…", need: "Možná je pro mě důležitá jasnost, prostor a důvěra.", value: "Chci chránit pravdivost, respekt a odpovědnost.", identity: "Chci jednat jako člověk, který je pevný a nechává prostor i druhým.", step: "Požádám o deset minut a potom pojmenuju svoji kapacitu.", returnQuestion: "Jaký nejmenší čin teď potvrdí můj směr?" }, updatedAt: "2026-07-21T20:00:00.000Z" },
];

function getPracticeExample(backView: View, day: number): PracticeEntry | undefined {
  const examples = backView === "potreby"
    ? NEEDS_DEMO_PRACTICE
    : backView === "hodnoty"
      ? VALUES_DEMO_PRACTICE
      : backView === "identita"
        ? IDENTITY_DEMO_PRACTICE
        : MAP_DEMO_PRACTICE;
  return examples.find((entry) => entry.day === day);
}

const DEMO_VISION_BOARD: VisionBoardData = {
  ordinaryDay: "Ráno začínám bez telefonu. Mám čas na snídani, pohyb a klidnou domluvu s rodinou. Večer nejsem jen unavená hlava, která dokončuje další úkol.",
  relationships: "Ve vztazích chci být pravdivý, přítomný a laskavý. Dokážu říct, co potřebuju, a nechávám druhé dokončit jejich větu.",
  work: "Tvořím práci, která lidem pomáhá lépe rozumět sobě. Pracuju soustředěně a moje práce nepřetéká do každé volné chvíle.",
  body: "Hýbu se, spím a odpočívám dřív, než mě tělo musí zastavit. Energii nevnímám jako samozřejmost, ale jako něco, o co se starám.",
  environment: "Žiju na světlém místě blízko přírody. Mám prostor na společný život i ticho, ve kterém můžu tvořit a slyšet sám sebe.",
  boldDream: "Dovoluju si vytvořit systém, který pomůže tisícům lidí vést sami sebe. Chci přitom zůstat blízko rodině, sobě a životu, který se neodehrává jen v práci.",
  image: "",
};

export function ProstorDemo({
  allowedModules = ["emotions", "needs", "values", "identity"],
}: {
  allowedModules?: AccessModuleCode[];
}) {
  const firstAllowedModule =
    MODULE_KEYS.find((module) => allowedModules.includes(ACCESS_CODE[module])) ?? "emotion";
  const firstAllowedView = firstAllowedModule === "emotion"
    ? "dnes"
    : MODULE_ROOT_VIEW[firstAllowedModule];
  const hasModuleAccess = (module: ModuleKey) =>
    allowedModules.includes(ACCESS_CODE[module]);

  const [view, setView] = useState<View>(firstAllowedView);
  const [activeModuleKey, setActiveModuleKey] = useState<ModuleKey>(firstAllowedModule);
  const [emotionEntryReturnView, setEmotionEntryReturnView] = useState<View>("dnes");
  const [emotionEntryReturnScroll, setEmotionEntryReturnScroll] = useState(0);
  const [entries, setEntries] = useState<EmotionEntry[]>(STARTING_ENTRIES);
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [readDays, setReadDays] = useState<number[]>([]);
  const [practiceEntries, setPracticeEntries] = useState<PracticeEntry[]>([]);
  const [needsReadDays, setNeedsReadDays] = useState<number[]>([]);
  const [needsPracticeEntries, setNeedsPracticeEntries] = useState<PracticeEntry[]>([]);
  const [selectedNeedsDay, setSelectedNeedsDay] = useState(1);
  const [valuesReadDays, setValuesReadDays] = useState<number[]>([]);
  const [valuesPracticeEntries, setValuesPracticeEntries] = useState<PracticeEntry[]>([]);
  const [selectedValuesDay, setSelectedValuesDay] = useState(1);
  const [identityReadDays, setIdentityReadDays] = useState<number[]>([]);
  const [identityPracticeEntries, setIdentityPracticeEntries] = useState<PracticeEntry[]>([]);
  const [integrationDays, setIntegrationDays] = useState<number[]>([]);
  const [selectedIdentityDay, setSelectedIdentityDay] = useState(1);
  const [visionBoard, setVisionBoard] = useState<VisionBoardData>(EMPTY_VISION_BOARD);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profilePhotoPosition, setProfilePhotoPosition] = useState({ x: 50, y: 50 });
  const [profileName, setProfileName] = useState("Martin");
  const [photoEditorOpen, setPhotoEditorOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [moduleTour, setModuleTour] = useState<ModuleKey | null>(null);
  const [moduleTourStep, setModuleTourStep] = useState(0);
  const [serverHydrated, setServerHydrated] = useState(false);
  const serverSaveTimerRef = useRef<number | null>(null);
  const pendingScrollRef = useRef<number | null>(null);

  useEffect(() => {
    const demoTarget = new URLSearchParams(window.location.search).get("demo");
    try {
      const storedProfileName = window.localStorage.getItem(PROFILE_NAME_KEY)?.trim();
      if (storedProfileName) setProfileName(storedProfileName);
    } catch {
      // Výchozí jméno zůstane použitelné i bez lokálního úložiště.
    }
    const demoOnboarding = demoTarget === "onboarding";
    const demoMap = demoTarget === "mapa";
    const demoNeeds = demoTarget === "potreby";
    const demoNeedsMap = demoTarget === "potreby-mapa";
    const demoValues = demoTarget === "hodnoty";
    const demoValuesMap = demoTarget === "hodnoty-mapa";
    const demoIdentity = demoTarget === "identita";
    const demoIdentityMap = demoTarget === "identita-mapa";
    const demoVision = demoTarget === "vize";
    const demoAllModules = demoTarget === "vsechny-moduly";
    const demoReport = demoTarget === "dashboard";
    const demoEmptyReport = demoTarget === "dashboard-prazdny";
    const restoreLastLocation = () => {
      try {
        const storedLocation = window.localStorage.getItem(LAST_LOCATION_KEY);
        if (!storedLocation) return;
        const location = JSON.parse(storedLocation) as {
          view?: View;
          activeModuleKey?: ModuleKey;
          emotionEntryReturnView?: View;
          emotionEntryReturnScroll?: number;
          selectedDay?: number;
          selectedNeedsDay?: number;
          selectedValuesDay?: number;
          selectedIdentityDay?: number;
          scrollY?: number;
        };
        if (location.view && ALL_VIEWS.includes(location.view)) {
          setView(location.view);
          const moduleFromView = VIEW_MODULE[location.view];
          if (moduleFromView) setActiveModuleKey(moduleFromView);
        }
        if (location.activeModuleKey && MODULE_KEYS.includes(location.activeModuleKey)) {
          setActiveModuleKey(location.activeModuleKey);
        }
        if (location.emotionEntryReturnView && ALL_VIEWS.includes(location.emotionEntryReturnView)) {
          setEmotionEntryReturnView(location.emotionEntryReturnView);
        }
        if (typeof location.emotionEntryReturnScroll === "number") {
          setEmotionEntryReturnScroll(Math.max(0, location.emotionEntryReturnScroll));
        }
        if (typeof location.selectedDay === "number") setSelectedDay(Math.min(Math.max(location.selectedDay, 1), 21));
        if (typeof location.selectedNeedsDay === "number") setSelectedNeedsDay(Math.min(Math.max(location.selectedNeedsDay, 1), 21));
        if (typeof location.selectedValuesDay === "number") setSelectedValuesDay(Math.min(Math.max(location.selectedValuesDay, 1), 21));
        if (typeof location.selectedIdentityDay === "number") setSelectedIdentityDay(Math.min(Math.max(location.selectedIdentityDay, 1), 21));
        if (typeof location.scrollY === "number" && location.scrollY >= 0) pendingScrollRef.current = location.scrollY;
      } catch {
        // Při poškozeném záznamu se aplikace otevře na výchozí stránce.
      }
    };
    if (demoOnboarding) {
      setDemoMode(true);
      setEntered(false);
      setReady(true);
      return;
    }
    if (demoEmptyReport) {
      setDemoMode(true);
      setEntries([]);
      setReadDays([]);
      setPracticeEntries([]);
      setNeedsReadDays([]);
      setNeedsPracticeEntries([]);
      setValuesReadDays([]);
      setValuesPracticeEntries([]);
      setIdentityReadDays([]);
      setIdentityPracticeEntries([]);
      setVisionBoard(EMPTY_VISION_BOARD);
      setEntered(true);
      setView("report");
      setReady(true);
      return;
    }
    if (demoMap) {
      setActiveModuleKey("emotion");
      setDemoMode(true);
      setEntries(MAP_DEMO_ENTRIES);
      setReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setPracticeEntries(MAP_DEMO_PRACTICE);
      setEntered(true);
      setView("mapa");
      setReady(true);
      return;
    }
    if (demoNeeds || demoNeedsMap) {
      setActiveModuleKey("needs");
      setDemoMode(true);
      setEntries(MAP_DEMO_ENTRIES);
      setReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setPracticeEntries(MAP_DEMO_PRACTICE);
      setNeedsReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setNeedsPracticeEntries(NEEDS_DEMO_PRACTICE);
      setEntered(true);
      setView(demoNeedsMap ? "potreby-mapa" : "potreby");
      setReady(true);
      return;
    }
    if (demoValues || demoValuesMap) {
      setActiveModuleKey("values");
      setDemoMode(true);
      setEntries(MAP_DEMO_ENTRIES);
      setReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setPracticeEntries(MAP_DEMO_PRACTICE);
      setNeedsReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setNeedsPracticeEntries(NEEDS_DEMO_PRACTICE);
      setValuesReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setValuesPracticeEntries(VALUES_DEMO_PRACTICE);
      setEntered(true);
      setView(demoValuesMap ? "hodnoty-mapa" : "hodnoty");
      setReady(true);
      return;
    }
    if (demoIdentity || demoIdentityMap || demoVision) {
      setActiveModuleKey("identity");
      setDemoMode(true);
      setEntries(MAP_DEMO_ENTRIES);
      setReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setPracticeEntries(MAP_DEMO_PRACTICE);
      setNeedsReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setNeedsPracticeEntries(NEEDS_DEMO_PRACTICE);
      setValuesReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setValuesPracticeEntries(VALUES_DEMO_PRACTICE);
      setIdentityReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setIdentityPracticeEntries(IDENTITY_DEMO_PRACTICE);
      if (demoVision) setVisionBoard(DEMO_VISION_BOARD);
      setEntered(true);
      setView(demoVision ? "vize-board" : demoIdentityMap ? "identita-mapa" : "identita");
      setReady(true);
      return;
    }
    if (demoAllModules || demoReport) {
      setActiveModuleKey("emotion");
      setDemoMode(true);
      setEntries(MAP_DEMO_ENTRIES);
      setReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setPracticeEntries(MAP_DEMO_PRACTICE);
      setNeedsReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setNeedsPracticeEntries(NEEDS_DEMO_PRACTICE);
      setValuesReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setValuesPracticeEntries(VALUES_DEMO_PRACTICE);
      setIdentityReadDays(Array.from({ length: 21 }, (_, index) => index + 1));
      setIdentityPracticeEntries(IDENTITY_DEMO_PRACTICE);
      setVisionBoard(DEMO_VISION_BOARD);
      setEntered(true);
      setView(demoReport ? "report" : "cesta");
      if (!demoReport) restoreLastLocation();
      setReady(true);
      return;
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setEntries(JSON.parse(stored));
      const storedReadDays = window.localStorage.getItem(READ_DAYS_KEY);
      if (storedReadDays) setReadDays(JSON.parse(storedReadDays));
      const storedPracticeEntries = window.localStorage.getItem(PRACTICE_ENTRIES_KEY);
      if (storedPracticeEntries) setPracticeEntries(JSON.parse(storedPracticeEntries));
      const storedNeedsReadDays = window.localStorage.getItem(NEEDS_READ_DAYS_KEY);
      if (storedNeedsReadDays) setNeedsReadDays(JSON.parse(storedNeedsReadDays));
      const storedNeedsPracticeEntries = window.localStorage.getItem(NEEDS_PRACTICE_ENTRIES_KEY);
      if (storedNeedsPracticeEntries) setNeedsPracticeEntries(JSON.parse(storedNeedsPracticeEntries));
      const storedValuesReadDays = window.localStorage.getItem(VALUES_READ_DAYS_KEY);
      if (storedValuesReadDays) setValuesReadDays(JSON.parse(storedValuesReadDays));
      const storedValuesPracticeEntries = window.localStorage.getItem(VALUES_PRACTICE_ENTRIES_KEY);
      if (storedValuesPracticeEntries) setValuesPracticeEntries(JSON.parse(storedValuesPracticeEntries));
      const storedIdentityReadDays = window.localStorage.getItem(IDENTITY_READ_DAYS_KEY);
      if (storedIdentityReadDays) setIdentityReadDays(JSON.parse(storedIdentityReadDays));
      const storedIdentityPracticeEntries = window.localStorage.getItem(IDENTITY_PRACTICE_ENTRIES_KEY);
      if (storedIdentityPracticeEntries) setIdentityPracticeEntries(JSON.parse(storedIdentityPracticeEntries));
      const storedIntegrationDays = window.localStorage.getItem(INTEGRATION_DAYS_KEY);
      if (storedIntegrationDays) setIntegrationDays(JSON.parse(storedIntegrationDays));
      const storedVisionBoard = window.localStorage.getItem(VISION_BOARD_KEY);
      if (storedVisionBoard) setVisionBoard(JSON.parse(storedVisionBoard));
      setProfilePhoto(window.localStorage.getItem(PROFILE_PHOTO_KEY) ?? "");
      const storedPhotoPosition = window.localStorage.getItem(PROFILE_PHOTO_POSITION_KEY);
      if (storedPhotoPosition) setProfilePhotoPosition(JSON.parse(storedPhotoPosition));
      const hasEntered = window.localStorage.getItem(ONBOARDING_KEY) === "1";
      setEntered(hasEntered);
      setTourOpen(hasEntered && window.localStorage.getItem(TOUR_KEY) !== "1");
      if (hasEntered) restoreLastLocation();
    } catch {
      // Prototyp zůstane použitelný i při blokovaném lokálním úložišti.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || demoMode || serverHydrated) return;
    let cancelled = false;
    void loadProgramState()
      .then(({ state }) => {
        if (cancelled || !state) return;
        if (Array.isArray(state.emotionEntries)) setEntries(state.emotionEntries as EmotionEntry[]);
        if (Array.isArray(state.readDays)) setReadDays(state.readDays);
        if (Array.isArray(state.practiceEntries)) setPracticeEntries(state.practiceEntries as PracticeEntry[]);
        if (Array.isArray(state.needsReadDays)) setNeedsReadDays(state.needsReadDays);
        if (Array.isArray(state.needsPracticeEntries)) setNeedsPracticeEntries(state.needsPracticeEntries as PracticeEntry[]);
        if (Array.isArray(state.valuesReadDays)) setValuesReadDays(state.valuesReadDays);
        if (Array.isArray(state.valuesPracticeEntries)) setValuesPracticeEntries(state.valuesPracticeEntries as PracticeEntry[]);
        if (Array.isArray(state.identityReadDays)) setIdentityReadDays(state.identityReadDays);
        if (Array.isArray(state.identityPracticeEntries)) setIdentityPracticeEntries(state.identityPracticeEntries as PracticeEntry[]);
        if (Array.isArray(state.integrationDays)) setIntegrationDays(state.integrationDays);
        if (state.visionBoard && typeof state.visionBoard === "object") {
          setVisionBoard({ ...EMPTY_VISION_BOARD, ...state.visionBoard } as VisionBoardData);
        }
        if (typeof state.entered === "boolean") setEntered(state.entered);
      })
      .catch(() => {
        // Offline režim dál používá lokální kopii; synchronizace se zkusí při další návštěvě.
      })
      .finally(() => {
        if (!cancelled) setServerHydrated(true);
      });
    return () => {
      cancelled = true;
    };
  }, [ready, demoMode, serverHydrated]);

  useEffect(() => {
    if (!ready || demoMode || !serverHydrated) return;
    if (serverSaveTimerRef.current) window.clearTimeout(serverSaveTimerRef.current);
    serverSaveTimerRef.current = window.setTimeout(() => {
      const payload: ProgramStatePayload = {
        version: 1,
        emotionEntries: entries,
        readDays,
        practiceEntries,
        needsReadDays,
        needsPracticeEntries,
        valuesReadDays,
        valuesPracticeEntries,
        identityReadDays,
        identityPracticeEntries,
        integrationDays,
        visionBoard,
        entered,
        tours: { system: false, modules: {} },
        updatedAt: new Date().toISOString(),
      };
      void saveProgramState(payload).catch(() => {
        // Lokální kopie zůstává zachovaná a při další změně se synchronizace zopakuje.
      });
    }, 650);
    return () => {
      if (serverSaveTimerRef.current) window.clearTimeout(serverSaveTimerRef.current);
    };
  }, [
    ready,
    demoMode,
    serverHydrated,
    entries,
    readDays,
    practiceEntries,
    needsReadDays,
    needsPracticeEntries,
    valuesReadDays,
    valuesPracticeEntries,
    identityReadDays,
    identityPracticeEntries,
    integrationDays,
    visionBoard,
    entered,
  ]);

  useEffect(() => {
    if (!ready || demoMode) return;
    const localDate = localProgramDate();
    void recordProgramActivity({
      eventType: "app_opened",
      localDate,
      idempotencyKey: `app-opened:${localDate}`,
    }).catch(() => undefined);
  }, [ready, demoMode]);

  useEffect(() => {
    if (!ready || !entered || pendingScrollRef.current === null) return;
    const scrollY = pendingScrollRef.current;
    pendingScrollRef.current = null;
    const restoreScroll = () => window.scrollTo({ top: scrollY, behavior: "auto" });
    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(restoreScroll);
    });
    const afterImages = window.setTimeout(restoreScroll, 650);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.clearTimeout(afterImages);
    };
  }, [ready, entered, view, selectedDay, selectedNeedsDay, selectedValuesDay, selectedIdentityDay]);

  useEffect(() => {
    if (!ready || !entered) return;
    let scrollTimer: number | undefined;
    const saveLocation = () => {
      try {
        window.localStorage.setItem(LAST_LOCATION_KEY, JSON.stringify({
          view,
          activeModuleKey,
          emotionEntryReturnView,
          emotionEntryReturnScroll,
          selectedDay,
          selectedNeedsDay,
          selectedValuesDay,
          selectedIdentityDay,
          scrollY: Math.max(0, Math.round(window.scrollY)),
        }));
      } catch {
        // Místo zůstane zachované alespoň po dobu aktuální návštěvy.
      }
    };
    const handleScroll = () => {
      if (scrollTimer) window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(saveLocation, 160);
    };
    saveLocation();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", saveLocation);
    return () => {
      if (scrollTimer) window.clearTimeout(scrollTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", saveLocation);
      saveLocation();
    };
  }, [
    ready,
    entered,
    view,
    activeModuleKey,
    emotionEntryReturnView,
    emotionEntryReturnScroll,
    selectedDay,
    selectedNeedsDay,
    selectedValuesDay,
    selectedIdentityDay,
  ]);

  useEffect(() => {
    if (!ready || demoMode) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Záznam zůstane alespoň v aktuální relaci.
    }
  }, [entries, ready, demoMode]);

  useEffect(() => {
    if (!ready || demoMode) return;
    try {
      window.localStorage.setItem(READ_DAYS_KEY, JSON.stringify(readDays));
    } catch {
      // Přečtené dny zůstanou uložené alespoň v aktuální relaci.
    }
  }, [readDays, ready, demoMode]);

  useEffect(() => {
    if (!ready || demoMode) return;
    try {
      window.localStorage.setItem(PRACTICE_ENTRIES_KEY, JSON.stringify(practiceEntries));
    } catch {
      // Odpovědi z tréninku zůstanou uložené alespoň v aktuální relaci.
    }
  }, [practiceEntries, ready, demoMode]);

  useEffect(() => {
    if (!ready || demoMode) return;
    try {
      window.localStorage.setItem(NEEDS_READ_DAYS_KEY, JSON.stringify(needsReadDays));
      window.localStorage.setItem(NEEDS_PRACTICE_ENTRIES_KEY, JSON.stringify(needsPracticeEntries));
    } catch {
      // Postup modulu Potřeby zůstane alespoň v aktuální relaci.
    }
  }, [needsReadDays, needsPracticeEntries, ready, demoMode]);

  useEffect(() => {
    if (!ready || demoMode) return;
    try {
      window.localStorage.setItem(VALUES_READ_DAYS_KEY, JSON.stringify(valuesReadDays));
      window.localStorage.setItem(VALUES_PRACTICE_ENTRIES_KEY, JSON.stringify(valuesPracticeEntries));
    } catch {
      // Postup modulu Hodnoty zůstane alespoň v aktuální relaci.
    }
  }, [valuesReadDays, valuesPracticeEntries, ready, demoMode]);

  useEffect(() => {
    if (!ready || demoMode) return;
    try {
      window.localStorage.setItem(IDENTITY_READ_DAYS_KEY, JSON.stringify(identityReadDays));
      window.localStorage.setItem(IDENTITY_PRACTICE_ENTRIES_KEY, JSON.stringify(identityPracticeEntries));
      window.localStorage.setItem(INTEGRATION_DAYS_KEY, JSON.stringify(integrationDays));
    } catch {
      // Postup modulu Identita a vize zůstane alespoň v aktuální relaci.
    }
  }, [identityReadDays, identityPracticeEntries, integrationDays, ready, demoMode]);

  useEffect(() => {
    if (!ready || demoMode) return;
    try {
      window.localStorage.setItem(VISION_BOARD_KEY, JSON.stringify(visionBoard));
    } catch {
      // Obrazová vize zůstane alespoň v aktuální relaci.
    }
  }, [visionBoard, ready, demoMode]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(PROFILE_PHOTO_POSITION_KEY, JSON.stringify(profilePhotoPosition));
    } catch {
      // Výřez zůstane uložený alespoň v aktuální relaci.
    }
  }, [profilePhotoPosition, ready]);

  const currentDay = Array.from({ length: AVAILABLE_LESSON_DAYS }, (_, index) => index + 1).find((day) => !readDays.includes(day)) ?? AVAILABLE_LESSON_DAYS;

  const navigate = (next: View) => {
    pendingScrollRef.current = null;
    if (next === "zaznam" && view !== "zaznam") {
      setEmotionEntryReturnView(view);
      setEmotionEntryReturnScroll(Math.max(0, window.scrollY));
    }
    const moduleFromView = VIEW_MODULE[next];
    if (moduleFromView && !demoMode && !hasModuleAccess(moduleFromView)) return;
    if (moduleFromView) setActiveModuleKey(moduleFromView);
    setView(next);
    setSaved(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigatePrimary = (next: PrimaryNavId) => {
    if (next === "dnes" && activeModuleKey !== "emotion") {
      navigate(MODULE_ROOT_VIEW[activeModuleKey]);
      return;
    }
    if (next === "cesta") {
      navigate(MODULE_ROOT_VIEW[activeModuleKey]);
      return;
    }
    if (next === "mapa") {
      navigate("report");
      return;
    }
    navigate(next);
  };

  const returnFromEmotionEntry = () => {
    const returnView =
      emotionEntryReturnView === "zaznam"
        ? MODULE_ROOT_VIEW[activeModuleKey]
        : emotionEntryReturnView;
    pendingScrollRef.current = emotionEntryReturnScroll;
    const moduleFromView = VIEW_MODULE[returnView];
    if (moduleFromView) setActiveModuleKey(moduleFromView);
    setView(returnView);
  };

  const openLesson = (day: number) => {
    if (!demoMode && !hasModuleAccess("emotion")) return;
    setActiveModuleKey("emotion");
    setSelectedDay(Math.min(day, AVAILABLE_LESSON_DAYS));
    setView("lekce");
    setSaved(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openNeedsLesson = (day: number) => {
    if (!demoMode && !hasModuleAccess("needs")) return;
    setActiveModuleKey("needs");
    setSelectedNeedsDay(Math.min(day, 21));
    setView("potreby-lekce");
    setSaved(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openValuesLesson = (day: number) => {
    if (!demoMode && !hasModuleAccess("values")) return;
    setActiveModuleKey("values");
    setSelectedValuesDay(Math.min(day, 21));
    setView("hodnoty-lekce");
    setSaved(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openIdentityLesson = (day: number) => {
    if (!demoMode && !hasModuleAccess("identity")) return;
    setActiveModuleKey("identity");
    setSelectedIdentityDay(Math.min(day, 21));
    setView("identita-lekce");
    setSaved(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const trackLessonCompletion = (module: ModuleKey, day: number) => {
    void recordProgramActivity({
      eventType: "lesson_completed",
      moduleCode: ACCESS_CODE[module] as ProgramModuleStateCode,
      programDay: MODULE_DAY_OFFSET[module] + day,
      complete: true,
      idempotencyKey: `lesson:${module}:${day}`,
    }).catch(() => undefined);
  };

  const savePractice = (module: ModuleKey, entry: PracticeEntry) => {
    const update = (current: PracticeEntry[]) =>
      [...current.filter((item) => item.day !== entry.day), entry].sort(
        (a, b) => a.day - b.day,
      );
    if (module === "emotion") setPracticeEntries(update);
    if (module === "needs") setNeedsPracticeEntries(update);
    if (module === "values") setValuesPracticeEntries(update);
    if (module === "identity") setIdentityPracticeEntries(update);
    setSaved(true);
    void recordProgramActivity({
      eventType: "practice_saved",
      moduleCode: ACCESS_CODE[module] as ProgramModuleStateCode,
      programDay: MODULE_DAY_OFFSET[module] + entry.day,
      complete: hasCompletePracticeEntry(entry),
      idempotencyKey: `practice:${module}:${entry.day}:${entry.updatedAt}`,
    }).catch(() => undefined);
  };

  const deletePractice = (module: ModuleKey, day: number) => {
    const remove = (current: PracticeEntry[]) =>
      current.filter((item) => item.day !== day);
    if (module === "emotion") setPracticeEntries(remove);
    if (module === "needs") setNeedsPracticeEntries(remove);
    if (module === "values") setValuesPracticeEntries(remove);
    if (module === "identity") setIdentityPracticeEntries(remove);
    setSaved(false);
  };

  const completeLesson = (day: number) => {
    setActiveModuleKey("emotion");
    setReadDays((current) => current.includes(day) ? current : [...current, day].sort((a, b) => a - b));
    if (day < AVAILABLE_LESSON_DAYS) {
      setSelectedDay(day + 1);
      setView("lekce");
    } else {
      setView("mapa");
    }
    setSaved(false);
    trackLessonCompletion("emotion", day);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completeNeedsLesson = (day: number) => {
    setActiveModuleKey("needs");
    setNeedsReadDays((current) => current.includes(day) ? current : [...current, day].sort((a, b) => a - b));
    if (day < 21) {
      setSelectedNeedsDay(day + 1);
      setView("potreby-lekce");
    } else {
      setView("potreby-mapa");
    }
    setSaved(false);
    trackLessonCompletion("needs", day);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completeValuesLesson = (day: number) => {
    setActiveModuleKey("values");
    setValuesReadDays((current) => current.includes(day) ? current : [...current, day].sort((a, b) => a - b));
    if (day < 21) {
      setSelectedValuesDay(day + 1);
      setView("hodnoty-lekce");
    } else {
      setView("hodnoty-mapa");
    }
    setSaved(false);
    trackLessonCompletion("values", day);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const completeIdentityLesson = (day: number) => {
    setActiveModuleKey("identity");
    setIdentityReadDays((current) => current.includes(day) ? current : [...current, day].sort((a, b) => a - b));
    if (day < 21) {
      setSelectedIdentityDay(day + 1);
      setView("identita-lekce");
    } else {
      setView("identita-mapa");
    }
    setSaved(false);
    trackLessonCompletion("identity", day);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const uploadProfilePhoto = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const photo = typeof reader.result === "string" ? reader.result : "";
      setProfilePhoto(photo);
      setProfilePhotoPosition({ x: 50, y: 50 });
      setPhotoEditorOpen(true);
      try { window.localStorage.setItem(PROFILE_PHOTO_KEY, photo); } catch { /* Fotka zůstane v aktuální relaci. */ }
    };
    reader.readAsDataURL(file);
  };

  const enterProgram = (startFresh: boolean) => {
    if (startFresh) {
      setEntries([]);
      setReadDays([]);
      setPracticeEntries([]);
      setNeedsReadDays([]);
      setNeedsPracticeEntries([]);
      setValuesReadDays([]);
      setValuesPracticeEntries([]);
      setIdentityReadDays([]);
      setIdentityPracticeEntries([]);
      setIntegrationDays([]);
      setVisionBoard(EMPTY_VISION_BOARD);
      setView(firstAllowedView);
      setActiveModuleKey(firstAllowedModule);
      setSelectedDay(1);
      setSelectedNeedsDay(1);
      setSelectedValuesDay(1);
      setSelectedIdentityDay(1);
      setEmotionEntryReturnView("dnes");
      setEmotionEntryReturnScroll(0);
    }
    try {
      window.localStorage.setItem(ONBOARDING_KEY, "1");
      if (startFresh) window.localStorage.setItem(STORAGE_KEY, "[]");
      if (startFresh) window.localStorage.setItem(READ_DAYS_KEY, "[]");
      if (startFresh) window.localStorage.setItem(PRACTICE_ENTRIES_KEY, "[]");
      if (startFresh) window.localStorage.setItem(NEEDS_READ_DAYS_KEY, "[]");
      if (startFresh) window.localStorage.setItem(NEEDS_PRACTICE_ENTRIES_KEY, "[]");
      if (startFresh) window.localStorage.setItem(VALUES_READ_DAYS_KEY, "[]");
      if (startFresh) window.localStorage.setItem(VALUES_PRACTICE_ENTRIES_KEY, "[]");
      if (startFresh) window.localStorage.setItem(IDENTITY_READ_DAYS_KEY, "[]");
      if (startFresh) window.localStorage.setItem(IDENTITY_PRACTICE_ENTRIES_KEY, "[]");
      if (startFresh) window.localStorage.setItem(INTEGRATION_DAYS_KEY, "[]");
      if (startFresh) window.localStorage.setItem(VISION_BOARD_KEY, JSON.stringify(EMPTY_VISION_BOARD));
      if (startFresh) window.localStorage.removeItem(LAST_LOCATION_KEY);
      if (startFresh) window.localStorage.removeItem(TOUR_KEY);
      if (startFresh) {
        (["emotion", "needs", "values", "identity"] as ModuleKey[]).forEach((module) => {
          window.localStorage.removeItem(`${MODULE_TOUR_KEY_PREFIX}${module}`);
        });
      }
    } catch {
      // Pokračujeme bez trvalého uložení.
    }
    setEntered(true);
    setTourStep(0);
    setTourOpen(true);
  };

  const finishTour = () => {
    try {
      window.localStorage.setItem(TOUR_KEY, "1");
    } catch {
      // Prohlídku pouze zavřeme pro aktuální relaci.
    }
    setTourOpen(false);
  };

  const completeSystemTour = () => {
    finishTour();
    setActiveModuleKey(firstAllowedModule);
    setModuleTour(firstAllowedModule);
    setModuleTourStep(0);
  };

  const finishModuleTour = (module: ModuleKey) => {
    try {
      window.localStorage.setItem(`${MODULE_TOUR_KEY_PREFIX}${module}`, "1");
    } catch {
      // Vysvětlení pouze zavřeme pro aktuální relaci.
    }
    setModuleTour(null);
    setModuleTourStep(0);
  };

  const openModule = (module: ModuleKey, forceTour = false) => {
    const available = demoMode
      || hasModuleAccess(module);
    if (!available) return;
    setActiveModuleKey(module);
    navigate(MODULE_ROOT_VIEW[module]);
    let alreadySeen = false;
    try {
      alreadySeen = window.localStorage.getItem(`${MODULE_TOUR_KEY_PREFIX}${module}`) === "1";
    } catch {
      // Bez lokální paměti vysvětlení raději nabídneme.
    }
    if (forceTour || !alreadySeen) {
      setTourOpen(false);
      setModuleTour(module);
      setModuleTourStep(0);
    }
  };

  if (!ready) return null;
  if (!entered) return <Onboarding onEnter={enterProgram} />;

  const moduleMeta: Record<ModuleKey, { number: string; title: string; read: number }> = {
    emotion: { number: "01", title: "Emoce", read: readDays.length },
    needs: { number: "02", title: "Potřeby", read: needsReadDays.length },
    values: { number: "03", title: "Hodnoty", read: valuesReadDays.length },
    identity: { number: "04", title: "Identita a vize", read: identityReadDays.length },
  };
  const activeModule = moduleMeta[activeModuleKey];
  const totalProgramRead = readDays.length + needsReadDays.length + valuesReadDays.length + identityReadDays.length;
  const isProgramReport = view === "report";
  const profileInitials = profileName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "MK";
  const activePrimaryNav: PrimaryNavId =
    view === "dnes"
      ? "dnes"
      : view === "zaznam" || view === "historie"
        ? "zaznam"
        : view === "report" || view === MODULE_MAP_VIEW[activeModuleKey]
          ? "mapa"
          : "cesta";

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar}>
        <button className={styles.brand} onClick={() => navigate("dnes")}>
          <img src="/vnitrni-kompas-logo.png" alt="" aria-hidden="true" />
          <small><b>VNITŘNÍ KOMPAS</b><em>OPERAČNÍ SYSTÉM<br />PRO PRÁCI SÁM SE SEBOU</em></small>
        </button>

        <div className={styles.profile}>
          <div className={styles.profilePhotoArea}>
            {profilePhoto ? (
              <button className={styles.profilePhoto} type="button" aria-label="Upravit výřez profilové fotografie" title="Upravit výřez" onClick={() => setPhotoEditorOpen((open) => !open)}>
                <img src={profilePhoto} alt="Tvoje profilová fotka" style={{ objectPosition: `${profilePhotoPosition.x}% ${profilePhotoPosition.y}%` }} />
              </button>
            ) : (
              <label className={styles.profilePhoto} title="Nahrát profilovou fotku">
                <span>{profileInitials}</span><i aria-hidden="true">+</i>
                <input type="file" accept="image/*" onChange={(event) => uploadProfilePhoto(event.target.files?.[0])} />
              </label>
            )}
            {profilePhoto && photoEditorOpen ? (
              <div className={styles.photoEditor}>
                <div><strong>Uprav si výřez</strong><button type="button" aria-label="Zavřít editor výřezu" onClick={() => setPhotoEditorOpen(false)}>×</button></div>
                <label><span>Doleva a doprava</span><input type="range" min="0" max="100" value={profilePhotoPosition.x} onChange={(event) => setProfilePhotoPosition((position) => ({ ...position, x: Number(event.target.value) }))} /></label>
                <label><span>Nahoru a dolů</span><input type="range" min="0" max="100" value={profilePhotoPosition.y} onChange={(event) => setProfilePhotoPosition((position) => ({ ...position, y: Number(event.target.value) }))} /></label>
                <label className={styles.replacePhotoButton}>Nahrát jinou fotku<input type="file" accept="image/*" onChange={(event) => uploadProfilePhoto(event.target.files?.[0])} /></label>
                <div className={styles.photoEditorActions}><button type="button" onClick={() => setProfilePhotoPosition({ x: 50, y: 50 })}>Na střed</button><button type="button" onClick={() => setPhotoEditorOpen(false)}>Hotovo</button></div>
              </div>
            ) : null}
          </div>
          <a className={styles.profileLink} href="/app/nastaveni"><strong>{profileName}</strong><small>{isProgramReport ? totalProgramRead : activeModule.read} přečtených dní</small></a>
        </div>

        <nav className={styles.nav} aria-label="Hlavní navigace">
          {NAV.map((item) => (
            <button
              key={item.id}
              data-tour={item.id}
              className={`${activePrimaryNav === item.id ? styles.activeNav : ""} ${item.id === "zaznam" ? styles.emotionThreadNav : ""}`}
              onClick={() => navigatePrimary(item.id)}
            >
              <span>{item.icon}</span>
              {item.id === "zaznam" ? <div><small>PRŮBĚŽNĚ CELÝM PROGRAMEM</small><strong>{item.label}</strong></div> : item.label}
            </button>
          ))}
        </nav>

        <div className={styles.moduleStatus} data-tour="module-current">
          <span>{isProgramReport ? "TVŮJ OSOBNÍ VÝSTUP" : "TEĎ PROCHÁZÍŠ"}</span>
          <strong>{isProgramReport ? "Vnitřní kompas" : `${activeModule.number} · ${activeModule.title}`}</strong>
          <div className={styles.sidebarProgress}><i style={{ width: `${isProgramReport ? totalProgramRead / 84 * 100 : activeModule.read / 21 * 100}%` }} /></div>
          <small>{isProgramReport ? `${totalProgramRead} z 84 vedených dní` : `${activeModule.read} z 21 dní přečteno`}</small>
          <div className={styles.moduleSwitcher}>
            <span>TVÉ MODULY</span>
            {([
              ["emotion", "01", "Emoce", "Co právě cítíš", demoMode || hasModuleAccess("emotion")],
              ["needs", "02", "Potřeby", "Co se za emocí ozývá", demoMode || hasModuleAccess("needs")],
              ["values", "03", "Hodnoty", "Podle čeho chceš žít", demoMode || hasModuleAccess("values")],
              ["identity", "04", "Identita a vize", "Kým se stáváš a kam jdeš", demoMode || hasModuleAccess("identity")],
            ] as const).map(([key, number, title, description, available]) => {
              const isActive = activeModule.number === number;
              return (
                <button
                  type="button"
                  key={key}
                  className={`${styles.moduleSwitchButton} ${isActive ? styles.moduleSwitchActive : ""}`}
                  disabled={!available}
                  onClick={() => openModule(key)}
                >
                  <span>{isActive ? "●" : available ? "→" : "○"}</span>
                  <div><strong>{number} · {title}</strong><small>{available ? description : "Tento modul nemáš odemčený"}</small></div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.topbarBrand}><img className={styles.mobileLogo} src="/vnitrni-kompas-logo-dark.png" alt="Vnitřní kompas" /><p><strong>Vnitřní kompas</strong><small>Operační systém pro práci sám se sebou</small></p></div>
          <nav className={styles.topbarModuleNav} aria-label="Moduly programu">
            {(Object.keys(moduleMeta) as ModuleKey[]).map((key) => {
              const module = moduleMeta[key];
              const available = demoMode || hasModuleAccess(key);
              return (
                <button
                  type="button"
                  key={key}
                  disabled={!available}
                  className={activeModuleKey === key && !isProgramReport ? styles.topbarModuleActive : ""}
                  onClick={() => openModule(key)}
                >
                  <span>{module.number}</span>
                  <strong>{module.title}</strong>
                </button>
              );
            })}
          </nav>
          <div className={styles.topbarActions}>
            <WebOnly>
              <a className={styles.sessionCta} href="/konzultace-zdarma?zdroj=vnitri-kompas">Úvodní konzultace zdarma</a>
            </WebOnly>
            <div className={styles.dayStatus}><span>{isProgramReport ? "PROGRAM 90" : `MODUL ${activeModule.number}`}</span><strong>{isProgramReport ? "Osobní report" : activeModule.title}</strong><i /></div>
          </div>
        </header>

        <div className={styles.content}>
          {saved ? <div className={styles.saved}>Záznam je uložený. Nemusíš z něj teď nic vyvozovat.</div> : null}
          {view === "dnes" ? <Today onNavigate={navigate} onOpenLesson={openLesson} entries={entries} currentDay={currentDay} readDays={readDays} /> : null}
          {view === "cesta" ? <Journey onNavigate={navigate} onOpenLesson={openLesson} onOpenNeeds={() => openModule("needs")} onOpenValues={() => openModule("values")} onOpenIdentity={() => openModule("identity")} currentDay={currentDay} readDays={readDays} entries={entries} practiceEntries={practiceEntries} needsReadDays={needsReadDays} valuesReadDays={valuesReadDays} /> : null}
          {view === "lekce" ? <Lesson day={selectedDay} onNavigate={navigate} onComplete={completeLesson} readDays={readDays} practiceEntries={practiceEntries} onSavePractice={(entry) => savePractice("emotion", entry)} onDeletePractice={(day) => deletePractice("emotion", day)} /> : null}
          {view === "potreby" ? <NeedsJourney readDays={needsReadDays} practiceEntries={needsPracticeEntries} onNavigate={navigate} onOpenLesson={openNeedsLesson} /> : null}
          {view === "potreby-lekce" ? <NeedsLesson day={selectedNeedsDay} onNavigate={navigate} onComplete={completeNeedsLesson} readDays={needsReadDays} practiceEntries={needsPracticeEntries} onSavePractice={(entry) => savePractice("needs", entry)} onDeletePractice={(day) => deletePractice("needs", day)} /> : null}
          {view === "potreby-mapa" ? <NeedsMap readDays={needsReadDays} practiceEntries={needsPracticeEntries} onNavigate={navigate} onOpenLesson={openNeedsLesson} /> : null}
          {view === "hodnoty" ? <AdvancedModuleJourney kind="values" readDays={valuesReadDays} practiceEntries={valuesPracticeEntries} onNavigate={navigate} onOpenLesson={openValuesLesson} /> : null}
          {view === "hodnoty-lekce" ? <ValuesLesson day={selectedValuesDay} onNavigate={navigate} onComplete={completeValuesLesson} readDays={valuesReadDays} practiceEntries={valuesPracticeEntries} onSavePractice={(entry) => savePractice("values", entry)} onDeletePractice={(day) => deletePractice("values", day)} /> : null}
          {view === "hodnoty-mapa" ? <AdvancedModuleMap kind="values" readDays={valuesReadDays} practiceEntries={valuesPracticeEntries} onNavigate={navigate} onOpenLesson={openValuesLesson} /> : null}
          {view === "identita" ? <AdvancedModuleJourney kind="identity" readDays={identityReadDays} practiceEntries={identityPracticeEntries} onNavigate={navigate} onOpenLesson={openIdentityLesson} /> : null}
          {view === "identita-lekce" ? <IdentityLesson day={selectedIdentityDay} onNavigate={navigate} onComplete={completeIdentityLesson} readDays={identityReadDays} practiceEntries={identityPracticeEntries} onSavePractice={(entry) => savePractice("identity", entry)} onDeletePractice={(day) => deletePractice("identity", day)} /> : null}
          {view === "identita-mapa" ? <AdvancedModuleMap kind="identity" readDays={identityReadDays} practiceEntries={identityPracticeEntries} onNavigate={navigate} onOpenLesson={openIdentityLesson} /> : null}
          {view === "vize-board" ? <VisionBoard data={visionBoard} identityEntries={identityPracticeEntries} onChange={setVisionBoard} onNavigate={navigate} /> : null}
          {view === "zaznam" ? <EmotionRecord day={currentDay} onSave={(entry) => {
            setEntries((current) => [entry, ...current]);
            setSaved(true);
            void recordProgramActivity({
              eventType: "emotion_saved",
              moduleCode: "emotions",
              programDay: Math.min(currentDay, 21),
              complete: true,
              idempotencyKey: `emotion:${entry.id}`,
            }).catch(() => undefined);
            returnFromEmotionEntry();
          }} /> : null}
          {view === "historie" ? <History entries={entries} onNavigate={navigate} /> : null}
          {view === "mapa" ? <EmotionMap entries={entries} practiceEntries={practiceEntries} readDays={readDays} onNavigate={navigate} /> : null}
          {view === "report" ? (
            <ProgramDashboard
              emotionEntries={entries}
              emotionReadDays={readDays}
              emotionPracticeEntries={practiceEntries}
              needsReadDays={needsReadDays}
              needsPracticeEntries={needsPracticeEntries}
              valuesReadDays={valuesReadDays}
              valuesPracticeEntries={valuesPracticeEntries}
              identityReadDays={identityReadDays}
              identityPracticeEntries={identityPracticeEntries}
              visionBoard={visionBoard}
              integrationDays={integrationDays}
              onCompleteIntegration={(day) => {
                setIntegrationDays((current) =>
                  current.includes(day) ? current : [...current, day].sort((a, b) => a - b),
                );
                setSaved(true);
                void recordProgramActivity({
                  eventType: "integration_completed",
                  programDay: day,
                  complete: true,
                  idempotencyKey: `integration:${day}`,
                }).catch(() => undefined);
              }}
              onNavigate={navigate}
              onOpenEmotionLesson={openLesson}
              onOpenNeedsLesson={openNeedsLesson}
              onOpenValuesLesson={openValuesLesson}
              onOpenIdentityLesson={openIdentityLesson}
            />
          ) : null}
        </div>
      </main>

      <nav className={styles.mobileNav} aria-label="Mobilní navigace">
        {NAV.map((item) => <button key={item.id} data-tour={item.id} className={`${activePrimaryNav === item.id ? styles.mobileActive : ""} ${item.id === "zaznam" ? styles.emotionThreadMobile : ""}`} onClick={() => navigatePrimary(item.id)}><span>{item.icon}</span>{item.mobileLabel}</button>)}
        <a href="/app/nastaveni" aria-label="Účet a nastavení"><span>○</span>Účet</a>
      </nav>
      {tourOpen ? (
        <GuidedTour
          steps={[...TOUR_STEPS]}
          step={tourStep}
          finishLabel="Vysvětlit modul Emoce"
          onNext={() => {
            if (tourStep >= TOUR_STEPS.length - 1) {
              completeSystemTour();
              return;
            }
            setTourStep((current) => current + 1);
          }}
          onBack={() => setTourStep((current) => Math.max(0, current - 1))}
          onClose={finishTour}
        />
      ) : null}
      {moduleTour ? (
        <GuidedTour
          steps={MODULE_TOURS[moduleTour].steps}
          step={moduleTourStep}
          eyebrow={`MODUL ${MODULE_TOURS[moduleTour].label.toUpperCase()}`}
          finishLabel="Otevřít první den"
          onNext={() => {
            if (moduleTourStep >= MODULE_TOURS[moduleTour].steps.length - 1) {
              const currentModule = moduleTour;
              finishModuleTour(currentModule);
              if (currentModule === "emotion") openLesson(1);
              if (currentModule === "needs") openNeedsLesson(1);
              if (currentModule === "values") openValuesLesson(1);
              if (currentModule === "identity") openIdentityLesson(1);
              return;
            }
            setModuleTourStep((current) => current + 1);
          }}
          onBack={() => setModuleTourStep((current) => Math.max(0, current - 1))}
          onClose={() => finishModuleTour(moduleTour)}
        />
      ) : null}
    </div>
  );
}

function GuidedTour({
  steps,
  step,
  eyebrow = "JAK SYSTÉM FUNGUJE",
  finishLabel = "Pokračovat",
  onNext,
  onBack,
  onClose,
}: {
  steps: readonly TourStep[];
  step: number;
  eyebrow?: string;
  finishLabel?: string;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
}) {
  const [targetRect, setTargetRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const current = steps[step] ?? steps[0];

  useEffect(() => {
    const updateTarget = () => {
      const candidates = Array.from(document.querySelectorAll<HTMLElement>(`[data-tour="${current.target}"]`));
      const target = candidates.find((element) => element.getClientRects().length > 0);
      if (!target) {
        setTargetRect(null);
        return;
      }
      const rect = target.getBoundingClientRect();
      setTargetRect({
        top: Math.max(8, rect.top - 7),
        left: Math.max(8, rect.left - 7),
        width: rect.width + 14,
        height: rect.height + 14,
      });
    };

    updateTarget();
    window.addEventListener("resize", updateTarget);
    return () => window.removeEventListener("resize", updateTarget);
  }, [current.target]);

  return (
    <div className={flow.tourLayer} role="dialog" aria-modal="true" aria-labelledby="guided-tour-title">
      {targetRect ? <div className={flow.tourSpotlight} style={targetRect} /> : <div className={flow.tourDimmer} />}
      <section className={flow.tourCard}>
        <div className={flow.tourProgress} aria-label={`Krok ${step + 1} ze ${steps.length}`}>
          {steps.map((item, index) => <i key={`${item.target}-${index}`} className={index <= step ? flow.tourProgressActive : ""} />)}
        </div>
        <button type="button" className={flow.tourClose} onClick={onClose}>Přeskočit</button>
        <small>{eyebrow} · KROK {step + 1} Z {steps.length}</small>
        <h2 id="guided-tour-title">{current.title}</h2>
        <p>{current.text}</p>
        <div className={flow.tourActions}>
          {step > 0 ? <button type="button" className={flow.tourBack} onClick={onBack}>Zpět</button> : <span />}
          <button type="button" className={flow.tourNext} onClick={onNext}>
            {step === steps.length - 1 ? finishLabel : "Pokračovat"}
          </button>
        </div>
      </section>
    </div>
  );
}

function Onboarding({ onEnter }: { onEnter: (startFresh: boolean) => void }) {
  return (
    <main className={flow.onboarding}>
      <section className={flow.onboardingCopy}>
        <img className={flow.onboardingBrand} src="/vnitrni-kompas-logo-dark.png" alt="Vnitřní kompas" />
        <small>VNITŘNÍ KOMPAS</small>
        <h1>Vítej. Nemusíš tu nic dokazovat.</h1>
        <p>
          Vnitřní kompas jsem vytvořil z toho, co mi při práci se sebou dávalo
          největší smysl: začít u emocí, pojmenovat potřeby a sledovat, co
          skutečně dělám. Každý den tě čeká jedna krátká část a jedno konkrétní
          cvičení.
        </p>
        <div className={flow.onboardingPoints}>
          <div><span>01</span><p>Přečti si dnešní krátkou část.</p></div>
          <div><span>02</span><p>Vyzkoušej si ji v běžném životě.</p></div>
          <div><span>03</span><p>Z odpovědí ti postupně vznikne osobní mapa.</p></div>
        </div>
        <div className={flow.onboardingActions}>
          <button className={flow.primary} onClick={() => onEnter(true)}>Ukázat mi, jak to funguje</button>
          <button className={flow.secondary} onClick={() => onEnter(false)}>Začít prvním dnem</button>
        </div>
      </section>
    </main>
  );
}

function Today({ onNavigate, onOpenLesson, entries, currentDay, readDays }: { onNavigate: (view: View) => void; onOpenLesson: (day: number) => void; entries: EmotionEntry[]; currentDay: number; readDays: number[] }) {
  const day = EMOTION_DAYS[currentDay - 1];
  const lesson = getEmotionLesson(currentDay);
  const phaseDays = EMOTION_DAYS.filter((item) => item.phase === day.phase);
  const phaseRead = phaseDays.filter((item) => readDays.includes(item.day)).length;
  return (
    <section className={styles.todayDashboard}>
      <header className={styles.todayHeader}>
        <div className={styles.todayHeading}>
          <p className={styles.eyebrow}>DEN {currentDay} · {day.title.toUpperCase()}</p>
          <h1>Dnes stačí jeden další krok.</h1>
          <p>Krátké zastavení, jedna otázka a prostor všimnout si sebe.</p>
        </div>
      </header>

      <div className={styles.todayBento}>
        <article className={styles.lessonCard}>
          <div>
            <div className={styles.cardMeta}><span>DNEŠNÍ ZASTAVENÍ</span><strong>{minuteLabel(day.minutes).toUpperCase()}</strong></div>
            <h2>Nejdřív něco prožijeme. Potom si vysvětlujeme, proč jsme reagovali.</h2>
            <p>Já jsem dlouho uměl fungovat, rozhodovat a být tu pro druhé. Mnohem méně jsem ale věděl, co se děje ve mně.</p>
            <p>Dnešní otázka: <strong>{day.focus}</strong></p>
            <button className={styles.primaryButton} onClick={() => onOpenLesson(currentDay)}>Otevřít dnešní část <span>→</span></button>
          </div>
          <div className={styles.todayVisual}>
            <div className={styles.sun} />
            <img src={lesson.illustration.src} alt={lesson.illustration.alt} />
            <div className={styles.handNote}>Začni u sebe.</div>
          </div>
        </article>

        <article className={styles.actionCard}>
          <div className={styles.todayProgress} aria-label={`${phaseRead} ze ${phaseDays.length} dní v aktuální etapě přečteno`}>
            <div><span>ETAPA {day.phase} / 3</span><strong>{phaseRead}/{phaseDays.length}</strong></div>
            <div className={styles.todayProgressTrack}><i style={{ width: `${(phaseRead / phaseDays.length) * 100}%` }} /></div>
            <small>přečtených dní v této etapě</small>
          </div>
          <span className={styles.eyebrow}>RYCHLÝ ZÁZNAM</span>
          <h2>Co se v tobě děje?</h2>
          <p>Vyber první možnost, která je ti trochu blízko.</p>
          <MiniWheel />
          <button className={styles.primaryButton} onClick={() => onNavigate("zaznam")}>Zapsat emoci</button>
        </article>
      </div>

      <section className={styles.insightRow}>
        <article>
          <span className={styles.eyebrow}>TVŮJ POSLEDNÍ ZÁZNAM</span>
          <div className={styles.lastEntry}><i /><div><strong>{entries[0]?.emotion ?? "Zatím bez záznamu"}</strong><p>{entries[0]?.situation ?? "Začni prvním krátkým zastavením."}</p></div><b>{entries[0]?.intensity ?? 0}/5</b></div>
          <button className={flow.inlineLink} onClick={() => onNavigate("historie")}>Zobrazit všechny záznamy</button>
        </article>
        <article>
          <span className={styles.eyebrow}>PROČ TO DĚLÁME</span>
          <p>Když emoci dokážeš zachytit a pojmenovat, nemusíš podle ní automaticky jednat. Začíná vznikat malý prostor pro tvoji volbu.</p>
          <div className={styles.scienceLink}>◌ <span>Co se děje pod povrchem</span></div>
        </article>
      </section>

      <section className={styles.pathPreview}>
        <header><div><span className={styles.eyebrow}>TENTO TÝDEN</span><h2>Dalších sedm kroků na jednom místě.</h2></div><button onClick={() => onNavigate("cesta")}>Celá 90denní cesta →</button></header>
        <div className={styles.days}>
          {phaseDays.map((item) => {
            const isRead = readDays.includes(item.day);
            return <button type="button" key={item.day} onClick={() => onOpenLesson(item.day)} className={isRead ? styles.doneDay : item.day === currentDay ? styles.currentDay : ""}><span>{isRead ? "✓" : item.day}</span><small>{isRead ? "přečteno" : item.day === currentDay ? "dnes" : `den ${item.day}`}</small></button>;
          })}
        </div>
      </section>
    </section>
  );
}

function Journey({ onNavigate, onOpenLesson, onOpenNeeds, onOpenValues, onOpenIdentity, currentDay, readDays, entries, practiceEntries, needsReadDays, valuesReadDays }: { onNavigate: (view: View) => void; onOpenLesson: (day: number) => void; onOpenNeeds: () => void; onOpenValues: () => void; onOpenIdentity: () => void; currentDay: number; readDays: number[]; entries: EmotionEntry[]; practiceEntries: PracticeEntry[]; needsReadDays: number[]; valuesReadDays: number[] }) {
  const firstWeekRead = readDays.filter((day) => day <= 7).length;
  const firstWeekComplete = firstWeekRead === 7;
  const firstWeekEntries = entries.filter((entry) => entry.day <= 7).length;
  const firstWeekPractice = practiceEntries.filter((entry) => entry.day <= 7).length;
  const secondWeekComplete = readDays.filter((day) => day >= 8 && day <= 14).length === 7;
  const secondWeekEntries = entries.filter((entry) => entry.day >= 8 && entry.day <= 14).length;
  const secondWeekPractice = practiceEntries.filter((entry) => entry.day >= 8 && entry.day <= 14).length;
  const thirdWeekComplete = readDays.filter((day) => day >= 15 && day <= 21).length === 7;
  const thirdWeekEntries = entries.filter((entry) => entry.day >= 15 && entry.day <= 21).length;
  const thirdWeekPractice = practiceEntries.filter((entry) => entry.day >= 15 && entry.day <= 21).length;
  const modules = [
    { number: "01", title: "Emoce", verb: "Všímám si", text: "Začnu poznávat, co cítím, jak se emoce hlásí v těle a co obvykle udělám.", days: "21 dní", state: "active" },
    { number: "02", title: "Potřeby", verb: "Rozumím", text: "Začnu zkoumat, co je pro mě důležité a jakými způsoby se to snažím získat.", days: "21 dní", state: readDays.length === 21 ? "available" : "locked" },
    { number: "03", title: "Hodnoty", verb: "Vybírám si", text: "Rozliším převzatá pravidla od toho, podle čeho chci skutečně žít.", days: "21 dní", state: needsReadDays.length === 21 ? "available" : "locked" },
    { number: "04", title: "Identita a vize", verb: "Jednám", text: "Přeložím poznání do identity, vize a života, který chci postupně vytvářet.", days: "21 dní", state: valuesReadDays.length === 21 ? "available" : "locked" },
  ];

  const moduleCard = (module: (typeof modules)[number]) => (
    <article key={module.number} className={module.state === "active" || module.state === "available" ? styles.activeModule : styles.lockedModule}>
      <div className={styles.moduleTop}><span>{module.number}</span><small>{module.days}</small></div>
      <strong>{module.verb}</strong><h2>{module.title}</h2><p>{module.text}</p>
      {module.state === "active" ? <><div className={styles.moduleProgress}><i style={{ width: `${(readDays.length / 21) * 100}%` }} /></div><small>{readDays.length} z 21 dní přečteno</small><button className={styles.primaryButton} onClick={() => onNavigate("dnes")}>Pokračovat</button></> : module.state === "available" ? <><div className={styles.moduleProgress}><i style={{ width: "33.333%" }} /></div><small>Celý modul je připravený</small><button className={styles.primaryButton} onClick={module.number === "02" ? onOpenNeeds : module.number === "03" ? onOpenValues : onOpenIdentity}>Otevřít modul {module.title}</button></> : <div className={styles.lockedLabel}>○ ZPŘÍSTUPNÍ SE PO DOKONČENÍ PŘEDCHOZÍ ČÁSTI NEBO AKTIVACI PŘÍSTUPU</div>}
    </article>
  );

  return (
    <section>
      <PageIntro eyebrow="VNITŘNÍ KOMPAS · 90DENNÍ CESTA" title="Od první emoce k vlastnímu směru." text="Čtyři moduly tvoří 84 vedených dní. Posledních šest dní se vracíš ke svým mapám, zapisuješ skutečné chvíle a necháváš vlastní poznání pracovat v životě." />
      <div className={`${styles.moduleGrid} ${flow.singleModule}`}>{moduleCard(modules[0])}</div>

      <article className={flow.journeyDetail}>
        <header className={flow.journeyIntro}>
          <div>
            <span className={styles.eyebrow}>MODUL 01 · EMOCE</span>
            <h2>Emoce se učíš poznávat ve třech krocích.</h2>
          </div>
          <p>Neučíš se emoce ovládat. Nejdřív si jich všimneš. Potom je zkusíš přesněji pojmenovat. Nakonec začneš poznávat, co se u tebe opakuje.</p>
        </header>
        {EMOTION_PHASES.map((phase) => (
          <section className={flow.phaseBlock} key={phase.number}>
            <div className={flow.phaseHead}>
              <span>{phase.number}</span>
              <div><small>{phase.days}</small><strong>{phase.title}</strong></div>
              <p>{phase.text}</p>
            </div>
            <div className={flow.dayGrid}>
              {EMOTION_DAYS.filter((day) => day.phase === Number(phase.number)).map((day) => {
                const isRead = readDays.includes(day.day);
                return <button key={day.day} disabled={day.day > AVAILABLE_LESSON_DAYS} className={`${flow.dayCard} ${isRead ? flow.done : day.day === currentDay ? flow.current : flow.future}`} onClick={() => onOpenLesson(day.day)}>
                  <span className={flow.dayMeta}>
                    <span className={flow.dayIdentity}>
                      <b className={flow.dayNumber}>DEN {day.day}</b>
                      {isRead ? <b className={flow.readStatus}><i>✓</i><em>PŘEČTENO</em></b> : null}
                    </span>
                    <small>{day.minutes} min</small>
                  </span>
                  <strong>{day.title}</strong><p>{day.focus}</p>
                </button>;
              })}
            </div>
          </section>
        ))}
      </article>

      {firstWeekComplete ? (
        <section className={flow.weekComplete}>
          <div className={flow.weekCompleteMark} aria-hidden="true">✓</div>
          <div className={flow.weekCompleteCopy}>
            <span className={styles.eyebrow}>PRVNÍ ETAPA DOKONČENA</span>
            <h2>Už máš první mapu toho, čeho sis dokázal všimnout.</h2>
            <p>Nejde o konečný výklad. Je to první poctivý pohled na tvoje zachycené emoce, tělesné signály a odpovědi z tréninku.</p>
          </div>
          <div className={flow.weekCompleteStats}>
            <div><strong>7 z 7</strong><small>přečtených dnů</small></div>
            <div><strong>{firstWeekPractice}</strong><small>odpovědí z tréninku</small></div>
            <div><strong>{firstWeekEntries}</strong><small>emočních záznamů</small></div>
          </div>
          <button className={styles.primaryButton} onClick={() => onNavigate("mapa")}>Otevřít první mapu</button>
        </section>
      ) : null}

      {secondWeekComplete ? (
        <section className={flow.weekComplete}>
          <div className={flow.weekCompleteMark} aria-hidden="true">✓</div>
          <div className={flow.weekCompleteCopy}>
            <span className={styles.eyebrow}>DRUHÁ ETAPA DOKONČENA</span>
            <h2>Tvůj emoční slovník už vzniká z tvých vlastních slov.</h2>
            <p>Ukazuje, která pojmenování používáš, kde váháš a ve kterých situacích se jednotlivá slova objevila. Není to závěr o tvojí osobnosti.</p>
          </div>
          <div className={flow.weekCompleteStats}>
            <div><strong>7 z 7</strong><small>přečtených dnů</small></div>
            <div><strong>{secondWeekPractice}</strong><small>odpovědí z tréninku</small></div>
            <div><strong>{secondWeekEntries}</strong><small>emočních záznamů</small></div>
          </div>
          <button className={styles.primaryButton} onClick={() => onNavigate("mapa")}>Otevřít můj emoční slovník</button>
        </section>
      ) : null}

      {thirdWeekComplete ? (
        <section className={flow.weekComplete}>
          <div className={flow.weekCompleteMark} aria-hidden="true">✓</div>
          <div className={flow.weekCompleteCopy}>
            <span className={styles.eyebrow}>MODUL EMOCE DOKONČEN</span>
            <h2>Tvůj první emoční manuál propojuje situaci, signál, reakci i místo pro volbu.</h2>
            <p>Není to diagnóza ani hotový výklad. Je to tvoje osobní mapa vytvořená z konkrétních chvil a vlastních odpovědí.</p>
          </div>
          <div className={flow.weekCompleteStats}>
            <div><strong>21 z 21</strong><small>přečtených dnů</small></div>
            <div><strong>{thirdWeekPractice}</strong><small>odpovědí ve třetí etapě</small></div>
            <div><strong>{thirdWeekEntries}</strong><small>nových emočních záznamů</small></div>
          </div>
          <button className={styles.primaryButton} onClick={() => onNavigate("mapa")}>Otevřít celý emoční manuál</button>
        </section>
      ) : null}

      <div className={flow.nextModulesTitle}><span className={styles.eyebrow}>CO BUDE NÁSLEDOVAT</span><h2>Další vrstvy tvého osobního kompasu</h2></div>
      <div className={styles.moduleGrid}>{modules.slice(1).map(moduleCard)}</div>

      <article className={styles.integrationCard}>
        <span>90</span>
        <div>
          <small>ZÁVĚREČNÁ INTEGRACE · DNY 85 AŽ 90</small>
          <h2>Teď necháváš svůj kompas pracovat v životě.</h2>
          <p>Vracíš se k tomu, co už jsi napsal a vytvořil. Pokračuješ v průběžném záznamu emocí, zkoušíš vlastní kroky v běžném životě a čteš svůj osobní report.</p>
          <div className={styles.integrationDays}>
            {INTEGRATION_DAYS.map(([day, title, text]) => (
              <section key={day}><b>{day}</b><div><strong>{title}</strong><p>{text}</p></div></section>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}

function NeedsJourney({ onNavigate, onOpenLesson, readDays, practiceEntries }: { onNavigate: (view: View) => void; onOpenLesson: (day: number) => void; readDays: number[]; practiceEntries: PracticeEntry[] }) {
  const currentDay = Array.from({ length: 21 }, (_, index) => index + 1).find((day) => !readDays.includes(day)) ?? 21;
  const stageComplete = (stage: number) => readDays.filter((day) => Math.ceil(day / 7) === stage).length === 7;
  const firstStageComplete = stageComplete(1);
  const secondStageComplete = stageComplete(2);
  const thirdStageComplete = stageComplete(3);

  return (
    <section>
      <PageIntro eyebrow="MODUL 02 · POTŘEBY" title="Co se za mými emocemi ozývá?" text="Během tří etap poznáš, co je pro tebe důležité, oddělíš potřebu od známé strategie a vytvoříš si vlastní nabídku vědomějších možností." />

      <article className={flow.journeyDetail}>
        <header className={flow.journeyIntro}>
          <div>
            <span className={styles.eyebrow}>CELÝ MODUL JE OTEVŘENÝ</span>
            <h2>Od první stopy k osobnímu manuálu potřeb.</h2>
          </div>
          <p>Každý den dostaneš Kristiánův vstup, lidské vysvětlení, vlastní doodle ilustraci a jeden ukládaný trénink. Po sedmi dnech uvidíš první mapu. Po jednadvaceti dnech vznikne celý manuál.</p>
        </header>

        {NEEDS_PHASES.map((phase) => (
          <section className={flow.phaseBlock} key={phase.number}>
            <div className={flow.phaseHead}>
              <span>{phase.number}</span>
              <div><small>{phase.days}</small><strong>{phase.title}</strong></div>
              <p>{phase.text}</p>
            </div>
            <div className={flow.dayGrid}>
              {NEEDS_DAYS.filter((day) => day.phase === Number(phase.number)).map((day) => {
                const isRead = readDays.includes(day.day);
                return <button key={day.day} className={`${flow.dayCard} ${isRead ? flow.done : day.day === currentDay ? flow.current : flow.future}`} onClick={() => onOpenLesson(day.day)}>
                  <span className={flow.dayMeta}>
                    <span className={flow.dayIdentity}>
                      <b className={flow.dayNumber}>DEN {day.day}</b>
                      {isRead ? <b className={flow.readStatus}><i>✓</i><em>PŘEČTENO</em></b> : null}
                    </span>
                    <small>{day.minutes} min</small>
                  </span>
                  <strong>{day.title}</strong><p>{day.focus}</p>
                </button>;
              })}
            </div>
          </section>
        ))}
      </article>

      {[firstStageComplete, secondStageComplete, thirdStageComplete].map((complete, index) => complete ? (
        <section className={flow.weekComplete} key={index}>
          <div className={flow.weekCompleteMark} aria-hidden="true">✓</div>
          <div className={flow.weekCompleteCopy}>
            <span className={styles.eyebrow}>{index === 2 ? "MODUL POTŘEBY DOKONČEN" : `${index + 1}. ETAPA POTŘEB DOKONČENA`}</span>
            <h2>{index === 0 ? "Slyšíš, co je pro tebe důležité." : index === 1 ? "Vidíš potřebu, strategii i více možných cest." : "Máš první osobní manuál potřeb."}</h2>
            <p>{index === 2 ? "Manuál vznikl z tvých konkrétních situací, odpovědí a experimentu. Můžeš ho dál měnit." : "Výstup není diagnóza. Je to pracovní mapa vytvořená z tvých vlastních slov."}</p>
          </div>
          <div className={flow.weekCompleteStats}>
            <div><strong>7 z 7</strong><small>dnů v etapě</small></div>
            <div><strong>{practiceEntries.filter((entry) => Math.ceil(entry.day / 7) === index + 1).length}</strong><small>uložených tréninků</small></div>
            <div><strong>{practiceEntries.some((entry) => entry.day === (index + 1) * 7) ? "1" : "0"}</strong><small>osobních map</small></div>
          </div>
          <button className={styles.primaryButton} onClick={() => index === 2 ? onNavigate("potreby-mapa") : onOpenLesson((index + 1) * 7)}>{index === 0 ? "Otevřít první mapu" : index === 1 ? "Otevřít mapu strategií" : "Otevřít můj manuál potřeb"}</button>
        </section>
      ) : null)}

      <button className={flow.inlineLink} onClick={() => onNavigate("cesta")}>← Zpět na celou cestu</button>
    </section>
  );
}

function NeedsMap({ onNavigate, onOpenLesson, readDays, practiceEntries }: { onNavigate: (view: View) => void; onOpenLesson: (day: number) => void; readDays: number[]; practiceEntries: PracticeEntry[] }) {
  const stageOne = practiceEntries.find((entry) => entry.day === 7);
  const stageTwo = practiceEntries.find((entry) => entry.day === 14);
  const manual = practiceEntries.find((entry) => entry.day === 21);
  const completedStages = [7, 14, 21].filter((day) => readDays.includes(day)).length;
  const repeatingNeed = practiceValue(manual, "need") || practiceValue(stageTwo, "need") || practiceValue(stageOne, "repeatingNeed");
  const situation = practiceValue(manual, "situation") || practiceValue(stageOne, "repeatingSituation");
  const strategy = practiceValue(manual, "strategy") || practiceValue(stageTwo, "strategy") || practiceValue(stageOne, "usualStrategy");
  const shortRelief = practiceValue(manual, "shortRelief") || practiceValue(stageTwo, "shortEffect");
  const laterCost = practiceValue(manual, "laterCost") || practiceValue(stageTwo, "laterCost");
  const myInfluence = practiceValue(manual, "myInfluence") || practiceValue(stageTwo, "myInfluence");
  const request = practiceValue(manual, "request") || practiceValue(stageTwo, "request");
  const outside = practiceValue(manual, "outside") || practiceValue(stageTwo, "outside");
  const options = practiceValue(manual, "options") || practiceValue(stageTwo, "newPath");
  const experiment = practiceValue(manual, "experiment");
  const nextQuestion = practiceValue(manual, "nextQuestion") || practiceValue(stageOne, "nextQuestion");

  const badges = [
    { day: 1, icon: "signal", title: "První stopa", text: "Pojmenoval jsi první možnou potřebu." },
    { day: 4, icon: "eye", title: "Rozlišuju vrstvy", text: "Oddělil jsi emoci od potřeby." },
    { day: 6, icon: "pause", title: "Potřeba není příkaz", text: "Uviděl jsi potřebu bez řízení druhých." },
    { day: 9, icon: "paths", title: "Více možností", text: "Přidal jsi k potřebě další cesty." },
    { day: 10, icon: "choice", title: "Znám svůj vliv", text: "Rozlišil jsi vlastní, společnou a neovladatelnou část." },
    { day: 13, icon: "words", title: "Umím požádat", text: "Vytvořil jsi konkrétní prosbu." },
    { day: 21, icon: "manual", title: "Můj manuál potřeb", text: "Propojil jsi celý vzorec do vlastní mapy." },
  ];

  return (
    <section className={`${flow.needsMapPage} ${flow.dashboardTypography}`}>
      <PageIntro eyebrow="MOJE MAPA · POTŘEBY" title="Ne nálepka. Mapa toho, co je pro mě důležité a jak o to pečuju." text="Všechno, co tu vidíš, vzniklo z tvých vlastních odpovědí. Mapa nic nediagnostikuje. Vrací ti souvislosti, ke kterým se můžeš vracet." />

      <section className={flow.needsMapHero}>
        <div>
          <span className={styles.eyebrow}>TVŮJ POSTUP</span>
          <strong>{readDays.length} z 21 dní</strong>
          <p>{completedStages === 3 ? "Dokončil jsi všechny tři etapy a otevřel celý manuál." : `Dokončené etapy: ${completedStages} ze 3. Každá další odpověď mapu zpřesní.`}</p>
        </div>
        <div className={flow.needsMapProgress}>
          <div className={flow.needsMapProgressTrack}><i style={{ width: `${Math.min(100, readDays.length / 21 * 100)}%` }} /></div>
          <div className={flow.needsMapStages} aria-label="Tři etapy modulu Potřeby">
            {[
              ["01", "Všímám si"],
              ["02", "Hledám cesty"],
              ["03", "Tvořím manuál"],
            ].map(([number, label], index) => {
              const complete = completedStages > index;
              return <span key={number} className={complete ? flow.needsMapStageDone : ""}><b>{complete ? "✓" : number}</b><small>{label}</small></span>;
            })}
          </div>
        </div>
        <button className={styles.primaryButton} onClick={() => onOpenLesson(Math.min(21, readDays.length + 1))}>{readDays.length >= 21 ? "Projít poslední den" : "Pokračovat v cestě"}</button>
      </section>

      <section className={flow.badgeSection}>
        <header><span className={styles.eyebrow}>ODZNAKY DOVEDNOSTÍ</span><h2>Neodměňují dokonalost. Připomínají, čeho sis už dokázal všimnout.</h2></header>
        <div>{badges.map((badge) => {
          const unlocked = readDays.includes(badge.day);
          return <article key={badge.title} className={unlocked ? flow.badgeUnlocked : flow.badgeLocked}><SkillMedal icon={badge.icon} day={badge.day} unlocked={unlocked} /><strong>{badge.title}</strong><p>{badge.text}</p><small>{unlocked ? "ODEMČENO" : `ODEMKNE SE VE DNI ${badge.day}`}</small></article>;
        })}</div>
      </section>

      <section className={flow.needsMapPath}>
        <header><span className={styles.eyebrow}>MOJE OPAKUJÍCÍ SE CESTA</span><h2>Jedna potřeba. Známá strategie. A místo, kde může vzniknout větší volba.</h2></header>
        <div>
          {[
            ["01", "KDY SE TO OZÝVÁ", situation],
            ["02", "CO JE PRO MĚ DŮLEŽITÉ", repeatingNeed],
            ["03", "CO OBVYKLE UDĚLÁM", strategy],
            ["04", "RYCHLÁ ÚLEVA", shortRelief],
            ["05", "POZDĚJŠÍ CENA", laterCost],
          ].map(([number, label, value]) => <article key={number}><span>{number}</span><small>{label}</small><strong>{value || "Doplní se z tvých odpovědí"}</strong></article>)}
        </div>
      </section>

      <section className={flow.needsChoiceGrid}>
        <article><span>CO MŮŽU OVLIVNIT JÁ</span><strong>{myInfluence || "Zatím nevyplněno"}</strong></article>
        <article><span>O CO MŮŽU POŽÁDAT</span><strong>{request || "Zatím nevyplněno"}</strong></article>
        <article><span>CO NEMŮŽU ŘÍDIT</span><strong>{outside || "Zatím nevyplněno"}</strong></article>
        <article className={flow.needsChoiceAccent}><span>DALŠÍ MOŽNOSTI</span><strong>{options || "Zatím nevyplněno"}</strong></article>
      </section>

      <section className={flow.needsExperiment}>
        <div><span className={styles.eyebrow}>MŮJ BEZPEČNÝ EXPERIMENT</span><h2>{experiment || "Až dokončíš den 20, objeví se tady nový malý krok, který sis vybral."}</h2></div>
        <div><span className={styles.eyebrow}>OTÁZKA, KTEROU SI BERU DÁL</span><blockquote>{nextQuestion || "Když nemůžu naplnit všechno najednou, podle čeho se chci rozhodnout?"}</blockquote></div>
      </section>

      <section className={flow.practiceMap}>
        <header><span className={styles.eyebrow}>VŠECHNY MOJE ODPOVĚDI</span><h2>Každý záznam zůstává součástí mapy.</h2><p>Můžeš se vracet k jednotlivým dnům a odpovědi kdykoliv upravit.</p></header>
        {practiceEntries.length ? <div>{practiceEntries.map((entry) => <button key={entry.day} onClick={() => onOpenLesson(entry.day)}><span>DEN {entry.day}</span><small>{entry.question}</small><p>{formatPracticeEntry(entry)}</p></button>)}</div> : <article className={flow.practiceMapEmpty}><strong>Zatím tu není žádná odpověď.</strong><p>Otevři první den a napiš první poctivou větu.</p></article>}
      </section>

      <div className={styles.mapFooter}><div className={styles.handNote}>Potřeba je informace.<br /><mark>Volba vzniká mezi více cestami.</mark></div><div><button className={flow.inlineLink} onClick={() => onNavigate("potreby")}>Projít 21denní cestu</button></div></div>
    </section>
  );
}

type AdvancedModuleKind = "values" | "identity";

const ADVANCED_MODULES = {
  values: {
    number: "03",
    title: "Hodnoty",
    eyebrow: "PODLE ČEHO CHCI ŽÍT",
    intro: "Od skutečných rozhodnutí přes převzatá pravidla a střety hodnot až k vlastnímu manifestu.",
    journeyTitle: "Od toho, co mě dnes řídí, k tomu, co si vědomě vybírám.",
    journeyText: "Každý den propojí Kristiánův vstup, lidské vysvětlení, jednoduchou vizualizaci a jeden ukládaný trénink. Mapa se skládá z tvých vlastních situací, ne z testu osobnosti.",
    phases: VALUES_PHASES,
    days: VALUES_DAYS,
    lessonView: "hodnoty-lekce" as View,
    mapView: "hodnoty-mapa" as View,
    journeyView: "hodnoty" as View,
    stageTitles: ["Vidíš svoje žité hodnoty i převzatá pravidla.", "Rozumíš střetům a ceně automatických voleb.", "Máš vlastní hodnotový manifest."],
    stageButtons: ["Otevřít první mapu hodnot", "Otevřít mapu konfliktů", "Otevřít můj manifest"],
    finalTitle: "Můj hodnotový manifest",
    finalDescription: "Mapa toho, co chci chránit, co už nechci dokazovat a jak se můj směr projeví v běžném životě.",
    badges: [
      [1, "První skutečná volba", "Pojmenoval jsi, co tě v jedné chvíli vedlo."],
      [2, "Rozlišuji zdroj", "Oddělil jsi hodnotu od rigidního pravidla."],
      [7, "Moje první mapa", "Uviděl jsi opakující se směry i převzatá „musím“."],
      [9, "Jsem dost", "Pojmenoval jsi jednu podmínku vlastní hodnoty."],
      [12, "Držím dvě hodnoty", "Dokázal jsi uvidět konflikt bez rychlého soudu."],
      [18, "Hodnota v činu", "Přeložil jsi velké slovo do konkrétního chování."],
      [21, "Můj manifest", "Propojil jsi hodnoty, chování a vědomou volbu."],
    ] as Array<[number, string, string]>,
  },
  identity: {
    number: "04",
    title: "Identita a vize",
    eyebrow: "KÝM SE STÁVÁM",
    intro: "Od dnešních rolí a příběhů přes zvolenou identitu až k vizi obyčejného života a osobnímu kompasu.",
    journeyTitle: "Od toho, kdo jsem dnes, k životu, který chci postupně vytvářet.",
    journeyText: "Nebudeš vyrábět dokonalou verzi sebe. Oddělíš role, příběhy a důkazy. Potom zvolíš směr a přeložíš ho do obyčejného dne a nejmenšího skutečného kroku.",
    phases: IDENTITY_PHASES,
    days: IDENTITY_DAYS,
    lessonView: "identita-lekce" as View,
    mapView: "identita-mapa" as View,
    journeyView: "identita" as View,
    stageTitles: ["Vidíš role, příběhy i důkazy dnešní identity.", "Máš první mapu člověka, kterým se chceš stávat.", "Máš osobní kompas a další uskutečnitelný krok."],
    stageButtons: ["Otevřít mapu dnešní identity", "Otevřít mapu budoucího já", "Otevřít můj osobní kompas"],
    finalTitle: "Můj osobní kompas",
    finalDescription: "Živá mapa rolí, zvolené identity, vize, podpůrných podmínek a nejmenšího dalšího kroku.",
    badges: [
      [1, "Vidím svoje role", "Oddělil jsi funkce od celého obrazu sebe."],
      [3, "Příběh není fakt", "Zachytil jsi jednu větu, kterou o sobě opakuješ."],
      [7, "Mapa dnešního já", "Propojil jsi role, příběhy a skutečné důkazy."],
      [9, "Volím směr", "Pojmenoval jsi kvalitu člověka, kterým se stáváš."],
      [13, "Důkaz identity", "Vytvořil jsi jeden malý skutečný důkaz."],
      [15, "Vize obyčejného dne", "Přeložil jsi budoucnost do života, který se opravdu žije."],
      [21, "Můj osobní kompas", "Propojil jsi dnešek, směr, vizi a další krok."],
    ] as Array<[number, string, string]>,
  },
};

function AdvancedModuleJourney({ kind, onNavigate, onOpenLesson, readDays, practiceEntries }: { kind: AdvancedModuleKind; onNavigate: (view: View) => void; onOpenLesson: (day: number) => void; readDays: number[]; practiceEntries: PracticeEntry[] }) {
  const config = ADVANCED_MODULES[kind];
  const currentDay = Array.from({ length: 21 }, (_, index) => index + 1).find((day) => !readDays.includes(day)) ?? 21;

  return (
    <section>
      <PageIntro eyebrow={`MODUL ${config.number} · ${config.title.toUpperCase()}`} title={config.eyebrow === "PODLE ČEHO CHCI ŽÍT" ? "Podle čeho chci skutečně žít?" : "Kdo jsem a kým se chci stávat?"} text={config.intro} />
      <article className={flow.journeyDetail}>
        <header className={flow.journeyIntro}>
          <div><span className={styles.eyebrow}>CELÝ MODUL JE OTEVŘENÝ</span><h2>{config.journeyTitle}</h2></div>
          <p>{config.journeyText}</p>
        </header>
        {config.phases.map((phase) => (
          <section className={flow.phaseBlock} key={phase.number}>
            <div className={flow.phaseHead}>
              <span>{phase.number}</span>
              <div><small>{phase.days}</small><strong>{phase.title}</strong></div>
              <p>{phase.text}</p>
            </div>
            <div className={flow.dayGrid}>
              {config.days.filter((day) => day.phase === Number(phase.number)).map((day) => {
                const isRead = readDays.includes(day.day);
                return <button key={day.day} className={`${flow.dayCard} ${isRead ? flow.done : day.day === currentDay ? flow.current : flow.future}`} onClick={() => onOpenLesson(day.day)}>
                  <span className={flow.dayMeta}>
                    <span className={flow.dayIdentity}>
                      <b className={flow.dayNumber}>DEN {day.day}</b>
                      {isRead ? <b className={flow.readStatus}><i>✓</i><em>PŘEČTENO</em></b> : null}
                    </span>
                    <small>{day.minutes} min</small>
                  </span>
                  <strong>{day.title}</strong><p>{day.focus}</p>
                </button>;
              })}
            </div>
          </section>
        ))}
      </article>

      {[1, 2, 3].map((stage) => {
        const complete = readDays.filter((day) => Math.ceil(day / 7) === stage).length === 7;
        if (!complete) return null;
        return <section className={flow.weekComplete} key={stage}>
          <div className={flow.weekCompleteMark} aria-hidden="true">✓</div>
          <div className={flow.weekCompleteCopy}>
            <span className={styles.eyebrow}>{stage === 3 ? `MODUL ${config.title.toUpperCase()} DOKONČEN` : `${stage}. ETAPA DOKONČENA`}</span>
            <h2>{config.stageTitles[stage - 1]}</h2>
            <p>Výstup vznikl z tvých konkrétních situací a odpovědí. Není to diagnóza ani konečná nálepka.</p>
          </div>
          <div className={flow.weekCompleteStats}>
            <div><strong>7 z 7</strong><small>dnů v etapě</small></div>
            <div><strong>{practiceEntries.filter((entry) => Math.ceil(entry.day / 7) === stage).length}</strong><small>uložených tréninků</small></div>
            <div><strong>{practiceEntries.some((entry) => entry.day === stage * 7) ? "1" : "0"}</strong><small>osobních map</small></div>
          </div>
          <button className={styles.primaryButton} onClick={() => onNavigate(config.mapView)}>{config.stageButtons[stage - 1]}</button>
        </section>;
      })}
      <button className={flow.inlineLink} onClick={() => onNavigate("cesta")}>← Zpět na celou cestu</button>
    </section>
  );
}

function AdvancedModuleMap({ kind, onNavigate, onOpenLesson, readDays, practiceEntries }: { kind: AdvancedModuleKind; onNavigate: (view: View) => void; onOpenLesson: (day: number) => void; readDays: number[]; practiceEntries: PracticeEntry[] }) {
  const config = ADVANCED_MODULES[kind];
  const stageOne = practiceEntries.find((entry) => entry.day === 7);
  const stageTwo = practiceEntries.find((entry) => entry.day === 14);
  const valuesShell = practiceEntries.find((entry) => entry.day === 16);
  const valuesExperiment = practiceEntries.find((entry) => entry.day === 20);
  const identityOrdinaryDay = practiceEntries.find((entry) => entry.day === 15);
  const identityConditions = practiceEntries.find((entry) => entry.day === 18);
  const identityGap = practiceEntries.find((entry) => entry.day === 19);
  const identityExperiment = practiceEntries.find((entry) => entry.day === 20);
  const final = practiceEntries.find((entry) => entry.day === 21);
  const finalCards = kind === "values"
    ? [
        ["MOJE ZVOLENÉ HODNOTY", practiceValue(final, "directions") || practiceValue(valuesExperiment, "value") || practiceValue(stageOne, "chosen")],
        ["JAK JE CHCI ŽÍT", practiceValue(final, "behaviors")],
        ["CO UŽ NECHCI DOKAZOVAT", practiceValue(valuesShell, "shell") || practiceValue(stageOne, "automatic")],
        ["KDYŽ SE HODNOTY STŘETNOU", practiceValue(final, "conflict") || practiceValue(stageTwo, "conflict")],
        ["MŮJ DALŠÍ EXPERIMENT", [practiceValue(valuesExperiment, "behavior"), practiceValue(valuesExperiment, "situations")].filter(Boolean).join(" · ")],
      ]
    : [
        ["KDO JSEM DNES", [practiceValue(stageOne, "qualities"), practiceValue(stageOne, "roles")].filter(Boolean).join(" · ")],
        ["KÝM SE STÁVÁM", practiceValue(final, "identity") || practiceValue(stageTwo, "first")],
        ["JAKÝ ŽIVOT TVOŘÍM", [practiceValue(identityOrdinaryDay, "morning"), practiceValue(identityOrdinaryDay, "day"), practiceValue(identityOrdinaryDay, "evening")].filter(Boolean).join(" · ")],
        ["CO MŮJ SMĚR PODPORUJE", practiceValue(identityConditions, "support") || practiceValue(identityConditions, "remove")],
        ["NEJMENŠÍ DALŠÍ KROK", practiceValue(final, "step") || practiceValue(identityExperiment, "action")],
      ];
  const finalCardSourceDays = kind === "values" ? [21, 21, 16, 14, 20] : [7, 21, 15, 18, 21];
  const statement = kind === "values" ? practiceValue(final, "manifest") : practiceValue(final, "returnQuestion");
  const completedStages = [7, 14, 21].filter((day) => readDays.includes(day)).length;
  const unlockedBadges = config.badges.filter(([day]) => readDays.includes(day)).length;
  const capturedClues = practiceEntries.reduce((total, entry) => {
    const answerCount = entry.answer?.trim() ? 1 : 0;
    const structuredCount = Object.values(entry.answers ?? {}).filter((value) => Array.isArray(value) ? value.length > 0 : String(value ?? "").trim().length > 0).length;
    return total + answerCount + structuredCount;
  }, 0);
  const reportMetrics = [
    [`${readDays.length}/21`, "PROZKOUMANÝCH DNÍ", "Každý přečtený den přidává mapě kontext."],
    [`${practiceEntries.length}`, "OSOBNÍCH ZÁZNAMŮ", "Tolik situací a zastavení už se v reportu opírá o tvoje slova."],
    [`${capturedClues}`, "ZACHYCENÝCH STOP", "Konkrétní odpovědi, volby, věty a důkazy, ze kterých se mapa skládá."],
    [`${unlockedBadges}/7`, "DOVEDNOSTNÍCH ODZNAKŮ", "Ne za správné odpovědi. Za dokončená důležitá zastavení."],
  ];
  const mirrorCards = kind === "values"
    ? [
        ["CO SE U MĚ OPAKUJE", practiceValue(stageOne, "pattern") || practiceValue(stageOne, "automatic"), 7],
        ["JAKOU TO MÁ CENU", practiceValue(stageOne, "price"), 7],
        ["K ČEMU SE CHCI VRACET", practiceValue(final, "return"), 21],
        ["CO TEĎ ZKUSÍM", practiceValue(valuesExperiment, "behavior"), 20],
      ]
    : [
        ["CO O SOBĚ OPAKUJU", practiceValue(stageOne, "stories") || practiceValue(stageOne, "patterns"), 7],
        ["KDE JE NEJVĚTŠÍ ROZDÍL", practiceValue(identityGap, "gaps") || practiceValue(identityGap, "impact"), 19],
        ["OTÁZKA PRO NÁVRAT", practiceValue(final, "returnQuestion"), 21],
        ["CO TEĎ UDĚLÁM", practiceValue(final, "step") || practiceValue(identityExperiment, "action"), 21],
      ];
  const milestoneCards = kind === "values"
    ? [
        [7, "01", "CO MĚ DNES ŘÍDÍ", practiceValue(stageOne, "pattern") || practiceValue(stageOne, "chosen"), "První mapa žitých hodnot a převzatých pravidel."],
        [14, "02", "KDE VZNIKÁ VOLBA", practiceValue(stageTwo, "choicePoint") || practiceValue(stageTwo, "conflict"), "Mapa opakujícího se střetu a místa, kde můžeš zvolit jinak."],
        [21, "03", "JAK CHCI ŽÍT", practiceValue(final, "manifest"), "Tvoje závěrečná dohoda, chování a cesta zpět po odchýlení."],
      ]
    : [
        [7, "01", "KDO JSEM DNES", practiceValue(stageOne, "focus") || practiceValue(stageOne, "patterns"), "Role, příběhy, kvality a vzorce, které dnes skutečně žiješ."],
        [14, "02", "KDE TO ZAČÍNÁ BÝT VIDĚT", practiceValue(stageTwo, "first") || practiceValue(stageTwo, "relations"), "První konkrétní důkaz směru ve vztazích, práci a péči o sebe."],
        [21, "03", "MŮJ OSOBNÍ KOMPAS", practiceValue(final, "identity") || practiceValue(final, "returnQuestion"), "Směr, nejmenší krok a otázka, která tě umí vrátit k sobě."],
      ];

  return (
    <section className={`${flow.needsMapPage} ${flow.dashboardTypography}`}>
      <PageIntro eyebrow={`MŮJ OSOBNÍ REPORT · ${config.title.toUpperCase()}`} title={config.finalTitle} text={`${config.finalDescription} Není to hodnocení člověka. Je to zrcadlo vytvořené z tvých vlastních záznamů.`} />
      <section className={flow.needsMapHero}>
        <div><span className={styles.eyebrow}>TVŮJ POSTUP</span><strong>{readDays.length} z 21 dní</strong><p>{completedStages === 3 ? "Dokončil jsi všechny tři etapy. Tvoje mapa je připravená k dalšímu používání a úpravám." : `Dokončené etapy: ${completedStages} ze 3. Každá další odpověď přidá mapě další vrstvu.`}</p></div>
        <div className={flow.needsMapProgress}>
          <div className={flow.needsMapProgressTrack}><i style={{ width: `${Math.min(100, readDays.length / 21 * 100)}%` }} /></div>
          <div className={flow.needsMapStages} aria-label={`Tři etapy modulu ${config.title}`}>
            {config.phases.map((phase, index) => {
              const complete = completedStages > index;
              return <span key={phase.number} className={complete ? flow.needsMapStageDone : ""}><b>{complete ? "✓" : phase.number}</b><small>{phase.title}</small></span>;
            })}
          </div>
        </div>
        <button className={styles.primaryButton} onClick={() => onOpenLesson(Math.min(21, readDays.length + 1))}>{readDays.length >= 21 ? "Vrátit se k poslednímu dni" : "Pokračovat v cestě"}</button>
      </section>

      <section className={flow.reportMetrics} aria-label="Souhrn osobního reportu">
        {reportMetrics.map(([value, label, explanation]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
            <p>{explanation}</p>
          </article>
        ))}
      </section>

      <section className={flow.personalMirror}>
        <header>
          <span className={styles.eyebrow}>TVOJE ZRCADLO V JEDNOM POHLEDU</span>
          <h2>Ne obecné rady. Věty, které vznikly z toho, co sis během cesty přiznal.</h2>
        </header>
        <div>
          {mirrorCards.map(([label, value, day], index) => (
            <button key={label} type="button" className={index === mirrorCards.length - 1 ? flow.personalMirrorAction : ""} onClick={() => onOpenLesson(Number(day))}>
              <span>{label}</span>
              <strong>{value || "Tahle část se doplní z tvého záznamu."}</strong>
              <small>OTEVŘÍT DEN {day} →</small>
            </button>
          ))}
        </div>
      </section>

      <section className={flow.reportMilestones}>
        <header>
          <span className={styles.eyebrow}>TŘI HLAVNÍ MILNÍKY</span>
          <h2>Tvoje cesta není dlouhý seznam. Má tři kapitoly, ke kterým se můžeš vracet.</h2>
        </header>
        <div>
          {milestoneCards.map(([day, number, label, value, description]) => {
            const complete = readDays.includes(Number(day));
            return (
              <button key={number} type="button" className={complete ? flow.reportMilestoneDone : ""} onClick={() => onOpenLesson(Number(day))}>
                <span>{complete ? "✓" : number}</span>
                <small>{label}</small>
                <strong>{value || "Odemkne se z tvého záznamu."}</strong>
                <p>{description}</p>
                <b>{complete ? `PROHLÉDNOUT MŮJ MILNÍK · DEN ${day} →` : `OTEVŘÍT DEN ${day} →`}</b>
              </button>
            );
          })}
        </div>
      </section>

      <section className={flow.badgeSection}>
        <header><span className={styles.eyebrow}>MOJE ODEMČENÉ DOVEDNOSTI</span><h2>Nejsou za poslušnost. Každý odznak vede ke konkrétnímu záznamu, kterým sis ho odemkl.</h2></header>
        <div>{config.badges.map(([day, title, text], index) => {
          const unlocked = readDays.includes(day);
          const icons = kind === "values"
            ? ["choice", "eye", "pattern", "pause", "paths", "signal", "manual"]
            : ["body", "words", "pattern", "choice", "signal", "paths", "manual"];
          return <article key={title} className={unlocked ? flow.badgeUnlocked : flow.badgeLocked}><SkillMedal icon={icons[index]} day={day} unlocked={unlocked} /><strong>{title}</strong><p>{text}</p><button type="button" onClick={() => onOpenLesson(day)}>{unlocked ? "OTEVŘÍT MŮJ DŮKAZ →" : `ZAČÍT DEN ${day} →`}</button></article>;
        })}</div>
      </section>

      <section className={flow.reportChapterIntro}>
        <span className={styles.eyebrow}>{kind === "values" ? "MŮJ HODNOTOVÝ PROFIL" : "MŮJ OSOBNÍ KOMPAS"}</span>
        <h2>{kind === "values" ? "Tohle je směr, který sis vybral ze svých skutečných situací." : "Tohle je spojení dnešní reality, zvoleného směru a obyčejného dalšího kroku."}</h2>
      </section>

      <section className={flow.compassGrid}>
        {finalCards.map(([label, value], index) => <article key={label} className={index === finalCards.length - 1 ? flow.compassAccent : ""}><span>0{index + 1}</span><small>{label}</small><strong>{value || "Doplní se z tvých odpovědí"}</strong><button type="button" onClick={() => onOpenLesson(finalCardSourceDays[index])}>UPRAVIT ZDROJ →</button></article>)}
      </section>

      <section className={flow.compassStatement}>
        <span className={styles.eyebrow}>{kind === "values" ? "MOJE DOHODA SE SEBOU" : "OTÁZKA, KTERÁ MĚ VEDE DÁL"}</span>
        <blockquote>{statement || (kind === "values" ? "Až dokončíš den 21, objeví se tady tvoje vlastní krátká dohoda se sebou." : "Jaký nejmenší čin dnes potvrdí můj směr?")}</blockquote>
      </section>

      {kind === "identity" ? (
        <section className={flow.visionInvitation}>
          <div>
            <span className={styles.eyebrow}>ZÁVĚREČNÝ RITUÁL</span>
            <h2>Dej své vizi slova. Potom jí dej obraz.</h2>
            <p>V osobním kompasu už máš směr. Teď z něj vytvoříš psanou a obrazovou vizi, ke které se můžeš vracet. Ne jako k příkazu. Jako k připomínce života, který chceš postupně tvořit.</p>
            <button className={styles.primaryButton} onClick={() => onNavigate("vize-board")}>Vytvořit moji obrazovou vizi</button>
          </div>
          <img src="/prostor-assets/identity-day-19.png" alt="Ručně kreslená postava tvoří vlastní obraz budoucnosti" />
        </section>
      ) : null}

      <section className={flow.practiceMap}>
        <header><span className={styles.eyebrow}>ARCHIV MÝCH DŮKAZŮ</span><h2>Všech 21 dní zůstává uvnitř reportu.</h2><p>Otevři etapu, najdi konkrétní záznam a vrať se přímo do cvičení, ze kterého vznikl.</p></header>
        {practiceEntries.length ? <div className={flow.reportArchive}>{config.phases.map((phase, phaseIndex) => {
          const startDay = phaseIndex * 7 + 1;
          const endDay = startDay + 6;
          const entries = practiceEntries.filter((entry) => entry.day >= startDay && entry.day <= endDay);
          return (
            <details key={phase.number} open={phaseIndex === 0}>
              <summary><span>ETAPA {phase.number}</span><strong>{phase.title}</strong><small>{entries.length} ze 7 záznamů</small></summary>
              <div>{entries.map((entry) => <button key={entry.day} onClick={() => onOpenLesson(entry.day)}><span>DEN {entry.day}</span><small>{entry.question}</small><p>{formatPracticeEntry(entry)}</p><b>OTEVŘÍT DETAIL →</b></button>)}</div>
            </details>
          );
        })}</div> : <article className={flow.practiceMapEmpty}><strong>Zatím tu není žádná odpověď.</strong><p>Otevři první den a začni jednou skutečnou situací.</p></article>}
      </section>

      <div className={styles.mapFooter}>
        <div className={styles.handNote}>{kind === "values" ? "Hodnota ukazuje směr." : "Identita není rozsudek."}<br /><mark>{kind === "values" ? "Život jí dává konkrétní podobu." : "Každý čin může být novým důkazem."}</mark></div>
        <button className={flow.inlineLink} onClick={() => onNavigate(config.journeyView)}>Projít 21denní cestu</button>
      </div>
    </section>
  );
}

type ProgramDashboardProps = {
  emotionEntries: EmotionEntry[];
  emotionReadDays: number[];
  emotionPracticeEntries: PracticeEntry[];
  needsReadDays: number[];
  needsPracticeEntries: PracticeEntry[];
  valuesReadDays: number[];
  valuesPracticeEntries: PracticeEntry[];
  identityReadDays: number[];
  identityPracticeEntries: PracticeEntry[];
  visionBoard: VisionBoardData;
  integrationDays: number[];
  onCompleteIntegration: (day: number) => void;
  onNavigate: (view: View) => void;
  onOpenEmotionLesson: (day: number) => void;
  onOpenNeedsLesson: (day: number) => void;
  onOpenValuesLesson: (day: number) => void;
  onOpenIdentityLesson: (day: number) => void;
};

function ProgramDashboard({
  emotionEntries,
  emotionReadDays,
  emotionPracticeEntries,
  needsReadDays,
  needsPracticeEntries,
  valuesReadDays,
  valuesPracticeEntries,
  identityReadDays,
  identityPracticeEntries,
  visionBoard,
  integrationDays,
  onCompleteIntegration,
  onNavigate,
  onOpenEmotionLesson,
  onOpenNeedsLesson,
  onOpenValuesLesson,
  onOpenIdentityLesson,
}: ProgramDashboardProps) {
  const readByModule = [emotionReadDays, needsReadDays, valuesReadDays, identityReadDays];
  const totalRead = readByModule.reduce((sum, days) => sum + days.length, 0);
  const allPracticeEntries = [
    ...emotionPracticeEntries,
    ...needsPracticeEntries,
    ...valuesPracticeEntries,
    ...identityPracticeEntries,
  ];
  const totalPractice = allPracticeEntries.length;
  const capturedClues = allPracticeEntries.reduce((total, entry) => {
    const answerCount = entry.answer?.trim() ? 1 : 0;
    const structuredCount = Object.values(entry.answers ?? {}).filter((value) =>
      Array.isArray(value) ? value.length > 0 : String(value ?? "").trim().length > 0
    ).length;
    return total + answerCount + structuredCount;
  }, 0);
  const completedMilestones = readByModule.reduce(
    (total, days) => total + [7, 14, 21].filter((day) => days.includes(day)).length,
    0,
  );
  const completedModules = readByModule.filter((days) => days.length === 21).length;
  const emotionFinal = emotionPracticeEntries.find((entry) => entry.day === 21);
  const needsFinal = needsPracticeEntries.find((entry) => entry.day === 21);
  const valuesFinal = valuesPracticeEntries.find((entry) => entry.day === 21);
  const identityFinal = identityPracticeEntries.find((entry) => entry.day === 21);
  const needsExperiment = needsPracticeEntries.find((entry) => entry.day === 20);
  const valuesExperiment = valuesPracticeEntries.find((entry) => entry.day === 20);
  const identityExperiment = identityPracticeEntries.find((entry) => entry.day === 20);
  const topEmotion = topValues(
    emotionEntries.map((entry) => entry.emotion).filter(Boolean),
    1,
  )[0];
  const topBodySignal = topValues(
    emotionEntries.map((entry) => entry.body).filter((value) => value && value !== "zatím nevím"),
    1,
  )[0];
  const visionLayers = Object.entries(visionBoard).filter(([key, value]) => key !== "image" && String(value).trim()).length;
  const programComplete = totalRead === 84 && integrationDays.length === 6;
  const discoveredDays = totalRead + integrationDays.length;
  const moduleCards = [
    {
      number: "01",
      title: "Emoce",
      read: emotionReadDays.length,
      records: emotionPracticeEntries.length + emotionEntries.length,
      insight: practiceValue(emotionFinal, "choicePoint") || topBodySignal || topEmotion,
      label: "MÍSTO, KTERÉ UŽ DOKÁŽU ZACHYTIT",
      view: "mapa" as View,
    },
    {
      number: "02",
      title: "Potřeby",
      read: needsReadDays.length,
      records: needsPracticeEntries.length,
      insight: practiceValue(needsFinal, "need") || practiceValue(needsFinal, "nextQuestion"),
      label: "CO JE PRO MĚ V TĚCH CHVÍLÍCH DŮLEŽITÉ",
      view: "potreby-mapa" as View,
    },
    {
      number: "03",
      title: "Hodnoty",
      read: valuesReadDays.length,
      records: valuesPracticeEntries.length,
      insight: practiceValue(valuesFinal, "manifest") || practiceValue(valuesFinal, "directions"),
      label: "PODLE ČEHO CHCI VOLIT",
      view: "hodnoty-mapa" as View,
    },
    {
      number: "04",
      title: "Identita a vize",
      read: identityReadDays.length,
      records: identityPracticeEntries.length,
      insight: practiceValue(identityFinal, "identity") || practiceValue(identityFinal, "returnQuestion"),
      label: "KÝM SE CHCI STÁVAT",
      view: "identita-mapa" as View,
    },
  ];
  const compassCards = [
    {
      number: "01",
      label: "CO SE VE MNĚ DĚJE",
      value: [
        topEmotion ? `Často zachytím ${topEmotion}.` : "",
        topBodySignal ? `První tělesná stopa: ${topBodySignal}.` : "",
      ].filter(Boolean).join(" "),
      source: "Emoce · den 21",
      open: () => onOpenEmotionLesson(21),
    },
    {
      number: "02",
      label: "CO V TAKOVÉ CHVÍLI POTŘEBUJU",
      value: practiceValue(needsFinal, "need") || practiceValue(needsFinal, "nextQuestion"),
      source: "Potřeby · den 21",
      open: () => onOpenNeedsLesson(21),
    },
    {
      number: "03",
      label: "PODLE ČEHO CHCI JEDNAT",
      value: practiceValue(valuesFinal, "behaviors") || practiceValue(valuesFinal, "manifest"),
      source: "Hodnoty · den 21",
      open: () => onOpenValuesLesson(21),
    },
    {
      number: "04",
      label: "KÝM SE V TOM CHCI STÁT",
      value: practiceValue(identityFinal, "identity") || practiceValue(identityFinal, "returnQuestion"),
      source: "Identita · den 21",
      open: () => onOpenIdentityLesson(21),
    },
  ];
  const experiments = [
    {
      module: "EMOCE",
      value: practiceValue(emotionFinal, "choicePoint") || "Zachytit první tělesný signál před známou reakcí.",
      open: () => onOpenEmotionLesson(21),
    },
    {
      module: "POTŘEBY",
      value: practiceValue(needsExperiment, "newStep") || practiceValue(needsFinal, "experiment"),
      open: () => onOpenNeedsLesson(20),
    },
    {
      module: "HODNOTY",
      value: practiceValue(valuesExperiment, "behavior") || practiceValue(valuesFinal, "experiment"),
      open: () => onOpenValuesLesson(20),
    },
    {
      module: "IDENTITA",
      value: practiceValue(identityExperiment, "action") || practiceValue(identityFinal, "step"),
      open: () => onOpenIdentityLesson(20),
    },
  ];
  const moduleMilestones = [
    { title: "Emoce", days: emotionReadDays, open: onOpenEmotionLesson },
    { title: "Potřeby", days: needsReadDays, open: onOpenNeedsLesson },
    { title: "Hodnoty", days: valuesReadDays, open: onOpenValuesLesson },
    { title: "Identita", days: identityReadDays, open: onOpenIdentityLesson },
  ];

  return (
    <section className={`${flow.programReport} ${flow.dashboardTypography}`}>
      <section className={flow.programReportHero}>
        <div>
          <span className={styles.eyebrow}>VNITŘNÍ KOMPAS</span>
          <h1>Neříká, jaký jsi.<br />Ukazuje, čeho sis o sobě všiml.</h1>
          <p>Tenhle report nevznikl z testu ani z obecných rad. Skládá se z tvých situací, vět, rozhodnutí a pokusů napříč celým programem.</p>
          <div className={flow.programReportHeroStats}>
            <div><strong>{totalRead}</strong><span>z 84 vedených dní</span></div>
            <div><strong>{completedModules}</strong><span>ze 4 osobních map</span></div>
            <div><strong>{completedMilestones}</strong><span>z 12 milníků</span></div>
          </div>
        </div>
        <div className={flow.programReportSeal}>
          <span>{discoveredDays}</span>
          <strong>{programComplete ? "DNÍ CESTY" : "DNÍ OBJEVENO"}</strong>
          <small>{programComplete ? "84 vedených + 6 integračních" : "Report roste s každým záznamem"}</small>
        </div>
      </section>

      <section className={flow.programReportMetrics} aria-label="Souhrn celého programu">
        <article><strong>{totalPractice}</strong><span>OSOBNÍCH ZÁZNAMŮ</span><p>Situace a zastavení, která se opírají o tvoje vlastní slova.</p></article>
        <article><strong>{capturedClues}</strong><span>ZACHYCENÝCH STOP</span><p>Konkrétní emoce, potřeby, volby, věty, důkazy a kroky.</p></article>
        <article><strong>{emotionEntries.length}</strong><span>EMOČNÍCH CHVIL</span><p>Průběžná linka, která tě provází všemi částmi programu.</p></article>
        <article><strong>{visionLayers}/6</strong><span>VRSTEV VIZE</span><p>Obyčejný den, vztahy, práce, tělo, prostředí a odvážný sen.</p></article>
      </section>

      <section className={flow.programMirror}>
        <header>
          <span className={styles.eyebrow}>MŮJ VNITŘNÍ KOMPAS V JEDNOM POHLEDU</span>
          <h2>Čtyři otázky. Čtyři odpovědi, které vznikly z tvého života.</h2>
          <p>Kliknutím se vrátíš přímo k záznamu, ze kterého daná věta vychází.</p>
        </header>
        <div>
          {compassCards.map((card) => (
            <button type="button" key={card.number} onClick={card.open}>
              <span>{card.number}</span>
              <small>{card.label}</small>
              <strong>{card.value || "Tahle odpověď se objeví, až dokončíš závěrečnou mapu modulu."}</strong>
              <b>{card.source} →</b>
            </button>
          ))}
        </div>
      </section>

      <section className={flow.programModules}>
        <header>
          <span className={styles.eyebrow}>ČTYŘI ČÁSTI MOJÍ MAPY</span>
          <h2>Každý modul ukazuje jinou vrstvu stejného člověka.</h2>
        </header>
        <div>
          {moduleCards.map((module) => (
            <article key={module.number}>
              <div className={flow.programModuleHead}><span>{module.number}</span><div><small>{module.read} Z 21 DNÍ</small><strong>{module.title}</strong></div></div>
              <div className={flow.programModuleTrack}><i style={{ width: `${module.read / 21 * 100}%` }} /></div>
              <small>{module.label}</small>
              <blockquote>{module.insight || "Tahle osobní věta se doplní z tvých záznamů."}</blockquote>
              <p>{module.records} uložených stop</p>
              <button type="button" onClick={() => onNavigate(module.view)}>OTEVŘÍT CELOU MAPU →</button>
            </article>
          ))}
        </div>
      </section>

      <section className={flow.programMilestones}>
        <header>
          <span className={styles.eyebrow}>12 HLAVNÍCH MILNÍKŮ</span>
          <h2>Nejsou za správné odpovědi. Připomínají místa, kde už vznikla tvoje vlastní mapa.</h2>
        </header>
        <div>
          {moduleMilestones.map((module) => (
            <section key={module.title}>
              <strong>{module.title}</strong>
              {[7, 14, 21].map((day, index) => {
                const complete = module.days.includes(day);
                return (
                  <button type="button" key={day} className={complete ? flow.programMilestoneDone : ""} onClick={() => module.open(day)}>
                    <span>{complete ? "✓" : `0${index + 1}`}</span>
                    <div><small>DEN {day}</small><b>{index === 0 ? "PRVNÍ MAPA" : index === 1 ? "HLUBŠÍ SOUVISLOST" : "OSOBNÍ VÝSTUP"}</b></div>
                    <i>→</i>
                  </button>
                );
              })}
            </section>
          ))}
        </div>
      </section>

      <section className={flow.programExperiments}>
        <header>
          <span className={styles.eyebrow}>CO SI BERU DO ŽIVOTA</span>
          <h2>Čtyři vlastní pokusy, které můžeš dál prožívat, upravovat a opakovat.</h2>
        </header>
        <div>
          {experiments.map((experiment) => (
            <button type="button" key={experiment.module} onClick={experiment.open}>
              <span>{experiment.module}</span>
              <strong>{experiment.value || "Tento pokus se objeví po vyplnění závěrečné části modulu."}</strong>
              <small>OTEVŘÍT ZDROJ →</small>
            </button>
          ))}
        </div>
      </section>

      <section className={flow.programStatement}>
        <span className={styles.eyebrow}>MOJE DOHODA A SMĚR</span>
        <blockquote>{practiceValue(valuesFinal, "manifest") || "Moje hodnotová dohoda se objeví po dokončení dne 21 v Hodnotách."}</blockquote>
        <p>{practiceValue(identityFinal, "returnQuestion") || "Otázka pro návrat se objeví po dokončení osobního kompasu."}</p>
      </section>

      <section className={flow.integrationReport}>
        <div>
          <span className={styles.eyebrow}>DNY 85 AŽ 90 · INTEGRACE</span>
          <h2>Teď už nepotřebuješ další obsah. Potřebuješ žít to, co jsi tu vytvořil.</h2>
          <p>Šest závěrečných dní tě vrací k mapám, emocím, vlastním pokusům a tomuto reportu. Nic nového nemusíš dokazovat ani dohánět.</p>
        </div>
        <ol>
          {INTEGRATION_DAYS.map(([day, title]) => {
            const numericDay = Number(day);
            const complete = integrationDays.includes(numericDay);
            return (
              <li key={day}>
                <span>{complete ? "✓" : day}</span>
                <strong>{title}</strong>
                <button
                  type="button"
                  disabled={complete || totalRead < 84}
                  onClick={() => onCompleteIntegration(numericDay)}
                >
                  {complete
                    ? "Prožito"
                    : totalRead < 84
                      ? "Odemkne se po 84. dni"
                      : "Označit dnešní návrat"}
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      <div className={styles.mapFooter}>
        <div className={styles.handNote}>Tohle není známka.<br /><mark>Je to tvoje stopa.</mark></div>
        <div><button className={flow.inlineLink} onClick={() => onNavigate("cesta")}>Projít celou cestu</button> <button className={styles.primaryButton} onClick={() => onNavigate("zaznam")}>Zapsat dnešní emoci</button></div>
      </div>
    </section>
  );
}

const VISION_FIELDS: Array<{ id: keyof Omit<VisionBoardData, "image">; label: string; prompt: string; placeholder: string }> = [
  { id: "ordinaryDay", label: "Můj obyčejný den", prompt: "Jak vypadá ráno, tempo dne a večer, když žiješ více podle sebe?", placeholder: "Probouzím se a první chvíle dne vypadá…" },
  { id: "relationships", label: "Moje vztahy", prompt: "Jak se chceš ve vztazích cítit a jakým člověkem v nich chceš být?", placeholder: "Ve vztazích chci zažívat… a sám chci přinášet…" },
  { id: "work", label: "Moje práce a přínos", prompt: "Co tvoříš, komu tím pomáháš a jak chceš při práci žít?", placeholder: "Tvořím… Přináším… Při práci se cítím…" },
  { id: "body", label: "Moje tělo a energie", prompt: "Jak o sebe pečuješ a podle čeho poznáš, že máš dost prostoru?", placeholder: "Moje tělo má prostor pro… Energii si chráním tím, že…" },
  { id: "environment", label: "Moje prostředí", prompt: "Kde žiješ, co vidíš kolem sebe a co ti toto místo umožňuje?", placeholder: "Jsem na místě, kde… Kolem sebe vidím…" },
  { id: "boldDream", label: "Sen, který si dovoluju", prompt: "Co by sis dovolil chtít, kdybys svoji vizi nemusel zmenšovat ze strachu?", placeholder: "Dovoluju si snít o…" },
];

function buildVisionPrompt(data: VisionBoardData, compass?: PracticeEntry, ordinaryDay?: PracticeEntry) {
  const identity = practiceValue(compass, "identity");
  const step = practiceValue(compass, "step");
  const livedDay = [
    practiceValue(ordinaryDay, "morning"),
    practiceValue(ordinaryDay, "day"),
    practiceValue(ordinaryDay, "evening"),
  ].filter(Boolean).join(" · ");
  return [
    "Vytvoř pro mě osobní obrazovou vizi v čistém ručně kresleném doodle stylu.",
    "Použij bílý základ, černou linku a několik zářivě žlutých akcentů. Obraz má působit lidsky, nadějně, klidně a dospěle. Bez textu, bez log, bez fotorealismu a bez přeplněné koláže.",
    "Spoj jednotlivé části do jednoho soudržného obrazu života, ne do šesti oddělených ikon.",
    identity ? `Člověk, kterým se stávám: ${identity}` : "",
    livedDay ? `Obyčejný den, který chci postupně tvořit: ${livedDay}` : "",
    data.ordinaryDay ? `Můj obyčejný den: ${data.ordinaryDay}` : "",
    data.relationships ? `Moje vztahy: ${data.relationships}` : "",
    data.work ? `Moje práce a přínos: ${data.work}` : "",
    data.body ? `Moje tělo a energie: ${data.body}` : "",
    data.environment ? `Moje prostředí: ${data.environment}` : "",
    data.boldDream ? `Sen, který si dovoluju: ${data.boldDream}` : "",
    step ? `Nejbližší skutečný krok: ${step}` : "",
    "Zachovej dostatek volného prostoru. Hlavní postava může být jednoduchá a lidská. Výsledek má připomínat osobní obraz budoucnosti, ke kterému se budu chtít vracet.",
  ].filter(Boolean).join("\n\n");
}

function VisionBoard({ data, identityEntries, onChange, onNavigate }: { data: VisionBoardData; identityEntries: PracticeEntry[]; onChange: (data: VisionBoardData) => void; onNavigate: (view: View) => void }) {
  const [copied, setCopied] = useState(false);
  const finalCompass = identityEntries.find((entry) => entry.day === 21);
  const ordinaryDay = identityEntries.find((entry) => entry.day === 15);
  const prompt = buildVisionPrompt(data, finalCompass, ordinaryDay);
  const filledCount = VISION_FIELDS.filter((item) => data[item.id].trim()).length;

  const updateField = (id: keyof VisionBoardData, value: string) => {
    onChange({ ...data, [id]: value });
  };

  const uploadVision = (file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => updateField("image", typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className={`${flow.visionBoardPage} ${flow.dashboardTypography}`}>
      <PageIntro eyebrow="ZÁVĚR CESTY · MOJE OBRAZOVÁ VIZE" title="Nejdřív jí dej slova. Potom jí dovol získat obraz." text="Nejde o seznam věcí, které musíš splnit. Vytváříš připomínku směru, který sis během cesty vybral. Piš konkrétně, ale nech ve své vizi i prostor pro překvapení." />

      <section className={flow.visionProgress}>
        <div><strong>{filledCount} ze 6</strong><span>částí vize popsaných</span></div>
        <i><b style={{ width: `${filledCount / 6 * 100}%` }} /></i>
        <p>Nemusíš vyplnit všechno najednou. Začni částí, u které se ti objeví nejživější obraz.</p>
      </section>

      <section className={flow.visionWorkspace}>
        <div className={flow.visionQuestions}>
          <header><span className={styles.eyebrow}>MOJE SLOVA</span><h2>Jak chci, aby můj život vypadal a jak se v něm chci cítit?</h2><p>Nepiš reklamní slogan. Popiš obyčejné chvíle, ve kterých poznáš, že žiješ více podle sebe.</p></header>
          {VISION_FIELDS.map((item, index) => (
            <label key={item.id}>
              <span><i>{index + 1}</i><strong>{item.label}</strong></span>
              <small>{item.prompt}</small>
              <textarea value={data[item.id]} placeholder={item.placeholder} onChange={(event) => updateField(item.id, event.target.value)} />
            </label>
          ))}
        </div>

        <aside className={flow.writtenVision}>
          <span className={styles.eyebrow}>MŮJ PSANÝ VISION BOARD</span>
          <h2>Život, který chci postupně tvořit.</h2>
          <div className={flow.writtenVisionImage}>
            {data.image ? <img src={data.image} alt="Tvoje vlastní obrazová vize" /> : <img src="/prostor-assets/identity-day-20.png" alt="Ručně kreslený klidný prostor pro budoucí vizi" />}
          </div>
          {VISION_FIELDS.map((item) => (
            <article key={item.id}>
              <small>{item.label}</small>
              <p>{data[item.id] || "Tahle část ještě čeká na tvoje slova."}</p>
            </article>
          ))}
        </aside>
      </section>

      <section className={flow.visionAssistant}>
        <div>
          <span className={styles.eyebrow}>OBRAZOVÝ ASISTENT</span>
          <h2>Tvoje odpovědi jsme přeložili do jednoho zadání pro tvorbu obrazu.</h2>
          <p>Zadání si zkopíruj a otevři ChatGPT. Požádej ho o vytvoření obrázku. Když první výsledek nebude působit jako ty, řekni mu, co chceš přidat, ubrat nebo změnit. Nemusíš přijmout první návrh.</p>
          <div className={flow.visionAssistantActions}>
            <button className={styles.primaryButton} onClick={copyPrompt}>{copied ? "Zadání je zkopírované ✓" : "Zkopírovat zadání pro obraz"}</button>
            <WebOnly>
              <a className={flow.visionChatLink} href="https://chatgpt.com/" target="_blank" rel="noreferrer">Otevřít ChatGPT</a>
            </WebOnly>
          </div>
        </div>
        <pre>{prompt}</pre>
      </section>

      <section className={flow.visionUpload}>
        <div>
          <span className={styles.eyebrow}>VRAŤ OBRAZ DO SVÉHO KOMPASU</span>
          <h2>Nahraj výsledný obrázek. Psaná i obrazová vize zůstanou spolu.</h2>
          <p>Obrázek není smlouva s budoucností. Je to vizuální připomínka toho, čemu chceš dávat pozornost a jaký život chceš svými kroky podporovat.</p>
          <label className={flow.visionUploadButton}>{data.image ? "Nahrát jinou verzi" : "Nahrát moji obrazovou vizi"}<input type="file" accept="image/*" onChange={(event) => uploadVision(event.target.files?.[0])} /></label>
          {data.image ? <button className={flow.visionRemove} onClick={() => updateField("image", "")}>Odebrat obrázek</button> : null}
        </div>
        <figure className={data.image ? flow.visionResultReady : ""}>
          {data.image ? <img src={data.image} alt="Tvoje vlastní obrazová vize" /> : <><img src="/prostor-assets/identity-day-21.png" alt="Ručně kreslená cesta přes most směrem k vizi" /><figcaption>Tady se objeví tvoje vlastní obrazová vize.</figcaption></>}
        </figure>
      </section>

      <section className={flow.visionClosing}>
        <img src="/prostor-assets/identity-day-18.png" alt="Ručně kreslený most směrem ke slunci" />
        <div>
          <span className={styles.eyebrow}>TOHLE NENÍ KONEC</span>
          <h2>Dovol si snít ve velkém. Potom udělej jeden skutečný krok.</h2>
          <p>Ne proto, abys utekl od života, který máš. Ale abys dal směr životu, který chceš postupně tvořit. Přeju ti, aby sis svoji vizi nemusel zmenšovat jen proto, že k ní ještě nevidíš celou cestu.</p>
          <div className={styles.handNote}>Drž vizi dostatečně vysoko.<br /><mark>Další krok nech dostatečně blízko.</mark></div>
          <button className={flow.inlineLink} onClick={() => onNavigate("identita-mapa")}>Vrátit se k osobnímu kompasu</button>
        </div>
      </section>
    </section>
  );
}

type ModuleLessonProps = {
  day: number;
  onNavigate: (view: View) => void;
  onComplete: (day: number) => void;
  readDays: number[];
  practiceEntries: PracticeEntry[];
  onSavePractice: (entry: PracticeEntry) => void;
  onDeletePractice: (day: number) => void;
};

function Lesson(props: ModuleLessonProps) {
  const day = props.day;
  return <ModuleLesson {...props} lesson={getEmotionLesson(day)} dayMeta={EMOTION_DAYS[day - 1]} totalDays={21} backView="cesta" finalView="mapa" finalLabel="Otevřít celý emoční manuál" showQuickRecord />;
}

function NeedsLesson(props: ModuleLessonProps) {
  const day = props.day;
  return <ModuleLesson {...props} lesson={getNeedsLesson(day)} dayMeta={NEEDS_DAYS[day - 1]} totalDays={21} backView="potreby" finalView="potreby-mapa" finalLabel="Otevřít můj manuál potřeb" />;
}

function ValuesLesson(props: ModuleLessonProps) {
  const day = props.day;
  return <ModuleLesson {...props} lesson={getValuesLesson(day)} dayMeta={VALUES_DAYS[day - 1]} totalDays={21} backView="hodnoty" finalView="hodnoty-mapa" finalLabel="Otevřít můj hodnotový manifest" />;
}

function IdentityLesson(props: ModuleLessonProps) {
  const day = props.day;
  return <ModuleLesson {...props} lesson={getIdentityLesson(day)} dayMeta={IDENTITY_DAYS[day - 1]} totalDays={21} backView="identita" finalView="identita-mapa" finalLabel="Otevřít můj osobní kompas" />;
}

function ModuleLesson({ day, onNavigate, onComplete, readDays, practiceEntries, onSavePractice, onDeletePractice, lesson, dayMeta, totalDays, backView, finalView, finalLabel, showQuickRecord = false }: ModuleLessonProps & { lesson: EmotionLesson; dayMeta: (typeof EMOTION_DAYS)[number]; totalDays: number; backView: View; finalView: View; finalLabel: string; showQuickRecord?: boolean }) {
  const isRead = readDays.includes(day);
  const existingPractice = practiceEntries.find((entry) => entry.day === day);
  const practiceExample = getPracticeExample(backView, day);
  const [practiceAnswer, setPracticeAnswer] = useState(existingPractice?.answer ?? "");
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string | string[] | number>>(existingPractice?.answers ?? {});
  const [showPracticeExample, setShowPracticeExample] = useState(false);
  const practiceWhyBullets = lesson.practice.whyBullets?.length
    ? lesson.practice.whyBullets
    : lesson.practice.why
        .split(/(?<=[.!?])\s+/u)
        .map((bullet) => bullet.trim())
        .filter(Boolean);

  useEffect(() => {
    const existing = practiceEntries.find((entry) => entry.day === day);
    setPracticeAnswer(existing?.answer ?? "");
    setPracticeAnswers(existing?.answers ?? {});
    setShowPracticeExample(false);
  }, [day, practiceEntries]);

  useEffect(() => {
    const nextLesson =
      day >= totalDays
        ? null
        : backView === "hodnoty"
          ? getValuesLesson(day + 1)
          : backView === "identita"
            ? getIdentityLesson(day + 1)
            : backView === "potreby"
              ? getNeedsLesson(day + 1)
              : getEmotionLesson(day + 1);
    [lesson.illustration.src, nextLesson?.illustration.src]
      .filter((src): src is string => Boolean(src))
      .forEach((src) => {
        const image = new Image();
        image.fetchPriority = "high";
        image.decoding = "async";
        image.src = src;
      });
  }, [backView, day, lesson.illustration.src, totalDays]);

  const structuredPractice = Boolean(lesson.practice.fields?.length);
  const applyPracticeExample = () => {
    if (!practiceExample) return;
    if (practiceExample.answers) {
      const filledIds = Object.entries(practiceExample.answers).filter(([id]) => {
        const existing = practiceAnswers[id];
        return existing === undefined || existing === "" || (Array.isArray(existing) && existing.length === 0);
      }).map(([id]) => id);
      setPracticeAnswers((current) => {
        const next = { ...current };
        filledIds.forEach((id) => {
          const value = practiceExample.answers?.[id];
          if (value !== undefined) next[id] = value;
        });
        return next;
      });
    }
    if (practiceExample.answer && !practiceAnswer.trim()) {
      setPracticeAnswer(practiceExample.answer);
    }
    setShowPracticeExample(true);
  };
  const structuredPracticeValid = lesson.practice.fields?.every((field) => {
    if (!field.required) return true;
    const value = practiceAnswers[field.id];
    return Array.isArray(value) ? value.length > 0 : String(value ?? "").trim().length > 0;
  }) ?? false;
  const isOriginalDoodle =
    lesson.illustration.src.includes("kk-hand-drawn-doodle") ||
    lesson.illustration.src.includes("needs-day") ||
    lesson.illustration.src.includes("values-day") ||
    lesson.illustration.src.includes("identity-day");
  const hasValuesSheetBottomEdge =
    lesson.illustration.src.includes("values-day") &&
    day >= 13 &&
    day <= 20;
  const storyModule = VIEW_MODULE[backView] ?? "emotion";
  const storyPhotoClass =
    storyModule === "needs"
      ? flow.storyPhotoNeeds
      : storyModule === "values"
        ? flow.storyPhotoValues
        : storyModule === "identity"
          ? flow.storyPhotoIdentity
          : flow.storyPhotoEmotions;

  const savePractice = (event: FormEvent) => {
    event.preventDefault();
    if (structuredPractice) {
      if (!structuredPracticeValid) return;
      onSavePractice({ day, question: lesson.practice.prompt, answers: practiceAnswers, updatedAt: new Date().toISOString() });
      return;
    }
    const answer = practiceAnswer.trim();
    if (!answer) return;
    onSavePractice({ day, question: lesson.practice.prompt, answer, updatedAt: new Date().toISOString() });
  };

  return (
    <article className={flow.lessonPage}>
      <nav className={flow.lessonNav} aria-label="Navigace lekcí">
        <button type="button" onClick={() => onNavigate(backView)}>← Zpět na cestu</button>
        <div><span>{isRead ? `DEN ${day} · PŘEČTENO ✓` : `DEN ${day} Z ${totalDays}`}</span><i><b style={{ width: `${(day / totalDays) * 100}%` }} /></i></div>
        <small>{minuteLabel(dayMeta.minutes).toUpperCase()}</small>
      </nav>

      <section className={flow.storySection}>
        <div className={flow.storyCopy}>
          <span className={styles.eyebrow}>{lesson.opening.eyebrow}</span>
          <h1>{lesson.opening.title}</h1>
          {lesson.opening.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className={flow.storyVisual}>
          <span className={flow.mobileStoryEyebrow}>Kristiánův vstup</span>
          <img
            className={`${flow.storyPhoto} ${storyPhotoClass}`}
            src={STORY_PHOTO_BY_MODULE[storyModule]}
            alt={`Kristián Karban, průvodce modulem ${storyModule === "emotion" ? "Emoce" : storyModule === "needs" ? "Potřeby" : storyModule === "values" ? "Hodnoty" : "Identita a vize"}`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <p>{dayMeta.focus}</p>
        </div>
      </section>

      <section className={flow.recognitionSection}>
        <header><span className={styles.eyebrow}>POZNÁVÁŠ SE V TOM?</span><h2>{lesson.recognition.title}</h2></header>
        <div>{lesson.recognition.items.map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div>
      </section>

      <section className={flow.educationSection}>
        <div className={flow.educationCopy}>
          <header className={flow.educationHeader}>
            <span className={styles.eyebrow}>POJĎME TOMU ROZUMĚT</span>
            <h2>{lesson.education.title}</h2>
          </header>
          <div className={flow.educationText}>
            {lesson.education.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {lesson.education.bullets?.length ? (
            <ul className={flow.educationBullets}>
              {lesson.education.bullets.map((bullet) => (
                <li key={bullet.title}>
                  <span aria-hidden="true" />
                  <div>
                    <strong>{bullet.title}</strong>
                    <p>{bullet.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <figure>
          <img
            className={[
              isOriginalDoodle ? flow.originalDoodle : "",
              hasValuesSheetBottomEdge ? flow.valuesSheetBottomEdge : "",
            ].filter(Boolean).join(" ") || undefined}
            src={lesson.illustration.src}
            alt={lesson.illustration.alt}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
          <figcaption>{lesson.illustration.caption}</figcaption>
        </figure>
      </section>

      <aside className={flow.expertBox}>
        <div className={flow.expertIcon} aria-hidden="true"><span>i</span></div>
        <div className={flow.expertContent}>
          <header className={flow.expertHeader}>
            <span className={styles.eyebrow}>CO SE DĚJE POD POVRCHEM · {lesson.expert.field}</span>
            <h2>{lesson.expert.title}</h2>
          </header>
          <div className={flow.expertText}>
            {lesson.expert.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={flow.expertAside}>
            <p className={flow.expertLimit}><strong>Co z toho nelze automaticky vyvozovat:</strong> {lesson.expert.limit}</p>
          </div>
        </div>
      </aside>

      <section className={flow.practiceSection}>
        <div className={flow.practiceIntro}>
          <span className={styles.eyebrow}>TEĎ SI TO VYZKOUŠEJ</span>
          <h2>{lesson.practice.title}</h2>
          <ul className={flow.practiceIntroBullets}>
            {practiceWhyBullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
          <div className={flow.practicePrompt}><small>DNEŠNÍ OTÁZKA</small><strong>{lesson.practice.prompt}</strong></div>
        </div>
        <div className={flow.practiceSteps}>
          <span className={styles.eyebrow}>
            {backView === "hodnoty" || backView === "identita" ? "OTÁZKY K ZASTAVENÍ" : "JAK NA TO"}
          </span>
          <ol>{lesson.practice.steps.map((step) => <li key={step}><span>{step}</span></li>)}</ol>
        </div>
        <form className={flow.practiceEntry} onSubmit={savePractice}>
          <div><span className={styles.eyebrow}>TVŮJ ZÁZNAM</span><p>Odpověď se uloží k tomuto dni a postupně se objeví v tvojí osobní mapě.</p></div>
          {practiceExample ? (
            <button
              type="button"
              className={`${flow.practiceHintButton} ${showPracticeExample ? flow.practiceHintButtonActive : ""}`}
              onClick={applyPracticeExample}
              aria-pressed={showPracticeExample}
            >
              <span aria-hidden="true">?</span>
              <span>
                <strong>{showPracticeExample ? "Nápověda je vyplněná ✓" : "Potřebuju nápovědu"}</strong>
                <small>Ukázkovou odpověď doplníme jen do prázdných polí. Můžeš ji celou přepsat po svém.</small>
              </span>
            </button>
          ) : null}
          {structuredPractice ? (
            <PracticeFields
              fields={lesson.practice.fields ?? []}
              answers={practiceAnswers}
              onChange={setPracticeAnswers}
              hints={showPracticeExample ? practiceExample?.answers : undefined}
            />
          ) : (
            <label>
              <span>{lesson.practice.prompt}</span>
              <textarea
                className={showPracticeExample && practiceExample?.answer ? flow.practiceHintField : undefined}
                value={practiceAnswer}
                onChange={(event) => setPracticeAnswer(event.target.value)}
                rows={Math.max(4, Math.ceil(practiceAnswer.length / 70))}
                placeholder={showPracticeExample && practiceExample?.answer ? `NÁPOVĚDA · ${practiceExample.answer}` : "Napiš první poctivou odpověď. Klidně jen: „Zatím nevím.“"}
              />
            </label>
          )}
          <div className={flow.practiceEntryActions}>
            <button className={styles.primaryButton} type="submit" disabled={structuredPractice ? !structuredPracticeValid : !practiceAnswer.trim()}>{existingPractice ? "Aktualizovat v mapě" : "Uložit do mojí mapy"}</button>
            {existingPractice ? <button className={flow.deletePractice} type="button" onClick={() => onDeletePractice(day)}>Smazat tento záznam</button> : null}
          </div>
        </form>
      </section>

      <footer className={flow.lessonFooter}>
        <div className={flow.lessonClosing}>{lesson.closing[0]}<br /><mark>{lesson.closing[1]}</mark></div>
        <div className={flow.lessonActions}>
          <button className={styles.primaryButton} onClick={() => isRead && day === totalDays ? onNavigate(finalView) : onComplete(day)}>{isRead ? day < totalDays ? `Přečteno ✓ · Otevřít den ${day + 1}` : `Přečteno ✓ · ${finalLabel}` : day < totalDays ? "Dokončit den a pokračovat" : "Dokončit etapu a otevřít mapu"}</button>
          {showQuickRecord ? <button className={flow.inlineLink} onClick={() => onNavigate("zaznam")}>Zapsat dnešní zastavení</button> : null}
        </div>
      </footer>
    </article>
  );
}

type PracticeField = NonNullable<EmotionLesson["practice"]["fields"]>[number];

function PracticeFields({ fields, answers, onChange, hints }: { fields: PracticeField[]; answers: Record<string, string | string[] | number>; onChange: (answers: Record<string, string | string[] | number>) => void; hints?: Record<string, string | string[] | number> }) {
  const update = (id: string, value: string | string[] | number) => {
    const next = { ...answers, [id]: value };
    fields.filter((field) => field.dependsOn === id).forEach((field) => { delete next[field.id]; });
    onChange(next);
  };
  const toggle = (field: PracticeField, value: string) => {
    const current = Array.isArray(answers[field.id]) ? answers[field.id] as string[] : [];
    const selected = current.includes(value);
    if (selected) {
      update(field.id, current.filter((item) => item !== value));
      return;
    }
    const withoutUnknown = value === "nevím" ? [] : current.filter((item) => item !== "nevím");
    if (field.maxSelections && withoutUnknown.length >= field.maxSelections) return;
    update(field.id, value === "nevím" ? [value] : [...withoutUnknown, value]);
  };

  return (
    <div className={flow.structuredPractice}>
      {fields.map((field) => {
        const value = answers[field.id];
        const hintValue = hints?.[field.id];
        const hintText = Array.isArray(hintValue) ? hintValue.join(", ") : hintValue === undefined ? "" : String(hintValue);
        const isExampleText = Boolean(hintText);
        if (field.type === "family-select" || field.type === "family-multiselect") {
          const selected = field.type === "family-multiselect" && Array.isArray(value) ? value : [];
          return (
            <fieldset key={field.id} className={flow.practiceChoiceField}>
              <legend>{field.label}</legend>
              <div>{FAMILIES.map((family) => {
                const active = field.type === "family-multiselect" ? selected.includes(family.id) : value === family.id;
                return <button key={family.id} type="button" className={active ? flow.practiceChoiceActive : ""} onClick={() => field.type === "family-multiselect" ? toggle(field, family.id) : update(field.id, family.id)}><i style={{ background: family.color }} /><span>{family.label}</span></button>;
              })}<button type="button" className={(field.type === "family-multiselect" ? selected.includes("nevím") : value === "nevím") ? flow.practiceChoiceActive : ""} onClick={() => field.type === "family-multiselect" ? toggle(field, "nevím") : update(field.id, "nevím")}><i className={flow.unknownDot}>?</i><span>Nevím</span></button></div>
            </fieldset>
          );
        }

        if (field.type === "emotion-multiselect") {
          const selected = Array.isArray(value) ? value : [];
          const familyId = field.dependsOn ? answers[field.dependsOn] : "";
          const words = FAMILIES.find((family) => family.id === familyId)?.words ?? FAMILIES.flatMap((family) => family.words);
          return (
            <fieldset key={field.id} className={flow.practiceChoiceField}>
              <legend>{field.label}</legend>
              <div>{words.map((word) => <button key={word} type="button" className={selected.includes(word) ? flow.practiceChoiceActive : ""} onClick={() => toggle(field, word)}>{word}</button>)}<button type="button" className={selected.includes("nevím") ? flow.practiceChoiceActive : ""} onClick={() => toggle(field, "nevím")}>nevím</button></div>
            </fieldset>
          );
        }

        if (field.type === "scale") {
          return (
            <fieldset key={field.id} className={flow.practiceScale}>
              <legend>{field.label}</legend>
              <div>{[1, 2, 3, 4, 5].map((number) => <button type="button" key={number} className={value === number ? flow.practiceScaleActive : ""} onClick={() => update(field.id, number)}>{number}</button>)}</div>
            </fieldset>
          );
        }

        return (
          <label key={field.id} htmlFor={`practice-${field.id}`}>
            <span>{field.label}</span>
            {field.type === "textarea" || isExampleText
              ? <textarea className={isExampleText ? flow.practiceHintField : undefined} id={`practice-${field.id}`} value={String(value ?? "")} onChange={(event) => update(field.id, event.target.value)} rows={Math.max(3, Math.ceil(String(value ?? "").length / 58))} placeholder={hintText ? `NÁPOVĚDA · ${hintText}` : field.placeholder} />
              : <input id={`practice-${field.id}`} value={String(value ?? "")} onChange={(event) => update(field.id, event.target.value)} placeholder={field.placeholder} />}
          </label>
        );
      })}
    </div>
  );
}

function EmotionRecord({ day, onSave }: { day: number; onSave: (entry: EmotionEntry) => void }) {
  const [family, setFamily] = useState<EmotionFamily>("vztek");
  const selected = FAMILIES.find((item) => item.id === family)!;
  const [emotion, setEmotion] = useState(selected.words[0]);
  const [situation, setSituation] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [intensity, setIntensity] = useState(3);

  const chooseFamily = (next: EmotionFamily) => {
    const nextFamily = FAMILIES.find((item) => item.id === next)!;
    setFamily(next);
    setEmotion(nextFamily.words[0]);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSave({ id: crypto.randomUUID(), day, family, emotion, intensity, situation: situation || "Běžný okamžik dne", body: body || "zatím nevím", response: response || "zatím nevím", createdAt: new Date().toISOString() });
  };

  return (
    <section>
      <PageIntro eyebrow="RYCHLÝ ZÁZNAM · 60 AŽ 90 SEKUND" title="Co se v tobě právě odehrálo?" text="Není to test a nemusíš si být jistý. Zachyť jednu konkrétní chvíli tak, jak ji teď dokážeš vidět." />
      <form className={styles.recordLayout} onSubmit={submit}>
        <div className={styles.wheelPanel}>
          <header><span className={styles.eyebrow}>1 · VYBER NEJBLIŽŠÍ RODINU</span><p>Začni široce. Přesnější slovo vybereš potom.</p></header>
          <EmotionWheel selected={family} onSelect={chooseFamily} />
        </div>
        <div className={styles.recordForm}>
          <label><span>Co se stalo?</span><textarea value={situation} onChange={(event) => setSituation(event.target.value)} placeholder="Jedna konkrétní situace. Třeba: „Přišla mi zpráva od kolegy.“" /></label>
          <fieldset><legend>2 · KTERÉ SLOVO JE O KROK BLÍŽ?</legend><div className={styles.wordChoices}>{selected.words.map((word) => <button type="button" key={word} className={emotion === word ? styles.selectedWord : ""} onClick={() => setEmotion(word)}>{word}</button>)}<button type="button" className={emotion === "nevím" ? styles.selectedWord : ""} onClick={() => setEmotion("nevím")}>nevím</button></div></fieldset>
          <label className={styles.range}><span>Jak silné to bylo?</span><div><small>slabé</small><input type="range" min="1" max="5" value={intensity} onChange={(event) => setIntensity(Number(event.target.value))} /><strong>{intensity}</strong><small>silné</small></div></label>
          <div className={styles.twoColumns}><label><span>Kde jsi to poznal v těle?</span><input value={body} onChange={(event) => setBody(event.target.value)} placeholder="Třeba čelist, dech, žaludek" /></label><label><span>Co jsi potom udělal?</span><input value={response} onChange={(event) => setResponse(event.target.value)} placeholder="Třeba stáhl jsem se, odpověděl" /></label></div>
          <div className={styles.formFooter}><p>Můžeš napsat „nevím“. I to je použitelná informace.</p><button className={styles.primaryButton} type="submit">Uložit záznam</button></div>
        </div>
      </form>
    </section>
  );
}

function History({ entries, onNavigate }: { entries: EmotionEntry[]; onNavigate: (view: View) => void }) {
  return (
    <section>
      <div className={flow.historyHeader}>
        <PageIntro eyebrow="MOJE ZÁZNAMY" title="Nemusíš si všechno pamatovat. Postupně se můžeš podívat, co se vrací." text="Každý záznam je jedna zachycená chvíle. Význam začne vznikat až z více dní, ne z jediné odpovědi." />
        <button onClick={() => onNavigate("zaznam")}>PŘIDAT ZÁZNAM</button>
      </div>
      {entries.length === 0 ? <article className={flow.historyEmpty}><h2>Zatím tu není žádný záznam.</h2><p>To není rest. Až si všimneš jedné konkrétní chvíle, vrať se a zachyť ji během minuty.</p></article> : <div className={flow.historyList}>{entries.map((entry) => {
        const family = FAMILIES.find((item) => item.id === entry.family)!;
        return <article className={flow.historyItem} key={entry.id}><span>{entry.day}</span><i style={{ background: family.color }} /><div><strong>{entry.emotion}</strong><p>{entry.situation}</p><small>Tělo: {entry.body} · Reakce: {entry.response}</small></div><b>{entry.intensity}/5</b></article>;
      })}</div>}
    </section>
  );
}

function EmotionMap({ entries, practiceEntries, readDays, onNavigate }: { entries: EmotionEntry[]; practiceEntries: PracticeEntry[]; readDays: number[]; onNavigate: (view: View) => void }) {
  const stats = useMemo(() => FAMILIES.map((family) => ({ ...family, count: entries.filter((entry) => entry.family === family.id).length })).sort((a, b) => b.count - a.count), [entries]);
  const max = Math.max(...stats.map((item) => item.count), 1);
  const top = stats[0];
  const average = entries.length ? entries.reduce((sum, entry) => sum + entry.intensity, 0) / entries.length : 0;
  const bodySignal = mostCommon(entries.map((entry) => entry.body).filter((value) => value !== "zatím nevím"));
  const hasData = entries.length > 0;
  const firstWeekComplete = readDays.filter((day) => day <= 7).length === 7;
  const secondWeekComplete = readDays.filter((day) => day >= 8 && day <= 14).length === 7;
  const thirdWeekComplete = readDays.filter((day) => day >= 15 && day <= 21).length === 7;
  const day14 = practiceEntries.find((entry) => entry.day === 14);
  const day21 = practiceEntries.find((entry) => entry.day === 21);
  const easyWords = practiceValue(day14, "easyWords");
  const surprisingWord = practiceValue(day14, "surprisingWord");
  const hardArea = practiceValue(day14, "hardArea");
  const nextFocus = practiceValue(day14, "nextFocus");
  const repeatingSituation = practiceValue(day21, "repeatingSituation");
  const mappedEmotion = practiceValue(day21, "emotion");
  const earlySignal = practiceValue(day21, "earlySignal");
  const usualAction = practiceValue(day21, "usualAction");
  const shortRelief = practiceValue(day21, "shortRelief");
  const impact = practiceValue(day21, "impact");
  const choicePoint = practiceValue(day21, "choicePoint");
  const nextQuestion = practiceValue(day21, "nextQuestion");
  const exactWords = entries.filter((entry) => entry.day >= 8 && entry.day <= 14 && entry.emotion !== "nevím").map((entry) => entry.emotion);
  const commonExactWords = topValues(exactWords, 4);
  const unknownCount = entries.filter((entry) => entry.day >= 8 && entry.day <= 14 && entry.emotion === "nevím").length;
  const meaningfulBodySignals = entries.filter((entry) => entry.body && entry.body !== "zatím nevím").length;
  const progress = Math.min(readDays.length, 21);
  const chapters = [
    { number: "01", title: "Všímám si", days: "Dny 1 až 7", completed: readDays.filter((day) => day <= 7).length, total: 7 },
    { number: "02", title: "Pojmenovávám", days: "Dny 8 až 14", completed: readDays.filter((day) => day >= 8 && day <= 14).length, total: 7 },
    { number: "03", title: "Vidím svůj vzorec", days: "Dny 15 až 21", completed: readDays.filter((day) => day >= 15 && day <= 21).length, total: 7 },
  ];
  const badges = [
    { icon: "pause", title: "První zastavení", description: "Zachytil jsi první konkrétní chvíli.", unlocked: readDays.length >= 1 || entries.length >= 1, locked: "Odemkne první zastavení" },
    { icon: "eye", title: "Pozorovatel", description: "Máš tři chvíle, ze kterých už může vznikat souvislost.", unlocked: entries.length >= 3, locked: `Ještě ${Math.max(0, 3 - entries.length)} záznamy` },
    { icon: "body", title: "Čtu tělo", description: "U tří záznamů sis všiml tělesného signálu.", unlocked: meaningfulBodySignals >= 3, locked: `Ještě ${Math.max(0, 3 - meaningfulBodySignals)} tělesné signály` },
    { icon: "words", title: "Hledám přesněji", description: "Místo obecného pocitu hledáš bližší slovo.", unlocked: readDays.includes(9) || exactWords.length >= 3, locked: "Odemkne se při hledání bližších slov" },
    { icon: "paths", title: "Dvě možnosti", description: "Dokážeš chvíli podržet víc než jeden možný výklad.", unlocked: readDays.includes(11) || practiceEntries.some((entry) => entry.day === 11), locked: "Odemkne se ve druhé etapě" },
    { icon: "map", title: "Můj slovník", description: "Dokončil jsi první osobní mapu emočních slov.", unlocked: secondWeekComplete, locked: "Odemkne se po dni 14" },
    { icon: "pattern", title: "Vidím opakování", description: "Propojil jsi několik situací jednou společnou nití.", unlocked: readDays.includes(15) || practiceEntries.some((entry) => entry.day === 15), locked: "Odemkne se při hledání společné nitě" },
    { icon: "signal", title: "Znám první signál", description: "Pojmenoval jsi změnu, která přichází před známou reakcí.", unlocked: readDays.includes(16) || practiceEntries.some((entry) => entry.day === 16), locked: "Odemkne se po zachycení časného signálu" },
    { icon: "choice", title: "Mám místo pro volbu", description: "Navrhl jsi malou odbočku, kterou můžeš opravdu vyzkoušet.", unlocked: readDays.includes(20) || practiceEntries.some((entry) => entry.day === 20), locked: "Odemkne se po návrhu první odbočky" },
    { icon: "manual", title: "Můj emoční manuál", description: "Propojil jsi všechny tři etapy do první osobní mapy.", unlocked: thirdWeekComplete, locked: "Odemkne se po dni 21" },
  ];
  const unlockedBadges = badges.filter((badge) => badge.unlocked).length;

  return (
    <section className={flow.dashboardTypography}>
      <section className={flow.mapGameHero}>
        <div className={flow.mapGameCopy}>
          <span className={styles.eyebrow}>MOJE EMOČNÍ MAPA</span>
          <h1>Tvoje mapa ožívá s každým poctivým zastavením.</h1>
          <p>Nesbíráš správné odpovědi. Odemýkáš dovednosti, díky kterým dokážeš zachytit sebe o chvíli dřív.</p>
          <div className={flow.mapGameStats}>
            <div><strong>{unlockedBadges}</strong><span>z {badges.length} odznaků</span></div>
            <div><strong>{entries.length}</strong><span>zachycených chvil</span></div>
          </div>
        </div>
        <div className={flow.mapProgressRing} style={{ "--map-progress": `${(progress / 21) * 360}deg` } as CSSProperties}>
          <div><strong>{progress}</strong><span>z 21 dní<br />objeveno</span></div>
        </div>
      </section>

      <section className={flow.journeyBoard}>
        <header><span className={styles.eyebrow}>TVOJE CESTA</span><p>Každá kapitola přidává mapě další vrstvu.</p></header>
        <div className={flow.journeyChapters}>
          {chapters.map((chapter, index) => {
            const done = chapter.completed === chapter.total;
            const active = chapter.completed > 0 && !done;
            return <article key={chapter.number} className={done ? flow.chapterDone : active ? flow.chapterActive : ""}>
              <div className={flow.chapterMedal}>{done ? "✓" : chapter.number}</div>
              <span>{chapter.days}</span>
              <strong>{chapter.title}</strong>
              <div className={flow.chapterProgress}><i style={{ width: `${(chapter.completed / chapter.total) * 100}%` }} /></div>
              <small>{done ? "Kapitola dokončena" : `${chapter.completed} ze ${chapter.total} dní objeveno`}</small>
              {index < chapters.length - 1 ? <b aria-hidden="true" /> : null}
            </article>;
          })}
        </div>
      </section>

      <section className={flow.badgeShelf}>
        <header><div><span className={styles.eyebrow}>CO UŽ UMÍŠ</span><h2>Odznaky za dovednosti, které si opravdu odnášíš.</h2></div><p>Žádný z nich neříká, že jsi lepší člověk. Jen ti připomíná, co už dokážeš zachytit.</p></header>
        <div className={flow.badgeGrid}>
          {badges.map((badge) => <article key={badge.title} className={badge.unlocked ? flow.badgeUnlocked : flow.badgeLocked}>
            <div className={flow.badgeIcon}><SkillBadgeIcon name={badge.icon} />{badge.unlocked ? <i>✓</i> : null}</div>
            <span>{badge.unlocked ? "ODEMČENO" : "JEŠTĚ ČEKÁ"}</span>
            <strong>{badge.title}</strong>
            <p>{badge.unlocked ? badge.description : badge.locked}</p>
          </article>)}
        </div>
      </section>

      {firstWeekComplete || secondWeekComplete || thirdWeekComplete ? <div className={flow.mapMilestone}><i>✓</i><div><strong>{thirdWeekComplete ? "Modul Emoce je dokončený." : secondWeekComplete ? "Druhá etapa je dokončená." : "První etapa je dokončená."}</strong><span>{thirdWeekComplete ? "Tvoje mapa teď obsahuje první verzi osobního emočního manuálu." : secondWeekComplete ? "Do mapy se přidal tvůj první emoční slovník." : "Tahle mapa teď obsahuje tvoje první týdenní ohlédnutí."}</span></div></div> : null}
      <div className={styles.mapLayout}>
        <article className={styles.frequencyCard}><div className={styles.cardMeta}><span>NEJČASTĚJI ZAZNAMENANÉ</span><strong>{entries.length} ZÁZNAMŮ</strong></div><div className={styles.bars}>{stats.map((item) => <div key={item.id}><div><span style={{ background: item.color }} /><strong>{item.label}</strong><small>{item.count}×</small></div><i><b style={{ width: `${(item.count / max) * 100}%`, background: item.color }} /></i></div>)}</div></article>
        <article className={`${styles.mapInsight} ${flow.mapInsightSpacing}`}><span className={styles.eyebrow}>CO UŽ MŮŽE BÝT VIDĚT</span><h2>{hasData ? `${top.label} se zatím objevuje nejčastěji.` : "Nejdřív potřebujeme několik zachycených chvil."}</h2><p>{hasData ? "To samo o sobě není dobře ani špatně. Je to první stopa, ke které se můžeš vrátit a hledat souvislosti ve svých vlastních situacích." : "Jedna emoce ještě nevytváří vzorec. Zkus během několika dní zachytit konkrétní situace a mapa začne vznikat sama."}</p><blockquote>{hasData ? "Co bývá v takových chvílích nejtěžší?" : "Nejdřív sbírej. Potom teprve vykládej."}</blockquote><small>Tohle je otázka k pozorování, ne hotový výklad.</small></article>
      </div>
      <div className={`${styles.mapDetails} ${flow.mapDetailsSpacing}`}>
        <article><span>ČASTÝ TĚLESNÝ SIGNÁL</span><strong>{bodySignal || "Zatím nevíme"}</strong><p>{bodySignal ? "Tento signál se ve tvých záznamech objevil nejčastěji." : "Zkus si příště všimnout čelisti, dechu, ramen nebo žaludku."}</p></article>
        <article><span>PRŮMĚRNÁ INTENZITA</span><strong>{hasData ? `${average.toFixed(1).replace(".", ",")} z 5` : "Bez dat"}</strong><p>Číslo není známka. Pomáhá sledovat, kdy si emoce obvykle všimneš.</p></article>
        <article><span>DALŠÍ MALÝ KROK</span><strong>Všimnout si těla</strong><p>Jednou denně se zastav ještě předtím, než hledáš název emoce.</p></article>
      </div>
      {secondWeekComplete ? (
        <section className={flow.emotionDictionary}>
          <header>
            <span className={styles.eyebrow}>MŮJ EMOČNÍ SLOVNÍK</span>
            <h2>Ukazuje slova, která jsi použil. Neříká, jaký jsi člověk.</h2>
            <p>Slovník vychází jen z tvých uložených záznamů a odpovědí. S dalšími dny se může proměnit.</p>
          </header>
          <div className={flow.dictionaryGrid}>
            <article><span>ČASTO POUŽITÁ SLOVA</span><strong>{commonExactWords.length ? commonExactWords.join(" · ") : easyWords || "Zatím bez dostatku záznamů"}</strong><p>Četnost je pozorování, ne diagnóza.</p></article>
            <article><span>PŘEKVAPIVÉ SLOVO</span><strong>{surprisingWord || "Zatím nevybráno"}</strong><p>Slovo, které ti během týdne otevřelo novou možnost.</p></article>
            <article><span>KDE ZATÍM VÁHÁM</span><strong>{hardArea || `${unknownCount}× odpověď „nevím“`}</strong><p>„Nevím“ je platná součást mapy.</p></article>
            <article><span>OTÁZKA PRO DALŠÍ TÝDEN</span><strong>{nextFocus || "Co se u mě začíná opakovat?"}</strong><p>Tuhle otázku si vezmeš do třetí etapy.</p></article>
          </div>
        </section>
      ) : null}
      {thirdWeekComplete ? (
        <section className={flow.personalManual}>
          <header>
            <span className={styles.eyebrow}>MŮJ EMOČNÍ MANUÁL</span>
            <h2>Jedna konkrétní mapa toho, jak se u tebe může rozběhnout známá reakce.</h2>
            <p>Každá část vychází z tvojí odpovědi ve dni 21. Můžeš ji později upravit, až si všimneš něčeho nového.</p>
          </header>
          <div className={flow.manualPath}>
            {[
              ["01", "KDY SE TO OZÝVÁ", repeatingSituation || "Zatím nevyplněno"],
              ["02", "CO CÍTÍM", mappedEmotion || "Zatím nevyplněno"],
              ["03", "PRVNÍ SIGNÁL", earlySignal || "Zatím nevyplněno"],
              ["04", "MŮJ OBVYKLÝ KROK", usualAction || "Zatím nevyplněno"],
              ["05", "KRÁTKÁ ÚLEVA", shortRelief || "Zatím nevyplněno"],
              ["06", "CO POTOM ZŮSTANE", impact || "Zatím nevyplněno"],
              ["07", "MÍSTO PRO VOLBU", choicePoint || "Zatím nevyplněno"],
            ].map(([number, label, value]) => <article key={number}><span>{number}</span><div><small>{label}</small><strong>{value}</strong></div></article>)}
          </div>
          <blockquote><span>OTÁZKA, KTEROU SI BERU DÁL</span><strong>{nextQuestion || "Co v takové chvíli skutečně potřebuji?"}</strong></blockquote>
        </section>
      ) : null}
      <section className={flow.practiceMap}>
        <header><span className={styles.eyebrow}>MOJE ODPOVĚDI Z TRÉNINKU</span><h2>Tohle nejsou úkoly. Jsou to věty, ke kterým se můžeš vracet.</h2><p>Každá odpověď z části „Teď si to vyzkoušej“ se ukládá k danému dni. Společně s emočními záznamy postupně skládá tvoji osobní mapu.</p></header>
        {practiceEntries.length ? <div>{practiceEntries.map((entry) => <article key={entry.day}><span>DEN {entry.day}</span><small>{entry.question}</small><p>{formatPracticeEntry(entry)}</p></article>)}</div> : <article className={flow.practiceMapEmpty}><strong>Zatím tu není žádná odpověď.</strong><p>Vrať se do dnešní lekce a zapiš první větu. Nemusí být dokonalá.</p></article>}
      </section>
      <div className={styles.mapFooter}><div className={styles.handNote}>Mapa není rozsudek.<br /><mark>Je to začátek zvědavosti.</mark></div><div><button className={flow.inlineLink} onClick={() => onNavigate("historie")}>Projít záznamy</button> <button className={styles.primaryButton} onClick={() => onNavigate("zaznam")}>Přidat další záznam</button></div></div>
    </section>
  );
}

function SkillBadgeIcon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "pause") return <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22" {...common} /><path d="M27 23v18M37 23v18" {...common} /><path d="M13 15l5 3M46 8l-2 6M54 25l-6 1" {...common} /></svg>;
  if (name === "eye") return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 33c7-12 15-18 24-18s17 6 24 18c-7 11-15 17-24 17S15 44 8 33Z" {...common} /><circle cx="32" cy="33" r="8" {...common} /><circle cx="35" cy="30" r="2.5" fill="currentColor" /></svg>;
  if (name === "body") return <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="13" r="7" {...common} /><path d="M24 23c5-3 11-3 16 0l4 15M20 38l4-15M25 25v14l-6 16M39 25v14l6 16M25 39h14" {...common} /><path d="M29 28c3 4 5 4 7 0" {...common} /></svg>;
  if (name === "words") return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 14h34v25H25l-9 8v-8h-6V14Z" {...common} /><path d="M22 23h20M22 30h13M36 43h18v-6" {...common} /></svg>;
  if (name === "paths") return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 51c9-4 14-11 18-20M31 31c5-9 10-14 20-17M31 31c6 5 12 11 18 20" {...common} /><path d="M44 13l7 1-1 7M43 48l6 3 3-6" {...common} /><circle cx="13" cy="51" r="3" fill="currentColor" /></svg>;
  if (name === "pattern") return <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="15" cy="18" r="5" {...common} /><circle cx="48" cy="18" r="5" {...common} /><circle cx="32" cy="48" r="5" {...common} /><path d="M20 19c9 1 14 6 12 24M43 21c-8 5-10 12-10 22M20 17c11-8 18-7 23-1" {...common} /><path d="M28 39l5 5 5-5" {...common} /></svg>;
  if (name === "signal") return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M16 48c5-6 8-12 8-19 0-8 4-14 10-14 8 0 12 7 12 15v18" {...common} /><path d="M28 31c3 3 6 3 9 0M14 15l5 4M31 6v7M50 14l-5 5" {...common} /><circle cx="32" cy="31" r="3" fill="currentColor" /></svg>;
  if (name === "choice") return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 50c12-5 17-13 20-22M32 28c4-9 9-14 20-17M32 28c5 7 11 14 18 23" {...common} /><path d="M45 10l7 1-1 7M44 48l6 3 3-6" {...common} /><circle cx="12" cy="50" r="3" fill="currentColor" /></svg>;
  if (name === "manual") return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M11 14c8-2 15 0 21 5 6-5 13-7 21-5v36c-8-2-15 0-21 5-6-5-13-7-21-5V14Z" {...common} /><path d="M32 19v36M17 24h9M17 31h8M38 24h9M38 31h8" {...common} /></svg>;
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M11 14c8-2 15 0 21 5 6-5 13-7 21-5v36c-8-2-15 0-21 5-6-5-13-7-21-5V14Z" {...common} /><path d="M32 19v36M17 24h9M17 31h8M38 24h9M38 31h8" {...common} /></svg>;
}

function SkillMedal({ icon, day, unlocked }: { icon: string; day: number; unlocked: boolean }) {
  return (
    <div className={flow.skillMedal} aria-label={unlocked ? "Odznak odemčen" : `Odznak se odemkne ve dni ${day}`}>
      <span className={flow.skillMedalCore}><SkillBadgeIcon name={icon} /></span>
      {unlocked ? <i aria-hidden="true">✓</i> : <b aria-hidden="true">{day}</b>}
    </div>
  );
}

function MiniWheel() {
  return <div className={styles.miniWheel}>{FAMILIES.map((family) => <span key={family.id} style={{ background: family.color }}>{family.label}</span>)}<i>?</i></div>;
}

function EmotionWheel({ selected, onSelect }: { selected: EmotionFamily; onSelect: (family: EmotionFamily) => void }) {
  return (
    <div className={styles.emotionWheel} role="group" aria-label="Základní rodiny emocí">
      <div className={styles.wheelCenter}><strong>Co je<br />nejblíž?</strong><small>nemusíš si<br />být jistý</small></div>
      {FAMILIES.map((family, index) => {
        const angle = index * 60;
        return <button type="button" key={family.id} className={selected === family.id ? styles.selectedFamily : ""} style={{ "--family": family.color, "--angle": `${angle}deg` } as CSSProperties} onClick={() => onSelect(family.id)}><strong>{family.label}</strong><small>{family.hint}</small></button>;
      })}
    </div>
  );
}

function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <header className={`${styles.pageIntro} ${flow.pageIntroSpacing}`}><span className={styles.eyebrow}>{eyebrow}</span><h1>{title}</h1><p>{text}</p></header>;
}

function mostCommon(values: string[]) {
  if (!values.length) return "";
  const counts = values.reduce<Record<string, number>>((all, value) => ({ ...all, [value]: (all[value] || 0) + 1 }), {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function practiceValue(entry: PracticeEntry | undefined, key: string) {
  const value = entry?.answers?.[key];
  if (Array.isArray(value)) return value.map(displayPracticeValue).join(", ");
  return value === undefined ? "" : displayPracticeValue(String(value));
}

function formatPracticeEntry(entry: PracticeEntry) {
  if (entry.answer) return entry.answer;
  if (!entry.answers) return "Zatím bez textové odpovědi.";
  return Object.values(entry.answers)
    .flatMap((value) => Array.isArray(value) ? value.map(displayPracticeValue) : [displayPracticeValue(String(value))])
    .filter(Boolean)
    .join(" · ");
}

function displayPracticeValue(value: string) {
  if (value === "nevím") return "nevím";
  return FAMILIES.find((family) => family.id === value)?.label ?? value;
}

function topValues(values: string[], limit: number) {
  const counts = values.reduce<Record<string, number>>((all, value) => ({ ...all, [value]: (all[value] || 0) + 1 }), {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit).map(([value]) => value);
}

function minuteLabel(value: number) {
  if (value === 1) return "1 minuta";
  if (value >= 2 && value <= 4) return `${value} minuty`;
  return `${value} minut`;
}
