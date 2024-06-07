import { cache } from 'react'
import { cookies } from 'next/headers'

import { lucia } from '@/lib/lucia/lucia'

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

  if (!sessionId)
    return {
      user: null,
      session: null,
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
  }
})

export const createSessionSetCookies = async (userId: string) => {
  const session = await lucia.createSession(userId, {})

  const sessionCookie = lucia.createSessionCookie(session.id)

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  cookies().set('state', '', { expires: new Date(0) })
  cookies().set('codeVerifier', '', { expires: new Date(0) })
}
