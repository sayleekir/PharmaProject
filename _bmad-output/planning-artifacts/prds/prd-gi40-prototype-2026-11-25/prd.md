---
title: GI 4.0 Patient Leaflet Platform
status: final
created: 2026-11-25
updated: 2026-11-25
---

# PRD: GI 4.0 Patient Leaflet Platform (Prototype)

## 0. Document Purpose
This PRD is for the product owner at PharmaProtect Solutions GmbH, the UX and engineering leads, and anyone running downstream BMAD workflows (UX, architecture, epics, build). It builds on the product brief in `_bmad-output/planning-artifacts/briefs/brief-gi40-prototype-2026-11-25/brief.md` and the [FigJam story map and flow in Figma](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=35-3957). Vocabulary is anchored in the Glossary; FRs are numbered globally and reference journeys (UJ) and success metrics (SM).

## 1. Vision
GI 4.0 lets a patient or their helper reach the **latest approved Leaflet** of any medicine in seconds, in whichever way is easiest, read or hear it exactly as approved, and ask for it when it is missing. It is a website, branded as part of the PharmaProtect family, usable without an account.

## 2. Target User

### 2.1 Jobs To Be Done
- When I start a new medicine, I want to check how to take it so I do it safely.
- When something feels wrong after a dose, I want to check the side-effects section quickly.
- When I help a parent with their pills, I want to find the leaflet from the box without typing a long name.
- When I cannot read small print, I want the leaflet read aloud.
- When a leaflet is not available, I want to ask for it and be told when it arrives.
- When I share a device, I want my search history to be deletable.

### 2.2 Non-Users (v1)
Healthcare professionals needing specialist information (Fachinfo) and registered members; there is no login or member area in v1.

### 2.3 Key User Journeys

- **UJ-1. Maria checks the dosage of a new tablet.**
  - **Persona + context:** Maria, 74, was prescribed ibuprofen; her glasses are at the other end of the flat.
  - **Entry state:** phone browser, no account, first visit.
  - **Path:** types "ibuprofn" in the search box, taps the suggested "Ibuprofen 400 mg", reads the "Before you read" notice, scrolls to "How to use".
  - **Climax:** the screen shows the dosage in plain text with version v3.0 and publish date, so she knows it is current.
  - **Resolution:** the medicine appears under My medicines.
  - **Edge case:** the typo is far off; the suggestion list is empty and she is offered "Request this leaflet".

- **UJ-2. Jonas scans the box for his mother.**
  - **Persona + context:** Jonas, 45, carer, standing in the pharmacy.
  - **Entry state:** phone, camera permission available.
  - **Path:** taps Scan QR / barcode, scans, confirms the match.
  - **Climax:** the matching leaflet opens; he taps Listen and hands the phone to his mother.
  - **Resolution:** audio plays; he stops it with one tap.
  - **Edge case:** scan not recognised; a message offers retry, other input modes or request.

- **UJ-3. Elena asks for a missing leaflet.**
  - **Persona + context:** Elena, 38, rare medicine, no leaflet found.
  - **Entry state:** any device.
  - **Path:** reads "Leaflet not found", taps Request this leaflet, enters an optional email, sends.
  - **Climax:** sees "Request sent" with the medicine and the email shown.
  - **Resolution:** the request is listed in My medicines; she can edit the email or undo.
  - **Edge case:** she mistypes the email; the form asks her to check it before sending.

- **UJ-4. Klaus clears his traces.**
  - **Persona + context:** Klaus, 61, shared family tablet.
  - **Path:** opens More, Privacy, taps Delete my history, confirms.
  - **Climax:** history and requests are gone; toast confirms.
  - **Resolution:** My medicines is empty.

