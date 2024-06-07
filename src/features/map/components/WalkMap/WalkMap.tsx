'use client'

import { useRef, useEffect, useState } from 'react'

import Map from 'ol/Map'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import WMTS from 'ol/source/WMTS'
import TileLayer from 'ol/layer/Tile'
import ImageTile from 'ol/ImageTile'
import View from 'ol/View'
import { Options } from 'ol/source/WMTS'
import DragPan from 'ol/interaction/DragPan'
import MapBrowserEvent from 'ol/MapBrowserEvent'
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom'
import { defaults } from 'ol/interaction/defaults'
import { touchOnly, platformModifierKeyOnly } from 'ol/events/condition'
import GeoJSON from 'ol/format/GeoJSON'
import { useGeographic } from 'ol/proj'
import { register } from 'ol/proj/proj4'
import { Feature } from 'ol'
import proj4 from 'proj4'

import Skeleton from 'react-loading-skeleton'
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'
import MinusIcon from '@heroicons/react/24/outline/MinusIcon'
import ArrowsPointingOutIcon from '@heroicons/react/24/outline/ArrowsPointingOutIcon'
import ArrowsPointingInIcon from '@heroicons/react/24/outline/ArrowsPointingInIcon'

import { ApiRoutes } from '@/consts/routes'
import { GeoJsonType } from '@/types/types'
import { OsTokenType } from '../../map.types'

import { restClient } from '@/lib/restClient'
import { DARK_THEME, useDarkModeContext } from '@/context/useDarkMode.context'
import { isOsTokenExpired } from '../../utils/isOsTokenExpired.util'
import { getCapabilitiesAsOptions } from '../../utils/getCapabilitiesAsOptions.util'
import { getTileWithAuthHeader } from '../../utils/getTileWithAuthHeader.util'
import { styleFromFeatureType } from '../../utils/styleFromFeatureType.util'
import { handleMapControlClick } from '../../utils/handleMapControlClick.util'

import { Button } from '@/components/Button/Button'
import { ErrorPlaceholder } from '@/components/ErrorPlaceholder/ErrorPlaceholder'

import '/node_modules/ol/ol.css'
import 'react-loading-skeleton/dist/skeleton.css'

proj4.defs(
  'EPSG:27700',
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs',
)
register(proj4)

