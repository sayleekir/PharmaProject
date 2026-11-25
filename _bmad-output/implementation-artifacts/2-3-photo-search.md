# Story 2.3: Photo search

Status: done

## Story

As a carer,
I want to upload or take a photo of the medicine box,
So that the platform proposes the medicine.

## Acceptance Criteria

**Given** I choose a photo
**When** processing completes
**Then** candidate medicines are shown to confirm
**And** I can retake the photo or choose "None of these".

## Tasks / Subtasks

- [x] Implement behaviour in `src/domain/recognition.js`, `src/app/views/home.js`, `src/app/views/flow.js`
- [x] Add or extend tests (tests/recognition.test.js)
- [x] Verify in the built site (headless browser, desktop 1280 and phone 390)

## Dev Notes

- Architecture rules that apply: AD-6 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- UX: `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/` (DESIGN.md, EXPERIENCE.md).
- Requirements: `_bmad-output/planning-artifacts/epics.md` and the PRD.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### Implementation Plan
Implemented the existing validated prototype behaviour inside the layered structure (data / domain / app).

### File List
- `src/domain/recognition.js`
- `src/app/views/home.js`
- `src/app/views/flow.js`

### Tests
- tests/recognition.test.js

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
