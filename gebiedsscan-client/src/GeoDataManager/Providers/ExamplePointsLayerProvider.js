/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 1:42 PM
 */

import LayerProvider from "../LayerProvider";
import L from "leaflet";
import proj4leaflet from "proj4leaflet";

export default class extends LayerProvider {

  constructor(manager) {
    super(manager);
    this.name = 'ExamplePoints';
    this.type = this.TYPE.GEOMETRY;
    this.filters = ['group']
  }

  render() {
    this.visible = true;
    this.geoJSON = require("../../assets/data/struikelstenen-punt.json");
    this.layer = new L.GeoJSON(this.geoJSON, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: "#ff001a",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      }
    });
    return this.layer;
  }
  
  filter(params) {
    let filtered = this.geoJSON.features.filter(feature => {
      return params.query.group.indexOf(feature.properties.group) !== -1
    });

    this.layer.clearLayers();
    this.layer.addData({...this.geoJSON, features: filtered});
    this.layer.fire('change', {data: filtered});
  }

  clickEvent(event) {
    return event.layer.feature.properties;
  }
}