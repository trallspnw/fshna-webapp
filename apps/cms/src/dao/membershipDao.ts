import { PrismaClient } from '@prisma'

const prisma = new PrismaClient()

export async function initMembership(
  email: string, 
  name: string, 
  phone: string | undefined, 
  address: string | undefined, 
  language: string, 
  ref: string,
) {
  return await prisma.$transaction(async (client) => {
    let person = await client.person.findUnique({
      where: { email },
    })

    if (!person) {
      person = await client.person.create({
        data: {
          email,
          name,
          phone,
          address,
          language,
          ref,
        },
      })
    } else {
      person = await client.person.update({
        where: { email },
        data: {
          ...(name !== undefined ? { name } : {}),
          ...(phone !== undefined ? { phone } : {}),
          ...(address !== undefined ? { address } : {}),
          ...(language !== undefined ? { language } : {}),
        },
      })
    }

    return { 
      success: true,
      personId: person.id,
    }
  })
}
