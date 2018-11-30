/*jslint node: true, esversion: 6 */
'use strict';
const async = require('async');
const Joi = require('joi');
const db = require('../middleware/database.js');
const utils = require('../util/utils.js');
const sbi_rules = require('../data/sbi_rules.json');
const breweries = require('../data/breweries.json');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/sbi/business/name/{qfilter}',
        config: {
            description: 'Retrieves kvk businesses geo points and info based on its name',
            notes: 'geo',
            tags: ['api'],
            validate: {
                params: {
                    qfilter: Joi.string()
                        .required()
                        .description('qfilter')
                }
            }
        },
        handler: function (request, reply) {
            var query = `SELECT DISTINCT ON (p.pand_id) vg_nr, bedrijfsnaam, kvknummer, sbi, straat || ' ' || huisnummer || ' '|| toevoeging || ', ' || postcode || ', ' || woonplaats as address, ST_AsGeoJSON(ST_Centroid(p.wkb_geometry)) as geometry
                FROM kadaster.panden  p
                LEFT JOIN kadaster.kvk kvk 
                    ON p.post_code = kvk.postcode 
                    AND CAST(p.housenumber_ AS int) = kvk.huisnummer
                JOIN kadaster.sbi_2008 sbi
                    On sbi.sbi_code = kvk.sbi
                WHERE LOWER(sbi.omschrijving) LIKE LOWER('%${request.params.qfilter}%');`;


            db.query(query, function (err, result) {
                reply({
                    'results': result.rows.map(function (item) {
                        item.geometry = JSON.parse(item.geometry);
                        return item;
                    }), 'responseCode': 200
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/sbi/business/code/{sbicode}',
        config: {
            description: 'Retrieves kvk businesses geo points and info based on its code',
            notes: 'geo',
            tags: ['api'],
            validate: {
                params: {
                    sbicode: Joi.string()
                        .required()
                        .description('sbicode')
                }
            }
        },
        handler: function (request, reply) {
            var query = `SELECT DISTINCT ON (p.pand_id) vg_nr, bedrijfsnaam, kvknummer, sbi, straat || ' ' || huisnummer || ' '|| toevoeging || ', ' || postcode || ', ' || woonplaats as address, ST_AsGeoJSON(ST_Centroid(p.wkb_geometry)) as geometry
                FROM kadaster.panden  p
                LEFT JOIN kadaster.kvk kvk 
                    ON p.post_code = kvk.postcode 
                    AND CAST(p.housenumber_ AS int) = kvk.huisnummer
                JOIN kadaster.sbi_2008 sbi
                    On sbi.sbi_code = kvk.sbi
                WHERE sbi.sbi_code = ${request.params.sbicode}`;

            db.query(query, function (err, result) {
                reply({
                    'results': result.rows.map(function (item) {
                        item.geometry = JSON.parse(item.geometry);
                        return item;
                    }), 'responseCode': 200
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/sbi/search/2008/{qfilter}',
        config: {
            description: 'Retrieves sbi list 2008 filtered by sbi name or code',
            notes: 'geo',
            tags: ['api'],
            validate: {
                params: {
                    qfilter: Joi.string()
                        .required()
                        .description('qfilter')
                }
            }
        },
        handler: function (request, reply) {
            var query = `SELECT * 
            FROM kadaster.sbi_2008 sbi
            WHERE LOWER(sbi.omschrijving) LIKE LOWER('%${request.params.qfilter}%')
            OR CAST(sbi.sbi_code AS TEXT) LIKE '%${request.params.qfilter}%';`;

            db.query(query, function (err, result) {
                reply({
                    'results': result.rows,
                    'responseCode': 200
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/sbi/rules/{sbicode}',
        config: {
            description: 'Retrieves rules based on sbi code',
            notes: 'geo',
            tags: ['api'],
            validate: {
                params: {
                    sbicode: Joi.string()
                        .required()
                        .description('sbicode')
                }
            }
        },
        handler: function (request, reply) {
            reply({
                'result': sbi_rules.filter(function(item){
                    if (request.params.sbicode == item["SBI-2008"] || request.params.sbicode == item["SBI-1993"]) {
                        return item;
                    }
                })[0] || null,
                'responseCode': 200
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/breweries',
        config: {
            description: 'Retrieves breweries in the netherlands',
            notes: 'geo',
            tags: ['api']
        },
        handler: function (request, reply) {
            reply({
                'results': breweries,
                'responseCode': 200
            });
        }
    });

    next();

};

exports.register.attributes = {
    name: 'sbi-route',
    version: '0.0.1'

};
