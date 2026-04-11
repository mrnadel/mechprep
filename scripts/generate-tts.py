"""
Batch TTS generator for Octokeen lesson content using Kokoro TTS.

Each lesson in the input JSON carries its own `voice` and `langCode`,
assigned from the course character → Kokoro voice mapping.

Usage:
  python scripts/generate-tts.py --input scripts/tts-input-all.json
  python scripts/generate-tts.py --input scripts/tts-input-all.json --lesson sp-sec1-u1-L1
  python scripts/generate-tts.py --input scripts/tts-input-all.json --course space-astronomy
  python scripts/generate-tts.py --input scripts/tts-input-all.json --speed 0.95
  python scripts/generate-tts.py --input scripts/tts-input-all.json --format ogg

Output goes to: public/audio/tts/{lesson-id}/{card-id}.{format}
"""

import argparse
import json
import os
import sys
import subprocess
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro import KPipeline

# -------------------------------------------------------------------
# Config
# -------------------------------------------------------------------
PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "public" / "audio" / "tts"
SAMPLE_RATE = 24000


# -------------------------------------------------------------------
# Pipeline cache — one KPipeline per language code
# -------------------------------------------------------------------
_pipeline_cache: dict[str, "KPipeline"] = {}


def get_pipeline(lang_code: str) -> "KPipeline":
    """Return a cached KPipeline for the given language code."""
    if lang_code not in _pipeline_cache:
        print(f"  [INIT] Loading KPipeline for lang_code='{lang_code}'")
        _pipeline_cache[lang_code] = KPipeline(lang_code=lang_code)
    return _pipeline_cache[lang_code]


def generate_audio(pipeline, text: str, voice: str, speed: float) -> np.ndarray:
    """Generate audio from text, concatenating all chunks."""
    chunks = []
    for _gs, _ps, audio in pipeline(text, voice=voice, speed=speed):
        chunks.append(audio)
    if not chunks:
        return np.array([], dtype=np.float32)
    return np.concatenate(chunks)


def save_audio(audio: np.ndarray, path: Path, fmt: str = "wav"):
    """Save audio array to file. WAV/OGG native via soundfile, MP3 via ffmpeg."""
    path.parent.mkdir(parents=True, exist_ok=True)

    if fmt == "ogg":
        sf.write(str(path), audio, SAMPLE_RATE, format='OGG', subtype='VORBIS')
    elif fmt == "wav":
        sf.write(str(path), audio, SAMPLE_RATE)
    elif fmt == "mp3":
        # Write temp WAV, convert to MP3 via ffmpeg
        wav_path = path.with_suffix(".wav")
        sf.write(str(wav_path), audio, SAMPLE_RATE)
        try:
            subprocess.run(
                ["ffmpeg", "-y", "-i", str(wav_path), "-b:a", "128k", "-ar", "24000", str(path)],
                capture_output=True,
                check=True,
            )
            wav_path.unlink()  # Remove temp WAV
        except FileNotFoundError:
            print("  [WARN] ffmpeg not found, keeping WAV instead")
            path = wav_path
        except subprocess.CalledProcessError as e:
            print(f"  [WARN] ffmpeg failed: {e.stderr.decode()}, keeping WAV")
            path = wav_path
    else:
        sf.write(str(path), audio, SAMPLE_RATE)

    return path


def extract_tts_texts(lesson: dict) -> list[dict]:
    """Extract all text that needs TTS from a lesson's questions/cards."""
    items = []
    for q in lesson.get("questions", []):
        card_id = q["id"]
        q_type = q.get("type", "")

        # Teaching cards: read the explanation (the main teaching content)
        if q_type == "teaching":
            if q.get("explanation"):
                items.append({
                    "card_id": card_id,
                    "type": "teaching",
                    "label": f"teaching: {q.get('question', '')}",
                    "text": q["explanation"],
                })

        # Question cards: read the question text
        else:
            if q.get("question"):
                items.append({
                    "card_id": card_id,
                    "suffix": "q",
                    "type": "question",
                    "label": f"question: {q['question'][:60]}",
                    "text": q["question"],
                })
            # Also generate explanation audio
            if q.get("explanation"):
                items.append({
                    "card_id": card_id,
                    "suffix": "exp",
                    "type": "explanation",
                    "label": f"explanation for {card_id}",
                    "text": q["explanation"],
                })

    return items


