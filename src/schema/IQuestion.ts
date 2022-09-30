import builder from '../builder';
import getPartiesByElection from '../db/getPartiesByElection';
import { PartyModel, QuestionAnswerModel } from '../models/svt';
import { QuestionResponse } from './QuestionResponse';

export const IQuestion = builder.interfaceType('IQuestion', {
  fields: (t) => ({
    id: t.exposeString('id', { description: 'The id of the question' }),
    slug: t.exposeString('slug', { description: 'The slug of the question' }),
    title: t.exposeString('title', {
      description: 'The title of the question',
    }),
    description: t.exposeString('description', {
      description:
        'A optional text describing that helps explaing the question title',
      nullable: true,
    }),
    type: t.exposeString('type', { description: 'The type of question' }),
    electionType: t.exposeString('electionType', {
      description: 'The type of election',
      nullable: true,
    }),
    responses: t.field({
      type: [QuestionResponse],
      description: 'Party responses to question',
      resolve: async (question) => {
        const parties = await getPartiesByElection(
          question.electionTypeSlug || 'riksdag'
        );

        const questionResponses = parties
          .map((party) => ({
            party,
            answer: party.answers.find((a) => a.questionId === question.id),
          }))
          .filter(
            (r): r is { party: PartyModel; answer: QuestionAnswerModel } =>
              r.answer !== null &&
              r.answer !== undefined &&
              r.party !== null &&
              r.party !== undefined &&
              r.answer.value !== null
          )
          .sort((a, b) => {
            if (a.answer.value === b.answer.value) {
              return 0;
            }

            if (a.answer.value === null) {
              return 1;
            }

            if (b.answer.value === null) {
              return -1;
            }

            return a.answer.value > b.answer.value ? 1 : -1;
          });

        return questionResponses;
      },
    }),
  }),
});
