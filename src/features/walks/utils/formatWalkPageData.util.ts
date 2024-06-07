import { WalkPageResponseType } from '../walks.types'

import { formatWalkingTime } from './formatWalkingTime.util'
import { latLngArrayToGeoJson } from './latLngArrayToGeoJson.util'

export const formatWalkPageData = (walkPageResponseData: WalkPageResponseType) => {
  const { walk } = walkPageResponseData

  const imageArray = walk.featuredImage.node.mediaDetails.sizes

  return {
    slug: walk.slug,
    title: walk.title,
    date: walk.date,
    modified: walk.modified,
    content: walk.content,
    featuredImage: {
      url: imageArray.filter((image) => image.name === 'featured-image-banner')[0].sourceUrl,
      dataUrl: walk.featuredImage.node.dataUrl,
      alt: walk.featuredImage.node.altText,
    },
    featuredImageSizes: {
      aspect1x1Url: imageArray.filter((image) => image.name === 'featured-image-1x1')[0].sourceUrl,
      aspect4x3Url: imageArray.filter((image) => image.name === 'featured-image-4x3')[0].sourceUrl,
      aspect16x9Url: imageArray.filter((image) => image.name === 'featured-image-16x9')[0].sourceUrl,
    },
    featuredSocialImageUrl: imageArray.filter((image) => image.name === 'featured-image-og-social-card')[0].sourceUrl,
    shortDescription: walk.walk_data.shortDescription,
    longDescription: walk.walk_data.longDescription,
    altitudeData: {
      distanceElevation: (JSON.parse(walk.walk_data.distEleRoute) as [number, number][]).map((data) => ({
        distance: data[0],
        elevation: data[1],
      })),
      maxAltitude: walk.walk_data.maxAltitude,
      minAltitude: walk.walk_data.minAltitude,
      totalAscent: walk.walk_data.totalAscent,
    },
    generalWalkStats: {
      distance: walk.walk_data.distance,
      time: formatWalkingTime(walk.walk_data.time),
      difficulty: walk.walk_data.difficulty,
      terrain: walk.walk_data.terrain,
      area: walk.walk_data.area,
    },
    walkRouteData: {
      routeGeoJson: latLngArrayToGeoJson(JSON.parse(walk.walk_data.latLonRoute)),
      startGridRef: walk.walk_data.startGridRef,
      startLatitude: walk.walk_data.startLatitude,
      startLongitude: walk.walk_data.startLongitude,
      endGridRef: walk.walk_data.endGridRef,
      endLatitude: walk.walk_data.endLatitude,
      endLongitude: walk.walk_data.endLongitude,
    },
  }
}
