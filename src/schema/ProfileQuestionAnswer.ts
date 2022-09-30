import builder from '../builder';
import { ProfileQuestionAnswerModel } from '../models/svt';

export const ProfileQuestionsAnswer =
  builder.objectRef<ProfileQuestionAnswerModel>('ProfileQuestionAnswer');

builder.objectType(ProfileQuestionsAnswer, {
  description: 'Answer to profile questions',
  fields: (t) => ({
    question: t.exposeString('question'),
    title: t.exposeString('title'),
    answer: t.exposeString('answer'),
    type: t.exposeString('type'),
  }),
});
