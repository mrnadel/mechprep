'use client';

import { memo, type ReactNode } from 'react';
import { useGlossary } from '@/components/lesson/GlossaryContext';
import { GlossaryTerm } from '@/components/ui/GlossaryTerm';
import type { GlossaryMatch } from '@/lib/glossary-matcher';

/**
 * Renders teaching text with engaging effects:
 * - Lightweight markdown: **bold**, *italic*, newlines
 * - Word-by-word fade-in animation (mascot "speaking" feel)
 * - Numbers/measurements highlighted in accent color + bold
 * - First sentence rendered slightly bolder as a hook
 * - Glossary terms detected and wrapped in tappable buttons
 */

interface InlineToken {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

/** Parse **bold** and *italic* markdown into tokens */
function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      tokens.push({ text: text.slice(last, match.index) });
    }
    if (match[1]) tokens.push({ text: match[1], bold: true });
    else if (match[2]) tokens.push({ text: match[2], italic: true });
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    tokens.push({ text: text.slice(last) });
  }
  return tokens;
}

/** Find which glossary match (if any) contains the given char position */
function findMatchAt(
  matches: GlossaryMatch[],
  charPos: number,
): GlossaryMatch | undefined {
  for (const m of matches) {
    if (charPos >= m.start && charPos < m.end) return m;
    if (m.start > charPos) break; // matches are sorted by start
  }
  return undefined;
}

const WORD_ANIMATION_DURATION = 0.3; // seconds
const WORD_ANIMATION_BASE_DELAY = 0.15; // seconds
const WORD_ANIMATION_STAGGER = 0.025; // seconds per word

