/**
 * Web Worker for Kokoro TTS inference.
 */

let tts = null;

async function initModel() {
  // Suppress noisy "Unable to determine content-length" warnings from transformers.js
  const origWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('content-length')) return;
    origWarn.apply(console, args);
  };

  console.log('[kokoro-worker] Loading kokoro-js from CDN...');
  const { KokoroTTS } = await import('https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js');

  const device = 'wasm';
  const dtype = 'q8';

  console.log(`[kokoro-worker] Initializing model (device=${device}, dtype=${dtype})...`);
  self.postMessage({ type: 'init-progress', progress: 0, device, dtype });

  let lastProgress = 0;
  tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', {
    dtype,
    device,
    progress_callback: (data) => {
      // data.total may be 0 if content-length is unavailable
      const progress = data.total > 0
        ? Math.round((data.loaded / data.total) * 100)
        : Math.min(99, lastProgress + 1); // increment slowly as fallback
      lastProgress = progress;
      self.postMessage({ type: 'init-progress', progress, device, dtype });
    },
  });

  console.warn = origWarn; // restore
  console.log('[kokoro-worker] Model ready!');
  self.postMessage({ type: 'ready' });
}

async function generateAudio(id, text, voice, speed) {
  if (!tts) {
    self.postMessage({ type: 'error', id, error: 'Model not loaded' });
    return;
  }

  try {
    console.log(`[kokoro-worker] Generating: voice=${voice}, text="${text.slice(0, 50)}..."`);
    const result = await tts.generate(text, { voice, speed });
    const audioData = result.audio;
    console.log(`[kokoro-worker] Generated ${audioData.length} samples (${(audioData.length / 24000).toFixed(1)}s)`);
    self.postMessage(
      { type: 'audio', id, audio: audioData, sampleRate: result.sampling_rate },
      [audioData.buffer],
    );
  } catch (err) {
    console.error('[kokoro-worker] Generate error:', err);
    self.postMessage({ type: 'error', id, error: err.message || String(err) });
  }
}

self.onmessage = async (e) => {
  const { type, id, text, voice, speed } = e.data;

  switch (type) {
    case 'init':
      try {
        await initModel();
      } catch (err) {
        console.error('[kokoro-worker] Init failed:', err);
        self.postMessage({ type: 'error', error: 'Failed to load model: ' + (err.message || err) });
      }
      break;

    case 'generate':
      await generateAudio(id, text, voice, speed);
      break;
  }
};
