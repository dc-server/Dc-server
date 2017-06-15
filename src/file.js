import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
 } from 'graphql'

 export default new GraphQLObjectType({
   name: 'File',
   description: 'File object for gost',
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
     gist_id: {
       type: GraphQLInt
     },
     filename: {
       type: GraphQLString
     },
     content: {
       type: GraphQLString
     }
   })
 })
