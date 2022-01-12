const fs = require('fs')
fs.open('C://Users/admin/test.txt', 'r', (err, fd) => {
    console.log(fd)
})

try{
    const fd = fs.openSync('C://Users/admin/test.txt', 'r')
    console.log(fd)
} catch (err) {
    console.error(err)
}