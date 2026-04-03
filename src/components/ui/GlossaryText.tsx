'use client';

import type { ReactNode } from 'react';
import { useGlossary } from '@/components/lesson/GlossaryContext';
import { GlossaryTerm } from '@/components/ui/GlossaryTerm';

export function GlossaryText({ text }: { text: string }): ReactNode {
  const { matcher, sectionIndex, accentColor, openPopover } = useGlossary();

  if (!text) return null;
  if (!matcher) return <>{text}</>;

  const matches = matcher.findTerms(text, sectionIndex);
  if (matches.length === 0) return <>{text}</>;

  const segments: ReactNode[] = [];
  let cursor = 0;

  for (const match of matches) {
    if (match.start > cursor) {
      segments.push(text.slice(cursor, match.start));
    }

    const matchedText = text.slice(match.start, match.end);
    segments.push(
      <GlossaryTerm
        key={`${match.term}-${match.start}`}
        accentColor={accentColor}
        onTap={(rect) => openPopover(match, rect)}
      >
        {matchedText}
      </GlossaryTerm>,
    );

    cursor = match.end;
  }

  if (cursor < text.length) {
    segments.push(text.slice(cursor));
  }

  return <>{segments}</>;
}
