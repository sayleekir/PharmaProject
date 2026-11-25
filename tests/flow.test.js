// jsdom flow tests: drive the real UI through the main user journeys (UJ-1, UJ-3, UJ-4).
import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const html = readFileSync(resolve(import.meta.dirname, '../index.html'), 'utf8');
const bodyHtml = html.slice(html.indexOf('<body>') + 6, html.indexOf('<script'));

const tick = (ms = 10) => new Promise((r) => setTimeout(r, ms));
const $ = (s) => document.querySelector(s);
const text = () => document.body.textContent;
async function click(sel) { $(sel).click(); await tick(); }

beforeAll(async () => {
  window.scrollTo = () => {};
  Element.prototype.scrollIntoView = () => {};
  document.body.innerHTML = bodyHtml;
  const { timing } = await import('../src/app/ui.js');
  timing.delay = 0;
  const { acTiming } = await import('../src/app/views/autocomplete.js');
  acTiming.debounce = 0;
  const { mountApp } = await import('../src/app/app.js');
  mountApp();
});

beforeEach(async () => {
  localStorage.clear();
  document.querySelectorAll('.sheet,.toast').forEach((e) => e.remove());
  await click('#logo');
});

async function search(q) {
  $('#q').value = q;
  $('#f').dispatchEvent(new Event('submit', { cancelable: true }));
  await tick();
}

describe('shell (FR-13)', () => {
  it('shows the home hero and the header links', () => {
    expect($('#hk').textContent).toBe('Reliably');
    expect([...document.querySelectorAll('.bar .in > nav > button, .bar .in .dd > button')].map((b) => b.textContent.trim())).toEqual(['Home', 'My medicines', 'More']);
  });
  it('opens and closes the More menu with aria-expanded', async () => {
    expect($('#moremenu').hidden).toBe(true);
    await click('#morebtn');
    expect($('#moremenu').hidden).toBe(false);
    expect($('#morebtn').getAttribute('aria-expanded')).toBe('true');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect($('#moremenu').hidden).toBe(true);
  });
  it('every More item opens its page with a hero', async () => {
    for (const [tab, hero] of [['instructions', 'Simply'], ['faq', 'Clearly'], ['contact', 'Personally'], ['legal', 'Transparently'], ['privacy', 'Securely']]) {
      await click('#morebtn');
      await click(`#moremenu [data-tab=${tab}]`);
      expect($('#hk').textContent).toBe(hero);
    }
  });
});

describe('UJ-1: typo to leaflet (FR-1, FR-5, FR-6)', () => {
  it('suggests Ibuprofen for "ibuprofn" and opens the leaflet after confirmation', async () => {
    await search('ibuprofn');
    expect($('#title').textContent).toBe('Did you mean…');
    const items = [...document.querySelectorAll('#l .item')];
    expect(items).toHaveLength(1);
    expect(items[0].textContent).toContain('Ibuprofen 400 mg Filmtabletten');
    items[0].click();
    await tick();
    expect($('#title').textContent).toBe('Ibuprofen 400 mg Filmtabletten');
    expect(text()).toContain('Latest v3.0');
    expect(text()).toContain('Published 2026-07-02');
    expect(text()).toContain('Before you read');
    expect(text()).toContain('Note from the pharma company');
    expect([...document.querySelectorAll('.sec h3')].map((h) => h.textContent).slice(0, 3)).toEqual(['1. Was ist Ibuprofen 400 mg und wofür wird es angewendet?', '2. Was sollten Sie vor der Einnahme von Ibuprofen 400 mg beachten?', '3. Wie ist Ibuprofen 400 mg einzunehmen?']);
  });
  it('shows each section as an accordion row, all open at first so nothing is missed; rows close and open, Collapse all / Expand all', async () => {
    await search('aspirin');
    $('#l .item').click();
    await tick();
    const rows = () => [...document.querySelectorAll('#body details.sec')];
    expect(rows()).toHaveLength(6);
    expect(rows().every((d) => d.open)).toBe(true);
    expect($('#expand').textContent).toBe('Collapse all');
    expect(document.querySelector('#pills')).toBeNull();
    rows()[2].querySelector('summary').click();
    expect(rows().filter((d) => d.open)).toHaveLength(5);
    expect(rows()[2].open).toBe(false);
    expect(rows()[2].querySelector('h3').textContent).toBe('3. Wie ist Aspirin 500 mg einzunehmen?');
    await tick();
    expect($('#expand').textContent).toBe('Expand all');
    await click('#expand');
    expect(rows().every((d) => d.open)).toBe(true);
    expect($('#expand').textContent).toBe('Collapse all');
    await click('#expand');
    expect(rows().every((d) => !d.open)).toBe(true);
    expect($('#expand').textContent).toBe('Expand all');
  });
  it('shows German leaflets verbatim with a Deutsch tag', async () => {
    await search('aspirin');
    $('#l .item').click();
    await tick();
    expect(text()).toContain('Deutsch');
    expect(text()).toContain('Acetylsalicylsäure');
  });
  it('does nothing on an empty search', async () => {
    await search('   ');
    expect($('#title').textContent).toBe('Find your medicine leaflet');
  });
  it('records history and shows it under My medicines (FR-10)', async () => {
    await search('paracetamol');
    $('#l .item').click();
    await tick();
    await click('[data-tab=history]');
    expect(text()).toContain('Paracetamol 500 mg Tabletten');
  });
  it('shows a message when audio is unsupported (FR-7)', async () => {
    await search('paracetamol');
    $('#l .item').click();
    await tick();
    await click('#listen');
    expect($('.toast').textContent).toContain('Audio is not supported');
  });
});

