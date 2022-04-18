import {EventEmitter} from "events";

export default function ticker(num, callback) {
  const start = new Date().getTime()
  const event = new EventEmitter()
  let count = 0
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
