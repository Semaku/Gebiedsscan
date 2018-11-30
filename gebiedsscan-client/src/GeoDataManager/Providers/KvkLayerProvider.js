/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 1:42 PM
 */

import LayerProvider from "../LayerProvider";


export default class extends LayerProvider {

  constructor(manager) {
    super(manager);
    this.label = 'KvK';
    this.name = 'KVK';

    this.type = this.TYPE.GEOMETRY;

    this.zoomBounds = [3, 15];

    this.legend = {
      "KVK handelsregister objecten": {
        'height': '8px',
        'width': '8px',
        'border-radius': '50%',
        'background-color': 'black',
        'border': '2px solid black'
      }
    };

  }

  render() {
    this.visible = true;

    this.geoJSON = require("../../assets/data/kvk_utrecht.json");
    let eindhovenJson = require("../../assets/data/kvk_eindhoven.json");
    this.geoJSON.features = [...eindhovenJson.features];

    this.layer = new L.GeoJSON(this.geoJSON, {
      pointToLayer(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: "#000",
          fillOpacity: 0.4,
          opacity: 0.4,
        });
      },
      style(feature) {
        return {
          color: "#000",
          weight: 1,
          fillOpacity: 0.4,
          opacity: 0.4,
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