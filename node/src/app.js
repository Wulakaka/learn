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

process.argv.forEach((val,index) => {
    console.log(`${index}:${val}`)
})

const args = require('minimist')(process.argv.slice(2))
console.log(args['name'] )//joe

process.exit(1)