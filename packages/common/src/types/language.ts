import { MediaFile } from "./payload-types";

/**
 * Languages const/enum.
 */
export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
} as const;

/**
 * Language to label mappings.
 */
export const LANGUAGE_LABELS: Record<Language, string> = {
  [LANGUAGES.EN]: 'English',
  [LANGUAGES.ES]: 'Spanish',
};

/**
 * Language list from const.
 */
export const SUPPORTED_LANGUAGES: Language[] = Object.values(LANGUAGES);

/**
 * Prevents hard coding 'en'.
 */
export const DEFAULT_LANGUAGE: Language = LANGUAGES.EN;

/**
 * Language type from const.
 */
export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

/**
 * Text resolvable by language.
 */
export type LocalizedText = Partial<Record<Language, string | null>>

/**
 * Media type including file, url and raw alt text. Localized in LocalizedMedia.
 */
type MediaFileWithAlt = {
  file: MediaFile
  url: string
  alt?: string
}

/**
 * Media and alt text resolvable by language.
 */
export type LocalizedMedia = Partial<Record<Language, MediaFileWithAlt | null>>
