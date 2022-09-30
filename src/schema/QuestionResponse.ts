import builder from '../builder';
import { Party } from './Party';
import { QuestionResponseModel } from '../models/svt';

export const QuestionResponse =
  builder.objectRef<QuestionResponseModel>('QuestionResponse');

builder.objectType(QuestionResponse, {
  fields: (t) => ({
    party: t.field({
      type: Party,
      resolve: async (response, _, __) => {
        return response.party;
      },
    }),
    answer: t.field({
      type: 'Answer',
      resolve: async (response, _, __) => {
        return response.answer;
      },
    }),
  }),
});
