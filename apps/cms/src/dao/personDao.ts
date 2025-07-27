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
