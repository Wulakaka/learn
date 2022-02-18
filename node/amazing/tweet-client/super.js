const request = require('superagent')
request.get('http://twitter.com/search.json')
  .send({q: 'Justin'})
  .end(function (res) {
    console.log(res.body)
  })