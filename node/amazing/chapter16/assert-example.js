const assert = require('assert')
const now = Date.now()
console.log(now)
assert.ok(now % 2 === 0)
