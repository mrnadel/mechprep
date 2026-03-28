'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LessonTypeProps, ConversationNode } from '@/data/course/types';
import { MoneyText } from '@/components/ui/MoneyText';

interface ChatMessage {
  id: string;
  speaker: string;
  text: string;
  isUser: boolean;
  quality?: 'great' | 'okay' | 'poor';
  feedback?: string;
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px 16px 16px 4px',
          padding: '12px 16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          display: 'flex',
          gap: 4,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#AFAFAF' }}
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message, unitColor }: { message: ChatMessage; unitColor: string }) {
  const qualityEmoji = message.quality === 'great' ? '🎯' : message.quality === 'okay' ? '👍' : message.quality === 'poor' ? '😬' : '';
  const qualityLabel = message.quality === 'great' ? 'Great answer!' : message.quality === 'okay' ? 'Okay' : message.quality === 'poor' ? 'Needs work' : '';
  const qualityColor = message.quality === 'great' ? '#58CC02' : message.quality === 'okay' ? '#F59E0B' : message.quality === 'poor' ? '#FF4B4B' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: message.isUser ? 'flex-end' : 'flex-start',
        marginBottom: 6,
      }}
    >
      {!message.isUser && (
        <span style={{ fontSize: 11, fontWeight: 700, color: '#AFAFAF', marginBottom: 3, marginLeft: 4 }}>
          {message.speaker}
        </span>
      )}
      <div
        style={{
          background: message.isUser ? unitColor : '#FFFFFF',
          color: message.isUser ? '#FFFFFF' : '#3C3C3C',
          borderRadius: message.isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          padding: '12px 16px',
          maxWidth: '82%',
          fontSize: 15,
          fontWeight: 600,
          lineHeight: 1.5,
          boxShadow: message.isUser ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <MoneyText text={message.text} />
      </div>
      {message.quality && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginTop: 4,
            marginRight: message.isUser ? 4 : 0,
            marginLeft: message.isUser ? 0 : 4,
          }}
        >
          <span style={{ fontSize: 12 }}>{qualityEmoji}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: qualityColor }}>{qualityLabel}</span>
          {message.feedback && (
            <span style={{ fontSize: 11, fontWeight: 600, color: '#AFAFAF', marginLeft: 2 }}>
              — {message.feedback}
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ConversationView({
  lesson,
  unitColor,
  theme,
  onAnswer,
  onProgress,
  onComplete,
  checkHearts,
}: LessonTypeProps) {
  const nodes = lesson.conversationNodes ?? [];
  const startNodeId = lesson.conversationStartNodeId ?? nodes[0]?.id ?? '';
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const totalChoices = useMemo(() => nodes.filter((n) => n.options && n.options.length > 0).length, [nodes]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState(startNodeId);
  const [showOptions, setShowOptions] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [choicesMade, setChoicesMade] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  // Show initial message
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    onProgress(0, totalChoices);
    const firstNode = nodeMap.get(startNodeId);
    if (!firstNode) return;

    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages([{ id: firstNode.id, speaker: firstNode.speaker, text: firstNode.message, isUser: false }]);
      if (firstNode.options && firstNode.options.length > 0) {
        setTimeout(() => setShowOptions(true), 400);
      } else if (firstNode.nextNodeId) {
        showAutoNode(firstNode.nextNodeId);
      }
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(id);
  }, [messages, isTyping, showOptions]);

  const showAutoNode = useCallback(
    (nodeId: string) => {
      const node = nodeMap.get(nodeId);
      if (!node) {
        setIsFinished(true);
        return;
      }
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: node.id, speaker: node.speaker, text: node.message, isUser: false }]);
        setCurrentNodeId(node.id);
        if (node.options && node.options.length > 0) {
          setTimeout(() => setShowOptions(true), 400);
        } else if (node.nextNodeId) {
          setTimeout(() => showAutoNode(node.nextNodeId!), 800);
        } else {
          setIsFinished(true);
        }
      }, 1000);
    },
    [nodeMap],
  );

  const handleChoice = useCallback(
    (optionIndex: number) => {
      const node = nodeMap.get(currentNodeId);
      if (!node?.options) return;
      const option = node.options[optionIndex];

      setShowOptions(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `${node.id}-reply`,
          speaker: 'You',
          text: option.text,
          isUser: true,
          quality: option.quality,
          feedback: option.feedback,
        },
      ]);

      const correct = option.quality !== 'poor';
      onAnswer(node.id, correct);
      const next = choicesMade + 1;
      setChoicesMade(next);
      onProgress(next, totalChoices);

      setTimeout(() => {
        if (!checkHearts()) return;
        const nextNode = nodeMap.get(option.nextNodeId);
        if (!nextNode) {
          setIsFinished(true);
          return;
        }
        setCurrentNodeId(option.nextNodeId);
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            { id: nextNode.id, speaker: nextNode.speaker, text: nextNode.message, isUser: false },
          ]);
          if (nextNode.options && nextNode.options.length > 0) {
            setTimeout(() => setShowOptions(true), 400);
          } else if (nextNode.nextNodeId) {
            setTimeout(() => showAutoNode(nextNode.nextNodeId!), 800);
          } else {
            setIsFinished(true);
          }
        }, 1000);
      }, 1200);
    },
    [currentNodeId, nodeMap, choicesMade, totalChoices, onAnswer, onProgress, checkHearts, showAutoNode],
  );

  const currentNode = nodeMap.get(currentNodeId);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* Chat area */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} unitColor={unitColor} />
          ))}
        </AnimatePresence>
        {isTyping && <TypingIndicator />}
      </div>

      {/* Choice options or finish button */}
      <AnimatePresence mode="wait">
        {showOptions && currentNode?.options && (
          <motion.div
            key="options"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              padding: '12px 20px',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
              borderTop: '2px solid #E5E5E5',
              background: 'white',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Choose your response
            </span>
            {currentNode.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleChoice(i)}
                className="transition-transform active:scale-[0.98]"
                style={{
                  padding: '13px 16px',
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 700,
                  textAlign: 'left',
                  background: '#FFFFFF',
                  color: '#3C3C3C',
                  border: `2px solid #E5E5E5`,
                  boxShadow: '0 3px 0 #E5E5E5',
                  cursor: 'pointer',
                  lineHeight: 1.4,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = unitColor;
                  e.currentTarget.style.background = theme.bg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E5E5';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
              >
                {opt.text}
              </button>
            ))}
          </motion.div>
        )}

        {isFinished && (
          <motion.div
            key="finish"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{
              padding: '12px 20px',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
              borderTop: '2px solid #E5E5E5',
              background: 'white',
            }}
          >
            <button
              onClick={onComplete}
              className="w-full transition-transform active:scale-[0.98]"
              style={{
                padding: '14px 0',
                borderRadius: 16,
                fontSize: 15,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                background: unitColor,
                color: '#FFFFFF',
                boxShadow: `0 4px 0 ${theme.dark}`,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Finish
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
