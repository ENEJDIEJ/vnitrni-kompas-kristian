export type Locale = "cs" | "en" | "de";

export const LOCALE_STORAGE_KEY = "vnitrni-kompas-locale-v1";
export const SIGNED_OUT_SESSION_KEY = "vnitrni-kompas-signed-out-v1";

export const localeOptions: Array<{ value: Locale; label: string }> = [
  { value: "cs", label: "Čeština" },
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
];

const messages = {
  cs: {
    language: "Jazyk",
    save: "ULOŽIT NASTAVENÍ",
    saved: "Uloženo v tomto prohlížeči.",
    profile: "Profil",
    profileEyebrow: "TVŮJ PROFIL",
    profileTitle: "Nastavení, která dávají smysl.",
    profileDescription: "Jméno se zobrazí v levém panelu. Vše zůstává uložené jen v tomto prohlížeči.",
    name: "JMÉNO",
    preferredTime: "PREFEROVANÝ ČAS PRO SEBE",
    preferredTimeHint: "Jde o tvoji místní preferenci. Demo neposílá upozornění.",
    logout: "ODHLÁSIT SE",
    logoutHint: "Odhlásíš se ze svého účtu a vyčistíš údaje tohoto zařízení.",
    backToApp: "Zpět do Vnitřního kompasu",
    accountNavigation: "Navigace účtu",
    loginEyebrow: "VNITŘNÍ KOMPAS",
    loginTitle: "Vrať se ke svému směru.",
    loginDescription: "Přihlas se přes ChatGPT a pokračuj ve svých záznamech, mapách a lekcích.",
    loginButton: "PŘIHLÁSIT SE PŘES CHATGPT",
    registerButton: "VYTVOŘIT ÚČET PŘES CHATGPT",
    loginPrivacy: "Tvoje data zůstávají spojená s tvým účtem. Jazyk si pamatujeme i před přihlášením.",
    today: "Dnes",
    myPath: "Moje cesta",
    recordEmotion: "Zapsat emoci",
    myMap: "Moje mapa",
    journey: "Cesta",
    map: "Mapa",
    languageChanged: "Jazyk se změnil.",
    signInRequired: "Pro pokračování se přihlas.",
    close: "Zavřít",
  },
  en: {
    language: "Language",
    save: "SAVE SETTINGS",
    saved: "Saved in this browser.",
    profile: "Profile",
    profileEyebrow: "YOUR PROFILE",
    profileTitle: "Settings that make sense.",
    profileDescription: "Your name appears in the left panel. Everything stays saved in this browser.",
    name: "NAME",
    preferredTime: "PREFERRED TIME FOR YOURSELF",
    preferredTimeHint: "This is your local preference. The demo does not send notifications.",
    logout: "LOG OUT",
    logoutHint: "You will sign out and clear this device's session data.",
    backToApp: "Back to Vnitřní kompas",
    accountNavigation: "Account navigation",
    loginEyebrow: "VNITŘNÍ KOMPAS",
    loginTitle: "Return to your direction.",
    loginDescription: "Sign in with ChatGPT to continue with your notes, maps, and lessons.",
    loginButton: "SIGN IN WITH CHATGPT",
    registerButton: "CREATE AN ACCOUNT WITH CHATGPT",
    loginPrivacy: "Your data stays linked to your account. We remember your language before you sign in.",
    today: "Today",
    myPath: "My path",
    recordEmotion: "Record emotion",
    myMap: "My map",
    journey: "Path",
    map: "Map",
    languageChanged: "Language changed.",
    signInRequired: "Sign in to continue.",
    close: "Close",
  },
  de: {
    language: "Sprache",
    save: "EINSTELLUNGEN SPEICHERN",
    saved: "In diesem Browser gespeichert.",
    profile: "Profil",
    profileEyebrow: "DEIN PROFIL",
    profileTitle: "Einstellungen, die Sinn ergeben.",
    profileDescription: "Dein Name erscheint im linken Bereich. Alles bleibt in diesem Browser gespeichert.",
    name: "NAME",
    preferredTime: "BEVORZUGTE ZEIT FÜR DICH",
    preferredTimeHint: "Das ist deine lokale Einstellung. Die Demo sendet keine Benachrichtigungen.",
    logout: "ABMELDEN",
    logoutHint: "Du wirst abgemeldet und die Sitzungsdaten dieses Geräts werden gelöscht.",
    backToApp: "Zurück zu Vnitřní kompas",
    accountNavigation: "Kontonavigation",
    loginEyebrow: "VNITŘNÍ KOMPAS",
    loginTitle: "Finde zurück zu deiner Richtung.",
    loginDescription: "Melde dich mit ChatGPT an und setze deine Notizen, Karten und Lektionen fort.",
    loginButton: "MIT CHATGPT ANMELDEN",
    registerButton: "KONTO MIT CHATGPT ERSTELLEN",
    loginPrivacy: "Deine Daten bleiben mit deinem Konto verbunden. Deine Sprache merken wir uns auch vor der Anmeldung.",
    today: "Heute",
    myPath: "Mein Weg",
    recordEmotion: "Emotion notieren",
    myMap: "Meine Karte",
    journey: "Weg",
    map: "Karte",
    languageChanged: "Sprache geändert.",
    signInRequired: "Zum Fortfahren bitte anmelden.",
    close: "Schließen",
  },
};

