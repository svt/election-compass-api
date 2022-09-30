import builder from '../builder';
import { KeyIssueModel } from '../models/svt';

export const KeyIssue = builder.objectRef<KeyIssueModel>('KeyIssue');

builder.objectType(KeyIssue, {
  fields: (t) => ({
    category: t.exposeString('category'),
    description: t.exposeString('description'),
  }),
});
