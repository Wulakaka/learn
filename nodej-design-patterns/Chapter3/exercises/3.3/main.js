import ticker from "./ticker.js";

const {stdin, stdout} = process

const start = () => {
  stdout.write('enter num:')
  stdin.resume()
// 设置编码格式为utf8，这样就可以输入特殊字符
  stdin.setEncoding('utf8')

  const handleInput = (num) => {
    // 将流暂停（回到默认状态）
    stdin.pause();
    const handleTick = () => console.log('tick')
    let event = ticker(num, (err, count) => {
      event.removeListener('tick', handleTick)
      event = null
      if (err) {
        console.error(err)
      } else {
        console.log(count)
      }
      start()
    })
    event.on('tick', handleTick)
  }

  stdin.once("data", handleInput)
}

start()
