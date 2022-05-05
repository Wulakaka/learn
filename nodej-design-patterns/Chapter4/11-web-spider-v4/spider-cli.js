import {spider} from "./spider.js";
import TaskQueue from "./TaskQueue.js";

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3], 10) || 1
const concurrency = Number.parseInt(process.argv[4], 10) || 2
const spiderQueue = new TaskQueue(concurrency)
spiderQueue.on('empty', () => {
  console.log('download complete')
})
spiderQueue.on('error', console.error)
spider(url, nesting, spiderQueue)
