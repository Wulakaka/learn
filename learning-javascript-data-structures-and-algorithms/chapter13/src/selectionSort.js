import { Compare, defaultCompare, swap } from "../../util";

/**
 * 选择排序
 * 找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放置在第二位
 * @param array
 * @param compareFn
 * @returns {*}
 */
export default function selectionSort(array, compareFn = defaultCompare) {
  const { length } = array;
  let indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i;
    for (let j = i; j < length; j++) {
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      swap(array, i, indexMin);
    }
  }
  return array;
}