describe('UJ-3: request a missing leaflet (FR-8, FR-9)', () => {
  it('shows not found, blocks an invalid email, sends a valid one, then undo', async () => {
    await search('zzzz');
    expect(text()).toContain('Leaflet not found');
    await click('#req');
    $('#em').value = 'not-an-email';
    await click('#send');
    expect($('.toast').textContent).toContain('Please check the email address.');
    expect($('#main .nf-title').textContent).toBe('Request leaflet');

    $('#em').value = 'elena@example.com';
    await click('#send');
    expect($('#main .nf-title').textContent).toBe('Request sent');
    expect(text()).toContain('elena@example.com');

    await click('[data-tab=history]');
    expect(text()).toContain('Requested');

    await click('[data-tab=home]');
    await search('zzzz');
    await click('#req');
    await click('#noem');
    await click('#undo');
    expect(JSON.parse(localStorage.getItem('pps_requests'))).toHaveLength(1);
  });
});

describe('UJ-4: delete my data (FR-11)', () => {
  it('asks for confirmation, cancel keeps data, confirm deletes', async () => {
    await search('paracetamol');
    expect(JSON.parse(localStorage.getItem('pps_history'))).toHaveLength(1);
    await click('#morebtn');
    await click('#moremenu [data-tab=privacy]');
    await click('#d1');
    expect($('.sheet')).not.toBeNull();
    await click('.sheet #n');
    expect(JSON.parse(localStorage.getItem('pps_history'))).toHaveLength(1);
    await click('#d1');
    await click('.sheet #y');
    expect(JSON.parse(localStorage.getItem('pps_history'))).toEqual([]);
  });
});

describe('Information pages (FR-12)', () => {
  it('Instructions has seven steps with icons', async () => {
    await click('#morebtn');
    await click('#moremenu [data-tab=instructions]');
    expect(document.querySelectorAll('.step')).toHaveLength(7);
    expect(document.querySelectorAll('.step svg')).toHaveLength(7);
  });
  it('FAQs carry the doctor-or-pharmacist sentence', async () => {
    await click('#morebtn');
    await click('#moremenu [data-tab=faq]');
    expect(text()).toContain('If you have any questions about the medicine itself, please contact your doctor or pharmacist.');
    expect(document.querySelectorAll('.acc details').length).toBeGreaterThanOrEqual(8);
  });
  it('Contact has three cards, an info panel and a location band', async () => {
    await click('#morebtn');
    await click('#moremenu [data-tab=contact]');
    expect([...document.querySelectorAll('.cc h2')].map((h) => h.textContent)).toEqual(['Office', 'Data protection', 'Got feedback?']);
    expect(text()).toContain('contact@pharmaprotect.de');
    expect(text()).toContain('+49 (0)30 4000 484 29');
    expect($('#info')).not.toBeNull();
    expect($('#loc')).not.toBeNull();
    expect($('#loc img').getAttribute('src')).toBe('assets/team.jpg');
  });
  it('Legal notice and Privacy policy render the supplied text', async () => {
    await click('#morebtn');
    await click('#moremenu [data-tab=legal]');
    expect(text()).toContain('Content of the online offers');
    await click('#morebtn');
    await click('#moremenu [data-tab=privacy]');
    expect(document.querySelectorAll('.acc details').length).toBe(17);
  });
});

