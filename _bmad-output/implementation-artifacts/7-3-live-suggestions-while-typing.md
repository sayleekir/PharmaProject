# Story 7.3: Live suggestions while typing

Status: done

## Story

As a patient,
I want to see recommendations while I type,
So that I find my medicine faster.

## Acceptance Criteria

**Given** the search box on Home
**When** I type at least one letter
**Then** up to five matching medicines appear with the typed letters highlighted
**And** a misspelling from three letters still suggests the right medicine
**And** I can choose with tap, click or arrow keys and Enter, which opens the leaflet
**And** Esc closes the list and a failing service shows no list.

## Tasks / Subtasks

- [x] Implement behaviour in `src/domain/search.js (autocomplete)`, `src/app/views/autocomplete.js`, `src/app/views/home.js`
- [x] Add or extend tests (tests/search.test.js (autocomplete), tests/flow.test.js (Live suggestions))
- [x] Verify in the built site (headless browser, desktop and phone)

## Dev Notes

- Architecture rules that apply: AD-7 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- API contract for live data: `docs/api-contract.md`.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### File List
- `src/domain/search.js (autocomplete)`
- `src/app/views/autocomplete.js`
- `src/app/views/home.js`

### Tests
- tests/search.test.js (autocomplete)
- tests/flow.test.js (Live suggestions)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
