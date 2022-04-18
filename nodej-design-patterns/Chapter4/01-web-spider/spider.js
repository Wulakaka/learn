import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import {urlToFilename} from './utils.js'

/**
 * 接收url来下载，当下载完成时调用cb
 * @param url
 * @param cb
 */
export function spider(url, cb) {
  const filename = urlToFilename(url)
  fs.access(filename, err => {
    // (1)检查文件是否已经被创建，如果没有被创建过，说明可以继续
    if (err && err.code === 'ENOENT') {
      console.log(`Downloading ${url} into ${filename}`)
      superagent.get(url).end((err, res) => {
        // (2)如果文件没有被找到，使用上面的代码下载文件
        if (err) {
          cb(err)
        } else {
          mkdirp(path.dirname(filename), err => {
            // (3)我们确保包含该文件的目录存在
            if (err) {
              cb(err)
            } else {
              fs.writeFile(filename, res.text, err => {
                // (4)最后，我们把HTTP响应的body写入文件系统
                if (err) {
                  cb(err)
                } else {
                  cb(null, filename, true)
                }
              })
            }
          })
        }
      })
    } else {
      cb(null, filename, false)
    }
  })
}
