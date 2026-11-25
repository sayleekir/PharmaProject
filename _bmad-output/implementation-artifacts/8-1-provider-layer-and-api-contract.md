# Story 8.1: Provider layer and API contract

Status: done

## Story

As a developer,
I want one provider interface with a sample and an HTTP implementation and a written API contract,
So that real data can be connected without changing the views.

## Acceptance Criteria

**Given** the app
**When** it runs without `VITE_GI_API_BASE`
**Then** it uses the sample provider through the same async interface as the HTTP provider
**And** with `VITE_GI_API_BASE` set it calls only the documented endpoints
**And** `docs/api-contract.md` and `docs/openapi.yaml` describe the endpoints, types, rules and errors.

## Tasks / Subtasks

- [x] Implement behaviour in `src/data/providers/sample.js`, `src/data/providers/http.js`, `src/app/provider.js`
- [x] Add or extend tests (tests/provider.test.js)
- [x] Verify in the built site (headless browser, desktop and phone)

## Dev Notes

- Architecture rules that apply: AD-7 (see `_bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md`).
- API contract for live data: `docs/api-contract.md`.
- Figma source of flow and story map: https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS

## Dev Agent Record

### File List
- `src/data/providers/sample.js`
- `src/data/providers/http.js`
- `src/app/provider.js`
- `docs/api-contract.md`
- `docs/openapi.yaml`

### Tests
- tests/provider.test.js

### Completion Notes
All acceptance criteria met; `npm test` passes and `npm run build` succeeds.

## Change Log

- 2026-11-25: Implemented and moved to done.
