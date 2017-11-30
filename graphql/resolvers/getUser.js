var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var assert = require('assert');

var url = 'mongodb://localhost:27017/webapp';


function getUser(parent, args, context, info) {
	
	return new Promise(function(resolve, reject){
		var db = context.database;
		
		db.open(function(err, db){
			assert.equal(err, null);

			var collection = db.collection('users');

			collection
			.find({username: args[0]})	  
			 .toArray(function(err, docs){
			 	assert.equal(err, null);
				db.close();
				resolve(docs);
			});
		});
	});
}

module.exports = getUser;