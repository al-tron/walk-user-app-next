import z from 'zod'

export const restClient = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options)
  if (!res.ok) throw new Error('Error whilst fetching data')

  const contentType = ValidContentTypeSchema.parse(res.headers.get('content-type'))

  if (contentType === 'application/json' || contentType === 'application/json; charset=UTF-8') {
    return await res.json()
  }

  if (contentType === 'application/xml') {
    return await res.text()
  }

  return res
}

const ValidContentTypeSchema = z.enum([
  'application/json',
  'application/json; charset=UTF-8',
  'application/xml',
  'image/png',
])
