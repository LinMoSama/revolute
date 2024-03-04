<template>
  <div class='wrap'>
    <Banner :menu="menu" :showWallect="true" :defaults="true"></Banner>
    <div class="control df aic jcsb">
      <div class="df fdc">
        <p class="c999 mb10">账户余额</p>
        <p class="fw7">25578</p>
      </div>
      <img src="../../assets/images/withdrawicon.png" style="width: 40px;" @click="$router.push('/withdrawdetail')">
    </div>
    <div class="content bsbb">
      <p class="fz18 co fw7 mb20">接收方</p>
      <div class="df aic jcsb bb">
        <input type="text" placeholder="请输入接收方地址" v-model="formData.toaddress">
        <img v-if="flag" src="../../assets/images/frame.png" style="width: 26px;">
        <img v-else src="../../assets/images/frame0.png" style="width: 26px;">
      </div>
      <p class="fz18 co fw7 mt20">提现金额</p>
      <p class="fz14 mt10" style="color: #B7BAC2;">您需要提现多少USDT?</p>
      <div class="big">
        <input type="text" placeholder="0.00">
      </div>
      <div class="df fdc gray li">
        <div class="df aic jcsb">
          <p>手续费</p>
          <p>0.01%</p>
        </div>
        <div class="df aic jcsb">
          <p>实际到账</p>
          <p>--</p>
        </div>
      </div>
      <div class="btn">确定</div>
    </div>
    <Menu ref="menu"></Menu>
  </div>
</template>

<script setup lang="ts" name="Withdraw">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import { getWithdraw } from '@/service/api'
const menu = ref()
const $router = useRouter()
const formData = ref({
  toaddress: '',
  amount: ''
})
const flag = ref(false)
watch(() => formData.value.toaddress, () => {
  if (formData.value.toaddress) {
    flag.value = true
  }
})

const confirmWithdraw = ()=>{
  getWithdraw({}).then(res=>{
    console.log(res)
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