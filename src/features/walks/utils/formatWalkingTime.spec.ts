import { formatWalkingTime } from './formatWalkingTime.util'

describe('formatWalkingTime.util', () => {
  it('Should format time with only minutes correctly', () => {
    const result = formatWalkingTime('00:30')
    expect(result).toBe('30 mins')
  })

  it('Should format time with 1 hour correctly', () => {
    const result = formatWalkingTime('01:00')
    expect(result).toBe('1 hour')
  })

  it('Should format time with multiple hours correctly', () => {
    const result = formatWalkingTime('02:00')
    expect(result).toBe('2 hours')
  })

  it('Should format time with 1 hour and minutes correctly', () => {
    const result = formatWalkingTime('01:30')
    expect(result).toBe('1 hour 30 mins')
  })

  it('Should format time with multiple hours and minutes correctly', () => {
    const result = formatWalkingTime('02:30')
    expect(result).toBe('2 hours 30 mins')
  })

  it('Should return original time for invalid input', () => {
    const result = formatWalkingTime('00:00')
    expect(result).toBe('00:00')
  })
})
