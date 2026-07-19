/** Sort houses by status priority: disponível first, em-construção next, everything else after. */
const STATUS_PRIORITY: Record<string, number> = {
  'disponivel': 0,
  'em-construcao': 1,
}

export function sortHousesByStatus<T extends { status?: string }>(houses: T[]): T[] {
  return [...houses].sort((a, b) => {
    const pa = STATUS_PRIORITY[a.status ?? ''] ?? 2
    const pb = STATUS_PRIORITY[b.status ?? ''] ?? 2
    return pa - pb
  })
}
