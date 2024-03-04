<template>
  <div class="wrap">
    <Back :title="title" @click-left="onClickLeft"></Back>
    <div class="title">
      <p>昨日总收益</p>
      <div class="money">1,547.00</div>
      <div class="icon"></div>
    </div>
    <Detail title="Compound 收益" :money="45.00"></Detail>
    <Detail title="团队收益" :money="45.00"></Detail>
    <Detail title="认购收益" :money="45.00" :flag="true" :propsData="propsData" :type="1"></Detail>
    <Detail title="推荐收益" :money="45.00" :flag="true" :propsData2="propsData2" :type="2"></Detail>
  </div>
</template>

<script setup lang="ts" name="totalEarningsYesterday">
import Back from '@/components/Back.vue'
import Detail from '@/components/Detail.vue'
import useTotalEarningsYesterday from '@/hooks/totalEarningsYesterday';
const { title, propsData, propsData2, onClickLeft } = useTotalEarningsYesterday()
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #F7F7F7;
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