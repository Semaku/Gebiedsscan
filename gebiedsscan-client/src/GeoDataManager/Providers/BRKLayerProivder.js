/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 1:42 PM
 */

import LayerProvider from "../LayerProvider";
import axios from "axios";
import turf from 'turf';

export default class extends LayerProvider {

  constructor(manager) {
    super(manager);
    this.name = 'BRK';
    this.type = this.TYPE.TILES;
    this.zIndex = 10;
  }

  render() {
    this.visible = true;
    this.layer = L.tileLayer.wms('https://geodata.nationaalgeoregister.nl/kadastralekaartv3/wms', {
      layers: 'kadastralekaart',
      format: 'image/png',
      transparent: true
    });
    return this.layer;
  }

  getUnderPoint(point) {
    let a = turf.flip(turf.point(point)).geometry.coordinates;
    point = this.manager.map.options.crs.projection._proj.forward(a);
    return new Promise(resolve => {
      axios.get('https://geodata.nationaalgeoregister.nl/kadastralekaartv3/wfs?' +
        'request=GetFeature&service=WFS&typeName=kadastralekaartv3:perceel&count=100&outputFormat=json&' +
        `srsName=EPSG%3A28992&cql_filter=CONTAINS(begrenzingperceel,POINT(${point[0]} ${point[1]}))`)
        .then(({data}) => {
          let style = {
            fill: true,
            weight: 4,
            color: 'blue'
            };

          let layer = L.Proj.geoJson(data, {style: style});

          resolve({
            label: 'Perceel',
            source: this.name,
            layer: layer,
            data: data.features.map(feature => feature.properties),
          })
        });
    });
  }

  getUnderPolygon(polygon) {
    let retrievedPercelen = [];

    let retrievePercelen = (page, resolve) => { 
      axios.put('https://brk.basisregistraties.overheid.nl/api/v1/perceel?page='+ page, {
        'geometry': {
          'within': polygon
        }
      }, {
        headers: {
          'Accept': 'application/hal+json',
          'Content-Type': 'application/json',
           //'X-Api-Key': '7753828d-ece2-457e-8ac7-9bfd5b208ee4'
        }
      }).then(({data}) => {
        retrievedPercelen = [...retrievedPercelen, ...data._embedded.results];

        if (data._links && data._links.next) {
          let page = data._links.next.href.split('=').pop();
          retrievePercelen(page, resolve);
        } else {
          if (retrievedPercelen.length) {
            let layer = createLayer(retrievedPercelen);

            resolve({
              source: this.name,
              label: 'Panden',
              layer: layer,
              data: retrievedPercelen
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
            "geometry": item.geometry,
            "properties": item
          }
          return feature;
        })
      }

      let style = {
        weight: 3,
        color: 'black',
      };

      let layer = L.geoJson(geojson, {style: style});
      layer.setStyle(style);
      return layer; 
    }

    return new Promise(resolve => {
      retrievePercelen(1, resolve);
    }); 
  }


  clickEvent(event) {
    return event.latlng;
  }
}

