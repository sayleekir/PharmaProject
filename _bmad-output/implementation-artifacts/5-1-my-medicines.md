# Story 5.1: My medicines

Status: done

## Story

As a returning user,
I want to see what I looked at and requested,
So that I can reopen a leaflet.

## Acceptance Criteria

**Given** I viewed leaflets and sent requests
**When** I open My medicines
**Then** viewed medicines are listed newest first with version
**And** pending requests are listed with the email or "No email alert"
**And** empty states read "No medicines viewed yet." and "None."
**And** all data is stored only on the device.

## Tasks / Subtasks

- [x] Implement behaviour in `src/domain/storage.js`, `src/app/views/history.js`, `src/app/state.js`
- [x] Add or extend tests (tests/storage.test.js, tests/flow.test.js)
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
- `src/domain/storage.js`
- `src/app/views/history.js`
- `src/app/state.js`

### Tests
- tests/storage.test.js
- tests/flow.test.js

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
