---
title: GI 4.0 Patient Leaflet Platform (Prototype)
status: final
created: 2026-11-25
updated: 2026-11-25
---

# Product Brief: GI 4.0 Patient Leaflet Platform

## Executive Summary

GI 4.0 is a responsive website, built under the PharmaProtect brand, that lets patients and the people who help them find and read the **latest approved patient leaflet (Gebrauchsinformation)** of a medicine. A user types, speaks, photographs or scans the medicine, confirms the right product from a short list, and reads or listens to the original leaflet. If a leaflet is not in the database yet, the user can request it and optionally be emailed when it is added.

The prototype exists to validate the end-to-end flow and the PharmaProtect look and feel with stakeholders, because PharmaProtect Solutions GmbH, owned by the four leading German pharmaceutical associations, is taking over the existing Gebrauchsinformation 4.0 service. It is deliberately a front-end prototype with mock data, so the experience can be judged before back-end and data integrations are funded.

## The Problem

Patients, many of them elderly or ill, need correct and current usage information at the moment they take a medicine. Paper leaflets get lost, are printed in small type and may be outdated. Finding the digital leaflet today means knowing the exact name, navigating a catalogue site and trusting that the version is current. When a leaflet does not exist online there is no way to ask for it.

## The Solution

One search box with four ways in (type, voice, photo of the box, QR/barcode), tolerant of misspellings. The user always confirms the medicine by touch. The leaflet opens with the critical sections first (what it is, how to use it, warnings), can be navigated by section and can be read aloud. If nothing is found, the platform says so clearly and lets the user request the leaflet. The user stays in control of their data: no login, history stored on their own device, one-tap deletion.

## What Makes This Different

- **Authority and currency**: only the latest approved leaflets from the marketing authorisation holders and pharma associations, with version and publish date.
- **No AI where it is legally risky**: no summarisation or translation; AI only helps input (speech, photo, suggestions) and audio output.
- **Accessibility first** for an older, sicker audience; no voice-only features, so reading and listening are both always available.
- **Privacy by design**: no account, no personal data on servers, optional email only to notify about a requested leaflet.
- The moat is the association-backed data and trust, not the interface technology. We say so plainly.

## Who This Serves

- **Primary: patients**, often elderly or chronically ill, checking dosage, warnings and side effects of a medicine they have just been prescribed or bought.
- **Secondary: relatives, carers and friends** who look things up on someone's behalf.
- **Stakeholders: PharmaProtect Solutions GmbH**, the pharma associations and marketing authorisation holders who supply and approve leaflets.

## Branding

Gebrauchsinformation 4.0 (GI 4.0) is being taken over by PharmaProtect Solutions GmbH, so this website's UI is built on PharmaProtect's branding (colours, typography, hero banners, header, contact page and footer layout). The GI 4.0 logo is made the way the logos of other PharmaProtect projects are, for example ACS PharmaProtect: the cube mark, a large product name and "PharmaProtect" underneath.

## Data privacy

Because this website is built for Germany, data privacy is a major concern (GDPR and German data protection expectations). For that reason a dedicated **Privacy** page was made: it explains what is and is not stored, lets users delete their data on the device in two taps, and carries the full privacy policy.

## Dummy data

**For demonstration purposes only, dummy (sample) data has been added.** The prototype contains 30 made-up leaflet records for common medicines sold in Germany (for example Diclac Dolo, Ibuprofen, Aspirin, Dekristol). The leaflet text, version numbers, dates, PZNs and barcodes are invented placeholders, **not real medical information**, and must not be used for any medical decision. Every leaflet shows an on-screen notice "Prototype sample: this text is dummy content and not real medical information". Real leaflets will come from approved sources through the Leaflet Service (see `docs/api-contract.md`).

## Success Criteria

- A first-time user finds and opens the correct leaflet in under 60 seconds using any one input method.
- A misspelled name still reaches the right medicine in one confirmation tap.
- 100% of leaflet views show the version and publish date of the latest approved leaflet.
- A user can delete all locally stored history and requests in two taps.
- Stakeholder review accepts the look and feel as consistent with the PharmaProtect brand family.

## Scope

**In (prototype v1):** home with four input modes; suggestions and confirmation; not-found and request-a-leaflet flow with optional email (edit, undo, send without email); leaflet view (sections in their original order, collapsible sections all open at first, jump-to-section buttons, pictorial instructions, listen, print, version tags, pharma note, dosage and origin notice, read-complete checkbox); My medicines (local history, pending requests); delete my data; Instructions, FAQs, Contact, Legal notice and Privacy pages; German original-language leaflets; responsive layout 360 to 1440 px;.

**Out:** search of the open internet (never: only approved sources through one Leaflet Service), real back end, real AI and OCR, real email service, login and member area, chat assistant, change-notification emails, translation or summarisation (never), native apps.

## Vision

Within two to three years GI 4.0 becomes the default, trusted place where every approved German leaflet lives in its latest version, reachable from the QR code on the pack, with audio and accessible formats for everyone, and with MAH notes about formula changes delivered to the people who need them.

## References

- **Figma / FigJam board (source of the flow, story map and tech ecosystem):** [PharmaProtect Solutions (PPS)](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=36-4253)
  - Flow and architecture diagram (Search, AI suggestion, user confirms, database, request, email): `node-id=36-4253`
  - Tech ecosystem and architecture frame: `node-id=1-1869` ([link](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=1-1869))
  - Story map, user stories and acceptance criteria: `node-id=35-3957` ([link](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=35-3957))
