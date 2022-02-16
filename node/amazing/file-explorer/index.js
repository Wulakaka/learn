/**
 * Module dependencies.
 */

var fs = require('fs')
fs.readdir('./', function (err,files) {
  if (err) {
    console.error(err)
  }
  console.log(files)
})