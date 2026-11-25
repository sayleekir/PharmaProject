// App: language state (AD-2: the preference is stored locally via the store).
import { createI18n } from '../domain/i18n.js';
import { DE } from '../data/i18n.de.js';
import * as EN_CONTENT from '../data/content.js';
import * as DE_CONTENT from '../data/content.de.js';
import { store } from './state.js';

const i18n = createI18n({ de: DE }, store.getLang());
const listeners = [];

export const t = (key, params) => i18n.t(key, params);
export const getLang = () => i18n.lang;
export const locale = () => (i18n.lang === 'de' ? 'de-DE' : 'en-US');
export const onLangChange = (fn) => listeners.push(fn);

/** Language-specific static content (steps, FAQ, hero lines). Legal texts are English only. */
export const content = () => ({
  STEPS: i18n.lang === 'de' ? DE_CONTENT.STEPS : EN_CONTENT.STEPS,
  FAQ: i18n.lang === 'de' ? DE_CONTENT.FAQ : EN_CONTENT.FAQ,
  HERO: i18n.lang === 'de' ? DE_CONTENT.HERO : EN_CONTENT.HERO,
});

export function setLang(l) {
  i18n.setLang(l);
  store.setLang(i18n.lang);
  applyStatic();
  listeners.forEach((fn) => fn(i18n.lang));
}

/** Translate the static shell: elements with data-t (text) and data-t-aria (aria-label); mark the active language. */
export function applyStatic() {
  document.documentElement.lang = i18n.lang;
  document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = t(el.dataset.t); });
  document.querySelectorAll('[data-t-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.tAria)));
  document.querySelectorAll('[data-lang]').forEach((b) => {
    const on = b.dataset.lang === i18n.lang;
    b.setAttribute('aria-pressed', String(on));
    b.classList.toggle('on', on);
  });
}
