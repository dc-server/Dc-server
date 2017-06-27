const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = require('graphql')
const db = require('../db')
const user = require('./user')
const book = require('./book')
const post = require('./post')
const video = require('./video')

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query schema',
  fields: () => ({
    user: {
      type: user,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, { id }, { user }) => {
        return user.load(id)
      }
    },
    book: {
      type: book,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, { id }, { book }) => book.load(id)
    },
    books: {
      type: new GraphQLList(book),
      args: {
        start: {
          type: GraphQLInt
        },
        offset: {
          type: GraphQLInt
        }
      },
      resolve: (root, { start, offset }, { book }) => {
        const st = start || 0
        const off = offset || 5
        const ids = Array(off).fill().map((_, i) => st + i)
        return book.loadMany(ids)
      }
    },
    post: {
      type: post,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, { id }, { post }) => post.load(id)
    },
    posts: {
      type: new GraphQLList(post),
      args: {
        limit: {
          type: GraphQLInt
        },
        offset: {
          type: GraphQLInt
        }
      },
      resolve: (root, { limit, offset }) => {
        const off = offset || 1
        const li = limit || 5
        return db.table('posts')
          .orderBy('created_at', 'desc')
          .limit(limit)
          .offset(offset)
      }
    },
    postsCount: {
      type: GraphQLInt,
      resolve: () => {
        return db.table('posts')
          .count()
          .then(x => x[0]['count(*)'])
      }
    },
    video: {
      type: video,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: (root, { id }, { video }) => video.load(id)
    },
    videos: {
      type: new GraphQLList(video),
      args: {
        limit: {
          type: GraphQLInt
        },
        offset: {
          type: GraphQLInt
        }
      },
      resolve: (root, { limit, offset }) => {
        const off = offset || 1
        const li = limit || 5
        return db.table('videos')
          .orderBy('created_at', 'desc')
          .limit(limit)
          .offset(offset)
      }
    },
    videosCount: {
      type: GraphQLInt,
      resolve: () => {
        return db.table('videos')
          .count()
          .then(x => x[0]['count(*)'])
      }
    }
  })
})

module.exports = query
