import { DEFAULT_LANGUAGE, LANGUAGE_LABELS, LANGUAGES } from '@common/types/language'
import { Field } from 'payload'

export const LocalizedTextField = (name = 'text', label = 'Localized Text', required = false, description?: string): Field => ({
  name,
  type: 'group',
  label,
  admin: {
    description: description,
  },
  fields: Object.values(LANGUAGES).map((language) => ({
    name: language,
    type: 'textarea',
    label: `${LANGUAGE_LABELS[language]}`,
    required: required && language === DEFAULT_LANGUAGE,
  })),
})
