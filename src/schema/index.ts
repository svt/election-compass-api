import './query';
import * as config from '../config';
import builder from '../builder';
import { printSchema, lexicographicSortSchema } from 'graphql';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const schema = builder.toSchema({});

if (config.IS_DEVELOPMENT) {
  const schemaAsString = `
#
# This file has been automatically generated runtime for developer
# referance and is not used by the aplication DO NOT EDIT
#

${printSchema(lexicographicSortSchema(schema))}
`;

  writeFileSync(
    resolve(__dirname, '../generated/schema.graphql'),
    schemaAsString,
    'utf8'
  );

  console.log(
    `A schema file has been generated in the generated folder ${resolve(
      __dirname,
      '../generated/schema.graphql'
    )}`
  );
}

export default schema;
