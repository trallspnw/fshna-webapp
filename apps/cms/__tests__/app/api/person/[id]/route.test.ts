import { NextRequest } from 'next/server'
import { CONSTANTS } from '../../../../constants'
import { isAdmin } from '@/apps/cms/src/lib/apiAuth'
import { deletePerson, updatePerson } from '@/apps/cms/src/dao/personDao'
import { DELETE, PATCH } from '@/apps/cms/src/app/api/person/[id]/route'

jest.mock('/src/lib/apiAuth', () => ({
  isAdmin: jest.fn(),
}))

jest.mock('/src/dao/personDao', () => ({
  updatePerson: jest.fn(() => Promise.resolve({
    success: true,
    person: {
      id: CONSTANTS.generalId,
    }
  })),
  deletePerson: jest.fn(() => Promise.resolve({
    success: true,
  })),
}))

describe('PATCH /api/person/[id]', () => {

  it('Valid inputs _ 200, person updated', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)

    const result = await PATCH(
      new Request(CONSTANTS.requestUrl, {
        method: 'PATCH',
        body: JSON.stringify({ 
          email: CONSTANTS.email,
          name: CONSTANTS.name,
          phone: CONSTANTS.phone,
          address: CONSTANTS.address,
          language: CONSTANTS.language,
          ref: CONSTANTS.ref,
        }),
        headers: CONSTANTS.apiHeaders,
      }) as NextRequest,
      {
        params: Promise.resolve({ id: CONSTANTS.generalId })
      },
    )

    expect(result.status).toBe(200)

    expect(updatePerson).toHaveBeenCalledTimes(1)
    expect(updatePerson).toHaveBeenCalledWith(
      CONSTANTS.generalId,
      CONSTANTS.email,
      CONSTANTS.name,
      CONSTANTS.phone,
      CONSTANTS.address,
      CONSTANTS.language,
      CONSTANTS.ref,
    )
  })

  it('Valid inputs with 11 digit phone _ 200, person updated', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)

    const result = await PATCH(
      new Request(CONSTANTS.requestUrl, {
        method: 'PATCH',
        body: JSON.stringify({ 
          email: CONSTANTS.email,
          name: CONSTANTS.name,
          phone: CONSTANTS.phone11Diget,
          address: CONSTANTS.address,
          language: CONSTANTS.language,
          ref: CONSTANTS.ref,
        }),
        headers: CONSTANTS.apiHeaders,
      }) as NextRequest,
      {
        params: Promise.resolve({ id: CONSTANTS.generalId })
      },
    )

    expect(result.status).toBe(200)

    expect(updatePerson).toHaveBeenCalledTimes(1)
    expect(updatePerson).toHaveBeenCalledWith(
      CONSTANTS.generalId,
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

    const result = await PATCH(
      new Request(CONSTANTS.requestUrl, {
        method: 'PATCH',
        body: JSON.stringify({ 
          email: CONSTANTS.email,
          name: CONSTANTS.name,
          phone: CONSTANTS.phone,
          address: CONSTANTS.address,
          language: CONSTANTS.language,
          ref: CONSTANTS.ref,
        }),
        headers: CONSTANTS.apiHeaders,
      }) as NextRequest,
      {
        params: Promise.resolve({ id: CONSTANTS.generalId })
      },
    )

    expect(result.status).toBe(401)

    expect(updatePerson).not.toHaveBeenCalled()
  })

  it('Invalid email _ 400', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)

    const result = await PATCH(
      new Request(CONSTANTS.requestUrl, {
        method: 'PATCH',
        body: JSON.stringify({ 
          email: CONSTANTS.invalidEmail,
          name: CONSTANTS.name,
          phone: CONSTANTS.phone,
          address: CONSTANTS.address,
          language: CONSTANTS.language,
          ref: CONSTANTS.ref,
        }),
        headers: CONSTANTS.apiHeaders,
      }) as NextRequest,
      {
        params: Promise.resolve({ id: CONSTANTS.generalId })
      },
    )

    expect(result.status).toBe(400)

    expect(updatePerson).not.toHaveBeenCalled()
  })

  it('Invalid phone _ 400', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)

    const result = await PATCH(
      new Request(CONSTANTS.requestUrl, {
        method: 'PATCH',
        body: JSON.stringify({ 
          email: CONSTANTS.email,
          name: CONSTANTS.name,
          phone: CONSTANTS.invalidPhone,
          address: CONSTANTS.address,
          language: CONSTANTS.language,
          ref: CONSTANTS.ref,
        }),
        headers: CONSTANTS.apiHeaders,
      }) as NextRequest,
      {
        params: Promise.resolve({ id: CONSTANTS.generalId })
      },
    )

    expect(result.status).toBe(400)

    expect(updatePerson).not.toHaveBeenCalled()
  })

  it('Invalid language _ 400', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)

    const result = await PATCH(
      new Request(CONSTANTS.requestUrl, {
        method: 'PATCH',
        body: JSON.stringify({ 
          email: CONSTANTS.email,
          name: CONSTANTS.name,
          phone: CONSTANTS.phone,
          address: CONSTANTS.address,
          language: CONSTANTS.invalidLanguage,
          ref: CONSTANTS.ref,
        }),
        headers: CONSTANTS.apiHeaders,
      }) as NextRequest,
      {
        params: Promise.resolve({ id: CONSTANTS.generalId })
      },
    )

    expect(result.status).toBe(400)

    expect(updatePerson).not.toHaveBeenCalled()
  })

  it('DAO error returned _ 400', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    ;(updatePerson as jest.Mock).mockResolvedValue({ success: false })

    const result = await PATCH(
      new Request(CONSTANTS.requestUrl, {
        method: 'PATCH',
        body: JSON.stringify({ 
          email: CONSTANTS.email,
          name: CONSTANTS.name,
          phone: CONSTANTS.phone,
          address: CONSTANTS.address,
          language: CONSTANTS.language,
          ref: CONSTANTS.ref,
        }),
        headers: CONSTANTS.apiHeaders,
      }) as NextRequest,
      {
        params: Promise.resolve({ id: CONSTANTS.generalId })
      },
    )

    expect(result.status).toBe(400)
  })

  it('Internal error _ 500', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    ;(updatePerson as jest.Mock).mockRejectedValue(new Error())

    const result = await PATCH(
      new Request(CONSTANTS.requestUrl, {
        method: 'PATCH',
        body: JSON.stringify({ 
          email: CONSTANTS.email,
          name: CONSTANTS.name,
          phone: CONSTANTS.phone,
          address: CONSTANTS.address,
          language: CONSTANTS.language,
          ref: CONSTANTS.ref,
        }),
        headers: CONSTANTS.apiHeaders,
      }) as NextRequest,
      {
        params: Promise.resolve({ id: CONSTANTS.generalId })
      },
    )

    expect(result.status).toBe(500)
  })

})

