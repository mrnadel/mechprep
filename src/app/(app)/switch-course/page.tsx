'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ProfessionPicker } from '@/components/profession/ProfessionPicker';
import { useCourseStore } from '@/store/useCourseStore';

export default function SwitchCoursePage() {
  const router = useRouter();
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const setActiveProfession = useCourseStore((s) => s.setActiveProfession);

  const handleSelect = (id: string) => {
    setActiveProfession(id);
    router.push('/');
  };

  return (
    <div className="px-4 py-4 max-w-lg mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm font-bold text-surface-400 hover:text-surface-600 transition-colors mb-4 min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h1 className="text-xl font-black text-gray-900 mb-1">Switch Course</h1>
      <p className="text-sm text-gray-400 font-medium mb-5">Choose what you want to learn</p>

      <ProfessionPicker
        selectedId={activeProfession}
        onSelect={handleSelect}
      />
    </div>
  );
}
