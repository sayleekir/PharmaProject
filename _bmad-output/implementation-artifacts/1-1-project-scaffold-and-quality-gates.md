# Story 1.1: Project scaffold and quality gates

Status: done

## Story

As a developer,
I want a Vite and Vitest project with the layered folder structure,
So that every story lands in a consistent, testable place.

## Acceptance Criteria

**Given** a fresh checkout
**When** I run `npm ci` and `npm run dev`
**Then** the site is served locally
**And** `npm test` runs the unit and flow tests and `npm run build` produces `dist/`
**And** the folders `src/data`, `src/domain`, `src/app` exist as in the architecture spine.

## Tasks / Subtasks

- [x] Implement behaviour in `package.json`, `package-lock.json`, `vite.config.js`
- [x] Add or extend tests (tests/* (runner))
- [x] Verify in the built site (headless browser, desktop 1280 and phone 390)

## Dev Notes

- Architecture rules that apply: AD-1, AR-7 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- UX: `_bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/` (DESIGN.md, EXPERIENCE.md).
- Requirements: `_bmad-output/planning-artifacts/epics.md` and the PRD.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### Implementation Plan
Implemented the existing validated prototype behaviour inside the layered structure (data / domain / app).

### File List
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `src/main.js`
- `index.html`
- `.gitignore`

### Tests
- tests/* (runner)

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
