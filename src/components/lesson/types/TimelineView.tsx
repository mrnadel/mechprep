'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LessonTypeProps, TimelineStage } from '@/data/course/types';
import { MoneyText } from '@/components/ui/MoneyText';
import { useLessonColors } from '@/lib/lessonColors';

export default function TimelineView({
  lesson,
  unitColor,
  theme,
  onAnswer,
  onProgress,
  onComplete,
  checkHearts,
}: LessonTypeProps) {
  const c = useLessonColors();
  const stages = lesson.timelineStages ?? [];
  const startStageId = lesson.timelineStartStageId ?? stages[0]?.id ?? '';
  const stageMap = useMemo(() => new Map(stages.map((s) => [s.id, s])), [stages]);
  const totalDecisions = useMemo(() => stages.filter((s) => s.choices && s.choices.length > 0).length, [stages]);

  const [currentStageId, setCurrentStageId] = useState(startStageId);
  const [showChoices, setShowChoices] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showImpact, setShowImpact] = useState(false);
  const [decisionsMade, setDecisionsMade] = useState(0);
  const [stageHistory, setStageHistory] = useState<Array<{ stageId: string; choiceText: string; optimal: boolean }>>([]);
  const [showOutcome, setShowOutcome] = useState(false);
  const initRef = useRef(false);

  const currentStage = stageMap.get(currentStageId);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    onProgress(0, totalDecisions);
    // Show choices after brief reading delay
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (currentStage?.choices && currentStage.choices.length > 0) {
      timer = setTimeout(() => setShowChoices(true), 600);
    }
    return () => { if (timer) clearTimeout(timer); initRef.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChoice = useCallback(
    (choiceIndex: number) => {
      if (!currentStage?.choices) return;
      const choice = currentStage.choices[choiceIndex];

      setSelectedChoice(choiceIndex);
      setShowChoices(false);

      onAnswer(currentStage.id, choice.optimal);
      const next = decisionsMade + 1;
      setDecisionsMade(next);
      onProgress(next, totalDecisions);
      setStageHistory((prev) => [
        ...prev,
        { stageId: currentStage.id, choiceText: choice.text, optimal: choice.optimal },
      ]);

      // Show impact after a brief pause
      setTimeout(() => setShowImpact(true), 400);
    },
    [currentStage, decisionsMade, totalDecisions, onAnswer, onProgress],
  );

  const handleContinue = useCallback(() => {
    if (!currentStage?.choices || selectedChoice === null) return;
    const choice = currentStage.choices[selectedChoice];

    if (!checkHearts()) return;

    setShowImpact(false);
    setSelectedChoice(null);

    const nextStage = stageMap.get(choice.nextStageId);
    if (!nextStage) {
      // Check if there's an outcome for this path
      setShowOutcome(true);
      return;
    }

    setCurrentStageId(choice.nextStageId);

    // Show choices for new stage after brief delay
    if (nextStage.choices && nextStage.choices.length > 0) {
      setTimeout(() => setShowChoices(true), 600);
    } else {
      // Narration-only stage — show it briefly then check for outcome
      setShowOutcome(true);
    }
  }, [currentStage, selectedChoice, stageMap, checkHearts]);

  // Outcome screen
  if (showOutcome) {
    const optimalCount = stageHistory.filter((h) => h.optimal).length;
    const total = stageHistory.length;
    const outcomeKey = `${optimalCount}-${total}`;
    const outcome = lesson.timelineOutcomes?.[outcomeKey];

    const scoreLabel = optimalCount === total ? 'Perfect' : optimalCount >= total * 0.7 ? 'Good' : 'Needs Work';
    const scoreColor = optimalCount === total ? '#58CC02' : optimalCount >= total * 0.7 ? '#F59E0B' : '#FF4B4B';
    const scoreEmoji = optimalCount === total ? '🌟' : optimalCount >= total * 0.7 ? '👍' : '💡';

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '24px 20px',
            gap: 16,
            overflowY: 'auto',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{ fontSize: 48 }}
          >
            {scoreEmoji}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 22, fontWeight: 800, color: c.title, margin: 0 }}
          >
            {outcome?.title ?? 'Story Complete!'}
          </motion.p>
          {outcome?.description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#777',
                textAlign: 'center',
                lineHeight: 1.5,
                maxWidth: 320,
                margin: 0,
              }}
            >
              <MoneyText text={outcome.description} />
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 12,
              background: `${scoreColor}15`,
              border: `2px solid ${scoreColor}`,
              marginTop: 4,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 800, color: scoreColor }}>
              {optimalCount}/{total} optimal choices — {scoreLabel}
            </span>
          </motion.div>

          {/* Decision recap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ width: '100%', maxWidth: 400, marginTop: 8 }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
              Your decisions
            </p>
            {stageHistory.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  borderRadius: 10,
                  background: h.optimal ? '#F0FFF0' : '#FFF5F5',
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 14 }}>{h.optimal ? '✓' : '✗'}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: c.title }}>{h.choiceText}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          style={{
            padding: '12px 20px',
            paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
            borderTop: `2px solid ${c.border}`,
            background: c.cardBg,
          }}
        >
          <button
            onClick={onComplete}
            className="w-full transition-transform active:scale-[0.98]"
            style={{
              padding: '14px 0',
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              background: unitColor,
              color: '#FFFFFF',
              boxShadow: `0 4px 0 ${theme.dark}`,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            See Results
          </button>
        </div>
      </div>
    );
  }

  if (!currentStage) return null;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Stage indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: unitColor }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Decision {decisionsMade + 1} of {totalDecisions}
          </span>
        </div>

        {/* Story card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStageId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              background: c.cardBg,
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: `1px solid ${c.emptyBg}`,
            }}
          >
            {currentStage.emoji && (
              <div style={{ fontSize: 40, textAlign: 'center', marginBottom: 12 }}>
                {currentStage.emoji}
              </div>
            )}
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: c.title,
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              <MoneyText text={currentStage.narrative} />
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Impact reveal */}
        <AnimatePresence>
          {showImpact && selectedChoice !== null && currentStage.choices && (
            <motion.div
              initial={{ opacity: 0, y: 12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0 }}
              style={{
                borderRadius: 14,
                padding: 16,
                background: currentStage.choices[selectedChoice].optimal ? '#F0FFF0' : '#FFF8E1',
                border: `2px solid ${currentStage.choices[selectedChoice].optimal ? '#58CC02' : '#F59E0B'}`,
              }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.5, margin: '0 0 4px' }}>
                Impact
              </p>
              <p style={{ fontSize: 14, fontWeight: 600, color: c.title, lineHeight: 1.5, margin: 0 }}>
                <MoneyText text={currentStage.choices[selectedChoice].impact} />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Choices or continue */}
      <AnimatePresence mode="wait">
        {showChoices && !showImpact && currentStage.choices && (
          <motion.div
            key="choices"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              padding: '12px 20px',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
              borderTop: `2px solid ${c.border}`,
              background: c.cardBg,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              What do you do?
            </span>
            {currentStage.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleChoice(i)}
                className="transition-transform active:scale-[0.98]"
                style={{
                  padding: '13px 16px',
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 700,
                  textAlign: 'left',
                  background: c.cardBg,
                  color: c.title,
                  border: `2px solid ${c.border}`,
                  boxShadow: `0 3px 0 ${c.border}`,
                  cursor: 'pointer',
                  lineHeight: 1.4,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = unitColor;
                  e.currentTarget.style.background = theme.bg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = c.border;
                  e.currentTarget.style.background = c.cardBg;
                }}
              >
                {choice.text}
              </button>
            ))}
          </motion.div>
        )}

        {showImpact && (
          <motion.div
            key="continue"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              padding: '12px 20px',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
              borderTop: `2px solid ${c.border}`,
              background: c.cardBg,
            }}
          >
            <button
              onClick={handleContinue}
              className="w-full transition-transform active:scale-[0.98]"
              style={{
                padding: '14px 0',
                borderRadius: 16,
                fontSize: 15,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                background: unitColor,
                color: '#FFFFFF',
                boxShadow: `0 4px 0 ${theme.dark}`,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
