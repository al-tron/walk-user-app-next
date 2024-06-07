import { validateRequest } from '@/lib/auth'

export const GET = async () => {
  try {
    const { user } = await validateRequest()

    return Response.json({ data: user }, { status: 200 })
  } catch {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
