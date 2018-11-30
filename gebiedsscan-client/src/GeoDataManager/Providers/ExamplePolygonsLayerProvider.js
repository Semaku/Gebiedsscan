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
    this.type = this.TYPE.GEOMETRY;
    this.name = 'ExamplePolygons';
    this.filters = ['stadsdeelnaam'];

    this.layer = null;
    this.geoJSON = {};
  }

  render() {
    this.visible = true;
    this.geoJSON = require("../../assets/data/wijken-eindhoven.json");
    this.layer = new L.GeoJSON(this.geoJSON);
    return this.layer;
  }

  filter(params) {
    let filtered = this.geoJSON.features.filter(feature => {
      return params.query.stadsdeelnaam.indexOf(feature.properties.stadsdeelnaam) !== -1
    });

    this.layer.clearLayers();
    this.layer.addData({...this.geoJSON, features: filtered});
    this.layer.fire('change', {data: filtered});
  }
}