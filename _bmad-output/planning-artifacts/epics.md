---
status: final
stepsCompleted: [validate-prerequisites, design-epics, create-stories, final-validation]
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-gi40-prototype-2026-11-25/prd.md
  - _bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-gi40-prototype-2026-11-25/EXPERIENCE.md
  - _bmad-output/planning-artifacts/architecture/architecture-gi40-prototype-2026-11-25/ARCHITECTURE-SPINE.md
  - https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS
---

# gi40-prototype - Epic Breakdown

## Overview

This document decomposes the PRD, UX design and architecture of the GI 4.0 Patient Leaflet Platform prototype into epics and stories. Source flow, story map and tech ecosystem: [Figma board](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=36-4253) ([story map](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=35-3957), [tech ecosystem](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=1-1869)).

## Requirements Inventory

### Functional Requirements

FR-1 Text search. FR-2 Voice search. FR-3 Photo search. FR-4 QR/barcode scan. FR-5 Suggest and confirm (auto-correct). FR-6 Show latest approved leaflet. FR-7 Listen to leaflet. FR-8 Not found. FR-9 Request a leaflet. FR-10 My medicines. FR-11 Delete my data. FR-12 Instructions, FAQs, Contact, Legal notice, Privacy. FR-13 PharmaProtect look and feel, responsive. FR-14 Text size (deferred). FR-15 Print (built, see FR-24). FR-24 Print the leaflet. FR-25 Pictorial instructions. FR-26 Jump to a section. FR-16 Language switch. FR-17 Live suggestions. FR-18 Mobile hamburger menu. FR-19 German market and German leaflets only. FR-20 Live data through the Leaflet Service. FR-21 Search by PZN or GTIN. FR-22 Latest approved version with provenance and freshness. FR-23 Service errors.

### NonFunctional Requirements

NFR-1 Accessibility: AA contrast, 44 px targets, keyboard operable, works at 200% zoom. NFR-2 Responsive 360-1440 px, no horizontal scroll. NFR-3 No login, no server-side personal data. NFR-4 Works with localStorage unavailable. NFR-5 A single light theme. NFR-6 Features degrade where mic, camera, speech or print are blocked.

### Additional Requirements

AR-1 Layered structure data/domain/app (AD-1). AR-2 Local-only persistence via storage.js (AD-2). AR-3 Verbatim leaflets (AD-3). AR-4 Capabilities module (AD-4). AR-5 Design tokens only (AD-5). AR-6 Simulated AI isolated in recognition.js (AD-6). AR-7 Vite 8 + Vitest 5 project with lockfile and README.

### UX Design Requirements

UX-1 Header Home / My medicines / More menu. UX-2 Hero on every page with bold keyword + lighter line. UX-3 Contact page with three header-band cards, info panel, location band with photo, footer in PharmaProtect style. UX-4 GI 4.0 logo in family style. UX-5 Instructions page with icon per step.

### FR Coverage Map

FR-1,FR-5: Epic 2. FR-2,FR-3,FR-4: Epic 2. FR-8: Epic 2. FR-6,FR-7: Epic 3. FR-9: Epic 4. FR-10,FR-11: Epic 5. FR-12: Epic 6. FR-13, UX-1..4: Epic 1. FR-16, FR-17, FR-18: Epic 7. FR-19 to FR-23: Epic 8. FR-14: deferred. FR-15, FR-24 to FR-26: Epic 9.

## Epic List

1. Epic 1: Foundation and PharmaProtect shell
2. Epic 2: Find a medicine
3. Epic 3: Read and listen to the leaflet
4. Epic 4: Request a missing leaflet
5. Epic 5: Control my data
6. Epic 6: Information pages
7. Epic 7: Language, live suggestions and mobile menu
8. Epic 8: Live data from approved sources
9. Epic 9: User-story alignment (print, pictorial instructions, jump to section)

## Epic 1: Foundation and PharmaProtect shell

A runnable, branded, responsive site skeleton that every other epic plugs into.

### Story 1.1: Project scaffold and quality gates

As a developer,
I want a Vite and Vitest project with the layered folder structure,
So that every story lands in a consistent, testable place.

**Acceptance Criteria:**

