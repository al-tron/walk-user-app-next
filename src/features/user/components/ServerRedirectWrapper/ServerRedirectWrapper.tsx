import { ReactElement } from 'react'

import { redirect } from 'next/navigation'

import { PageRoutes } from '@/consts/routes'

import { validateRequest } from '@/lib/auth'

/**
 * This server component is a simple wrapper designed for use inside the account and login pages so that the title
 * banner of each of those pages can be pre-rendered rather than the whole route being dynamic. This is known as
 * partial prerendering, the objective of this is to speed up the response time of a route change when a user clicks on
 * a link to a route that uses dynamic functions such as `cookies()` or `headers()` from `next/headers`.
 */
export const ServerRedirectWrapper = async ({ children, wrapperFor }: RedirectWrapperProps) => {
  const { session } = await validateRequest()

  if (wrapperFor === 'account' && !session) {
    return redirect(PageRoutes.LOGIN)
  }

  if (wrapperFor === 'login' && session) {
    return redirect(PageRoutes.USER_ACCOUNT)
  }

  return children
}

type RedirectWrapperProps = {
  children: ReactElement
  wrapperFor: 'login' | 'account'
}
