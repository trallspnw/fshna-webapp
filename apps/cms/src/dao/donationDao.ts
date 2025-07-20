import { PrismaClient } from '@prisma'

const prisma = new PrismaClient()

export async function initDonation(
  email: string, 
  name: string | undefined, 
  phone: string | undefined, 
  address: string | undefined, 
  language: string, 
  ref: string,
) {
  return await prisma.$transaction(async (client) => {

    const person = await client.person.findUnique({
      where: { email },
    })

    if (!person) {
      await client.person.create({
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
      await client.person.update({
        where: { email },
        data: {
          ...(name !== undefined ? { name } : {}),
          ...(phone !== undefined ? { phone } : {}),
          ...(address !== undefined ? { address } : {}),
          ...(language !== undefined ? { language } : {}),
        },
      })
    }

    return { success: true }
  })
}
