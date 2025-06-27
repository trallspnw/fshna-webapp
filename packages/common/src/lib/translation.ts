import { DEFAULT_LANGUAGE, Language } from "@common/types/language"

export function normalizeLocalization<T>(
  input: Partial<Record<string, T | null>> | undefined
): Partial<Record<Language, T>> {
  const result: Partial<Record<Language, T>> = {}

  for (const [language, value] of Object.entries(input ?? {})) {
    if (value != null) {
      result[language as Language] = value
    }
  }

  return result
}

export function getLocalizedValue<T>(
  localized: Partial<Record<Language, T>> | undefined,
  current: Language,
  fallback?: T
): T {
  const result = localized?.[current] ?? localized?.[DEFAULT_LANGUAGE]
  if (result !== undefined) return result
  if (typeof fallback !== 'undefined') return fallback
  return '' as T
}
