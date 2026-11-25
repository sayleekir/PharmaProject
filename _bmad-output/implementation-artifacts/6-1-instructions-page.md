# Story 6.1: Instructions page

Status: done

## Story

As a first-time visitor,
I want illustrated steps,
So that I know how to use the platform.

## Acceptance Criteria

**Given** More, Instructions
**When** the page opens
**Then** seven steps each show an icon, step number, title and text
**And** the doctor or pharmacist note is shown
**And** Start searching returns to Home.

## Tasks / Subtasks

- [x] Implement behaviour in `src/app/views/pages.js`, `src/data/content.js (STEPS, STEP_ICONS)`
- [x] Add or extend tests (tests/flow.test.js (Instructions))
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
- `src/app/views/pages.js`
- `src/data/content.js (STEPS, STEP_ICONS)`

### Tests
- tests/flow.test.js (Instructions)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