describe('Language toggle EN | DE (header)', () => {
  const lang = async (l) => { await click(`[data-lang=${l}]`); };
  const navText = () => [...document.querySelectorAll('.bar .in > nav > button, .bar .in .dd > button')].map((b) => b.textContent.trim());

  it('is in the header with English active by default', () => {
    expect(document.querySelectorAll('.bar .lang button')).toHaveLength(2);
    expect($('[data-lang=en]').getAttribute('aria-pressed')).toBe('true');
    expect($('[data-lang=de]').getAttribute('aria-pressed')).toBe('false');
  });

  it('switches header, hero, page and footer to German, and back', async () => {
    await lang('de');
    expect(document.documentElement.lang).toBe('de');
    expect(navText()).toEqual(['Startseite', 'Meine Arzneimittel', 'Mehr']);
    expect($('#hk').textContent).toBe('Zuverlässig');
    expect($('#title').textContent).toBe('Gebrauchsinformation finden');
    expect(text()).toContain('Aus rechtlichen Gründen sind Gebrauchsinformationen nur auf Deutsch verfügbar.');
    expect(text()).toContain('Ein Produkt der');
    expect($('[data-lang=de]').getAttribute('aria-pressed')).toBe('true');
    expect(JSON.parse(localStorage.getItem('pps_lang'))).toBe('de');
    await lang('en');
    expect(navText()).toEqual(['Home', 'My medicines', 'More']);
    expect($('#hk').textContent).toBe('Reliably');
    expect(document.documentElement.lang).toBe('en');
  });

  it('keeps the typed search text when switching language', async () => {
    $('#q').value = 'ibuprofn';
    await lang('de');
    expect($('#q').value).toBe('ibuprofn');
    expect($('#q').placeholder).toContain('Arzneimittelname');
    await lang('en');
  });

  it('translates the search flow and keeps leaflet text verbatim', async () => {
    await lang('de');
    await search('ibuprofn');
    expect($('#title').textContent).toBe('Meinten Sie …');
    $('#l .item').click();
    await tick();
    expect(text()).toContain('Bevor Sie lesen');
    expect(text()).toContain('Anhören');
    expect([...document.querySelectorAll('#body .sec h3')][0].textContent).toBe('1. Was ist Ibuprofen 400 mg und wofür wird es angewendet?');
    await lang('en');
    expect($('#title').textContent).toBe('Ibuprofen 400 mg Filmtabletten');
    expect(text()).toContain('Before you read');
  });

  it('translates not found, request and delete dialogs', async () => {
    await lang('de');
    await search('zzzz');
    expect(text()).toContain('Gebrauchsinformation nicht gefunden');
    await click('#req');
    expect($('#main .nf-title').textContent).toBe('Gebrauchsinformation anfragen');
    $('#em').value = 'x';
    await click('#send');
    expect($('.toast').textContent).toContain('Bitte prüfen Sie die E-Mail-Adresse.');
    await click('#morebtn');
    await click('#moremenu [data-tab=privacy]');
    await click('#d1');
    expect($('.sheet').textContent).toContain('Verlauf löschen?');
    expect($('.sheet #y').textContent).toBe('Löschen');
    await click('.sheet #n');
    await lang('en');
  });

  it('translates Instructions and FAQs, and flags English-only legal texts', async () => {
    await lang('de');
    await click('#morebtn');
    await click('#moremenu [data-tab=instructions]');
    expect($('.step b').textContent).toBe('Arzneimittel suchen');
    expect(document.querySelectorAll('.step')).toHaveLength(7);
    await click('#morebtn');
    await click('#moremenu [data-tab=faq]');
    expect(text()).toContain('Wenn Sie Fragen zum Arzneimittel selbst haben');
    await click('#morebtn');
    await click('#moremenu [data-tab=legal]');
    expect(text()).toContain('Dieser Text ist in diesem Prototyp nur auf Englisch verfügbar.');
    expect(text()).toContain('Content of the online offers');
    await click('#morebtn');
    await click('#moremenu [data-tab=contact]');
    expect([...document.querySelectorAll('.cc h2')].map((h) => h.textContent)).toEqual(['Zentrale', 'Datenschutz', 'Feedback?']);
    await lang('en');
  });
});

