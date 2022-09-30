import builder from '../builder';
import { Image } from './Image';
import { PartyLeaderModel } from '../models/svt';

export const PartyLeader = builder
  .objectRef<PartyLeaderModel>('PartyLeader')
  .implement({
    description: 'A leader for a political party',
    fields: (t) => ({
      name: t.exposeString('name', { description: 'Full candidate name' }),
      image: t.field({
        type: Image,
        description: 'Profile image',
        resolve: (leader) => {
          return leader.image;
        },
      }),
    }),
  });
