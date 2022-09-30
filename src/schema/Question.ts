import builder from '../builder';
import { PriorityQuestion } from './PriorityQuestion';
import { PropositionQuestion } from './PropositionQuestion';
import { RangeQuestion } from './RangeQuestion';

export const Question = builder.unionType('Question', {
  types: [RangeQuestion, PriorityQuestion, PropositionQuestion],
});
