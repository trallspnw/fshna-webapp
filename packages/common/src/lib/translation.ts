import { DEFAULT_LANGUAGE, Language } from "@common/types/language"

/**
 * Gets the local content from localizable content. 
 * @param localized The content keys by language
 * @param current The requested langugae
 * @param fallback The fallback value to return if the requested language is not available. Defaults to the default 
 *    language if not provided.
 * @returns The content in the requested language or a fallback value.
 */
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
