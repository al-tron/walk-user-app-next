import { useState, useEffect } from 'react'

export const useLocation = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasGeoCapabilities, setHasGeoCapabilities] = useState(false)

  const handleSetLocation = ({ coords }: { coords: GeolocationCoordinates }) => {
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
  }

  const handleError = (error: GeolocationPositionError) => {
    setError(error.message)
  }

  useEffect(() => {
    const geo = navigator.geolocation

    if (!geo) {
      setError('This browser does not support geo location')
      return
    } else {
      setHasGeoCapabilities(true)
    }

    geo.getCurrentPosition(handleSetLocation, handleError)
  }, [])

  return { ...location, error, hasGeoCapabilities }
}
