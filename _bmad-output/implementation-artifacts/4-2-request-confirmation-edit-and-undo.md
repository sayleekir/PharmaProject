# Story 4.2: Request confirmation, edit and undo

Status: done

## Story

As a patient,
I want to correct or cancel a request,
So that I stay in control.

## Acceptance Criteria

**Given** a sent request
**When** the confirmation shows
**Then** I can edit the email, undo the request or go back to Home
**And** undo removes it from My medicines.

## Tasks / Subtasks

- [x] Implement behaviour in `src/app/views/request.js`
- [x] Add or extend tests (tests/flow.test.js (UJ-3))
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
- `src/app/views/request.js`

### Tests
- tests/flow.test.js (UJ-3)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
- 2026-11-25: Stakeholder change: centred the confirmation and removed the duplicate "Request sent" title.
