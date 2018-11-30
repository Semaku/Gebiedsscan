/*jslint node: true, esversion: 6 */
'use strict';
const async = require('async');
const Joi = require('joi');
const db = require('../middleware/database.js');
const utils = require('../util/utils.js');
const dummyData = require('../../dummy-data.js');

exports.register = function (server, options, next) {

    var allowedUsers = [
        {username: 'asbestdata', password: 'semakuser'}
    ];
    // 
    var handlers = {
        getPandenWithAsbestInBbox: function (request, reply) {
            var data = request.payload;
            var usersFound = [];
            
            for (var i = 0, len = allowedUsers.length; i < len; i++) {
                if (allowedUsers[i].username === data.username && allowedUsers[i].password === data.password) {
                    usersFound.push(data);
                }
            }

            if (!usersFound.length) {
                reply({
                    'error': 'Not Allowed',
                    'responseCode': 403
                });
            }

            var query = `SELECT ST_AsGeoJSON(p.wkb_geometry) as geometry, p.aanwezig, p.gesaneerd, CAST(p.build_year as int)
            from kadaster.panden_asbest_soest p
            WHERE p.wkb_geometry && ST_MakeEnvelope(${request.params.bbox});`
            console.log(query);
            db.query(query, function (err, result) {
                reply({
                    'results': utils.toFeatureCollection(result.rows),
                    'responseCode': 200
                });
            });
        },
        getPandAsbest: function (request, reply) {
            
            var query =`SELECT ST_AsGeoJSON(p.wkb_geometry) as geometry, s.aanwezig, s.gesaneerd, CAST(p.build_year as int)
            from kadaster.panden p
            INNER JOIN soest.asbest s
            ON lower(concat(p.streetname, ' ', p.housenumber_, p.houseletter)) = lower(s.adres)
            WHERE LOWER(s.adres) = LOWER('${request.params.address}')
            AND LOWER(s.plaats) = LOWER('${request.params.plaats}')
            AND LOWER(s.postcode) = LOWER('${request.params.postcode}')
            LIMIT 1`
            
            db.query(query, function (err, result) {
                reply({
                    'result': utils.toFeatureCollection(result.rows),
                    'responseCode': 200
                });
            });
        }
    }

    server.route([{
            method: 'POST',
            path: '/asbestpanden/{bbox}',
            handler: handlers.getPandenWithAsbestInBbox,
            config: {
                description: 'Retrieves panden in bbox containing asbest information (supporting only soest atm)',
                notes: 'geo',
                tags: ['api'],
                validate: {
                    params: {
                        bbox: Joi.string().required().description('bbox')
                    }
                }
            },
        },
        {
            method: 'GET',
            path: '/asbest/{address}/{postcode}/{plaats}',
            handler: handlers.getPandAsbest,
            config: {
                description: 'Retrieves asbest data for an especific panden',
                notes: 'geo',
                tags: ['api'],
                validate: {
                    params: {
                        address: Joi.string().required().description('address'),
                        postcode: Joi.string().required().description('postcode'),
                        plaats: Joi.string().required().description('plaats')
                    }
                }
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'asbest-route',
    version: '0.0.1'
};