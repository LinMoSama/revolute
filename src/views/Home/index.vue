<template>
  <div class='wrap'>
    <div class="banner">
      <div class="log">
        <img src="@/assets/images/logo.png" alt="">
      </div>
      <div class="wallet_menu">
        <img src="@/assets/images/wallet.png" alt="" @click="wallectStore.ConnectTheWallet" v-if="!account">
        <div class="wallect" v-if="account">
          <img src="@/assets/images/income1.png" alt="">
          <div class="account">{{ formatName(account) }}</div>
        </div>
        <img src="@/assets/images/menu.png" alt="">
      </div>

    </div>
    <div class="control">
      <div class="item" v-for="(item, index) in controlList" :key="index" @click="controlHandler(item.type)">
        <img :src="item.icon" alt="">
        <p>{{ item.title }}</p>
      </div>
    </div>
    <totalRevenue></totalRevenue>
    <div class="main">
      <div class="bg">
        <img src="../../assets/images/maintext.png" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import totalRevenue from '@/components/totalRevenue.vue';
import useWallect from '@/stores/wallect'
import { storeToRefs } from 'pinia'
import { formatName } from '@/utils/utils';
const { account } = storeToRefs(useWallect())
const wallectStore = useWallect()
const controlList = [
  {
    icon: '/src/assets/images/recharge.png',
    title: '充值',
    type: 0
  },
  {
    icon: '/src/assets/images/withdraw.png',
    title: '提现',
    type: 1
  }, {
    icon: '/src/assets/images/transfer.png',
    title: '转账',
    type: 2
  }, {
    icon: '/src/assets/images/Scan.png',
    title: '扫一扫',
    type: 3
  },
]
function controlHandler(type: number) {
  switch (type) {
    case 0:
      recharge()
      break;
    case 1:
      wallet()
      break;
    case 2:
      transfer()
      break;
    case 3:
      Scan()
      break;
  }
}
// function ConnectTheWallet () {
//   alert('ConnectTheWallet');
// }
function recharge() {
  alert('充值')
}
function wallet() {
  alert('提现')
}
function transfer() {
  alert('转账')
}
function Scan() {
  alert('扫一扫')
}
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
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
      display: flex;
      align-items: center;

      img {
        width: 24px;
        height: 24px;

        &:first-child {
          margin-right: 16px;
        }
      }

      .wallect {
        display: flex;
        align-items: center;
        margin-right: 18px;
        width: 111px;
        height: 32px;
        background: #FFFFFF;
        border-radius: 10px 10px 10px 10px;

        img {
          margin: 0 10px;
          width: 16px;
          height: 13px;
        }

        .account {
          font-size: 12px;
          color: #333333
        }
      }
    }


  }

  .control {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 325px;
    height: 80px;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;
    transform: translateY(-50%);

    .item {
      img {
        width: 28px;
        height: 28px;
      }

      p {
        font-size: 12px;
        color: #313C5B;
      }
    }
  }

  .main {
    margin-top: 18px;
    width: 325px;
    height: 142px;
    background: #BCD8F7 url('@/assets/images/mainbg.png') right bottom no-repeat;
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
</style>