const fs = require('fs')
const formidable = require('formidable')
const path = require("path");
const uploadImgPath = path.resolve('./tmp/test.png')
console.log(uploadImgPath)
function start(response) {
  console.log("Request handler 'start' was called.")

  const body = '<html>'+
    '<head title="学习Node.js">'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.")

  const form = new formidable.IncomingForm()
  console.log('about to parse')
  form.parse(request, function(error, fields, files){
    console.log('parsing done')
    fs.copyFileSync(files.upload.filepath, uploadImgPath)
    fs.unlinkSync(files.upload.filepath)
    response.writeHead(200, {"Content-Type": 'text/html'})
    response.write('received image: <br/>')
    response.write('<img src="/show" alt="" />')
    response.end()
  })
}

function show (response) {
  console.log("Request handler 'show' was called.")
  fs.readFile(uploadImgPath, 'binary', function (error, file) {
    if (error) {
      response.writeHead(500, {'Content-Type': 'text/plain'})
      response.write(error + '\n')
      response.end()
    } else {
      response.writeHead(200, {'Content-Type': 'image/png'})
      response.write(file, 'binary')
      response.end()
    }
  })
}

exports.start = start
exports.upload = upload
exports.show = show