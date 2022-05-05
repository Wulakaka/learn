import fs from 'fs'

export default function concatFiles (...args) {
  const cb = args.pop()
  const dest = args.pop()
  readFiles(args, (err, content) => {
    if (err) {
      return cb(err)
    }
    writeFile(dest, content, cb)
  })
}

function writeFile(filename, content, cb) {
  fs.writeFile(filename, content, (err) => {
    if (err) {
      return cb(err)
    }
    console.log(`write file ${filename} success!`)
    cb()
  })
}

function readFiles(files, cb) {
  if (files.length === 0) {
    return  cb(null, '')
  }
  let finish = 0
  const contents = Array(files.length).fill('')
  files.forEach((filename, index) => {
    readFileTask(filename, (err, content) => {
      finish++
      if (err) {
        console.error('读取文件错误' + filename)
        cb(err)
      }
      contents[index] = content
      if (finish === files.length) {
        cb(null, contents.join(''))
      }
    })
  })
}

function readFileTask(filename, cb) {
  fs.readFile(filename, 'utf8', (err, content) => {
    if (err) {
      return cb(err)
    }
    return cb(null, content)
  })
}
