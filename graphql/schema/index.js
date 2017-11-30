const Subscription = `

	type Subscription {
	    userAdded: Result!
	}

	type Result {
		id: Int!
	}
`;

const Query = `

	type User {
		username: String
		password: String
		first_name: String
		last_name: String
		email: String
		phone: String
		role: String
	}

	type Query {
		getAllUsers: [User!]!
		getUser: User
	}

`;

const Mutation = `
	type Mutation {
		createUser (username: String!, first_name:String! ,last_name:String!, email:String!, phone:String!, password:String!) : String!
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

const Schema = `
	schema {
		query: Query
		mutation: Mutation
		subscription: Subscription
	}
`;




module.exports = [Schema, Mutation, Query, Subscription];