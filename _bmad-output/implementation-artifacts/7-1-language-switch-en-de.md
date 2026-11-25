# Story 7.1: Language switch EN | DE

Status: done

## Story

As a visitor,
I want to switch the interface between English and German,
So that I can use the site in my language.

## Acceptance Criteria

**Given** any page
**When** I choose DE in the header
**Then** the interface, hero lines, Instructions and FAQs are German and the choice is remembered
**And** the text I typed in the search box is kept
**And** leaflet text is never translated
**And** every interface string has a German translation (automated check).

## Tasks / Subtasks

- [x] Implement behaviour in `src/domain/i18n.js`, `src/app/i18n.js`, `src/data/i18n.de.js`
- [x] Add or extend tests (tests/i18n.test.js, tests/flow.test.js (Language toggle))
- [x] Verify in the built site (headless browser, desktop and phone)

## Dev Notes

- Architecture rules that apply: AD-9 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- API contract for live data: `docs/api-contract.md`.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### File List
- `src/domain/i18n.js`
- `src/app/i18n.js`
- `src/data/i18n.de.js`
- `src/data/content.de.js`
- `index.html (data-t attributes, toggle)`

### Tests
- tests/i18n.test.js
- tests/flow.test.js (Language toggle)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
