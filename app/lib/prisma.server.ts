import { PrismaClient } from '@prisma/client'

import { invariant } from '~/utils/misc'

const getClient = () => {
  const { DATABASE_URL } = process.env

  invariant(typeof DATABASE_URL === 'string', 'DATABASE_URL must be set in env vars')

  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })

  client.$connect()
  console.log('prisma connected!')

  return client
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || getClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
