const notes = '/users/joe/notes.txt'
const path = require('path')
console.log(path.dirname(notes),
    path.basename(notes),
    path.extname(notes))

console.log(path.basename(notes, path.extname(notes)))

const name = 'joe'
console.log(path.join('/', 'users', name, 'notes.txt'))

console.log(path.resolve('joe.txt'))
console.log(path.resolve('tmp', 'joe.txt'))
console.log(path.resolve('/etc', 'joe.txt'))
console.log(path.normalize('/users/joe/..//test.txt'))