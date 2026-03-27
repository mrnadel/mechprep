'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ProfessionPicker } from './ProfessionPicker';
import { FloatingParticles } from '@/components/ui/FloatingParticles';

interface ProfessionPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId?: string;
  onSelect: (professionId: string) => void;
}

export function ProfessionPickerModal({ isOpen, onClose, selectedId, onSelect }: ProfessionPickerModalProps) {
  const handleSelect = (id: string) => {
    onSelect(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative bg-gradient-to-b from-teal-500 to-teal-600 w-full h-full sm:h-auto sm:max-w-md sm:mx-4 sm:rounded-2xl overflow-y-auto sm:shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profession-picker-title"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <FloatingParticles color="rgba(255,255,255,0.15)" count={5} drift />

            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>

            <div className="flex-1 flex flex-col justify-center sm:flex-initial relative z-[1]">
              <div className="px-5 pt-6 pb-3">
                <h3 id="profession-picker-title" className="text-xl font-black text-white">
                  Switch Course
                </h3>
                <p className="text-sm text-white/60 font-medium mt-0.5">
                  Choose what you want to learn
                </p>
              </div>

              <div className="px-5 pb-5">
                <ProfessionPicker
                  selectedId={selectedId}
                  onSelect={handleSelect}
                  compact
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
