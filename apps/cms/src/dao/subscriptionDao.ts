import { PrismaClient } from '@prisma'

const prisma = new PrismaClient()

/**
 * Add a new subscription. Creates a person if email is unkown.
 * @param email The email address of the subscriber
 * @param language The language of preference of the subscriber
 * @param ref The ref tag associated with the subscription
 * @returns Success
 */
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

/**
 * Gets all persons with subscriptions and the associated subscription.
 * @returns All persons with subscriptions and the associated subscription.
 */
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
