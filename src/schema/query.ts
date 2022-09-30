import builder from '../builder';
import getCandidateBySlug from '../db/getCandidateBySlug';
import getCandidates from '../db/getCandidates';
import getMunicipalities from '../db/getMunicipalities';
import getParties from '../db/getParties';
import getPartiesByElection from '../db/getPartiesByElection';
import getPartyBySlug from '../db/getPartyBySlug';
import getQuestionsByElection from '../db/getQuestionsByElection';
import getRegions from '../db/getRegions';
import { Candidate } from './Candidate';
import { Election } from './Election';
import { Municipality } from './Municipality';
import { MunicipalityFilter } from './MunicipalityFilter';
import { Party } from './Party';
import { PartyFilter } from './PartyFilter';
import { Region } from './Region';

const electionArgs = builder.args((t) => ({
  slug: t.string({
    required: false,
    description:
      'slug of the of the election to use as context for nested fields',
  }),
}));

const candidateArgs = builder.args((t) => ({
  slug: t.string({
    required: true,
    description: 'slug of the candidate',
  }),
}));

builder.queryType({
  fields: (t) => ({
    partySlugs: t.field({
      type: ['String'],
      description: 'List of all party slugs',
      resolve: async () => {
        const municipalities = await getMunicipalities();
        const nationalParties = await getPartiesByElection('riksdag');
        const partySlugs: string[] = [];

        nationalParties.forEach(({ slug }) => {
          partySlugs.push(slug);
        });

        for (const municipality of municipalities) {
          const municipalityParties = await getPartiesByElection(
            municipality.slug
          );

          const regionParties = await getPartiesByElection(
            municipality.regionSlug
          );

          [...new Set([...municipalityParties, ...regionParties])].forEach(
            ({ slug }) => {
              partySlugs.push(slug);
            }
          );
        }
        return partySlugs.sort();
      },
    }),
    questionSlugs: t.field({
      type: ['String'],
      description: 'List of all question slugs',
      resolve: async () => {
        const municipalities = await getMunicipalities();
        const nationalQuestions = await getQuestionsByElection('riksdag');
        const questionSlugs: string[] = [];

        nationalQuestions.forEach(({ slug }) => {
          questionSlugs.push(`riksdag/${slug}`);
        });

        for (const municipality of municipalities) {
          const municipalityQuestions = await getQuestionsByElection(
            municipality.slug
          );

          const regionQuestions = await getQuestionsByElection(
            municipality.regionSlug
          );

          [...new Set([...municipalityQuestions, ...regionQuestions])].forEach(
            ({ slug }) => {
              questionSlugs.push(`${municipality.slug}/${slug}`);
            }
          );
        }
        return questionSlugs.sort();
      },
    }),
    party: t.field({
      type: Party,
      args: {
        filter: t.arg({
          type: PartyFilter,
          required: true,
        }),
      },
      description: 'Get a party by slug',
      resolve: async (_, { filter }) => {
        if (!filter.slug) {
          throw new Error('Missing slug');
        }
        return getPartyBySlug(filter.slug);
      },
    }),
    parties: t.field({
      type: [Party],
      args: {
        electionSlug: t.arg.string({
          required: false,
          description: 'slug of the election',
        }),
      },
      description: 'Get all parties or parties by election',
      resolve: async (_, { electionSlug }) => {
        const parties = await (electionSlug
          ? getPartiesByElection(electionSlug)
          : getParties());

        return parties.filter(({ eligible }) => eligible === true);
      },
    }),
    candidates: t.field({
      type: [Candidate],
      resolve: async () => {
        const candidates = await getCandidates();
        return candidates;
      },
    }),
    candidate: t.field({
      type: Candidate,
      args: candidateArgs,
      resolve: async (_, { slug }) => {
        const candidates = await getCandidateBySlug(slug);
        return candidates;
      },
    }),
    municipalities: t.field({
      type: [Municipality],
      args: {
        filter: t.arg({
          type: MunicipalityFilter,
          required: false,
        }),
      },
      resolve: async (_, { filter }) => {
        const { slug } = filter || {};
        let municipalities = await getMunicipalities();
        if (slug) {
          municipalities = municipalities.filter((m) => m.slug === slug);
        }
        return municipalities;
      },
    }),
    regions: t.field({
      type: [Region],
      resolve: async () => {
        return getRegions();
      },
    }),
    election: t.field({
      type: Election,
      args: electionArgs,
      resolve: async (_, { slug }) => {
        if (!slug) {
          slug = 'riksdag';
        }
        return {
          id: slug,
          parties: [],
          questions: [],
          slug,
        };
      },
    }),
  }),
});
