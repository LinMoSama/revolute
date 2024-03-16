<template>
  <div class='wrap'>
    <Banner :menu="menu" :showSwiper="true" :showWallect="true" :defaults="true"
      :isShowReferenceHandler="isShowReferenceHandler"></Banner>
    <div class="control df aic jcsb">
      <div class="df fdc">
        <p class="c999 mb10">Account balance</p>
        <p class="fw7">{{ formatDecimal(userInfo.money * 1) }}</p>
      </div>
      <img src="../../assets/images/withdrawicon.png" style="width: 40px;" @click="goDetailList">
    </div>
    <div class="content bsbb">
      <p class="fz18 co fw7 mb20">Receiver</p>
      <div class="df aic jcsb bb">
        <input type="text" placeholder="Please enter the recipient's address" v-model="formData.to_username"
          style="width: 100%;">
        <img v-if="flag" src="../../assets/images/frame.png" style="width: 26px;"
          @click="copyAdd(formData.to_username, $event)">
        <img v-else src="../../assets/images/frame0.png" style="width: 26px;">
      </div>
      <p class="fz18 co fw7 mt20">Transfer amount</p>
      <p class="fz14 mt10" style="color: #B7BAC2;">How much USDT do you need to transfer?</p>
      <div class="big">
        <input type="number" placeholder="0.00" v-model="formData.mount">
      </div>
      <div class="df fdc gray li">
        <div class="df aic jcsb">
          <p>Commission</p>
          <p>{{ initInfo.transfer_fee }}%</p>
        </div>
        <div class="df aic jcsb">
          <p>Actual receipt</p>
          <p v-if="!formData.mount">--</p>
          <p v-else>{{ instanceAmount }}</p>
        </div>
      </div>
      <div class="btn" @click="transferTo">Determine</div>
    </div>
    <Menu ref="menu"></Menu>
    <van-overlay :show="showLoding" @click="showLoding = false" class="df aic jcc">
      <van-loading size="24px" vertical>Loading...</van-loading>
    </van-overlay>
  </div>
</template>

<script setup lang="ts" name="Home">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import { getTransferTo, getInit, getUserInfo } from '../../service/api'
import { showSuccessToast, showFailToast } from 'vant';
import { useUserStore } from '../../stores/user'
import clipboard, { formatDecimal } from '../../utils/utils'
import useIndex from '@/hooks/useIndex'
const { isShowReferenceHandler } = useIndex()
const userStore = useUserStore()
const menu = ref()
const showLoding = ref(false)
const $router = useRouter()
const userInfo = JSON.parse(sessionStorage.getItem('userInfo')!)
const initInfo = JSON.parse(sessionStorage.getItem('initInfo') || '{}')

const formData = ref<any>({
  to_username: '',
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
      active: 1
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

const getUser = () => {
  showLoding.value = true
  getUserInfo().then((res: any) => {
    sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
  }).finally(() => {
    showLoding.value = false
  })
}
const transferTo = () => {
  if (!formData.value.mount) {
    showFailToast('Please check the input of the transfer quantity')
    return
  }
  if (!formData.value.to_username) {
    showFailToast('Please check the input of the transfer address')
    return
  }
  showLoding.value = true
  getTransferTo(formData.value).then((res: any) => {
    if (res.data.code) {
      showSuccessToast('Transfer successful')
    } else {
      showFailToast(res.data.msg)
    }
    getUser()
    showLoding.value = false
    formData.value.mount = ''
    formData.value.to_username = ''
  }).finally(() => {
    showLoding.value = false
  })
}

const instanceAmount = computed(() => {
  return formatDecimal(formData.value.mount - (formData.value.mount * (initInfo.transfer_fee / 100)))
})
onMounted(async () => {
})
</script>

<style scoped lang="scss">
.co {
  color: #0E1446;
}

.wrap {
  display: flex;
  flex-direction: column;
  background-color: #F7F7F7;
  overflow: auto;

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