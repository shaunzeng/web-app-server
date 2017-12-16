const getUser = require('./getUser.js');
const getAllUsers = require('./getAllUsers.js');
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PubSub = require('graphql-subscriptions').PubSub;
const createUser = require('./createUser.js');
const updateUser = require('./updateUser.js');
const login = require('./login.js');
const {filter, find} = require('lodash');
const DataLoader = require('dataloader');
const {authors, posts, comments} = require('../../database/test.js');




var postLoader = new DataLoader(keys => {
	var pro = new Promise(function(resolve, reject) {
		var collection = [];

		keys.forEach((val, idx) => {
			var comment = filter(comments, {'postId': val});
			collection.push(comment);
		})
		resolve(collection);
	});

	return pro
});



const pubsub = new PubSub();
console.log(pubsub.asyncIterator, ' pubsub');
const USER_ADDED = 'USER_ADDED';




const resolvers = {
	Query : {
		getAllUsers: getAllUsers,
		getUser: getUser,
		posts: getPosts,
	    author: getAuthor,
	    comments:getComments

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
		 upvotePost: (_, { postId }) => {
	      const post = find(posts, { id: postId });
	      if (!post) {
	        throw new Error(`Couldn't find post with id ${postId}`);
	      }
	      post.votes += 1;
	      return post;
	    },
	},
	Subscription:{
		userAdded: {
			subscribe: function(){ return pubsub.asyncIterator(USER_ADDED)}
		}
	},
	Author: {
	   // posts: (author) => filter(posts, { authorId: author.id }),
	   posts:authorPosts,
	  },
	Post: { 
	    author: postAuthor,
	    comments:({id}, args, context) =>{ 
	    	console.log('request comments');
	     return	postLoader.load(id)},
	},
	Comment: {
	    author: commentAuthor
	}
}


module.exports = resolvers;


function getPosts(){
	console.log('get all posts');
	return posts;
}

function getAuthor(parent, args) {
	console.log('get author');
	return find(authors, {id:args.id});
}

function getComments(parent, args){
	console.log('get Comments');
	return find(comments, {postId: args.postid});
}

function authorPosts(author){
	console.log('author post');
	return filter(posts, {authorId: author.id});
}

function postAuthor(post) {
	console.log('post author');
	return find(authors, {id: post.authorId});
}

function postComments(post) {
	console.log('post comments');
	return filter(comments, {postId:post.id});
}

function commentAuthor(comment) {
	console.log('comment author');
	return find(authors,{id:comment.postId});
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