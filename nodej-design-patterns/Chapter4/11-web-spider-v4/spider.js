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


export function spiderTask(url, nesting, queue, cb) {
  const filename = 'download/' + urlToFilename(url)
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
        spiderLinks(url, requestContent, nesting, queue)
        return cb()
      })
    }
    // 文件已经存在，继续处理链接
    spiderLinks(url, fileContent, nesting, queue)
    return cb()
  })
}

// 不需要调用回调，回调交给队列
function spiderLinks(currentUrl, body, nesting, queue) {
  if (nesting === 0) {
    return
  }

  const links = getPageLinks(currentUrl, body)
  if (links.length === 0) {
    return
  }

  links.forEach(link => spider(link, nesting - 1, queue))
}

const spidering = new Set()
export function spider(url, nesting, queue) {
  if (spidering.has(url)) {
    return
  }
  spidering.add(url)
  queue.pushTask((done) => {
    spiderTask(url,nesting, queue, done)
  })
}
