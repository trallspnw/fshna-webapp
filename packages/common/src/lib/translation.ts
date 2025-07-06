import { DEFAULT_LANGUAGE, Language } from "@common/types/language"

export function normalizeLocalization<T>(
  input: Partial<Record<string, T | number | null>> | undefined
): Partial<Record<Language, T>> {
  const result: Partial<Record<Language, T>> = {}

  for (const [language, value] of Object.entries(input ?? {})) {
    if (value != null && typeof value === 'object') {
      result[language as Language] = value as T
    }
  }

  return result
}


export function getLocalizedValue<T>(
  localized: Partial<Record<Language, T>> | undefined,
  current: Language,
  fallback?: T
): T {
  const currentValue = localized?.[current]
  const defaultValue = localized?.[DEFAULT_LANGUAGE]

  const isEmpty = <T>(val: T | undefined | null): boolean =>
    val == null || (typeof val === 'string' && val.trim() === '');

  if (!isEmpty(currentValue)) return currentValue as T
  if (!isEmpty(defaultValue)) return defaultValue as T
  if (fallback !== undefined) return fallback

  return '' as T
}
