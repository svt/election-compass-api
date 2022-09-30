import createError from 'http-errors';
import data from './data';
import { QuestionModel } from '../models/svt';

export default async function getQuestionById(
  id: string
): Promise<QuestionModel> {
  for (const namespace in data.questions) {
    const questions = data.questions[namespace];
    if (!questions) {
      throw new createError.NotFound('Question not found');
    }
    const question = questions.find((q) => q.id === id);
    if (question) {
      return question;
    }
  }
  throw new createError.NotFound('Question not found');
}
