import { isValidEmail, isValidUsPhone } from "@/packages/common/src/lib/validation";
import { Language, SUPPORTED_LANGUAGES } from "@/packages/common/src/types/language";
import { NextRequest, NextResponse } from "next/server";
import { createPerson } from "../../../dao/personDao";
import { createPayloadRequest } from "payload";
import configPromise from '@payload-config'

/**
 * API route for adding a person. Must be used by an authenticated admin.
 * @param request Person information
 * @returns The ID of the new person or a failure message
 */
export async function POST(request: NextRequest) {
  try {
    const payloadRequest = await createPayloadRequest({
      config: configPromise,
      request,
    })

    const user = payloadRequest.user
    if (!user || user.collection !== 'admins') {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 },
      )
    }
    
    const { email, name, phone, address, language, ref } = await request.json()

    // Normalize input
    const cleaned = {
      email: clean(email),
      name: clean(name),
      phone: clean(phone),
      address: clean(address),
      language: clean(language),
      ref: clean(ref),
    }
    
    // Validate input
    if (!cleaned.email || !isValidEmail(cleaned.email)) {
      return NextResponse.json(
        { error: 'Invalid email' }, 
        { status: 400 },
      )
    }

    // Phone is not required, but it must be valid if provided
    if (cleaned.phone && !isValidUsPhone(cleaned.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone' }, 
        { status: 400 }
      )
    }

    if (!SUPPORTED_LANGUAGES.includes(cleaned.language as Language)) {
      return NextResponse.json(
        { error: 'Invalid language' }, 
        { status: 400 }
      )
    }

    const result = await createPerson(
      cleaned.email, 
      cleaned.name, 
      cleaned.phone, 
      cleaned.address, 
      cleaned.language, 
      cleaned.ref,
    )

    if (!result.success) {
      return NextResponse.json(
        { error: result.reason || 'Create failed' }, 
        { status: 400 },
      )
    }

    return NextResponse.json(
      { personId: result.person?.id }, 
      { status: 200 },
    )

  } catch (e) {
    console.error('Error while creating person:', e)
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 },
    )
  }
}

// Helper for cleaning / normalizing input
function clean(value: string): string | undefined {
  return value?.trim() === '' ? undefined : value
}
