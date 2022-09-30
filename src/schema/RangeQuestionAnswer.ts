import builder from '../builder';
import { IAnswer } from './IAnswer';
import { QuestionAnswerSchema, RangeQuestionAnswerModel } from '../models/svt';

export const RangeQuestionAnswer = builder
  .objectRef<RangeQuestionAnswerModel>('RangeQuestionAnswer')
  .implement({
    description: 'A range question anwer',
    interfaces: [IAnswer],
    isTypeOf: (item) =>
      QuestionAnswerSchema.parse(item).questionType === 'RANGE',
  });
