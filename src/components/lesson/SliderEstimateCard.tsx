'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { GlossaryText } from '@/components/ui/GlossaryText';
import { useLessonColors } from '@/lib/lessonColors';

interface SliderEstimateCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

const SliderEstimateCard = forwardRef<QuestionCardHandle, SliderEstimateCardProps>(
  function SliderEstimateCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const c = useLessonColors();
    const min = question.sliderMin ?? 0;
    const max = question.sliderMax ?? 100;
    const correctValue = question.correctValue ?? 50;
    const tolerance = question.tolerance ?? 10; // % tolerance
    const unit = question.unit ?? '';

    const midpoint = Math.round((min + max) / 2);
    const [value, setValue] = useState(midpoint);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [localCorrect, setLocalCorrect] = useState<boolean | null>(null);
    const [closeness, setCloseness] = useState<'exact' | 'close' | 'off' | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setValue(Math.round((min + max) / 2));
      setHasInteracted(false);
      setLocalCorrect(null);
      setCloseness(null);
    }, [question.id, min, max]);

    useEffect(() => {
      onSelectionChange(hasInteracted);
    }, [hasInteracted, onSelectionChange]);

    const formatValue = useCallback((v: number): string => {
      if (unit === '$') return `$${v.toLocaleString()}`;
      if (unit === '%') return `${v}%`;
      if (unit) return `${v.toLocaleString()} ${unit}`;
      return v.toLocaleString();
    }, [unit]);

    const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (answered) return;
      const newVal = Number(e.target.value);
      setValue(newVal);
      if (!hasInteracted) setHasInteracted(true);
    }, [answered, hasInteracted]);

    // Touch/click on track for direct positioning
    const handleTrackInteraction = useCallback((clientX: number) => {
      if (answered || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const newVal = Math.round(min + pct * (max - min));
      setValue(newVal);
      if (!hasInteracted) setHasInteracted(true);
    }, [answered, min, max, hasInteracted]);

    const handleCheck = useCallback(() => {
      if (answered || !hasInteracted) return;

      const range = max - min;
      const diff = Math.abs(value - correctValue);
      const pctOff = (diff / range) * 100;

      // Correct if within tolerance
      const isCorrect = pctOff <= tolerance;
      // Close if within 2x tolerance
      const isClose = pctOff <= tolerance * 2;

      setCloseness(isCorrect ? 'exact' : isClose ? 'close' : 'off');
      setLocalCorrect(isCorrect);
      onAnswer(isCorrect);
    }, [answered, hasInteracted, value, correctValue, tolerance, min, max, onAnswer]);

    useImperativeHandle(ref, () => ({
      check: handleCheck,
      hasSelection: hasInteracted,
      selectOption: () => {},
      selectBool: () => {},
      selectWord: () => {},
      questionType: 'slider-estimate',
      availableWordCount: 0,
    }), [handleCheck, hasInteracted]);

    const pct = ((value - min) / (max - min)) * 100;
    const correctPct = ((correctValue - min) / (max - min)) * 100;

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        {/* Action title */}
        <div style={{ fontSize: 12, fontWeight: 800, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
          Slide to estimate
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: c.title, lineHeight: 1.35, margin: '0 0 12px' }}>
          <GlossaryText text={question.question} />
        </h2>

        {question.hint && !answered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{
              padding: '8px 12px', borderRadius: 10, background: c.hintBg,
              border: '1.5px solid #FFE4B8', fontSize: 13, fontWeight: 600,
              color: c.hintColor, lineHeight: 1.4, marginBottom: 4,
            }}
          >
            <GlossaryText text={question.hint} />
          </motion.div>
        )}

        <div style={{ flex: 1, minHeight: 8 }} />

        {/* Current value display */}
        <motion.div
          animate={
            localCorrect !== null
              ? localCorrect
                ? { scale: [1, 1.15, 1] }
                : { x: [0, -8, 8, -5, 5, 0] }
              : {}
          }
          style={{
            textAlign: 'center', marginBottom: 20,
          }}
        >
          <div style={{
            fontSize: 42, fontWeight: 900, lineHeight: 1,
            color: localCorrect !== null
              ? localCorrect ? '#58A700' : closeness === 'close' ? '#F59E0B' : '#EA2B2B'
              : unitColor,
            transition: 'color 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {localCorrect !== null && localCorrect && <Check className="w-6 h-6" strokeWidth={3} />}
            {localCorrect !== null && !localCorrect && closeness === 'close' && <Minus className="w-6 h-6" strokeWidth={3} />}
            {localCorrect !== null && !localCorrect && closeness !== 'close' && <X className="w-6 h-6" strokeWidth={3} />}
            {formatValue(value)}
          </div>
          {localCorrect !== null && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontSize: 14, fontWeight: 700, marginTop: 8,
                color: localCorrect ? '#58A700' : closeness === 'close' ? '#F59E0B' : '#EA2B2B',
              }}
            >
              {localCorrect ? '🎯 Nailed it!' : closeness === 'close' ? `Close! Answer: ${formatValue(correctValue)}` : `Answer: ${formatValue(correctValue)}`}
            </motion.div>
          )}
        </motion.div>

        {/* Slider track */}
        <div style={{ padding: '0 8px', marginBottom: 16 }}>
          <div
            ref={trackRef}
            onClick={(e) => handleTrackInteraction(e.clientX)}
            style={{
              position: 'relative', height: 40, display: 'flex', alignItems: 'center',
              cursor: answered ? 'default' : 'pointer',
              pointerEvents: answered ? 'none' : 'auto',
            }}
          >
            {/* Background track */}
            <div style={{
              position: 'absolute', left: 0, right: 0, height: 8, borderRadius: 4,
              background: c.trackBg,
            }} />

            {/* Filled track */}
            <motion.div
              animate={{ width: `${pct}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'absolute', left: 0, height: 8, borderRadius: 4,
                background: localCorrect !== null
                  ? localCorrect ? '#58CC02' : closeness === 'close' ? '#F59E0B' : '#FF4B4B'
                  : unitColor,
                transition: 'background 0.3s',
              }}
            />

            {/* Correct value marker (shown after answer) */}
            {localCorrect !== null && !localCorrect && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  position: 'absolute', left: `${correctPct}%`, transform: 'translateX(-50%)',
                  width: 4, height: 20, borderRadius: 2, background: '#58CC02',
                  boxShadow: '0 0 8px rgba(88, 204, 2, 0.5)',
                }}
              />
            )}

            {/* Tolerance zone (shown after answer) */}
            {localCorrect !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                style={{
                  position: 'absolute',
                  left: `${Math.max(0, correctPct - (tolerance * 100 / (max - min) * ((max - min) / 100)))}%`,
                  width: `${Math.min(100, (tolerance * 2 * 100) / 100)}%`,
                  height: 8, borderRadius: 4, background: '#58CC02',
                }}
              />
            )}

            {/* Native range input (invisible, handles interaction) */}
            <input
              type="range"
              min={min}
              max={max}
              value={value}
              onChange={handleSliderChange}
              disabled={answered}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
              aria-valuetext={formatValue(value)}
              aria-label={`Estimate slider: ${formatValue(value)}`}
              style={{
                position: 'absolute', left: 0, right: 0, width: '100%', height: 40,
                opacity: 0, cursor: answered ? 'default' : 'pointer', zIndex: 10,
                margin: 0,
              }}
            />

            {/* Thumb */}
            <motion.div
              animate={{ left: `${pct}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'absolute', transform: 'translateX(-50%)',
                width: 32, height: 32, borderRadius: 16,
                background: c.cardBg,
                border: `3px solid ${
                  localCorrect !== null
                    ? localCorrect ? '#58CC02' : closeness === 'close' ? '#F59E0B' : '#FF4B4B'
                    : unitColor
                }`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                pointerEvents: 'none',
                transition: 'border-color 0.3s',
              }}
            />
          </div>

          {/* Min/Max labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: c.subtitle }}>{formatValue(min)}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: c.subtitle }}>{formatValue(max)}</span>
          </div>
        </div>
      </div>
    );
  }
);

export default SliderEstimateCard;
