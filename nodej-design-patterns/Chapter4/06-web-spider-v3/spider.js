import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import {urlToFilename, getPageLinks} from './utils.js'

function saveFile(filename, contents, cb) {
  mkdirp(path.dirname(filename), err => {
    if (err) {
      return cb(err)
    }
    fs.writeFile(filename, contents, err => {
      // (4)最后，我们把HTTP响应的body写入文件系统
      if (err) {
        return cb(err)
      }
      cb(null, filename, true)
    })
  })
}

function download(url, filename, cb) {
  console.log(`Downloading ${url}`)
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err)
    }
    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err)
      }
      console.log(`Downloaded and saved: ${url}`)
      cb(null, res.text)
    })
  })
}


export function spider(url, nesting, cb) {
  const filename = urlToFilename(url)
  // 直接读取文件
  fs.readFile(filename, "utf8", (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return cb(err)
      }
      // 文件不存在，所以进行下载
      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err)
        }
        spiderLinks(url, requestContent, nesting, cb)
      })
    }
    // 文件已经存在，继续处理链接
    spiderLinks(url, fileContent, nesting, cb)
  })
}

function spiderLinks(currentUrl, body, nesting, cb) {
  if (nesting === 0) {
    // 注意，这里需要异步，Zalgo
    return process.nextTick(cb)
  }

  const links = getPageLinks(currentUrl, body)
  if (links.length === 0) {
    return process.nextTick(cb)
  }

  // 计数完成数
  let completed = 0
  // 标记是否有错误
  let hasError = false
  function done (err) {
    if (err) {
      hasError = true
      return cb(err)
    }
    if (++completed === links.length && !hasError) {
      return cb()
    }
  }
  links.forEach(link => spider(link, nesting - 1, done))
}
