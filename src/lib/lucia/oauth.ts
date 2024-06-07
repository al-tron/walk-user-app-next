import { Google } from 'arctic'

import { ApiRoutes } from '@/consts/routes'

export const google = new Google(
  String(process.env.GOOGLE_CLIENT_ID),
  String(process.env.GOOGLE_SECRET_ID),
  ApiRoutes.OAUTH_GOOGLE,
)
