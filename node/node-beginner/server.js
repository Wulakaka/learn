const http = require('http')
const url = require('url')

function start(route, handle) {
  function onRequest(request, response) {
    const pathname = url.parse(request.url).pathname
    console.log(`Request for ${pathname} received.`)
    route(handle, pathname, response, request)
  }

  http.createServer(onRequest).listen(8888)
  console.log('Server has started.')
}

exports.start = start