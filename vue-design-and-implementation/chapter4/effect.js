// 用一个全局变量存储被注册的副作用函数
let activeEffect

// 存储副作用函数的桶
const bucket = new WeakMap()

// 原始数据
const data = {text: 'hello world', ok: true}
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

// effect 函数用于注册副作用函数
function effect(fn) {
  const effectFn = () => {
    // 调用 cleanup 函数完成清除工作
    // 清除工作是针对于副作用函数的，而不是针对于对象的某个属性
    cleanup(effectFn)
    // 当 effectFn 执行时，将其设置为当前激活的副作用函数
    activeEffect = effectFn
    fn()
  }
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合（哪个集合里包含了该副作用函数）
  // 相当于存储了当前函数的父关系
  effectFn.deps = []
  // 执行副作用函数
  effectFn()
}

function cleanup(effectFn) {
  // 遍历 effectFn.deps 数组
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i]
    // 将 effectFn 从依赖集合中移除
    deps.delete(effectFn)
  }
  // 最后需要重置 effectFn.deps 数组
  effectFn.deps.length = 0
}

function track(target, key) {
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
  // 把当前激活的副作用函数添加到依赖集合 deps 中
  deps.add(activeEffect)
  // deps 就是一个与当前副作用函数存在联系的依赖结合
  // 将其添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps)
}

function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  // 根据 key 取得所有的副作用函数
  const effects = depsMap.get(key)

  // 避免无限循环
  // 执行副作用函数
  const effectsToRun = new Set(effects)
  effectsToRun.forEach(fn => fn())
}


