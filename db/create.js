const db = require('../src/db')

async function up() {
  await db.schema.createTable('users', t => {
    t.increments('id').primary()
    t.string('username', 100)
    t.string('password', 100)
    t.string('email', 50)
    t.string('avatar_url', 200)
    t.timestamps()
    t.integer('status').defaultTo(1)
    t.unique('username')
  })
  await db.schema.createTable('posts', t => {
    t.increments('id').primary()
    t.string('title', 200)
    t.text('description')
    t.text('content')
    t.integer('author_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
    t.integer('status').defaultTo(1)
    t.timestamps()
    t.unique('title')
  })
  console.log('done')
  process.exit(0)
}

async function down() {
  await db.schema.dropTableIfExists('users')
  await db.schema.dropTableIfExists('posts')
  console.log('done')
  process.exit(0)
}

module.exports = {
  up,
  down
}
