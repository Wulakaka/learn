const fs = require('fs')

const content = '一些内容'

const path = require('path')

const filePath = path.resolve('src', 'test.txt')

fs.writeFile(filePath, content,{flag: 'a+'}, err =>{
    if (err) {
        console.error(err)
        return
    }
    console.log('写入成功')
})

fs.appendFile(filePath,'另外一些内容', err => {
    if (err) {
        console.error(err)
        return
    }
})

// try{
//     fs.writeFileSync(filePath, content)
//     console.log(data)
// } catch (err) {
//     console.error(err)
// }