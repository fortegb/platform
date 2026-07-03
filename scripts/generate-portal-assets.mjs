#!/usr/bin/env node
/**
 * Generate portal HTML assets from markdown sources.
 * Usage: node scripts/generate-portal-assets.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PLANNING = path.join(ROOT, 'docs/planning');
const PORTAL_BRAND = 'Documentação da plataforma — ForteGB';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inline(s) {
  let t = String(s);
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => `\x00L\x00${text}\x00${url}\x00`);
  t = esc(t);
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
  t = t.replace(/\x00L\x00([^\x00]+)\x00([^\x00]+)\x00/g, (_, text, url) => `<a href="${url}">${text}</a>`);
  return t;
}

function mdToHtml(md, { headingIds = false } = {}) {
  const lines = md.split('\n');
  const out = [];
  let inUl = false;
  let inOl = false;
  let inTable = false;
  let inPre = false;
  let tableRows = [];
  let preLines = [];

  const flushTable = () => {
    if (!tableRows.length) return;
    const [head, ...body] = tableRows;
    const cells = (row) => row.split('|').slice(1, -1).map((c) => c.trim());
    if (head && !head.includes('---')) {
      out.push('<table><thead><tr>' + cells(head).map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>');
      for (const row of body) {
        if (row.includes('---')) continue;
        out.push('<tr>' + cells(row).map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>');
      }
      out.push('</tbody></table>');
    }
    tableRows = [];
    inTable = false;
  };

  const closeLists = () => {
    if (inUl) { out.push('</ul>'); inUl = false; }
    if (inOl) { out.push('</ol>'); inOl = false; }
  };

  const flushPre = () => {
    if (!preLines.length) return;
    out.push(`<pre>${esc(preLines.join('\n'))}</pre>`);
    preLines = [];
    inPre = false;
  };

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inPre) flushPre();
      else { closeLists(); if (inTable) flushTable(); inPre = true; }
      continue;
    }
    if (inPre) {
      preLines.push(line);
      continue;
    }

    if (line.startsWith('|')) {
      closeLists();
      inTable = true;
      tableRows.push(line);
      continue;
    }
    if (inTable) flushTable();

    if (line.startsWith('## ')) {
      closeLists();
      const heading = line.slice(3);
      const slugMatch = heading.match(/\(`([^`]+)`\)\s*$/);
      const idAttr = headingIds && slugMatch ? ` id="${slugMatch[1]}"` : '';
      out.push(`<h2${idAttr}>${inline(heading)}</h2>`);
      continue;
    }
    if (line.startsWith('### ')) {
      closeLists();
      out.push(`<h3>${inline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith('# ')) {
      closeLists();
      continue;
    }
    if (line.startsWith('> ')) {
      closeLists();
      out.push(`<blockquote>${inline(line.slice(2))}</blockquote>`);
      continue;
    }
    if (line.startsWith('- ')) {
      if (!inUl) { closeLists(); out.push('<ul>'); inUl = true; }
      out.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      if (!inOl) { closeLists(); out.push('<ol>'); inOl = true; }
      out.push(`<li>${inline(line.replace(/^\d+\.\s/, ''))}</li>`);
      continue;
    }
    if (line.trim() === '---') {
      closeLists();
      out.push('<hr/>');
      continue;
    }
    if (line.trim() === '') {
      closeLists();
      continue;
    }
    closeLists();
    out.push(`<p>${inline(line)}</p>`);
  }
  closeLists();
  if (inTable) flushTable();
  if (inPre) flushPre();
  return out.join('\n');
}

function contractShell(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)} — ForteGB</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/portal.css" />
</head>
<body>
  <div class="toolbar">
    <div class="brand"><a href="../index.html">← ${esc(PORTAL_BRAND)}</a></div>
    <div class="toolbar-actions">
      <nav>
        <a class="btn-secondary" href="./corretor-contract-template.md">Markdown</a>
        <button type="button" class="btn-primary" onclick="window.print()">Imprimir / PDF</button>
      </nav>
    </div>
  </div>
  <header class="hero">
    <h1>${esc(title)}</h1>
    <p>Rascunho v0.1 — revisão Juliana Mestrinier · não constitui aconselhamento jurídico</p>
  </header>
  <main class="container doc-body">
${bodyHtml}
  </main>
  <footer class="footer-note"><span id="portal-build-meta"></span> · <a href="https://github.com/orgs/fortegb/projects/1" target="_blank" rel="noopener">Board GitHub</a></footer>
  <script src="../assets/portal-build.js" defer></script>
</body>
</html>`;
}

function planningDocShell({ title, subtitle, bodyHtml, noticeHtml = '' }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ForteGB — ${esc(title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/portal.css" />
  <style>
    .notice-inline { font-size: 0.85rem; color: var(--muted); margin-bottom: 1.5rem; }
    .module-nav { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }
    .module-nav a {
      font-size: 0.78rem; font-weight: 600; text-decoration: none;
      padding: 0.25rem 0.55rem; border-radius: 6px;
      background: var(--bg); border: 1px solid var(--border); color: var(--blue);
    }
    .module-nav a:hover { background: #eef6fb; }
    .doc-body h2 { scroll-margin-top: 4rem; }
    .doc-body pre {
      background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius);
      padding: 1rem; font-size: 0.78rem; line-height: 1.45; overflow-x: auto;
    }
    .doc-body table { font-size: 0.82rem; }
    .doc-body td code, .doc-body th code { font-size: 0.78rem; }
  </style>
</head>
<body>
  <div class="toolbar">
    <div class="brand"><a href="../index.html">← ${esc(PORTAL_BRAND)}</a></div>
  </div>

  <header class="hero">
    <h1>${esc(title)}</h1>
    <p>${subtitle}</p>
  </header>

  <main class="container doc-body">
${noticeHtml}${bodyHtml}
  </main>

  <footer class="footer-note">
    <span id="portal-build-meta"></span> · <a href="https://github.com/orgs/fortegb/projects/1" target="_blank" rel="noopener">Board GitHub</a>
  </footer>
  <script src="../assets/portal-build.js" defer></script>
</body>
</html>`;
}

function modulesShell(bodyHtml) {
  const notice = `    <p class="notice-inline">
      <strong>Nota:</strong> resumo visual em
      <a href="./mapa-fases.html">Mapa por fases</a>;
      rotas MVP em
      <a href="./screen-map.html">Mapa de ecrãs</a>;
      execução em
      <a href="./progresso-socios.html">Relatório de progresso</a>;
      jornadas em
      <a href="./jornadas-plataforma.html">Jornadas</a>.
      Canon: <code>modules.md</code>.
    </p>

    <nav class="module-nav" aria-label="Módulos">
      <a href="#platform">Infra</a>
      <a href="#site">Site</a>
      <a href="#auth">Auth</a>
      <a href="#tours">Visitas</a>
      <a href="#crm">CRM</a>
      <a href="#media-kit">Media kit</a>
      <a href="#branding">Branding</a>
      <a href="#social">Social</a>
      <a href="#admin">Admin</a>
      <a href="#mobile">Mobile</a>
    </nav>

`;
  return planningDocShell({
    title: 'Módulos da plataforma',
    subtitle: 'Detalhe por área de produto — o que inclui cada módulo, prontidão e epics.',
    noticeHtml: notice,
    bodyHtml,
  });
}

function screenMapShell(bodyHtml) {
  const notice = `    <p class="notice-inline">
      <strong>Nota:</strong> jornadas em
      <a href="./jornadas-plataforma.html">Jornadas</a>;
      módulos em
      <a href="./modules.html">Módulos</a>.
      Canon: <code>screen-map.md</code> ·
      <a href="https://github.com/fortegb/platform/issues/32">#32</a> (Done).
    </p>

`;
  return planningDocShell({
    title: 'Mapa de ecrãs MVP',
    subtitle: 'Rotas por papel — mock, new, fase e epic.',
    noticeHtml: notice,
    bodyHtml,
  });
}

const contractMd = fs.readFileSync(path.join(PLANNING, 'corretor-contract-template.md'), 'utf8');
fs.writeFileSync(
  path.join(PLANNING, 'corretor-contract.html'),
  contractShell('Contrato de parceria — Corretor × ForteGB', mdToHtml(contractMd)),
  'utf8',
);
console.log('Wrote docs/planning/corretor-contract.html');

const modulesMd = fs.readFileSync(path.join(PLANNING, 'modules.md'), 'utf8');
fs.writeFileSync(
  path.join(PLANNING, 'modules.html'),
  modulesShell(mdToHtml(modulesMd, { headingIds: true })),
  'utf8',
);
console.log('Wrote docs/planning/modules.html');

const screenMapMd = fs.readFileSync(path.join(PLANNING, 'screen-map.md'), 'utf8');
fs.writeFileSync(
  path.join(PLANNING, 'screen-map.html'),
  screenMapShell(mdToHtml(screenMapMd, { headingIds: true })),
  'utf8',
);
console.log('Wrote docs/planning/screen-map.html');
