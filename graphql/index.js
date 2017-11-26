const { makeExecutableSchema } = require('graphql-tools');
const schema = require('./schema');
const resolvers = require('./resolvers');


const graphqlSchema = makeExecutableSchema({
	typeDefs:schema,
	resolvers:resolvers
})

module.exports = graphqlSchema;
