# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Automatisches Deployment über GitHub

Der Workflow in `.github/workflows/deploy.yml` baut und veröffentlicht die Website automatisch bei jedem Push auf den Branch `main`. Er kann außerdem in GitHub unter **Actions → Build and deploy → Run workflow** manuell gestartet werden.

Einmalige Einrichtung im GitHub-Repository:

1. Unter **Settings → Secrets and variables → Actions** zwei Repository-Secrets anlegen:
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API-Token mit Berechtigung zum Veröffentlichen von Workers.
   - `CLOUDFLARE_ACCOUNT_ID`: ID des Cloudflare-Accounts, in dem der Worker `isch-ebbes` veröffentlicht wird.
2. Den Workflow und das Projekt in ein GitHub-Repository pushen. Der Deployment-Branch muss `main` heißen; falls der Standardbranch anders heißt, den Branch in der Workflow-Datei anpassen.

Neue Galeriebilder in `public/Galerie` hinzufügen und committen. Nach dem Push nach `main` wird die Galerie automatisch neu gebaut und veröffentlicht. Die Bildtitel stammen aus den Dateinamen.

Neue Flyer in `public/Flyer` ablegen. Dateinamen im Format `TT_MM_JJJJ-Ort.ext`, zum Beispiel `27_11_2026-Waibstadt.jpg`, werden als `27.11.2026 – Waibstadt` angezeigt und direkt mit dem Flyer verlinkt. Jeder reguläre Dateityp im Ordner wird als Termin übernommen. Nach dem Commit und Push nach `main` werden die Termine automatisch veröffentlicht.
