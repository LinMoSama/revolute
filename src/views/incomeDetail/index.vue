<template>
  <div class='wrap'>
    <Banner :menu="menu" :showSwiper="true" :showWallect="true" :defaults="true"
      :isShowReferenceHandler="isShowReferenceHandler"></Banner>
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
        <div class="recharge" @click="controlHandler(0)">充值</div>
      </div>
    </div>
    <div class="content bsbb">
      <van-tabs v-model:active="active" shrink @change="changeType">
        <van-tab title="全部" name=0>
          <div class="all cont" ref="allRef" v-if="formData.length" @scroll="loadMore">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <!-- <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p> -->
                <p class="fw7 fz14 b2 mb10" v-if="v.memo == '复利池转出'">复利池转入</p>
                <p class="fw7 fz14 b2 mb10" v-else>{{ v.memo }}</p>
                <p class="gray fz14">{{ getHMS(v.createtime * 1000) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7" v-if="v.memo == '购买理财'">{{ (v.money * 1).toFixed(2) }}USDT</p>
                <p class="fz16 b1 fw7" v-else>+{{ (v.money * 1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
        <van-tab title="认购" name=1>
          <div class="fund cont" ref="fundRef" v-if="formData.length" @scroll="loadMore">
            <div class="item df aic jcsb" v-for="(v, i) in formData" :key="i">
              <div class="df fdc">
                <!-- <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p> -->
                <p class="fw7 fz14 b2 mb10">{{ v.memo }}</p>
                <p class="gray fz14">{{ getHMS(v.createtime * 1000) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">{{ (v.money * 1).toFixed(2) }}USDT</p>
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
                <!-- <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}转入</p> -->
                <p class="fw7 fz14 b2 mb10">复利池转入</p>
                <p class="gray fz14">{{ getHMS(v.createtime * 1000) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">+{{ (v.money * 1).toFixed(2) }}USDT</p>
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
                <!-- <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p> -->
                <p class="fw7 fz14 b2 mb10">{{ v.memo }}</p>
                <p class="gray fz14">{{ getHMS(v.createtime * 1000) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">+{{ (v.money * 1).toFixed(2) }}USDT</p>
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
                <!-- <p class="fw7 fz14 b2 mb10">{{ typeList[v.type] }}收益</p> -->
                <p class="fw7 fz14 b2 mb10">{{ v.memo }}</p>
                <p class="gray fz14">{{ getHMS(v.createtime * 1000) }}</p>
              </div>
              <div class="df aic jcsb">
                <p class="fz16 b1 fw7">+{{ (v.money * 1).toFixed(2) }}USDT</p>
              </div>
            </div>
          </div>
          <div class="nodata df aic jcc mt40 fz20 b2" v-else>
            暂无数据
          </div>
        </van-tab>
        <!-- <van-tab title="平级" name=5>
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
        </van-tab> -->
      </van-tabs>
    </div>
    <Menu ref="menu"></Menu>
    <van-overlay :show="Chongzhishow">
      <div class="wrapper" @click.stop>
        <div class="block">
          <p class="title">充值</p>
          <div class="input">
            <img src="../../assets/images/usdt_icon.png" alt="" />
            <input type="number" v-model.trim="inputMoney" placeholder="enter the amount" />
            <div class="tool">
              <div class="danwei">USDT</div>
              <div class="max" @click="max">MAX</div>
            </div>
            <span class="balance_not_enough" v-if="Number(inputMoney) > balance">余额不足</span>
            <span class="keyong" v-if="balance <= 0">可用: 0.00USDT</span>
            <span class="keyong" v-else>可用: {{ formatDecimal(balance) }}USDT</span>
          </div>
          <div class="btns">
            <div class="cancel" @click="cancel">取消</div>
            <div class="confirm" @click="confim" :class="{
      disabled:
        Number(inputMoney) > balance || Number(inputMoney) <= 0,
    }">
              确定
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts" name="Home">
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import { getFinancialList, getTransferList, getUserTeam, getMoneyLog } from '../../service/api'
import { getHMS, formatDecimal } from '../../utils/utils'
import { showSuccessToast, showFailToast } from 'vant';
import useIndex from '@/hooks/useIndex'
// import { formatDecimal } from '@/utils/utils'
const userInfo = ref<any>(JSON.parse(sessionStorage.getItem('userInfo')!))
const { isShowReferenceHandler, controlHandler, Chongzhishow, inputMoney, max, balance, cancel, confim } = useIndex()
const menu = ref()
const $router = useRouter()
const active = ref(0)

const params = ref({
  var_page: 1,
  list_rows: 10,
  mome: ''
})
const typeList = ref([
  '',
  '认购',
  '复利',
  '推荐',
  '团队',
  '平级'
])
const typeArr = reactive<any>([
  '',
  '购买理财',
  '复利池转出',
  '推荐奖励',
  '团队奖励'
])
const formData = ref<any>([])
const changeType = (number: number) => {
  params.value.mome = typeArr[number]
  active.value = number
  params.value.var_page = 1
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
  getMoneyLog({
    var_page: nowPage,
    list_rows: params.value.list_rows,
    mome: params.value.mome
  }).then((res: any) => {
    if (!res.data.data.data.length) {
      showFailToast('到底了')
    } else {
      formData.value = [...formData.value, ...res.data.data.data]
    }
  })
}


const getData = () => {
  // getFinancialList(params.value).then((res: any) => {
  //   formData.value = res.data.data.data
  // })
  getMoneyLog(params.value).then((res: any) => {
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
watch(() => params.value.mome, () => {
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

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 334px;
  height: 230px;
  background-color: #fff;
  border-radius: 10px 10px 10px 10px;

  .input {
    position: relative;
    display: flex;
    margin: 0 auto;
    width: 300px;
    height: 52px;
    background: #ebf2ff;
    border-radius: 6px 6px 6px 6px;

    img {
      position: absolute;
      top: 14px;
      left: 16px;
      width: 24px;
      height: 24px;
    }

    input {
      width: 194px;
      height: 100%;
      background: #ebf2ff;
      border: none;
      padding-left: 47px;
      border-radius: 6px 6px 6px 6px;
      font-size: 18px;
    }

    .tool {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: calc(300px - 194px);
      height: 100%;
      border-radius: 6px 6px 6px 6px;

      .danwei {
        font-weight: 500;
        font-size: 14px;
        color: #0359bd;
      }

      .max {
        width: 50px;
        height: 26px;
        background: #0359bd;
        border-radius: 2px 2px 2px 2px;
        font-weight: 500;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
        line-height: 26px;
      }
    }

    .balance_not_enough {
      position: absolute;
      bottom: -20px;
      font-weight: 400;
      font-size: 12px;
      color: #ff0000;
    }

    .keyong {
      position: absolute;
      bottom: -20px;
      right: 0px;
      font-weight: 400;
      font-size: 12px;
      color: #313c5b;
    }
  }

  .title {
    margin-top: 30px;
    margin-bottom: 26px;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color: #313c5b;
  }

  .btns {
    display: flex;
    padding: 0 17px;
    margin-top: 44px;
    margin-bottom: 30px;
    justify-content: space-between;

    div {
      width: 146px;
      height: 40px;
      border-radius: 6px 6px 6px 6px;
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      line-height: 40px;
    }

    .cancel {
      background: #d9d9d9;
      color: #2f354d;
    }

    .confirm {
      background: #0359bd;
      color: #ffffff;
    }

    .disabled {
      width: 146px;
      height: 40px;
      background: rgba(3, 89, 189, 0.5);
      border-radius: 6px 6px 6px 6px;
    }
  }
}

.wrap {
  display: flex;
  flex-direction: column;
  background-color: #F7F7F7;
  overflow: hidden;
  // min-height: 100vh;

  // .banner {
  //   display: flex;
  //   width: 100%;
  //   height: 168px;
  //   padding: 0 25px;
  //   justify-content: space-between;
  //   align-items: center;
  //   background-color: #005ABD;

  //   .log {
  //     img {
  //       width: 90px;
  //       height: 50px;
  //     }
  //   }

  //   .wallet_menu {
  //     img {
  //       width: 24px;
  //       height: 24px;

  //       &:first-child {
  //         margin-right: 16px;
  //       }
  //     }
  //   }


  // }

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