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
        // console.log(ctx, id)
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
        // const ids = Array(li).fill().map((_, i) => off + i)
        // console.log(ids)
        // return Promise.all(ids.map(id => post.load(id)))
        // const ids = await db.table('posts')
        //   .orderBy('created_at', 'desc')
        //   .limit(limit)
        //   .offset(offset)
        //   .select('id')
        // console.log(Array.from(ids, id => id.id))
        // return post.loadMany(Array.from(ids, id => id.id))
        return db.table('posts')
          .orderBy('created_at', 'desc')
          .limit(limit)
          .offset(offset)
      }
    }
  })
})

module.exports = query
