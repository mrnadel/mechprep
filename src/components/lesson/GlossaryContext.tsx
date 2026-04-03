'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { GlossaryMatcher } from '@/lib/glossary-matcher';
import { getGlossary } from '@/data/course/glossary';
import { GlossaryPopover } from '@/components/ui/GlossaryPopover';
import { useCourseStore } from '@/store/useCourseStore';

interface GlossaryContextValue {
  matcher: GlossaryMatcher | null;
  sectionIndex: number | undefined;
  accentColor: string;
  openPopover: (entry: { term: string; definition: string; relatedTerms?: string[] }, rect: DOMRect) => void;
}

const Ctx = createContext<GlossaryContextValue>({
  matcher: null,
  sectionIndex: undefined,
  accentColor: '#3B82F6',
  openPopover: () => {},
});

export function useGlossary() {
  return useContext(Ctx);
}

interface GlossaryProviderProps {
  sectionIndex: number | undefined;
  accentColor: string;
  children: ReactNode;
}

export function GlossaryProvider({ sectionIndex, accentColor, children }: GlossaryProviderProps) {
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const [matcher, setMatcher] = useState<GlossaryMatcher | null>(null);
  const [popover, setPopover] = useState<{
    entry: { term: string; definition: string; relatedTerms?: string[] };
    rect: DOMRect;
  } | null>(null);

  // Load glossary when profession changes
  useEffect(() => {
    let cancelled = false;
    getGlossary(activeProfession).then(entries => {
      if (cancelled) return;
      setMatcher(entries ? new GlossaryMatcher(entries) : null);
    });
    return () => { cancelled = true; };
  }, [activeProfession]);

  const openPopover = useCallback(
    (entry: { term: string; definition: string; relatedTerms?: string[] }, rect: DOMRect) => {
      setPopover({ entry, rect });
    },
    [],
  );

  const closePopover = useCallback(() => setPopover(null), []);

  const handleRelatedTermClick = useCallback(
    (term: string) => {
      if (!matcher) return;
      const entry = matcher.lookupTerm(term);
      if (!entry) return;
      setPopover(prev => prev ? { entry, rect: prev.rect } : null);
    },
    [matcher],
  );

  return (
    <Ctx.Provider value={{ matcher, sectionIndex, accentColor, openPopover }}>
      {children}
      {popover && (
        <GlossaryPopover
          entry={popover.entry}
          anchorRect={popover.rect}
          accentColor={accentColor}
          onClose={closePopover}
          onRelatedTermClick={handleRelatedTermClick}
        />
      )}
    </Ctx.Provider>
  );
}
