import builder from '../builder';
import getQuestionById from '../db/getQuestionById';
import stringEncodeAnswers from '../utils/stringEncodeAnswers';
import { Question } from './Question';
import { QuestionAnswerSchema } from '../models/svt';

export const IAnswer = builder.interfaceType('IAnswer', {
  fields: (t) => ({
    questionId: t.exposeString('questionId', {
      description: 'The id of the question answered',
    }),
    questionType: t.field({
      type: 'QuestionType',
      description: 'The type of the question answered',
      resolve: (answer) => answer.questionType,
    }),
    question: t.field({
      type: Question,
      description: 'The parent question to the answer',
      resolve: async (answer) => {
        const question = await getQuestionById(answer.questionId);
        return question;
      },
    }),
    value: t.field({
      type: 'AnswerValue',
      nullable: true,
      description: 'The parent question to the answer',
      resolve: async (answer, _, __) => {
        return answer.value;
      },
    }),
    reasoning: t.exposeString('reasoning', {
      description: 'Aditonal reason for the given answer',
      nullable: true,
    }),
    important: t.exposeBoolean('important', {
      description: 'If the answer is marked as important',
    }),
    stringValue: t.field({
      type: 'String',
      nullable: true,
      description: 'The value of the answer encoded as a string',
      resolve: async (answer, _, __) => {
        const parsedAnswer = QuestionAnswerSchema.safeParse(answer);
        if (parsedAnswer.success) {
          return stringEncodeAnswers([parsedAnswer.data]);
        }
        throw new Error('Could not parse answer');
      },
    }),
  }),
});
