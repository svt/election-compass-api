declare module 'dotenv/config';

type WithWildcards<T> = T & { [key: string]: unknown };
