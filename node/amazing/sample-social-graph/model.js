import {createClient} from 'redis';

const client = createClient();

const connect = client.connect();
client.on('error', (err) => console.log('Redis Client Error', err));

// 用户模型
function User(id, data) {
  this.id = id
  this.data = data
}

// 查找数据库并生成User实例
User.find = function (id) {
  return connect.then(() => client.hGetAll(`user:${id}:data`)).then(
    data => new User(id, data)
  )
}

User.prototype.save = function () {
  if (!this.id) {
    this.id = String(Math.random()).substring(0, 3)
  }
  return connect.then(() => client.hSet(`user:${this.id}:data`, this.data))
}

// 关注
User.prototype.follow = function (user_id) {
  return client.multi()
    .sAdd(`user:${user_id}:followers`, this.id)
    .sAdd(`user:${this.id}:follows`, user_id)
    .exec()
}

// 取消关注
User.prototype.unfollow = async function (user_id) {
  return client.multi()
    .sRem(`user:${user_id}:followers`, this.id)
    .sRem(`user:${this.id}:follows`, user_id)
    .exec()
}

// 获取所有关注用户
User.prototype.getFollowers = function () {
  return client.sMembers(`user:${this.id}:followers`)
}

// 获取所有已关注的用户
User.prototype.getFollows = function () {
  return client.sMembers(`user:${this.id}:follows`)
}

// 获取交集
User.prototype.getFriends = function() {
  return client.sInter(`user:${this.id}:follows`, `user:${this.id}:followers`)
}

export default User
