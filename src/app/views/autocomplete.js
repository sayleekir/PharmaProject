// View helper: live suggestions under the search box (ARIA combobox with listbox).
import { normalize } from '../../domain/search.js';
import { esc } from '../ui.js';
import { t } from '../i18n.js';
import { provider } from '../provider.js';

/** Pause after the last keystroke before asking the provider (tests set it to 0). */
export const acTiming = { debounce: 150 };

/** Escape `text` and wrap the first case-insensitive occurrence of `q` in <mark>. */
export function highlight(text, q) {
  const i = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (i < 0) return esc(text);
  return `${esc(text.slice(0, i))}<mark>${esc(text.slice(i, i + q.length))}</mark>${esc(text.slice(i + q.length))}`;
}

/**
 * Attach suggestions to a text input. `onChoose(medicine)` runs when the user picks one
 * (tap, click or Enter on the highlighted option). Returns a cleanup-free controller.
 */
export function attachAutocomplete(input, listEl, onChoose) {
  let items = [];
  let active = -1;

  const close = () => {
    listEl.hidden = true;
    listEl.innerHTML = '';
    items = [];
    active = -1;
    seq++;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  };

  const setActive = (i) => {
    active = i;
    listEl.querySelectorAll('[role=option]').forEach((li, k) => {
      li.classList.toggle('on', k === i);
      li.setAttribute('aria-selected', String(k === i));
    });
    if (i >= 0) input.setAttribute('aria-activedescendant', `ac-opt-${i}`);
    else input.removeAttribute('aria-activedescendant');
  };

  let seq = 0;
  let timer = null;
  const paint = (list, q) => {
    items = list;
    if (!items.length) return close();
    const nq = normalize(q);
    listEl.innerHTML = items
      .map((m, i) => `<li role="option" id="ac-opt-${i}" aria-selected="false" data-i="${i}"><span class="ac-n">${highlight(m.name, nq)}</span><small>${highlight(m.brand, nq)}</small></li>`)
      .join('');
    listEl.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    active = -1;
  };

  /** Debounced; results from an older keystroke are ignored. A failing provider just shows no suggestions. */
  const render = () => {
    clearTimeout(timer);
    const q = input.value.trim();
    const mine = ++seq;
    if (!q) return close();
    timer = setTimeout(async () => {
      try {
        const list = await provider.suggest(q);
        if (mine === seq && document.contains(input)) paint(list, q);
      } catch {
        if (mine === seq) close();
      }
    }, acTiming.debounce);
  };

  const choose = (i) => {
    const m = items[i];
    if (!m) return;
    input.value = m.name;
    close();
    onChoose(m);
  };

  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', listEl.id);
  listEl.setAttribute('role', 'listbox');
  listEl.setAttribute('aria-label', t('Suggestions'));

  input.addEventListener('input', render);
  input.addEventListener('keydown', (e) => {
    if (listEl.hidden) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((active + 1) % items.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((active - 1 + items.length) % items.length); }
    else if (e.key === 'Enter' && active >= 0) { e.preventDefault(); choose(active); }
    else if (e.key === 'Escape') { e.stopPropagation(); close(); }
  });
  // mousedown (not click) so the input keeps focus and the choice is not lost to blur
  listEl.addEventListener('mousedown', (e) => {
    const li = e.target.closest('[role=option]');
    if (li) { e.preventDefault(); choose(Number(li.dataset.i)); }
  });
  input.addEventListener('blur', () => setTimeout(close, 120));

  return { close };
}
