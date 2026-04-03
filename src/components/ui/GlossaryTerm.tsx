'use client';

import { useCallback, useRef } from 'react';

interface GlossaryTermProps {
  children: React.ReactNode;
  accentColor: string;
  isActive?: boolean;
  onTap: (rect: DOMRect) => void;
}

export function GlossaryTerm({ children, accentColor, isActive, onTap }: GlossaryTermProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleClick = useCallback(() => {
    if (ref.current) {
      onTap(ref.current.getBoundingClientRect());
    }
  }, [onTap]);

  return (
    <span
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
      aria-haspopup="dialog"
      className="glossary-term"
      style={{
        display: 'inline',
        padding: 0,
        margin: 0,
        background: 'none',
        font: 'inherit',
        lineHeight: 'inherit',
        cursor: 'pointer',
        borderBottom: `1.5px dotted ${accentColor}`,
        color: `color-mix(in oklch, currentColor 65%, ${accentColor})`,
        fontWeight: isActive ? 700 : 'inherit',
        transition: 'color 0.15s, border-color 0.15s, font-weight 0.15s',
      }}
    >
      {children}
    </span>
  );
}
