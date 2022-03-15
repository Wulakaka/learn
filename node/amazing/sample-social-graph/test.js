import User from "./model.js";
// 创建测试用户
const testUsers = {
  'mark@facebook.com': {name: 'Mark Zuckerberg'},
  'bill@microsoft.com': {name: 'Bill Gates'},
  'jeff@amazon.com': {name: 'Jeff Bezos'},
  'fred@fedex.com': {name: 'Fred Smith'}
}

// 用于创建用户的函数
function create(users, fn) {
  let total = Object.keys(users).length
  for (var i in users) {
    (async function (email, data) {
      const user = new User(email, data)
      await user.save()
      --total || fn()
    })(i, users[i])
  }
}

// 用于水合用户的函数
async function hydrate(users, fn) {
  let total = Object.keys(users).length
  for (let i in users) {
    try {
      users[i] = await User.find(i)
      --total || fn()
    } catch (e) {
      throw e
    }
  }
}

create(testUsers, async function () {
  await hydrate(testUsers, async function () {
    await testUsers['bill@microsoft.com'].follow('jeff@amazon.com')
    console.log('+ bill followed jeff')
    const users = await testUsers['jeff@amazon.com'].getFollowers()
    console.log("jeff's followers", users)
    const friends = await testUsers['jeff@amazon.com'].getFriends()
    console.log("jeff's friends", friends)
    await testUsers['jeff@amazon.com'].follow('bill@microsoft.com')
    console.log('+ jeff follow bill')
    const newFriends = await testUsers['jeff@amazon.com'].getFriends()
    console.log("jeff's friends", newFriends)
    process.exit(0)
  })
})
