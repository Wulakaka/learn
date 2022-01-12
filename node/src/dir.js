const fs = require('fs')
const path = require('path')
const fsExtra = require('fs-extra')
const folderPath = 'src'
// fs.access(folderPath, (err) => {
//     if (err) {
//         console.error(err)
//         return
//     }
// })
try {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
    }
}catch (err) {
    console.error(err)
}

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile()
}

try {
    const data = fs.readdirSync(folderPath)
    console.log(data)
    const list = data.map(fileName => {
        return path.join(folderPath,fileName)
    }).filter(isFile)
    console.log(list)
}
 catch (err) {
    console.error(err)
}

fsExtra.remove('src/test', err=> {
    if (err) {
        console.error(err)
    }
    console.log('remove success')
})