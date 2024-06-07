import { gql } from 'graphql-request'

export const baggableNavItemsQuery = gql`
  query baggableNavItems {
    baggableTypes {
      nodes {
        slug
        baggable_type_taxonomy {
          pageTitle
        }
      }
    }
  }
`
