import removeDuplicates from "../src/leetcode/removeDuplicates.mjs";
import {add} from "../src/add.mjs";
import assert from 'assert';
describe('删除重复元素', function () {
    describe('#removeDuplicates()', function () {
        it('should return 3 when the value is [1,1,2,3,3]', function () {
            assert.equal(removeDuplicates([1,1,2,3,3]), 3)
        });
    })

})
it('should add to numbers from an es module', () => {
    assert.equal(add(3, 5), 8);
});
