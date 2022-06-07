// 用一个全局变量存储被注册的副作用函数
let activeEffect
// effect 函数用于注册副作用函数
function effect(fn) {
  // 当调用 effect 注册副作用函数时，将副作用函数赋值给全局变量
  activeEffect = fn
  // 执行
  fn()
}
// 存储副作用函数的桶
const bucket = new WeakMap()

// 原始数据
const data = {text: 'hello world'}
// 对原始数据的代理
const obj = new Proxy(data, {
//  拦截读取操作
  get(target, p, receiver) {
    track(target, p)
    // 返回属性值
    return target[p]
  },
  // 拦截设置操作
  set(target, p, value, receiver) {
    // 设置属性值
    target[p] = value
    // 把副作用函数从桶里取出来并执行
    trigger(target, p)
  }
})

function track(target,key){
  // 没有 activeEffect 直接 return
  if (!activeEffect) return
  // 根据 target 从桶中取得 depsMap, 它也是一个 Map 类型
  let depsMap = bucket.get(target)
  // 如果不存在 depsMap，那么新建一个 Map 并与 target 关联
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型
  // 里面存储着所有与当前 key 相关联的副作用函数：effects
  let deps = depsMap.get(key)
  // 如果不存在deps，同样新建一个Set并与key关联
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }

  deps.add(activeEffect)
}

function trigger(target, key){
  const depsMap = bucket.get(target)
  if (!depsMap) return
  // 根据 key 取得所有的副作用函数
  const effects = depsMap.get(key)
  // 执行副作用函数
  effects && effects.forEach(fn =>fn())
}

// 执行副作用函数，触发读取
effect(() => {
  document.body.innerText = obj.text
})

// 1 秒钟后修改响应式数据
setTimeout(() => {
  obj.text = 'hello vue3'
}, 1000)

setTimeout(() => {
  obj.text2 = 'hello vue3 again'
}, 3000)
