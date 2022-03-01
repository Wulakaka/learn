const express = require('express')
const session = require('express-session')
// body-parser 不是 express 内置的了，需要单独引入
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(session({secret: 'my secret'}))
app.set('view engine', 'pug')

// 身份验证中间件
app.use(async function (req, res, next) {
  if (req.session.loggedIn) {
    res.locals.authenticated = true
    try {
      res.locals.me = await app.users.findOne({_id: ObjectId(req.session.loggedIn)})
      next()
    } catch (e) {
      return next(e)
    }
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
  try {
    // 插入数据
    const doc = await app.users.insertOne(req.body.user)
    console.log(doc)
    // 重定向
    res.redirect('/login/' + req.body.user.email)
  } catch (e) {
    next(e)
  }
})

// 登录请求
app.post('/login', async function (req, res, next) {
  try {
    // 查询
    const doc = await app.users.findOne({email: req.body.user.email, password: req.body.user.password})
    if (!doc) {
      return res.send('<p>User not found. Go back and try again</p>')
    }
    req.session.loggedIn = doc._id.toString()
    res.redirect('/')
  } catch (e) {
    next(e)
  }
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
const {MongoClient, ObjectId} = require("mongodb");
// Connection URI
const uri =
  "mongodb://127.0.0.1:27017/?maxPoolSize=20&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    console.log("Connected successfully to server");

    // 使用数据库my-website
    const db = client.db('my-website')

    //创建集合
    const col = db.collection('users')

    // 在app实例上增加引用
    app.users = col

    // 创建复合索引
    await col.createIndex({'email': 1, password: 1})
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

