import { radiansFromDegrees, degreesFromRadians } from './radiansAndDegreesConverter.util'

describe('radiansFromDegrees', () => {
  it('Should convert 0 degrees to 0 radians', () => {
    expect(radiansFromDegrees(0)).toBe(0)
  })

  it('Should convert 90 degrees to π/2 radians', () => {
    expect(radiansFromDegrees(90)).toBe(Math.PI / 2)
  })

  it('Should convert 180 degrees to π radians', () => {
    expect(radiansFromDegrees(180)).toBe(Math.PI)
  })

  it('Should convert 360 degrees to 2π radians', () => {
    expect(radiansFromDegrees(360)).toBe(2 * Math.PI)
  })

  it('Should convert negative degrees to negative radians', () => {
    expect(radiansFromDegrees(-45)).toBe(-Math.PI / 4)
  })
})

describe('degreesFromRadians', () => {
  it('Should convert 0 radians to 0 degrees', () => {
    expect(degreesFromRadians(0)).toBe(0)
  })

  it('Should convert π/2 radians to 90 degrees', () => {
    expect(degreesFromRadians(Math.PI / 2)).toBe(90)
  })

  it('Should convert π radians to 180 degrees', () => {
    expect(degreesFromRadians(Math.PI)).toBe(180)
  })

  it('Should convert 2π radians to 360 degrees', () => {
    expect(degreesFromRadians(2 * Math.PI)).toBe(360)
  })

  it('Should convert negative radians to negative degrees', () => {
    expect(degreesFromRadians(-Math.PI / 4)).toBe(-45)
  })
})
