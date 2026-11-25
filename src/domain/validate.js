// Domain: input validation.

const EMAIL = /^\S+@\S+\.\S+$/;

/** The request email is optional: empty is valid, otherwise it must look like an address. */
export function isValidOptionalEmail(email) {
  const e = String(email ?? '').trim();
  return e === '' || EMAIL.test(e);
}
