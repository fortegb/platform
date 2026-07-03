#!/usr/bin/env node
/**
 * Generate static Nuxt export for GitHub Pages mocks (docs/planning/site/app/).
 * Usage: npm run pages:site
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE_URL = '/platform/planning/site/app/';
const SRC = path.join(ROOT, '.output/public');
const DEST = path.join(ROOT, 'docs/planning/site/app');

console.log(`Generating static site (baseURL=${BASE_URL})…`);

execFileSync('npx', ['nuxt', 'generate'], {
  cwd: ROOT,
  stdio: 'inherit',
  env: { ...process.env, NUXT_APP_BASE_URL: BASE_URL },
});

if (!fs.existsSync(SRC)) {
  console.error('Missing .output/public — generate failed.');
  process.exit(1);
}

if (fs.existsSync(DEST)) fs.rmSync(DEST, { recursive: true });
fs.cpSync(SRC, DEST, { recursive: true });

const stamp = new Date().toISOString();
fs.writeFileSync(
  path.join(DEST, '.static-build'),
  `generatedAt=${stamp}\nbaseURL=${BASE_URL}\ncommand=npm run pages:site\n`
);

console.log(`Static mocks copied to ${DEST} (~${Math.round(dirSize(DEST) / 1024 / 1024)} MB)`);

function dirSize(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    total += entry.isDirectory() ? dirSize(p) : fs.statSync(p).size;
  }
  return total;
}
