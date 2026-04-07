#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

import { config as loadEnv } from 'dotenv';

function loadScriptEnv() {
  const rootDir = process.cwd();
  const candidates = [
    process.env.ENV_FILE,
    process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}.local` : undefined,
    '.env.local',
    process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env.development',
    '.env',
  ].filter(Boolean) as string[];

  const visited = new Set<string>();

  for (const candidate of candidates) {
    const resolved = path.resolve(rootDir, candidate);
    if (visited.has(resolved) || !fs.existsSync(resolved)) {
      continue;
    }

    visited.add(resolved);
    loadEnv({
      path: resolved,
      override: false,
    });
  }
}

loadScriptEnv();

async function main() {
  const { closeDb } = await import('@/core/db');
  const { syncJSearchJobs } = await import('@/shared/services/jobs/sync');

  const args = parseArgs(process.argv.slice(2));

  try {
    const result = await syncJSearchJobs({
      query: args.query,
      page: args.page,
      numPages: args.numPages,
      country: args.country,
      datePosted: args.datePosted,
    });

    console.log('Jobs sync completed.');
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await closeDb();
  }
}

function parseArgs(argv: string[]) {
  const result: {
    query?: string;
    page?: number;
    numPages?: number;
    country?: string;
    datePosted?: string;
  } = {};

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const [key, inlineValue] = arg.split('=');
    const value = inlineValue ?? argv[i + 1];

    if (key === '--query' && value) {
      result.query = value;
      if (inlineValue === undefined) i += 1;
      continue;
    }

    if (key === '--page' && value) {
      result.page = Number(value);
      if (inlineValue === undefined) i += 1;
      continue;
    }

    if (key === '--num-pages' && value) {
      result.numPages = Number(value);
      if (inlineValue === undefined) i += 1;
      continue;
    }

    if (key === '--country' && value) {
      result.country = value;
      if (inlineValue === undefined) i += 1;
      continue;
    }

    if (key === '--date-posted' && value) {
      result.datePosted = value;
      if (inlineValue === undefined) i += 1;
      continue;
    }
  }

  return result;
}

main().catch((error) => {
  console.error(
    error instanceof Error ? error.message : 'Unexpected jobs sync failure'
  );
  process.exit(1);
});
