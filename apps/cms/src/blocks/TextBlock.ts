import { Block } from 'payload'
import { LANGUAGE_LABELS, LANGUAGES } from '@common/types/language'

export const TextBlock: Block = {
  slug: 'text-block',
  labels: {
    singular: 'Text',
    plural: 'Texts',
  },
  fields: [
    {
      name: 'text',
      type: 'group',
      label: 'Localized Text',
      fields: Object.values(LANGUAGES).map((language) => ({
        name: language,
        type: 'textarea',
        label: `Text (${LANGUAGE_LABELS[language]})`,
      })),
    },
  ],
}
