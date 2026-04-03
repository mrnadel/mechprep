'use client';

import { useCallback, useRef } from 'react';

interface GlossaryTermProps {
  children: React.ReactNode;
  accentColor: string;
  onTap: (rect: DOMRect) => void;
}

export function GlossaryTerm({ children, accentColor, onTap }: GlossaryTermProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    if (ref.current) {
      onTap(ref.current.getBoundingClientRect());
    }
  }, [onTap]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className="glossary-term"
      style={{
        display: 'inline',
        padding: 0,
        margin: 0,
        background: 'none',
        font: 'inherit',
        lineHeight: 'inherit',
        cursor: 'pointer',
        borderBottom: `1.5px dotted ${accentColor}40`,
        color: `color-mix(in oklch, currentColor 80%, ${accentColor})`,
        transition: 'color 0.15s, border-color 0.15s',
      }}
    >
      {children}
    </button>
  );
}
