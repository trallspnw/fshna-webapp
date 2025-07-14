import { MediaFile } from "./payload-types";

export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
} as const;

export const LANGUAGE_LABELS: Record<Language, string> = {
  [LANGUAGES.EN]: 'English',
  [LANGUAGES.ES]: 'Spanish',
};

export const SUPPORTED_LANGUAGES: Language[] = Object.values(LANGUAGES);

export const DEFAULT_LANGUAGE: Language = LANGUAGES.EN;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

export type LocalizedText = Partial<Record<Language, string | null>>

type MediaFileWithAlt = {
  file: MediaFile
  url: string
  alt?: string
}
export type LocalizedMedia = Partial<Record<Language, MediaFileWithAlt | null>>
