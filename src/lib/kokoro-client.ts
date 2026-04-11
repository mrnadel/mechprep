/**
 * Client-side Kokoro TTS manager.
 * Loads the model directly (no Web Worker) for simplicity and reliability.
 * Caches generated audio in memory so repeated texts play instantly.
 */

type InitCallback = (progress: number) => void;
type ReadyCallback = () => void;

let instance: KokoroClient | null = null;

export function getKokoroClient(): KokoroClient {
  if (!instance) instance = new KokoroClient();
  return instance;
}

export class KokoroClient {
  private tts: any = null;
  private ready = false;
  private initializing = false;
  private cache = new Map<string, Float32Array>();
  private readyPromise: Promise<void> | null = null;

  /** Start model loading. Idempotent. */
  init(onProgress?: InitCallback, onReady?: ReadyCallback): Promise<void> {
    if (this.ready) {
      onReady?.();
      return Promise.resolve();
    }

    if (this.readyPromise) return this.readyPromise;

    this.initializing = true;
    this.readyPromise = (async () => {
      try {
        console.log('[kokoro] Loading model...');
        const { KokoroTTS } = await import('kokoro-js');

        let lastProgress = 0;
        this.tts = await KokoroTTS.from_pretrained(
          'onnx-community/Kokoro-82M-v1.0-ONNX',
          {
            dtype: 'q8',
            device: 'wasm',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            progress_callback: (data: any) => {
              const loaded = data?.loaded ?? 0;
              const total = data?.total ?? 0;
              const p = total > 0
                ? Math.round((loaded / total) * 100)
                : Math.min(99, lastProgress + 1);
              lastProgress = p;
              onProgress?.(p);
            },
          },
        );

        this.ready = true;
        this.initializing = false;
        console.log('[kokoro] Model ready!');
        onReady?.();
      } catch (err) {
        this.initializing = false;
        console.error('[kokoro] Failed to load:', err);
        throw err;
      }
    })();

    return this.readyPromise;
  }

  /** Generate audio for text. Returns cached result if available. */
  async generate(text: string, voice: string, speed = 0.95): Promise<Float32Array> {
    if (!this.ready || !this.tts) throw new Error('Model not loaded');

    const cacheKey = `${voice}:${speed}:${text}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    console.log(`[kokoro] Generating: voice=${voice}, "${text.slice(0, 50)}..."`);
    const result = await this.tts.generate(text, { voice, speed });
    const pcm = new Float32Array(result.audio);
    console.log(`[kokoro] Done: ${(pcm.length / 24000).toFixed(1)}s audio`);

    this.cache.set(cacheKey, pcm);
    return pcm;
  }

  /** Pre-generate audio in the background (fire-and-forget). */
  prefetch(text: string, voice: string, speed = 0.95): void {
    if (!this.ready || !text) return;
    const cacheKey = `${voice}:${speed}:${text}`;
    if (this.cache.has(cacheKey)) return;
    this.generate(text, voice, speed).catch(() => {});
  }

  get isReady() { return this.ready; }
  get isLoading() { return this.initializing; }

  clearCache() { this.cache.clear(); }
}
