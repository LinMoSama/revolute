<template>
  <div class="pur_wrap">
    <Banner :menu="menu" title="我的认购"></Banner>
    <Menu ref="menu"></Menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
const menu = ref()
</script>

<style lang="scss" scoped>
.pur_wrap {}
</style>