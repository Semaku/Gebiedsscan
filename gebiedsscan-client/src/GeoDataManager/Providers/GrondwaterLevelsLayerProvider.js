import LayerProvider from "../LayerProvider";
import turf from 'turf';
import axios from 'axios';

export default class extends LayerProvider {

  constructor(manager) {
    super(manager);
    this.label = 'Grondwater Levels';
    this.name = 'GrondwaterLevels';
    this.type = this.TYPE.GEOMETRY;
    this.filters = {};
    this.zoomBounds = [6, 15];
  }
  render() {
    this.visible = true;
    document.getElementById("waterlevels").style.visibility = "visible";
    this.layer = L.tileLayer.wms('https://eindhoven.nazca4u.nl/Atlas/geoserver/wms', {
      layers: 'percentie25gw',
      format: 'image/png',
      transparent: true,
      opacity: 0.45
    });
    return this.layer;
  }
  getUnderPoint(point) {
    var url = this.getFeatureInfoUrl(
      this.manager.map,
      this.layer,
      point,
      {
        'info_format': 'application/json'
      }
    );

    return new Promise(resolve => {
      axios.get(`https://kadaster-api.test.semaku.com/cors/get/${encodeURIComponent(url)}`)
        .then(({data}) => {
          if (this.itemGeoJsonLayer)
            this.itemGeoJsonLayer.remove();
          try {
            this.itemGeoJsonLayer = L.Proj.geoJson(data, {
              pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, {
                  radius: 8,
                  fillColor: "#D62C1F",
                  color: "#000",
                  dashArray: '3',
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.9
                });
              }
            });
          } catch (error) {
            console.error(error, data);
            reject({});
          }

          let style = {
            stroke: false,
            fillColor: '#000000',
            fill: true,
            fillOpacity: 0.6
          };

          this.itemGeoJsonLayer.setStyle(style);

          if (data.features) {
            resolve({
              label: 'Grondwater Levels',
              source: this.name,
              layer: this.itemGeoJsonLayer,
              data: data.features.map(feature => feature.properties),
            });
          }
          resolve({});
        });

    });
  }

  getUnderPolygon(polygon) {

    let point = turf.flip(turf.centroid(polygon)).geometry.coordinates;
    return this.getUnderPoint(point);
  }

  getFeatureInfoUrl(map, layer, latlng, params) {
    var point = map.latLngToContainerPoint(latlng, map.getZoom()),
      size = map.getSize(),
      bounds = map.getBounds(),
      sw1 = bounds.getSouthWest(),
      ne1 = bounds.getNorthEast(),
      sw = map.options.crs.projection._proj.forward([sw1.lng, sw1.lat]),
      ne = map.options.crs.projection._proj.forward([ne1.lng, ne1.lat]);

    var defaultParams = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      srs: layer._crs.code,
      styles: '',
      version: layer._wmsVersion,
      format: layer.options.format,
      bbox: [sw.join(','), ne.join(',')].join(','),
      height: size.y,
      width: size.x,
      layers: layer.options.layers,
      query_layers: layer.options.layers,
      info_format: 'text/html'
    };

    params = L.Util.extend(defaultParams, params || {});

    params[params.version === '1.3.0' ? 'i' : 'x'] = Math.round(point.x);
    params[params.version === '1.3.0' ? 'j' : 'y'] = Math.round(point.y);

    console.log('params', params)

    return layer._url + L.Util.getParamString(params, layer._url, true);

  }

  clickEvent(event) {
    return event.latlng;
  }
}
