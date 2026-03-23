'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, Check, MessageSquare, Send } from 'lucide-react';
import { useFeedbackStore } from '@/store/useFeedbackStore';
import type { ContentFeedbackType, FeedbackReason } from '@/data/types';
import { VALID_REASONS } from '@/data/types';

const REASON_LABELS: Record<FeedbackReason, string> = {
  confusing: 'Confusing',
  incorrect: 'Incorrect',
  'too-easy': 'Too Easy',
  'too-hard': 'Too Hard',
  'bad-graphic': 'Bad Graphic',
};

interface Props {
  contentType: ContentFeedbackType;
  contentId: string;
  hasGraphic?: boolean;
}

export default function FlagButton({ contentType, contentId, hasGraphic }: Props) {
  const flagKey = `${contentType}:${contentId}`;
  const existingReason = useFeedbackStore((s) => s.flags[flagKey] ?? null);
  const existingComment = useFeedbackStore((s) => s.comments[flagKey] ?? '');
  const setStoreFlag = useFeedbackStore((s) => s.setFlag);
  const setStoreComment = useFeedbackStore((s) => s.setComment);
  const removeStoreFlag = useFeedbackStore((s) => s.removeFlag);

  const visibleReasons = hasGraphic
    ? VALID_REASONS
    : VALID_REASONS.filter((r) => r !== 'bad-graphic');

  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentSaved, setCommentSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when comment input opens
  useEffect(() => {
    if (showCommentInput && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showCommentInput]);

  const handleFlagClick = useCallback(() => {
    setExpanded((prev) => !prev);
    setShowCommentInput(false);
  }, []);

  const submitFlag = useCallback(
    async (reason: FeedbackReason, comment?: string | null) => {
      try {
        await fetch('/api/content-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contentType, contentId, reason, comment: comment || null }),
        });
      } catch {
        removeStoreFlag(contentType, contentId);
      }
    },
    [contentType, contentId, removeStoreFlag]
  );

  const handleSelectReason = useCallback(
    async (reason: FeedbackReason) => {
      setSubmitting(true);
      setStoreFlag(contentType, contentId, reason);
      setShowConfirm(true);
      setExpanded(false);

      await submitFlag(reason);
      setSubmitting(false);
      setTimeout(() => {
        setShowConfirm(false);
      }, 1500);
    },
    [contentType, contentId, setStoreFlag, submitFlag]
  );

  const handleRemoveFlag = useCallback(async () => {
    setSubmitting(true);
    removeStoreFlag(contentType, contentId);
    setExpanded(false);
    setShowCommentInput(false);

    try {
      await fetch('/api/content-feedback', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType, contentId }),
      });
    } catch {
      // Silently fail
    } finally {
      setSubmitting(false);
    }
  }, [contentType, contentId, removeStoreFlag]);

  const handleOpenComment = useCallback(() => {
    setCommentText(existingComment);
    setShowCommentInput(true);
    setCommentSaved(false);
  }, [existingComment]);

  const handleSubmitComment = useCallback(async () => {
    if (!existingReason) return;
    const trimmed = commentText.trim();
    setStoreComment(contentType, contentId, trimmed);
    setShowCommentInput(false);
    setCommentSaved(true);
    setTimeout(() => setCommentSaved(false), 1500);
    await submitFlag(existingReason, trimmed);
  }, [existingReason, commentText, contentType, contentId, setStoreComment, submitFlag]);

  const isFlagged = !!existingReason;

  return (
    <div className="flex flex-col items-end" style={{ gap: 4, minHeight: 32 }}>
      <div className="flex items-center gap-2">
        <AnimatePresence mode="wait">
          {showConfirm && (
            <motion.span
              key="confirm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: 12, fontWeight: 700, color: '#58A700' }}
              className="flex items-center gap-1"
            >
              <Check className="w-3 h-3" /> Flagged
            </motion.span>
          )}
          {commentSaved && (
            <motion.span
              key="comment-saved"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: 12, fontWeight: 700, color: '#58A700' }}
              className="flex items-center gap-1"
            >
              <Check className="w-3 h-3" /> Saved
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {expanded && (
            <motion.div
              key="chips"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="flex items-center gap-1 overflow-hidden"
            >
              {isFlagged ? (
                <button
                  onClick={handleRemoveFlag}
                  disabled={submitting}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '8px 12px',
                    borderRadius: 12,
                    border: '1.5px solid #FF4B4B',
                    background: '#FFF0F0',
                    color: '#EA2B2B',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    minHeight: 44,
                  }}
                >
                  Remove flag
                </button>
              ) : (
                visibleReasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => handleSelectReason(reason)}
                    disabled={submitting}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '8px 12px',
                      borderRadius: 12,
                      border: '1.5px solid #E5E5E5',
                      background: '#F5F5F5',
                      color: '#3C3C3C',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      minHeight: 44,
                    }}
                    className="transition-colors hover:border-[#AFAFAF] hover:bg-[#EBEBEB]"
                  >
                    {REASON_LABELS[reason]}
                  </button>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add details button — only visible when flagged and chips are closed */}
        {isFlagged && !expanded && !showCommentInput && !showConfirm && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleOpenComment}
            className="flex items-center gap-1 transition-colors"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: existingComment ? '#58A700' : '#AFAFAF',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 4px',
            }}
          >
            <MessageSquare className="w-3 h-3" />
            {existingComment ? 'Edit details' : 'Add details'}
          </motion.button>
        )}

        <button
          onClick={handleFlagClick}
          disabled={submitting}
          aria-label={`Flag content ${contentId}`}
          className="flex items-center justify-center transition-transform active:scale-90"
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            border: 'none',
            background: isFlagged ? '#FFF0F0' : 'transparent',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <Flag
            className="w-4 h-4"
            style={{ color: isFlagged ? '#EA2B2B' : '#AFAFAF' }}
            fill={isFlagged ? '#EA2B2B' : 'none'}
          />
        </button>
      </div>

      {/* Comment input — slides in below */}
      <AnimatePresence>
        {showCommentInput && (
          <motion.div
            key="comment-input"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="w-full overflow-hidden"
          >
            <div className="flex items-end gap-2" style={{ paddingTop: 2 }}>
              <textarea
                ref={textareaRef}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                aria-label="Details about what is wrong with this content"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                  if (e.key === 'Escape') {
                    setShowCommentInput(false);
                  }
                }}
                placeholder="What's wrong? (optional)"
                maxLength={500}
                rows={2}
                style={{
                  flex: 1,
                  fontSize: 16,
                  fontWeight: 600,
                  padding: '8px 10px',
                  borderRadius: 10,
                  border: '1.5px solid #E5E5E5',
                  background: '#FAFAFA',
                  color: '#3C3C3C',
                  resize: 'none',
                  outline: 'none',
                  lineHeight: 1.4,
                }}
              />
              <button
                onClick={handleSubmitComment}
                aria-label="Submit comment"
                className="flex items-center justify-center transition-transform active:scale-90"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  border: 'none',
                  background: commentText.trim() ? '#58CC02' : '#E5E5E5',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <Send className="w-3.5 h-3.5" style={{ color: commentText.trim() ? 'white' : '#AFAFAF' }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
