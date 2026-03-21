'use client';

import { useState, useMemo } from 'react';
import { allQuestions } from '@/data/questions';
import { topics } from '@/data/topics';
import { course } from '@/data/course';
import type { Question, TopicId, Difficulty } from '@/data/types';

// --------------- Helpers ---------------

function getCorrectAnswer(q: Question): string {
  switch (q.type) {
    case 'multiple-choice':
    case 'confidence-rated':
    case 'what-fails-first':
      return q.correctAnswer;
    case 'two-choice-tradeoff':
      return `Preferred: ${q.preferredAnswer}`;
    case 'multi-select':
      return q.correctAnswers.join(', ');
    case 'ranking':
      return q.correctOrder.join(' > ');
    case 'scenario':
      return q.keyTakeaway;
    case 'free-text':
    case 'explanation':
      return q.sampleAnswer.slice(0, 120) + (q.sampleAnswer.length > 120 ? '...' : '');
    case 'spot-the-flaw':
      return q.correctedStatement;
    case 'estimation':
      return `${q.acceptableRange.bestEstimate} ${q.acceptableRange.unit} (range: ${q.acceptableRange.low}-${q.acceptableRange.high})`;
    case 'design-decision':
      return `Best: ${q.bestOption}`;
    case 'material-selection':
      return `Best: ${q.bestChoice}`;
    default:
      return '(see details)';
  }
}

function truncate(s: string, len: number): string {
  return s.length > len ? s.slice(0, len) + '...' : s;
}

const topicNameMap: Record<string, string> = {};
for (const t of topics) {
  topicNameMap[t.id] = t.name;
}

// --------------- Styles ---------------

const filterBarStyle: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  marginBottom: 16,
  alignItems: 'center',
  flexWrap: 'wrap',
};

const selectStyle: React.CSSProperties = {
  padding: '8px 12px',
  fontSize: 13,
  border: '1.5px solid #E5E5E5',
  borderRadius: 8,
  background: 'white',
  cursor: 'pointer',
  minWidth: 0,
  flex: '1 1 160px',
};

const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  fontSize: 11,
  fontWeight: 700,
  padding: '2px 8px',
  borderRadius: 6,
  background: bg,
  color,
  whiteSpace: 'nowrap',
});

const difficultyColors: Record<Difficulty, { bg: string; fg: string }> = {
  beginner: { bg: '#E8F5E9', fg: '#2E7D32' },
  intermediate: { bg: '#FFF8E1', fg: '#F57F17' },
  advanced: { bg: '#FFEBEE', fg: '#C62828' },
};

const detailLabelStyle: React.CSSProperties = {
  fontWeight: 700,
  color: '#444',
  marginBottom: 2,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
};

const sectionHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '14px 16px',
  cursor: 'pointer',
  borderRadius: 8,
  border: '1.5px solid #E5E5E5',
  marginBottom: 8,
  background: 'white',
  transition: 'background 0.1s',
  gap: 8,
};

const lessonRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 16px 10px 16px',
  cursor: 'pointer',
  borderBottom: '1px solid #F0F0F0',
  fontSize: 13,
  transition: 'background 0.1s',
  gap: 8,
};

const courseQuestionRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  padding: '8px 16px 8px 24px',
  borderBottom: '1px solid #F5F5F5',
  fontSize: 12,
  color: '#555',
  flexWrap: 'wrap',
  alignItems: 'center',
};

const countBadge: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  padding: '4px 12px',
  borderRadius: 20,
  background: '#F0F0F0',
  color: '#555',
  marginBottom: 24,
  display: 'inline-block',
};

// --------------- Question Card Styles ---------------

const cardStyle = (isExpanded: boolean): React.CSSProperties => ({
  background: 'white',
  borderRadius: 10,
  border: '1.5px solid #E5E5E5',
  padding: 12,
  marginBottom: 8,
  cursor: 'pointer',
  transition: 'background 0.1s',
  ...(isExpanded ? { background: '#F8FAFF', borderColor: '#C5D5F6' } : {}),
});

const cardTopRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexWrap: 'wrap',
  marginBottom: 6,
};

const cardQuestionText: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.5,
  color: '#222',
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
};

const cardExpandedSection: React.CSSProperties = {
  marginTop: 12,
  paddingTop: 12,
  borderTop: '1px solid #E5E5E5',
  display: 'grid',
  gap: 14,
  fontSize: 13,
  lineHeight: 1.6,
};

// --------------- Component ---------------

export default function CourseEditor() {
  const [view, setView] = useState<'questions' | 'lessons'>('questions');

  return (
    <div>
      <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
        <button
          onClick={() => setView('questions')}
          style={{
            flex: 1, padding: '10px 0', fontSize: 13, fontWeight: 700,
            border: '1.5px solid #E5E5E5', borderRadius: '8px 0 0 8px',
            background: view === 'questions' ? '#3B82F6' : 'white',
            color: view === 'questions' ? 'white' : '#333',
            cursor: 'pointer', transition: 'background 0.15s', textAlign: 'center',
          }}
        >
          Practice Questions
        </button>
        <button
          onClick={() => setView('lessons')}
          style={{
            flex: 1, padding: '10px 0', fontSize: 13, fontWeight: 700,
            border: '1.5px solid #E5E5E5', borderLeft: 'none', borderRadius: '0 8px 8px 0',
            background: view === 'lessons' ? '#3B82F6' : 'white',
            color: view === 'lessons' ? 'white' : '#333',
            cursor: 'pointer', transition: 'background 0.15s', textAlign: 'center',
          }}
        >
          Course Lessons
        </button>
      </div>

      {view === 'questions' ? <QuestionsTab /> : <LessonsTab />}
    </div>
  );
}

