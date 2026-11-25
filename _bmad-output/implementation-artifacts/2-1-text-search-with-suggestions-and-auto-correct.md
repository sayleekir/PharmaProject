# Story 2.1: Text search with suggestions and auto-correct

Status: done

## Story

As a patient,
I want to type a medicine name and get suggestions even if I misspell it,
So that I can confirm the right medicine.

## Acceptance Criteria

**Given** the Home page
**When** I submit "ibuprofn"
**Then** Ibuprofen 400 mg is listed as a suggestion
**And** matching ignores case and whitespace
**And** submitting an empty query does nothing
**And** each suggestion is a 44 px touch target
**And** the query is added to my history.

## Tasks / Subtasks

- [x] Implement behaviour in `src/domain/search.js`, `src/app/views/home.js`, `src/app/views/flow.js`
- [x] Add or extend tests (tests/search.test.js, tests/flow.test.js (UJ-1))
- [x] Verify in the built site (headless browser, desktop 1280 and phone 390)

## Dev Notes

- Architecture rules that apply: AD-1 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- UX: `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/` (DESIGN.md, EXPERIENCE.md).
- Requirements: `_bmad-output/planning-artifacts/epics.md` and the PRD.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### Implementation Plan
Implemented the existing validated prototype behaviour inside the layered structure (data / domain / app).

### File List
- `src/domain/search.js`
- `src/app/views/home.js`
- `src/app/views/flow.js`

### Tests
- tests/search.test.js
- tests/flow.test.js (UJ-1)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
