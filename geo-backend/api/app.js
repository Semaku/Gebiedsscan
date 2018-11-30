/*jslint node: true, esversion: 6 */
'use strict';
require('dotenv').config();
const async = require('async');
const Hapi = require('hapi');
const Joi = require('joi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const HapiQueryFilter = require('hapi-query-filters');
const Pack = require('./package');
const constants = require('./src/config/constants');
const server = new Hapi.Server();

server.connection({ 
    port: constants.application['port'],
        routes: {
            cors: true
    }}
);

server.register(
    [{
        register: require('./src/routes/bijgebouw.js'),
        options: { message: 'bijgebouw' }
    },
    {
        register: require('./src/routes/rapport.js'),
        options: { message: 'rapport' }
    },
    {        
        register: require('./src/routes/brt.js'),
        options: { message: 'energielabels' }    
    },
    {
        register: require('./src/routes/sbi.js'),
        options: { message: 'sbi' }
    },
    {
        register: require('./src/routes/cbs.js'),
        options: { message: 'cbs' }
    },
    {
        register: require('./src/routes/asbest.js'),
        options: { message: 'asbest' }
    },
    {
        register: require('./src/routes/rce.js'),
        options: { message: 'rce' }
    },
    {
        register: require('./src/routes/rvo.js'),
        options: { message: 'rvo' }
    },
    {
        register: require('./src/routes/gebiedsscan/projects/interested_users.js'),
        options: { message: 'interested_users' }
    },
    {
        register: require('./src/routes/gebiedsscan/projects/projects.js'),
        options: { message: 'projects' }
    },
    {
        register: require('./src/routes/cors.js'),
        options: { message: 'cors' }
    }]
);

const options = {
    info: {
        'title': 'Kadaster API',
        'version': Pack.version

    },
    'documentationPath': '/api-doc'
};

server.register([
    Inert,
    Vision,
    {
        'register': HapiSwagger,
        'options': options
    },
    {
        'register': HapiQueryFilter
    }], (err) => {
        server.start( (err) => {
           if (err) {
                console.log(err);
            } else {
                console.log('Server running at:', server.info.uri);
            }
        });
    }
);

server.route({
    method: 'GET',
    path: '/',

    handler: function (request, reply) {

          reply('hey');

      }
});
