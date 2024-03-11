<template>
  <div class="wrap">
    <van-action-sheet v-model:show="show" :closeable="false">
      <div class="content">
        <img
          class="icon"
          src="../assets/images/bottomArrow.png"
          @click="changeShow"
        />
        <ul>
          <li
            @click="changRoute(item.title)"
            v-for="(item, index) in homeIconList"
            :key="index"
          >
            <img
              src="../assets/images/home_icon.png"
              alt=""
              class="home_icon"
              v-if="item.title === '首页'"
            />
            <img
              src="../assets/images/chongzhi_icon.png"
              alt=""
              class="home_icon"
              v-if="item.title === '充值'"
            />
            <img
              src="../assets/images/tixian_icon.png"
              alt=""
              class="home_icon"
              v-if="item.title === '提现'"
            />
            <img
              src="../assets/images/zhuanzhang_icon.png"
              alt=""
              class="home_icon"
              v-if="item.title === '转账'"
            />
            <img
              src="../assets/images/rengou_icon.png"
              alt=""
              class="home_icon"
              v-if="item.title === '我的认购'"
            />
            <img
              src="../assets/images/mingxi_icon.png"
              alt=""
              class="home_icon"
              v-if="item.title === '我的钱包'"
            />
            <img
              src="../assets/images/yaoqing_icon.png"
              alt=""
              class="home_icon"
              v-if="item.title === '邀请好友'"
            />
            <img
              src="../assets/images/team_icon.png"
              alt=""
              class="home_icon"
              v-if="item.title === '我的团队'"
            />
            <img
              src="../assets/images/jiaoyimingxi_icon.png"
              alt=""
              class="home_icon"
              v-if="item.title === '交易明细'"
            />
            <p>{{ item.title }}</p>
            <img
              src="../assets/images/rightArrow.png"
              alt=""
              class="arrow_icon"
            />
          </li>
        </ul>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup lang="ts">
import useMenu from '@/hooks/useMenu'
import { ref } from 'vue'
// let show = ref(false)
const { homeIconList, changRoute, show } = useMenu()
function changeShow() {
  show.value = false
}
function showMenu() {
  show.value = true
}
defineExpose({
  show,
  showMenu,
})
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 334px;
  background: #ffffff;

  .icon {
    display: block;
    margin: 30px auto 9px;
    width: 18px;
    height: 12px;
  }

  ul {
    padding-left: 20px;

    li {
      position: relative;
      display: flex;
      margin-bottom: 26px;
      align-items: center;

      p {
        font-weight: 400;
        font-size: 14px;
        color: #313c5b;
      }

      .home_icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }

      .arrow_icon {
        position: absolute;
        right: 22px;
        width: 12px;
        height: 12px;
      }
    }
  }
}

:deep(.van-popup--bottom) {
  left: auto;
  bottom: 24px;
  width: 334px;
  border-radius: 10px 10px 10px 10px;
}
</style>
