import builder from '../builder';
import getPartyByCode from '../db/getPartyByCode';
import getQuestionById from '../db/getQuestionById';
import { Answer } from './Answer';
import { CandidateModel } from '../models/svt';
import { Constituency } from './Constituency';
import { Image } from './Image';
import { KeyIssue } from './KeyIssue';
import { Party } from './Party';
import { ProfileQuestionsAnswer } from './ProfileQuestionAnswer';

export const Candidate = builder.objectRef<CandidateModel>('Candidate');

builder.objectType(Candidate, {
  description: 'A political candidate',
  fields: (t) => ({
    id: t.exposeString('id'),
    slug: t.exposeString('slug'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    fullName: t.exposeString('fullName'),
    birthdate: t.exposeString('birthdate', { nullable: true }),
    motivateVote: t.exposeString('motivateVote', { nullable: true }),
    answers: t.field({
      type: [Answer],
      resolve: async (candidate) => {
        let answers = [];
        for (let answer of candidate.answers) {
          try {
            await getQuestionById(answer.questionId);
            answers.push(answer);
          } catch {
            console.warn('Question for answer not found', answer.questionId);
          }
        }
        return answers;
      },
    }),
    answersString: t.exposeString('answersString', {
      description: 'Questions answers represented as a encoded string',
      nullable: true,
    }),
    answersCount: t.exposeInt('answersCount', {
      description: 'Number of questions answered',
    }),
    eligible: t.exposeBoolean('eligible', {
      description:
        'If the candidate has answered more than 85% of the questions',
    }),
    party: t.field({
      type: Party,
      resolve: (candidate) => {
        return getPartyByCode(candidate.partyCode);
      },
    }),
    image: t.field({
      type: Image,
      nullable: true,
      resolve: (candidate) => {
        return candidate.image;
      },
    }),
    constituencies: t.field({
      type: [Constituency],
      resolve: (candidate) => {
        return candidate.constituencies;
      },
    }),
    profileQuestionAnswers: t.field({
      type: [ProfileQuestionsAnswer],
      resolve: (candidate) => {
        return candidate.profileQuestionAnswers;
      },
    }),
    keyIssues: t.field({
      type: [KeyIssue],
      description: 'List of key issues',
      resolve: (candidate) => {
        return candidate.keyIssues;
      },
    }),
    updated: t.exposeString('updated', { nullable: true }),
  }),
});
