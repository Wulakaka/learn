import {EventEmitter} from "events";

export default function ticker(num, callback) {
  const start = new Date().getTime()
  const event = new EventEmitter()
  // 如果立即触发是无法监听到的，因为触发时还未注册侦听器
  process.nextTick(() => {
    event.emit('tick')
  })
  let count = 1
  const fn = () => {
    setTimeout(() => {
      const now = new Date().getTime()
      if (now - start < num) {
        event.emit('tick')
        count++
        fn()
      } else {
        callback(null, count)
      }
    }, 50)
  }
  fn()
  return event
}
