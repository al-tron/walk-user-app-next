import { z } from 'zod'
import { gql } from 'graphql-request'

import { gqlClient } from '@/lib/gqlClient'

export const getSiteNameAndMetaDescription = async () => {
  const { generalSettings } = await gqlClient(siteTitleDescriptionQuery, SiteNameAndMetaDescriptionresponseSchema)

  return {
    siteName: generalSettings.title,
    metaDescription: generalSettings.description,
  }
}

const siteTitleDescriptionQuery = gql`
  query siteTitleDescription {
    generalSettings {
      title
      description
    }
  }
`

const SiteNameAndMetaDescriptionresponseSchema = z.object({
  generalSettings: z.object({
    title: z.string(),
    description: z.string(),
  }),
})
