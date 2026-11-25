// App: browser capabilities behind one module (AD-4). Each feature-detects and reports why it
// is unavailable, so the UI can always offer a text alternative.

const SR = () => globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;

export const speechRecognitionSupported = () => Boolean(SR());
export const speechSynthesisSupported = () => 'speechSynthesis' in globalThis && 'SpeechSynthesisUtterance' in globalThis;

/**
 * Start listening. Returns { stop } or null when unsupported.
 * onResult(text), onError(reason).
 */
export function listen({ lang = 'en-US', onResult, onError }) {
  const Ctor = SR();
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = lang;
  rec.onresult = (e) => onResult(e.results[0][0].transcript);
  rec.onerror = (e) => onError(e.error || 'error');
  try {
    rec.start();
  } catch {
    onError('start-failed');
  }
  return { stop: () => { try { rec.stop(); } catch { /* already stopped */ } } };
}

let speaking = false;
export const isSpeaking = () => speaking;

export function stopSpeaking() {
  try { globalThis.speechSynthesis?.cancel(); } catch { /* ignore */ }
  speaking = false;
}

/** Read text aloud. Returns false when speech output is unsupported. */
export function speak(text, { lang, onEnd } = {}) {
  if (!speechSynthesisSupported()) return false;
  const u = new SpeechSynthesisUtterance(text);
  if (lang) u.lang = lang;
  u.onend = u.onerror = () => { speaking = false; onEnd?.(); };
  globalThis.speechSynthesis.speak(u);
  speaking = true;
  return true;
}
