# Story 3.3: Listen to the leaflet

Status: done

## Story

As a patient with poor eyesight,
I want the leaflet read aloud,
So that I can follow without reading.

## Acceptance Criteria

**Given** an open leaflet
**When** I tap Listen
**Then** the shown sections are read and the button becomes Stop
**And** a second tap stops the audio
**And** German leaflets request a German voice
**And** when speech output is unsupported a message says so.

## Tasks / Subtasks

- [x] Implement behaviour in `src/app/capabilities.js`, `src/domain/leaflet.js (audioText)`, `src/app/views/leaflet.js`
- [x] Add or extend tests (tests/leaflet.test.js (audioText), tests/flow.test.js (unsupported))
- [x] Verify in the built site (headless browser, desktop 1280 and phone 390)

## Dev Notes

- Architecture rules that apply: AD-4 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- UX: `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/` (DESIGN.md, EXPERIENCE.md).
- Requirements: `_bmad-output/planning-artifacts/epics.md` and the PRD.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### Implementation Plan
Implemented the existing validated prototype behaviour inside the layered structure (data / domain / app).

### File List
- `src/app/capabilities.js`
- `src/domain/leaflet.js (audioText)`
- `src/app/views/leaflet.js`

### Tests
- tests/leaflet.test.js (audioText)
- tests/flow.test.js (unsupported)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