type MessageKey = keyof typeof messages.cs;

// Shared interface copy. Lesson answers and personal notes remain user-authored;
// these strings cover the app shell, controls, states and headings in one resource.
const uiText: Record<string, Record<Locale, string>> = {
  "Dnes": { cs: "Dnes", en: "Today", de: "Heute" },
  "Moje cesta": { cs: "Moje cesta", en: "My path", de: "Mein Weg" },
  "Cesta": { cs: "Cesta", en: "Path", de: "Weg" },
  "Zapsat emoci": { cs: "Zapsat emoci", en: "Record emotion", de: "Emotion notieren" },
  "Zapsat": { cs: "Zapsat", en: "Record", de: "Notieren" },
  "Moje mapa": { cs: "Moje mapa", en: "My map", de: "Meine Karte" },
  "Mapa": { cs: "Mapa", en: "Map", de: "Karte" },
  "Profil": { cs: "Profil", en: "Profile", de: "Profil" },
  "Přehled": { cs: "Přehled", en: "Overview", de: "Übersicht" },
  "Dny a etapy": { cs: "Dny a etapy", en: "Days and stages", de: "Tage und Etappen" },
  "Výstupy": { cs: "Výstupy", en: "Outcomes", de: "Ergebnisse" },
  "Další vrstvy": { cs: "Další vrstvy", en: "Next layers", de: "Weitere Ebenen" },
  "Kroky": { cs: "Kroky", en: "Steps", de: "Schritte" },
  "Etapy": { cs: "Etapy", en: "Stages", de: "Etappen" },
  "Integrace": { cs: "Integrace", en: "Integration", de: "Integration" },
  "Závěrečná integrace": { cs: "Závěrečná integrace", en: "Final integration", de: "Abschließende Integration" },
  "TVŮJ PROFIL": { cs: "TVŮJ PROFIL", en: "YOUR PROFILE", de: "DEIN PROFIL" },
  "TVÉ MODULY": { cs: "TVÉ MODULY", en: "YOUR MODULES", de: "DEINE MODULE" },
  "TEĎ PROCHÁZÍŠ": { cs: "TEĎ PROCHÁZÍŠ", en: "YOU ARE IN", de: "DU BIST HIER" },
  "TVŮJ OSOBNÍ VÝSTUP": { cs: "TVŮJ OSOBNÍ VÝSTUP", en: "YOUR PERSONAL OUTCOME", de: "DEIN PERSÖNLICHES ERGEBNIS" },
  "PRŮBĚŽNĚ CELÝM PROGRAMEM": { cs: "PRŮBĚŽNĚ CELÝM PROGRAMEM", en: "THROUGHOUT THE PROGRAM", de: "DURCH DAS GANZE PROGRAMM" },
  "Otevřít dnešní část": { cs: "Otevřít dnešní část", en: "Open today’s lesson", de: "Heutige Lektion öffnen" },
  "Pokračovat": { cs: "Pokračovat", en: "Continue", de: "Weiter" },
  "Otevřít první mapu": { cs: "Otevřít první mapu", en: "Open first map", de: "Erste Karte öffnen" },
  "Otevřít modul": { cs: "Otevřít modul", en: "Open module", de: "Modul öffnen" },
  "Otevřít celou mapu": { cs: "Otevřít celou mapu", en: "Open full map", de: "Gesamte Karte öffnen" },
  "Všechny záznamy": { cs: "Všechny záznamy", en: "All notes", de: "Alle Notizen" },
  "Záznam je uložený. Nemusíš z něj teď nic vyvozovat.": { cs: "Záznam je uložený. Nemusíš z něj teď nic vyvozovat.", en: "Your note is saved. You do not need to draw conclusions from it now.", de: "Deine Notiz ist gespeichert. Du musst jetzt nichts daraus ableiten." },
  "Zatím bez záznamu": { cs: "Zatím bez záznamu", en: "No note yet", de: "Noch keine Notiz" },
  "Začni prvním krátkým zastavením.": { cs: "Začni prvním krátkým zastavením.", en: "Start with a short pause.", de: "Beginne mit einem kurzen Innehalten." },
  "CO BUDE NÁSLEDOVAT": { cs: "CO BUDE NÁSLEDOVAT", en: "WHAT COMES NEXT", de: "WAS ALS NÄCHSTES KOMMT" },
  "VNITŘNÍ KOMPAS · 90DENNÍ CESTA": { cs: "VNITŘNÍ KOMPAS · 90DENNÍ CESTA", en: "VNITŘNÍ KOMPAS · 90-DAY PATH", de: "VNITŘNÍ KOMPAS · 90-TAGE-WEG" },
  "MODUL 01 · EMOCE": { cs: "MODUL 01 · EMOCE", en: "MODULE 01 · EMOTIONS", de: "MODUL 01 · EMOTIONEN" },
  "MODUL 02 · POTŘEBY": { cs: "MODUL 02 · POTŘEBY", en: "MODULE 02 · NEEDS", de: "MODUL 02 · BEDÜRFNISSE" },
  "MODUL 03 · HODNOTY": { cs: "MODUL 03 · HODNOTY", en: "MODULE 03 · VALUES", de: "MODUL 03 · WERTE" },
  "MODUL 04 · IDENTITA A VIZE": { cs: "MODUL 04 · IDENTITA A VIZE", en: "MODULE 04 · IDENTITY AND VISION", de: "MODUL 04 · IDENTITÄT UND VISION" },
  "Emoce": { cs: "Emoce", en: "Emotions", de: "Emotionen" },
  "Potřeby": { cs: "Potřeby", en: "Needs", de: "Bedürfnisse" },
  "Hodnoty": { cs: "Hodnoty", en: "Values", de: "Werte" },
  "Identita a vize": { cs: "Identita a vize", en: "Identity and vision", de: "Identität und Vision" },
  "Všímám si": { cs: "Všímám si", en: "I notice", de: "Ich nehme wahr" },
  "Pojmenovávám": { cs: "Pojmenovávám", en: "I name it", de: "Ich benenne es" },
  "Rozumím": { cs: "Rozumím", en: "I understand", de: "Ich verstehe" },
  "Vybírám si": { cs: "Vybírám si", en: "I choose", de: "Ich wähle" },
  "Jednám": { cs: "Jednám", en: "I act", de: "Ich handle" },
  "Odhaluju": { cs: "Odhaluju", en: "I uncover", de: "Ich entdecke" },
  "Prověřuju": { cs: "Prověřuju", en: "I examine", de: "Ich prüfe" },
  "Poznávám svůj vzorec": { cs: "Poznávám svůj vzorec", en: "I see my pattern", de: "Ich erkenne mein Muster" },
  "DNY 1 AŽ 7": { cs: "DNY 1 AŽ 7", en: "DAYS 1 TO 7", de: "TAGE 1 BIS 7" },
  "DNY 8 AŽ 14": { cs: "DNY 8 AŽ 14", en: "DAYS 8 TO 14", de: "TAGE 8 BIS 14" },
  "DNY 15 AŽ 21": { cs: "DNY 15 AŽ 21", en: "DAYS 15 TO 21", de: "TAGE 15 BIS 21" },
  "DNEŠNÍ ZASTAVENÍ": { cs: "DNEŠNÍ ZASTAVENÍ", en: "TODAY'S PAUSE", de: "HEUTIGES INNEHALTEN" },
  "DNEŠNÍ OTÁZKA": { cs: "DNEŠNÍ OTÁZKA", en: "TODAY'S QUESTION", de: "HEUTIGE FRAGE" },
  "POSLEDNÍ ZÁZNAM": { cs: "POSLEDNÍ ZÁZNAM", en: "LATEST NOTE", de: "LETZTE NOTIZ" },
  "PROČ TO DĚLÁME": { cs: "PROČ TO DĚLÁME", en: "WHY WE DO THIS", de: "WARUM WIR DAS TUN" },
  "KRISTIÁNŮV VSTUP": { cs: "KRISTIÁNŮV VSTUP", en: "KRISTIÁN'S NOTE", de: "KRISTIÁNS IMPULS" },
  "ZAPSAT EMOCI": { cs: "ZAPSAT EMOCI", en: "RECORD EMOTION", de: "EMOTION NOTIEREN" },
  "ZAPSAT DNEŠNÍ ZASTAVENÍ": { cs: "ZAPSAT DNEŠNÍ ZASTAVENÍ", en: "RECORD TODAY'S PAUSE", de: "HEUTIGES INNEHALTEN NOTIEREN" },
  "Uložit": { cs: "Uložit", en: "Save", de: "Speichern" },
  "Smazat": { cs: "Smazat", en: "Delete", de: "Löschen" },
  "Další": { cs: "Další", en: "Next", de: "Weiter" },
  "Zpět": { cs: "Zpět", en: "Back", de: "Zurück" },
  "Zpět na cestu": { cs: "Zpět na cestu", en: "Back to path", de: "Zurück zum Weg" },
  "Přeskočit": { cs: "Přeskočit", en: "Skip", de: "Überspringen" },
  "CELÝ MODUL JE OTEVŘENÝ": { cs: "CELÝ MODUL JE OTEVŘENÝ", en: "THE WHOLE MODULE IS OPEN", de: "DAS GANZE MODUL IST OFFEN" },
  "ZÁVĚREČNÁ INTEGRACE · DNY 85 AŽ 90": { cs: "ZÁVĚREČNÁ INTEGRACE · DNY 85 AŽ 90", en: "FINAL INTEGRATION · DAYS 85 TO 90", de: "ABSCHLIESSENDE INTEGRATION · TAGE 85 BIS 90" },
  "Nahrát profilovou fotku": { cs: "Nahrát profilovou fotku", en: "Upload profile photo", de: "Profilfoto hochladen" },
  "Uprav si výřez": { cs: "Uprav si výřez", en: "Adjust your crop", de: "Ausschnitt anpassen" },
  "Doleva a doprava": { cs: "Doleva a doprava", en: "Left and right", de: "Links und rechts" },
  "Nahoru a dolů": { cs: "Nahoru a dolů", en: "Up and down", de: "Nach oben und unten" },
  "Nahrát jinou fotku": { cs: "Nahrát jinou fotku", en: "Upload another photo", de: "Anderes Foto hochladen" },
  "Na střed": { cs: "Na střed", en: "Center", de: "Zentrieren" },
  "Hotovo": { cs: "Hotovo", en: "Done", de: "Fertig" },
  "Tento modul nemáš odemčený": { cs: "Tento modul nemáš odemčený", en: "This module is locked", de: "Dieses Modul ist gesperrt" },
  "ZPŘÍSTUPNÍ SE PO DOKONČENÍ PŘEDCHOZÍ ČÁSTI NEBO AKTIVACI PŘÍSTUPU": { cs: "ZPŘÍSTUPNÍ SE PO DOKONČENÍ PŘEDCHOZÍ ČÁSTI NEBO AKTIVACI PŘÍSTUPU", en: "UNLOCKS AFTER THE PREVIOUS PART OR ACCESS ACTIVATION", de: "WIRD NACH DEM VORHERIGEN TEIL ODER DER FREISCHALTUNG ZUGÄNGLICH" },
};

