const User = require('./user.js');

const Query = `
	type Query {
		Users: User
		Hello: String!
	}
`;

const Mutation = `
	type Mutation {
		createUser (
			username:String
			firstName:String
			lastName:String
			email:String,
			phone:String
		) : User
	}
`;



module.exports = [Mutation, Query, User];