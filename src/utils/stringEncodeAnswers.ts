import { QuestionAnswerModel } from '../models/svt';

export default function stringEncodeAnswers(answers: QuestionAnswerModel[]) {
  return answers
    .map((answer) => {
      const notAnswered = '_';
      let encodedAnswer: string = notAnswered;

      if (answer.value !== null) {
        switch (answer.questionType) {
          case 'PROPOSITION':
            encodedAnswer = answer.value;
            break;
          case 'PRIORITY':
            encodedAnswer =
              answer.value.length > 0
                ? `[${answer.value.join(',')}]`
                : notAnswered;
            break;
          case 'RANGE':
            encodedAnswer = `${answer.value}/5`;
            break;
          default:
            encodedAnswer = notAnswered;
            break;
        }
      }
      if (encodedAnswer !== notAnswered && answer.important) {
        encodedAnswer += '!';
      }
      return encodedAnswer;
    })
    .join(';');
}
