#!/usr/bin/env node
/**
 * Generate portal HTML assets (contract page) from markdown sources.
 * Usage: node scripts/generate-portal-assets.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MD_PATH = path.join(ROOT, 'docs/planning/corretor-contract-template.md');
const OUT_PATH = path.join(ROOT, 'docs/planning/corretor-contract.html');

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inline(s) {
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let inUl = false;
  let inOl = false;
  let inTable = false;
  let tableRows = [];

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

  for (const line of lines) {
    if (line.startsWith('|')) {
      closeLists();
      inTable = true;
      tableRows.push(line);
      continue;
    }
    if (inTable) flushTable();

    if (line.startsWith('```')) continue;

    if (line.startsWith('## ')) {
      closeLists();
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith('### ')) {
      closeLists();
      out.push(`<h3>${inline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith('# ')) {
      closeLists();
      out.push(`<h1>${inline(line.slice(2))}</h1>`);
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
  return out.join('\n');
}

function shell(title, bodyHtml) {
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
    <div class="brand"><a href="../index.html">← Documentação Plataforma ForteGB</a></div>
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
  <footer class="footer-note"><span id="portal-build-meta"></span></footer>
  <script src="../assets/portal-build.js" defer></script>
</body>
</html>`;
}

const md = fs.readFileSync(MD_PATH, 'utf8');
const body = mdToHtml(md);
fs.writeFileSync(OUT_PATH, shell('Contrato de parceria — Corretor × ForteGB', body), 'utf8');
console.log(`Wrote ${OUT_PATH}`);
