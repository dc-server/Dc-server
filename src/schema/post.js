const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql')

const user = require('./user')

module.exports = new GraphQLObjectType({
  name: 'Post',
  description: 'post',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    created_at: {
      type: GraphQLString
    },
    updated_at: {
      type: GraphQLString
    },
    author: {
      type: user,
      resolve: (post, root, { user }) => user.load(post.author_id)
    },
    status: {
      type: GraphQLInt
    }
  })
})
