import { LatLonPoint } from '../baggables.types'

import { radiansFromDegrees, degreesFromRadians } from './radiansAndDegreesConverter.util'

export const angleBetweenPoints = (pointOne: LatLonPoint, pointTwo: LatLonPoint) => {
  const startLat = radiansFromDegrees(pointOne.latitude)
  const startLng = radiansFromDegrees(pointOne.longitude)
  const destLat = radiansFromDegrees(pointTwo.latitude)
  const destLng = radiansFromDegrees(pointTwo.longitude)

  const y = Math.sin(destLng - startLng) * Math.cos(destLat)
  const x =
    Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng)

  const brng = degreesFromRadians(Math.atan2(y, x))

  return Math.round((brng + 360) % 360)
}
