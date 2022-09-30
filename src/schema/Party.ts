import { PartyModel } from '../models/svt';
import builder from '../builder';
import { ProfileQuestionsAnswer } from './ProfileQuestionAnswer';
import { Answer } from './Answer';
import { PartyLeader } from './PartyLeader';

export const Party = builder.objectRef<PartyModel>('Party');

builder.objectType(Party, {
  description: 'A political party',
  fields: (t) => ({
    altingetCandidateId: t.exposeString('altingetCandidateId', {
      description: 'Altingets id of the party (as a candidate)',
    }),
    id: t.field({
      type: 'String',
      description: 'Official id of a the party also known as partikod',
      deprecationReason:
        'Party id does not return correct value, use slug for key',
      resolve: (party) => {
        return 'id-' + party.slug;
      },
    }),
    electionType: t.exposeString('electionType', {
      description: 'The type of election the party is running for',
    }),
    inGovernment: t.exposeBoolean('inGovernment'),
    name: t.exposeString('name', {
      description: 'The name of a the party',
    }),
    leaders: t.field({
      type: [PartyLeader],
      resolve: async (party) => {
        return party.partyLeaders;
      },
      nullable: true,
    }),
    abbreviation: t.exposeString('abbreviation', {
      description: 'The abbreviation of a the party name',
      nullable: true,
    }),
    slug: t.exposeString('slug', {
      description: 'The slug of a the party name',
    }),
    color: t.exposeString('color', {
      deprecationReason: 'Use localy defined color',
      description: 'The hex color of a the party',
      nullable: true,
    }),
    answers: t.field({
      type: [Answer],
      resolve: async (party) => {
        return party.answers;
      },
    }),
    parliamentarySeats: t.exposeInt('parliamentarySeats', {
      description: 'Number of held seats in parlment',
      nullable: true,
    }),
    motivateVote: t.exposeString('motivateVote', {
      description: 'The motivation for voting for the party',
      nullable: true,
    }),
    answersString: t.exposeString('answersString', {
      description: 'Questions answers represented as a encoded string',
      nullable: true,
    }),
    answersCount: t.exposeInt('answersCount', {
      description: 'Number of questions answered',
    }),
    eligible: t.exposeBoolean('eligible', {
      description: 'If the party has answered more than 85% of the questions',
    }),
    keyIssues: t.field({
      type: ['KeyIssue'],
      description: 'List of key issues',
      resolve: (party) => {
        return party.keyIssues;
      },
    }),

    priortyPoliticalProposals: t.field({
      type: [ProfileQuestionsAnswer],
      resolve: (party) => {
        return party.priorityPoliticalProposals;
      },
    }),

    politicalProposals: t.field({
      type: [ProfileQuestionsAnswer],
      resolve: (party) => {
        return party.politicalProposals;
      },
    }),

    profileQuestionAnswers: t.field({
      deprecationReason: 'use politicalProposals and priortyPoliticalProposals',
      type: [ProfileQuestionsAnswer],
      resolve: (party) => {
        return party.politicalProposals;
      },
    }),

    generalQuestionAnswers: t.field({
      type: [ProfileQuestionsAnswer],
      resolve: (party) => {
        return party.generalQuestionAnswers;
      },
    }),
  }),
});
