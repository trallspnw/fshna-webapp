import { CONSTANTS } from "@/apps/cms/__tests__/constants";
import { POST } from "@/apps/cms/src/app/api/donate/init/route";
import { initDonation } from "@/apps/cms/src/dao/donationDao";
import { createSession } from "@/apps/cms/src/lib/stripe";
import { NextRequest } from "next/server";

const EXPECTED_SESSION_CREATE = expect.objectContaining({
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: CONSTANTS.itemName,
        },
        unit_amount: CONSTANTS.monetaryAmountInCents,
      },
      quantity: 1,
    },
  ],
  email: CONSTANTS.email,
  success_url: expect.stringContaining('/orderSuccess'),
  cancel_url: expect.stringContaining('/orderFailed'),
  language: CONSTANTS.language,
  metadata: {
    personId: CONSTANTS.generalId,
    email: CONSTANTS.email,
    itemName: CONSTANTS.itemName,
    itemType: CONSTANTS.itemTypeDonation,
    entryUrl: CONSTANTS.generalUrl,
    ref: CONSTANTS.ref,
  },
})

jest.mock('/src/dao/donationDao', () => ({
  initDonation: jest.fn(() => Promise.resolve({ 
    success: true,
    personId: CONSTANTS.generalId,
  })),
}))

jest.mock('/src/lib/stripe', () => ({
  createSession: jest.fn(() => Promise.resolve({ url: CONSTANTS.stripeUrl }))
}))

describe('POST /api/donate/init', () => {

  it('Valid inputs _ 200, donation initialized', async () => {
    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        amount: CONSTANTS.monetaryAmount,
        itemName: CONSTANTS.itemName,
        email: CONSTANTS.email,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone,
        address: CONSTANTS.address,
        entryUrl: CONSTANTS.generalUrl,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(200)
    const json = await result.json()
    expect(json.paymentUrl).toBe(CONSTANTS.stripeUrl)

    expect(initDonation).toHaveBeenCalledTimes(1)
    expect(initDonation).toHaveBeenCalledWith(
      CONSTANTS.email,
      CONSTANTS.name,
      CONSTANTS.phone,
      CONSTANTS.address,
      CONSTANTS.language,
      CONSTANTS.ref,
    )

    expect(createSession).toHaveBeenCalledTimes(1)
    expect(createSession).toHaveBeenCalledWith(EXPECTED_SESSION_CREATE)
  })

  it('Valid inputs with 11 digit phone _ 200, donation initialized', async () => {
    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        amount: CONSTANTS.monetaryAmount,
        itemName: CONSTANTS.itemName,
        email: CONSTANTS.email,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone11Diget,
        address: CONSTANTS.address,
        entryUrl: CONSTANTS.generalUrl,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(200)
    const json = await result.json()
    expect(json.paymentUrl).toBe(CONSTANTS.stripeUrl)

    expect(initDonation).toHaveBeenCalledTimes(1)
    expect(initDonation).toHaveBeenCalledWith(
      CONSTANTS.email,
      CONSTANTS.name,
      CONSTANTS.phone,
      CONSTANTS.address,
      CONSTANTS.language,
      CONSTANTS.ref,
    )

    expect(createSession).toHaveBeenCalledTimes(1)
    expect(createSession).toHaveBeenCalledWith(EXPECTED_SESSION_CREATE)
  })

  it('Invalid amount _ 400', async () => {
    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        amount: CONSTANTS.invalidMonetaryAmount,
        itemName: CONSTANTS.itemName,
        email: CONSTANTS.email,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone11Diget,
        address: CONSTANTS.address,
        entryUrl: CONSTANTS.generalUrl,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(400)

    expect(initDonation).not.toHaveBeenCalled()
    expect(createSession).not.toHaveBeenCalled()
  })

  it('Invalid email _ 400', async () => {
    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        amount: CONSTANTS.monetaryAmount,
        itemName: CONSTANTS.itemName,
        email: CONSTANTS.invalidEmail,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone11Diget,
        address: CONSTANTS.address,
        entryUrl: CONSTANTS.generalUrl,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(400)

    expect(initDonation).not.toHaveBeenCalled()
    expect(createSession).not.toHaveBeenCalled()
  })

  it('Invalid phone _ 400', async () => {
    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        amount: CONSTANTS.monetaryAmount,
        itemName: CONSTANTS.itemName,
        email: CONSTANTS.invalidEmail,
        name: CONSTANTS.name,
        phone: CONSTANTS.invalidPhone,
        address: CONSTANTS.address,
        entryUrl: CONSTANTS.generalUrl,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(400)

    expect(initDonation).not.toHaveBeenCalled()
    expect(createSession).not.toHaveBeenCalled()
  })

  it('DAO error returned _ 500', async () => {
    (initDonation as jest.Mock).mockResolvedValue({ success: false })

    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        amount: CONSTANTS.monetaryAmount,
        itemName: CONSTANTS.itemName,
        email: CONSTANTS.email,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone,
        address: CONSTANTS.address,
        entryUrl: CONSTANTS.generalUrl,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(500)

    expect(createSession).not.toHaveBeenCalled()
  })

  it('Internal error _ 500', async () => {
    (createSession as jest.Mock).mockRejectedValue(new Error())

    const result = await POST(new Request(CONSTANTS.requestUrl, {
      method: 'POST',
      body: JSON.stringify({ 
        amount: CONSTANTS.monetaryAmount,
        itemName: CONSTANTS.itemName,
        email: CONSTANTS.email,
        name: CONSTANTS.name,
        phone: CONSTANTS.phone,
        address: CONSTANTS.address,
        entryUrl: CONSTANTS.generalUrl,
        language: CONSTANTS.language,
        ref: CONSTANTS.ref,
      }),
      headers: CONSTANTS.apiHeaders,
    }) as NextRequest)

    expect(result.status).toBe(500)
  })

})
