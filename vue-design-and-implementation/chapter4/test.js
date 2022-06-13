
// 原始数据
const data = {foo: true, bar: true}

// 对原始数据的代理
const obj = new Proxy(data, {
//  拦截读取操作
  get(target, p, receiver) {
    console.log('get', p)
    track(target, p)
    // 返回属性值
    return target[p]
  },
  // 拦截设置操作
  set(target, p, value, receiver) {
    console.log('set', p)
    // 设置属性值
    target[p] = value
    // 把副作用函数从桶里取出来并执行
    trigger(target, p)
  }
})

let temp1, temp2


effect(function effectFn1() {
  console.log('effectFn1 执行')
  effect(function effectFn2() {
    console.log('effectFn2 执行')
    // 在 effectFn2 中读取 obj.bar 属性
    temp2 = obj.bar
  })
  // 在 effectFn1 中读取 obj.foo 属性
  temp1= obj.foo
})

obj.foo = 1
