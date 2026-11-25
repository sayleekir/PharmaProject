// App: assembles routes, header/footer wiring and starts on Home.
import { initRouter, setTab, back, closeMenu, rerender } from './router.js';
import { $ } from './ui.js';
import { t, setLang, applyStatic, onLangChange } from './i18n.js';
import { home } from './views/home.js';
import { historyView } from './views/history.js';
import { instructions, faq, legal } from './views/pages.js';
import { contact } from './views/contact.js';
import { privacy } from './views/privacy.js';

const TABS = {
  home: { render: home, title: () => t('Find your medicine leaflet') },
  history: { render: historyView, title: () => t('My medicines') },
  privacy: { render: privacy, title: () => t('Privacy') },
  instructions: { render: instructions, title: () => t('Instructions') },
  faq: { render: faq, title: () => t('FAQs') },
  contact: { render: contact, title: () => t('Contacts') },
  legal: { render: legal, title: () => t('Legal notice') },
};
const MORE_TABS = ['instructions', 'faq', 'contact', 'legal', 'privacy'];

export function mountApp() {
  initRouter({ tabs: TABS, moreTabs: MORE_TABS });
  applyStatic();
  onLangChange(rerender);
  document.querySelectorAll('[data-lang]').forEach((b) => { b.onclick = () => setLang(b.dataset.lang); });

  $('#back').onclick = back;
  $('#logo').onclick = () => setTab('home');

  // header and footer links; data-scroll scrolls to a section of the target page
  document.querySelectorAll('.bar [data-tab], footer [data-tab]').forEach((b) => {
    b.onclick = () => {
      setTab(b.dataset.tab);
      const target = b.dataset.scroll && document.getElementById(b.dataset.scroll);
      if (target?.scrollIntoView) target.scrollIntoView({ behavior: 'smooth' });
    };
  });

  // More menu: toggle, close on outside click or Esc
  $('#morebtn').onclick = (e) => {
    e.stopPropagation();
    const m = $('#moremenu');
    m.hidden = !m.hidden;
    $('#morebtn').setAttribute('aria-expanded', String(!m.hidden));
  };
  // Hamburger (phones): opens the full menu
  $('#burger').onclick = (e) => {
    e.stopPropagation();
    const m = $('#mobilemenu');
    const open = m.hidden;
    closeMenu();
    m.hidden = !open;
    $('#burger').setAttribute('aria-expanded', String(open));
  };
  $('#mobilemenu').addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  setTab('home');
}
