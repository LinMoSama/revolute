<template>
  <div class='wrap'>
    <Banner :menu="menu"  :showSwiper="true" :showWallect="true" :defaults="true" :isShowReferenceHandler="isShowReferenceHandler"></Banner>
    <div class="control df aic jcsb">
      <div class="df fdc">
        <p class="c999 mb10">账户余额</p>
        <p class="fw7">{{ (userInfo.money * 1).toFixed(2) }}</p>
      </div>
      <img src="../../assets/images/withdrawicon.png" style="width: 40px;" @click="goDetailList">
    </div>
    <div class="content bsbb">
      <p class="fz18 co fw7 mb20">接收方</p>
      <div class="df aic jcsb bb">
        <input type="text" placeholder="请输入接收方地址" v-model="formData.to_username">
        <img v-if="flag" src="../../assets/images/frame.png" style="width: 26px;"
          @click="copyAdd(formData.to_username, $event)">
        <img v-else src="../../assets/images/frame0.png" style="width: 26px;">
      </div>
      <p class="fz18 co fw7 mt20">提现金额</p>
      <p class="fz14 mt10" style="color: #B7BAC2;">您需要提现多少USDT?</p>
      <div class="big">
        <input type="number" placeholder="0.00" v-model="formData.mount">
      </div>
      <div class="df fdc gray li">
        <div class="df aic jcsb">
          <p>手续费</p>
          <p>{{ fixedTwo(initInfo.transfer_myzc_fee) }}%</p>
        </div>
        <div class="df aic jcsb">
          <p>实际到账</p>
          <p v-if="!formData.mount">--</p>
          <p v-else>{{ instanceAmount }}</p>
        </div>
      </div>
      <div class="btn" @click="confirmWithdraw">确定</div>
    </div>
    <Menu ref="menu"></Menu>
    <van-loading v-if="showLoding" />
  </div>
</template>

<script setup lang="ts" name="Withdraw">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import { getWithdraw } from '@/service/api'
import { useUserStore } from '../../stores/user'
import clipboard from '../../utils/utils'
import { fixedTwo } from '../../utils/utils'
import { showSuccessToast, showFailToast } from 'vant';
import { computed } from 'vue';
import useIndex from '@/hooks/useIndex'
const {isShowReferenceHandler} = useIndex()
const userStore = useUserStore()
// const userInfo = JSON.parse(userStore.userInfo)
const userInfo = JSON.parse(sessionStorage.getItem('userInfo')!)
// const initInfo = JSON.parse(userStore.initInfo)
const initInfo = JSON.parse(sessionStorage.getItem('initInfo') || '{}')
const account = ref(sessionStorage.getItem('account'))
const menu = ref()
const $router = useRouter()
const showLoding = ref(false)
const formData = ref<any>({
  to_username: account.value,
  mount: ''
})
const flag = ref(false)
const copyAdd = (text: string, event: any) => {
  clipboard(text, event)
  event.value = event
}
const goDetailList = () => {
  $router.push({
    path: '/withdrawdetail',
    query: {
      active: 3
    }
  })
}
watch(() => formData.value.to_username, () => {
  if (formData.value.to_username) {
    flag.value = true
  } else {
    flag.value = false
  }
})
const instanceAmount = computed(() => {
  return (formData.value.mount - (formData.value.mount * (initInfo.transfer_myzc_fee / 100))).toFixed(2)
})

const confirmWithdraw = () => {
  if (!formData.value.mount) {
    showFailToast('请检查转账数量的输入')
    return
  }
  if (!formData.value.to_username) {
    showFailToast('请检查转账地址的输入')
    return
  }
  showLoding.value = true
  getWithdraw(formData.value).then(res => {
    if (res.data.code) {
      showSuccessToast('提现成功')
    } else {
      showFailToast(res.data.msg)
    }
    showLoding.value = false
  }).finally(() => {
    showLoding.value = false
  })
}
</script>

<style scoped lang="scss">
.co {
  color: #17172C;
}

.wrap {
  display: flex;
  flex-direction: column;
  background-color: #F7F7F7;
  overflow: auto;

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
    height: 80px;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;
    transform: translateY(-50%);
    margin: 0 auto;

    p {
      font-size: 14px;
    }
  }

  .content {
    padding: 0 20px;

    .bb {
      border-bottom: 1px solid #ddd;
      padding-bottom: 10px;

      input {
        border: none;
        outline: none;
        background-color: #f7f7f7;
        font-size: 12px;
        width: 100%;
      }

      input::placeholder {
        font-size: 12px;
        color: #0E1446;
      }
    }

    .big {
      border-bottom: 1px solid #ddd;
      margin-top: 40px;
      width: 100%;
      padding-bottom: 10px;

      input {
        width: 100%;
        border: none;
        outline: none;
        background-color: #f7f7f7;
        text-align: center;
        font-weight: 700;
      }

      input::placeholder {
        font-size: 32px;
        color: #B7BAC2;
        text-align: center;
        font-weight: 700;
      }
    }

    .li {
      font-size: 14px;
      color: #93989F;

      >div {
        margin-top: 20px;
      }
    }

    .btn {
      background: #005ABD;
      color: #fff;
      border-radius: 30px;
      width: 90%;
      margin: 40px auto;
      text-align: center;
      padding: 20px;
      font-size: 16px;
    }
  }
}
</style>