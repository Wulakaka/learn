const http = require('http')
const qs = require('querystring')

function send(theName) {
  const data = qs.stringify({name: theName})

  http.request({
    host: '127.0.0.1',
    port: 3000,
    path:'/',
    method: 'POST',
  }, function (res) {
    res.setEncoding("utf8")
    // 不写data事件会导致无法触发end
    res.on('data',function (data){})
    res.on("end", function (){
      console.log('\n  \033[90m  request complete!\033[39m')
      process.stdout.write('\n your name: ')
    })
  }).end(data)
}

process.stdout.write('\n your name: ')
process.stdin.resume()
process.stdin.setEncoding("utf8")
process.stdin.on("data", function (name) {
  send(name.replace('\n', ''))
})
