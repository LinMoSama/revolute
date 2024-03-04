<template>
  <div class="wrap">
    <Banner :menu="menu" :showWallect="true"></Banner>
    <div class="control">
      <div
        class="item"
        v-for="(item, index) in controlList"
        :key="index"
        @click="controlHandler(item.type)"
      >
        <img :src="item.icon" alt="" />
        <p>{{ item.title }}</p>
      </div>
    </div>
    <TotalRevenue></TotalRevenue>

    <div class="main">
      <div class="bg">
        <img src="../../assets/images/maintext.png" alt="" />
      </div>
    </div>
    <Buy
      :percentage="item.income"
      :day="item.subscription"
      :type="item.id"
      @buy="buyHandle(1)"
      v-for="(item, index) in investList"
      :key="index"
    ></Buy>
    <!-- <Buy :percentage='1' :day='30'   :type="1" @buy='buyHandle(2)'></Buy>
    <Buy :percentage='1.2' :day='60' :type="2" @buy='buyHandle(3)'>
    </Buy> -->
    <Menu ref="menu"></Menu>
    <Alert
      title="认购金额"
      :alertShow="alertShow"
      @updateShow="updateShow"
      @closeAlert="closeAlert"
      @confirmAlert="confirmAlert"
      :flag="true"
    ></Alert>

    <Alert
      title="推荐人"
      :alertShow="isSowReference"
      @updateShow="updateShow"
      @closeAlert="closeReferenceAlert"
      @confirmAlert="ReferenceAlertConfirm"
    >
    </Alert>
  </div>
</template>

<script setup lang="ts" name="Home">
import { ref } from 'vue'
import useIndex from '@/hooks/useIndex'
import TotalRevenue from '@/components/totalRevenue.vue'
import Buy from '@/components/Buy.vue'
import Alert from '@/components/Alert.vue'
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import { title } from 'process'
const {
  controlList,
  alertShow,
  isSowReference,
  investList,
  controlHandler,
  buyHandle,
  updateShow,
  closeAlert,
  confirmAlert,
  closeReferenceAlert,
  ReferenceAlertConfirm,
} = useIndex()
const menu = ref()
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  padding-bottom: 26px;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
  overflow: hidden;

  .control {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 325px;
    height: 80px;
    background: #ffffff;
    border-radius: 10px 10px 10px 10px;
    transform: translateY(-50%);

    .item {
      img {
        width: 28px;
        height: 28px;
      }

      p {
        font-size: 12px;
        color: #313c5b;
      }
    }
  }

  .main {
    margin-top: 18px;
    width: 325px;
    height: 142px;
    background: #bcd8f7 url('@/assets/images/mainbg.png') right bottom no-repeat;
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
