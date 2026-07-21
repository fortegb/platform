/**
 * Identify state for the instant / QR visit flow.
 *
 * The QR flow has no scheduling form — the visitor is at the door (D-059), so it
 * collects only what identifies them: a WhatsApp number and CPF. The entry screen
 * and the verification handoff are separate routes, so the values are kept in
 * sessionStorage the same way `useVisitBooking` does it for the scheduled flow: a
 * refresh or the back button must not throw away what was typed. Session storage
 * clears when the tab closes.
 *
 * The masks and CPF check live in `useVisitBooking` (the dedup authority, D-020);
 * they are re-exported here so both flows share one implementation.
 */
import { maskPhone, maskCpf, isValidCpf } from './useVisitBooking'

export { maskPhone, maskCpf, isValidCpf }

const STORAGE_KEY = 'fortegb:qr-visit'

export interface QrVisitForm {
  code: string
  phone: string
  cpf: string
}

const emptyForm = (): QrVisitForm => ({ code: '', phone: '', cpf: '' })

export function useQrVisit() {
  const form = useState<QrVisitForm>('qr-visit', emptyForm)

  /** Restore from sessionStorage. Returns false when there is nothing stored. */
  const restoreForm = (code: string): boolean => {
    if (import.meta.server) return false
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    try {
      const stored = JSON.parse(raw) as QrVisitForm
      if (stored.code !== code || !stored.phone) return false
      form.value = stored
      return true
    } catch {
      return false
    }
  }

  const saveForm = (code: string) => {
    form.value.code = code
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

    if (f.phone.replace(/\D/g, '').length !== 11) {
      errors.phone = 'Informe um celular com DDD, como (19) 99999-9999.'
    }
    if (!f.cpf.trim()) {
      errors.cpf = 'Informe seu CPF.'
    } else if (!isValidCpf(f.cpf)) {
      errors.cpf = 'Esse CPF não confere. Verifique os números.'
    }

    return errors
  }

  return { form, restoreForm, saveForm, clearForm, validate, maskPhone, maskCpf }
}
