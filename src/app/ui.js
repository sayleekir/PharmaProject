// App: small DOM helpers shared by all views.
import { t } from './i18n.js';

export const $ = (s, root = document) => root.querySelector(s);

export const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export const mail = (a) => `<a href="mailto:${a}">${a}</a>`;
export const paras = (list) => list.map((p) => `<p>${esc(p)}</p>`).join('');

export function toast(message) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.setAttribute('role', 'status');
  t.textContent = message;
  document.body.append(t);
  setTimeout(() => t.remove(), 2600);
}

/** Standard page width: the centred 640 px column used by Home, applied to the page title and the main content. */
export function pageColumn() {
  $('#main').className = 'w640';
  $('#title').classList.add('t640');
}

/** Navigation counter (bumped by the router) so late async results for a page the user left are ignored. */
export const nav = { epoch: 0 };

/**
 * Show a spinner while `work()` (sync or async) runs, for at least `timing.delay` ms (a short, calm pause;
 * tests set it to 0). Then `onDone(result)` or `onError(error)`, unless the user navigated away meanwhile.
 */
export const timing = { delay: 1200 };
export function withSpinner(message, work, onDone, onError) {
  const epoch = nav.epoch;
  $('#main').innerHTML = `<div class="center"><div class="spin"></div><p>${esc(message)}</p></div>`;
  const pause = new Promise((r) => setTimeout(r, timing.delay));
  Promise.all([Promise.resolve().then(work), pause]).then(
    ([res]) => { if (epoch === nav.epoch) onDone?.(res); },
    (err) => { if (epoch === nav.epoch) (onError ?? (() => {}))(err); },
  );
}

/** Destructive actions always ask once; cancel is the safe default (EXPERIENCE.md). */
export function confirmDialog(title, message, onYes) {
  const s = document.createElement('div');
  s.className = 'sheet';
  s.setAttribute('role', 'dialog');
  s.setAttribute('aria-modal', 'true');
  s.innerHTML = `<div class="stack"><h2>${esc(title)}</h2><p class="muted">${esc(message)}</p><button class="btn danger" id="y">${esc(t('Delete'))}</button><button class="btn sec" id="n">${esc(t('Cancel'))}</button></div>`;
  document.body.append(s);
  $('#n', s).onclick = () => s.remove();
  $('#y', s).onclick = () => {
    s.remove();
    onYes();
  };
  $('#n', s).focus();
}

/** A modal sheet; returns { el, close }. */
export function openSheet(html) {
  const el = document.createElement('div');
  el.className = 'sheet';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.innerHTML = html;
  document.body.append(el);
  return { el, close: () => el.remove() };
}
