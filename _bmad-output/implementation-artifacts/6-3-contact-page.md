# Story 6.3: Contact page

Status: done

## Story

As a visitor,
I want to reach the company,
So that I can ask or give feedback.

## Acceptance Criteria

**Given** the Contacts page
**When** it opens
**Then** Office (E/T/F), Data protection and Got feedback cards are stacked one per row inside the standard 640 px page column, with equal 24 px gaps between cards and to the Information services panel
**And** a location band shows the address, a Directions link and a photo
**And** Location and Info services footer links scroll to those sections.

## Tasks / Subtasks

- [x] Implement behaviour in `src/app/views/contact.js`, `src/styles.css (.cgrid, .cc, .info, .loc)`, `public/assets/team.jpg`
- [x] Add or extend tests (tests/flow.test.js (Contact))
- [x] Verify in the built site (headless browser, desktop 1280 and phone 390)

## Dev Notes

- Architecture rules that apply: AD-5 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- UX: `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/` (DESIGN.md, EXPERIENCE.md).
- Requirements: `_bmad-output/planning-artifacts/epics.md` and the PRD.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### Implementation Plan
Implemented the existing validated prototype behaviour inside the layered structure (data / domain / app).

### File List
- `src/app/views/contact.js`
- `src/styles.css (.cgrid, .cc, .info, .loc)`
- `public/assets/team.jpg`

### Tests
- tests/flow.test.js (Contact)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
- 2026-11-25: Stakeholder change: all pages use the same 640 px column as Home, so the three contact cards stack one per row (they were three across before). The location band and footer stay full width.
