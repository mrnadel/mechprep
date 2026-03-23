import { engineeringMechanicsQuestions } from './engineering-mechanics';
import { strengthOfMaterialsQuestions } from './strength-of-materials';
import { thermodynamicsQuestions } from './thermodynamics';
import { heatTransferQuestions } from './heat-transfer';
import { fluidMechanicsQuestions } from './fluid-mechanics';
import { materialsEngineeringQuestions } from './materials-engineering';
import { manufacturingQuestions } from './manufacturing';
import { machineElementsQuestions } from './machine-elements';
import { designTolerancingQuestions } from './design-tolerancing';
import { vibrationsQuestions } from './vibrations';
import { realWorldMechanismsQuestions } from './real-world-mechanisms';
import type { Question } from '../types';

export const allQuestions: Question[] = [
  ...engineeringMechanicsQuestions,
  ...strengthOfMaterialsQuestions,
  ...thermodynamicsQuestions,
  ...heatTransferQuestions,
  ...fluidMechanicsQuestions,
  ...materialsEngineeringQuestions,
  ...manufacturingQuestions,
  ...machineElementsQuestions,
  ...designTolerancingQuestions,
  ...vibrationsQuestions,
  ...realWorldMechanismsQuestions,
];

export function getQuestionById(id: string): Question | undefined {
  return allQuestions.find(q => q.id === id);
}
