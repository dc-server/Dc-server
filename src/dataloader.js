const Dataloader = require('dataloader')
const axios = require('axios')
const db = require('./db')

function assignType(obj, type) {
  // eslint-disable-next-line no-param-reassign, no-underscore-dangle
  obj.__type = type;
  return obj;
}

function mapTo(keys, keyFn, type, rows) {
  if (!rows) return mapTo.bind(null, keys, keyFn, type);
  const group = new Map(keys.map(key => [key, null]));
  rows.forEach(row => group.set(keyFn(row), assignType(row, type)));
  return Array.from(group.values());
}

function mapToMany(keys, keyFn, type, rows) {
  if (!rows) return mapToMany.bind(null, keys, keyFn, type);
  const group = new Map(keys.map(key => [key, []]));
  rows.forEach(row => group.get(keyFn(row)).push(assignType(row, type)));
  return Array.from(group.values());
}

function mapToValues(keys, keyFn, valueFn, rows) {
  if (!rows) return mapToValues.bind(null, keys, keyFn, valueFn);
  const group = new Map(keys.map(key => [key, null]));
  rows.forEach(row => group.set(keyFn(row), valueFn(row)));
  return Array.from(group.values());
}

function User() {
  return new Dataloader(ids => db.table('users')
    .whereIn('id', ids)
    .select('*')
    .then(mapTo(ids, x => x.id, 'User'))
  )
}

function Post() {
  return new Dataloader(ids => db.table('posts')
    .whereIn('id', ids)
    .select('*')
    .then(mapTo(ids, x => x.id, 'Post'))
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
  book: Book(),
  post: Post()
}
