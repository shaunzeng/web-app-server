var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var assert = require('assert');

var url = 'mongodb://localhost:27017/webapp';



function getAllUsers(parent, agrs, context, info) {
	return new Promise(function(resolve, reject){
		var db = context.database;
		
		db.open(function(err, db){
			var collection = db.collection('users');

			collection
			.find({})
			.toArray(function(err, docs){
				db.close();
				resolve(docs);
			});
		});
	});
}

module.exports = getAllUsers;

