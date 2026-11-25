# Code Review — gi40-prototype (all stories)

Date: 2026-11-25. Method: `bmad-code-review` checklist applied by the implementing agent (no separate reviewer available; a fresh-context, different-model review is recommended before production use).

## Scope
All files under `src/`, `index.html`, `tests/`, against the PRD, UX spec and architecture spine.

## Findings

| # | Severity | Finding | Resolution |
| --- | --- | --- | --- |
| 1 | Medium | The prototype's original search matched `n.includes(m.id)`, so "paracetamol" also returned Cetirizine (`cet` inside "paracetamol"). | Fixed. Search rewritten (exact word match, then edit-distance auto-correct). Covered by `tests/search.test.js` "does not return unrelated medicines". |
| 2 | Low | Decorative emoji on the three search mode buttons were read by screen readers. | Fixed. `aria-hidden="true"` on the icon spans in `views/home.js`. |
| 3 | Low | `localStorage` access could throw in private mode. | Already handled: `safeLocalStorage()` + in-memory fallback, tested in `tests/storage.test.js`. |
| 4 | Low | All interpolated text must be HTML-escaped. | Verified: every dynamic value goes through `esc()`; static contact HTML contains no user data. |
| 5 | Info | Voice recognition, photo and scan are simulated stand-ins (AD-6). | Accepted for the prototype; documented in PRD and README. |
| 6 | Info | Legal and privacy texts are client-supplied (Rote Liste Service GmbH) and unreviewed. | Open question 2 in the PRD. |
| 7 | Info | Voice and audio rely on the Web Speech API, which is unavailable in some browsers and in sandboxed iframes. | Handled with toasts and text alternatives (AD-4). |

## Verdict
Approve for prototype use. No blocking findings.


## Addendum: live-data layer, language, suggestions, mobile menu (later changes)

| # | Severity | Finding | Resolution |
| --- | --- | --- | --- |
| 8 | High | A request to "search the whole internet" would let unapproved or outdated text reach patients and breaks the approved-leaflet rule (Figma board: "Use of any unapproved text" rejected). | Not built. Search goes through one Leaflet Service limited to approved sources (AD-7, AD-8, `docs/api-contract.md`); PRD non-goal added. |
| 9 | Medium | Scanning a typed PZN returned nothing because the stand-in only matched barcodes. | Fixed in `sample.js`; covered by `tests/flow.test.js` (scan dialog accepts a typed PZN). |
| 10 | Medium | Late async answers could overwrite a page the user had already left. | Fixed: `withSpinner` ignores results when the navigation epoch changed; suggestion requests carry a sequence number. |
| 11 | Medium | "Contains" matching on a single typed letter flooded suggestions. | Fixed: contains-matching only from 3 characters (`tests/search.test.js`). |
| 12 | Low | Test selector `.sec` also matched secondary buttons. | Fixed the test to use `#body`. |
| 13 | Info | German translations were written by the implementing agent. | Needs native-speaker review before public use (PRD open questions). |
| 14 | Info | The HTTP provider is covered with a mocked `fetch` only; no real service exists yet. | Contract tests are in `tests/provider.test.js`; run against the real service when available. |

Verdict unchanged: approve for prototype use.

| 15 | Medium | Search box and the three mode buttons looked wrong in a viewer that applies dark form-control defaults (grey input, invisible button labels): inputs and buttons had no explicit text or background colour, and the focus ring was a leftover indigo. | Fixed: explicit colours on all inputs and buttons, `color-scheme: only light`, navy focus ring; guarded by tests in `tests/flow.test.js`. |

