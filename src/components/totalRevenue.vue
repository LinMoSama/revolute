<template>
  <div class="total-revenue">
    <div class="total_earnings_yesterday" @click="goTotalEarningsYesterday">
      <div class="icon">
        <img src="@/assets/images/income1.png" alt="" />
      </div>
      <div class="title">
        <p class="revenue_title">昨日总收益</p>
        <div class="money" v-if="token === ''">0.00 USDT</div>
        <div class="money" v-else>{{ yesterdayCom }} USDT</div>
      </div>
    </div>
    <div class="total_earnings">
      <div class="icon">
        <img src="@/assets/images/income2.png" alt="" />
      </div>
      <div class="title">
        <p class="revenue_title">总收益</p>
        <div class="money" v-if="token === ''">0.00 USDT</div>
        <div class="money" v-else>{{ sumAwardCom }} USDT</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatDecimal } from '@/utils/utils'

const props = defineProps(['isShowReferenceHandler', 'awardList'])
const router = useRouter()
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
const { token } = storeToRefs(useUserStore())
const yesterdayCom = computed(() => {
  return props.awardList.yesterday === null
    ? '0.00'
    : formatDecimal(props.awardList.yesterday)
})
const sumAwardCom = computed(() => {
  return props.awardList.sum_award === null
    ? '0.00'
    : formatDecimal(props.awardList.sum_award)
})
function goTotalEarningsYesterday() {
  if (props.isShowReferenceHandler()) {
    router.push({
      name: 'TotalEarningsYesterday',
    })
  }
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
    background: #ebf2ff;
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
        color: #464e59;
        font-size: 12px;

        &::after {
          display: inline-block;
          position: absolute;
          margin-left: 2px;
          width: 12px;
          height: 12px;
          content: '';
          line-height: 12px;
          background: url('@/assets/images/rightArrow.png') no-repeat;
          background-size: 100% 100%;
        }
      }

      .money {
        font-weight: bold;
        font-size: 14px;
        color: #313c5b;
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
