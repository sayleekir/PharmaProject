# Story 8.5: Service errors and retry

Status: done

## Story

As a patient,
I want a clear message when the service is down,
So that I can try again and am never shown wrong content.

## Acceptance Criteria

**Given** the Leaflet Service cannot be reached or answers badly
**When** I search, open a leaflet or scan
**Then** I see "Search is temporarily unavailable" with Try again and Back to search
**And** no partial or unapproved content is shown
**And** Try again repeats the same action.

## Tasks / Subtasks

- [x] Implement behaviour in `src/app/views/flow.js (searchError)`, `src/app/ui.js (withSpinner)`, `src/app/views/leaflet.js`
- [x] Add or extend tests (tests/provider.test.js (http errors), tests/flow.test.js (errors and retry))
- [x] Verify in the built site (headless browser, desktop and phone)

## Dev Notes

- Architecture rules that apply: AD-7, AD-8 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- API contract for live data: `docs/api-contract.md`.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### File List
- `src/app/views/flow.js (searchError)`
- `src/app/ui.js (withSpinner)`
- `src/app/views/leaflet.js`

### Tests
- tests/provider.test.js (http errors)
- tests/flow.test.js (errors and retry)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
