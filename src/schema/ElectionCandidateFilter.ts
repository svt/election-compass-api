import builder from '../builder';
import { CandidateFilterModel } from '../models/svt';

export const ElectionCandidateFilter = builder.inputRef<CandidateFilterModel>(
  'ElectionCandidateFilter'
);

builder.inputType(ElectionCandidateFilter, {
  fields: (t) => ({
    eligible: t.boolean({ required: false }),
  }),
});
