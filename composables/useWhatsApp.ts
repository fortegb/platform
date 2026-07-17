/** Build a wa.me contact link from the configured (or fallback) WhatsApp number and a message. */
export function useWhatsApp(message: MaybeRefOrGetter<string>) {
  const config = useRuntimeConfig()
  const whatsappNumber = config.public.whatsappNumber || '5519991444862'
  const whatsappUrl = computed(() => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(toValue(message))}`)

  return { whatsappNumber, whatsappUrl }
}
