#!/usr/bin/env node
/**
 * Write docs/assets/build-info.json from the latest git commit.
 * Usually refreshed automatically by .githooks/post-commit after docs/ commits.
 * Manual: npm run pages:build-info
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'docs/assets/build-info.json');

function git(...args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
}

const hash = git('rev-parse', '--short', 'HEAD');
const hashFull = git('rev-parse', 'HEAD');
const date = git('log', '-1', '--format=%cI');
const remote = git('remote', 'get-url', 'origin');

let repoUrl = 'https://github.com/fortegb/platform';
const match = remote.match(/github\.com[:/](.+?)(?:\.git)?$/);
if (match) repoUrl = `https://github.com/${match[1]}`;

const info = {
  hash,
  hashFull,
  date,
  url: `${repoUrl}/commit/${hashFull}`,
};

fs.writeFileSync(OUT, `${JSON.stringify(info, null, 2)}\n`);
console.log(`portal build-info: ${hash} @ ${date}`);
