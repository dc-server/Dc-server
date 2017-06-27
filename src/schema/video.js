const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql')

const user = require('./user')

module.exports = new GraphQLObjectType({
  name: 'Video',
  description: 'video',
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
    link: {
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
      resolve: (video, root, { user }) => user.load(video.author_id)
    },
    status: {
      type: GraphQLInt
    }
  })
})
