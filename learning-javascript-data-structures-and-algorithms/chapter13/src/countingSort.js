/**
 * 计数排序
 *
 * 书中的方法会修改原数组
 * @param array
 * @returns {*}
 */
export default function countingSort(array) {
  if (array.length < 2) {
    return array;
  }
  const maxValue = findMaxValue(array);
  const counts = new Array(maxValue + 1);
  array.forEach((element) => {
    if (!counts[element]) {
      counts[element] = 0;
    }
    counts[element]++;
  });
  let sortedIndex = 0;
  counts.forEach((count, i) => {
    while (count > 0) {
      array[sortedIndex++] = i;
      count--;
    }
  });
  return array;
}

function findMaxValue(array) {
  let max = array[0];
  for (let i = 0; i < array.length; i++) {
    if (max < array[i]) {
      max = array[i];
    }
  }
  return max;
}

export function customCountingSort(array) {
  const max = findMaxValue(array);
  // +1 是为了让索引值与数组元素对应，如果最大数值为4，数组的长度应该为5，这样最大位的索引值就是4
  const arr = new Array(max + 1).fill(0);
  array.forEach((element) => {
    arr[element]++;
  });
  return arr.reduce((acc, i, index) => {
    while (i > 0) {
      acc.push(index);
      i--;
    }
    return acc;
  }, []);
}
