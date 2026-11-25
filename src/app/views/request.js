// View: request a missing leaflet (optional email), confirmation, edit, undo.
import { isValidOptionalEmail } from '../../domain/validate.js';
import { $, esc, toast } from '../ui.js';
import { setTab, replace } from '../router.js';
import { store } from '../state.js';
import { icon } from '../icons.js';
import { t } from '../i18n.js';
import { provider } from '../provider.js';

export function requestForm(q, prefill = '') {
  $('#title').textContent = '';
  $('#main').innerHTML = `<div class="narrow nf"><div class="center"><h2 class="nf-title">${esc(t('Request leaflet'))}</h2></div>
 <div class="card"><label for="mn"><b>${esc(t('Medicine'))}</b></label><br><input id="mn" type="text" value="${esc(q || '')}" placeholder="${esc(t('Medicine name'))}"></div>
 <div class="card"><label for="em"><b>${esc(t('Email (optional)'))}</b></label><p class="muted">${esc(t('Only to alert you once the leaflet is added. Not linked to any account.'))}</p><input id="em" type="email" value="${esc(prefill)}" placeholder="you@example.com"></div>
 <div class="stack"><button class="btn" id="send">${esc(t('Send request'))}</button><button class="btn sec" id="noem">${esc(t('Send without email'))}</button></div></div>`;

  const send = (withEmail) => {
    const email = withEmail ? $('#em').value.trim() : '';
    if (withEmail && !isValidOptionalEmail(email)) {
      toast(t('Please check the email address.'));
      return;
    }
    const r = store.addRequest({ med: $('#mn').value.trim() || t('Unknown medicine'), email });
    provider.submitRequest({ med: r.med, email: r.email }).catch(() => toast(t('We could not send your request right now. It is saved on this device.')));
    replace(() => requestDone(r), '');
  };
  $('#send').onclick = () => send(true);
  $('#noem').onclick = () => send(false);
}

export function requestDone(r) {
  const info = r.email
    ? t('We’ll email {email} once it is added.', { email: `<b>${esc(r.email)}</b>` })
    : t('No email given — check back later in the app.');
  $('#title').textContent = '';
  $('#main').innerHTML = `<div class="narrow nf"><div class="center"><div class="big ok-ic">${icon('check', 'ic big-ic')}</div><h2 class="nf-title">${esc(t('Request sent'))}</h2>
 <p>“${esc(r.med)}”</p><p class="muted">${info}</p></div>
 <div class="stack"><button class="btn sec" id="edit">${esc(t('Edit email'))}</button><button class="btn danger" id="undo">${esc(t('Undo request'))}</button><button class="btn" id="home">${esc(t('Back to search'))}</button></div></div>`;
  $('#edit').onclick = () => {
    store.removeRequest(r.id);
    replace(() => requestForm(r.med, r.email), '');
  };
  $('#undo').onclick = () => {
    store.removeRequest(r.id);
    toast(t('Request cancelled'));
    setTab('home');
  };
  $('#home').onclick = () => setTab('home');
}
