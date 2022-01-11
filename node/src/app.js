const http = require('http')

const hostname = '127.0.0.1';
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World')
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

console.log('我的%s已经%d岁', '猫', 2)
console.log('%o', Number)
const oranges = ['橙子', '橙子']
const apples = ['苹果']
oranges.forEach(fruit => {
    console.count(fruit)
})
apples.forEach(fruit => {
    console.count(fruit)
})

const doSomething = () => console.log('测试')
const measureDoingSomething = () => {
    console.time('doSomething')
    doSomething()
    console.timeEnd('doSomething')
}
measureDoingSomething()

console.log('\x1b[33m%s\x1b[0m', '你好')
const chalk = require('chalk')
console.log(chalk.blue('测试'))

// process.argv.forEach((val,index) => {
//     console.log(`${index}:${val}`)
// })

// 用于截取参数，但是参数形式必须为--name=value
// const args = require('minimist')(process.argv.slice(2))
// console.log(args['name'] )//joe


const ProgressBar = require('progress')
const bar = new ProgressBar(':bar', {total: 10})
const timer = setInterval(() => {
    bar.tick()
    if (bar.complete) {
        clearInterval(timer)
        // 主动退出
        process.exit(1)
    }
}, 100)

