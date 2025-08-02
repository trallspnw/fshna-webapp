import { DEFAULT_LANGUAGE, LANGUAGE_LABELS, LANGUAGES } from '@common/types/language'
import { Field } from 'payload'

/**
 * A text field containing traslated texts.
 * @param name The name of the field
 * @param label The label of the field which shows in the admin UI
 * @param required Whether the field is required for the default language
 * @param description The description of the field to show in the admin UI
 * @returns A field group
 */
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
