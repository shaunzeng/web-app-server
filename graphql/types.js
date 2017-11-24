const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLNonNull,
	GraphQLString
} = require('graphql');


module.exports = new GraphQLObjectType({
	name:'MeType',
	fields:{
		id:{type:GraphQLID},
		email:{type:new GraphQLNonNull(GraphQLString)}
	}
})