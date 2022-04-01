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

- 在reader1的创建阶段，inconsistentRead() 中由于没有缓存，所以使用了异步的方法。 这就意味着任何 onDataReady 的监听器将会在其他的 event loop 中触发。 所以我们有足够的时间注册监听器。
- 然后，reader2 在缓存已经存在event loop 的循环中创建。 在这种情况下，内部的 inconsistentRead() 调用是同步的。 所以，它的回调是立即执行的，这就意味着reader2的监听也是同步执行的。
  然而，我们在reader2创建后注册了监听器，所以它永远不会执行。

***最主要的原因是，在代码中先调用了监听器，再执行的注册。***

### Using synchronous APIs

同步的方法不一定要使用CPS，使用 direct style 就是最佳实践<br>
使用同步的API而不是异步会有一些警告：

- 某些方法可能没有同步的API
- 同步的API会阻塞 event loop，并会搁置任何并发请求。这会打破Node.js 的并发模型，降低整个应用的速度。

尽量不适用同步的API，但是某些情况下仍然适用，比如在项目初始化的过程中加载配置。

### Guaranteeing asynchronicity with deferred execution 保证延迟执行的异步性

使用 process.nextTick() 方法让执行变为异步。 它的功能很简单：它接受一个回调作为一个参数，并且把它推到事件队列的顶端，在任何等待状态的 I/O 事件之前，然后立即返回。
然后当当前运行的操作将控制权带回事件循环时，将立即调用回调。

```javascript
import {readFile} from 'fs'

const cache = new Map()

function consistentReadAsync(filename, callback) {
    if (cache.has(filename)) {
        // deferred callback invocation
        process.nextTick(() => callback(cache.get(filename)))
    } else {
        // asynchronous function
        readFile(filename, 'utf8', (err, data) => {
            callback(data)
        })
    }
}
```

另一个延迟执行的 API 是 setImmediate()。 虽然它的目的与 process.nextTick() 很相似，但语义确完全不同。 通过 process.nextTick() 延迟的回调被称为 microtasks
微任务，并且当前操作完成后会立即执行，甚至在触发任何其他 I/O 事件之前。 另一方面，使用 setImmediate()，执行操作会在所有I/O事件处理完后的事件循环阶段排队。 因为 process.nextTick() 在任何已经计划的
I/O 事件之前运行，它会被更快的执行，但是在某些情况下，它也可能无限期的延迟任何 I/O回调的运行，例如在递归调用的情况下。 这在 setImmediate() 上永远不会发生。

setImmediate() 会比 setTimeout(callback, 0) 执行更快。 原因：我们必须考虑到 event loop 在不同的阶段执行所有的回调；对于我们正在考虑得类型，我们有计时器在I/O回调之前执行，而计时器又在
setImmediate() 回调之前执行。 这意味着，如果我们在setTimeout() 回调、I/O 回调或在这两个阶段后排队的微任务中排队使用 setImmediate() 的任务，那么回调将在我们当前所处的阶段之后的阶段执行。
setTimeout() 回调必须等待事件循环的下一周期。
