import { describe, it, expect } from 'vitest';
import { LEAFLETS } from '../src/data/leaflets.js';
import { searchLeaflets, findByCode, editDistance, normalize, autocomplete } from '../src/domain/search.js';

const ids = (r) => r.map((m) => m.id);

describe('searchLeaflets (FR-1, FR-5)', () => {
  it('matches by name, ignoring case and surrounding whitespace', () => {
    expect(ids(searchLeaflets('  PARACETAMOL ', LEAFLETS))).toEqual(['para']);
  });
  it('matches by brand', () => {
    expect(ids(searchLeaflets('nurofen', LEAFLETS))).toEqual(['ibu']);
  });
  it('uses only the first word of the query (dosage can follow)', () => {
    expect(ids(searchLeaflets('ibuprofen 400 mg', LEAFLETS))).toEqual(['ibu']);
  });
  it('auto-corrects a misspelled name', () => {
    expect(ids(searchLeaflets('ibuprofn', LEAFLETS))).toEqual(['ibu']);
    expect(ids(searchLeaflets('amoxicilin', LEAFLETS))).toEqual(['amox']);
  });
  it('does not return unrelated medicines for an exact name', () => {
    expect(ids(searchLeaflets('paracetamol', LEAFLETS))).not.toContain('cet');
  });
  it('finds German originals', () => {
    expect(ids(searchLeaflets('aspirin', LEAFLETS))).toEqual(['asp']);
    expect(ids(searchLeaflets('Novalgin', LEAFLETS))).toEqual(['novalg']);
  });
  it('returns nothing for an empty query or nonsense', () => {
    expect(searchLeaflets('', LEAFLETS)).toEqual([]);
    expect(searchLeaflets('   ', LEAFLETS)).toEqual([]);
    expect(searchLeaflets('zzzz', LEAFLETS)).toEqual([]);
  });
});

describe('findByCode (FR-4)', () => {
  it('finds a known barcode', () => {
    expect(findByCode('5098765432101', LEAFLETS).id).toBe('ibu');
  });
  it('returns null for an unknown code', () => {
    expect(findByCode('0000000000000', LEAFLETS)).toBeNull();
  });
});

describe('helpers', () => {
  it('editDistance', () => {
    expect(editDistance('kitten', 'sitting')).toBe(3);
    expect(editDistance('', 'abc')).toBe(3);
    expect(editDistance('same', 'same')).toBe(0);
  });
  it('normalize', () => {
    expect(normalize('  AbC ')).toBe('abc');
    expect(normalize(null)).toBe('');
  });
});

describe('leaflet data integrity (AD-3)', () => {
  it('every leaflet has id, name, version, ISO date, a unique barcode and sections', () => {
    const codes = new Set();
    for (const m of LEAFLETS) {
      expect(m.id && m.name && m.ver).toBeTruthy();
      expect(m.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Object.keys(m.sections).length).toBeGreaterThanOrEqual(3);
      expect(codes.has(m.code)).toBe(false);
      codes.add(m.code);
    }
  });
  it('every leaflet is German (German market only), in the numbered leaflet structure', () => {
    expect(LEAFLETS.every((m) => m.lang === 'de')).toBe(true);
    LEAFLETS.forEach((m) => expect(Object.keys(m.sections).map((k) => k[0])).toEqual(['1', '2', '3', '4', '5', '6']));
  });
});

describe('autocomplete (live suggestions)', () => {
  it('suggests from the first typed letter, name-prefix matches first', () => {
    expect(ids(autocomplete('p', LEAFLETS))).toEqual(['pant', 'para', 'napro']);
    expect(ids(autocomplete('ibu', LEAFLETS))).toEqual(['ibu']);
  });
  it('matches brand words and any word of the name', () => {
    expect(ids(autocomplete('nur', LEAFLETS))).toEqual(['ibu']);
    expect(ids(autocomplete('tabletten', LEAFLETS, 20))).toEqual(expect.arrayContaining(['asp', 'novalg', 'rami']));
  });
  it('ignores case and whitespace', () => {
    expect(ids(autocomplete('  ASP ', LEAFLETS))).toEqual(['asp']);
  });
  it('falls back to typo tolerance from 3 characters', () => {
    expect(ids(autocomplete('ibuprofn', LEAFLETS))).toEqual(['ibu']);
  });
  it('returns nothing for empty or unmatched input and respects the limit', () => {
    expect(autocomplete('', LEAFLETS)).toEqual([]);
    expect(autocomplete('q', LEAFLETS)).toEqual([]);
    expect(autocomplete('mg', LEAFLETS, 2)).toHaveLength(2);
  });
});
