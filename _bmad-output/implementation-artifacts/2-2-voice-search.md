# Story 2.2: Voice search

Status: done

## Story

As a patient,
I want to say the medicine name,
So that I do not have to type.

## Acceptance Criteria

**Given** I tap voice
**When** speech recognition is available and I speak
**Then** the transcript is searched like typed text
**And** when it is unavailable or fails a message offers typing or other modes.

## Tasks / Subtasks

- [x] Implement behaviour in `src/app/capabilities.js`, `src/app/views/home.js`
- [x] Add or extend tests (manual: simulated fallback)
- [x] Verify in the built site (headless browser, desktop 1280 and phone 390)

## Dev Notes

- Architecture rules that apply: AD-4, AD-6 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- UX: `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/` (DESIGN.md, EXPERIENCE.md).
- Requirements: `_bmad-output/planning-artifacts/epics.md` and the PRD.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### Implementation Plan
Implemented the existing validated prototype behaviour inside the layered structure (data / domain / app).

### File List
- `src/app/capabilities.js`
- `src/app/views/home.js`

### Tests
- manual: simulated fallback

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
