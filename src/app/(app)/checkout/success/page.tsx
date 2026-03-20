'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Confetti-style particles */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: '-4%',
                backgroundColor: [
                  '#4F46E5', '#7C3AED', '#10B981', '#F59E0B',
                  '#EF4444', '#3B82F6', '#EC4899', '#14B8A6',
                ][i % 8],
              }}
              animate={{
                y: ['0vh', `${70 + Math.random() * 30}vh`],
                x: [0, (Math.random() - 0.5) * 120],
                rotate: [0, Math.random() * 720],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2.5 + Math.random() * 1.5,
                delay: Math.random() * 0.8,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="text-center max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Checkmark animation */}
        <motion.div
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 400 }}
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Pro!</h1>
            <Sparkles className="w-5 h-5 text-primary-500" />
          </div>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            You now have full access to all units, unlimited practice, detailed explanations, and advanced analytics. Time to level up your engineering skills!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <Link
            href="/"
            className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors shadow-md shadow-primary-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Continue Learning
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/settings/billing"
            className="block w-full py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-600 font-medium text-sm border border-gray-200 transition-colors active:scale-[0.98] text-center"
          >
            View Billing Settings
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
