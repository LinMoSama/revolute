<template>
  <div class='wrap'>
    <div class="banner">
      <div class="log">
        <img src="@/assets/images/logo.png" alt="">
      </div>
      <div class="wallet_menu">
        <img src="@/assets/images/wallet.png" alt="" @click="wallectStore.ConnectTheWallet" v-if="!account">
        <div class="wallect" v-if="account">
          <img src="@/assets/images/wallect_icon.png" alt="">
          <div class="account">{{ formatName(account) }}</div>
        </div>
        <img src="@/assets/images/menu.png" alt="" @click="updateMenu">
      </div>
    </div>
    <div class="control">
      <div class="item" v-for="(item, index) in controlList" :key="index" @click="controlHandler(item.type)">
        <img :src="item.icon" alt="">
        <p>{{ item.title }}</p>
      </div>
    </div>
    <TotalRevenue></TotalRevenue>

    <div class="main">
      <div class="bg">
        <img src="../../assets/images/maintext.png" alt="">
      </div>
    </div>
    <Buy :percentage='0.8' :day='15' :type="0" @buy='buyHandle(1)'></Buy>
    <Buy :percentage='1' :day='30' :type="1" @buy='buyHandle(2)'></Buy>
    <Buy :percentage='1.2' :day='60' :type="2" @buy='buyHandle(3)'>
    </Buy>
    <Menu ref="menu"></Menu>
    <Alert title='认购金额' :alertShow='alertShow' @updateShow="updateShow" @closeAlert="closeAlert"></Alert>
  </div>
</template>

<script setup lang="ts" name="Home">
import useIndex from '@/hooks/useIndex'
import TotalRevenue from '@/components/TotalRevenue.vue';
import Buy from '@/components/Buy.vue'
import Alert from '@/components/Alert.vue'
import Menu from '@/components/Menu.vue'
const { controlList, alertShow, wallectStore, account, controlHandler, formatName, buyHandle, updateShow, closeAlert } = useIndex()
import { onMounted, ref } from 'vue'
const menu = ref()

function updateMenu() {
  menu.value.show = true
}
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  padding-bottom: 26px;
  flex-direction: column;
  align-items: center;
  background-color: #F7F7F7;
  overflow: hidden;
  min-height: 100vh;



  :deep(.van-popup--bottom) {
    left: auto;
    bottom: 24px;
    width: 334px;
    border-radius: 10px 10px 10px 10px;
  }

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
          height: 16px;
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