// 模块依赖
const express = require('express')
const search = require('./search')

// 创建app
const app = express()

// 配置
app.set('view engine', 'ejs')
app.set('Views', __dirname + '/views')
app.set('view options', {layout: false})

// 路由
app.get('/', function (req, res) {
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

// 监听
app.listen(3000)