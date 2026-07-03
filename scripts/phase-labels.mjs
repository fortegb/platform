/** PT-BR phase titles for Platform docs (sócios). Board field Phase = 0–4. */
export const FASE_TITLES = {
  0: 'Fundação',
  1: 'Site + identidade',
  2: 'Visitas + CRM',
  3: 'Media kit + admin',
  4: 'Escala',
};

export function faseHeading(phase) {
  if (phase === '—' || phase == null || phase === '') return 'Sem fase';
  const n = String(phase).replace(/^Phase\s+/i, '');
  const title = FASE_TITLES[Number(n)];
  return title ? `Fase ${n} — ${title}` : `Fase ${n}`;
}

export function fasePill(phase) {
  if (phase === '—' || phase == null || phase === '') return 'Sem fase';
  const n = String(phase).replace(/^Phase\s+/i, '');
  return `Fase ${n}`;
}
