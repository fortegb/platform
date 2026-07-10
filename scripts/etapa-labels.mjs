/** PT-BR labels for Platform docs (sócios). Board field Etapa = 9 passos do Roteiro. */

export const PASSO_TITLES = {
  1: 'Contexto',
  2: 'Funcionalidades',
  3: 'Componentes',
  4: 'Arquitetura',
  5: 'Jornadas',
  6: 'Design',
  7: 'Versionamento',
  8: 'Execução',
  9: 'Evolução',
};

/** Short desc for mapa-roteiro nodes (sócios). */
export const PASSO_DESCS = {
  1: 'Quem somos, o que temos e queremos',
  2: 'O que a plataforma oferece',
  3: 'Site, CRM, visitas, fechaduras…',
  4: 'Infra, ambientes, integrações',
  5: 'Fluxos e telas finais (re-validar)',
  6: 'Linguagem visual + design system',
  7: 'Fatiar em versões v1/v2/v3',
  8: 'Construir até entregar — por versão',
  9: 'Manutenção e novas ideias',
};

/** passo number (1–9) from an Etapa value like "4 Arquitetura" */
export function passoNum(etapa) {
  if (etapa == null || etapa === '' || etapa === '—') return 99;
  const m = String(etapa).match(/^(\d+)/);
  return m ? Number(m[1]) : 99;
}

/** estágio (Definição / Execução / Evolução) derived from the passo */
export function estagioOf(etapa) {
  const n = passoNum(etapa);
  if (n >= 1 && n <= 7) return 'Definição';
  if (n === 8) return 'Execução';
  if (n === 9) return 'Evolução';
  return 'Sem etapa';
}

/** section heading, e.g. "Definição · Passo 4 — Arquitetura" */
export function etapaHeading(etapa) {
  const n = passoNum(etapa);
  if (n === 99) return 'Sem etapa';
  const title = PASSO_TITLES[n] ?? '';
  return `${estagioOf(etapa)} · Passo ${n} — ${title}`;
}

/** short pill, e.g. "Passo 4 · Arquitetura" */
export function etapaPill(etapa) {
  const n = passoNum(etapa);
  if (n === 99) return 'Sem etapa';
  return `Passo ${n} · ${PASSO_TITLES[n] ?? ''}`;
}
