/*jslint node: true, esversion: 6 */
'use strict';
module.exports = {
    objectifyGeometryString: function (rows) {
        for (let i = 0; i < rows.length; i++) {
            rows[i].begrenzing = JSON.parse(rows[i].begrenzing);
        }
        return rows;
    },
    toFeatureCollection: function toFeatureCollection(queryResult) {
        // Initalise variables.
        var i = 0,
            length = queryResult.length,
            prop = null,
            geojson = {
              "type": "FeatureCollection",
              "features": []
            };    // Set up the initial GeoJSON object.
      
        for(i = 0; i < length; i++) {  // For each result create a feature
          var feature = {
            "type": "Feature",
            "geometry": JSON.parse(queryResult[i].geometry),
            "properties": {}
          };
          // finally for each property/extra field, add it to the feature as properties as defined in the GeoJSON spec.
          for(prop in queryResult[i]) {
            if (prop !== "geojson" && prop !== "geometry" && queryResult[i].hasOwnProperty(prop)) {
              feature.properties[prop] = queryResult[i][prop];
            }
          }
          // Push the feature into the features array in the geojson object.
          geojson.features.push(feature);
        }
        // return the FeatureCollection geojson object.
        return geojson;
      }
};
