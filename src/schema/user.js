const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'User object for gost user',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    created_at: {
      type: GraphQLString
    },
    updated_at: {
      type: GraphQLString
    },
    deleted_at: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  })
})
