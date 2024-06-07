'use server'

import { cookies } from 'next/headers'

import { lucia } from '@/lib/lucia/lucia'
import { validateRequest } from '@/lib/auth'

export const logOut = async () => {
  try {
    const { session } = await validateRequest()
    if (!session) throw new Error()

    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  } catch {
    throw new Error('Error whilst logging out user')
  }
}
