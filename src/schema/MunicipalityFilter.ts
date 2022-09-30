import builder from '../builder';
import { MunicipalityFilterModel } from '../models/svt';

export const MunicipalityFilter =
  builder.inputRef<MunicipalityFilterModel>('MuncipalityFilter');

builder.inputType(MunicipalityFilter, {
  fields: (t) => ({
    slug: t.string({ required: false }),
  }),
});
