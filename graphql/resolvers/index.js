const getUser = require('./getUser.js');
const getAllUsers = require('./getAllUsers.js');
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PubSub = require('graphql-subscriptions').PubSub;

const pubsub = new PubSub();
console.log(pubsub.asyncIterator, ' pubsub');
const USER_ADDED = 'USER_ADDED';

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
	},
	Subscription:{
		userAdded: {
			subscribe: function(){ return pubsub.asyncIterator(USER_ADDED)}
		}
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
			.findOne({'email': email}, function(err, user){
				assert.equal(err, null);

				bcrypt.compare(args['password'], user['password'], function(err, hash){
					assert.equal(err, null);
					db.close();

					delete user['password'];

					const token = jwt.sign({
						me:user
					}, context.secret,{
						expiresIn:'1y'
					});

					resolve(token);
				})
			});
		});
	});	  
}   

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteW5hbWUiOiJoZWxsb2tpdHR5QGdtYWlsLmNvbSIsImlhdCI6MTUxMjAxODk1NiwiZXhwIjoxNTQzNTc2NTU2fQ.iw8PoCVWGo8d510E4C0hSyrPDyTIO3n4FNn6M1tqXog


function userAdded(){
	return pubsub.asyncIterator(USER_ADDED);
}

var count = 0;


/*
setInterval(function(){
	pubsub.publish(USER_ADDED,{userAdded:{id:count++}});
	console.log('published ..', count);
}, 800);
*/