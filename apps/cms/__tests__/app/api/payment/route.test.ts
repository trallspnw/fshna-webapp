import { GET } from "@/apps/cms/src/app/api/payment/route"
import { CONSTANTS } from "../../../constants"
import { NextRequest } from "next/server"

const SESSION_DATA = { id: CONSTANTS.sessionId }

jest.mock('/src/lib/stripe', () => ({
  getSession: jest.fn(() => Promise.resolve(SESSION_DATA)),
}))

describe('GET /api/payment', () => {

  it('Request with sessionId _ 200, session info returned', async () => {
    const result = await GET({
      nextUrl: { 
        searchParams: new URLSearchParams({ 
          sessionId: CONSTANTS.sessionId 
        }) 
      },
    } as unknown as NextRequest)

    expect(result.status).toBe(200)
    const json = await result.json()
    expect(json.sessionData).toEqual(SESSION_DATA)
  })

  it('Request without sessionId + 400', async () => {
    const result = await GET({
      nextUrl: { 
        searchParams: new URLSearchParams({}) 
      },
    } as unknown as NextRequest)

    expect(result.status).toBe(400)
  })

})
