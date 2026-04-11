'use client';

import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

const variants = {
  indigo:   { bg: 'bg-primary-600',  shadow: 'shadow-[0_6px_0_var(--color-primary-800)]', text: 'text-white' },
  gold:     { bg: 'bg-[#FFB800]',    shadow: 'shadow-[0_6px_0_#CC9400]', text: 'text-[#5D4200]' },
  purple:   { bg: 'bg-[#7C3AED]',    shadow: 'shadow-[0_6px_0_#5B21B6]', text: 'text-white' },
  green:    { bg: 'bg-accent-600',    shadow: 'shadow-[0_6px_0_var(--color-accent-800)]', text: 'text-white' },
  red:      { bg: 'bg-danger-500',    shadow: 'shadow-[0_6px_0_var(--color-danger-700)]', text: 'text-white' },
  goldDark: { bg: 'bg-gradient-to-br from-brand-400 to-brand-500', shadow: 'shadow-[0_6px_0_var(--color-brand-700)]', text: 'text-primary-900' },
} as const;

export type GameButtonVariant = keyof typeof variants;

interface GameButtonProps extends HTMLMotionProps<'button'> {
  variant?: GameButtonVariant;
}

export const GameButton = forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ variant = 'indigo', className, children, disabled, style, ...props }, ref) => {
    const v = variants[variant];

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        whileTap={!disabled ? { y: 6, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } } : undefined}
        className={cn(
          'w-full py-4 rounded-2xl text-sm font-extrabold',
          'flex items-center justify-center gap-2',
          'select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white',
          v.bg, v.shadow, v.text,
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        style={style}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

GameButton.displayName = 'GameButton';
