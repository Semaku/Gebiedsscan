/*jslint node: true, esversion: 6 */
'use strict';
const async = require('async');
const Joi = require('joi');
const db = require('../../../middleware/database.js');

exports.register = function (server, options, next) {
    //example: http://localhost:3003/gebiedscan/project/test/interested-users
    server.route({
        method: 'GET',
        path: '/gebiedscan/project/{projectname}/interested-users',
        config: {
            description: 'Retrieves interestedusers for a specific project',
            tags: ['api'],
            validate: {
                params: {
                    projectname: Joi.string().required().description('projectname')
                }
            }
        },
        handler: function (request, reply) {
            var query = `SELECT * FROM kadaster.interested_users WHERE project_name = '${request.params.projectname}' LIMIT 1000;`;
            console.log(query)
            db.query(query, function(err, result) {
                console.log(result)
                reply({'results': result.rows, 'responseCode':200});
            });     
        }
    });

    server.route({
        method: 'POST',
        path: '/gebiedscan/project/interested-users',
        config: {
            description: 'Inserts an intersted user for a project',
        },
        handler: function (request, reply) {
            var data = request.payload;
            var query = `INSERT INTO kadaster.interested_users (email, project_name, first_name, last_name, public) 
            VALUES ('${ data.email }', '${ data.project_name }', '${ data.first_name }', '${ data.last_name }', ${ data.public });`;
            db.query(query, function(err, result) {
                if (result) {
                    reply({'results': result || err.error, 'responseCode':200});
                } else {
                    reply({error: err, 'responseCode':500});
                }
                
            });     
        }
    });

    next();

};

exports.register.attributes = {
    name: 'interested_users',
    version: '0.0.1'

};
