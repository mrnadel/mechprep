'use client';

import { useState } from 'react';
import CourseEditor from './CourseEditor';
import PracticeEditor from './PracticeEditor';

export default function ContentPage() {
  const [tab, setTab] = useState<'course' | 'practice'>('course');

  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Content Management</h1>

      {/* Tab toggle */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
        <button
          onClick={() => setTab('course')}
          style={{
            flex: 1, padding: '12px 0', fontSize: 14, fontWeight: 700,
            border: '2px solid #E5E5E5', borderRadius: '10px 0 0 10px',
            background: tab === 'course' ? '#111' : 'white',
            color: tab === 'course' ? 'white' : '#666',
            cursor: 'pointer',
          }}
        >
          Course Lessons
        </button>
        <button
          onClick={() => setTab('practice')}
          style={{
            flex: 1, padding: '12px 0', fontSize: 14, fontWeight: 700,
            border: '2px solid #E5E5E5', borderLeft: 'none', borderRadius: '0 10px 10px 0',
            background: tab === 'practice' ? '#111' : 'white',
            color: tab === 'practice' ? 'white' : '#666',
            cursor: 'pointer',
          }}
        >
          Practice Questions
        </button>
      </div>

      {tab === 'course' ? <CourseEditor /> : <PracticeEditor />}
    </div>
  );
}
