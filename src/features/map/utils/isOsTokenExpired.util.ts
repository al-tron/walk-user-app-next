import { OsTokenType } from '../map.types'

export const isOsTokenExpired = (osTokenData: OsTokenType) => {
  const issuedTime = Math.round(osTokenData!.issued_at / 1000)
  const expiresIn = osTokenData!.expires_in
  const currentTime = Math.round(Date.now() / 1000)

  if (currentTime > issuedTime + (expiresIn - 30)) {
    return true
  } else {
    return false
  }
}
