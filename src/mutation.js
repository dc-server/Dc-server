import { GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql'
import user from './user'
import db from './db'

const inputFields = {
  username: {
    type: GraphQLString
  },
  password: {
    type: GraphQLString
  }
}

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: user,
      args: inputFields,
      resolve: async (root, args, { user }) => {
        const id = await db.table('users').insert(args).returning('id')
        return user.load(id[0])
      }
    }
  }
})

export default Mutation
