var Server = require('mongodb').Server,
	Db = require('mongodb').Db;
	config = require('../config.js');

module.exports = new Db(config.datanbaseName, new Server(config.databaseConnection, config.databasePort));

