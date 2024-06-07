import WMTSCapabilities from 'ol/format/WMTSCapabilities'
import { optionsFromCapabilities } from 'ol/source/WMTS'

import { restClient } from '@/lib/restClient'

export const getCapabilitiesAsOptions = async (osAccessToken: string) => {
  const capabilities = await restClient(
    'https://api.os.uk/maps/raster/v1/wmts?service=WMTS&request=GetCapabilities&version=2.0.0',
    { headers: { Authorization: `Bearer ${osAccessToken}` } },
  )

  const parser = new WMTSCapabilities()
  const result = parser.read(capabilities)

  return optionsFromCapabilities(result, {
    layer: 'Leisure_27700',
    matrixSet: 'EPSG:27700',
  })
}
