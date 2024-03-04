<template>
  <div class="content">
    <div class="item">
      <img src="@/assets/images/pur_icon.png" alt="" v-if="type === 1">
      <img src="@/assets/images/pur_icon2.png" alt="" v-else-if="type === 2">
      <img src="@/assets/images/pur_icon3.png" alt="" v-else-if="type === 3">
      <div class="product">
        <p>{{ productType }}/{{ days }}天</p>
        <span :class="{ 'redemption': !inFinancialManagement }">{{ isInFinancialManagement }}</span>
      </div>
      <div class="days_remaining" :class="{ 'days_0': leveDays <= 0 }">
        剩余天数: {{ leveDays }}天
      </div>
    </div>
    <div class="item">
      <div class="left">收益率</div>
      <div class="right">0.8%</div>
    </div>
    <div class="item">
      <div class="left">预估收益</div>
      <div class="right">54,574.00 USDT</div>
    </div>
    <div class="item">
      <div class="left">投入本金</div>
      <div class="right">12,457.00 USDT</div>
    </div>
    <div class="item">
      <div class="left">购买时间</div>
      <div class="right">2024/02/15 12:15:35</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(['type', 'days', 'inFinancialManagement', 'leveDays'])
let productType = computed(() => {
  return props.type === 1 ? '产品一' : props.type === 2 ? '产品二' : '产品三'
})
let isInFinancialManagement = computed(() => {
  return props.inFinancialManagement ? '理财中' : '已赎回'
})
</script>

<style scoped lang="scss">
.content {
  margin-bottom: 26px;
  padding-top: 21px;
  padding-left: 16px;
  padding-right: 16px;
  width: 325px;
  background: #FFFFFF;
  border-radius: 10px 10px 10px 10px;

  .item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    font-weight: 400;
    font-size: 12px;
    color: rgba(49, 60, 91, 0.6);

    img {
      margin-right: 12px;
      width: 40px;
      height: 40px;
    }

    .product {
      display: flex;
      flex-direction: column;

      p {
        width: 100%;
        font-weight: 600;
        font-size: 12px;
        color: #313C5B;
        line-height: 24px;
        margin-right: 72px;
      }

      span {
        font-weight: 400;
        font-size: 12px;
        color: #0359BD;
      }

      .redemption {
        color: #93989F;
      }
    }

    .days_remaining {
      width: 100px;
      height: 36px;
      background: #0359BD;
      border-radius: 25px 25px 25px 25px;
      font-weight: 600;
      font-size: 12px;
      color: #FFFFFF;
      text-align: center;
      line-height: 36px
    }

    .days_0 {
      width: 100px;
      height: 36px;
      border-radius: 25px 25px 25px 25px;
      border: 1px solid #005ABD;
      background-color: transparent;
      font-weight: 500;
      color: #313C5B;
    }
  }
}
</style>