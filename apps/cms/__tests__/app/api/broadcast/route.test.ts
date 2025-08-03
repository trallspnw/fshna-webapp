import { POST } from '@cms/app/api/broadcast/route'
import { NextRequest } from 'next/server'
import { CONSTANTS } from '../../../constants'
import { isAdmin } from '@/apps/cms/src/lib/apiAuth'
import { sendEmails } from '@/apps/cms/src/lib/email'

const REQUEST = new Request(CONSTANTS.requestUrl, {
  method: 'POST',
  body: JSON.stringify({ emailSlug: CONSTANTS.slug }),
  headers: CONSTANTS.apiHeaders,
}) as NextRequest

jest.mock('/src/lib/apiAuth', () => ({
  isAdmin: jest.fn(),
}))

jest.mock('/src/dao/subscriptionDao', () => ({
  getSubscriptions: jest.fn(() => Promise.resolve([
    { email: CONSTANTS.email },
    { email: CONSTANTS.email2 },
  ])),
}))

jest.mock('/src/lib/email', () => ({
  sendEmails: jest.fn(() => Promise.resolve()),
}))

describe('POST /api/broadcast', () => {

  it('Admin sender _ 200, emails sent', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)

    const result = await POST(REQUEST)

    expect(result.status).toBe(200)

    expect(sendEmails).toHaveBeenCalledTimes(1)
    expect(sendEmails).toHaveBeenCalledWith(
      [
        { email: CONSTANTS.email },
        { email: CONSTANTS.email2 },
      ],
      CONSTANTS.slug,
      {}
    )
  })

  it('Non-admin sender _ 401', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(false)

    const result = await POST(REQUEST)

    expect(result.status).toBe(401)

    expect(sendEmails).not.toHaveBeenCalled()
  })

  it('Internal error _ 500', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    ;(sendEmails as jest.Mock).mockRejectedValue(new Error())

    const result = await POST(REQUEST)

    expect(result.status).toBe(500)
  })

})
