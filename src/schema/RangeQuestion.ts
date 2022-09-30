import builder from '../builder';
import { IQuestion } from './IQuestion';
import { RangeQuestionModel, QuestionSchema } from '../models/svt';

export const RangeQuestion =
  builder.objectRef<RangeQuestionModel>('RangeQuestion');

builder.objectType(RangeQuestion, {
  description: 'A range question',
  interfaces: [IQuestion],
  isTypeOf: (item) => QuestionSchema.parse(item).type === 'RANGE',
  fields: (t) => ({
    positions: t.stringList({
      resolve: () => [],
    }),
  }),
});
