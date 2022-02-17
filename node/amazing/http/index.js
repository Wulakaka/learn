const http = require('http')
http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type' : 'image/png'
  })
  // const stream = require('fs').createReadStream('image.png')
  // stream.on('data', function (data) {
  //   res.write(data)
  // })
  // stream.on('end', function () {
  //   res.end()
  // })

  // 效果同以上注释代码
  require('fs').createReadStream('image.png').pipe(res)
}).listen(3000)