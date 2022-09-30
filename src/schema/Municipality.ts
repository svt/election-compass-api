import builder from '../builder';
import { MunicipalityModel } from '../models/svt';

export const Municipality =
  builder.objectRef<MunicipalityModel>('Municipality');

builder.objectType(Municipality, {
  description: 'Municipalities in sweden',
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    fullName: t.exposeString('fullName'),
    slug: t.exposeString('slug'),
    regionId: t.exposeString('regionId'),
    regionName: t.exposeString('regionName'),
    countyName: t.exposeString('countyName'),
  }),
});
