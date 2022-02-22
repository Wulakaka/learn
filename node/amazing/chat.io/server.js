const express = require("express")
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static('public'))

io.on('connection', socket => {
  console.log('someone connected')
  socket.on('join', function (name) {
    socket.nickname = name;
    socket.broadcast.emit('announcement', name + ' joined the chat.')
  })

  socket.on('text', (msg, fn) => {
    socket.broadcast.emit('text', socket.nickname, msg)
    // 确认消息已接收
    fn(Date.now())
  })
})

httpServer.listen(3000)