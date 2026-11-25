---
name: GI 4.0 PharmaProtect
status: final
colors:
  navy: "#0b3c63"
  navy-deep: "#071b2e"
  terracotta: "#d57a4c"
  ink: "#0b2a44"
  muted: "#4f647a"
  panel: "#eef1f5"
  surface: "#ffffff"
  line: "#d3dfea"
  sky-1: "#cfe3f7"
  sky-2: "#b4d3f2"
  ok: "#16794c"
  warn: "#a15c00"
typography:
  display:
    fontFamily: Barlow
    fontWeight: 700
    textTransform: uppercase
  body:
    fontFamily: Barlow
    fontWeight: 400
    fontSize: 16px
    lineHeight: 1.5
rounded:
  none: 0px
  sm: 4px
  md: 6px
spacing:
  gap: 24px
  gutter: 20px
  section: 32px
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    height: 48px
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    borderColor: "{colors.terracotta}"
    rounded: "{rounded.none}"
  card-contact:
    backgroundColor: "{colors.panel}"
    headerColor: "{colors.navy}"
  card-feedback:
    backgroundColor: "{colors.navy}"
    headerColor: "{colors.terracotta}"
---

# DESIGN.md — GI 4.0 PharmaProtect

## Brand & Style
Gebrauchsinformation 4.0 (GI 4.0) is being taken over by PharmaProtect Solutions GmbH, so this website's UI is built on PharmaProtect's branding (colours, typography, hero banners, header, contact page and footer layout). The GI 4.0 logo is made the way the logos of other PharmaProtect projects are, for example ACS PharmaProtect: the cube mark, a large product name and "PharmaProtect" underneath.

GI 4.0 sits inside the PharmaProtect brand family. It is calm, institutional and trustworthy: deep navy for authority, terracotta for emphasis, generous white space. Sources: the PharmaProtect website (contact page, hero banners) and the ACS PharmaProtect logo family. The product mark is the cube symbol with a large "GI 4.0" and "PharmaProtect" underneath, in the same arrangement as the ACS logo.

## Colors
Navy is the primary for headings, buttons, footer and card headers. Terracotta is the single accent (active navigation underline, labels, outlined buttons, the feedback header, footer bar). Light panel grey (`panel`) holds secondary surfaces. Sky tones form the hero background with white network lines. Semantic ok/warn are reserved for tags and notices. There is a single light theme.

## Typography
Barlow throughout. Display text is bold and uppercase (hero keyword, page titles on Contacts, card headers). Body 16 px at 1.5 line height; leaflet text keeps the same size for legibility.

## Layout & Spacing
Standard page column: every page (Home, My medicines, Instructions, FAQs, Contacts, Legal notice, Privacy, suggestions) uses the same centred 640 px column for title and content; the leaflet reading layout is wider (two columns from 900 px). Page gutters are 20 px; full-bleed hero, location band and footer. A consistent 24 px gap separates cards from each other and from the next band. Contact cards stack one per row inside the column.

## Elevation & Depth
Flat. Only the header dropdown menu has a shadow. Separation is by colour bands and 1 px lines.

## Shapes
Almost square: 0 to 6 px radii, in line with the PharmaProtect site (square card headers, square outlined buttons).

## Components
- **Header**: white bar, GI 4.0 logo left, Home / My medicines / More ▾ right; active item has a terracotta underline.
- **Hero**: pale sky gradient with white network, centred uppercase navy headline (bold keyword + lighter line).
- **Search card**: input with navy Search button; three equal mode tiles (voice, photo, scan).
- **Contact cards**: coloured header band (navy, navy, terracotta for feedback), grey body, terracotta E/T/F letters.
- **Information services panel**: grey band, outlined terracotta SUBSCRIBE button.
- **Location band**: stylised map with navy address card and DIRECTIONS button; photo on the right.
- **Leaflet accordion**: one row per section, heading left (no "Important" tag) and a navy plus (closed) or minus (open) icon right; hairline dividers; sits in the right column next to the left info column; no section index.
- **Footer**: product line, three link columns, terracotta legal bar.

## Do's and Don'ts
- Do keep one accent colour; do keep uppercase for display only.
- Do keep touch targets at least 44 px.
- Don't use the cube symbol without the GI 4.0 wordmark; don't recolour the logo.
- Don't show medical content in colour alone; notices also carry words.

## References

- **Figma / FigJam board (source of the flow, story map and tech ecosystem):** [PharmaProtect Solutions (PPS)](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=36-4253)
  - Flow and architecture diagram (Search, AI suggestion, user confirms, database, request, email): `node-id=36-4253`
  - Tech ecosystem and architecture frame: `node-id=1-1869` ([link](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=1-1869))
  - Story map, user stories and acceptance criteria: `node-id=35-3957` ([link](https://www.figma.com/board/zqeO7or1XJU6RjuC41SVh2/PharmaProtect-Solutions-PPS?node-id=35-3957))
