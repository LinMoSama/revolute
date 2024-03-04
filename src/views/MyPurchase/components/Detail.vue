<template>
  <div class="content">
    <Back :title="title" @click-left="onClickLeft"></Back>
    <div class="top_bg">
      <div class="all_balance">
        <div class="title">总余额</div>
        <div class="money">1,547.00</div>
      </div>

      <div class="income">
        <div class="yes_income">
          <div class="title">昨日收益</div>
          <div class="money">57.00</div>
        </div>
        <div class="hr"></div>
        <div class="accumulations">
          <div class="title">累积收益</div>
          <div class="money">1,547.00</div>
        </div>


      </div>
      <div class="Tips">
        <img src="@/assets/images/!.png" alt="">
        <p>温馨提示</p>
      </div>

      <div class="btn">转出</div>
    </div>
    <div class="tabs">
      <van-tabs v-model:active="active" shrink>
        <van-tab title="全部">
          <div class="item">
            <div class="left">
              <p>Compound Pool</p>
              <span>2024/02/15</span>
            </div>
            <div class="right">
              <p>认购收益</p>
              <span>+45.00USDT</span>
            </div>
          </div>
          <div class="item">
            <div class="left">
              <p>Compound Pool</p>
              <span>2024/02/15</span>
            </div>
            <div class="right">
              <p>转出记录</p>
              <span class="zhuanchu">-100.15USDT</span>
            </div>
          </div>
          <div class="item">
            <div class="left">
              <p>Compound Pool</p>
              <span>2024/02/15</span>
            </div>
            <div class="right">
              <p>复利收益</p>
              <span>+21.00USDT</span>
            </div>
          </div>
        </van-tab>

        <van-tab title="认购收益">
          <div class="item" v-for="(item, index) in 10" :key="index">
            <div class="left">
              <p>Compound Pool</p>
              <span>2024/02/15</span>
            </div>
            <div class="right">
              <p>认购收益</p>
              <span>+45.00USDT</span>
            </div>
          </div>
        </van-tab>

        <van-tab title="转出记录">
          <div class="item" v-for="(item, index) in 10" :key="index">
            <div class="left">
              <p>Compound Pool</p>
              <span>2024/02/15</span>
            </div>
            <div class="right">
              <p>转出记录</p>
              <span class="zhuanchu">-100.15USDT</span>
            </div>
          </div>
        </van-tab>

        <van-tab title="复利收益">
          <div class="item" v-for="(item, index) in 10" :key="index">
            <div class="left">
              <p>Compound Pool</p>
              <span>2024/02/15</span>
            </div>
            <div class="right">
              <p>复利收益</p>
              <span>+21.00USDT</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import Back from '@/components/Back.vue'
import { useRoute, useRouter } from 'vue-router'
const { meta: { title } } = useRoute()
import { ref } from 'vue';
const router = useRouter()
const active = ref(0)
const listType = ref({
  success: { color: '#4CCD78', text: '已完成', type: 0 },
  failed: { color: '#FF0000', text: '失败', type: 1 },
  default: { color: '#313C5B', text: '待确认', type: 2 },
})
const goInnerDetail = (status: any, type: any) => {
  router.push({
    path: 'withdrawinner',
    query: {
      status: status,//状态
      type: type,//类型
    }
  })
}
function onClickLeft() {
  router.back()
}
</script>

<style scoped lang="scss">
.content {
  background-color: #F7F7F7;
  min-height: 120vh;
  overflow: hidden;

  .tabs {
    margin-top: 26px;

    .item {
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      width: 325px;
      height: 68px;
      background: #FFFFFF;
      border-radius: 10px 10px 10px 10px;
      padding: 14px 16px 0 16px;
      margin-bottom: 26px;
      font-weight: 500;
      font-size: 14px;
      color: #0E1446;

      .left {
        span {
          margin-top: 4px;
          font-weight: 400;
          font-size: 11px;
          color: #93989F;
        }
      }

      .right {
        p {
          text-align: right;
        }

        span {
          font-weight: 600;
          font-size: 16px;
          color: #0359BD;
          line-height: 19px;
        }

        .zhuanchu {
          color: #FF0000;
        }
      }

      .left p,
      .right p {
        margin-bottom: 5px;
      }
    }
  }

  .top_bg {
    padding-top: 26px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 280px;
    background: url('@/assets/images/Compound_Pool_bg.png') no-repeat center center;
    background-size: 100% 100%;

    .btn {
      margin-top: 26px;
      width: 88px;
      height: 36px;
      background: #FFFFFF;
      border-radius: 6px 6px 6px 6px;
      font-weight: 400;
      font-size: 16px;
      color: #313C5B;
      text-align: center;
      line-height: 36px;
    }

    .all_balance {
      font-weight: 500;
      color: #FFFFFF;
      text-align: center;

      .title {
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 18px;
      }

      .money {
        font-size: 36px;
        line-height: 18px;
      }
    }

    .income {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 47px;
      font-weight: 500;
      font-size: 12px;
      color: #FFFFFF;

      .hr {
        margin: 8px 70px 0;
        width: 1px;
        height: 26px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 0px 0px 0px 0px;
      }

      .yes_income,
      .accumulations {
        .title {
          margin-bottom: 6px;
        }
      }
    }

    .Tips {
      display: flex;
      align-items: center;
      margin-top: 20px;
      font-weight: 500;
      font-size: 12px;
      color: #FFFFFF;

      img {
        width: 20px;
        height: 20px;
      }

      p {
        margin-left: 6px;
      }
    }
  }
}


::v-deep .van-tab--active {
  color: #fff;
  background-color: #0359BD;
}

::v-deep .van-tab {
  padding: 0px 10px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 15px;
  margin-right: 10px;

}

::v-deep .van-tabs__line {
  background: transparent;
}

:deep(.van-tabs__nav) {
  background: transparent;
  padding-left: 25px;
}
</style>