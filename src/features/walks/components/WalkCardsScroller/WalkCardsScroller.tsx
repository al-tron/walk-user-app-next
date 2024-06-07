import { notFound } from 'next/navigation'

import { WalkCardsFormattedArraySchema, WalkCardsResponseSchema } from '../../walks.types'

import { gqlClient } from '@/lib/gqlClient'

import { walkCardsDataQuery } from '../../walks.graphs'
import { formatWalkCardsData } from '../../utils/formatWalkCardsData.util'

import { WalkCard } from '../WalkCard/WalkCard'

export const WalkCardsScroller = async () => {
  const initialWalks = await getInitialWalks()

  return (
    <div className="c-hide-scroll c-hide-scroll-webkit relative -mb-24 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-14 pt-3 xs:gap-3 sm:pt-4 md:pb-20">
      {initialWalks.map(({ slug, title, shortDescription, difficulty, distance, time, featuredImage }) => (
        <WalkCard
          slug={slug}
          title={title}
          shortDescription={shortDescription}
          difficulty={difficulty}
          distance={distance}
          time={time}
          featuredImage={featuredImage}
          key={`walk-card-${slug}`}
        />
      ))}
    </div>
  )
}

const getInitialWalks = async () => {
  try {
    const data = await gqlClient(walkCardsDataQuery, WalkCardsResponseSchema, {
      count: 5,
    })

    return WalkCardsFormattedArraySchema.parse(formatWalkCardsData(data))
  } catch {
    notFound()
  }
}
