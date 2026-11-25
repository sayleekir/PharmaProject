---
name: GI 4.0 PharmaProtect Experience
status: final
sources:
  - https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS
  - ../../prds/prd-gi40-prototype-2026-11-25/prd.md
  - DESIGN.md
---

# EXPERIENCE.md — GI 4.0

## Foundation
Responsive website, mobile-first, 360 to 1440 px. Vanilla HTML/CSS/JS, no UI framework. Visual identity: see DESIGN.md. No login anywhere.

## Information Architecture
- **Header:** Home · My medicines · More ▾ (Instructions, FAQs, Contact, Legal notice, Privacy).
- **Home** → Suggestions → Leaflet · or Not found → Request form → Request sent.
- **My medicines:** History list, pending Requests, delete history.
- **Footer:** product line; About GI 4.0 (Instructions, FAQs), Contact (Contacts, Location, Info services), Search (Home, My medicines); legal bar.
- Every page opens with a Hero. Back is a text link above the page title on sub-flows.

## Privacy page
This site is built for Germany, where data privacy is a major concern, so privacy has its own page (More menu and footer), not a footnote. Order on the page: what stays on the device and what never leaves it, then the two delete buttons (each asks once), then the privacy policy as expandable sections. No login, cookies or analytics appear anywhere else in the product.

## Voice and Tone
Plain, short, active. Say what happens ("Send request"). Errors say what went wrong and what to do ("Please check the email address."). Never use medical jargon in UI copy. The leaflet text itself is never edited.

## Component Patterns
- **Search box:** submitting empty does nothing. Three alternative modes sit beneath and open a sheet or file picker.
- **Suggestion item:** whole row is the touch target; chevron on the right.
- **Header menu:** opens on click, closes on outside click, Esc or selection; trigger exposes `aria-expanded`.
- **Accordion (FAQ, Privacy):** native `details/summary`.
- **Confirm dialog:** destructive actions always ask once; cancel is the safe default.
- **Toast:** transient, bottom centre, non-blocking.

## State Patterns
- **Loading:** a spinner with a short sentence while a simulated search or scan runs (about 1 s).
- **Empty:** "Nothing yet." for History, "None." for Requests.
- **Request form and Request sent:** no page title; one centred heading (never the same text twice), fields left-aligned inside cards.
- **Not found:** no page title; centred block with icon, a large "Leaflet not found" heading, explanation, Request / Search again. The service-unavailable screen uses the same layout.
- **Error (voice/camera/audio):** toast naming the problem and the alternative.

## Interaction Primitives
Tap/click for all actions; Enter submits search; Esc closes menu and dialogs; no gesture-only controls; no voice-only controls.

## Accessibility Floor
Semantic landmarks and headings; every control labelled; visible focus; colour is never the only signal; contrast at least AA; tap targets at least 44 px; page works at 200% zoom; audio and text are always both available.

## Key Flows
1. **Maria, typo to leaflet (UJ-1):** Home → types "ibuprofn" → Suggestions list → taps Ibuprofen 400 mg → reads notice → How to use → ticks "read complete leaflet" → History updated. *Climax: version v3.0 and date visible.*
2. **Jonas, scan and listen (UJ-2):** Home → Scan → sample code → confirm → Leaflet → Listen → Stop.
3. **Elena, request (UJ-3):** search → Not found → Request → email optional → Request sent → Edit email / Undo.
4. **Klaus, delete (UJ-4):** More → Privacy → Delete my history → confirm → toast.

## Responsive & Platform
All pages share one 640 px centred column (title and content aligned); only the leaflet reading layout, the hero, the location band and the footer are wider.
Header wraps to two rows under 560 px. Leaflet page: from 900 px two columns, info cards and Listen / Expand all buttons on the left (sticky), the accordion (every row open by default so no section is missed, minus icon when open and plus icon once the reader has closed it) and the "I have read" tick box on the right; below 900 px one column in the same order. Contact cards stack one per row in the 640 px column. Footer columns stack under 620 px. The Location band stacks under 700 px.

## References

- **Figma / FigJam board (source of the flow, story map and tech ecosystem):** [PharmaProtect Solutions (PPS)](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=36-4253)
  - Flow and architecture diagram (Search, AI suggestion, user confirms, database, request, email): `node-id=36-4253`
  - Tech ecosystem and architecture frame: `node-id=1-1869` ([link](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=1-1869))
  - Story map, user stories and acceptance criteria: `node-id=35-3957` ([link](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=35-3957))
