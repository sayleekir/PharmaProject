# Story 8.2: German market and German leaflets only

Status: done

## Story

As a patient in Germany,
I want only German leaflets for medicines sold in Germany,
So that I read the authoritative text.

## Acceptance Criteria

**Given** any provider result
**When** a record is not `market = DE` and `lang = de`, or is incomplete
**Then** it is dropped from lists and rejected as a leaflet
**And** all sample leaflets are German dummy data added for demonstration, flagged as sample and labelled on screen as dummy content
**And** Home states that the website covers medicines sold in Germany and that leaflets are only available in German.

## Tasks / Subtasks

- [x] Implement behaviour in `src/domain/leaflet.js (normalizeSummary, normalizeLeaflet)`, `src/data/leaflets.js (German samples)`, `src/app/views/home.js (note)`
- [x] Add or extend tests (tests/provider.test.js (data policy), tests/search.test.js (integrity))
- [x] Verify in the built site (headless browser, desktop and phone)

## Dev Notes

- Architecture rules that apply: AD-8 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- API contract for live data: `docs/api-contract.md`.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### File List
- `src/domain/leaflet.js (normalizeSummary, normalizeLeaflet)`
- `src/data/leaflets.js (German samples)`
- `src/app/views/home.js (note)`

### Tests
- tests/provider.test.js (data policy)
- tests/search.test.js (integrity)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
- 2026-11-25: Dummy data extended to 30 medicines (numbered leaflet structure) for demonstration purposes only; on-screen sample notice added.
