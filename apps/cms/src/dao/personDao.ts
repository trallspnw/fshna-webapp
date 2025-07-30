import { PrismaClient } from '@prisma'

const prisma = new PrismaClient()

export async function getPersonById(id: string) {
  return await prisma.person.findUnique({
    where: { id }
  })
}

export async function searchPersons(query: string) {
  return await prisma.person.findMany({
    where: {
      OR: [
        { email: { contains: query, mode: 'insensitive' } },
        { name: { contains: query, mode: 'insensitive' } },
      ],
    },
  })
}

export async function createPerson(
  email: string,
  name?: string,
  phone?: string,
  address?: string,
  language?: string,
  ref?: string,
) {
  return await prisma.$transaction(async (client) => {
    const existing = await client.person.findUnique({
      where: { email },
    })

    if (existing) {
      return {
        success: false,
        reason: 'EMAIL_ALREADY_EXISTS',
      }
    }

    const person = await client.person.create({
      data: {
        email,
        name,
        phone,
        address,
        language,
        ref,
      },
    })

    return {
      success: true,
      person,
    }
  })
}

export async function updatePerson(
  id: string,
  email: string,
  name?: string,
  phone?: string,
  address?: string,
  language?: string,
  ref?: string,
) {
  return await prisma.$transaction(async (client) => {
    const person = await client.person.findUnique({ 
      where: { id },
    })

    if (!person) {
      return {
        success: false,
        reason: 'NOT_FOUND',
      }
    }

    if (email !== person.email) {
      const existing = await client.person.findUnique({
        where: { email },
      })

      if (existing) {
        return {
          success: false,
          reason: 'EMAIL_ALREADY_EXISTS',
        }
      }
    }

    const updated = await client.person.update({
      where: { id },
      data: {
        email,
        name,
        phone,
        address,
        language,
        ref,
      },
    })

    return {
      success: true,
      person: updated,
    }
  })
}


export async function deletePerson(id: string) {
  return await prisma.$transaction(async (client) => {
    const person = await client.person.findUnique({ 
      where: { id } 
    })

    if (!person) {
      return {
        success: false,
        reason: 'NOT_FOUND',
      }
    }

    await client.subscription.deleteMany({
      where: { personId: id },
    })

    await client.membership.deleteMany({
      where: { personId: id },
    })

    await client.person.delete({
      where: { id },
    })

    return {
      success: true,
    }
  })
}
