'use server'

import { cookies } from 'next/headers'

import { generateIdFromEntropySize } from 'lucia'

import { prismaClient } from '@/lib/prisma/prismaClient'
import { lucia } from '@/lib/lucia/lucia'
import { validateRequest } from '@/lib/auth'

export const deleteUser = async () => {
  try {
    const { user } = await validateRequest()
    if (!user) throw new Error()

    await prismaClient.$transaction(async (transaction) => {
      await transaction.oauthAccount.deleteMany({
        where: {
          userId: user.id,
        },
      })

      await transaction.session.deleteMany({
        where: {
          userId: user.id,
        },
      })

      await transaction.user.update({
        where: {
          id: user.id,
        },
        data: {
          // Email fields must be unique so this allows a user to create
          // a new account after soft deletion but before full deletion.
          email: `${user.email}-${generateIdFromEntropySize(10)}`,
          deletedAt: new Date(),
        },
      })
    })

    const sessionCookie = lucia.createBlankSessionCookie()

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  } catch {
    throw new Error('Error whilst soft deleting user')
  }
}
