# Story 3.1: Leaflet view with version, notices and verbatim text

Status: done

## Story

As a patient,
I want to read the latest approved leaflet with its version,
So that I trust it is current.

## Acceptance Criteria

**Given** I confirmed a medicine
**When** the leaflet opens
**Then** version and publish date are shown, with a NEW tag when published within 60 days
**And** sections appear in the leaflet's own order; there are no "Important" tags
**And** a notice asks me to check dosage and that it was bought in Germany
**And** an MAH note shows when present
**And** the text is rendered verbatim with no translation or summary
**And** a checkbox "I have read the complete leaflet" exists
**And** the medicine is added to my history.

## Tasks / Subtasks

- [x] Implement behaviour in `src/domain/leaflet.js`, `src/app/views/leaflet.js`, `src/data/leaflets.js`
- [x] Add or extend tests (tests/leaflet.test.js, tests/flow.test.js (UJ-1))
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
- `src/domain/leaflet.js`
- `src/app/views/leaflet.js`
- `src/data/leaflets.js`

### Tests
- tests/leaflet.test.js
- tests/flow.test.js (UJ-1)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
- 2026-11-25: Changed at stakeholder request: sections are no longer reordered (leaflet shown as it is); critical sections were then marked "Important".
- 2026-11-25: Stakeholder change: the "Important" tags were removed.
