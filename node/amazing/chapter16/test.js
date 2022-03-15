const assert = require("assert");
it('should not throw', function(done) {
  setTimeout(function(){
    assert.ok(1 == 1)
    done()
    // throw new Error('An Error')
  }, 100)
})
