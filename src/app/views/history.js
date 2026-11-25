// View: My medicines (history and pending requests, stored on this device only).
import { $, esc, confirmDialog, pageColumn } from '../ui.js';
import { store } from '../state.js';
import { t, locale } from '../i18n.js';
import { openLeaflet } from './leaflet.js';

export function historyView() {
  pageColumn();
  const history = store.getHistory();
  const requests = store.getRequests();
  const meds = history.filter((h) => h.id);
  $('#main').innerHTML = `<p class="muted">${esc(t('Saved only on this device.'))}</p><div id="l" class="list"></div>
 <h2>${esc(t('Pending requests'))}</h2><div id="r"></div>
 ${history.length ? `<button class="btn danger" id="clr" style="margin-top:12px">${esc(t('Delete my history'))}</button>` : ''}`;

  const l = $('#l');
  if (!meds.length) l.innerHTML = `<p>${esc(t('No medicines viewed yet.'))}</p>`;
  meds.forEach((h) => {
    const b = document.createElement('button');
    b.className = 'item';
    b.innerHTML = `<span class="grow"><b>${esc(h.q)}</b><small>${esc(t('Viewed'))} ${new Date(h.t).toLocaleDateString(locale())}${h.ver ? ' · ' + esc(h.ver) : ''}</small></span>›`;
    b.onclick = () => openLeaflet({ id: h.id, name: h.q });
    l.append(b);
  });

  $('#r').innerHTML = requests.length
    ? requests.map((r) => `<div class="card"><b>${esc(r.med)}</b> <span class="tag warn">${esc(t('Requested'))}</span><div class="muted">${r.email ? esc(t('Alert:')) + ' ' + esc(r.email) : esc(t('No email alert'))}</div></div>`).join('')
    : `<p class="muted">${esc(t('None.'))}</p>`;

  const c = $('#clr');
  if (c) {
    c.onclick = () =>
      confirmDialog(t('Delete your history?'), t('Recent searches and viewed medicines will be removed from this device.'), () => {
        store.clearHistory();
        historyView();
      });
  }
}
