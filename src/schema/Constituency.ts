import builder from '../builder';
import { ConstituencyModel } from '../models/svt';

export const Constituency =
  builder.objectRef<ConstituencyModel>('Constituency');

builder.objectType(Constituency, {
  description: 'A election constituency (valkrets)',
  fields: (t) => ({
    name: t.exposeString('name'),
  }),
});
