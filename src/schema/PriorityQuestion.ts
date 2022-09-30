import builder from '../builder';
import { IQuestion } from './IQuestion';
import { QuestionAlternative } from './QuestionAlternative';
import { PriorityQuestionModel, QuestionSchema } from '../models/svt';

export const PriorityQuestion =
  builder.objectRef<PriorityQuestionModel>('PriorityQuestion');

builder.objectType(PriorityQuestion, {
  description: 'A priority question',
  interfaces: [IQuestion],
  isTypeOf: (item) => QuestionSchema.parse(item).type === 'PRIORITY',
  fields: (t) => ({
    alternatives: t.field({
      type: [QuestionAlternative],
      description:
        'List of question alternatives, or an empty list if it has none',
      resolve: (question) => {
        return question.alternatives;
      },
    }),
  }),
});