describe('DELETE /api/person/[id]', () => {

  it('Valid inputs _ 200, person updated', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)

    const result = await DELETE(
      new Request(CONSTANTS.requestUrl, {
        method: 'DELETE',
        headers: CONSTANTS.apiHeaders,
      }) as NextRequest,
      {
        params: Promise.resolve({ id: CONSTANTS.generalId })
      },
    )

    expect(result.status).toBe(200)

    expect(deletePerson).toHaveBeenCalledTimes(1)
    expect(deletePerson).toHaveBeenCalledWith(CONSTANTS.generalId)
  })

  it('Non-admin sender _ 401', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(false)

    const result = await DELETE(
      new Request(CONSTANTS.requestUrl, {
        method: 'DELETE',
        headers: CONSTANTS.apiHeaders,
      }) as NextRequest,
      {
        params: Promise.resolve({ id: CONSTANTS.generalId })
      },
    )

    expect(result.status).toBe(401)

    expect(deletePerson).not.toHaveBeenCalled()
  })

  it('DAO error returned _ 400', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    ;(deletePerson as jest.Mock).mockResolvedValue({ success: false })

    const result = await DELETE(
      new Request(CONSTANTS.requestUrl, {
        method: 'DELETE',
        headers: CONSTANTS.apiHeaders,
      }) as NextRequest,
      {
        params: Promise.resolve({ id: CONSTANTS.generalId })
      },
    )

    expect(result.status).toBe(400)
  })

  it('Internal error _ 500', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    ;(deletePerson as jest.Mock).mockRejectedValue(new Error())

    const result = await DELETE(
      new Request(CONSTANTS.requestUrl, {
        method: 'DELETE',
        headers: CONSTANTS.apiHeaders,
      }) as NextRequest,
      {
        params: Promise.resolve({ id: CONSTANTS.generalId })
      },
    )

    expect(result.status).toBe(500)
  })

})
