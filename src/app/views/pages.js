// Views: Instructions, FAQs, Legal notice.
import { STEP_ICONS, LEGAL } from '../../data/content.js';
import { $, esc, paras, pageColumn } from '../ui.js';
import { setTab } from '../router.js';
import { t, content, getLang } from '../i18n.js';

/** Legal and privacy texts are client-supplied in English only; in German mode say so instead of guessing a legal translation. */
export const englishOnlyNotice = () =>
  getLang() === 'de'
    ? `<div class="note" role="note"><div><b>${esc(t('Note'))}</b><p>${esc(t('This text is only available in English in this prototype.'))}</p></div></div>`
    : '';

export function instructions() {
  pageColumn();
  const { STEPS } = content();
  $('#main').innerHTML = `<div class="narrow" style="max-width:760px"><p class="lead">${esc(t('How to use this platform to find and read the latest approved patient leaflet (Gebrauchsinformation) of a medicine.'))}</p>
 <div class="steps">${STEPS.map(([h, txt], i) => `<div class="step"><div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${STEP_ICONS[i] || ''}</svg></div><div class="stx"><small>${esc(t('Step'))} ${i + 1}</small><b>${esc(h)}</b><p>${esc(txt)}</p></div></div>`).join('')}</div>
 <div class="card"><b>${esc(t('Questions about the medicine itself?'))}</b><p style="margin:4px 0 0">${esc(t('Please contact your doctor or pharmacist. Leaflets do not replace a visit to the doctor or advice from a pharmacist.'))}</p></div>
 <button class="btn" id="go" style="margin-top:12px">${esc(t('Start searching'))}</button></div>`;
  $('#go').onclick = () => setTab('home');
}

export function faq() {
  pageColumn();
  const { FAQ } = content();
  $('#main').innerHTML = `<div class="narrow" style="max-width:760px">
 <div class="card" style="background:var(--pharmabg)"><b>${esc(t('If you have any questions about the medicine itself, please contact your doctor or pharmacist.'))}</b></div>
 <div class="acc">${FAQ.map(([a, b]) => `<details><summary>${esc(a)}</summary><p>${esc(b)}</p></details>`).join('')}</div>
 <p class="muted">${esc(t('Cannot find your answer?'))} <button class="btn link" id="toc" style="padding:0">${esc(t('Contact us'))}</button></p></div>`;
  $('#toc').onclick = () => setTab('contact');
}

export function legal() {
  pageColumn();
  $('#main').innerHTML = `<div class="narrow doc" style="max-width:820px">${englishOnlyNotice()}${LEGAL.map(([h, p], i) => `<h2${i ? '' : ' class="first"'}>${esc(h)}</h2>${paras(p)}`).join('')}
 <address class="card" style="margin-top:20px">Red List ® Service GmbH<br>Mainzer Landstr. 55<br>60329 Frankfurt/Main<br><span class="muted">${esc(t('As of June 2024'))}</span></address></div>`;
}