## 3. Glossary
- **Leaflet** (Gebrauchsinformation) — the approved patient information for one medicine, in its original language. Exists in versions; only the latest approved version is shown.
- **Medicine** — a product the user searches for, identified by name, brand and a barcode.
- **Suggestion** — a Medicine proposed by the platform for the user to confirm. A Suggestion is never opened without confirmation.
- **Confirmation** — the user's touch on a Suggestion.
- **Section** — a named part of a Leaflet (for example "How to use"). Sections are shown in the Leaflet's own order;
- **Request** — a user's ask to add a missing Leaflet to the database, optionally with an email.
- **History** — Medicines the user searched or opened, stored only on the user's device.
- **MAH** — marketing authorisation holder who supplies the approved Leaflet.
- **Hero** — the branded banner with headline at the top of every page.
- **Leaflet Service** — the back end that answers the website: it searches approved sources only and returns the latest approved Leaflet. See `docs/api-contract.md`.
- **Provider** — the front-end adapter that talks to the Leaflet Service (or to built-in sample data in the prototype).
- **Approved source** — a source whose leaflet text is approved: the MAH or pharma association feed, Gebrauchsinformation 4.0 / PatientenInfo-Service data of Rote Liste Service GmbH, or the official BfArM database. The open internet is not an approved source.
- **PZN / GTIN** — Pharmazentralnummer and global trade item number printed on German packs; accepted as search input.

## 4. Features

### 4.1 Search by text, voice, photo or scan
**Description:** From Home the user searches a Medicine by typing, by speaking, by photo of the box or by scanning a QR code or barcode. Realizes UJ-1, UJ-2.

#### FR-1: Text search
A user can type a medicine name, brand or dosage into the search box and submit. Realizes UJ-1.
**Consequences (testable):**
- A query that matches one or more Medicines returns Suggestions.
- Matching ignores case and surrounding whitespace.
- An empty query is not submitted.

#### FR-2: Voice search
A user can say the medicine name; the spoken text is used as a text search. Realizes UJ-2.
**Consequences:**
- If speech recognition is unavailable or fails, a message offers retry or other modes and text search stays available.
- Voice is never the only way to use any feature.

#### FR-3: Photo search
A user can take or upload a photo of the medicine box; the platform proposes candidate Medicines to confirm.
**Consequences:**
- The user can retake the photo or choose "None of these".
- [ASSUMPTION: image-to-text is simulated in the prototype and returns sample candidates.]

#### FR-4: QR / barcode scan
A user can scan the code on the pack and receive the matching Medicine as a Suggestion. Realizes UJ-2.
**Consequences:**
- A recognised code yields exactly one Suggestion; an unknown code leads to Not found.
- [ASSUMPTION: camera scan is simulated with sample codes in the prototype.]

### 4.2 Suggestions and confirmation
#### FR-5: Suggest and confirm
The platform shows Suggestions and opens a Leaflet only after the user's Confirmation. Realizes UJ-1.
**Consequences:**
- A misspelled name (for example "ibuprofn") still yields the intended Medicine as a Suggestion (auto-correct).
- Each Suggestion shows name and brand and has a touch target of at least 44 px.
- The user can leave the list via "None of these" to the Request flow.

### 4.3 Reading the Leaflet
#### FR-6: Show the latest approved Leaflet
A user can read the Leaflet of a confirmed Medicine. Realizes UJ-1.
**Consequences:**
- Version and publish date are shown; Leaflets published within 60 days carry a NEW tag.
- Sections appear exactly in the Leaflet's own order, never reordered; the
- Sections are shown as an accordion on the right, with the Leaflet details (version, source, notices) and the Listen and Expand all buttons in a column on the left (single column below 900 px; no section index): each Section is a collapsible row with a plus or minus icon. All rows are open at first, so the reader cannot miss a Section, and stay open until the reader closes them; Collapse all / Expand all closes or opens every row.
- Text is shown verbatim in its original language (German leaflets stay German); no translation or summary exists.
- A notice asks the user to check the dosage on the box and that the medicine was bought in Germany.
- An MAH note about a formula change is shown when present.
- A checkbox "I have read the complete leaflet" is available.

#### FR-7: Listen to the Leaflet
A user can listen to the whole Leaflet read aloud. Realizes UJ-2.
**Consequences:**
- Audio can be stopped with one tap; German leaflets are read with a German voice when available.
- A written statement says audio does not replace the written Leaflet.
- If speech output is unsupported, a message says so.

### 4.4 Missing Leaflet
#### FR-8: Not found
When no Medicine matches, the platform clearly says "Leaflet not found" and offers Request, or Search again. Realizes UJ-3.

#### FR-9: Request a Leaflet
A user can request a Leaflet with an optional email. Realizes UJ-3.
**Consequences:**
- A request can be sent with an email, or without.
- An invalid email blocks sending with a clear message.
- After sending, the user can edit the email, undo the Request, or return to Home.
- Requests are listed under My medicines.

