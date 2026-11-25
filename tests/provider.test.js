import { describe, it, expect, vi } from 'vitest';
import { LEAFLETS } from '../src/data/leaflets.js';
import { createSampleProvider } from '../src/data/providers/sample.js';
import { createHttpProvider, ProviderError } from '../src/data/providers/http.js';
import {
  normalizeLeaflet, normalizeSummary, selectLatest, compareVersions, isGermanLeaflet, isStale, looksLikeCode, LeafletError,
} from '../src/domain/leaflet.js';

const good = (o = {}) => ({ id: 'x1', name: 'Test 5 mg', brand: 'T', lang: 'de', market: 'DE', ver: 'v2.0', date: '2026-10-01', sections: { Anwendung: 'Text' }, ...o });

describe('data policy: Germany only, German only, latest only', () => {
  it('accepts a German-market German leaflet', () => {
    expect(isGermanLeaflet(good())).toBe(true);
    expect(normalizeLeaflet(good()).sections.Anwendung).toBe('Text');
  });
  it('rejects English or non-German-market records', () => {
    expect(() => normalizeSummary(good({ lang: 'en' }))).toThrow(LeafletError);
    expect(() => normalizeSummary(good({ market: 'AT' }))).toThrow(/Not a German-market/);
    expect(isGermanLeaflet(good({ lang: 'en' }))).toBe(false);
  });
  it('rejects malformed leaflets', () => {
    expect(() => normalizeLeaflet(good({ sections: {} }))).toThrow(/no sections/);
    expect(() => normalizeLeaflet(good({ date: 'soon' }))).toThrow(/publish date/);
    expect(() => normalizeLeaflet(good({ ver: '' }))).toThrow(/version/);
    expect(() => normalizeSummary(null)).toThrow(LeafletError);
  });
  it('keeps leaflet text verbatim and only allows https source links', () => {
    const l = normalizeLeaflet(good({ sections: { A: '  keep   spacing  ' }, sourceUrl: 'http://evil', source: 'BfArM' }));
    expect(l.sections.A).toBe('  keep   spacing  ');
    expect(l.sourceUrl).toBe('');
    expect(normalizeLeaflet(good({ sourceUrl: 'https://example.de/x' })).sourceUrl).toBe('https://example.de/x');
  });
  it('selects the latest version by date, then version number', () => {
    const v = [good({ ver: 'v3.0', date: '2026-07-02' }), good({ ver: 'v10.0', date: '2026-07-02' }), good({ ver: 'v2.0', date: '2025-01-01' })];
    expect(selectLatest(v).ver).toBe('v10.0');
    expect(selectLatest([good({ ver: 'v1', date: '2027-01-01' }), good({ ver: 'v9', date: '2026-01-01' })]).ver).toBe('v1');
    expect(selectLatest([])).toBeNull();
  });
  it('compares versions numerically', () => {
    expect(compareVersions('v10.0', 'v9.9')).toBeGreaterThan(0);
    expect(compareVersions('4.2', 'v4.2.0')).toBe(0);
  });
  it('flags stale data', () => {
    const now = new Date('2026-11-25').getTime();
    expect(isStale('2026-11-24', now)).toBe(false);
    expect(isStale('2026-11-01', now)).toBe(true);
    expect(isStale('', now)).toBe(true);
  });
  it('recognises PZN and GTIN numbers', () => {
    expect(looksLikeCode('01234567')).toBe(true);
    expect(looksLikeCode('4001234567890')).toBe(true);
    expect(looksLikeCode('ibuprofen')).toBe(false);
    expect(looksLikeCode('123')).toBe(false);
  });
});

describe('sample provider', () => {
  const p = createSampleProvider({ now: () => '2026-11-25T10:00:00Z' });
  it('serves 30 dummy medicines, flagged as sample', async () => {
    expect(LEAFLETS).toHaveLength(30);
    expect((await p.getLeaflet('dicl')).sample).toBe(true);
    expect((await p.search('Diclac Dolo 25mg, Coated Tablets')).map((m) => m.id)).toEqual(['dicl']);
  });
  it('searches by name, brand, PZN and GTIN', async () => {
    expect((await p.search('ibuprofn')).map((m) => m.id)).toEqual(['ibu']);
    expect((await p.search('00000106')).map((m) => m.id)).toEqual(['asp']);
    expect((await p.search('4001234567890')).map((m) => m.id)).toEqual(['asp']);
    expect(await p.search('99999999')).toEqual([]);
  });
  it('returns the latest leaflet with source and check date', async () => {
    const l = await p.getLeaflet('ibu');
    expect(l.ver).toBe('v3.0');
    expect(l.lang).toBe('de');
    expect(l.market).toBe('DE');
    expect(l.source).toMatch(/Sample/);
    expect(l.checkedAt).toBe('2026-11-25T10:00:00Z');
    expect(await p.getLeaflet('nope')).toBeNull();
  });
  it('suggests while typing and finds codes', async () => {
    expect((await p.suggest('ibu')).map((m) => m.id)).toEqual(['ibu']);
    expect((await p.findByCode('00000109')).id).toBe('rami');
    expect(await p.recogniseCode('0')).toBeNull();
    expect(await p.recognisePhoto()).toHaveLength(3);
  });
  it('only ever returns German-market German leaflets', async () => {
    const all = await Promise.all(LEAFLETS.map((m) => p.getLeaflet(m.id)));
    all.forEach((l) => expect(isGermanLeaflet(l)).toBe(true));
  });
  it('drops non-German records configured into it', async () => {
    const q = createSampleProvider({ leaflets: [{ ...LEAFLETS[0], lang: 'en' }] });
    await expect(q.search('paracetamol')).rejects.toThrow(LeafletError);
  });
});

