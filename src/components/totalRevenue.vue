<template>
  <div class="total-revenue">
    <div class="total_earnings_yesterday" @click="goTotalEarningsYesterday">
      <div class="icon">
        <img src="@/assets/images/income1.png" alt="">
      </div>
      <div class="title">
        <p class="revenue_title">昨日总收益</p>
        <div class="money">1,572 USDT</div>
      </div>
    </div>
    <div class="total_earnings">
      <div class="icon">
        <img src="@/assets/images/income2.png" alt="">
      </div>
      <div class="title">
        <p class="revenue_title">总收益</p>
        <div class="money">12, USDT</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function goTotalEarningsYesterday() {
  router.push({
    name: 'TotalEarningsYesterday',
  })
}
</script>

<style scoped lang="scss">
.total-revenue {
  width: 325px;
  display: flex;
  justify-content: space-between;

  .total_earnings_yesterday,
  .total_earnings {
    display: flex;
    padding-left: 15px;
    align-items: center;
    width: 158px;
    height: 68px;
    background: #EBF2FF;
    border-radius: 10px 10px 10px 10px;

    .icon {
      margin-right: 6px;

      img {
        width: 30px;
        height: 30px;
      }
    }

    .title {
      display: flex;
      flex-direction: column;

      .revenue_title {
        position: relative;
        margin-bottom: 6px;
        color: #464E59;
        font-size: 12px;

        &::after {
          display: inline-block;
          position: absolute;
          margin-left: 2px;
          width: 12px;
          height: 12px;
          content: '';
          line-height: 12px;
          background: url('@/assets/images/rightArrow.png') 100% no-repeat;
        }
      }

      .money {
        font-weight: bold;
        font-size: 14px;
        color: #313C5B;
      }
    }
  }

  .total_earnings {
    .revenue_title {
      &::after {
        content: '';
        background: none !important;
      }
    }
  }

}
</style>