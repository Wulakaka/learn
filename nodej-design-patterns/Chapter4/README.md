# Asynchronous Control Flow Patterns with Callbacks

- 异步编程的挑战。
- 避免回调地狱和其他回调的最佳实践。
- 常见的异步模式，如顺序执行、顺序迭代、并行执行和有限的并行执行。

## The difficulties of asynchronous programming

### Creating a simple web spider

### Callback hell

**pyramid of doom**

最明显的问题是可读性差。

另一个问题是在各个作用域中部分重叠的变量名。

闭包在表现和内存消耗上会带来一点代价。除此之外，他们也会造成很难识别的内存泄漏。
事实上，我们不应该忘记，活跃闭包引用的人也上下文都会从垃圾收集中保留。

## Callback best practices and control flow patterns

在这章，不仅会学到如何避免回调地狱，还有如何仅仅使用简单明了的JavaScript实现一些最常见的控制流模式。

### Callback discipline

当书写异步代码时，要记住的第一条规则是定义回调时，不要滥用就地函数定义。
这样做是很诱人的，因为它不需要思考一些额外的问题，比如模块化和重用性；不过，你已经理解了它的弊大于利。
大部分情况，解决回调地狱不需要任何库、花哨的技术或范式的改变；你只需要一些常识。

这些是一些基本原则，可以帮助我们保持低嵌套水平，并改善我们代码的整体组织：

- 尽早退出。根据上下文，用 `return` 、 `continue` 和 `break` 来立即退出当前的语句，而不是书写（嵌套）完整的 `if...else` 语句。
  这将有助于保持代码的浅显。
- 为回调函数命名，让他们远离闭包并且传递中间的结果作为参数。为函数命名也会让他们在堆栈追踪中看起来更好。
- 模块化代码。尽可能拆分代码到更小的、可重用的方法中。

### Applying the callback discipline

第一步，通过移除 `else` 语句来重构我们的错误检查模式。
这是通过在我们接收到错误后立即返回来实现的。因此，不要使用下面代码：

```javascript
if (err) {
  cb(err)
} else {
  // code to execute when there ar no errors
}
```

我们可以通过下面的写法改善代码组织：

```javascript
if (err) {
  return cb(err)
}
// code to execute when there are no errors
```

这就是经常被提到的尽早返回原则（ **early return principle**）。
通过这个简单的技巧，我们立即降低了函数的嵌套级别。这很简单，不需要任何复杂的重构。

**一个典型的错误是调用回调后忘记中止。对于错误处理的场景，下面的代码是典型的缺陷来源：**

```javascript
if (err) {
  callback(err)
}
// code to execute when there are no errors
```

永远不能忘记即使已经调用了回调，方法还是会继续执行。
之后插入 `return` 指令来阻断剩余函数的执行是很重要的。
而且，注意到函数的返回值是什么不重要，真正结果（或错误）是异步产生的，并且会出传递给回调。
异步函数的返回结果通常会被忽略。这个属性允许我们像下面这样编写快捷方式：

```javascript
return callback(...)
```

否则，我们不得不写出稍微详细的代码，比如：

```javascript
callback(...)
return
```

第二个针对 `spider()` 的优化是，我们可以尝试辨别可复用的代码片段。比如，将给定字符串写入到文件的功能可以很容易地分解为单独的函数，如下所示：

```javascript
function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename), err => {
    if (err) {
      return cb(err)
    }
    fs.writeFile(filename, contents, cb)
  })
}
```

遵循同样的原则，我们可以创建一个普通的 `download()` 函数，他接收一个 URL 和一个文件名作为输入，并且下载 URL 到指定的文件。
内部可以使用我们之前定义的 `saveFile()` 函数：

```javascript
function download(url, filename, cb) {
  console.log(`Downloading ${url}`)
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err)
    }
    saveFile(filename, res.text, err => {
      if (err) {
        return cb(err)
      }
      console.log(`Downloaded and saved: ${url}`)
      cb(null, filename, true)
    })
  })
}
```

最后一步，我们修改 `spider()` 函数，得益于我们的修改，它现在看起来像：

```javascript
export function spider(url, cb) {
  const filename = urlToFilename(url)
  fs.access(filename, err => {
    if (!err || err.code !== 'ENOENT') { // (1)
      return cb(null, filename, false)
    }
    download(url, filename, err => {
      if (err) {
        return cb(err)
      }
      cb(null, filename, true)
    })
  })
}
```

`spider()` 函数的功能和接口依然保持原样；发生变化的是组织代码的方式。
需要注意的一个重要的细节（1）是，我们颠倒了文件存在性的检查，以便我们可以遵循之前讨论的 early return 原则。

通过应用 early return 原则和其他回调规约原则，我们可以剧烈地减少我们代码的嵌套，并且同时，提高它的可复用性和可测试性。
事实上，我们可以考虑导出 `saveFile()` 和 `download()` ，以便我们可以在其他模块中复用他们。
这也将使我们能够测试他们作为独立的单元的功能。

我们在本节中进行的重构清楚地表明，大多数时候，我们只需要一些规约，以确保我们不会滥用闭包和匿名函数。
它效果显著，只需要最少的努力，也不需要外部库。

现在你已经知道如何通过回调编写简洁的异步代码，我们已经准备好探索一些最常见的异步模式，比如顺序或并行执行。

### Sequential execution

#### Executing a known set of tasks in sequence

#### Sequential iteration

### Parallel execution

#### Web spider version 3

#### The pattern

#### Fixing race conditions with concurrent tasks

### Limited parallel execution

#### Limiting concurrency

#### Globally limiting concurrency

## The async library

## Summary

## Exercises
