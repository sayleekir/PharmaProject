# Story 9.1: Align the user stories and close the gaps

Status: done

As the product owner, I want the user stories (edited by the stakeholder, now 9 stories) to match the prototype, so that they are an accurate acceptance baseline.

## Acceptance criteria
1. `docs/USER_STORIES.md` is the stakeholder-edited version, numbered 1 to 9, with the use-case table pointing at the right stories.
2. Print (story 6, FR-24): the Print button opens all sections before printing; the print layout hides menus and banner and shows the version date and a check-the-website reminder.
3. Pictorial instructions (story 3, FR-25): sample pictograms with German captions under section 3 of Salbutamol, Xylometazolin, Paracetamol and Diclac Dolo; 4 across on wide screens, 2 on phones; optional `pictures` field in the API contract.
4. Extra kept although the edited stories no longer list it (FR-26): the jump buttons. The "not listed does not mean safe" reminder was removed on request, so the side-effects section shows only the approved text.
5. Removed on request: "Important" tags and the hospital reminder.
6. Tests in `tests/flow.test.js` cover jump buttons, print, pictograms, the unchanged side-effects section and the absence of Important tags and the hospital note.

## Open items
- The edit removed the language switch, privacy page, A+/A- and high-contrast stories. The prototype still has the language switch and privacy page (earlier stakeholder requests); A+/A-, high contrast and dark mode stay out.
