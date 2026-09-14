"use client";

import { FormEvent, useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { clearSessionData } from "@/lib/i18n";
import styles from "./settings.module.css";

const PROFILE_NAME_KEY = "vnitrni-kompas-profile-name-v1";
const PREFERRED_TIME_KEY = "vnitrni-kompas-preferred-time-v1";

export function LocalAccountSettings() {
  const { t } = useI18n();
  const [name, setName] = useState("Martin");
  const [preferredTime, setPreferredTime] = useState("19:00");
  const [saved, setSaved] = useState(false);
  const [returnHref, setReturnHref] = useState("/prostor-demo");

  useEffect(() => {
    try {
      setName(window.localStorage.getItem(PROFILE_NAME_KEY) || "Martin");
      setPreferredTime(window.localStorage.getItem(PREFERRED_TIME_KEY) || "19:00");
      if (document.referrer) {
        const source = new URL(document.referrer);
        const isLocalApp = source.origin === window.location.origin && (source.pathname === "/" || source.pathname === "/prostor-demo" || source.pathname === "/prostor-demo.html");
        if (isLocalApp) {
          const demo = source.searchParams.get("demo");
          setReturnHref(`${source.pathname}${demo ? `?demo=${encodeURIComponent(demo)}` : ""}`);
        }
      }
    } catch {
      // Formulář funguje i bez dostupného lokálního úložiště.
    }
  }, []);

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim() || "Martin";
    setName(cleanName);
    try {
      window.localStorage.setItem(PROFILE_NAME_KEY, cleanName);
      window.localStorage.setItem(PREFERRED_TIME_KEY, preferredTime);
    } catch {
      // Změna zůstane alespoň v právě otevřeném formuláři.
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  function logout() {
    clearSessionData();
    window.location.assign(`/signout-with-chatgpt?return_to=${encodeURIComponent("/login")}`);
  }

  return (
    <main className={styles.page}>
      <div className={styles.pattern} aria-hidden="true" />
      <section className={styles.shell}>
        <header className={styles.header}>
          <a className={styles.brand} href={returnHref} aria-label={t("backToApp")}>
            <span className={styles.brandMark} aria-hidden="true"><img className={styles.brandLogoWhite} src="/vnitrni-kompas-logo-dark.png" alt="" /><img className={styles.brandLogoYellow} src="/vnitrni-kompas-logo.png" alt="" /></span>
            <span><strong>Vnitřní kompas</strong><small>Operační systém pro práci sám se sebou</small></span>
          </a>
          <LanguageSwitcher compact />
        </header>

        <div className={styles.content}>
          <div className={styles.intro}>
            <p>{t("profileEyebrow")}</p>
            <h1>{t("profileTitle")}</h1>
            <span>{t("profileDescription")}</span>
          </div>

          <form className={styles.card} onSubmit={save}>
            <label>
              <span>{t("name")}</span>
              <input value={name} maxLength={48} onChange={(event) => setName(event.target.value)} autoComplete="name" />
            </label>
            <label>
              <span>{t("preferredTime")}</span>
              <input type="time" value={preferredTime} onChange={(event) => setPreferredTime(event.target.value)} />
              <small>{t("preferredTimeHint")}</small>
            </label>
            <div className={styles.actions}>
              <button type="submit">{t("save")}</button>
              <p role="status" aria-live="polite">{saved ? t("saved") : ""}</p>
            </div>
            <div className={styles.logoutArea}>
              <button type="button" className={styles.logoutButton} onClick={logout}>{t("logout")}</button>
              <small>{t("logoutHint")}</small>
            </div>
          </form>
        </div>
      </section>
      <nav className={styles.mobileNav} aria-label={t("accountNavigation")}>
        {([
          ["dnes", "⌂", t("today")],
          ["cesta", "↗", t("journey")],
          ["zaznam", "●", t("recordEmotion")],
          ["report", "◎", t("map")],
        ] as const).map(([start, icon, label]) => (
          <a key={start} href={`${returnHref}${returnHref.includes("?") ? "&" : "?"}start=${start}`}>
            <span>{icon}</span>{label}
          </a>
        ))}
        <a className={styles.mobileActive} href="/app/nastaveni" aria-current="page"><span>○</span>{t("profile")}</a>
      </nav>
    </main>
  );
}
