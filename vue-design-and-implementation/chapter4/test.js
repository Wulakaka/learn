// 执行副作用函数，触发读取，建立依赖关系
effect(() => {
  console.log('effect')
  document.body.innerText = obj.ok ? obj.text: 'not'
})

// 1 秒钟后修改响应式数据
setTimeout(() => {
  obj.text = 'hello vue3'
}, 1000)
