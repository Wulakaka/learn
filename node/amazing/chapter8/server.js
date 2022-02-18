const http = require('http')
const fs = require('fs')

// 创建服务器
const server = http.createServer(function (req, res) {
  console.log(req.url)
  if ('GET' === req.method && '/images' === req.url.substring(0, 7) && '.png' === req.url.substr(-4)) {
    fs.stat(__dirname + req.url, function (err, stat) {
      if (err || !stat.isFile()) {
        res.writeHead(404)
        res.end('Not found')
        return
      }
      serve(__dirname + req.url, 'application/png')
    })
  }else if('GET' === req.method && '/' === req.url) {
    serve(__dirname + '/index.html', 'text/html')
  } else {
    res.writeHead(404)
    res.end('Not found')
  }
  function serve(path, type) {
    console.log(path)
    res.writeHead(200, {'Content-Type': type})
    fs.createReadStream(path).pipe(res)
  }
})

server.listen(3000)

