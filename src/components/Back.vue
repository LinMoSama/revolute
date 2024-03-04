<template>
  <div class="back"> <van-nav-bar :title="title" left-text="Back" left-arrow @click-left="onClickLeft" /></div>
</template>

<script setup lang="ts">
defineProps(['title'])
const emit = defineEmits(['click-left'])
function onClickLeft() {
  emit('click-left')
}
</script>

<style lang="scss" scoped>
.back {
  width: 100%;
}

:deep(.van-hairline--bottom:after) {
  border-bottom-width: 0
}
</style>