# Isch ebbes! Website

Die Website ist mit Astro erstellt und wird als Cloudflare Worker veröffentlicht.

## Lokal entwickeln und bauen

Voraussetzung ist Node.js `>=22.22.0`.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run preview` baut die Website und startet anschließend eine lokale Wrangler-Vorschau. `npm run deploy` baut und veröffentlicht den Worker.

## Deployment

Der GitHub-Workflow in `.github/workflows/deploy.yml` veröffentlicht die Website bei jedem Push auf `main`. Er kann auch manuell über **Actions → Build and deploy → Run workflow** gestartet werden.

Im GitHub-Repository müssen dafür diese Actions-Secrets hinterlegt sein:

- `CLOUDFLARE_API_TOKEN`: API-Token mit Berechtigung zum Veröffentlichen des Workers.
- `CLOUDFLARE_ACCOUNT_ID`: ID des Cloudflare-Accounts.

## Bilder und Termine pflegen

### Galerie

Galeriebilder in `public/Galerie` ablegen. Unterstützt werden AVIF, GIF, JPEG, PNG, SVG und WebP. Für die automatische Sortierung das Jahr am Anfang des Dateinamens angeben, zum Beispiel `2023-Chorfoto.jpg` oder `2023 - Chorfoto.jpg`.

Bilder des aktuellen Jahres erscheinen unter „Aktuelle Einblicke“. Ältere Bilder erscheinen in der seitlich scrollbarbaren „Historie“, absteigend nach Jahr sortiert und ohne Jahres- oder Dateinamenanzeige. Bilder ohne Jahresangabe bleiben bei den aktuellen Einblicken.

### Akteure

Porträts in `public/Akteure` ablegen. Unterstützte Bilder werden alphabetisch nach Dateiname sortiert und ohne Namensbeschriftung angezeigt.

### Termine

Flyer in `public/Flyer` ablegen. Für Datum und Ort das Format `TT_MM_JJJJ-Ort.ext` verwenden, zum Beispiel `27_11_2026-Waibstadt.jpg`. Vergangene Termine werden beim Seitenaufruf anhand der Zeitzone Europe/Berlin ausgeblendet.

Neue oder umbenannte Bilder und Flyer werden beim Build eingelesen. Nach Änderungen committen und nach `main` pushen; der GitHub-Workflow veröffentlicht sie dann automatisch.

## Eigene Domain

Der Worker heißt `isch-ebbes` und ist in `wrangler.jsonc` konfiguriert. Eine eigene Domain wird in Cloudflare unter **Workers & Pages → isch-ebbes → Settings → Domains & Routes → Add → Custom Domain** mit dem Worker verbunden. Die Domain kann weiterhin bei webgo registriert sein; für die Cloudflare-Zone müssen die DNS-Nameserver auf Cloudflare zeigen. Vor dem Nameserverwechsel vorhandene E-Mail-DNS-Einträge übernehmen.
