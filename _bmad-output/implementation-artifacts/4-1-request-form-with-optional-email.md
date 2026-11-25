# Story 4.1: Request form with optional email

Status: done

## Story

As a patient,
I want to request a missing leaflet,
So that it gets added and I can be told.

## Acceptance Criteria

**Given** the Not found screen
**When** I open Request this leaflet
**Then** the medicine name is prefilled and email is optional
**And** an invalid email shows "Please check the email address." and is not sent
**And** I can send with or without an email.

## Tasks / Subtasks

- [x] Implement behaviour in `src/domain/validate.js`, `src/app/views/request.js`
- [x] Add or extend tests (tests/storage.test.js (email), tests/flow.test.js (UJ-3))
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
- `src/domain/validate.js`
- `src/app/views/request.js`

### Tests
- tests/storage.test.js (email)
- tests/flow.test.js (UJ-3)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
- 2026-11-25: Stakeholder change: centred the request form and removed the duplicate "Request leaflet" title (heading shown once).
