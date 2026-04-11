"""
Generate voice samples for each Octokeen character to compare voices.
Each character gets a sample line that matches their personality.
"""

import numpy as np
import soundfile as sf
from kokoro import KPipeline

SAMPLE_RATE = 24000
OUT_DIR = "public/audio/tts/voice-samples"

# Character sample lines (in-character dialogue)
SAMPLES = [
    # Captain Nova — authoritative, wonder-filled astronaut mentor
    {
        "character": "captain-nova",
        "voice": "af_bella",
        "lang": "a",
        "text": "When I looked out the cupola window for the first time, I realized just how thin our atmosphere really is. A paper-thin blue line, protecting everything we've ever known.",
    },
    # Kai — excited 16-year-old backyard astronomer
    {
        "character": "kai",
        "voice": "am_puck",
        "lang": "a",
        "text": "Dude, I just saw Jupiter's moons through my telescope for the first time. No way, there were like four tiny dots lined up right next to it. That's insane!",
    },
    # Alex — casual 24-year-old, jokes about bad money habits
    {
        "character": "alex",
        "voice": "am_fenrir",
        "lang": "a",
        "text": "Okay so I told myself I'd start saving last month, and then I saw these sneakers on sale. In my defense, they were forty percent off. That counts as saving, right?",
    },
    # Jordan — precise, numbers-driven, careful speaker
    {
        "character": "jordan",
        "voice": "af_heart",
        "lang": "a",
        "text": "I ran the numbers again last night. If I put three hundred extra toward the principal each month, I'll be debt-free in four years and seven months instead of ten. That changes everything.",
    },
    # Dr. Maya — warm, precise psychology professor
    {
        "character": "dr-maya",
        "voice": "bf_emma",
        "lang": "b",
        "text": "Here's what fascinates me. We think we make rational decisions, but most of the time our brain has already decided before we're even aware of it. The conscious mind is often just along for the ride.",
    },
    # Sam — excited college sophomore discovering psychology
    {
        "character": "sam",
        "voice": "am_michael",
        "lang": "a",
        "text": "No way, so you're telling me that the reason I can't stop scrolling is literally the same brain mechanism as a slot machine? That's wild. I thought I just had no self-control.",
    },
]

# Also generate alternates so the user can compare
ALTERNATES = [
    {"character": "captain-nova-alt", "voice": "af_heart", "lang": "a",
     "text": "When I looked out the cupola window for the first time, I realized just how thin our atmosphere really is. A paper-thin blue line, protecting everything we've ever known."},
    {"character": "kai-alt", "voice": "am_michael", "lang": "a",
     "text": "Dude, I just saw Jupiter's moons through my telescope for the first time. No way, there were like four tiny dots lined up right next to it. That's insane!"},
    {"character": "alex-alt", "voice": "am_puck", "lang": "a",
     "text": "Okay so I told myself I'd start saving last month, and then I saw these sneakers on sale. In my defense, they were forty percent off. That counts as saving, right?"},
    {"character": "dr-maya-alt", "voice": "af_bella", "lang": "a",
     "text": "Here's what fascinates me. We think we make rational decisions, but most of the time our brain has already decided before we're even aware of it. The conscious mind is often just along for the ride."},
    {"character": "sam-alt", "voice": "am_fenrir", "lang": "a",
     "text": "No way, so you're telling me that the reason I can't stop scrolling is literally the same brain mechanism as a slot machine? That's wild. I thought I just had no self-control."},
]


def generate(pipeline_cache: dict, sample: dict):
    lang = sample["lang"]
    if lang not in pipeline_cache:
        pipeline_cache[lang] = KPipeline(lang_code=lang)
    pipeline = pipeline_cache[lang]

    chunks = []
    for _gs, _ps, audio in pipeline(sample["text"], voice=sample["voice"], speed=0.95):
        chunks.append(audio)

    if not chunks:
        print(f"  [WARN] No audio for {sample['character']}")
        return

    full_audio = np.concatenate(chunks)
    duration = len(full_audio) / SAMPLE_RATE
    filename = f"{sample['character']}--{sample['voice']}.wav"
    path = f"{OUT_DIR}/{filename}"
    sf.write(path, full_audio, SAMPLE_RATE)
    print(f"  {filename:45s}  ({duration:.1f}s)")


def main():
    pipeline_cache: dict = {}

    print("=== PRIMARY VOICE PICKS ===\n")
    for s in SAMPLES:
        generate(pipeline_cache, s)

    print("\n=== ALTERNATE VOICES (for comparison) ===\n")
    for s in ALTERNATES:
        generate(pipeline_cache, s)

    print(f"\nDone! Files in {OUT_DIR}/")


if __name__ == "__main__":
    main()
