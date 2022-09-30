import * as config from './config';
import rawSchema from './schema';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix';
import { envelop, useErrorHandler, useLogger, useSchema } from '@envelop/core';
import { useResponseCache } from '@envelop/response-cache';
import { getHeapSpaceStatistics, getHeapStatistics } from 'v8';
import process from 'node:process';

const plugins = [
  useSchema(rawSchema),
  useErrorHandler((errors) =>
    errors.forEach((e) => console.log('GraphQL error:', e))
  ),
  useResponseCache({
    ttl: 60 * 1000 * 60 * 24 * 7,
    // use global cache for all operations
    session: () => null,
  }),
];

if (config.ENABLE_TRACING) {
  plugins.push(useLogger());
}

const getEnveloped = envelop({
  plugins,
  enableInternalTracing: config.ENABLE_TRACING,
});

const app = fastify({
  logger: true,
  return503OnClosing: false, // Not sure if we still get requests after SIGTERM/close() happens, but just to be sure
});
app.register(fastifyCors);

app.get('/health', async () => {
  return 'OK';
});

app.get('/', async (_req, res) => {
  res.redirect('/graphql');
});

app.route({
  method: ['GET', 'POST'],
  url: '/graphql',
  handler: async (req, res) => {
    const { parse, validate, contextFactory, execute, schema } = getEnveloped({
      req,
    });
    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query,
    };

    if (shouldRenderGraphiQL(request)) {
      void res.type('text/html');
      return renderGraphiQL({});
    }

    res.hijack();
    const { operationName, query, variables } = getGraphQLParameters(request);
    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      parse,
      validate,
      execute,
      contextFactory,
    });

    void sendResult(result, res.raw);
  },
});

app.listen({ port: config.PORT }, () => {
  const newSpaceSize = getHeapSpaceStatistics().find(
    (space) => space.space_name === 'new_space'
  )?.space_size;
  const heapSizeLimit = getHeapStatistics().heap_size_limit;
  console.log(`🚀 Server started at http://localhost:${config.PORT}/graphql`);
  console.log(
    `Heap size limit: ${heapSizeLimit} New space size: ${newSpaceSize}`
  );
  console.log(`NODE_OPTIONS=${process.env.NODE_OPTIONS}`);
});

process.once('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close().then(
    () => {
      console.log('HTTP server closed');
    },
    (err) => {
      console.error('An error happened', err);
    }
  );
});
