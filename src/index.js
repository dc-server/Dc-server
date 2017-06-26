import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'
import loader from './dataloader'

const app = express()

app.use('/graphql', graphqlHTTP(req => ({
  schema,
  context: {
    ...loader.create(),
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
