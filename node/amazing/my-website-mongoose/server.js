const mongoose = require("mongoose");

// 连接mongoDB
mongoose.connect('mongodb://localhost:27017/test').then(res => {
  console.log('connected')
})

// 定义数据模型
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const Comments = new Schema({
  title      : String,
  body       : String,
  date       : Date
})

const BlogPost = new Schema({
  author     : ObjectId,
  title      : {type: String, default: 'Untitled', index: true}, // 提供默认值，设置索引
  uid        : {type: Number, unique: true}, // 需要唯一
  body       : String,
  date       : Date,
  comments   : [Comments],
  meta       : {
    votes    : Number,
    favs     : Number
  }
})

// 使用静态index方法设置复合索引
// BlogPost.index({key: -1, otherKey: 1})

// 注册一个模型
// Mongoose 会将集合名字设置为 blogposts，除非通过第三个参数来指定集合名。Mongoose默认会对模型名字使用小写复数形式。
const Post = mongoose.model('BlogPost', BlogPost)
// 可以通过这种形式get: mongoose.model('BlogPost')

new Post({title: 'My title'}).save().then(
  () => {
    console.log('that was easy!')
  }
)

// 中间件 - 删除博文前发送email
// BlogPost.pre('remove', function (next) {
//   emailAuthor(this.email, 'Blog post removed!')
//   next()
// })

// 中间件 - 保存前
// BlogPost.pre('save', function (next){
//   if (this.isNew) {
//     // doSomething
//   } else {
//     // doSomethingElse
//   }
// })
// 通过this.dirtyPaths来探测什么键被修改过
