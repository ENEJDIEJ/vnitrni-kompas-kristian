"use client";

import { localeOptions } from "@/lib/i18n";
import { useI18n } from "./LocaleProvider";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <label className={compact ? "languageSwitcher languageSwitcherCompact" : "languageSwitcher"}>
      <span>{t("language")}</span>
      <select value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)} aria-label={t("language")}>
        {localeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
