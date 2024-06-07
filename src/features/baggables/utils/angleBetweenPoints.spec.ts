import { angleBetweenPoints } from './angleBetweenPoints.util'

const HIGGER_TOR = {
  latitude: 53.33370602129923,
  longitude: -1.6170012427967155,
}
const MEERSBROOK_PARK = {
  latitude: 53.35396396127529,
  longitude: -1.4739756376796884,
}
const GLENFINNAN_CAR_PARK = {
  latitude: 56.87164170172275,
  longitude: -5.437985629942369,
}
const INVERIE_OLD_FORGE = {
  latitude: 57.037366200416606,
  longitude: -5.682714154441471,
}

describe('angleBetweenPoints.util', () => {
  it('Should return 0 for identical points', () => {
    expect(angleBetweenPoints(HIGGER_TOR, HIGGER_TOR)).toBe(0)
  })

  it('Should calculate the angle between Higger Tor and Meersbrook Park', () => {
    expect(angleBetweenPoints(MEERSBROOK_PARK, HIGGER_TOR)).toBe(257)
  })

  it('Should calculate the angle between Glenfinnan Car Park and the Old Forge pub in Inverie', () => {
    expect(angleBetweenPoints(GLENFINNAN_CAR_PARK, INVERIE_OLD_FORGE)).toBe(321)
  })
})
