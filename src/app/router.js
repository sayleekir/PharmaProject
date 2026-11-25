// App: tiny view router. A tab is a root view; `go` pushes a sub-view on the stack.
import { $, nav } from './ui.js';
import { stopSpeaking } from './capabilities.js';
import { content } from './i18n.js';

/** Hero photo for a page, resolved against the page (not the stylesheet) so it works from any folder. */
export const heroUrl = (t) => new URL(`assets/hero/${t}.jpg`, document.baseURI).href;

const stack = [];
let tabs = {};
let moreTabs = [];
let currentTab = 'home';

export function initRouter(config) {
  tabs = config.tabs;
  moreTabs = config.moreTabs;
}

const titleOf = (s) => (typeof s.title === 'function' ? s.title() : s.title);

function show() {
  nav.epoch++;
  const s = stack[stack.length - 1];
  const title = $('#title');
  title.classList.toggle('ctr', s.kind === 'contact');
  title.classList.remove('t640');
  $('#main').className = '';
  title.textContent = titleOf(s);
  $('#back').hidden = stack.length < 2;
  window.scrollTo(0, 0);
  $('#slot').innerHTML = '';
  stopSpeaking();
  s.render();
}

/** Push a sub-view. `title` is a string or a function returning one (so it can follow the language). */
export function go(render, title) {
  stack.push({ render, title });
  show();
}

/** Pop the current sub-view and show the previous one. */
export function back() {
  stack.pop();
  show();
}

/** Drop sub-views above the root without rendering (used before pushing results). */
export function trimToRoot() {
  stack.length = Math.min(stack.length, 1);
}

/** Replace the current sub-view with another (pop then push). */
export function replace(render, title) {
  stack.pop();
  go(render, title);
}

function applyHero() {
  const h = content().HERO[currentTab];
  $('#hk').textContent = h[0];
  $('#hl').textContent = h[1];
  $('.herob').style.setProperty('--hero-img', `url("${heroUrl(currentTab)}")`);
  $('.herob').dataset.page = currentTab;
}

/** Switch to a root view (header and footer links). */
export function setTab(t) {
  const def = tabs[t];
  currentTab = t;
  document.querySelectorAll('.bar [data-tab]').forEach((b) => b.classList.toggle('on', b.dataset.tab === t));
  $('#morebtn').classList.toggle('on', moreTabs.includes(t));
  applyHero();
  closeMenu();
  stack.length = 0;
  stack.push({ render: def.render, title: def.title, kind: t });
  show();
}

/** Re-render the current view after a language change; keeps what the user typed in the search box. */
export function rerender() {
  const q = $('#q')?.value;
  applyHero();
  show();
  if (q && $('#q')) $('#q').value = q;
}

export function closeMenu() {
  const m = $('#moremenu');
  if (m) m.hidden = true;
  $('#morebtn')?.setAttribute('aria-expanded', 'false');
  const mm = $('#mobilemenu');
  if (mm) mm.hidden = true;
  $('#burger')?.setAttribute('aria-expanded', 'false');
}
