# Vnitřní kompas – Kristian design

Downloadable Next.js implementation of the current Vnitřní kompas design. The project is a static, responsive frontend preview with the full CZ / EN / DE interface and lesson content.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To create the static production export:

```bash
npm run build
npx serve out
```

The build writes the deployable static site to `out/`.

## Included routes

- `/` – main application preview
- `/prostor-demo` – full journey and lesson preview
- `/app/nastaveni` – profile, settings and language selector
- `/login` – sign-in entry screen and language selector

## Localization and state

The UI and all lesson copy are localized in Czech (source), English and German. The selected language is stored in `localStorage` under `vnitrni-kompas-locale-v1` and survives refreshes. Preview progress, profile settings and notes are stored locally in the browser.

Lesson translations live in `app/prostor-demo/contentTranslations.en.json` and `app/prostor-demo/contentTranslations.de.json`; shared UI translations are in `lib/i18n.ts`.

## Functional scope

The design, responsive layout, navigation, lesson interactions, language switching, local persistence and static production build are included and verified with `npm run build`. The repository is a frontend preview: the `/signin-with-chatgpt` and `/signout-with-chatgpt` endpoints are provided by the hosted Sites environment, so real account authentication requires deploying it there. A standalone local clone therefore does not provide a backend account system.
