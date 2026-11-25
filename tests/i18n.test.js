import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createI18n, isLang } from '../src/domain/i18n.js';
import { createStore } from '../src/domain/storage.js';
import { DE } from '../src/data/i18n.de.js';
import * as EN_CONTENT from '../src/data/content.js';
import * as DE_CONTENT from '../src/data/content.de.js';

describe('createI18n', () => {
  const dicts = { de: { Hello: 'Hallo', 'Hi {name}': 'Hallo {name}' } };
  it('returns the English text for en', () => {
    expect(createI18n(dicts, 'en').t('Hello')).toBe('Hello');
  });
  it('translates for de and fills placeholders', () => {
    const i = createI18n(dicts, 'de');
    expect(i.t('Hello')).toBe('Hallo');
    expect(i.t('Hi {name}', { name: 'Anna' })).toBe('Hallo Anna');
    expect(createI18n(dicts, 'en').t('Hi {name}', { name: 'Anna' })).toBe('Hi Anna');
  });
  it('falls back to the English text when a key is missing', () => {
    expect(createI18n(dicts, 'de').t('Unknown')).toBe('Unknown');
  });
  it('ignores unsupported languages', () => {
    const i = createI18n(dicts, 'fr');
    expect(i.lang).toBe('en');
    i.setLang('de');
    i.setLang('xx');
    expect(i.lang).toBe('de');
    expect(isLang('xx')).toBe(false);
  });
});

describe('language preference storage', () => {
  it('defaults to en, stores de, rejects junk', () => {
    const m = new Map();
    const st = { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v), removeItem: (k) => m.delete(k) };
    const s = createStore(st);
    expect(s.getLang()).toBe('en');
    s.setLang('de');
    expect(createStore(st).getLang()).toBe('de');
    s.setLang('xx');
    expect(s.getLang()).toBe('de');
  });
});

describe('German dictionary coverage', () => {
  const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
  const root = resolve(import.meta.dirname, '..');
  const keys = new Set();
  for (const f of walk(join(root, 'src/app')).filter((x) => x.endsWith('.js'))) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(/\bt\(\s*(['"])((?:\\.|(?!\1).)*)\1/g)) keys.add(m[2].replace(/\\'/g, "'"));
  }
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  for (const m of html.matchAll(/data-t(?:-aria)?="([^"]+)"/g)) keys.add(m[1]);

  it('finds the UI strings', () => expect(keys.size).toBeGreaterThan(100));
  it('has a German translation for every UI string', () => {
    const missing = [...keys].filter((k) => !(k in DE));
    expect(missing).toEqual([]);
  });
  it('has no unused German entries', () => {
    const extra = Object.keys(DE).filter((k) => !keys.has(k));
    expect(extra).toEqual([]);
  });
  it('keeps placeholders identical in both languages', () => {
    const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join();
    for (const [k, v] of Object.entries(DE)) expect(ph(v), k).toBe(ph(k));
  });
  it('German content mirrors the English structure', () => {
    expect(DE_CONTENT.STEPS).toHaveLength(EN_CONTENT.STEPS.length);
    expect(DE_CONTENT.FAQ).toHaveLength(EN_CONTENT.FAQ.length);
    expect(Object.keys(DE_CONTENT.HERO)).toEqual(Object.keys(EN_CONTENT.HERO));
  });
});
