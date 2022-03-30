import fs from 'fs'

// 这两种方式将无法实现对fs.readFile方法的更改，由于获取是只读的，所以更改时会报错
// import * as fs from 'fs'
// import {readFile} from 'fs'

const originalReadFile = fs.readFile
let mockedResponse = null

function mockedReadFile(path, cb) {
    setImmediate(() => {
        cb(null, mockedResponse)
    })
}

export function mockEnable(respondWith) {
    mockedResponse = respondWith
    fs.readFile = mockedReadFile
}

export function mockDisable() {
    fs.readFile = originalReadFile
}
