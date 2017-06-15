import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
 } from 'graphql'

 import user from './user'

 export default new GraphQLObjectType({
   name: 'Gost',
   description: 'Gost object for gost',
   fields: () => ({
     id: {
       type: GraphQLInt
     },
     created_at: {
       type: GraphQLString
     },
     updated_at: {
       type: GraphQLString
     },
     deleted_at: {
       type: GraphQLString
     },
     user_id: {
       type: GraphQLInt
     },
     public: {
       type: GraphQLInt
     },
     description: {
       type: GraphQLString
     },
     version: {
       type: GraphQLInt
     },
     hash: {
       type: GraphQLString
     },
     user: {
       type: user,
       resolve: (gost, root, {user}) => user.load(gost.user_id)
     }
   })
 })
