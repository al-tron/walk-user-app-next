import { cardinalPointFromDegrees } from './cardinalPointFromDegrees.util'

describe('cardinalPointFromDegrees.util', () => {
  it('Should return "N" for 0 degrees', () => {
    expect(cardinalPointFromDegrees(0)).toBe('N')
  })

  it('Should return "NE" for 45 degrees', () => {
    expect(cardinalPointFromDegrees(45)).toBe('NE')
  })

  it('Should return "E" for 90 degrees', () => {
    expect(cardinalPointFromDegrees(90)).toBe('E')
  })

  it('Should return "SE" for 135 degrees', () => {
    expect(cardinalPointFromDegrees(135)).toBe('SE')
  })

  it('Should return "S" for 180 degrees', () => {
    expect(cardinalPointFromDegrees(180)).toBe('S')
  })

  it('Should return "SW" for 225 degrees', () => {
    expect(cardinalPointFromDegrees(225)).toBe('SW')
  })

  it('Should return "W" for 270 degrees', () => {
    expect(cardinalPointFromDegrees(270)).toBe('W')
  })

  it('Should return "NW" for 315 degrees', () => {
    expect(cardinalPointFromDegrees(315)).toBe('NW')
  })

  it('Should return "N" for 360 degrees', () => {
    expect(cardinalPointFromDegrees(360)).toBe('N')
  })

  it('Should return "N" for 720 degrees (720)', () => {
    expect(cardinalPointFromDegrees(720)).toBe('N')
  })

  it('Should return "NE" for 44.9 degrees', () => {
    expect(cardinalPointFromDegrees(44.9)).toBe('NE')
  })
})
