import {EventEmitter} from 'events'
export default class TaskQueue extends EventEmitter {
  constructor(concurrency) {
    super();
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  pushTask(task) {
    this.queue.push(task)
    process.nextTick(this.next.bind(this))
    // 保证可以链式调用
    return this
  }

  next() {
    if (this.running === 0 && this.queue.length === 0) {
      return this.emit('empty')
    }
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift()
      task((err) => {
        // 当前任务已经完成，需要减去
        this.running--
        if (err) {
          this.emit('error', err)
        }
        // 保证任务是异步的
        process.nextTick(this.next.bind(this))
      })
      this.running++
    }
  }
}
