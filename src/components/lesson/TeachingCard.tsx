'use client';

import { memo, useMemo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import { Mascot, type MascotPose } from '@/components/ui/Mascot';
import { CharacterAvatar } from '@/components/ui/CharacterAvatar';
import { getTeachingColors } from '@/lib/teachingColors';
import { useIsDark } from '@/store/useThemeStore';
import { STORAGE_KEYS } from '@/lib/storage-keys';
import EngagingText from './EngagingText';
import { AudioButton } from '@/components/ui/AudioButton';

const DiagramDisplay = memo(function DiagramDisplay({ html, cardBg, border }: { html: string; cardBg: string; border: string }) {
  const sanitised = html
    .replace(/(<svg[^>]*)\sheight="auto"/gi, '$1')
    .replace(/(<svg[^>]*)\swidth="auto"/gi, '$1');
  return (
    <div
      className="w-full flex items-center justify-center overflow-hidden"
      style={{
        borderRadius: 14,
        background: cardBg,
        border: `2px solid ${border}`,
        padding: 10,
        maxWidth: 400,
        margin: '0 auto',
      }}
      dangerouslySetInnerHTML={{ __html: sanitised }}
    />
  );
});

const TEACHING_POSES: MascotPose[] = [
  'excited', 'thinking', 'proud', 'winking', 'laughing', 'neutral', 'explorer',
];
const SPACE_POSES: MascotPose[] = [
  'space-astronaut', 'space-flag', 'space-ufo', 'space-moon',
  'excited', 'thinking', 'explorer',
];

function getPoseForQuestion(questionId: string, useSpacePoses: boolean): MascotPose {
  const poses = useSpacePoses ? SPACE_POSES : TEACHING_POSES;
  let hash = 0;
  for (let i = 0; i < questionId.length; i++) {
    hash = ((hash << 5) - hash + questionId.charCodeAt(i)) | 0;
  }
  return poses[Math.abs(hash) % poses.length];
}

/**
 * Split an explanation into a short one-liner (first sentence)
 * and the remaining detail text (rest).
 */
export function splitExplanation(text: string): [string, string] {
  const match = text.match(/[.!?](?:\s|$)/);
  if (!match || match.index === undefined) return [text, ''];
  const end = match.index + 1;
  const first = text.slice(0, end).trim();
  const rest = text.slice(end).trim();
  return [first, rest];
}

interface TeachingCardProps {
  question: CourseQuestion;
  unitColor: string;
  onGotIt: () => void;
  hasBackground?: boolean;
  bgTheme?: 'dark' | 'light' | null;
  characterId?: string | null;
  characterName?: string | null;
  characterLine?: string | null;
  lessonId?: string;
}

export default function TeachingCard({ question, unitColor, onGotIt, hasBackground, bgTheme, characterId, characterName, characterLine, lessonId }: TeachingCardProps) {
  const isDark = useIsDark();
  const tc = getTeachingColors({
    isDark,
    hasBackground: !!hasBackground,
    bgTheme: bgTheme ?? null,
  });

  // Strip leading emoji from title
  const titleMatch = question.question.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)\s*/u);
  const title = titleMatch ? question.question.slice(titleMatch[0].length) : question.question;

  const pose = useMemo(() => getPoseForQuestion(question.id, !!hasBackground), [question.id, hasBackground]);

  // Resolve localized explanation variant
  const [country, setCountry] = useState<string | null>(null);
  useEffect(() => {
    setCountry(localStorage.getItem(STORAGE_KEYS.COUNTRY));
  }, []);
  const displayExplanation = (country && question.variants?.[country]) || question.explanation;

  // Split explanation into one-liner + expandable detail
  const [oneLiner, detailText] = useMemo(() => splitExplanation(displayExplanation), [displayExplanation]);
  const hasExpandContent = detailText.length > 0 || !!question.hint;

  // Expand state
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = useCallback(() => setExpanded(prev => !prev), []);

  // Glass styles
  const glassProps = tc.isGlass
    ? { backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' } as const
    : {};

  return (
    <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
      {/* Main content — centered */}
      <div
        className="flex flex-col items-center text-center flex-1 justify-center"
        style={{ padding: '20px 24px', gap: 14, maxWidth: 460, margin: '0 auto', width: '100%' }}
      >
        {/* Mascot / Character */}
        <motion.div
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 15, delay: 0.05 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        >
          <div
            style={{
              width: characterId ? 160 : 120,
              height: characterId ? 160 : 120,
              borderRadius: '50%',
              background: tc.isGlass
                ? `radial-gradient(circle, ${tc.accentSoft}30 0%, transparent 70%)`
                : `radial-gradient(circle, ${unitColor}18 0%, transparent 70%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {characterId ? (
              <CharacterAvatar characterId={characterId} size={140} />
            ) : (
              <Mascot pose={pose} size={84} />
            )}
          </div>
          {characterId && characterName && (
            <span style={{ fontSize: 11, fontWeight: 800, color: tc.accentSoft, textTransform: 'uppercase', letterSpacing: 0.5 }}>{characterName}</span>
          )}
          {question.explanation && (
            <AudioButton lessonId={lessonId} cardId={question.id} text={question.explanation} color={tc.accentSoft} size={18} />
          )}
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: tc.title,
            lineHeight: 1.15,
            maxWidth: 300,
            margin: 0,
          }}
        >
          {title}
        </motion.h2>

        {/* Character line */}
        {characterLine && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            style={{
              fontSize: 13.5,
              fontWeight: 600,
              fontStyle: 'italic',
              color: tc.accentSoft,
              lineHeight: 1.4,
              maxWidth: 300,
            }}
          >
            &ldquo;{characterLine}&rdquo;
          </motion.div>
        )}

        {/* One-liner */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: characterLine ? 0.3 : 0.25, duration: 0.3 }}
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: tc.body,
            lineHeight: 1.5,
            maxWidth: 300,
          }}
        >
          <EngagingText text={oneLiner} accentColor={tc.accent} />
        </motion.div>

        {/* Diagram if present */}
        {question.diagram && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="w-full"
          >
            <DiagramDisplay html={question.diagram} cardBg={tc.expandCardBg} border={tc.expandCardBorder} />
          </motion.div>
        )}
      </div>

      {/* Expand trigger + content */}
      {hasExpandContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ maxWidth: 460, margin: '0 auto', width: '100%' }}
        >
          <button
            onClick={toggleExpand}
            aria-expanded={expanded}
            aria-label={expanded ? 'Show less detail' : 'Tell me more — expand for detail'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '6px 16px',
              width: '100%',
              cursor: 'pointer',
              color: tc.accentSoft,
              fontSize: 13,
              fontWeight: 700,
              background: 'none',
              border: 'none',
            }}
          >
            Tell me more
            <span
              style={{
                fontSize: 10,
                display: 'inline-block',
                transition: 'transform 0.3s',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              &#9660;
            </span>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ overflow: 'hidden', padding: '0 24px' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 8 }}>
                  {/* Detail text */}
                  {detailText && (
                    <div
                      style={{
                        background: tc.expandCardBg,
                        border: `1.5px solid ${tc.expandCardBorder}`,
                        borderRadius: 14,
                        padding: '12px 16px',
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: tc.body,
                        lineHeight: 1.5,
                        textAlign: 'left',
                        ...glassProps,
                      }}
                    >
                      <EngagingText text={detailText} accentColor={tc.accent} />
                    </div>
                  )}

                  {/* Hint */}
                  {question.hint && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 14px',
                        background: tc.hintBg,
                        border: `1.5px solid ${tc.hintBorder}`,
                        borderRadius: 10,
                      }}
                    >
                      <Mascot pose="thinking" size={28} className="flex-shrink-0" />
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: tc.hintText, lineHeight: 1.4 }}>
                        <EngagingText text={question.hint} accentColor={tc.accent} />
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Got it button */}
      <div style={{ marginTop: 'auto', padding: '16px 20px 28px' }}>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          onClick={onGotIt}
          aria-label="Got it — continue to next card"
          whileTap={{ y: 4, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } }}
          className="w-full"
          style={{
            padding: '15px 0',
            borderRadius: 16,
            fontSize: 16,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            background: tc.isGlass ? tc.accentSoft : unitColor,
            color: '#FFFFFF',
            boxShadow: tc.isGlass
              ? `0 4px 0 color-mix(in srgb, ${tc.accentSoft} 70%, black), 0 0 20px ${tc.accentSoft}40`
              : `0 4px 0 color-mix(in srgb, ${unitColor} 70%, black)`,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Got it!
        </motion.button>
      </div>
    </div>
  );
}
