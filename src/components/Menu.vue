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
            @click="changRoute(item.id)"
            v-for="(item, index) in homeIconList"
            :key="index"
          >
            <img
              src="../assets/images/home_icon.png"
              alt=""
              class="home_icon"
              v-if="item.id === 1"
            />
            <img
              src="../assets/images/tixian_icon.png"
              alt=""
              class="home_icon"
              v-if="item.id === 2"
            />
            <img
              src="../assets/images/zhuanzhang_icon.png"
              alt=""
              class="home_icon"
              v-if="item.id === 3"
            />
            <img
              src="../assets/images/rengou_icon.png"
              alt=""
              class="home_icon"
              v-if="item.id === 4"
            />
            <img
              src="../assets/images/mingxi_icon.png"
              alt=""
              class="home_icon"
              v-if="item.id === 5"
            />
            <img
              src="../assets/images/yaoqing_icon.png"
              alt=""
              class="home_icon"
              v-if="item.id === 6"
            />
            <img
              src="../assets/images/team_icon.png"
              alt=""
              class="home_icon"
              v-if="item.id === 7"
            />
            <img
              src="../assets/images/jiaoyimingxi_icon.png"
              alt=""
              class="home_icon"
              v-if="item.id === 8"
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
