# Story 2.5: Not found

Status: done

## Story

As a patient,
I want a clear message when no leaflet exists,
So that I know what to do next.

## Acceptance Criteria

**Given** a search with no match
**When** results load
**Then** "Leaflet not found" is shown as a centred block with a large heading, without a separate page title, with Request this leaflet and Search again.

## Tasks / Subtasks

- [x] Implement behaviour in `src/app/views/flow.js`
- [x] Add or extend tests (tests/flow.test.js (UJ-3))
- [x] Verify in the built site (headless browser, desktop 1280 and phone 390)

## Dev Notes

- Architecture rules that apply: none specific (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- UX: `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/` (DESIGN.md, EXPERIENCE.md).
- Requirements: `_bmad-output/planning-artifacts/epics.md` and the PRD.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### Implementation Plan
Implemented the existing validated prototype behaviour inside the layered structure (data / domain / app).

### File List
- `src/app/views/flow.js`

### Tests
- tests/flow.test.js (UJ-3)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
- 2026-11-25: Stakeholder change: removed the "Not found" page title, centred the block, enlarged the heading (also applied to the service-unavailable screen).
