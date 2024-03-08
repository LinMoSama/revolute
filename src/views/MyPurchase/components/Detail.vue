<template>
  <div class="content">
    <Back :title="title" @click-left="onClickLeft"></Back>
    <div class="top_bg">
      <div class="all_balance">
        <div class="title">总余额</div>
        <div class="money">{{ formatDecimal(userInfo.money_award) }}</div>
      </div>

      <div class="income">
        <div class="yes_income">
          <div class="title">昨日收益</div>
          <div class="money">{{ formatDecimal(yesterday) }}</div>
        </div>
        <div class="hr"></div>
        <div class="accumulations">
          <div class="title">累积收益</div>
          <div class="money">{{ formatDecimal(sum_award) }}</div>
        </div>
      </div>
      <div class="Tips" @click="tipHandler">
        <img src="../../../assets/images/!.png" alt="" />
        <p>温馨提示</p>
      </div>

      <div class="btn" @click="TransferOut">转出</div>
    </div>
    <div class="tabs" @scroll="scrollLoading">
      <van-tabs v-model:active="active" shrink>
        <van-tab title="全部">
          <div v-if="awardList.length === 0" class="no_data">暂无数据</div>

          <div
            class="item"
            v-for="(item, index) in awardList"
            :key="index"
            v-else
          >
            <div class="left">
              <p>Compound Pool</p>
              <!-- <span>{{ formtTime(item.createtime) }}</span> -->
              <span>{{ item.createtime }}</span>
            </div>
            <div class="right">
              <p>{{ titleComputed }}</p>
              <span>+{{ formatDecimal(item.mun) }}USDT</span>
            </div>
          </div>
        </van-tab>

        <van-tab title="认购收益">
          <div v-if="awardList2.length === 0" class="no_data">暂无数据</div>

          <div
            class="item"
            v-for="(item, index) in awardList2"
            :key="index"
            v-else
          >
            <div class="left">
              <p>Compound Pool</p>
              <span>{{ formtTime(item.createtime) }}</span>
            </div>
            <div class="right">
              <p>认购收益</p>
              <span>+{{ formatDecimal(item.mun) }}USDT</span>
            </div>
          </div>
        </van-tab>

        <van-tab title="转出记录">
          <div v-if="moneyLogList.length === 0" class="no_data">暂无数据</div>
          <div
            class="item"
            v-for="(item, index) in moneyLogList"
            :key="index"
            v-else
          >
            <div class="left">
              <p>Compound Pool</p>
              <span>{{ formtTime(item.createtime) }}</span>
            </div>
            <div class="right">
              <p>转出记录</p>
              <span class="zhuanchu">-{{ formatDecimal(item.money) }}USDT</span>
            </div>
          </div>
        </van-tab>

        <van-tab title="复利收益">
          <div v-if="awardList3.length === 0" class="no_data">暂无数据</div>

          <div
            class="item"
            v-for="(item, index) in awardList3"
            :key="index"
            v-else
          >
            <div class="left">
              <p>Compound Pool</p>
              <span>{{ formtTime(item.createtime) }}</span>
            </div>
            <div class="right">
              <p>复利收益</p>
              <span>+{{ formatDecimal(item.mun) }}USDT</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>

  <Alert
    title="转出"
    :alert-show="alertShow"
    :flag="true"
    :zhuanchu="true"
    :userInfo="userInfo"
    @close-alert="closeAlert"
    @confirm-alert="confirmHandler"
  >
  </Alert>
  <Alert
    title="温馨提示"
    :alert-show="tipAlertShow"
    :hiddenInput="true"
    :hiddenCancel="true"
    :tipTextShow="true"
    @confirm-alert="tipConfirmHandler"
  >
  </Alert>

  <Alert
    title="转出成功"
    :alert-show="transferOutSucc"
    @confirm-alert="TransferOutSuccHandler"
    :hiddenCancel="true"
    :transferSucc="true"
    :hiddenInput="true"
  >
  </Alert>
  <Alert
    title="转出失败"
    :alert-show="transferOutFail"
    :transferFail="true"
    @confirm-alert="TransferOutFailHandler"
    :hiddenCancel="true"
    :hiddenInput="true"
  >
  </Alert>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import Back from '@/components/Back.vue'
