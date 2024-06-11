import { validateRequest } from '@/lib/auth'

export const GET = async () => {
  try {
    const { user, dbError } = await validateRequest()

    if (dbError) throw new Error()

    return Response.json({ data: user }, { status: 200 })
  } catch {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
