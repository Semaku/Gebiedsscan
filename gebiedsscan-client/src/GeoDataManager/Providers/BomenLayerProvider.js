

import LayerProvider from "../LayerProvider";


export default class extends LayerProvider {

  constructor(manager) {
    super(manager);
    this.label = 'Bomen';
    this.name = 'Bomen';

    this.type = this.TYPE.GEOMETRY;

    this.zoomBounds = [6, 12];

  }

  render() {
    this.visible = true;

    this.geoJSON = require("../../assets/data/Utrecht_gebiedsscan_boominventarisatie.json");

    this.layer = new L.GeoJSON(this.geoJSON, {
      pointToLayer(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 4,
          fillColor: "green",
          weight: 0,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      style(feature) {
        return {
          color: "green",
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