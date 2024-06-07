import { WalkCardsResponseType } from '../walks.types'

import { formatWalkingTime } from './formatWalkingTime.util'

export const formatWalkCardsData = (walkCardsResponseData: WalkCardsResponseType) => {
  return walkCardsResponseData.walks.nodes.map((walk) => {
    const imageArray = walk.featuredImage.node.mediaDetails.sizes

    return {
      slug: walk.slug,
      title: walk.title,
      shortDescription: walk.walk_data.shortDescription,
      difficulty: walk.walk_data.difficulty,
      distance: walk.walk_data.distance,
      time: formatWalkingTime(walk.walk_data.time),
      featuredImage: {
        url: imageArray.filter((image) => image.name === 'featured-image-card')[0].sourceUrl,
        dataUrl: walk.featuredImage.node.dataUrl,
        alt: walk.featuredImage.node.altText,
      },
    }
  })
}
