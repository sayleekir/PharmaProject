// Data provider: built-in SAMPLE leaflets (prototype default). Same async interface as the HTTP provider.
// Every record goes through the normalisation policy, so sample data obeys the same rules as live data.
import { LEAFLETS } from '../leaflets.js';
import { searchLeaflets, autocomplete, findByCode } from '../../domain/search.js';
import { normalizeLeaflet, normalizeSummary, looksLikeCode } from '../../domain/leaflet.js';
import { recognisePhoto, recogniseCode } from '../../domain/recognition.js';

export function createSampleProvider({ leaflets = LEAFLETS, delay = 0, now = () => new Date().toISOString() } = {}) {
  const wait = () => (delay ? new Promise((r) => setTimeout(r, delay)) : Promise.resolve());
  const withMeta = (m) => ({ ...m, market: 'DE', source: 'Sample data (prototype)', checkedAt: now() });
  const summaries = (list) => list.map((m) => normalizeSummary(withMeta(m)));

  return {
    name: 'sample',
    /** Codes the prototype's scan dialog offers. Live providers do not have this. */
    sampleCodes: () => [leaflets[0], leaflets[1], leaflets.find((x) => x.id === 'asp')].filter(Boolean).map((m) => ({ code: m.code, name: m.name })),

    async search(query, { limit = 20 } = {}) {
      await wait();
      if (looksLikeCode(query)) {
        const m = leaflets.find((x) => x.code === query.trim() || x.pzn === query.trim());
        return m ? summaries([m]) : [];
      }
      return summaries(searchLeaflets(query, leaflets).slice(0, limit));
    },
    async suggest(query, { limit = 5 } = {}) {
      await wait();
      return summaries(autocomplete(query, leaflets, limit));
    },
    async getLeaflet(id) {
      await wait();
      const m = leaflets.find((x) => x.id === id);
      if (!m) return null;
      return normalizeLeaflet(withMeta(m));
    },
    async findByCode(code) {
      await wait();
      const m = findByCode(code, leaflets) ?? leaflets.find((x) => x.pzn === String(code).trim());
      return m ? summaries([m])[0] : null;
    },
    /** Stand-ins for photo and barcode recognition (AD-6). */
    async recognisePhoto() {
      await wait();
      return summaries(recognisePhoto(leaflets));
    },
    async recogniseCode(code) {
      await wait();
      const m = recogniseCode(code, leaflets) ?? leaflets.find((x) => x.pzn === String(code).trim());
      return m ? summaries([m])[0] : null;
    },
    async submitRequest() {
      /* nothing to send in the prototype: the request stays on the device */
    },
  };
}
