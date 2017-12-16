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
		getUser: User,

		posts: [Post]
    	author(id: Int!): Author
		comments(postid: Int!): [Comment]
	}


	type Author {
	    id: Int!
	    firstName: String
	    lastName: String
	    posts: [Post] # the list of Posts by this author
	}

	type Comment {
		id: Int!
		title: String
		author: Author!
		post: Post
	}

    type Post {
	    id: Int!
	    title: String
	    author: Author
	    votes: Int
		comments: [Comment]
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
		upvotePost ( postId: Int!): Post
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