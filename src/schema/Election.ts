import builder from '../builder';
import getCandidates from '../db/getCandidates';
import { CandidateModel, ElectionModel, PartyModel } from '../models/svt';
import { ElectionCandidateFilter } from './ElectionCandidateFilter';
import { Municipality } from './Municipality';
import { Party } from './Party';
import { PartyFilter } from './PartyFilter';
import { Question } from './Question';
import { QuestionFilter } from './QuestionFilter';
import getPartiesByElection from '../db/getPartiesByElection';
import getQuestionsByElection from '../db/getQuestionsByElection';
import getMunicipalityBySlug from '../db/getMunicipalityBySlug';

export const Election = builder.objectRef<ElectionModel>('Election');

builder.objectType(Election, {
  description: 'A election',
  fields: (t) => ({
    id: t.exposeString('id'),
    activeNational: t.field({
      type: 'Boolean',
      resolve: async (election) => {
        if (election.id !== 'riksdag') {
          return false;
        }
        const parties = await getPartiesByElection(election.id);
        const count = parties.filter((party) => party.eligible).length;
        return count >= Math.round(parties.length * 0.5) && parties.length > 0;
      },
    }),
    activeMunicipality: t.field({
      type: 'Boolean',
      resolve: async (election) => {
        if (election.id === 'riksdag') {
          return false;
        }
        const parties = await getPartiesByElection(election.id);
        const count = parties.filter((party) => party.eligible).length;
        return count >= Math.round(parties.length * 0.5) && parties.length > 0;
      },
    }),

    activeRegion: t.field({
      type: 'Boolean',
      resolve: async (election) => {
        if (election.id === 'riksdag') {
          return false;
        }
        const municipality = await getMunicipalityBySlug(election.id);
        const regionSlug = municipality.regionSlug;
        const parties = await getPartiesByElection(regionSlug);
        const count = parties.filter((party) => party.eligible).length;
        return count >= Math.round(parties.length * 0.5) && parties.length > 0;
      },
    }),

    municipality: t.field({
      type: Municipality,
      nullable: true,
      resolve: async (election) => {
        if (election.id === 'riksdag') {
          return null;
        }
        return getMunicipalityBySlug(election.id);
      },
    }),
    candidates: t.field({
      type: ['Candidate'],
      args: {
        filter: t.arg({
          type: ElectionCandidateFilter,
          required: false,
        }),
      },
      resolve: async (election, { filter }) => {
        let candidates: CandidateModel[] = await getCandidates();
        if (election.id !== 'riksdag') {
          const municipality = await getMunicipalityBySlug(election.id);
          candidates = candidates.filter((candidate) => {
            return Boolean(
              candidate.constituencies.find((constituency) => {
                return constituency.municipalities.includes(municipality.slug);
              })
            );
          });
        }

        if (filter?.eligible !== undefined) {
          candidates = candidates.filter(
            ({ eligible }) => filter.eligible === eligible
          );
        }

        return candidates;
      },
    }),
    parties: t.field({
      type: [Party],
      description: 'The parties that are part of this election',
      args: {
        filter: t.arg({
          type: PartyFilter,
          required: false,
        }),
      },
      resolve: async (election, { filter }) => {
        let parties: PartyModel[] = [];

        if (
          (filter?.electionType === 'national' ||
            filter?.electionType === undefined) &&
          election.id === 'riksdag'
        ) {
          parties = await getPartiesByElection('riksdag');
        }

        if (
          filter?.electionType === 'municipality' &&
          election.id !== 'riksdag'
        ) {
          parties = await getPartiesByElection(election.id);
        }

        if (filter?.electionType === 'region' && election.id !== 'riksdag') {
          const municipality = await getMunicipalityBySlug(election.id);
          const regionSlug = municipality.regionSlug;
          parties = await getPartiesByElection(regionSlug);
        }

        if (filter?.electionType === undefined && election.id !== 'riksdag') {
          const municipality = await getMunicipalityBySlug(election.id);
          const regionSlug = municipality.regionSlug;
          parties = [
            ...(await getPartiesByElection(election.id)),
            ...(await getPartiesByElection(regionSlug)),
          ];
        }

        if (filter?.eligible !== undefined) {
          parties = parties.filter(
            ({ eligible }) => filter.eligible === eligible
          );
        }

        return parties;
      },
    }),
    question: t.field({
      type: Question,
      nullable: true,
      args: {
        filter: t.arg({
          type: QuestionFilter,
          required: true,
        }),
      },
      description: 'A single election specific question',
      resolve: async (election, { filter }) => {
        // TODO: remove filter in favor only allowing get by slug.
        const { slug, electionType, type } = filter || {};
        let questions = [];
        if (election.id === 'riksdag') {
          questions = await getQuestionsByElection('riksdag');
        } else {
          const municipality = await getMunicipalityBySlug(election.id);
          questions = [
            ...new Set([
              ...(await getQuestionsByElection(municipality.slug)),
              ...(await getQuestionsByElection(municipality.regionSlug)),
            ]),
          ];
        }

        if (slug) {
          questions = questions.filter((question) => question.slug === slug);
        }

        if (electionType) {
          questions = questions.filter((question) =>
            electionType.includes(question.electionType)
          );
        }

        if (type) {
          questions = questions.filter((question) =>
            type.includes(question.type)
          );
        }

        return questions[0] || null;
      },
    }),
    questions: t.field({
      type: [Question],
      description: 'List of questions for this election type',
      args: {
        filter: t.arg({
          type: QuestionFilter,
          required: false,
        }),
      },
      resolve: async (election, { filter }) => {
        const { slug, electionType, type } = filter || {};
        let questions = [];
        if (election.id === 'riksdag') {
          questions = await getQuestionsByElection('riksdag');
        } else {
          const municipality = await getMunicipalityBySlug(election.id);
          questions = [
            ...new Set([
              ...(await getQuestionsByElection(municipality.slug)),
              ...(await getQuestionsByElection(municipality.regionSlug)),
            ]),
          ];
        }

        if (slug) {
          questions = questions.filter((question) => question.slug === slug);
        }

        if (electionType) {
          questions = questions.filter((question) =>
            electionType.includes(question.electionType)
          );
        }

        if (type) {
          questions = questions.filter((question) =>
            type.includes(question.type)
          );
        }

        return questions;
      },
    }),
  }),
});
