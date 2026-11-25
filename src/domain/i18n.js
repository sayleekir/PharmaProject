// Domain: minimal translation. UI strings use their English text as the key; German is looked up
// in a dictionary and falls back to the English text when missing. Pure, no DOM (AD-1).

export const LANGS = ['en', 'de'];
export const DEFAULT_LANG = 'en';

export const isLang = (l) => LANGS.includes(l);

export function createI18n(dicts = {}, lang = DEFAULT_LANG) {
  let current = isLang(lang) ? lang : DEFAULT_LANG;
  return {
    get lang() {
      return current;
    },
    setLang(l) {
      if (isLang(l)) current = l;
    },
    /** Translate `key` (English text). `{name}` placeholders are filled from `params` (callers escape HTML). */
    t(key, params) {
      const s = current === 'en' ? key : (dicts[current]?.[key] ?? key);
      return params ? s.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? '') : s;
    },
  };
}
