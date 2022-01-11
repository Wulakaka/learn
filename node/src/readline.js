// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
//
// readline.question('你叫什么名字？', name =>{
//     console.log(`你好 ${name}`)
//     readline.close()
// })

// 使用inquirer
const inquirer = require('inquirer')
const question = [
    {
        type:'input',
        name: 'name',
        message: '你叫什么名字？'
    }
]

inquirer.prompt(question).then(answers => {
    console.log(`你好 ${answers['name']}!`)
})