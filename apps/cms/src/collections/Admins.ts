import type { CollectionConfig } from 'payload'

/**
 * Admins which can loging to the CMS application. Adapted from the default 'users' collection that payload provides.
 */
export const Admins: CollectionConfig = {
  slug: 'admins',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
