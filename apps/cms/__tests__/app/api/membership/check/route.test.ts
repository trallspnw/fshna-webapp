import { CONSTANTS } from "@/apps/cms/__tests__/constants"
import { GET } from "@/apps/cms/src/app/api/membership/check/route"
import { getLatestMembershipByEmail } from "@/apps/cms/src/dao/membershipDao"
import { NextRequest } from "next/server"

jest.mock('/src/dao/membershipDao', () => ({
  getLatestMembershipByEmail: jest.fn(),
}))

describe('GET /api/membership/check', () => {

  it('Active member _ 200, active member', async () => {
    const futureDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // +1 day
    ;(getLatestMembershipByEmail as jest.Mock).mockResolvedValue({ expiresAt: futureDate })

    const result = await GET({
      nextUrl: { 
        searchParams: new URLSearchParams({ 
          email: CONSTANTS.email 
        }) 
      },
    } as unknown as NextRequest)

    expect(result.status).toBe(200)
    const json = await result.json()
    expect(json.isMember).toBeTruthy()
  })

  it('No records _ 200, inactive member', async () => {
    ;(getLatestMembershipByEmail as jest.Mock).mockResolvedValue(null)

    const result = await GET({
      nextUrl: { 
        searchParams: new URLSearchParams({ 
          email: CONSTANTS.email 
        }) 
      },
    } as unknown as NextRequest)

    expect(result.status).toBe(200)
    const json = await result.json()
    expect(json.isMember).toBeFalsy()
  })

  it('Expired membership _ 200, inactive member', async () => {
    const futureDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // -1 day
    ;(getLatestMembershipByEmail as jest.Mock).mockResolvedValue({ expiresAt: futureDate })

    const result = await GET({
      nextUrl: { 
        searchParams: new URLSearchParams({ 
          email: CONSTANTS.email 
        }) 
      },
    } as unknown as NextRequest)

    expect(result.status).toBe(200)
    const json = await result.json()
    expect(json.isMember).toBeFalsy()
  })

  it('Invalid email _ 400', async () => {
    const result = await GET({
      nextUrl: { 
        searchParams: new URLSearchParams({ 
          email: CONSTANTS.invalidEmail 
        }) 
      },
    } as unknown as NextRequest)

    expect(result.status).toBe(400)

    expect(getLatestMembershipByEmail).not.toHaveBeenCalled()
  })

  it('Internal error _ 500', async () => {
    (getLatestMembershipByEmail as jest.Mock).mockRejectedValue(new Error())

    const result = await GET({
      nextUrl: { 
        searchParams: new URLSearchParams({ 
          email: CONSTANTS.email 
        }) 
      },
    } as unknown as NextRequest)

    expect(result.status).toBe(500)
  })

})
