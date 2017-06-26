import Dataloader from 'dataloader'
import axios from 'axios'
import db from './db'


function assignType(obj, type) {
  // eslint-disable-next-line no-param-reassign, no-underscore-dangle
  obj.__type = type;
  return obj;
}

function mapTo(keys, keyFn, type, rows) {
  if (!rows) return mapTo.bind(null, keys, keyFn, type)
  const group = new Map(keys.map(key => [key, null]))
  rows.forEach(row => group.set(keyFn(row), assignType(row, type)))
  return Array.from(group.values())
}


function User() {
  return new Dataloader(ids => db.table('users')
    .whereIn('id', ids)
    .select('*')
    .then(mapTo(ids, x => x.id, 'User'))
  )
}

function Gost() {
  return new Dataloader(ids => db.table('gists')
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

export default {
  create: () => ({
    user: User(),
    book: Book(),
    gost: Gost()
  })
}
