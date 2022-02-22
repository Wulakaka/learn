const express = require('express')
const {createServer} = require("http");
const {Server} = require("socket.io");
// create express app
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);

// server your code
app.use(express.static('public'))

// listen on connections
io.on('connection', function (socket) {
  socket.on('message', function (msg) {
    console.log('\033[96mgot:\033[39m ' + msg)
    socket.emit('message', 'pong')
  })
})

// listen
httpServer.listen(3000)