import Alert from '@/components/Alert.vue'
import { formatDecimal } from '@/utils/utils'
import { useRoute, useRouter } from 'vue-router'
import {
  getAwardList,
  getUserInfo,
  compoundOut,
  getMoneyLog,
} from '@/service/api'
const {
  meta: { title },
} = useRoute()
import { ref, watch } from 'vue'
const router = useRouter()
const active = ref(0)
let list_rows = ref(20)
let alertShow = ref(false)
let tipAlertShow = ref(false)
let transferOutSucc = ref(false)
let transferOutFail = ref(false)
const moneyLogList = ref({} as any)
const awardList = ref([] as any)
const awardList2 = ref([] as any)
const awardList3 = ref([] as any)
const userInfo = ref({} as any)
let yesterday = ref(0)
let sum_award = ref(0)
let totalList = ref(0)
let page = ref(1)
function scrollLoading(e: any) {
  const dom = e.target
  var scrollTop = dom.scrollTop //滑入屏幕上方的高度
  var windowHeitht = dom.clientHeight //能看到的页面的高度
  var scrollHeight = dom.scrollHeight //监控的整个div的高度（包括现在看到的和上下隐藏起来看不到的）
  let total = scrollTop + windowHeitht
  if (parseInt(total) >= parseInt(scrollHeight) - 10) {
    if (
      awardList.value.length >= totalList.value ||
      moneyLogList.value.length >= totalList.value
    ) {
      return
    } else {
      page.value++
      if (active.value === 0) {
        getAwardListHandler(0)
      }
      if (active.value === 1) {
        getAwardListHandler(1)
      }
      if (active.value === 2) {
        getMoneyLogHandler()
      }
      if (active.value === 3) {
        getAwardListHandler(2, true)
      }
    }
  }
}
const titleComputed = computed(() => {
  let title = ''
  awardList.value.forEach((ele: any) => {
    if (ele.type === 1) {
      title = '认购收益'
    } else if (ele.type === 2) {
      title = '复利收益'
    }
  })
  return title
})
//获取奖励明细
async function getAwardListHandler(type: number = 2, flag: boolean = false) {
  const res = await getAwardList({
    var_page: page.value,
    list_rows: 20,
    award_type: type,
  })

  if (type === 0) {
    totalList.value = res.data.data.total
    awardList.value = [...awardList.value, ...res.data.data.data]
  }
  if (type === 1) {
    totalList.value = res.data.data.total
    awardList2.value = [...awardList2.value, ...res.data.data.data]
  }
  if (type === 2 && !flag) {
    yesterday.value = res.data.data.yesterday
    sum_award.value = res.data.data.sum_award
  }
  if (type === 2 && flag) {
    totalList.value = res.data.data.total
    awardList3.value = [...awardList3.value, ...res.data.data.data]
  }
}
// 获取用户信息
async function getUserInfoHandle() {
  const res2 = await getUserInfo()
  userInfo.value = res2.data.data
}
// const handleScroll = () => {
//   const scrollElement = scrollContainer.value
//   if (
//     scrollElement &&
//     scrollElement.scrollTop + scrollElement.clientHeight >=
//       scrollElement.scrollHeight
//   ) {
//     console.log('加载');
//     list_rows.value++
//     getAwardListHandler(0)
//   }
// }
onMounted(() => {
  getAwardListHandler()
  getAwardListHandler(0)
  getUserInfoHandle()
})

// 获取余额变动记录
async function getMoneyLogHandler() {
  const res = await getMoneyLog({
    var_page: page.value,
    list_rows: 20,
    mome: '复利池转出',
  })
  totalList.value = res.data.data.total
  moneyLogList.value = res.data.data.data
}
watch(active, () => {
  if (active.value === 0) {
    page.value = 1
    awardList2.value = []
    awardList3.value = []
    moneyLogList.value = []
    getAwardListHandler(0)
  }
  if (active.value === 1) {
    page.value = 1
    awardList.value = []
    awardList3.value = []
    moneyLogList.value = []
    getAwardListHandler(1)
  }
  if (active.value === 2) {
    page.value = 1
    awardList2.value = []
    awardList3.value = []
    awardList.value = []
    getMoneyLogHandler()
  }
  if (active.value === 3) {
    page.value = 1
    awardList.value = []
    awardList2.value = []
    moneyLogList.value = []

    getAwardListHandler(2, true)
  }
})

