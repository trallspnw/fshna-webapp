import { DEFAULT_LANGUAGE, LANGUAGE_LABELS, LANGUAGES } from '@common/types/language'
import { Field } from 'payload'

export const LocalizedTextField = (name = 'text', label = 'Localized Text', required = false): Field => ({
  name,
  type: 'group',
  label,
  fields: Object.values(LANGUAGES).map((language) => ({
    name: language,
    type: 'textarea',
    label: `${label} (${LANGUAGE_LABELS[language]})`,
    required: required && language === DEFAULT_LANGUAGE,
  })),
})
