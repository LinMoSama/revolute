<template>
  <div class="content">
    <div class="item">
      <img
        src="@/assets/images/pur_icon.png"
        alt=""
        v-if="item.financial_id === 1"
      />
      <img
        src="@/assets/images/pur_icon2.png"
        alt=""
        v-else-if="item.financial_id === 2"
      />
      <img
        src="@/assets/images/pur_icon3.png"
        alt=""
        v-else-if="item.financial_id === 3"
      />
      <div class="product">
        <p>{{ productType }}/{{ item.subscription }}天</p>
        <span :class="{ redemption: leaveDaysCom <= 0 }">{{
          isInFinancialManagement
        }}</span>
      </div>
      <div class="days_remaining" :class="{ days_0: leaveDaysCom <= 0 }">
        剩余天数: {{ leaveDaysCom }}天
      </div>
    </div>
    <div class="item">
      <div class="left">收益率</div>
      <div class="right">{{ item.income }}%</div>
    </div>
    <div class="item">
      <div class="left">预估收益</div>
      <div class="right">{{ yuJiSHouyi }} USDT</div>
    </div>
    <div class="item">
      <div class="left">投入本金</div>
      <div class="right">{{ mun }} USDT</div>
    </div>
    <div class="item">
      <div class="left">购买时间</div>
      <div class="right">{{ timeCom }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatDecimal } from '@/utils/utils'
const props = defineProps(['item'])
let productType = computed(() => {
  return props.item.financial_id === 1
    ? '产品一'
    : props.item.financial_id === 2
    ? '产品二'
    : '产品三'
})
let mun = computed(() => {
  return formatDecimal(Number(props.item.mun))
})

function calculateRemainingDays(
  timestampInSeconds: number,
  deadlineDays: number
) {
  // 当前时间戳，单位为秒
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000)

  // 给定时间戳距离当前时间的秒数差
  const timeDiffInSeconds = currentTimestampInSeconds - timestampInSeconds

  // 计算剩余天数
  const remainingDays = Math.floor(
    (deadlineDays * 24 * 60 * 60 - timeDiffInSeconds) / (24 * 60 * 60)
  )

  return remainingDays
}
// leaveDays 剩余天数
const leaveDaysCom = computed(() => {
  // console.log(calculateDaysRemaining(props.item.createtime, props.item.));
  let d = calculateRemainingDays(props.item.createtime, props.item.subscription)
  return d >= 0 ? d : 0
})

// 预计收益
const yuJiSHouyi = computed(() => {
  // return formatDecimal(Number(props.item.income))
  return formatDecimal(
    (Number(props.item.income) / 100) *
      Number(props.item.mun) *
      props.item.subscription
  )
})
let timeCom = computed(() => {
  const timestamp = props.item.createtime // 时间戳，单位为秒

  return formtTime(timestamp)
})
function formtTime(timestamp: number) {
  // 创建 Date 对象，传入时间戳乘以 1000（转换为毫秒）
  const date = new Date(timestamp * 1000)

  // 获取年、月、日、时、分、秒
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，需要加 1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // 组合成指定格式的字符串
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}
let isInFinancialManagement = computed(() => {
  return leaveDaysCom.value <= 0 ? '已赎回' : '理财中'
})
</script>

<style scoped lang="scss">
.content {
  margin-bottom: 26px;
  padding-top: 21px;
  padding-left: 16px;
  padding-right: 16px;
  width: 325px;
  background: #ffffff;
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
        color: #313c5b;
        line-height: 24px;
        margin-right: 72px;
      }

      span {
        font-weight: 400;
        font-size: 12px;
        color: #0359bd;
      }

      .redemption {
        color: #93989f;
      }
    }

    .days_remaining {
      width: 100px;
      height: 36px;
      background: #0359bd;
      border-radius: 25px 25px 25px 25px;
      font-weight: 600;
      font-size: 12px;
      color: #ffffff;
      text-align: center;
      line-height: 36px;
    }

    .days_0 {
      width: 100px;
      height: 36px;
      border-radius: 25px 25px 25px 25px;
      border: 1px solid #005abd;
      background-color: transparent;
      font-weight: 500;
      color: #313c5b;
    }
  }
}
</style>