### 4.5 Control over my data
#### FR-10: My medicines
A user can see their History and pending Requests, stored on the device only, and reopen a Leaflet from it. Realizes UJ-1.

#### FR-11: Delete my data
*Context: the site is built for Germany, where data privacy is a major concern, so a separate Privacy page exists (see FR-12). It combines these delete controls with the full privacy policy.*

A user can delete History, and separately Requests and email, each with a confirmation step. Realizes UJ-4.
**Consequences:**
- No data about the user exists on any server in the prototype.
- No account or login is needed anywhere.

### 4.6 Information pages
#### FR-12: Instructions, FAQs, Contact, Legal notice, Privacy
The site provides: Instructions (illustrated steps), FAQs (including "ask your doctor or pharmacist"), Contact (Office, Data Protection, Feedback, address with directions, information services), Legal notice and Privacy policy, reachable from the header menu and footer.

### 4.7 Brand and responsiveness
#### FR-13: PharmaProtect look and feel, responsive
*Context: GI 4.0 is being taken over by PharmaProtect Solutions GmbH, so the UI follows PharmaProtect's branding and the GI 4.0 logo is made the way the logos of other PharmaProtect projects (for example ACS PharmaProtect) are.*

The site follows the PharmaProtect brand (palette, Barlow type, hero banners with a bold keyword and a lighter line, GI 4.0 logo, footer with product line) and adapts from 360 px to 1440 px without horizontal scrolling. The site has a single light theme.

### 4.8 Deferred
#### FR-14: Text size control *(Deferred)*
Header buttons to enlarge text were built and then removed at stakeholder request. [NON-GOAL for MVP] Revisit as an accessibility feature elsewhere (for example on the Leaflet page).

#### FR-15: Print the Leaflet *(Built, see FR-24)*
Moved out of the deferred list: the Leaflet page has a Print button (FR-24).


### 4.9 Language, suggestions and navigation
#### FR-16: Language switch
A user can switch the interface between English and German with an EN | DE toggle in the header; the choice is remembered on the device. Leaflet text is never translated; the legal notice and privacy policy stay in the language supplied.
**Consequences:** all interface text, hero lines, Instructions and FAQs follow the language; typed search text survives a switch; German strings have English fallbacks.

#### FR-17: Live suggestions while typing
While a user types in the search box, matching medicines appear in a list (name and brand, matched letters highlighted); choosing one (tap, click or Enter) opens its Leaflet. Realizes UJ-1.
**Consequences:** works from the first letter, tolerates typos from 3 letters, is keyboard and screen-reader operable (combobox), ignores outdated responses, and shows nothing if the service fails.

#### FR-18: Mobile hamburger menu
On phones (620 px and narrower) the whole header navigation sits in a hamburger menu with the EN | DE toggle to its left; wider screens show the full header.

### 4.10 Live data from approved sources
#### FR-19: German market and German leaflets only
The site covers medicines sold in Germany and shows Leaflets in German only, for legal reasons. A notice says so on Home.
**Consequences (testable):**
- Any record that is not `market = DE` and `lang = de` is dropped before it reaches the UI.
- The built-in sample data contains German leaflets only.

#### FR-20: Live data through the Leaflet Service
Search, suggestions, lookup, photo and code recognition and leaflet requests go through one Provider to the Leaflet Service, which uses approved sources only. The open internet is never searched from the browser. Realizes UJ-1, UJ-2, UJ-3.
**Consequences:** the data source is switched by one build setting (`VITE_GI_API_BASE`); without it the prototype uses sample data through the same interface; the contract is `docs/api-contract.md` and `docs/openapi.yaml`.

#### FR-21: Search by PZN or GTIN
A number of 7 to 14 digits typed in the search box or the scan dialog is looked up as a PZN or GTIN/EAN.

#### FR-22: Latest approved version, with provenance and freshness
A Leaflet always shows the latest approved version. Opening a medicine from My medicines loads the current version, not a stored one. The Leaflet shows its source (linked when an https link is provided) and the date it was last checked, and warns when that check is older than 7 days.
**Consequences:** the Leaflet Service must return only the newest approved version (newest publish date, then highest version); the front end validates and rejects incomplete leaflets.

#### FR-23: Service errors
If the Leaflet Service cannot be reached or answers badly, the user sees "Search is temporarily unavailable" with Try again and Back to search. The site never shows partial, cached-unapproved or open-web content instead.


