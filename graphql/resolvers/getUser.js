var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var assert = require('assert');

var url = 'mongodb://localhost:27017/webapp';


function getUser(parent, args, context, info) {

	if (!context.user) {
		throw new Error('not logged in');
	} 
	
	return new Promise(function(resolve, reject){
		var db = context.database;

		db.open(function(err, db){
			db
			.collection('users')
			.findOne({'email':context.user['email']}, function(err, user){
				db.close();
				resolve(user);
			})
		})
	});
}

module.exports = getUser;