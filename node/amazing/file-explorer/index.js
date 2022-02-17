/**
 * Module dependencies.
 */

var fs = require('fs')
const {stdin, stdout} = process
const e = require("express");
fs.readdir(process.cwd(), function (err,files) {
  console.log(''); // 一个空行

  if (!files.length) {
    return console.log(' \033[31m No files to show!\033[39m\n')
  }

  console.log(' Select which file or directory you want to see\n')

  // 保留所有Stat对象
  const stats = [];
  // called for each file walked in the directory
  function file (i) {
    var filename = files[i];
    fs.stat(__dirname + '/' + filename, function (err, stat) {
      stats[i] =stat;
      if (stat.isDirectory()) {
        console.log('   ' +i+'   \033[36m' + filename + '/\033[39m')
      } else {
        console.log('   ' +i+'   \033[90m' + filename + '/\033[39m')
      }

      i++;
      if (i === files.length) {
        read()
      } else {
        file(i)
      }
    })
  }

  // read user input when files are shown
  function read() {
    console.log('')
    stdout.write('   \033[33mEnter your choice: \033[39m');
    // 等待用户输入
    stdin.resume()
    // 设置编码格式为utf8，这样就可以输入特殊字符
    stdin.setEncoding('utf8')

    stdin.on("data", option)
  }

  // called with the option supplied by the user
  function option(data) {
    const filename = files[Number(data)]
    if (!filename) {
      stdout.write('   \033[31mEnter your choice: \033[39m');
    } else {
      // 将流暂停（回到默认状态）
      stdin.pause();
      if (stats[Number(data)].isDirectory()) {
        fs.readdir(__dirname + '/' + filename, function (err, files) {
          console.log('')
          console.log('   (' + files.length + ' files)')
          files.forEach(function (file) {
            console.log('   -   ' + file)
          })
          console.log('')
        })
      } else {
        // 指定编码
        fs.readFile(__dirname+ '/' + filename, 'utf8', function (err,data) {
          console.log('')
          console.log('\033[90m' + data.replace(/(.*)g/, '   $1') + '\033[39m')
        })
      }
    }
  }

  file(0)
})