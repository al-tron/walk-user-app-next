import { formatWalkPageData } from './formatWalkPageData.util'

const MOCK_INPUT_DATA = {
  walk: {
    slug: 'test-slug',
    title: 'Test Walk Title',
    date: '2022-12-06T22:26:33',
    modified: '2022-12-06T22:26:33',
    content: 'Test walk content',
    featuredImage: {
      node: {
        mediaDetails: {
          sizes: [
            {
              sourceUrl: 'test-image-url.webp',
              name: 'featured-image-banner',
            },
            {
              sourceUrl: 'test-social-image-url.webp',
              name: 'featured-image-og-social-card',
            },
            {
              sourceUrl: 'test-aspect-image-1x1-url.webp',
              name: 'featured-image-1x1',
            },
            {
              sourceUrl: 'test-aspect-image-4x3-url.webp',
              name: 'featured-image-4x3',
            },
            {
              sourceUrl: 'test-aspect-image-16x9-url.webp',
              name: 'featured-image-16x9',
            },
          ],
        },
        altText: 'Test featuredImage altText',
        dataUrl: 'base64-fake-string',
      },
    },
    walk_data: {
      shortDescription: 'Test shortDescription',
      longDescription: 'Test longDescription',
      maxAltitude: 123,
      minAltitude: 456,
      totalAscent: 789,
      distance: 12.34,
      time: '01:45',
      difficulty: 'Medium' as const,
      terrain: 'Moderate' as const,
      area: 'Surrounding Area' as const,
      distEleRoute: '[[11, 12], [13, 14], [15, 16]]',
      latLonRoute: '[[1, 2], [3, 4], [5, 6]]',
      startGridRef: 'SU 1234 5678',
      startLatitude: 1,
      startLongitude: 2,
      endGridRef: 'NT 4567 8910',
      endLatitude: 3,
      endLongitude: 4,
    },
  },
}

const EXPECTED_OUTPUT_DATA = {
  slug: 'test-slug',
  title: 'Test Walk Title',
  date: '2022-12-06T22:26:33',
  modified: '2022-12-06T22:26:33',
  content: 'Test walk content',
  featuredImage: {
    url: 'test-image-url.webp',
    dataUrl: 'base64-fake-string',
    alt: 'Test featuredImage altText',
  },
  featuredImageSizes: {
    aspect1x1Url: 'test-aspect-image-1x1-url.webp',
    aspect4x3Url: 'test-aspect-image-4x3-url.webp',
    aspect16x9Url: 'test-aspect-image-16x9-url.webp',
  },
  featuredSocialImageUrl: 'test-social-image-url.webp',
  shortDescription: 'Test shortDescription',
  longDescription: 'Test longDescription',
  altitudeData: {
    distanceElevation: [
      { distance: 11, elevation: 12 },
      { distance: 13, elevation: 14 },
      { distance: 15, elevation: 16 },
    ],
    maxAltitude: 123,
    minAltitude: 456,
    totalAscent: 789,
  },
  generalWalkStats: {
    distance: 12.34,
    time: '1 hour 45 mins',
    difficulty: 'Medium',
    terrain: 'Moderate',
    area: 'Surrounding Area',
  },
  walkRouteData: {
    routeGeoJson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [2, 1],
              [4, 3],
              [6, 5],
            ],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'start' },
          geometry: {
            type: 'Point',
            coordinates: [2, 1],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'end' },
          geometry: {
            type: 'Point',
            coordinates: [6, 5],
          },
        },
      ],
    },
    startGridRef: 'SU 1234 5678',
    startLatitude: 1,
    startLongitude: 2,
    endGridRef: 'NT 4567 8910',
    endLatitude: 3,
    endLongitude: 4,
  },
}

describe('formatWalkPageData.util', () => {
  it('Should return correct values and object structure for given input', () => {
    expect(formatWalkPageData(MOCK_INPUT_DATA)).toEqual(EXPECTED_OUTPUT_DATA)
  })
})
