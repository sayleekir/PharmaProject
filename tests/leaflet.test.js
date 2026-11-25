import { describe, it, expect } from 'vitest';
import { sectionKeys, isNew, audioText } from '../src/domain/leaflet.js';

describe("sections stay in the leaflet's own order (FR-6, AD-3)", () => {
  it('never reorders sections', () => {
    const s = { Aufbewahrung: '1', Warnhinweise: '2', Anwendung: '3', 'Was ist das': '4', Nebenwirkungen: '5' };
    expect(sectionKeys(s)).toEqual(['Aufbewahrung', 'Warnhinweise', 'Anwendung', 'Was ist das', 'Nebenwirkungen']);
  });
  it('does not change the text of any section', () => {
    const s = { B: 'x', A: 'y' };
    sectionKeys(s);
    expect(s).toEqual({ B: 'x', A: 'y' });
  });
});

describe('isNew', () => {
  const now = new Date('2026-11-25').getTime();
  it('is true within 60 days', () => expect(isNew('2026-10-21', now)).toBe(true));
  it('is false after 60 days', () => expect(isNew('2026-07-02', now)).toBe(false));
  it('is false for an invalid date', () => expect(isNew('nope', now)).toBe(false));
});

describe('audioText (FR-7)', () => {
  const m = { sections: { A: 'one', B: 'two' } };
  it('reads all shown sections in order', () => expect(audioText(m, ['A', 'B'])).toBe('A. one B. two'));
  it('reads only the selected section', () => expect(audioText(m, ['A', 'B'], 'B')).toBe('B. two'));
});
