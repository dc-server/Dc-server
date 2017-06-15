import knex from 'knex'

const db = knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'zc',
    password : process.env.DB_PASSWORD,
    database : 'gost'
  }
})

export default db
