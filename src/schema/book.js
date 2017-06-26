const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql')

module.exports = new GraphQLObjectType({
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
