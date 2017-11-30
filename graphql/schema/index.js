const User = require('./user.js');

const Query = `
	type Query {
		getAllUsers: [User!]!
		getUser(username: String!): User
	}
`;

const Mutation = `
	type Mutation {
		createUser (username: String!, first_name:String! ,last_name:String!, email:String!, phone:String!) : String!
		updateUser (username: String!, password: String!, newPassword:String!) : User!
	    deleteUser (username: String!) : Int!
	    login(email: String!, password: String!): String!
		refreshTokens: String
		logout: Boolean
		impersonate: String
		verifyEmail: Boolean
		resetPassword: Boolean
		sendVerificationEmail: Boolean
		sendResetPasswordEmail: Boolean
	}
`;




module.exports = [Mutation, Query, User];