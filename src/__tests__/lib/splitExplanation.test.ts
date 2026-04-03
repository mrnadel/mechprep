import { describe, it, expect } from 'vitest';
import { splitExplanation } from '@/components/lesson/TeachingCard';

describe('splitExplanation', () => {
  it('splits at first sentence boundary', () => {
    const [first, rest] = splitExplanation(
      'A force has both magnitude and direction. You need to break it into components.'
    );
    expect(first).toBe('A force has both magnitude and direction.');
    expect(rest).toBe('You need to break it into components.');
  });

  it('returns full text as one-liner when no sentence boundary', () => {
    const [first, rest] = splitExplanation('Forces are vectors');
    expect(first).toBe('Forces are vectors');
    expect(rest).toBe('');
  });

  it('handles exclamation marks as sentence boundary', () => {
    const [first, rest] = splitExplanation(
      'Welcome to space! Everything you see is part of the universe.'
    );
    expect(first).toBe('Welcome to space!');
    expect(rest).toBe('Everything you see is part of the universe.');
  });

  it('handles question marks as sentence boundary', () => {
    const [first, rest] = splitExplanation(
      'Did you know Earth spins at 1,600 km/h? That makes you a space traveler.'
    );
    expect(first).toBe('Did you know Earth spins at 1,600 km/h?');
    expect(rest).toBe('That makes you a space traveler.');
  });

  it('handles decimal points in numbers (splits at first period-space)', () => {
    const [first, rest] = splitExplanation(
      'The value is 3.14 radians. That equals half a turn.'
    );
    expect(first).toBe('The value is 3.14 radians.');
    expect(rest).toBe('That equals half a turn.');
  });

  it('returns empty string detail for single-sentence text ending in period', () => {
    const [first, rest] = splitExplanation('A force is a vector.');
    expect(first).toBe('A force is a vector.');
    expect(rest).toBe('');
  });
});
