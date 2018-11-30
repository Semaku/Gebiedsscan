/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 1:42 PM
 */

import LayerProvider from "../LayerProvider";
import axios from 'axios';
import turf from 'turf';
import _ from 'lodash';


export default class extends LayerProvider {

  constructor(manager) {
    super(manager);
    this.name = 'Fotos';
    this.type = this.TYPE.GEOMETRY;
    this.zIndex = 10;
    this.itemGeoJsonLayer = null;

    this.divIcon = L.divIcon({ 
          iconSize: [30, 30], 
          className: 'icon', 
          html: `
          <div class="camera3"><span></span></div>` 
        })

    // this.legend = {
    //     gebiedsgrens: {
    //         'height': '8px',
    //         'width': '8px',
    //         'border-radius': '50%',
    //         'background-color': 'black',
    //         'border': '2px solid black'
    //     }
    // };
  }

  render() {
    this.visible = true;
    this.FotosGeoJson = require("../../assets/data/2007.json");
    this.FotosGeoJson2 = require("../../assets/data/1921-1935.json");
    this.FotosGeoJson3 = require("../../assets/data/1936-1950.json");
    this.FotosGeoJson4 = require("../../assets/data/1951-1965.json");
    this.FotosGeoJson5 = require("../../assets/data/1966-1980.json");
    this.FotosGeoJson6 = require("../../assets/data/1981-1985.json");
    this.FotosGeoJson7 = require("../../assets/data/other-photos.json");
    
    this.layer = new L.GeoJSON(null, {
      pointToLayer(feature, latlng) {
        var myIcon = L.divIcon({ iconSize: [30, 30], 
          className: 'icon', 
          html: `
          <div class="camera3"><span></span></div>` 
        });
        return L.marker(latlng, {icon: myIcon})
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`<p><b>Richting: </b>${feature.properties.RICHTING}</p><p><b>Jaar: </b>${feature.properties.JAAR || 'Niet beschikbaar'}</p><p><b>Omschrijving: </b>${feature.properties.OMSCHRIJVING}</p>` + '<img height="400" style="height:230px;" src="'+ feature.properties.URL + '">');
      }
    });

    this.geoJSON = this.FotosGeoJson;
    this.geoJSON.features = [
      ...this.FotosGeoJson2.features,
      ...this.FotosGeoJson3.features,
      ...this.FotosGeoJson4.features,
      ...this.FotosGeoJson5.features,
      ...this.FotosGeoJson6.features,
      ...this.FotosGeoJson7.features,
      
    ];
    this.layer.addData(this.geoJSON);

    var markers = L.markerClusterGroup({
      showCoverageOnHover: false,
      iconCreateFunction: (cluster) => {
        return L.divIcon({ iconSize: [30, 30], className: 'icon', html: `
        <span class="ribbon">${cluster.getChildCount()}</span>
        <div class="camera3"><span></span></div>` });
      }
    });
    markers.addLayer(this.layer);

    this.layer = markers;

    return markers;
  }



  clickEvent(event) {
    return event.latlng;
  }
}

