/*jslint node: true, esversion: 6 */
'use strict';
const async = require('async');
const Joi = require('joi');
const db = require('../middleware/database.js');
const utils = require('../util/utils.js');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/cbs/{bbox}',
        config: {
            description: 'Retrieves cbs data',
            notes: 'geo',
            tags: ['api'],
            validate: {
                params: {
                    bbox: Joi.string()
                        .required()
                        .description('bbox')
                }
            },
            plugins: {
                queryFilter: {
                  enabled: true,
                  ignoredKey: [], // Array will be concatenated with the ignoredKeys set at register 
                  params: [] // Array of request.params that will be put into filter object 
                }
            }
        },
        handler: function (request, reply) {
            var filters = '';
            Object.keys(request.query.filter).forEach(function(filterName) {
                var filterValue = JSON.parse(request.query.filter[filterName]);
                filters += `AND cbs.${filterName} BETWEEN ${filterValue[0]} AND ${filterValue[1]} `;
            });
            console.log(filters);
            
            var query = `SELECT ST_AsGeoJSON(cbs.wkb_geometry) AS geometry,
                cbs.aantal_inwoners,
                cbs.gemeente_naam,
                cbs._nijverheid,
                cbs.aantal_restaurants_binnen_3km,
                cbs.avg_afstand_bioscoop_km,
                cbs.inwoners_0_15_jr,
                cbs.inwoners_25_45_jr,
                cbs."_totaal",
                cbs.inwoners_65_jr,
                cbs.inwoners_total,
                cbs._kind,
                cbs.eenpersoons_huishoudens_aantal,
                cbs.inwoners_45_65_jr,
                cbs.afstand_tot_kinderdag_verblijf_km,
                cbs.gemeente_arbeidsparticipatie,
                cbs.inwoners_15_25_jr,
                cbs.burgerlijkestaat_ongehuwd_aantal,
                cbs.huishoudens_met_kinderen_aantal,
                cbs.gemiddelde_huishoudens_grootte,
                cbs._oprit,
                cbs._boodschap,
                cbs._trein,
                cbs.gemeente_csb_id,
                cbs.bevolkings_dichtheid_aantal_inwoners_per_km2,
                cbs._landbouw,
                cbs.afstand_tot_grote_supermarkt_km,
                cbs.burgerlijkestaat_gehuwd_aantal
            FROM kadaster.cbs_data AS cbs
            WHERE cbs.wkb_geometry && ST_MakeEnvelope(${request.params.bbox}) ${filters}`;

            db.query(query, function(err, result) {
                reply({'results':utils.toFeatureCollection(result.rows), 'responseCode':0});
            });  
        }
    });

    next();

};

exports.register.attributes = {
    name: 'cbs-route',
    version: '0.0.1'
};
