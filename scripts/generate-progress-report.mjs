#!/usr/bin/env node
/**
 * Generate docs/planning/progresso-socios.html from GitHub Project + progress-focus.md
 * Usage: node scripts/generate-progress-report.mjs
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FOCUS_PATH = path.join(ROOT, 'docs/planning/progress-focus.md');
const OUT_PATH = path.join(ROOT, 'docs/planning/progresso-socios.html');

const PROJECT_QUERY = `query($cursor: String) {
  organization(login: "fortegb") {
    projectV2(number: 1) {
      items(first: 100, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          content {
            ... on Issue {
              number
              title
              state
              url
              issueType { name }
              parent { number title }
            }
          }
          fieldValues(first: 20) {
            nodes {
              ... on ProjectV2ItemFieldSingleSelectValue {
                name
                field { ... on ProjectV2SingleSelectField { name } }
              }
            }
          }
        }
      }
    }
  }
}`;

function ghGraphql(cursor = null) {
  const args = ['api', 'graphql', '-f', `query=${PROJECT_QUERY}`];
  if (cursor) args.push('-f', `cursor=${cursor}`);
  const out = execFileSync('gh', args, { encoding: 'utf8', cwd: ROOT });
  return JSON.parse(out);
}

function fieldValue(node, name) {
  for (const fv of node.fieldValues?.nodes ?? []) {
    if (fv.field?.name === name) return fv.name;
  }
  return null;
}

function fetchAllItems() {
  const items = [];
  let cursor = null;
  let hasNext = true;
  while (hasNext) {
    const data = ghGraphql(cursor);
    const block = data.data.organization.projectV2.items;
    for (const node of block.nodes) {
      const c = node.content;
      if (!c?.number) continue;
      items.push({
        number: c.number,
        title: c.title,
        url: c.url,
        state: c.state,
        type: c.issueType?.name ?? 'Issue',
        parentNumber: c.parent?.number ?? null,
        parentTitle: c.parent?.title ?? null,
        status: fieldValue(node, 'Status') ?? 'Todo',
        phase: fieldValue(node, 'Phase') ?? '—',
        module: fieldValue(node, 'Module') ?? '—',
      });
    }
    hasNext = block.pageInfo.hasNextPage;
    cursor = block.pageInfo.endCursor;
  }
  return items;
}

function parseFocusMarkdown(raw) {
  const updatedMatch = raw.match(/\*\*(?:Atualizado|Actualizado):\*\*\s*(.+)/);
  const updated = updatedMatch?.[1]?.trim() ?? '—';
  const sections = {};
  const parts = raw.split(/^## /m).slice(1);
  for (const part of parts) {
    const nl = part.indexOf('\n');
    const key = part.slice(0, nl).trim();
    const body = part.slice(nl + 1).trim();
    sections[key] = body;
  }
  return { updated, sections };
}

function mdListToHtml(text) {
  const lines = text.split('\n').filter((l) => l.trim());
  const items = lines.map((l) => {
    const html = l
      .replace(/^-\s+/, '')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
    return `<li>${html}</li>`;
  });
  return `<ul class="focus-list">${items.join('')}</ul>`;
}

function sectionBodyToHtml(body) {
  const blocks = body.split(/\n\n+/);
  return blocks
    .map((b) => {
      b = b.trim();
      if (!b) return '';
      if (b.startsWith('- ')) return mdListToHtml(b);
      if (/^\d+\.\s/.test(b)) {
        const items = b.split('\n').map((l) => {
          const t = l.replace(/^\d+\.\s+/, '');
          return `<li>${t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')}</li>`;
        });
        return `<ol class="focus-list">${items.join('')}</ol>`;
      }
      return `<p>${b.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</p>`;
    })
    .join('');
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function statusBadge(status) {
  const cls =
    status === 'Done' ? 'badge-done' : status === 'In Progress' ? 'badge-progress' : 'badge-todo';
  const label =
    status === 'Done' ? 'Concluído' : status === 'In Progress' ? 'Em progresso' : 'A fazer';
  return `<span class="badge ${cls}">${label}</span>`;
}

function issueLink(item) {
  return `<a class="issue-link" href="${item.url}" target="_blank" rel="noopener">#${item.number}</a>`;
}

function childRow(child) {
  return `<li class="child-item ${child.status === 'Done' ? 'done' : ''}">
    ${issueLink(child)} ${esc(child.title)} ${statusBadge(child.status)}
  </li>`;
}

function epicCard(epic, children) {
  const done = children.filter((c) => c.status === 'Done').length;
  const total = children.length;
  const pct = total ? Math.round((done / total) * 100) : epic.status === 'Done' ? 100 : 0;
  const sorted = [...children].sort((a, b) => a.number - b.number);
  return `<article class="epic-card" data-status="${esc(epic.status)}">
    <header class="epic-head">
      <div class="epic-title">
        ${issueLink(epic)} <h3>${esc(epic.title.replace(/^Epic:\s*/i, ''))}</h3>
      </div>
      <div class="epic-meta">
        ${statusBadge(epic.status)}
        <span class="pill">Fase ${esc(epic.phase)}</span>
        <span class="pill">${esc(epic.module)}</span>
      </div>
    </header>
    ${total ? `<div class="progress-wrap"><div class="progress-bar" style="width:${pct}%"></div><span class="progress-label">${done}/${total} tarefas</span></div>` : ''}
    ${sorted.length ? `<ul class="child-list">${sorted.map(childRow).join('')}</ul>` : '<p class="empty-children">Sem subtarefas no board.</p>'}
  </article>`;
}

function phaseSection(phase, epics, childrenByParent) {
  const sorted = [...epics].sort((a, b) => a.number - b.number);
  const cards = sorted.map((e) => epicCard(e, childrenByParent.get(e.number) ?? [])).join('');
  const label = phase === '—' ? 'Sem fase' : `Fase ${phase}`;
  return `<div class="phase-block">
    <h3 class="phase-title">${esc(label)}</h3>
    <div class="epic-grid">${cards}</div>
  </div>`;
}

function buildHtml({ items, focus, generatedAt }) {
  const epics = items.filter((i) => i.type === 'Epic' || /^Epic:/i.test(i.title));
  const epicNumbers = new Set(epics.map((e) => e.number));
  const childrenByParent = new Map();
  for (const item of items) {
    if (item.parentNumber && epicNumbers.has(item.parentNumber)) {
      if (!childrenByParent.has(item.parentNumber)) childrenByParent.set(item.parentNumber, []);
      childrenByParent.get(item.parentNumber).push(item);
    }
  }

  const inProgress = items.filter((i) => i.status === 'In Progress');
  const doneEpics = epics.filter((e) => e.status === 'Done');
  const todoEpics = epics.filter((e) => e.status !== 'Done');

  const groupByPhase = (list) => {
    const map = new Map();
    for (const e of list) {
      const p = e.phase ?? '—';
      if (!map.has(p)) map.set(p, []);
      map.get(p).push(e);
    }
    return [...map.entries()].sort(([a], [b]) => {
      const na = a === '—' ? 99 : Number(a);
      const nb = b === '—' ? 99 : Number(b);
      return na - nb;
    });
  };

  const focusNow = focus.sections['Trabalhando no momento'] ?? focus.sections['Em foco agora'] ?? '';
  const focusNext = focus.sections['Próximo passo'] ?? '';
  const focusNotes = focus.sections['Notas para sócios'] ?? '';

  const stats = {
    epicsDone: doneEpics.length,
    epicsTotal: epics.length,
    tasksDone: items.filter((i) => !epicNumbers.has(i.number) && i.status === 'Done').length,
    tasksTotal: items.filter((i) => !epicNumbers.has(i.number)).length,
  };

  const inProgressHtml =
    inProgress.length === 0
      ? '<p class="muted">Nenhum item em andamento no board.</p>'
      : `<ul class="in-progress-list">${inProgress
          .map(
            (i) =>
              `<li>${issueLink(i)} ${esc(i.title)} ${statusBadge(i.status)} <span class="pill">Fase ${esc(i.phase)}</span></li>`
          )
          .join('')}</ul>`;

  const donePhases = groupByPhase(doneEpics)
    .map(([p, es]) => phaseSection(p, es, childrenByParent))
    .join('');
  const todoPhases = groupByPhase(todoEpics)
    .map(([p, es]) => phaseSection(p, es, childrenByParent))
    .join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ForteGB — Progresso da plataforma</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/portal.css" />
  <style>
    :root { --amber: #c17d2a; }
    .hero .stats {
      display: flex; justify-content: center; flex-wrap: wrap; gap: 0.75rem;
      font-size: 0.8rem; margin-top: 0.75rem;
    }
    .hero .stats span {
      background: rgba(255,255,255,0.12);
      padding: 0.4rem 0.9rem; border-radius: 999px;
    }
    .progress-main { max-width: 960px; }
    .progress-main section { margin-bottom: 2.75rem; }
    .section-head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
    .section-num {
      width: 2.25rem; height: 2.25rem; background: var(--navy); color: #fff;
      border-radius: 8px; display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 0.9rem; flex-shrink: 0;
    }
    .progress-main h2 { font-size: 1.3rem; font-weight: 700; color: var(--navy); }
    .report-card {
      background: var(--card); border-radius: var(--radius); box-shadow: var(--shadow);
      padding: 1.5rem; margin-bottom: 1rem; border: 1px solid var(--border);
    }
    .report-card h3 { font-size: 1rem; font-weight: 600; color: var(--navy); margin-bottom: 0.75rem; }
    .focus-list { padding-left: 1.25rem; margin: 0.5rem 0; }
    .focus-list li { margin-bottom: 0.4rem; }
    .focus-list a, .issue-link { color: var(--blue); text-decoration: none; font-weight: 600; }
    .focus-list a:hover, .issue-link:hover { text-decoration: underline; }
    .progress-main code { background: var(--bg); padding: 0.1rem 0.35rem; border-radius: 4px; font-size: 0.85em; }
    .muted { color: var(--muted); font-size: 0.9rem; }
    .badge {
      display: inline-block; font-size: 0.7rem; font-weight: 600;
      padding: 0.2rem 0.55rem; border-radius: 999px; white-space: nowrap;
    }
    .badge-done { background: rgba(62,142,94,0.15); color: var(--green); }
    .badge-progress { background: rgba(193,125,42,0.15); color: var(--amber); }
    .badge-todo { background: rgba(26,116,161,0.12); color: var(--blue); }
    .pill {
      display: inline-block; font-size: 0.7rem; font-weight: 500;
      padding: 0.15rem 0.5rem; border-radius: 6px;
      background: var(--bg); color: var(--muted);
    }
    .phase-block { margin-bottom: 2rem; }
    .phase-title {
      font-size: 1rem; font-weight: 600; color: var(--slate);
      margin-bottom: 0.75rem; padding-bottom: 0.35rem;
      border-bottom: 2px solid var(--border);
    }
    .epic-grid { display: flex; flex-direction: column; gap: 1rem; }
    .epic-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden;
    }
    .epic-head {
      padding: 1rem 1.25rem; display: flex; justify-content: space-between;
      align-items: flex-start; gap: 1rem; flex-wrap: wrap;
      background: linear-gradient(90deg, rgba(32,48,69,0.04), transparent);
    }
    .epic-title { display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap; }
    .epic-title h3 { font-size: 0.95rem; font-weight: 600; color: var(--navy); }
    .epic-meta { display: flex; gap: 0.4rem; flex-wrap: wrap; align-items: center; }
    .progress-wrap { height: 4px; background: var(--bg); margin: 0 1.25rem; }
    .progress-bar { height: 100%; background: var(--green); }
    .progress-label {
      display: block; font-size: 0.72rem; color: var(--muted);
      padding: 0.35rem 1.25rem 0; margin-bottom: 0.25rem;
    }
    .child-list { list-style: none; padding: 0.5rem 1.25rem 1rem; }
    .child-item {
      padding: 0.45rem 0; border-bottom: 1px solid var(--border);
      font-size: 0.88rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem;
    }
    .child-item:last-child { border-bottom: none; }
    .child-item.done { opacity: 0.72; }
    .empty-children { padding: 0 1.25rem 1rem; font-size: 0.85rem; color: var(--muted); }
    .in-progress-list { list-style: none; }
    .in-progress-list li {
      padding: 0.6rem 0; border-bottom: 1px solid var(--border);
      display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem;
    }
    @media print { .epic-card { break-inside: avoid; } }
  </style>
</head>
<body>
  <div class="toolbar">
    <div class="brand"><a href="../index.html">← Portal ForteGB</a></div>
    <nav>
      <a class="btn-secondary" href="https://github.com/orgs/fortegb/projects/1" target="_blank" rel="noopener">Board GitHub</a>
    </nav>
  </div>

  <header class="hero">
    <h1>Progresso da plataforma</h1>
    <p>Relatório para sócios<br>O que está planejado, o que já foi feito e o que está sendo trabalhado no momento</p>
    <div class="stats">
      <span>${stats.epicsDone}/${stats.epicsTotal} epics concluídos</span>
      <span>${stats.tasksDone}/${stats.tasksTotal} tarefas concluídas</span>
      <span>${items.length} itens no board</span>
    </div>
  </header>

  <main class="container progress-main">
    <section id="agora">
      <div class="section-head"><span class="section-num">1</span><h2>Trabalhando no momento</h2></div>
      <div class="report-card">
        <h3>Resumo</h3>
        ${sectionBodyToHtml(focusNow)}
      </div>
      <div class="report-card">
        <h3>Itens em andamento no board</h3>
        ${inProgressHtml}
      </div>
      ${focusNext ? `<div class="report-card"><h3>Próximo passo</h3>${sectionBodyToHtml(focusNext)}</div>` : ''}
      ${focusNotes ? `<div class="report-card"><h3>Notas para sócios</h3>${sectionBodyToHtml(focusNotes)}</div>` : ''}
    </section>

    <section id="feito">
      <div class="section-head"><span class="section-num">2</span><h2>O que já foi feito</h2></div>
      <p class="muted" style="margin-bottom:1rem">Epics concluídos no board, com subtarefas. Clique nos números para abrir no GitHub.</p>
      ${donePhases || '<p class="muted">Nenhum epic concluído ainda.</p>'}
    </section>

    <section id="planejado">
      <div class="section-head"><span class="section-num">3</span><h2>O que está planejado</h2></div>
      <p class="muted" style="margin-bottom:1rem">Epics e tarefas por fase — roadmap de execução (Phase 0–4).</p>
      ${todoPhases}
    </section>
  </main>

  <footer class="footer-note">
    <a href="https://github.com/orgs/fortegb/projects/1">Board GitHub</a> ·
    <a href="../index.html">Portal</a>
  </footer>
</body>
</html>`;
}

function main() {
  console.log('Fetching GitHub Project items…');
  const items = fetchAllItems();
  console.log(`  ${items.length} items`);

  const focusRaw = fs.readFileSync(FOCUS_PATH, 'utf8');
  const focus = parseFocusMarkdown(focusRaw);

  const generatedAt = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const html = buildHtml({ items, focus, generatedAt });
  fs.writeFileSync(OUT_PATH, html, 'utf8');
  console.log(`Wrote ${OUT_PATH}`);
}

main();