**Given** a fresh checkout
**When** I run `npm ci` and `npm run dev`
**Then** the site is served locally
**And** `npm test` runs the unit and flow tests and `npm run build` produces `dist/`
**And** the folders `src/data`, `src/domain`, `src/app` exist as in the architecture spine.

### Story 1.2: Brand shell (header, hero, footer, themes)

As a visitor,
I want a PharmaProtect-branded header, hero and footer on every page,
So that I recognise the product family and can navigate anywhere.

**Acceptance Criteria:**

**Given** any page
**When** it loads
**Then** I see the GI 4.0 logo, links Home, My medicines and a More menu with Instructions, FAQs, Contact, Legal notice and Privacy
**And** a hero with a bold keyword and a lighter line specific to the page
**And** a footer with the product line, three link columns and a legal bar
**And** the More menu closes on outside click, Esc or selection and exposes `aria-expanded`
**And** the site uses a single light theme.

## Epic 2: Find a medicine

Users reach the right medicine by typing, speaking, photo or scan and confirm it by touch.

### Story 2.1: Text search with suggestions and auto-correct

As a patient,
I want to type a medicine name and get suggestions even if I misspell it,
So that I can confirm the right medicine.

**Acceptance Criteria:**

**Given** the Home page
**When** I submit "ibuprofn"
**Then** Ibuprofen 400 mg is listed as a suggestion
**And** matching ignores case and whitespace
**And** submitting an empty query does nothing
**And** each suggestion is a 44 px touch target
**And** the query is added to my history.

### Story 2.2: Voice search

As a patient,
I want to say the medicine name,
So that I do not have to type.

**Acceptance Criteria:**

**Given** I tap voice
**When** speech recognition is available and I speak
**Then** the transcript is searched like typed text
**And** when it is unavailable or fails a message offers typing or other modes.

### Story 2.3: Photo search

As a carer,
I want to upload or take a photo of the medicine box,
So that the platform proposes the medicine.

**Acceptance Criteria:**

**Given** I choose a photo
**When** processing completes
**Then** candidate medicines are shown to confirm
**And** I can retake the photo or choose "None of these".

### Story 2.4: QR / barcode scan

As a carer,
I want to scan the code on the pack,
So that I reach the leaflet fast.

**Acceptance Criteria:**

**Given** the scan sheet with sample codes
**When** I pick a known code
**Then** exactly one suggestion is shown for confirmation
**And** an unknown code leads to the Not found screen.

### Story 2.5: Not found

As a patient,
I want a clear message when no leaflet exists,
So that I know what to do next.

**Acceptance Criteria:**

**Given** a search with no match
**When** results load
**Then** "Leaflet not found" is shown as a centred block with a large heading, without a separate page title, with Request this leaflet and Search again.

## Epic 3: Read and listen to the leaflet

Users read the latest approved leaflet safely, or listen to it.

### Story 3.1: Leaflet view with version, notices and verbatim text

As a patient,
I want to read the latest approved leaflet with its version,
So that I trust it is current.

**Acceptance Criteria:**

**Given** I confirmed a medicine
**When** the leaflet opens
**Then** version and publish date are shown, with a NEW tag when published within 60 days
**And** sections appear in the leaflet's own order; there are no "Important" tags (removed on request)
**And** a notice asks me to check dosage and that it was bought in Germany
**And** an MAH note shows when present
**And** the text is rendered verbatim with no translation or summary
**And** a checkbox "I have read the complete leaflet" exists
**And** the medicine is added to my history.

### Story 3.2: Section navigation

As a patient,
I want each section as a collapsible row,
So that I find "How to use" or "Side effects" quickly.

**Acceptance Criteria:**

**Given** an open leaflet
**When** I tap a section row
**Then** that section opens or closes (minus icon open, plus icon closed); all sections are open at first so the reader cannot miss one, until the reader closes them
**And** Collapse all and Expand all close or open every section, and the button label always shows the next action
**And** on screens 900 px and wider the leaflet details, notices and buttons are in a left column and the accordion is on the right; below 900 px it is one column (no section index).

### Story 3.3: Listen to the leaflet

