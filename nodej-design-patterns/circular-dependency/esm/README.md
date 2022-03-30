# 循环引用的ECMAScript Module
## 输出结果

```
a-> <ref *1> [Module: null prototype] {
  b: [Module: null prototype] { a: [Circular *1], loaded: true },
  loaded: true
}
b-> <ref *1> [Module: null prototype] {
  a: [Module: null prototype] { b: [Circular *1], loaded: true },
  loaded: true
}
```

## 结论
### 加载顺序不会影响结果
### 获取到的是完整的模块，而不是加载那一刻的状态
### 使用JSON.stringify()会报错，Node.js 内部不允许序列化循环引用
