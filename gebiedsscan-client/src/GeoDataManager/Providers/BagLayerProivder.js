/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 1:42 PM
 */

import LayerProvider from "../LayerProvider";
import axios from "axios";

export default class extends LayerProvider {

  constructor(manager) {
    super(manager);
    this.name = 'Bag';
    this.type = this.TYPE.TILES;
    this.zIndex = 10;

    this.legend = {
      pand: {
        'backgroundColor': '#cccccc',
        'border': '2px solid black'
      }
    }
  }

  render() {
    this.visible = true;
    this.layer = L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/bag/wms', {
      layers: 'pand',
      format: 'image/png',
      transparent: true
    });
    return this.layer;
  }

  getUnderPoint(point) {
    return new Promise(resolve => {
      axios.post('https://bag.basisregistraties.overheid.nl/api/v1/panden', {
        'geometrie': {
          'contains': {'type': 'Point', 'coordinates': point}
        }
      }, {
        headers: {
          'Accept': 'application/hal+json',
          'Content-Type': 'application/json',
          'X-Api-Key': '7753828d-ece2-457e-8ac7-9bfd5b208ee4'
        }
      }).then(({data}) => {                
        if (data._embedded.panden.length) {
          let geojson = {
            "type": "Feature",
            "geometry": data._embedded.panden[0]._embedded.geometrie,
            "properties": data._embedded.panden[0]
          }
          let layer = L.geoJson(geojson);
          
          let style = {
            stroke: false,
            fill: true,
            fillOpacity: 0.6
          };
          layer.setStyle(style);
          
          resolve({
            source: this.name,
            label: 'Pand',
            layer: layer,
            data: data._embedded.panden
          })
        }
        else {
          resolve({});
        }
      });
    });
  }

  getUnderPolygon(polygon) {
    let retrievedPanden = [];

    let retrievePanden = (page, resolve) => { 
      axios.post('https://bag.basisregistraties.overheid.nl/api/v1/panden?page='+ page, {
        'geometrie': {
          'within': polygon
        }
      }, {
        headers: {
          'Accept': 'application/hal+json',
          'Content-Type': 'application/json',
          'X-Api-Key': '7753828d-ece2-457e-8ac7-9bfd5b208ee4'
        }
      }).then(({data}) => {
        retrievedPanden = [...retrievedPanden, ...data._embedded.panden];

        if (data._links && data._links.next) {
          let page = data._links.next.href.split('=').pop();
          retrievePanden(page, resolve);
        } else {
          if (retrievedPanden.length) {
            let layer = createLayer(retrievedPanden);

            resolve({
              source: this.name,
              label: 'Panden',
              layer: layer,
              data: retrievedPanden
            })
          } else {
            resolve({})
          }
        }
      });
    };

    let createLayer = (data) => {
      let geojson = {
        type: "FeatureCollection",
        features: data.map((item) => {
          let feature = {
            "type": "Feature",
            "geometry": item._embedded.geometrie,
            "properties": item
          }
          return feature;
        })
      }

      let style = {
        stroke: false,
        fill: true,
        color: "#00b703",
        fillOpacity: 0.6
      };

      return L.geoJson(geojson, {style: style});  
    }

    return new Promise(resolve => {
      retrievePanden(null, resolve);
    }); 
  }

  clickEvent(event) {
    return event.latlng;
  }
}

