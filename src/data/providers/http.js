// Data provider: live back end following docs/api-contract.md. The browser never talks to the open
// internet: the back end searches only approved sources and returns the latest approved version.
import { normalizeLeaflet, normalizeSummary, LeafletError } from '../../domain/leaflet.js';

export class ProviderError extends Error {
  constructor(kind, message, status = 0) {
    super(message);
    this.name = 'ProviderError';
    this.kind = kind; // 'network' | 'http' | 'invalid'
    this.status = status;
  }
}

export function createHttpProvider({ baseUrl, fetchImpl = (...a) => fetch(...a), timeoutMs = 8000 }) {
  const base = String(baseUrl).replace(/\/+$/, '');

  async function call(path, init = {}) {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), timeoutMs);
    let res;
    try {
      res = await fetchImpl(`${base}${path}`, { ...init, signal: ctl.signal, headers: { Accept: 'application/json', ...(init.headers || {}) } });
    } catch (e) {
      throw new ProviderError('network', e?.name === 'AbortError' ? 'Request timed out' : 'Network error');
    } finally {
      clearTimeout(timer);
    }
    if (res.status === 404) return null;
    if (!res.ok) throw new ProviderError('http', `Server answered ${res.status}`, res.status);
    try {
      return await res.json();
    } catch {
      throw new ProviderError('invalid', 'Response is not valid JSON');
    }
  }

  /** Keep valid German-market summaries, drop anything else (never show it). */
  const clean = (items) =>
    (items ?? []).flatMap((x) => {
      try {
        return [normalizeSummary(x)];
      } catch (e) {
        if (e instanceof LeafletError) return [];
        throw e;
      }
    });

  const q = (params) => new URLSearchParams(params).toString();

  return {
    name: 'http',
    sampleCodes: null,

    async search(query, { limit = 20 } = {}) {
      return clean((await call(`/v1/medicines/search?${q({ q: query, limit })}`))?.items);
    },
    async suggest(query, { limit = 5 } = {}) {
      return clean((await call(`/v1/medicines/suggest?${q({ q: query, limit })}`))?.items);
    },
    async getLeaflet(id) {
      const raw = await call(`/v1/medicines/${encodeURIComponent(id)}/leaflet`);
      if (!raw) return null;
      try {
        return normalizeLeaflet(raw);
      } catch (e) {
        if (e instanceof LeafletError) throw new ProviderError('invalid', e.message);
        throw e;
      }
    },
    async findByCode(code) {
      const raw = await call(`/v1/medicines/lookup?${q({ code })}`);
      return clean(raw?.item ? [raw.item] : [])[0] ?? null;
    },
    async recognisePhoto(file) {
      const body = new FormData();
      body.append('image', file);
      return clean((await call('/v1/recognise/photo', { method: 'POST', body }))?.items);
    },
    async recogniseCode(code) {
      const raw = await call('/v1/recognise/code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) });
      return clean(raw?.item ? [raw.item] : [])[0] ?? null;
    },
    async submitRequest({ med, email }) {
      await call('/v1/leaflet-requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ medicine: med, email: email || undefined }) });
    },
  };
}
