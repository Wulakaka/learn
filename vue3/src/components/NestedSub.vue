<template>
  <input type="text" v-model="form.foo">
</template>

<script setup>
import {defineProps, toRef} from "vue";

const props = defineProps({
  form: {
    required: true,
    type: Object
  }
})
// const form = props.form 会导致报错
const form = toRef(props, 'form')
</script>

<style scoped>

</style>