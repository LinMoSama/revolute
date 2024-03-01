<template>
  <div class="wrap">
    <div class="back"> <van-nav-bar :title="title" left-text="Back" left-arrow @click-left="onClickLeft" /></div>
    <div class="title">

      <p>昨日总收益</p>
      <div class="money">1,547.00</div>
      <div class="icon"></div>
    </div>
    <Detail title="Compound 收益" :money="45.00"></Detail>
    <Detail title="团队收益" :money="45.00"></Detail>
  </div>
</template>

<script setup lang="ts" name="totalEarningsYesterday">
// import { onMounted } from 'vue'
import Detail from '@/components/Detail.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const { params: { title } } = useRoute()
function onClickLeft() {
  router.back()
}
</script>

<style lang="scss" scoped >
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #F7F7F7;
}

.back {
  width: 100%;
}

.title {
  position: relative;
  width: 100%;
  height: 109px;
  background-color: #4162FF;
  font-weight: 500;
  color: #FFFFFF;
  text-align: center;
  overflow: hidden;

  p {
    margin: 26px 0 9px;
    font-size: 12px;
  }

  .money {
    font-size: 36px;
  }

  .icon {
    position: absolute;
    left: -380px;
    top: 190px;
    width: 585px;
    height: 285px;
    background: linear-gradient(299deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
    border-radius: 0px 0px 0px 0px;
    // 旋转
    transform: rotate(147.25deg);
  }
}
</style>