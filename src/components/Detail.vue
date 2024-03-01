<template>
  <div class="detail">
    <p>{{ title }}</p>
    <p class="p2">{{ money }}USDT</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  money: {
    type: Number,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.detail {
  margin-top: 16px;
  padding: 9px 0 0px 16px;
  width: 325px;
  height: 68px;
  background: #FFFFFF;
  border-radius: 10px 10px 10px 10px;

  p {
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 14px;
    color: #0E1446;
  }

  .p2 {
    font-weight: 600;
    font-size: 16px;
    color: #0359BD;
  }
}
</style>