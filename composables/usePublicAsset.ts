/** Resolve paths from /public for subpath deploys (e.g. GitHub Pages mocks). */
import { withBase } from 'ufo'

export function usePublicAsset(path: MaybeRefOrGetter<string>) {
  const { app } = useRuntimeConfig()
  return computed(() => withBase(toValue(path), app.baseURL))
}
