/*jslint node: true, esversion: 6 */
'use strict';
const async = require('async');
const Joi = require('joi');
const db = require('../middleware/database.js');
const utils = require('../util/utils.js');
const dummyData = require('../../dummy-data.js');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/archeologicalMonuments/{polygon}',
        handler: function (request, reply) {
            reply.proxy({
                host: 'https://services.rce.geovoorziening.nl/rce/wfs?request=GetFeature&service=WFS&typeName=rce:ArcheologicalMonuments&count=100&outputFormat=json&srsName=EPSG%3A28992&cql_filter=WITHIN(the_geom,POLYGON((149755.861%20464579.581%2C149754.589%20464576.035%2C149751.847%20464568.412%2C149782.303%20464548.21%2C149791.013%20464571.425%2C149780.902%20464574.986%2C149779.199%20464570.355%2C149776.327%20464571.434%2C149771.21%20464573.471%2C149771.085%20464573.116%2C149763.534%20464576.117%2C149760.155%20464577.872%2C149755.861%20464579.581)))',
                port: 80,
                protocol: 'https'
            });
        },
        config: {
            description: 'Gets archeological monuments within an area',
            notes: 'geo',
            tags: ['api'],
            validate: {
                params: {
                    polygon: Joi.string().required().description('polygon')
                }
            }
        },
    });

    next();
};

exports.register.attributes = {
    name: 'RCE-route',
    version: '0.0.1'
};