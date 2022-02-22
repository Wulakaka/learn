const express = require("express")
const {createServer} = require('http')
const {Server} = require('socket.io')
const request = require('superagent')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static('public'))

let currentSong, dj;
const apiKey = ''

function elect(socket) {
  dj = socket;
  io.sockets.emit('announcement', socket.nickname + ' is the new dj')
  socket.emit('elected')
  socket.dj = true
  socket.on('disconnect', function () {
    dj = null
    io.sockets.emit('announcement', 'the dj left - next one join becomes dj')
  })
}

io.on('connection', socket => {
  console.log('someone connected')
  socket.on('join', function (name) {
    socket.nickname = name;
    socket.broadcast.emit('announcement', name + ' joined the chat.')
    if (!dj) {
      elect(socket)
    } else {
      socket.emit('song', currentSong)
    }
  })

  socket.on('text', (msg, fn) => {
    socket.broadcast.emit('text', socket.nickname, msg)
    // 确认消息已接收
    fn(Date.now())
  })

  socket.on('search', (q, fn) => {
    console.log(q)
    request('GET', 'http://tinysong.com/s/' + encodeURIComponent(q) + '?key=' + apiKey + '&format=json', function (res) {
      console.log(res)
      if (200 === res.status) fn(JSON.parse(res.text))
    })
  })

  socket.on('song', song => {
    if (socket.dj){
      currentSong = song
      socket.broadcast.emit('song', song)
    }
  })
})

httpServer.listen(3000)