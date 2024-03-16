<template>
  <div class="inner">
    <div class="top df aic jcsb p20 bsbb">
      <div class="df aic">
        <img src="../../assets/images/lefticon.png" style="width: 10px" @click="goBack" />
        <p style="
            color: #313c5b;
            font-size: 14px;
            margin-left: 20px;
            font-weight: 700;
          ">
          Back
        </p>
      </div>
      <p class="bl fz14 fw7">{{ typeList[status - 1] }} details</p>
      <p style="width: 40px"></p>
    </div>
    <div v-if="flag">
      <div class="content df aic jcsb fdc">
        <!-- <img :src="detailText[type].icon" style="width: 80px" /> -->
        <img src="../../assets/images/succ.png" style="width: 80px" v-show="type == 1" />
        <img src="../../assets/images/fail.png" style="width: 80px" v-show="type == 2" />
        <img src="../../assets/images/default.png" style="width: 80px" v-show="type == 3" />

        <p class="mt20 fz14" style="color: #0e1446">
          <span>{{ typeList[status - 1] }}</span>
          <span v-if="type !== 2">{{ detailText[type].type }}</span>
        </p>
        <p class="mt20 fz14" style="color: #93989f" v-if="detailInfo.createtime">
          {{ getHMS(detailInfo.createtime * 1000) }}
        </p>
        <p class="mt20 fz14" style="color: #93989f" v-else>
          ---
        </p>
        <p class="mt10 fz14" :style="{ color: detailText[type].color }">
          {{ detailText[type].text }}
        </p>
      </div>
      <div class="detail p20 bsbb">
        <p class="gray mb15">Send account</p>
        <div class="df aic jcsb mb15 bb">
          <p class="b2">{{ hiddenUserAccount(detailInfo.from_addr) }}</p>
          <p class="b1 fw7">-{{ formatDecimal(detailInfo.mun) }}USDT</p>
        </div>
        <p class="gray mb15">Accept account</p>
        <div class="df aic jcsb mb15 bb">
          <p class="b2">{{ hiddenUserAccount(detailInfo.to_addr) }}</p>
          <p class="b1 fw7">+{{ formatDecimal(detailInfo.to_mun) }}USDT</p>
        </div>
        <p class="mt20 b1 fw7 mb20">Detailed payment</p>
        <div class="df aic jcsb mb15">
          <p class="gray">Withdrawal amount</p>
          <p>{{ formatDecimal(detailInfo.mun) }}USDT</p>
        </div>
        <div class="df aic jcsb mb15">
          <p class="gray">Commission</p>
          <p>{{ formatDecimal(detailInfo.fee) }}</p>
        </div>
        <div class="df aic jcsb mb15">
          <p class="b2">Actual receipt</p>
          <p class="b2 fw7">{{ formatDecimal(detailInfo.to_mun) }}USDT</p>
        </div>
      </div>
    </div>
    <div class="df aic jcc fz16" style="height: 60vh;">
      Search data error, please try again...
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getIdToSearch } from '../../service/api'
import { getHMS, hiddenUserAccount, formatDecimal } from '../../utils/utils'
const $router = useRouter()
const $route = useRoute()
const status = ref<any>($route.query.status)
const type = ref<any>(0)
const active = ref<any>(0)
const id = ref<any>($route.query.id)
const detailInfo = ref<any>({})
const detailText = ref([
  {},
  {
    icon: '../../assets/images/succ.png',
    text: 'Completed',
    type: 'success',
    color: '#4CCD78',
  },
  {
    icon: '../../assets/images/fail.png',
    text: 'Fail',
    type: 'Fail',
    color: '#FF0000',
  },
  {
    icon: '../../assets/images/default.png',
    text: 'Confirming',
    type: 'Confirming',
    color: '#313C5B',
  },
])
const typeList = ref(['Transfer ', 'Recharge ', 'Withdraw '])
const flag = ref(false)
const getDetail = () => {
  getIdToSearch({ transfer_id: id.value }).then((res: any) => {
    if (res.data.code == 1) {
      flag.value = true
      detailInfo.value = res.data.data
    } else {
      flag.value = false
    }
  })
}
const goBack = () => {
  $router.push({
    path: 'withdrawdetail',
    query: {
      active: active.value,
    },
  })
}
onMounted(() => {
  getDetail()
  type.value = $route.query.type
  active.value = $route.query.active
})
</script>

<style lang="scss" scoped>
p {
  font-size: 14px;
}

.inner {
  min-height: 100vh;

  .top {
    background-color: #f7f7f7;
  }

  .content {
    background-color: #f7f7f7;
    height: 260px;
    padding-top: 40px;
    box-sizing: border-box;
    padding-bottom: 20px;
  }

  .detail {
    background-color: #fff;
    padding-top: 30px;
    box-sizing: border-box;

    .bb {
      border-bottom: 1px solid #dfdfdf;
      padding-bottom: 10px;
    }
  }
}
</style>
