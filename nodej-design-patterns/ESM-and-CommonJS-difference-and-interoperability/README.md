# ESM和CommonJS的区别和互操作性

## 文件区别

- ESM需要明确指出文件后缀
- CommonJS中文件后缀名是可选的

## ESM 是在严格模式下运行的

- ESM的严格模式是隐式的，无需单独声明
- ESM无法禁用严格模式

## ESM 模式下有些变量无法直接使用

- __filename
    - 当前模块文件的绝对路径
- __dirname
    - 当前模块文件的父文件夹的绝对路径

```javascript
import {fileURLToPath} from 'url'
import {dirname} from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
```

重新创建require方法

```javascript
import {createRequire} from 'module'

const require = createRequire(import.meta.url)
```

### this关键词的行为有所不同

- ESM 中this为undefined
- CommonJS 中this指向 exports 对象

```javascript
// this.js - ESM
console.log(this) // undefined
// this.cjs - CommonJS
console.log(this === exports) // true
```

## 互操作性
通过module.createRequire 方法，在ESM中导入CommonJS 的模块。
也可以使用import语法导入CommonJS模块，但是只限于default exports。
```javascript
import packageMain from 'commonjs-package' // Works
import { method } from 'commonjs-package' // Errors
```

不可以在CommonJS中导入ES模块。

ESM也不可以直接导入JSON文件。
为了克服这个困难，仍然可以使用module.createRequire工具：
```javascript
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const data = require('./data.json')
console.log(data)
```
