'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  indigo:  { bg: 'bg-[#4F46E5]', shadow: 'shadow-[0_4px_0_#3730A3]', pressed: 'active:shadow-[0_0px_0_#3730A3]', text: 'text-white' },
  gold:    { bg: 'bg-[#FFB800]', shadow: 'shadow-[0_4px_0_#CC9400]', pressed: 'active:shadow-[0_0px_0_#CC9400]', text: 'text-[#5D4200]' },
  purple:  { bg: 'bg-[#7C3AED]', shadow: 'shadow-[0_4px_0_#5B21B6]', pressed: 'active:shadow-[0_0px_0_#5B21B6]', text: 'text-white' },
  green:   { bg: 'bg-[#16A34A]', shadow: 'shadow-[0_4px_0_#15803D]', pressed: 'active:shadow-[0_0px_0_#15803D]', text: 'text-white' },
  red:     { bg: 'bg-[#EF4444]', shadow: 'shadow-[0_4px_0_#B91C1C]', pressed: 'active:shadow-[0_0px_0_#B91C1C]', text: 'text-white' },
  goldDark:{ bg: 'bg-gradient-to-br from-amber-400 to-amber-500', shadow: 'shadow-[0_4px_0_#B45309]', pressed: 'active:shadow-[0_0px_0_#B45309]', text: 'text-[#1E1B4B]' },
} as const;

export type GameButtonVariant = keyof typeof variants;

interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GameButtonVariant;
}

export const GameButton = forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ variant = 'indigo', className, children, disabled, ...props }, ref) => {
    const v = variants[variant];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'w-full py-4 rounded-2xl text-sm font-extrabold',
          'flex items-center justify-center gap-2',
          'transition-all duration-75 select-none',
          'active:translate-y-[2px]',
          v.bg, v.shadow, v.pressed, v.text,
          disabled && 'opacity-50 cursor-not-allowed active:translate-y-0',
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

GameButton.displayName = 'GameButton';
