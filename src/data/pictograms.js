// SAMPLE (DUMMY) pictograms for the prototype: simple drawings used as pictorial instructions in some leaflets.
// Each is an SVG turned into a data URI, so no extra files are needed. Real leaflets bring their own images
// (see `pictures` in docs/api-contract.md). Captions are German because they are part of the leaflet text.

const NAVY = '#0b3c63';
const ORANGE = '#d97b4a';
const BG = '#eef4fa';

const wrap = (n, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"><rect width="160" height="120" rx="10" fill="${BG}"/>${body}<circle cx="20" cy="20" r="12" fill="${NAVY}"/><text x="20" y="25" font-family="Arial,sans-serif" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">${n}</text></svg>`;
const uri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
const stk = `stroke="${NAVY}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;
const st = `fill="none" ${stk}`;
const ac = `fill="none" stroke="${ORANGE}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"`;

const inhaler = (x = 0, y = 0, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot} 80 60)"><rect x="66" y="30" width="26" height="50" rx="5" fill="#fff" ${stk}/><path d="M66 70h-22a6 6 0 0 0-6 6v4a6 6 0 0 0 6 6h22" fill="#fff" ${stk}/><rect x="70" y="22" width="18" height="8" rx="2" fill="${ORANGE}"/></g>`;
const head = (cx = 70, cy = 55) => `<circle cx="${cx}" cy="${cy}" r="24" fill="#fff" ${stk}/><path d="M${cx + 20} ${cy - 2}l8 6-8 4" ${st}/><circle cx="${cx + 8}" cy="${cy - 6}" r="2.5" fill="${NAVY}"/>`;

const SETS = {
  inhaler: [
    ['Schütteln Sie den Behälter kräftig.', wrap(1, `${inhaler(0, 6, -20)}<path d="M112 40q10 12 0 24M122 36q12 16 0 32" ${ac}/>`)],
    ['Atmen Sie langsam und vollständig aus.', wrap(2, `${head(66, 62)}<path d="M100 64h30m-8-8 8 8-8 8" ${ac}/>`)],
    ['Nehmen Sie das Mundstück in den Mund, drücken Sie und atmen Sie dabei tief ein.', wrap(3, `${inhaler(10, 8)}<path d="M79 8v14m-6-6 6 6 6-6" ${ac}/><path d="M122 70h-24m6-8-6 8 6 8" ${ac}/>`)],
    ['Halten Sie den Atem etwa 10 Sekunden an.', wrap(4, `${head(62, 62)}<text x="118" y="70" font-family="Arial,sans-serif" font-size="22" font-weight="700" fill="${ORANGE}" text-anchor="middle">10 s</text>`)],
  ],
  spray: [
    ['Putzen Sie sich vor der Anwendung die Nase.', wrap(1, `${head(66, 62)}<path d="M104 56h18v22h-18z" fill="#fff" ${stk}/><path d="M108 64h10M108 70h10" ${ac}/>`)],
    ['Führen Sie die Sprühspitze in ein Nasenloch ein.', wrap(2, `${head(60, 62)}<rect x="108" y="22" width="20" height="46" rx="5" fill="#fff" ${stk}/><rect x="113" y="12" width="10" height="10" rx="2" fill="${ORANGE}"/><path d="M110 66l-14 4" ${ac}/>`)],
    ['Sprühen Sie einmal und atmen Sie dabei leicht durch die Nase ein.', wrap(3, `${head(60, 62)}<rect x="108" y="22" width="20" height="46" rx="5" fill="#fff" ${stk}/><path d="M118 8v12m-5-5 5 5 5-5" ${ac}/><path d="M96 64q-6 2 0 6M92 58q-8 6 0 14" ${ac}/>`)],
    ['Wiederholen Sie dies im anderen Nasenloch und wischen Sie die Spitze ab.', wrap(4, `<rect x="50" y="22" width="20" height="46" rx="5" fill="#fff" ${stk}/><rect x="55" y="12" width="10" height="10" rx="2" fill="${ORANGE}"/><path d="M92 54h30v22H92z" fill="#fff" ${stk}/><path d="M98 62h18M98 68h18" ${ac}/><path d="M76 44l12 6" ${ac}/>`)],
  ],
  tablet: [
    ['Nehmen Sie die Tablette aus der Blisterpackung.', wrap(1, `<rect x="40" y="36" width="80" height="50" rx="6" fill="#fff" ${stk}/><circle cx="62" cy="61" r="9" fill="${ORANGE}"/><circle cx="98" cy="61" r="9" fill="#fff" ${stk}/>`)],
    ['Schlucken Sie die Tablette unzerkaut mit einem Glas Wasser.', wrap(2, `<path d="M56 34h34l-4 54H60z" fill="#fff" ${stk}/><path d="M59 58h28" ${ac}/><ellipse cx="116" cy="60" rx="14" ry="8" transform="rotate(-30 116 60)" fill="${ORANGE}"/>`)],
  ],
};

/** Pictures for a leaflet: [{ src, alt, caption }] in order; the alt text is the German caption. */
export function picturesFor(kind) {
  return (SETS[kind] ?? []).map(([caption, svg]) => ({ src: uri(svg), alt: caption, caption }));
}