function EngagingText({ text, accentColor }: { text: string; accentColor: string }) {
  const { matcher, sectionIndex, accentColor: glossaryAccent, activeTerm, openPopover } = useGlossary();

  if (!text) return null;

  // Strip markdown for sentence boundary detection and glossary matching
  const plainText = text.replace(/\*\*(.+?)\*\*|\*(.+?)\*/g, '$1$2');
  const sentenceMatch = plainText.match(/[.!?](\s|$)/);
  const firstEnd = sentenceMatch ? sentenceMatch.index! + 1 : plainText.length;

  // Find glossary terms in the plain text
  const glossaryMatches = matcher?.findTerms(plainText, sectionIndex) ?? [];

  // Split by double-newlines into paragraphs, capturing separators
  // so we can advance plainCharCount past them for glossary matching
  const paragraphParts = text.split(/(\n\n+)/);
  const paragraphs: string[] = [];
  const paragraphSeparators: string[] = [];
  for (let i = 0; i < paragraphParts.length; i++) {
    if (i % 2 === 0) paragraphs.push(paragraphParts[i]);
    else paragraphSeparators.push(paragraphParts[i]);
  }

  let plainCharCount = 0;
  let wordIdx = 0;

  function renderWord(
    word: string,
    key: string,
    opts: { bold?: boolean; italic?: boolean; isFirst: boolean },
  ): ReactNode {
    const hasNumber = /\d/.test(word);
    const i = wordIdx++;

    const style: React.CSSProperties = {
      display: 'inline',
      opacity: 0,
      animation: `lb-word-in ${WORD_ANIMATION_DURATION}s ease forwards`,
      animationDelay: `${WORD_ANIMATION_BASE_DELAY + i * WORD_ANIMATION_STAGGER}s`,
    };

    if (hasNumber) {
      style.color = accentColor;
      style.fontWeight = 700;
    } else if (opts.bold) {
      style.fontWeight = 700;
    } else if (opts.isFirst) {
      style.fontWeight = 600;
    }

    if (opts.italic) {
      style.fontStyle = 'italic';
    }

    return <span key={key} style={style}>{word}</span>;
  }

  function renderParagraph(para: string, pi: number): ReactNode {
    // Handle single newlines as line breaks
    const lines = para.split(/\n/);

    return lines.map((line, li) => {
      const inlineTokens = parseInline(line);
      const nodes: ReactNode[] = [];

      // Buffer for collecting word spans that belong to a glossary match
      let activeMatch: GlossaryMatch | null = null;
      let matchBuffer: ReactNode[] = [];
      let matchLastWordIdx = 0;

      function flushMatchBuffer() {
        if (!activeMatch || matchBuffer.length === 0) return;

        const match = activeMatch;
        const lastIdx = matchLastWordIdx;
        // Calculate when the last word in this term finishes animating
        const enableDelay =
          WORD_ANIMATION_BASE_DELAY +
          lastIdx * WORD_ANIMATION_STAGGER +
          WORD_ANIMATION_DURATION;

        nodes.push(
          <span
            key={`gt-${match.start}`}
            style={{
              display: 'inline',
              pointerEvents: 'none',
              animation: 'gt-enable 0s forwards',
              animationDelay: `${enableDelay}s`,
            }}
          >
            <GlossaryTerm
              accentColor={glossaryAccent}
              isActive={activeTerm === match.term}
              onTap={(rect) => openPopover(
                { term: match.term, definition: match.definition, relatedTerms: match.relatedTerms },
                rect,
              )}
            >
              {matchBuffer}
            </GlossaryTerm>
          </span>,
        );

        activeMatch = null;
        matchBuffer = [];
        matchLastWordIdx = 0;
      }

      for (let ti = 0; ti < inlineTokens.length; ti++) {
        const token = inlineTokens[ti];
        // Split token text into words preserving whitespace
        const parts = token.text.split(/(\s+)/);

        for (let wi = 0; wi < parts.length; wi++) {
          const part = parts[wi];
          if (/^\s+$/.test(part)) {
            // Flush match buffer if whitespace falls past the match end
            if (activeMatch && plainCharCount >= activeMatch.end) {
              flushMatchBuffer();
            }
            if (activeMatch) {
              matchBuffer.push(part);
            } else {
              nodes.push(part);
            }
            plainCharCount += part.length;
            continue;
          }

          const wordStart = plainCharCount;

          // Check if we should flush the previous match
          // (this word starts a different match or is outside the active match)
          if (activeMatch && wordStart >= activeMatch.end) {
            flushMatchBuffer();
          }

          // Check if this word falls within a glossary match
          const matchHere = glossaryMatches.length > 0
            ? findMatchAt(glossaryMatches, wordStart)
            : undefined;

          // Track position in plain text for first-sentence detection
          const isFirst = plainCharCount < firstEnd;

          const wordNode = renderWord(part, `${pi}-${li}-${ti}-${wi}`, {
            bold: token.bold,
            italic: token.italic,
            isFirst,
          });

          if (matchHere) {
            // Starting or continuing a glossary match
            if (!activeMatch || activeMatch.start !== matchHere.start) {
              // Flush any previous match before starting a new one
              flushMatchBuffer();
              activeMatch = matchHere;
            }
            matchBuffer.push(wordNode);
            matchLastWordIdx = wordIdx - 1; // wordIdx was incremented in renderWord
          } else {
            // Not in a glossary match -- render directly
            nodes.push(wordNode);
          }

          plainCharCount += part.length;
        }
      }

      // Flush any remaining match buffer at end of line
      flushMatchBuffer();

      // Add <br> between lines within the same paragraph
      if (li < lines.length - 1) {
        nodes.push(<br key={`br-${pi}-${li}`} />);
        // Advance past the \n separator in plain text for glossary position tracking
        plainCharCount += 1;
      }

      return nodes;
    });
  }

  return (
    <>
      <style>{`@keyframes lb-word-in{from{opacity:0;filter:blur(2px);transform:translateY(3px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}@keyframes gt-enable{to{pointer-events:auto}}`}</style>
      {paragraphs.map((para, pi) => {
        // Advance past the paragraph separator in plain text
        if (pi > 0 && paragraphSeparators[pi - 1]) {
          plainCharCount += paragraphSeparators[pi - 1].length;
        }
        return (
          <span key={pi} style={pi > 0 ? { display: 'block', marginTop: 10 } : undefined}>
            {renderParagraph(para, pi)}
          </span>
        );
      })}
    </>
  );
}

export default memo(EngagingText);
