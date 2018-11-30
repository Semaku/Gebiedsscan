/*jslint node: true, esversion: 6 */
'use strict';

const pg = require('pg');
const constants = require('../config/constants.js');
// const pgConfig = {
//   // host: 'sou870.so.kadaster.nl',
//   host: 'kadaster-db',
//   // host: 'localhost', //localhost conf
//   user: 'postgres', //env var: PGUSER
//   database: 'omgevingswet', //env var: PGDATABASE
//   password: 'postgres', //env var: PGPASSWORD
//   port: 5432, //env var: PGPORT
//   // port: 2345, //localhost conf
//   max: 30, // max number of clients in the pool
//   idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
// };
console.log(constants.database)
const pools = {
  default: new pg.Pool(constants.database),
  gebiedsscan: new pg.Pool(Object.assign(constants.database, {
    database: 'gebiedsscan'
  })),
}

module.exports = {
   query: function(text, cb, options = {database: 'default'}, arr) {
      let pool = pools[options.database];
      pool.connect(function(err, client, done) {
        client.query(text, arr, function(err, result) {
          done();
          cb(err, result);
      });
      });
   }
};
