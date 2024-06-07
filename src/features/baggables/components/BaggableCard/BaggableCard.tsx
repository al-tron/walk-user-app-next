'use client'

import ArrowUpCircleIcon from '@heroicons/react/24/outline/ArrowUpCircleIcon'

import { useValueUnits } from '@/hooks/useValueUnits.hook'
import { cardinalPointFromDegrees } from '../../utils/cardinalPointFromDegrees.util'

import { Title } from '@/components/Title/Title'
import { CardWrapper } from '@/components/CardWrapper/CardWrapper'
import { PageRoutes } from '@/consts/routes'

export const BaggableCard = ({
  name,
  height,
  drop,
  distanceFromUser,
  bearingFromUser,
  baggableTypeSlug,
  baggableSlug,
}: BaggableCardProps) => {
  const { value: heightValue, units: heightUnits, unitFullname: heightUnitFullname } = useValueUnits(height, 'm')
  const { value: dropValue, units: dropUnits, unitFullname: dropUnitFullname } = useValueUnits(drop, 'm')
  const {
    value: distanceFromUserValue,
    units: distanceFromUserUnits,
    unitFullname: distanceUnitFullname,
  } = useValueUnits(distanceFromUser || 0, 'km')

  const baggableDetailsLink = PageRoutes.BAGGABLE_DETAILS.replace('[baggableTypeSlug]', baggableTypeSlug).replace(
    '[baggableSlug]',
    baggableSlug,
  )

  return (
    <CardWrapper as="article" href={baggableDetailsLink}>
      <div className="px-2 pb-2.5 pt-2 xxs:px-2.5 xxs:pb-3 xxs:pt-2">
        <Title level={3} style="xs" align="left" lightBg>
          {name}
        </Title>

        <div className="text-sm">
          {`Height: ${heightValue}`}{' '}
          <abbr title={heightUnitFullname} className="text-xs">
            {heightUnits}
          </abbr>
        </div>

        <div className="text-sm">
          {`Drop: ${dropValue}`}{' '}
          <abbr title={dropUnitFullname} className="text-xs">
            {dropUnits}
          </abbr>
        </div>

        {distanceFromUser && bearingFromUser && (
          <div className="text-sm">
            <span>
              {`Distance: ${distanceFromUserValue}`}{' '}
              <abbr title={distanceUnitFullname} className="text-xs">
                {distanceFromUserUnits}
              </abbr>
            </span>

            <span className="inline-flex items-center text-sm">
              &nbsp; | &nbsp;
              <ArrowUpCircleIcon
                className="inline h-5 w-5"
                style={{ transform: `rotate(${bearingFromUser}deg)` }}
                aria-hidden="true"
              />
              &nbsp;
              {`${bearingFromUser}° ${cardinalPointFromDegrees(bearingFromUser)}`}
            </span>
          </div>
        )}
      </div>
    </CardWrapper>
  )
}

type BaggableCardProps = {
  name: string
  height: number
  drop: number
  distanceFromUser?: number
  bearingFromUser?: number
  baggableTypeSlug: string
  baggableSlug: string
}
