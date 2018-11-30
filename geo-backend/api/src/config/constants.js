"use strict";

module.exports = function() {

	var dbContants = databaseConfig();
	var appConstants = applicationConfig();

	var obj = {
		application : {			
			port : appConstants['port'],
		},
		database : {
			host     : dbContants['host'],
			port     : dbContants['port'], //env var: PGPORT
			user     : dbContants['user'],
			password : dbContants['password'],
			database : dbContants['database'],
  			max: 30, // max number of clients in the pool
  			idleTimeoutMillis: 30000 
		},
		server : {
			defaultHost : 'http://localhost:8001'
		}		
	};

	if (!obj.application['port']) {
		throw new Error('Missing constant application.port. ' +
			'Check your enviroment variable NODE_PORT.');
	} else if (!obj.database['host']) {
		throw new Error('Missing constant database.host. ' +
			'Check your enviroment variables.');
	} else if (!obj.database['user']) {
		throw new Error('Missing constant database.user. ' +
			'Check your enviroment variables.');
	} else if (!obj.database['password']) {
		throw new Error('Missing constant database.password. ' +
			'Check your enviroment variables.');
	} else if (!obj.database['database']) {
		throw new Error('Missing constant database.database. ' +
			'Check your enviroment variables.');
	}

	return obj;

	function databaseConfig(){
		return {
			'host' : process.env.DB_HOST,
			'port' : process.env.DB_PORT,
			'user' : process.env.DB_USER,
			'password' : process.env.DB_PASS,
			'database' : process.env.DB_NAME
		};
	}

	function applicationConfig(){
		return {				
			'port' : process.env.NODE_PORT
			
		};
	}

}();