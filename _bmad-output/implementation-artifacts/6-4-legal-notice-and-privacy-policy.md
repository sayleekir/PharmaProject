# Story 6.4: Legal notice and Privacy policy

Status: done

## Story

As a visitor,
I want the legal notice and privacy policy,
So that I understand terms and data handling.

## Acceptance Criteria

**Given** Legal notice or Privacy
**When** the page opens
**Then** the supplied legal text is shown verbatim
**And** Privacy shows the delete buttons first and the policy as expandable sections.

## Tasks / Subtasks

- [x] Implement behaviour in `src/app/views/pages.js (legal)`, `src/app/views/privacy.js`, `src/data/content.js (LEGAL, POLICY)`
- [x] Add or extend tests (tests/flow.test.js (Legal/Privacy))
- [x] Verify in the built site (headless browser, desktop 1280 and phone 390)

## Dev Notes

- Architecture rules that apply: AD-3 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- UX: `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/` (DESIGN.md, EXPERIENCE.md).
- Requirements: `_bmad-output/planning-artifacts/epics.md` and the PRD.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### Implementation Plan
Implemented the existing validated prototype behaviour inside the layered structure (data / domain / app).

### File List
- `src/app/views/pages.js (legal)`
- `src/app/views/privacy.js`
- `src/data/content.js (LEGAL, POLICY)`

### Tests
- tests/flow.test.js (Legal/Privacy)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
- 2026-11-25: Context: the site is built for Germany where data privacy is a major concern, so a dedicated Privacy page exists.
