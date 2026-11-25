// App: the single store instance (AD-2). Views import this, never localStorage.
import { createStore, safeLocalStorage } from '../domain/storage.js';

export const store = createStore(safeLocalStorage());
