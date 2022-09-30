import * as config from '../config';
import * as fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import {
  CandidateSchema,
  PartySchema,
  QuestionSchema,
  MunicipalitySchema,
  QuestionModel,
  PartyModel,
  CandidateModel,
  MunicipalityModel,
} from '../models/svt';
import { z } from 'zod';

type Store = {
  questions: Record<string, Readonly<QuestionModel>[]>;
  parties: Record<string, Readonly<PartyModel>[]>;
  candidates: Readonly<CandidateModel>[];
  municipalities: Readonly<MunicipalityModel>[];
};

const store: Store = Object.freeze(
  fs
    .readdirSync(config.DATA_DIR)
    .filter((f) => f.endsWith('.json'))
    .reduce<Store>(
      (acc, file) => {
        let checksum;
        try {
          checksum = fs.readFileSync(
            path.join(config.DATA_DIR, file.replace('.json', '.md5')),
            'utf8'
          );
        } catch {
          throw new Error(`Missing checksum for ${file}`);
        }

        let json = fs.readFileSync(path.join(config.DATA_DIR, file), 'utf8');
        if (checksum !== crypto.createHash('md5').update(json).digest('hex')) {
          throw new Error(`Invalid checksum for ${file}`);
        }

        if (file.endsWith('-questions.json')) {
          acc.questions = Object.assign(acc.questions, {
            [file.replace('-questions.json', '')]: z
              .array(QuestionSchema)
              .parse(JSON.parse(json)),
          });
        }

        if (file.endsWith('-parties.json')) {
          acc.parties = Object.assign(acc.parties, {
            [file.replace('-parties.json', '')]: z
              .array(PartySchema)
              .parse(JSON.parse(json)),
          });
        }

        if (file === 'candidates.json') {
          acc.candidates = z.array(CandidateSchema).parse(JSON.parse(json));
        }

        if (file === 'municipalities.json') {
          acc.municipalities = z
            .array(MunicipalitySchema)
            .parse(JSON.parse(json));
        }

        return acc;
      },
      { questions: {}, parties: {}, candidates: [], municipalities: [] }
    )
);

export default store;
