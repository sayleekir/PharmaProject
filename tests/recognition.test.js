import { describe, it, expect } from 'vitest';
import { LEAFLETS } from '../src/data/leaflets.js';
import { recognisePhoto, recogniseCode } from '../src/domain/recognition.js';

describe('recognition stand-ins (AD-6)', () => {
  it('photo returns candidates to confirm', () => expect(recognisePhoto(LEAFLETS)).toHaveLength(3));
  it('code returns the medicine or null', () => {
    expect(recogniseCode('4001234567890', LEAFLETS).id).toBe('asp');
    expect(recogniseCode('1', LEAFLETS)).toBeNull();
  });
});
