/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 1:42 PM
 */

import LayerProvider from "../LayerProvider";
import turf from 'turf';

export default class extends LayerProvider {

  constructor(manager) {
    super(manager);
    this.label = 'Archeologie';
    this.name = 'Archeologie';

    this.type = this.TYPE.GEOMETRY;

    this.legend = {
      Monument: '#00b703'
    };

    this.filters = {};

    this.zoomBounds = [6, 15];

  }

  render() {
    this.visible = true;

    this.onderzochteGebiedenGeoJSON = require("../../assets/data/onderzochte-gebieden.json");
    this.nietOnderzochteGebiedenGeoJSON = require("../../assets/data/niet-onderzochte-gebieden.json");
    this.amkTerreinenGeoJSON = require("../../assets/data/amk-terreinen.json");

    this.layer = new L.GeoJSON(null, {
      pointToLayer(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 4,
          fillColor: "#00b703",
          weight: 0,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      style(feature) {
        return {
          color: "#00b703",
          weight: 2,
          opacity: 1,
        }
      },
    });

    this.geoJSON = this.onderzochteGebiedenGeoJSON;
    this.geoJSON.features = [...this.geoJSON.features, ...this.nietOnderzochteGebiedenGeoJSON.features, ...this.amkTerreinenGeoJSON.features, ];
    this.layer.addData(this.geoJSON);

    return this.layer;
  }

  clickEvent(event) {
    return event.layer.feature.properties;
  }

  getUnderPolygon(polygon) {
    let point = turf.flip(turf.centroid(polygon)).geometry.coordinates;
    let distance = (1 / this.manager.map.getZoom()) * 0.1;
    let bounds = this.manager.map.getBounds();
    return this.getUnderPoint(point, bounds, distance);
  }

  filter(params = null) {
    // params = params || this.manager.params;
    // let filtered = this.geoJSON.features.filter(feature => {
    //     if (params.query.aanduiding &&
    //         (
    //             feature.properties.AANDUIDING &&
    //             params.query.aanduiding.indexOf(feature.properties.AANDUIDING) === -1
    //         )
    //     ) {
    //         return false
    //     }

    //     if (params.query.bouwjaar) {
    //         let year = null;
    //         if (feature.properties.BOUWJAAR) {
    //             year = feature.properties.BOUWJAAR.match(/[0-9]{4}/);
    //             if (year) {
    //                 year = year[0];
    //             }
    //         } else {
    //             year = feature.properties.BOUWJR_VAN ||
    //                 feature.properties.BOUWJR_TOT ||
    //                 feature.properties.BEGBOUWJR ||
    //                 feature.properties.EINDBOUWJR;
    //         }

    //         if (year) {
    //             year = parseInt(year);
    //             if (
    //                 parseInt(params.query.bouwjaar.max) < year ||
    //                 parseInt(params.query.bouwjaar.min) > year) {
    //                 return false;

    //             }
    //         } else {
    //             return true;
    //         }
    //     }
    //     return true;
    // });

    // this.layer.clearLayers();
    // this.layer.addData({...this.geoJSON, features: filtered});
    // this.layer.fire('change', {data: filtered});
  }
}