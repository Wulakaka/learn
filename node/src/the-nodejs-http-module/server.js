const http = require('http')
const server = http.createServer((req, res) => {
  console.log(req.url, req.method)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
})

const hostname = '127.0.0.1'
const port = 3000
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})