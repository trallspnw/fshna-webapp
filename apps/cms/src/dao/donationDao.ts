import { PrismaClient } from '@prisma'

const prisma = new PrismaClient()

/**
 * Initializes a dontation. The nodation itself is not recordered, but the donor (person) is stored. If the eamil
 * address is known, the contact information is updated.
 * @param email The email address of the donor and the main user facing identifier
 * @param name The name of the donor
 * @param phone The phone number of the donor
 * @param address The address of the donor
 * @param language The perferred language of the donor
 * @param ref A ref tag identifying the user ingress/campaign (only saved on initial creation)
 * @returns The ID of the donor person
 */
export async function initDonation(
  email: string, 
  name: string | undefined, 
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
