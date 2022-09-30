import builder from '../builder';
import { RegionModel } from '../models/svt';

export const Region = builder.objectRef<RegionModel>('Region');

builder.objectType(Region, {
  description: 'Regions in sweden',
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    slug: t.exposeString('slug'),
  }),
});
