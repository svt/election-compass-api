FROM node:18.3.0-alpine AS builder
ARG NODE_OPTIONS

WORKDIR /app
COPY . .
RUN yarn \
  --ignore-optional \
  --immutable \
  --immutable-cache \
  --check-cache

RUN NODE_ENV=production yarn build

FROM node:18.3.0-alpine
ENV NODE_ENV=production
RUN mkdir /app && chown node:node /app
WORKDIR /app

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .

USER node
RUN yarn \
  --production \
  --ignore-optional \
  --immutable \
  --immutable-cache \
  --check-cache

COPY --chown=node:node --from=builder /app/dist /app/dist

CMD ["node", "dist/index.js"]
