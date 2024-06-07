import { PrismaAdapter } from '@lucia-auth/adapter-prisma'

import { prismaClient } from '@/lib/prisma/prismaClient'

export const adapter = new PrismaAdapter(prismaClient.session, prismaClient.user)
