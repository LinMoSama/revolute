<template>
  <div class="pur_wrap">
    <Banner :menu="menu" title="我的认购"></Banner>
    <div class="part">
      <div class="title">Compound Pool</div>
      <div class="tips">
        <div class="left">
          <div class="tip">稳健增值，灵活安全，选择余额宝，财富守护无忧！</div>
          <div class="more" @click="goDetail">More</div>
        </div>
        <div class="right">
          <img src="@/assets/images/rengou_img.png" alt="">
        </div>
      </div>
    </div>
    <Item :type="1" :days="15" :leveDays="12" :inFinancialManagement="true"></Item>
    <Item :type="2" :days="30" :leveDays="0" :inFinancialManagement="false"></Item>
    <Item :type="3" :days="60" :leveDays="0" :inFinancialManagement="false"></Item>
    <Menu ref="menu"></Menu>
  </div>
</template>

<script setup lang="ts" name="MyPurchase">

import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import useMyPurchase from '@/hooks/useMyPurchase'
import Item from './components/item.vue'
const { menu, goDetail } = useMyPurchase()
</script>

<style lang="scss" scoped>
.pur_wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #F7F7F7;
  min-height: 100vh;

  .part {
    padding-top: 14px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    width: 325px;
    height: 139px;
    background: #FFFFFF;
    border-radius: 16px 16px 16px 16px;
    transform: translateY(-29px);

    .title {
      margin-bottom: 9px;
      font-weight: 600;
      font-size: 14px;
      color: #005ABD;
    }

    .tips {
      display: flex;
      align-items: center;

      .left {
        .tip {
          width: 191px;
          font-weight: 500;
          font-size: 12px;
          color: #1F3151;
          line-height: 18px;
        }

        .more {
          position: relative;
          margin-top: 8px;
          width: 88px;
          height: 36px;
          background: #005ABD;
          border-radius: 25px 25px 25px 25px;
          font-weight: 600;
          font-size: 16px;
          color: #FFFFFF;
          padding-left: 15px;
          line-height: 36px;

          &::after {
            position: absolute;
            top: 10px;
            right: 15px;
            width: 16px;
            height: 16px;
            display: block;
            content: "";
            background: url('/src/assets/images/more.png') no-repeat center center;
            background-size: 100% 100%;
          }
        }
      }

      .right {
        width: 97px;
        height: 59px;
      }
    }
  }
}
</style>