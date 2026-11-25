// App: chooses the data provider. Set VITE_GI_API_BASE at build time (for example https://api.example.de)
// to use the live back end; without it the prototype uses its built-in sample leaflets.
import { createSampleProvider } from '../data/providers/sample.js';
import { createHttpProvider } from '../data/providers/http.js';

const base = import.meta.env?.VITE_GI_API_BASE;
let current = base ? createHttpProvider({ baseUrl: base }) : createSampleProvider();

export const provider = new Proxy({}, { get: (_, k) => current[k] });
export const setProvider = (p) => { current = p; };
