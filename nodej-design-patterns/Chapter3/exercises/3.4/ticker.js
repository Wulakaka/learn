import {EventEmitter} from "events";
const handleTimestamp = (time, callback) => {
  if (time % 5 === 0) {
    callback(time)
  }
}
export default function ticker(num, callback) {
  const startTime = Date.now()
  process.nextTick(() => {
    handleTimestamp(startTime, (error) => {
      if (error) {
        event.emit('error', error)
        callback(error)
      }
    })
  })
  const event = new EventEmitter()
  // 如果立即触发是无法监听到的，因为触发时还未注册侦听器
  process.nextTick(() => {
    event.emit('tick')
  })
  let count = 1
  const fn = () => {
    setTimeout(() => {
      const now = Date.now()
      handleTimestamp(now, (error) => {
        if (error) {
          event.emit('error', error)
          callback(error)
        }
      })
      const difference = now - startTime
      if (difference < num) {
        event.emit('tick', difference)
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
