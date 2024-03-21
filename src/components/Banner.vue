<template>
  <div class="banner" :class="{ b2: showSwiper }">
    <van-swipe
      class="my-swipe"
      :autoplay="2500"
      indicator-color="white"
      v-if="!showSwiper"
    >
      <van-swipe-item>
        <img src="../assets/images/slideshow_bg1.png" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../assets/images/slideshow_bg2.png" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../assets/images/slideshow_bg3.png" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../assets/images/slideshow_bg4.png" alt="" />
      </van-swipe-item>
    </van-swipe>

    <div class="content">
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
      <div class="wallet_menu" v-if="!defaults">
        <img
          v-show="!account"
          src="../assets/images/wallet.png"
          alt=""
          @click="wallectStore.ConnectTheWallet"
        />
        <div class="wallect" v-show="account">
          <img src="../assets/images/wallect_icon.png" alt="" />
          <div class="account">
            {{ formatName(account as string) }}
          </div>
        </div>
        <img src="../assets/images/lang_icon.png" alt="" @click="langChange" />
      </div>
    </div>
  </div>
  <van-overlay :show="wallectStore.loading">
    <div class="wrapper">
      <van-loading vertical color="#fff">
        <template #icon>
          <van-icon name="star-o" size="30" />
        </template>
        In operation...
      </van-loading>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, nextTick, onBeforeUpdate } from 'vue'
import useBanner from '@/hooks/useBanner'
import useWallect from '@/stores/wallect'
const wallectStore = useWallect()
let account = ref('')
const { formatName, token } = useBanner()
const props = defineProps([
  'menu',
  'showWallect',
  'defaults',
  'isShowReferenceHandler',
  'showSwiper',
])

let {
  meta: { title },
} = useRoute()
function updateMenu() {
  if (props.isShowReferenceHandler()) {
    props.menu.showMenu()
  }
}
onBeforeUpdate(() => {
  account.value = sessionStorage.getItem('account')!
})
onMounted(() => {
  account.value = sessionStorage.getItem('account')!
})
function langChange() {}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 50%;
}
.my-swipe {
  position: relative;
  width: 100%;
  height: 212px;
  .van-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.banner {
  position: relative;
  width: 100%;
  height: 211px;
  background-color: #005abd;

  // padding: 20px 25px 0px;
  .content {
    position: absolute;
    top: 20px;
    z-index: 1;
    padding: 0 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
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
.b2 {
  height: 168px;
  .content {
    top: 50%;
    transform: translateY(-85%);
  }
}
:deep(.van-swipe__indicators) {
  bottom: 48px;
  margin-right: 6px;
}
:deep(.van-swipe__indicator) {
  margin-right: 6px;
  background: #ffffff;
  opacity: 1;
}
:deep(.van-swipe__indicator--active) {
  background-color: #0359bd !important;
}
</style>
