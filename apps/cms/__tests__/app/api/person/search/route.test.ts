import { GET } from "@/apps/cms/src/app/api/person/search/route"
import { CONSTANTS } from "../../../../constants"
import { NextRequest } from "next/server"
import { isAdmin } from "@/apps/cms/src/lib/apiAuth"
import { searchPersons } from "@/apps/cms/src/dao/personDao"

jest.mock('/src/lib/apiAuth', () => ({
  isAdmin: jest.fn(),
}))

jest.mock('/src/dao/personDao', () => ({
  searchPersons: jest.fn(() => Promise.resolve([ CONSTANTS.genericObject ])),
}))

describe('GET /api/person/search', () => {

  it('Admin with valid query _ 200, persons returned', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    
    const result = await GET(new Request(`${CONSTANTS.requestUrl}?query=${CONSTANTS.searchQuery}`, {
      method: 'GET',
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(200)
    const json = await result.json()
    expect(json.persons).toEqual([ CONSTANTS.genericObject ])
  })

  it('Non-admin _ 401', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(false)
    
    const result = await GET(new Request(`${CONSTANTS.requestUrl}?query=${CONSTANTS.searchQuery}`, {
      method: 'GET',
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(401)

    expect(searchPersons).not.toHaveBeenCalled()
  })

  it('Missing query _ 400', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    
    const result = await GET(new Request(CONSTANTS.requestUrl, {
      method: 'GET',
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(400)

    expect(searchPersons).not.toHaveBeenCalled()
  })

  it('Internal error _ 500', async () => {
    (isAdmin as jest.Mock).mockResolvedValue(true)
    ;(searchPersons as jest.Mock).mockRejectedValue(new Error())
    
    const result = await GET(new Request(`${CONSTANTS.requestUrl}?query=${CONSTANTS.searchQuery}`, {
      method: 'GET',
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(500)
  })

})
