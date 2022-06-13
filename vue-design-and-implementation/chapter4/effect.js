

// 存储副作用函数的桶
const bucket = new WeakMap()

// 用一个全局变量存储被注册的副作用函数
let activeEffect

// 使用栈结构存储副作用函数
const effectStack = []

// effect 函数用于注册副作用函数
function effect(fn) {
  const effectFn = () => {
    // 调用 cleanup 函数完成清除工作
    // 清除工作是针对于副作用函数的，而不是针对于对象的某个属性
    cleanup(effectFn)
    // 当 effectFn 执行时，将其设置为当前激活的副作用函数
    activeEffect = effectFn
    // 在调用副作用函数之前将当前副作用函数压入栈中
    effectStack.push(effectFn)
    fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把 activeEffect 还原为之前的值
    effectStack.pop()
    activeEffect = effectStack[effectStack.length-1]
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
  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
    // 避免在同一个副作用函数中既有 get 又有 set 时触发无限循环
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(fn => fn())
}


