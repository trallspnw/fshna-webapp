import { PrismaClient } from '@prisma'

const prisma = new PrismaClient()

export async function subscribe(email: string, language: string, ref?: string) {
  return await prisma.$transaction(async (client) => {

    const person = await client.person.findUnique({
      where: { email },
      include: { subscriptions: true },
    })

    if (!person) {
      await client.person.create({
        data: { 
          email, 
          ref,
          language,
          subscriptions: {
            create: {
              ref,
            }
          }
        },
        include: { 
          subscriptions: true 
        },
      })
    } else if (person.subscriptions.length === 0) {
      await client.subscription.create({
        data: {
          personId: person.id,
          ref,
        },
      })
    }

    return { success: true }
  })
}

export async function getSubscriptions() {
  return prisma.person.findMany({
    where: {
      subscriptions: {
        some: {}, // At least one subscription
      },
    },
    include: {
      subscriptions: true,
    },
  })
}
