// View: Contacts (cards, information services, location band). Layout follows DESIGN.md.
import { $, esc, mail, toast, pageColumn } from '../ui.js';
import { t } from '../i18n.js';

export function contact() {
  pageColumn();
  $('#main').innerHTML = `<div class="cgrid">
  <div class="cc"><h2>${esc(t('Office'))}</h2><div class="cb">
   <dl class="dl"><dt>E</dt><dd>${mail('contact@pharmaprotect.de')}</dd><dt>T</dt><dd>+49 (0)30 4000 484 00</dd><dt>F</dt><dd>+49 (0)30 4000 484 29</dd></dl></div></div>
  <div class="cc"><h2>${esc(t('Data protection'))}</h2><div class="cb">
   <dl class="dl"><dt>E</dt><dd>${mail('datenschutz@peritux.com')}</dd></dl></div></div>
  <div class="cc fb"><h2>${esc(t('Got feedback?'))}</h2><div class="cb">
   <dl class="dl"><dt>E</dt><dd>${mail('feedback@pharmaprotect.de')}</dd></dl>
   <p>${esc(t('Your feedback is very important to us. Feel free to send us an email.'))}</p></div></div>
 </div>
 <div class="info" id="info"><div><h2>${esc(t('Information services'))}</h2><p>${esc(t('Stay informed and sign up now for our information services.'))}</p></div>
  <button class="sub" id="sub">${esc(t('Subscribe'))}</button></div>`;
  $('#sub').onclick = () => toast(t('Subscribing is not available in this prototype.'));
  $('#slot').innerHTML = `<div class="loc" id="loc"><div class="map">
  <svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="600" height="300" fill="var(--panel)"/>
   <path d="M-10 40C120 20 200 90 330 70S520 10 620 40" fill="none" stroke="var(--b2)" stroke-width="16" opacity=".7"/>
   <g fill="none" stroke="var(--card)" stroke-width="7" stroke-linecap="round"><path d="M0 150L600 120"/><path d="M0 230L600 210"/><path d="M180 0L230 300"/><path d="M340 0L380 300"/><path d="M470 0L450 300"/><path d="M0 90L600 70" stroke-width="4"/></g>
   <g fill="none" stroke="var(--card)" stroke-width="3"><path d="M260 0L290 300"/><path d="M400 0L420 300"/><path d="M0 185L600 165"/><path d="M0 270L600 255"/></g>
   <path d="M345 178c-14-18-22-27-22-38a22 22 0 0144 0c0 11-8 20-22 38z" fill="var(--acc)"/><circle cx="345" cy="140" r="8" fill="#fff"/></svg>
  <div class="acard"><b>PharmaProtect Solutions GmbH</b>Taubenstraße 20<br>10117 Berlin<br><a class="dir" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=Taubenstra%C3%9Fe%2020%2C%2010117%20Berlin">${esc(t('Directions'))}</a></div>
 </div><div class="photo"><img src="assets/team.jpg" alt="${esc(t('The PharmaProtect team standing outside'))}"></div></div>`;
}
