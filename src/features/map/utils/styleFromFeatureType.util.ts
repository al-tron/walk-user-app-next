import { FeatureLike } from 'ol/Feature'

import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Icon from 'ol/style/Icon'

export const styleFromFeatureType = (feature: FeatureLike) => {
  switch (feature.getGeometry()!.getType()) {
    case 'LineString':
      return new Style({
        stroke: new Stroke({ color: '#4264fb', width: 5 }),
        zIndex: 0,
      })

    case 'Point':
      const isStartIcon = feature.getProperties().name === 'start'

      return new Style({
        image: new Icon({
          width: 35,
          height: 50,
          src: isStartIcon ? '/img/map/pin-icon-start.png' : '/img/map/pin-icon-end.png',
          anchor: [0.5, 1],
        }),
        zIndex: isStartIcon ? 20 : 10,
      })
  }
}
