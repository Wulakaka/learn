const http = require('http')
const req = http.request({
  hostname: '127.0.0.1',
  port: 3000,
  method: 'GET'
}, res => {
  console.log(res.method)
 res.on("data", d => {
   // 转换为标准输出
   process.stdout.write(d)
 })
})


req.on('error', error => {
  console.error(error)
})

req.end()