<template>
  <div class="wrap">
    <van-action-sheet v-model:show="show" :closeable='false'>
      <div class="content">
        <img class="icon" src="@/assets/images/bottomArrow.png" @click="changeShow"></img>
        <ul>
          <li @click="changRoute(item.title)" v-for="(item, index) in homeIconList" :key="index">
            <img :src="item.src" alt="" class="home_icon">
            <p>{{ item.title }}</p>
            <img src="@/assets/images/rightArrow.png" alt="" class="arrow_icon">
          </li>
        </ul>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup lang="ts">
import useMenu from '@/hooks/useMenu'
import { ref } from 'vue'
let show = ref(false)
const { homeIconList, changRoute } = useMenu()
function changeShow() {
  show.value = false
}
function showMenu() {
  show.value = true
}
defineExpose({
  show,
  showMenu
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
  background: #FFFFFF;

  .icon {
    display: block;
    margin: 30px auto 9px;
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
        color: #313C5B;
      }

      .home_icon {
        margin-right: 12px
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