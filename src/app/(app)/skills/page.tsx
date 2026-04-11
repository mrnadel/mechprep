'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { useIsDark } from '@/store/useThemeStore';
import { courseMeta } from '@/data/course/course-meta';
import { topics } from '@/data/topics';
import { TrendingUp, AlertTriangle, Trophy, Share2, Download, Linkedin } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { useStore } from '@/store/useStore';
import { getProfession } from '@/data/professions';
import { shareCertificate, downloadCertificate, getLinkedInShareUrl } from '@/lib/certificate';

/* ── helpers ── */

type Mastery = 'untouched' | 'weak' | 'growing' | 'strong' | 'mastered';

const masteryMeta: Record<Mastery, { label: string; color: string; bg: string }> = {
  untouched: { label: 'Not started', color: '#C0C0C0', bg: '#F5F5F5' },
  weak:      { label: 'Needs work',  color: '#EF4444', bg: '#FEF2F2' },
  growing:   { label: 'Growing',     color: '#F59E0B', bg: '#FFFBEB' },
  strong:    { label: 'Strong',      color: '#3B82F6', bg: '#EFF6FF' },
  mastered:  { label: 'Mastered',    color: '#10B981', bg: '#ECFDF5' },
};

function scoreToMastery(score: number): Mastery {
  if (score >= 75) return 'mastered';
  if (score >= 50) return 'strong';
  if (score >= 25) return 'growing';
  if (score > 0) return 'weak';
  return 'untouched';
}

/* ── page ── */

