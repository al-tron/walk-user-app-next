import { latLngArrayToGeoJson } from './latLngArrayToGeoJson.util'

describe('latLngArrayToGeoJson.util', () => {
  it('Should convert an array of lat/lng to GeoJSON with a LineString and a start and end point', () => {
    const output = latLngArrayToGeoJson([
      [1.234, 5.678],
      [2.345, 6.789],
      [3.456, 7.89],
    ])

    expect(output).toEqual({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [5.678, 1.234],
              [6.789, 2.345],
              [7.89, 3.456],
            ],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'start' },
          geometry: {
            type: 'Point',
            coordinates: [5.678, 1.234],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'end' },
          geometry: {
            type: 'Point',
            coordinates: [7.89, 3.456],
          },
        },
      ],
    })
  })
})
