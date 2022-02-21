// 模块依赖
const express = require('express')
const search = require('./search')

// 创建app
const app = express()

// 配置
app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/views')
// 增加页面缓存 生产模式下开启
// app.set('view cache', true)

// 路由
app.get('/', function (req, res) {
  // 显示请求头信息，大小写不敏感
  console.log(req.header('host'))
  // 显示请求中的Accept头信息
  console.log(req.accepts('html'))
  // 检查Content-Type信息
  console.log(req.is('text/html'))
  res.render('index')
})
app.get('/search', function (req, res, next) {
  search(req.query.q, function (err, tweets) {
    if (err) return next(err)
    res.render('search', {
      results: tweets,
      search: req.query.q
    })
  })
})

// 错误处理
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// 监听
app.listen(3000)