As a patient with poor eyesight,
I want the leaflet read aloud,
So that I can follow without reading.

**Acceptance Criteria:**

**Given** an open leaflet
**When** I tap Listen
**Then** the shown sections are read and the button becomes Stop
**And** a second tap stops the audio
**And** German leaflets request a German voice
**And** when speech output is unsupported a message says so.

### Story 3.4: German original-language leaflets

As a German patient,
I want leaflets in German as approved,
So that I read the authoritative text.

**Acceptance Criteria:**

**Given** a German medicine such as Aspirin
**When** its leaflet opens
**Then** the section names and text are German
**And** a Deutsch tag is shown
**And** nothing is translated.

## Epic 4: Request a missing leaflet

### Story 4.1: Request form with optional email

As a patient,
I want to request a missing leaflet,
So that it gets added and I can be told.

**Acceptance Criteria:**

**Given** the Not found screen
**When** I open Request this leaflet
**Then** the medicine name is prefilled and email is optional
**And** an invalid email shows "Please check the email address." and is not sent
**And** I can send with or without an email
**And** the form is a centred block with its heading shown once and no separate page title.

### Story 4.2: Request confirmation, edit and undo

As a patient,
I want to correct or cancel a request,
So that I stay in control.

**Acceptance Criteria:**

**Given** a sent request
**When** the confirmation shows
**Then** the confirmation is a centred block with one "Request sent" heading and no separate page title
**And** I can edit the email, undo the request or go back to Home
**And** undo removes it from My medicines.

## Epic 5: Control my data

### Story 5.1: My medicines

As a returning user,
I want to see what I looked at and requested,
So that I can reopen a leaflet.

**Acceptance Criteria:**

**Given** I viewed leaflets and sent requests
**When** I open My medicines
**Then** viewed medicines are listed newest first with version
**And** pending requests are listed with the email or "No email alert"
**And** empty states read "No medicines viewed yet." and "None."
**And** all data is stored only on the device.

### Story 5.2: Delete my data

As a privacy-minded user,
I want to delete my history and requests,
So that nobody else can see them.

**Acceptance Criteria:**

**Given** the Privacy page or My medicines
**When** I choose a delete action and confirm
**Then** the data is removed and a toast confirms
**And** cancel leaves the data intact
**And** the app works if localStorage is unavailable.

## Epic 6: Information pages

### Story 6.1: Instructions page

As a first-time visitor,
I want illustrated steps,
So that I know how to use the platform.

**Acceptance Criteria:**

**Given** More, Instructions
**When** the page opens
**Then** seven steps each show an icon, step number, title and text
**And** the doctor or pharmacist note is shown
**And** Start searching returns to Home.

### Story 6.2: FAQs page

As a visitor,
I want answers to common questions,
So that I do not need to contact anyone.

**Acceptance Criteria:**

**Given** the FAQs page
**When** it opens
**Then** the sentence "If you have any questions about the medicine itself, please contact your doctor or pharmacist." is prominent
**And** each question expands and collapses
**And** a link leads to Contact.

### Story 6.3: Contact page

As a visitor,
I want to reach the company,
So that I can ask or give feedback.

**Acceptance Criteria:**

**Given** the Contacts page
**When** it opens
**Then** Office (E/T/F), Data protection and Got feedback cards are stacked one per row inside the standard 640 px page column, with equal 24 px gaps between cards and to the Information services panel
**And** a location band shows the address, a Directions link and a photo
**And** Location and Info services footer links scroll to those sections.

### Story 6.4: Legal notice and Privacy policy

As a visitor,
I want the legal notice and privacy policy,
So that I understand terms and data handling.

**Acceptance Criteria:**

**Given** Legal notice or Privacy
**When** the page opens
**Then** the supplied legal text is shown verbatim
**And** Privacy shows the delete buttons first and the policy as expandable sections.

## Epic 7: Language, live suggestions and mobile menu

Users can use the site in English or German, get suggestions while typing, and navigate comfortably on a phone.

### Story 7.1: Language switch EN | DE

As a visitor,
I want to switch the interface between English and German,
So that I can use the site in my language.

**Acceptance Criteria:**

