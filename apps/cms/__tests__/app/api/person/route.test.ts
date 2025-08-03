import { NextRequest } from 'next/server'
import { CONSTANTS } from '../../../constants'
import { isAdmin } from '@/apps/cms/src/lib/apiAuth'
import { createPerson } from '@/apps/cms/src/dao/personDao'
import { POST } from '@/apps/cms/src/app/api/person/route'

jest.mock('/src/lib/apiAuth', () => ({
  isAdmin: jest.fn(),
}))

jest.mock('/src/dao/personDao', () => ({
  createPerson: jest.fn(() => Promise.resolve({
    success: true,
    person: {
      id: CONSTANTS.generalId,
    }
  })),
}))

describe('POST /api/person', () => {

  it('Valid inputs _ 200, person created', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)

    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        email: CONSTANTS.email,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone,
        address: CONSTANTS.address,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(200)

    expect(createPerson).toHaveBeenCalledTimes(1)
    expect(createPerson).toHaveBeenCalledWith(
      CONSTANTS.email,
      CONSTANTS.name,
      CONSTANTS.phone,
      CONSTANTS.address,
      CONSTANTS.language,
      CONSTANTS.ref,
    )
  })

  it('Valid inputs with 11 digit phone _ 200, person created', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)

    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        email: CONSTANTS.email,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone11Diget,
        address: CONSTANTS.address,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(200)

    expect(createPerson).toHaveBeenCalledTimes(1)
    expect(createPerson).toHaveBeenCalledWith(
      CONSTANTS.email,
      CONSTANTS.name,
      CONSTANTS.phone11Diget,
      CONSTANTS.address,
      CONSTANTS.language,
      CONSTANTS.ref,
    )
  })

  it('Non-admin sender _ 401', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(false)

    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        email: CONSTANTS.email,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone,
        address: CONSTANTS.address,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(401)

    expect(createPerson).not.toHaveBeenCalled()
  })

  it('Invalid email _ 400', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)

    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        email: CONSTANTS.invalidEmail,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone,
        address: CONSTANTS.address,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(400)

    expect(createPerson).not.toHaveBeenCalled()
  })

  it('Invalid phone _ 400', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)

    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        email: CONSTANTS.invalidEmail,
        name: CONSTANTS.name,
        phone: CONSTANTS.invalidPhone,
        address: CONSTANTS.address,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(400)

    expect(createPerson).not.toHaveBeenCalled()
  })

  it('Invalid language _ 400', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)

    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        email: CONSTANTS.invalidEmail,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone,
        address: CONSTANTS.address,
        language: CONSTANTS.invalidLanguage,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(400)

    expect(createPerson).not.toHaveBeenCalled()
  })

  it('DAO error returned _ 400', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    ;(createPerson as jest.Mock).mockResolvedValue({ success: false })

    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        email: CONSTANTS.email,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone,
        address: CONSTANTS.address,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(400)
  })

  it('Internal error _ 500', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    ;(createPerson as jest.Mock).mockRejectedValue(new Error())

    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        email: CONSTANTS.email,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone,
        address: CONSTANTS.address,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(500)
  })

})
