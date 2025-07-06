import { DEFAULT_LANGUAGE, Language } from "@common/types/language"

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
