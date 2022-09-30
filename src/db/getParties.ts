import data from './data';

export default async function getParties() {
  const parties = [];
  for (const electionSlug in data.parties) {
    const electionParties = data.parties[electionSlug];
    for (const party of electionParties) {
      parties.push(party);
    }
  }
  parties.sort((a, b) => a.name.localeCompare(b.name, 'sv'));
  return parties;
}

