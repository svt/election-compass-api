import createError from 'http-errors';
import data from './data';
import { QuestionModel } from '../models/svt';

export default async function getQuestionsByElection(
  electionSlug: string
): Promise<QuestionModel[]> {
  const questions = data.questions[electionSlug];
  if (questions) {
    return questions;
  }

  throw new createError.NotFound('Questions not found');
}
