'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, memo } from 'react';
import { motion } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { MoneyText } from '@/components/ui/MoneyText';

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
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.35, margin: '0 0 10px' }}>
          <MoneyText text={question.question} />
        </h2>

        {question.hint && !answered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{
              padding: '8px 12px', borderRadius: 10, background: '#FFF9E8',
              border: '1.5px solid #FFE4B8', fontSize: 13, fontWeight: 600,
              color: '#B56E00', lineHeight: 1.4, marginBottom: 8,
            }}
          >
            <MoneyText text={question.hint} />
          </motion.div>
        )}

        {/* Image with tap zones overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            position: 'relative', borderRadius: 16, overflow: 'hidden',
            border: '2px solid #E5E5E5', background: 'white',
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
                onClick={() => handleZoneTap(zone.id)}
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
                {/* Zone label */}
                <span style={{
                  fontSize: 11, fontWeight: 800, color: 'white',
                  background: answered && localCorrect !== null
                    ? isCorrectZone ? '#58CC02' : isSelected && !isCorrectZone ? '#FF4B4B' : 'rgba(0,0,0,0.4)'
                    : isSelected ? unitColor : 'rgba(0,0,0,0.4)',
                  padding: '2px 8px', borderRadius: 6,
                  transition: 'background 0.2s',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}>
                  {zone.label}
                  {answered && isCorrectZone && ' ✓'}
                  {answered && isSelected && !isCorrectZone && ' ✗'}
                </span>
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

              let bg = 'white';
              let border = '2px solid #E5E5E5';
              let textColor = '#3C3C3C';

              if (answered && localCorrect !== null) {
                if (isCorrectZone) {
                  bg = '#D7FFB8'; border = '2px solid #58CC02'; textColor = '#58A700';
                } else if (isSelected && !isCorrectZone) {
                  bg = '#FFDFE0'; border = '2px solid #FF4B4B'; textColor = '#EA2B2B';
                } else {
                  bg = '#F5F5F5'; border = '2px solid #EFEFEF'; textColor = '#CFCFCF';
                }
              } else if (isSelected) {
                bg = `${unitColor}10`; border = `2.5px solid ${unitColor}`;
              }

              return (
                <motion.button
                  key={zone.id}
                  onClick={() => handleZoneTap(zone.id)}
                  disabled={answered}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 25 }}
                  whileTap={!answered ? { scale: 0.92 } : undefined}
                  style={{
                    padding: '10px 18px', borderRadius: 12, background: bg, border,
                    fontSize: 14, fontWeight: 700, color: textColor,
                    cursor: answered ? 'default' : 'pointer',
                    transition: 'background 0.2s, border 0.2s',
                  }}
                >
                  {zone.label}
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
