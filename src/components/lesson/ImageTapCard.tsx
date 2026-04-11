'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, memo } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { GlossaryText } from '@/components/ui/GlossaryText';
import { useLessonColors } from '@/lib/lessonColors';

interface ImageTapCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

const DiagramImage = memo(function DiagramImage({ html }: { html: string }) {
  const sanitised = html
    .replace(/(<svg[^>]*)\sheight="auto"/gi, '$1')
    .replace(/(<svg[^>]*)\swidth="auto"/gi, '$1');
  return (
    <div
      className="w-full"
      style={{ borderRadius: 14, overflow: 'hidden' }}
      dangerouslySetInnerHTML={{ __html: sanitised }}
    />
  );
});

const ImageTapCard = forwardRef<QuestionCardHandle, ImageTapCardProps>(
  function ImageTapCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const c = useLessonColors();
    const zones = question.tapZones ?? [];
    const correctZoneId = question.correctZoneId ?? '';
    const diagram = question.diagram ?? '';

    const [selectedZone, setSelectedZone] = useState<string | null>(null);
    const [localCorrect, setLocalCorrect] = useState<boolean | null>(null);

    useEffect(() => {
      setSelectedZone(null);
      setLocalCorrect(null);
    }, [question.id]);

    const hasSelection = selectedZone !== null;

    useEffect(() => {
      onSelectionChange(hasSelection);
    }, [hasSelection, onSelectionChange]);

    const handleZoneTap = useCallback((zoneId: string) => {
      if (answered) return;
      setSelectedZone(prev => prev === zoneId ? null : zoneId);
    }, [answered]);

    const handleCheck = useCallback(() => {
      if (answered || !hasSelection) return;
      const correct = selectedZone === correctZoneId;
      setLocalCorrect(correct);
      onAnswer(correct);
    }, [answered, hasSelection, selectedZone, correctZoneId, onAnswer]);

    useImperativeHandle(ref, () => ({
      check: handleCheck,
      hasSelection,
      selectOption: (index: number) => {
        if (!answered && index < zones.length) {
          handleZoneTap(zones[index].id);
        }
      },
      selectBool: () => {},
      selectWord: () => {},
      questionType: 'image-tap',
      availableWordCount: 0,
    }), [handleCheck, hasSelection, answered, zones, handleZoneTap]);

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        {/* Action title */}
        <div style={{ fontSize: 12, fontWeight: 800, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
          Tap the correct area
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: c.title, lineHeight: 1.35, margin: '0 0 10px' }}>
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
              color: c.hintColor, lineHeight: 1.4, marginBottom: 8,
            }}
          >
            <GlossaryText text={question.hint} />
          </motion.div>
        )}

        {/* Image with tap zones overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            position: 'relative', borderRadius: 16, overflow: 'hidden',
            border: `2px solid ${c.border}`, background: c.cardBg,
          }}
        >
          {/* Diagram/image */}
          {diagram && <DiagramImage html={diagram} />}

          {/* Tap zone overlays */}
          {zones.map(zone => {
            const isSelected = selectedZone === zone.id;
            const isCorrectZone = zone.id === correctZoneId;

            let overlayBg = 'transparent';
            let overlayBorder = '2px dashed transparent';

            if (answered && localCorrect !== null) {
              if (isCorrectZone) {
                overlayBg = 'rgba(88, 204, 2, 0.25)';
                overlayBorder = '3px solid #58CC02';
              } else if (isSelected && !isCorrectZone) {
                overlayBg = 'rgba(255, 75, 75, 0.2)';
                overlayBorder = '3px solid #FF4B4B';
              }
            } else if (isSelected) {
              overlayBg = `${unitColor}20`;
              overlayBorder = `3px solid ${unitColor}`;
            } else {
              overlayBorder = '2px dashed rgba(0,0,0,0.15)';
            }

            return (
              <motion.button
                key={zone.id}
                tabIndex={0}
                role="radio"
                aria-checked={isSelected}
                aria-label={`Tap zone: ${zone.label}${isSelected ? ', selected' : ''}${answered && localCorrect !== null ? (isCorrectZone ? ' — correct' : isSelected && !isCorrectZone ? ' — incorrect' : '') : ''}`}
                onClick={() => handleZoneTap(zone.id)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleZoneTap(zone.id);
                  }
                }}
                disabled={answered}
                whileTap={!answered ? { scale: 0.95, transition: { duration: 0.1 } } : undefined}
                animate={
                  answered && localCorrect !== null
                    ? isCorrectZone
                      ? { scale: [1, 1.05, 1] }
                      : isSelected && !isCorrectZone
                        ? { x: [0, -3, 3, -2, 2, 0] }
                        : {}
                    : {}
                }
                style={{
                  position: 'absolute',
                  left: `${zone.x}%`, top: `${zone.y}%`,
                  width: `${zone.w}%`, height: `${zone.h}%`,
                  background: overlayBg,
                  border: overlayBorder,
                  borderRadius: 10,
                  cursor: answered ? 'default' : 'pointer',
                  transition: 'background 0.2s, border 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 0,
                }}
              >
                {/* Zone label — hidden before answering to avoid giving away the answer */}
                {answered && localCorrect !== null ? (
                  <span style={{
                    fontSize: 11, fontWeight: 800, color: 'white',
                    background: isCorrectZone ? '#58CC02' : isSelected && !isCorrectZone ? '#FF4B4B' : 'rgba(0,0,0,0.4)',
                    padding: '2px 8px', borderRadius: 6,
                    transition: 'background 0.2s',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                  }}>
                    {zone.label}
                    {isCorrectZone && <Check className="w-3 h-3" strokeWidth={3} />}
                    {isSelected && !isCorrectZone && <X className="w-3 h-3" strokeWidth={3} />}
                  </span>
                ) : isSelected ? (
                  <span style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: unitColor,
                    boxShadow: `0 0 0 3px ${unitColor}40`,
                  }} />
                ) : null}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Alternative: button list for zones (when there's no diagram or for accessibility) */}
        {!diagram && zones.length > 0 && (
          <div className="flex flex-wrap" style={{ gap: 8, marginTop: 12, justifyContent: 'center' }}>
            {zones.map((zone, i) => {
              const isSelected = selectedZone === zone.id;
              const isCorrectZone = zone.id === correctZoneId;

              let bg = c.cardBg;
              let border = `2px solid ${c.border}`;
              let textColor = c.title;

              if (answered && localCorrect !== null) {
                if (isCorrectZone) {
                  bg = '#D7FFB8'; border = '2px solid #58CC02'; textColor = '#58A700';
                } else if (isSelected && !isCorrectZone) {
                  bg = '#FFDFE0'; border = '2px solid #FF4B4B'; textColor = '#EA2B2B';
                } else {
                  bg = '#F5F5F5'; border = '2px solid #EFEFEF'; textColor = c.muted;
                }
              } else if (isSelected) {
                bg = `${unitColor}10`; border = `2.5px solid ${unitColor}`;
              }

              return (
                <motion.button
                  key={zone.id}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`${zone.label}${answered && localCorrect !== null ? (isCorrectZone ? ' — correct' : isSelected && !isCorrectZone ? ' — incorrect' : '') : ''}`}
                  onClick={() => handleZoneTap(zone.id)}
                  disabled={answered}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 25 }}
                  whileTap={!answered ? { y: 3, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } } : undefined}
                  style={{
                    padding: '10px 18px', borderRadius: 12, background: bg, border,
                    fontSize: 14, fontWeight: 700, color: textColor,
                    cursor: answered ? 'default' : 'pointer',
                    transition: 'background 0.2s, border 0.2s',
                    boxShadow: answered ? 'none' : isSelected ? `0 3px 0 color-mix(in srgb, ${unitColor} 65%, black)` : '0 3px 0 #DCDCDC',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                  }}
                >
                  {zone.label}
                  {answered && localCorrect !== null && isCorrectZone && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                  {answered && localCorrect !== null && isSelected && !isCorrectZone && <X className="w-3.5 h-3.5" strokeWidth={3} />}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

export default ImageTapCard;
