import { ImageModel } from '../models/svt';
import builder from '../builder';

export const Image = builder.objectRef<ImageModel>('Image');

builder.objectType(Image, {
  description: 'A image resource',
  fields: (t) => ({
    id: t.exposeString('id'),
    url: t.exposeString('url'),
    thumbnail: t.exposeString('thumbnail', {
      deprecationReason: 'Use thumbnailUrl instead',
    }),
    thumbnailUrl: t.exposeString('thumbnail'),
    photographer: t.exposeString('photographer', { nullable: true }),
  }),
});
