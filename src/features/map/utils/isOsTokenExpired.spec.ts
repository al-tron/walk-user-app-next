import { isOsTokenExpired } from './isOsTokenExpired.util'

const commonOsTokenData = {
  access_token: 'fake-token',
  expires_in: 299, // 4 minutes 59 seconds
  token_type: 'Bearer',
}

describe('isOsTokenExpired.util', () => {
  it('Should return true if the token is expired', () => {
    const expiredToken = {
      ...commonOsTokenData,
      issued_at: Date.now() - 600000, // 10 minutes ago
    }

    expect(isOsTokenExpired(expiredToken)).toBe(true)
  })

  it('Should return true if token is within 30 seconds of expiring', () => {
    const nearlyExpiredToken = {
      ...commonOsTokenData,
      issued_at: Date.now() - 269000, // 4 minutes 29 seconds ago
    }

    expect(isOsTokenExpired(nearlyExpiredToken)).toBe(false)
  })

  it('Should return false if the token is not expired', () => {
    const validToken = {
      ...commonOsTokenData,
      issued_at: Date.now() - 30000, // 30 seconds ago
    }

    expect(isOsTokenExpired(validToken)).toBe(false)
  })
})
