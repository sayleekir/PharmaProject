# GI 4.0 Leaflet Service: API Contract (v1)

The website does **not** search the open internet. It asks one **leaflet service** (a back end owned by PharmaProtect) that searches **approved sources only** and always answers with the **latest approved leaflet version**. This is the contract the front end (`src/data/providers/http.js`) already speaks; the prototype's built-in sample data implements the same interface (`src/data/providers/sample.js`).

The prototype's built-in sample provider serves **dummy data added for demonstration purposes only** (30 invented leaflets flagged `sample`, with an on-screen notice); it implements the same interface.

Turn it on at build time:

```bash
VITE_GI_API_BASE=https://api.example.de npm run build   # or: npm run dev
```

Machine-readable version: [`openapi.yaml`](./openapi.yaml). Source of requirements: PRD FR-19 to FR-23 and ARCHITECTURE-SPINE AD-7, AD-8.

## Rules the service must enforce (the front end re-checks them and drops violations)

1. **Germany only.** Return only medicines authorised or sold in Germany (`market: "DE"`).
2. **German only.** Return only German leaflets (`lang: "de"`). No translation, no summary, no machine rewriting of any text.
3. **Approved sources only.** Leaflet text must come from an approved source: the marketing authorisation holder (MAH) or pharma association feed, the Gebrauchsinformation 4.0 / PatientenInfo-Service data held by Rote Liste Service GmbH, or the official BfArM database (AMIce / AM-FDB, published as PDF without reformatting). No general web results, no user-contributed text.
4. **Latest version only.** If several versions exist, the service resolves the newest approved one (newest publish date, then highest version) and returns only that. Superseded versions are never returned.
5. **Provenance.** Every leaflet carries `source`, optional `sourceUrl` (https only) and `checkedAt` (when the service last confirmed this is still the latest). The UI shows source and check date, and warns when `checkedAt` is older than 7 days.
6. **No personal data in search.** Queries are not logged against a person. The only personal data accepted is the optional email on a leaflet request (see below).

## Endpoints

Base URL: `${VITE_GI_API_BASE}`. All responses are JSON, UTF-8. CORS must allow the website's origin.

| Method and path | Purpose | Success |
| --- | --- | --- |
| `GET /v1/medicines/search?q=&limit=` | Find medicines by name, brand, dosage, **PZN or GTIN/EAN** (digits only, 7 to 14). Tolerates misspellings. | `200 {"items":[Summary]}` |
| `GET /v1/medicines/suggest?q=&limit=` | Fast suggestions while typing (called after a 150 ms pause; `limit` default 5). | `200 {"items":[Summary]}` |
| `GET /v1/medicines/lookup?code=` | Exact lookup by PZN or barcode number. | `200 {"item":Summary}` or `404` |
| `GET /v1/medicines/{id}/leaflet` | The **latest approved** leaflet. | `200 Leaflet` or `404` |
| `POST /v1/recognise/photo` | Photo of a pack (`multipart/form-data`, field `image`). Returns candidates the user must confirm. | `200 {"items":[Summary]}` |
| `POST /v1/recognise/code` | `{"code":"..."}` scanned QR/Data Matrix/barcode payload. | `200 {"item":Summary}` or `404` |
| `POST /v1/leaflet-requests` | `{"medicine":"...","email":"optional"}`. Email is only used to notify when the leaflet is added. | `202` |

Search results and suggestions are never opened automatically: the user confirms by touch (PRD FR-5).

## Types

```jsonc
// Summary
{ "id": "ibu", "name": "Ibuprofen 400 mg Filmtabletten", "brand": "Advil, Nurofen",
  "lang": "de", "market": "DE", "ver": "v3.0", "date": "2026-07-02", "pzn": "00000102", "code": "5098765432101" }

// Leaflet = Summary +
{ "pictures": [ { "src": "https://… or data:image/…", "alt": "…", "caption": "…" } ],   // optional pictorial instructions, shown in section 3
  "sections": { "Was ist das": "...", "Anwendung": "...", "Warnhinweise": "..." },   // verbatim, ordered
  "note": "Optional note from the pharma company",
  "source": "Rote Liste Service GmbH, GI 4.0", "sourceUrl": "https://...",           // https only
  "checkedAt": "2026-11-25T08:00:00Z" }
```

Optional: `pictures` (pictorial instructions; `src` must be `https://` or a `data:image/` URI, `caption` is the German leaflet text; shown responsively under section 3). Required on a leaflet: `id`, `name`, `lang = "de"`, `market = "DE"`, `ver`, `date` (ISO `YYYY-MM-DD`), non-empty `sections`. Section names are in German; the first three in this order are shown first: *Was ist das*, *Anwendung*, *Warnhinweise*.

## Errors

Use standard HTTP status codes. The front end treats any non-2xx other than `404` (where documented) as "search temporarily unavailable" and offers **Try again**; it never falls back to unapproved content. Suggested error body: `{"error":{"code":"rate_limited","message":"..."}}`.

## Non-functional

- Suggest p95 under 200 ms; search p95 under 800 ms; leaflet p95 under 1 s.
- Cache `GET` responses at the edge with `ETag`/`Cache-Control: max-age` of a few minutes; a new approved version must become visible within the agreed publication SLA.
- Rate limiting per IP; no cookies; HTTPS only.
- Pre-release checklist: legal sign-off of the sources and terms of use; confirm licences for BfArM and Rote Liste data; confirm the audio (text-to-speech) disclaimer is shown.

## Source candidates (to be confirmed with the owners; no public API specification was found)

| Source | Notes |
| --- | --- |
| GI 4.0 / PatientenInfo-Service (Rote Liste Service GmbH; consortium incl. vfa and BPI) | About 6,000 leaflets at last report, updated when authorities approve changes. Search by barcode, Data Matrix, manufacturer, name or PZN. Needs a data-sharing agreement. |
| BfArM AMIce / AM-FDB (successor of AMIS / PharmNet.Bund) | Official authorisation data; free since 13 Feb 2025; leaflets as PDF; German only. Check technical access and licence. |
| MAH and pharma association feeds | Direct submissions of the approved leaflet and change notes. |
