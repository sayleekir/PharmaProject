# GI 4.0 PharmaProtect — Patient Leaflet Web Prototype

**Code repository:** https://github.com/sayleekir/PharmaProject

A responsive website prototype for finding and reading the **latest approved patient leaflet** (Gebrauchsinformation) of a medicine, in the PharmaProtect brand. Users search by text, voice, photo or QR/barcode, confirm the medicine, then read or listen to the leaflet. If a leaflet is missing they can request it. No login; history stays on the user's device.

It is a **front-end prototype**: dummy sample data (30 medicines, all German), simulated photo/scan recognition, no back end yet. The site is for **medicines sold in Germany**, so leaflets are German only. It is ready to be connected to a live **Leaflet Service** that searches approved sources and returns the latest approved leaflet (see below).

## Dummy data (for demonstration)

**For demonstration purposes only, dummy (sample) data has been added.** The prototype contains 30 made-up leaflet records for common medicines sold in Germany (for example Diclac Dolo, Ibuprofen, Aspirin, Dekristol). The leaflet text, version numbers, dates, PZNs and barcodes are invented placeholders, **not real medical information**, and must not be used for any medical decision. Every leaflet shows an on-screen notice "Prototype sample: this text is dummy content and not real medical information". Real leaflets will come from approved sources through the Leaflet Service (see `docs/api-contract.md`).

- **Where it lives:** `src/data/leaflets.js` (compact specs that are expanded into the standard numbered leaflet structure, 1 to 6).
- **How it is served:** by the sample provider (`src/data/providers/sample.js`), through the same interface the live service will use, so switching to real data needs no change in the views.
- **Replace it:** set `VITE_GI_API_BASE` to the real Leaflet Service; the dummy data and its on-screen notice then disappear (the notice only appears for records flagged `sample`).

## Branding

Gebrauchsinformation 4.0 (GI 4.0) is being taken over by PharmaProtect Solutions GmbH, so this website's UI is built on PharmaProtect's branding (colours, typography, hero banners, header, contact page and footer layout). The GI 4.0 logo is made the way the logos of other PharmaProtect projects are, for example ACS PharmaProtect: the cube mark, a large product name and "PharmaProtect" underneath.

- **Why:** since PharmaProtect is taking over GI 4.0, the new site should look like part of the PharmaProtect family, not like the previous service's website.
- **Reference:** the PharmaProtect website and the logo family of its other projects (screenshots supplied by the client).
- **Logo:** cube mark plus "GI 4.0" and "PharmaProtect" in the same arrangement as the ACS PharmaProtect logo. The cube is cropped from the supplied ACS logo; the text is vector type. Replace it with the official GI 4.0 logo file when PharmaProtect provides it.
- **Details:** see `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/DESIGN.md`.

This project was planned and built with the **BMad Method** (v6.12.4, `bmm` module). All planning documents and outputs are included.

**Source of the flow, story map and tech ecosystem (Figma board):**
https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

- Flow: `node-id=36-4253` · Tech ecosystem and architecture: `node-id=1-1869` · Story map: `node-id=35-3957`

## Data privacy

Because this website is built for Germany, data privacy is a major concern (GDPR and German data protection expectations). For that reason a dedicated **Privacy** page was made: it explains what is and is not stored, lets users delete their data on the device in two taps, and carries the full privacy policy.

- **Privacy by design:** no login, no cookies, no analytics; searches and viewed medicines stay in the user's own browser; the only data that could ever reach a server is the optional email on a leaflet request.
- **Privacy page** (More menu, footer): "Your data on this device" with buttons to delete history and to delete leaflet requests and email (each asks for confirmation), followed by the privacy policy as expandable sections.
- **Note:** the policy text is client-supplied (written for Rote Liste® Service GmbH) and has not been legally reviewed for PharmaProtect; it is shown in English only (see PRD open questions).

## Quick start

Prerequisites: **Node.js 20 or newer** (developed on Node 22) and npm.

```bash
npm ci          # install exactly what package-lock.json pins
npm run dev     # start the dev server, open http://localhost:5173
```

Other scripts:

```bash
npm test             # run the unit and flow tests once (Vitest + jsdom)
npm run test:watch   # tests in watch mode
npm run build        # production build into dist/
npm run preview      # serve dist/ at http://localhost:4173
```

The build output in `dist/` is static (HTML, CSS, JS, images). Host it on any static web server. `base` is `./`, so it also works from a sub-folder.

## Try it

- Search **ibuprofn** (typo): auto-corrected to Ibuprofen; confirm to open the leaflet.
- Type while searching: suggestions appear as you type (tap, click or arrow keys + Enter).
- Search **Aspirin** or **Novalgin**, or a PZN such as **00000106** (sample number): German leaflets.
- **EN | DE** in the header switches the interface language (leaflet text is never translated). On phones the header is a hamburger menu.
- Search **xyz**: "Leaflet not found", then Request this leaflet (optional email, edit, undo).
- **Scan QR / barcode** and **Photo of box** use simulated recognition (pick a sample code or any image).
- **Say the name** uses the browser's speech recognition if available (Chrome/Edge/Safari); otherwise a simulated query. **Listen** uses speech synthesis.
- More ▾ menu: Instructions, FAQs, Contact, Legal notice, Privacy. Privacy also has the delete-my-data buttons.

