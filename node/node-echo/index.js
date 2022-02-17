const {stdin} = process
stdin.resume()
stdin.on("data", function (data){
  data = data.toString('utf8')
  console.log(data === '\r\n')
})