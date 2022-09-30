import createError from 'http-errors';
import data from './data';
import { MunicipalityModel } from '../models/svt';

export default async function getMunicipalityBySlug(
  slug: string
): Promise<MunicipalityModel> {
  const municipality = data.municipalities.find((m) => m.slug === slug);
  if (municipality) {
    return municipality;
  }
  throw new createError.NotFound('Municipality not found');
}
