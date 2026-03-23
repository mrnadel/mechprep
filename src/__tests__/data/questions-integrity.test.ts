import { describe, it, expect } from 'vitest';
import { allQuestions, getQuestionsByTopic } from '@/data/questions';
import { topics } from '@/data/topics';
import type { TopicId } from '@/data/types';

describe('question bank data integrity', () => {
  it('has a substantial question pool (>= 50 questions)', () => {
    expect(allQuestions.length).toBeGreaterThanOrEqual(50);
  });

  it('all question IDs are unique', () => {
    const ids = allQuestions.map((q) => q.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates).toEqual([]);
  });

  it('every question has required base fields', () => {
    for (const q of allQuestions) {
      expect(q.id).toBeTruthy();
      expect(q.type).toBeTruthy();
      expect(q.topic).toBeTruthy();
      expect(q.subtopic).toBeTruthy();
      expect(q.difficulty).toBeTruthy();
      expect(q.question).toBeTruthy();
      expect(q.explanation).toBeTruthy();
    }
  });

  it('difficulty is one of beginner, intermediate, advanced', () => {
    const valid = ['beginner', 'intermediate', 'advanced'];
    for (const q of allQuestions) {
      expect(valid).toContain(q.difficulty);
    }
  });

  it('every topic referenced by a question exists in topics.ts', () => {
    const validTopicIds = new Set(topics.map((t) => t.id));
    for (const q of allQuestions) {
      expect(validTopicIds.has(q.topic)).toBe(true);
    }
  });

  it('every topic has at least 1 question', () => {
    for (const topic of topics) {
      const count = allQuestions.filter((q) => q.topic === topic.id).length;
      expect(count).toBeGreaterThanOrEqual(1);
    }
  });

  it('has questions across all three difficulty levels', () => {
    const beginner = allQuestions.filter((q) => q.difficulty === 'beginner').length;
    const intermediate = allQuestions.filter((q) => q.difficulty === 'intermediate').length;
    const advanced = allQuestions.filter((q) => q.difficulty === 'advanced').length;

    expect(beginner).toBeGreaterThan(0);
    expect(intermediate).toBeGreaterThan(0);
    expect(advanced).toBeGreaterThan(0);
  });

  it('multiple-choice questions have options and correctAnswer', () => {
    const mcQuestions = allQuestions.filter((q) => q.type === 'multiple-choice');
    for (const q of mcQuestions) {
      const mc = q as any;
      expect(mc.options).toBeDefined();
      expect(mc.options.length).toBeGreaterThanOrEqual(2);
      expect(mc.correctAnswer).toBeDefined();
      // correctAnswer should reference a valid option ID
      const optionIds = mc.options.map((o: any) => o.id);
      expect(optionIds).toContain(mc.correctAnswer);
    }
  });

  it('estimation questions have acceptableRange', () => {
    const estimationQuestions = allQuestions.filter((q) => q.type === 'estimation');
    for (const q of estimationQuestions) {
      const est = q as any;
      expect(est.acceptableRange).toBeDefined();
      expect(est.acceptableRange.low).toBeDefined();
      expect(est.acceptableRange.high).toBeDefined();
      expect(est.acceptableRange.low).toBeLessThan(est.acceptableRange.high);
    }
  });
});

describe('getQuestionsByTopic()', () => {
  it('returns questions filtered by topic', () => {
    const thermoQuestions = getQuestionsByTopic('thermodynamics');
    expect(thermoQuestions.length).toBeGreaterThan(0);
    for (const q of thermoQuestions) {
      expect(q.topic).toBe('thermodynamics');
    }
  });

  it('returns empty array for unknown topic', () => {
    const questions = getQuestionsByTopic('nonexistent-topic');
    expect(questions).toEqual([]);
  });

  it('all questions in the result match the requested topic', () => {
    for (const topic of topics) {
      const questions = getQuestionsByTopic(topic.id);
      for (const q of questions) {
        expect(q.topic).toBe(topic.id);
      }
    }
  });
});

describe('topics data integrity', () => {
  it('has exactly 11 topics', () => {
    expect(topics).toHaveLength(11);
  });

  it('all topic IDs are unique', () => {
    const ids = topics.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every topic has required fields', () => {
    for (const t of topics) {
      expect(t.id).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.description).toBeTruthy();
      expect(t.icon).toBeTruthy();
      expect(t.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(['critical', 'high', 'medium', 'low']).toContain(t.interviewRelevance);
      expect(t.subtopics.length).toBeGreaterThan(0);
    }
  });

  it('has at least 4 "critical" interview relevance topics', () => {
    const critical = topics.filter((t) => t.interviewRelevance === 'critical');
    expect(critical.length).toBeGreaterThanOrEqual(4);
  });
});
