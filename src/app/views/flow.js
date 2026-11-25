// View: suggestions (confirm by touch), the not-found screen and the search-unavailable screen.
import { $, esc, pageColumn } from '../ui.js';
import { go, back, setTab } from '../router.js';
import { icon } from '../icons.js';
import { t } from '../i18n.js';
import { openLeaflet } from './leaflet.js';
import { requestForm } from './request.js';

export function suggest(list, mode, q) {
  pageColumn();
  $('#main').innerHTML = `<p class="muted">${esc(mode === 'text' ? t('AI auto-corrected and suggests:') : t('Please check and tap the right medicine.'))}</p><div id="l" class="list"></div>
 <button class="btn link" id="none" style="margin-top:8px">${esc(t('None of these — request a leaflet'))}</button>
 ${mode === 'photo' ? `<button class="btn link" id="retake">${esc(t('Retake photo'))}</button>` : ''}`;
  const l = $('#l');
  list.forEach((m) => {
    const b = document.createElement('button');
    b.className = 'item';
    b.innerHTML = `<span class="grow"><b>${esc(m.name)}</b><small>${esc(m.brand)}</small></span>›`;
    b.onclick = () => openLeaflet(m);
    l.append(b);
  });
  $('#none').onclick = () => go(() => noResult(q || ''), '');
  const r = $('#retake');
  if (r) r.onclick = back;
}

export function noResult(q) {
  const msg = q
    ? t('We only show approved, latest leaflets — nothing for “{q}” yet. You can retry, use another way to search, or ask us to add it.', { q: esc(q) })
    : t('We only show approved, latest leaflets. You can retry, use another way to search, or ask us to add it.');
  $('#title').textContent = '';
  $('#main').innerHTML = `<div class="narrow nf"><div class="center"><div class="big">${icon('empty', 'ic big-ic')}</div><h2 class="nf-title">${esc(t('Leaflet not found'))}</h2>
 <p class="muted">${msg}</p></div>
 <div class="stack"><button class="btn" id="req">${esc(t('Request this leaflet'))}</button><button class="btn sec" id="again">${esc(t('Search again'))}</button></div></div>`;
  $('#req').onclick = () => go(() => requestForm(q), '');
  $('#again').onclick = () => setTab('home');
}

/** Shown when the data service cannot be reached or answers badly. Never shows partial or unapproved data. */
export function searchError(retry) {
  $('#title').textContent = '';
  $('#main').innerHTML = `<div class="narrow nf"><div class="center"><div class="big">${icon('info', 'ic big-ic')}</div><h2 class="nf-title">${esc(t('Search is temporarily unavailable'))}</h2>
 <p class="muted">${esc(t('We could not reach the leaflet service. Please check your connection and try again.'))}</p></div>
 <div class="stack"><button class="btn" id="retry">${esc(t('Try again'))}</button><button class="btn sec" id="again">${esc(t('Back to search'))}</button></div></div>`;
  $('#retry').onclick = retry;
  $('#again').onclick = () => setTab('home');
}
