import { Compare, defaultCompare } from "../../util";

/**
 * 插入排序
 * 每次排一个数组项，以此方式构建最后的排序数组。假定第一项已经排序了。接着，它和第二项进行比较——第二项是应该待在原位还是插入到第一项之前呢？
 * 这样头两项就已正确排序，接着和第三项比较
 * @param array
 * @param compareFn
 * @returns {*}
 */
export default function insertionSort(array, compareFn = defaultCompare) {
  const { length } = array;
  debugger;
  let temp;
  for (let i = 1; i < length; i++) {
    let j = i;
    temp = array[i];
    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = temp;
  }
  return array;
}
