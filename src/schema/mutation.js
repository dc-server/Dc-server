import { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql'
import isLength from 'validator/lib/isLength'
import user from './user'
import db from '../db'

const inputFields = {
  username: {
    type: new GraphQLNonNull(GraphQLString)
  },
  password: {
    type: new GraphQLNonNull(GraphQLString)
  },
  email: {
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
        const { username, password } = args
        if (!isLength(username, { min: 4, max: 20 })){
          throw new Error(`username's length should in 4 ~ 20`)
        }
        if (!isLength(password, { min: 6, max: 20 })){
          throw new Error(`username's length should in 6 ~ 20`)
        }
        const id = await db.table('users').insert(args).returning('id')
        return user.load(id[0])
      }
    }
  }
})

export default Mutation
