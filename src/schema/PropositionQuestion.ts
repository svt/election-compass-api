import builder from '../builder';
import { IQuestion } from './IQuestion';
import { PropositionQuestionModel, QuestionSchema } from '../models/svt';

export const PropositionQuestion = builder.objectRef<PropositionQuestionModel>(
  'PropositionQuestion'
);

builder.objectType(PropositionQuestion, {
  description: 'A proposition question',
  interfaces: [IQuestion],
  isTypeOf: (item) => QuestionSchema.parse(item).type === 'PROPOSITION',
});