describe('Mobile hamburger menu', () => {
  it('has the language toggle left of the hamburger and the full menu inside it', () => {
    const inner = [...document.querySelector('.bar .in').children].map((e) => e.className || e.tagName.toLowerCase());
    expect(inner.indexOf('lang')).toBeLessThan(inner.indexOf('burger'));
    expect($('#mobilemenu').hidden).toBe(true);
    expect([...document.querySelectorAll('#mobilemenu button')].map((b) => b.dataset.tab)).toEqual(['home', 'history', 'instructions', 'faq', 'contact', 'legal', 'privacy']);
  });
  it('opens, closes on Esc and on outside click, and exposes aria-expanded', async () => {
    await click('#burger');
    expect($('#mobilemenu').hidden).toBe(false);
    expect($('#burger').getAttribute('aria-expanded')).toBe('true');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect($('#mobilemenu').hidden).toBe(true);
    expect($('#burger').getAttribute('aria-expanded')).toBe('false');
    await click('#burger');
    document.body.click();
    expect($('#mobilemenu').hidden).toBe(true);
  });
  it('navigates from the menu, closes it and marks the active page', async () => {
    await click('#burger');
    await click('#mobilemenu [data-tab=faq]');
    expect($('#hk').textContent).toBe('Clearly');
    expect($('#mobilemenu').hidden).toBe(true);
    await click('#burger');
    expect($('#mobilemenu [data-tab=faq]').classList.contains('on')).toBe(true);
    expect($('#mobilemenu [data-tab=home]').classList.contains('on')).toBe(false);
  });
  it('is translated when the language changes', async () => {
    await click('[data-lang=de]');
    expect([...document.querySelectorAll('#mobilemenu button')].map((b) => b.textContent.trim())).toEqual(['Startseite', 'Meine Arzneimittel', 'Anleitung', 'FAQ', 'Kontakt', 'Impressum und Rechtliches', 'Datenschutz']);
    expect($('#burger').getAttribute('aria-label')).toBe('Menü');
    await click('[data-lang=en]');
  });
});

describe('Live suggestions while typing', () => {
  const type = async (v) => { const q = $('#q'); q.value = v; q.dispatchEvent(new Event('input', { bubbles: true })); await tick(20); };
  const opts = () => [...document.querySelectorAll('#ac-list [role=option]')];

  it('shows matching medicines as you type, with the typed part highlighted', async () => {
    await type('ibu');
    expect(opts()).toHaveLength(1);
    expect(opts()[0].textContent).toContain('Ibuprofen 400 mg Filmtabletten');
    expect(opts()[0].querySelector('mark').textContent.toLowerCase()).toBe('ibu');
    expect($('#ac-list').hidden).toBe(false);
    expect($('#q').getAttribute('aria-expanded')).toBe('true');
    expect($('#q').getAttribute('role')).toBe('combobox');
  });
  it('narrows with more letters, tolerates a typo, and hides when nothing matches', async () => {
    await type('p');
    expect(opts().length).toBeGreaterThan(1);
    await type('ibuprofn');
    expect(opts().map((o) => o.textContent)).toEqual([expect.stringContaining('Ibuprofen')]);
    await type('zzzz');
    expect($('#ac-list').hidden).toBe(true);
    expect($('#q').getAttribute('aria-expanded')).toBe('false');
  });
  it('opens the leaflet when a suggestion is chosen by tap or click', async () => {
    await type('asp');
    opts()[0].dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    await tick();
    expect($('#title').textContent).toBe('Aspirin 500 mg Tabletten');
    expect(JSON.parse(localStorage.getItem('pps_history'))[0].id).toBe('asp');
  });
  it('works with the keyboard: arrows move, Enter opens, Esc closes', async () => {
    await type('p');
    const q = $('#q');
    q.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(opts()[0].getAttribute('aria-selected')).toBe('true');
    expect(q.getAttribute('aria-activedescendant')).toBe('ac-opt-0');
    q.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(opts()[1].getAttribute('aria-selected')).toBe('true');
    q.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect($('#ac-list').hidden).toBe(true);
    await type('ibu');
    q.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    q.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await tick();
    expect($('#title').textContent).toBe('Ibuprofen 400 mg Filmtabletten');
  });
  it('Enter without a highlighted suggestion still runs the normal search', async () => {
    await type('ibuprofn');
    $('#f').dispatchEvent(new Event('submit', { cancelable: true }));
    await tick();
    expect($('#title').textContent).toBe('Did you mean…');
  });
  it('labels the list in German', async () => {
    await click('[data-lang=de]');
    await type('ibu');
    expect($('#ac-list').getAttribute('aria-label')).toBe('Vorschläge');
    await click('[data-lang=en]');
  });
});

