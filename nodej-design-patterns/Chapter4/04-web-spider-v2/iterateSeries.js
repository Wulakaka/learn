export default function iterateSeries(collection, iteratorCallback, finalCallback) {
  if (collection.length === 0) {
    return process.nextTick(finalCallback)
  }
  function iterate(index){
    if (index === collection.length) {
      // 出现这种情况只会在所有任务都执行完毕后，所以不需要用 nextTick
      return finalCallback()
    }
    const item = collection[index]
    item((err, data) => {
      if (err) {
        return finalCallback(err)
      }
      iteratorCallback(null, data)
      return iterate(index + 1)
    })
  }
  iterate(0)
}
