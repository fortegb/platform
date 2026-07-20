/**
 * House status: labels, badge styles, and visit eligibility.
 *
 * Visit matrix (agreed 2026-07-20, #198): a self-guided visit unlocks an empty
 * house with nobody present, so it is allowed only where the house is finished
 * and empty. A guided visit adds a person, which is what makes a building site
 * acceptable — that mode does not exist yet (#213).
 */
export type HouseStatus =
  | 'disponivel'
  | 'em-construcao'
  | 'na-planta'
  | 'reservado'
  | 'vendido'

const LABELS: Record<HouseStatus, string> = {
  'disponivel': 'Disponível',
  'em-construcao': 'Em Construção',
  'na-planta': 'Na planta',
  'reservado': 'Reservado',
  'vendido': 'Vendido',
}

const BADGE_CLASSES: Record<HouseStatus, string> = {
  'disponivel': 'badge-success',
  'em-construcao': 'badge-warning',
  'na-planta': 'badge-info',
  'reservado': 'badge-neutral',
  'vendido': 'badge-error',
}

const SELF_GUIDED: HouseStatus[] = ['disponivel']
const GUIDED: HouseStatus[] = ['disponivel', 'em-construcao']

export function useHouseStatus() {
  const statusLabel = (status?: string) =>
    LABELS[status as HouseStatus] ?? status ?? ''

  const statusBadgeClass = (status?: string) =>
    BADGE_CLASSES[status as HouseStatus] ?? 'badge-neutral'

  /** Can this house be booked for a self-guided visit right now? */
  const allowsSelfGuidedVisit = (status?: string) =>
    SELF_GUIDED.includes(status as HouseStatus)

  /** Would a guided visit be possible, once that mode exists (#213)? */
  const allowsGuidedVisit = (status?: string) =>
    GUIDED.includes(status as HouseStatus)

  return { statusLabel, statusBadgeClass, allowsSelfGuidedVisit, allowsGuidedVisit }
}
