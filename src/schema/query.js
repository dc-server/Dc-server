const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = require('graphql')
const user = require('./user')
const book = require('./book')

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
        console.log(ctx)
        return user.load(id)
      }
    },
    users: {
      type: new GraphQLList(user),
      args: {
        ids: {
          type: new GraphQLList(GraphQLInt)
        }
      },
      resolve: (root, { ids }, { user }) => user.loadMany(ids)
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
    }
  })
})

module.exports = query
