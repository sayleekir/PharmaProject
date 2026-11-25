// STAND-IN for real recognition services (AD-6, PRD FR-3/FR-4 [ASSUMPTION]).
// A production build replaces these with calls to OCR / barcode services; callers keep the same shape.
import { findByCode } from './search.js';

/** "Read" a photo of a medicine box: returns candidate medicines the user must confirm. */
export function recognisePhoto(db, count = 3) {
  return db.slice(0, count);
}

/** "Read" a scanned QR/barcode: returns the medicine or null when the code is unknown. */
export function recogniseCode(code, db) {
  return findByCode(code, db);
}
