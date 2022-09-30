import builder from '../builder';
import { IAnswer } from './IAnswer';
import {
  PropositionQuestionAnswerModel,
  QuestionAnswerSchema,
} from '../models/svt';

export const PropositionQuestionAnswer =
  builder.objectRef<PropositionQuestionAnswerModel>(
    'PropositionQuestionAnswer'
  );

builder.objectType(PropositionQuestionAnswer, {
  description: 'A proposition question anwer',
  interfaces: [IAnswer],
  isTypeOf: (item) =>
    QuestionAnswerSchema.parse(item).questionType === 'PROPOSITION',
});