export default function SkillMapPage() {
  const isDark = useIsDark();
  const completedLessons = useCourseStore((s) => s.progress.completedLessons);
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const displayName = useStore((s) => s.progress.displayName);
  const profession = activeProfession ? getProfession(activeProfession) : null;

  // Derive topic stats directly from completed course lessons
  const analyzed = useMemo(() => {
    // Map each topic to stats from course units
    return topics.map((topic) => {
      // Find all course units that map to this topic
      const matchingUnits = courseMeta.filter((u) => u.topicId === topic.id);

      let totalQuestions = 0;
      let totalCorrect = 0;
      let totalLessons = 0;
      let completedLessonCount = 0;

      for (const unit of matchingUnits) {
        for (const lesson of unit.lessons) {
          totalLessons++;
          const lp = completedLessons[lesson.id];
          if (lp) {
            completedLessonCount++;
            const qCount = lesson.questions.length;
            totalQuestions += qCount;
            // Use bestAccuracy to estimate correct answers
            totalCorrect += Math.round((lp.bestAccuracy / 100) * qCount);
          }
        }
      }

      const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
      // Score combines accuracy with coverage (how many lessons done)
      const coverage = totalLessons > 0 ? completedLessonCount / totalLessons : 0;
      const score = totalQuestions > 0 ? Math.round(accuracy * coverage) : 0;
      const level = scoreToMastery(score);

      // Per-subtopic: distribute proportionally across subtopics
      const subs = topic.subtopics.map((sub, i) => {
        if (totalQuestions === 0) {
          return { ...sub, attempted: 0, correct: 0, accuracy: 0, score: 0, level: 'untouched' as Mastery };
        }
        // Distribute questions roughly evenly across subtopics
        const n = topic.subtopics.length;
        const subAttempted = Math.floor(totalQuestions / n) + (i < totalQuestions % n ? 1 : 0);
        const subCorrect = Math.floor(totalCorrect / n) + (i < totalCorrect % n ? 1 : 0);
        const subAcc = subAttempted > 0 ? Math.round((subCorrect / subAttempted) * 100) : 0;
        const subScore = Math.round(subAcc * coverage);
        return { ...sub, attempted: subAttempted, correct: subCorrect, accuracy: subAcc, score: subScore, level: scoreToMastery(subScore) };
      });

      return {
        ...topic,
        attempted: totalQuestions,
        correct: totalCorrect,
        accuracy,
        score,
        level,
        completedLessonCount,
        totalLessons,
        subs,
      };
    });
  }, [completedLessons]);

  // Overall readiness score (weighted by interview relevance)
  const readiness = useMemo(() => {
    const weights = { critical: 3, high: 2, medium: 1 };
    let totalWeight = 0;
    let weightedScore = 0;
    for (const t of analyzed) {
      const w = weights[t.interviewRelevance as keyof typeof weights] ?? 1;
      totalWeight += w;
      weightedScore += t.score * w;
    }
    return totalWeight > 0 ? Math.round(weightedScore / totalWeight) : 0;
  }, [analyzed]);

  const router = useRouter();

  const strengths = analyzed.filter((t) => t.level === 'mastered' || t.level === 'strong');
  const weaknesses = analyzed.filter((t) => t.level === 'weak').sort((a, b) => a.score - b.score);
  const untouched = analyzed.filter((t) => t.level === 'untouched');
  const growing = analyzed.filter((t) => t.level === 'growing');

  const ringColor =
    readiness >= 70 ? '#10B981' : readiness >= 40 ? '#F59E0B' : readiness >= 1 ? '#EF4444' : '#E5E5E5';
  const ringMessage =
    readiness >= 70
      ? 'Looking great for interviews!'
      : readiness >= 40
        ? 'Getting there — keep practicing!'
        : readiness >= 1
          ? 'Keep going — every lesson counts'
          : 'Start lessons to build your skills';

  return (
    <div className="bg-[#FAFAFA]" style={{ minHeight: '100vh' }}>
      <PageHeader title="Interview Readiness" />

      <div className="px-4 sm:px-5 pt-5 pb-10 max-w-[600px] mx-auto">
        {/* ── Readiness Score Ring ── */}
        <motion.div
          className="flex flex-col items-center bg-white rounded-2xl border-2 border-[#E5E5E5] mb-5 px-4 sm:px-5 pt-7 pb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 16 }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke={isDark ? '#334155' : '#F0F0F0'} strokeWidth="10" />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={ringColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - readiness / 100)}`}
                transform="rotate(-90 60 60)"
                initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - readiness / 100) }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <motion.span
                style={{ fontSize: 32, fontWeight: 900, color: ringColor, lineHeight: 1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {readiness}
              </motion.span>
              <span style={{ fontSize: 11, fontWeight: 700, color: isDark ? '#64748B' : '#AFAFAF', marginTop: 2 }}>
                / 100
              </span>
            </div>
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, color: isDark ? '#E2E8F0' : '#3C3C3C', textAlign: 'center' }}>
            {ringMessage}
          </p>
          {/* Quick counts */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-3.5 w-full max-w-xs mx-auto">
            {[
              { n: strengths.length, label: 'Strong', color: '#10B981' },
              { n: growing.length, label: 'Growing', color: '#F59E0B' },
              { n: weaknesses.length, label: 'Weak', color: '#EF4444' },
              { n: untouched.length, label: 'New', color: '#C0C0C0' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span style={{ fontSize: 20, fontWeight: 900, color: s.color, lineHeight: 1 }}>
                  {s.n}
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: isDark ? '#64748B' : '#AFAFAF', marginTop: 3 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          {/* Certificate action buttons */}
          {readiness > 0 && (() => {
            const certParams = {
              name: displayName || 'Learner',
              profession: profession?.name || 'Course',
              professionIcon: profession?.icon || '\uD83C\uDF93',
              color: profession?.color || '#6366f1',
              score: readiness,
            };
            return (
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => shareCertificate(certParams)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                  style={{
                    background: `${ringColor}15`,
                    color: ringColor,
                    border: `1.5px solid ${ringColor}30`,
                  }}
                >
                  <Share2 style={{ width: 14, height: 14 }} /> Share
                </button>
                <button
                  onClick={() => {
                    const url = getLinkedInShareUrl(certParams, window.location.origin);
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors bg-[#0A66C2] text-white hover:bg-[#004182]"
                >
                  <Linkedin style={{ width: 14, height: 14 }} /> LinkedIn
                </button>
                <button
                  onClick={() => downloadCertificate(certParams)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                  style={{
                    background: `${ringColor}15`,
                    color: ringColor,
                    border: `1.5px solid ${ringColor}30`,
                  }}
                >
                  <Download style={{ width: 14, height: 14 }} /> Download
                </button>
              </div>
            );
          })()}
        </motion.div>

        {/* ── Weaknesses (priority) ── */}
        {weaknesses.length > 0 && (
          <Section
            icon={<AlertTriangle style={{ width: 16, height: 16, color: '#EF4444' }} />}
            title="Focus Areas"
            subtitle="These need the most work for interviews"
            color="#EF4444"
            delay={0.1}
          >
            {weaknesses.map((t) => (
              <TopicRow key={t.id} topic={t} onPractice={(topicId) => router.push(`/practice?topic=${topicId}`)} />
            ))}
          </Section>
        )}

        {/* ── Growing ── */}
        {growing.length > 0 && (
          <Section
            icon={<TrendingUp style={{ width: 16, height: 16, color: '#F59E0B' }} />}
            title="Almost There"
            subtitle="A few more lessons to lock these in"
            color="#F59E0B"
            delay={0.15}
          >
            {growing.map((t) => (
              <TopicRow key={t.id} topic={t} onPractice={(topicId) => router.push(`/practice?topic=${topicId}`)} />
            ))}
          </Section>
        )}

        {/* ── Strengths ── */}
        {strengths.length > 0 && (
          <Section
            icon={<Trophy style={{ width: 16, height: 16, color: '#10B981' }} />}
            title="Your Strengths"
            subtitle="You'd do well if asked about these"
            color="#10B981"
            delay={0.2}
          >
            {strengths.map((t) => (
              <TopicRow key={t.id} topic={t} compact onPractice={(topicId) => router.push(`/practice?topic=${topicId}`)} />
            ))}
          </Section>
        )}

        {/* ── Not started ── */}
        {untouched.length > 0 && (
          <Section
            icon={<span style={{ fontSize: 14 }}>🆕</span>}
            title="Unexplored"
            subtitle="Complete lessons to discover where you stand"
            color="#C0C0C0"
            delay={0.25}
          >
            {untouched.map((t) => (
              <TopicRow key={t.id} topic={t} compact onPractice={(topicId) => router.push(`/practice?topic=${topicId}`)} />
            ))}
          </Section>
        )}

      </div>
    </div>
  );
}

/* ── Section wrapper ── */

function Section({
  icon,
  title,
  subtitle,
  color,
  delay,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  delay: number;
  children: React.ReactNode;
}) {
  const isDark = useIsDark();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      style={{ marginBottom: 20 }}
    >
      <div className="flex items-center" style={{ gap: 8, marginBottom: 4, padding: '0 2px' }}>
        {icon}
        <span style={{ fontSize: 15, fontWeight: 800, color }}>{title}</span>
      </div>
      <p style={{ fontSize: 12, fontWeight: 600, color: isDark ? '#64748B' : '#AFAFAF', marginBottom: 10, padding: '0 2px' }}>
        {subtitle}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
    </motion.div>
  );
}

/* ── Topic Row ── */

interface TopicRowProps {
  topic: {
    id: string;
    name: string;
    icon: string;
    color: string;
    interviewRelevance: string;
    level: Mastery;
    score: number;
    accuracy: number;
    attempted: number;
    completedLessonCount: number;
    totalLessons: number;
    subs: { id: string; name: string; level: Mastery; score: number; accuracy: number; attempted: number }[];
  };
  compact?: boolean;
  onPractice?: (topicId: string) => void;
}

function TopicRow({ topic, compact, onPractice }: TopicRowProps) {
  const isDark = useIsDark();
  const meta = masteryMeta[topic.level];
  const relevanceLabel =
    topic.interviewRelevance === 'critical'
      ? '🔴 Critical'
      : topic.interviewRelevance === 'high'
        ? '🟡 High'
        : '⚪ Medium';

  return (
    <button
      onClick={() => onPractice?.(topic.id)}
      className="w-full text-left transition-transform active:scale-[0.98]"
      style={{
        background: 'white',
        borderRadius: 16,
        border: `2px solid ${meta.color}25`,
        padding: compact ? '14px 16px' : '16px 16px 14px',
        cursor: onPractice ? 'pointer' : 'default',
      }}
    >
      {/* Header */}
      <div className="flex items-center" style={{ gap: 12 }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: meta.bg,
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          {topic.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="flex items-center justify-between" style={{ gap: 8 }}>
            <h3 className="text-sm sm:text-[15px] font-extrabold text-[#3C3C3C] dark:text-surface-200 leading-tight truncate">
              {topic.name}
            </h3>
            {topic.attempted > 0 && (
              <span style={{ fontSize: 20, fontWeight: 900, color: meta.color, flexShrink: 0 }}>
                {topic.score}%
              </span>
            )}
            {onPractice && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#7C3AED',
                  background: '#F5F3FF',
                  padding: '2px 8px',
                  borderRadius: 8,
                  marginLeft: 8,
                  flexShrink: 0,
                }}
              >
                Practice &rarr;
              </span>
            )}
          </div>
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mt-1">
            <span
              className="text-[11px] font-bold px-1.5 rounded-md shrink-0"
              style={{ color: meta.color, background: meta.bg }}
            >
              {meta.label}
            </span>
            <span className="text-[11px] font-semibold text-[#CFCFCF] dark:text-surface-600 shrink-0">{relevanceLabel}</span>
            {topic.totalLessons > 0 && (
              <span className="text-[11px] font-semibold text-[#CFCFCF] dark:text-surface-600 shrink-0">
                {topic.completedLessonCount}/{topic.totalLessons} lessons
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Subtopic breakdown (only for non-compact) */}
      {!compact && topic.subs.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {topic.subs.map((sub) => {
            const sm = masteryMeta[sub.level];
            return (
              <div key={sub.id} className="flex items-center" style={{ gap: 8 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: sm.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  className="truncate"
                  style={{
                    flex: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    color: sub.attempted > 0 ? (isDark ? '#E2E8F0' : '#3C3C3C') : (isDark ? '#64748B' : '#AFAFAF'),
                    minWidth: 0,
                  }}
                >
                  {sub.name}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: sm.color, minWidth: 30, textAlign: 'right' }}>
                  {sub.attempted > 0 ? `${sub.accuracy}%` : '—'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </button>
  );
}
