<template>
  <div>
    <scene
      id="container"
      :viewport="[300, 300]"
      :resolution="[600, 600]"
      contextType="2d"
    >
      <layer>
        <!--        <s-label @click="clicked" :font="font" :pos="[300, 300]" anchor="0.5">{{
          messages[idx]
        }}</s-label>-->
        <!--        <sprite
          :texture="require('@/assets/SBP.svg')"
          :pos="[300, 300]"
          anchor="0.5"
          :width="120"
          :height="120"
        ></sprite>-->
        <group v-for="(item, i) in arr" :key="i" :pos="item.pos">
          <s-label :font="font" :pos="[0, 0]" anchor="0.5">{{
            item.text
          }}</s-label>
          <s-path
            :d="item.d"
            :scale="1"
            strokeColor="red"
            lineWidth="1"
            :fillColor="item.fillColor"
            :pos="[50, 0]"
            bgColor="gray"
          ></s-path>
        </group>
      </layer>
    </scene>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      messages: ["Hello World", "Hello Vue", "Hello Sprite"],
      idx: 0,
      font: "18px Arial",
      arr: [
        {
          pos: [100, 100],
          text: "V",
          d: "M0,0L7,14L14,0",
          fillColor: "transparent",
        },
        {
          pos: [200, 100],
          text: "菱形",
          d: "M7,0l7,7L7,14,0,7Z",
          fillColor: "transparent",
        },
        {
          pos: [300, 100],
          text: "空心圆",
          d: "M7,0 A7,7 0 0,0 7,14 A7,7 0 0,0 7,0",
          fillColor: "transparent",
        },
        {
          pos: [400, 100],
          text: "倒三角",
          d: "M7,14L0,0H14Z",
          fillColor: "transparent",
        },
        {
          pos: [500, 100],
          text: "实心圆",
          d: "M7,0 A7,7 0 0,0 7,14 A7,7 0 0,0 7,0",
          fillColor: "red",
        },
        {
          pos: [100, 200],
          text: "实心小圆",
          d: "M7,3 A4,4 0 0,0 7,11 A4,4 0 0,0 7,3",
          fillColor: "red",
        },
        {
          pos: [200, 200],
          text: "圆中一点",
          d:
            "M7,0 A7,7 0 0,0 7,14 A7,7 0 0,0 7,0M7,6 A1,1 0 0,0 7,8 A1,1 0 0,0 7,6",
          fillColor: "transparent",
        },
        {
          pos: [300, 200],
          text: "圆中叉叉",
          d: "M7,0 A7,7 0 0,0 7,14 A7,7 0 0,0 7,0M3,3L11,11M3,11L11,3",
          fillColor: "transparent",
        },
        {
          pos: [400, 200],
          text: "倒V",
          d: "M0,14L7,0L14,14",
          fillColor: "transparent",
        },
        {
          pos: [500, 200],
          text: "三角",
          d: "M0,14L7,0L14,14Z",
          fillColor: "transparent",
        },
        {
          pos: [100, 300],
          text: "圆中竖",
          d: "M7,2 A5,5 0 0,0 7,12 A5,5 0 0,0 7,2M7,0V14",
          fillColor: "transparent",
        },
        {
          pos: [200, 300],
          text: "圆中横",
          d: "M7,2 A5,5 0 0,0 7,12 A5,5 0 0,0 7,2M0,7H14",
          fillColor: "transparent",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss">
#container {
  width: 600px;
  height: 600px;
  position: relative;
}
</style>
