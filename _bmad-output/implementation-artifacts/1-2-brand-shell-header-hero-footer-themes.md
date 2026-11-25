# Story 1.2: Brand shell (header, hero, footer, themes)

Status: done

## Story

As a visitor,
I want a PharmaProtect-branded header, hero and footer on every page,
So that I recognise the product family and can navigate anywhere.

## Acceptance Criteria

**Given** any page
**When** it loads
**Then** I see the GI 4.0 logo, links Home, My medicines and a More menu with Instructions, FAQs, Contact, Legal notice and Privacy
**And** a hero with a bold keyword and a lighter line specific to the page
**And** a footer with the product line, three link columns and a legal bar
**And** the More menu closes on outside click, Esc or selection and exposes `aria-expanded`
**And** the site uses a single light theme.

## Tasks / Subtasks

- [x] Implement behaviour in `index.html`, `src/styles.css`, `src/app/app.js`
- [x] Add or extend tests (tests/flow.test.js (shell))
- [x] Verify in the built site (headless browser, desktop 1280 and phone 390)

## Dev Notes

- Architecture rules that apply: AD-5, UX-1..4 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- UX: `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/` (DESIGN.md, EXPERIENCE.md).
- Requirements: `_bmad-output/planning-artifacts/epics.md` and the PRD.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### Implementation Plan
Implemented the existing validated prototype behaviour inside the layered structure (data / domain / app).

### File List
- `index.html`
- `src/styles.css`
- `src/app/app.js`
- `src/app/router.js`
- `src/data/content.js (HERO)`
- `public/assets/cube.png`

### Tests
- tests/flow.test.js (shell)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
