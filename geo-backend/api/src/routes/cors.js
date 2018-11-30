/*jslint node: true, esversion: 6 */
'use strict';
const req = require('request');
const Joi = require('joi');

exports.register = function (server, options, next) {
    //example: http://localhost:3003/rvo/?postcode=5611ra&housenumber=1&houseletter=BK4
    server.route({
        method: 'GET',
        path: '/cors/get/{url}',
        config: {
            description: 'Makes a request to url returning the response',
            notes: 'geo',
            tags: ['api'],
            validate: {
                params: {
                    url: Joi.string().required().description('url')
                }
            },
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: function (request, reply) {
        	const url = decodeURIComponent(request.params.url);
        	req(url, function (error, response, body) {
	  			reply(body);
			});
        }
    });

    next();

};

exports.register.attributes = {
    name: 'cors-route',
    version: '0.0.1'

};
