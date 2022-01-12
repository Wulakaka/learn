const get = require('src/get')

const options = {
    hostname: 'nodejs.cn',
    port: 443,
    path: '/todos',
    method: 'GET'
}

const req = get.request(options, res => {
    console.log(`状态码：${res.statusCode}`)
    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error(error)
})

req.end()