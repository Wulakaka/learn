# 循环引用的CommonJS
## 输出结果
- a在b前
```
a-> {
  "b": {
    "a": {
      "loaded": false
    },
    "loaded": true
  },
  "loaded": true
}
b-> {
  "a": {
    "loaded": false
  },
  "loaded": true
}
```
- a在b后
```
a-> {
  "b": {
    "loaded": false
  },
  "loaded": true
}
b-> {
  "a": {
    "b": {
      "loaded": false
    },
    "loaded": true
  },
  "loaded": true
}
```
## 结论
### 不同的加载顺序会导致不同的结果
### 代码只会取require那一刻的状态，而不是整个模块全部加载完成的状态