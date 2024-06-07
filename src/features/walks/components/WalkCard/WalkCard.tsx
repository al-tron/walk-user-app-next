'use client'

import Image from 'next/image'

import { PageRoutes } from '@/consts/routes'
import { WalkCardFormattedDataType } from '../../walks.types'

import { useValueUnits } from '@/hooks/useValueUnits.hook'

import { Title } from '@/components/Title/Title'
import { CardWrapper } from '@/components/CardWrapper/CardWrapper'

export const WalkCard = ({
  slug,
  title,
  shortDescription,
  featuredImage,
  difficulty,
  distance,
  time,
}: WalkCardFormattedDataType) => {
  const {
    value: distanceValue,
    units: distanceUnits,
    unitFullname: distanceUnitFullname,
  } = useValueUnits(distance, 'km')

  return (
    <CardWrapper
      as="article"
      href={PageRoutes.WALK_DETAILS.replace('[slug]', slug)}
      variants={{ bgBehindCard: 'dark' }}
      className="flex max-w-[18rem] shrink-0 snap-start scroll-mx-6 first:ml-[0.75rem] last:mr-[0.75rem] xxs:max-w-xs xxs:first:ml-4 xxs:last:mr-4 xs:max-w-[23rem] xs:first:ml-4 xs:last:mr-4 sm:max-w-[25rem] md:first:ml-5 md:last:mr-5"
    >
      <>
        <div className="relative overflow-clip rounded-t-3xl">
          <Image
            className="relative block dark:brightness-90"
            src={featuredImage.url}
            alt={featuredImage.alt}
            placeholder="blur"
            blurDataURL={featuredImage.dataUrl}
            width={448}
            height={299}
          />

          <ul className="absolute bottom-0 z-10 flex w-full items-center pb-1 text-xs font-bold text-gray-200 dark:text-slate-300 xxs:pb-1.5 xxs:text-sm">
            <li className="w-fit flex-1 whitespace-nowrap px-2 text-center">
              {distanceValue}{' '}
              <abbr title={distanceUnitFullname} className="text-xs">
                {distanceUnits}
              </abbr>
            </li>

            <li className="w-fit flex-1 whitespace-nowrap border-x border-gray-400 px-2 text-center dark:border-slate-400">
              {time}
            </li>

            <li className="w-fit flex-1 whitespace-nowrap px-2 text-center">{difficulty}</li>
          </ul>

          <div className="absolute bottom-0 z-0 block h-16 w-full bg-gradient-to-t from-black/60 to-black/0"></div>
        </div>

        <div className="flex flex-grow flex-col rounded-b-3xl px-2 pb-2.5 pt-2 xxs:px-2.5 xxs:pb-3 xxs:pt-2">
          <Title level={3} style="xs" align="left" lightBg>
            {title}
          </Title>

          <p className="pt-2 text-sm xs:text-base sm:text-sm">{shortDescription}</p>
        </div>
      </>
    </CardWrapper>
  )
}
