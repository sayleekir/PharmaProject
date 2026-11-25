# Story 3.4: German original-language leaflets

Status: done

## Story

As a German patient,
I want leaflets in German as approved,
So that I read the authoritative text.

## Acceptance Criteria

**Given** a German medicine such as Aspirin
**When** its leaflet opens
**Then** the section names and text are German
**And** a Deutsch tag is shown
**And** nothing is translated.

## Tasks / Subtasks

- [x] Implement behaviour in `src/data/leaflets.js`, `src/app/views/leaflet.js`
- [x] Add or extend tests (tests/search.test.js (integrity), tests/flow.test.js (German))
- [x] Verify in the built site (headless browser, desktop 1280 and phone 390)

## Dev Notes

- Architecture rules that apply: AD-3 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- UX: `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/` (DESIGN.md, EXPERIENCE.md).
- Requirements: `_bmad-output/planning-artifacts/epics.md` and the PRD.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### Implementation Plan
Implemented the existing validated prototype behaviour inside the layered structure (data / domain / app).

### File List
- `src/data/leaflets.js`
- `src/app/views/leaflet.js`

### Tests
- tests/search.test.js (integrity)
- tests/flow.test.js (German)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
