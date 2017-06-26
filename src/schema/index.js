import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} from 'graphql'
import Mutation from './mutation'
import loader from '../dataloader'
import user from './user'
import book from './book'
import gost from './gost'

const rootQuery = new GraphQLObjectType({
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
    gost: {
      type: gost,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, { id }, { gost }) => gost.load(id)
    }
  })
})

export default new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
})
