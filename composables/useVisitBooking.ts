/**
 * Booking form state for the scheduled-visit flow.
 *
 * The form and the identity step are separate routes, so the values are kept in
 * sessionStorage: a refresh or the back button must not throw away a name, a
 * phone, a CPF and a chosen slot (agreed 2026-07-20, #198). Session storage
 * clears when the tab closes.
 *
 * ponytail: slots are a fixed grid and availability is simulated. The real
 * availability rule — which slots are free, and the spacing derived from the
 * access-code window — is #214, and staff-managed availability is #213.
 */
const STORAGE_KEY = 'fortegb:visit-booking'

const FIXED_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
const SIMULATED_TAKEN = ['11:00']

export interface VisitBookingForm {
  houseId: string
  name: string
  phone: string
  cpf: string
  date: string
  time: string
}

const emptyForm = (): VisitBookingForm => ({
  houseId: '',
  name: '',
  phone: '',
  cpf: '',
  date: '',
  time: '',
})

/** Digits only, formatted as (99) 99999-9999 while typing. */
export function maskPhone(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

/** Digits only, formatted as 000.000.000-00 while typing. */
export function maskCpf(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

/**
 * CPF check digits (mod 11). CPF is the dedup authority in the data model
 * (D-020), so a typo does not bounce — it creates or collides with a real
 * person's record. Worth validating before it reaches the server.
 */
export function isValidCpf(value: string): boolean {
  const d = value.replace(/\D/g, '')
  if (d.length !== 11) return false
  if (/^(\d)\1{10}$/.test(d)) return false

  const digits = d.split('').map(Number)
  for (const [length, position] of [[9, 10], [10, 11]] as const) {
    let sum = 0
    for (let i = 0; i < length; i++) sum += digits[i] * (position - i)
    const remainder = (sum * 10) % 11
    const expected = remainder === 10 ? 0 : remainder
    if (expected !== digits[length]) return false
  }
  return true
}

export function useVisitBooking() {
  const form = useState<VisitBookingForm>('visit-booking', emptyForm)

  const timeSlots = computed(() =>
    FIXED_SLOTS.map((value) => ({ value, taken: SIMULATED_TAKEN.includes(value) }))
  )

  /** Restore from sessionStorage. Returns false when there is nothing stored. */
  const restoreForm = (houseId: string): boolean => {
    if (import.meta.server) return false
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    try {
      const stored = JSON.parse(raw) as VisitBookingForm
      if (stored.houseId !== houseId || !stored.name || !stored.phone) return false
      form.value = stored
      return true
    } catch {
      return false
    }
  }

  const saveForm = (houseId: string) => {
    form.value.houseId = houseId
    if (import.meta.client) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form.value))
    }
  }

  const clearForm = () => {
    form.value = emptyForm()
    if (import.meta.client) sessionStorage.removeItem(STORAGE_KEY)
  }

  const validate = (): Record<string, string> => {
    const errors: Record<string, string> = {}
    const f = form.value

    if (f.name.trim().length < 3) {
      errors.name = 'Informe seu nome completo.'
    }
    if (f.phone.replace(/\D/g, '').length !== 11) {
      errors.phone = 'Informe um celular com DDD, como (19) 99999-9999.'
    }
    if (!f.cpf.trim()) {
      errors.cpf = 'Informe seu CPF.'
    } else if (!isValidCpf(f.cpf)) {
      errors.cpf = 'Esse CPF não confere. Verifique os números.'
    }
    if (!f.date) {
      errors.date = 'Escolha uma data.'
    }
    if (!f.time) {
      errors.time = 'Escolha um horário.'
    }

    return errors
  }

  return { form, timeSlots, restoreForm, saveForm, clearForm, validate, maskPhone, maskCpf }
}
