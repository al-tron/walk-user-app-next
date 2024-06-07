import { formatWalkCardsData } from './formatWalkCardsData.util'

const MOCK_INPUT_DATA = {
  walks: {
    nodes: [
      {
        slug: 'test-slug',
        title: 'Test Walk Title 1',
        walk_data: {
          difficulty: 'Easy 1',
          distance: 12.34,
          time: '01:45',
          shortDescription: 'Test shortDescription 1',
        },
        featuredImage: {
          node: {
            mediaDetails: {
              sizes: [
                {
                  sourceUrl: '1-test-image-url.webp',
                  name: 'featured-image-card',
                },
              ],
            },
            altText: 'Test featuredImage altText 1',
            dataUrl: 'base64-fake-string',
          },
        },
      },
      {
        slug: 'another-test-slug',
        title: 'Test Walk Title 2',
        walk_data: {
          difficulty: 'Easy 2',
          distance: 56.78,
          time: '04:15',
          shortDescription: 'Test shortDescription 2',
        },
        featuredImage: {
          node: {
            mediaDetails: {
              sizes: [
                {
                  sourceUrl: '2-test-image-url.webp',
                  name: 'featured-image-card',
                },
              ],
            },
            altText: 'Test featuredImage altText 2',
            dataUrl: 'base64-fake-string',
          },
        },
      },
    ],
  },
}

const EXPECTED_OUTPUT_DATA = [
  {
    slug: 'test-slug',
    title: 'Test Walk Title 1',
    shortDescription: 'Test shortDescription 1',
    difficulty: 'Easy 1',
    distance: 12.34,
    time: '1 hour 45 mins',
    featuredImage: {
      url: '1-test-image-url.webp',
      dataUrl: 'base64-fake-string',
      alt: 'Test featuredImage altText 1',
    },
  },
  {
    slug: 'another-test-slug',
    title: 'Test Walk Title 2',
    shortDescription: 'Test shortDescription 2',
    difficulty: 'Easy 2',
    distance: 56.78,
    time: '4 hours 15 mins',
    featuredImage: {
      url: '2-test-image-url.webp',
      dataUrl: 'base64-fake-string',
      alt: 'Test featuredImage altText 2',
    },
  },
]

describe('formatWalkCardsData.util', () => {
  it('Should return correct values and array/object shape for given input', () => {
    expect(formatWalkCardsData(MOCK_INPUT_DATA)).toEqual(EXPECTED_OUTPUT_DATA)
  })
})
