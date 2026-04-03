'use client';

import { memo } from 'react';

/**
 * Renders teaching text with engaging effects:
 * - Word-by-word fade-in animation (mascot "speaking" feel)
 * - Numbers/measurements highlighted in accent color + bold
 * - First sentence rendered slightly bolder as a hook
 */
function EngagingText({ text, accentColor }: { text: string; accentColor: string }) {
  if (!text) return null;

  // Find first sentence boundary (period/!/? followed by space or end)
  const sentenceMatch = text.match(/[.!?](\s|$)/);
  const firstEnd = sentenceMatch ? sentenceMatch.index! + 1 : text.length;

  // Split into tokens preserving whitespace
  const tokens = text.split(/(\s+)/);

  let charCount = 0;
  let wordIdx = 0;

  return (
    <>
      <style>{`@keyframes lb-word-in{from{opacity:0;filter:blur(2px);transform:translateY(3px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}`}</style>
      {tokens.map((token, ti) => {
        const prevCharCount = charCount;
        charCount += token.length;

        // Whitespace — return as-is
        if (/^\s+$/.test(token)) return token;

        const isFirstSentence = prevCharCount < firstEnd;
        const hasNumber = /\d/.test(token);
        const i = wordIdx++;

        return (
          <span
            key={ti}
            style={{
              display: 'inline',
              opacity: 0,
              animation: 'lb-word-in 0.3s ease forwards',
              animationDelay: `${0.15 + i * 0.025}s`,
              ...(hasNumber ? { color: accentColor, fontWeight: 700 } : {}),
              ...(isFirstSentence && !hasNumber ? { fontWeight: 600 } : {}),
            }}
          >
            {token}
          </span>
        );
      })}
    </>
  );
}

export default memo(EngagingText);