**Given** any page
**When** I choose DE in the header
**Then** the interface, hero lines, Instructions and FAQs are German and the choice is remembered
**And** the text I typed in the search box is kept
**And** leaflet text is never translated
**And** every interface string has a German translation (automated check).

### Story 7.2: Mobile hamburger menu

As a phone user,
I want all navigation in a hamburger menu with the language toggle beside it,
So that the header stays compact.

**Acceptance Criteria:**

**Given** a screen 620 px wide or narrower
**When** the page loads
**Then** the header shows the logo, EN | DE and a hamburger button
**And** the menu lists all seven pages, marks the current one, and closes on selection, outside click or Esc
**And** wider screens keep the full header.

### Story 7.3: Live suggestions while typing

As a patient,
I want to see recommendations while I type,
So that I find my medicine faster.

**Acceptance Criteria:**

**Given** the search box on Home
**When** I type at least one letter
**Then** up to five matching medicines appear with the typed letters highlighted
**And** a misspelling from three letters still suggests the right medicine
**And** I can choose with tap, click or arrow keys and Enter, which opens the leaflet
**And** Esc closes the list and a failing service shows no list.

## Epic 8: Live data from approved sources

The site is ready to show the latest approved German leaflet for any medicine sold in Germany from approved sources, through one Leaflet Service.

### Story 8.1: Provider layer and API contract

As a developer,
I want one provider interface with a sample and an HTTP implementation and a written API contract,
So that real data can be connected without changing the views.

**Acceptance Criteria:**

**Given** the app
**When** it runs without `VITE_GI_API_BASE`
**Then** it uses the sample provider through the same async interface as the HTTP provider
**And** with `VITE_GI_API_BASE` set it calls only the documented endpoints
**And** `docs/api-contract.md` and `docs/openapi.yaml` describe the endpoints, types, rules and errors.

### Story 8.2: German market and German leaflets only

As a patient in Germany,
I want only German leaflets for medicines sold in Germany,
So that I read the authoritative text.

**Acceptance Criteria:**

**Given** any provider result
**When** a record is not `market = DE` and `lang = de`, or is incomplete
**Then** it is dropped from lists and rejected as a leaflet
**And** all sample leaflets are German dummy data added for demonstration, flagged as sample and labelled on screen as dummy content
**And** Home states that the website covers medicines sold in Germany and that leaflets are only available in German.

### Story 8.3: Search by PZN or GTIN

As a pharmacy customer,
I want to search by the number on the pack,
So that I get the exact product.

**Acceptance Criteria:**

**Given** the search box or scan dialog
**When** I enter 7 to 14 digits
**Then** the medicine with that PZN or GTIN is suggested, or Not found is shown.

### Story 8.4: Latest version with source and freshness

As a patient,
I want to see where the leaflet comes from and that it is current,
So that I can trust it.

**Acceptance Criteria:**

**Given** an open leaflet
**When** it is shown
**Then** version, publish date, source (linked if https) and check date are visible
**And** a warning appears when the check is older than 7 days
**And** opening a medicine from My medicines loads the current version.

### Story 8.5: Service errors and retry

As a patient,
I want a clear message when the service is down,
So that I can try again and am never shown wrong content.

**Acceptance Criteria:**

**Given** the Leaflet Service cannot be reached or answers badly
**When** I search, open a leaflet or scan
**Then** I see "Search is temporarily unavailable" with Try again and Back to search
**And** no partial or unapproved content is shown
**And** Try again repeats the same action.

## Epic 9: User-story alignment

### Story 9.1: Align the user stories and close the gaps

As the product owner,
I want the stakeholder-edited user stories (`docs/USER_STORIES.md`, 9 stories) to match the prototype,
So that they are an accurate acceptance baseline.

**Acceptance Criteria:**

**Given** a leaflet is open
**When** I choose Print
**Then** every section is included, menus and banner are left out, and the version date and a check-the-website reminder are shown
**And** a "Jump to a section" card opens and highlights What it is for, How to use or Side effects
**And** the side-effects section shows only the approved text, with no added reminder
**And** leaflets with pictorial instructions show captioned images under section 3, scaling with the screen
**And** there are no "Important" tags and no hospital reminder (both removed on request).
