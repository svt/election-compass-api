import builder from '../builder';
import { PriorityQuestionAnswer } from './PriorityQuestionAnswer';
import { RangeQuestionAnswer } from './RangeQuestionAnswer';
import { PropositionQuestionAnswer } from './PropositionQuestionAnswer';

export const Answer = builder.unionType('Answer', {
  types: [
    RangeQuestionAnswer,
    PriorityQuestionAnswer,
    PropositionQuestionAnswer,
  ],
});
