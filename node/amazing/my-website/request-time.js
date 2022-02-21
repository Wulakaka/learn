/**
 * 请求时间中间件
 *
 * 选项
 *   - 'time'('Number'): 超时阈值（默认100）
 *
 * @param {Object} options
 * @api public
 */
module.exports = function (options) {
  const time = options.time || 100
  return function (req,res, next) {
    const timer = setTimeout(function () {
      console.log(
        '\033[90m%s %s\033[39m \033[91mis taking too long!\033[39m',
        req.method,
        req.url
      )
    }, time)

    // 在中间件中常用的模式叫重写方法（monkey-patch）
    const end = res.end
    res.end = function (chunk, encoding) {
      res.end = end;
      res.end(chunk, encoding)
      clearTimeout(timer)
    }
    next()
  }
}