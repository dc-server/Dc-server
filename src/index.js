const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const loader = require('./dataloader')

const app = express()

app.use('/graphql', graphqlHTTP(req => ({
  schema,
  context: {
    user: loader.user,
    book: loader.book,
    post: loader.post,
    ctx: 'zczc'
  },
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
