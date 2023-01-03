export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

export const defaultCompare = (a, b) => {
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
};

export function swap(array, a, b) {
  [array[a], array[b]] = [array[b], array[a]];
}
