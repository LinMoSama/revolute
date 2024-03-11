<template>
  <div class="banner">
    <div class="log">
      <img
        src="../assets/images/menu.png"
        alt=""
        class="menu"
        @click="updateMenu"
      />
      <img src="../assets/images/logo.png" alt="" />
    </div>
    <p class="title">{{ title }}</p>
    <div class="wallet_menu">
      <template v-if="!defaults">
        <img
          src="../assets/images/wallet.png"
          alt=""
          @click="wallectStore.ConnectTheWallet"
          v-if="!account"
        />

        <template v-if="showWallect">
          <div class="wallect" v-if="account">
            <img src="../assets/images/wallect_icon.png" alt="" />
            <div class="account">{{ formatName(account) }}</div>
          </div>
        </template>
      </template>
      <img src="../assets/images/lang_icon.png" alt="" @click="langChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useBanner from '@/hooks/useBanner'
const { wallectStore, account, formatName } = useBanner()
const props = defineProps([
  'menu',
  'showWallect',
  'defaults',
  'isShowReferenceHandler',
])
let {
  meta: { title },
} = useRoute()

function updateMenu() {
  if (props.isShowReferenceHandler()) {
    props.menu.showMenu()
  }
}
function langChange() {
  alert('langChange')
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
  background-color: #005abd;

  .log {
    display: flex;
    align-items: center;
    img {
      width: 90px;
      height: 50px;
    }
    .menu {
      width: 24px;
      height: 24px;
      margin-right: 11px;
    }
  }

  .wallet_menu {
    display: flex;
    align-items: center;

    .wallect {
      display: flex;
      align-items: center;
      margin-right: 18px;
      width: 111px;
      height: 32px;
      background: #ffffff;
      border-radius: 10px 10px 10px 10px;

      img {
        margin: 0 10px !important;
        width: 16px;
        height: 16px;
      }

      .account {
        font-size: 12px;
        color: #333333;
      }
    }
    img {
      width: 24px;
      height: 24px;
      &:first-child {
        margin-right: 17px;
      }
    }
  }

  .title {
    margin-left: -40px;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
  }
}
</style>
