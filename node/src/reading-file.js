const fs = require('fs')
const path = require('path')
const filePath = path.resolve('src','test.txt')
console.log(filePath)
fs.readFile(filePath, 'utf8', (err,data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(data)
})

try {
    const data = fs.readFileSync(filePath, 'utf8')
    console.log(data)
} catch (err) {
    console.error(err)
}