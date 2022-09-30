//
// These are schema maps of normalized external data strucutres
// used by our (SVT) application.
//

import { z } from 'zod';
import isISODateString from '../utils/isISODateString';

export enum ElectionId {
  National = '1',
  NationalParties = '5',
  Municipality = '2',
  Region = '3',
}

const ElectionIdEnumSchema = z.nativeEnum(ElectionId);

export type ElectionIdEnum = z.infer<typeof ElectionIdEnumSchema>;

export const ElectionTypeSchema = z.union([
  z.literal('national'),
  z.literal('municipality'),
  z.literal('region'),
]);

export const PropositionValueSchema = z.union([
  z.literal('A'),
  z.literal('B'),
  z.literal('C'),
  z.literal('D'),
]);

export const RangeValueSchema = z.union([
  z.literal('0'),
  z.literal('1'),
  z.literal('2'),
  z.literal('3'),
  z.literal('4'),
]);

const ConstituencySchema = z.object({
  id: z.number(),
  municipalities: z.array(z.string()),
  name: z.string(),
});

export const ConstituencyListSchema = z.array(ConstituencySchema);

export const ProfileQuestionAnswerSchema = z.object({
  question: z.string(),
  title: z.string(),
  answer: z.string(),
  type: z.string(),
});

const PriorityValueSchema = z.array(z.string());

const QuestionAnswerValueSchema = z.union([
  PropositionValueSchema,
  RangeValueSchema,
  PriorityValueSchema,
]);

const QuestionTypesSchema = z.union([
  z.literal('RANGE'),
  z.literal('PRIORITY'),
  z.literal('PROPOSITION'),
  z.literal('IMPORTANT'),
]);

const BaseQuestionAnswerSchema = z.object({
  important: z.boolean(),
  questionId: z.string(),
  questionType: QuestionTypesSchema,
  reasoning: z.string().nullable(),
  stringValue: z.string().optional(),
  value: QuestionAnswerValueSchema.nullable(),
});

export const PropositionQuestionAnswerSchema = BaseQuestionAnswerSchema.extend({
  questionType: z.literal('PROPOSITION'),
  value: PropositionValueSchema.nullable(),
});

export const RangeQuestionAnswerSchema = BaseQuestionAnswerSchema.extend({
  questionType: z.literal('RANGE'),
  value: RangeValueSchema.nullable(),
});

export const PriorityQuestionAnswerSchema = BaseQuestionAnswerSchema.extend({
  questionType: z.literal('PRIORITY'),
  value: PriorityValueSchema.nullable(),
});

export const QuestionAnswerSchema = z.union([
  PropositionQuestionAnswerSchema,
  RangeQuestionAnswerSchema,
  PriorityQuestionAnswerSchema,
]);

const KeyIssuesSchema = z.object({
  category: z.string(),
  description: z.string(),
});

const ImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  thumbnail: z.string(),
  thumbnailUrl: z.string(),
  photographer: z.string().nullable(),
});

const PartyLeaderSchema = z.object({
  name: z.string(),
  image: ImageSchema,
});

export const PartySchema = z.object({
  abbreviation: z.string().nullable(),
  altingetCandidateId: z.string(),
  answers: z.array(QuestionAnswerSchema),
  answersString: z.string().nullable(),
  answersCount: z.number(),
  eligible: z.boolean(),
  color: z.string().nullable(),
  electionType: ElectionTypeSchema,
  keyIssues: z.array(KeyIssuesSchema),
  motivateVote: z.string().nullable(),
  name: z.string(),
  inGovernment: z.boolean(),
  parliamentarySeats: z.number().nullable(),
  partyLeaders: z.array(PartyLeaderSchema).nullable(),
  politicalProposals: z.array(ProfileQuestionAnswerSchema),
  priorityPoliticalProposals: z.array(ProfileQuestionAnswerSchema),
  generalQuestionAnswers: z.array(ProfileQuestionAnswerSchema),
  slug: z.string(),
});

export const ProfileQuestionTopicsSchema = z.object({
  Care: z.string(),
  GangViolence: z.string(),
  Education: z.string(),
  Carbondioxid: z.string(),
  Segregation: z.string(),
  Unemployment: z.string(),
  ElderCare: z.string(),
  MentalIlness: z.string(),
  EnergySupply: z.string(),
  EmergencyManagement: z.string(),
});

const NationalPartyLeaderSchema = z.object({
  name: z.string(),
  imageUrl: z.string(),
  imageThumbnailUrl: z.string(),
  imagePhotographer: z.string(),
});

const NationalPartyMetadataSchema = z.object({
  leaders: z.array(NationalPartyLeaderSchema),
  seats: z.number(),
  inGovernment: z.boolean(),
  importantPoliticalQuestions: z.array(z.string()),
});

export const NationalPartyMetadataMapSchema = z.object({
  socialdemokraterna: NationalPartyMetadataSchema,
  moderaterna: NationalPartyMetadataSchema,
  sverigedemokraterna: NationalPartyMetadataSchema,
  centerpartiet: NationalPartyMetadataSchema,
  vansterpartiet: NationalPartyMetadataSchema,
  kristdemokraterna: NationalPartyMetadataSchema,
  liberalerna: NationalPartyMetadataSchema,
  miljopartiet: NationalPartyMetadataSchema,
});

const QuestionAlternativeSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const BaseQuestionSchema = z.object({
  id: z.string(),
  altingetId: z.string(),
  slug: z.string(),
  title: z.string(),
  type: QuestionTypesSchema,
  description: z.string().nullable(),
  electionType: ElectionTypeSchema,
  electionTypeSlug: z.string(),
});

const RangeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('RANGE'),
  positions: z.array(z.string()),
});

const PriorityQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('PRIORITY'),
  alternatives: z.array(QuestionAlternativeSchema),
});

const PropositionQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('PROPOSITION'),
});

export const QuestionSchema = z.union([
  RangeQuestionSchema,
  PriorityQuestionSchema,
  PropositionQuestionSchema,
]);

export const QuestionFilterSchema = z.object({
  slug: z.string().optional().nullable(),
  electionType: z
    .array(
      z.union([
        z.literal('national'),
        z.literal('municipality'),
        z.literal('region'),
      ])
    )
    .optional().nullable(),
  type: z.array(QuestionTypesSchema).optional().nullable(),
});

export const PartyFilterSchema = z.object({
  slug: z.string().optional(),
  electionType: z
    .union([
      z.literal('national'),
      z.literal('municipality'),
      z.literal('region'),
    ])
    .optional(),
  eligible: z.boolean().optional(),
});

export const CandidateSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  birthdate: z
    .string()
    .refine(isISODateString, {
      message: 'Invalid iso date string',
    })
    .nullable(),
  slug: z.string(),
  answers: z.array(QuestionAnswerSchema),
  answersString: z.string().nullable(),
  answersCount: z.number(),
  eligible: z.boolean(),
  motivateVote: z.string().nullable(),
  partyCode: z.string(),
  keyIssues: z.array(KeyIssuesSchema),
  image: ImageSchema.nullable(),
  profileQuestionAnswers: z.array(ProfileQuestionAnswerSchema),
  constituencies: ConstituencyListSchema,
  updated: z
    .string()
    .refine(isISODateString, {
      message: 'Invalid iso date string',
    })
    .nullable(),
});

export const ElectionSchema = z.object({
  id: z.string(),
  questions: z.array(QuestionSchema),
  parties: z.array(PartySchema),
});

export const MunicipalitySchema = z.object({
  id: z.string(),
  altingetId: z.string(),
  name: z.string(),
  fullName: z.string(),
  slug: z.string(),
  regionAltingetId: z.string(),
  regionId: z.string(),
  regionName: z.string(),
  regionSlug: z.string(),
  countyName: z.string(),
});

export const MunicipalityFilterSchema = z.object({
  slug: z.string().optional().nullable(),
});

export const RegionSchema = z.object({
  altingetId: z.string(),
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  municipalityIds: z.array(z.string()),
});

export const CandidateFilterSchema = z.object({
  electionSlug: z.string().optional(),
  eligible: z.boolean().optional(),
});

const QuestionResponseSchema = z.object({
  party: PartySchema,
  answer: QuestionAnswerSchema,
});

export type NationalPartyMetadataMapModel = z.infer<
  typeof NationalPartyMetadataMapSchema
>;

export type ConstituencyModel = z.infer<typeof ConstituencySchema>;

export type CandidateFilterModel = z.infer<typeof CandidateFilterSchema>;

export type MunicipalityFilterModel = z.infer<typeof MunicipalityFilterSchema>;

export type KeyIssueModel = z.infer<typeof KeyIssuesSchema>;

export type CandidateModel = z.infer<typeof CandidateSchema>;

export type PartyModel = z.infer<typeof PartySchema>;

export type AnswerValueModel = z.infer<typeof QuestionAnswerValueSchema>;

export type ElectionModel = z.infer<typeof ElectionSchema>;

export type MunicipalityModel = z.infer<typeof MunicipalitySchema>;

export type ImageModel = z.infer<typeof ImageSchema>;

export type PartyFilterModel = z.infer<typeof PartyFilterSchema>;

export type RegionModel = z.infer<typeof RegionSchema>;

//
// Questions
//

export type QuestionAlternativeModel = z.infer<
  typeof QuestionAlternativeSchema
>;

export type QuestionModel = z.infer<typeof QuestionSchema>;

export type BaseQuestionModel = z.infer<typeof BaseQuestionSchema>;

export type RangeQuestionModel = z.infer<typeof RangeQuestionSchema>;

export type PriorityQuestionModel = z.infer<typeof PriorityQuestionSchema>;

export type PropositionQuestionModel = z.infer<
  typeof PropositionQuestionSchema
>;

export type QuestionFilterModel = z.infer<typeof QuestionFilterSchema>;

//
// Question Answers
//

export type BaseQuestionAnswerModel = z.infer<typeof BaseQuestionAnswerSchema>;

export type PriorityQuestionAnswerModel = z.infer<
  typeof PriorityQuestionAnswerSchema
>;

export type RangeQuestionAnswerModel = z.infer<
  typeof RangeQuestionAnswerSchema
>;

export type PropositionQuestionAnswerModel = z.infer<
  typeof PropositionQuestionAnswerSchema
>;

export type QuestionAnswerModel = z.infer<typeof QuestionAnswerSchema>;

export type PropositionQuestionAnswerValueModel = z.infer<
  typeof PropositionValueSchema
>;

export type RangeQuestionAnswerValueModel = z.infer<typeof RangeValueSchema>;

export type QuestionResponseModel = z.infer<typeof QuestionResponseSchema>;
export type ProfileQuestionAnswerModel = z.infer<
  typeof ProfileQuestionAnswerSchema
>;

export type PartyLeaderModel = z.infer<typeof PartyLeaderSchema>;

export type ProfileQuestionTopicsModel = z.infer<
  typeof ProfileQuestionTopicsSchema
>;


// some other stuff
