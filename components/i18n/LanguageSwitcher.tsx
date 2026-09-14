"use client";

import { localeOptions } from "@/lib/i18n";
import { useI18n } from "./LocaleProvider";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <div className={compact ? "languageSwitcher languageSwitcherCompact" : "languageSwitcher"} role="group" aria-label={t("language")}>
      <span className="languageSwitcherLabel">{t("language")}</span>
      <div className="languageSwitcherOptions">
        {localeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`languageSwitcherOption${locale === option.value ? " languageSwitcherOptionActive" : ""}`}
            aria-pressed={locale === option.value}
            title={option.label}
            onClick={() => setLocale(option.value)}
          >
            <span className="languageSwitcherDot" aria-hidden="true" />
            {option.value.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
