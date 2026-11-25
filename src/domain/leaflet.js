// Domain: leaflet helpers. The leaflet text itself is never altered (AD-3).

/** Sections highlighted as important: what it is, how to use, warnings (German and English names). */

/** Section names in the leaflet's own order. Sections are never reordered, shortened or reworded (AD-3). */
export const sectionKeys = (sections) => Object.keys(sections);

/** True when the leaflet version was published within the last `days` days. */
export function isNew(date, now = Date.now(), days = 60) {
  const t = new Date(date).getTime();
  return Number.isFinite(t) && now - t < days * 24 * 60 * 60 * 1000;
}

/** Text handed to speech output: shown sections only, heading then body. */
export function audioText(leaflet, keys, current = '') {
  return keys
    .filter((k) => !current || k === current)
    .map((k) => `${k}. ${leaflet.sections[k]}`)
    .join(' ');
}

// ---------------------------------------------------------------------------
// Data policy: German market only, German leaflets only, latest approved version only.
// Everything that comes from a provider (sample data or a real back end) passes through here.
// ---------------------------------------------------------------------------

export class LeafletError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'LeafletError';
    this.code = code; // 'not-german' | 'invalid'
  }
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}/;

/** True when the record is a leaflet for the German market, written in German. */
export const isGermanLeaflet = (x) => x?.lang === 'de' && (x?.market ?? 'DE') === 'DE';

/** Compare version strings like "v3.0", "4.2.1" numerically. */
export function compareVersions(a, b) {
  const num = (v) => String(v ?? '').replace(/^v/i, '').split('.').map((n) => parseInt(n, 10) || 0);
  const x = num(a), y = num(b);
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] ?? 0) - (y[i] ?? 0);
    if (d) return d;
  }
  return 0;
}

/** From several versions of one leaflet, the latest: newest publish date, then highest version. */
export function selectLatest(versions) {
  return [...versions].sort((a, b) => String(b.date).localeCompare(String(a.date)) || compareVersions(b.ver, a.ver))[0] ?? null;
}

/** Short record used in search results and suggestions. Throws LeafletError for non-German or malformed data. */
export function normalizeSummary(raw) {
  if (!raw || typeof raw !== 'object' || !raw.id || !raw.name) throw new LeafletError('invalid', 'Medicine without id or name');
  if (!isGermanLeaflet(raw)) throw new LeafletError('not-german', `Not a German-market German leaflet: ${raw.id}`);
  return {
    id: String(raw.id),
    name: String(raw.name),
    brand: String(raw.brand ?? ''),
    lang: 'de',
    market: 'DE',
    ver: raw.ver == null ? '' : String(raw.ver),
    date: raw.date ? String(raw.date).slice(0, 10) : '',
    pzn: raw.pzn ? String(raw.pzn) : '',
    code: raw.code ? String(raw.code) : '',
  };
}

/** Full leaflet. Sections are kept verbatim (AD-3). Throws LeafletError when not usable. */
/** Pictorial instructions: only https or inline image data URIs, each with a caption (the German leaflet text). */
function normalizePictures(list) {
  if (!Array.isArray(list)) return [];
  return list
    .filter((p) => p && /^(https:\/\/|data:image\/)/.test(p.src ?? ''))
    .map((p) => ({ src: String(p.src), alt: String(p.alt ?? p.caption ?? ''), caption: String(p.caption ?? '') }));
}

export function normalizeLeaflet(raw) {
  const base = normalizeSummary(raw);
  if (!base.ver || !ISO_DATE.test(base.date)) throw new LeafletError('invalid', `Leaflet ${base.id} has no version or publish date`);
  const sections = raw.sections;
  if (!sections || typeof sections !== 'object' || !Object.keys(sections).length) throw new LeafletError('invalid', `Leaflet ${base.id} has no sections`);
  return {
    ...base,
    sections: Object.fromEntries(Object.entries(sections).map(([k, v]) => [k, String(v)])),
    note: raw.note ? String(raw.note) : '',
    pictures: normalizePictures(raw.pictures),
    sample: raw.sample === true,
    source: raw.source ? String(raw.source) : '',
    sourceUrl: /^https:\/\//.test(raw.sourceUrl ?? '') ? raw.sourceUrl : '',
    checkedAt: raw.checkedAt ? String(raw.checkedAt) : '',
  };
}

/** True when the data was last checked against the source more than `days` days ago (or never). */
export function isStale(checkedAt, now = Date.now(), days = 7) {
  const t = new Date(checkedAt).getTime();
  return !Number.isFinite(t) || now - t > days * 24 * 60 * 60 * 1000;
}

/** A query made only of digits (7 to 14) is a PZN or GTIN/EAN, not a name. */
export const looksLikeCode = (q) => /^\d{7,14}$/.test(String(q ?? '').trim());
