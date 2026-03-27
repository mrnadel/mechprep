'use client';

import { ProfessionPicker } from './ProfessionPicker';
import { FullScreenModal } from '@/components/ui/FullScreenModal';

interface ProfessionPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedId?: string;
  onSelect: (professionId: string) => void;
}

export function ProfessionPickerModal({ isOpen, onClose, selectedId, onSelect }: ProfessionPickerModalProps) {
  const handleSelect = (id: string) => { onSelect(id); onClose(); };

  return (
    <FullScreenModal
      show={isOpen}
      bg="#1899D6"
      fx="bubbles"
      closable
      onClose={onClose}
      labelId="profession-picker-title"
    >
      <img src="/badges/switch-course.png" alt="" width={48} height={48} draggable={false} className="mb-3" />
      <h3 id="profession-picker-title" className="text-xl font-black text-white mb-1">Switch Course</h3>
      <p className="text-sm text-white/60 font-medium mb-5">Choose what you want to learn</p>
      <div className="w-full">
        <ProfessionPicker selectedId={selectedId} onSelect={handleSelect} compact />
      </div>
    </FullScreenModal>
  );
}
