const getUser = require('./getUser.js');
const getAllUsers = require('./getAllUsers.js');
const assert = require('assert');
const bcrypt = require('bcrypt');

const resolvers = {
	Query : {
		getAllUsers: getAllUsers,
		getUser: getUser,
	},
	Mutation: {
		createUser: createUser,
		updateUser: updateUser, 
	    //eleteUser: Int!
	    login: login,
		//refreshTokens(accessToken: String!, refreshToken: String!): LoginReturn
		//logout(accessToken: String!): Boolean
		//impersonate(accessToken: String! username: String!): ImpersonateReturn
		//verifyEmail(token: String!): Boolean
		//resetPassword(token: String!, newPassword: String!): Boolean
		//sendVerificationEmail(email: String!): Boolean
		//sendResetPasswordEmail(email: String!): Boolean
	}
}


module.exports = resolvers;


function createUser(parent, args, context, info){
	return new Promise(function(resolve, reject){
		var db = context.database;

		db.open(function(err, db){
			assert.equal(err, null);

			var user = args;

			bcrypt.hash(user.password, 12, function(err, hash){
				console.log(user)
				assert.equal(err, null);
				user.password = hash;
				user.testField = [1,2,3];

				db
				.collection('users')
				.insertOne(args)
				.then(function(result){
					console.log(result);
					db.close();
					resolve('fake token');
				})
			});	
		});
	});
}


function updateUser(parent, args, context, info) {
	return new Promise(function(resolve, reject){
		var db = context.database;

		db.open(function(err, db){
			assert.equal(err, null);

			db
			.collection('user')
			.update(
				{'username':'shaunzeng'}, 
				{$set:{'phone':0000000000}},
				function(err, result){
					db.close();
					resolve(result);
				});
		});
	})
}




function login(parent, args, context, info){
	return new Promise(function(resolve, reject){
		var email = args['email'];
		var db = context.database;

		console.log(args);

		db.open(function(err, db){
			assert.equal(null, err);

			db
			.collection('users')
			.findOne({'email': email}, function(err, result){
				assert.equal(err, null);

				bcrypt.compare(args['password'], result['password'], function(err, hash){
					assert.equal(err, null);
					db.close();
					resolve('logged in');
				})
			});
		});
	});	  
}   