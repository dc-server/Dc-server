const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress  } = require('graphql-server-express')
const schema = require('./schema')
const loader = require('./dataloader')
const db = require('./db')
const { compare } = require('./utils')

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV

const app = express()

app.post('/login', bodyParser.json(), async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.json({
      status: 100,
      data: 'username and password are required!'
    })
  }
  let user
  try {
    user = await db.table('users')
      .where('username', username)
      .select('id', 'username', 'password', 'avatar_url', 'email')
  } catch (err) {
    return res.json({
      status: 500,
      data: err.message
    })
  }
  if (user.length === 0) {
    return res.json({
      status: 101,
      data: 'user not exists!'
    })
  }
  user = user[0]
  let validate
  try {
    validate = await compare(password, user.password)
  } catch(err) {
    return res.json({
      status: 500,
      data: err.message
    })
  }
  if (!validate) {
    return res.json({
      status: 102,
      data: 'password not match!'
    })
  }
  delete user.password
  res.json({
    status: 200,
    data: user
  })
})

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {
    // me: user,
    user: loader.user,
    book: loader.book,
    post: loader.post,
    video: loader.video
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