describe('Live data: provider, errors, PZN, source and freshness', () => {
  let original;
  beforeAll(async () => {
    const { setProvider, provider } = await import('../src/app/provider.js');
    const { createSampleProvider } = await import('../src/data/providers/sample.js');
    original = createSampleProvider();
    globalThis.__setProvider = setProvider;
    globalThis.__sample = (o) => createSampleProvider(o);
    globalThis.__provider = provider;
  });
  afterEach(() => globalThis.__setProvider(original));

  it('finds a medicine by PZN typed in the search box', async () => {
    await search('00000108');
    expect(document.querySelectorAll('#l .item')).toHaveLength(1);
    expect($('#l .item').textContent).toContain('Novaminsulfon');
  });

  it('shows a clear error with Try again when the service is down, then recovers', async () => {
    let up = false;
    const base = globalThis.__sample();
    globalThis.__setProvider({ ...base, search: async (q, o) => { if (!up) throw new Error('down'); return base.search(q, o); } });
    await search('aspirin');
    expect(text()).toContain('Search is temporarily unavailable');
    expect(document.querySelectorAll('#l .item')).toHaveLength(0);
    up = true;
    await click('#retry');
    await tick();
    expect(document.querySelectorAll('#l .item')).toHaveLength(1);
  });

  it('shows an error (not a leaflet) when the leaflet cannot be loaded', async () => {
    const base = globalThis.__sample();
    globalThis.__setProvider({ ...base, getLeaflet: async () => { throw new Error('down'); } });
    await search('aspirin');
    $('#l .item').click();
    await tick();
    expect(text()).toContain('Search is temporarily unavailable');
    expect(document.querySelector('#body')).toBeNull();
  });

  it('shows not found when the service has no leaflet for the medicine', async () => {
    const base = globalThis.__sample();
    globalThis.__setProvider({ ...base, getLeaflet: async () => null });
    await search('aspirin');
    $('#l .item').click();
    await tick();
    expect(text()).toContain('Leaflet not found');
  });

  it('shows source and check date, and warns when the data may be out of date', async () => {
    await search('aspirin');
    $('#l .item').click();
    await tick();
    expect(text()).toContain('Source: Sample data (prototype)');
    expect(text()).toContain('Checked');
    expect(document.querySelector('.stale')).toBeNull();

    globalThis.__setProvider(globalThis.__sample({ now: () => '2026-01-01T00:00:00Z' }));
    await click('#logo');
    await search('aspirin');
    $('#l .item').click();
    await tick();
    expect(document.querySelector('.stale').textContent).toContain('may be out of date');
  });

  it('always loads the latest version: a history entry opens the current leaflet', async () => {
    localStorage.setItem('pps_history', JSON.stringify([{ q: 'Aspirin 500 mg Tabletten', id: 'asp', ver: 'v1.0', t: Date.now() }]));
    await click('[data-tab=history]');
    expect(text()).toContain('v1.0');
    $('#l .item').click();
    await tick();
    expect(text()).toContain('Latest v7.1');
  });

  it('scan dialog also accepts a typed PZN or barcode number', async () => {
    await click('#scan');
    $('#codeinput').value = '00000104';
    $('#codeform').dispatchEvent(new Event('submit', { cancelable: true }));
    await tick();
    expect($('#l .item').textContent).toContain('Cetirizin');
  });

  it('a failing suggestion service just shows no suggestions', async () => {
    const base = globalThis.__sample();
    globalThis.__setProvider({ ...base, suggest: async () => { throw new Error('down'); } });
    const q = $('#q');
    q.value = 'ibu';
    q.dispatchEvent(new Event('input', { bubbles: true }));
    await tick(20);
    expect($('#ac-list').hidden).toBe(true);
  });

  it('shows the Germany-only note', () => {
    expect(text()).toContain('medicines sold in Germany');
  });
});

