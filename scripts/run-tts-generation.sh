#!/bin/bash
#
# Run full TTS audio generation for all Octokeen courses.
# This takes ~2-4 hours on CPU. Run it overnight:
#
#   bash scripts/run-tts-generation.sh
#
# It's safe to restart — already-generated files are skipped.
# Progress is logged to scripts/tts-generation.log
#

set -e
cd "$(dirname "$0")/.."

LOG="scripts/tts-generation.log"
INPUT="scripts/tts-input-all.json"

echo "=== Octokeen TTS Generation ===" | tee -a "$LOG"
echo "Started: $(date)" | tee -a "$LOG"

# Step 1: Export all lesson data with character/voice mapping
echo "" | tee -a "$LOG"
echo "[1/2] Exporting lesson data..." | tee -a "$LOG"
npx tsx scripts/export-lesson-json.ts > "$INPUT" 2>/dev/null
LESSON_COUNT=$(python -c "import json; print(len(json.load(open('$INPUT'))))")
echo "  Exported $LESSON_COUNT lessons" | tee -a "$LOG"

# Step 2: Generate audio files (OGG format for compression)
echo "" | tee -a "$LOG"
echo "[2/2] Generating audio files (this takes a while)..." | tee -a "$LOG"
python scripts/generate-tts.py --input "$INPUT" --format ogg 2>&1 | tee -a "$LOG"

echo "" | tee -a "$LOG"
echo "Finished: $(date)" | tee -a "$LOG"

# Summary
TOTAL_FILES=$(find public/audio/tts -name "*.ogg" 2>/dev/null | wc -l)
TOTAL_SIZE=$(du -sh public/audio/tts 2>/dev/null | cut -f1)
echo "Total files: $TOTAL_FILES" | tee -a "$LOG"
echo "Total size: $TOTAL_SIZE" | tee -a "$LOG"
