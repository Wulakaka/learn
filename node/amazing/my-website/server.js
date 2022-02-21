const connect = require('connect')
// 创建服务
const server= connect.createServer()
server.use(connect.static(__dirname + '/website'))
server.listen(3000)