describe('Leaflets are displayed exactly as they are (no summary, no translation)', () => {
  it('shows every section word for word, in English and German interface mode', async () => {
    const { LEAFLETS } = await import('../src/data/leaflets.js');
    for (const lang of ['en', 'de']) {
      await click(`[data-lang=${lang}]`);
      for (const m of LEAFLETS) {
        await click('#logo');
        await search(m.name);
        [...document.querySelectorAll('#l .item')].find((i) => i.textContent.includes(m.name)).click();
        await tick();
        const shown = Object.fromEntries([...document.querySelectorAll('#body .sec')].map((d) => [d.querySelector('h3').textContent, d.querySelector('p').textContent]));
        expect(shown, `${m.id} (${lang})`).toEqual(m.sections);
        if (m.note) expect(text()).toContain(m.note);
      }
    }
    await click('[data-lang=en]');
  });
  it('shows no shortened text: no ellipsis, truncation or uppercase transform on leaflet sections', () => {
    const css = readFileSync(resolve(import.meta.dirname, '../src/styles.css'), 'utf8');
    const rule = (sel) => (css.match(new RegExp(sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\{[^}]*\\}', 'g')) || []).join('');
    expect(rule('.sec p')).not.toMatch(/text-overflow|line-clamp|text-transform/);
    expect(rule('.sec h3')).not.toMatch(/text-overflow|text-transform/);
  });
});

describe('Section order', () => {
  it('shows sections in the leaflet\'s own order', async () => {
    const { setProvider } = await import('../src/app/provider.js');
    const { createSampleProvider } = await import('../src/data/providers/sample.js');
    const { LEAFLETS } = await import('../src/data/leaflets.js');
    const odd = { ...LEAFLETS[0], sections: { Aufbewahrung: 'a', Warnhinweise: 'b', 'Was ist das': 'c', Nebenwirkungen: 'd', Anwendung: 'e' } };
    setProvider(createSampleProvider({ leaflets: [odd] }));
    await click('#logo');
    await search('paracetamol');
    $('#l .item').click();
    await tick();
    expect([...document.querySelectorAll('#body .sec h3')].map((h) => h.textContent)).toEqual(['Aufbewahrung', 'Warnhinweise', 'Was ist das', 'Nebenwirkungen', 'Anwendung']);
    expect(document.querySelector('#body .imp')).toBeNull();
    expect($('#expand')).not.toBeNull();
    setProvider(createSampleProvider());
  });
});

describe('Not found screen layout', () => {
  it('has no page title, a centred block and a prominent "Leaflet not found" heading', async () => {
    await search('zzzz');
    expect($('#title').textContent).toBe('');
    expect($('#main .narrow').classList.contains('nf')).toBe(true);
    expect($('#main .nf-title').textContent).toBe('Leaflet not found');
    expect($('#req')).not.toBeNull();
  });
  it('is also title-free for a medicine the service has no leaflet for, and in German', async () => {
    await click('[data-lang=de]');
    await search('zzzz');
    expect($('#title').textContent).toBe('');
    expect($('#main .nf-title').textContent).toBe('Gebrauchsinformation nicht gefunden');
    await click('[data-lang=en]');
    expect($('#main .nf-title').textContent).toBe('Leaflet not found');
    expect($('#title').textContent).toBe('');
  });
});

describe('Request screens: one heading, no duplicate title, centred', () => {
  it('shows the form heading once and the request-sent heading once', async () => {
    await search('zzzz');
    await click('#req');
    expect($('#title').textContent).toBe('');
    expect(document.body.textContent.match(/Request leaflet/g)).toHaveLength(1);
    expect($('#main .narrow').classList.contains('nf')).toBe(true);
    await click('#noem');
    expect($('#title').textContent).toBe('');
    expect(document.querySelectorAll('#main h2')).toHaveLength(1);
    expect($('#main .nf-title').textContent).toBe('Request sent');
    await click('#undo');
  });
});

describe('Form controls have explicit colours (immune to dark browser or viewer defaults)', () => {
  const css = readFileSync(resolve(import.meta.dirname, '../src/styles.css'), 'utf8');
  it('sets text and background colour on inputs and a text colour on buttons', () => {
    expect(css).toMatch(/input\[type=text\],input\[type=email\]\{[^}]*background-color:var\(--card\)[^}]*color:var\(--ink\)/);
    expect(css).toMatch(/\nbutton\{[^}]*color:inherit/);
    expect(css).toMatch(/input::placeholder\{[^}]*color:var\(--mute\)/);
  });
  it('draws its own tick box (no native, dark-able checkbox)', () => {
    expect(css).toMatch(/input\[type=checkbox\]\{[^}]*appearance:none[^}]*background-color:var\(--card\)/);
    expect(css).toMatch(/input\[type=checkbox\]:checked\{background-color:var\(--brand\)\}/);
  });
  it('asks browsers not to darken the page', () => {
    expect(css).toMatch(/color-scheme:only light/);
  });
});

