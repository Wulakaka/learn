const http = require('http')

const hostname ='127.0.0.1';
const port = 3000

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World')
})

server.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

// process.argv.forEach((val,index) => {
//     console.log(`${index}:${val}`)
// })

// 用于截取参数，但是参数形式必须为--name=value
// const args = require('minimist')(process.argv.slice(2))
// console.log(args['name'] )//joe

// 主动退出
process.exit(1)