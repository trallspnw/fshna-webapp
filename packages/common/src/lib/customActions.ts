/**
 * Available custom actions. Currently a concept only. No useful actions are currently available.
 */
export const customActions = {
  showMoreEvents: {
    label: 'Show more events',
    handler: () => {console.log('test')},
  },
  checkMembershipStatus: {
    label: 'Check membership status',
    handler: () => {console.log('test')},
  },
} as const

export type CustomActionKey = keyof typeof customActions
