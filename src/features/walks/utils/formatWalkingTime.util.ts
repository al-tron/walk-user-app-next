export const formatWalkingTime = (time: string) => {
  const hourMinuteArray = time.split(':')

  const hours = parseInt(hourMinuteArray[0])
  const minutes = parseInt(hourMinuteArray[1])

  if (hours <= 0 && minutes > 0) return `${minutes} mins`
  if (hours === 1 && minutes <= 0) return `${hours} hour`
  if (hours > 1 && minutes <= 0) return `${hours} hours`
  if (hours === 1 && minutes > 0) return `${hours} hour ${minutes} mins`
  if (hours > 1 && minutes > 0) return `${hours} hours ${minutes} mins`

  return time
}
