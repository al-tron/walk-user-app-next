export const latLngArrayToGeoJson = (latLngArray: [number, number][]) => ({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: latLngArray.map((latLng) => latLng.reverse()),
      },
    },
    {
      type: 'Feature',
      properties: { name: 'start' },
      geometry: {
        type: 'Point',
        coordinates: latLngArray[0],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'end' },
      geometry: {
        type: 'Point',
        coordinates: latLngArray[latLngArray.length - 1],
      },
    },
  ],
})
