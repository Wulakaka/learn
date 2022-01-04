/**
 * 删除有序数字数组中的重复项目，利用双指针
 * 移动快指针，如果快指针指向的数字与慢指针不同，移动满指针到下一个，更新满指针指向的值，最后需要变更原数组
 * @param {number[]} nums
 * @return {number}
 */
export default function removeDuplicates(nums) {
    const length = nums.length
    if (length === 0) return 0
    if (length === 1) return 1
    let fast = 1, slow = 0;

    while (fast < length) {
        if (nums[fast] === nums[slow]) {
        } else {
            slow++
            nums[slow] = nums[fast]
        }
        fast++
    }
    // length为下标+1
    slow++
    // 删除原数组多余项
    nums.length = slow
    return slow
}

const arr = [1, 1, 2, 2, 3, 3]
console.log(removeDuplicates(arr))
console.log(arr)
