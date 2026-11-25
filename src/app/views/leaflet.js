// View: the leaflet. Text is shown verbatim (AD-3); only the order of sections changes. Only the UI around it is translated.
import { sectionKeys, isNew, audioText, isStale } from '../../domain/leaflet.js';
import { $, esc, toast, withSpinner } from '../ui.js';
import { go } from '../router.js';
import { store } from '../state.js';
import { speak, stopSpeaking, isSpeaking } from '../capabilities.js';
import { icon } from '../icons.js';
import { t, locale } from '../i18n.js';
import { provider } from '../provider.js';
import { searchError, noResult } from './flow.js';

/** Open the latest approved leaflet of a medicine (summary or history entry with id and name). */
export function openLeaflet(m) {
  go(() => loadLeaflet(m), m.name);
}

/** Fetch the latest approved version from the provider, then render it. */
export function loadLeaflet(m) {
  withSpinner(
    t('Loading the latest leaflet…'),
    () => provider.getLeaflet(m.id),
    (l) => {
      if (!l) return noResult(m.name);
      store.addHistory({ q: l.name, id: l.id, ver: l.ver });
      leaflet(l);
    },
    () => searchError(() => loadLeaflet(m)),
  );
}

export function leaflet(m) {
  const keys = sectionKeys(m.sections);
  const fresh = isNew(m.date);
  const orig = m.lang === 'de' ? ` ${t('(German original)')}` : '';
  const checked = m.checkedAt ? new Date(m.checkedAt).toLocaleDateString(locale()) : '';
  const stale = m.checkedAt ? isStale(m.checkedAt) : false;
  const src = m.source
    ? `<p class="muted" style="margin:6px 0 0">${esc(t('Source'))}: ${m.sourceUrl ? `<a href="${esc(m.sourceUrl)}" target="_blank" rel="noopener">${esc(m.source)}</a>` : esc(m.source)}${checked ? ` · ${esc(t('Checked'))} ${esc(checked)}` : ''}</p>`
    : '';
  const staleNote = stale ? `<p class="stale">${icon('info', 'ic ic-sm')} ${esc(t('This information may be out of date. Please check the source.'))}</p>` : '';
  $('#main').innerHTML = `<div class="lf"><aside><div class="card"><span class="tag">${esc(t('Latest'))} ${esc(m.ver)}</span> ${m.lang === 'de' ? `<span class="tag" style="background:var(--dim);color:var(--ink)">${icon('globe', 'ic ic-sm')} Deutsch</span>` : ''} ${fresh ? `<span class="tag" style="background:var(--newbg);color:var(--brand)">${esc(t('NEW'))}</span>` : ''} <span class="muted pub">${esc(t('Published'))} ${esc(m.date)}</span>
 <p class="muted" style="margin:6px 0 0">${esc(t('Approved by the pharma association / MAH. Original text only — no translation or summary.'))}${esc(orig)}</p>${src}${staleNote}</div>
 <div class="card" style="background:var(--noticebg);border-color:var(--noticebd)"><b>${esc(t('Before you read'))}</b><p style="margin:4px 0 0">${t('Check the dosage on your box matches this leaflet ({name}) and that the medicine was bought in Germany.', { name: `<b>${esc(m.name)}</b>` })}</p></div>
 <div class="row lbar"><button class="btn" id="listen">${icon('volume', 'ic ic-sm')} ${esc(t('Listen'))}</button><button class="btn sec" id="expand">${esc(t('Collapse all'))}</button><button class="btn sec" id="print">${esc(t('Print'))}</button></div>
 ${m.sample ? `<div class="card sample-note">${icon('info', 'ic ic-sm')} ${esc(t('Prototype sample: this text is dummy content and not real medical information.'))}</div>` : ''}
 ${m.note ? `<div class="card" style="background:var(--pharmabg)"><b>${icon('megaphone', 'ic ic-sm')} ${esc(t('Note from the pharma company'))}</b><p style="margin:4px 0 0">${esc(m.note)}</p></div>` : ''}
 <div class="card jump"><b>${esc(t('Jump to a section'))}</b><div class="chips">${[[1, t('What it is for')], [3, t('How to use')], [4, t('Side effects')]].map(([n, label]) => (keys.find((k) => k.startsWith(`${n}.`)) ? `<button class="chip" data-jump="${n}">${esc(label)}</button>` : '')).join('')}</div></div>
 </aside><article><div id="body" class="lacc-list">${keys.map((k) => `<details class="sec lacc" open id="s-${esc(k).replace(/\W/g, '')}"><summary><h3>${esc(k)}</h3><span class="pm" aria-hidden="true"></span></summary><p>${esc(m.sections[k])}</p>${k.startsWith('3.') && m.pictures?.length ? `<ol class="pics">${m.pictures.map((p) => `<li><img src="${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy"><span>${esc(p.caption)}</span></li>`).join('')}</ol>` : ''}</details>`).join('')}</div>
 <p class="print-only print-foot">${esc(m.name)} · ${esc(m.ver)} · ${esc(t('Published'))} ${esc(m.date)}. ${esc(t('Printed from GI 4.0. Check the website for the latest version.'))}</p>
 <label class="card row" style="margin-top:14px"><input type="checkbox" id="done"> <span>${esc(t('I have read the complete leaflet'))}</span></label></article></div>`;

  const all = () => [...document.querySelectorAll('#body details')];
  const syncExpand = () => { if (!$('#expand')) return; $('#expand').textContent = all().every((d) => d.open) ? t('Collapse all') : t('Expand all'); };
  // All sections start open so nothing is missed; the reader closes what they have finished.
  $('#expand').onclick = () => { const open = !all().every((d) => d.open); all().forEach((d) => { d.open = open; }); syncExpand(); };
  $('#body').addEventListener('toggle', syncExpand, true);

  document.querySelectorAll('[data-jump]').forEach((b) => {
    b.onclick = () => {
      const d = all().find((x) => x.querySelector('h3').textContent.startsWith(`${b.dataset.jump}.`));
      if (!d) return;
      d.open = true;
      d.scrollIntoView({ behavior: 'smooth', block: 'start' });
      d.classList.add('flash');
      setTimeout(() => d.classList.remove('flash'), 1800);
    };
  });
  $('#print').onclick = () => {
    const was = all().map((d) => d.open);
    all().forEach((d) => { d.open = true; });
    window.print();
    if (window.self !== window.top) toast(t('If the print window does not open, open this page in its own browser tab and try again.'));
    all().forEach((d, i) => { d.open = was[i]; });
    syncExpand();
  };

  const idle = () => { const b = $('#listen'); if (b) b.innerHTML = `${icon('volume', 'ic ic-sm')} ${esc(t('Listen'))}`; };
  $('#listen').onclick = () => {
    if (isSpeaking()) { stopSpeaking(); idle(); return; }
    const ok = speak(audioText(m, keys), { lang: 'de-DE', onEnd: idle });
    if (!ok) { toast(t('Audio is not supported on this device.')); return; }
    $('#listen').innerHTML = `${icon('stop', 'ic ic-sm')} ${esc(t('Stop'))}`;
  };
  $('#done').onchange = (e) => { if (e.target.checked) toast(t('Thanks — saved in My medicines.')); };
}
