exports.loaded = false
const b = require('./b')
module.exports = {
    b,
    // overrides previous export
    loaded: true,
}