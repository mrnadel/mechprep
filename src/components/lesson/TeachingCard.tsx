'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import { MoneyText } from '@/components/ui/MoneyText';
import { Mascot, type MascotPose } from '@/components/ui/Mascot';

const DiagramDisplay = memo(function DiagramDisplay({ html }: { html: string }) {
  const sanitised = html
    .replace(/(<svg[^>]*)\sheight="auto"/gi, '$1')
    .replace(/(<svg[^>]*)\swidth="auto"/gi, '$1');
  return (
    <div
      className="w-full flex items-center justify-center overflow-hidden"
      style={{
        borderRadius: 14,
        background: 'white',
        border: '2px solid #E5E5E5',
        padding: 10,
        maxWidth: 400,
        margin: '0 auto',
      }}
      dangerouslySetInnerHTML={{ __html: sanitised }}
    />
  );
});

// Mascot poses to cycle through for teaching cards
const TEACHING_POSES: MascotPose[] = [
  'excited', 'thinking', 'proud', 'winking', 'laughing', 'neutral', 'explorer',
];

// Pick a stable pose based on question ID
function getPoseForQuestion(questionId: string): MascotPose {
  let hash = 0;
  for (let i = 0; i < questionId.length; i++) {
    hash = ((hash << 5) - hash + questionId.charCodeAt(i)) | 0;
  }
  return TEACHING_POSES[Math.abs(hash) % TEACHING_POSES.length];
}

interface TeachingCardProps {
  question: CourseQuestion;
  unitColor: string;
  onGotIt: () => void;
}

export default function TeachingCard({ question, unitColor, onGotIt }: TeachingCardProps) {
  // Strip leading emoji from title (we use mascot instead now)
  const titleMatch = question.question.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)\s*/u);
  const title = titleMatch ? question.question.slice(titleMatch[0].length) : question.question;

  const pose = useMemo(() => getPoseForQuestion(question.id), [question.id]);

  return (
    <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
      <div className="flex flex-col" style={{ gap: 20, paddingTop: 12 }}>
        {/* Mascot with speech bubble */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            maxWidth: 460,
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Mascot */}
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15, delay: 0.05 }}
            style={{ flexShrink: 0 }}
          >
            <Mascot pose={pose} size={72} />
          </motion.div>

          {/* Speech bubble */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            style={{
              position: 'relative',
              background: 'white',
              border: '2px solid #E5E7EB',
              borderRadius: 18,
              padding: '14px 18px',
              flex: 1,
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            {/* Triangle pointer */}
            <div
              style={{
                position: 'absolute',
                left: -9,
                top: 18,
                width: 14,
                height: 14,
                background: 'white',
                border: '2px solid #E5E7EB',
                borderRight: 'none',
                borderBottom: 'none',
                transform: 'rotate(-45deg)',
              }}
            />

            {/* Title */}
            <h2
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: '#2D2D2D',
                lineHeight: 1.3,
                margin: 0,
                marginBottom: 8,
              }}
            >
              {title}
            </h2>

            {/* Explanation */}
            <div
              style={{
                fontSize: 14.5,
                fontWeight: 500,
                color: '#555',
                lineHeight: 1.55,
              }}
            >
              <MoneyText text={question.explanation} />
            </div>
          </motion.div>
        </motion.div>

        {/* Diagram if present */}
        {question.diagram && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="w-full"
          >
            <DiagramDisplay html={question.diagram} />
          </motion.div>
        )}

        {/* Hint callout (kept as separate element below bubble) */}
        {question.hint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{
              width: '100%',
              maxWidth: 460,
              margin: '0 auto',
              padding: '12px 16px',
              borderRadius: 14,
              background: `${unitColor}0A`,
              border: `1.5px solid ${unitColor}20`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <Mascot pose="thinking" size={28} className="flex-shrink-0 mt-0.5" />
              <p style={{ fontSize: 13, fontWeight: 600, color: '#666', lineHeight: 1.5, margin: 0 }}>
                <MoneyText text={question.hint} />
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Got it button */}
      <div style={{ marginTop: 'auto', paddingTop: 24 }}>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          onClick={onGotIt}
          whileTap={{ y: 4, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } }}
          className="w-full"
          style={{
            padding: '15px 0',
            borderRadius: 16,
            fontSize: 16,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            background: unitColor,
            color: '#FFFFFF',
            boxShadow: `0 4px 0 color-mix(in srgb, ${unitColor} 70%, black)`,
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
