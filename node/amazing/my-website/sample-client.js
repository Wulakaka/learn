const http = require('http')
const req = http.request({
  method: 'POST',
  host: '127.0.0.1',
  port: 3000,
  path: '/bar',
  headers: {
    'Content-Type': 'application/json'
  }
}, function (res) {
  res.setEncoding("utf8")
  res.on('data', function (data) {
    console.log(data)
  })
  res.on("end", function () {
    console.log('end')
  })
})

req.end(JSON.stringify({
  foo: 'bar'
}))
