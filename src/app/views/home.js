// View: Home (text / voice / photo / scan) and the search flow up to suggestions.
import { $, esc, toast, withSpinner, openSheet, pageColumn } from '../ui.js';
import { go, trimToRoot } from '../router.js';
import { store } from '../state.js';
import { listen } from '../capabilities.js';
import { icon } from '../icons.js';
import { t, locale } from '../i18n.js';
import { provider } from '../provider.js';
import { suggest, noResult, searchError } from './flow.js';
import { openLeaflet } from './leaflet.js';
import { attachAutocomplete } from './autocomplete.js';

export function home() {
  pageColumn();
  $('#main').innerHTML = `
 <div class="hero"><p class="muted" style="margin-top:0">${esc(t('No login needed. Search the way that is easiest for you.'))}</p>
 <form class="row" id="f"><div class="ac"><input id="q" type="text" placeholder="${esc(t('Type medicine name, PZN or GTIN…'))}" aria-label="${esc(t('Medicine name, PZN or GTIN'))}" autocomplete="off"><ul id="ac-list" class="ac-list" hidden></ul></div><button class="btn" style="width:auto">${esc(t('Search'))}</button></form>
 <div class="modes">
  <button id="mic"><span class="mi">${icon('mic')}</span>${esc(t('Say the name'))}</button>
  <button id="cam"><span class="mi">${icon('camera')}</span>${esc(t('Photo of box'))}</button>
  <button id="scan"><span class="mi">${icon('scan')}</span>${esc(t('Scan QR / barcode'))}</button>
 </div></div>
 <input type="file" id="file" accept="image/*" hidden>
 <h2 class="home-h">${esc(t('Recent searches'))}</h2>
 <div id="recent" class="list"></div>
 <div class="note" role="note">${icon('info', 'ic note-ic')}<div><b>${esc(t('Note'))}</b><p>${esc(t('Due to legal reasons, leaflets are only available in German.'))} ${esc(t('The website covers medicines sold in Germany.'))}</p></div></div>`;

  $('#f').onsubmit = (e) => {
    e.preventDefault();
    const q = $('#q').value.trim();
    if (q) search(q, 'text');
  };
  attachAutocomplete($('#q'), $('#ac-list'), openLeaflet);
  $('#mic').onclick = voiceSearch;
  $('#cam').onclick = () => $('#file').click();
  $('#file').onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    withSpinner(
      t('Reading the photo…'),
      () => provider.recognisePhoto(file),
      (list) => (list.length ? go(() => suggest(list, 'photo'), () => t('Is it one of these?')) : go(() => noResult(''), '')),
      () => go(() => searchError(() => $('#file').click()), ''),
    );
  };
  $('#scan').onclick = scanSheet;

  const recent = $('#recent');
  const items = store.getHistory().slice(0, 4);
  recent.innerHTML = items.length ? '' : `<p class="muted">${esc(t('Nothing yet.'))}</p>`;
  items.forEach((h) => {
    const b = document.createElement('button');
    b.className = 'item';
    b.innerHTML = `<span class="grow">${esc(h.q)}<small>${new Date(h.t).toLocaleDateString(locale())}</small></span>›`;
    b.onclick = () => search(h.q, 'text');
    recent.append(b);
  });
}

/** Search flow: spinner, ask the provider (name, PZN or GTIN), record in history, then suggestions or not-found. */
export function search(q, mode) {
  withSpinner(
    t('Searching…'),
    () => provider.search(q),
    (res) => {
      store.addHistory({ q });
      trimToRoot();
      if (res.length) go(() => suggest(res, mode, q), () => t('Did you mean…'));
      else go(() => noResult(q), '');
    },
    () => {
      trimToRoot();
      go(() => searchError(() => search(q, mode)), '');
    },
  );
}

function voiceSearch() {
  const sheet = openSheet(`<div class="center stack"><div class="big">${icon('mic', 'ic big-ic')}</div><h2>${esc(t('Listening…'))}</h2><p class="muted">${esc(t('Say the medicine name, brand or dosage.'))}</p><button class="btn sec" id="x">${esc(t('Cancel'))}</button><button class="btn link" id="demo">${esc(t("Can't hear? Type instead"))}</button></div>`);
  let handle = null;
  const close = () => { handle?.stop(); sheet.close(); };
  $('#x', sheet.el).onclick = close;
  $('#demo', sheet.el).onclick = () => { close(); $('#q')?.focus(); };
  handle = listen({
    lang: locale(),
    onResult: (text) => { close(); search(text, 'voice'); },
    onError: () => { close(); toast(t('Could not hear you. Retry or use another way.')); },
  });
  if (!handle) {
    // Stand-in when speech recognition is unavailable (AD-6): simulate a spoken query.
    setTimeout(() => { sheet.close(); toast(t('Voice not supported here: simulated "paracetamol"')); search('paracetamol', 'voice'); }, 1600);
  }
}

function scanSheet() {
  const samples = provider.sampleCodes?.() ?? [];
  const sheet = openSheet(`<div class="center stack"><div class="big">${icon('camera', 'ic big-ic')}</div><h2>${esc(t('Point at the QR / barcode'))}</h2>
 ${samples.length ? `<p class="muted">${esc(t('Prototype: pick a sample code to simulate a scan.'))}</p>
 ${samples.map((m) => `<button class="item" data-code="${esc(m.code)}"><span class="grow">${esc(m.code)}<small>${esc(t('sample barcode'))}</small></span></button>`).join('')}
 <button class="item" data-code="0000000000000"><span class="grow">0000000000000<small>${esc(t('unknown code'))}</small></span></button>` : ''}
 <form id="codeform" class="stack"><label for="codeinput" class="muted">${esc(t('Or enter the PZN or barcode number:'))}</label>
 <input id="codeinput" type="text" inputmode="numeric" autocomplete="off" placeholder="${esc(t('e.g. 01234567'))}"><button class="btn">${esc(t('Look up'))}</button></form>
 <button class="btn sec" id="x">${esc(t('Cancel'))}</button></div>`);
  $('#x', sheet.el).onclick = sheet.close;

  const lookup = (code) => {
    sheet.close();
    withSpinner(
      t('Reading code…'),
      () => provider.recogniseCode(code),
      (m) => (m ? go(() => suggest([m], 'scan'), () => t('Confirm medicine')) : (toast(t('Code not recognised.')), go(() => noResult(code), ''))),
      () => go(() => searchError(() => lookup(code)), ''),
    );
  };
  sheet.el.querySelectorAll('[data-code]').forEach((b) => { b.onclick = () => lookup(b.dataset.code); });
  $('#codeform', sheet.el).onsubmit = (e) => {
    e.preventDefault();
    const code = $('#codeinput', sheet.el).value.trim();
    if (code) lookup(code);
  };
}
