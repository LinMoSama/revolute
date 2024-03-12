<template>
  <div class="pur_wrap">
    <Banner  :showSwiper="true"
      :menu="menu"
      title="我的认购"
      :isShowReferenceHandler="isShowReferenceHandler"
    ></Banner>
    <div class="part">
      <div class="title">Compound Pool</div>
      <div class="tips">
        <div class="left">
          <div class="tip">稳健增值，灵活安全，选择余额宝，财富守护无忧！</div>
          <div class="more" @click="goDetail">More</div>
        </div>
        <div class="right">
          <img src="../../assets/images/rengou_img.png" alt="" />
        </div>
      </div>
    </div>
    <div class="scroll" v-if="userFinancialList.length === 0"></div>
    <div class="scroll" @scroll="scrollLoading" v-else>
      <Item
        v-for="(item, index) in userFinancialList.data"
        :key="index"
        :item="item"
      ></Item>
    </div>

    <Menu ref="menu"></Menu>
  </div>
</template>

<script setup lang="ts" name="MyPurchase">
import { ref, onMounted } from 'vue'
import Menu from '@/components/Menu.vue'
import Banner from '@/components/Banner.vue'
import useMyPurchase from '@/hooks/useMyPurchase'
import Item from './components/item.vue'
import useIndex from '@/hooks/useIndex'
import { getUserFinancialList } from '@/service/api'
const { isShowReferenceHandler } = useIndex()
const { menu, goDetail } = useMyPurchase()
const userFinancialList = ref<any>({})
let page = ref(1)
function scrollLoading(e: any) {
  const dom = e.target
  var scrollTop = dom.scrollTop //滑入屏幕上方的高度
  var windowHeitht = dom.clientHeight //能看到的页面的高度
  var scrollHeight = dom.scrollHeight //监控的整个div的高度（包括现在看到的和上下隐藏起来看不到的）
  let total = scrollTop + windowHeitht
  if (parseInt(total) >= parseInt(scrollHeight) - 30) {
    if (userFinancialList.value.data.length >= userFinancialList.value.total) {
      return
    }
    page.value++
    getUserFinancialList({
      var_page: page.value,
      list_rows: 5,
    }).then(res => {
      userFinancialList.value.data = [
        ...userFinancialList.value.data,
        ...res.data.data.data,
      ]
    })
  }
}

getUserFinancialList({
  var_page: page.value,
  list_rows: 5,
}).then(res => {
  userFinancialList.value = res.data.data
})
</script>

<style lang="scss" scoped>
.pur_wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f7f7f7;
  // min-height: 100vh;
  overflow: auto;
  .scroll {
    display: flex;
    height: 500px;
    overflow: auto;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  .part {
    padding-top: 14px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    width: 325px;
    height: 139px;
    background: #ffffff;
    border-radius: 16px 16px 16px 16px;
    transform: translateY(-29px);

    .title {
      margin-bottom: 9px;
      font-weight: 600;
      font-size: 14px;
      color: #005abd;
    }

    .tips {
      display: flex;
      align-items: center;

      .left {
        .tip {
          width: 191px;
          font-weight: 500;
          font-size: 12px;
          color: #1f3151;
          line-height: 18px;
        }

        .more {
          position: relative;
          margin-top: 8px;
          width: 88px;
          height: 36px;
          background: #005abd;
          border-radius: 25px 25px 25px 25px;
          font-weight: 600;
          font-size: 16px;
          color: #ffffff;
          padding-left: 15px;
          line-height: 36px;

          &::after {
            position: absolute;
            top: 10px;
            right: 15px;
            width: 16px;
            height: 16px;
            display: block;
            content: '';
            background: url('/src/assets/images/more.png') no-repeat center
              center;
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
