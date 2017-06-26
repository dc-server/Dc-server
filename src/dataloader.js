const Dataloader = require('dataloader')
const axios = require('axios')
const db = require('./db')

function User() {
  return new Dataloader(ids => db.table('users')
    .whereIn('id', ids)
    .select('*')
  )
}

function Book() {
  return new Dataloader(ids => axios.all(ids.map(id => {
    const url = `http://graphql-mock.getsandbox.com/book/${id}`
    return axios.get(url)
      .then(res => res.data)
  })))
}

module.exports = {
  user: User(),
  book: Book()
}