describe('One standard page width (the 640 px column used by Home)', () => {
  it('applies the column to the title and content of Home and every other tab', async () => {
    for (const tab of ['home', 'history']) {
      await click(`.bar nav [data-tab=${tab}]`);
      expect($('#main').classList.contains('w640'), tab).toBe(true);
      expect($('#title').classList.contains('t640'), tab).toBe(true);
    }
    for (const tab of ['instructions', 'faq', 'contact', 'legal', 'privacy']) {
      await click('#morebtn');
      await click(`#moremenu [data-tab=${tab}]`);
      expect($('#main').classList.contains('w640'), tab).toBe(true);
      expect($('#title').classList.contains('t640'), tab).toBe(true);
    }
  });
  it('also applies to the suggestions list, but not to the wide two-column leaflet page', async () => {
    await click('#logo');
    await search('aspirin');
    expect($('#main').classList.contains('w640')).toBe(true);
    $('#l .item').click();
    await tick();
    expect($('#main').classList.contains('w640')).toBe(false);
    expect($('#title').classList.contains('t640')).toBe(false);
  });
});

describe('Dummy data set (30 medicines)', () => {
  it('finds Diclac Dolo with the exact search from the live-site comparison', async () => {
    await search('Diclac Dolo 25mg, Coated Tablets');
    expect($('#title').textContent).toBe('Did you mean…');
    const items = [...document.querySelectorAll('#l .item')];
    expect(items).toHaveLength(1);
    expect(items[0].textContent).toContain('Diclac Dolo 25 mg überzogene Tabletten');
    items[0].click();
    await tick();
    expect($('#title').textContent).toBe('Diclac Dolo 25 mg überzogene Tabletten');
    expect([...document.querySelectorAll('#body .sec h3')].map((h) => h.textContent)).toEqual([
      '1. Was ist Diclac Dolo 25 mg und wofür wird es angewendet?',
      '2. Was sollten Sie vor der Einnahme von Diclac Dolo 25 mg beachten?',
      '3. Wie ist Diclac Dolo 25 mg einzunehmen?',
      '4. Welche Nebenwirkungen sind möglich?',
      '5. Wie ist Diclac Dolo 25 mg aufzubewahren?',
      '6. Inhalt der Packung und weitere Informationen',
    ]);
  });
  it('has no Important tags and tells the reader the leaflet is dummy content', async () => {
    await search('Diclac');
    $('#l .item').click();
    await tick();
    expect(document.querySelector('#body .imp')).toBeNull();
    expect(document.querySelector('.sample-note').textContent).toContain('dummy content and not real medical information');
  });
  it('shows the dummy notice in German too', async () => {
    await click('[data-lang=de]');
    await search('Diclac');
    $('#l .item').click();
    await tick();
    expect(document.querySelector('.sample-note').textContent).toContain('Platzhalter-Inhalt');
    await click('[data-lang=en]');
  });
  it('finds other common medicines by name, brand, PZN and live suggestions', async () => {
    await search('Dekristol');
    expect($('#l .item').textContent).toContain('Dekristol 20.000 I.E.');
    await click('#logo');
    await search('Ventolin');
    expect($('#l .item').textContent).toContain('Salbutamol');
    await click('#logo');
    await search('00000130');
    expect($('#l .item').textContent).toContain('Dekristol');
  });
});

describe('Leaflet layout: info on the left, accordion on the right', () => {
  it('translates the Collapse all / Expand all button and keeps the text verbatim', async () => {
    await click('#logo');
    await click('[data-lang=de]');
    await search('Diclac');
    $('#l .item').click();
    await tick();
    expect($('#expand').textContent).toBe('Alle schließen');
    await click('#expand');
    expect($('#expand').textContent).toBe('Alle öffnen');
    expect(document.querySelector('#body details p').textContent).toContain('Diclac Dolo enthält Diclofenac-Kalium');
    await click('[data-lang=en]');
  });
  it('shows all six numbered sections as accordion rows', async () => {
    await click('#logo');
    await search('Diclac');
    $('#l .item').click();
    await tick();
    expect(document.querySelectorAll('#body details h3').length).toBe(6);
  });
});

