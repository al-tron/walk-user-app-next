import ImageTile from 'ol/ImageTile'

import { restClient } from '@/lib/restClient'

export const getTileWithAuthHeader = async (tile: ImageTile, src: string, osAccessToken: string) => {
  try {
    const res = await restClient(src, {
      headers: { Authorization: `Bearer ${osAccessToken}` },
    })
    const blob = await res.blob()

    const reader = new FileReader()
    reader.onload = () => tile.getImage().setAttribute('src', String(reader.result))
    reader.readAsDataURL(blob)

    return tile
  } catch {
    tile.setState(3)
  }
}
