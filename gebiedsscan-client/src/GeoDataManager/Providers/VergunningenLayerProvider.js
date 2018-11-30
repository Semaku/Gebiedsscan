/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 1:42 PM
 */

import LayerProvider from "../LayerProvider";
import axios from 'axios';
import turf from 'turf';


export default class extends LayerProvider {

  constructor(manager) {
    super(manager);

    this.name = 'Vergunningen';
    this.label = 'Vergunningsaanvraag';

    this.legend = {
      'vergunningsaanvraag': {
        'border-radius' : '50%',
        'backgroundColor': 'rgba(124,124,9,.5)',
        'border': '2px solid #7c7b13'
      }
    };
    this.type = this.TYPE.GEOMETRY;

    this.listeners = {
      moveend: () => this.updateMap()
    };


    this.data = {
      type: "FeatureCollection",
      name: "vergunningen",
      crs: {type: "name", properties: {name: "urn:ogc:def:crs:OGC:1.3:CRS84"}},
      features: []
    };
  }

  render() {
    this.visible = true;
    this.layer = new L.GeoJSON(null, {
      pointToLayer(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 4,
          fillColor: "#7c7b13",
          weight: 0,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      style: {
        color: "#7c7b13",
        weight: 2,
        opacity: 1,
      }
    });

    this.updateMap();
    return this.layer;
  }

  // Since the moveend listener is not called when the layer is not visible, we have to update the map when it is shown
  show() {
    if (!this.visible) {
      super.show();
      this.updateMap();
    }
  }

  // update map function that sends a get requests and shows it on the layer
  updateMap() {
    let bounds = this.manager.getBoundingBox();
    let checkBounds = this.manager.getBoundingBox(true);
    axios.get(`https://data.eindhoven.nl/api/records/1.0/search/?dataset=aangevraagde-vergunningen` +
      `&geofilter.polygon=(${bounds.getNorthWest().lat},${bounds.getNorthWest().lng}),` +
      `(${bounds.getSouthWest().lat},${bounds.getSouthWest().lng}),` +
      `(${bounds.getSouthEast().lat},${bounds.getSouthEast().lng}),` +
      `(${bounds.getNorthEast().lat},${bounds.getNorthEast().lng})`)
      .then((data) => {
        // make sure we are still in the same position
        if (checkBounds === this.manager.getBoundingBox(true)) {
          this.data.features = data.data.records.map(record => {
            return {
              type: "Feature",
              properties: record.fields,
              geometry: record.geometry
            }
          });
          this.filter();
          this.manager._restack();
        }
      })
  }

  getUnderPolygon(polygon) {
    polygon = turf.flip(polygon);
    let q = '';
    let type = '';    

    if (polygon.type === 'Polygon') {
      type = 'polygon';
      _.each(polygon.coordinates[0], (coord) => {
        q +=  `(${coord[0]},${coord[1]}),`;
      });
      q = q.slice(0, -1); //remove last comma
    } else {
      type = 'distance';
      q +=  `${polygon.coordinates[0]},${polygon.coordinates[1]}`;
    }     
    
    var url = `https://data.eindhoven.nl/api/records/1.0/search/?dataset=aangevraagde-vergunningen` +
    `&geofilter.${type}=${q}`;

    return new Promise(resolve => {
      axios.get(url)
        .then(({data}) => {
          
          let geoJson = {
            type: "FeatureCollection",
            name: "vergunningen",
            crs: {type: "name", properties: {name: "urn:ogc:def:crs:OGC:1.3:CRS84"}},
            features: []
          }

          geoJson.features = data.records.map((item) => {
            return {
              type: "Feature",
              properties: item.fields,
              geometry: item.geometry
            }
          })

          if (this.itemGeoJsonLayer)
            this.itemGeoJsonLayer.remove();
          try {
            this.itemGeoJsonLayer = new L.GeoJSON(geoJson, {
              pointToLayer(feature, latlng) {
                return L.circleMarker(latlng, {
                  radius: 4,
                  fillColor: "#7c7b13",
                  weight: 0,
                  opacity: 1,
                  fillOpacity: 0.8
                });
              },
              style: {
                color: "#7c7b13",
                weight: 2,
                opacity: 1,
              }});
          } catch (error) {
            resolve({});
          }
         
          if (geoJson.features) {
            resolve({
              label: 'Vergunningen',
              source: this.name,
              layer: this.itemGeoJsonLayer,
              data: geoJson.features.map(feature => feature.properties),
            });
          }
          resolve({});
        });
    });
  }

  clickEvent(event) {
    return event.layer.feature.properties;
  }


  filter(params = null) {
    params = params || this.manager.params;
    if (this.data.features) {
      let filtered = this.data.features;

      this.layer.clearLayers();
      this.layer.addData({...this.data, features: filtered});
      this.layer.fire('change', {data: filtered});
    }
  }
}