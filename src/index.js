import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
 } from 'graphql'
import express from 'express'
import graphqlHTTP from 'express-graphql'

import Mutation from './mutation'
import loader from './dataloader'
import user from './user'
import book from './book'
import gost from './gost'

const app = express()

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
      resolve: (root, { id }, { user }) => user.load(id)
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

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
})

app.use('/graphql', graphqlHTTP(req => ({
  schema: schema,
  context: { ...loader.create() },
  graphiql: true
})))

app.listen(3000)

const status = {
  Express: {
    "Online": true,
    "Port": 3000
  },
  "GraphiQL": {
    "url": "http://localhost:3000/graphql"
  }
}
console.dir(status, {depth: null, colors: true })
