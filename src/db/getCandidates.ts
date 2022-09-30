import data from './data';
import { CandidateModel } from '../models/svt';

export default async function getCandidateById(): Promise<CandidateModel[]> {
  return data.candidates;
}
