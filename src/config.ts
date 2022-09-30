import path from 'node:path';
import 'dotenv/config';

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined) {
    if (typeof defaultValue === 'undefined') {
      throw new Error(`Missing environment variable ${key}`);
    }
    return defaultValue;
  }
  return value;
}

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const ENABLE_DEBUG = process.env.ENABLE_DEBUG || 0;
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8443;
export const DATA_DIR = getEnv(
  'DATA_DIR',
  path.resolve(__dirname, '../') + '/data'
);
export const ENABLE_TRACING = process.env.ENABLE_TRACING === '1';
export const USE_CACHED_DATA = process.env.USE_CACHED_DATA === '1';
