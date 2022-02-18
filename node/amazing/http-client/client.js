const http = require('http')

http.request({
  host: '127.0.0.1',
  port: 3000,
  url: '/',
  method: 'GET'
}, function (res) {
  res.setEncoding("utf8")
  let body = ''
  res.on("data", chunk => body+= chunk)
  res.on("end", () => {
    console.log('\n We got \033[96m' + body + '\033[39m\n')
  })
// 需要调用end，否则可以继续与服务器交互
}).end()