# Callbacks and Events

## The Callback pattern 回调模式

### The continuation-passing style 持续传递风格

- 传递返回结果
- 区别于direct style，direct style 是指使用return 返回结果

#### Synchronous CPS

#### Asynchronous CPS

```javascript
function additionAsync(a, b, callback) {
    setTimeout(() => callback(a + b), 100)
}
```

```javascript
console.log('before')
additionAsync(1, 2, result => console.log(`Result: ${result}`))
console.log('after')
```

```
before
after
Result: 3
```

执行 setTimeout 会立即返回，控制权会交给 additionAsync，然后交给它的调用者。 一旦异步请求发送，控制权会立刻交还给 event loop，从而允许处理事件队列中的新的事件。

![img.png Control flow of an asynchronous function's invocation](images/img.png)

#### Non-CPS callbacks

有些回调并不是CPS，比如map方法，传递的参数并不是执行的结果。

```javascript
const result = [1, 3, 5].map(element => element - 1)
console.log(result) // [0, 2, 4]
```

## Synchronous or asynchronous?

### An unpredictable function

API 在某些情况下为同步，某些情况下为异步

```javascript
import {readFile} from 'fs'

const cache = new Map()

function inconsistentRead(filename, cb) {
    if (cache.has(filename)) {
        // invoke synchronously
        cb(cache.get(filename))
    } else {
        // asynchronous function
        readFile(filename, 'utf8', (err, data) => {
            cache.set(filename, data)
            cb(data)
        })
    }
}
```

### Unleashing Zalgo

```javascript
function createFileReader(filename) {
    const listeners = []
    inconsistentRead(filename, value => {
        listeners.forEach(listener => listener(value))
    })
    return {
        onDataReady: listener => listeners.push(listener)
    }
}
```

当上述方法被调用时，它会创建一个新的通知者的对象，这个对象允许我们对文件读取操作设置一些监听器。 当读取操作完成并且数据可获取时，所有的监听器将被同时调用。 上述方法使用了 inconsistentRead() 方法。

```javascript
const reader1 = createFileReader('data.txt')
reader1.onDataReady(data => {
    console.log(`First call data: ${data}`)
    // sometime later we try to read again from the same file
    const reader2 = createFileReader('data.txt')
    reader2.onDataReady(data => {
        console.log(`Second call data: ${data}`)
    })
})
```

上述方法将会打印：

```
First Call data: some data
```

第二个reader的回调永远不会被触发：
- 在reader1的创建阶段，inconsistentRead() 中由于没有缓存，所以使用了异步的方法。
这就意味着任何 onDataReady 的监听器将会在其他的 event loop 中触发。
所以我们有足够的时间注册监听器。
- 然后，reader2 在缓存已经存在event loop 的循环中创建。
在这种情况下，内部的 inconsistentRead() 调用是同步的。
所以，它的回调是立即执行的，这就意味着reader2的监听也是同步执行的。
然而，我们在reader2创建后注册了监听器，所以它永远不会执行。

***最主要的原因是，在代码中先调用了监听器，再执行的注册。***