def load_lesson_json(json_path: Path) -> dict:
    """Load lesson data from a pre-exported JSON file."""
    with open(json_path) as f:
        return json.load(f)


def main():
    parser = argparse.ArgumentParser(description="Generate TTS audio for Octokeen lessons")
    parser.add_argument("--input", type=str, required=True, help="Path to lesson JSON file")
    parser.add_argument("--speed", type=float, default=0.95, help="Speech speed (default: 0.95, slightly slower for learning)")
    parser.add_argument("--format", type=str, default="ogg", choices=["wav", "mp3", "ogg"], help="Output format (default: ogg)")
    parser.add_argument("--lesson", type=str, default=None, help="Filter to specific lesson ID")
    parser.add_argument("--course", type=str, default=None, help="Filter to specific course/profession (e.g. space-astronomy)")
    args = parser.parse_args()

    # Load lesson data
    data = load_lesson_json(Path(args.input))
    lessons = data if isinstance(data, list) else [data]

    if args.course:
        lessons = [l for l in lessons if l.get("profession") == args.course]
        if not lessons:
            print(f"No lessons found for course '{args.course}'.")
            sys.exit(1)
        print(f"Filtered to course: {args.course} ({len(lessons)} lessons)")

    if args.lesson:
        lessons = [l for l in lessons if l["id"] == args.lesson]
        if not lessons:
            print(f"Lesson '{args.lesson}' not found in input.")
            sys.exit(1)

    # Count total audio segments for progress tracking
    all_segments = []
    for lesson in lessons:
        tts_items = extract_tts_texts(lesson)
        for item in tts_items:
            all_segments.append((lesson, item))

    total_segments = len(all_segments)
    print(f"\nTotal: {len(lessons)} lessons, {total_segments} audio segments to process")
    print(f"Output format: {args.format}, speed: {args.speed}")
    print(f"Output dir: {OUTPUT_DIR}\n")

    generated = 0
    skipped = 0

    for idx, (lesson, item) in enumerate(all_segments, 1):
        lesson_id = lesson["id"]
        voice = lesson.get("voice", "af_heart")
        lang_code = lesson.get("langCode", "a")
        character_id = lesson.get("characterId", None)

        card_id = item["card_id"]
        suffix = item.get("suffix", "")
        filename = f"{card_id}{'-' + suffix if suffix else ''}.{args.format}"
        out_path = OUTPUT_DIR / lesson_id / filename

        progress = f"[{idx}/{total_segments}]"

        if out_path.exists():
            print(f"  {progress} [SKIP] {filename} (already exists)")
            skipped += 1
            continue

        char_label = f" ({character_id})" if character_id else ""
        print(f"  {progress} [GEN]  {lesson_id}/{filename}  voice={voice}{char_label}")
        print(f"           \"{item['text'][:80]}{'...' if len(item['text']) > 80 else ''}\"")

        pipeline = get_pipeline(lang_code)
        audio = generate_audio(pipeline, item["text"], voice, args.speed)

        if len(audio) == 0:
            print(f"           [WARN] No audio generated!")
            continue

        duration = len(audio) / SAMPLE_RATE
        saved = save_audio(audio, out_path, args.format)
        print(f"           -> {saved.name} ({duration:.1f}s)")
        generated += 1

    print(f"\n{'='*60}")
    print(f"Done! Generated {generated} files, skipped {skipped} existing.")
    print(f"Output: {OUTPUT_DIR}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
