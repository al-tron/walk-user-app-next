import Map from 'ol/Map'

const ANIMATION_DURATION = 250

export const handleMapControlClick = ({
  action,
  map,
  mapAndControlsContainer,
  isMapFullscreen,
}: handleMapControlClickParams) => {
  switch (action) {
    case 'Zoom In':
      map?.getView().animate({
        zoom: map.getView().getZoom()! + 1,
        duration: ANIMATION_DURATION,
      })
      break

    case 'Zoom Out':
      map?.getView().animate({
        zoom: map.getView().getZoom()! - 1,
        duration: ANIMATION_DURATION,
      })
      break

    case 'Fullscreen':
      isMapFullscreen ? document.exitFullscreen() : mapAndControlsContainer?.requestFullscreen()
  }
}

type Actions = 'Zoom In' | 'Zoom Out' | 'Fullscreen'

type ZoomControlParams = {
  action: Actions
  map: Map | undefined
  mapAndControlsContainer?: never
  isMapFullscreen?: never
}

type FullscreenControlParams = {
  action: Actions
  map?: never
  mapAndControlsContainer: HTMLDivElement
  isMapFullscreen: boolean
}

type handleMapControlClickParams = ZoomControlParams | FullscreenControlParams
