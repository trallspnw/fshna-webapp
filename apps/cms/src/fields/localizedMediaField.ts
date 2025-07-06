import { DEFAULT_LANGUAGE, LANGUAGE_LABELS, LANGUAGES } from '@common/types/language'
import { Field } from 'payload'
import { LocalizedTextField } from './localizedTextField'

export const LocalizedMediaField = (
  name = 'media',
  label = 'Localized Media',
  required = false,
): Field => {
  const mediaFields: Field[] = Object.values(LANGUAGES).map((language) => ({
    name: language,
    type: 'upload' as const,
    relationTo: 'media',
    label: `${label} (${LANGUAGE_LABELS[language]})`,
    required: required && language === DEFAULT_LANGUAGE,
  }))

  return {
    name,
    type: 'group',
    label,
    fields: [
      ...mediaFields, 
      LocalizedTextField('altText', 'altText', required),
    ],
  }
}
