'use client';

import { useState, lazy, Suspense } from 'react';
import { PROFESSIONS } from '@/data/professions';
import { ChevronRight } from 'lucide-react';

const CourseEditor = lazy(() => import('./CourseEditor'));

export default function ContentPage() {
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-1">Content Management</h1>
      <p className="text-sm text-gray-500 mb-4">
        {selectedProfession
          ? PROFESSIONS.find(p => p.id === selectedProfession)?.name
          : `${PROFESSIONS.length} courses`}
      </p>

      {!selectedProfession && (
        <div className="space-y-2">
          {PROFESSIONS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProfession(p.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 transition-colors text-left"
            >
              <span className="text-2xl">{p.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-sm">{p.name}</div>
                <div className="text-xs text-gray-400">
                  {p.unitCount} units, {p.questionCount.toLocaleString()} questions
                  {p.id !== 'mechanical-engineering' && ' (static)'}
                </div>
              </div>
              <div
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: p.color }}
              />
              <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
            </button>
          ))}
        </div>
      )}

      {selectedProfession && (
        <>
          <button
            onClick={() => setSelectedProfession(null)}
            className="text-sm font-semibold text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center gap-1"
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            All Courses
          </button>
          <Suspense fallback={<div className="py-8 text-center text-gray-400 text-sm">Loading editor...</div>}>
            <CourseEditor
              professionId={selectedProfession}
              readOnly={selectedProfession !== 'mechanical-engineering'}
            />
          </Suspense>
        </>
      )}
    </div>
  );
}
