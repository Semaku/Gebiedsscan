/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 1:42 PM
 */

import LayerProvider from "../LayerProvider";


export default class extends LayerProvider {

  constructor(manager) {
    super(manager);
    this.label = 'Woningbouwproject';
    this.name = 'Woningbouw';

    this.type = this.TYPE.GEOMETRY;

    this.zoomBounds = [6, 12];

  }

  render() {
    this.visible = true;

    this.geoJSON = require("../../assets/data/woningbouw_punt.json");
    let geoJSONPolygon = require("../../assets/data/woningbouw_vlak.json");
    this.geoJSON.features = [...geoJSONPolygon.features, ...this.geoJSON.features];

    this.layer = new L.GeoJSON(this.geoJSON, {
      pointToLayer(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 4,
          fillColor: "#3a7c29",
          weight: 0,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      style(feature) {
        return {
          color: "#3a7c29",
          weight: 2,
          opacity: 1,
        }
      },
    });

    this.layer.addData(this.geoJSON);

    return this.layer;
  }

  clickEvent(event) {
    return event.layer.feature.properties;
  }
}