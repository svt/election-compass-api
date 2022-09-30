import createError from 'http-errors';
import data from './data';
import { CandidateModel } from '../models/svt';

export default async function getCandidateBySlug(
  slug: string
): Promise<CandidateModel> {
  const candidate = data.candidates.find(
    (candidate: any) => candidate.slug === slug
  );
  if (!candidate) {
    throw new createError.NotFound('Candidate not found');
  }
  return candidate;
}
