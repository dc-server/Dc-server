const { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql')
const isLength = require('validator/lib/isLength')
const user = require('./user')
const db = require('../db')
const { hash, compare } =  require('../utils')

const registerFields = {
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

const loginFields = {
  username: {
    type: new GraphQLNonNull(GraphQLString)
  },
  password: {
    type: new GraphQLNonNull(GraphQLString)
  }
}

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      type: user,
      args: registerFields,
      resolve: async (root, args, { user }) => {
        const { username, password } = args
        if (!isLength(username, { min: 4, max: 20 })){
          throw new Error(`username's length should in 4 ~ 20`)
        }
        if (!isLength(password, { min: 6, max: 20 })){
          throw new Error(`password's length should in 6 ~ 20`)
        }
        try {
          args.password = await hash(args.password)
        } catch (err) {
          throw err
        }
        const id = await db.table('users').insert(args).returning('id')
        return user.load(id[0])
      }
    },
    login: {
      type: user,
      args: loginFields,
      resolve: async (root, { username, password }) => {
        const user = await db.table('users')
          .where('username', username)
          .select('*')
        if (user.length === 0) {
          throw new Error(`user not exists!`)
        }
        const res = await compare(password, user[0].password)
        if (!res) {
          throw new Error(`password not match!`)
        }
        return user[0]
      }
    }
  }
})

module.exports = Mutation
