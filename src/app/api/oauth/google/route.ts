import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

import { prismaClient } from '@/lib/prisma/prismaClient'
import { google } from '@/lib/lucia/oauth'
import { generateIdFromEntropySize } from 'lucia'

import { restClient } from '@/lib/restClient'
import { createSessionSetCookies } from '@/lib/auth'

export const GET = async (req: NextRequest) => {
  try {
    const url = req.nextUrl

    const authCodeParam = url.searchParams.get('code')
    const stateParam = url.searchParams.get('state')

    if (!authCodeParam || !stateParam) throw new Error()

    const codeVerifierCookie = cookies().get('codeVerifier')?.value
    const stateCookie = cookies().get('state')?.value

    if (!codeVerifierCookie || !stateCookie) throw new Error()
    if (stateCookie !== stateParam) throw new Error()

    const { accessToken, refreshToken, accessTokenExpiresAt } = await google.validateAuthorizationCode(
      authCodeParam,
      codeVerifierCookie,
    )

    const googleUserData = (await restClient('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    })) as GoogleUserType

    // Return the user id when the transaction(s) complete. This is to ensure createSessionSetCookies runs only after
    // the prisma transaction has resolved successfully, and also because depending on if the User already exists or
    // not we get the id in a different way.
    const userId = await prismaClient.$transaction(async (transaction) => {
      const oauthAccount = await transaction.oauthAccount.findUnique({
        where: {
          providerUserId_provider: {
            providerUserId: googleUserData.id,
            provider: 'GOOGLE',
          },
        },
        include: {
          user: true,
        },
      })

      const preExistingUser = oauthAccount?.user

      if (!preExistingUser) {
        // @todo/dbEmailError
        // When adding other Oauth providers an issue could happen here whereby a new User attempts to be created for
        // a pre-existing user when they sign in with a different Oauth provider. This will cause a db error at the
        // moment as the email fields are required to be unique by the db schema. An idea might be to check if the
        // email address already exists in the db at this point before creating a new user.
        const newlyCreatedUser = await transaction.user.create({
          data: {
            // @todo/preExistingId
            // Look into a graceful way to handle the unlikley event of generateIdFromEntropySize
            // creating an id that already exists in the user table.
            id: generateIdFromEntropySize(10),
            email: googleUserData.email,
            isEmailVerified: googleUserData.verified_email,
            name: googleUserData.name,
            givenName: googleUserData.given_name,
            familyName: googleUserData.family_name,
            profilePictureUrl: googleUserData.picture,
          },
        })

        await transaction.oauthAccount.create({
          data: {
            // @todo/preExistingId
            id: generateIdFromEntropySize(10),
            accessToken: accessToken,
            expiresAt: accessTokenExpiresAt,
            provider: 'GOOGLE',
            providerUserId: googleUserData.id,
            userId: newlyCreatedUser.id,
            refreshToken: refreshToken,
          },
        })

        return newlyCreatedUser.id
      } else {
        await transaction.oauthAccount.update({
          where: { id: oauthAccount.id },
          data: {
            accessToken: accessToken,
            expiresAt: accessTokenExpiresAt,
            refreshToken: refreshToken,
          },
        })

        return preExistingUser.id
      }
    })

    if (!userId) throw new Error()
    await createSessionSetCookies(userId)

    return Response.redirect(String(process.env.NEXT_PUBLIC_FRONTEND_URL), 302)
  } catch (e) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

type GoogleUserType = {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
}
