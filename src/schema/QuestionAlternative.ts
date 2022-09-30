import builder from '../builder';
import { QuestionAlternativeModel } from '../models/svt';

export const QuestionAlternative = builder.objectRef<QuestionAlternativeModel>(
  'QuestionAlternative'
);

builder.objectType(QuestionAlternative, {
  description: 'A question alternative',
  fields: (t) => ({
    id: t.string({
      nullable: false,
      resolve: (parent) => parent.id,
    }),
    text: t.string({
      nullable: false,
      resolve: (parent) => parent.title,
    }),
  }),
});
