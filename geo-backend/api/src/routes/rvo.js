/*jslint node: true, esversion: 6 */
'use strict';
const async = require('async');
const Joi = require('joi');
const db = require('../middleware/database.js');
const utils = require('../util/utils.js');

exports.register = function (server, options, next) {
    //example: http://localhost:3003/rvo/?postcode=5611ra&housenumber=1&houseletter=BK4
    server.route({
        method: 'GET',
        path: '/rvo/',
        config: {
            description: 'Retrieves rvo data for an specific address',
            notes: 'geo',
            tags: ['api'],
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
            if (request.query.filter.houseletter) {
                filters += `AND LOWER(kadaster.rvo.house_letter) = LOWER('${request.query.filter.houseletter}')`;
            }
            if(request.query.filter.postcode && request.query.filter.housenumber) {        
                var query = `SELECT * 
                FROM kadaster.rvo
                WHERE LOWER(kadaster.rvo.postcode) = LOWER('${request.query.filter.postcode}')
                AND CAST(kadaster.rvo.house_nr AS int) = ${request.query.filter.housenumber} ${filters}`;
                db.query(query, function(err, result) {
                    reply({'result':result.rows[0], 'responseCode':0});
                });
            } else {
                reply({'result':'not found', 'responseCode':404});
            }
        }
    });

    next();

};

exports.register.attributes = {
    name: 'rvo-route',
    version: '0.0.1'

};
