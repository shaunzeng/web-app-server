const resolvers = {
	Query : {
		Users: getUsers,
		Hello: () => {return 'hello world'}
	},
	Mutation: {
		createUser: createUser
	}
}

function getUsers(parent, agrs, context, info) {
	return user
}

function createUser(parent, args, context, info){
	return user;
}

const user = {
	username:'shaunzeng',
	firstName:'Shaun',
	lastName:'Zeng',
	email:'zengxiangxiang@gmail.com',
	phone:'7163080036',
	role:'admin'
}


module.exports = resolvers;