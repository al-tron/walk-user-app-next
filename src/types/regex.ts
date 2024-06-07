export const digitalWatchTimeFormatMatcher = /^(0[0-9]|1[0-9]|2[0-9]|3[0-6]):(00|15|30|45)$/
export const formattedWalkingTimeMatcher =
  /^(15|30|45) mins$|^(?:[1-9]|[1-2][0-9]|3[0-6]) hour(?:s)?(?: (15|30|45) mins)?$/

export const osGridRefMatcher = /^([STNHOstnho][A-Za-z])\s?(\d{4}\s?\d{4})$/

export const urlSlugMatcher = /^(?:\/?[a-z]+(?:-[a-z]+)*)$/
