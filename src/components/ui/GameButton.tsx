'use client';

import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

const variants = {
  indigo:   { bg: 'bg-[#4F46E5]',  shadow: 'shadow-[0_4px_0_#3730A3]', text: 'text-white' },
  gold:     { bg: 'bg-[#FFB800]',  shadow: 'shadow-[0_4px_0_#CC9400]', text: 'text-[#5D4200]' },
  purple:   { bg: 'bg-[#7C3AED]',  shadow: 'shadow-[0_4px_0_#5B21B6]', text: 'text-white' },
  green:    { bg: 'bg-[#16A34A]',  shadow: 'shadow-[0_4px_0_#15803D]', text: 'text-white' },
  red:      { bg: 'bg-[#EF4444]',  shadow: 'shadow-[0_4px_0_#B91C1C]', text: 'text-white' },
  goldDark: { bg: 'bg-gradient-to-br from-amber-400 to-amber-500', shadow: 'shadow-[0_4px_0_#B45309]', text: 'text-[#1E1B4B]' },
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
        whileTap={!disabled ? { y: 4, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } } : undefined}
        className={cn(
          'w-full py-4 rounded-2xl text-sm font-extrabold',
          'flex items-center justify-center gap-2',
          'select-none',
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
