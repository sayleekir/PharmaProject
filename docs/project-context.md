# Project Context for AI Agents — GI 4.0 Prototype

Read this before changing code. It records the rules that are not obvious from the code.

- **What this is:** a front-end prototype of the GI 4.0 patient-leaflet website for PharmaProtect Solutions GmbH. Mock data, simulated recognition, no server.
- **Layers:** `src/data` (plain data) ← `src/domain` (pure logic, injectable storage, no DOM) ← `src/app` (DOM, router, browser capabilities). Never import upward.
- **Dummy data is for demonstration only.** `src/data/leaflets.js` holds 30 invented leaflets (made-up text, versions, PZNs, barcodes), flagged `sample: true` and labelled on screen. Never present them as real medical information, and never copy real leaflet text into them without a licence.
- **Germany only.** The site covers medicines sold in Germany; leaflets are German only. Data from any provider passes `normalizeSummary` / `normalizeLeaflet` (German market, German text, complete); anything else is dropped.
- **No open-web search.** Views get data only through `src/app/provider.js` (sample or HTTP). The back end uses approved sources only and returns the latest approved version (`docs/api-contract.md`). Never add direct calls to third-party sites from the browser.
- **Leaflet layout:** left column (version/source cards, notices, Listen, Expand all) and right column (accordion of `<details>` rows, all open by default so no section is missed, plus the tick box) from 900 px, one column below; no section index. Headings are the section names exactly as in the data.
- **Leaflet text is verbatim and in its own order.** Sections are never reordered.
- **Leaflet text is verbatim (details).** Never translate, summarise, shorten or reword it. German leaflets stay German (`lang: 'de'`).
- **Data privacy is a major concern** because the site is built for Germany; that is why a dedicated Privacy page exists. Do not add trackers, analytics, cookies, third-party scripts that see user input, or logging of searches without a privacy review.
- **No server-side personal data, no login, no cookies.** User data lives in `localStorage` through `src/domain/storage.js` only.
- **Browser features** (speech in/out, file picker) only via `src/app/capabilities.js`, always with a text alternative and a toast on failure.
- **Escaping:** every dynamic string in a template literal goes through `esc()`.
- **Branding:** GI 4.0 is being taken over by PharmaProtect Solutions GmbH, so the UI follows PharmaProtect's branding, and the GI 4.0 logo is built like the logos of other PharmaProtect projects (cube mark, large product name, "PharmaProtect" beneath). Do not reintroduce the previous GI 4.0 site's look.
- **Page width:** every page calls `pageColumn()` (`src/app/ui.js`) so title and content use the same centred 640 px column as Home. Only the two-column leaflet page, hero, location band and footer are wider.
- **Styling:** CSS custom properties only; a single light theme; Barlow font; PharmaProtect navy `#0b3c63` and terracotta `#d57a4c`. See `_bmad-output/planning-artifacts/ux-designs/.../DESIGN.md`.
- **Brand assets:** the cube mark (`public/assets/cube.png`) and the team photo (`public/assets/team.jpg`) were cropped from stakeholder reference screenshots at low resolution; replace with the official files when available.
- **Form controls need explicit colours.** Every input and button sets its own text and background colour (`styles.css`, top rules), so a dark browser or viewer default cannot produce grey inputs or invisible button labels. The page declares `color-scheme: only light`, and the tick box is custom drawn (`appearance:none`, own box and tick) so it can never turn dark.
- **Accessibility floor:** 44 px targets, visible focus, no colour-only signals, works at 200% zoom.
- **Languages:** interface EN/DE via `t('English text')` + `src/data/i18n.de.js` (a test fails if a string lacks German); never pass leaflet, legal or policy text through `t()`.
- **Deferred on purpose:** text-size control (removed by stakeholder), high-contrast/dark mode, listening per section, building the Leaflet Service, real OCR/barcode/speech, email service, login.
- **Tests:** `npm test` must stay green; add a domain unit test for new logic and a flow test for new user-visible behaviour.
- **Source of truth for flow, story map and tech ecosystem:** https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS
