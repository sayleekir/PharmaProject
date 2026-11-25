# Story 3.2: Section navigation

Status: done

## Story

As a patient,
I want each section as a collapsible row,
So that I find "How to use" or "Side effects" quickly.

## Acceptance Criteria

**Given** an open leaflet
**When** I tap a section row
**Then** that section opens or closes (minus icon open, plus icon closed); all sections are open at first so the reader cannot miss one, until the reader closes them
**And** Collapse all and Expand all close or open every section, and the button label always shows the next action
**And** on screens 900 px and wider the leaflet details, notices and buttons are in a left column and the accordion is on the right; below 900 px it is one column (no section index)
**And** Listen, Collapse all and Print sit above the "Prototype sample" note, and a "Jump to a section" card (What it is for, How to use, Side effects) opens and briefly highlights that section
**And** Print opens every section and prints the leaflet with its version date and a reminder to check the website for the latest version.

## Tasks / Subtasks

- [x] Implement behaviour in `src/app/views/leaflet.js`, `src/styles.css (.lf)`
- [x] Add or extend tests (tests/flow.test.js (sections))
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
- `src/app/views/leaflet.js`
- `src/styles.css (.lf)`

### Tests
- tests/flow.test.js (sections)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
- 2026-11-25: Stakeholder change: the side index and section buttons were replaced by an accordion (collapsible rows, plus and minus icons, Expand all / Collapse all), as on the current GI 4.0 site. Story keeps its original name for tracking.
- 2026-11-25: Stakeholder change: info cards and buttons stay in a left column, accordion on the right (two columns from 900 px).
- 2026-11-25: Stakeholder change: all accordion rows are open by default so no section is missed; the reader closes them.
- 2026-11-25: Added Jump to a section, Print (a "not listed does not mean safe" reminder was added and then removed on request); the three buttons moved above the sample note. A hospital reminder was added and then removed on request.
