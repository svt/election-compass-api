import builder from '../builder';
import { IAnswer } from './IAnswer';
import {
  PriorityQuestionAnswerModel,
  QuestionAnswerSchema,
} from '../models/svt';

export const PriorityQuestionAnswer =
  builder.objectRef<PriorityQuestionAnswerModel>('PriorityQuestionAnswer');

builder.objectType(PriorityQuestionAnswer, {
  description: 'A priority question anwer',
  interfaces: [IAnswer],
  isTypeOf: (item) =>
    QuestionAnswerSchema.parse(item).questionType === 'PRIORITY',
});
