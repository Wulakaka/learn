<template>
  <div>
    <NestedSub :form="form"></NestedSub>
    {{form.foo}}
  </div>
</template>

<script setup>
import {reactive} from "vue";
import NestedSub from './NestedSub'

const form = reactive({
  foo: 1
})
</script>

<style scoped>

</style>