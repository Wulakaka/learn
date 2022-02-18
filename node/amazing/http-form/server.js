const http = require('http')
const qs = require('querystring')
http.createServer(function (req, res) {
  // 路由判断
  if ('/' === req.url) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end('<form method="POST" action="/url">' +
      '<h1>My form</h1>' +
      '<fieldset>' +
      '<label>Personal information</label>' +
      '<p>What is your name?</p>' +
      '<input type="text" name="name">' +
      '<p><button>Submit</button></p>' +
      '</fieldset>' +
      '</form>')
    //  表单提交后会以POST的方式请求/url
  } else if ('/url' === req.url && 'POST' === req.method) {
    let body = ''
    req.on("data", function (chunk) {
      body += chunk
    })
    // 接收结束后返回给客户端
    req.on("end", function () {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write('You sent a <em>' + req.method + '</em> request')
      res.write('<p>Content-Type: ' + req.headers['content-type'] + '</p>' +
        '<p>Data:</p><pre>' + body + '</pre>')
      res.end('<p>Your name is <b>' + qs.parse(body).name + '</b></p>')
    })
    //  其他情况返回404
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
}).listen(3000)