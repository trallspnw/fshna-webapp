import { createPayloadRequest } from 'payload'
import configPromise from '@payload-config'
import { NextRequest } from 'next/server'

/**
 * Helper function for determining if a requester is an admin.
 * @param request A route request
 * @returns True if user is an admin, else false
 */
export async function isAdmin(request: NextRequest) {
  const payloadRequest = await createPayloadRequest({
    config: configPromise,
    request,
  })

  const user = payloadRequest.user
  return user && user.collection == 'admins'
}
