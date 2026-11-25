# Story 5.2: Delete my data

Status: done

## Story

As a privacy-minded user,
I want to delete my history and requests,
So that nobody else can see them.

## Acceptance Criteria

**Given** the Privacy page or My medicines
**When** I choose a delete action and confirm
**Then** the data is removed and a toast confirms
**And** cancel leaves the data intact
**And** the app works if localStorage is unavailable.

## Tasks / Subtasks

- [x] Implement behaviour in `src/app/views/privacy.js`, `src/app/ui.js (confirmDialog)`
- [x] Add or extend tests (tests/storage.test.js (resilience), tests/flow.test.js (UJ-4))
- [x] Verify in the built site (headless browser, desktop 1280 and phone 390)

## Dev Notes

- Architecture rules that apply: AD-2 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- UX: `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/` (DESIGN.md, EXPERIENCE.md).
- Requirements: `_bmad-output/planning-artifacts/epics.md` and the PRD.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### Implementation Plan
Implemented the existing validated prototype behaviour inside the layered structure (data / domain / app).

### File List
- `src/app/views/privacy.js`
- `src/app/ui.js (confirmDialog)`

### Tests
- tests/storage.test.js (resilience)
- tests/flow.test.js (UJ-4)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
- 2026-11-25: Context: the site is built for Germany where data privacy is a major concern, so a dedicated Privacy page exists.
