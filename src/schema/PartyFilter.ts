import builder from '../builder';
import { ElectionType } from './ElectionType';
import { PartyFilterModel } from '../models/svt';

export const PartyFilter = builder.inputRef<PartyFilterModel>('PartyFilter');

builder.inputType(PartyFilter, {
  fields: (t) => ({
    slug: t.string({ required: false }),
    electionType: t.field({
      type: ElectionType,
      required: false,
    }),
    eligible: t.boolean({ required: false }),
  }),
});
