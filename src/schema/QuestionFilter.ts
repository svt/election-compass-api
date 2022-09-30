import builder from '../builder';
import { ElectionType } from './ElectionType';
import { QuestionFilterModel } from '../models/svt';

export const QuestionFilter =
  builder.inputRef<QuestionFilterModel>('QuestionFilter');

builder.inputType(QuestionFilter, {
  fields: (t) => ({
    slug: t.string({ required: false }),
    electionType: t.field({
      type: [ElectionType],
      required: false,
    }),
    type: t.field({
      type: ['QuestionType'],
      required: false,
    }),
  }),
});
