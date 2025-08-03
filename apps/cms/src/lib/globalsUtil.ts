import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { General } from '@/packages/common/src/types/payload-types'

/**
 * Helper for getting the current membership price from payload.
 * @returns The current membership price
 */
export async function getMembershipPrice() {
    const payload = await getPayload({ config: configPromise })
    const generalGlobals = await payload.findGlobal({ slug: 'general' }) as General 
    return generalGlobals.membershipPrice
}
