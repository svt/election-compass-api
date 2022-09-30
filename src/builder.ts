import SchemaBuilder from '@pothos/core';
import {
  BaseQuestionModel,
  PriorityQuestionModel,
  PropositionQuestionModel,
  QuestionModel,
  RangeQuestionModel,
  PartyModel,
  KeyIssueModel,
  CandidateModel,
  QuestionAnswerModel,
  ElectionModel,
  MunicipalityModel,
  ImageModel,
  BaseQuestionAnswerModel,
} from './models/svt';

type Types = {
  Objects: {
    Image: ImageModel;
    AnswerValue: string | string[];
    Answer: QuestionAnswerModel;
    Candidate: CandidateModel;
    Election: ElectionModel;
    KeyIssue: KeyIssueModel;
    Municipality: MunicipalityModel;
    Party: PartyModel;
    PriorityQuestion: PriorityQuestionModel;
    PropositionQuestion: PropositionQuestionModel;
    Question: QuestionModel;
    RangeQuestion: RangeQuestionModel;
    String: string;
  };
  Interfaces: {
    IQuestion: BaseQuestionModel;
    IAnswer: BaseQuestionAnswerModel;
  };
  Scalars: {
    AnswerValue: {
      Input: string | string[];
      Output: string | string[];
    };
    RangeValue: {
      Input: '0' | '1' | '2' | '3' | '4';
      Output: '0' | '1' | '2' | '3' | '4';
    };
    PropositionValue: {
      Input: 'A' | 'B' | 'C' | 'D';
      Output: 'A' | 'B' | 'C' | 'D';
    };
    PriorityValue: {
      Input: string[];
      Output: string[];
    };
    QuestionType: {
      Input: 'PRIORITY' | 'PROPOSITION' | 'RANGE' | 'IMPORTANT';
      Output: 'PRIORITY' | 'PROPOSITION' | 'RANGE' | 'IMPORTANT';
    };
  };
};

const builder = new SchemaBuilder<Types>({});

builder.scalarType('AnswerValue', {
  serialize: (n) => n,
  parseValue: (n) => {
    if (typeof n === 'string') {
      return n;
    }
    if (Array.isArray(n)) {
      return n;
    }

    throw new Error('Value must be string or array of strings');
  },
});

builder.scalarType('RangeValue', {
  serialize: (n) => n,
  parseValue: (n) => {
    switch (n) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
        return n;
      default:
        throw new Error('Value must be 0, 1, 2, 3 or 4');
    }
  },
});

builder.scalarType('PropositionValue', {
  serialize: (n) => n,
  parseValue: (n) => {
    switch (n) {
      case 'A':
      case 'B':
      case 'C':
      case 'D':
        return n;
      default:
        throw new Error('Value must be A, B, C or D');
    }
  },
});

builder.scalarType('QuestionType', {
  serialize: (n) => n,
  parseValue: (n) => {
    switch (n) {
      case 'IMPORTANT':
      case 'PRIORITY':
      case 'PROPOSITION':
      case 'RANGE':
        return n;
      default:
        throw new Error(
          'Value must be IMPORTANT, PRIORITY, PROPOSITION or RANGE'
        );
    }
  },
});

builder.scalarType('PriorityValue', {
  serialize: (n) => n,
  parseValue: (n) => {
    if (Array.isArray(n)) {
      for (const item of n) {
        if (typeof item !== 'string') {
          throw new Error('Value must be array of strings');
        }
      }
      return n;
    }
    throw new Error('Value must be array of strings');
  },
});

export default builder;