function formtTime(timestamp: number) {
  // 创建 Date 对象，传入时间戳乘以 1000（转换为毫秒）
  const date = new Date(timestamp * 1000)

  // 获取年、月、日、时、分、秒
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，需要加 1
  const day = String(date.getDate()).padStart(2, '0')
  // 组合成指定格式的字符串
  return `${year}/${month}/${day}`
}
function tipHandler() {
  tipAlertShow.value = true
}
function tipConfirmHandler() {
  tipAlertShow.value = false
}
function onClickLeft() {
  router.back()
}
function TransferOut() {
  alertShow.value = true
}
function closeAlert() {
  alertShow.value = false
}
async function confirmHandler(val: any) {
  const res = await compoundOut({
    money: val,
  })
  if (res.data.code === 1) {
    getUserInfoHandle()
    getMoneyLogHandler()
    alertShow.value = false
    transferOutSucc.value = true
  } else if (res.data.code === 0) {
    transferOutFail.value = true
  }
}
function TransferOutSuccHandler() {
  transferOutSucc.value = false
}
function TransferOutFailHandler() {
  transferOutFail.value = false
}
</script>

<style scoped lang="scss">
.content {
  background-color: #f7f7f7;
  overflow: hidden;
  .no_data {
    text-align: center;
  }
  .tabs {
    margin-top: 26px;
    overflow: auto;
    height: 500px;
    .item {
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      width: 325px;
      height: 68px;
      background: #ffffff;
      border-radius: 10px 10px 10px 10px;
      padding: 14px 16px 0 16px;
      margin-bottom: 26px;
      font-weight: 500;
      font-size: 14px;
      color: #0e1446;

      .left {
        span {
          margin-top: 4px;
          font-weight: 400;
          font-size: 11px;
          color: #93989f;
        }
      }

      .right {
        p {
          text-align: right;
        }

        span {
          font-weight: 600;
          font-size: 16px;
          color: #0359bd;
          line-height: 19px;
        }

        .zhuanchu {
          color: #ff0000;
        }
      }

      .left p,
      .right p {
        margin-bottom: 5px;
      }
    }
  }

  .top_bg {
    padding-top: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 280px;
    background: url('@/assets/images/Compound_Pool_bg.png') no-repeat center
      center;
    background-size: 100% 100%;

    .btn {
      margin-top: 26px;
      width: 88px;
      height: 36px;
      background: #ffffff;
      border-radius: 6px 6px 6px 6px;
      font-weight: 400;
      font-size: 16px;
      color: #313c5b;
      text-align: center;
      line-height: 36px;
    }

    .all_balance {
      font-weight: 500;
      color: #ffffff;
      text-align: center;

      .title {
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 18px;
      }

      .money {
        font-size: 36px;
        line-height: 18px;
      }
    }

    .income {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 47px;
      font-weight: 500;
      font-size: 12px;
      color: #ffffff;

      .hr {
        margin: 8px 70px 0;
        width: 1px;
        height: 26px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 0px 0px 0px 0px;
      }

      .yes_income,
      .accumulations {
        .title {
          margin-bottom: 6px;
        }
      }
    }

    .Tips {
      display: flex;
      align-items: center;
      margin-top: 20px;
      font-weight: 500;
      font-size: 12px;
      color: #ffffff;

      img {
        width: 20px;
        height: 20px;
      }

      p {
        margin-left: 6px;
      }
    }
  }
}

:deep(.van-tab--active) {
  color: #fff;
  background-color: #0359bd;
}

:deep(.van-tab) {
  padding: 0px 10px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 15px;
  margin-right: 10px;
}

:deep(.van-tabs__line) {
  background: transparent;
}

:deep(.van-tabs__nav) {
  background: transparent;
  padding-left: 25px;
}
</style>
