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
