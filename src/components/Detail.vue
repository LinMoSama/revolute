<template>
  <div class="detail" @click="rotate" :class="{ 'radius': flag }">
    <i class="icon" v-if="flag" :class="{ 'rotate': f }"></i>
    <p>{{ title }}</p>
    <p class="p2">{{ money }}USDT</p>
  </div>
  <transition name="fade" mode="in-out">
    <div class="content" v-if="flag && f">
      <template v-if="type === 1">
        <div class="item" v-for="(item, index) in propsData" :key="index">
          <div class="product">{{ item.product }}</div>
          <div class="money">{{ item.money }}</div>
        </div>
      </template>
      <template v-else-if="type === 2">
        <div class="item" v-for="(item, index) in propsData2" :key="index">
          <div class="account">{{ item.acc }}</div>
          <div class="classify">{{ item.classify }}</div>
          <div class="money">{{ item.income }}</div>
        </div>
      </template>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { propsDataInter, propsDataInter2 } from '@/types/index'
let f = ref(false)
const props = defineProps<{
  flag?: boolean,
  propsData?: propsDataInter[],
  propsData2?: propsDataInter2[],
  title: string,
  money: number,
  type?: number
}>()

function rotate() {
  if (!props.flag) return
  f.value = !f.value
}

</script>

<style lang="scss" scoped>
.detail {
  position: relative;
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

  .icon {
    &::after {
      position: absolute;
      top: 28px;
      right: 14px;
      display: inline-block;
      width: 12px;
      height: 12px;
      content: '';
      background: url('@/assets/images/topArrow.png') no-repeat;
      transform: rotate(180deg);
      transition: all 0.3s ease;
    }
  }


}

.content {
  padding: 16px 14px 0 16px;
  width: 325px;
  min-height: 124px;
  background: rgba(14, 20, 70, 0.03);
  border-radius: 0px 0px 10px 10px;

  .item {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    font-family: Poppins, Poppins;
    font-weight: 400;
    font-size: 12px;
    color: #313C5B;

    .account {
      line-height: 14px;
    }

    .classify {
      position: absolute;
      left: 80px;
      top: -2px;
      width: 42px;
      height: 16px;
      background: #0359BD;
      border-radius: 26px 26px 26px 26px;
      font-family: Poppins, Poppins;
      font-weight: 400;
      font-size: 12px;
      color: #FFFFFF;
      line-height: 16px;
      text-align: center;
    }

  }
}

/* fade为过渡名称 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
  /* 设置过渡属性及持续时间 */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  /* 初始状态与结束状态的不同值 */
}

.radius {
  border-radius: 10px 10px 0 0;
}


.detail .rotate::after {
  transform: rotate(0deg) !important;
}
</style>