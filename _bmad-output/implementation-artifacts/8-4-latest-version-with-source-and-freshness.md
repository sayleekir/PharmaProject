# Story 8.4: Latest version with source and freshness

Status: done

## Story

As a patient,
I want to see where the leaflet comes from and that it is current,
So that I can trust it.

## Acceptance Criteria

**Given** an open leaflet
**When** it is shown
**Then** version, publish date, source (linked if https) and check date are visible
**And** a warning appears when the check is older than 7 days
**And** opening a medicine from My medicines loads the current version.

## Tasks / Subtasks

- [x] Implement behaviour in `src/app/views/leaflet.js`, `src/app/views/history.js`, `src/domain/leaflet.js (isStale, selectLatest)`
- [x] Add or extend tests (tests/provider.test.js, tests/flow.test.js (source and freshness, history))
- [x] Verify in the built site (headless browser, desktop and phone)

## Dev Notes

- Architecture rules that apply: AD-8 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- API contract for live data: `docs/api-contract.md`.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### File List
- `src/app/views/leaflet.js`
- `src/app/views/history.js`
- `src/domain/leaflet.js (isStale, selectLatest)`

### Tests
- tests/provider.test.js
- tests/flow.test.js (source and freshness, history)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
