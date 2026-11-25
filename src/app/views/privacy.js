// View: Privacy (delete my data + privacy policy; the policy text is English only).
import { POLICY } from '../../data/content.js';
import { $, esc, paras, toast, confirmDialog, pageColumn } from '../ui.js';
import { store } from '../state.js';
import { t } from '../i18n.js';
import { englishOnlyNotice } from './pages.js';

export function privacy() {
  pageColumn();
  $('#main').innerHTML = `<div class="narrow" style="max-width:820px">
 <div class="card"><h2>${esc(t('Your data on this device'))}</h2><p>${esc(t('No login. No personal data is stored on our servers. Searches stay on this device. The only data we may hold is the optional email you give to request a leaflet.'))}</p>
 <div class="stack"><button class="btn danger" id="d1">${esc(t('Delete my history on this device'))}</button><button class="btn danger" id="d2">${esc(t('Delete my leaflet requests & email'))}</button></div></div>
 <h2 style="margin-top:24px">${esc(t('Privacy policy'))}</h2>${englishOnlyNotice()}
 <div class="acc">${POLICY.map(([h, p], i) => `<details${i ? '' : ' open'}><summary>${esc(h)}</summary>${paras(p)}</details>`).join('')}</div></div>`;
  $('#d1').onclick = () => confirmDialog(t('Delete history?'), t('This cannot be undone.'), () => { store.clearHistory(); toast(t('History deleted')); });
  $('#d2').onclick = () => confirmDialog(t('Delete requests?'), t('Your email will no longer be used for alerts.'), () => { store.clearRequests(); toast(t('Requests and email deleted')); });
}
