"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getMessage, getStoredLocale, LOCALE_STORAGE_KEY, translateUiText, type Locale, type MessageKey } from "@/lib/i18n";

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: MessageKey) => string };
const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("cs");
  useEffect(() => setLocaleState(getStoredLocale()), []);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = locale === "en"
      ? "Inner Compass · private preview"
      : locale === "de"
        ? "Innerer Kompass · private Vorschau"
        : "Vnitřní kompas · soukromý návrh";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = locale === "en"
        ? "Private preview of the Inner Compass interface."
        : locale === "de"
          ? "Private Vorschau der Innerer-Kompass-Oberfläche."
          : "Soukromý návrh rozhraní Vnitřního kompasu.";
    }
    try { window.localStorage.setItem(LOCALE_STORAGE_KEY, locale); } catch { /* Keep the current selection in memory. */ }
  }, [locale]);

  useEffect(() => {
    if (!document.body) return;
    const original = new WeakMap<Text, string>();
    const translated = new WeakMap<Text, string>();
    let queued = false;
    const apply = () => {
      queued = false;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node as Text;
        const parent = text.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT", "OPTION"].includes(parent.tagName)) continue;
        const current = text.nodeValue ?? "";
        const previousTranslation = translated.get(text);
        const source = original.get(text) && current === previousTranslation ? original.get(text)! : current;
        original.set(text, source);
        const next = translateUiText(source, locale);
        translated.set(text, next);
        if (current !== next) text.nodeValue = next;
      }
      // Lesson prompts and controls carry copy in attributes rather than text
      // nodes. Localize those too so translated forms never fall back to CZ.
      const elements = document.body.querySelectorAll<HTMLElement>("[placeholder], [aria-label], [title], [alt]");
      elements.forEach((element) => {
        ["placeholder", "aria-label", "title", "alt"].forEach((attribute) => {
          const value = element.getAttribute(attribute);
          if (!value) return;
          const sourceAttribute = `data-i18n-source-${attribute}`;
          const source = element.getAttribute(sourceAttribute) ?? value;
          const next = translateUiText(source, locale);
          element.setAttribute(sourceAttribute, source);
          if (next !== value) element.setAttribute(attribute, next);
        });
      });
    };
    apply();
    const observer = new MutationObserver(() => {
      if (!queued) { queued = true; queueMicrotask(apply); }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [locale]);
  const setLocale = (next: Locale) => setLocaleState(next);
  const value = useMemo(() => ({ locale, setLocale, t: (key: MessageKey) => getMessage(locale, key) }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useI18n must be used inside LocaleProvider");
  return value;
}
