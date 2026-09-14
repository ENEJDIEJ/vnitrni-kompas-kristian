"use client";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { prepareForSignIn } from "@/lib/i18n";
import { useI18n } from "@/components/i18n/LocaleProvider";
import styles from "./login.module.css";

function signInHref() {
  return `/signin-with-chatgpt?return_to=${encodeURIComponent("/")}`;
}

export default function LoginPage() {
  const { t } = useI18n();
  const beginSignIn = () => prepareForSignIn();

  return (
    <main className={styles.page}>
      <div className={styles.pattern} aria-hidden="true" />
      <section className={styles.card} aria-labelledby="login-title">
        <header className={styles.header}>
          <a className={styles.brand} href="/" aria-label={t("backToApp")}>
            <img src="/vnitrni-kompas-logo-dark.png" alt="" />
            <span><strong>Vnitřní kompas</strong><small>Operační systém pro práci sám se sebou</small></span>
          </a>
          <LanguageSwitcher compact />
        </header>
        <div className={styles.body}>
          <p className={styles.eyebrow}>{t("loginEyebrow")}</p>
          <h1 id="login-title">{t("loginTitle")}</h1>
          <p className={styles.description}>{t("loginDescription")}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={signInHref()} target="_top" onClick={beginSignIn}>{t("loginButton")}</a>
            <a className={styles.secondary} href={signInHref()} target="_top" onClick={beginSignIn}>{t("registerButton")}</a>
          </div>
          <p className={styles.privacy}>{t("loginPrivacy")}</p>
        </div>
      </section>
    </main>
  );
}
