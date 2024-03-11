<template>
  <div class='wrap'>
    <Banner :menu="menu" :showWallect="true" :defaults="true" :isShowReferenceHandler="isShowReferenceHandler"></Banner>
    <div class="control df aic fdc">
      <p class="c999 mb10">账户余额(USDT)</p>
      <p class="fw7 fz30">{{ (userInfo.money * 1).toFixed(2) }}</p>
      <p class="fz14 gray mt20">
        <span>团队累积收益:</span>
        <span v-if="!noTeam">-- USDT</span>
        <span v-else>{{ (teamInfo.team_sum * 1).toFixed(2) }}</span>
      </p>
      <div class="btns df aic jcse">
        <div class="with" @click="$router.push('/withdraw')">提现</div>
        <div class="recharge">充值</div>
      </div>
    </div>
    <div class="content bsbb">
      <van-tabs v-model:active="active" shrink @change="changeType">
        <van-tab title="全部" name=0>
          <div class="all cont" ref="allRef" v-if="formData.length" @scroll="loadMore">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p>
                <p class="gray fz14">{{ getHMS(v.createtime) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">+{{ (v.mun * 1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
        <van-tab title="理财" name=1>
          <div class="fund cont" ref="fundRef" v-if="formData.length" @scroll="loadMore">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p>
                <p class="gray fz14">{{ getHMS(v.createtime) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">+{{ (v.mun * 1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
        <van-tab title="复利" name=2>
          <div class="income cont" ref="incomeRef" v-if="formData.length" @scroll="loadMore">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p>
                <p class="gray fz14">{{ getHMS(v.createtime) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">+{{ (v.mun * 1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
        <van-tab title="推荐" name=3>
          <div class="transfer cont" ref="recommendRef" v-if="formData.length" @scroll="loadMore">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p>
                <p class="gray fz14">{{ getHMS(v.createtime) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">+{{ (v.mun * 1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
        <van-tab title="团队" name=4>
          <div class="transfer cont" ref="teamRef" v-if="formData.length" @scroll="loadMore">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p>
                <p class="gray fz14">{{ getHMS(v.createtime) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">+{{ (v.mun * 1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
        <van-tab title="平级" name=5>
          <div class="transfer cont" ref="teamRef" v-if="formData.length" @scroll="loadMore">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p>
                <p class="gray fz14">{{ getHMS(v.createtime) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">+{{ (v.mun * 1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <Menu ref="menu"></Menu>
  </div>
</template>

<script setup lang="ts" name="Home">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import { getFinancialList, getTransferList, getUserTeam } from '../../service/api'
import { getHMS } from '../../utils/utils'
import { showSuccessToast, showFailToast } from 'vant';
import useIndex from '@/hooks/useIndex'
const userInfo = ref<any>(JSON.parse(sessionStorage.getItem('userInfo')!))
const { isShowReferenceHandler } = useIndex()
const menu = ref()
const $router = useRouter()
const active = ref(0)

const params = ref({
  var_page: 1,
  list_rows: 10,
  award_type: 0
})
const typeList = ref([
  '',
  '理财',
  '复利',
  '推荐',
  '团队',
  '平级'
])
const formData = ref<any>([])
const changeType = (number: number) => {
  params.value.award_type = number
  active.value = number
}
const allRef = ref<any>(null)
const fundRef = ref<any>(null)
const incomeRef = ref<any>(null)
const recommendRef = ref<any>(null)
const teamRef = ref<any>(null)
const refList = ref<any>([
  allRef,
  fundRef,
  incomeRef,
  recommendRef,
  teamRef
])

// 触底加载
const loadMore = () => {
  const activeRef = refList.value[active.value]
  if (activeRef.value.scrollTop + activeRef.value.clientHeight >= activeRef.value.scrollHeight) {
    pageAdd()
  }
}
const pageAdd = async () => {
  const nowPage = await ++params.value.var_page
  getFinancialList({
    var_page: nowPage,
    list_rows: params.value.list_rows,
    award_type: params.value.award_type
  }).then((res: any) => {
    if (!res.data.data.data.length) {
      showFailToast('到底了')
    } else {
      formData.value = [...res.data.data.data, ...formData.value]
    }
  })
}


const getData = () => {
  getFinancialList(params.value).then((res: any) => {
    formData.value = res.data.data.data
  })
}
const teamInfo = ref<any>({})
const noTeam = ref(true)
const getTeamIncome = () => {
  getUserTeam().then((res: any) => {
    if (!res.data.data) {
      noTeam.value = res.data.data
    } else {
      teamInfo.value = res.data.data
    }
  })
}
watch(() => params.value.award_type, () => {
  getData()
})

onMounted(() => {
  getData()
  getTeamIncome()
})
</script>

<style scoped lang="scss">
::v-deep .van-tabs__nav {
  background-color: #F7F7F7;
}

::v-deep .van-tab--active {
  color: #fff;
  background-color: #0359BD;
  font-weight: normal;
}

::v-deep .van-tab {
  padding: 5px 12px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 15px;
  margin-right: 10px;
  font-weight: normal;
}

::v-deep .van-tabs__line {
  background: transparent;
}

::v-deep .van-tab__panel {
  padding: 10px 20px;
  box-sizing: border-box;
}

.co {
  color: #0E1446;
}

.wrap {
  display: flex;
  flex-direction: column;
  background-color: #F7F7F7;
  overflow: hidden;
  min-height: 100vh;

  .banner {
    display: flex;
    width: 100%;
    height: 168px;
    padding: 0 25px;
    justify-content: space-between;
    align-items: center;
    background-color: #005ABD;

    .log {
      img {
        width: 90px;
        height: 50px;
      }
    }

    .wallet_menu {
      img {
        width: 24px;
        height: 24px;

        &:first-child {
          margin-right: 16px;
        }
      }
    }


  }

  .control {
    padding: 15px;
    width: 325px;
    height: 170px;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;
    transform: translateY(-25%);
    margin: 0 auto;

    p {
      font-size: 14px;
    }

    .btns {
      width: 100%;
      font-size: 14px;
      margin-top: 20px;

      .with {
        background-color: #fff;
        border-radius: 8px;
        padding: 8px 25px;
        border: 1px solid #0359BD;
        color: #0359BD;
      }

      .recharge {
        background-color: #0359BD;
        border-radius: 8px;
        padding: 8px 25px;
        border: 1px solid #0359BD;
        color: #fff;
      }
    }
  }

  .content {
    .item {
      background: #fff;
      border-radius: 20px;
      padding: 15px 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
    }

    .cont {
      max-height: 300px;
      overflow-y: scroll;
    }
  }
}
</style>