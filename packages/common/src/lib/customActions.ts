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
