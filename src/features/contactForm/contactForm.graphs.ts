import { gql } from 'graphql-request'

export const contactEmailQuery = gql`
  query contactEmail {
    adminEmail
  }
`
