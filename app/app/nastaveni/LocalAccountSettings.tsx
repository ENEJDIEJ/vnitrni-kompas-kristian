"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./settings.module.css";

const PROFILE_NAME_KEY = "vnitrni-kompas-profile-name-v1";
const PREFERRED_TIME_KEY = "vnitrni-kompas-preferred-time-v1";

export function LocalAccountSettings() {
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
        if (isLocalApp) setReturnHref(`${source.pathname}${source.search}`);
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

  return (
    <main className={styles.page}>
      <div className={styles.pattern} aria-hidden="true" />
      <section className={styles.shell}>
        <header className={styles.header}>
          <a className={styles.brand} href={returnHref} aria-label="Zpět do Vnitřního kompasu">
            <img src="/vnitrni-kompas-logo-dark.png" alt="" aria-hidden="true" />
            <span><strong>VNITŘNÍ KOMPAS</strong><small>ÚČET A NASTAVENÍ</small></span>
          </a>
          <a className={styles.back} href={returnHref}>← ZPĚT DO APLIKACE</a>
        </header>

        <div className={styles.content}>
          <div className={styles.intro}>
            <p>TVŮJ PROFIL</p>
            <h1>Nastavení, která dávají smysl.</h1>
            <span>Jméno se zobrazí v levém panelu. Vše zůstává uložené jen v tomto prohlížeči.</span>
          </div>

          <form className={styles.card} onSubmit={save}>
            <label>
              <span>JMÉNO</span>
              <input value={name} maxLength={48} onChange={(event) => setName(event.target.value)} autoComplete="name" />
            </label>
            <label>
              <span>PREFEROVANÝ ČAS PRO SEBE</span>
              <input type="time" value={preferredTime} onChange={(event) => setPreferredTime(event.target.value)} />
              <small>Jde o tvoji místní preferenci. Demo neposílá upozornění.</small>
            </label>
            <div className={styles.actions}>
              <button type="submit">ULOŽIT NASTAVENÍ</button>
              <p role="status" aria-live="polite">{saved ? "Uloženo v tomto prohlížeči." : ""}</p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
