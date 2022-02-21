const connect = require('connect')
const time = require('./request-time')
const logger = require('./logger')
const bodyParser = require('body-parser')
// 创建服务
const app =connect()
// 记录请求情况
// app.use(connect.logger('dev'))
app.use(logger())

app.use(bodyParser.json('application/json'))
// 实现时间中间件
app.use(time({time: 500}))
// 快速响应
app.use(function (req,res,next) {
  if ('/a' === req.url) {
    res.writeHead(200)
    res.end('Fast!')
  }else {
    next()
  }
})
// 慢速响应
app.use(function (req, res, next) {
  if ('/b' === req.url) {
    setTimeout(function (){
      res.writeHead(200)
      res.end('Slow!')
    }, 1000)
  } else {
    next()
  }
})

app.use(function (req, res, next) {
  if ('/bar' === req.url && 'POST' === req.method) {
    console.log(req.body.foo)
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end('success')
  } else {
    next()
  }
})

// 监听
app.listen(3000)
// 效果同上
// require('http').createServer(app).listen(3000)