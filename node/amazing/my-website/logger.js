module.exports = function () {
  return function (req, res, next) {
    console.log('%s %s %d', req.method, req.url, res.statusCode)
    next()
  }
}