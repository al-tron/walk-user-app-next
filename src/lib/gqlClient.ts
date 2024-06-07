import { GraphQLClient, Variables } from 'graphql-request'
import { ZodSchema, z } from 'zod'

const CONTENT_SERVICE_API = String(process.env.CONTENT_SERVICE_API)
const graphQlClient = new GraphQLClient(CONTENT_SERVICE_API)

export const gqlClient = async <TSchema extends ZodSchema>(query: string, schema: TSchema, variables?: Variables) => {
  type ResponseType = z.infer<typeof schema>

  const response = await graphQlClient.request<ResponseType>(query, variables)
  const validatedResponse = schema.parse(response) as ResponseType

  return validatedResponse
}
