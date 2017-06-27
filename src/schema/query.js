const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = require('graphql')
const db = require('../db')
const user = require('./user')
const book = require('./book')
const post = require('./post')

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query schema',
  fields: () => ({
    user: {
      type: user,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, { id }, { user, ctx }) => {
        return user.load(id)
      }
    },
    book: {
      type: book,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, { id }, { book }) => book.load(id)
    },
    books: {
      type: new GraphQLList(book),
      args: {
        start: {
          type: GraphQLInt
        },
        offset: {
          type: GraphQLInt
        }
      },
      resolve: (root, { start, offset }, { book }) => {
        const st = start || 0
        const off = offset || 5
        const ids = Array(off).fill().map((_, i) => st + i)
        return book.loadMany(ids)
      }
    },
    post: {
      type: post,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, { id }, { post }) => post.load(id)
    },
    posts: {
      type: new GraphQLList(post),
      args: {
        limit: {
          type: GraphQLInt
        },
        offset: {
          type: GraphQLInt
        }
      },
      resolve: async (root, { limit, offset }, { post }) => {
        const off = offset || 1
        const li = limit || 5
        return db.table('posts')
          .orderBy('created_at', 'desc')
          .limit(limit)
          .offset(offset)
      }
    }
  })
})

module.exports = query
