/**
 * CMS access boundary (Sanity — D-034).
 * Returns empty/mocks until Sanity is provisioned (#156/#157 / build leaves).
 * Do not import Contentful — removed from the stack.
 */
export const useCms = () => {
  const getEntries = async (_contentType: string, _query?: Record<string, unknown>) => {
    return [] as unknown[]
  }

  const getEntry = async (_entryId: string) => {
    return null
  }

  const getEntriesBySlug = async (_contentType: string, _slug: string) => {
    return null
  }

  return {
    getEntries,
    getEntry,
    getEntriesBySlug,
  }
}
