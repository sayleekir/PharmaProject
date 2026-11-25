# GI 4.0 user stories

Code repository: https://github.com/sayleekir/PharmaProject

| Use case | Who and what | Stories |
|---|---|---|
| UC1 | Patient with a new medicine reads the whole leaflet, especially how to use it | 1, 3, 5 |
| UC2 | Chronic patient: the medicine looks different (red to green), she wants to see what changed | 4 |
| UC3 | Hospital patient gets pills from a nurse, has no leaflet, wants to know what they are for | 1, 3, 8 |
| UC4 | Daughter finds the right, up-to-date leaflet from the name on the blister, prints it for her father and hints at the audio read-out | 1, 4, 5, 6 |
| UC5 | Friend checks whether a symptom is a known side effect of the medicine he takes | 1, 9 |

**Format:** *As a [user], I want [goal], so that [value].*
Each acceptance criterion: *Given [state], when [action], then [observable result].*

**User** = patient, or a relative or friend helping the patient.

## Story 1: Find the leaflet in different ways (UC1, UC3, UC4, UC5)

**As a user, I want to** find my medicine's leaflet by typing, speaking, scanning the pack code or uploading a photo, **so that** I can reach it in the way that suits me.

- **Given** the medicine is in the database, **when** I start typing, **then** suggestions appear while I type, and when I select one, its leaflet opens.
- **Given** I misspell the name, **when** I search, **then** the system suggests the closest medicines ("Did you mean…") and I choose the right one myself.
- **Given** I scan the code on the pack or upload a photo of it or type the PZN number, when the code is recognised, **then** the matching leaflet opens.
- **Given** the code or photo cannot be read, **when** I try, **then** a message says so and offers search by name.
- **Given** I use voice input, **when** the system turns my speech into text, **then** I still see a list and must select the medicine myself before the leaflet opens.

## Story 2: Request a missing leaflet (all use cases)

**As a user, I want to** request a leaflet that is not available, **so that** it is added and I can read it later.

- **Given** the medicine is not in the database, **when** I search for it, then the system clearly says "Leaflet not found" and offers "Request this leaflet".
- **Given** I send a request, **when** I leave the email field empty, **then** the request is sent and I am told I will not be notified.
- **Given** I send a request with an email address, **when** the request is sent, **then** I see a confirmation that says the email is only used for the alert and is deleted afterwards.

## Story 3: Go straight to the section I need (UC1, UC3)

**As a user, I want to** reach the section I need (what it is for, how to use, side effects) quickly, and not miss any section, **so that** I find the important information without reading everything first.

- **Given** a leaflet is open, **when** it loads, **then** every section is open (accordion), so no section is missed, and I can close what I have finished reading.
- **Given** a leaflet has pictorial instructions, **when** I open the leaflet, **then** the images become responsive based on screen size, so that user can clearly see them.
- **Given** a leaflet is open, **when** I reach the end, **then** there is a checkbox "I have read the complete leaflet".

## Story 4: Check whether there are any changes in the leaflet (UC2, UC4)

**As a user** whose usual medicine suddenly looks different, **I want to** see the version date, a NEW tag and what changed, **so that** I know the leaflet is current and the medicine is still the right one.

- **Given** a leaflet was recently updated (within 60 days), **when** I open it, **then** it shows a NEW tag and its version date.
- **Given** the manufacturer published a change note, **when** I open the leaflet, **then** the note is shown next to the leaflet information under "Note from the Pharma company".

## Story 5: Listen to the leaflet (UC1, UC4)

**As a user** with poor eyesight or who finds reading hard, **I want to** listen to the leaflet, **so that** I can take in the information without reading.

- **Given** a leaflet is open, **when** I choose "Listen", **then** the exact approved text is read aloud in German on my device.
- **Given** audio is playing, **when** I choose "Stop", then it stops.
- **Given** my device cannot play audio, **when** I choose "Listen", **then** a message tells me so and the text still works.
- **Given** I would rather read, **when** I do not use audio, **then** everything still works as text.

## Story 6: Print the leaflet (UC4)

**As a user** or someone helping me, **I want to** print the leaflet, **so that** I have a paper copy.

- **Given** a leaflet is open, **when** I choose "Print", **then** the browser print dialog opens with all sections included, even those I had closed.
- **Given** I am helping a relative, **when** I search the product name from their blister, **then** I get the latest version of the right leaflet to print, with no login.

## Story 7: Control my own search history (all use cases)

**As a user, I want** my searches stored only on my device and deletable, **so that** I stay in control of my data.

- **Given** no login is needed, **when** I open a medicine, then it is saved only on this device under "My medicines".
- **Given** I open "My medicines", **when** I choose "Delete my history" and confirm, **then** the list is emptied.
- **Given** I choose "Delete my history", **when** I am asked to confirm, **then** I can cancel and keep the list.

## Story 8: Check what a pill is for without its packaging (UC3)

**As a** hospital patient who got pills without a package or leaflet, **I want to** look up the medicine by the name I was told and see what it is for, **so that** I understand what I am taking.

- **Given** I know only the name the nurse told me, **when** I search for it and select it, **then** the leaflet opens with "What it is for" one tap away.

## Story 9: Check whether a symptom is a known side effect (UC5)

**As a** friend helping someone who feels unwell, **I want to** open the side effects section of a medicine directly, **so that** I can check whether the symptom is listed.

- **Given** I know the product name, **when** I search for it and select it, **then** I can open "Side effects" with one tap.
- **Given** the section is open, **when** I read it, **then** the approved text is shown unchanged, with nothing added about my symptom.
