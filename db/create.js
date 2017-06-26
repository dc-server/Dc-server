const db = require('../src/db')

function up() {
  await db.schema.createTable('users', t => {
    t.increments('id').primary()
    t.string('username', 100)
    t.string('password', 100)
    t.string('email', 50)
    t.string('avatar_url', 200)
    t.timestamps()
    t.unique('username')
  })
}

function down() {
  await db.schema.dropTableIfExists('users')
}

module.exports = {
  up,
  down
}
