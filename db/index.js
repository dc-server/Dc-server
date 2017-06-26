const { up, down } = require('./create')

const args = process.argv
const command = args[args.length - 1]

switch (command) {
  case 'up':
    up()
    break
  case 'down':
    down()
    break
}
