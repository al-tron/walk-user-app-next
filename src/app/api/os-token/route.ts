import { OsTokenSchema } from '@/features/map/map.types'

import { restClient } from '@/lib/restClient'

export const GET = async () => {
  const encodedKeys = Buffer.from(`${process.env.OS_API_KEY}:${process.env.OS_API_SECRET}`).toString('base64')

  try {
    const data = await restClient('https://api.os.uk/oauth2/token/v1', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + encodedKeys,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
      cache: 'no-cache',
    })

    data.expires_in = Number(data.expires_in)
    data.issued_at = Number(data.issued_at)

    return Response.json(OsTokenSchema.parse(data))
  } catch {
    return Response.error()
  }
}
