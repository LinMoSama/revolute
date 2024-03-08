<template>
  <div class="wrap">
    <Banner
      :menu="menu"
      :showWallect="true"
      :isShowReferenceHandler="isShowReferenceHandler"
    ></Banner>
    <div class="control">
      <div
        class="item"
        v-for="(item, index) in controlList"
        :key="index"
        @click="controlHandler(item.type)"
      >
        <img :src="item.icon" alt="" />
        <p>{{ item.title }}</p>
      </div>
    </div>
    <TotalRevenue
      :isShowReferenceHandler="isShowReferenceHandler"
      :awardList="awardList"
    ></TotalRevenue>

    <div class="main">
      <div class="bg">
        <img src="../../assets/images/maintext.png" alt="" />
      </div>
    </div>
    <Buy
      :percentage="item.income"
      :day="item.subscription"
      :type="item.id"
      @buy="buyHandle(item.id)"
      v-for="(item, index) in investList"
      :key="index"
    ></Buy>
    <Menu ref="menu"></Menu>
    <Alert
      title="认购金额"
      :alertShow="alertShow"
      @updateShow="updateShow"
      @closeAlert="closeAlert"
      @confirmAlert="confirmAlert"
      :flag="true"
    ></Alert>

    <Alert
      title="推荐人"
      :alertShow="isShowReference"
      @updateShow="updateShow"
      @closeAlert="closeReferenceAlert"
      @confirmAlert="ReferenceAlertConfirm"
    >
    </Alert>

    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="block">
          <p class="title">充值</p>
          <div class="input">
            <img src="../../assets/images/usdt_icon.png" alt="" />
            <input type="number" v-model.trim="inputMoney" placeholder="enter the amount"/>
            <div class="tool">
              <div class="danwei">USDT</div>
              <div class="max" @click="max">MAX</div>
            </div>
            <span class="balance_not_enough" v-if="Number(inputMoney) > balance"
              >余额不足</span
            >
            <span class="keyong" v-if="balance <= 0">可用: 0.00USDT</span>
            <span class="keyong" v-else
              >可用: {{ formatDecimal(balance) }}USDT</span
            >
          </div>
          <div class="btns">
            <div class="cancel" @click="cancel">取消</div>
            <div
              class="confirm"
              @click="confim"
              :class="{
                disabled:
                  Number(inputMoney) > balance || Number(inputMoney) <= 0,
              }"
            >
              确定
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="loading">
      <div class="wrapper">
        <van-loading vertical color="#fff">
          <template #icon>
            <van-icon name="star-o" size="30" />
          </template>
          操作中...
        </van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts" name="Home">
import { ref, onMounted, watch } from 'vue'
import useIndex from '@/hooks/useIndex'
import { getAwardList } from '@/service/api'
import TotalRevenue from '@/components/totalRevenue.vue'
import Buy from '@/components/Buy.vue'
import Alert from '@/components/Alert.vue'
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import { getUserInfo, getInit } from '../../service/api'
import { useUserStore } from '@/stores/user'
import { formatDecimal } from '@/utils/utils'
const userStore = useUserStore()
const {
  loading,
  inputMoney,
  controlList,
  alertShow,
  isShowReference,
  investList,
  show,
  balance,
  controlHandler,
  buyHandle,
  updateShow,
  closeAlert,
  confirmAlert,
  closeReferenceAlert,
  ReferenceAlertConfirm,
  isShowReferenceHandler,
  confim,
  cancel,
  max,
} = useIndex()
const menu = ref()
const awardList = ref({})
const getInfo = () => {
  getUserInfo().then((res: any) => {
    sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
  })
  getInit().then((resp: any) => {
    sessionStorage.setItem('initInfo', JSON.stringify(resp.data.data.coverdata))
  })
}
onMounted(() => {
  // getInfo()
})
watch(
  () => userStore.token,
  async val => {
    if (val) {
      getInfo()
      //获取奖励明细
      const res = await getAwardList({
        var_page: 1,
        list_rows: 3,
        award_type: 0,
        yesterday: 1,
      })
      awardList.value = res.data.data
    }
  },
  { immediate: true }
)
onMounted(async () => {
  // console.log(await checkBalance())
})
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  padding-bottom: 26px;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
  overflow: hidden;

  .control {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 325px;
    height: 80px;
    background: #ffffff;
    border-radius: 10px 10px 10px 10px;
    transform: translateY(-50%);

    .item {
      img {
        width: 28px;
        height: 28px;
      }

      p {
        font-size: 12px;
        color: #313c5b;
      }
    }
  }

  .main {
    margin-top: 18px;
    width: 325px;
    height: 142px;
    background: #bcd8f7 url('@/assets/images/mainbg.png') right bottom no-repeat;
    background-size: contain;
    border-radius: 10px 10px 10px 10px;

    .bg {
      margin: 26px 0 0 16px;
      width: 158px;
      height: 90px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
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
</style>
