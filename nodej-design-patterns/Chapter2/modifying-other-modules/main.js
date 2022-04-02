import fs from 'fs'
// 这两种方式将导致无法实现对fs.readFile方法的更改，因为更改的只是fs模块导出的readFile属性的值，而不是原始的readFile方法
// import * as fs from 'fs'
// import {readFile} from 'fs'
import {mockDisable, mockEnable} from "./mock-read-file.js"

mockEnable(Buffer.from('Hello World'))
fs.readFile('fake-path', (err, data) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(data.toString())
})

mockDisable()
