import { GET } from "@/apps/cms/src/app/api/campaign/search/route"
import { CONSTANTS } from "../../../../constants"
import { NextRequest } from "next/server"
import { isAdmin } from "@/apps/cms/src/lib/apiAuth"
import { getMembershipsByRef, getPersonsByRef, getSubscriptionsByRef } from "@/apps/cms/src/dao/campaignDao"

const PERSON = { person: 'test' }
const MEMBERSHIP = { membership: 'test' }
const SUBSCRIPTION = { subscription: 'test' }

jest.mock('/src/lib/apiAuth', () => ({
  isAdmin: jest.fn(),
}))

jest.mock('/src/dao/campaignDao', () => ({
  getPersonsByRef: jest.fn(() => Promise.resolve([ PERSON ])),
  getMembershipsByRef: jest.fn(() => Promise.resolve([ MEMBERSHIP ])),
  getSubscriptionsByRef: jest.fn(() => Promise.resolve([ SUBSCRIPTION ])),
}))

describe('GET /api/campaign/search', () => {

  it('Admin with valid query _ 200, records returned', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    
    const result = await GET(new Request(`${CONSTANTS.requestUrl}?query=${CONSTANTS.searchQuery}`, {
      method: 'GET',
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(200)
    const json = await result.json()
    expect(json.persons).toEqual([ PERSON ])
    expect(json.memberships).toEqual([ MEMBERSHIP ])
    expect(json.subscriptions).toEqual([ SUBSCRIPTION ])
  })

  it('Non-admin _ 401', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(false)
    
    const result = await GET(new Request(`${CONSTANTS.requestUrl}?query=${CONSTANTS.searchQuery}`, {
      method: 'GET',
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(401)

    expect(getPersonsByRef).not.toHaveBeenCalled()
    expect(getMembershipsByRef).not.toHaveBeenCalled()
    expect(getSubscriptionsByRef).not.toHaveBeenCalled()
  })

  it('Missing query _ 400', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    
    const result = await GET(new Request(CONSTANTS.requestUrl, {
      method: 'GET',
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(400)

    expect(getPersonsByRef).not.toHaveBeenCalled()
    expect(getMembershipsByRef).not.toHaveBeenCalled()
    expect(getSubscriptionsByRef).not.toHaveBeenCalled()  })

  it('Internal error _ 500', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    ;(getPersonsByRef as jest.Mock).mockRejectedValue(new Error())
    
    const result = await GET(new Request(`${CONSTANTS.requestUrl}?query=${CONSTANTS.searchQuery}`, {
      method: 'GET',
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(500)
  })

})
