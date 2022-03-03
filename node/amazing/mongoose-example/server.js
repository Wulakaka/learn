const express = require('express')
const session = require('express-session')
// body-parser 不是 express 内置的了，需要单独引入
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

const app = express()
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(session({secret: 'my secret'}))
app.set('view engine', 'pug')

// 身份验证中间件
app.use(function (req, res, next) {
  if (req.session.loggedIn) {
    res.locals.authenticated = true
    User.findById(req.session.loggedIn, function (err,doc){
      if (err)return next(err)
      res.locals.me = doc
      next()
    })
  } else {
    res.locals.authenticated = false
    next()
  }
})

// 路由
app.get('/', function (req, res) {
  res.render('index')
})
app.get('/login', function (req, res) {
  res.render('login')
})

app.get('/login/:signupEmail', function (req, res) {
  res.render('login', {signupEmail: req.params.signupEmail})
})

app.get('/signup', function (req, res) {
  res.render('signup')
})

app.post('/signup', async function (req, res, next) {
  try{
    const user = await new User(req.body.user).save()
    // 重定向
    console.log(user)
    res.redirect('/login/' + user.email)
  } catch (e){
    return next(e)
  }
})

// 登录请求
app.post('/login', function (req, res, next) {
  User.findOne({email: req.body.user.email, password: req.body.user.password}, function (err, doc){
    if (err)return next(err)
    if (!doc) return  res.send('<p>User not found. Go back and try again</p>')
    req.session.loggedIn = doc._id.toString()
    res.redirect('/')
  })
})

// 登出
app.get('/logout', function (req, res) {
  req.session.loggedIn = null
  res.redirect('/')
})

// 监听
app.listen(3000, function () {
  console.log('\033[96m + \033[39m app listening on *:3000')
})

// 连接数据库
mongoose.connect('mongodb://127.0.0.1/my-website').catch(e => {
  console.log(e)
})

// 定义模型
const Schema = mongoose.Schema

const User = mongoose.model('User', new Schema({
  first: String,
  last: String,
  email: {type: String, unique: true},
  password: {type: String, index: true}
}))

