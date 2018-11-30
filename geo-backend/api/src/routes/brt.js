/*jslint node: true, esversion: 6 */
'use strict';
const async = require('async');
const Joi = require('joi');
const db = require('../middleware/database.js');
const utils = require('../util/utils.js');

exports.register = function (server, options, next)
{
    server.route({
        method: 'GET',
        path: '/brtareas/{bbox}',
        config: {
            description: 'Retrieves brt functioneelGebied based on bbox',
            notes: 'geo',
            tags: ['api'],
            validate: {
                params: {
                    bbox: Joi.string()
                            .required()
                            .description('bbox')
                }
            }
        },
        handler: function (request, reply) {                
            var query = `SELECT ST_AsGeoJSON(brt.wkb_geometry) as geometry,
            brt.funct_gebied_name,
            brt.brt_type
            FROM kadaster.brtareas_netherlands brt
            WHERE brt.wkb_geometry && ST_MakeEnvelope(${request.params.bbox});`;
            db.query(query, function(err, result) {
                if (result) {
                    reply({'results':utils.toFeatureCollection(result.rows), 'responseCode':200});
                } else {
                    reply({'results':err, 'responseCode':0});
                }
                
            });                 
        }
    });

    server.route({
        method: 'GET',
        path: '/brt_plaats/{bbox}',
        config: {
            description: 'Retrieves brt plaats based on bbox',
            notes: 'geo',
            tags: ['api'],
            validate: {
                params: {
                    bbox: Joi.string()
                            .required()
                            .description('bbox')
                }
            }
        },
        handler: function (request, reply) {
            var query = `SELECT ST_AsGeoJSON(brt.wkb_geometry) as geometry,
            brt.plaats_name,
            brt.brt_plaats_type,
            brt.inwoners
            FROM kadaster.brt_plaats brt
            WHERE brt.wkb_geometry && ST_MakeEnvelope(${request.params.bbox});`;
            db.query(query, function(err, result) {
                if (result) {
                    reply({'results':utils.toFeatureCollection(result.rows), 'responseCode':200});
                } else {
                    reply({'results':err, 'responseCode':0});
                }
            });                 
        }
    });

    next();

};


exports.register.attributes = {
    name: 'brt-route',
    version: '0.0.1'

};
