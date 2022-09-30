import createError from 'http-errors';
import data from './data';
import { PartyModel } from '../models/svt';

export default async function getPartyBySlug(
  slug: string
): Promise<PartyModel> {
  for (const namespace in data.parties) {
    const party = data.parties[namespace].find((p) => p.slug === slug);
    if (party) {
      return party;
    }
  }
  throw new createError.NotFound('Party not found');
}
