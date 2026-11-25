# Story 6.2: FAQs page

Status: done

## Story

As a visitor,
I want answers to common questions,
So that I do not need to contact anyone.

## Acceptance Criteria

**Given** the FAQs page
**When** it opens
**Then** the sentence "If you have any questions about the medicine itself, please contact your doctor or pharmacist." is prominent
**And** each question expands and collapses
**And** a link leads to Contact.

## Tasks / Subtasks

- [x] Implement behaviour in `src/app/views/pages.js`, `src/data/content.js (FAQ)`
- [x] Add or extend tests (tests/flow.test.js (FAQs))
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
- `src/data/content.js (FAQ)`

### Tests
- tests/flow.test.js (FAQs)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
