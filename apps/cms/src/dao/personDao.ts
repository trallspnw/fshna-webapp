import { PrismaClient } from '@prisma'

const prisma = new PrismaClient()

export async function getPersonById(id: string) {
  return await prisma.person.findUnique({
    where: { id }
  })
}
