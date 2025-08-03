import { POST } from "@/apps/cms/src/app/api/subscribe/route"
import { CONSTANTS } from "../../../constants"
import { NextRequest } from "next/server"
import { subscribe } from "@/apps/cms/src/dao/subscriptionDao"

jest.mock('/src/dao/subscriptionDao', () => ({
  subscribe: jest.fn(),
}))

const REQUEST = new Request(CONSTANTS.requestUrl, {
  method: 'POST',
  body: JSON.stringify({
    email: CONSTANTS.email,
    language: CONSTANTS.language,
    ref: CONSTANTS.ref,
  }),
  headers: CONSTANTS.apiHeaders,
}) as NextRequest

describe('POST /api/subscribe', () => {

  it('Valid email _ 200, subscribed', async () => {
    const result = await POST(REQUEST)

    expect(result.status).toBe(200)

    expect(subscribe).toHaveBeenCalledTimes(1)
    expect(subscribe).toHaveBeenCalledWith(
      CONSTANTS.email,
      CONSTANTS.language,
      CONSTANTS.ref,
    )
  })

  it('Invalid email _ 400', async () => {
    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({
        email: CONSTANTS.invalidEmail,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(400)
    
    expect(subscribe).not.toHaveBeenCalled()
  })

  it('Internal error _ 500', async () => {
    (subscribe as jest.Mock).mockRejectedValue(new Error())

    const result = await POST(REQUEST)

    expect(result.status).toBe(500)
  })

})
