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
      include: { 
        memberships: {
          orderBy: {
            expiresAt: 'desc'
          },
          take: 1,
        }
      },
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
        include: { memberships: true }
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

    const now = new Date()
    const oneMonthFromNow = new Date()
    oneMonthFromNow.setMonth(now.getMonth() + 1)
    const mostRecentMembership = person.memberships[0]
    if (mostRecentMembership?.expiresAt && mostRecentMembership.expiresAt > oneMonthFromNow) {
      return {
        success: false,
        reason: 'ACTIVE_MEMBERSHIP',
      }
    }

    return { 
      success: true,
      personId: person.id,
    }
  })
}

export async function completeMembership(personId: string, ref?: string) {
  return await prisma.$transaction(async (client) => {
    const person = await client.person.findUnique({
      where: { id: personId },
      include: { 
        memberships: {
          orderBy: {
            expiresAt: 'desc'
          },
          take: 1,
        }
      },
    })

    if (!person) {
      console.error('Tried to complete membership for a non-existing person', personId)
      throw new Error('Person not found')
    }

    const now = new Date()
    const mostRecentMembership = person.memberships[0]
    const createdAt = mostRecentMembership?.expiresAt > now 
      ? new Date(mostRecentMembership.expiresAt) 
      : now

    const expiresAt = new Date(createdAt);
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const membership = await client.membership.create({
      data: {
        personId,
        createdAt,
        expiresAt,
        ref: ref?.trim() || undefined,
      }
    })

    console.log(`Added new membership! Member: ${membership.id}`)
  })
}

export async function getLatestMembershipByEmail(email: string) {
  const person = await prisma.person.findUnique({
    where: { email },
    include: { 
      memberships: {
        orderBy: {
          expiresAt: 'desc'
        },
        take: 1,
      }
    },
  })

  return (person && person.memberships.length > 0) ? 
    person.memberships[0] : null
}

export async function searchMembers(query: string) {
  const now = new Date()

  const persons = await prisma.person.findMany({
    where: {
      memberships: {
        some: {}, // has memberships
      },
      OR: [
        { email: { contains: query, mode: 'insensitive' } },
        { name: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: {
      memberships: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  return persons.map((person) => {
    const memberships = person.memberships
    const startDate = memberships.at(0)?.createdAt
    const expiresAt = memberships.at(-1)?.expiresAt
    const active = expiresAt ? expiresAt > now : false
    const latestRef = memberships.at(-1)?.ref

    return {
      id: person.id,
      email: person.email,
      name: person.name,
      phone: person.phone,
      address: person.address,
      language: person.language,
      startDate,
      expiresAt,
      active,
      ref: latestRef,
    }
  }).sort((a, b) => {
    // Sort by latest expiration first
    return (b.expiresAt?.getTime() ?? 0) - (a.expiresAt?.getTime() ?? 0)
  })
}