describe('Leaflet two-column structure', () => {
  it('puts the info cards and buttons in the left column and the accordion and tick box on the right', async () => {
    await click('#logo');
    await search('Diclac');
    $('#l .item').click();
    await tick();
    const aside = document.querySelector('.lf > aside');
    const article = document.querySelector('.lf > article');
    expect(aside.querySelector('#listen')).not.toBeNull();
    expect(aside.querySelector('#expand')).not.toBeNull();
    expect(aside.querySelector('.tag')).not.toBeNull();
    expect(aside.querySelector('.sample-note')).not.toBeNull();
    expect(article.querySelectorAll('details.sec')).toHaveLength(6);
    expect(article.querySelector('#done')).not.toBeNull();
    expect(aside.querySelector('details')).toBeNull();
  });
});

describe('Publish date', () => {
  it('is its own element with the full date, so it can sit on its own line', async () => {
    await click('#logo');
    await search('Diclac');
    $('#l .item').click();
    await tick();
    expect(document.querySelector('.lf aside .pub').textContent).toBe('Published 2025-08-14');
  });
});

describe('user stories 4, 8, 10, 11', () => {
  async function openDiclac() {
    await search('Diclac Dolo');
    $('#l .item').click();
    await tick();
  }
  it('story 4: jump buttons open and flash the matching section', async () => {
    await openDiclac();
    const chips = [...document.querySelectorAll('[data-jump]')];
    expect(chips.map((c) => c.dataset.jump)).toEqual(['1', '3', '4']);
    $('#body details:nth-of-type(3)').open = false;
    chips[1].click();
    const d = $('#body details:nth-of-type(3)');
    expect(d.open).toBe(true);
    expect(d.classList.contains('flash')).toBe(true);
  });
  it('story 8: Print opens every section and the page has the print footer', async () => {
    await openDiclac();
    $('#body details:nth-of-type(2)').open = false;
    let openDuringPrint = false;
    window.print = () => { openDuringPrint = [...document.querySelectorAll('#body details')].every((d) => d.open); };
    await click('#print');
    expect(openDuringPrint).toBe(true);
    expect($('.print-foot').textContent).toContain('2025-08-14');
    expect($('.print-foot').textContent).toContain('Check the website for the latest version');
  });
  it('story 10: no hospital reminder is shown (removed on request)', async () => {
    await openDiclac();
    expect($('.hosp')).toBeNull();
  });
  it('story 9: the side-effects section shows only the approved text (no added reminder)', async () => {
    await openDiclac();
    const sec = [...document.querySelectorAll('#body details')].find((d) => d.querySelector('h3').textContent.startsWith('4.'));
    expect(sec.querySelectorAll('p')).toHaveLength(1);
    expect(sec.querySelector('p').textContent).toContain('Magenbeschwerden');
  });
});

describe('pictorial instructions (story 3)', () => {
  it('shows captioned images under "How to use" for Salbutamol and none for medicines without them', async () => {
    await search('Salbutamol');
    $('#l .item').click();
    await tick();
    const sec = [...document.querySelectorAll('#body details')].find((d) => d.querySelector('h3').textContent.startsWith('3.'));
    const imgs = [...sec.querySelectorAll('.pics img')];
    expect(imgs).toHaveLength(4);
    expect(imgs[0].src.startsWith('data:image/svg+xml')).toBe(true);
    expect(imgs[0].alt).toBe('Schütteln Sie den Behälter kräftig.');
    expect(sec.querySelector('.pics li span').textContent).toBe(imgs[0].alt);
    await click('#logo');
    await search('Cetirizin');
    $('#l .item').click();
    await tick();
    expect(document.querySelectorAll('.pics').length).toBe(0);
  });
});

describe('pictograms are valid SVG', () => {
  it('parse as XML without errors', async () => {
    const { picturesFor } = await import('../src/data/pictograms.js');
    for (const kind of ['inhaler', 'spray', 'tablet']) {
      for (const p of picturesFor(kind)) {
        const svg = decodeURIComponent(p.src.split(',')[1]);
        const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
        expect(doc.querySelector('parsererror'), `${kind}: ${p.caption}`).toBeNull();
      }
    }
  });
});