describe('http provider (API contract)', () => {
  const json = (body, status = 200) => ({ ok: status < 400, status, json: async () => body });
  const summary = (o = {}) => ({ id: 'a', name: 'Aspirin', brand: 'B', lang: 'de', market: 'DE', ver: 'v1', date: '2026-01-01', ...o });

  it('calls the contract endpoints', async () => {
    const f = vi.fn(async () => json({ items: [summary()] }));
    const p = createHttpProvider({ baseUrl: 'https://api.example.de/', fetchImpl: f });
    const res = await p.search('asp b', { limit: 3 });
    expect(res).toHaveLength(1);
    expect(f.mock.calls[0][0]).toBe('https://api.example.de/v1/medicines/search?q=asp+b&limit=3');
    await p.suggest('as');
    expect(f.mock.calls[1][0]).toBe('https://api.example.de/v1/medicines/suggest?q=as&limit=5');
  });
  it('never returns non-German or non-German-market results', async () => {
    const f = async () => json({ items: [summary(), summary({ id: 'b', lang: 'en' }), summary({ id: 'c', market: 'AT' })] });
    const p = createHttpProvider({ baseUrl: 'https://x', fetchImpl: f });
    expect((await p.search('a')).map((m) => m.id)).toEqual(['a']);
  });
  it('loads and validates the latest leaflet', async () => {
    const leaflet = { ...summary(), sections: { Anwendung: 'X' }, source: 'BfArM AMIce', sourceUrl: 'https://www.bfarm.de/', checkedAt: '2026-11-25T08:00:00Z' };
    const f = vi.fn(async () => json(leaflet));
    const p = createHttpProvider({ baseUrl: 'https://x', fetchImpl: f });
    const l = await p.getLeaflet('a b');
    expect(f.mock.calls[0][0]).toBe('https://x/v1/medicines/a%20b/leaflet');
    expect(l.source).toBe('BfArM AMIce');
  });
  it('returns null on 404 and rejects an invalid leaflet', async () => {
    expect(await createHttpProvider({ baseUrl: 'https://x', fetchImpl: async () => json({}, 404) }).getLeaflet('z')).toBeNull();
    const bad = createHttpProvider({ baseUrl: 'https://x', fetchImpl: async () => json({ ...summary(), sections: {} }) });
    await expect(bad.getLeaflet('a')).rejects.toMatchObject({ kind: 'invalid' });
  });
  it('reports network, http and json errors as ProviderError', async () => {
    const net = createHttpProvider({ baseUrl: 'https://x', fetchImpl: async () => { throw new TypeError('offline'); } });
    await expect(net.search('a')).rejects.toMatchObject({ name: 'ProviderError', kind: 'network' });
    const h500 = createHttpProvider({ baseUrl: 'https://x', fetchImpl: async () => json({}, 500) });
    await expect(h500.search('a')).rejects.toMatchObject({ kind: 'http', status: 500 });
    const bad = createHttpProvider({ baseUrl: 'https://x', fetchImpl: async () => ({ ok: true, status: 200, json: async () => { throw new Error('x'); } }) });
    await expect(bad.search('a')).rejects.toBeInstanceOf(ProviderError);
  });
  it('sends leaflet requests with the optional email', async () => {
    const f = vi.fn(async () => json({}, 202));
    await createHttpProvider({ baseUrl: 'https://x', fetchImpl: f }).submitRequest({ med: 'M', email: '' });
    const [url, init] = f.mock.calls[0];
    expect(url).toBe('https://x/v1/leaflet-requests');
    expect(JSON.parse(init.body)).toEqual({ medicine: 'M' });
    expect(init.method).toBe('POST');
  });
});
