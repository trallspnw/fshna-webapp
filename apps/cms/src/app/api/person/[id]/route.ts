import { deletePerson, updatePerson } from "@/apps/cms/src/dao/personDao"
import { isValidEmail, isValidUsPhone } from "@/packages/common/src/lib/validation"
import { Language, SUPPORTED_LANGUAGES } from "@/packages/common/src/types/language"
import { NextRequest, NextResponse } from "next/server"
import { createPayloadRequest } from "payload"
import configPromise from '@payload-config'

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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
    
    const { id } = await context.params
    const { email, name, phone, address, language, ref } = await request.json()

    const cleaned = {
      email: clean(email),
      name: clean(name),
      phone: clean(phone),
      address: clean(address),
      language: clean(language),
      ref: clean(ref),
    }

    if (!id) {
      return NextResponse.json(
        { error: 'Invalid person id' }, 
        { status: 400 },
      )
    }
    
    if (!cleaned.email || !isValidEmail(cleaned.email)) {
      return NextResponse.json(
        { error: 'Invalid email' }, 
        { status: 400 },
      )
    }

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

    const result = await updatePerson(
      id,
      cleaned.email, 
      cleaned.name, 
      cleaned.phone, 
      cleaned.address, 
      cleaned.language, 
      cleaned.ref,
    )

    if (!result.success) {
      return NextResponse.json(
        { error: result.reason || 'Update failed' }, 
        { status: 400 },
      )
    }

    return NextResponse.json(
      { personId: result.person?.id }, 
      { status: 200 },
    )

  } catch (e) {
    console.error('Error while updating person:', e)
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 },
    )
  }
}


export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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
    
    const { id } = await context.params

    if (!id) {
      return NextResponse.json(
        { error: 'Invalid person id' }, 
        { status: 400 },
      )
    }

    const result = await deletePerson(id)

    if (!result.success) {
      return NextResponse.json(
        { error: result.reason || 'Delete failed' }, 
        { status: 400 },
      )
    }

    return NextResponse.json(
      { status: 200 },
    )

  } catch (e) {
    console.error('Error while deleting person:', e)
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 },
    )
  }
}

function clean(value: string): string | undefined {
  return value?.trim() === '' ? undefined : value
}
