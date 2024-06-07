const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL

export const PageRoutes = {
  HOME: `${FRONTEND_URL}/`,
  CONTACT: `${FRONTEND_URL}/contact`,
  PRIVACY: `${FRONTEND_URL}/privacy-policy`,
  TERMS: `${FRONTEND_URL}/terms-of-use`,
  USER_ACCOUNT: `${FRONTEND_URL}/account`,
  LOGIN: `${FRONTEND_URL}/login`,
  WALK_DETAILS: `${FRONTEND_URL}/walks/[slug]`,
  BAGGABLES_LIST: `${FRONTEND_URL}/[baggableTypeSlug]`,
  BAGGABLE_DETAILS: `${FRONTEND_URL}/[baggableTypeSlug]/[baggableSlug]`,
} as const

export const ApiRoutes = {
  USER_DATA: `${FRONTEND_URL}/api/user`,
  OS_TOKEN: `${FRONTEND_URL}/api/os-token`,
  OAUTH_GOOGLE: `${FRONTEND_URL}/api/oauth/google`,
} as const
