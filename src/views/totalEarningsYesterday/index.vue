<template>
  <div class="wrap">
    <Back :title="title" @click-left="onClickLeft"></Back>
    <div class="title">
      <p>昨日总收益</p>
      <div class="money">{{ formatDecimal(awardList.yesterday) }}</div>
      <div class="icon"></div>
    </div>

    <div class="scroll" @scroll="scrollLoading">
      <Detail
        :title="titleCom(item)"
        :money="formatDecimal(item.mun)"
        v-for="(item, index) in awardList.data"
        :key="index"
      ></Detail>
    </div>
    <!-- <Detail title="团队收益" :money="45.0"></Detail>
    <Detail title="静态收益" :money="45.0"></Detail>
    <Detail title="推荐收益" :money="45.0"></Detail>
    <Detail title="平级收益" :money="45.0"></Detail> -->
  </div>
</template>

<script setup lang="ts" name="totalEarningsYesterday">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAwardList } from '@/service/api'
import { formatDecimal } from '@/utils/utils'
import Back from '@/components/Back.vue'
import Detail from '@/components/Detail.vue'
// import useTotalEarningsYesterday from '@/hooks/totalEarningsYesterday'
let awardList = ref<any>({})
let page = ref(1)
const router = useRouter()
const {
  meta: { title },
} = useRoute()
document.documentElement.scrollTop = 0
// getAwardListHandler()
// const {
//   awardList,
//   title,
//   propsData,
//   propsData2,
//   onClickLeft,
//   scrollLoading,
//   getAwardListHandler,
// } = useTotalEarningsYesterday()
const titleCom = (item: any) => {
  let title = ''
  if (item.type === 1) {
    title = '静态收益'
  } else if (item.type === 2) {
    title = 'Compound 收益'
  } else if (item.type === 3) {
    title = '推荐收益'
  } else if (item.type === 4) {
    title = '团队收益'
  } else if (item.type === 5) {
    title = '平级收益'
  }

  return title
}
function onClickLeft() {
  router.back()
}

function scrollLoading(e: any) {
  const dom = e.target
  var scrollTop = dom.scrollTop //滑入屏幕上方的高度
  var windowHeitht = dom.clientHeight //能看到的页面的高度
  var scrollHeight = dom.scrollHeight //监控的整个div的高度（包括现在看到的和上下隐藏起来看不到的）
  let total = scrollTop + windowHeitht
  if (parseInt(total) >= parseInt(scrollHeight) - 30) {
    console.log(awardList.value.data.length, '21')
    console.log(awardList.value.total)
    if (awardList.value.data.length >= awardList.value.total) {
      return
    }
    page.value++
    try {
      getAwardList({
        var_page: page.value,
        list_rows: 10,
        award_type: 0,
        yesterday: 1,
      }).then(res => {
        console.log(res)
        awardList.value.data = [...awardList.value.data, ...res.data.data.data]
      })
    } catch (error) {
      console.log(error)
    }
  }
}
//获取奖励明细
getAwardList({
  var_page: page.value,
  list_rows: 10,
  award_type: 0,
  yesterday: 1,
}).then(res => {
  console.log(res)
  awardList.value = res.data.data
  console.log(awardList.value)
})
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: #f7f7f7;
  .scroll {
    display: flex;
    width: 100%;
    height: 550px;
    // height: 100px;
    flex-direction: column;
    align-items: center;
    overflow: auto;
  }
}

.title {
  position: relative;
  width: 100%;
  height: 109px;
  background-color: #4162ff;
  font-weight: 500;
  color: #ffffff;
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
    background: linear-gradient(
      299deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 0px 0px 0px 0px;
    // 旋转
    transform: rotate(147.25deg);
  }
}
</style>