#### FR-24: Print the Leaflet
The Leaflet page has a Print button. Printing opens every section, hides menus, buttons and banner, and adds the medicine name, version, version date and a reminder to check the website for the latest version. (Use case UC4; browsers may block the print window in embedded previews, so test in a normal browser tab.)

#### FR-25: Pictorial instructions
A Leaflet may carry pictorial instructions (images with a German caption) shown under section 3. They scale with the screen: four across on wide screens, two on phones. Four dummy leaflets have sample pictograms (Salbutamol, Xylometazolin, Paracetamol, Diclac Dolo). Real images come through the optional `pictures` field of the Leaflet Service.

#### FR-26: Jump to a section
A "Jump to a section" card opens and briefly highlights What it is for, How to use or Side effects.  The side-effects section shows only the approved text; no reminder is added. Sections show no "Important" tags.

## 5. Non-Goals (Explicit)
- No translation or summarisation of Leaflets, ever.
- No login, member area, or personal accounts.
- No native iOS or Android apps.
- No search of the open internet and no unapproved text: leaflets come only from approved sources through the Leaflet Service (Figma board: "Use of any unapproved text" is a rejected option).
- No leaflets outside Germany and none in other languages.
- No medical advice or symptom checking; questions about the medicine go to doctor or pharmacist.
- No storage of personal data on servers beyond an optional email for a Request in a future back end.

## 6. MVP Scope
### 6.1 In Scope
FR-1 to FR-13 and FR-16 to FR-23 with dummy sample data added for demonstration purposes (30 made-up medicines, all German; text, versions, dates, PZNs and barcodes are invented and are not real medical information), simulated AI/camera, no server. The live Leaflet Service is specified (docs/api-contract.md) but not built.
### 6.2 Out of Scope for MVP
Building the Leaflet Service and connecting the approved sources, real OCR and speech services, email delivery, chat assistant, change notifications, print, text-size control.

## 7. Success Metrics
**Primary**
- **SM-1**: Time from landing to opened Leaflet in moderated tests, median under 60 s. Validates FR-1 to FR-6.
- **SM-2**: Share of test users who reach the correct Medicine from a misspelling in one confirmation, at least 90%. Validates FR-5.
- **SM-3**: Stakeholder sign-off that the UI is consistent with PharmaProtect branding. Validates FR-12, FR-13.

**Secondary**
- **SM-4**: Test users who can delete their data without help, at least 90%. Validates FR-11.
- **SM-5**: Lighthouse accessibility score of at least 95 on Home and Leaflet. Validates FR-6, FR-13.

**Counter-metrics (do not optimize)**
- **SM-C1**: Number of Requests with an email entered. Do not push users to give an email. Counterbalances SM-1.

## 8. Open Questions
1. Which PZN/GTIN data source will be used, and who supplies Leaflet updates?
2. What legal text should replace the Rote Liste Service GmbH notice and policy supplied for the prototype?
3. Should text-size control return, and where?
4. Which email service and data processor will send Request notifications?

9. Which approved sources and licences will the Leaflet Service use (Rote Liste Service GmbH / GI 4.0 data-sharing agreement, BfArM AMIce / AM-FDB access, MAH feeds), and who operates the service?
10. What publication delay is acceptable between an authority approving a new leaflet version and the site showing it?

## 9. Assumptions Index
- FR-3 / FR-4: photo and scan are simulated in the prototype.
- **Dummy data is used for demonstration purposes only.** The 30 sample leaflets are invented placeholders, flagged `sample` and labelled on screen as dummy content. They represent the shape of the real Leaflet database; PZNs and barcodes are made up.
- "Search all over the internet" is interpreted as: search all approved German sources through one back end, not the open web (see Non-Goals).
- Legal and privacy texts are supplied verbatim by the client and not legally reviewed here.

## References

- **Figma / FigJam board (source of the flow, story map and tech ecosystem):** [PharmaProtect Solutions (PPS)](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=36-4253)
  - Flow and architecture diagram (Search, AI suggestion, user confirms, database, request, email): `node-id=36-4253`
  - Tech ecosystem and architecture frame: `node-id=1-1869` ([link](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=1-1869))
  - Story map, user stories and acceptance criteria: `node-id=35-3957` ([link](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=35-3957))