// --------------- Practice Questions Tab ---------------

function QuestionsTab() {
  const [topicFilter, setTopicFilter] = useState<TopicId | ''>('');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | ''>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = allQuestions;
    if (topicFilter) result = result.filter((q) => q.topic === topicFilter);
    if (difficultyFilter) result = result.filter((q) => q.difficulty === difficultyFilter);
    return result;
  }, [topicFilter, difficultyFilter]);

  return (
    <>
      <div style={filterBarStyle}>
        <select
          style={selectStyle}
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value as TopicId | '')}
        >
          <option value="">All Topics</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <select
          style={selectStyle}
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value as Difficulty | '')}
        >
          <option value="">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div style={countBadge}>{filtered.length} questions</div>

      <div>
        {filtered.map((q) => {
          const isExpanded = expandedId === q.id;
          const dc = difficultyColors[q.difficulty];
          return (
            <QuestionCard
              key={q.id}
              q={q}
              isExpanded={isExpanded}
              dc={dc}
              onToggle={() => setExpandedId(isExpanded ? null : q.id)}
            />
          );
        })}
      </div>
    </>
  );
}

function QuestionCard({
  q,
  isExpanded,
  dc,
  onToggle,
}: {
  q: Question;
  isExpanded: boolean;
  dc: { bg: string; fg: string };
  onToggle: () => void;
}) {
  return (
    <div style={cardStyle(isExpanded)} onClick={onToggle}>
      <div style={cardTopRow}>
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#999' }}>{q.id}</span>
        <span style={badgeStyle(dc.bg, dc.fg)}>{q.difficulty}</span>
        <span style={badgeStyle('#E3F2FD', '#1565C0')}>{q.type}</span>
      </div>
      <div style={cardQuestionText}>
        {isExpanded ? q.question : truncate(q.question, 100)}
      </div>
      {isExpanded && (
        <div style={cardExpandedSection}>
          <div>
            <div style={detailLabelStyle}>Explanation</div>
            <div style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{q.explanation}</div>
          </div>
          <div>
            <div style={detailLabelStyle}>Interview Insight</div>
            <div style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{q.interviewInsight}</div>
          </div>
          <div>
            <div style={detailLabelStyle}>Correct Answer</div>
            <div style={{ fontFamily: 'monospace', fontSize: 13, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
              {getCorrectAnswer(q)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --------------- Course Lessons Tab ---------------

function LessonsTab() {
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const totalLessons = useMemo(
    () => course.reduce((s, u) => s + u.lessons.length, 0),
    []
  );
  const totalQuestions = useMemo(
    () =>
      course.reduce(
        (s, u) => s + u.lessons.reduce((ls, l) => ls + l.questions.length, 0),
        0
      ),
    []
  );

  return (
    <>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <span style={countBadge}>{course.length} units</span>
        <span style={countBadge}>{totalLessons} lessons</span>
        <span style={countBadge}>{totalQuestions} questions</span>
      </div>

      {course.map((unit) => {
        const isUnitExpanded = expandedUnit === unit.id;
        const unitQuestions = unit.lessons.reduce((s, l) => s + l.questions.length, 0);

        return (
          <div key={unit.id} style={{ marginBottom: 4 }}>
            <div
              style={{
                ...sectionHeaderStyle,
                background: isUnitExpanded ? '#F8FAFF' : 'white',
              }}
              onClick={() => setExpandedUnit(isUnitExpanded ? null : unit.id)}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <span style={{ fontWeight: 800, fontSize: 15, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{unit.title}</span>
                <span style={{ color: '#999', fontSize: 13, marginLeft: 12, whiteSpace: 'nowrap' }}>
                  {unit.lessons.length} lessons &middot; {unitQuestions} questions
                </span>
              </div>
              <span style={{ fontSize: 16, color: '#999', flexShrink: 0 }}>{isUnitExpanded ? '\u25B2' : '\u25BC'}</span>
            </div>

            {isUnitExpanded &&
              unit.lessons.map((lesson) => {
                const isLessonExpanded = expandedLesson === lesson.id;

                return (
                  <div key={lesson.id}>
                    <div
                      style={{
                        ...lessonRowStyle,
                        background: isLessonExpanded ? '#F5F7FF' : 'transparent',
                      }}
                      onClick={() => setExpandedLesson(isLessonExpanded ? null : lesson.id)}
                    >
                      <div style={{ minWidth: 0, flex: 1, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#999', marginRight: 10 }}>
                          {lesson.id}
                        </span>
                        <span style={{ fontWeight: 600 }}>{lesson.title}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                        <span style={badgeStyle('#F0F0F0', '#555')}>
                          {lesson.questions.length} q
                        </span>
                        <span style={{ fontSize: 14, color: '#999' }}>
                          {isLessonExpanded ? '\u25B2' : '\u25BC'}
                        </span>
                      </div>
                    </div>

                    {isLessonExpanded &&
                      lesson.questions.map((cq) => (
                        <div key={cq.id} style={courseQuestionRowStyle}>
                          <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#999', flexShrink: 0 }}>
                            {cq.id}
                          </span>
                          <span style={badgeStyle('#E3F2FD', '#1565C0')}>{cq.type}</span>
                          <span style={{ wordBreak: 'break-word', overflowWrap: 'anywhere', minWidth: 0 }}>
                            {truncate(cq.question, 60)}
                          </span>
                        </div>
                      ))}
                  </div>
                );
              })}
          </div>
        );
      })}
    </>
  );
}