export function translateUiText(value: string, locale: Locale): string {
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const core = value.trim();
  if (locale === "cs") return value;
  const direct = uiText[core]?.[locale];
  if (direct) return `${leading}${direct}${trailing}`;
  const readDays = core.match(/^(\d+) z (\d+) dní přečteno$/);
  if (readDays) return `${leading}${locale === "en" ? `${readDays[1]} of ${readDays[2]} days read` : `${readDays[1]} von ${readDays[2]} Tagen gelesen`}${trailing}`;
  const totalDays = core.match(/^(\d+) přečtených dní$/);
  if (totalDays) return `${leading}${locale === "en" ? `${totalDays[1]} days read` : `${totalDays[1]} gelesene Tage`}${trailing}`;
  return value;
}

export function getMessage(locale: Locale, key: MessageKey): string {
  return messages[locale][key] ?? messages.cs[key];
}

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "cs";
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "cs" || stored === "en" || stored === "de") return stored;
  } catch {
    // Fall back to Czech when browser storage is unavailable.
  }
  return "cs";
}

export function clearSessionData() {
  if (typeof window === "undefined") return;
  const keys = [
    "kk-emotion-prototype-entries", "kk-emotion-prototype-entered", "kk-program-tour-v1-completed",
    "kk-program-module-tour-v1-emotion", "kk-program-module-tour-v1-needs", "kk-program-module-tour-v1-values", "kk-program-module-tour-v1-identity",
    "kk-emotion-prototype-read-days", "kk-emotion-prototype-practice-entries", "kk-needs-prototype-read-days", "kk-needs-prototype-practice-entries",
    "kk-values-prototype-read-days", "kk-values-prototype-practice-entries", "kk-identity-prototype-read-days", "kk-identity-prototype-practice-entries",
    "kk-identity-vision-board", "kk-program-integration-days", "kk-emotion-prototype-profile-photo", "kk-emotion-prototype-profile-photo-position",
    "vnitrni-kompas-profile-name-v1", "kk-program-last-location-v1",
  ];
  try {
    keys.forEach((key) => window.localStorage.removeItem(key));
    window.sessionStorage.setItem(SIGNED_OUT_SESSION_KEY, "1");
  } catch {
    // The hosted sign-out still clears the auth cookie when storage is blocked.
  }
}

export function prepareForSignIn() {
  try {
    window.sessionStorage.removeItem(SIGNED_OUT_SESSION_KEY);
  } catch {
    // Sign-in can continue when session storage is unavailable.
  }
}

export type { MessageKey };
