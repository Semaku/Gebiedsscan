/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 1:42 PM
 */

import LayerProvider from "../LayerProvider";

export default class extends LayerProvider {
  constructor(manager) {
  super(manager);
  this.label = "Gemeentelijk monument";
  this.name = "GemeentelijkeMonumenten";

  this.type = this.TYPE.GEOMETRY;

  this.legend = {
    Monument: "#7c1a6b"
  };

  this.filters = {
    // aanduiding: ['Woonhuis', 'Arbeiderswoning', 'Winkel', 'Herenhuis', 'Boerderij', 'Villa', 'Fabriek',
    //     'Appartementengebouw', 'Villapark', 'Horecapand', 'Bedrijfshallen', 'Pastorie', 'Café', 'Bedrijfspand',
    //     'Energiecentrale', 'Koetshuis', 'Winkels', 'Bakkerij', 'Dienstwoning', 'Fabrieksmuur', 'Gedenkteken',
    //     'Gezellenhuis', 'Kapel', 'Kazerne', 'Klooster', 'Apotheek', 'Archeologisch', 'Bakhuis', 'Bankgebouw',
    //     'Boomgaard', 'Brouwerij', 'Brug', 'Concertzaal', 'Expositiegebouw', 'Fundamenten', 'Fundamenten', 'Glas',
    //     'Heilig', 'Kantoorpand', 'Kerk', 'Ketelhuis', 'Laboratorium', 'Liefdesgesticht', 'Looiershuis', 'Orgel',
    //     'Pakhuis', 'Park', 'Patronaatsgebouw', 'Poort', 'Poortgebouw', 'Post', 'Rectorswoning', 'School',
    //     'Schouwburg', 'Schuur', 'Showroom', 'Spoelhuis', 'Spoorwegwachtershuis', 'Stadhuis', 'Verenigingsgebouw',
    //     'Waaggebouw', 'Warenhuis', 'Watertoren', 'havenhoofd', 'schuur', 'viaduct'
    // ],
    // bouwjaar: [{
    //     min: 1600,
    //     max: 2018
    // }]
  };

  this.zoomBounds = [6, 15];
  }

  render() {
  let kinked = [
    46,
    48,
    69,
    70,
    90,
    136,
    559,
    565,
    578,
    580,
    587,
    602,
    658,
    678,
    692,
    894,
    1007,
    1024,
    1159,
    1192,
    1235,
    1268
  ];
  this.visible = true;

  this.geoJSONEindhoven = require("../../assets/data/Eindhoven_gemeentelijke_monumenten.json");
  this.geoJSONUtrecht = require("../../assets/data/Utrecht_gebiedsscan_gemeentelijke_monumenten.json");
  this.geoJSONUtrecht2 = require("../../assets/data/Utrecht_beschermde_gemeen.json");

  this.layer = new L.GeoJSON(null, {
    pointToLayer(feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 4,
      fillColor: "#7c1a6b",
      weight: 0,
      opacity: 1,
      fillOpacity: 0.8
    });
    },
    style(feature) {
    return {
      color:
      kinked.indexOf(feature.properties.OBJECTID) !== -1
        ? "#7c0d18"
        : "#7c1a6b",
      weight: 2,
      opacity: 1
    };
    }
  });

  this.geoJSON = this.geoJSONEindhoven;
  this.geoJSON.features = [
    ...this.geoJSON.features,
    ...this.geoJSONUtrecht.features,
    ...this.geoJSONUtrecht2.features
  ];
  this.layer.addData(this.geoJSON);

  return this.layer;
  }

  clickEvent(event) {
  return event.layer.feature.properties;
  }

  filter(params = null) {
  params = params || this.manager.params;
  let filtered = this.geoJSON.features.filter(feature => {
    if (
    params.query.aanduiding &&
    (feature.properties.AANDUIDING &&
      params.query.aanduiding.indexOf(feature.properties.AANDUIDING) === -1)
    ) {
    return false;
    }

    if (params.query.bouwjaar) {
    let year = null;
    if (feature.properties.BOUWJAAR) {
      year = feature.properties.BOUWJAAR.match(/[0-9]{4}/);
      if (year) {
      year = year[0];
      }
    } else {
      year =
      feature.properties.BOUWJR_VAN ||
      feature.properties.BOUWJR_TOT ||
      feature.properties.BEGBOUWJR ||
      feature.properties.EINDBOUWJR;
    }

    if (year) {
      year = parseInt(year);
      if (
      parseInt(params.query.bouwjaar.max) < year ||
      parseInt(params.query.bouwjaar.min) > year
      ) {
      return false;
      }
    } else {
      return true;
    }
    }
    return true;
  });

  this.layer.clearLayers();
  this.layer.addData({ ...this.geoJSON, features: filtered });
  this.layer.fire("change", { data: filtered });
  }
}
