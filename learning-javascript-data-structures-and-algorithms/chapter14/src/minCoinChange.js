export default function minCoinChange(coins, amount) {
  const cache = [];
  const makeChange = (value) => {
    if (!value) {
      return [];
    }

    if (cache[value]) {
      return cache[value];
    }

    // 针对 value 的解法
    let min = [];

    // 针对 value - coin 的解法
    let newMin;

    // 存储新找钱总数
    let newAmount;
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      newAmount = value - coin;

      if (newAmount >= 0) {
        newMin = makeChange(newAmount);
      }

      if (
        newAmount >= 0 &&
        (newMin.length < min.length - 1 || !min.length) &&
        (newMin.length || !newAmount)
      ) {
        min = [coin].concat(newMin);
        console.log(`new Min ${min} for ${value}`);
      }
    }
    return (cache[value] = min);
  };
  return makeChange(amount);
}

export function customMinCoinChange(coins, amount) {
  const cache = [];
  const makeChange = (value) => {
    if (!value) {
      return [];
    }

    if (cache[value]) {
      return cache[value];
    }

    let resultForValue = [];
    let resultForNewAmount = [];

    coins.forEach((coin) => {
      const newAmount = value - coin;
      if (newAmount >= 0) {
        resultForNewAmount = makeChange(newAmount);
      }
      /**
       * 新计算的值必须合法
       * 新结果的length小于之前的结果，或者之前没有结果
       * 新结果必须有length，代表结果有效；但是如果newAmount为0，resultForNewAmount.length也有效
       */
      if (
        newAmount >= 0 &&
        (resultForNewAmount.length + 1 < resultForValue.length ||
          !resultForValue.length) &&
        (resultForNewAmount.length || newAmount === 0)
      ) {
        resultForValue = [coin].concat(resultForNewAmount);
        console.log(`result for value ${value} ${resultForValue}`);
        cache[value] = resultForValue;
      }
    });

    return resultForValue;
  };
  return makeChange(amount);
}
