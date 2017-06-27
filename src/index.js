const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress  } = require('graphql-server-express')
const schema = require('./schema')
const loader = require('./dataloader')

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {
    user: loader.user,
    book: loader.book,
    post: loader.post,
    video: loader.video,
    ctx: 'zczc'
  }
}))

if (ENV !== 'prod') {
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))
}

app.listen(PORT)

const status = {
  Express: {
    "Online": true,
    "Port": PORT
  }
}

if (ENV !== 'prod') {
  status.GraphiQL = {
    "url": `http://localhost:${PORT}/graphiql`
  }
}

console.dir(status, {depth: null, colors: true })
