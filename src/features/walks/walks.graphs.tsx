import { gql } from 'graphql-request'

export const walkDataBySlugQuery = gql`
  query Walk($slug: ID!) {
    walk(id: $slug, idType: SLUG) {
      slug
      title
      date
      modified
      content(format: RENDERED)
      featuredImage {
        node {
          mediaDetails {
            sizes(
              include: [
                FEATURED_IMAGE_BANNER
                FEATURED_IMAGE_OG_SOCIAL_CARD
                FEATURED_IMAGE_1X1
                FEATURED_IMAGE_4X3
                FEATURED_IMAGE_16X9
              ]
            ) {
              sourceUrl
              name
            }
          }
          altText
          dataUrl
        }
      }
      walk_data {
        shortDescription
        longDescription
        maxAltitude
        minAltitude
        totalAscent
        distance
        time
        difficulty
        terrain
        area
        distEleRoute
        latLonRoute
        startGridRef
        startLatitude
        startLongitude
        endGridRef
        endLatitude
        endLongitude
      }
    }
  }
`

export const walkSlugsQuery = gql`
  query WalkSlugs {
    walks {
      nodes {
        slug
      }
    }
  }
`
export const walkCardsDataQuery = gql`
  query WalkCards($count: Int) {
    walks(first: $count, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
        title
        walk_data {
          difficulty
          distance
          time
          shortDescription
        }
        featuredImage {
          node {
            mediaDetails {
              sizes(include: [FEATURED_IMAGE_CARD]) {
                sourceUrl
                name
              }
            }
            altText
            dataUrl
          }
        }
      }
    }
  }
`
