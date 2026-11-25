// Domain: medicine matching. Pure functions, no DOM (AD-1).

export const normalize = (s) => String(s ?? '').trim().toLowerCase();

/** Levenshtein edit distance, used for the "auto-correct" of misspelled names. */
export function editDistance(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

/**
 * Find medicines for a typed or spoken query.
 * 1. Exact: the first word of the query appears in the name or brand.
 * 2. Auto-correct: the first word is within edit distance 2 (scaled for short words) of a name or brand word.
 * Returns [] for an empty query.
 */
export function searchLeaflets(query, db) {
  const n = normalize(query);
  if (!n) return [];
  const first = n.split(/\s+/)[0];

  const exact = db.filter((m) => `${m.name} ${m.brand}`.toLowerCase().includes(first));
  if (exact.length) return exact;

  const limit = first.length <= 4 ? 1 : 2;
  return db.filter((m) =>
    `${m.name} ${m.brand}`
      .toLowerCase()
      .split(/[\s,]+/)
      .some((w) => w.length > 2 && editDistance(first, w) <= limit),
  );
}

/** Look up a medicine by its barcode / QR payload. */
export function findByCode(code, db) {
  const c = String(code ?? '').trim();
  return db.find((m) => m.code === c) ?? null;
}

/**
 * Live suggestions while typing. Ranks medicines whose name starts with the text, then those with a
 * word (name or brand) starting with it, then those containing it. With no such match and at least
 * 3 characters typed, falls back to the typo-tolerant search. Returns at most `limit` medicines.
 */
export function autocomplete(query, db, limit = 5) {
  const n = normalize(query);
  if (!n) return [];
  const rank = (m) => {
    const name = m.name.toLowerCase();
    const words = `${m.name} ${m.brand}`.toLowerCase().split(/[\s,]+/);
    if (name.startsWith(n)) return 0;
    if (words.some((w) => w.startsWith(n))) return 1;
    if (n.length >= 3 && `${name} ${m.brand.toLowerCase()}`.includes(n)) return 2;
    return -1;
  };
  const hits = db
    .map((m) => ({ m, r: rank(m) }))
    .filter((x) => x.r >= 0)
    .sort((a, b) => a.r - b.r || a.m.name.localeCompare(b.m.name))
    .map((x) => x.m);
  if (hits.length) return hits.slice(0, limit);
  return n.length >= 3 ? searchLeaflets(n, db).slice(0, limit) : [];
}
