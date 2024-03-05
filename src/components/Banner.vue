<template>
  <div class="banner">
    <div class="log">
      <img src="@/assets/images/logo.png" alt="">
    </div>
    <p class="title">{{ title }}</p>
    <div class="wallet_menu">
      <div v-if="!defaults">
        <img src="@/assets/images/wallet.png" alt="" @click="wallectStore.ConnectTheWallet" v-if="!account">
        <template v-if="showWallect">
          <div class="wallect" v-if="account">
            <img src="@/assets/images/wallect_icon.png" alt="">
            <div class="account">{{ formatName(account) }}</div>
          </div>
        </template>
      </div>
      <img src="@/assets/images/menu.png" alt="" @click="updateMenu">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import useBanner from '@/hooks/useBanner'
const { wallectStore, account, formatName } = useBanner()
const props = defineProps(['menu', 'showWallect', 'defaults'])
let { meta: { title } } = useRoute()
function updateMenu() {
  props.menu.showMenu()
}
</script>

<style lang="scss" scoped>
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

  .title {
    margin-left: -40px;
    font-weight: 600;
    font-size: 16px;
    color: #FFFFFF;
  }
}
</style>