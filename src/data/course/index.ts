import { unit1 } from './units/unit-1-statics';
import { unit2 } from './units/unit-2-dynamics';
import { unit3 } from './units/unit-3-strength';
import { unit4 } from './units/unit-4-thermo';
import { unit5 } from './units/unit-5-heat';
import { unit6 } from './units/unit-6-fluids';
import { unitHowThingsWork } from './units/unit-7-how-things-work';
import { unit7 } from './units/unit-7-materials';
import { unit8 } from './units/unit-8-machine';
import { unit9 } from './units/unit-9-gdt';
import { unit10 } from './units/unit-10-interview';
import type { Unit, Lesson } from './types';

export const course: Unit[] = [unit1, unit2, unit3, unit4, unit5, unit6, unitHowThingsWork, unit7, unit8, unit9, unit10];

export function getTotalLessons(): number {
  return course.reduce((sum, unit) => sum + unit.lessons.length, 0);
}

export function getLessonById(lessonId: string): { unit: Unit; lesson: Lesson; unitIndex: number; lessonIndex: number } | null {
  for (let ui = 0; ui < course.length; ui++) {
    for (let li = 0; li < course[ui].lessons.length; li++) {
      if (course[ui].lessons[li].id === lessonId) {
        return { unit: course[ui], lesson: course[ui].lessons[li], unitIndex: ui, lessonIndex: li };
      }
    }
  }
  return null;
}
