// App: inline SVG line icons (24x24, stroke = currentColor) used instead of emoji.
const PATHS = {
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3M9 21h6"/>',
  camera: '<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13" r="3.5"/>',
  scan: '<path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3"/><path d="M8 8v8M11 8v8M14 8v8M17 8v8"/>',
  empty: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5M8.5 8.5l5 5M13.5 8.5l-5 5"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M7.5 12.5l3 3 6-6.5"/>',
  volume: '<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 9a4 4 0 010 6M18 6.5a8 8 0 010 11"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="1.5"/>',
  megaphone: '<path d="M4 10v4l11 4V6z"/><path d="M4 12H3M15 9.5a3 3 0 010 5M7 14.5l1 4.5h2.5l-1-3.7"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.6" r=".6" fill="currentColor"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
};

/** Inline SVG icon. `cls` adds classes (for example size). Decorative: hidden from screen readers. */
export function icon(name, cls = 'ic') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PATHS[name]}</svg>`;
}
