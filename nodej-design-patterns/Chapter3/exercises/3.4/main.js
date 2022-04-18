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
    const handleTick = (difference) => console.log('tick', `difference: ${difference}`)
    const handleError = err => console.error(`Error emitted at ${err}`)
    let event = ticker(num, (err, count) => {
      if (err) {
        return handleError(err)
      }
      console.log(`total count: ${count}`)
      event = null
      start()
    })
    event.on('tick', handleTick)
    event.on('error', handleError)
  }

  stdin.once("data", handleInput)
}

start()
