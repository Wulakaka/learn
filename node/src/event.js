const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('start', (start, end) =>{
    console.log('start', start, end)
})

eventEmitter.emit('start', 1, 10)