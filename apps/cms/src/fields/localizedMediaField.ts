import { DEFAULT_LANGUAGE, LANGUAGE_LABELS, LANGUAGES } from '@common/types/language'
import { Field } from 'payload'

export const LocalizedMediaField = (name = 'media', label = 'Localized Media'): Field => ({
  name,
  type: 'group',
  label,
  fields: Object.values(LANGUAGES).map((language) => ({
    name: language,
    type: 'upload' as const,
    relationTo: 'media',
    label: `${label} (${LANGUAGE_LABELS[language]})`,
    required: language === DEFAULT_LANGUAGE,
  })),
})
