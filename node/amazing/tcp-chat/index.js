var net = require('net')

// 记录连接数
let count = 0

// 记录连接的用户
const users = {}
// 创建服务
var server = net.createServer(function (conn) {
  // 一个连接的所有状态
  console.log('\033[90m   new connection!\033[39m')
  conn.write(
    '\n > welcome to \033[92mnode-chat\033[39m!'
    + '\r\n > ' + count + ' other people are connected at this time.'
    + '\r\n > please write your name and press enter: '
  )
  // 连接数递增
  count++

  // 设置编码格式，使接收的数据可以正常显示字符串，data默认为buffer
  conn.setEncoding('utf8')

  // 代表当前连接的昵称
  let nickname

  // 缓存接收的数据
  let text = ''
  conn.on('data', function (data) {

    text += data
    // 如果不包含回车，就忽略
    if (!/.*\r\n$/.test(text)) {
      return
    }

    // 删除回车
    text = text.replace('\r\n', '')

    // 如果还没有昵称
    if (!nickname) {
      // 非空验证
      if (!text) {
        conn.write('\033[93m> nickname shouldn\'t be empty, try again:\033[39m ')
        // 如果已经被使用过
      } else if (users[text]) {
        conn.write('\033[93m> nickname ' + text +' already in use, try again:\033[39m ')
      } else {
        nickname = text
        // 缓存连接，后续需要发送消息
        users[nickname] = conn
        broadcast('\033[90m > ' + nickname + ' joined the room\033[39m\r\n')
      }
    } else {
      // 否则，视为聊天信息
      broadcast('\033[96m > ' + nickname + ':\033[39m ' + text + '\r\n', true)
    }
    // 重置信息
    text = ''
  })
  conn.on('close', function () {
    count--
    delete users[nickname]
    broadcast('\033[90m > ' + nickname + ' left the room\033[39m\r\n')
  })

  function broadcast (msg,exceptMyself) {
    for (var i in users) {
      if (!exceptMyself || i !== nickname) {
        users[i].write(msg)
      }
    }
  }
})

server.listen(3000, function () {
  console.log('\033[96m   Server listening on *:3000\033[39m')
})