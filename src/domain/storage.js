// Domain: local-only persistence (AD-2). The storage object is injected, so tests and
// environments without localStorage still work. Every read/write is wrapped in try/catch.

import { isLang, DEFAULT_LANG } from './i18n.js';

export const KEYS = { history: 'pps_history', requests: 'pps_requests', lang: 'pps_lang' };
const MAX_HISTORY = 20;

function memoryStorage() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => void m.set(k, String(v)), removeItem: (k) => void m.delete(k) };
}

export function createStore(storage = null, now = () => Date.now()) {
  const backend = storage ?? memoryStorage();
  const read = (k, d) => {
    try {
      const raw = backend.getItem(k);
      return raw == null ? d : (JSON.parse(raw) ?? d);
    } catch {
      return d;
    }
  };
  const write = (k, v) => {
    try {
      backend.setItem(k, JSON.stringify(v));
    } catch {
      /* storage unavailable: keep working without persistence */
    }
  };

  return {
    getHistory: () => read(KEYS.history, []),
    /** Record a search (q only) or an opened leaflet (q = name, id). Newest first, no duplicates by q, max 20. */
    addHistory({ q, id, ver }) {
      const list = read(KEYS.history, []).filter((h) => h.q !== q);
      list.unshift(id ? { q, id, ver: ver ?? '', t: now() } : { q, t: now() });
      write(KEYS.history, list.slice(0, MAX_HISTORY));
    },
    clearHistory: () => write(KEYS.history, []),

    getRequests: () => read(KEYS.requests, []),
    addRequest({ med, email }) {
      const r = { id: now(), med, email: email || '' };
      write(KEYS.requests, [r, ...read(KEYS.requests, [])]);
      return r;
    },
    removeRequest: (id) => write(KEYS.requests, read(KEYS.requests, []).filter((r) => r.id !== id)),
    clearRequests: () => write(KEYS.requests, []),

    /** Interface language preference (not personal data); defaults to English. */
    getLang: () => {
      const l = read(KEYS.lang, DEFAULT_LANG);
      return isLang(l) ? l : DEFAULT_LANG;
    },
    setLang: (l) => { if (isLang(l)) write(KEYS.lang, l); },

  };
}

/** localStorage when usable, otherwise null (callers then get the in-memory fallback). */
export function safeLocalStorage() {
  try {
    const s = globalThis.localStorage;
    s.setItem('__pps', '1');
    s.removeItem('__pps');
    return s;
  } catch {
    return null;
  }
}
