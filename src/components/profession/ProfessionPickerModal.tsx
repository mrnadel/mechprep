'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ProfessionPicker } from './ProfessionPicker';

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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white w-full h-full sm:h-auto sm:max-w-md sm:mx-4 sm:rounded-2xl overflow-y-auto sm:shadow-2xl flex flex-col justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profession-picker-title"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {/* Header */}
            <div className="px-5 pt-5 pb-3">
              <h3 id="profession-picker-title" className="text-lg font-black text-gray-900">
                Switch Course
              </h3>
              <p className="text-sm text-gray-400 font-medium mt-0.5">
                Choose what you want to learn
              </p>
            </div>

            {/* Picker */}
            <div className="px-5 pb-5">
              <ProfessionPicker
                selectedId={selectedId}
                onSelect={handleSelect}
                compact
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
