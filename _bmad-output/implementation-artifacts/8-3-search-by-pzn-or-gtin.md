# Story 8.3: Search by PZN or GTIN

Status: done

## Story

As a pharmacy customer,
I want to search by the number on the pack,
So that I get the exact product.

## Acceptance Criteria

**Given** the search box or scan dialog
**When** I enter 7 to 14 digits
**Then** the medicine with that PZN or GTIN is suggested, or Not found is shown.

## Tasks / Subtasks

- [x] Implement behaviour in `src/domain/leaflet.js (looksLikeCode)`, `src/data/providers/sample.js`, `src/app/views/home.js (scan dialog)`
- [x] Add or extend tests (tests/provider.test.js, tests/flow.test.js (PZN))
- [x] Verify in the built site (headless browser, desktop and phone)

## Dev Notes

- Architecture rules that apply: AD-7 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- API contract for live data: `docs/api-contract.md`.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### File List
- `src/domain/leaflet.js (looksLikeCode)`
- `src/data/providers/sample.js`
- `src/app/views/home.js (scan dialog)`

### Tests
- tests/provider.test.js
- tests/flow.test.js (PZN)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
