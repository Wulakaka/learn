// 响应系统
// 存储副作用函数的桶
const bucket = new Set()

// 原始数据
const data = {text: 'hello world'}
// 对原始数据的代理
const obj = new Proxy(data, {
//  拦截读取操作
  get(target, p, receiver) {
    // 将副作用函数 effect 添加到存储副作用函数的桶中
    bucket.add(effect)
    // 返回属性值
    return target[p]
  },
  // 拦截设置操作
  set(target, p, value, receiver) {
    // 设置属性值
    target[p] = value
    // 把副作用函数从桶里取出来并执行
    bucket.forEach(fn =>fn())
    // 返回true 代表设置成功
    return true
  }
})

function effect() {
  document.body.innerText = obj.text
}

// 执行副作用函数，触发读取
effect()
// 1 秒钟后修改响应式数据
setTimeout(() => {
  obj.text = 'hello vue3'
}, 1000)

setTimeout(() => {
  obj.text = 'hello vue3 again'
}, 3000)
