# Story 7.2: Mobile hamburger menu

Status: done

## Story

As a phone user,
I want all navigation in a hamburger menu with the language toggle beside it,
So that the header stays compact.

## Acceptance Criteria

**Given** a screen 620 px wide or narrower
**When** the page loads
**Then** the header shows the logo, EN | DE and a hamburger button
**And** the menu lists all seven pages, marks the current one, and closes on selection, outside click or Esc
**And** wider screens keep the full header.

## Tasks / Subtasks

- [x] Implement behaviour in `index.html (burger, mobile menu)`, `src/app/app.js`, `src/styles.css (mobile header)`
- [x] Add or extend tests (tests/flow.test.js (Mobile hamburger menu))
- [x] Verify in the built site (headless browser, desktop and phone)

## Dev Notes

- Architecture rules that apply: AD-5 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- API contract for live data: `docs/api-contract.md`.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### File List
- `index.html (burger, mobile menu)`
- `src/app/app.js`
- `src/styles.css (mobile header)`

### Tests
- tests/flow.test.js (Mobile hamburger menu)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
