import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import {urlToFilename} from './utils.js'

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
    // (2)如果文件没有被找到，使用上面的代码下载文件
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

/**
 * 接收url来下载，当下载完成时调用cb
 * @param url
 * @param cb
 */
export function spider(url, cb) {
  const filename = urlToFilename(url)
  fs.access(filename, err => {
    if (!err || err.code !== 'ENOENT') {
      return cb(null, filename, false)
    }
    download(url, filename,err => {
      if (err) {
        return cb(err)
      }
      cb(null, filename, true)
    })
  })
}
