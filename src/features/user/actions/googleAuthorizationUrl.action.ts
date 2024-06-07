'use server'

import { generateState, generateCodeVerifier } from 'arctic'

import { google } from '@/lib/lucia/oauth'
import { cookies } from 'next/headers'

export const googleAuthorizationUrl = async () => {
  try {
    const state = generateState()
    const codeVerifier = generateCodeVerifier()

    cookies().set('codeVerifier', codeVerifier, { httpOnly: true })
    cookies().set('state', state, { httpOnly: true })

    const authorizationURL = await google.createAuthorizationURL(state, codeVerifier, { scopes: ['email', 'profile'] })

    return String(authorizationURL)
  } catch {
    throw new Error('Error whilst creating Google authorization url')
  }
}
