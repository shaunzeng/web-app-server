const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLString
} = require('graphql');


const MeType = require('./types.js');

const RootQueryType = new GraphQLObjectType({
	name:'RootQueryType',

	fields:{
		me:{
			type:MeType,
			description:'this is graphql test query',
			args:{
				id:{type:new GraphQLNonNull(GraphQLString)},
				email:{type: new GraphQLNonNull(GraphQLString)}
			},
			resolve: function(obj, args, ctx){
				return {
					id:args['id'],
					email:'zeng@gmail.com' + args['id']
				}
			}
		}
	}
})


const RootMutationType = new GraphQLObjectType({
	name:'RootMutationType',
	fields:{
		changeData:{
			type:MeType,
			description:'this is graphql test mutaton',
			args:{
				id:{type: new GraphQLNonNull(GraphQLString)},
				email:{type: new GraphQLNonNull(GraphQLString)}
			},
			resolve:function(source, args, ctx,info){
				console.log(source, ctx, info);
				return {
					id:args['id'] + 'mutation',
					email:args['email']
				}
			}
		},
		testData:{
			type:MeType,
			description:'this is graphql test mutaton test data',
			args:{
				id:{type: new GraphQLNonNull(GraphQLString)},
				email:{type: new GraphQLNonNull(GraphQLString)}
			},
			resolve:function(source, args, ctx,info){
				console.log(source, ctx, info);
				return {
					id:args['id'] + 'mutation test data',
					email:args['email'] + 'mutation test data haha'
				}
			}
		}
	}
})

const ncSchema = new GraphQLSchema({
	query:RootQueryType,
	mutation:RootMutationType
})



module.exports = ncSchema;