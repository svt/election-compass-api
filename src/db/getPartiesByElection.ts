import data from './data';

export default async function getPartiesByElection(electionSlug: string) {
  return data.parties[electionSlug];
}
