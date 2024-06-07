import { digitalWatchTimeFormatMatcher, formattedWalkingTimeMatcher, osGridRefMatcher, urlSlugMatcher } from './regex'

describe('digitalWatchTimeFormatMatcher', () => {
  it('Should match valid digital watch times', () => {
    expect(digitalWatchTimeFormatMatcher.test('01:15'))
    expect(digitalWatchTimeFormatMatcher.test('15:45'))
    expect(digitalWatchTimeFormatMatcher.test('23:00'))
    expect(digitalWatchTimeFormatMatcher.test('36:45'))
    expect(digitalWatchTimeFormatMatcher.test('00:30'))
  })

  it('Should not match invalid digital watch times', () => {
    expect(digitalWatchTimeFormatMatcher.test('37:15'))
    expect(digitalWatchTimeFormatMatcher.test('01:20'))
    expect(digitalWatchTimeFormatMatcher.test('1:15'))
    expect(digitalWatchTimeFormatMatcher.test('001:15'))
    expect(digitalWatchTimeFormatMatcher.test('15:12'))
  })
})

describe('formattedWalkingTimeMatcher', () => {
  it('Should match valid formatted walking times', () => {
    expect(formattedWalkingTimeMatcher.test('01:15'))
    expect(formattedWalkingTimeMatcher.test('15:45'))
    expect(formattedWalkingTimeMatcher.test('23:30'))
    expect(formattedWalkingTimeMatcher.test('00:00'))
    expect(formattedWalkingTimeMatcher.test('36:15'))
  })

  it('Should not match invalid formatted walking times', () => {
    expect(formattedWalkingTimeMatcher.test('37:15'))
    expect(formattedWalkingTimeMatcher.test('01:60'))
    expect(formattedWalkingTimeMatcher.test('15:20'))
    expect(formattedWalkingTimeMatcher.test('001:15'))
  })
})

describe('osGridRefMatcher', () => {
  it('Should match valid OS grid references', () => {
    expect(osGridRefMatcher.test('SU 1234 5678')).toBe(true)
    expect(osGridRefMatcher.test('SU1234 5678')).toBe(true)
    expect(osGridRefMatcher.test('NT4567 8910')).toBe(true)
    expect(osGridRefMatcher.test('st1234 5678')).toBe(true)
    expect(osGridRefMatcher.test('st12345678')).toBe(true)
  })

  it('Should not match invalid OS grid references', () => {
    expect(osGridRefMatcher.test('SU 123 456 789')).toBe(false)
    expect(osGridRefMatcher.test('NT 456 789 012')).toBe(false)
    expect(osGridRefMatcher.test('st12 34 56 78')).toBe(false)
    expect(osGridRefMatcher.test('SU1234')).toBe(false)
    expect(osGridRefMatcher.test('SU1234567890')).toBe(false)
  })
})

describe('urlSlugMatcher', () => {
  it('Should match valid url slugs', () => {
    expect(urlSlugMatcher.test('trig-points')).toBe(true)
    expect(urlSlugMatcher.test('ethels')).toBe(true)
    expect(urlSlugMatcher.test('/trig-points')).toBe(true)
  })

  it('Should not match invalid url slugs', () => {
    expect(urlSlugMatcher.test('Trig Points')).toBe(false)
    expect(urlSlugMatcher.test('trig points')).toBe(false)
    expect(urlSlugMatcher.test('Trig-points')).toBe(false)
    expect(urlSlugMatcher.test('Ethels')).toBe(false)
    expect(urlSlugMatcher.test('eth8els')).toBe(false)
    expect(urlSlugMatcher.test('/trig-po&ints')).toBe(false)
  })
})
