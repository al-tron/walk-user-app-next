import { cache } from 'react'
import { cookies } from 'next/headers'

import { prismaClient } from '@/lib/prisma/prismaClient'
import { lucia } from '@/lib/lucia/lucia'

export const validateRequest = cache(async () => {
  try {
    // This is just to check if database is available and throw an error if it's not.
    await prismaClient.$queryRaw`SELECT 1`
  } catch {
    return {
      user: null,
      session: null,
      dbError: true,
    }
  }

  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

  if (!sessionId)
    return {
      user: null,
      session: null,
      dbError: null,
    }

  const { user, session } = await lucia.validateSession(sessionId)

  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch {
    // Next.js throws an error when attempting to set cookies when rendering page.
  }

  return {
    user,
    session,
    dbError: null,
  }
})

export const createSessionSetCookies = async (userId: string) => {
  const session = await lucia.createSession(userId, {})

  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  cookies().set('state', '', { expires: new Date(0) })
  cookies().set('codeVerifier', '', { expires: new Date(0) })
}
