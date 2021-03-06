const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'User object for dc user',
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
    username: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    avatar_url: {
      type: GraphQLString
    },
    status: {
      type: GraphQLInt
    }
  })
})
