'use client';

import { useSession } from 'next-auth/react';
import { CourseHeader } from '@/components/course/CourseHeader';
import { CourseMap } from '@/components/course/CourseMap';
import { LessonView } from '@/components/lesson/LessonView';
import { ResultScreen } from '@/components/lesson/ResultScreen';
import { LandingPage } from '@/components/landing/LandingPage';
import { useCourseStore } from '@/store/useCourseStore';

export default function HomePage() {
  const { status } = useSession();
  const { activeLesson, lessonResult } = useCourseStore();

  if (status === 'loading') return null;

  if (status === 'unauthenticated') {
    return <LandingPage />;
  }

  return (
    <>
      <CourseHeader />
      <CourseMap />
      {activeLesson && <LessonView />}
      {lessonResult && <ResultScreen />}
    </>
  );
}
