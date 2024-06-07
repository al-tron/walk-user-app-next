import { gql } from 'graphql-request'

export const baggableTypesSlugsQuery = gql`
  query BaggableSlugs {
    baggableTypes {
      nodes {
        slug
      }
    }
  }
`

export const baggablesListBySlugQuery = gql`
  query Baggables($slug: ID!) {
    baggableType(id: $slug, idType: SLUG) {
      name
      slug
      description
      count
      baggable_type_taxonomy {
        pageTitle
        pageDescription
      }
      contentNodes(first: 508, where: { orderby: { field: HEIGHT, order: DESC } }) {
        nodes {
          ... on Baggable {
            slug
            title
            baggables {
              height
              drop
              latitude
              longitude
            }
          }
        }
      }
    }
  }
`
