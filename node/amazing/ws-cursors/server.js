const {createServer} = require('http')
const express = require('express')
const {Server} = require('socket.io')

const positions = {}

// create express app
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer);

// serve your code
app.use(express.static('public'))

// listen on connection
io.on('connection', socket => {
  console.log('connection')
  socket.broadcast.emit('position', positions)
  socket.on('move', pos => {
    positions[socket.id] = pos
    socket.broadcast.emit('move', {
      pos,
      id: socket.id
    })
  })

  socket.on('disconnect', () => {
    delete positions[socket.id]
    socket.broadcast.emit('leave', socket.id)
  })
})

httpServer.listen(3000)