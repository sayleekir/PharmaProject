import { describe, it, expect } from 'vitest';
import { createStore, KEYS } from '../src/domain/storage.js';
import { isValidOptionalEmail } from '../src/domain/validate.js';

const fakeStorage = () => {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, v), removeItem: (k) => m.delete(k), _m: m };
};

describe('history (FR-10, AD-2)', () => {
  it('stores newest first and de-duplicates by query', () => {
    let t = 1;
    const s = createStore(fakeStorage(), () => t++);
    s.addHistory({ q: 'a' });
    s.addHistory({ q: 'b' });
    s.addHistory({ q: 'a', id: 'x' });
    expect(s.getHistory().map((h) => h.q)).toEqual(['a', 'b']);
    expect(s.getHistory()[0].id).toBe('x');
  });
  it('keeps at most 20 entries', () => {
    const s = createStore(fakeStorage());
    for (let i = 0; i < 30; i++) s.addHistory({ q: 'q' + i });
    expect(s.getHistory()).toHaveLength(20);
    expect(s.getHistory()[0].q).toBe('q29');
  });
  it('clears', () => {
    const s = createStore(fakeStorage());
    s.addHistory({ q: 'a' });
    s.clearHistory();
    expect(s.getHistory()).toEqual([]);
  });
});

describe('requests (FR-9, FR-11)', () => {
  it('adds, removes and clears; email is optional', () => {
    let t = 100;
    const s = createStore(fakeStorage(), () => t++);
    const a = s.addRequest({ med: 'X', email: 'a@b.de' });
    const b = s.addRequest({ med: 'Y' });
    expect(s.getRequests().map((r) => r.med)).toEqual(['Y', 'X']);
    expect(b.email).toBe('');
    s.removeRequest(a.id);
    expect(s.getRequests().map((r) => r.med)).toEqual(['Y']);
    s.clearRequests();
    expect(s.getRequests()).toEqual([]);
  });
});

describe('resilience (NFR-4)', () => {
  it('works with the in-memory fallback when no storage is given', () => {
    const s = createStore(null);
    s.addHistory({ q: 'a' });
    expect(s.getHistory()).toHaveLength(1);
  });
  it('survives a storage that throws', () => {
    const bad = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
    const s = createStore(bad);
    expect(() => s.addHistory({ q: 'a' })).not.toThrow();
    expect(s.getHistory()).toEqual([]);
  });
  it('ignores corrupted JSON', () => {
    const st = fakeStorage();
    st.setItem(KEYS.history, '{not json');
    expect(createStore(st).getHistory()).toEqual([]);
  });
});

describe('isValidOptionalEmail (FR-9)', () => {
  it.each([['', true], ['  ', true], ['a@b.de', true], ['a@b', false], ['abc', false], ['a b@c.de', false]])('%j -> %s', (v, ok) => {
    expect(isValidOptionalEmail(v)).toBe(ok);
  });
});
