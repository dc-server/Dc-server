import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
 } from 'graphql'

 export default new GraphQLObjectType({
   name: 'Book',
   description: 'book',
   fields: () => ({
     id: {
       type: GraphQLInt
     },
     title: {
       type: GraphQLString
     },
     price: {
       type: GraphQLInt
     }
   })
 })