export const WalkMap = ({ routeGeoJson }: { routeGeoJson: GeoJsonType }) => {
  const mapAndControlsContainer = useRef<HTMLDivElement>(null)
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<Map | undefined>(undefined)

  const [initialAccessToken, setInitialAccessToken] = useState<string | null>(null)
  const [tileSourceOptions, setTileSourceOptions] = useState<Options | null>(null)

  const [osTokenData, setOsTokenData] = useState<OsTokenType | null>(null)
  const [mutateOsToken, setMutateOsToken] = useState(false)
  const [osTokenHasError, setOsTokenHasError] = useState(false)
  const [isMapReady, setIsMapReady] = useState(false)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapHasError, setMapHasError] = useState(false)

  const [isFullscreenState, setIsFullscreenState] = useState(false)
  const isFullscreenRef = useRef(false)

  useGeographic()

  const darkModeContext = useDarkModeContext()
  const isDarkMode = darkModeContext?.displayedTheme === DARK_THEME

  useEffect(() => {
    const getOsToken = async () => {
      try {
        const tokenData: OsTokenType = await restClient(ApiRoutes.OS_TOKEN)
        setOsTokenData(tokenData)
      } catch {
        setOsTokenHasError(true)
      }
    }

    getOsToken()
  }, [mutateOsToken])

  useEffect(() => {
    if (osTokenData && !initialAccessToken) {
      setInitialAccessToken(osTokenData.access_token)
    }
  }, [osTokenData, initialAccessToken])

  useEffect(() => {
    const getTileSourceOptions = async () => {
      try {
        if (!initialAccessToken) return

        const options = await getCapabilitiesAsOptions(initialAccessToken)
        setTileSourceOptions(options)
      } catch {
        setMapHasError(true)
      }
    }

    getTileSourceOptions()
  }, [initialAccessToken])

  useEffect(() => {
    if (!mapContainer.current || !tileSourceOptions) return

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(routeGeoJson) as Feature[],
    })

    const mapView = new View({
      projection: 'EPSG:27700',
      extent: JSON.parse(process.env.NEXT_PUBLIC_MAP_EXTENT!),
      resolutions: tileSourceOptions.tileGrid.getResolutions(),
      enableRotation: false,
      constrainResolution: true,
    })

    map.current = new Map({
      target: mapContainer.current,
      controls: [],
      view: mapView,
      layers: [
        new VectorLayer({
          source: vectorSource,
          style: styleFromFeatureType,
          renderBuffer: 1200,
          zIndex: 10,
        }),
      ],
      interactions: defaults({
        dragPan: false,
        mouseWheelZoom: false,
        onFocusOnly: true,
      }).extend([
        new DragPan({
          condition: function (event: MapBrowserEvent<MouseEvent | TouchEvent>) {
            return (
              ((this as DragPan).getPointerCount() === 2 && touchOnly(event)) ||
              ((this as DragPan).getPointerCount() === 1 && !touchOnly(event)) ||
              ((this as DragPan).getPointerCount() === 1 && touchOnly(event) && isFullscreenRef.current)
            )
          },
        }),
        new MouseWheelZoom({
          condition: (event) => platformModifierKeyOnly(event) || isFullscreenRef.current,
        }),
      ]),
    })

    mapView.fit(vectorSource.getExtent(), { padding: [16, 32, 16, 32] })
    mapView.setConstrainResolution(false)

    map.current.once('precompose', () => setIsMapReady(true))
    map.current.once('rendercomplete', () => setIsMapLoaded(true))

    return () => {
      map.current?.setTarget(undefined)
      setIsMapLoaded(false)
    }
  }, [routeGeoJson, tileSourceOptions])

  useEffect(() => {
    if (!isMapReady || !map.current || !tileSourceOptions || !osTokenData) return

    const tileLayerSource = new WMTS({
      ...tileSourceOptions!,
      tileLoadFunction: (tile, src) => getTileWithAuthHeader(tile as ImageTile, src, osTokenData.access_token),
    })

    const tileLayer = new TileLayer({
      source: tileLayerSource,
      zIndex: 5,
    })

    const mapMoveEvent = async () => {
      if (isOsTokenExpired(osTokenData)) {
        tileLayer.dispose()
        setMutateOsToken(!mutateOsToken)
      }
    }

    map.current.on('movestart', mapMoveEvent)

    map.current.addLayer(tileLayer)

    return () => {
      tileLayer.dispose()
      map.current?.un('movestart', mapMoveEvent)
    }
  }, [isMapReady, tileSourceOptions, osTokenData, mutateOsToken])

  useEffect(() => {
    const handleFullscreenChangeEvent = () => {
      if (mapAndControlsContainer.current === document.fullscreenElement) {
        isFullscreenRef.current = true
        setIsFullscreenState(true)
      } else {
        isFullscreenRef.current = false
        setIsFullscreenState(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChangeEvent)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChangeEvent)
  }, [])

  const isMapInteractive = isMapLoaded && !osTokenHasError

  return (
    <div
      ref={mapAndControlsContainer}
      className="relative z-0 -mx-4 aspect-[0.75] xs2:aspect-[1.25] sm:aspect-[1.66] lg:mx-0 lg:h-full lg:w-full"
    >
      {osTokenHasError || mapHasError ? (
        <ErrorPlaceholder name="map" className="h-full w-full" />
      ) : (
        <>
          {(!osTokenData || !isMapLoaded) && (
            <Skeleton
              baseColor={isDarkMode ? '#334155' : '#e5e7eb'}
              highlightColor={isDarkMode ? '#475569' : '#f9fafb'}
              className="!absolute left-0 top-0 !z-10 h-full w-full"
              duration={1}
              borderRadius={0}
              inline
            />
          )}

          <div
            ref={mapContainer}
            className="c-animation-medium z-0 block h-full w-full bg-loadingBaseColor focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-brand-lightest/70 dark:bg-slate-700 dark:brightness-90"
            tabIndex={isMapInteractive ? 0 : -1}
          />
        </>
      )}

      <div className="absolute left-0 top-0 z-20 ml-2 mt-2 flex flex-col">
        <Button
          variants={{ form: 'fixedSquare' }}
          onClick={() => handleMapControlClick({ action: 'Zoom In', map: map.current })}
          className="mb-1.5"
          disabled={!isMapInteractive}
        >
          <>
            <PlusIcon className="h-8 w-8" />
            <span className="sr-only">Zoom in</span>
          </>
        </Button>

        <Button
          variants={{ form: 'fixedSquare' }}
          onClick={() => handleMapControlClick({ action: 'Zoom Out', map: map.current })}
          className="mb-1.5"
          disabled={!isMapInteractive}
        >
          <>
            <MinusIcon className="h-8 w-8" />
            <span className="sr-only">Zoom out</span>
          </>
        </Button>

        <Button
          variants={{ form: 'fixedSquare' }}
          onClick={() =>
            handleMapControlClick({
              action: 'Fullscreen',
              mapAndControlsContainer: mapAndControlsContainer.current!,
              isMapFullscreen: isFullscreenState,
            })
          }
          disabled={!isMapInteractive}
        >
          <>
            {isFullscreenState ? (
              <ArrowsPointingInIcon className="h-7 w-7" />
            ) : (
              <ArrowsPointingOutIcon className="h-7 w-7" />
            )}

            <span className="sr-only">Toggle fullscreen</span>
          </>
        </Button>
      </div>
    </div>
  )
}
