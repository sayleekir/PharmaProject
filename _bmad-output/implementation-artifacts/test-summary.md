# Test Summary — gi40-prototype

Run: `npm test` (Vitest 5.1.2, jsdom 31.0.1). Result on 2026-11-25: **7 files, 135 tests, all passing**.

| File | Covers |
| --- | --- |
| `tests/search.test.js` | FR-1, FR-4, FR-5, FR-17: matching, brand search, auto-correct, live-suggestion ranking, barcode lookup; sample data integrity (all German) |
| `tests/leaflet.test.js` | FR-6, FR-7: section order as stored, NEW tag window, audio text |
| `tests/storage.test.js` | FR-9, FR-10, FR-11, NFR-4: history, requests, blocked or corrupted storage, email validation |
| `tests/recognition.test.js` | AD-6 stand-ins |
| `tests/i18n.test.js` | FR-16, AD-9: translation lookup and fallback, language preference storage, every UI string has a German entry, placeholders match, German content mirrors English |
| `tests/provider.test.js` | FR-19 to FR-23, AD-7, AD-8: data policy (German market and language only, malformed rejected, verbatim text, https links only), latest-version selection, version compare, freshness, PZN/GTIN detection, sample provider, HTTP provider against the API contract with a mocked `fetch` (endpoints, filtering, 404, network/HTTP/JSON errors, requests) |
| `tests/flow.test.js` | UJ-1, UJ-3, UJ-4 and FR-12, FR-13, FR-16, FR-17, FR-18, FR-20 to FR-23 through the real DOM (also FR-24 to FR-26: print, pictorial instructions, jump buttons, unchanged side-effects section, no Important tags): typo to leaflet, sections, history, request flow, delete, More menu, hamburger menu, language toggle across pages, live suggestions (mouse, keyboard, Esc, typo, German label), PZN search, service-down error with Try again, leaflet load failure, not found from service, source and stale warning, current version from history, typed PZN in scan dialog; leaflets displayed word for word in both interface languages with no truncation styling; sections in the leaflet's own order with an Important marker on critical ones |

Also verified manually in headless Chromium against `vite preview` (built output): no console errors; no horizontal scroll at 390, 768, 1024, 1280 px; pages and dialogs render as designed.

Not automated: real microphone, camera and speech output, a real Leaflet Service, visual regression, Lighthouse accessibility score (SM-5).

Dummy data: the 30 sample leaflets are invented for demonstration purposes only; tests assert they are German, flagged `sample`, and shown with the dummy-content notice (including the Diclac Dolo search used in the comparison with the live GI 4.0 site).
