import stringEncodeAnswers from './stringEncodeAnswers';
import { QuestionAnswerModel } from '../models/svt';
import { faker } from '@faker-js/faker';

it('should encode answers', () => {
  const answers: QuestionAnswerModel[] = [
    {
      important: false,
      questionId: faker.datatype.uuid(),
      value: 'A',
      questionType: 'PROPOSITION',
      reasoning: null,
    },
    {
      important: true,
      questionId: faker.datatype.uuid(),
      value: 'B',
      questionType: 'PROPOSITION',
      reasoning: null,
    },
    {
      important: false,
      questionId: faker.datatype.uuid(),
      value: null,
      questionType: 'PROPOSITION',
      reasoning: null,
    },
    {
      important: false,
      questionId: faker.datatype.uuid(),
      value: ['C', 'D'],
      questionType: 'PRIORITY',
      reasoning: null,
    },
    {
      important: true,
      questionId: faker.datatype.uuid(),
      value: ['E', 'F'],
      questionType: 'PRIORITY',
      reasoning: null,
    },
    {
      important: false,
      questionId: faker.datatype.uuid(),
      value: [],
      questionType: 'PRIORITY',
      reasoning: null,
    },
    {
      important: false,
      questionId: faker.datatype.uuid(),
      value: null,
      questionType: 'PRIORITY',
      reasoning: null,
    },
    {
      important: false,
      questionId: faker.datatype.uuid(),
      value: '0',
      questionType: 'RANGE',
      reasoning: null,
    },
    {
      important: true,
      questionId: faker.datatype.uuid(),
      value: '1',
      questionType: 'RANGE',
      reasoning: null,
    },
    {
      important: false,
      questionId: faker.datatype.uuid(),
      value: null,
      questionType: 'RANGE',
      reasoning: null,
    },
  ];
  const encodedAnswers = stringEncodeAnswers(answers);
  expect(encodedAnswers).toBe('A;B!;_;[C,D];[E,F]!;_;_;0/5;1/5!;_');
});

it('should treat invalid answers as skipped', () => {
  const answers: any[] = [{}];
  const encodedAnswers = stringEncodeAnswers(answers);
  expect(encodedAnswers).toBe('_');
});
