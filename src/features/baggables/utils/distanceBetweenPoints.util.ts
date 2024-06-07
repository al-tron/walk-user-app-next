import { LatLonPoint } from '../baggables.types'

import { radiansFromDegrees } from './radiansAndDegreesConverter.util'

const EARTHS_RADIUS = 6371

export const distanceBetweenPoints = (pointOne: LatLonPoint, pointTwo: LatLonPoint) => {
  const degreeLat = radiansFromDegrees(pointTwo.latitude - pointOne.latitude)
  const degreeLon = radiansFromDegrees(pointTwo.longitude - pointOne.longitude)

  var a =
    Math.sin(degreeLat / 2) * Math.sin(degreeLat / 2) +
    Math.cos(radiansFromDegrees(pointOne.latitude)) *
      Math.cos(radiansFromDegrees(pointTwo.latitude)) *
      Math.sin(degreeLon / 2) *
      Math.sin(degreeLon / 2)

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = EARTHS_RADIUS * c

  return parseFloat(distance.toFixed(2))
}
