<template>
  <canvas ref="draw" width="1000" height="900" class="draw"></canvas>
</template>

<script>
import {onMounted, ref} from 'vue'
import lineData from '@/assets/data'

export default {
  name: 'CanvasDraw',
  setup() {
    const draw = ref(null)
    console.log(lineData.length)
    const scaleX = 10 / 200 * 10
    const scaleY = 10 / 0.5 * 10
    const list = lineData.map(({x, y}) => ({x: x * scaleX * 1000, y: scaleY - y * scaleY}))
    const list2 = lineData.map(({x, y}) => ({x: x * scaleX * 1000, y: scaleY * 2 - y * scaleY}))
      .filter((item, i) => {
        return i % 2 === 0
      })
    const list3 = lineData.map(({x, y}) => ({x: x * scaleX * 1000, y: scaleY * 3 - y * scaleY}))
      .filter((item, i) => {
        return i % 3 === 0
      })
    const list4 = lineData.map(({x, y}) => ({x: x * scaleX * 1000, y: scaleY * 4 - y * scaleY}))
      .filter((item, i) => {
        return i % 5 === 0
      })
    onMounted(() => {
      const ctx = draw.value.getContext('2d')
      ctx.strokeStyle = 'red'
      ctx.beginPath()
      ctx.moveTo(0, scaleY)
      list.forEach(({x, y}) => {
        ctx.lineTo(x, y)
      })
      ctx.stroke()
      ctx.strokeStyle = 'red'
      ctx.beginPath()
      ctx.moveTo(0, scaleY * 2)
      list2.forEach(({x, y}) => {
        ctx.lineTo(x, y)
      })
      ctx.stroke()
      ctx.strokeStyle = 'red'
      ctx.beginPath()
      ctx.moveTo(0, scaleY * 3)
      list3.forEach(({x, y}) => {
        ctx.lineTo(x, y)
      })
      ctx.stroke()
      ctx.strokeStyle = 'red'
      ctx.beginPath()
      ctx.moveTo(0, scaleY * 4)
      list4.forEach(({x, y}) => {
        ctx.lineTo(x, y)
      })
      ctx.stroke()
      ctx.strokeStyle = 'blue'
      ctx.beginPath()
      ctx.moveTo(0, scaleY)
      ctx.lineTo(1000, scaleY)
      ctx.stroke()
    })
    return {
      draw
    }
  }
}
</script>

<style scoped>
.draw {
  width: 1000px;
  height: 900px;
}
</style>
