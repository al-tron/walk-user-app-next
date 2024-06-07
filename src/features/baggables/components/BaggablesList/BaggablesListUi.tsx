import { BaggableCard } from '../BaggableCard/BaggableCard'

export const BaggablesListUi = ({ baggablesList, baggableTypeSlug, baggableTypeName }: BaggableListUiProps) => {
  return (
    <section className="relative grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <h3 className="sr-only">{`${baggableTypeName} list`}</h3>

      {baggablesList.map(({ name, slug, height, drop, distanceFromUser, bearingFromUser }) => (
        <BaggableCard
          name={name}
          height={height}
          drop={drop}
          distanceFromUser={distanceFromUser}
          bearingFromUser={bearingFromUser}
          baggableTypeSlug={baggableTypeSlug}
          baggableSlug={slug}
          key={`baggable-list-item-${slug}`}
        />
      ))}
    </section>
  )
}

type BaggableListUiProps = {
  baggablesList: BaggableListItem[]
  baggableTypeSlug: string
  baggableTypeName: string
}

type BaggableListItem = {
  name: string
  slug: string
  height: number
  drop: number
  latitude: number
  longitude: number
  distanceFromUser?: number
  bearingFromUser?: number
}
