import createError from 'http-errors';
import data from './data';
import { PartyModel } from '../models/svt';

export default async function getPartyByCode(
  code: string
): Promise<PartyModel> {
  const party = data.parties['riksdag'].find(
    (p) => p.abbreviation?.toLowerCase() === code.toLowerCase()
  );

  if (party) {
    return party;
  }

  throw new createError.NotFound('Party not found');
}
