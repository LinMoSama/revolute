<template>
  <van-swipe class="my-swipe" :autoplay="2500" indicator-color="white">
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
</template>

<script setup lang="ts" name="SlideShow"></script>

<style scoped lang="scss">
.my-swipe {
  width: 325px;
  height: 180px;
  .van-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
