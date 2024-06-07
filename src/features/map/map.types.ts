import { z } from 'zod'

export const OsTokenSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  issued_at: z.number(),
  token_type: z.string(),
})

export type OsTokenType = z.infer<typeof OsTokenSchema>