## Live data (Leaflet Service)

The website never searches the open internet. It asks one back end that uses **approved sources only** and always returns the **latest approved** German leaflet. The full contract is in [`docs/api-contract.md`](docs/api-contract.md) and [`docs/openapi.yaml`](docs/openapi.yaml).

```bash
VITE_GI_API_BASE=https://api.example.de npm run dev     # use the live service
npm run dev                                             # no variable: built-in sample data
```

Without the variable the same interface is served by `src/data/providers/sample.js`. The front end re-checks the rules (German market, German text, complete record, verbatim sections, https source links) and shows "Search is temporarily unavailable" instead of any substitute content when the service fails.

## Project structure

```text
index.html              page shell (header, hero, footer)
src/main.js             entry
src/styles.css          design tokens and components (one light theme)
src/data/               leaflets.js (sample leaflets), content.js / content.de.js (steps, FAQ, legal, privacy, hero text), i18n.de.js, providers/ (sample and http)
src/domain/             pure logic: search, leaflet helpers and data policy, recognition stand-ins, validation, storage, i18n
src/app/                DOM layer: app.js, router.js, ui.js, capabilities.js, provider.js, i18n.js, icons.js, state.js, views/*
public/assets/          cube.png (logo mark), team.jpg (contact page photo)
tests/                  unit tests and jsdom flow tests
USER_STORIES.md         the user stories of the implemented use cases, with acceptance criteria (a copy is kept in docs/)
docs/                   USER_STORIES.md (copy), project-context.md (rules for AI agents), api-contract.md, openapi.yaml
_bmad/                  BMad Method installation (config, scripts, module)
.claude/skills/         BMad skills for Claude Code
_bmad-output/           BMAD planning and implementation outputs (see below)
```

Architecture rule: `data` ← `domain` ← `app` (never import upward). See the architecture spine.

## BMAD planning documents and outputs

| Phase | File |
| --- | --- |
| Product brief | `_bmad-output/planning-artifacts/briefs/brief-gi40-prototype-2026-11-25/brief.md` |
| PRD | `_bmad-output/planning-artifacts/prds/prd-gi40-prototype-2026-11-25/prd.md` |
| UX design | `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/DESIGN.md` and `EXPERIENCE.md` |
| Architecture | `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md` |
| Epics and stories | `_bmad-output/planning-artifacts/epics.md` |
| Readiness check | `_bmad-output/planning-artifacts/implementation-readiness.md` |
| Sprint status | `_bmad-output/implementation-artifacts/sprint-status.yaml` (9 epics, 28 stories, all done) |
| Story files | `_bmad-output/implementation-artifacts/<epic>-<story>-*.md` |
| Code review | `_bmad-output/implementation-artifacts/code-review-2026-11-25.md` |
| Test summary | `_bmad-output/implementation-artifacts/test-summary.md` |
| Decision logs | `.memlog.md` inside each brief, PRD, UX and architecture folder |

The BMad skills run in Claude Code from the project root (for example `bmad-help`, `bmad-prd`, `bmad-ux`, `bmad-architecture`, `bmad-create-epics-and-stories`, `bmad-sprint-planning`, `bmad-build`, `bmad-code-review`). The `_bmad/scripts` helpers need [`uv`](https://docs.astral.sh/uv/). To reinstall BMAD: `npx bmad-method install --directory . --modules bmm --tools claude-code`.

Method documentation: https://docs.bmad-method.org/

## Known limitations

- Photo and scan recognition, and the email service, are simulated stand-ins (`src/domain/recognition.js`).
- Only the 30 dummy sample leaflets exist. Real search over all German medicines needs the Leaflet Service (not built; contract in `docs/`); source agreements (GI 4.0 / Rote Liste, BfArM AMIce / AM-FDB, MAH feeds) are open.
- PZNs in the sample data are made up.
- The German interface texts were written without a native-speaker review.
- The text-size control was removed on request and there is no dark mode or high-contrast switch. Print is built (story 6). Pictorial instructions (story 3) are shown for four dummy medicines: Salbutamol, Xylometazolin, Paracetamol and Diclac Dolo (drawn sample pictograms in `src/data/pictograms.js`). Listening per section is not built; only the whole leaflet can be read aloud.
- The legal notice and privacy policy are client-supplied text for Rote Liste® Service GmbH and have not been legally reviewed for PharmaProtect.
- The cube mark and the team photo were cropped from stakeholder reference screenshots at low resolution. Replace `public/assets/cube.png` and `team.jpg` with the official files.
- The GI 4.0 logo wordmark is set in **Sui Generis**, which is not bundled (licensed font). Without it installed the rounded Nunito fallback is shown. To bundle it, see the comment at the top of `src/styles.css`.
- Microphone, camera and speech output depend on the browser and are blocked in some embedded frames; the UI falls back to text.
